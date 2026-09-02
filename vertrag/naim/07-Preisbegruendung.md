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

---

## 6 · „Ich habe noch keine Kunden — sind 29.000 € realistisch?"

**Teilweise ja.** Aber das Problem ist nicht die Zahl, sondern das **Vertrauen**. Und dagegen
hilft kein Rabatt, sondern weniger Risiko für den Käufer.

### Was gegen den Preis spricht

- **Kein Nachweis.** Naim kauft von jemandem, der noch keinen einzigen Kunden ausgeliefert und
  über Jahre betreut hat. Die 24 Monate Gewährleistung sind exakt so viel wert wie die
  Wahrscheinlichkeit, dass es dich in 24 Monaten noch gibt. Das denkt er, auch wenn er es nicht sagt.
- **Die Software ist noch im Pilotbetrieb.** Sie wird gerade erst im Alltag erprobt. Etwas als
  fertiges 35.000-€-Produkt zu verkaufen, das noch täglich Änderungen bekommt, lädt zu genau den
  Gewährleistungsdiskussionen ein, die du dir nicht leisten kannst.
- **Du bist allein.** Ein Werkvertrag über 35.000 € mit zwei Jahren kostenloser Nachbesserung ist
  für einen Einzelnen ein erhebliches Risiko — vor allem parallel zum Aufbau des Produkts.

### Was für den Preis spricht

Naim ist **kein kleiner Betrieb**. Aus deinen eigenen Vor-Ort-Notizen: Fahrzeugankauf in Serie,
eigene Speditionsrouten, Sammelvollmachten für mehrere Fahrzeuge, ein gepflegter Bestand in Excel.
Wer Fahrzeuge routenweise einkauft, bewegt Beträge, neben denen 35.000 € kein Sonderfall sind.
Er kauft ständig Autos in dieser Größenordnung.

**Das Geld ist also nicht das Problem — die Sicherheit ist es.**

### Die richtige Antwort: nicht billiger, sondern risikoärmer

| Instrument | Wirkung |
|---|---|
| **Mietkauf** — 349 € / Monat, und bei Kauf innerhalb von 12 Monaten wird **jeder gezahlte Euro voll angerechnet** (bis 4.188 €) | Er testet ohne Risiko, du bekommst sofort Umsatz und einen Referenzkunden. Der Preis bleibt bei 34.900 € |
| **Meilensteine statt 50/50** — 30 % bei Auftrag, 40 % bei Abnahme, 30 % nach 60 Tagen störungsfreiem Betrieb | Er zahlt den größten Teil erst, wenn es nachweislich läuft |
| **Escrow** | Löst genau die Sorge „was, wenn es ihn nicht mehr gibt" |
| **Rücktrittsrecht bei gescheiterter Abnahme** — Anzahlung zurück, wenn das Pflichtenheft nicht erfüllt wird | Kostet dich nichts, wenn du lieferst |

**Der Mietkauf ist die beste Antwort auf „du hast ja noch keine Kunden".** Er dreht das Argument
um: Statt dass Naim dir Vertrauen vorschießt, beweist du es ihm zwölf Monate lang — und wenn er
danach kauft, zahlt er den vollen Preis, weil er dann weiß, dass es funktioniert.

### Der Punkt, der wichtiger ist als der Preis

Dein erster Kunde ist nicht dazu da, dich zu finanzieren, sondern dich zu **beweisen**. Verkaufst
du den Quellcode, bevor du einen zweiten zahlenden Kunden hast, verkaufst du nicht ein Produkt,
sondern das Unternehmen — und du hast danach keine Referenz, mit der du Kunden 2 bis 15 gewinnst.

Zum Vergleich, aus deinem eigenen `ceo`-Brief: Break-even liegt bei etwa 15 Kunden. Fünfzehn
Kunden zu 249 € sind **44.800 € im Jahr, jedes Jahr**. Der Verkauf an Naim bringt 34.900 € genau
einmal.

### Entscheidungsregel

- **Du brauchst das Geld in den nächsten sechs Monaten zum Überleben** → verkaufen, aber
  **ohne Quellcode** (17.900 €) oder in Raten. Den Code gibst du nicht für Liquidität her.
- **Du willst Werkano aufbauen** → Mietkauf anbieten, 349 € im Monat, Kaufoption offen halten.
  Wenn Naim nach zwölf Monaten kauft, hast du beides gehabt: Referenz und Kaufpreis.
- **Naim besteht auf sofortigem Kauf mit Code** → 34.900 € mit Meilensteinen. Unter 29.000 € nur,
  wenn er im Gegenzug etwas gibt, das dir hilft: schriftliche Referenz, zwei Empfehlungen an
  andere Händler, Nutzung als Fallbeispiel.
