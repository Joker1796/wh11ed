// Generate and audit src/data/rosterModifiers/<slug>.js — the numeric modifier layer for the
// roster builder's unit card (Tier C of ROSTER-MODIFIERS-PROGRESS.md). A record says what a rule
// DOES to a statline or a weapon profile ("+2 to the Strength characteristic"), which the
// attributed prose blocks of Tier B can only describe.
//
// WHY THIS FILE EXISTS AT ALL, AND WHY IT IS BUILT THE WAY IT IS
//
// The effects cannot be derived. wh40k-appdata carries essentially no structural modifiers — 961
// enhancements yield 6 ability links and 2 weapon-profile links, everything else is prose — and
// GW's own app doesn't recompute statlines either, because 40k modifiers are overwhelmingly
// CONDITIONAL. So the effects are read by a human. This script's job is not to guess them: it is
// to keep that hand-read layer HONESTLY TIED to the prose it was read from, so that when GW
// rewrites a rule we know exactly which records are now suspect.
//
// Each record therefore pins its source three ways:
//   sid   the appdata UUID — the identity. Survives a rename, unlike a name.
//   hash  sha1 of the NORMALISED English prose, first 8 chars. The affiliation: change the
//         wording and this stops matching, which is the entire early-warning system.
//   ver   the appdata data_version the record was last reviewed against, for the report.
//
// What a record does NOT carry is a scope. Which units a rule bears on is already computed at
// render time by src/composables/ruleTargets.js (Tier B's keyword layer) from that same prose —
// storing it again here would be a second copy free to drift from the first. An effect may name
// a `scope` INDEX into ruleScopes(), which is how an effect binds to one statement of a
// multi-part rule (Necrons' Cold Fervour gives +2 S to DESTROYER CULT in its first bullet and to
// every other NECRONS model in its second).
//
// DETACHABILITY. Everything this layer owns lives under src/data/rosterModifiers/. Delete that
// directory and the app degrades cleanly to Tiers A+B — attributed prose, no recomputed numbers.
// Nothing is written into the hand-authored faction files.
//
// STATUSES the audit reports, and what each means for you:
//   stale   the prose changed under a reviewed record → RE-READ the rule, fix `effects`, re-stamp
//   new     prose that looks like it touches a statline but has no record → review and fill in
//   orphan  a record whose source no longer exists in appdata → delete it or re-point its sid
//   ok      hash matches → nothing to do
// A record is kept even when the review concluded "no numeric effect" (`effects: []`,
// `reviewed: true`) — otherwise every future run would propose that same rule again forever.
// Records exist only for candidates and for anything reviewed; a rule that has never looked like
// a candidate is re-evaluated from its current text on every run, so a rewrite that turns it into
// one surfaces as `new`.
//
// Usage:
//   node scripts/gen-roster-modifiers.mjs            # write/refresh the skeletons + report
//   node scripts/gen-roster-modifiers.mjs --check     # report only; non-zero exit if not clean
//   node scripts/gen-roster-modifiers.mjs --queue     # write MODIFIER-QUEUE.local.json to review
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { pathToFileURL } from 'node:url'
import { ROOT, APPDATA, SLUG_MAP, appdataToMarkup, bodyText, loadJson, loadModule, appdataDataVersion } from './lib/sync-common.mjs'

const OUT_DIR = path.join(ROOT, 'src/data/rosterModifiers')
const QUEUE = path.join(ROOT, 'MODIFIER-QUEUE.local.json')
const FORMAT_VERSION = 1

// Every faction wh11ed actually ships rules for — the roster data directory is the list, since a
// modifier is only ever read from a roster.
function factionSlugs() {
  return fs.readdirSync(path.join(ROOT, 'src/data/roster'))
    .filter((f) => f.endsWith('.js') && !['core.js', 'index.js', 'items.js', 'index.test.js'].includes(f))
    .map((f) => f.slice(0, -3))
    .sort()
}

