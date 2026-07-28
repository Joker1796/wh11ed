#!/usr/bin/env python3
# Regenerates src/data/mfmFactions.js from the official Munitorum Field Manual.
#
#   python3 scripts/scrape-mfm.py            # fetch all factions + write the data module
#   python3 scripts/scrape-mfm.py --cache    # reuse already-downloaded pages in /tmp cache
#
# Source: https://mfm.warhammer-community.com/en  (English-only points reference).
# Run this whenever a new MFM version drops — the version number itself is scraped from the
# page (see detect_version()), no manual bump needed.
#
# WHY THIS IS NOT A SIMPLE SCRAPE — three gotchas, all handled here:
#   1. The site is a Next.js app that streams points via React Suspense. Each unit's
#      price renders as <template id="P:x"></template> and is filled at runtime by a
#      `$RS("S:x","P:x")` script that copies the matching hidden <div id="S:x">…pts…</div>
#      into it. So the visible HTML has NO numbers until you replay that reveal.
#      `reconstruct()` does exactly what the browser does — substitutes every P:x
#      placeholder with its S:x content (iteratively, since unit blocks contain nested
#      price placeholders) — yielding a DOM in correct visual/section order.
#      (A generic HTML-to-text summarizer CANNOT read these numbers and will hallucinate.)
#   2. Over HTTP/2, curl intermittently truncates the response to exactly 16 KB.
#      We force --http1.1, which returns the full page reliably.
#   3. As of MFM v1.1 the site highlights units/detachments whose points changed since the
#      previous version with a coloured header + an inline "▲ (+10)"/"▼ (-10)" delta before the
#      actual points (see UNIT_SPLIT_RE and the points regex in parse_units for the fallout).

import re, html as H, json, sys, os, subprocess, time

MFM_VERSION_FALLBACK = '1.0'  # used only if detect_version() can't find a version string
MFM_VERSION = MFM_VERSION_FALLBACK  # overwritten from the first successfully-fetched page
HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.normpath(os.path.join(HERE, '..', 'src', 'data'))
MFM_DIR = os.path.join(DATA, 'mfm')              # per-faction modules
BARREL  = os.path.join(DATA, 'mfmFactions.js')   # aggregating barrel
CACHE = '/tmp/mfm-pages'

SLUGS = ["adepta-sororitas","adeptus-custodes","adeptus-mechanicus","aeldari","astra-militarum",
"black-templars","blood-angels","chaos-daemons","chaos-knights","chaos-space-marines",
"chaos-titan-legions","dark-angels","death-guard","deathwatch","drukhari","emperors-children",
"genestealer-cults","grey-knights","imperial-agents","imperial-knights","leagues-of-votann",
"necrons","orks","space-marines","space-wolves","tau-empire","thousand-sons","titan-legions",
"tyranids","world-eaters"]

SMALL = {"of","the","a","an","and","or","to","in","on","with","for","from","at","by"}
ACRO  = {"Atv":"ATV","Rsv":"RSV","Afv":"AFV"}
# Unit-name header markup. As of MFM v1.1 the site highlights units whose points changed since the
# previous version: an unchanged unit still uses the original plain slate header (name as bare text
# right after the class attribute), but a changed one switches to a colour keyed to the direction of
# the change (bg-red-500 = went up, bg-emerald-600 = went down, bg-amber-500 = mixed across tiers,
# each usually wrapping the name in a nested `<span class="text-xl keep-all">` — though at least one
# unit (Orks' Gretchin) has been seen keeping the old plain-text layout with just the colour swapped).
# Rather than enumerate every colour, match on the two layout SHAPES instead — old (`…font-bold
# text-xl text-white">NAME<`) and new (`…font-bold text-white"><span class="text-xl keep-all">NAME<`)
# — whatever bg-* colour precedes either is irrelevant. Splitting right after either opening sequence
# leaves the name as the plain text up to the next `<`, so the rest of parse_units (which just looks
# for `([^<]+)<`) doesn't need to care which variant/colour it is. (Detachment-name headers use a
# different inner span class, `text-xl break-all`, so they never collide with the "new" branch here.)
UNAME = 'bg-slate-500 dark:bg-slate-800 font-bold text-xl text-white'
UNIT_SPLIT_RE = re.compile(
    r'font-bold text-xl text-white">'
    r'|font-bold text-white"><span class="text-xl keep-all">'
)
# A points span (unit option or enhancement) is plain (`<span>100 pts</span>`) when unchanged since
# the last MFM version, or coloured with an optional leading "▲ (+10)"/"▼ (-10)" delta when changed
# (`<span class="text-red-500 dark:text-red-400">▲ (+10) 100 pts</span>`) — either way the number
# immediately before "pts" is the current price we want.
PTS_RE = r'<span[^>]*>\s*(?:[▲▼]\s*(?:\([+-]?[\d,]+\)\s*)?)?([\d,]+)\s*pts\s*</span>'
SPECIAL_NAMES = {"tau-empire":"T’au Empire","leagues-of-votann":"Leagues of Votann",
                 "emperors-children":"Emperor’s Children"}

