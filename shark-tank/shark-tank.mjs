#!/usr/bin/env node
// Shark Tank: vier KI-Agenten prüfen dein Projekt – Idee UND Programmstand.
//
//   Phase 1 – Prüfung:   Partner, Kritiker und Investor lesen den Pitch und den
//                        Code des Projekts und schreiben je einen Prüfbericht
//                        aus ihrer Perspektive.
//   Phase 2 – Diskussion: Die drei diskutieren miteinander über ihre Befunde.
//   Phase 3 – Urteil:    Der Richter entscheidet, ob weitergemacht wird.
//
//   🟢 Partner   – steht auf deiner Seite und verteidigt das Projekt
//   🔴 Kritiker  – zeigt alles, was gegen das Projekt spricht
//   💰 Investor  – prüft, ob er Geld reinstecken würde
//   ⚖️  Richter   – entscheidet am Ende: weitermachen oder nicht
//
// Start:  node shark-tank.mjs --projekt ../pfad/zur/app [--pitch pitch.md] [--runden 2] [--ohne-mich]

import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { execFileSync } from "node:child_process";
import { stdin, stdout } from "node:process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const MODEL = "claude-opus-5";

// ---------- Argumente ----------

function option(name, standard) {
  const i = process.argv.indexOf(name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : standard;
}
const RUNDEN = Math.max(1, parseInt(option("--runden", "2"), 10) || 2);
const PITCH_DATEI = path.resolve(option("--pitch", path.join(here, "pitch.md")));
const PROJEKT = path.resolve(option("--projekt", path.join(here, "..")));
const OHNE_MICH = process.argv.includes("--ohne-mich");

// ---------- Werkzeuge: Lesezugriff auf den Projektordner ----------

const IGNORIEREN = new Set(["node_modules", ".git", ".next", "dist", "build", ".vercel", ".turbo", "coverage", "protokolle"]);
// Geheimnisse bekommen die Agenten nie zu sehen.
const GEHEIM = /(^\.env)|secret|\.pem$|\.key$|credentials/i;

function sichererPfad(rel = ".") {
  const voll = path.resolve(PROJEKT, rel);
  if (voll !== PROJEKT && !voll.startsWith(PROJEKT + path.sep)) {
    throw new Error("Pfad liegt außerhalb des Projekts.");
  }
  if (voll.split(path.sep).some((teil) => GEHEIM.test(teil))) {
    throw new Error("Diese Datei enthält vermutlich Geheimnisse und darf nicht gelesen werden.");
  }
  return voll;
}

function dateienAuflisten({ pfad = ".", tiefe = 2 }) {
  const start = sichererPfad(pfad);
  const zeilen = [];
  const lauf = (dir, ebene) => {
    if (zeilen.length > 400) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      if (IGNORIEREN.has(e.name) || GEHEIM.test(e.name)) continue;
      const rel = path.relative(PROJEKT, path.join(dir, e.name));
      if (e.isDirectory()) {
        zeilen.push(`${rel}/`);
        if (ebene < tiefe) lauf(path.join(dir, e.name), ebene + 1);
      } else {
        zeilen.push(`${rel}  (${fs.statSync(path.join(dir, e.name)).size} B)`);
      }
    }
  };
  lauf(start, 1);
  return zeilen.join("\n") || "(leer)";
}

function dateiLesen({ pfad, von_zeile = 1, bis_zeile = 400 }) {
  const text = fs.readFileSync(sichererPfad(pfad), "utf8");
  const alle = text.split("\n");
  const von = Math.max(1, von_zeile);
  const bis = Math.min(alle.length, bis_zeile, von + 599);
  const teil = alle.slice(von - 1, bis).map((z, i) => `${von + i}\t${z}`).join("\n");
  return `${pfad} (Zeilen ${von}-${bis} von ${alle.length})\n${teil}`.slice(0, 60000);
}

