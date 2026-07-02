# v4 — obrázky kariet a karusel v krokoch 3, 4 a 5

Odvodené z `v3`. Rozširuje vizuálny jazyk kroku 2 (centrovaný karusel kariet
s reálnymi ilustráciami) na ďalšie kroky Core Flow.

## Čo sa zmenilo oproti v3

- **Krok 3 (Porozumenie):** namiesto malej SVG figúrky sa zobrazuje **skutočná
  ilustrácia vybranej karty** (na výšku, s názvom emócie). Sekcia „Zmysel
  emócie" ostáva nezmenená pod obrázkom.
- **Krok 4 (Výber smeru):** rovnaký mechanizmus ako krok 2 —
  **centrovaný snap karusel** 3 odporúčaných zelených kariet (ťuk = výber +
  otočenie na zadok so „Zmysel emócie" a „Čo potrebujem urobiť"), navigačné
  bodky, inline **zoznam všetkých 30 zelených kariet** s vyhľadávaním namiesto
  modalu. Zrušené tlačidlo „Chcem tento smer" — potvrdenie cez výber + jediné
  spodné CTA **„Pokračovať"**.
- **Krok 5 (Zmysel cieľa):** most „záťažová → akčná" ostáva vizuálne rovnaký
  (dve karty vedľa seba), len **doplnené ilustrácie oboch kariet**.
- Vyčistené mŕtve CSS/JS zo starej flip-karty, chipov a modalu.

## Obrázky

Zelené karty používajú `docs/karty/31.webp`–`60.webp` (priradenie podľa poradia
v `allGreenNames` — rovnako provizórne ako pri oranžových, treba overiť podľa
príručky). Fallback na SVG figúrku ostáva.

## Známe ďalšie kroky

- Overiť priradenie číslo→emócia podľa príručky (oranžové aj zelené).
- Safety Flow, S8/S9, živé Claude API (viď CLAUDE.md).