# ---- fetch ---------------------------------------------------------------
def download(slug):
    """Fetch a faction page, retrying until we get the full (non-truncated) HTML."""
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, slug + ".html")
    if "--cache" in sys.argv and os.path.exists(path):
        if has_units(open(path, encoding="utf-8").read()): return path
    url = f"https://mfm.warhammer-community.com/en/{slug}"
    for attempt in range(8):
        subprocess.run(["curl","-sL","--http1.1","--connect-timeout","20","--max-time","60",
                        "-o",path,url])
        if os.path.exists(path) and has_units(open(path, encoding="utf-8").read()):
            return path
        time.sleep(3)
    print(f"  WARN: {slug} may be incomplete", file=sys.stderr)
    return path

def has_units(raw):
    # Titan factions legitimately have no detachments, so key on unit-name divs. Check both the
    # unchanged (UNAME) and the changed/highlighted (UNIT_SPLIT_RE) header forms — a page where
    # every unit's points changed this version would have zero UNAME matches on its own.
    return UNAME in raw or UNIT_SPLIT_RE.search(raw) is not None

def detect_version(raw):
    m = re.search(r'<h2 class="text-xl font-semibold">v([\d.]+)</h2>', raw)
    return m.group(1) if m else None

# ---- DOM reconstruction (replay the $RS reveal) --------------------------
def reconstruct(raw):
    pairs = re.findall(r'\$RS\("(S:[0-9a-f]+)","(P:[0-9a-f]+)"\)', raw)
    content, spans = {}, []
    for sid, pid in pairs:
        cm = re.search(r'\$RS\("%s","%s"\)' % (re.escape(sid), re.escape(pid)), raw)
        if not cm: continue
        dstart = raw.rfind('<div hidden id="%s">' % sid, 0, cm.start())
        if dstart < 0: continue
        inner = raw[dstart + len('<div hidden id="%s">' % sid):cm.start()]
        content[pid] = inner[:inner.rfind('</div>')]
        sc_end = raw.find('</script>', cm.end())
        spans.append((dstart, sc_end + len('</script>') if sc_end >= 0 else cm.end()))
    spans.sort()
    out, last = [], 0
    for a, b in spans:
        if a < last: continue
        out.append(raw[last:a]); last = b
    out.append(raw[last:])
    doc = ''.join(out)
    for _ in range(15):
        if '<template id="P:' not in doc: break
        doc = re.sub(r'<template id="(P:[0-9a-f]+)"></template>',
                     lambda m: content.get(m.group(1), ''), doc)
    return doc

# ---- parsing -------------------------------------------------------------
def titlecase(s):
    out = []
    for i, w in enumerate(H.unescape(s).strip().split(' ')):
        if not w: continue
        if i > 0 and w.lower() in SMALL: out.append(w.lower()); continue
        nps = []
        for p in w.split('-'):
            if not p: nps.append(p); continue
            t = p[0].upper() + p[1:].lower()
            nps.append(ACRO.get(t, t))
        out.append('-'.join(nps))
    return ' '.join(out)

def note_for(label):
    m = re.match(r'YOUR (.*?) UNITS? COSTS?$', H.unescape(label).strip().upper())
    mid = (m.group(1).strip() if m else '')
    if not mid: return None
    return mid.replace(' + ','+').replace(' +','+').replace('+ ','+').replace(' TO ','-').lower()

