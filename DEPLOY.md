# Nasadenie na Cloudflare Workers

Jedno nasadenie obsluhuje všetko: statické prototypy, Basic Auth aj `/api/ai`.

```
požiadavka
   │
   ▼
worker/index.js          ← run_worker_first: true, takže sem ide KAŽDÝ request
   ├─ Basic Auth ────────── 401 ak nesedí
   ├─ POST /api/ai ──────── AI úlohy cez OpenAI (kľúč zostáva na serveri)
   └─ zvyšok ────────────── env.ASSETS.fetch() → public/
```

## Čo sa publikuje

`public/` je jediný adresár, ktorý ide von. Obsahuje **symlinky**, nie kópie:

```
public/index.html       → ../index.html
public/prototypes       → ../prototypes
public/docs/karty       → ../../docs/karty
public/.assetsignore      (vyhadzuje README.md a .DS_Store)
```

Vďaka tomu sa nič needituje dvakrát a zároveň sa `docs/source/`, `CLAUDE.md`,
`STATUS_REPORT.md` ani `.git` **nemôžu** omylom dostať na verejnú URL — nie sú
v `public/`. Nový verejný obsah = nový symlink.

## Prvé nasadenie

Vyžaduje sa Node ≥ 22 (v repe je `.nvmrc` s verziou 24).

```bash
nvm use && npm install
npx wrangler login
```

Nastav secrets (`wrangler` sa spýta na hodnotu, do histórie shellu sa nedostane):

```bash
npx wrangler secret put BASIC_AUTH_USER
npx wrangler secret put BASIC_AUTH_PASS
npx wrangler secret put OPENAI_API_KEY
```

`OPENAI_API_KEY` je nepovinný — bez neho `/api/ai` vracia 503. Appka beží
ďalej: `prototypes/v6/` v tom prípade ticho použije záložné karty z v5,
staršie prototypy AI nevolajú vôbec.

```bash
npm run deploy
```

Výsledná adresa je `https://pribeh-emocii.<tvoj-subdomain>.workers.dev`.

## Automatický deploy z GitHubu

`.github/workflows/deploy.yml` nasadzuje pri každom commite do `main`
(a dá sa spustiť aj ručne cez Actions → Run workflow).

Jednorazovo treba doplniť dva GitHub secrets
(Settings → Secrets and variables → Actions → New repository secret):

| Secret | Odkiaľ |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens → Create Token → Custom → oprávnenie **Edit Cloudflare Workers**, scope na tvoj účet |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → Workers & Pages → Account ID |

**`OPENAI_API_KEY` do GitHubu nepatrí.** Zostáva výhradne ako Cloudflare
secret na Workeri — `wrangler deploy` sa secrets nedotýka, takže ich CI ani
neprepíše, ani nepotrebuje vidieť. To isté platí pre `BASIC_AUTH_*`.

Prvý deploy sprav radšej lokálne (`npm run deploy`), nech overíš, že všetko
sedí; CI potom preberá ďalšie commity.

## Lokálny vývoj

```bash
cp .dev.vars.example .dev.vars   # uprav si heslo
nvm use && npm run dev           # http://localhost:8788
```

`.dev.vars` je v `.gitignore`. `wrangler dev` **nezachytí zmenu `.dev.vars`
za behu** — po úprave server reštartuj.

Na čisto statické pozeranie prototypov (bez Basic Auth a bez `/api/ai`) stále
funguje pôvodné `python3 -m http.server 8123`.

## Overenie po nasadení

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://<adresa>/                        # 401
curl -s -o /dev/null -w '%{http_code}\n' -u '<user>:<heslo>' https://<adresa>/    # 200
```

Smoke test `/api/ai`:

```bash
curl -s -u '<user>:<heslo>' -H 'Content-Type: application/json' \
  -d '{"task":"navrhni-karty","situacia":"Šéf ma pred všetkými zhodil na porade."}' \
  https://<adresa>/api/ai