function suchen({ muster, pfad = "." }) {
  const re = new RegExp(muster, "i");
  const treffer = [];
  const lauf = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (treffer.length >= 80) return;
      if (IGNORIEREN.has(e.name) || GEHEIM.test(e.name)) continue;
      const voll = path.join(dir, e.name);
      if (e.isDirectory()) { lauf(voll); continue; }
      if (fs.statSync(voll).size > 500_000) continue;
      const text = fs.readFileSync(voll, "utf8");
      if (text.includes("\u0000")) continue; // Binärdatei
      text.split("\n").forEach((z, i) => {
        if (treffer.length < 80 && re.test(z)) {
          treffer.push(`${path.relative(PROJEKT, voll)}:${i + 1}: ${z.trim().slice(0, 200)}`);
        }
      });
    }
  };
  const start = sichererPfad(pfad);
  fs.statSync(start).isDirectory() ? lauf(start) : lauf(path.dirname(start));
  return treffer.join("\n") || "Keine Treffer.";
}

function gitVerlauf({ anzahl = 30 }) {
  try {
    return execFileSync("git", ["-C", PROJEKT, "log", `-${Math.min(anzahl, 100)}`, "--date=short", "--pretty=format:%ad %s"], { encoding: "utf8" });
  } catch {
    return "Kein Git-Verlauf verfügbar.";
  }
}

const WERKZEUGE = [
  {
    name: "dateien_auflisten",
    description: "Listet Dateien und Ordner im Projekt auf (mit Größe). Nutze das zuerst, um dir einen Überblick über den Programmstand zu verschaffen.",
    input_schema: {
      type: "object",
      properties: {
        pfad: { type: "string", description: "Ordner relativ zum Projekt, Standard '.'" },
        tiefe: { type: "integer", description: "Wie viele Ebenen tief, Standard 2" },
      },
    },
  },
  {
    name: "datei_lesen",
    description: "Liest eine Datei aus dem Projekt mit Zeilennummern. Große Dateien in Abschnitten lesen.",
    input_schema: {
      type: "object",
      properties: {
        pfad: { type: "string", description: "Datei relativ zum Projekt" },
        von_zeile: { type: "integer" },
        bis_zeile: { type: "integer" },
      },
      required: ["pfad"],
    },
  },
  {
    name: "suchen",
    description: "Durchsucht alle Textdateien im Projekt nach einem regulären Ausdruck (ohne Groß-/Kleinschreibung). Gibt Datei:Zeile zurück.",
    input_schema: {
      type: "object",
      properties: {
        muster: { type: "string" },
        pfad: { type: "string", description: "Ordner relativ zum Projekt, Standard '.'" },
      },
      required: ["muster"],
    },
  },
  {
    name: "git_verlauf",
    description: "Zeigt die letzten Commits (Datum und Nachricht), um Tempo und Richtung der Entwicklung einzuschätzen.",
    input_schema: {
      type: "object",
      properties: { anzahl: { type: "integer", description: "Standard 30" } },
    },
  },
];

const AUSFUEHREN = {
  dateien_auflisten: dateienAuflisten,
  datei_lesen: dateiLesen,
  suchen,
  git_verlauf: gitVerlauf,
};

// ---------- Rollen ----------

const GEMEINSAM = `Du bist Teil einer Verhandlung im Stil von "Die Höhle der Löwen" / "Shark Tank".
Ein Gründer stellt sein Projekt vor. Es gibt vier Rollen: PARTNER, KRITIKER, INVESTOR, RICHTER.
Du hast Lesezugriff auf den Code des Projekts (Werkzeuge: dateien_auflisten, datei_lesen,
suchen, git_verlauf). Behauptungen über den Programmstand belegst du mit Dateiverweisen
(z. B. src/app/page.tsx:42). Erfinde nichts: Was du nicht im Code gefunden hast, bezeichnest
du als "nicht gefunden".
Antworte immer auf Deutsch, direkt und konkret, ohne Floskeln. Bleib in deiner Rolle.`;

