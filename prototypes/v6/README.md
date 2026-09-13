# Prototyp v6 — živé AI návrhy kariet

Prvá verzia, ktorá naozaj volá AI. Oproti v5 sa **nemení UI ani obsah kariet** —
mení sa len zdroj troch odporúčaných kariet v kroku 2 a 4.

## Čo je nové

- **Krok 2 a 4 volajú `POST /api/ai`** (úloha `navrhni-karty`) s textom
  situácie od používateľa. Karty už nie sú natvrdo `['Úzkosť','Bezmocnosť','Hnev']`.
- **Zdôvodnenie na zadnej strane karty** — pole `preco` z odpovede sa zobrazí
  nad sekciou „Situácia, ktorá sa ti deje“. Bez AI badge, bez chat bubliny:
  číta sa ako bežný text appky (princíp „AI je neviditeľná“).
- **Loading stav** — namiesto kariet sa ukáže shimmer skeleton v rovnakom
  rozmere, takže layout neposkočí.
- **Fallback pri zlyhaní** — keď volanie spadne (503 bez kľúča, sieť, 4xx),
  appka ticho použije pôvodnú trojicu z v5 a pod karusel dá jednu vetu.
  Flow sa nikdy nezasekne.

## Čo to vyžaduje

v6 sa **musí servovať cez Worker**, nie cez `python3 -m http.server` —
inak `/api/ai` neexistuje a uvidíš vždy len fallback:

```bash
nvm use && npm run dev      # http://localhost:8788/prototypes/v6/
```

Bez `OPENAI_API_KEY` v `.dev.vars` vracia endpoint 503 → fallback. To je
zároveň dobrý spôsob, ako si otestovať chybovú vetvu.

## Čo NIE je hotové

- **Safety Flow.** Server vracia `kriza: true`, v6 na to zobrazí dočasnú
  zástavu — ale **nie je to bezpečnostná obrazovka zo špecifikácie**.
  Tok sa tvrdo nepreruší a krízové kontakty sú prázdny placeholder; čísla
  musí dodať klient. Kým to nie je hotové, appka nepatrí pred reálnych
  používateľov.
- **Zvyšné AI úlohy** — zhrnutie situácie (S1), kontextové vysvetlenie (S3),
  premostenie (S5), mini-kroky (S6) a sumár + mantra (S7) sú stále šablóny.
- v5 zostáva ako plne funkčná mock verzia na demo bez kreditu a bez rizika,
  že volanie zlyhá.