def parse_detachments(region):
    dets = []
    # A detachment whose DP/Force Disposition/enhancements changed since the last MFM version gets
    # the same header-recolour treatment as units (see UNIT_SPLIT_RE) — its name switches from a
    # plain `<span class="text-xl break-all">` to `<span class="text-xl keep-all">` on a coloured
    # header div. Split on either.
    for chunk in re.split(r'class="text-xl (?:break|keep)-all">', region)[1:]:
        nm = re.match(r'([^<]+)<', chunk)
        if not nm: continue
        det = {"name": titlecase(nm.group(1))}
        # DP cost (every detachment has one): <span class="text-sm self-end pl-2">2DP</span> — a
        # changed detachment gets an extra "text-nowrap" class, and the number is sometimes followed
        # inside the SAME span by a hydration comment + a "▲"/"▼"/"▲▼" delta arrow before the closing
        # tag (`3DP<!-- --> ▲`), so don't require `</span>` to immediately follow the digits.
        dp = re.search(r'<span class="text-sm self-end pl-2(?: text-nowrap)?">(\d+)DP', chunk)
        if dp: det["dp"] = int(dp.group(1))
        # Force Disposition — the first colored banner div after the name.
        fd = re.search(r'style="background-color:#[0-9A-Fa-f]+">([^<]+)</div>', chunk)
        if fd: det["forceDisposition"] = titlecase(fd.group(1))
        # UNIQUE keyword lock (optional), kept uppercase like a game keyword.
        uq = re.search(r'>UNIQUE:\s*([^<]+)</span>', chunk)
        if uq: det["unique"] = H.unescape(uq.group(1)).strip()
        det["enhancements"] = [{"name": H.unescape(e.group(1)).strip(), "points": int(e.group(2).replace(',', ''))}
                               for e in re.finditer(r'<span>([^<]+?)</span>' + PTS_RE, chunk)]
        dets.append(det)
    return dets

def parse_units(region):
    units = []
    for chunk in UNIT_SPLIT_RE.split(region)[1:]:
        nm = re.match(r'([^<]+)<', chunk)
        if not nm: continue
        opts = []
        for sm in re.finditer(r'font-bold text-black dark:text-white">(YOUR[^<]*)</div>(.*?)'
                              r'(?=font-bold text-black dark:text-white">YOUR|WARGEAR OPTIONS|'
                              + UNIT_SPLIT_RE.pattern + r'|$)', chunk, re.S):
            note = note_for(sm.group(1))
            for li in re.finditer(r'<li>(.*?)</li>', sm.group(2), re.S):
                lic = li.group(1)
                pm = re.search(PTS_RE, lic)
                if not pm: continue
                spans = re.findall(r'<span>([^<]*)</span>', lic)
                mdl, lblnote = None, None
                if spans:
                    t = H.unescape(spans[0]).strip()
                    mm = re.match(r'(\d+)\s*models?$', t)
                    if mm: mdl = int(mm.group(1))
                    elif 'pts' not in t: lblnote = t
                opt = {}
                if mdl is not None: opt["models"] = mdl
                opt["points"] = int(pm.group(1).replace(',', ''))
                n = lblnote if not note else (f"{lblnote} ({note})" if lblnote else note)
                if n: opt["note"] = n
                opts.append(opt)
        if opts: units.append({"name": titlecase(nm.group(1)), "options": opts})
    return units

def parse_faction(slug, raw):
    doc = reconstruct(raw)
    h3 = lambda s: H.unescape(re.sub(r'<[^>]+>', '', s)).strip().upper()
    hs = [(h3(m.group(1)), m.start(), m.end())
          for m in re.finditer(r'<h3[^>]*>(.*?)</h3>', doc, re.S)]
    bounds = [(t, e, (hs[i+1][1] if i+1 < len(hs) else len(doc)))
              for i, (t, s, e) in enumerate(hs)]
    fac = {"id": slug, "name": SPECIAL_NAMES.get(slug, ' '.join(w.capitalize() for w in slug.split('-'))),
           "slug": slug, "sourceUrl": f"https://mfm.warhammer-community.com/en/{slug}",
           "detachments": [], "units": [], "subfactions": []}
    for t, s, e in bounds:
        if t == "DETACHMENTS": fac["detachments"] = parse_detachments(doc[s:e])
        elif t == "UNITS":     fac["units"] = parse_units(doc[s:e])
        elif t == "V1.0":      pass
        else:
            us = parse_units(doc[s:e])
            if us:
                nm = "Agents of the Imperium (allied)" if ("IMPERIUM" in t and "KEYWORD" in t) else titlecase(t)
                fac["subfactions"].append({"name": nm, "units": us})
    return fac

# ---- JS emission ---------------------------------------------------------
def q(s): return "'" + str(s).replace('\\', '\\\\').replace("'", "\\'") + "'"

def emit_opt(o):
    parts = ([f"models: {o['models']}"] if 'models' in o else []) + [f"points: {o['points']}"]
    if 'note' in o: parts.append(f"note: {q(o['note'])}")
    return "{ " + ", ".join(parts) + " }"

def emit_unit(u, ind):
    return f"{' '*ind}{{ name: {q(u['name'])}, options: [{', '.join(emit_opt(o) for o in u['options'])}] }}"

def camel(slug):
    parts = slug.split('-')
    return parts[0] + ''.join(p.capitalize() for p in parts[1:])

