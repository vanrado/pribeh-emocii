#!/usr/bin/env python3
"""
Lokálny server pre prototypy s /api/ai bez Basic Auth v prehliadači.

Dva režimy:
  python3 tools/dev-server.py            # MOCK: pevné odpovede, bez kreditu, bez kľúča
  python3 tools/dev-server.py --proxy    # PROXY: /api/ai preposiela na lokálny Worker
                                         #   (npm run dev, port 8788) s Basic Auth z .dev.vars

Načo to je: `wrangler dev` chráni všetko Basic Authom, čo v automatizovanom
prehliadači nejde odklikať. Mock režim navyše umožňuje deterministicky
prejsť všetky stavy UI (loading, ok, fallback) bez volania OpenAI.

Markery v texte situácie (len mock):
  [pomaly]   každá odpoveď mešká 2,5 s → vidno skeletony
  [chyba]    každá odpoveď je 503     → vidno záložné texty
  [kriza]    navrhni-karty vráti kriza:true → vidno Safety zástavu

Statické súbory sa servujú z koreňa repa, takže cesty sú rovnaké ako
v produkcii: /prototypes/v7/, /docs/karty/17.webp …
"""

import argparse
import base64
import json
import sys
import time
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WORKER_URL = "http://127.0.0.1:8788/api/ai"

USAGE = {"prompt_tokens": 1234, "completion_tokens": 120}

# Mock zámerne mení zelený návrh podľa zvolenej záťažovej karty — presne to,
# čo v7 opravuje: bez `zatazova` boli akčné karty pre Úzkosť aj Hnev rovnaké.
MOCK_AKCNE = {
    "Hnev": ["Dôstojnosť", "Rešpekt", "Akceptácia"],
    "Bezmocnosť": ["Dôstojnosť", "Dôvera", "Akceptácia"],
    None: ["Odvaha", "Dôvera", "Nádej"],
}
MOCK_ZATAZOVE = ["Úzkosť", "Bezmocnosť", "Strach"]


def mock_response(body):
    task = body.get("task")
    sit = body.get("situacia") or ""
    if "[chyba]" in sit:
        return 503, {"error": "Mock: simulované zlyhanie AI."}
    if "[pomaly]" in sit:
        time.sleep(2.5)
    kriza = "[kriza]" in sit
    zat = body.get("zatazova")

    if task == "navrhni-karty":
        if body.get("balicek") == "akcne":
            mena = MOCK_AKCNE.get(zat, MOCK_AKCNE[None])
            karty = [
                {"name": m, "preco": f"(mock) {m} sedí na to, čo si opísal/a, a odpovedá na {zat or 'tvoju situáciu'}."}
                for m in mena
            ]
            return 200, {"karty": karty, "kriza": kriza, "balicek": "akcne",
                         "zatazova": {"name": zat} if zat else None, "usage": USAGE}
        karty = [{"name": m, "preco": f"(mock) {m}: z tvojho textu znie, že presne toto prežívaš."} for m in MOCK_ZATAZOVE]
        return 200, {"karty": karty, "kriza": kriza, "balicek": "zatazove", "zatazova": None, "usage": USAGE}

    if task == "porozumenie":
        return 200, {
            "zmysel": f"(mock) {zat} ti v tejto situácii signalizuje, že ti na výsledku záleží a že vnímaš riziko, ktoré ešte nemá tvar.",
            "otazka": "(mock) Čo najhoršie sa podľa teba môže stať — a čo by si urobil/a potom?",
            "zatazova": {"name": zat}, "usage": USAGE,
        }

    if task == "pribeh-zmeny":
        akc = body.get("akcna")
        return 200, {
            "teraz": f"(mock) {zat} ťa teraz drží v čakaní — kým sa niečo nerozhodne, neurobíš nič.",
            "most": f"(mock) {akc} ti dovolí urobiť prvý krok skôr, než budeš mať istotu, ako to dopadne.",
            # index 1 zámerne — vo v6 sa vždy bral prvý bod, tu má byť vidieť, že model vyberá
            "cena": {"index": 1, "text": None, "v_situacii": f"(mock) V tvojom prípade to znamená všímať si aj to, čo sa dnes podarilo, nie len čo visí vo vzduchu."},
            "mikrokroky": [
                {"text": "(mock) Napíš si tri veci, ktoré sa dnes podarili.", "lahsi": False},
                {"text": "(mock) Povedz jednému človeku, čo od situácie čakáš.", "lahsi": False},
                {"text": "(mock) Otvor si poznámky a napíš jednu vetu o tom, čo cítiš.", "lahsi": True},
            ],
            "zatazova": {"name": zat}, "akcna": {"name": akc}, "usage": USAGE,
        }

    if task == "zaver":
        akc = body.get("akcna")
        krok = body.get("krok") or "tvoj krok"
        return 200, {
            "pribeh": f"(mock) Prišiel/prišla si s tým, že nevieš, či stihneš termíny. Pomenoval/a si to ako {zat} — signál, že ti na výsledku záleží. Vybral/a si {akc} a zaviazal/a si sa: {krok}",
            "mantry": [f"(mock) Moja {akc} sa dnes zmestí do jedného zoznamu.", f"(mock) Jeden krok stačí, aby {zat} nemala posledné slovo."],
            "zatazova": {"name": zat}, "akcna": {"name": akc}, "usage": USAGE,
        }

    return 400, {"error": f"Mock: neznámy task {task!r}."}


