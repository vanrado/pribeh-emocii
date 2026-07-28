# Texty kariet — otázky na revíziu

Vzniklo pri importe `texty-kariet.csv` do prototypu v5 (28. 7. 2026).

**Čo import s textami urobil:** iba mechanickú normalizáciu — orezal medzery
navyše na začiatku/konci a zdvojené medzery vnútri viet (karty 5, 8, 15, 16,
18, 22, 24, 25, 30, 33, 36, 38, 41, 47, 49, 51). **Preklepy, interpunkciu ani
gramatiku import nemení** — všetko nižšie je na rozhodnutie Janette.

Po oprave stačí prepísať `docs/source/texty-kariet.csv` a spustiť:

```bash
python3 tools/csv-to-cards.py --report
```

---

## 1. Blokujúce — treba rozhodnúť

### Karta 18 „Beznádej“ — redakčná poznámka v texte

V CSV je „Zmysel emócie“:

> Rozpoznať, že nič, čo budem robiť, nespôsobí zmenu, a vzdať sa **- ??? Nem értem**

„Nem értem“ je po maďarsky „nerozumiem“ — zjavne poznámka pre seba, nie obsah
karty. **Import ju oreže**, v appke sa zobrazí len text po „a vzdať sa“.

Otázka je vecná, nie jazyková: väčšina „zmyslov“ hovorí, čo emócia umožňuje
alebo na čo upozorňuje. Tu vyznieva ako výzva vzdať sa. Beznádej je zároveň
emócia, pri ktorej má neskôr nabehnúť **Safety Flow**, takže tento text si
zaslúži zvlášť pozornosť.

### Karta 14 „Stres“ — „Zmysel emócie“ je meta-poznámka

> Stres nie je emócia, ale telesný vnem napätosti. Emócie pri tom sú úzkosť,
> strach a vyčerpanie.

Je to vysvetlenie *o* karte, nie zmysel emócie ako pri ostatných 59 kartách.
V appke sa zobrazí na S3 pod nadpisom „Zmysel emócie“, kde vyznie inak než
zvyšok sady. Necháme, preformulujeme, alebo dostane karta zvláštne zaobchádzanie?

---

## 2. Preklepy — takmer isto na opravu

| Karta | Text | Je | Má byť |
|---|---|---|---|
| 24 Vina | situácia 2 | „ktoré si ne**ź**elám“ | ne**ž**elám (poľské *ź*) |
| 19 Bojazlivosť | situácia 1 | „Čelím nezn**é**mej situácii“ | nezn**á**mej |
| 49 Harmónia | krok 2 | „Napojiť sa na seba a **ukotvi** sa“ | **ukotviť** sa |
| 22 Nerozhodnosť | zmysel | „skúmať rôzne **príležitosť**“ | príležitost**i** |
| 34 Radosť | krok 2 | „Venovať sa **svojím** obľúbeným činnostiam“ | **svojim** |
| 25 Arogancia | zmysel | „keby som bol/a morálne **nadradený**“ | nadraden**ý/á** |
| 26 Žiaľ | situácia 1 | „Navždy som **stratil** niekoho“ | stratil**/a** |

Názov karty 22 mal v CSV medzeru na konci („Nerozhodnosť “) — import ju orezal.

---

## 3. Nejednotnosť naprieč sadou — na rozhodnutie

**Rodové tvary.** Väčšina sady píše „mohol/a“, „bol/a“, „presvedčený/á“ bez
medzery. Tri miesta majú medzeru za lomkou:

- karta 4 Frustrácia (zmysel) — „dosiahol**/ **dosiahla“
- karta 5 Depresia (zmysel) — „mohol**/ **mohla“
- karta 5 Depresia (situácia 2) — „sám**/ **sama“

**Oslovenie na zelených kartách.** Hlavička stĺpca je „Čo potrebujem urobiť“
(1. osoba), ale texty striedajú neurčitok a 2. osobu:

- karta 31 Blaženosť — „Dokončiť niečo, čo **si** začal/a“
- karta 42 Vzrušenie — „Robiť niečo, čo **ti** dáva energiu“
- karta 39 Sebaistota — „**Urob** niečo, o čom si presvedčený/á“ (rozkazovací spôsob)
- karta 56 Starostlivosť — „**Začleň** do svojho života niečo“ (rozkazovací spôsob)

Oranžové karty sú dôsledne v 1. osobe („Mám pocit, že…“). Zjednotíme zelené?

**Úvodzovky.** Karta 53 Akceptácia používa rovné `"Už je to raz tak,"`.
Appka inde používa slovenské „ “.

**Koncová bodka pri „Zmysle emócie“.** 48 zo 60 kariet ju nemá, 12 áno.
Vyzerá to ako zámer (je to fráza, nie veta) — potvrdiť a zjednotiť.

---

## 4. UI copy prototypu — nie texty kariet

Vyšlo najavo až pri reálnych názvoch emócií:

- **S5, „Cena za zmenu“:** veta znie „Aby si mohol/a cítiť **Odvahu**…“.
  Skloňovanie do akuzatívu prototyp už rieši automaticky pre všetkých
  60 názvov, ale samotná formulácia je na revíziu.
- **S3, nadpis bloku:** „Situácia, ktorá sa ti deje“ — CSV má „Situácia, ktorá
  sa mi deje?“. Appka oslovuje na „ty“, karty hovoria v 1. osobe. Toto je
  širšia otázka tónu, netýka sa len tohto nadpisu.

Zvyšok UI copy je samostatná položka (K2, bod 4) — Janette prejde nasadený
prototyp a označí miesta.
