# v3 — redizajn Screen 2 (Pomenovanie emócie)

Odvodené z `v2`. Mení sa **iba Screen 2** (výber záťažovej/oranžovej emócie),
zvyšok flow (S1, S3–S7) aj Screen 4 (zelené karty) ostáva ako vo v2.

## Čo sa zmenilo oproti v2 a prečo

- **Zoznam kariet namiesto jednej karty.** Odporúčané karty (3) sa teraz
  zobrazujú ako **accordion zoznam** — klik kartu rozbalí a označí. Zodpovedá to
  zdrojovému wireframu (`docs/source/wireframe-0.3.md`), predtým bola len jedna
  flip-karta + „chip" prepínače.
- **Obrázky na kartách.** Karty načítavajú ilustráciu z `docs/karty/` (súbory
  číslované `1.webp`–`60.webp`, skomprimované z pôvodných CMYK JPG). Priradenie
  číslo→emócia je zatiaľ **provizórne podľa poradia** — treba overiť podľa
  príručky (pozri `docs/karty/README.md`). Ak obrázok chýba, zobrazí sa náhradná
  SVG figúrka — žiadne rozbité ikony.
- **Zrušený modal „všetky karty".** Nahradený **inline panelom** s
  **vyhľadávacím poľom** (filtruje 30 kariet, ignoruje diakritiku).
- **Bez tlačidla „Áno, toto je ono".** Karta sa potvrdí **výberom** (zvýraznenie)
  a jedným spodným CTA **„Pokračovať"** — v súlade s princípom „jeden CTA na
  obrazovku".
- **Náhodné odporúčanie.** Tlačidlo „Neviem, čo cítim — vyber za mňa náhodne"
  vyberie a rozbalí náhodnú kartu z 30 pre používateľa, ktorý nevie pomenovať,
  čo cíti.

## Známe ďalšie kroky

- Rovnaký redizajn preniesť aj na **Screen 4** (zelené karty) — zatiaľ ostáva
  po starom (chips + modal).
- Dodať reálne obrázky kariet do `docs/karty/`.
