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

---

## 7 · Nachtrag: Infrastruktur komplett auf Naims Konten

Entschieden: Server, Datenbank, Telefonie und Sprach-KI laufen auf Konten, die **Auto Naim
gehören**. Werkano legt nichts mehr aus und erbringt keine laufende Leistung mehr.

### Der Preis steigt auf 17.900 €

Rechnung dahinter: Im vorherigen Modell kamen über fünf Jahre 149 € × 60 = 8.940 € an
Wartungsentgelt dazu. Fällt das weg, fällt auch der Grund weg, die Lizenz bei 14.900 € zu halten.
**+ 3.000 €** holen rund ein Drittel davon zurück — mehr wäre nicht durchsetzbar, weniger wäre
geschenkt. Für Naim rechnet es sich trotzdem klar: Er zahlt über fünf Jahre 17.900 € statt
23.840 €, dafür trägt er die Anbieterkosten von 50–80 € im Monat selbst.

### Was du dadurch verlierst

- **Die Marge auf den Assistenten.** Die 100 €/Monat und die 0,25 €/Minute sind weg — Naim zahlt
  Vapi direkt etwa 0,05 $ je Minute. Das war der profitabelste Teil des Abo-Modells.
- **Wiederkehrenden Umsatz überhaupt.** Nach der Abnahme kommt nur noch Geld herein, wenn Naim
  etwas bestellt.

### Was du dadurch gewinnst

- **Kein Kostenrisiko.** Telefoniert Naim 3.000 Minuten im Monat, zahlt er das selbst.
- **Kein Zahlungsausfallrisiko** bei den Anbietern.
- **17.900 € sofort** statt in Monatsraten — für einen Einzelkämpfer der eigentliche Punkt.

### Drei Fallen, die jetzt im Angebot geschlossen sind

1. **Backups.** Der kostenlose Supabase-Tarif sichert nicht verlässlich. Bucht Naim ihn trotzdem
   und verliert Daten, landet der Vorwurf bei dem, der es gebaut hat. Im Angebot steht deshalb
   ausdrücklich, dass ein Tarif mit Datensicherung Voraussetzung ist.
2. **Sicherheitsupdates.** Wenn niemand patcht, entsteht ein Datenschutzverstoß — nach dem
   Kontenwechsel ist das Naims Verstoß, nicht deiner. Trotzdem solltest du die
   **Sicherheitspauschale von 79 €/Monat** anbieten und, falls Naim ablehnt, die Ablehnung
   schriftlich im Vertrag festhalten. Das ist der Unterschied zwischen „nicht zuständig" und
   „hat es sehenden Auges laufen lassen".
3. **AVV-Kette.** Da die Konten Naim gehören, muss **Naim selbst** die
   Auftragsverarbeitungsverträge mit Supabase, Twilio, Vapi, ElevenLabs und Vercel abschließen.
   Realistisch wird er das nicht von allein tun. Stell ihm die Links und Vorlagen bereit und lass
   dir den Abschluss bestätigen — sonst betreibt dein wichtigster Referenzkunde eine rechtswidrige
   Datenverarbeitung mit deinem Namen darauf.

### Und das bleibt trotz „ich übernehme nichts mehr"

- **24 Monate Gewährleistung** ab Abnahme, gesetzlich zwingend beim Werkvertrag. Dafür brauchst du
  Zugang zu Naims Konten — im Angebot steht deshalb: Ohne Zugang ruht die Gewährleistung.
- **Ein schlanker AVV zwischen Naim und dir**, weil du bei Gewährleistung, Pauschale oder
  beauftragter Entwicklung auf personenbezogene Daten zugreifst.
- **Anlage 2 aus dem Pilotvertrag passt nicht mehr** — die Unterauftragsverarbeiter dort sind
  jetzt Naims eigene Vertragspartner. Der AVV muss für dieses Modell neu geschrieben werden.

---

## 8 · Nachtrag 2: Verkauf **mit** Quellcode — 34.900 €

Entschieden: Naim bekommt den Quellcode. Damit wird nicht mehr die Nutzung verkauft, sondern das
Werk selbst. Das Angebot in [`06-Angebot-Naim-Edition.md`](06-Angebot-Naim-Edition.md) ist
entsprechend gefasst.

