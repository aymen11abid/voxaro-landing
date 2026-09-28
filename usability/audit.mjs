#!/usr/bin/env node
// Usability-Audit fuer die Werkanio-Landingpage.
//
// Oeffnet die Seite in einem echten Browser (Chromium via Playwright) auf
// Handy, Tablet und Desktop, jeweils im hellen und dunklen Modus, klickt sich
// durch und prueft dabei Barrierefreiheit, Layout, Links, Bedienbarkeit per
// Tastatur und Touch. Ergebnis: usability/report/REPORT.md, findings.json
// und Screenshots.
//
//   node usability/audit.mjs                       # lokale index.html
//   node usability/audit.mjs --url https://…       # beliebige URL
//   node usability/audit.mjs --offline-tailwind    # Tailwind lokal statt CDN

import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');

const args = process.argv.slice(2);
const argValue = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
};
const OUT = path.resolve(argValue('--out') ?? path.join(HERE, 'report'));
const SHOTS = path.join(OUT, 'screenshots');
const FORCE_OFFLINE_TAILWIND = args.includes('--offline-tailwind');

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: 'tablet', width: 768, height: 1024, isMobile: true, hasTouch: true, deviceScaleFactor: 1 },
  { name: 'desktop', width: 1366, height: 900, isMobile: false, hasTouch: false, deviceScaleFactor: 1 },
];
const THEMES = ['light', 'dark'];

const SEVERITY_ORDER = { critical: 0, serious: 1, moderate: 2, minor: 3, info: 4 };

// ---------------------------------------------------------------------------
// Befunde sammeln (gleiche Befunde aus mehreren Szenarien werden zusammengefasst)

const findings = new Map();
function report({ key, severity, category, title, detail, suggestion, scenario, elements = [] }) {
  const existing = findings.get(key);
  if (existing) {
    if (scenario && !existing.scenarios.includes(scenario)) existing.scenarios.push(scenario);
    for (const el of elements) if (!existing.elements.includes(el)) existing.elements.push(el);
    return;
  }
  findings.set(key, {
    severity, category, title, detail, suggestion,
    scenarios: scenario ? [scenario] : [],
    elements: [...elements],
  });
}

// ---------------------------------------------------------------------------
// Lokaler Server — verhaelt sich wie Vercel: vorhandene Dateien (CSS, Bilder,
// Unterseiten) direkt ausliefern, alles andere per Rewrite auf index.html

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
  '.json': 'application/json', '.webp': 'image/webp',
};

async function startServer() {
  const server = createServer(async (req, res) => {
    const rel = decodeURIComponent(new URL(req.url, 'http://x').pathname).replace(/^\/+/, '');
    let file = path.resolve(ROOT, rel || 'index.html');
    if (!file.startsWith(ROOT) || rel.startsWith('usability') || rel.startsWith('.')) file = path.join(ROOT, 'index.html');
    let body;
    try { body = await readFile(file); } catch { file = path.join(ROOT, 'index.html'); body = await readFile(file); }
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  return { server, url: `http://127.0.0.1:${server.address().port}/` };
}

// ---------------------------------------------------------------------------
// Tailwind: die Seite laedt das Play-CDN. Ist das CDN nicht erreichbar
// (z. B. in abgeschotteten CI-/Sandbox-Umgebungen), bauen wir dieselben
// Klassen lokal mit Tailwind v3 und liefern sie an Stelle des CDN-Skripts aus.

let offlineTailwindShim;
async function buildOfflineTailwind(html) {
  const tmp = path.join(OUT, '.tailwind');
  await mkdir(tmp, { recursive: true });
  // Konfiguration aus der Seite uebernehmen (tailwind.config = {...})
  const match = html.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\n\s*\})\s*<\/script>/);
  const pageConfig = match ? match[1] : '{}';
  const contentFile = path.join(tmp, 'page.html');
  await writeFile(contentFile, html);
  await writeFile(
    path.join(tmp, 'tailwind.config.cjs'),
    `module.exports = Object.assign(${pageConfig}, { content: [${JSON.stringify(contentFile)}] });\n`,
  );
  await writeFile(path.join(tmp, 'in.css'), '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n');
  execFileSync(
    process.execPath,
    [path.join(HERE, 'node_modules/tailwindcss/lib/cli.js'), '-c', path.join(tmp, 'tailwind.config.cjs'),
      '-i', path.join(tmp, 'in.css'), '-o', path.join(tmp, 'out.css')],
    { stdio: 'ignore' },
  );
  const css = await readFile(path.join(tmp, 'out.css'), 'utf8');
  await rm(tmp, { recursive: true, force: true });
  return `window.tailwind = window.tailwind || {};
(function () { var s = document.createElement('style'); s.setAttribute('data-offline-tailwind', '');
s.textContent = ${JSON.stringify(css)}; document.head.appendChild(s); })();`;
}

