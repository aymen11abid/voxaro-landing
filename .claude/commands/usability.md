---
description: Landingpage im echten Browser auf Usability testen und Verbesserungen umsetzen
argument-hint: "[URL] [nur-bericht]"
---

Starte den Subagenten `usability-tester` fuer diese Aufgabe.

Argumente: $ARGUMENTS

- Ist eine URL angegeben, teste diese statt der lokalen `index.html`
  (`node usability/audit.mjs --url <URL>`); Aenderungen dann trotzdem in `index.html`.
- Enthalten die Argumente "nur-bericht", setze nichts um, sondern liefere nur
  den priorisierten Bericht.

Fasse danach das Ergebnis des Agenten fuer mich zusammen.
