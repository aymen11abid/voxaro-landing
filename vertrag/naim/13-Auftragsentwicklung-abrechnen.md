# Auftragsentwicklung: Was du Naim in Rechnung stellen kannst

Wenn du den Weg der Auftragsentwicklung gehst — Naim bringt den Prozess, du setzt ihn um —
dann ist das ein Projektgeschäft mit eigenen Regeln. Hier steht, was abrechenbar ist, wie du es
schneidest und was es kostet.

---

## 1 · Was überhaupt abrechenbar ist

Programmierung ist nur einer von acht Posten. Die meisten Einzelentwickler verschenken die
anderen sieben.

| Posten | Abrechnung | Bemerkung |
|---|---|---|
| **Analyse und Konzept** | Festpreis | Vor-Ort-Aufnahme, IST-Prozess, SOLL-Entwurf, technische Spezifikation. **Das ist Arbeit, kein Vorverkauf.** |
| **Umsetzung** | Festpreis je Baustein | siehe Ziffer 3 |
| **Datenübernahme** | Festpreis | Excel-Bestand, Kunden, Fahrzeuge einlesen und prüfen |
| **Schulung und Einweisung** | Tagessatz 690 € | halbe Tage 390 € |
| **Dokumentation** | Festpreis oder inklusive | Bedienung, nicht Technik |
| **Reisezeit** | 50 % des Stundensatzes | bei Vor-Ort-Terminen üblich und fair |
| **Eilzuschlag** | + 50 % | bei Umsetzung unter 5 Werktagen |
| **Betrieb und Bereitschaft** | monatlich | siehe Ziffer 5 |

**Nicht abrechenbar:** Arbeit, die vor einer Beauftragung geleistet wurde. Was du bisher an
Analyse gemacht hast, kannst du nicht rückwirkend in Rechnung stellen — aber du kannst es als
Leistung in das Angebot aufnehmen und übergeben. Ab jetzt gilt: **kein Termin, keine Zeile Code
ohne Beauftragung in Textform.**

## 2 · Der Schnitt: Festpreis je Baustein, nicht ein großes Projekt

Ein einziger Werkvertrag über das gesamte Modul bedeutet: eine Abnahme, ein Zahlungstermin,
24 Monate Gewährleistung über alles, und jeder Streit betrifft das Ganze.

**Besser: jeder Baustein ist ein eigener kleiner Auftrag** — eigenes Angebot, eigene Abnahme,
eigene Rechnung, eigene Gewährleistungsfrist ab eigener Abnahme.

Vorteile für dich: Du wirst laufend bezahlt statt am Ende. Ein Streit über Baustein 4 blockiert
nicht die Zahlung für Bausteine 1 bis 3. Und du kannst nach jedem Baustein aufhören.
Vorteil für Naim: Er sieht nach zwei Wochen etwas Fertiges und kann nach jedem Schritt umsteuern.

## 3 · Konkrete Preisliste aus deinem eigenen Technik-Plan

Dein `ticket-18-technik-plan.md` ist bereits die Spezifikation. Daraus die Bausteine, die noch
offen sind:

| Baustein | Inhalt laut deinem Plan | Aufwand | Festpreis |
|---|---|---|---|
| **1 · Einkaufs-Pipeline** | Schritt 1.5 + 2: Migration Rev. 2, Typen, Bearbeiten, Status, Filter, Badges, Eingangs-Check | 22–34 h | **2.400 €** |
| **2 · Spedition & Sammelvollmacht** | Schritt 3: Migration, API, Spedition-Seite, Vollmacht-Bündel nach Route | 16–24 h | **2.200 €** |
| **3 · Eingangs-Check mit Fotos** | Schritt 5: Migration, Foto-API, Storage-Cleanup, UI | 10–14 h | **1.300 €** |
| **4 · Karte v2** | Schritt 6: Fächer-Layout, Pin-Interaktion | 8–12 h | **1.000 €** |
| **5 · Schnell-Aktionen an Badges** | Schritt 7: Popover, Status-Dropdown | 6–10 h | **800 €** |
| **6 · Schwacke-Mappe** | offener Rest aus Schritt 4 | 8–12 h | **1.100 €** |
| **7 · Bestand ↔ Verkauf** | Ticket 19 | 20–30 h | **2.600 €** |
| **Analyse und Spezifikation** | 648 Zeilen Prozess- und Technikdokumentation | — | **1.900 €** |
| **Summe** | | **90–136 h** | **13.300 €** |

