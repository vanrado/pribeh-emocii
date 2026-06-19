# Prototyp v1 — Veľký príbeh emócií

Interaktívny klikateľný prototyp Core Flow MVP (Screen 1–7) z `Wireframe 0.3.md`
a `Integrácia AI do MVP koučingového toku.md`.

## Ako spustiť
Otvor `index.html` priamo v prehliadači (žiadny build krok, žiadne závislosti).

## Rozsah v1
- Core Flow S1–S7 (jedna kompletná session)
- AI návrhy a sumarizácie = mock dáta (vopred pripravené texty), nie živé API volania
- Safety Flow (prerušenie pri kríze) zatiaľ nie je implementovaný
- História session (S8–S9) zatiaľ nie je implementovaná

## Dátový základ
- 3 kurátorské záťažové karty: Úzkosť, Bezmocnosť, Hnev
- 3 kurátorské akčné karty: Odvaha, Dôstojnosť, Nádej
- Plný zoznam 30 záťažových + 30 akčných kariet (z `Príručka emócie.pdf`) dostupný
  cez "Otvoriť zoznam všetkých kariet" — výber mimo kurátorskej trojice použije
  generický fallback text

## Známe ďalšie kroky (mimo v1)
1. Safety Flow vetva
2. S8/S9 (Moja cesta + archív session)
3. Napojenie na živé Claude API namiesto mock dát
