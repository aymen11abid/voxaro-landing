# 🦈 Shark Tank für Werkanio

Vier KI-Agenten prüfen dein Projekt, **die Idee und den echten Programmstand im Code**.
Danach diskutieren sie miteinander, und am Ende entscheidet der Richter, ob du weitermachen sollst.

| Rolle | Aufgabe |
|---|---|
| 🟢 **Partner** | Steht auf deiner Seite und verteidigt das Projekt |
| 🔴 **Kritiker** | Zeigt alles, was gegen das Projekt spricht („warum das Blödsinn ist“) |
| 💰 **Investor** | Prüft nüchtern, ob er Geld reinstecken würde |
| ⚖️ **Richter** | Entscheidet: **Weitermachen**, **Weitermachen mit Änderungen** oder **Stoppen** |

## Ablauf

1. **Prüfung:** Partner, Kritiker und Investor lesen gleichzeitig und unabhängig voneinander
   den Pitch und den Code (Dateien, Suche, Git-Verlauf). Jeder schreibt einen Prüfbericht
   aus seiner Perspektive: Idee, Programmstand mit Dateiverweisen, Fazit.
2. **Diskussion:** Die drei diskutieren direkt miteinander. Der Kritiker greift an, der Partner
   kontert, der Investor sagt, wer ihn überzeugt, und stellt dir eine Frage.
   Du kannst antworten oder mit Enter überspringen.
3. **Urteil:** Der Investor sagt „Deal ja/nein“. Der Richter prüft offene Streitpunkte selbst
   im Code nach und fällt das Urteil mit Punkten und den nächsten 3 Schritten.

Das ganze Gespräch wird in `protokolle/` als Markdown gespeichert.

## Starten

```bash
cd shark-tank
npm install
export ANTHROPIC_API_KEY=sk-ant-...   # Schlüssel von https://console.anthropic.com

# Idee + Code der App prüfen lassen (Pfad zu deinem App-Ordner, z. B. auto-flow-crm):
node shark-tank.mjs --projekt ../../auto-flow-crm

# Weitere Optionen:
node shark-tank.mjs --projekt ../../auto-flow-crm --runden 3   # mehr Diskussionsrunden
node shark-tank.mjs --projekt ../../auto-flow-crm --ohne-mich  # Agenten diskutieren allein
node shark-tank.mjs --pitch anderer-pitch.md                   # anderen Pitch nutzen
```

Ohne `--projekt` wird dieser Ordner (die Landingpage) geprüft.

## Sicherheit

Die Agenten können nur **lesen**, nichts ändern, und nur innerhalb des Projektordners.
Dateien wie `.env`, Schlüssel und Zugangsdaten sind gesperrt, und `node_modules`/`.git` werden übersprungen.
Der Code wird dabei an die Anthropic-API geschickt.

## Tipp

Trag in `pitch.md` echte Zahlen ein (Kunden, Umsatz, Kosten, wie viel Geld du suchst).
Je konkreter der Pitch, desto härter und nützlicher wird die Verhandlung.
