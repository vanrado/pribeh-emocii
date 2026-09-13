/* Texty kariet „Veľký príbeh emócií“.
 *
 * GENEROVANÉ — needituj ručne.
 * Zdroj:    docs/source/texty-kariet.csv
 * Generuje: python3 tools/csv-to-cards.py
 *
 * n = číslo karty v balíčku = číslo ilustrácie docs/karty/n.webp
 *     1–30 záťažové (oranžové), 31–60 akčné (zelené)
 */
window.CARDS = {
  orange: [
    {
      n: 1, id: "sklamanie", name: "Sklamanie",
      situacie: [
        "Moje očakávania neboli naplnené.",
        "Niekto alebo niečo ma zradilo.",
        "Moja snaha nevyšla tak, ako som predpokladal/a.",
      ],
      zmysel: "Informuje ma, že moje predstavy o tom, ako život pôjde a ako ide, nie sú v súlade."
    },
    {
      n: 2, id: "odpor", name: "Odpor",
      situacie: [
        "Niečo mi prekáža, stojí v ceste.",
        "Niekto alebo niečo ma obmedzuje alebo mi ubližuje.",
        "Nemám chuť pokračovať, mám výhrady.",
      ],
      zmysel: "Rozpoznať, kedy mi je niečo odporné"
    },
    {
      n: 3, id: "apatia", name: "Apatia",
      situacie: [
        "Nič ma nezaujíma, nič ma nebaví.",
        "Môj život je dlhodobo stereotypný a nevidím žiadne východisko.",
        "Je mi jedno, ako to bude.",
      ],
      zmysel: "Nemíňať emocionálnu energiu"
    },
    {
      n: 4, id: "frustracia", name: "Frustrácia",
      situacie: [
        "Moje snahy dosiahnuť cieľ boli zmarené.",
        "Nechápu ma. Moje názory nie sú akceptované.",
        "Mám potrebu vybojovať si to, čo už malo byť.",
      ],
      zmysel: "Vedieť, kedy som dosiahol/ dosiahla svoj limit a potrebujem zmenu"
    },
    {
      n: 5, id: "depresia", name: "Depresia",
      situacie: [
        "Dlhodobo zažívam nepriaznivú situáciu",
        "Som sám/ sama. Nemám blízkych ľudí, priateľov alebo rodinu.",
        "Nemám dosť schopností a síl. Zlyhal/a som v živote a nevidím východisko.",
      ],
      zmysel: "Zastaviť sa a pouvažovať, kde by som mohol/ mohla nájsť nádej a energiu."
    },
    {
      n: 6, id: "lahostajnost", name: "Ľahostajnosť",
      situacie: [
        "Je mi to jedno a netýka sa ma to.",
        "Stratil/a som záujem o niečo, čo sa mi predtým páčilo alebo čo som mal rád/mala rada.",
        "Niečo nie je moja vec, aj tak to neviem zmeniť.",
      ],
      zmysel: "Podriadiť sa vedeniu iných ľudí alebo nechať prebiehať situácie, ktoré nie sú pre mňa obzvlášť dôležité"
    },
    {
      n: 7, id: "mrzutost", name: "Mrzutosť",
      situacie: [
        "Narazil/a som na problém, s ktorým neviem pohnúť.",
        "Systém ma šikanuje, diskriminuje.",
        "Nenaplnil/a som svoje ambície alebo sny, lebo som sa v minulosti zle rozhodol/la.",
      ],
      zmysel: "Vidieť, čo mi bráni byť v stave plynutia (flow)"
    },
    {
      n: 8, id: "hroza", name: "Hrôza",
      situacie: [
        "Som paralyzovaný/á. Nezvládam to, čo som stratil/a alebo môžem stratiť.",
        "Mám vážne problémy, ktoré sa nedajú zvrátiť.",
        "Mne alebo mojim blízkym sa stala obrovská tragédia",
      ],
      zmysel: "Uvádza ma do stavu pohotovosti voči tomu, čo ma môže zničiť alebo vážne poškodiť"
    },
    {
      n: 9, id: "vycerpanie", name: "Vyčerpanie",
      situacie: [
        "Som pracovne preťažený/á. Moje pracovné dni sú dlhé.",
        "Musím uprednostniť starostlivosť o niekoho druhého a nemám dosť času na oddych.",
        "Som unavený/á. Už nevládzem.",
      ],
      zmysel: "Vedieť, kedy som dosiahol/la limit svojej energie."
    },
    {
      n: 10, id: "clivota", name: "Clivota",
      situacie: [
        "Som osamelý/á, chýba mi niekto blízky.",
        "Chýba mi niečo z minulosti, čo už nie je.",
        "Túžim po niečom, čo nemám.",
      ],
      zmysel: "Ukazuje, čo z minulosti som považoval/a za dobré"
    },
    {
      n: 11, id: "strach", name: "Strach",
      situacie: [
        "Niečo alebo niekto ma ohrozuje, som v nebezpečenstve.",
        "Čelím novej situácii, ktorá je pre mňa neznáma.",
        "Bojím sa o budúcnosť. Neviem, čo bude.",
      ],
      zmysel: "Vedieť konkrétne, o čom som presvedčený/á, že mi ublíži"
    },
    {
      n: 12, id: "neistota", name: "Neistota",
      situacie: [
        "Čelím neznámej situácii a neviem, čo môžem očakávať",
        "Mám pocit, že niečo neovládam alebo nemám dosť skúseností.",
        "Nie je mi jasné, čo vlastne chcem.",
      ],
      zmysel: "Počkať na ujasnenie"
    },
    {
      n: 13, id: "zmatenost", name: "Zmätenosť",
      situacie: [
        "Mám nejasné alebo protichodné informácie.",
        "Nedokážem sa v niečom alebo niekde zorientovať. Nerozumiem tomu.",
        "Nevyznám sa v sebe alebo okolí.",
      ],
      zmysel: "Pomáha mi rozpoznať informácie, vďaka ktorým lepšie porozumiem."
    },
    {
      n: 14, id: "stres", name: "Stres",
      situacie: [
        "Mám príliš veľa záväzkov, som v neustálom zhone.",
        "Ja alebo niekto iný na mňa kladie príliš vysoké nároky.",
        "Dostal/a som sa do neočakávanej situácie.",
      ],
      zmysel: "Stres nie je emócia, ale telesný vnem napätosti. Emócie pri tom sú úzkosť, strach a vyčerpanie."
    },
    {
      n: 15, id: "bezmocnost", name: "Bezmocnosť",
      situacie: [
        "Som odkázaný/á na pomoc iných ľudí, nie som schopný/á si pomôcť sám/sama.",
        "Stratil/a som kontrolu alebo moc a neviem, ako ju získať späť.",
        "Som v konfrontácii s autoritou alebo ľuďmi, ktorí majú väčšiu moc ako ja.",
      ],
      zmysel: "Umožňuje mi prijímať pomoc, keď nie som schopný/á nič urobiť."
    },
    {
      n: 16, id: "pochybnost", name: "Pochybnosť",
      situacie: [
        "Neverím si, že na niečo mám, že niečo dokážem.",
        "Chýbajú mi informácie alebo sú nejasné.",
        "Nepoznám úplnú pravdu, mám len čiastkové informácie. Váham",
      ],
      zmysel: "Upozorňuje ma, že som na novom území, privoláva moju pozornosť k príprave"
    },
    {
      n: 17, id: "uzkost", name: "Úzkosť",
      situacie: [
        "Zažívam ťaživú situáciu, nad ktorou nemám kontrolu.",
        "Bojím sa niečoho v budúcnosti, ale neviem, čo to je. Mám obavy.",
        "Nedokážem naplniť očakávania. Je toho na mňa veľa a bojím sa zlyhania.",
      ],
      zmysel: "Upozorňuje ma na možné nebezpečenstvo v budúcnosti"
    },
    {
      n: 18, id: "beznadej", name: "Beznádej",
      situacie: [
        "Vzdávam sa.",
        "Stratil/a som niečo, čo mi bolo drahé.",
        "Dlhodobo som v nepriaznivej situácii a neviem to ovplyvniť. Neviem, čo mám robiť.",
      ],
      zmysel: "Rozpoznať, že nič, čo budem robiť, nespôsobí zmenu, a vzdať sa"
    },
    {
      n: 19, id: "bojazlivost", name: "Bojazlivosť",
      situacie: [
        "Čelím neznémej situácii.",
        "Bojím sa zlyhania alebo odmietnutia.",
        "Moja činnosť môže negatívne ovplyvniť mňa alebo niekoho druhého. Radšej sa nebudem prejavovať alebo zapájať.",
      ],
      zmysel: "Umožňuje mi pozorovať z odstupu mieru nebezpečenstva"
    },
    {
      n: 20, id: "smutok", name: "Smútok",
      situacie: [
        "Prišiel/prišla som o niečo, na čom mi záležalo. Nechce sa mi nič robiť.",
        "Nie som v rovnováhe, nemám energiu.",
        "Potrebujem sa utiahnuť a dopriať si chvíľku pre seba a svoj smútok",
      ],
      zmysel: "Vedieť, na čom mi v živote záleží"
    },
    {
      n: 21, id: "rezignacia", name: "Rezignácia",
      situacie: [
        "Moje ciele nie sú v súlade s realitou.",
        "Mám dlhodobý problém a nevidím východisko.",
        "Snažil/a som sa niečo dosiahnuť, ale výsledok sa nedostavil. Nemá zmysel snažiť sa ďalej.",
      ],
      zmysel: "Stiahnuť sa z interakcie"
    },
    {
      n: 22, id: "nerozhodnost", name: "Nerozhodnosť",
      situacie: [
        "Neviem sa rozhodnúť alebo mám príliš veľa možností na výber.",
        "Prehodnocujem, čo je skutočne dôležité a v súlade s mojimi hodnotami.",
        "Bojím sa dôsledkov zlej voľby.",
      ],
      zmysel: "Zvažovať možnosti, skúmať rôzne príležitosť"
    },
    {
      n: 23, id: "lutost", name: "Ľútosť",
      situacie: [
        "Urobil/a som zlé rozhodnutie alebo som konal/a nesprávne a už nie je možné vrátiť to.",
        "Sebe alebo niekomu druhému som ublížil/a.",
        "Premárnil/a som dôležitú príležitosť.",
      ],
      zmysel: "Reflektovať rozhodnutia, ktoré som spravil/a, a použiť ich ako poučenie do budúcna."
    },
    {
      n: 24, id: "vina", name: "Vina",
      situacie: [
        "Neurobil/a som niečo, za čo som bol/a zodpovedný/á.",
        "Robím veci, ktoré si neźelám a sú proti mojim presvedčeniam.",
        "Moje konanie niekomu ublížilo.",
      ],
      zmysel: "Poznať svoje hodnoty a kedy som ich zradil/a."
    },
    {
      n: 25, id: "arogancia", name: "Arogancia",
      situacie: [
        "Myslím si, že ostatní ľudia sú menej inteligentní, schopní, či dôležití ako ja.",
        "Som lepší/lepšia ako ostatní. Mám viac schopností.",
        "Na niekoho sa dívam zhora alebo niekoho podceňujem.",
      ],
      zmysel: "Správať sa, ako keby som bol/a morálne nadradený voči ostatným"
    },
    {
      n: 26, id: "zial", name: "Žiaľ",
      situacie: [
        "Navždy som stratil niekoho alebo niečo, čo mi bolo veľmi blízke.",
        "Rozpadol sa mi vzťah s blízkym človekom.",
        "Súcitím s niekým v ťažkej situácii, ktorá sa ma dotýka.",
      ],
      zmysel: "Nájsť význam alebo uvedomiť si hodnotu toho, čo mi spôsobilo žiaľ a zotaviť sa z vážnej situácie"
    },
    {
      n: 27, id: "hnev", name: "Hnev",
      situacie: [
        "Stala sa nespravodlivosť, niekoho treba potrestať.",
        "Niekto nesplnil moje zadania alebo nedodržal dohodu.",
        "Niečo sa mi nepodarilo aj napriek tomu, že som to mohol/mohla zvládnuť.",
      ],
      zmysel: "Vytvoriť a udržať spravodlivosť na svete"
    },
    {
      n: 28, id: "lenivost", name: "Lenivosť",
      situacie: [
        "Nemám chuť alebo energiu niečo robiť.",
        "Nejaká činnosť pre mňa nie je zaujímavá, neprináša mi radosť.",
        "Som rád/rada vo svojej komfortnej zóne a nemám motiváciu z nej vyjsť.",
      ],
      zmysel: "Odpočívať a hľadať motiváciu."
    },
    {
      n: 29, id: "unava", name: "Únava",
      situacie: [
        "Mám toho príliš veľa na svojich pleciach, som preťažený/á.",
        "Všetko musím robiť sám/sama. Nemá mi s tým kto pomôcť.",
        "Som vyčerpaný/á. Už ďalej nevládzem.",
      ],
      zmysel: "Umožňuje mi vidieť hranice svojej energie"
    },
    {
      n: 30, id: "rozhorcenie", name: "Rozhorčenie",
      situacie: [
        "Obvinili ma z niečoho, čo som neurobil/a alebo s čím nemám nič spoločné.",
        "Stala sa mi krivda. Zradili ma alebo ma oklamali. Neprajem si určité zaobchádzanie.",
        "Konanie niektorých ľudí je v rozpore s mojimi hodnotami alebo presvedčeniami.",
      ],
      zmysel: "Postarať sa o seba, chrániť svoje hranice a udržať si sebaúctu"
    },
  ],
  green: [
    {
      n: 31, id: "blazenost", name: "Blaženosť",
      potrebujem: [
        "Viac oddychovať, ísť do prírody, spojiť sa so svojím vnútrom.",
        "Dokončiť niečo, čo si začal/a alebo si splniť úlohu či povinnosť.",
        "Venovať čas svojim záľubám alebo veciam, na ktorých ti záleží.",
      ],
      zmysel: "Ukazuje mi zdroje môjho naplnenia"
    },
    {
      n: 32, id: "ambicia", name: "Ambícia",
      potrebujem: [
        "Stanoviť si dosiahnuteľný a reálny cieľ.",
        "Zlepšiť si svoju zručnosť, talent alebo postavenie v spoločnosti.",
        "Stanoviť si novú pracovnú, študijnú alebo osobnú výzvu.",
      ],
      zmysel: "Angažovať sa vo svete a vyhľadávať nové možnosti"
    },
    {
      n: 33, id: "empatia", name: "Empatia",
      potrebujem: [
        "Vypočuť si niekoho a venovať im pozornosť.",
        "Vyjadriť porozumenie.",
        "Ponúknuť niekomu pomoc či podporu.",
      ],
      zmysel: "Pomáha mi porozumieť, aké emócie prežívajú druhí ľudia"
    },
    {
      n: 34, id: "radost", name: "Radosť",
      potrebujem: [
        "Dopriať si hravý zážitok alebo oslavu.",
        "Venovať sa svojím obľúbeným činnostiam, športom alebo záľubám.",
        "Venovať viac času sebe, blízkym ľuďom alebo pre seba či blízkych urobiť niečo dobré.",
      ],
      zmysel: "Cítiť dobrotu, pôžitok"
    },
    {
      n: 35, id: "hrdost", name: "Hrdosť",
      potrebujem: [
        "Vytvoriť si zoznam úspechov, ktoré sa ti už podarilo dosiahnuť. Oceniť sa.",
        "Odhodlať sa čeliť výzvam a uvedomiť si svoje kvality a schopnosti.",
        "Oceniť niekoho blízkeho za jeho úspech.",
      ],
      zmysel: "Schopnosť uznať výdobytok alebo zisk toho, o čo som sa usiloval/a."
    },
    {
      n: 36, id: "pokora", name: "Pokora",
      potrebujem: [
        "Učiť sa niečo nové, prijať, že s tým ešte nemám veľa skúseností.",
        "Zamyslieť sa: Čo si na sebe vážiš a čo ešte potrebuješ prijať?",
        "Uznať svoje kvality a vlastnosti a nič nepredstierať.",
      ],
      zmysel: "Zosúladiť sa s realitou svojich schopností a sily"
    },
    {
      n: 37, id: "stastie", name: "Šťastie",
      potrebujem: [
        "Spomenúť si, čo všetko sa ti už v živote podarilo.",
        "Byť spokojný/á so životom tak, ako je. Tešiť sa z prítomnej chvíle.",
        "Nájsť alebo uvedomiť si, čo ťa robí šťastným/šťastnou a dopriať si to.",
      ],
      zmysel: "Vedieť, čo je podľa mňa v živote dobré alebo príjemné"
    },
    {
      n: 38, id: "odpustenie", name: "Odpustenie",
      potrebujem: [
        "Uzatvoriť minulosť, aj keď ti spôsobila bolesť. Neprenášať dôsledky minulého konania do budúcnosti.",
        "Prijať to, čo si v minulosti spôsobil/a.",
        "Prijať to, čo ti niekto iný spôsobil v minulosti a ublížilo ti to.",
      ],
      zmysel: "Vyhlásiť minulosť za uzavretú, keď sa budeme stýkať aj v budúcnosti"
    },
    {
      n: 39, id: "sebaistota", name: "Sebaistota",
      potrebujem: [
        "Prezentovať svoju zručnosť v oblasti, ktorá ťa zaujíma a ktorú ovládaš.",
        "Urob niečo, o čom si presvedčený/á, že bude úspešné.",
        "Realizovať svoj plán bez obáv.",
      ],
      zmysel: "Pomáha mi interagovať so svetom, s druhými ľuďmi, so sebou"
    },
    {
      n: 40, id: "zvedavost", name: "Zvedavosť",
      potrebujem: [
        "Experimentovať a objavovať.",
        "Vyhľadávať alebo učiť sa niečo nové.",
        "Objavovať o niekom alebo o sebe niečo nové.",
      ],
      zmysel: "Porozumieť svojim zážitkom, aby som sa niečo naučil/a"
    },
    {
      n: 41, id: "statocnost", name: "Statočnosť",
      potrebujem: [
        "Využiť svoje zdroje a silné stránky, vďaka ktorým môžeš čeliť prekážkam.",
        "Dôkladne sa na niečo pripraviť alebo si vytvoriť plán a držať sa ho.",
        "Zrealizovať niečo, pred čím máš rešpekt.",
      ],
      zmysel: "Umožňuje mi hýbať sa dopredu, hoci mám pochybnosti, alebo je to pre mňa výzva"
    },
    {
      n: 42, id: "vzrusenie", name: "Vzrušenie",
      potrebujem: [
        "Robiť niečo, čo ti dáva energiu.",
        "Robiť alebo si naplánovať niečo nezvyčajné, čo chceš uskutočniť.",
        "Začať nový projekt alebo urobiť niečo nové, čo si ešte nerobil/a.",
      ],
      zmysel: "Vedieť, čo mi v živote dáva energiu"
    },
    {
      n: 43, id: "vdacnost", name: "Vďačnosť",
      potrebujem: [
        "Uvedomiť si, za čo som dnes vďačný/á.",
        "Vyjadriť vďaku ľuďom vôkol alebo niekoho obdarovať.",
        "Vytvoriť si denník vďačnosti.",
      ],
      zmysel: "Vidieť celý život ako dar"
    },
    {
      n: 44, id: "dovera", name: "Dôvera",
      potrebujem: [
        "Spolupracovať s niekým, na koho sa môžeš spoľahnúť.",
        "Zopakovať si skúsenosť, ktorá sa ti páčila a veríš, že sa ti bude páčiť opäť.",
        "Dôverovať svojej ceste, systému, komunite.",
      ],
      zmysel: "Schopnosť interagovať so svetom, s ostatnými ľuďmi alebo so sebou"
    },
    {
      n: 45, id: "lahkost", name: "Ľahkosť",
      potrebujem: [
        "Zbaviť sa toho, čo ťa zaťažuje.",
        "Venovať sa relaxácii, meditácii alebo starostlivosti o svoje telo.",
        "Venovať sa aktivite, ktorá ti prináša radosť.",
      ],
      zmysel: "Hovorí mi, na ktoré aktivity mám schopnosti a robím ich bez veľkej námahy"
    },
    {
      n: 46, id: "hojnost", name: "Hojnosť",
      potrebujem: [
        "Uvedomiť si, v ktorých oblastiach života sa ti dostáva hojnosti.",
        "Dopriať si niečo.",
        "Podeliť sa s inými o niečo, čoho máš nadbytok.",
      ],
      zmysel: "Chápať, aký hojný život môže byť"
    },
    {
      n: 47, id: "odvaha", name: "Odvaha",
      potrebujem: [
        "Urobiť niečo, v čom sa necítiš komfortne.",
        "Konať aktívne v situácii, v ktorej cítiš strach.",
        "Naplánovať si niečo, čo si doteraz ešte neurobil/a.",
      ],
      zmysel: "Dovoľuje mi konať v prítomnosti strachu"
    },
    {
      n: 48, id: "nadej", name: "Nádej",
      potrebujem: [
        "Uveriť, že situácia, v ktorej sa nachádzaš, sa dobre skončí.",
        "Všímať si vo svete to dobré.",
        "Nájsť podporu u niekoho, kto verí v pozitívnu budúcnosť.",
      ],
      zmysel: "Umožňuje mi vidieť, v čo verím ohľadom toho, ako bude vyzerať budúcnosť"
    },
    {
      n: 49, id: "harmonia", name: "Harmónia",
      potrebujem: [
        "Naplniť svoje potreby.",
        "Dostať sa do súladu so sebou a svojím okolím. Napojiť sa na seba a ukotvi sa vo svojom strede.",
        "Venovať sa činnostiam, ktoré ťa harmonizujú.",
      ],
      zmysel: "Umožňuje mi byť v rovnováhe bez ohľadu na to, čo sa deje okolo."
    },
    {
      n: 50, id: "vytrvalost", name: "Vytrvalosť",
      potrebujem: [
        "Uvedomiť si, akú cestu už máš za sebou a pokračovať v nej.",
        "Naplánovať si dlhodobý cieľ.",
        "Nájsť si vzor alebo niekoho, kto ti pomôže vydržať.",
      ],
      zmysel: "Posúvať sa dopredu napriek prekážkam"
    },
    {
      n: 51, id: "respekt", name: "Rešpekt",
      potrebujem: [
        "Uvedomiť si akú máš o sebe mienku a za čo si zaslúžiš úctu.",
        "Uvedomiť si, čo považuješ za hodné rešpektu.",
        "Premyslieť si o kom máš vysokú mienku.",
      ],
      zmysel: "Vedieť, ktoré veci alebo ktorí ľudia sú podľa mňa legitímni a hodnotní"
    },
    {
      n: 52, id: "euforia", name: "Eufória",
      potrebujem: [
        "Uvedomiť si, aký vrcholový zážitok v tebe vyvoláva výnimočnú pohodu.",
        "Dopriať si výnimočný zážitok.",
        "Začleniť do svojho života rituál alebo zvyk, ktorý v tebe vyvoláva výnimočnú pohodu a radosť.",
      ],
      zmysel: "Pomáha mi pochopiť silu prežívania pozitívneho zážitku."
    },
    {
      n: 53, id: "akceptacia", name: "Akceptácia",
      potrebujem: [
        "Pozrieť sa na svoje okolnosti tak, ako sú a neklásť voči nim odpor.",
        "Povedať nahlas: \"Už je to raz tak,\" a otvoriť sa novému smerovaniu.",
        "Uznať svoj život, taký aký je.",
      ],
      zmysel: "Schopnosť vyrovnať sa s faktami okolo mňa, odpočívať v mieri a zostať v pokoji"
    },
    {
      n: 54, id: "laska", name: "Láska",
      potrebujem: [
        "Vyjadrovať niekomu svoju lásku.",
        "Všímať si, kde sa cítiš byť milovaný/á.",
        "Obklop sa spoločnosťou ľudí, ktorých máš rád/a.",
      ],
      zmysel: "Udržiavať spojenie bez ohľadu na okolnosti"
    },
    {
      n: 55, id: "dostojnost", name: "Dôstojnosť",
      potrebujem: [
        "Uznať svoje hodnoty a to, že si zaslúžiš svoje miesto na svete.",
        "Prehodnotiť svoje hranice a nenechať druhých ľudí, aby ich prekročili.",
        "Rešpektovať hranice iných.",
      ],
      zmysel: "Umožňuje mi stanoviť si a chrániť svoje hranice"
    },
    {
      n: 56, id: "starostlivost", name: "Starostlivosť",
      potrebujem: [
        "Uvedomiť si, na čom ti záleží a na čo vynakladáš svoju energiu a čas.",
        "Začleň do svojho života niečo, o čo sa môžeš starať.",
        "Uvedomiť si svoje potreby a postarať sa o ne.",
      ],
      zmysel: "Umožňuje mi využiť energiu na podporu ostatných. Ukazuje mi, s kým a čím som v živote spojený/á"
    },
    {
      n: 57, id: "optimizmus", name: "Optimizmus",
      potrebujem: [
        "Uveriť, že aj keď sa ti môžu stať zlé veci väčšinou sa ti stanú tie dobré.",
        "Začni svoj deň s pozitívnymi afirmáciami.",
        "Uvedomiť si, v akých situáciách v minulosti ti optimizmus pomohol.",
      ],
      zmysel: "Žiť tak, že sa stále teším na dobré veci, ktoré ku mne prichádzajú"
    },
    {
      n: 58, id: "sucit", name: "Súcit",
      potrebujem: [
        "Byť s druhým človekom prítomný v jeho bolesti, ale nepreberať jeho emócie na seba.",
        "Uvedomiť si rozdiel medzi ľútosťou a súcitom.",
        "Všímať si, s kým súcitíš alebo kedy cítiš súcit. Súcítiš aj so sebou?",
      ],
      zmysel: "Umožňuje mi byť spojený/á s druhými a rozumieť ich emóciám bez toho, aby som ich bral/a ako svoje"
    },
    {
      n: 59, id: "nadsenie", name: "Nadšenie",
      potrebujem: [
        "Zadefinovať si svoju víziu alebo misiu.",
        "Vybudovať si nový zvyk.",
        "Zamyslieť sa, čo v tebe vyvoláva pocit nadšenia, čo ťa inšpiruje, a na čom si ochotný/á pracovať.",
      ],
      zmysel: "Umožňuje mi spojiť sa so záujmami väčšími, ako som ja a pomáha mi realizovať ich."
    },
    {
      n: 60, id: "aspiracia", name: "Ašpirácia",
      potrebujem: [
        "Definovať si jasné a dosiahnuteľné ciele, ktoré ťa budú inšpirovať a podnecovať k rastu.",
        "Uvedomiť si možnosti, ktoré máš na svoj rast.",
        "Skúšať veci, ktoré si predtým nerobil/a.",
      ],
      zmysel: "Rásť"
    },
  ],
};
