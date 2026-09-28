#!/usr/bin/env node
// Shark Tank: vier KI-Agenten prüfen dein Projekt.
//   🟢 Partner   – steht auf deiner Seite und verteidigt das Projekt mit dir
//   🔴 Kritiker  – zeigt alles, was gegen das Projekt spricht
//   💰 Investor  – prüft, ob er Geld reinstecken würde
//   ⚖️  Richter   – entscheidet am Ende: weitermachen oder nicht
//
// Start:  node shark-tank.mjs [pitch.md] [--runden 3]

import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const MODEL = "claude-opus-5";

const args = process.argv.slice(2);
const rundenIdx = args.indexOf("--runden");
const RUNDEN = rundenIdx >= 0 ? Math.max(1, parseInt(args[rundenIdx + 1], 10) || 2) : 2;
const pitchFile = args.find((a, i) => !a.startsWith("--") && args[i - 1] !== "--runden")
  ?? path.join(here, "pitch.md");

const GEMEINSAM = `Du bist Teil einer Sendung im Stil von "Die Höhle der Löwen" / "Shark Tank".
Ein Gründer (der Mensch, im Protokoll "GRÜNDER") stellt sein Projekt vor.
Es gibt vier Rollen: PARTNER, KRITIKER, INVESTOR, RICHTER.
Antworte immer auf Deutsch, direkt und konkret, ohne Floskeln. Bleib in deiner Rolle.
Beziehe dich auf das, was vorher im Protokoll gesagt wurde, und wiederhole dich nicht.
Halte dich kurz: höchstens etwa 150–200 Wörter pro Beitrag, außer der Richter beim Urteil.`;

const AGENTEN = {
  partner: {
    name: "🟢 PARTNER",
    farbe: "\x1b[32m",
    system: `${GEMEINSAM}

Du bist der PARTNER. Du stehst auf der Seite des Gründers – ihr seid ein Team.
Du verteidigst das Projekt mit den stärksten echten Argumenten: Markt, Kundennutzen,
Zahlen, Vorteile gegenüber Alternativen. Du entkräftest die Angriffe des Kritikers
Punkt für Punkt und hilfst dem Gründer, die Fragen des Investors gut zu beantworten.
Du bist leidenschaftlich, aber ehrlich: Wenn ein Einwand berechtigt ist, gib es zu und
zeig, wie man das Problem löst. Übernimm, was der Gründer selbst gesagt hat, und bau darauf auf.`,
  },
  kritiker: {
    name: "🔴 KRITIKER",
    farbe: "\x1b[31m",
    system: `${GEMEINSAM}

Du bist der KRITIKER – der Advocatus Diaboli. Deine Aufgabe ist es, alles zu zeigen,
was gegen das Projekt spricht, und zu begründen, warum es Blödsinn sein könnte.
Greif hart, aber sachlich an: Konkurrenz, fehlende Zahlen, Zahlungsbereitschaft der
Zielgruppe, technische Risiken, rechtliche Risiken (z. B. DSGVO, Haftung),
Vertrieb, Kundenabwanderung, Abhängigkeit von Anbietern, Schwächen im Team oder Timing.
Wenn der Partner ein Argument gebracht hat, zerlege es. Keine Beleidigungen, nur Argumente.
Nenne am Ende die eine Schwachstelle, die das Projekt am wahrscheinlichsten umbringt.`,
  },
  investor: {
    name: "💰 INVESTOR",
    farbe: "\x1b[33m",
    system: `${GEMEINSAM}

Du bist der INVESTOR – ein erfahrener, nüchterner Business Angel. Dir geht es nur um eins:
Bekomme ich mein Geld mehrfach zurück? Du denkst in Marktgröße, Kundengewinnungskosten,
Kundenwert (LTV), Marge, Skalierbarkeit, Wettbewerbsvorteil und Team.
Bewerte, was Partner und Kritiker gesagt haben, und sag, wer dich gerade mehr überzeugt.
Stelle am Ende genau EINE harte, konkrete Frage direkt an den Gründer
(beginne diese Zeile mit "FRAGE AN DEN GRÜNDER:").
Sag ehrlich, wie nah du gerade an einem Deal bist (in Prozent).`,
  },
  richter: {
    name: "⚖️  RICHTER",
    farbe: "\x1b[35m",
    system: `${GEMEINSAM}

Du bist der RICHTER. Du hast die ganze Verhandlung verfolgt und entscheidest am Ende
unabhängig und ohne Rücksicht auf Gefühle, ob das Projekt weitergeführt werden soll.
Wäge die Argumente von Partner, Kritiker, Investor und Gründer fair gegeneinander ab.
Belohne keine Rhetorik, sondern Fakten und überzeugende Antworten.

Gib dein Urteil exakt in diesem Format aus:

URTEIL: WEITERMACHEN | WEITERMACHEN MIT ÄNDERUNGEN | STOPPEN
(genau eine der drei Optionen)

Begründung: 3–5 Sätze.

Stärkste Argumente dafür:
- ...

Stärkste Argumente dagegen:
- ...

Punkte (0–10): Markt _, Produkt _, Geschäftsmodell _, Risiko _ (10 = geringes Risiko), Gesamt _

Die nächsten 3 Schritte (konkret, in den nächsten 30 Tagen umsetzbar):
1. ...
2. ...
3. ...`,
  },
};

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