const AGENTEN = {
  partner: {
    name: "🟢 PARTNER",
    farbe: "\x1b[32m",
    system: `${GEMEINSAM}

Du bist der PARTNER. Du stehst auf der Seite des Gründers – ihr seid ein Team.
Du verteidigst das Projekt mit den stärksten echten Argumenten: Markt, Kundennutzen,
was im Code schon funktioniert, Vorteile gegenüber Alternativen. Du entkräftest die
Angriffe des Kritikers Punkt für Punkt, gern mit Belegen aus dem Code.
Du bist leidenschaftlich, aber ehrlich: Wenn ein Einwand berechtigt ist, gib es zu und
zeig, wie man das Problem löst.`,
  },
  kritiker: {
    name: "🔴 KRITIKER",
    farbe: "\x1b[31m",
    system: `${GEMEINSAM}

Du bist der KRITIKER – der Advocatus Diaboli. Deine Aufgabe ist es, alles zu zeigen,
was gegen das Projekt spricht, und zu begründen, warum es Blödsinn sein könnte.
Bei der Idee: Konkurrenz, Zahlungsbereitschaft der Zielgruppe, Vertrieb, rechtliche
Risiken (DSGVO, Haftung, Telefonaufzeichnung), Abhängigkeit von Anbietern, Timing.
Beim Programm: fehlende oder halbfertige Funktionen, Versprechen auf der Webseite,
die der Code nicht hält, Sicherheitslücken, fehlende Tests, Technik-Schulden.
Greif hart, aber sachlich an – keine Beleidigungen, nur Argumente und Belege.`,
  },
  investor: {
    name: "💰 INVESTOR",
    farbe: "\x1b[33m",
    system: `${GEMEINSAM}

Du bist der INVESTOR – ein erfahrener, nüchterner Business Angel. Dir geht es nur um eins:
Bekomme ich mein Geld mehrfach zurück? Du denkst in Marktgröße, Kundengewinnungskosten,
Kundenwert, Marge, laufenden Kosten (z. B. Telefonie- und KI-Kosten pro Minute),
Skalierbarkeit und Wettbewerbsvorteil. Beim Code interessiert dich: Ist das ein echtes,
verkaufbares Produkt oder ein Prototyp? Wie viel Arbeit bis zum zahlenden Kunden?
Sag immer ehrlich, wie nah du gerade an einem Deal bist (in Prozent).`,
  },
  richter: {
    name: "⚖️  RICHTER",
    farbe: "\x1b[35m",
    system: `${GEMEINSAM}

Du bist der RICHTER. Du hast die Prüfberichte und die ganze Diskussion verfolgt und
entscheidest unabhängig und ohne Rücksicht auf Gefühle, ob das Projekt weitergeführt wird.
Wäge die Argumente fair ab. Belohne keine Rhetorik, sondern Fakten. Wenn sich Partner und
Kritiker über den Programmstand widersprechen, prüfe es selbst im Code nach.

Gib dein Urteil exakt in diesem Format aus:

URTEIL: WEITERMACHEN | WEITERMACHEN MIT ÄNDERUNGEN | STOPPEN
(genau eine der drei Optionen)

Begründung: 3–5 Sätze.

Programmstand in einem Satz: ...

Stärkste Argumente dafür:
- ...

Stärkste Argumente dagegen:
- ...

Offene Streitpunkte, die ich im Code nachgeprüft habe:
- ... (wer hatte recht, mit Beleg)

Punkte (0–10): Idee _, Markt _, Programmstand _, Geschäftsmodell _, Risiko _ (10 = geringes Risiko), Gesamt _

Die nächsten 3 Schritte (konkret, in den nächsten 30 Tagen umsetzbar):
1. ...
2. ...
3. ...`,
  },
};

// ---------- Ablauf ----------

const RESET = "\x1b[0m";
const GRAU = "\x1b[90m";
const FETT = "\x1b[1m";

const client = new Anthropic();
const rl = readline.createInterface({ input: stdin, output: stdout });
const zeilen = rl[Symbol.asyncIterator]();
const protokoll = [];

function protokollText() {
  return protokoll.map((e) => `### ${e.wer}\n${e.text}`).join("\n\n");
}

function werkzeugAufrufen(block) {
  try {
    return { type: "tool_result", tool_use_id: block.id, content: String(AUSFUEHREN[block.name](block.input ?? {})) };
  } catch (err) {
    return { type: "tool_result", tool_use_id: block.id, content: `Fehler: ${err.message}`, is_error: true };
  }
}

