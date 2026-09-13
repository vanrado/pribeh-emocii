# STATUS REPORT — Veľký príbeh emócií

**Dátum:** 13. september 2026
**Referenčný stav:** prototyp `prototypes/v7/` na `main` (`34422f6`), porovnané voči `docs/source/wireframe-0.3.md` a `docs/source/integracia-ai-do-mvp-koucingoveho-toku.md`.
**Predošlá verzia:** 2. júl 2026 (stav v4, pred AI, s odhadmi pre cenovú ponuku) — v histórii gitu.
**Ako AI funguje technicky:** `docs/ako-funguje-ai.md`. **Nasadenie:** `DEPLOY.md`.

---

## 1. Čo appka dnes vie — jednou vetou

Prevedie človeka od opisu situácie k **jednému konkrétnemu kroku** za sedem obrazoviek. AI mu na mieru **vyberie karty, vysvetlí zmysel emócie v jeho situácii, vyrozpráva príbeh zmeny, navrhne mini-kroky a na záver mu zrkadlí celú cestu** — výhradne z obsahu Janettiných kariet, s jej textami vždy viditeľnými, a s plnou zálohou bez AI, takže tok nikdy nezastane.

---

## 2. Use-casy — čo používateľ reálne môže

- **Pomenovať, čo prežívam.** Napíše situáciu vlastnými slovami. Dostane tri záťažové karty vybrané *pre jeho text*, každú s jednou vetou, prečo sedí. Ak nesedí ani jedna, vyberie zo všetkých 30 (s vyhľadávaním) alebo nechá vybrať náhodne.
- **Porozumieť, čo mu emócia hovorí.** Vidí ilustráciu karty, Janettin „Zmysel emócie“ *a pod ním* to, čo táto emócia signalizuje **v jeho konkrétnej situácii**, plus jednu otázku na zamyslenie. Potvrdí „áno, presne“ — alebo sa vráti a vyberie inú kartu.
- **Vybrať smer.** Tri akčné karty, ktoré **odpovedajú na jeho záťažovú emóciu** (na stratu kontroly hranica, na strach odvaha) — nie náhodne „pozitívne“. Aj tu môže siahnuť po ktorejkoľvek z 30.
- **Pochopiť cenu za zmenu.** Príbeh v dvoch úderoch: čo s ním teraz robí záťažová emócia a čo mu akčná dovolí urobiť inak. Potom bod z karty, ktorý **na jeho situáciu sedí najviac** (Janettin text), a jedna veta, čo ten bod znamená v jeho prípade. Potvrdí, že mu to dáva zmysel.
- **Zaviazať sa k jednému kroku.** Vyberá z 2–4 krokov **na mieru** (5–15 minút, jeden označený ako najmenší pre deň, keď nevládze), z troch bodov karty, alebo napíše vlastný. Práve jeden.
- **Odísť s plánom v ruke.** Príbeh celej cesty (čo *urobil*, nie čo sa stane), mantra v prvej osobe — s druhým variantom a možnosťou prepísať ju — cieľ s cenou a krok. **Skopíruje si plán** do poznámok.
- **Dostať pomoc, keď je to vážne.** Ak v texte zaznie reč o smrti alebo ublížení si, appka sa zastaví na chvíľu a ukáže tri krízové linky (tiesňová 112, IPčko aj s chatom, Nezábudka) — jedným ťukom volateľné. Človek môže pokračovať alebo sedenie ukončiť; kontakty má potom stále po ruke v hornej lište.
- **Prejsť celý tok aj bez AI.** Pri výpadku, chýbajúcom kľúči alebo zlom výstupe každá obrazovka ticho spadne na správanie bez AI. Používateľ to spozná nanajvýš podľa jednej vety pod karuselom.
- **Predviesť a porovnať.** v5 = bez AI (demo bez kreditu), v6 = AI len vo výbere kariet, v7 = plné AI. Mock server predvedie všetky stavy vrátane chýb bez jediného volania.

---

## 3. Čo je hotové

**Obsah**
- Všetkých **60 kariet digitalizovaných** z Janettinho CSV (názov, tri situácie / tri body, zmysel), jedným príkazom regenerovateľné.
- **Ilustrácie priradené a overené** — číslo karty v CSV sedí s číslom vytlačeným na ilustrácii.
- Otvorené obsahové otázky pre Janette sú v `docs/texty-kariet-qa.md`.

**AI (kroky 2–7)**
- Štyri úlohy na serveri: `navrhni-karty`, `porozumenie`, `pribeh-zmeny`, `zaver`.
- **Len z kariet, štrukturálne:** názvy kariet a index „ceny za zmenu“ sú v schéme ako `enum` — model nevie vymyslieť kartu ani bod.
- **Guardraily:** žiadne diagnózy, rady mimo karty ani sľuby výsledku; rodovo neutrálne tvary; AI sa nikde nespomína.
- **Copilot, nie Autopilot:** karty vyberá človek, kroky aj z vlastnej hlavy, mantru si vymení alebo prepíše.
- **Rýchlosť:** volania sa spúšťajú vo chvíli, keď sú známe vstupy (prefetch) — S4, S5 a S7 sa spravidla otvoria bez čakania; inde skeleton 1–3 s.
- **Náklad:** ~5 volaní na session, rádovo desatiny centa (gpt-4o-mini).
- Každý výstup sa loguje s tokenmi — surovina na vyhodnotenie experimentu.

