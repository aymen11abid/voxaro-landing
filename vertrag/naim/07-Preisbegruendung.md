# Woher die 34.900 € kommen — und wie du sie begründest

## 1 · Wie die Zahl ursprünglich entstand (ehrlich)

Der erste Wert war **von oben eingeordnet, nicht von unten gerechnet**: rund das Doppelte der
Lizenz ohne Quellcode (17.900 €), deutlich unter dem geschätzten Nachbauwert. Das ist eine
gängige Preisfindung — aber gegenüber einem Kunden, der nachfragt, ist sie keine Begründung.
Deshalb hier die Rechnung von unten.

## 2 · Der gemessene Umfang der Software

Gezählt im Repository `auto-flow-crm` (ohne Fremdbibliotheken):

| | Anzahl |
|---|---|
| Programmdateien (TypeScript / React) | **199** |
| Zeilen Anwendungscode | **~35.000** |
| Schnittstellen (API-Routen) | **91** |
| Programmbereiche / Module | **36** |
| Datenbank-Erweiterungen (Migrationen) | **37** |

Dazu kommen die Anbindungen an Telefonie (Twilio), Sprach-KI (Vapi, ElevenLabs), Datenbank
(Supabase), die Dokumentenerzeugung (Vollmachten, Angebote, Rechnungen) und die
Gesprächsvorlagen des Assistenten.

## 3 · Aufwand von unten gerechnet

Vorsichtig geschätzt, nach Bausteinen statt nach Codezeilen:

| Baustein | Stunden |
|---|---|
| 91 Schnittstellen à 1,5–3 Std. | 140–270 |
| 36 Programmbereiche à 4–8 Std. | 145–290 |
| Datenmodell und 37 Migrationen | 40–60 |
| Telefonie und Sprach-KI: Anbindung, Webhooks, Gesprächsvorlagen | 60–100 |
| Dokumentenerzeugung (Vollmacht, Angebot, Rechnung) | 30–50 |
| Anmeldung, Rechte, Mandantentrennung, Auslieferung | 40–60 |
| Test, Fehlerbehebung, Abstimmung vor Ort (+20 %) | 90–170 |
| **Summe** | **545–1.000 Stunden** |

**Bewertet mit dem Marktsatz eines Entwicklungsdienstleisters (100–120 € / Std.):**
**55.000 – 120.000 €.** Realistischer Mittelwert für ein Angebot: **60.000 – 100.000 €.**

> Korrektur gegenüber der ersten Fassung: Dort standen 80.000–150.000 €. Diese Spanne war zu
> hoch gegriffen. 60.000–100.000 € sind aus dem gemessenen Umfang belegbar — und das ist wichtiger,
> als eine große Zahl zu nennen, die bei Nachfrage zusammenfällt.

**Damit liegen die 34.900 € bei etwa 40–55 % des Wiederbeschaffungswerts.** Das ist die Zahl,
die du nennen kannst, wenn Naim fragt, wie du darauf kommst.

## 4 · Wie du es Naim erklärst

**Reihenfolge einhalten: erst Wert, dann Preis.** Wer mit der Zahl anfängt, verhandelt über die
Zahl. Wer mit dem Nutzen anfängt, verhandelt über den Nutzen.

### Schritt 1 — Ihn seine eigenen Zahlen nennen lassen

Frag, statt zu behaupten. Seine Antworten sind das stärkste Argument, weil sie von ihm kommen:

- „Wie viele Anrufe gehen bei dir in der Woche verloren, wenn niemand rangeht?"
- „Wie viele davon wären Käufer gewesen? Was verdienst du an einem Fahrzeug?"
- „Wie lange brauchst du für eine Sammelvollmacht, und wie oft im Monat machst du das?"
- „Wie viel Zeit geht jede Woche für die Excel-Pflege und die WhatsApp-Gruppe drauf?"
- „Was zahlst du heute im Monat für Software?"

Rechne dann **mit seinen Zahlen** vor, nicht mit erfundenen. Als Größenordnung: Wenn die Lösung
fünf Stunden in der Woche spart, sind das über 200 Stunden im Jahr — dazu jedes Fahrzeug, das
verkauft wird, weil ein Anruf nicht verloren ging. In dieser Größenordnung amortisiert sich der
Kaufpreis typischerweise in **drei bis fünf Jahren** — und danach gehört ihm die Software weiter.

### Schritt 2 — Den Nachbauwert nennen

> „Was du bekommst, sind 36 Programmbereiche, 91 Schnittstellen und rund 35.000 Zeilen Code, die
> in deinem Betrieb bereits laufen. Wenn du das bei einem Softwarehaus in Auftrag gibst, bist du
> bei 60.000 bis 100.000 € und sechs bis zwölf Monaten Entwicklung — mit dem Risiko, dass es am
> Ende nicht zu deinem Ablauf passt. Du bekommst es fertig, erprobt, auf deinen Einkauf gebaut,
> für 34.900 €."

### Schritt 3 — Den Unterschied zwischen Mieten und Kaufen benennen

> „Mieten kostet dich 249 € im Monat, immer weiter, und die Software gehört dir nie. Kaufen kostet
> einmal 34.900 €, dann gehört sie dir mit dem Quellcode. Du bist von mir unabhängig — jeder
> Entwickler kann daran weiterarbeiten. Das ist der Unterschied zwischen einem Mietwagen und
> einem gekauften Auto."

Das ist ein Bild, das ein Fahrzeughändler sofort versteht — und es ist ehrlich: Kaufen ist teurer,
dafür gehört es ihm.

### Schritt 4 — Was du *nicht* sagen solltest

- Nicht „das hat mich X Stunden gekostet". Dein Aufwand ist nicht sein Nutzen, und er wird
  sofort nachrechnen, ob dein Stundensatz gerechtfertigt ist.
- Nicht „für dich mache ich einen Sonderpreis" ohne Gegenleistung. Jeder Nachlass ohne
  Gegenwert entwertet die Zahl davor.
- Nicht über den Preis reden, bevor Schritt 1 gelaufen ist.

## 5 · Wenn er sagt: zu teuer

Nicht den Preis senken — den **Umfang** ändern. Diese Leiter in dieser Reihenfolge:

| Stufe | Angebot | Für dich |
|---|---|---|
| 1 | **Ratenzahlung**: 12 × 3.100 € = 37.200 € (+ 2.300 € für die Stundung) | Preis bleibt, Liquidität für ihn |
| 2 | **Escrow statt Quellcode**: 17.900 €, Code beim Treuhänder, er bekommt ihn nur wenn du aufhörst | Du behältst den Code |
| 3 | **Ohne Quellcode, ohne laufende Kosten**: 17.900 € | Voriges Modell |
| 4 | **Miete**: 249 € im Monat, 12 Monate | Wiederkehrender Umsatz |
| — | **Untergrenze mit Quellcode: 29.000 €** | Darunter nicht verkaufen |

Stufe 2 ist die stärkste Antwort auf „zu teuer", weil sie sein eigentliches Motiv trifft: Er will
meist nicht den Code — er will die Sicherheit, nicht von dir abhängig zu sein. Die bekommt er
über den Treuhänder für die Hälfte.
