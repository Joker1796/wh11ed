// gen-translation-queue.mjs — turn an appdata change report into a checklist of the blocks that
// need a RU translation, so the translation happens as ONE separate pass instead of inline with
// every EN edit.
//
//   1. node ../wh40k-appdata/scripts/changes.mjs --json changes.json   (writes wh40k-appdata/changes.json)
//   2. node scripts/gen-translation-queue.mjs                          (writes TRANSLATION-QUEUE.local.json)
//   3. …work the queue: update EN, translate RU, mark each done…
//   4. node scripts/gen-translation-queue.mjs --check                  (exit 1 while anything is pending)
//   node scripts/gen-translation-queue.mjs --done <appId>              (mark one entry translated)
//
// Only PROSE moves get queued — new/errata'd rule text. Scalar changes (points, stats, keyword
// sets, weapon profiles) are language-agnostic and never need translation, so they're left out.
// The queue is a gitignored local work file (like SYNC-LOG.local.md): it tracks one bump's
// translation work and is discarded once empty. The real ship-gate stays parity-check.mjs.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SLUG_MAP } from './lib/sync-common.mjs'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// appdata bundle slug → wh11ed data-file slug, so the queue names the file you actually edit
// (asuryani → aeldari, adeptus-astartes → space-marines, …). Inverse of SLUG_MAP.
const APP_TO_WH = Object.fromEntries(Object.entries(SLUG_MAP).map(([wh, app]) => [app, wh]))
const whSlug = (s) => APP_TO_WH[s] || s
const APPDATA = process.env.WH40K_APPDATA_PATH || path.join(ROOT, '..', 'wh40k-appdata')
const QUEUE = path.join(ROOT, 'TRANSLATION-QUEUE.local.json')

const args = process.argv.slice(2)
const flag = (n, d = null) => { const i = args.indexOf(n); return i >= 0 && args[i + 1] ? args[i + 1] : d }

// prose-bearing appdata entity kinds (as they appear in changes.json). Everything else is scalar.
const PROSE_KINDS = new Set(['datasheets', 'detachments', 'stratagems', 'enhancements', 'armyRules', 'rules', 'abilities', 'faction'])
const PROSE_FIELDS = new Set(['body', 'rules', 'ruleText', 'lore', 'when', 'target', 'effect', 'restriction', 'unitComposition', 'text', 'trigger'])
// appdata `kind` → the sourceIds.json prefix used to map it back to a wh11ed id.
const KIND_TO_SRCID = { datasheets: 'ds', detachments: 'det', stratagems: 'strat', enhancements: 'enh', armyRules: 'armyrule' }

// ---- --check / --done act on the existing queue -----------------------------------------------
function loadQueue() {
  if (!fs.existsSync(QUEUE)) return null
  return JSON.parse(fs.readFileSync(QUEUE, 'utf8'))
}
if (args.includes('--check')) {
  const q = loadQueue()
  const pending = (q?.entries || []).filter((e) => e.status === 'pending')
  if (!q) { console.log('translation queue: none (nothing to translate).'); process.exit(0) }
  console.log(`translation queue: ${pending.length} pending / ${q.entries.length} total.`)
  if (pending.length) {
    for (const e of pending.slice(0, 40)) console.log(`  ⏳ ${e.faction} · ${e.kind} "${e.name}" (${e.reason})`)
    if (pending.length > 40) console.log(`  … +${pending.length - 40} more`)
  }
  process.exit(pending.length ? 1 : 0)
}
const doneId = flag('--done')
if (doneId) {
  const q = loadQueue() || { entries: [] }
  const e = q.entries.find((x) => x.appId === doneId)
  if (!e) { console.error(`✗ no queue entry with appId ${doneId}`); process.exit(1) }
  e.status = 'done'
  fs.writeFileSync(QUEUE, JSON.stringify(q, null, 2) + '\n')
  console.log(`✓ marked done: ${e.faction} · ${e.kind} "${e.name}"`)
  process.exit(0)
}

// ---- generate from changes.json ---------------------------------------------------------------
const changesPath = flag('--changes', path.join(APPDATA, 'changes.json'))
if (!fs.existsSync(changesPath)) {
  console.error(`✗ no change report at ${changesPath}\n  run first:  node ../wh40k-appdata/scripts/changes.mjs --json changes.json`)
  process.exit(1)
}
const changes = JSON.parse(fs.readFileSync(changesPath, 'utf8'))

// invert sourceIds.json: appdata uuid → { slug, kind, key } so an errata'd entity points at its wh11ed block
const srcIds = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'sourceIds.json'), 'utf8'))
const byUuid = new Map()
for (const [slug, kinds] of Object.entries(srcIds)) {
  for (const [key, uuid] of Object.entries(kinds)) {
    const [kind, ...rest] = key.split(':')
    byUuid.set(uuid, { slug, srcKind: kind, key: rest.join(':') })
  }
}
const whRef = (appId) => byUuid.get(appId) || null

const entries = []
const push = (reason, r, extra = {}) => {
  if (!PROSE_KINDS.has(r.kind)) return
  entries.push({
    status: 'pending', reason,
    faction: whSlug(r.trail?.[0] || r.faction || '?'),
    kind: r.kind, name: r.name, appId: r.id,
    wh: whRef(r.id),                 // null for brand-new entities not yet in wh11ed
    where: r.trail?.filter(Boolean).join(' › '),
    ...extra,
  })
}

for (const slug of changes.factionsAdded || []) entries.push({ status: 'pending', reason: 'new-faction', faction: whSlug(slug), kind: 'faction', name: slug, appId: null, wh: null })
for (const r of changes.added || []) push('new', r)
for (const r of changes.proseChanged || changes.changed?.filter((c) => c.fields?.some((f) => PROSE_FIELDS.has(f.field))) || []) {
  const proseFields = (r.fields || []).filter((f) => PROSE_FIELDS.has(f.field)).map((f) => ({ field: f.field, en: f.to, enOld: f.from }))
  push('errata', r, { fields: proseFields })
}

const out = {
  from: changes.from, to: changes.to,
  summary: { pending: entries.length, byReason: entries.reduce((m, e) => ((m[e.reason] = (m[e.reason] || 0) + 1), m), {}) },
  entries,
}
fs.writeFileSync(QUEUE, JSON.stringify(out, null, 2) + '\n')
console.log(`wrote ${path.basename(QUEUE)} — ${entries.length} block(s) to translate`)
for (const [reason, n] of Object.entries(out.summary.byReason)) console.log(`  ${reason}: ${n}`)
const unmapped = entries.filter((e) => e.reason === 'errata' && !e.wh).length
if (unmapped) console.log(`  ⚠ ${unmapped} errata block(s) have no sourceIds mapping — regenerate the bridge (npm run sourceids) or map by hand`)
console.log('next: work each entry (update EN, translate RU), then `--done <appId>`; `--check` gates the commit.')
