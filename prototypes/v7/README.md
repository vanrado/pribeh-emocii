# Prototyp v7 — AI v porozumení (S3), výbere smeru (S4), príbehu zmeny (S5), mini-krokoch (S6) a závere (S7)

Odvodené z `v6`. Dopĺňa fázy 3, 4 a 5 z `docs/source/integracia-ai-do-mvp-koucingoveho-toku.md`
a záver podľa wireframu 0.3 (S7 = „kognitívne uzavretie“).
Obsah kariet sa nemení a Janettine texty ostávajú všade viditeľné; mení sa,
čo k nim appka pridá na mieru situácii.

## Čo je nové

**S4 — akčné karty vedia, čo používateľ prežíva.** Request na `navrhni-karty`
s `balicek: "akcne"` posiela aj `zatazova` (názov zvolenej záťažovej karty).
Server do promptu vloží celú zadnú stranu tejto karty a žiada, aby akčná
emócia *odpovedala na jej zmysel*, nie aby bola náhodne „pozitívna“. Vo v6
sa posielal len text situácie, takže Úzkosť aj Hnev dostávali rovnaké
zelené karty — navonok to vyzeralo, že krok 4 AI nepoužíva.

**S5 + S6 — príbeh zmeny z jedného volania.** Úloha `pribeh-zmeny` dostane
situáciu a obe zvolené karty a vráti:

- `teraz` + `most` — príbeh v dvoch úderoch („Príbeh 2 kariet“ z wireframu):
  čo s používateľom v *tejto* situácii robí záťažová emócia a čo mu akčná
  dovolí urobiť inak. Na S5 ako jeden odsek „Ako ti to pomôže?“.
- `cena` — model **vyberá** (`cena_index`, enum 0–2), ktorý z troch bodov „čo
  potrebujem urobiť“ na akčnej karte sedí na situáciu; vo v6 sa vždy bral
  prvý. Text bodu ostáva Janettin (tučne, „z karty“), pod ním jedna veta
  „v tvojej situácii“ — ten istý bod preložený do situácie, nie nová rada.
- `mikrokroky` — 2–4 kroky na 5–15 min odvodené z bodov karty, jeden
  označený „najmenší krok“. Na S6 tvoria sekciu „Na mieru pre tvoju
  situáciu“ **nad** sekciou „Z karty …“ s pôvodnými tromi bodmi (bod vybraný
  na S5 má štítok „cena za zmenu“). Je to jedna radio skupina: používateľ si
  vyberá z oboch, Janette vidí oboje vedľa seba.

Volanie sa spúšťa **už pri ťuknutí na kartu na S4** (prefetch, tlmené
350 ms): kým používateľ číta zadnú stranu, odpoveď dobehne a S5 je okamžitá.
Kto je rýchlejší ako model, uvidí skeleton. S6 sa po dobehnutí odpovede
prekreslí len dovtedy, kým si používateľ nič nevybral. Záloha na S5 = ručná
tabuľka `bridgeOverrides` z v4 a šablóna, na S6 = body z karty — presne v6.

Prompt výslovne zakazuje sľubovať výsledok („dopadne to dobre“) — pri karte
Nádej je to najľahšie pokušenie a zároveň Lumosity-pravidlo z júlového
stretnutia.

**S7 — zrkadlo cesty.** Wireframe žiada na S7 AI sumár aj AI mantru a to, čo
v6 zobrazovala, bola doslova jeho *šablóna* (plus citát zo S1 orezaný v strede
slova). Úloha `zaver` dostane situáciu, obe karty, zvolený krok (aj vlastný —
fencovaný ako situácia) a index ceny zo S5, a vráti:

- `pribeh` — 3–4 vety: s čím prišiel (jedna jeho fráza, nie citát), čo
  pomenoval a čo mu to signalizuje, čo si vybral a prečo, krok ako záväzok.
  Opisuje, čo **urobil** — nie čo sa stane.
- `mantry` — dva varianty krátkej vety v 1. osobe. Na S7 sa ukáže jedna,
  pod ňou **„Iná“** (druhý variant) a **„Upraviť“** (inline). Mantra je
  najosobnejší artefakt appky — tu je „Copilot, nie Autopilot“ vidieť.

Prefetch pri výbere kroku na S6 (radio); pri vlastnom kroku až pri „Toto
spravím“, inak by každá pauza v písaní stála volanie. „Môj cieľ“ nesie aj
cenu za zmenu zo S5, nech S5 a S7 hovoria to isté. Záloha = šablóny z v6,
citát orezaný na koniec vety alebo slova.

Zo vzoru vo wireframe sme vedome vynechali záverečné „Si na ceste k zvládnutiu
tejto výzvy“ — je to sľub výsledku (rovnaké pravidlo ako na S5) — a „smart
notifikáciu“, ktorá je v rozpore so *žiadne notifikácie* v špecifikácii.

**Odchod s niečím v ruke.** „Uložiť session“ v prototype klamalo (nič sa
neukladá, účty a história sú mimo rozsahu). CTA je teraz „Hotovo“ a v hotovom
stave **„Skopírovať môj plán“** — príbeh, mantra, cieľ s cenou a krok do
schránky, nech si to človek vloží do poznámok.

### Krízové kontakty (zástava pri `kriza: true`)

Model v `navrhni-karty` vráti `kriza: true` len pri reči o smrti, ublížení si
alebo ohrození inou osobou (nie pri smútku, beznádeji, vyhorení). Klient vtedy
zobrazí modal „Zastavme sa na chvíľu“:

