# Werkanio Landing Page

Statische Seite (HTML + Tailwind), ausgeliefert über Vercel.

## Seiten

| Datei | Inhalt |
| --- | --- |
| `index.html` | Startseite — mit Umschalter Werkstatt / Autohandel |
| `impressum.html` | Impressum nach § 5 DDG |
| `datenschutz.html` | Datenschutzerklärung nach Art. 13 DSGVO |

## Wichtig: CSS muss nach jeder HTML-Änderung neu gebaut werden

Tailwind läuft **nicht** mehr über die CDN, sondern wird lokal gebaut und
selbst ausgeliefert (`assets/tailwind.css`). Dadurch werden beim Aufruf der
Seite keine Besucher-IPs an Dritte übertragen — und die Seite funktioniert
ohne externe Abhängigkeit.

Der Nachteil: Tailwind erzeugt nur die Klassen, die es in den HTML-Dateien
findet. Wer eine neue Klasse im HTML verwendet und das CSS nicht neu baut,
sieht die Änderung nicht.

```bash
npm install          # einmalig
npm run build:css    # nach jeder HTML-Änderung
npm run watch:css    # baut während der Arbeit automatisch neu
```

`assets/tailwind.css` ist bewusst eingecheckt, damit Vercel die Seite ohne
Build-Schritt ausliefern kann.

## Offene Punkte

- **Impressum und Datenschutz enthalten Platzhalter.** Alle mit `PLATZHALTER`
  markierten Stellen müssen vor der Veröffentlichung ersetzt und der orangene
  Hinweiskasten in beiden Dateien entfernt werden.
- **Domain.** `index.html` setzt für Canonical-URL und Social-Vorschau
  `https://werkanio.de/` voraus. Läuft die Seite unter einer anderen Domain,
  müssen diese Angaben im `<head>` angepasst werden.