def read_dev_vars():
    vals = {}
    path = ROOT / ".dev.vars"
    if not path.exists():
        return vals
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        vals[k.strip()] = v.strip().strip('"').strip("'")
    return vals


def proxy_response(raw_body):
    creds = read_dev_vars()
    user, pw = creds.get("BASIC_AUTH_USER"), creds.get("BASIC_AUTH_PASS")
    if not user or not pw:
        return 500, {"error": "Proxy: v .dev.vars chýba BASIC_AUTH_USER / BASIC_AUTH_PASS."}
    token = base64.b64encode(f"{user}:{pw}".encode("utf-8")).decode("ascii")
    req = urllib.request.Request(
        WORKER_URL, data=raw_body, method="POST",
        headers={"Content-Type": "application/json", "Authorization": f"Basic {token}"},
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8") or "{}")
    except urllib.error.HTTPError as e:
        try:
            return e.code, json.loads(e.read().decode("utf-8") or "{}")
        except Exception:
            return e.code, {"error": f"Worker vrátil HTTP {e.code}."}
    except urllib.error.URLError as e:
        return 502, {"error": f"Proxy: Worker na {WORKER_URL} nebeží ({e.reason}). Spusti `npm run dev`."}


class Handler(SimpleHTTPRequestHandler):
    proxy = False

    def __init__(self, *a, **kw):
        super().__init__(*a, directory=str(ROOT), **kw)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self):
        if self.path != "/api/ai":
            return self._json(404, {"error": "Neznámy endpoint."})
        length = int(self.headers.get("Content-Length") or 0)
        raw = self.rfile.read(length)
        try:
            body = json.loads(raw.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            return self._json(400, {"error": "Telo requestu nie je platný JSON."})

        status, data = proxy_response(raw) if self.proxy else mock_response(body)
        zat = body.get("zatazova")
        detail = f" balicek={body.get('balicek')}" if body.get("balicek") else ""
        detail += f" zatazova={zat}" if zat else ""
        detail += f" akcna={body.get('akcna')}" if body.get("akcna") else ""
        print(f"[{'proxy' if self.proxy else 'mock'}] {body.get('task')}{detail} → {status}", flush=True)
        self._json(status, data)

    def _json(self, status, data):
        payload = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, fmt, *args):
        # statické GETy nezahlcujú výstup; zaujímavé sú len /api/ai (vyššie)
        if "/api/" in (args[0] if args else ""):
            super().log_message(fmt, *args)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--proxy", action="store_true", help="preposielať /api/ai na lokálny Worker (port 8788)")
    ap.add_argument("--port", type=int, default=8124)
    args = ap.parse_args()
    Handler.proxy = args.proxy
    server = ThreadingHTTPServer(("127.0.0.1", args.port), Handler)
    rezim = f"PROXY → {WORKER_URL} (Basic Auth z .dev.vars)" if args.proxy else "MOCK (bez OpenAI)"
    print(f"dev-server: http://localhost:{args.port}/prototypes/v7/  |  /api/ai = {rezim}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