### Woher der Preis kommt

| Ankerpunkt | Betrag |
|---|---|
| Nachbau durch einen Dienstleister (6–12 Monate) | 80.000–150.000 € |
| Fünf Jahre Abo inklusive Wartung, das entfällt | ~23.800 € |
| Lizenz ohne Quellcode (voriges Modell) | 17.900 € |
| **Verkauf mit Quellcode** | **34.900 €** |

Das ist rund das Doppelte der reinen Nutzungslizenz und für Naim gegenüber einem Nachbau immer
noch ein Bruchteil. **Verhandlungsuntergrenze: 29.000 €.** Darunter verkaufst du dein Produkt
unter dem Wert von fünf Jahren Abo — und diesmal gibst du es endgültig aus der Hand.

### Die fünf Klauseln, an denen alles hängt

1. **Einfaches, nicht ausschließliches Recht.** Der wichtigste Satz des ganzen Geschäfts. Würdest
   du ein ausschließliches Recht einräumen, dürftest du **denselben Code nicht mehr für Werkano
   verwenden** — dein Produkt wäre weg. Im Angebot steht deshalb ausdrücklich, dass du weiter an
   beliebig viele andere Betriebe lizenzieren darfst, auch an Wettbewerber von Naim. Übertragen
   wird ohnehin nur ein Nutzungsrecht: Das Urheberrecht selbst ist nach § 29 UrhG nicht übertragbar.
2. **Weitergabeverbot mit Vertragsstrafe von 25.000 €.** Ein Verbot ohne Vertragsstrafe ist
   praktisch wertlos, weil du im Streit den Schaden beziffern müsstest — was bei Software kaum
   gelingt. Die Höhe muss angemessen sein; 25.000 € bei 34.900 € Kaufpreis ist vertretbar,
   100.000 € wären angreifbar.
3. **Gewährleistung entfällt für geänderte Teile.** Ohne diesen Satz haftest du 24 Monate für
   Fehler, die ein fremder Entwickler eingebaut hat.
4. **Open-Source-Bestandteile.** Der Code enthält Fremdbibliotheken. Du kannst daran keine Rechte
   einräumen, die du selbst nicht hast — das muss dastehen, sonst versprichst du etwas Unmögliches.
5. **Geschäftsgeheimnis-Kennzeichnung.** Schutz nach dem Geschäftsgeheimnisgesetz gibt es nur bei
   „angemessenen Geheimhaltungsmaßnahmen". Die Kennzeichnung im Vertrag plus die Pflicht, eigene
   Entwickler schriftlich zu verpflichten, ist genau diese Maßnahme.

### Drei praktische Punkte, die leicht untergehen

- **Übergabe ohne Git-Historie.** Ein sauberer Code-Export, kein Repository-Fork. Die Historie
  enthält deine gesamte Werkano-Entwicklung, Spuren anderer Kunden — Malik steht namentlich in
  alten Commits — und deine Arbeitsweise. Das gehört nicht mit übergeben.
- **Zahlung vor Übergabe.** Zweite Rate **vor** der Quellcode-Übergabe, nicht danach. Ist der Code
  einmal draußen, hast du kein Druckmittel mehr. Im Angebot steht zusätzlich, dass die Rechte erst
  mit vollständiger Zahlung übergehen.
- **Steuern.** 34.900 € in einem Jahr sind ein Einkommenssprung. Kläre mit deinem Steuerberater,
  ob eine Aufteilung über den Jahreswechsel (Anzahlung im einen, Schlusszahlung im anderen Jahr)
  sinnvoll ist — das ist bei einem Werkvertrag gestaltbar, aber nur vorher.

### Was danach realistisch übrig bleibt

Nach der Übergabe hast du kein Druckmittel mehr: keinen Hosting-Zugang, keinen Code-Vorsprung,
keine Abhängigkeit. Naim kann jeden günstigeren Entwickler beauftragen. Kalkuliere die 95 €/Stunde
danach **nicht** als eingeplanten Umsatz ein — was kommt, ist Zugabe. Der Kaufpreis muss sich für
sich allein rechnen. Genau deshalb 34.900 € und nicht 20.000 €.