def emit_faction(f):
    """One per-faction module: src/data/mfm/<slug>.js with a default-exported object."""
    L = [f"// {f['name']} — Munitorum Field Manual v{MFM_VERSION} points.",
         f"// Source: {f['sourceUrl']}",
         "// Generated by scripts/scrape-mfm.py — do not edit by hand.",
         "export default {",
         f"  id: {q(f['id'])},", f"  name: {q(f['name'])},",
         f"  slug: {q(f['slug'])},", f"  sourceUrl: {q(f['sourceUrl'])},"]
    if f['detachments']:
        L.append("  detachments: [")
        for d in f['detachments']:
            eh = ', '.join(f"{{ name: {q(e['name'])}, points: {e['points']} }}" for e in d['enhancements'])
            head = f"name: {q(d['name'])}"
            if 'dp' in d: head += f", dp: {d['dp']}"
            if 'forceDisposition' in d: head += f", forceDisposition: {q(d['forceDisposition'])}"
            if 'unique' in d: head += f", unique: {q(d['unique'])}"
            L.append(f"    {{ {head}, enhancements: [{eh}] }},")
        L.append("  ],")
    else: L.append("  detachments: [],")
    if f['units']:
        L.append("  units: [")
        L += [emit_unit(u, 4) + "," for u in f['units']]
        L.append("  ],")
    else: L.append("  units: [],")
    if f['subfactions']:
        L.append("  subfactions: [")
        for s in f['subfactions']:
            L += ["    {", f"      name: {q(s['name'])},", "      units: ["]
            L += [emit_unit(u, 8) + "," for u in s['units']]
            L += ["      ],", "    },"]
        L.append("  ],")
    else: L.append("  subfactions: [],")
    L += ["}", ""]
    return "\n".join(L)

def emit_barrel(factions):
    """src/data/mfmFactions.js — re-assembles per-faction modules, stable public API."""
    L = [f"// Munitorum Field Manual v{MFM_VERSION} — points values for Warhammer 40,000 (11th ed).",
         "// Source: https://mfm.warhammer-community.com/en (English-only). This barrel re-exports",
         "// the per-faction modules in src/data/mfm/. Regenerate with `python3 scripts/scrape-mfm.py`",
         "// (see that script for the page's data-reveal quirks).",
         "//",
         "// EN-only data: faction/unit names and points are language-agnostic, so `ru` reuses",
         "// the same array (swap in a translated array later if needed).",
         "//",
         "// Shape per faction: { id, name, slug, sourceUrl, detachments[], units[], subfactions[] }.",
         "//   detachment = { name, dp, forceDisposition, unique?, enhancements: [{ name, points }] }",
         "//   unit       = { name, options: [{ models?, points, note? }] }",
         "//     `models` omitted for single-model units; `note` carries rank/variant pricing",
         "//     labels ('1st-2nd', '3rd+', …) or special unit compositions.",
         "//   subfactions group units the page lists under their own heading (Aeldari →",
         "//     Harlequins/Ynnari; the shared Space Marine roster; Imperial Agents allied costs).",
         ""]
    L += [f"import {camel(f['slug'])} from './mfm/{f['slug']}.js'" for f in factions]
    L.append("")
    L.append("const en = [")
    L += [f"  {camel(f['slug'])}," for f in factions]
    L += ["]", "", f"export const mfmVersion = '{MFM_VERSION}'",
          "export const mfmFactions = { en, ru: en }", ""]
    return "\n".join(L)

# ---- main ----------------------------------------------------------------
if __name__ == "__main__":
    factions = []
    for slug in SLUGS:
        path = download(slug)
        raw = open(path, encoding="utf-8").read()
        if MFM_VERSION == MFM_VERSION_FALLBACK:  # not yet detected from a page this run
            v = detect_version(raw)
            if v: MFM_VERSION = v
        f = parse_faction(slug, raw)
        sub = sum(len(s['units']) for s in f['subfactions'])
        print(f"  {slug:22s} det={len(f['detachments']):2d} units={len(f['units']):3d}"
              + (f" +{sub} {[s['name'] for s in f['subfactions']]}" if f['subfactions'] else ""),
              file=sys.stderr)
        factions.append(f)
    os.makedirs(MFM_DIR, exist_ok=True)
    for f in factions:
        open(os.path.join(MFM_DIR, f['slug'] + '.js'), 'w', encoding="utf-8").write(emit_faction(f))
    open(BARREL, 'w', encoding="utf-8").write(emit_barrel(factions))
    tot = sum(len(f['units']) + sum(len(s['units']) for s in f['subfactions']) for f in factions)
    print(f"Wrote {len(factions)} files in {MFM_DIR}/ + barrel {BARREL} — {tot} units", file=sys.stderr)
