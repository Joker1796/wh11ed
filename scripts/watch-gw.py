#!/usr/bin/env python3
# Watches Games Workshop's primary sources and mails when one of them changes, so a new data drop
# is noticed by us and not first by a player (2 October 2026: a quiet MFM re-price was reported
# by a player before we had seen it). Run on our server every 20 minutes (wh11ed-api
# deploy/gw-watch.sh); until 2026-10-14 a GitHub workflow ran it hourly and GitHub started it hours
# late — the 2.8.0 app of 14 October was mailed four and a half hours after it shipped.
#
#   python3 scripts/watch-gw.py --state <path/state.json>            # check, mail, update state
#   python3 scripts/watch-gw.py --state <path/state.json> --dry-run  # print the mail, touch nothing
#
# Three sources, and only primary ones (owner, 2026-10-02 — BSData is not watched):
#   * the GW app — version in the App Store (a clean JSON lookup). A new version is the signal to
#     fetch the APK; this script cannot do that itself (APKPure answers robots with 403). Google
#     Play is not watched (owner, 2026-10-22): the server, in Russia, cannot reach it, and the App
#     Store has had each version first.
#   * the Munitorum Field Manual — compared by PRICES, not by version: the 2 October re-price
#     shipped under the same "1.5". scrape-mfm.py rewrites src/data/mfm/ in this checkout, so the
#     mail can show the diff against what the site ships; the fingerprint goes into the state so
#     one change mails once, however long the data bump takes.
#   * Downloads on warhammer-community.com (faction packs, rules updates, event companions) —
#     the page's own search API. A new version of a document comes under a new file name.
#
# Anything that cannot be read FAILS the run instead of being skipped: a watch that quietly says
# "nothing new" because GW changed a page is worse than no watch (the server mails a failure).
#
# The first run (no state file) records a baseline and sends nothing.
#
# Mail: the script hands each mail to WATCH_MAIL_CMD — the subject as its last argument, the text
# on stdin. On the server that is the API's own notice relay (scripts/notify.ts), the SMTP the bug
# reports use. The GitHub workflow's Yandex Cloud Postbox path went with the Postbox account
# (2026-10-22).
import argparse, hashlib, json, os, re, shlex, subprocess, sys, time, urllib.error, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..'))
MFM_PATHS = ['src/data/mfm', 'src/data/mfmFactions.js']

APP_ID = 'com.gamesworkshop.w40k'
APPSTORE_URL = f'https://itunes.apple.com/lookup?bundleId={APP_ID}'
WARCOM_API = 'https://www.warhammer-community.com/api/search/downloads/'
WARCOM_FILE = 'https://assets.warhammer-community.com/'
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
SUBJECT = '[WH Rules] GW: '


class SourceError(Exception):
    pass


# A dropped connection is retried twice, waiting longer each time, before the run fails and mails:
# on 2026-10-15 one TLS handshake to warhammer-community.com ended in EOF and sent a "broken"
# letter for a watch that was fine on the next run. An HTTP error status is an answer, not a drop.
RETRY_DELAYS = (10, 30)


def http(url, body=None):
    for delay in (*RETRY_DELAYS, None):
        req = urllib.request.Request(url, data=body, headers={'User-Agent': UA})
        if body is not None:
            req.add_header('Content-Type', 'application/json')
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.read().decode('utf-8')
        except urllib.error.HTTPError:
            raise
        except (urllib.error.URLError, OSError) as e:
            if delay is None:
                raise
            print(f'{url}: {e} — retrying in {delay}s', file=sys.stderr)
            time.sleep(delay)


# ── Sources ──────────────────────────────────────────────────────────────────────────────────────

def appstore():
    res = json.loads(http(APPSTORE_URL)).get('results') or []
    if not res or not res[0].get('version'):
        raise SourceError(f'App Store: no version for {APP_ID}')
    r = res[0]
    return {'version': r['version'], 'date': r.get('currentVersionReleaseDate', ''),
            'notes': (r.get('releaseNotes') or '').strip()}


def warcom():
    body = json.dumps({'index': 'downloads_v2', 'searchTerm': '', 'gameSystem': 'warhammer-40000',
                       'language': 'english'}).encode()
    d = json.loads(http(WARCOM_API, body))
    hits = d.get('hits') or []
    if not hits or d.get('totalPages', 1) > 1:
        # Everything comes on one page (hitsPerPage=500); a second page would mean documents unseen.
        raise SourceError(f'Warhammer Community: {len(hits)} documents, {d.get("totalPages")} pages')
    # Keyed by file: a new version of a document is a new file name (slugs are not unique —
    # the Leagues of Votann pack ships under the Drukhari one's slug).
    return {h['id']['file']: {'title': h['title'], 'updated': h['id'].get('last_updated', '')}
            for h in hits}


