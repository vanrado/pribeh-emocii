**Autoritatívne vyhlásenie**

Tento dokument definuje Core Flow MVP a spôsob integrácie AI.  
 Je nadradený ostatným poznámkam a slúži ako „single source of truth“ pre návrh aplikácie.  
 Všetky návrhy musia zostať v jeho rámci.

Na základe dokumentu o integrácii AI (*AI Spec*) sa MVP aplikácia zameria na transformáciu stavu „vnútornej zaseknutosti“ používateľa k definícii konkrétneho akčného kroku, pričom **AI slúži ako asistent (*Copilot, nie Autopilot*)**, ktorý navrhuje možnosti na základe obsahu kariet a princípov koučingu.  
**Core Flow MVP** je rozdelený do piatich krokov, pričom hlavnou úlohou AI je poskytovať štruktúrované návrhy a vysvetlenia, ktoré sú prísne podložené informáciami z kariet (*RAG iba z kariet*).  
Sumarizácia Core Flow MVP s integráciou AI:

| Fáza (Krok) | Primárny Vstup Používateľa / Trigger | Hlavná úloha AI (čo AI robí) | Kľúčový Výstup (čo používateľ získa) |
| :---- | :---- | :---- | :---- |
| **1\. Trigger** | Vstup od používateľa ("Som zaseknutý" / Popis situácie) | Detekuje krízové signály (→ **Safety Flow**) a poskytuje krátke zhrnutie situácie (1 veta). | Krátke **zhrnutie situácie** (*summary*) a **varovanie/presmerovanie**, ak je zistená kríza (*safety\_flag*). |
| **2\. Identifikácia emócie** | Výber / navigácia emócií (z oranžových kariet) | Navrhne **3–5 kandidátov záťažových emócií** (z oranžových kariet). Ku každému návrhu priloží 1–2 vety s odôvodnením (*prečo*) na základe snippetov z kariet. | **Sada navrhovaných emócií** (*emotion\_candidates*) s vysvetlením, prečo sú relevantné k zadanému vstupu. |
| **3\. Porozumenie** | Používateľom zvolená (oranžová) emócia | Vysvetlí **„signál“ emócie** (*meaning\_in\_context*), čerpajúc len z obsahu kariet a umiestni ho do kontextu používateľského vstupu. Voliteľne položí doplňujúcu otázku na spresnenie. | **Vysvetlenie zmyslu emócie** v kontexte jeho života a možná **reflexná otázka**. |
| **4\. Transformácia** | Zvolená oranžová emócia a jej zmysel | Navrhne **2–3 akčné/cieľové emócie** (zelené karty). Vysvetlí, prečo sú tieto emócie vhodné, a vytvorí **premostenie** z prežívanej záťažovej emócie k želaným cieľovým emóciám. | **Sada navrhovaných akčných emócií** (*target\_emotion\_candidates*) s odôvodnením, ktoré vedú k akcii. |
| **5\. Mini-krok** | Zvolená zelená (cieľová) emócia | Navrhne **2–4 mikro-kroky** (5–15 minút), ktoré sú **konkrétne, malé a zrozumiteľné**. Môže navrhnúť aj „ľahšiu verziu“. Tieto kroky sú podložené odporúčaniami z kariet (*TIP: Daj si záväzok, čo z toho vieš urobiť už teraz alebo čo najskôr*). | **Konkrétne akčné kroky** (*micro\_actions*) k okamžitej realizácii. |

**Globálny princíp** celého *Core Flow* je **„Copilot, nie Autopilot“** – AI navrhuje, ale používateľ musí všetky návrhy (emóciu, zhrnutie, akciu) vedieť upraviť alebo odmietnuť, a nebudú sa poskytovať žiadne terapeutické tvrdenia alebo diagnózy.

Ak je detegovaný krízový stav (sebapoškodzovanie, beznádej),  
Core Flow sa **okamžite zastaví**  
a aplikácia presmeruje používateľa na bezpečnostný flow.  
AI v tomto prípade **nepokračuje v koučovaní**.

**Čo MVP vedome nerobí**

* Nenahrádza terapiu ani koučing

* Neposkytuje diagnózy

* Nepracuje s dlhodobými plánmi

* Neoptimalizuje emócie do „pozitívna / negatívna“

* Neobsahuje gamifikáciu, streaky, notifikácie

* Nepracuje s viac ako jedným problémom v jednej session

