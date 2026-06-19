# Prototyp v2 — Veľký príbeh emócií

Rovnaký Core Flow (S1–S7) ako v1, prerobený z "telefón v rámiku" na
plnohodnotnú responzívnu webovú appku, mobile-first.

## Čo sa zmenilo oproti v1
- Odstránený fake "phone frame" (žiadny notch, žiadny čierny rámik, žiadna
  pevná 390×830 veľkosť) — appka teraz vyplňuje skutočný viewport.
- Mobile-first layout: na mobile ide o plnoobrazovkovú appku (sticky horná
  lišta s progressom, sticky CTA tlačidlo dole, podporuje aj
  `env(safe-area-inset-*)` pre notch/home-indicator na iOS).
- Na širších viewportoch (≥700px) sa obsah centruje do max. 600px stĺpca
  s jemným tieňom — bez akéhokoľvek "device chrome" vzhľadu, len responzívna
  stránka.
- Modálne okno so zoznamom všetkých 30 kariet je teraz `position:fixed`
  na celý viewport (predtým bolo viazané na rámik telefónu).
- Typografia škáluje cez `clamp()` medzi mobilom a desktopom.

## Ako spustiť
Otvor `index.html` priamo v prehliadači — žiadny build krok, žiadne
závislosti (okrem Google Fonts cez CDN).

## Rozsah (rovnaký ako v1)
- Core Flow S1–S7 (jedna kompletná session)
- AI návrhy a sumarizácie = mock dáta, nie živé API volania
- Safety Flow a S8/S9 (história) zatiaľ nie sú implementované

## Ďalšie kroky (mimo v2)
1. Safety Flow vetva
2. S8/S9 (Moja cesta + archív session)
3. Napojenie na živé Claude API namiesto mock dát
