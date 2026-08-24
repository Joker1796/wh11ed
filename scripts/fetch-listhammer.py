#!/usr/bin/env python3
# Fetch army lists from listhammer.info — the corpus the roster importer is checked against.
#
#   python3 scripts/fetch-listhammer.py https://listhammer.info/list/<id>   # one list, as text
#   python3 scripts/fetch-listhammer.py --corpus LISTS.json                 # ~25 per 40k faction
#
# WHY IT IS THIS SHAPE — three things worth knowing before rewriting it:
#   1. The site 403s a plain fetcher (and so does WebFetch); curl gets 200. Hence subprocess.
#   2. It is a Nuxt 3 app with SSR, so NOTHING needs to be executed: every list is already in the
#      page, in the `__NUXT_DATA__` payload. That payload is devalue's flat-array format — an array
#      of nodes where an object's values are INDICES into the same array — so it is resolved here
#      rather than json.load()ed (see resolve()).
#   3. /factions/<slug> server-renders 25 recent tournament lists WITH their full `listText`, which
#      is why the corpus needs one request per faction and no pagination at all.
#
# The corpus is written wherever you point it — NOT into src/ or public/. It is test material for
# `node scripts/check-roster-imports.mjs`, not app data, and nothing may import it.
import html, json, re, subprocess, sys, time

# listhammer's own slugs. The 28 with 40k lists; its AoS factions live under the same /factions/
# path and are not our business here.
SLUGS = """adepta-sororitas adeptus-custodes adeptus-mechanicus aeldari astra-militarum
black-templars blood-angels chaos-daemons chaos-knights chaos-space-marines dark-angels
death-guard deathwatch drukhari emperors-children genestealer-cult grey-knights
imperial-agents imperial-knights leagues-of-votann necrons orks space-marines space-wolves
tau-empire thousand-sons tyranids world-eaters""".split()

FIELDS = ('faction', 'playerName', 'eventName', 'detachment', 'listId', 'listText')


def get(url):
    r = subprocess.run(['curl', '-sS', '-m', '30', url], capture_output=True, text=True)
    if r.returncode:
        sys.exit(f'curl failed for {url}: {r.stderr.strip()}')
    return r.stdout


def payload_of(doc):
    i = doc.find('__NUXT_DATA__')
    if i < 0:
        sys.exit('no Nuxt payload in the page — the site changed, see the header of this script')
    j = doc.find('>', i) + 1
    return json.loads(html.unescape(doc[j:doc.find('</script>', j)]))


def resolve(nodes, i=0, seen=None):
    """One node of a devalue flat array, with its index references followed."""
    seen = {} if seen is None else seen
    if i in seen:
        return seen[i]
    n = nodes[i]
    if isinstance(n, list):
        # ["Reactive", 12] and friends wrap the node they point at.
        if n and isinstance(n[0], str) and n[0].endswith(('Reactive', 'Ref')):
            return resolve(nodes, n[1], seen)
        out = seen[i] = []
        out.extend(resolve(nodes, x, seen) if isinstance(x, int) else x for x in n)
        return out
    if isinstance(n, dict):
        out = seen[i] = {}
        for k, v in n.items():
            out[k] = resolve(nodes, v, seen) if isinstance(v, int) else v
        return out
    return n


def lists_of(slug):
    data = resolve(payload_of(get(f'https://listhammer.info/factions/{slug}')))['data']
    key = next((k for k in data if k.startswith('recentLists-')), None)
    return data[key]['result'] if key else []


def one(url):
    """The single-list page, as the text the app's own export writes."""
    body = get(url)
    body = body[body.find('<body'):]
    body = re.sub(r'<script.*?</script>|<svg.*?</svg>', '', body, flags=re.S)
    lines = [l.strip() for l in re.sub(r'<[^>]+>', '\n', html.unescape(body)).split('\n') if l.strip()]
    # The list starts at its own title ("Name (1,990 Points)") and ends at the export footer;
    # before that is site chrome, after it the event's matchups.
    start = next(i for i, l in enumerate(lines) if re.search(r'\(\d[\d,]* Points\)$', l))
    end = next((i for i, l in enumerate(lines) if l.startswith('Exported with App Version')), len(lines) - 1)
    out = []
    for l in lines[start:end + 1]:
        # The page prints a unit's points on the line under its name; the export has them on one.
        if re.fullmatch(r'\d[\d,]* Points', l) and out and not out[-1].startswith(('•', '◦')):
            out[-1] += f' ({l})'
        else:
            out.append(l)
    return '\n'.join(out)


if __name__ == '__main__':
    arg = sys.argv[1] if len(sys.argv) > 1 else ''
    if arg == '--corpus':
        rows = []
        for s in SLUGS:
            got = lists_of(s)
            rows += [{k: r.get(k) for k in FIELDS} for r in got]
            print(f'{s:22} {len(got):3}', file=sys.stderr)
            time.sleep(1)
        json.dump(rows, open(sys.argv[2], 'w'), ensure_ascii=False)
        print(f'{len(rows)} lists → {sys.argv[2]}', file=sys.stderr)
    elif arg.startswith('http'):
        print(one(arg))
    else:
        sys.exit(__doc__ or 'usage: fetch-listhammer.py <list url> | --corpus <out.json>')
