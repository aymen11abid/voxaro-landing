# „Ist das alles nur für Auto Naim?"

Die Sorge: Was gerade gebaut wird, passt nur zu einem Betrieb und zu keinem anderen.
**Der Code sagt etwas anderes.**

---

## 1 · Befund aus dem Repository

Der Name „Naim" kommt im Programmcode **neunmal** vor — und zwar **ausschließlich in Kommentaren**:

```
lib/types.ts:408          // … Naims Excel zeigt z.B.
lib/kaufvertragExtraktion.ts:3   // In Naims echtem E.R.B.-Vertrag steht die VIN …
lib/pdf/vollmacht-pdf.tsx:2      // Vorlage 1:1 nach Auto Naims echter Vollmacht-Datei
app/api/spediteure/route.ts:2    // Wiederverwendbar: Naim hat typisch 1-3 feste Speditionen.
components/SchwackeMappe.tsx:3   // alle Werte, die Naim beim Inserieren braucht
```

**Kein einziges Mal steht „Naim" in der Logik.** Keine Abfrage auf einen Kundennamen, kein
fest verdrahteter Wert, keine Sonderbehandlung. Die Kommentare dokumentieren nur, *warum* eine
Entscheidung so getroffen wurde.

Dazu:

| | |
|---|---|
| Dateien mit Mandantenbezug (`werkstatt_id`, `betrieb_id`) | **125** |
| SQL-Dateien mit Zugriffsrichtlinien (Row Level Security) | **16** |

Das ist **mandantenfähige Software** — jeder Betrieb bekommt getrennte Daten. So sieht keine
Einzelanfertigung aus. So sieht ein Produkt aus, das zufällig gerade einen Kunden hat.

## 2 · Der Unterschied, um den es geht

**Von einem Kunden gebaut ≠ für einen Kunden gebaut.**

Jedes gute Produkt entsteht am Prozess eines echten Betriebs. Die Alternative wäre, sich am
Schreibtisch auszudenken, wie ein Fahrzeughandel funktioniert — und genau daran scheitern die
meisten Branchenlösungen. Dass du bei Naim vor Ort warst, seinen Kaufvertrag, seine echte
Sammelvollmacht und seine Excel-Datei gesehen hast, ist der Grund, warum die Software überhaupt
zum Alltag passt.

Prüf es an seinem Ablauf. Was davon ist wirklich nur seins?

| Naims Ablauf | Nur bei ihm? |
|---|---|
| Kaufvertrag kommt als PDF per E-Mail | Nein — Standard bei jeder Ankaufsplattform |
| Bestandsliste in Excel | Nein — bei fast jedem kleinen Händler |
| Sammelvollmacht für die Spedition | Nein — jeder, der Fahrzeuge überführen lässt |
| Standtage, Eingangs-Check vor dem Verkauf | Nein — Grundvokabular des Gebrauchtwagenhandels |
| Differenzbesteuerung nach § 25a UStG | Nein — Gesetz, gilt für alle |
| Fahrzeuge farblich nach Route gruppieren | Das war seine Eigenart — und ist im System ein simples Feld „Route" |

**Von sechs Bausteinen ist genau einer eigen — und der ist längst verallgemeinert.**

## 3 · Das echte Risiko liegt woanders

Nicht die Naim-Spezifik ist das Problem, sondern dass du **zwei Kundentypen gleichzeitig**
bedienst: Malik ist Werkstatt, Naim ist Händler. Es fühlt sich nach Sonderanfertigung an, weil du
für zwei verschiedene Betriebe baust und keiner der beiden Teile ganz fertig ist.

Die gute Nachricht: Das sind keine zwei Märkte, sondern **zwei Hälften desselben typischen
Betriebs**. Die freie Kfz-Werkstatt, die nebenbei Gebrauchtwagen verkauft, ist in Deutschland
einer der häufigsten Betriebstypen überhaupt. Malik deckt die Werkstattseite ab, Naim die
Handelsseite — zusammen beschreiben sie genau diesen Betrieb.

Dein Zielkunde ist damit schärfer, als du denkst: **Kfz-Betrieb mit Werkstatt und Fahrzeughandel,
5–20 Mitarbeiter.** Nicht „Werkstätten" allgemein, wie es auf der Landingpage steht.

## 4 · Der Test, der die Frage entscheidet — eine Woche

Nicht diskutieren, sondern messen. Drei Händler oder Werkstätten mit Handel besuchen, aus der
Prospect-Liste im 30-km-Radius, die dein `sales`-Agent ohnehin führt. Dabei nichts verkaufen,
nur das Einkaufs-Modul zeigen und eine Frage stellen:

> „So läuft das bei einem anderen Betrieb. Ist das bei dir auch so — oder machst du das anders?"

| Ergebnis | Bedeutung | Konsequenz |
|---|---|---|
| **2 von 3 sagen „genau mein Problem"** | Es ist ein Produkt | Quellcode **nicht** verkaufen. Naim bekommt das Abo oder den Mietkauf. |
| **2 von 3 machen es grundlegend anders** | Es ist eine Auftragsarbeit | Verkauf an Naim ist richtig — dann ist es ehrlich verdientes Geld für ein Projekt |

## 5 · Warum dieser Test vor dem Verkauf kommen muss

Die Entscheidung über den Quellcode ist **nicht rückholbar**. Wenn du ihn verkaufst und zwei
Monate später sitzt der dritte Händler vor dir, der dasselbe braucht, hast du dein Produkt für
34.900 € weggegeben.

Drei Besuche kosten dich eine Woche. Die falsche Entscheidung kostet dich das Unternehmen.

Und aus deinem eigenen `ceo`-Brief, Stand Mai: *„Nächste Priorität: Sales — nicht mehr bauen,
anfangen zu verkaufen."* Der Test ist genau das. Er beantwortet deine Frage und bringt dich
gleichzeitig zu den Kunden 2 und 3.
