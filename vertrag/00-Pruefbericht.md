# Prüfbericht — worauf beim Vertrag geachtet wurde

_Kurz und deutlich. Kein Vertrag über 1000 Seiten: fünf Seiten Hauptvertrag, ein Preisblatt, ein Datenschutz-Anhang. Mehr braucht ein SaaS-Vertrag für Werkstätten nicht — weniger wäre riskant._

> **Hinweis:** Das ist eine sorgfältige fachliche Einschätzung, aber keine Rechtsberatung. Vor dem ersten Einsatz sollte ein Anwalt für IT-Recht einmal eine Stunde darüberschauen (Kosten typisch 300–800 €). Das ist gut investiert, weil du diesen Vertrag hundertfach verwendest.

---

## 1. Die Grundentscheidung: Miete, nicht Kauf

Software as a Service ist nach der Rechtsprechung des BGH **Mietrecht**. Das hat zwei Folgen, die im Vertrag beide geregelt sind:

- Du **verkaufst nichts** — der Kunde bekommt nur ein Nutzungsrecht auf Zeit (§ 1.2). Damit kann er später nicht behaupten, ihm gehöre die Software oder eine für ihn gebaute Anpassung (§ 2.3, § 9.1).
- Mietrecht bringt eine gefährliche Vorschrift mit: **§ 536a Abs. 1 BGB**. Danach haftest du für Mängel, die bei Vertragsschluss schon vorhanden waren, **auch ohne jedes Verschulden** — ein einziger Bug vom ersten Tag könnte zu vollem Schadensersatz führen. Deshalb ist diese Haftung in **§ 10.2 ausdrücklich ausgeschlossen**. Das ist die wichtigste einzelne Klausel im ganzen Vertrag für dich. Streich sie nie.

## 2. Was passiert, wenn nicht gezahlt wird (§ 6)

Das war deine Hauptfrage. Der Ablauf ist bewusst als klare Treppe gebaut — jede Stufe ist gesetzlich abgesichert:

| Stufe | Was passiert | Rechtsgrundlage |
|---|---|---|
| Tag 0 | Rechnung, fällig 10 Tage später | § 5.3 |
| Tag 10 | Verzug **automatisch**, ohne Mahnung | § 286 Abs. 2 Nr. 2 BGB |
| ab Tag 10 | 9 Prozentpunkte Zinsen über Basiszins + **40 € Pauschale** | § 288 Abs. 2 und 5 BGB |
| Tag 11 | 1. Mahnung, 7 Tage Frist | § 6.3 |
| Tag 18 | 2. Mahnung **mit Sperrandrohung**, 7 Tage Frist | § 6.3 |
| Tag 25 | **Sperrung** des Zugangs, wenn mindestens ein Monatsentgelt offen ist | § 320 BGB, § 6.4 |
| bei 2 Monatsentgelten Rückstand | **fristlose Kündigung**, alles sofort fällig | § 543 Abs. 2 Nr. 3 BGB analog, § 6.6 |

Drei Punkte, die dich schützen und die viele Verträge falsch machen:

- **Sperrandrohung vorher.** Wer ohne Vorwarnung abschaltet, ist selbst in der Pflicht — der Kunde kann dann Schadensersatz für entgangene Aufträge fordern. Mit der zweistufigen Mahnung ist die Sperrung sauber.
- **Während der Sperrung laufen Anrufe auf die Rückfallnummer** (§ 6.4). Das kostet dich nichts, nimmt dem Kunden aber das stärkste Argument vor Gericht („Ihr habt meinen Betrieb lahmgelegt"). Deshalb steht die Rückfallnummer in Anlage 1.
- **Das Entgelt läuft während der Sperrung weiter** (§ 6.5) — sonst würde sich Nichtzahlen lohnen.

**Ein bewusster Verzicht:** Die Daten des Kunden werden **nicht** als Druckmittel zurückgehalten (§ 6.7). Personenbezogene Daten „einzubehalten", bis gezahlt wird, ist datenschutzrechtlich angreifbar und bringt dir vor Gericht mehr Ärger, als es Geld eintreibt. Dein Hebel ist die Sperrung des Dienstes, nicht die Geiselnahme der Daten.

## 3. Wo deine Rechte ausdrücklich gesichert sind

| Thema | Klausel | Warum das für dich wichtig ist |
|---|---|---|
| KI kann Fehler machen | § 1.5 | Du schuldest den Betrieb, nicht die inhaltliche Richtigkeit jedes Gesprächs. Ohne diese Klausel haftest du für jedes falsch verstandene Kennzeichen. |
| Verfügbarkeit 99 %, nicht 100 % | § 3.1, 3.2 | Auf der Website steht „24/7" — das ist Werbung. Vertraglich wird geschuldet, was du halten kannst. Ausfälle von Telefonnetz und Vorleistern sind ausgenommen. |
| Weiterentwicklung erlaubt | § 1.4 | Du darfst die Software ändern. Nur bei wesentlichen Verschlechterungen gibt es Ankündigung und Sonderkündigungsrecht — das ist fair und hält der AGB-Prüfung stand. |
| Anpassungen bleiben deine | § 2.3, § 9.1 | Sonst reklamiert der zehnte Kunde Rechte an einer Funktion, die alle nutzen. |
| Preiserhöhung möglich | § 5.6 | Einmal jährlich, 8 Wochen vorher, ab 5 % mit Sonderkündigungsrecht. Ohne diese Ausgestaltung wäre die Klausel unwirksam. |
| Keine Aufrechnung | § 5.7 | Der Kunde kann nicht einfach „verrechnen" und deshalb nicht zahlen. |
| Haftung gedeckelt | § 11.2 | Bei leichter Fahrlässigkeit maximal die Entgelte von 12 Monaten — bei Starter also 1.188 €, nicht der entgangene Umsatz einer Werkstatt. |
| Verjährung 12 Monate | § 11.6 | Halbiert das Zeitfenster für Ansprüche gegen dich. |
| Freistellung | § 4.6 | Wenn der Kunde die KI-Ansage abschaltet und deshalb Ärger bekommt, zahlt er, nicht du. |
| Gerichtsstand bei dir | § 12.5 | Du klagst und verteidigst dich zu Hause. Gilt nur gegenüber Kaufleuten — das sind deine Kunden. |
| Kunden-AGB gelten nicht | § 12.3 | Größere Autohäuser schicken gern eigene Einkaufsbedingungen mit. |

## 4. Wo der Vertrag bewusst fair bleibt

Ein Vertrag, der nur dich schützt, ist kein starker Vertrag: In AGB sind unangemessen einseitige Klauseln nach § 307 BGB **unwirksam** — und dann gilt das Gesetz, das für dich meist schlechter ist. Ein Beispiel: Wer die Haftung komplett ausschließt, haftet am Ende unbegrenzt, weil die Klausel kippt. Deshalb:

- Kündigungsrecht gilt für **beide** Seiten gleich (§ 7.2).
- Unbeschränkte Haftung bleibt bei Vorsatz, grober Fahrlässigkeit und Personenschäden (§ 11.1) — das lässt sich ohnehin nicht abbedingen.
- 30 Tage Datenexport nach Vertragsende (§ 7.4) — kostet dich wenig, ist für den Kunden aber der entscheidende Vertrauenspunkt beim Unterschreiben.
- Keine Entsperrgebühr, kein Mahngebühren-Wildwuchs — nur was das Gesetz zubilligt.
- Keine Nutzung der Kundendaten fürs KI-Training (§ 8.3). Das ist ein Verkaufsargument, kein Zugeständnis.

## 5. Zwei Pflichten, die du nicht übersehen darfst

**a) Hinweis auf die KI — § 4.5.** Seit dem 2. August 2026 gilt Art. 50 der KI-Verordnung: Wer mit einem KI-System spricht, muss das erfahren. Die Ansage zu Gesprächsbeginn ist deshalb Pflicht und darf vom Kunden nicht abgeschaltet werden.

