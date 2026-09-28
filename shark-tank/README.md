# 🦈 Shark Tank für Werkanio

Vier KI-Agenten verhandeln über dein Projekt – und du redest mit:

| Rolle | Aufgabe |
|---|---|
| 🟢 **Partner** | Steht auf deiner Seite und verteidigt das Projekt mit dir |
| 🔴 **Kritiker** | Zeigt alles, was gegen das Projekt spricht („warum das Blödsinn ist“) |
| 💰 **Investor** | Prüft nüchtern, ob er Geld reinstecken würde, und stellt dir harte Fragen |
| ⚖️ **Richter** | Entscheidet am Ende: **Weitermachen**, **Weitermachen mit Änderungen** oder **Stoppen** |

## Ablauf

1. Du ergänzt den Pitch (optional), der Partner eröffnet.
2. Pro Runde: Kritiker greift an → du antwortest → Partner verteidigt → Investor bewertet und fragt dich → du antwortest.
3. Investor sagt Deal ja/nein, Richter fällt das Urteil mit Punkten und den nächsten 3 Schritten.
4. Das ganze Gespräch wird in `protokolle/` als Markdown gespeichert.

Bei jeder Frage an dich kannst du auch einfach Enter drücken, dann geht es ohne dich weiter.

## Starten

```bash
cd shark-tank
npm install
export ANTHROPIC_API_KEY=sk-ant-...   # Schlüssel von https://console.anthropic.com
node shark-tank.mjs                   # nutzt pitch.md, 2 Runden
node shark-tank.mjs pitch.md --runden 3
```

Tipp: Trag in `pitch.md` echte Zahlen ein (Kunden, Umsatz, Kosten, wie viel Geld du suchst).
Je konkreter der Pitch, desto härter und nützlicher wird die Verhandlung.
Für ein anderes Projekt einfach eine eigene Pitch-Datei anlegen und übergeben.
