#!/usr/bin/env python3
# Watches Games Workshop's primary sources and mails when one of them changes, so a new data drop
# is noticed by us and not first by a player (2 October 2026: a quiet MFM re-price was reported
# by a player before we had seen it). Run by .github/workflows/gw-watch.yml every few hours.
#
#   python3 scripts/watch-gw.py --state <path/state.json>            # check, mail, update state
#   python3 scripts/watch-gw.py --state <path/state.json> --dry-run  # print the mail, touch nothing
#   python3 scripts/watch-gw.py --mail-failure <run url>             # "the watch itself broke"
#
# Three sources, and only primary ones (owner, 2026-10-02 — BSData is not watched):
#   * the GW app — version in the App Store (clean JSON lookup) and on Google Play (scraped from
#     the store page). A new version is the signal to fetch the APK; this script cannot do that
#     itself (APKPure answers robots with 403).
#   * the Munitorum Field Manual — compared by PRICES, not by version: the 2 October re-price
#     shipped under the same "1.5". scrape-mfm.py rewrites src/data/mfm/ in this checkout, so the
#     mail can show the diff against what the site ships; the fingerprint goes into the state so
#     one change mails once, however long the data bump takes.
#   * Downloads on warhammer-community.com (faction packs, rules updates, event companions) —
#     the page's own search API. A new version of a document comes under a new file name.
#
# Anything that cannot be read FAILS the run instead of being skipped: a watch that quietly says
# "nothing new" because GW changed a page is worse than no watch (the workflow mails a failure).
#
# The first run (no state file) records a baseline and sends nothing.
#
# Mail goes through Yandex Cloud Postbox over SMTP, like the API's bug-report notices: the key id
# is the username, the secret the password. Env: POSTBOX_KEY_ID, POSTBOX_SECRET, WATCH_MAIL_FROM,
# WATCH_MAIL_TO.
import argparse, hashlib, json, os, re, smtplib, subprocess, sys, urllib.request
from email.message import EmailMessage

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..'))
MFM_PATHS = ['src/data/mfm', 'src/data/mfmFactions.js']

APP_ID = 'com.gamesworkshop.w40k'
APPSTORE_URL = f'https://itunes.apple.com/lookup?bundleId={APP_ID}'
PLAY_URL = f'https://play.google.com/store/apps/details?id={APP_ID}&hl=en&gl=US'
WARCOM_API = 'https://www.warhammer-community.com/api/search/downloads/'
WARCOM_FILE = 'https://assets.warhammer-community.com/'
UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36'
SUBJECT = '[WH Rules] GW: '


class SourceError(Exception):
    pass


def http(url, body=None):
    req = urllib.request.Request(url, data=body, headers={'User-Agent': UA})
    if body is not None:
        req.add_header('Content-Type', 'application/json')
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read().decode('utf-8')


# ── Sources ──────────────────────────────────────────────────────────────────────────────────────

def appstore():
    res = json.loads(http(APPSTORE_URL)).get('results') or []
    if not res or not res[0].get('version'):
        raise SourceError(f'App Store: no version for {APP_ID}')
    r = res[0]
    return {'version': r['version'], 'date': r.get('currentVersionReleaseDate', ''),
            'notes': (r.get('releaseNotes') or '').strip()}


def play():
    # The store page carries the version as a bare `[[["2.7.1"]]` in its inline data.
    m = re.search(r'\[\[\["(\d+(?:\.\d+)+)"\]\]', http(PLAY_URL))
    if not m:
        raise SourceError('Google Play: version not found on the store page')
    return {'version': m.group(1)}


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


# ── Comparing ────────────────────────────────────────────────────────────────────────────────────

def compare(old, new):
    """Returns (subject parts, body sections) for everything that changed."""
    subj, body = [], []

    a, b = old['appstore'], new['appstore']
    if a['version'] != b['version']:
        subj.append(f'App Store {b["version"]}')
        body.append(f'Приложение в App Store: {a["version"]} → {b["version"]} ({b["date"][:10]})'
                    + (f'\n\n{b["notes"]}' if b['notes'] else ''))
    a, b = old['play'], new['play']
    if a['version'] != b['version']:
        subj.append(f'Google Play {b["version"]}')
        body.append(f'Приложение в Google Play: {a["version"]} → {b["version"]}\n'
                    'APK: sources/apk/ → скил appdata-update')

    if old['mfm']['hash'] != new['mfm']['hash']:
        stat, diff = mfm_diff()
        subj.append('MFM')
        body.append(f'MFM {new["mfm"]["version"]}: цены на сайте изменились.\n'
                    f'Против репозитория:\n{stat or "(совпадает с репозиторием)"}\n\n{diff}')

    a, b = old['warcom'], new['warcom']
    titles = {v['title'] for v in a.values()}
    added = [(f, v) for f, v in b.items() if f not in a]
    gone = [v for f, v in a.items() if f not in b and v['title'] not in {x['title'] for x in b.values()}]
    if added or gone:
        subj.append('Warhammer Community')
        rows = [f'{"обновлён" if v["title"] in titles else "новый"}: {v["title"]} ({v["updated"]})\n'
                f'  {WARCOM_FILE}{f}' for f, v in sorted(added, key=lambda x: x[1]['title'])]
        rows += [f'снят: {v["title"]}' for v in gone]
        body.append('Загрузки warhammer-community.com:\n' + '\n'.join(rows))

    return subj, body


# ── Mail ─────────────────────────────────────────────────────────────────────────────────────────

def send(subject, text):
    env = {k: os.environ.get(k, '') for k in ('POSTBOX_KEY_ID', 'POSTBOX_SECRET', 'WATCH_MAIL_FROM', 'WATCH_MAIL_TO')}
    missing = [k for k, v in env.items() if not v]
    if missing:
        raise SystemExit(f'mail not sent, missing env: {", ".join(missing)}')
    msg = EmailMessage()
    msg['Subject'], msg['From'], msg['To'] = subject, env['WATCH_MAIL_FROM'], env['WATCH_MAIL_TO']
    msg.set_content(text)
    with smtplib.SMTP('postbox.cloud.yandex.net', 587, timeout=30) as s:
        s.starttls()
        s.login(env['POSTBOX_KEY_ID'], env['POSTBOX_SECRET'])
        s.send_message(msg)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--state')
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--mail-failure', metavar='RUN_URL')
    args = ap.parse_args()

    if args.mail_failure:
        send(SUBJECT + 'проверка обновлений сломалась',
             f'Запуск упал — пока его не починить, об обновлениях GW писем не будет.\n\n{args.mail_failure}')
        return
    if not args.state:
        ap.error('--state is required')

    new = {'appstore': appstore(), 'play': play(), 'warcom': warcom(), 'mfm': mfm()}
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