// Ein Agent arbeitet mit dem Protokoll und darf dabei den Code lesen.
// live = true: Text wird direkt ins Terminal gestreamt.
// live = false: nur kurze Fortschrittszeilen (für parallele Prüfung).
async function agentLauf(key, auftrag, { maxWerkzeugRunden, live }) {
  const agent = AGENTEN[key];
  const messages = [
    { role: "user", content: `PITCH UND PROTOKOLL BISHER:\n\n${protokollText()}\n\n---\nDEIN AUFTRAG JETZT: ${auftrag}` },
  ];
  if (live) stdout.write(`\n${agent.farbe}${FETT}${agent.name}${RESET}\n${agent.farbe}`);

  for (let runde = 0; ; runde++) {
    const letzteRunde = runde >= maxWerkzeugRunden;
    const stream = client.messages.stream({
      model: MODEL,
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      system: agent.system,
      tools: WERKZEUGE,
      // In der letzten Runde keine Werkzeuge mehr – jetzt muss geantwortet werden.
      tool_choice: letzteRunde ? { type: "none" } : { type: "auto" },
      messages,
    });
    if (live) stream.on("text", (t) => stdout.write(t));
    const msg = await stream.finalMessage();

    if (msg.stop_reason === "refusal") return fertig(agent, "(Der Agent hat diese Antwort abgelehnt.)", live);

    const aufrufe = msg.content.filter((b) => b.type === "tool_use");
    if (msg.stop_reason !== "tool_use" || aufrufe.length === 0) {
      const text = msg.content.filter((b) => b.type === "text").map((b) => b.text).join("").trim();
      return fertig(agent, text, live);
    }

    messages.push({ role: "assistant", content: msg.content });
    for (const a of aufrufe) {
      const ziel = a.input?.pfad ?? a.input?.muster ?? "";
      const zeile = `${GRAU}  ${agent.name.split(" ")[0]} ${a.name} ${ziel}${RESET}\n`;
      stdout.write(live ? `${RESET}${zeile}${agent.farbe}` : zeile);
    }
    messages.push({ role: "user", content: aufrufe.map(werkzeugAufrufen) });
  }
}

function fertig(agent, text, live) {
  if (live) stdout.write(`${RESET}\n`);
  return { wer: agent.name, text };
}

async function sprich(key, auftrag, maxWerkzeugRunden = 4) {
  const eintrag = await agentLauf(key, auftrag, { maxWerkzeugRunden, live: true });
  protokoll.push(eintrag);
}

async function gruender(frage) {
  if (OHNE_MICH) return;
  stdout.write(`\n${FETT}🧑 DU${RESET} ${GRAU}(${frage} – Enter = überspringen)${RESET}\n> `);
  const { value, done } = await zeilen.next();
  const antwort = done ? "" : value.trim();
  if (antwort) protokoll.push({ wer: "🧑 GRÜNDER", text: antwort });
}

function ueberschrift(text) {
  console.log(`\n${FETT}══════════ ${text} ══════════${RESET}`);
}

