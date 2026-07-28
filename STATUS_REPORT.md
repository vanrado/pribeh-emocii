# STATUS REPORT — Veľký príbeh emócií

**Dátum:** 2. júl 2026
**Účel:** Inventarizácia aktuálneho stavu projektu pre cenovú ponuku klientovi.
**Referenčný stav:** prototyp `prototypes/v4/` (aktuálna verzia, commit `8968b34`), porovnané voči `docs/source/wireframe-0.3.md` a `docs/source/integracia-ai-do-mvp-koucingoveho-toku.md`.

---

## 1. Rozsah hotového

### 1.1 Obrazovky S1–S9

| Screen | Stav | UI | Funkčná logika |
|---|---|---|---|
| **S1** Popis situácie | ✅ Hotové | Kompletné | Áno — validácia (min. 3 znaky), CTA sa odomyká, text sa drží v stave session |
| **S2** Pomenovanie emócie | ✅ Hotové | Kompletné | Áno — snap karusel 3 odporúčaných kariet s flip animáciou, náhodný výber, inline zoznam všetkých 30 oranžových kariet s vyhľadávaním (ignoruje diakritiku), výber odomyká CTA. **Odporúčania sú však statické mock dáta** (vždy Úzkosť/Bezmocnosť/Hnev bez ohľadu na vstup zo S1) |
| **S3** Porozumenie | ✅ Hotové | Kompletné | Áno — ilustrácia vybranej karty, „Zmysel emócie“, voľba „Áno, presne / Cítim to trochu inak“, vetva „inak“ vracia na S2 (zjednodušenie v súlade s wireframe). CTA podmienené potvrdením |
| **S4** Výber smeru | ✅ Hotové | Kompletné | Áno — rovnaký karuselový mechanizmus so zelenými kartami (zadná strana: Zmysel + Čo potrebujem urobiť), zoznam všetkých 30 zelených s vyhľadávaním. **Odporúčania statické** (vždy Odvaha/Dôstojnosť/Nádej) |
| **S5** Zmysel cieľa | ✅ Hotové | Kompletné | Áno — most záťažová → akčná karta s ilustráciami, „Ako ti to pomôže?“, „Cena za zmenu“, povinný reflexný checkbox odomyká CTA. Vysvetlenie mosta je hardcoded len pre 3 kombinácie, zvyšok generická šablóna |
| **S6** Mini-krok | ✅ Hotové | Kompletné | Áno — radio výber krokov zo zadnej strany zelenej karty + „vlastný krok“ s textovým poľom a validáciou |
| **S7** Záver session | ✅ Hotové | Kompletné | Čiastočne — sumár a mantra sa skladajú zo šablóny (string template, nie AI). Tlačidlo „Hotovo · Uložiť session“ **v skutočnosti nič neukladá** — zobrazí len potvrdzovaciu obrazovku |
| **S8** Moja cesta (história) | ❌ Neexistuje | — | — |
| **S9** Detail premeny (archív) | ❌ Neexistuje | — | — |
| **Safety Flow** | ❌ Neexistuje | — | — |

Globálna navigácia je funkčná: progress dots (7 krokov), história obrazoviek so späť-tlačidlom, reset celého flow. Stavový objekt drží všetky voľby používateľa naprieč krokmi.

⚠️ Drobný nesúlad: potvrdzovacia obrazovka po S7 tvrdí „Tvoja cesta zmeny je súčasťou histórie ‚Moja cesta‘“ — čo nie je pravda, história neexistuje. Pred odovzdaním klientovi treba text upraviť alebo históriu doimplementovať.

### 1.2 Responzivita / mobile-first

**Dobrý stav, produkčne blízky.** v4 je plne responzívny web bez device frame:

- mobile-first, `clamp()` typografia a rozmery, `100dvh`, `env(safe-area-inset-*)` pre notch,
- desktop ≥ 700 px dostáva „kartový“ layout s tieňom,
- `prefers-reduced-motion` fallback pre animácie,
- známy bug s pevnou výškou flip-karty orezávajúcou CTA na úzkych viewportoch (320–375 px) bol **opravený vo v2** (commit `c337a66`); v4 navyše odstránila mŕtve CSS/JS zo starých komponentov.

---

## 2. AI integrácia (porovnanie voči AI spec)

**Súhrn: žiadna AI logika nie je reálne pripojená. Všetko je mock/hardcoded.** V kóde nie je jediné volanie na LLM API.