```

Očakávaný výsledok je `{"karty":[{...},{...},{...}],"kriza":false,...}` s troma
reálnymi menami kariet. Lokálne overené 2026-09-13: tvar requestu OpenAI prijíma,
prompt injection neprejde a krízový signál sa zachytí.

Logy (vrátane detailov chýb, ktoré sa klientovi neposielajú):

```bash
npm run tail
```

## Kontrakt `/api/ai`

Endpoint je task-based — ako `/api/study-summary` vo `frontend-patient`.
Zatiaľ je implementovaná jedna úloha (krok S2/S4 Core Flow):

```
POST /api/ai
{
  "task":     "navrhni-karty",
  "situacia": "<voľný text od používateľa>",   // 3–4000 znakov
  "balicek":  "zatazove" | "akcne"             // nepovinné, default zatazove
}
→ {
  "karty":   [ { "n": 7, "id": "uzkost", "name": "Úzkosť", "preco": "…" }, … ],  // max 3
  "kriza":   false,
  "balicek": "zatazove",
  "usage":   { "prompt_tokens": …, "completion_tokens": … }
}
```

Ako je to postavené (rovnaký pattern ako Clariness study-summary):

- **Server-side only** — `OPENAI_API_KEY` je Cloudflare secret, nikdy nejde
  do klienta ani do GitHubu.
- **Model** `gpt-4o-mini`, `temperature: 0.2`. Drží ich server, klient
  neprepíše ani model, ani limity.
- **Fencing proti prompt-injection** — text od používateľa je obalený
  značkami s náhodným UUID (`<<<SITUACIA_…>>>`). Podvrhnutá koncová značka
  v texte neunikne, lebo UUID nevie uhádnuť.
- **Strict `json_schema`** — pole `name` má `enum` s 30 reálnymi menami kariet.
  Vymyslená karta je tým **štrukturálne nemožná**, nielen zakázaná v prompte.
  Presne to je požiadavka „RAG striktne z obsahu kariet“ z CLAUDE.md.
- **Guardraily v system prompte** — žiadne diagnózy, žiadne klinické pojmy,
  žiadne terapeutické odporúčania, zdôvodnenie len z textu karty.
- **`coerce()` — „ver, ale over“** — schéma garantuje mená, nie počet ani
  unikátnosť. Server prepojí odpoveď na reálne karty, zahodí duplicity
  a oreže na 3.
- **Bez cache.** V Clariness dávala zmysel (sumár štúdie je pre všetkých
  rovnaký). Tu je vstupom unikátny opis situácie → hit rate ≈ 0.

Náklady — **namerané**, nie odhadnuté (`usage` z reálneho volania):
3747 vstupných + 141 výstupných tokenov → **~$0,00065 za volanie** pri
gpt-4o-mini. Jedna session volá dvakrát (krok 2 a 4), teda ~$0,0013.
Latencia 2,4–3,2 s.

### Čo ešte nie je hotové

- **Napojený je len `prototypes/v6/`** (kroky 2 a 4). v5 a staršie zostávajú
  zámerne na mock dátach ako demo verzia bez kreditu.
- **Safety Flow.** Pri `kriza: true` ukáže v6 dočasnú zástavu, ale **nie je
  to bezpečnostná obrazovka zo špecifikácie**: tok sa tvrdo nepreruší a krízové
  kontakty sú prázdny placeholder — čísla musí dodať klient. Navyše je to jeden
  boolean od LLM, nie spoľahlivá detekcia. Kým to nie je dorobené, appka
  nepatrí pred reálnych používateľov.
- **Zvyšné 4 AI úlohy** (zhrnutie situácie, kontextové vysvetlenie,
  premostenie, mini-kroky + sumár/mantra na S7) sa pridávajú do `ULOHY`
  vo `worker/index.js` rovnakým spôsobom.

### Karty na serveri

`worker/cards.js` je **generovaný** — needituj ručne. Zdrojom je stále
`docs/source/texty-kariet.csv`:

```bash
python3 tools/csv-to-cards.py
```

Vypíše naraz `prototypes/v5/cards.js` (pre prehliadač, `window.CARDS`)
aj `worker/cards.js` (pre Worker, `export const CARDS`).

## Secrets Store namiesto per-Worker secrets

`worker/index.js` číta secrets cez `readSecret()`, ktorá zvládne oba tvary —
obyčajný string aj Secrets Store binding s `async .get()`. Prechod je teda len
zmena konfigurácie, kód sa nemení:

```bash
npx wrangler secrets-store store create pribeh-emocii --remote
npx wrangler secrets-store secret create <STORE_ID> --name OPENAI_API_KEY --scopes workers --remote
```

Potom odkomentuj blok `secrets_store_secrets` vo `wrangler.jsonc`, doplň
`store_id` a odstráň príslušné per-Worker secrets (`wrangler secret delete`).

## Poznámky k platforme

- **Free tier**: 100 000 requestov denne. Requesty na statické assety sú
  normálne zadarmo a neobmedzené — ale `run_worker_first: true` znamená, že
  každý request spustí Worker, takže sa **všetko ráta**, vrátane obrázkov.
  Jedna session prejde ~70 requestmi (60 ilustrácií), čo je ~1400 sessions
  denne. Na klientské preview bohato stačí. Pri prekročení limitu Cloudflare
  vracia 429, nie statický súbor.
  Zúžiť sa to dá na `run_worker_first: ["/api/*"]`, ale potom sa Basic Auth
  prestane vzťahovať na statické súbory — čiže prototypy by boli verejné.
- **Runtime** je V8 isolate, nie Node. `nodejs_compat` je zapnutý kvôli
  `openai` SDK.
- **EU rezidencia dát** nie je default; je to platený doplnok.
