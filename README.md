# Veľký príbeh emócií — prototyp

Digitalizácia fyzických sebapoznávacích kariet Janette Horstmann (30 záťažových
+ 30 akčných emócií) do koučingovej webovej appky. Používateľ prejde za sedem
obrazoviek od opisu situácie k jednému konkrétnemu kroku; AI mu na mieru vyberá
karty, vysvetľuje zmysel emócie a navrhuje krok — výhradne z obsahu kariet.

- **Aktuálna verzia:** `prototypes/v7/` (za Basic Authom, nasadené z `main`)
- **Stav a use-casy:** `STATUS_REPORT.md` · **Ako funguje AI:** `docs/ako-funguje-ai.md` · **Nasadenie:** `DEPLOY.md`
- **Zdrojové dokumenty:** `docs/source/` (wireframe 0.3, AI špecifikácia, texty kariet)

---

## Čo je technicky implementované

*Stav k 13. 9. 2026, prototyp v7. Podklad pre uzavretie fázy prototypovania.*

### Obsah kariet
- ✅ **Všetkých 60 kariet digitalizovaných** z CSV od Janette — názov, tri situácie / tri body „čo potrebujem urobiť“, zmysel emócie. Jedným príkazom sa generuje verzia pre prehliadač aj pre server; nová verzia textov = nový import, kód sa nemení.
- ✅ **Ilustrácie všetkých 60 kariet** (WebP, optimalizované z tlačových originálov) s **overeným priradením** číslo → emócia (číslo v CSV sedí s číslom vytlačeným na ilustrácii).
- ✅ Obsahová revízia textov pripravená pre Janette (`docs/texty-kariet-qa.md`).

### Core Flow S1–S7
- ✅ Sedem obrazoviek podľa wireframu 0.3: opis situácie → pomenovanie emócie → porozumenie → výber smeru → zmysel cieľa → mini-krok → záver.
- ✅ Otáčacie karty ako fyzický balíček, karusel troch návrhov, zoznam všetkých 30 kariet s vyhľadávaním (bez ohľadu na diakritiku), náhodný výber.
- ✅ Mini-krok: výber z návrhov, z bodov karty alebo vlastný text; záver s plánom na skopírovanie.
- ✅ Responzívne od 320 px, jeden HTML súbor bez build kroku, výber kroku ovládateľný klávesnicou.

### AI v krokoch 2–7
- ✅ **S2** — tri záťažové karty vybrané pre text používateľa, ku každej veta prečo.
- ✅ **S3** — zmysel zvolenej emócie **v jeho situácii** + otázka na zamyslenie; text z karty ostáva viditeľný vedľa.
- ✅ **S4** — tri akčné karty, ktoré **odpovedajú na zvolenú záťažovú emóciu**, nie len na situáciu.
- ✅ **S5** — príbeh zmeny (čo s ním robí záťažová emócia → čo mu akčná dovolí inak), **cena za zmenu vybraná z bodov karty** a preložená do jeho situácie.
- ✅ **S6** — 2–4 mini-kroky na mieru (5–15 min, jeden najmenší) nad pôvodnými bodmi karty *(experiment, rozhodne Janette)*.
- ✅ **S7** — zrkadlo celej cesty (čo urobil, nie čo sa stane) + dve mantry, ktoré si používateľ vymení alebo prepíše.
- ✅ **Len z kariet, vynútené štruktúrou:** názvy kariet a index ceny za zmenu sú v schéme odpovede ako povolené hodnoty — model **nemôže vymyslieť kartu ani bod**.
- ✅ **Guardraily v každom volaní:** žiadne diagnózy ani klinické pojmy, žiadne rady mimo karty, žiadne sľuby výsledku, rodovo neutrálne tvary, AI sa nikde nespomína.
- ✅ **Copilot, nie Autopilot:** každý návrh sa dá odmietnuť alebo upraviť; Janettine texty sú všade viditeľné vedľa AI textu s označením „z karty“.
- ✅ **Rýchlosť:** volania sa spúšťajú, len čo sú známe vstupy (prefetch) — S4, S5 a S7 sa otvárajú bez čakania; inde skeleton 1–3 s.
- ✅ **Náklad:** ~5 volaní na session, rádovo desatiny centa; každé volanie sa loguje aj s počtom tokenov (podklad na vyhodnotenie).
- ✅ **Plná záloha bez AI na každej obrazovke** — pri výpadku či chýbajúcom kľúči tok pokračuje ako vo verzii bez AI.

### Bezpečnosť
- ✅ **Detekcia krízy** modelom pri vyhodnotení situácie (úzka definícia: reč o smrti, ublížení si, ohrození inou osobou — nie smútok či beznádej) a **modal s krízovými kontaktmi** 112, IPčko 0800 500 333 (+ chat), Nezábudka 0800 800 566 — na mobile jedným ťukom; neblokuje, kontakty ostávajú po ruke počas celého sedenia.
- ✅ **Ochrana proti prompt-injection** (oplotenie textu používateľa), validácia všetkých vstupov, text situácie sa neloguje.
- ✅ **API kľúč výhradne na serveri** (Cloudflare secret), nikdy v prehliadači ani v GitHube; **Basic Auth pred celým prototypom**.

### Infraštruktúra a nasadenie
- ✅ Cloudflare Worker: statické prototypy + Basic Auth + `POST /api/ai` v jednom nasadení.
- ✅ **Automatický deploy** z `main` (GitHub Actions → Cloudflare).
- ✅ Publikuje sa len to, čo má byť verejné (`public/` so symlinkami) — zdrojové dokumenty a interné súbory sa nedajú omylom zverejniť.

### Nástroje a dokumentácia
- ✅ `tools/csv-to-cards.py` — import textov kariet s kontrolou anomálií.
- ✅ `tools/dev-server.py` — lokálne predvádzanie a testovanie: mock režim bez kľúča a bez kreditu (vrátane simulácie chýb a krízy), proxy režim na živý server.
- ✅ **Tri porovnateľné verzie na demo:** v5 bez AI, v6 AI len vo výbere kariet, v7 plné AI.
- ✅ Dokumentácia: stav a use-casy (`STATUS_REPORT.md`), ako funguje AI krok po kroku (`docs/ako-funguje-ai.md`), nasadenie (`DEPLOY.md`), README ku každej verzii, otázky pre Janette (`prototypes/v7/README.md`), plán do MVP (`STATUS_REPORT.md` §6).

### Čo zostáva otvorené
Tvrdé zastavenie toku po detekcii krízy a potvrdenie krízových čísel (rozhodnutie
Janette), rate limit na `/api/ai`, zhrnutie situácie, história sedení a účty,
prístup cez e-shop, právne texty — podrobne v `STATUS_REPORT.md` §4–6.

---

## Ako spustiť lokálne

```bash
nvm use && npm install && npm run dev        # Worker na :8788 (Basic Auth, kľúč z .dev.vars)
python3 tools/dev-server.py                  # mock bez kľúča: http://localhost:8124/prototypes/v7/
python3 tools/csv-to-cards.py --report       # regenerácia textov kariet z docs/source/texty-kariet.csv
```
