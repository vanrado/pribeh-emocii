#!/usr/bin/env python3
"""
Import textov kariet z CSV do dátovej vrstvy prototypu.

Zdroj:  docs/source/texty-kariet.csv   (export z Google Sheetu od Janette)
Výstup: prototypes/v5/cards.js         (window.CARDS pre prototyp)

Spustenie z koreňa repa:
    python3 tools/csv-to-cards.py
    python3 tools/csv-to-cards.py --report    # + kontrolný výpis anomálií v texte

Keď Janette vráti opravené texty, prepíš CSV a spusti znova — index.html
sa nemení.

Štruktúra CSV (7 stĺpcov, bez zmeny oproti pôvodnému exportu):
    0 číslo karty | 1 názov emócie | 2–4 tri texty | 5 zmysel emócie | 6 tip
Riadky 1–30 sú záťažové (oranžové), 31–60 akčné (zelené).
Číslo karty je zároveň číslom ilustrácie v docs/karty/N.webp.
"""

import argparse
import csv
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / "docs" / "source" / "texty-kariet.csv"
OUT_PATH = ROOT / "prototypes" / "v5" / "cards.js"

# Redakčná poznámka, ktorá sa omylom dostala do exportu (maď. „nerozumiem“).
# Nie je to obsah karty — orezáva sa pri importe, ale hlási sa v --report.
EDITORIAL_NOISE = re.compile(r"\s*-\s*\?\?\?\s*Nem értem\s*$")


def clean(text: str) -> str:
    """Mechanická normalizácia. Zámerne NEopravuje preklepy ani interpunkciu."""
    text = EDITORIAL_NOISE.sub("", text)
    text = text.replace(" ", " ")
    text = re.sub(r"[ \t]+", " ", text)
    return text.strip()


def slug(name: str) -> str:
    n = unicodedata.normalize("NFD", name)
    n = "".join(c for c in n if unicodedata.category(c) != "Mn")
    n = n.lower()
    n = re.sub(r"[^a-z0-9]+", "-", n)
    return n.strip("-")


def read_cards():
    with CSV_PATH.open(encoding="utf-8-sig") as fh:
        rows = list(csv.reader(fh))

    orange, green, raw = [], [], {}
    for row in rows:
        if len(row) < 6 or not row[0].strip().isdigit():
            continue
        n = int(row[0])
        name = clean(row[1])
        texts = [clean(c) for c in row[2:5] if clean(c)]
        zmysel = clean(row[5])
        raw[n] = [row[1], *row[2:6]]

        card = {"n": n, "id": slug(name), "name": name, "zmysel": zmysel}
        if n <= 30:
            card["situacie"] = texts
            orange.append(card)
        else:
            card["potrebujem"] = texts
            green.append(card)

    return orange, green, raw


def validate(orange, green):
    problems = []
    if len(orange) != 30:
        problems.append(f"oranžových kariet: {len(orange)}, očakávam 30")
    if len(green) != 30:
        problems.append(f"zelených kariet: {len(green)}, očakávam 30")
    for c in orange + green:
        texts = c.get("situacie") or c.get("potrebujem") or []
        if len(texts) != 3:
            problems.append(f"karta {c['n']} {c['name']}: {len(texts)} textov, očakávam 3")
        if not c["zmysel"]:
            problems.append(f"karta {c['n']} {c['name']}: chýba zmysel emócie")
        img = ROOT / "docs" / "karty" / f"{c['n']}.webp"
        if not img.exists():
            problems.append(f"karta {c['n']} {c['name']}: chýba ilustrácia {img.name}")
    ids = [c["id"] for c in orange + green]
    dupes = {i for i in ids if ids.count(i) > 1}
    if dupes:
        problems.append(f"duplicitné id: {sorted(dupes)}")
    return problems


