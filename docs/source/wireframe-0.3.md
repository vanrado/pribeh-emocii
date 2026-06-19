Sprievodca emóciami – Wireframe 0.3 (Čitateľný prepis)

SCREEN 1: Popis situácie (Trigger)

*Cieľ: Vytvoriť bezpečný priestor a zastaviť sa.*

• **Nadpis:** Čo sa teraz deje?

• **Podnadpis:** (krátky upokojujúci text) „Popíš, čo ťa aktuálne zaťažuje.“

• **Vstup:** `[ Textové pole – voľný popis ]`

• **Hlavné tlačidlo (CTA):** `[ Pokračovať ]`

🧠 **Mentálny výstup:** „Problém je pomenovaný. Som v bezpečnom priestore.“

\--------------------------------------------------------------------------------

SCREEN 2: Pomenovanie emócie (Vylepšené)

*Cieľ: Identifikácia bez úteku. Pomenujte pocit \- oranžová karta, ktorý v situácii najviac prežívate.*

• **Nadpis:** Čo teraz najviac cítim?

• **Podnadpis:** Najpravdepodobnejšie cítiš

**Zoznam kariet (Interakcia):**

1\. **\[v\] ÚZKOSŤ** (Zbalená) – *„napätie, obavy...“*

2\. **\[^\] BEZMOCNOSŤ** (Aktívna/Rozbalená karta)

    ◦ *Text karty:* „Situácia, ktorá sa ti deje: Som odkázaný/á na pomoc iných ľudí. Stratil/a som kontrolu.“

    ◦ **Tlačidlo pre výber:** `[ ÁNO, TOTO JE ONO ]`

3\. **\[v\] HNEV** (Zbalená) – *„prekročené hranice...“*

• **Sekundárna možnosť:** `[ Nie je tu tvoja emócia? Otvoriť zoznam všetkých kariet ]`

🧠 **Mentálny výstup:** „Neutekám. Som tu. Toto je ono.“

- zobraziť zoznam AI vybraných kariet v Accordeon komponente  
- zoznam všetkých kariet zobrazit v POP-UP okne po kliknuti na `Otvoriť zoznam všetkých kariet`  
- 

\--------------------------------------------------------------------------------

SCREEN 3: Porozumenie (Redesign: „Príbeh karty“)

*Cieľ: Introspekcia a dialóg, nie len „poučovanie“ definíciou. Pochopenie emócie \- Emócia je signál, nie problém. Zistite čo vám hovorí.*

• **Nadpis:** Čo mi táto karta hovorí?

• **Vizuál:** `[ Veľká ilustrácia karty ]` (Vizuálna kotva)

- otázka \- zobraziť po tapnutí na kartu zadnú stranu? Možno nie je potrebné

**1\. Zmysel emócie:**

• *Text:* „Táto emócia sa ti snaží povedať, že...“ (Nasleduje vysvetlenie signálu/zmyslu z definície karty). 

- Text zobraziť pod obrázkom Ilustracie karty

**2\. Tvoja interpretácia:**

• *Text:* „Pozri sa na obrázok. Text na karte hovorí o \[Názov emócie\], ale ty tam môžeš vidieť niečo iné. Sedí náš popis na to, čo práve cítiš?“

• **Voľby:** `[ Áno, presne ]` alebo `[ Cítim to trochu inak ]`

    ◦ *(Ak „Inak“, zobrazí sa pole na poznámku: „Čo ti napadlo? Tvoj pocit je dôležitejší ako text.“)*

- toto zatiaľ implementujme jednoducho \- po kliknutí Cítim to trochu inak presmerujeme na Screen 2\. Uchovajme myšlienku s textovým poľom.

***3\. Hĺbková otázka (Hľadanie skrytej emócie): X***

- pre teraz časť Hĺbková otázka vynechať

*• Text: „Niekedy jedna emócia zakrýva druhú. Je za týmto pocitom ešte niečo hlbšie, čo čaká na odhalenie?“*

*• **Voľby:** `[ Nie, toto je ono ]` alebo `[ Možno... (Otvorí sa zoznam na doplnenie) ]`*

• **Hlavné tlačidlo (CTA):** `[ POKRAČOVAŤ K ZMENE ]`,,

- tlačidlo je enabled keď je potvrdené \- stlačené Áno, presne

strana 19\. z príručky

\--------------------------------------------------------------------------------

SCREEN 4: Výber smeru (Transformácia)

*Cieľ: Definovať želaný stav. Ujasnite si čo chcete cítiť, aby ste sa posunuli ďalej. Karta, ktora vas podpori v zmene a stane sa vašou hybnou silou. Výber akčnej karty je vedomé rozhodnutie o tom, aku emociu potrebujeme na lepšie zvládnutie situácie.*

