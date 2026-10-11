#!/usr/bin/env node
// Move the older release notes out of src/data/changelog.js into the API's archive.
//
//   node scripts/changelog-rollover.mjs --ssh wh@<server> [--ssh-key ~/.ssh/key] [--keep 5] [--check]
//   node scripts/changelog-rollover.mjs --api ../wh11ed-api [--keep 5]        (DATABASE_URL set: the stand)
//
// The file keeps its newest `--keep` entries; everything older goes to wh11ed-api's
// `changelog` table (GET /changelog serves it to the "What's new" page on request). Run by
// deploy.sh before the build. Notes almost nobody reads then stay out of the app's first load and
// out of the installed app's offline download (owner's call, 2026-09-27).
//
// Where the archive lives decides how it is reached. Production (since the move off Yandex,
// 2026-10-11): the database sits on the API's server and is not reachable from outside, so the
// entries go over ssh to the API container, which publishes them itself (`--ssh`). The stand, or
// any database this machine can reach: a sibling wh11ed-api checkout with DATABASE_URL (`--api`).
// `--check` publishes nothing — an empty batch through the same path — to prove the way is open.
//
// Nothing is dropped from the file until the archive holds it. The order:
//   1. publish the older entries with wh11ed-api's `npm run changelog:publish`, which validates
//      every one before writing any, then reads them back and compares — exit 0 means stored;
//   2. only then cut them out of the file, by its own layout (each entry opens on a line that is
//      exactly "  {" inside `export const changelog = [`);
//   3. import the rewritten file in a fresh process and check it holds exactly the kept entries —
//      anything else puts the original text back.
//
// Exit 0: moved, or nothing to move. Exit 2: not moved, file untouched (no API checkout, publish
// failed) — deploy.sh warns and ships the full file, which the page renders all the same.
// Exit 3: the rewrite did not check out and was reverted — a bug here, look before deploying.
import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`)
  return i > 0 ? process.argv[i + 1] : fallback
}
const KEEP = Number(arg('keep', '5'))
const FILE = resolve(arg('file', 'src/data/changelog.js'))
const SSH = arg('ssh', '')
const SSH_KEY = arg('ssh-key', '')
const API = SSH ? '' : resolve(arg('api', '../wh11ed-api'))
const CHECK = process.argv.includes('--check')

// Publish a batch to the archive; exit status 0 means validated, written and read back (wh11ed-api
// scripts/changelog-publish.ts). Over ssh the JSON rides stdin into the API container — no file on
// the server, no port opened for it.
function publish(batch) {
  const json = JSON.stringify(batch)
  if (SSH) {
    const remote = 'cd /opt/wh-rules && docker compose -f docker-compose.prod.yml exec -T api sh -c ' +
      `'cat > /tmp/changelog.json && node --import tsx scripts/changelog-publish.ts /tmp/changelog.json; rc=$?; rm -f /tmp/changelog.json; exit $rc'`
    const args = [...(SSH_KEY ? ['-i', SSH_KEY] : []), '-o', 'BatchMode=yes', '-o', 'ConnectTimeout=15', SSH, remote]
    return spawnSync('ssh', args, { input: json, stdio: ['pipe', 'inherit', 'inherit'] }).status
  }
  const dir = mkdtempSync(join(tmpdir(), 'changelog-'))
  const file = join(dir, 'entries.json')
  writeFileSync(file, json)
  const st = spawnSync('npm', ['--prefix', API, 'run', '--silent', 'changelog:publish', '--', file], { stdio: 'inherit', env: process.env }).status
  rmSync(dir, { recursive: true, force: true })
  return st
}

if (CHECK) {
  const st = publish([])
  console.log(st === 0 ? '  changelog: the archive is reachable' : '  ⚠ changelog: the archive is NOT reachable')
  process.exit(st === 0 ? 0 : 2)
}

// A fresh process each time: the module cache would hand back the file as it was first imported.
function versionsIn(file) {
  const out = spawnSync(process.execPath, ['--input-type=module', '-e',
    `const m = await import(${JSON.stringify(pathToFileURL(file).href + '?t=' + Date.now())}); console.log(JSON.stringify(m.changelog))`],
  { encoding: 'utf8' })
  if (out.status !== 0) throw new Error(out.stderr.trim() || 'cannot import the changelog')
  return JSON.parse(out.stdout)
}

const entries = versionsIn(FILE)
if (entries.length <= KEEP) {
  console.log(`  changelog: ${entries.length} entr${entries.length === 1 ? 'y' : 'ies'}, nothing to move`)
  process.exit(0)
}
const older = entries.slice(KEEP)

if (!SSH && !existsSync(join(API, 'package.json'))) {
  console.error(`  ⚠ changelog: no wh11ed-api checkout at ${API} — ${older.length} older entries stay in the file`)
  process.exit(2)
}

// 1. Publish, and believe it only on exit 0.
if (publish(older) !== 0) {
  console.error(`  ⚠ changelog: publishing to the archive failed — ${older.length} older entries stay in the file`)
  process.exit(2)
}

// 2. Cut them out of the file.
const original = readFileSync(FILE, 'utf8')
const lines = original.split('\n')
const open = lines.indexOf('export const changelog = [')
const starts = lines.map((l, i) => (i > open && l === '  {' ? i : -1)).filter((i) => i >= 0)
const close = lines.findIndex((l, i) => i > open && l === ']')
if (open < 0 || close < 0 || starts.length !== entries.length) {
  console.error(`  ✗ changelog: the file's layout is not the one this script cuts by (${starts.length} entry openings for ${entries.length} entries) — left untouched`)
  process.exit(3)
}
writeFileSync(FILE, [...lines.slice(0, starts[KEEP]), ...lines.slice(close)].join('\n'))

// 3. Check the result, or put the original back.
let kept
try {
  kept = versionsIn(FILE)
} catch (e) {
  kept = null
  console.error(`  ✗ changelog: the rewritten file does not import: ${e.message}`)
}
if (!kept || JSON.stringify(kept) !== JSON.stringify(entries.slice(0, KEEP))) {
  writeFileSync(FILE, original)
  console.error('  ✗ changelog: the rewritten file does not hold exactly the kept entries — original restored')
  process.exit(3)
}
console.log(`  changelog: moved ${older.length} older entr${older.length === 1 ? 'y' : 'ies'} to the archive, kept ${KEEP} (${kept.map((e) => e.version).join(', ')})`)