- **Tri kontakty, nič viac** — človek v kríze nebude porovnávať možnosti:
  **112** (bezprostredné nebezpečenstvo), **0800 500 333** Krízová linka pomoci
  IPčko (nonstop, bezplatne, anonymne; aj chat na krizovalinkapomoci.sk — veľká
  časť ľudí v kríze nezdvihne telefón, ale napíše), **0800 800 566** Linka
  dôvery Nezábudka (nonstop, bezplatne, anonymne). Čísla sú `tel:` odkazy, chat
  `https://` — na mobile jeden ťuk.
- **Neblokuje.** „Rozumiem, pokračovať“ zavrie modal (aj Esc, aj ťuk mimo);
  „Ukončiť sedenie“ vráti na začiatok. Keby zástava blokovala, ľudia by písali
  vyhýbavo a stratili by sme signál aj nástroj.
- **Raz pre daný text.** S2 aj S4 vyhodnocujú tú istú situáciu; zástava sa
  drží kľúča `krizaFor`, nový text na S1 = nové vyhodnotenie.
- **Kontakty ostávajú na dosah** — po detekcii sa v hornej lište objaví
  tlačidlo so srdcom, ktoré modal otvorí kedykoľvek.
- Prístupnosť: `role="dialog"`, `aria-modal`, fokus do dialógu a späť, Tab
  ostáva vnútri. Tón pokojný, v jazyku appky — žiadna červená.
- Text situácie sa pri tom neloguje; do konzoly ide len `[Safety] zobrazené`.

Čísla sú verejné národné linky, overené 13. 9. 2026 (minedu.sk — krízové linky
psychologickej podpory, ipcko.sk, linkanezabudka.sk). **Pred ostrým spustením
ich má potvrdiť Janette — je to jej produkt a jej zodpovednosť, čo tam stojí.**
Ak appku môžu používať maloletí, pribudne Linka detskej istoty 116 111.

### Krok 6 je experiment — čo povedať Janette

Wireframe 0.3 má na S6 len tri body zo zadnej strany akčnej karty. AI spec
(fáza 5) hovorí, že AI navrhne 2–4 mikro-kroky „podložené odporúčaniami
z kariet“. v7 skúša obe veci naraz, aby sa dali porovnať:

- **Nič z jej textu sa nestratilo.** Tri body z karty sú na S6 vždy, v jej
  znení, ako sekcia „Z karty …“. Bod, ktorý model na S5 označil ako cenu za
  zmenu, má štítok *cena za zmenu*.
- **Nad nimi je sekcia „Na mieru pre tvoju situáciu“** — 2–4 kroky, ktoré
  model odvodil z týchto bodov pre konkrétnu situáciu (5–15 minút, začínajú
  slovesom, jeden je označený *najmenší krok* pre deň, keď človek nevládze).
  Model má zakázané navrhnúť čokoľvek, čo na karte nie je.
- **Používateľ vyberá z oboch** — je to jedna skupina.

Na čo sa jej pýtame: Sú kroky „na mieru“ naozaj v duchu karty, alebo z nej
vybočujú? Je pre klienta lepšie mať k dispozícii obidve úrovne (abstraktný
bod z karty + konkrétny krok), alebo to rozptyľuje? Má „najmenší krok“ pre
jej klientov zmysel? Podľa odpovede sa S6 buď vráti k wireframu, alebo sa
AI kroky stanú súčasťou produktu.

Čo sa dá zmerať už v prototype (konzola loguje všetky kroky): ako často
ľudia vyberú AI krok vs. bod z karty vs. vlastný, a ako často „najmenší“.

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
| `pribeh` | situácia + oranžová + zelená | S5: `bridgeOverrides`, potom šablóna; S6: body z karty (ako v6) |
| `zaver` | situácia + oranžová + zelená + krok | šablóny z v6 (príbeh aj mantra), mantra ostáva upraviteľná |

Keď sa používateľ vráti a niečo zmení, kľúč nesedí a volá sa znova; odpovede,
ktoré dobehnú po zmene vstupu, sa zahodia (`*Seq`). Zmena zelenej karty
zároveň zruší už vybraný mini-krok — krok z inej karty nesmie prežiť jej
zmenu (latentná chyba z v5).

Všetky AI texty sa logujú do konzoly (`[AI] porozumenie …`, `[AI] green …`,
`[AI] pribeh …`, `[AI] zaver …`) aj s počtom tokenov — to je surovina na vyhodnotenie
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

- **Safety Flow — čiastočne.** Pri `kriza: true` sa zobrazí modal s reálnymi
  krízovými kontaktmi (viď nižšie). Čo chýba: potvrdenie čísel Janette pred
  ostrým spustením a rozhodnutie, či sa má tok po detekcii **tvrdo zastaviť**
  (špecifikácia to žiada; prototyp zámerne neblokuje) — a robustnejšia
  detekcia než jeden boolean od modelu.
- **S1** zhrnutie situácie (fáza 1 zo špecu) — stále nie je nikde.
- **S6 je experiment** (viď vyššie) — rozhodnutie, či AI kroky ostanú, je na
  Janette; body z karty ostávajú v každom prípade.
- **Rate limit / strop nákladov** na `/api/ai` — plán ho vyžaduje, Worker ho nemá.
- `prototypes/v7/cards.js` je kópia v6; `tools/csv-to-cards.py` generuje len
  `v5/cards.js` a `worker/cards.js`.