• **Nadpis:** Ako sa chcem cítiť?

• **Podnadpis:** Vyber emóciu, ktorá ti pomôže posunúť sa ďalej.

**Zoznam kariet (Accordion):**

1\. **\[v\] ODVAHA** (Zbalená) – *„skúsiť aj napriek strachu...“*

2\. **\[^\] DôSTOJNOSŤ** (Aktívna/Rozbalená karta)

    ◦ *Zmysel emócie: Umožňuje mi stanoviť si a chrániť svoje hranice.*

    ◦ *Čo potrebujem urobiť?:* Spomaliť a zhlboka vydýchnuť. Ukotviť sa v prítomnosti. Pustiť kontrolu nad výsledkom.

    ◦ CTA vo vnútry každej karty Accordeon: **Tlačidlo pre výber:** `[ Chcem tento smer ]`

3\. **\[v\] NÁDEJ** (Zbalená) – *„vidieť možnosť zmeny...“*

• **Pätička:** `[ Link: Pozrieť všetky zelené karty ]`

- `kliknutim na Link sa zobrazí okno so všetkými kartami`

\--------------------------------------------------------------------------------

SCREEN 5: Zmysel cieľa (Redesign: „Príbeh 2 kariet“)

*Cieľ: Vizuálne premostenie a pochopenie „ceny za zmenu“ predtým, než sa urobí krok.* 

• **Nadpis:** Môj príbeh zmeny

**Vizuál:** `[ Ilustrácia kariet ]` (Vizuálna kotva)

![][image1]

- Vľavo Karta záťaže, vpravo akčná karta \- transformácia, prechod

![][image2]

**1\. Most (Vizuál):** `[ Červená Karta (Aktuálny stav) ]` ───────\> `[ Zelená Karta (Želaný stav) ]`

• *Text:* „Chceš prejsť od \[EMÓCIA 1\] k \[EMÓCIA 2\].“

**2\. Prepojenie (AI vysvetlenie):**

• *Otázka:* „Ako ti \[Zelená Emócia\] pomôže zvládnuť túto situáciu?“

• *AI Odpoveď:* (Napríklad: „Namiesto úteku (Strach) ti Odvaha dovolí postaviť sa problému čelom.“)

**3\. Cena za zmenu (Záväzok):**

• *Inštrukcia:* „Aby si mohol cítiť \[Zelená Emócia\], karta hovorí, že potrebuješ:“

• *Potreba:* (Konkrétny bod zo zadnej strany zelenej karty, napr. „Vzdať sa kontroly nad výsledkom.“)

• *Reflexia:* „Dáva ti to v tejto chvíli zmysel?“

• **Potvrdenie:** `[ Áno, rozumiem ] Checkbox - spristupni kliknutie na Pokračovať`

• **Hlavné tlačidlo (CTA):** `[ POKRAČOVAŤ K AKCII (Urobiť to) ]`

🧠 **Mentálny výstup:** Pripravenosť na akciu. Definované „ČO“ (mentálne nastavenie), aby nasledujúci krok mohol definovať „AKO“,,.

\--------------------------------------------------------------------------------

SCREEN 6: Mini krok

*Cieľ: Zadefinujte si jeden malý konkretny a realisticky krok, ktory viete urobit hned alebo co najskor. Cieľom je aktivacia, nie velke plany*

**Text:** Daj si záväzok, čo z toho vieš urobiť už teraz

1\. **Definovane kroky**

- kroky zo zadnej strany akčnej karty \- radio buttons. Výber jedného je povinné  
  - Krok 1 Uznať svoje hodnoty a to, že si zaslúžiš svoje miesto Respektovat ...  
  - Krok 2 Prehodnotiť…  
  - Krok 3 Respektovat...

 **Hlavné tlačidlo (CTA):** `[ Toto spravím ]`

\--------------------------------------------------------------------------------

### **🎉 SCREEN 7 — POTVRDENIE A ZÁVÄZOK (Záver session)**

**Cieľ:** Emocionálne uzatvorenie a AI sumarizácia cesty transformácie.

* **Nadpis (H1):** `Mám plán. Idem do toho.`  
* **AI Generovaný Sumár (Moja cesta):**  
  * AI vytvorí krátky text (2-3 vety), ktorý spojí celú session.  
  * *Šablóna:* „Prišiel si so situáciou **\[Situácia zo S1\]**, v ktorej si cítil **\[Záťaž zo S2\]**. Rozhodol si sa pre **\[Akčná emócia zo S4\]** a tvoj prvý krok je **\[Krok zo S6\]**.“  
* **AI "Sila okamihu" (Mantra):**  
  * Krátka, úderná veta vygenerovaná AI ako kotva.  
  * *Príklad:* „Dnes mením bezmocnosť na pokoj tým, že spravím jeden malý krok.“  
