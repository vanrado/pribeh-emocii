# Obrázky kariet

Ilustrácie jednotlivých kariet z fyzického balíčka. Súbory sú **číslované podľa
poradia v balíčku**, vo formáte **WebP**:

- `1.webp` – `30.webp` … záťažové (oranžové) karty
- `31.webp` – `60.webp` … akčné (zelené) karty

Karty nemajú na ilustrácii napísaný názov emócie — identifikuje ich len číslo
v rohu.

> Originály boli CMYK JPG (~272 MB spolu, print rozlíšenie). Skomprimované na
> WebP (dlhšia strana 900 px, kvalita 72) → ~2,7 MB spolu, bez viditeľnej straty
> kvality pre web. Ak treba znova generovať: `sips -Z 900 -s format png IN.jpg
> --out tmp.png && cwebp -q 72 tmp.png -o OUT.webp`.

## Priradenie číslo → emócia

Prototyp (`prototypes/v3/`) používa obrázky zatiaľ **iba na Screen 2** (oranžové
karty) a priraďuje ich **provizórne podľa poradia** emócie v zozname
`allOrangeNames` (t.j. obrázok `N.jpg` = N-tá oranžová emócia):

| # | Emócia |
|---|---|
| 1 | Sklamanie |
| 2 | Odpor |
| 3 | Apatia |
| 4 | Frustrácia |
| 5 | Depresia |
| 6 | Ľahostajnosť |
| 7 | Mrzutosť |
| 8 | Hrôza |
| 9 | Vyčerpanie |
| 10 | Clivota |
| 11 | Strach |
| 12 | Neistota |
| 13 | Zmätenosť |
| 14 | Stres |
| 15 | Bezmocnosť |
| 16 | Pochybnosť |
| 17 | Úzkosť |
| 18 | Beznádej |
| 19 | Bojazlivosť |
| 20 | Smútok |
| 21 | Rezignácia |
| 22 | Nerozhodnosť |
| 23 | Ľútosť |
| 24 | Vina |
| 25 | Arogancia |
| 26 | Žiaľ |
| 27 | Hnev |
| 28 | Lenivosť |
| 29 | Únava |
| 30 | Rozhorčenie |

> ⚠️ **TODO:** Toto poradie je len predbežné. Skutočné priradenie čísla karty
> k emócii treba overiť podľa príručky (`docs/source/prirucka-emocie.pdf`) a
> opraviť. Ak obrázok pre danú emóciu chýba alebo nesedí, karta zobrazí
> náhradnú SVG figúrku (žiadna rozbitá ikona).