**Detekcia krízy a krízové kontakty**
- **Ako detekcia funguje:** text situácie vyhodnocuje model pri návrhu kariet (S2 aj S4) a vracia pole `kriza`. Je `true` **iba** ak text hovorí o tom, že človek nechce ďalej žiť, chce si ublížiť alebo mu niekto ohrozuje život. Smútok, žiaľ, beznádej, vyhorenie ani „už nevládzem“ krízou nie sú — na tie je appka určená a falošná zástava by škodila. Výber karty (napr. Beznádej) pole neovplyvňuje.
- **Čo sa stane:** appka sa zastaví na chvíľu a odporučí tri kontakty — **112** (bezprostredné nebezpečenstvo), **0800 500 333** Krízová linka pomoci IPčko (nonstop, bezplatne, anonymne, aj chat na krizovalinkapomoci.sk), **0800 800 566** Linka dôvery Nezábudka (nonstop, bezplatne, anonymne). Na mobile jeden ťuk (`tel:` odkazy).
- **Neblokuje:** človek môže pokračovať alebo sedenie ukončiť. Zástava sa ukáže raz pre daný text; kontakty ostávajú po ruke cez tlačidlo so srdcom v hornej lište.
- Čísla sú verejné národné linky overené 13. 9. 2026 (minedu.sk, ipcko.sk, linkanezabudka.sk). Pred ostrým spustením ich potvrdí Janette.

**Technika**
- Cloudflare Worker: Basic Auth pred všetkým, kľúč výhradne na serveri, fencing vstupu proti prompt-injection, validácia odpovede po schéme.
- Automatické nasadenie z `main` (GitHub Actions → Cloudflare Workers).
- Klient: jeden HTML súbor bez build kroku, responzívny od 320 px, klávesnicou ovládateľný výber kroku.
- Vývojárske nástroje: `tools/csv-to-cards.py` (obsah), `tools/dev-server.py` (mock / proxy bez Basic Auth v prehliadači).

---

## 4. Čo appka NEVIE — hranice, ktoré treba povedať nahlas

- **Safety Flow nie je celý.** Detekcia krízy a kontakty fungujú (§3), ale špecifikácia žiada po detekcii **tvrdé zastavenie toku** — prototyp zámerne neblokuje (blokovanie vedie k vyhýbavému písaniu a strate signálu). Detekcia je jeden boolean od modelu bez záložných kľúčových slov. **Pred reálnych používateľov až po rozhodnutí Janette o blokovaní a potvrdení čísel.**
- **Nič neukladá.** Žiadne účty, žiadna história (S8/S9), refresh = strata session. Preto „Skopírovať plán“, nie „Uložiť“.
- **Bez rate limitu.** Heslo Basic Authu je zdieľané; bez stropu je `/api/ai` otvorená peňaženka.
- **Zhrnutie situácie** (fáza 1 špecifikácie) neexistuje.
- **Dáta idú do OpenAI.** Kam smú ísť emocionálne dáta (EU, no-training) — otázka O6 z júla — je stále otvorená a patrí právnikovi.
- **Krok 6 je experiment.** AI kroky nad bodmi karty sa odchyľujú od wireframu; či ostanú, rozhodne Janette (otázky pre ňu sú v `prototypes/v7/README.md`).
- **Bez automatizovaných testov.** Overuje sa ručne a cez mock.
- **Mimo rozsahu prototypu:** nákup / e-shop, právne texty, PWA a offline, profil, sprievodca appkou.

---

## 5. Otvorené rozhodnutia

| # | Rozhodnutie | Kto |
|---|---|---|
| 1 | Čo so statickým „Zmyslom emócie“ na S3 vedľa dynamického textu | Janette |
| 2 | Ostávajú AI mini-kroky na S6 (experiment)? | Janette |
| 3 | Obsahové opravy textov kariet (`docs/texty-kariet-qa.md`) | Janette |
| 4 | Krízové kontakty a podoba Safety Flow | Janette + Rado |
| 5 | Do kedy prototypujeme / kedy začína produkčný build (O1) | Rado + Janette |
| 6 | Kam smú ísť dáta, výber providera, text ochrany osobných údajov (O6) | Rado + právnik |
| 7 | Produkčný tech stack (PWA rozhodnuté, framework a backend nie) | Rado |

---

## 6. Čo zostáva do MVP podľa špecifikácie

V poradí dôležitosti: **Safety Flow** → **rate limit a strop nákladov** → **zhrnutie situácie (S1)** → **perzistencia a história (S8/S9)** → **produkčný základ** (stack, štruktúra, analytika, testy) → **prístup cez e-shop** (ročný vstup). Odhady dní z júlovej verzie tohto dokumentu už neplatia — moduly A (obsah) a B (AI backend) sú hotové.