* **Vizuálna rekapitulácia (Sumárna karta):**  
  * `Môj cieľ: [Zelená emócia]`  
  * `Môj krok: [Mini-krok]`  
* **Hlavné tlačidlo (CTA):** `[ Hotovo / Uložiť session ]`

### **🔑 Príklad AI výstupu na Screen 7**

**Vstup od užívateľa v priebehu aplikácie:**

* **S1:** „Mám dôležitú prezentáciu pred vedením a bojím sa, že ma vysmejú a zlyhám.“  
* **S2:** Úzkosť (Záťažová karta).  
* **S4:** Odvaha (Akčná karta).  
* **S6:** „Pripravím si prvých 5 slidov dnes večer.“

**AI výstup na Screen 7:**

**Tvoj dnešný príbeh zmeny:** „Dnes si prišiel s obavou o dôležitú prezentáciu. Uznal si svoju **Úzkosť**, ale namiesto úteku si v sebe našiel **Odvahu**. Tvoj záväzok – **pripraviť 5 slidov dnes večer** – je tvojím dôkazom, že strach ťa nemusí zastaviť. Si na ceste k zvládnutiu tejto výzvy.“

**Tvoja mantra pre dnešok:** „Moja odvaha je silnejšia ako môj strach z kritiky.“

*Použitie AI na záverečnej obrazovke (S7) je kľúčové pre tzv. **kognitívne uzavretie**. Užívateľ neodchádza len s vybraným krokom, ale s uceleným príbehom svojej transformácie. AI tu nefunguje len ako sumár, ale ako „zrkadlo“, ktoré mu ukáže, aký kus mentálnej práce práve vykonal.*

*Tu sú tri konkrétne riešenia, ako zapojiť AI na S7:*

1. ***AI Generovaná Afirmácia (Mantra):** Na základe situácie a vybratej zelenej karty vytvorí AI personalizovanú vetu, ktorú si užívateľ môže uložiť.*  
2. ***Vizuálna rekapitulácia „Cesta hrdinu“:** AI vytvorí textový naratív, ktorý spojí S1 (štart) a S6 (cieľ).*  
3. ***Smart Notifikácia:** AI navrhne konkrétny čas (v kontexte dňa užívateľa), kedy mu má pripomenúť jeho malý krok.*

*Aktualizoval som dokument **Wireframe 0.4**, kde som Screen 7 rozpracoval podľa týchto bodov.*

### ***Zhrnutie navrhovaného riešenia pre S7:***

* ***AI sumarizácia:** Funguje ako "mentálny denník". Používateľ vidí svoju cestu (od strachu k akcii) v logických súvislostiach.*  
* ***Emocionálny dopad:** AI nepoužíva len statický text, ale dynamicky vkladá užívateľove slová zo Screenu 1, čo vyvoláva silný pocit, že aplikácia mu "rozumie".*  
* ***Praktickosť:** Mantra vygenerovaná na mieru slúži ako mentálna kotva, ktorú si môže užívateľ pripomenúť v momente, keď sa objaví odpor k vykonaniu mini-kroku.*

### **`SCREEN 8 — MOJA CESTA (Zoznam session)`**

**`Cieľ:`** `Prehľad progresu v čase a retrospektíva.`

* **`Nadpis (H1):`** `Moja cesta`  
* **`Filter/Radenie:`** `Najnovšie navrchu`  
* **`Zoznam položiek (Session Cards):`**  
  * `Každá karta v zozname obsahuje:`  
    * `Dátum a čas (napr. 15. Decembra, 14:30)`  
    * `Mini-ikony premeny: [Ikona emócie S2] ➔ [Ikona emócie S4]`  
    * `Snippet situácie: „Prezentácia pred vedením...“ (skrátený text zo S1)`  
    * `Status kroku: [✓ Splnené] / [○ Naplánované]`  
* **`Interakcia:`** `Kliknutím na kartu sa otvorí Screen 9.`  
* 

### **`🔍 SCREEN 9 — DETAIL PREMENY (Archív)`**

**`Cieľ:`** `Možnosť vrátiť sa k hlbokým vhľadom z minulých session.`

* **`Vizuál:`** `Plná rekapitulácia identická so Screenom 7.`  
* **`Akcia:`**  
  * `[ Tlačidlo: Späť do histórie ]`

🔑 Globálne princípy UX (pre celý wireframe):

• Jeden hlavný CTA (tlačidlo) na obrazovku.

• Žiadne menu, žiadny feed.

• AI je „neviditeľná“ (pôsobí ako text aplikácie, nie ako chatbot).

• Všetko je editovateľné alebo odmietnuteľné používateľom.

• **Safety Flow:** Ak sa deteguje kríza (beznádej, sebapoškodzovanie), tok sa okamžite preruší.