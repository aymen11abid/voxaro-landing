# Option: Einmalverkauf an Auto Naim

Frage: Was kostet es, wenn Naim die Lösung **einmalig kauft**, sie danach „seine" Software ist
und jede Weiterentwicklung einzeln abgerechnet wird — auf Werkano-Basis, aber außerhalb des
Werkano-Produkts.

---

## 1 · Der Preis

| Position | Betrag netto | Was dahintersteckt |
|---|---|---|
| **Einmalige Lizenz** — unbefristetes Nutzungsrecht an der Naim-Lösung im Stand der Abnahme, **ohne Quellcode** | **14.900 €** | Entspricht fünf Jahren Abo (249 € × 60 = 14.940 €). Genau so wird der Preis auch begründet. |
| **Betrieb & Wartung** — Hosting, Datenbank, Backups, Sicherheitsupdates, Störungsbehebung | **149 € / Monat**, Pflicht | Ohne das läuft die Software nicht. Nicht verhandelbar, sonst zahlst du fremde Serverkosten. |
| **KI-Telefonassistent** (optional) | + 100 € / Monat inkl. 400 Min. | Wie im Abo-Modell |
| **Weiterentwicklung** | 95 € / Stunde, ab 2 Std. Festpreis · Tagessatz 690 € | Wie im Abo-Modell |
| **Mit Quellcode-Übergabe** | **ab 29.000 €** | ≈ zehn Jahre Abo. Siehe Abschnitt 4 — davon ist abzuraten. |

**Zahlung:** 50 % bei Auftragserteilung, 50 % bei Abnahme. Bei einem Werkvertrag ist das üblich
und schützt dich davor, monatelang auf eigenes Risiko zu bauen.

**Was Naim vergleichen wird:** Abo 2.988 € im Jahr gegen Kauf 14.900 € plus 1.788 € Wartung im
Jahr. Über fünf Jahre: 14.940 € Abo gegen 23.840 € Kauf. **Kaufen ist teurer als mieten** — das
ist richtig so und muss auch so gesagt werden. Er zahlt einen Aufpreis für Unabhängigkeit, nicht
für Software. Wer das umdreht und den Kauf billiger macht, verkauft sein Geschäftsmodell unter Wert.

## 2 · Was sich rechtlich ändert — das ist der eigentliche Punkt

Bisher ist alles **Miete** (SaaS, §§ 535 ff. BGB): laufende Leistung, keine Abnahme, Haftung
begrenzt, jederzeit kündbar. Ein Einmalverkauf mit Anpassung auf Naims Prozesse ist ein
**Werkvertrag** (§§ 631 ff. BGB). Damit gilt:

| | SaaS-Abo (heute) | Einmalverkauf |
|---|---|---|
| Vertragstyp | Miete | Werkvertrag |
| Abnahme | gibt es nicht | **Pflicht** — mit Protokoll (§ 640 BGB) |
| Gewährleistung | laufende Instandhaltung | **2 Jahre ab Abnahme, Nacherfüllung kostenlos** |
| „Läuft nicht wie gedacht" | Supportfall | **Mangel — du musst kostenlos nachbessern** |
| Haftungsdeckel 12 Monatsentgelte | greift | greift nicht mehr — Bezugsgröße ist der Kaufpreis |

Drei Konsequenzen, die du einpreisen musst:

1. **Ohne Pflichtenheft verlierst du.** Bei einem Werkvertrag ist alles ein Mangel, was von der
   vereinbarten Beschaffenheit abweicht. Ist nichts vereinbart, entscheidet, was Naim
   „erwarten durfte". Du brauchst vor Vertragsschluss eine Leistungsbeschreibung, die auflistet,
   was die Lösung kann — sonst diskutierst du zwei Jahre lang kostenlos.
2. **Die Trennlinie Mangel / Änderungswunsch muss im Vertrag stehen.** „Funktioniert nicht wie
   beschrieben" = kostenlose Nacherfüllung. „Ich hätte es gern anders" = 95 €/Stunde. Ohne
   diesen Satz wird jede Rechnung zur Diskussion.