# Písmená mimo slovenskej abecedy — takmer vždy preklep alebo zlá klávesnica.
# (Slovenčina má á ä č ď é í ĺ ľ ň ó ô ŕ š ť ú ý ž — tie sa nehlásia.)
# Zachytáva poľské, české, nemecké, francúzske a španielske znaky.
NON_SK_LETTERS = re.compile(r"[ąćęłńśźżěřůāēīōūöüßàâçèêëîïùûÿãõñ]", re.I)

# „Zmysel emócie“ je zámerne bez koncovej bodky (48 zo 60 kariet) — nekontroluje sa.


def report(orange, green, raw):
    """Kontrolný výpis pre obsahovú revíziu — nič neopravuje."""
    print("\n--- Anomálie v textoch (na revíziu, import ich nemení) ---")
    for c in orange + green:
        fields = [("zmysel", c["zmysel"], False)]
        fields += [(f"text {i+1}", t, True)
                   for i, t in enumerate(c.get("situacie") or c.get("potrebujem") or [])]
        for label, txt, expect_period in fields:
            hits = []
            if expect_period and txt and txt[-1] not in ".!?":
                hits.append("bez koncovej bodky")
            bad = sorted(set(NON_SK_LETTERS.findall(txt)))
            if bad:
                hits.append(f"nie slovenský znak {bad} — pravdepodobne preklep")
            if '"' in txt:
                hits.append("rovné úvodzovky (v appke sa inak používajú „ “)")
            if re.search(r"/ \w", txt):
                hits.append("medzera po lomke v rodovom tvare (inde bez medzery)")
            if hits:
                print(f"  {c['n']:>2} {c['name']:<15} {label:<8} — {'; '.join(hits)}")
                print(f"     „{txt}“")
    touched = [n for n, cells in raw.items() if any(cell != clean(cell) for cell in cells)]
    if touched:
        print(f"\n  Normalizované medzery pri kartách: {touched}")
    if any(EDITORIAL_NOISE.search(cell) for cells in raw.values() for cell in cells):
        print("  ⚠ Orezaná redakčná poznámka „??? Nem értem“ — pozri docs/texty-kariet-qa.md")


def emit(orange, green):
    header = (
        "/* Texty kariet „Veľký príbeh emócií“.\n"
        " *\n"
        " * GENEROVANÉ — needituj ručne.\n"
        " * Zdroj:    docs/source/texty-kariet.csv\n"
        " * Generuje: python3 tools/csv-to-cards.py\n"
        " *\n"
        " * n = číslo karty v balíčku = číslo ilustrácie docs/karty/n.webp\n"
        " *     1–30 záťažové (oranžové), 31–60 akčné (zelené)\n"
        " */\n"
    )

    def block(label, cards):
        lines = [f"  {label}: ["]
        for c in cards:
            texts = c.get("situacie") or c.get("potrebujem")
            key = "situacie" if "situacie" in c else "potrebujem"
            lines.append("    {")
            lines.append(f"      n: {c['n']}, id: {json.dumps(c['id'], ensure_ascii=False)}, "
                         f"name: {json.dumps(c['name'], ensure_ascii=False)},")
            lines.append(f"      {key}: [")
            for t in texts:
                lines.append(f"        {json.dumps(t, ensure_ascii=False)},")
            lines.append("      ],")
            lines.append(f"      zmysel: {json.dumps(c['zmysel'], ensure_ascii=False)}")
            lines.append("    },")
        lines.append("  ],")
        return "\n".join(lines)

    body = "window.CARDS = {\n" + block("orange", orange) + "\n" + block("green", green) + "\n};\n"
    OUT_PATH.write_text(header + body, encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--report", action="store_true", help="vypíš anomálie v texte")
    args = ap.parse_args()

    orange, green, raw = read_cards()
    problems = validate(orange, green)
    if problems:
        print("CHYBA — import zastavený:", file=sys.stderr)
        for p in problems:
            print("  •", p, file=sys.stderr)
        sys.exit(1)

    emit(orange, green)
    print(f"OK — {len(orange)} oranžových + {len(green)} zelených kariet → "
          f"{OUT_PATH.relative_to(ROOT)}")
    if args.report:
        report(orange, green, raw)


if __name__ == "__main__":
    main()