Gerechnet mit 95 € je Stunde. Die Stundenschätzungen stammen aus dem Umfang deiner eigenen
Tickets — gleich sie mit dem ab, was die Schritte 1 bis 4 tatsächlich gedauert haben, und
korrigiere nach oben, wenn du langsamer warst als geplant. **Ein Festpreis, der zu knapp
kalkuliert ist, ist ein Verlustgeschäft mit Gewährleistung obendrauf.**

Zahlung je Baustein: 50 % bei Beauftragung, 50 % bei Abnahme.

## 4 · Der Preis hängt an den Rechten — das ist der eigentliche Hebel

Derselbe Code kostet unterschiedlich viel, je nachdem was Naim damit darf:

| Variante | Was Naim bekommt | Preis |
|---|---|---|
| **A — Standard** | Nutzungsrecht. Du darfst alles wiederverwenden und an andere Betriebe verkaufen. | **13.300 €** |
| **B — Branchenexklusiv** | Du verkaufst es zwei Jahre nicht an andere Fahrzeughändler im Umkreis von 50 km | **+ 50 % → 19.900 €** |
| **C — Voll exklusiv** | Du darfst es nie wieder verwenden | **× 2,5 → 33.000 €** |

Variante C ist praktisch derselbe Betrag wie der Quellcode-Verkauf für 34.900 € — kein Zufall:
In beiden Fällen gibst du das Produkt auf. **Wenn Naim exklusiv will, ist das keine
Rabattverhandlung, sondern ein Unternehmenskauf.**

Empfehlung: Variante A anbieten und Variante B nur, wenn er darauf besteht. Zwei Jahre
Wettbewerbsschutz in 50 km kosten dich wenig — deine anderen Kunden sind Werkstätten, keine
Händler.

## 5 · Laufend, nach der Umsetzung

| Position | Preis |
|---|---|
| Betrieb und Sicherheitspflege (falls auf deinen Servern) | 149 € / Monat |
| Sicherheitspauschale (falls auf seinen Konten) | 79 € / Monat |
| Weiterentwicklung nach Bedarf | 95 € / Std., ab 2 Std. Festpreis |
| Kontingent 4 Std. / Monat | 340 € / Monat |
| Rufbereitschaft außerhalb der Geschäftszeiten | auf Anfrage, mindestens + 50 % |

## 6 · Fünf Regeln, ohne die Auftragsentwicklung zum Verlustgeschäft wird

1. **Nichts ohne Beauftragung in Textform.** Eine WhatsApp-Nachricht „ja mach mal" reicht als
   Textform — aber sie muss existieren.
2. **Änderung am laufenden Baustein = neues Angebot.** Der Klassiker: Der Baustein ist zu 80 %
   fertig, dann kommt „ach, und wenn wir schon dabei sind…". Genau dort entstehen die Verluste.
3. **Abnahme schriftlich, je Baustein.** Ohne Abnahme keine Schlussrechnung — und ohne Abnahme
   beginnt die Gewährleistungsfrist nie zu laufen.
4. **Trenne Mangel von Wunsch.** „Funktioniert nicht wie beschrieben" ist kostenlos.
   „Ich hätte es gern anders" kostet. Diese Grenze verläuft an der Spezifikation — deshalb ist
   die Analyse-Position bezahlte Arbeit und kein Beiwerk.
5. **Wiederverwendungsrecht immer behalten** (Variante A). Sonst wird jeder Auftrag zum Verkauf
   eines Stücks deines Produkts.

## 7 · Was du dabei nicht vergessen darfst

Auftragsentwicklung zu 95 € die Stunde bringt bei 20 Stunden im Monat rund **1.900 € monatlich** —
und hört auf, sobald du aufhörst zu arbeiten. Fünfzehn Abo-Kunden bringen **3.700 € im Monat**,
auch in dem Monat, in dem du krank bist.

Beides gleichzeitig geht nur, wenn die Bausteine im Produkt landen (Variante A). Deshalb ist die
Rechtevariante wichtiger als der Stundensatz.
