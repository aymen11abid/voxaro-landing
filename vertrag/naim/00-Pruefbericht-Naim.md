# Prüfbericht — Vertrag Auto Naim

Was sich gegenüber der allgemeinen Vorlage geändert hat und warum.

> Keine Rechtsberatung. Vor der ersten Unterschrift eine Stunde Anwalt für IT-Recht — danach ist die Vorlage beliebig oft verwendbar.

---

## 1 · Was aus den alten Unterlagen übernommen wurde

Im CRM-Repo (`auto-flow-crm/docs`) liegen bereits `agb.md`, `avv-werkstatt-vorlage.md` und `auftragsbestaetigung-vorlage.md`. Daraus übernommen und in den Naim-Vertrag eingearbeitet:

- **Echte Vertragsdaten:** Aymen Abid, Noackstraße 17 A, 64285 Darmstadt — Gerichtsstand Darmstadt.
- **Echte Dienstleisterliste** für die Auftragsverarbeitung: Supabase, Twilio, Vapi.ai, ElevenLabs, Vercel — mit Sitz und Übermittlungsgrundlage. Das war die größte Lücke der allgemeinen Vorlage, die dort nur Platzhalter hatte.
- **Das Finanzdienstleistungsverbot** aus § 5 der AGB — für einen Autohändler ist das der wichtigste Paragraf überhaupt (siehe Abschnitt 3).
- **24-Stunden-Meldefrist** bei Datenschutzverletzungen, wie in der bestehenden AVV-Vorlage. Gesetzlich reichen 72 Stunden für die Meldung an die Behörde; 24 Stunden sind selbst auferlegt. Beibehalten, damit Malik und Naim dieselbe Frist haben — wenn du sie lockern willst, dann in beiden Dokumenten gleichzeitig.