// The prose a record is affiliated with, normalised so that cosmetic churn — appdata's own
// `<b>`/`<k>` markup, line wrapping, doubled spaces — doesn't read as an errata. Anything that
// survives this IS a wording change worth re-reading.
export function proseHash(text) {
  const normalised = (text || '')
    .replace(/\s+/g, ' ')
    .replace(/[’‘]/g, "'")
    .trim()
    .toLowerCase()
  return crypto.createHash('sha1').update(normalised).digest('hex').slice(0, 8)
}

// Does this prose look like it changes a printed number? Deliberately loose: a false positive
// costs one line in the review queue, a false negative means a real modifier is never even
// proposed. Kept in sync with what Tier C can actually express (see the `effects` shape).
const CANDIDATE = new RegExp([
  '(?:add|subtract) \\d+ to',                 // "add 1 to the Strength characteristic"
  'improve[sd]? the [^.]{0,40}characteristic',
  '\\d\\+ invulnerable save',
  'has a \\d\\+ (?:invulnerable )?save',
  '[+-]\\d+ (?:to )?(?:the )?(?:[SATWMD]|OC|AP|BS|WS|LD)\\b',  // the shorthand faction bodies use: "+1 T"
  '[+-]\\d+"? (?:M|Move)\\b',
  'worsen[s]? the',
].join('|'), 'i')

export function isCandidate(text) {
  return CANDIDATE.test(text || '')
}

// Flatten one faction bundle into the sources a modifier can be attached to.
function sourcesOf(bundle) {
  const out = []
  for (const r of bundle.armyRules || []) {
    out.push({ sid: r.id, kind: 'armyRule', name: r.name, det: null, prose: bodyText(r.body) })
  }
  for (const d of bundle.detachments || []) {
    for (const r of d.rules || []) {
      out.push({ sid: r.id, kind: 'detachmentRule', name: r.name, det: d.name, prose: bodyText(r.body) })
    }
    for (const e of d.enhancements || []) {
      out.push({ sid: e.id, kind: 'enhancement', name: e.name, det: d.name, prose: appdataToMarkup(e.rules) })
    }
  }
  return out.filter((s) => s.sid && s.prose)
}

async function readExisting(slug) {
  const file = path.join(OUT_DIR, `${slug}.js`)
  if (!fs.existsSync(file)) return null
  const mod = await loadModule(file)
  return mod?.default || null
}

// A record's skeleton. `effects`/`when` are the human's to fill in; everything else is bookkeeping
// this script owns and rewrites freely.
function skeleton(src, ver) {
  return {
    sid: src.sid,
    kind: src.kind,
    name: src.name,
    det: src.det,
    hash: proseHash(src.prose),
    ver,
    reviewed: false,
    effects: [],
  }
}

function classify(existing, sources, ver) {
  const bySid = new Map(sources.map((s) => [s.sid, s]))
  const entries = existing?.entries || []
  const known = new Map(entries.map((e) => [e.sid, e]))

  const stale = [] // reviewed record whose prose moved
  const fresh = [] // candidate with no record yet
  const orphan = [] // record whose source is gone
  const ok = []

  for (const e of entries) {
    const src = bySid.get(e.sid)
    if (!src) { orphan.push(e); continue }
    const hash = proseHash(src.prose)
    if (hash !== e.hash) stale.push({ entry: e, src, hash })
    else ok.push(e)
  }
  for (const s of sources) {
    if (known.has(s.sid)) continue
    if (isCandidate(s.prose)) fresh.push(s)
  }
  return { stale, fresh, orphan, ok, ver }
}

