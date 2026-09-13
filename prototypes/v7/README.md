# Prototyp v7 — AI v porozumení (S3), vo výbere smeru (S4) a v premostení (S5)

Odvodené z `v6`. Dopĺňa fázy 3 a 4 z `docs/source/integracia-ai-do-mvp-koucingoveho-toku.md`.
UI ani obsah kariet sa nemení; mení sa, odkiaľ pochádzajú tri texty.

## Čo je nové

**S4 — akčné karty vedia, čo používateľ prežíva.** Request na `navrhni-karty`
s `balicek: "akcne"` posiela aj `zatazova` (názov zvolenej záťažovej karty).
Server do promptu vloží celú zadnú stranu tejto karty a žiada, aby akčná
emócia *odpovedala na jej zmysel*, nie aby bola náhodne „pozitívna“. Vo v6
sa posielal len text situácie, takže Úzkosť aj Hnev dostávali rovnaké
zelené karty — navonok to vyzeralo, že krok 4 AI nepoužíva.

**S5 — premostenie generuje model.** Každá z troch navrhnutých akčných kariet
príde z S4 aj s poľom `premostenie` („Namiesto úteku pred neistotou ti Odvaha
dovolí…“), takže S5 sa zobrazí okamžite, bez ďalšieho volania. Keď si
používateľ vyberie kartu **mimo návrhu** (zo zoznamu 30), S5 si most vyžiada
samostatnou úlohou `premostenie` a dovtedy ukáže textový skeleton. Ručná
tabuľka `bridgeOverrides` z v4 ostáva len ako záloha pri zlyhaní.

**S3 — zmysel emócie v kontexte situácie + otázka.** Nová úloha `porozumenie`
vráti 2–3 vety o tom, čo zvolená emócia signalizuje *v tejto* situácii, a jednu
otvorenú otázku na zamyslenie. S3 má teraz **dve polia nad sebou**: hore
statický „Zmysel emócie · z karty“ (pôvodný text od Janette, vždy viditeľný),
pod ním „Zmysel emócie · v tvojej situácii“ (dynamický text). Zámer: Janette
vidí obidva vedľa seba a posúdi, čo so statickým textom — či ostane, zmení sa,
alebo ho dynamický nahradí. Pri zlyhaní AI sa dynamické pole skryje a ostane
len text z karty (správanie v6). Otázka je v rukopisnom fonte ako mantra — je
to podnet na zamyslenie, nie formulár. Ak model otázku nevráti, nezobrazí sa.

**Prednačítanie.** Po potvrdení oranžovej karty (S2 → S3) sú známe všetky
vstupy pre S3 aj S4, preto sa obe úlohy spustia naraz: kým používateľ číta S3,
zelené karty už dobehli a S4 sa otvorí bez skeletonu.

## Ako to drží pokope (kľúče a zálohy)

Každá úloha má kľúč vstupov, pre ktoré výsledok platí:

| úloha | kľúč | záloha pri zlyhaní |
|---|---|---|
| `orange` | situácia | trojica z v5 + veta pod karuselom |
| `green` | situácia + oranžová karta | trojica z v5 + veta pod karuselom |
| `porozumenie` | situácia + oranžová karta | „Zmysel emócie“ z karty (ako v6) |
| `most` | situácia + oranžová + zelená | `bridgeOverrides`, potom šablóna (ako v6) |

Keď sa používateľ vráti a niečo zmení, kľúč nesedí a volá sa znova; odpovede,
ktoré dobehnú po zmene vstupu, sa zahodia (`*Seq`). Pri výmene zelených
návrhov sa zo zvolenej karty zmaže most, ktorý patril inej oranžovej —
S5 si potom vyžiada správny.

Všetky AI texty sa logujú do konzoly (`[AI] porozumenie …`, `[AI] green …`,
`[AI] most …`) aj s počtom tokenov — to je surovina na vyhodnotenie
experimentu (latencia, kvalita slovenčiny, ako často používateľ návrh odmietne).

## Ako to spustiť

Rovnako ako v6 musí bežať Worker, inak `/api/ai` neexistuje:

```bash
nvm use && npm run dev      # http://localhost:8788/prototypes/v7/  (Basic Auth)
```

Nové: `tools/dev-server.py` — statický server s `/api/ai` **bez Basic Auth
v prehliadači**, v dvoch režimoch:

```bash
python3 tools/dev-server.py            # MOCK — pevné odpovede, bez kľúča a bez kreditu
python3 tools/dev-server.py --proxy    # PROXY — preposiela /api/ai na wrangler dev (8788)
                                       #   s Basic Auth z .dev.vars
```

Mock mení zelený návrh podľa `zatazova` a pozná markery v texte situácie:
`[pomaly]` (2,5 s oneskorenie → skeletony), `[chyba]` (503 → zálohy),
`[kriza]` (Safety zástava). Oba režimy sú aj v `.claude/launch.json`
(`pribeh-mock`, `pribeh-proxy`).

## Čo NIE je hotové

- **Safety Flow** — stále len dočasná zástava, nie bezpečnostná obrazovka zo
  špecifikácie (viď v6).
- **S1** zhrnutie situácie, **S6** mini-kroky od AI, **S7** sumár + mantra —
  stále šablóny.
- **Rate limit / strop nákladov** na `/api/ai` — plán ho vyžaduje, Worker ho nemá.
- `prototypes/v7/cards.js` je kópia v6; `tools/csv-to-cards.py` generuje len
  `v5/cards.js` a `worker/cards.js`.