3. **Zwei Jahre kostenlose Mängelbeseitigung** sind Teil des Preises. Das ist einer der Gründe,
   warum 14.900 € und nicht 9.000 € richtig sind.

**Und die Lizenz — der wichtigste Satz überhaupt:** Du verkaufst ein *Nutzungsrecht*, nicht die
Software. Einfach, nicht ausschließlich, unbefristet, nur für den eigenen Betrieb, keine
Weitergabe, kein Quellcode. Das Urheberrecht ist nach § 29 UrhG ohnehin nicht übertragbar — aber
wenn im Vertrag „Naim erwirbt die Software" steht, wird daraus im Streit schnell ein
ausschließliches Recht, und dann darfst du Werkano nicht mehr an andere Werkstätten verkaufen.
**Ein einziger falscher Satz kann dein ganzes Geschäft kosten.**

## 3 · Was du beim Verkauf verlierst

- **2.988 € wiederkehrend pro Jahr** werden zu einmal 14.900 €. Nach fünf Jahren bist du gleichauf
  — aber ohne den Kunden, der dich weiterentwickelt.
- **Eine zweite Codebasis.** Sobald Naims Lösung eingefroren ist, baust du jede Funktion zweimal:
  einmal für Werkano, einmal für ihn. Für einen Einzelkämpfer ist das der klassische Weg in den
  Stillstand — laut deinem eigenen `ceo`-Brief ist dein größtes Risiko ohnehin „zu viel bauen,
  zu wenig verkaufen".
- **Deine Produkt-Roadmap.** Naims Einkaufsprozess — Pipeline, Bestand, Sammelvollmacht,
  Kaufvertrag-Scan — ist der Grund, warum das Autohandel-Modul existiert. Wenn diese Entwicklung
  in einer privaten Version landet, verliert Werkano sein stärkstes Modul.
- **Den Referenzkunden.** Ein Sonderkunde außerhalb des Produkts taugt nur begrenzt als Beleg
  dafür, dass Werkano funktioniert.
- **Die Aktualität.** Ab 1.1.2027 bzw. 1.1.2028 müssen Rechnungen im B2B strukturiert
  ausgestellt werden (E-Rechnungspflicht). Eine eingefrorene Version wird zu einem Datum, das
  heute schon feststeht, nicht mehr konform sein. Wer das nicht regelt, bekommt in zwei Jahren
  einen Anruf, der mit „das muss doch gehen" anfängt.

## 4 · Quellcode: nein

Für 29.000 € wäre eine Quellcode-Übergabe wirtschaftlich vertretbar — aber sie bedeutet, dass
Naim jeden anderen Entwickler weiterarbeiten lassen kann, dass deine Architektur offenliegt und
dass ein späterer Streit über „was davon ist Werkano und was ist Naim" nicht mehr entscheidbar ist.

Falls Naim Sicherheit will, falls dir etwas zustößt oder du aufhörst: **Source-Code-Escrow**. Der
Code liegt bei einem Treuhänder und wird nur herausgegeben, wenn definierte Fälle eintreten
(Insolvenz, Einstellung des Betriebs, Wartung länger als X Wochen nicht erbracht). Kostet ein paar
hundert Euro im Jahr und löst sein Sicherheitsbedürfnis, ohne dein Geschäft zu verschenken.

## 5 · Empfehlung

**Verkauf es nicht einmalig — verkauf ihm das Gefühl, das er sucht.**

Naim will vermutlich nicht den Quellcode. Er will: *„das ist meins, das ist auf meinen Betrieb
gebaut, ich bin nicht abhängig."* Das bekommt er auch so:

- **eigene Instanz** mit eigener Datenbank, eigener Subdomain, eigenem Logo — „Auto Naim" statt
  Werkano in der Oberfläche,
