# Veľký príbeh emócií — kontext projektu

Digitalizácia fyzických sebapoznávacích kariet "Veľký príbeh emócií" do
koučingovej mobilnej/webovej appky. Pôvodný produkt: balíček kariet (30
záťažových/oranžových + 30 akčných/zelených emócií), každá karta má na zadnej
strane 3 sekcie: **Emócia ktorú chcem cítiť**, **Čo potrebujem urobiť** a
**Zmysel emócie**.

## Zdrojové dokumenty

Plné znenie špecifikácie je v `docs/source/`:
- `wireframe-0.3.md` + `wireframe-0.3.jpg` — wireframe Core Flow S1–S9,
  popis obrazoviek, mikrotexty, globálne UX princípy
- `integracia-ai-do-mvp-koucingoveho-toku.md` — ako má fungovať AI
  integrácia (RAG, prompty, hranice)
- `prirucka-emocie.pdf` — pôvodná príručka ku kartám (plný zoznam emócií,
  vzor obsahu zadnej strany karty, vysvetlenie produktu)

**Pred väčšími zmenami v obsahu/flow si tieto dokumenty znova prejdi** —
sú zdrojom pravdy, nie to, čo je aktuálne v prototype (prototyp môže
zaostávať alebo obsahovať dočasné mock dáta).

## Kľúčové produktové princípy (z `integracia-ai...md`)

- **AI = Copilot, nie Autopilot.** AI len navrhuje (emócie, vysvetlenia,
  kroky), používateľ vždy potvrdzuje/upravuje.
- **AI je "neviditeľná"** — pôsobí ako bežný text aplikácie, nie ako chatbot
  bublina. Nikdy nepridávaj "AI badge" ani chat-like UI pre AI výstupy.
- **RAG striktne z obsahu kariet** — žiadne vymyslené terapeutické tvrdenia
  ani diagnózy.
- **Safety Flow** — pri detekcii krízy (beznádej, sebapoškodzovanie) sa tok
  okamžite preruší. (V prototype v7: model vracia `kriza`, klient ukáže modal
  s krízovými kontaktmi, ale tok zámerne neblokuje — tvrdé zastavenie je
  otvorené rozhodnutie pre klientku.)
- Žiadna gamifikácia, streaky, notifikácie, dlhodobé plánovanie. Jedna
  session = jeden problém.

## Core Flow (S1–S7, implementované v prototype)

1. Popis situácie (voľný text)
2. Pomenovanie emócie (AI navrhne 3 záťažové karty, accordion/flip výber,
   alebo plný zoznam 30)
3. Porozumenie ("Zmysel emócie" + potvrdenie "sedí mi to / cítim to inak")
4. Výber smeru (AI navrhne 3 akčné karty, rovnaký mechanizmus)
5. Zmysel cieľa (most medzi záťažovou a akčnou emóciou, "cena za zmenu")
6. Mini-krok (konkrétny malý krok, odvodený z karty alebo vlastný)
7. Záver (AI sumár + mantra, "Hotovo")

S8/S9 (Moja cesta / história sessions) a Safety Flow sú v `wireframe-0.3.md`,
ale zatiaľ nie sú v prototype.

## Stav repozitára

```
prototypes/
  v1/   — prvá verzia: "telefón v rámiku" mockup (phone frame)
  v2/   — aktuálna verzia: plne responzívny web, mobile-first, BEZ device
          frame. Toto je aktívna verzia na ďalší vývoj.
docs/source/  — pôvodné zdrojové dokumenty (pozri vyššie)
```

`prototypes/v2/index.html` je samostatný súbor (HTML+CSS+JS, žiadny build
krok, žiadne závislosti okrem Google Fonts cez CDN). AI návrhy a sumarizácie
sú zatiaľ **mock dáta** (3 kurátorské karty na každú stranu + fallback pre
zvyšok), nie živé volania na OpenAI API.

## Vizuálny jazyk (v2)

- Farby: krémový papier `#F4EEE2`, atrament `#2B2620`, terakota/oranžová
  `#D97A3F` (záťažové karty), tmavozelená `#1F5C46` (akčné karty) — vychádza
  priamo z `prirucka-emocie.pdf`.
- Fonty: Fraunces (nadpisy), Work Sans (text), Caveat (rukopisný akcent na
  mantry/citáty).
- Signature interakcia: karty sa fyzicky "otáčajú" (flip front/back),
  pretože presne tak fungujú aj reálne fyzické karty.

## Známe ďalšie kroky

1. Safety Flow vetva
2. S8/S9 (Moja cesta + archív session)
3. Napojenie frontendu na `/api/ai` namiesto mock dát (backend už stojí)
4. Rozhodnúť o tech stacku pre finálnu appku (zatiaľ čisté HTML prototypy)

## AI a nasadenie

**Používame OpenAI API, nie Anthropic.** Secret sa volá `OPENAI_API_KEY`;
názov `ANTHROPIC_API_KEY` v tomto projekte nepoužívaj.

- Integračný bod je `worker/index.js` — Cloudflare Worker, ktorý servuje
  statické prototypy, chráni ich Basic Authom a obsluhuje `POST /api/ai`.
- Kľúč je výhradne server-side (Cloudflare secret), nikdy nie v klientovi
  ani v GitHub secrets.
- Endpoint je task-based (pole `task`). Hotové úlohy:
  `navrhni-karty` (krok 2; krok 4 s `zatazova` = názov zvolenej záťažovej
  karty), `porozumenie` (krok 3: zmysel emócie v kontexte situácie +
  reflexná otázka) a `pribeh-zmeny` (kroky 5 a 6: „teraz“ + „most“, výber
  „ceny za zmenu“ z bodov akčnej karty cez `cena_index` + jej preklad do
  situácie, 2–4 mikro-kroky) a `zaver` (krok 7: zrkadlo cesty + dva
  varianty mantry, používateľ si ju vie vymeniť alebo prepísať). Spoločné:
  fencing vstupu proti
  prompt-injection, strict `json_schema` s `enum` reálnych mien kariet
  (vymyslená karta je tým štrukturálne nemožná) a guardraily proti diagnózam.
  Klient posiela len text situácie a názvy kariet — obsah kariet aj prompty
  ostávajú na serveri.
- `tools/dev-server.py` servuje prototypy s `/api/ai` bez Basic Auth v
  prehliadači: mock režim (bez kľúča) alebo proxy na `wrangler dev`.
- `worker/cards.js` je **generovaný** z `docs/source/texty-kariet.csv`
  cez `python3 tools/csv-to-cards.py` — needituj ručne. Ten istý príkaz
  generuje aj prehliadačovú verziu `prototypes/v5/cards.js` (v6 a v7 majú kópiu).

Ako AI funguje krok po kroku (kde vstupuje, prompty, schémy, zálohy,
latencia) je v `docs/ako-funguje-ai.md`. Detaily nasadenia, secrets a CI sú
v `DEPLOY.md`. Aktuálny stav appky a use-casy: `STATUS_REPORT.md`.

## Konvencie

- UI copy je po slovensky.
- Nové väčšie revízie ukladaj ako `prototypes/vN/` (nie prepisovať
  predošlú verziu), s krátkym `README.md` vysvetľujúcim čo sa zmenilo a
  prečo.
- Pred commitom over, že prototyp funguje aj na úzkom viewporte (320–375px)
  — bol tu už raz bug s pevnou výškou flip-karty, ktorá pri zalomení textu
  orezávala CTA tlačidlo.