def mfm():
    def units(paths):
        return sum(open(os.path.join(ROOT, p), encoding='utf-8').read().count('points:') for p in paths)

    files = sorted(os.path.join('src/data/mfm', f) for f in os.listdir(os.path.join(ROOT, 'src/data/mfm')))
    before = units(files)
    out = subprocess.run([sys.executable, os.path.join(HERE, 'scrape-mfm.py')],
                         cwd=ROOT, capture_output=True, text=True)
    if out.returncode:
        raise SourceError(f'MFM: scrape-mfm.py failed\n{out.stderr[-2000:]}')
    after = units(files)
    # A broken parse writes near-empty files; that is a broken watch, not a re-price.
    if after < before * 0.9:
        raise SourceError(f'MFM: {after} prices scraped against {before} in the repo — the page changed?')
    digest = hashlib.sha256()
    for f in files + ['src/data/mfmFactions.js']:
        digest.update(open(os.path.join(ROOT, f), 'rb').read())
    version = re.search(r"mfmVersion = '([^']+)'", open(os.path.join(ROOT, 'src/data/mfmFactions.js'),
                                                        encoding='utf-8').read())
    return {'hash': digest.hexdigest(), 'version': version.group(1) if version else '?'}


def mfm_diff():
    """What the site ships against the repo, as the mail body shows it."""
    stat = subprocess.run(['git', 'diff', '--stat', '--', *MFM_PATHS], cwd=ROOT,
                          capture_output=True, text=True).stdout.strip('\n')
    lines = subprocess.run(['git', 'diff', '-U0', '--', *MFM_PATHS], cwd=ROOT,
                           capture_output=True, text=True).stdout.splitlines()
    changed = [l for l in lines if l[:1] in '+-' and not l.startswith(('+++', '---'))]
    shown = changed[:120]
    more = f'\n… и ещё {len(changed) - len(shown)} строк' if len(changed) > len(shown) else ''
    return stat, '\n'.join(shown) + more


SOURCES = {'appstore': appstore, 'warcom': warcom, 'mfm': mfm}


# ── Comparing ────────────────────────────────────────────────────────────────────────────────────

def compare(old, new):
    """Returns (subject parts, body sections) for everything that changed."""
    subj, body = [], []
    has = lambda k: k in old and k in new   # a source this run did not read (--sources) says nothing

    a, b = old.get('appstore'), new.get('appstore')
    if has('appstore') and a['version'] != b['version']:
        subj.append(f'App Store {b["version"]}')
        body.append(f'Приложение в App Store: {a["version"]} → {b["version"]} ({b["date"][:10]})'
                    + (f'\n\n{b["notes"]}' if b['notes'] else ''))

    if has('mfm') and old['mfm']['hash'] != new['mfm']['hash']:
        stat, diff = mfm_diff()
        subj.append('MFM')
        body.append(f'MFM {new["mfm"]["version"]}: цены на сайте изменились.\n'
                    f'Против репозитория:\n{stat or "(совпадает с репозиторием)"}\n\n{diff}')

    a, b = old.get('warcom', {}), new.get('warcom', {})
    titles = {v['title'] for v in a.values()}
    added = [(f, v) for f, v in b.items() if f not in a]
    gone = [v for f, v in a.items() if f not in b and v['title'] not in {x['title'] for x in b.values()}]
    if has('warcom') and (added or gone):
        subj.append('Warhammer Community')
        rows = [f'{"обновлён" if v["title"] in titles else "новый"}: {v["title"]} ({v["updated"]})\n'
                f'  {WARCOM_FILE}{f}' for f, v in sorted(added, key=lambda x: x[1]['title'])]
        rows += [f'снят: {v["title"]}' for v in gone]
        body.append('Загрузки warhammer-community.com:\n' + '\n'.join(rows))

    return subj, body


# ── Mail ─────────────────────────────────────────────────────────────────────────────────────────

def send(subject, text):
    cmd = os.environ.get('WATCH_MAIL_CMD')
    if not cmd:
        raise SystemExit('mail not sent, missing env: WATCH_MAIL_CMD')
    r = subprocess.run(shlex.split(cmd) + [subject], input=text, text=True, capture_output=True)
    if r.returncode != 0:
        raise SystemExit(f'mail not sent ({cmd}): {(r.stdout + r.stderr).strip()[-500:]}')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--state')
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--sources', default=','.join(SOURCES), help='comma list of ' + ', '.join(SOURCES))
    args = ap.parse_args()

    if not args.state:
        ap.error('--state is required')

    picked = [x.strip() for x in args.sources.split(',') if x.strip()]
    unknown = [x for x in picked if x not in SOURCES]
    if unknown or not picked:
        ap.error(f'--sources: unknown {", ".join(unknown) or "(none)"}; known: {", ".join(SOURCES)}')
    new = {k: SOURCES[k]() for k in picked}
    old = json.load(open(args.state, encoding='utf-8')) if os.path.exists(args.state) else None
    if old is None:
        print('no state yet — recording the baseline, nothing to mail')
    else:
        subj, body = compare(old, new)
        if not subj:
            print('nothing new')
            return
        subject, text = SUBJECT + ', '.join(subj), '\n\n────────\n\n'.join(body)
        if args.dry_run:
            print(subject, text, sep='\n\n')
            return
        # Mail first, state second: a mail that failed is retried on the next run.
        send(subject, text)
        print(f'mailed: {subject}')
    if not args.dry_run:
        os.makedirs(os.path.dirname(os.path.abspath(args.state)), exist_ok=True)
        with open(args.state, 'w', encoding='utf-8') as f:
            json.dump(new, f, ensure_ascii=False, indent=1, sort_keys=True)
            f.write('\n')


if __name__ == '__main__':
    try:
        main()
    except SourceError as e:
        sys.exit(f'source unreadable: {e}')