- **seine Prozesse** als Standard eingerichtet (das ist ohnehin passiert),
- **ein festes Entwicklungskontingent** statt Einzelabrechnung, z. B. 4 Stunden im Monat
  inklusive — planbar für ihn, planbar für dich,
- **Escrow-Zusage** für den Fall, dass du aufhörst.

Dafür 349 € statt 249 € im Monat. Du behältst wiederkehrenden Umsatz, eine Codebasis und dein
Produkt — er bekommt alles, was er wirklich wollte.

**Wenn er trotzdem kaufen will:** 14.900 € + 149 €/Monat Wartung, ohne Quellcode, mit
Pflichtenheft und Abnahmeprotokoll. Unter 12.000 € lohnt es sich für dich nicht — dann sind es
nur vier Jahre Abo, und du hast das Risiko eines Werkvertrags dazugekauft.

---

## 6 · Entscheidung vom 17.08.2026: Naim-Edition, eingefroren

Entschieden ist der Einmalverkauf: eigene, gebrandete Version für Auto Naim, **keine
Funktionsupdates**, Weiterentwicklung ausschließlich auf Wunsch und gegen Rechnung. Das
kundenfertige Angebot liegt in [`06-Angebot-Naim-Edition.md`](06-Angebot-Naim-Edition.md).

**Der Preis bleibt bei 14.900 €** — die Zahl enthielt nie Funktionsupdates, sondern immer nur
den Stand bei Abnahme. „Keine Updates" ist deshalb keine Einschränkung, die einen Nachlass
rechtfertigt, sondern die Beschreibung dessen, was ohnehin verkauft wird. Wer trotzdem einen
Hebel in der Verhandlung braucht, nimmt die 5 % bei Vorauszahlung: Das kostet 745 € und bringt
das Geld sofort statt in zwei Raten.

**Drei Dinge, die „keine Updates" ausdrücklich nicht bedeutet:**

1. **Keine Mängelbeseitigung.** Beim Werkvertrag gilt zwingend 24 Monate Gewährleistung ab
   Abnahme. Was nicht so funktioniert wie im Pflichtenheft beschrieben, wird kostenlos
   nachgebessert — das lässt sich vertraglich nicht abbedingen und ist im Preis enthalten.
   Genau deshalb ist das Pflichtenheft das wichtigste Dokument des ganzen Geschäfts: Es
   entscheidet, was „Mangel" heißt und was „Änderungswunsch" — also was kostenlos ist und was
   95 € die Stunde kostet.
2. **Keine Sicherheitsaktualisierungen.** Solange die Lösung auf Werkano-Servern läuft und
   personenbezogene Daten verarbeitet, verlangt Art. 32 DSGVO den Stand der Technik. Ein
   ungepatchtes System ist ein Datenschutzverstoß — und zwar deiner, nicht Naims. Sicherheits-
   und Bestandspflege stecken deshalb fest in den 149 € im Monat und sind nicht abwählbar.
3. **Kein Verzicht auf gesetzliche Anpassungen.** Die E-Rechnungspflicht kommt zum
   1.1.2027 bzw. 1.1.2028. Sie ist im Angebot ausdrücklich als kostenpflichtiger
   Änderungswunsch eingeordnet, mit rechtzeitigem Festpreis-Angebot. Ohne diesen Satz landet
   die Diskussion in zwei Jahren bei „das muss doch enthalten sein".

**Was jetzt noch fehlt, bevor unterschrieben wird:**

- **Pflichtenheft** — die Liste dessen, was die Lösung bei Abnahme können muss. Ohne sie ist
  die 24-monatige Gewährleistung ein offenes Fass.
- **Werkvertrag Naim-Edition** — ersetzt den Pilot-Nutzungsvertrag, weil aus Miete jetzt Werkvertrag wird.
- **Abnahmeprotokoll** — ein Blatt, das beide unterschreiben. Ab diesem Datum laufen die 24 Monate.
- Der **AVV** aus Anlage 2 gilt unverändert weiter, da du weiterhin hostest.
