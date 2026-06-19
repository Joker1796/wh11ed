#!/usr/bin/env python3
# Downloads the GDM 2026 primary/secondary mission card images (Warhammer 40k 11th ed)
# from game-datamissions.com and writes a manifest of every card.
#
#   python3 scripts/fetch-mission-cards.py            # download all cards + write manifest
#   python3 scripts/fetch-mission-cards.py --manifest # only (re)write the manifest, no images
#
# WHY: the site is a Next.js PWA whose mission RULES are baked into card PNG images
# (no rules text in the HTML/JS). So we enumerate the cards from each index page's
# JSON-LD ItemList, then pull the static PNGs at their predictable /assets/ paths.
# The card TEXT is transcribed separately via vision into src/data/missions.js — this
# script only handles the deterministic image download + enumeration.
#
# HTTP note: force --http1.1; over HTTP/2 curl intermittently truncates to 16 KB.

import re, json, sys, os, subprocess, time

BASE = "https://game-datamissions.com"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT_DIR = "/tmp/mission-cards"            # image download target (transcription source)
MANIFEST = os.path.join(OUT_DIR, "manifest.json")

PRIMARY_DECKS = ["take-and-hold", "purge-the-foe", "reconnaissance",
                 "priority-assets", "disruption"]
SECONDARY_ROLES = ["attacker", "defender"]

def get(url):
    for _ in range(6):
        r = subprocess.run(["curl", "-sL", "--http1.1", "--connect-timeout", "20",
                            "--max-time", "60", url], capture_output=True, text=True)
        if r.stdout and "ItemList" in r.stdout:
            return r.stdout
        time.sleep(2)
    return r.stdout or ""

def flight_blob(html):
    raw = ''.join(re.findall(r'self\.__next_f\.push\(\[1,"(.*?)"\]\)', html, re.S))
    return raw.encode().decode('unicode_escape', errors='replace')

def itemlist(html, path_prefix):
    """Parse JSON-LD ItemList → [(name, slug)] in listed order.
    The JSON-LD is sometimes doubly-escaped in the flight payload, so strip any
    backslashes before quotes/slashes first to normalise both cases."""
    blob = flight_blob(html)
    blob = blob.replace('\\"', '"').replace('\\/', '/')
    pat = r'"name":"([^"]+)","url":"https://gdmissions\.app%s/([a-z0-9-]+)"' % re.escape(path_prefix)
    return re.findall(pat, blob)

def download(url, dest):
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    for _ in range(5):
        subprocess.run(["curl", "-sL", "--http1.1", "--max-time", "60", "-o", dest, url])
        if os.path.exists(dest) and os.path.getsize(dest) > 5000:
            return True
        time.sleep(2)
    return False

def main():
    manifest_only = "--manifest" in sys.argv
    cards = []
    # Primary: 5 decks × 5 cards
    for deck in PRIMARY_DECKS:
        html = get(f"{BASE}/11th/primary-missions/{deck}")
        for name, slug in itemlist(html, f"/11th/primary-missions/{deck}"):
            cards.append({"type": "primary", "deck": deck, "slug": slug, "name": name,
                          "image": f"/assets/11th/primary-missions/{deck}/{slug}.png"})
    # Secondary: 18 missions × 2 roles. Base slug = list slug minus a trailing role suffix.
    html = get(f"{BASE}/11th/secondary-missions")
    seen = []
    for name, slug in itemlist(html, "/11th/secondary-missions"):
        base = re.sub(r'-(attacker|defender)$', '', slug)
        if base in [s for _, s in seen]:
            continue
        seen.append((name, base))
    for name, base in seen:
        for role in SECONDARY_ROLES:
            cards.append({"type": "secondary", "role": role, "slug": base, "name": name,
                          "image": f"/assets/11th/secondary-missions/{role}/{base}.png"})

    os.makedirs(OUT_DIR, exist_ok=True)
    json.dump(cards, open(MANIFEST, "w"), ensure_ascii=False, indent=1)
    n_pri = sum(1 for c in cards if c["type"] == "primary")
    n_sec = sum(1 for c in cards if c["type"] == "secondary")
    print(f"manifest: {len(cards)} cards ({n_pri} primary, {n_sec} secondary) -> {MANIFEST}", file=sys.stderr)

    if manifest_only:
        return
    ok = fail = 0
    for c in cards:
        sub = c["deck"] if c["type"] == "primary" else c["role"]
        dest = os.path.join(OUT_DIR, c["type"], sub, c["slug"] + ".png")
        if download(BASE + c["image"], dest):
            ok += 1
        else:
            fail += 1
            print(f"  FAIL {c['image']}", file=sys.stderr)
    print(f"downloaded {ok}/{ok+fail} card images into {OUT_DIR}/", file=sys.stderr)

if __name__ == "__main__":
    main()