// The file keeps every record, in a stable order, with the bookkeeping refreshed and the
// hand-authored parts (`effects`, `when`, `reviewed`, plus any `note`) carried through untouched.
function serialise(slug, existing, sources, result) {
  const bySid = new Map(sources.map((s) => [s.sid, s]))
  const kept = (existing?.entries || []).filter((e) => bySid.has(e.sid))
  const merged = [
    ...kept.map((e) => {
      const src = bySid.get(e.sid)
      // Name/detachment/kind are refreshed from appdata (a rename must not strand the record),
      // the hash is NOT — it is what tells the next run that this record needs re-reading.
      return { ...e, kind: src.kind, name: src.name, det: src.det }
    }),
    ...result.fresh.map((s) => skeleton(s, result.ver)),
  ].sort((a, b) => `${a.kind}${a.det || ''}${a.name}`.localeCompare(`${b.kind}${b.det || ''}${b.name}`))

  const body = JSON.stringify({ slug, formatVersion: FORMAT_VERSION, entries: merged }, null, 2)
  return `// Generated skeletons by gen-roster-modifiers.mjs; \`effects\`/\`when\`/\`reviewed\` are\n`
    + `// HAND-AUTHORED — re-running the generator preserves them. Never edit \`sid\`/\`hash\`/\`ver\`\n`
    + `// by hand: \`hash\` is what ties a record to the exact rule wording it was read from, and\n`
    + `// rewriting it by hand would silence the one signal that says "GW changed this rule".\n`
    + `// See ROSTER-MODIFIERS-PROGRESS.md and the generator's own header.\n`
    + `export default ${body}\n`
}

export async function run(argv = process.argv.slice(2)) {
  const check = argv.includes('--check')
  const queue = argv.includes('--queue')
  const ver = appdataDataVersion()
  if (ver == null) {
    console.log('  ⚠ could not read wh40k-appdata/tables/_meta.json — is the sibling repo cloned?')
    return 0
  }

  const totals = { stale: 0, fresh: 0, orphan: 0, ok: 0, unreviewed: 0 }
  const queueItems = []
  if (!check && !queue && !fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  for (const slug of factionSlugs()) {
    const appSlug = SLUG_MAP[slug] || slug
    const bundle = loadJson(path.join(APPDATA, 'factions', `${appSlug}.json`))
    if (!bundle) continue
    const sources = sourcesOf(bundle)
    const existing = await readExisting(slug)
    const result = classify(existing, sources, ver)

    const unreviewed = (existing?.entries || []).filter((e) => !e.reviewed).length + result.fresh.length
    totals.stale += result.stale.length
    totals.fresh += result.fresh.length
    totals.orphan += result.orphan.length
    totals.ok += result.ok.length
    totals.unreviewed += unreviewed

    for (const { entry, src, hash } of result.stale) {
      console.log(`  ⟲ stale   ${slug} · ${entry.kind} · ${entry.name}${entry.det ? ` (${entry.det})` : ''}`)
      queueItems.push({ slug, sid: entry.sid, status: 'stale', kind: entry.kind, name: entry.name, det: entry.det, oldHash: entry.hash, newHash: hash, prose: src.prose, effects: entry.effects })
    }
    for (const s of result.fresh) {
      console.log(`  + new     ${slug} · ${s.kind} · ${s.name}${s.det ? ` (${s.det})` : ''}`)
      queueItems.push({ slug, sid: s.sid, status: 'new', kind: s.kind, name: s.name, det: s.det, newHash: proseHash(s.prose), prose: s.prose, effects: [] })
    }
    for (const e of result.orphan) {
      console.log(`  ✗ orphan  ${slug} · ${e.kind} · ${e.name} — source gone from appdata`)
      queueItems.push({ slug, sid: e.sid, status: 'orphan', kind: e.kind, name: e.name, det: e.det })
    }

    if (!check && !queue) {
      const next = serialise(slug, existing, sources, result)
      const file = path.join(OUT_DIR, `${slug}.js`)
      const prev = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null
      if (prev !== next) fs.writeFileSync(file, next)
    }
  }

  console.log(`\n  ${totals.ok} up to date · ${totals.stale} stale · ${totals.fresh} new · ${totals.orphan} orphaned · ${totals.unreviewed} awaiting review`)

  if (queue) {
    fs.writeFileSync(QUEUE, JSON.stringify({ ver, items: queueItems }, null, 2))
    console.log(`  wrote ${queueItems.length} item(s) to MODIFIER-QUEUE.local.json`)
    return 0
  }
  if (check) {
    const dirty = totals.stale + totals.fresh + totals.orphan + totals.unreviewed
    if (dirty) {
      console.log('  --check: run `npm run modifiers` to refresh the skeletons, then review them'
        + ' (`npm run modifiers:queue` writes the working list).')
      return 1
    }
    console.log('  --check: up to date.')
  }
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