| Úloha AI podľa spec | Stav v prototype |
|---|---|
| **Krok 1:** detekcia krízy (safety_flag) + 1-vetové zhrnutie situácie | ❌ Chýba úplne — vstup sa nikam neanalyzuje, zhrnutie situácie sa nikde nezobrazuje |
| **Krok 2:** návrh 3–5 záťažových emócií s odôvodnením | 🟡 Mock — vždy tie isté 3 karty (Úzkosť, Bezmocnosť, Hnev), bez odôvodnenia viazaného na vstup |
| **Krok 3:** vysvetlenie zmyslu emócie v kontexte vstupu + reflexná otázka | 🟡 Mock — statický text karty, bez kontextualizácie na situáciu používateľa; reflexná otázka chýba |
| **Krok 4:** návrh 2–3 akčných emócií + premostenie | 🟡 Mock — vždy tie isté 3 karty; premostenie hardcoded pre 3 kombinácie z 900 možných (30×30), inak generická veta |
| **Krok 5:** návrh 2–4 mikro-krokov (5–15 min) | 🟡 Mock — kroky sa berú zo zadnej strany karty, reálny obsah majú len 3 zelené karty |
| **S7:** AI sumár + personalizovaná mantra | 🟡 Šablóna — string template dosadzujúci mená emócií, nie generovaný text |

### Stav RAG nad kartami

**RAG neexistuje a chýba mu aj základný predpoklad — digitalizovaný obsah kariet:**

- Reálny textový obsah (situácia / zmysel / čo potrebujem urobiť) majú len **3 oranžové + 3 zelené karty** (kurátorské mock dáta). Zvyšných **54 kariet má generický zástupný text**.
- Zoznam všetkých 60 názvov emócií existuje (30 + 30).
- Ilustrácie všetkých 60 kariet sú v repe (`docs/karty/`, WebP, ~2,7 MB), ale **priradenie číslo → emócia je provizórne podľa poradia** a treba ho overiť podľa príručky (otvorený TODO v `docs/karty/README.md`).
- Príručka `prirucka-emocie.pdf` (zdroj plných textov kariet) je v `.gitignore` a **aktuálne sa v repe ani lokálne nenachádza** — pre digitalizáciu obsahu ju treba znovu zaobstarať.
- Wireframe 0.3 spomína existenciu **Wireframe 0.4** (rozpracovaný S7) — v repe nie je; treba vyžiadať od klienta.

---

## 3. Technický stav

### Architektúra

- Každý prototyp = **jeden samostatný HTML súbor** (HTML + CSS + vanilla JS, ~1 000 riadkov), bez build kroku, bez frameworku, jediná externá závislosť sú Google Fonts (CDN).
- Verzie sa neprepirujú — každá revízia je nový adresár `prototypes/vN/` s README (v1 phone-frame → v2 responzívny → v3 karusel S2 → v4 karusel + ilustrácie S3–S5).
- Root `index.html` je landing page pre GitHub Pages s odkazmi na verzie.
- Rozhodnutie o produkčnom tech stacku **zatiaľ nepadlo** (otvorený bod v CLAUDE.md).

### Dátová perzistencia

**Žiadna.** Celý stav žije v JS premennej v pamäti — refresh stránky zmaže všetko vrátane rozpísanej session. Žiadny `localStorage`, žiadny backend, žiadne kontá. „Uložiť session“ je len vizuálne potvrdenie. To zároveň blokuje S8/S9.

### Známe bugy a technický dlh

| Položka | Závažnosť |
|---|---|
| Provizórne mapovanie obrázok ↔ emócia (môže zobrazovať nesprávnu ilustráciu k emócii) | Stredná — vecná chyba obsahu |
| 54 zo 60 kariet má generický zástupný obsah | Vysoká — blokuje AI/RAG aj plnohodnotný manuálny flow |
| Text „session je súčasťou histórie“ bez reálnej histórie | Nízka — copy fix alebo súčasť S8 |
| Poznámka z vetvy „Cítim to trochu inak“ (S3) sa nikam neukladá | Nízka |
| UI sa skladá cez `innerHTML` konkatenáciu — pri mock dátach OK, ale **pred napojením AI generovaného textu treba escapovanie/sanitizáciu** | Stredná (budúca) |
| Flip-card overflow bug na úzkych viewportoch | ✅ Opravený (v2), vo v4 vyčistené aj mŕtve CSS |

### Testovacie pokrytie

**Žiadne automatizované testy.** Overovanie je čisto manuálne (konvencia: pred commitom skontrolovať 320–375 px viewport). Žiadny test framework, žiadne CI.

---

## 4. Chýbajúce oproti špecifikácii

Zoradené podľa dôležitosti pre MVP:

1. **Safety Flow** — ❌ vôbec neimplementovaný. Podľa AI spec je to tvrdá požiadavka: pri detekcii krízy (beznádej, sebapoškodzovanie) sa Core Flow okamžite zastaví a používateľ sa presmeruje na bezpečnostný tok. Chýba detekcia aj samotná bezpečnostná obrazovka/vetva.
2. **Živá AI** — všetkých 5 AI úloh z Core Flow (zhrnutie situácie, návrh emócií, kontextové vysvetlenie, premostenie/transformácia, mikro-kroky) + sumár a mantra na S7. Dnes 100 % mock.
3. **Obsah kariet** — plné texty 60 kariet nie sú digitalizované (predpoklad pre RAG aj pre korektný manuálny výber). Zdrojová príručka aktuálne chýba.
4. **S8 Moja cesta** — zoznam sessions (dátum, ikony premeny S2→S4, snippet situácie, status kroku).
5. **S9 Detail premeny** — archívny detail session (rekapitulácia identická so S7).
6. **Perzistencia** — bez nej S8/S9 nemôžu existovať; dnes sa všetko stráca refreshom.
7. **Zhrnutie situácie na S1/S2** (AI summary podľa spec, krok 1) — v UI sa nikde nezobrazuje.
8. **Odôvodnenia pri navrhnutých emóciách** („prečo“ 1–2 vety podľa spec, krok 2) — karusel zobrazuje len taglinu karty.
9. **Overenie mapovania ilustrácií** podľa príručky (oranžové aj zelené).
10. Drobnosti mimo MVP jadra, spomenuté v spec/wireframe len ako námety: smart notifikácia mini-kroku (spec ju zároveň v sekcii „Čo MVP vedome nerobí“ vylučuje — treba potvrdiť s klientom), hĺbková otázka na S3 (vo wireframe explicitne odložená).

---

## 5. Odhad rozsahu zostávajúcej práce

Odhady sú pri **AI-asistovanom tempe vývoja** (Claude Code), v ideálnych človekodňoch (1 deň ≈ 6–8 h sústredenej práce). Nezahŕňajú iteračné kolá s klientom, obstaranie chýbajúcich podkladov ani publikáciu do app store.

| Modul | Obsah | Odhad |
|---|---|---|
| **A. Digitalizácia obsahu kariet** | Prepis plných textov 60 kariet z príručky do štruktúrovaných dát (JSON), overenie a oprava mapovania ilustrácií. *Predpoklad: klient dodá príručku.* Prevažne obsahová, nie programátorská práca | **1–2 dni** |
| **B. AI integrácia — backend** | Tenký backend/proxy (API kľúč nemôže byť v klientovi), napojenie na Claude API, prompty pre 5 AI úloh + S7 sumár/mantru, RAG nad kartami (pri 60 kartách stačí full-context / jednoduchý retrieval, netreba vektorovú DB), ošetrenie chýb a latencie (loading stavy), sanitizácia AI výstupu v UI | **4–6 dní** |
| **C. Safety Flow** | Detekcia krízových signálov (súčasť AI volania v kroku 1 + priebežne), bezpečnostná obrazovka s krízovými kontaktmi, tvrdé zastavenie flow, testovacie scenáre | **1,5–2,5 dňa** |
| **D. Perzistencia dát** | Dátový model session, ukladanie (fáza 1: `localStorage`; ak klient chce kontá/synchronizáciu naprieč zariadeniami, pripočítať backend +3–5 dní), obnova rozpracovanej session | **1–2 dni** |
| **E. S8/S9 História** | Zoznam sessions (radenie, snippet, ikony premeny, status kroku), detail session, status „splnené/naplánované“, prázdny stav | **2–3 dni** |
| **F. Produkčný základ** | Rozhodnutie o tech stacku + migrácia zo single-file HTML do udržiavateľnej štruktúry (komponenty, build), nasadenie (hosting, doména), základná analytika/error logging | **3–5 dní** |
| **G. Produkčné UI doladenie** | Prístupnosť (klávesnica, ARIA, kontrast), krajné stavy (dlhé texty, pomalá sieť, chýbajúce obrázky), finálne copy, cross-browser/device QA | **2–3 dni** |
| **H. Testing** | Automatizované testy: unit testy logiky flow, E2E happy path + Safety Flow (napr. Playwright), manuálny QA checklist | **2–3 dni** |
| **Spolu (MVP podľa spec)** | | **≈ 17–27 dní** |

### Poznámky k odhadu

- **Kritická cesta:** A → B → C. Bez digitalizovaných kariet nemá AI z čoho čerpať (RAG striktne z kariet je tvrdá požiadavka spec) a Safety Flow má zmysel až so živou AI.
- **Najväčšia neistota:** modul F — závisí od rozhodnutia, či cieľ je webová appka (PWA) alebo natívna/hybridná mobilná appka. Odhad F platí pre web/PWA; wrapper pre app story (Capacitor a pod.) by pridal ďalšie 3–5 dní + réžiu store review.
- **Čo od klienta potrebujeme:** príručku `prirucka-emocie.pdf` (alebo texty kariet v inej forme), Wireframe 0.4, oficiálne mapovanie číslo karty → emócia, krízové kontakty pre Safety Flow, rozhodnutie web vs. mobilná appka.
- Hotová práca (S1–S7 UI, interakčný dizajn, responzivita, vizuálny jazyk) predstavuje solídny základ — frontend Core Flow sa pri napájaní AI prevažne **nemení, len sa mu vymieňa zdroj dát**.