**Der offene Punkt J aus deinem Compliance-Status** („AVV mit bestehenden Kunden unterzeichnen — Malik + Auto Naim") ist mit Anlage 2 für Naim erledigt, sobald unterschrieben ist. Für Malik fehlt das Gegenstück weiterhin.

## 2 · Was am bestehenden AGB-Text schwach ist

Der Naim-Vertrag ist eine **Individualvereinbarung** und geht den AGB vor (§ 305b BGB), deshalb greifen die folgenden Punkte für Naim nicht mehr. Für alle anderen Kunden solltest du die AGB aber nachziehen:

| Stelle | Problem | Im Naim-Vertrag gelöst durch |
|---|---|---|
| AGB § 10 | Es fehlt der Ausschluss der **verschuldensunabhängigen Haftung nach § 536a Abs. 1 BGB**. Das ist bei SaaS die gefährlichste Vorschrift überhaupt: Haftung für Anfangsmängel ganz ohne Verschulden. | § 12.2 |
| AGB § 10 Abs. 3 | Pauschaler Ausschluss von Datenverlust und entgangenem Gewinn — auch bei grober Fahrlässigkeit. Solche Totalausschlüsse kippen nach § 307 BGB, und dann haftest du **unbegrenzt**. | § 13.1–13.4, gestufte Regelung mit Deckel |
| AGB § 7 Abs. 6 und § 13 | Preis- und AGB-Änderung per **Schweigen = Zustimmung**. In AGB angreifbar. | § 2.3 und § 7: feste Preise, Ankündigung, echtes Sonderkündigungsrecht |
| AGB § 9 Abs. 1 | „Eine Mindest-Verfügbarkeit wird nicht garantiert" — steht im Widerspruch zur „24/7"-Aussage auf der Website. Widersprüche gehen zu Lasten des Verwenders. | § 4.1: 99 % im Monatsmittel mit klar benannten Ausnahmen |
| AGB § 8 | Kein geregelter Ablauf bei Zahlungsverzug, nur „Sperrung nach Mahnung". | § 8: Verzug → 2 Mahnungen → Sperrung → fristlose Kündigung |

## 3 · Was für Auto Naim zusätzlich drin ist

Naim ist **Autohändler**, nicht nur Werkstatt. Dein `Rechter`-Agent hat die Sonderregeln selbst notiert — sie stehen jetzt als § 6 im Vertrag:

- **§ 6.1 — Der Assistent nennt keine Fahrzeugpreise, Verbrauchs- oder Emissionswerte** (PKW-EnVKV), **keine Finanzierung, Leasing oder Zinsen** (§ 34c GewO, KWG) und **keine Versicherungen** (§ 34d GewO, IDD). Ohne Erlaubnis ist das eine Ordnungswidrigkeit bzw. erlaubnispflichtiges Geschäft — und der Ärger landet zuerst bei dem, der die Software betreibt.
- **§ 6.2 — Kein Vertragsabschluss über Fahrzeuge**, nur Terminvereinbarung. Sonst stehst du im Fernabsatzrecht.
- **§ 6.3 — Vollmachten, Kaufvertragsdaten, Rechnungen sind Vorlagen.** Naim prüft und zeichnet verantwortlich. Wichtig, weil die Software die Sammelvollmacht auf Knopfdruck erzeugt und die Kaufvertragserkennung aus Fotos arbeitet — die kann Zeichen verwechseln, und bei einer FIN reicht ein falsches Zeichen für echten Schaden.
- **§ 6.4 — Steuern, GoBD und Geldwäschegesetz bleiben bei Naim.** Differenzbesteuerung nach § 25a UStG, Aufbewahrungspflichten, Güterhändlerpflichten nach GwG. Du lieferst kein testiertes Buchhaltungssystem und keine revisionssichere Archivierung — das steht jetzt ausdrücklich drin. Das war in der früheren Analyse schon als Compliance-Falle markiert.
- **§ 6.5 — Schwacke, mobile.de, AutoScout24 braucht Naim selbst lizenziert.** Sonst haftest du für fremde Datenlizenzen.
- **Anlage 2** nennt die Kaufvertrags- und Vollmachtsdaten ausdrücklich als Datenarten und Verkäufer, Vorbesitzer und Spediteure als Betroffene. Ohne das deckt der AVV die Hälfte dessen nicht ab, was das Autohandel-Modul tatsächlich verarbeitet.

## 4 · Was dich als Pilotvertrag schützt

Ein Pilotkunde, der beim Bauen mitredet, ist rechtlich riskanter als ein normaler Kunde. Deshalb § 2:

| Klausel | Warum sie da ist |
|---|---|
| § 2.6 — Ideen und Prozessbeschreibungen darfst du frei verwenden, **keine Miturheberschaft, keine Beteiligung, keine Vergütung** | Naims Einkaufsprozess und sein Excel sind die Blaupause für ein Modul, das du an alle verkaufst. Ohne diese Klausel ist die Frage „wem gehört das eigentlich" später offen. |
| § 2.4 — **keine Exklusivität**, auch nicht in Darmstadt | Pilotkunden fragen genau danach. Ein zugesagtes Gebietsrecht macht dein Geschäftsmodell kaputt. |
| § 2.1 / § 12.3 — Pilotstatus ist ausdrücklich vereinbart | Einzelne Fehler sind dann kein Mangel, sondern Teil des Vereinbarten. |
| § 2.3 — Sonderpreis endet mit der Pilotphase, Folgepreis wird 8 Wochen vorher angekündigt | Verhindert, dass 249 € stillschweigend zum Dauerpreis werden. |
| § 2.5 — Referenznennung erlaubt | Der Rabatt wird auch dafür gegeben. Widerruflich, damit es fair bleibt. |
| § 11.3 — kein Nachbauen oder Nachbauen-Lassen | Naim kennt nach zwölf Monaten jedes Detail deiner Software. |
| § 8.6 Satz 2 — bei fester Laufzeit werden Restmonate als Schadensersatz fällig | Sonst ist eine 12-Monats-Bindung wertlos: Wer nicht zahlt, kommt sonst günstiger raus als wer kündigt. |

## 5 · Was du entscheiden musst, bevor gedruckt wird

1. **Die Konditionen bestätigen.** In Anlage 1 stehen 249 €/Monat, 12 Monate fest, 400 Min, 300 SMS, 990 € Einrichtung — der Stand aus der Preis-Diskussion vom 28.07.2026, der nie bestätigt wurde. Regulär wären es 298 € (Pro 199 + Autohandel 99).
2. **Einrichtungsgebühr:** 990 € sofort, in Raten oder erlassen? Bei einem Pilotkunden, der viel Zeit investiert, ist Erlass oder Verrechnung üblich — dann aber ausdrücklich als Gegenleistung für die Mitwirkung nach § 2.2 benennen, nicht kommentarlos streichen.
3. **Stundensatz** für Anpassungen (§ 3.2). Vorschlag 90–150 € netto.
4. **Naims vollständige Firmierung, Adresse, USt-IdNr.** und den Namen des Unterzeichners eintragen — in den Unterlagen taucht „Ressa Naim" als Vollmachtgeber auf, aber nicht die Firmierung laut Gewerbeanmeldung.
5. **Malik nicht vergessen:** Für Auto Malik fehlt derselbe Satz Unterlagen. Der Vertrag hier lässt sich mit geändertem Namen und ohne § 6 (kein Fahrzeughandel) direkt wiederverwenden.

## 6 · Was gleich geblieben ist

Zahlungsverzug (§ 8), Haftungsdeckel auf zwölf Monatsentgelte (§ 13.2), Ausschluss von § 536a Abs. 1 BGB (§ 12.2), Datenexport 30 Tage (§ 9.4), kein Zurückbehalten von Daten (§ 8.7), KI-Ansage und Aufzeichnungsverbot (§ 5.5) — das sind dieselben Regelungen wie in der allgemeinen Vorlage, sie sind im Prüfbericht dort begründet.