**b) Gesprächsaufzeichnung — § 201 StGB.** Das heimliche Aufzeichnen des gesprochenen Wortes ist eine **Straftat**, nicht nur ein Datenschutzverstoß. Deshalb ist in Anlage 1 als Standard angekreuzt: **keine Audio-Aufzeichnung**, nur Transkript und Zusammenfassung. Wenn ein Kunde Audioaufnahmen will, braucht es die Einwilligung der Anrufer in der Ansage — sonst lass es.

**c) AVV ist Pflicht, nicht Kür.** Da du Kundendaten der Werkstatt verarbeitest, verlangt Art. 28 DSGVO einen Auftragsverarbeitungsvertrag. Ohne ihn drohen beiden Seiten Bußgelder — und ein Autohaus mit Datenschutzbeauftragtem unterschreibt ohne AVV gar nicht erst. Deshalb Anlage 2.

## 6. Was du noch ausfüllen / entscheiden musst

1. **Alle `[•]` und Leerstellen** in allen drei Dokumenten (Firmierung, Adresse, USt-IdNr., Support-Adresse, Stundensatz für Anpassungen).
2. **Anlage 2, § 6:** Trag deine tatsächlichen Dienstleister ein (Hosting, Telefonie, Sprachmodell, SMS-Gateway). Wenn dein Sprachmodell-Anbieter in den USA sitzt, muss dort ehrlich „USA, Standardvertragsklauseln" stehen — falsche Angaben sind der schnellste Weg zum Bußgeld.
3. **Stundensatz** für individuelle Anpassungen (Vorschlag: 90–150 € netto).
4. **§ 5.6 Preisanpassung** und die Website-Aussage „Ein Preis. Keine Überraschungen." passen zusammen — 12 Monate Preisgarantie hältst du damit ein.
5. **Impressum und Datenschutzerklärung** auf der Landingpage sind aktuell leere Links (`href="#"`). Ein fehlendes Impressum ist abmahnfähig — das solltest du vor dem ersten Kunden erledigen, unabhängig vom Vertrag.

## 7. Eine Option, über die du nachdenken solltest

Du bewirbst „monatlich kündbar" und der Vertrag setzt das um (14 Tage zum Monatsende). Das ist verkaufsfördernd, aber teuer: Du investierst Einrichtungsaufwand, den ein Kunde nach sechs Wochen mitnehmen kann.

Übliche Lösung, sauber und fair: **zwei Varianten anbieten** —
- monatlich kündbar zum Listenpreis, oder
- 12 Monate Mindestlaufzeit mit z. B. 10–15 % Rabatt.

Der Kunde wählt selbst, die Werbeaussage bleibt wahr, und du bekommst planbare Umsätze. Der Platz dafür ist in Anlage 1, Ziffer 8 („Ergänzende Vereinbarungen") schon vorgesehen.

---

## Kurzfassung

Der Vertrag ist so gebaut, dass er drei Prüfungen übersteht: die AGB-Kontrolle nach § 307 BGB (nichts ist unangemessen einseitig), die Datenschutzprüfung (AVV, Serverstandort, keine heimlichen Aufnahmen) und den Streit ums Geld (automatischer Verzug, angedrohte Sperrung, fristlose Kündigung bei zwei offenen Monatsentgelten). Er ist kurz genug, dass ein Werkstattinhaber ihn in zehn Minuten liest und unterschreibt — und lang genug, dass du im Streitfall etwas in der Hand hast.