async function sprich(key, auftrag) {
  const agent = AGENTEN[key];
  stdout.write(`\n${agent.farbe}${FETT}${agent.name}${RESET}\n${agent.farbe}`);

  // Jeder Agent bekommt das komplette bisherige Protokoll und seinen Auftrag.
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    system: agent.system,
    messages: [
      {
        role: "user",
        content: `PROTOKOLL BISHER:\n\n${protokollText()}\n\n---\nDEIN AUFTRAG JETZT: ${auftrag}`,
      },
    ],
  });
  stream.on("text", (t) => stdout.write(t));
  const msg = await stream.finalMessage();
  stdout.write(`${RESET}\n`);

  if (msg.stop_reason === "refusal") {
    const text = "(Der Agent hat diese Antwort abgelehnt.)";
    protokoll.push({ wer: agent.name, text });
    return text;
  }
  const text = msg.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();
  protokoll.push({ wer: agent.name, text });
  return text;
}

async function gruender(frage) {
  stdout.write(`\n${FETT}🧑 DU${RESET} ${GRAU}(${frage} – Enter = überspringen)${RESET}\n> `);
  const { value, done } = await zeilen.next();
  const antwort = done ? "" : value.trim();
  if (antwort) protokoll.push({ wer: "🧑 GRÜNDER", text: antwort });
  return antwort;
}

async function main() {
  if (!fs.existsSync(pitchFile)) {
    console.error(`Pitch-Datei nicht gefunden: ${pitchFile}`);
    process.exit(1);
  }
  const pitch = fs.readFileSync(pitchFile, "utf8").trim();

  console.log(`${FETT}\n🦈 SHARK TANK – ${RUNDEN} Runde(n)${RESET}`);
  console.log(`${GRAU}Pitch aus: ${pitchFile}${RESET}`);
  protokoll.push({ wer: "🧑 GRÜNDER (Pitch)", text: pitch });

  await gruender("Willst du noch etwas zum Pitch ergänzen?");
  await sprich("partner", "Eröffne die Verhandlung: Präsentiere das Projekt zusammen mit dem Gründer so überzeugend wie möglich.");

  for (let runde = 1; runde <= RUNDEN; runde++) {
    console.log(`\n${FETT}────────── Runde ${runde} von ${RUNDEN} ──────────${RESET}`);
    await sprich("kritiker", "Greife das Projekt und die bisherigen Argumente an. Zeige, was dagegen spricht.");
    await gruender("Deine Antwort auf den Kritiker?");
    await sprich("partner", "Verteidige das Projekt gegen den Kritiker. Nutze, was der Gründer gesagt hat.");
    await sprich("investor", "Bewerte den Stand der Verhandlung und stelle deine eine harte Frage an den Gründer.");
    await gruender("Deine Antwort auf die Frage des Investors?");
    if (runde < RUNDEN) {
      await sprich("partner", "Ergänze die Antwort des Gründers an den Investor mit den stärksten Argumenten.");
    }
  }

  console.log(`\n${FETT}────────── Das Urteil ──────────${RESET}`);
  await sprich("investor", "Letztes Wort: Machst du einen Deal – ja oder nein – und zu welchen Bedingungen? Keine Frage mehr.");
  await sprich("richter", "Die Verhandlung ist beendet. Fälle jetzt dein Urteil.");

  const datei = path.join(here, "protokolle", `shark-tank-${new Date().toISOString().replace(/[:.]/g, "-")}.md`);
  fs.mkdirSync(path.dirname(datei), { recursive: true });
  fs.writeFileSync(datei, `# Shark Tank Protokoll\n\n${protokollText()}\n`);
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
    console.error(err);
  }
  process.exit(1);
});