async function main() {
  if (!fs.existsSync(PITCH_DATEI)) throw new Error(`Pitch-Datei nicht gefunden: ${PITCH_DATEI}`);
  if (!fs.existsSync(PROJEKT)) throw new Error(`Projektordner nicht gefunden: ${PROJEKT}`);

  console.log(`${FETT}\n🦈 SHARK TANK${RESET}`);
  console.log(`${GRAU}Pitch:   ${PITCH_DATEI}\nProjekt: ${PROJEKT}\nRunden:  ${RUNDEN}${RESET}`);
  protokoll.push({ wer: "🧑 GRÜNDER (Pitch)", text: fs.readFileSync(PITCH_DATEI, "utf8").trim() });
  await gruender("Willst du noch etwas zum Pitch ergänzen?");

  // Phase 1: Jeder prüft unabhängig – gleichzeitig, ohne die Berichte der anderen zu kennen.
  ueberschrift("Phase 1: Prüfung von Idee und Programmstand");
  console.log(`${GRAU}Partner, Kritiker und Investor lesen jetzt unabhängig voneinander den Code …${RESET}`);
  const pruefauftrag = `Prüfe das Projekt aus DEINER Perspektive, bevor die Diskussion beginnt.
Verschaff dir mit den Werkzeugen einen gründlichen Überblick über den Code: Struktur,
wichtige Dateien, was wirklich implementiert ist, Qualität, Git-Verlauf. Vergleiche das mit
den Versprechen im Pitch. Schreibe dann deinen Prüfbericht (max. ca. 350 Wörter) mit:
1. Die Idee – deine Einschätzung
2. Der Programmstand – was fertig ist, was fehlt oder halbfertig ist (mit Dateiverweisen)
3. Dein Fazit in einem Satz`;
  const berichte = await Promise.all(
    ["partner", "kritiker", "investor"].map((k) => agentLauf(k, pruefauftrag, { maxWerkzeugRunden: 20, live: false })),
  );
  for (const b of berichte) {
    const farbe = Object.values(AGENTEN).find((a) => a.name === b.wer).farbe;
    console.log(`\n${farbe}${FETT}${b.wer} – Prüfbericht${RESET}\n${farbe}${b.text}${RESET}`);
    protokoll.push({ wer: `${b.wer} – Prüfbericht`, text: b.text });
  }

  // Phase 2: Die Agenten diskutieren miteinander über ihre Befunde.
  ueberschrift("Phase 2: Diskussion");
  const kurz = "Antworte in höchstens ca. 200 Wörtern und sprich die anderen direkt mit Namen an.";
  for (let runde = 1; runde <= RUNDEN; runde++) {
    console.log(`\n${FETT}────────── Runde ${runde} von ${RUNDEN} ──────────${RESET}`);
    await sprich("kritiker", `Greif die Prüfberichte von PARTNER und INVESTOR und alle bisherigen Argumente an. Wo schönen sie etwas, was übersehen sie? ${kurz}`);
    await sprich("partner", `Antworte dem KRITIKER direkt. Widerlege seine Punkte, wo er falsch liegt (gern mit Beleg aus dem Code), und gib zu, wo er recht hat. ${kurz}`);
    await sprich("investor", `Reagiere auf KRITIKER und PARTNER: Wer überzeugt dich mehr und warum? Wie nah bist du an einem Deal (Prozent)? Stelle dem Gründer eine harte Frage, beginnend mit "FRAGE AN DEN GRÜNDER:". ${kurz}`);
    await gruender("Deine Antwort auf die Frage des Investors?");
  }

  // Phase 3: Schlussworte und Urteil.
  ueberschrift("Phase 3: Urteil");
  await sprich("investor", "Letztes Wort: Machst du einen Deal – ja oder nein – und zu welchen Bedingungen? Max. 120 Wörter.", 0);
  await sprich("richter", "Die Verhandlung ist beendet. Prüfe offene Streitpunkte selbst im Code nach und fälle dann dein Urteil.", 10);

  const datei = path.join(here, "protokolle", `shark-tank-${new Date().toISOString().replace(/[:.]/g, "-")}.md`);
  fs.mkdirSync(path.dirname(datei), { recursive: true });
  fs.writeFileSync(datei, `# Shark Tank Protokoll\n\nProjekt: ${PROJEKT}\n\n${protokollText()}\n`);
  console.log(`\n${GRAU}Protokoll gespeichert: ${datei}${RESET}\n`);
  rl.close();
}

main().catch((err) => {
  rl.close();
  stdout.write(RESET);
  if (err instanceof Anthropic.AuthenticationError || /authentication method/i.test(err?.message ?? "")) {
    console.error("\nKein gültiger API-Schlüssel. Setze ANTHROPIC_API_KEY (siehe README).");
  } else if (err instanceof Anthropic.RateLimitError) {
    console.error("\nZu viele Anfragen – bitte kurz warten und erneut starten.");
  } else if (err instanceof Anthropic.APIError) {
    console.error(`\nAPI-Fehler (${err.status}): ${err.message}`);
  } else {
    console.error(`\n${err.message ?? err}`);
  }
  process.exit(1);
});