let usedOfflineTailwind = false;
async function routeTailwind(context, html) {
  await context.route(/cdn\.tailwindcss\.com/, async (route) => {
    if (!FORCE_OFFLINE_TAILWIND) {
      try {
        const response = await route.fetch({ timeout: 8000 });
        if (response.ok()) return route.fulfill({ response });
      } catch { /* CDN nicht erreichbar -> lokal */ }
    }
    offlineTailwindShim ??= await buildOfflineTailwind(html);
    usedOfflineTailwind = true;
    return route.fulfill({ status: 200, contentType: 'application/javascript', body: offlineTailwindShim });
  });
}

// ---------------------------------------------------------------------------
// Pruefungen pro Szenario (Viewport x Theme)

async function auditScenario(browser, baseUrl, html, vp, theme) {
  const scenario = `${vp.name}/${theme}`;
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    isMobile: vp.isMobile, hasTouch: vp.hasTouch, deviceScaleFactor: vp.deviceScaleFactor,
    colorScheme: theme, locale: 'de-DE',
  });
  await routeTailwind(context, html);
  await context.addInitScript((t) => { try { localStorage.setItem('werkanio-theme', t); } catch {} }, theme);
  const page = await context.newPage();

  const consoleProblems = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') consoleProblems.push(`${msg.type()}: ${msg.text()}`);
  });
  page.on('pageerror', (err) => consoleProblems.push(`pageerror: ${err.message}`));
  page.on('requestfailed', (req) => consoleProblems.push(`request failed: ${req.url()} (${req.failure()?.errorText})`));

  const t0 = Date.now();
  await page.goto(baseUrl, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  const loadMs = Date.now() - t0;

  for (const p of consoleProblems) {
    const isTailwindProdWarning = /cdn\.tailwindcss\.com should not be used in production/.test(p);
    report({
      key: `console:${p.slice(0, 120)}`,
      severity: isTailwindProdWarning ? 'moderate' : (p.startsWith('warning') ? 'minor' : 'serious'),
      category: 'Technik',
      title: isTailwindProdWarning ? 'Tailwind Play-CDN im Live-Betrieb' : 'Fehler/Warnung in der Browser-Konsole',
      detail: p,
      suggestion: isTailwindProdWarning
        ? 'Tailwind beim Deploy zu einer statischen CSS-Datei bauen statt das Play-CDN zu laden (schneller, kein Aufblitzen ungestylter Inhalte).'
        : 'Ursache in der Konsole beheben.',
      scenario,
    });
  }

  // Theme angewendet?
  const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  if (isDark !== (theme === 'dark')) {
    report({
      key: `theme-apply:${theme}`, severity: 'serious', category: 'Funktion',
      title: `Gespeichertes Theme "${theme}" wird nicht angewendet`,
      detail: `html.dark ist ${isDark}`, suggestion: 'Theme-Initialisierung pruefen.', scenario,
    });
  }

  // Screenshots
  await page.screenshot({ path: path.join(SHOTS, `${vp.name}-${theme}-fold.png`) });
  await page.screenshot({ path: path.join(SHOTS, `${vp.name}-${theme}-full.png`), fullPage: true });

  // 1) Barrierefreiheit (axe-core)
  const axe = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    // Reine Dekoration (aria-hidden) ist laut WCAG 1.4.3 vom Kontrast ausgenommen
    .exclude('[aria-hidden="true"]')
    .analyze();
  for (const v of axe.violations) {
    report({
      // Kontrast haengt vom Theme ab -> getrennt melden
      key: v.id === 'color-contrast' ? `axe:${v.id}:${theme}` : `axe:${v.id}`,
      severity: v.impact ?? 'moderate',
      category: 'Barrierefreiheit',
      title: `${v.help} (${v.id})${v.id === 'color-contrast' ? ` — ${theme === 'dark' ? 'dunkler' : 'heller'} Modus` : ''}`,
      detail: v.nodes[0]?.failureSummary?.replace(/\s+/g, ' ').trim() ?? '',
      suggestion: v.helpUrl,
      scenario,
      elements: v.nodes.slice(0, 8).map((n) => n.target.join(' ')),
    });
  }

  // 2) Layout-Messungen im Browser
  const layout = await page.evaluate(({ isMobile }) => {
    const out = { overflow: [], smallTargets: [], smallText: [], fold: {} };
    const vw = document.documentElement.clientWidth;
    const describe = (el) => {
      const txt = (el.innerText || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 40);
      const cls = (el.getAttribute('class') || '').split(/\s+/).slice(0, 3).join('.');
      return `<${el.tagName.toLowerCase()}${cls ? ' .' + cls : ''}>${txt ? ' "' + txt + '"' : ''}`;
    };
    const visible = (el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
    };

    out.pageWidth = document.documentElement.scrollWidth;
    out.viewportWidth = vw;
    if (document.documentElement.scrollWidth > vw + 1) {
      for (const el of document.body.querySelectorAll('*')) {
        const r = el.getBoundingClientRect();
        if (visible(el) && r.right > vw + 1) out.overflow.push(describe(el));
      }
    }

    // Touch-Ziele: WCAG 2.5.8 verlangt mind. 24x24, empfohlen sind 44x44
    if (isMobile) {
      for (const el of document.querySelectorAll('a[href], button, input, select, textarea, [role=button]')) {
        if (!visible(el)) continue;
        // Nur fuer Screenreader bzw. erst bei Fokus sichtbar (Skip-Link)
        if (el.getBoundingClientRect().width <= 1 && el.getBoundingClientRect().height <= 1) continue;
        // Ausnahme laut WCAG 2.5.8: Links mitten im Fliesstext
        const parentText = (el.parentElement?.innerText || '').trim();
        if (getComputedStyle(el).display === 'inline' && parentText.length > el.innerText.trim().length + 20) continue;
        const r = el.getBoundingClientRect();
        const min = Math.min(r.width, r.height);
        if (min < 44) out.smallTargets.push({ el: describe(el), w: Math.round(r.width), h: Math.round(r.height) });
      }
    }

    // Sehr kleine Schrift
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.textContent.trim()) continue;
      const el = node.parentElement;
      if (!el || seen.has(el) || !visible(el)) continue;
      seen.add(el);
      const size = parseFloat(getComputedStyle(el).fontSize);
      if (size < 12 && !el.closest('.sr-only')) out.smallText.push({ el: describe(el), size });
    }

    // Was sieht man ohne zu scrollen?
    const vh = window.innerHeight;
    const h1 = document.querySelector('h1');
    out.fold.h1Visible = !!h1 && h1.getBoundingClientRect().top < vh;
    const ctas = [...document.querySelectorAll('a, button')].filter((a) => /demo/i.test(a.innerText));
    out.fold.ctaVisible = ctas.some((a) => visible(a) && a.getBoundingClientRect().bottom <= vh);
    out.fold.firstCtaTop = ctas.length ? Math.round(ctas[0].getBoundingClientRect().top) : null;
    return out;
  }, { isMobile: vp.isMobile });

  if (layout.overflow.length) {
    report({
      key: 'layout:overflow', severity: 'serious', category: 'Layout',
      title: 'Seite scrollt horizontal',
      detail: `Seitenbreite ${layout.pageWidth}px bei ${layout.viewportWidth}px Viewport.`,
      suggestion: 'Ueberstehende Elemente umbrechen lassen oder begrenzen.',
      scenario, elements: layout.overflow.slice(0, 8),
    });
  }
  const tiny = layout.smallTargets.filter((t) => Math.min(t.w, t.h) < 24);
  const small = layout.smallTargets.filter((t) => Math.min(t.w, t.h) >= 24);
  if (tiny.length) {
    report({
      key: 'touch:tiny', severity: 'serious', category: 'Touch',
      title: 'Touch-Ziele kleiner als 24px (WCAG 2.5.8)',
      detail: 'Diese Links/Buttons sind auf dem Handy schwer zu treffen.',
      suggestion: 'Mindestens 44x44px Trefferflaeche (z. B. mit Padding) geben.',
      scenario, elements: tiny.map((t) => `${t.el} — ${t.w}x${t.h}px`),
    });
  }
  if (small.length) {
    report({
      key: 'touch:small', severity: 'minor', category: 'Touch',
      title: 'Touch-Ziele kleiner als empfohlene 44px',
      detail: 'Empfehlung von Apple/Google: 44–48px Trefferflaeche.',
      suggestion: 'Padding bzw. min-height erhoehen.',
      scenario, elements: small.map((t) => `${t.el} — ${t.w}x${t.h}px`),
    });
  }
  if (layout.smallText.length) {
    report({
      key: 'text:small', severity: 'minor', category: 'Lesbarkeit',
      title: 'Schrift kleiner als 12px',
      detail: 'Sehr kleine Schrift ist vor allem auf dem Handy schwer lesbar.',
      suggestion: 'Mindestens 12px, fuer Fliesstext besser 14–16px.',
      scenario, elements: layout.smallText.map((t) => `${t.el} — ${t.size}px`),
    });
  }
  if (!layout.fold.ctaVisible) {
    report({
      key: `fold:cta:${vp.name}`, severity: 'moderate', category: 'Conversion',
      title: `Kein "Demo"-Button ohne Scrollen sichtbar (${vp.name})`,
      detail: `Erster Demo-Button beginnt bei ${layout.fold.firstCtaTop}px, Viewport-Hoehe ${vp.height}px.`,
      suggestion: 'Hero kompakter machen oder Haupt-CTA hoeher platzieren.',
      scenario,
    });
  }

  await context.close();
  return { scenario, loadMs, axeViolations: axe.violations.length, axePasses: axe.passes.length };
}

