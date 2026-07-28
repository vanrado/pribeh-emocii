# v5 — reálne texty všetkých 60 kariet + oprava výberu mini-kroku

Odvodené z `v4`. Nahrádza mock dáta **skutočným obsahom kariet od Janette**
(K2 z plánu v5) a opravuje bug pri výbere mini-kroku na S6 (K1). Vizuálny
jazyk a tok S1–S7 ostávajú z v4 nezmenené.

## Čo sa zmenilo oproti v4

**Dáta**

- Nový súbor **`cards.js`** — všetkých 60 kariet (30 záťažových + 30 akčných),
  každá s názvom, tromi textami a „Zmyslom emócie“. Je **generovaný**, needituj
  ho ručne.
- Zdroj pravdy je `docs/source/texty-kariet.csv`. Regenerácia:

  ```bash
  python3 tools/csv-to-cards.py --report
  ```

  Keď Janette vráti opravené texty, prepíš CSV a spusti príkaz — `index.html`
  sa nemení. `--report` vypíše anomálie v texte na revíziu.
- Zmizli `genericOrange` / `genericGreen` (výplňové texty pre karty mimo
  odporúčanej trojice) — už ich netreba, obsah má každá karta.
- 3 odporúčané karty na S2/S4 sú stále **mock „AI návrhu“**, len sa teraz
  vyberajú z reálnej sady:

  ```js
  var orangeCandidates = pick(ORANGE, ['Úzkosť','Bezmocnosť','Hnev']);
  ```

  Pri napojení na AI (K4) sa nahradí len tento výber odpoveďou z `/api/ai`.

**Priradenie ilustrácií — vyriešené**

CSV má stĺpec „číslo karty“ a jeho poradie sedí s číslovaním obrázkov
v `docs/karty/`. Overené aj vizuálne: **karty majú číslo vytlačené v rohu
ilustrácie** a sedí (Úzkosť = 17, Odvaha = 47). Provizórne hľadanie podľa
poradia v poli mien je preč, `cardImage()` používa `card.n`:

```js
function cardImage(card){ return '../../docs/karty/' + card.n + '.webp'; }
```

**Obrazovky**

- **S2** — zadná strana oranžovej karty ukazuje **všetky tri situácie** z karty
  (predtým jednu vymyslenú vetu).
- **S3** — pribudol blok „Situácia, ktorá sa ti deje“. Dôvod: reálny „Zmysel
  emócie“ je často veľmi stručný („Rásť“, „Počkať na ujasnenie“) a používateľ,
  ktorý prišiel cez „vyber za mňa náhodne“ alebo cez mriežku všetkých kariet,
  zadnú stranu karty nikdy nevidel — nemal by čo potvrdzovať.
  *Ak Janette tento blok nechce, zmaž ho z HTML a `orangeSituacie` z `renderS3()`.*
- **S3** — zrušená rámovacia veta „Táto emócia sa ti snaží povedať, že…“.
  Nesedela gramaticky: väčšina reálnych textov je neurčitok („Počkať na
  ujasnenie“), takže vznikalo „…povedať, že… Počkať na ujasnenie“. Text teraz
  stojí samostatne pod nadpisom, ako na fyzickej karte.
- **S5, S6** — „Cena za zmenu“ aj ponuka mini-krokov sú reálne kroky z karty.

**Slovenčina v generovaných vetách**

- Nová pomocná funkcia `akuzativ()`. Predtým vznikalo „Dnes mením úzkosť na
  **odvaha**“ a „Rozhodol/a si sa pre **odvaha**“. Pre všetkých 60 názvov stačí
  jedno pravidlo: koncové `-a` → `-u`, ostatné bez zmeny (`-osť`, `-ie`, `-ej`
  a neživotné mužské sa v akuzatíve nemenia). Overené na celej sade.
- `lowerFirst()` — kroky z karty začínajú veľkým písmenom, vnútri vety
  („potrebuješ: urobiť niečo…“) sa zmenšujú.
- `esc()` — texty kariet idú do `innerHTML`, escapujú sa.

**K1 — výber mini-kroku na S6 (opravené)**

Bug: pri prepnutí na „Vlastný malý krok“ ostal označený aj predtým vybraný
predvolený krok.

Príčina nebola v HTML, ale v stave — S6 nemala žiadne `radio` inputy, výber
kreslila len CSS trieda podľa `state.step`. Kliknutie na „vlastné“ nastavilo
`state.customStep = true`, ale `state.step` si ďalej držalo text predchádzajúceho
kroku, takže podmienka `state.step === text` označila aj pôvodný riadok.

Riešenie podľa plánu: ponuka sú teraz **skutočné `input[type=radio]` v jednej
skupine** (`name="microStep"`, `value="custom"` pre vlastný krok). Výber drží
prehliadač, takže dve označené možnosti naraz nie sú možné z princípu, nie
z opatrnosti v kóde. Zvýraznenie riadka ide cez `:has(input:checked)`, bodka
cez `input:checked + .radio-dot`.

Ďalej:
- Textové pole je viditeľné len pri zvolenom `custom` a vtedy dostane fokus.
- CTA „Toto spravím“ je aktívne, len keď je niečo vybrané — pri `custom` až
  po zadaní aspoň 2 znakov.
- Pri prepnutí späť na predvolený krok **text vo vlastnom poli ostáva
  zachovaný**, ale do `state.step` nevstupuje. Používateľ oň nepríde, keď si to
  rozmyslí, a S7 pritom nikdy nezobrazí „ducha“ starého výberu.
- S6 sa už neprekresľuje pri každom kliknutí, len pri vstupe na obrazovku —
  preto textarea nestráca fokus ani obsah. Listenery sú delegované na
  `#stepsList`.
- Vedľajší efekt: skupina je ovládateľná z klávesnice (Tab + šípky) a má
  `:focus-visible` prstenec. Predtým sa S6 klávesnicou prejsť nedala.

**Layout**

- `--cardw`: `clamp(200px, 68vw, 250px)` → `clamp(220px, 82vw, 250px)`.
  Reálne zelené karty nesú viac textu (zmysel + 3 kroky) a na 320 px
  pretekalo 13 z 30 kariet o 7–48 px. Nad ~305 px šírky je karta stále 250 px,
  čiže **na bežných mobiloch a desktope sa nemení nič** — mení sa len správanie
  na úzkych displejoch.

## Overené

- 320 px aj 1280 px: žiadne horizontálne scrollovanie, žiadna karta nepreteká
  (merané programovo na všetkých 60 kartách), konzola bez chýb.
- Všetkých 60 obrázkov sa načíta (HEAD 200).
- Celý tok S1 → S7 vrátane mriežky všetkých kariet a vyhľadávania.
- K1 podľa akceptačných kritérií: pri opakovanom prepínaní
  predvolený → vlastné → predvolený je v každom okamihu označená práve jedna
  možnosť (1 zvýraznený riadok, 1 plná bodka), `state.step` sedí s tým, čo je
  označené, S7 zobrazí správny krok v oboch vetvách a návrat cez Späť obnoví
  predchádzajúci výber aj text.

## Známe ďalšie kroky

- Obsahová revízia textov — otvorené otázky sú v `docs/texty-kariet-qa.md`.
- K3 (hosting + Basic Auth), K4 (AI v S2/S7/S1) — viď plán stretnutia.