// ---------------------------------------------------------------------------
// Interaktionen: einmal wie ein echter Nutzer durchklicken

async function auditInteractions(browser, baseUrl, html) {
  // --- Desktop ---------------------------------------------------------------
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 }, locale: 'de-DE' });
  await routeTailwind(context, html);
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: 'load' });

  // Meta / Grundlagen
  const meta = await page.evaluate(() => ({
    title: document.title,
    lang: document.documentElement.lang,
    description: document.querySelector('meta[name=description]')?.content ?? '',
    viewport: document.querySelector('meta[name=viewport]')?.content ?? '',
    favicon: !!document.querySelector('link[rel~=icon]'),
    ogTitle: !!document.querySelector('meta[property="og:title"]'),
    ogImage: !!document.querySelector('meta[property="og:image"]'),
    canonical: !!document.querySelector('link[rel=canonical]'),
    main: !!document.querySelector('main'),
    skipLink: !![...document.querySelectorAll('a[href^="#"]')].find((a) => /inhalt|content|springen/i.test(a.textContent)),
    headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => `${h.tagName} ${h.textContent.trim().replace(/\s+/g, ' ').slice(0, 50)}`),
  }));
  if (!meta.favicon) report({ key: 'meta:favicon', severity: 'minor', category: 'Vertrauen', title: 'Kein Favicon', detail: 'Im Browser-Tab und in Lesezeichen erscheint ein generisches Symbol.', suggestion: 'SVG-Favicon mit dem Blitz-Logo einbinden.' });
  if (!meta.ogTitle) report({ key: 'meta:og', severity: 'minor', category: 'Vertrauen', title: 'Keine Open-Graph-Angaben', detail: 'Beim Teilen per WhatsApp/LinkedIn erscheint keine ordentliche Vorschau.', suggestion: 'og:title, og:description, og:image (1200x630) ergaenzen.' });
  else if (!meta.ogImage) report({ key: 'meta:og-image', severity: 'minor', category: 'Vertrauen', title: 'Kein Vorschaubild (og:image)', detail: 'Beim Teilen per WhatsApp/LinkedIn erscheint die Vorschau ohne Bild.', suggestion: 'Vorschaubild 1200x630 (Logo + Claim) anlegen und als og:image einbinden.' });
  if (!meta.main) report({ key: 'meta:main', severity: 'moderate', category: 'Barrierefreiheit', title: 'Kein <main>-Bereich', detail: 'Screenreader koennen nicht direkt zum Hauptinhalt springen.', suggestion: 'Inhalt zwischen Navigation und Footer in <main> fassen.' });
  if (!meta.skipLink) report({ key: 'meta:skip', severity: 'minor', category: 'Barrierefreiheit', title: 'Kein "Zum Inhalt springen"-Link', detail: 'Tastaturnutzer muessen erst durch die ganze Navigation tabben.', suggestion: 'Versteckten Skip-Link als erstes Element, sichtbar bei Fokus.' });

  // Links pruefen
  const links = await page.$$eval('a', (as) => as.map((a) => ({
    href: a.getAttribute('href') ?? '', abs: a.href, text: a.innerText.trim().replace(/\s+/g, ' '),
    target: a.getAttribute('target'),
  })));
  const dead = links.filter((l) => l.href === '#' || l.href === '');
  if (dead.length) {
    report({
      key: 'links:placeholder', severity: 'serious', category: 'Vertrauen / Recht',
      title: 'Platzhalter-Links ohne Ziel',
      detail: 'Diese Links fuehren nirgendwohin. Impressum und Datenschutzerklaerung sind in Deutschland Pflicht (DDG §5, DSGVO Art. 13).',
      suggestion: 'Echte Seiten fuer Impressum/Datenschutz anlegen und verlinken.',
      elements: dead.map((l) => `"${l.text}" -> href="${l.href}"`),
    });
  }
  for (const l of links.filter((l) => l.href.startsWith('#') && l.href.length > 1)) {
    const exists = await page.$(l.href);
    if (!exists) report({ key: `links:anchor:${l.href}`, severity: 'serious', category: 'Funktion', title: `Anker ${l.href} existiert nicht`, detail: `Link "${l.text}"`, suggestion: 'Passende id setzen.' });
  }
  const mailtos = links.filter((l) => l.href.startsWith('mailto:'));
  const ctaMailto = mailtos.filter((l) => /demo/i.test(l.text));
  if (ctaMailto.length && ctaMailto.length === links.filter((l) => /demo/i.test(l.text)).length) {
    report({
      key: 'cta:mailto', severity: 'moderate', category: 'Conversion',
      title: 'Alle "Demo vereinbaren"-Buttons oeffnen nur das Mailprogramm',
      detail: `${ctaMailto.length} CTAs sind mailto:-Links. Auf Geraeten ohne eingerichtetes Mailprogramm (viele Desktop-PCs, Webmail-Nutzer) passiert beim Klick scheinbar nichts; es gibt keine Telefonnummer und kein Formular.`,
      suggestion: 'Alternative anbieten: Telefonnummer (tel:), Kalender-Buchung oder kurzes Formular; E-Mail-Adresse zusaetzlich sichtbar anzeigen.',
    });
  }
  // Unterseiten (impressum.html, datenschutz.html …) muessen existieren
  const internal = [...new Set(links.filter((l) => !/^(https?:|mailto:|tel:|#)/.test(l.href) && l.href).map((l) => l.href.split('#')[0]))];
  for (const rel of internal) {
    const exists = await readFile(path.join(ROOT, rel)).then(() => true, () => false);
    if (!exists && !argValue('--url')) report({ key: `links:internal:${rel}`, severity: 'serious', category: 'Funktion', title: `Unterseite ${rel} fehlt`, detail: 'Der Link fuehrt wegen der Rewrite-Regel stillschweigend auf die Startseite.', suggestion: 'Datei anlegen oder Link korrigieren.' });
  }
  // Platzhalter in Unterseiten (z. B. Impressum) sind vor dem Livegang zu ersetzen
  for (const rel of internal.filter((r) => r.endsWith('.html'))) {
    const sub = await readFile(path.join(ROOT, rel), 'utf8').catch(() => '');
    const n = (sub.match(/PLATZHALTER/g) || []).length;
    if (n) report({ key: `content:placeholder:${rel}`, severity: 'serious', category: 'Vertrauen / Recht', title: `${rel} enthaelt noch ${n} Platzhalter`, detail: 'Unvollstaendige Rechtstexte wirken unserioes und koennen abgemahnt werden.', suggestion: 'Alle PLATZHALTER mit den echten Angaben ersetzen und den Hinweiskasten entfernen.' });
  }

  const external = [...new Set(links.filter((l) => /^https?:/.test(l.href)).map((l) => l.abs))];
  for (const url of external) {
    try {
      const res = await context.request.get(url, { timeout: 10000, maxRedirects: 5 });
      if (res.status() === 401 || res.status() === 403) {
        report({ key: `links:denied:${url}`, severity: 'info', category: 'Funktion', title: `Externer Link antwortet mit ${res.status()}`, detail: url, suggestion: 'Manuell im Browser pruefen — oft Bot-Schutz oder die Netzwerk-Sandbox der Testumgebung.' });
      } else if (res.status() >= 400) report({ key: `links:broken:${url}`, severity: 'serious', category: 'Funktion', title: `Externer Link liefert ${res.status()}`, detail: url, suggestion: 'Link korrigieren.' });
    } catch (e) {
      report({ key: `links:unreachable:${url}`, severity: 'info', category: 'Funktion', title: 'Externer Link aus der Testumgebung nicht erreichbar', detail: `${url} — ${e.message.split('\n')[0]}`, suggestion: 'Manuell pruefen (kann an der Netzwerk-Sandbox liegen).' });
    }
  }

  // Anker-Navigation: verdeckt die fixe Navigation die Ueberschrift?
  const navLink = page.locator('nav a[href^="#"]').first();
  if (await navLink.count()) {
    const href = await navLink.getAttribute('href');
    await navLink.click();
    await page.waitForTimeout(800);
    const overlap = await page.evaluate((sel) => {
      const nav = document.querySelector('nav');
      const target = document.querySelector(sel);
      const heading = target.querySelector('h1,h2,h3') ?? target;
      return { navBottom: nav.getBoundingClientRect().bottom, headingTop: heading.getBoundingClientRect().top, targetTop: target.getBoundingClientRect().top, hash: location.hash };
    }, href);
    if (overlap.headingTop < overlap.navBottom) {
      report({ key: 'nav:anchor-overlap', severity: 'moderate', category: 'Layout', title: `Sticky-Navigation verdeckt Sprungziel ${href}`, detail: JSON.stringify(overlap), suggestion: 'scroll-margin-top bzw. scroll-padding-top in Hoehe der Navigation setzen.' });
    }
    const smooth = await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
    if (smooth !== 'smooth') report({ key: 'nav:smooth', severity: 'info', category: 'Komfort', title: 'Sprung zu Abschnitten ohne weiches Scrollen', detail: 'Der Sprung zu "Preise" ist abrupt, Orientierung geht leicht verloren.', suggestion: 'scroll-behavior: smooth (mit prefers-reduced-motion-Ausnahme).' });
  }

  // Tabs (z. B. Werkstatt / Autohandel): Klick muss das passende Panel zeigen
  const tabs = page.locator('[role=tab]');
  for (let i = 0; i < await tabs.count(); i++) {
    const tab = tabs.nth(i);
    const panelId = await tab.getAttribute('aria-controls');
    await tab.click();
    const state = await page.evaluate((id) => {
      const panel = document.getElementById(id);
      const others = [...document.querySelectorAll('[role=tabpanel]')].filter((p) => p !== panel);
      const shown = (el) => !!el && el.getBoundingClientRect().height > 0;
      return { shown: shown(panel), othersHidden: others.every((o) => !shown(o)) };
    }, panelId);
    const selected = await tab.getAttribute('aria-selected');
    if (!state.shown || !state.othersHidden || selected !== 'true') {
      report({ key: `tabs:${panelId}`, severity: 'serious', category: 'Funktion', title: `Tab "${(await tab.innerText()).trim()}" zeigt nicht das richtige Panel`, detail: JSON.stringify({ ...state, selected }), suggestion: 'Tab-Logik pruefen.' });
    }
  }
  if (await tabs.count()) {
    // Pfeiltasten-Navigation laut ARIA-Pattern
    await tabs.first().click();
    await page.keyboard.press('ArrowRight');
    const moved = await page.evaluate(() => document.activeElement?.getAttribute('role') === 'tab' && document.activeElement !== document.querySelector('[role=tab]'));
    if (!moved) report({ key: 'tabs:arrows', severity: 'minor', category: 'Barrierefreiheit', title: 'Tabs lassen sich nicht mit den Pfeiltasten wechseln', detail: 'Laut ARIA-Tabs-Muster erwarten Tastatur- und Screenreader-Nutzer Pfeil links/rechts.', suggestion: 'keydown-Handler fuer ArrowLeft/ArrowRight/Home/End ergaenzen.' });
  }

  // Theme-Umschalter
  await page.goto(baseUrl, { waitUntil: 'load' });
  const toggle = page.locator('#theme-toggle');
  if (await toggle.count()) {
    const before = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    const labelBefore = await toggle.getAttribute('aria-label');
    await toggle.click();
    const after = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    const labelAfter = await toggle.getAttribute('aria-label');
    if (before === after) report({ key: 'theme:toggle', severity: 'critical', category: 'Funktion', title: 'Theme-Umschalter wirkt nicht', detail: '', suggestion: 'Klick-Handler pruefen.' });
    if (labelBefore === labelAfter) report({ key: 'theme:label', severity: 'minor', category: 'Barrierefreiheit', title: 'Beschriftung des Theme-Umschalters aendert sich nicht', detail: labelAfter ?? '', suggestion: 'aria-label nach Klick aktualisieren.' });
    await page.reload({ waitUntil: 'load' });
    const persisted = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    if (persisted !== after) report({ key: 'theme:persist', severity: 'moderate', category: 'Funktion', title: 'Theme-Wahl bleibt nach Neuladen nicht erhalten', detail: '', suggestion: 'localStorage pruefen.' });
  }

  // Tastatur: Tab durch alle Elemente, ist der Fokus sichtbar?
  await page.goto(baseUrl, { waitUntil: 'load' });
  const focusable = await page.$$eval('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])', (els) => els.length);
  const noFocusStyle = [];
  const order = [];
  for (let i = 0; i < focusable; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      const hasOutline = cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0;
      const hasRing = cs.boxShadow && cs.boxShadow !== 'none';
      const txt = (el.innerText || el.getAttribute('aria-label') || el.getAttribute('href') || '').trim().replace(/\s+/g, ' ').slice(0, 40);
      return { tag: el.tagName.toLowerCase(), txt, visibleFocus: hasOutline || hasRing, outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}` };
    });
    if (!info) break;
    order.push(`${info.tag} "${info.txt}"`);
    if (!info.visibleFocus) noFocusStyle.push(`${info.tag} "${info.txt}"`);
  }
  if (noFocusStyle.length) {
    report({ key: 'kbd:focus', severity: 'serious', category: 'Barrierefreiheit', title: 'Kein sichtbarer Tastatur-Fokus', detail: 'Beim Tabben ist nicht erkennbar, welches Element aktiv ist.', suggestion: 'focus-visible:ring-2 focus-visible:ring-orange-500 o. ae. ergaenzen.', elements: noFocusStyle });
  }
  await context.close();

  // --- Mobile: Navigation auf kleinem Display --------------------------------
  const mctx = await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, locale: 'de-DE' });
  await routeTailwind(mctx, html);
  const mpage = await mctx.newPage();
  await mpage.goto(baseUrl, { waitUntil: 'load' });
  const navFit = await mpage.evaluate(() => {
    const nav = document.querySelector('nav > div');
    const items = [...nav.querySelectorAll('a, button, span')];
    const wrapped = items.some((el) => el.getBoundingClientRect().height > 48);
    // Abstand zwischen den direkten Bloecken (Logo | Links)
    const blocks = [...nav.children].map((c) => c.getBoundingClientRect());
    let minGap = Infinity;
    for (let i = 1; i < blocks.length; i++) minGap = Math.min(minGap, blocks[i].left - blocks[i - 1].right);
    // und zwischen den Eintraegen innerhalb der Link-Gruppe
    const group = nav.children[nav.children.length - 1];
    const inner = [...group.children].filter((c) => c.getBoundingClientRect().width > 0).map((c) => c.getBoundingClientRect());
    // Innerhalb der Gruppe reichen 4px, wenn die Ziele selbst gross genug sind
    for (let i = 1; i < inner.length; i++) minGap = Math.min(minGap, inner[i].left - inner[i - 1].right + 4);
    return { navHeight: nav.getBoundingClientRect().height, scrollW: nav.scrollWidth, clientW: nav.clientWidth, wrapped, minGap: Math.round(minGap) };
  });
  if (navFit.minGap < 8) {
    report({ key: 'nav:mobile-crowded', severity: 'minor', category: 'Layout', title: 'Navigation auf 360px-Handys gedraengt', detail: `Kleinster Abstand zwischen Eintraegen: ${navFit.minGap}px — Logo und Links kleben aneinander.`, suggestion: 'Mindestabstand (gap) zwischen Logo und Links setzen, ggf. Logo auf kleinen Screens verkleinern.' });
  }
  if (navFit.scrollW > navFit.clientW + 1 || navFit.wrapped) {
    report({ key: 'nav:mobile-fit', severity: 'moderate', category: 'Layout', title: 'Navigation passt auf 360px-Handys nicht', detail: JSON.stringify(navFit), suggestion: 'Abstaende/Schrift in der Navigation fuer kleine Screens reduzieren.' });
  }
  await mpage.screenshot({ path: path.join(SHOTS, 'mobile360-nav.png'), clip: { x: 0, y: 0, width: 360, height: 120 } });
  await mctx.close();

  return { meta, tabOrder: order, externalLinks: external };
}

// ---------------------------------------------------------------------------
// Statische Checks am Quelltext

function staticChecks(html, ownCss = '') {
  if (/cdn\.tailwindcss\.com/.test(html)) {
    report({
      key: 'static:tailwind-cdn', severity: 'moderate', category: 'Performance',
      title: 'Tailwind wird zur Laufzeit im Browser kompiliert (Play-CDN)',
      detail: 'Das Play-CDN (~400 KB JS) blockiert das Rendern und ist laut Tailwind nicht fuer Produktion gedacht. Faellt das CDN aus, ist die Seite ungestylt.',
      suggestion: 'Tailwind CLI im Build ausfuehren und eine kleine statische CSS-Datei ausliefern.',
    });
  }
  // Eigenes CSS (src/input.css) gehoert mit dazu, falls vorhanden
  if (!/prefers-reduced-motion/.test(html + ownCss) && /transition|animation/.test(html)) {
    report({ key: 'static:reduced-motion', severity: 'info', category: 'Barrierefreiheit', title: 'Keine Beruecksichtigung von prefers-reduced-motion', detail: '', suggestion: 'Animationen/weiches Scrollen bei reduzierter Bewegung abschalten.' });
  }
  if (!/tel:/.test(html)) {
    report({ key: 'static:no-phone', severity: 'moderate', category: 'Conversion', title: 'Keine Telefonnummer auf der Seite', detail: 'Ausgerechnet ein Telefon-Assistent bietet keinen Anruf an — Werkstattinhaber greifen eher zum Telefon als zur Mail.', suggestion: 'Telefonnummer als tel:-Link in Hero/CTA/Footer — idealerweise direkt mit Sarah als Live-Demo ("Ruf Sarah an").' });
  }
}

// ---------------------------------------------------------------------------

function renderReport({ scenarios, interactions, startedAt, target }) {
  const list = [...findings.values()].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
  const counts = Object.fromEntries(Object.keys(SEVERITY_ORDER).map((s) => [s, list.filter((f) => f.severity === s).length]));
  const icon = { critical: '🟥', serious: '🟧', moderate: '🟨', minor: '🟦', info: '⬜' };
  let md = `# Usability-Report\n\n`;
  md += `- Ziel: ${target}\n- Zeitpunkt: ${startedAt}\n- Szenarien: ${scenarios.map((s) => s.scenario).join(', ')}\n`;
  if (usedOfflineTailwind) md += `- Hinweis: Tailwind-CDN war nicht erreichbar, Styles wurden lokal nachgebaut.\n`;
  md += `\n| Schwere | Anzahl |\n|---|---|\n`;
  for (const [s, n] of Object.entries(counts)) md += `| ${icon[s]} ${s} | ${n} |\n`;
  md += `\n## Befunde\n`;
  list.forEach((f, i) => {
    md += `\n### ${i + 1}. ${icon[f.severity]} [${f.category}] ${f.title}\n\n`;
    if (f.detail) md += `${f.detail}\n\n`;
    if (f.suggestion) md += `**Vorschlag:** ${f.suggestion}\n\n`;
    if (f.scenarios.length) md += `_Szenarien:_ ${f.scenarios.join(', ')}\n\n`;
    if (f.elements.length) md += f.elements.slice(0, 10).map((e) => `- \`${e}\``).join('\n') + (f.elements.length > 10 ? `\n- … und ${f.elements.length - 10} weitere` : '') + '\n';
  });
  md += `\n## Szenarien\n\n| Szenario | Ladezeit | axe-Verstoesse | axe bestanden |\n|---|---|---|---|\n`;
  for (const s of scenarios) md += `| ${s.scenario} | ${s.loadMs} ms | ${s.axeViolations} | ${s.axePasses} |\n`;
  md += `\n## Ueberschriften-Struktur\n\n${interactions.meta.headings.map((h) => `- ${h}`).join('\n')}\n`;
  md += `\n## Tab-Reihenfolge\n\n${interactions.tabOrder.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n`;
  md += `\n## Screenshots\n\nIm Ordner \`screenshots/\`: \`<viewport>-<theme>-fold.png\` (ohne Scrollen) und \`-full.png\` (ganze Seite).\n`;
  return { md, list, counts };
}

async function main() {
  const startedAt = new Date().toISOString();
  await rm(OUT, { recursive: true, force: true });
  await mkdir(SHOTS, { recursive: true });

  const html = await readFile(path.join(ROOT, 'index.html'), 'utf8');
  let server;
  let target = argValue('--url');
  if (!target) ({ server, url: target } = await startServer());

  const browser = await chromium.launch();
  try {
    staticChecks(html, await readFile(path.join(ROOT, 'src/input.css'), 'utf8').catch(() => ''));
    const scenarios = [];
    for (const vp of VIEWPORTS) for (const theme of THEMES) {
      process.stdout.write(`> ${vp.name}/${theme} … `);
      const r = await auditScenario(browser, target, html, vp, theme);
      scenarios.push(r);
      console.log(`${r.axeViolations} axe-Verstoesse`);
    }
    console.log('> Interaktionen (Links, Theme, Tastatur, Navigation) …');
    const interactions = await auditInteractions(browser, target, html);

    const { md, list, counts } = renderReport({ scenarios, interactions, startedAt, target: argValue('--url') ?? 'lokale index.html' });
    await writeFile(path.join(OUT, 'REPORT.md'), md);
    await writeFile(path.join(OUT, 'findings.json'), JSON.stringify({ startedAt, counts, findings: list, scenarios, interactions }, null, 2));
    console.log(`\nBefunde: ${JSON.stringify(counts)}`);
    console.log(`Report:  ${path.relative(process.cwd(), path.join(OUT, 'REPORT.md'))}`);
    process.exitCode = counts.critical > 0 ? 1 : 0;
  } finally {
    await browser.close();
    server?.close();
  }
}

main().catch((e) => { console.error(e); process.exit(2); });
