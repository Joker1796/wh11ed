// Generate and audit src/data/rosterModifiers/<slug>.js — the numeric modifier layer for the
// roster builder's unit card (Tier C — src/components/roster/CLAUDE.md). A record says what a rule
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
import { ROOT, APPDATA, SLUG_MAP, appdataToMarkup, bodyText, loadJson, loadModule, appdataDataVersion, invertSourceIds, table } from './lib/sync-common.mjs'

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
  // "subtract 1 from the Objective Control characteristic". Nearly every hit is a debuff on an
  // ENEMY unit or a modifier on an incoming attack, neither of which this layer can express — but
  // a rule nobody has ever looked at reads exactly like a rule nobody has written down yet, so
  // they are proposed and closed as reviewed empties rather than left invisible.
  'subtract \\d+ from [^.]{0,40}characteristic',
  '(?:add|subtract) \\d+["\u201d] to',            // the same with a distance: 'add 2" to this model\'s Move'
  'improve[sd]? the [^.]{0,40}characteristic',
  // "has a Move characteristic of 7\"", "have an Objective Control characteristic of 3" — a SET
  // rather than a delta, and the wording the wargear rules use almost exclusively (a Mortifiers'
  // Anchorite Sarcophagus rewrites Move and Save this way and was invisible to every pattern here).
  '(?:has|have) an? [^.]{0,40}characteristic of',
  '\\d\\+ invulnerable save',
  'has a \\d\\+ (?:invulnerable )?save',
  '[+-]\\d+ (?:to )?(?:the )?(?:[SATWMD]|OC|AP|BS|WS|LD)\\b',  // the shorthand faction bodies use: "+1 T"
  '[+-]\\d+"? (?:M|Move)\\b',
  'worsen[s]? the',
  // Grants: a keyword changes which OTHER rules bear on the unit (Necrons' Destroyer Ankh gives
  // its bearer DESTROYER CULT, and Cold Fervour then gives every DESTROYER CULT model +2
  // Strength), and a weapon ability is printed on the weapon row like any other tag.
  '(?:has|have|gains?) the [^.]{1,40}keyword',
  '(?:attacks|weapons)[^.]{0,70}have (?:the )?\\[',
].join('|'), 'i')

export function isCandidate(text) {
  // Test against the prose WITHOUT its emphasis markers. appdata bolds the characteristic letter
  // in the shorthand form, so bodyText() hands us `+2" **M**` — and every pattern above that ends
  // in a bare stat letter (`+1 OC`, `+2" M`, `+1 **Ld**`) silently failed to match it. 41 army and
  // detachment rules were invisible to this heuristic for that reason alone, which is how a
  // Custodes detachment that plainly says +2" M ended up with no record at all.
  return CANDIDATE.test((text || '').replace(/\*\*/g, ''))
}

// Flatten one faction bundle into the sources a modifier can be attached to.
//
// `ref` is the wh11ed-side pointer the RUNTIME resolves against — src/data/factions/<slug>.js is
// hand-authored and carries no appdata uuids, so `sid` alone can't find the rule in the browser.
// It comes from inverting sourceIds.json (the repo's existing stable-id bridge), which means a
// GW rename moves the record with the rule instead of stranding it. `ref.det` is the wh11ed
// detachment id; the runtime then takes that detachment's own `.rule` (detachment rules) or finds
// the enhancement by name inside it. `null` when the bridge has no entry — the record still
// exists and is still audited, it just can't be applied until the bridge covers it.
// Allegiance abilities are the third source, and the odd one out: they hang off DATASHEETS, not
// off a rule or an enhancement, and the player chooses one per unit (see rosterEngine's allegFor).
// Daemonic Allegiance is the reason they're here — its four marks are the rare structural
// characteristic change in this game's data ("add 1 to this model's Toughness"). Mark of Chaos and
// the CHARACTER-granting upgrades are collected too, so the audit accounts for every one of them
// rather than leaving 14 sources silently unreviewed.
function allegianceSources(tables, bundleDatasheetIds) {
  const { groups, abilities, dsGroup } = tables
  const out = []
  const wanted = new Set()
  for (const id of bundleDatasheetIds) { const g = dsGroup.get(id); if (g) wanted.add(g) }
  for (const gid of wanted) {
    const g = groups.get(gid)
    if (!g) continue
    const gName = g.localisations?.en?.name || 'Allegiance'
    for (const a of abilities.get(gid) || []) {
      const name = a.localisations?.en?.name
      const prose = appdataToMarkup(a.localisations?.en?.rules)
      if (!name || !prose) continue
      // `g` here is the same slug gen-roster-data.mjs writes into `unit.alleg.g`, and `opt` the
      // option name it stores — together they say "this record applies to a unit that chose X".
      out.push({
        sid: a.id,
        kind: 'allegiance',
        name: `${gName}: ${name}`,
        det: null,
        ref: { kind: 'allegiance', g: slugifyName(gName), opt: name },
        prose,
      })
    }
  }
  return out
}

// A datasheet's OWN abilities — the fourth source, added 2026-08-22. Everything above hangs off a
// rule the whole army (or a detachment) shares; this hangs off one unit, and it is where most of
// the numbers actually live: 1846 datasheet abilities across the game, 436 of which look like they
// touch a statline. Only `type: 'datasheet'` is taken — `core` is the shared rulebook ability
// (Feel No Pain, Leader) which the card already renders from core data, and `faction` is the army
// rule, collected above with its own identity.
//
// `ref.unit` is the wh11ed datasheet id, from the same sourceIds bridge the detachments use, so a
// record survives a GW rename. No `det`: an ability belongs to a unit, not to a detachment. The
// record is NAMED "<unit>: <ability>" so the review queue and the generated file group by unit,
// which is how a human reads them.
function abilitySources(bundle, dsBySid) {
  const out = []
  for (const d of bundle.datasheets || []) {
    const wh = dsBySid.get(d.id)?.id || null
    for (const a of d.abilities || []) {
      if (a.type !== 'datasheet') continue
      const prose = appdataToMarkup(a.rules)
      if (!a.id || !prose) continue
      out.push({
        // The one place a `sid` is NOT a bare appdata uuid: 56 abilities are published once and
        // attached to several datasheets (Custodes' Turbo-boost sits on both jetbike units), and a
        // record has to exist per datasheet — each one points its `ref` at a different unit. The
        // uuid still leads the key, so the identity is unchanged; the suffix only separates the
        // copies, and the pair is stable across runs.
        sid: `${a.id}:${wh || slugifyName(d.name)}`,
        kind: 'ability',
        name: `${d.name}: ${a.name}`,
        det: null,
        ref: wh ? { kind: 'ability', unit: wh } : null,
        prose,
      })
    }
  }
  return out
}

// A datasheet's WARGEAR that carries a rule of its own rather than a weapon profile — a Storm
// Shield's 4+ invulnerable, a Mortifier's Anchorite Sarcophagus rewriting Move and Save. Sixth
// source, added 2026-08-22: 330 such entries across the game, 136 of which touch a statline, and
// none of them applies unless the unit actually TOOK the item.
//
// `ref.item` is the item's NAME, normalised — the same key `filterWeapons` already matches loadouts
// on. The uuid bridge stores wargear as `wg:<datasheet>:<lowercased name>`, so the name is the
// stable part on both sides; our own item ids are interned integers that mean nothing across
// factions.
function wargearSources(bundle, dsBySid) {
  const out = []
  for (const d of bundle.datasheets || []) {
    const wh = dsBySid.get(d.id)?.id || null
    for (const w of d.wargear || []) {
      const prose = appdataToMarkup(w.ruleText)
      if (!w.id || !prose) continue
      out.push({
        sid: `${w.id}:${wh || slugifyName(d.name)}`,
        kind: 'wargear',
        name: `${d.name}: ${w.name}`,
        det: null,
        ref: wh ? { kind: 'wargear', unit: wh, item: normItemName(w.name) } : null,
        prose,
      })
    }
  }
  return out
}

const normItemName = (s) => (s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim()

const slugifyName = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

function sourcesOf(bundle, detById) {
  const out = []
  // appdata publishes an army rule once per PUBLICATION it appears in, and a Combat Patrol box
  // reprints the codex's rule verbatim — so the same rule arrives two or more times under
  // different uuids (29 extra copies across the game; nothing else duplicates this way).
  // Every copy resolves to the ONE hand-authored army rule on our side (`ref: {kind:'armyRule'}`),
  // so its effects were applied once per copy: doubled footnotes on the card, and a doubled
  // NUMBER wherever the condition is proven — Adeptus Mechanicus' Doctrina Imperatives is
  // answered automatically from the tracker, so its +1 BS was silently +2 in any game with an
  // Imperative running. Keep one copy per identical prose, chosen by the smallest uuid so the
  // pick is stable across runs and machines; the extra records then read as `orphan` and the
  // next write drops them.
  // Keyed by NAME, not by prose: the reprints are not always byte-identical (one publication's
  // Doctrina Imperatives is missing a full stop the other has, Templar Vows says "declares a
  // charge" where the other says "declares charge"), and on our side every record with the same
  // name resolves to the same single hand-authored army rule anyway — `ref: {kind:'armyRule'}`
  // points at `facEn.armyRule`, of which there is exactly one per faction. Two rules that really
  // are different carry different names (Dark Angels' Deathwing and Ravenwing), so they survive.
  const armyRules = new Map()
  for (const r of bundle.armyRules || []) {
    const prev = armyRules.get(r.name)
    if (!prev || r.id < prev.sid) armyRules.set(r.name, { sid: r.id, name: r.name, prose: bodyText(r.body) })
  }
  for (const r of armyRules.values()) {
    out.push({ sid: r.sid, kind: 'armyRule', name: r.name, det: null, ref: { kind: 'armyRule' }, prose: r.prose })
  }
  for (const d of bundle.detachments || []) {
    const whDet = detById.get(d.id)?.id || null
    for (const r of d.rules || []) {
      out.push({ sid: r.id, kind: 'detachmentRule', name: r.name, det: d.name, ref: whDet ? { kind: 'detachmentRule', det: whDet } : null, prose: bodyText(r.body) })
    }
    for (const e of d.enhancements || []) {
      out.push({ sid: e.id, kind: 'enhancement', name: e.name, det: d.name, ref: whDet ? { kind: 'enhancement', det: whDet } : null, prose: appdataToMarkup(e.rules) })
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

// A record's skeleton. `effects`/`when`/`cond` are the human's to fill in (see
// src/data/rosterModifiers/conditions.js for the `cond` vocabulary); everything else is bookkeeping
// this script owns and rewrites freely.
function skeleton(src, ver) {
  return {
    sid: src.sid,
    kind: src.kind,
    name: src.name,
    det: src.det,
    ref: src.ref,
    hash: proseHash(src.prose),
    ver,
    reviewed: false,
    effects: [],
  }
}

const bySidOf = (sources) => new Map(sources.map((s) => [s.sid, s]))

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
// hand-authored parts (`effects`, `when`, `cond`, `reviewed`, plus any `note`) carried through
// untouched.
function serialise(slug, existing, sources, result) {
  const bySid = new Map(sources.map((s) => [s.sid, s]))
  const kept = (existing?.entries || []).filter((e) => bySid.has(e.sid))
  const merged = [
    ...kept.map((e) => {
      const src = bySid.get(e.sid)
      // Name/detachment/kind/ref are refreshed from appdata and the id bridge (a rename must not
      // strand the record); the hash is NOT — it is what tells the next run that this record
      // needs re-reading.
      return { ...e, kind: src.kind, name: src.name, det: src.det, ref: src.ref }
    }),
    ...result.fresh.map((s) => skeleton(s, result.ver)),
  ].sort((a, b) => `${a.kind}${a.det || ''}${a.name}`.localeCompare(`${b.kind}${b.det || ''}${b.name}`))

  const body = JSON.stringify({ slug, formatVersion: FORMAT_VERSION, entries: merged }, null, 2)
  return `// Generated skeletons by gen-roster-modifiers.mjs; \`effects\`/\`when\`/\`cond\`/\`reviewed\` are\n`
    + `// HAND-AUTHORED — re-running the generator preserves them. Never edit \`sid\`/\`hash\`/\`ver\`\n`
    + `// by hand: \`hash\` is what ties a record to the exact rule wording it was read from, and\n`
    + `// rewriting it by hand would silence the one signal that says "GW changed this rule".\n`
    + `// See src/components/roster/CLAUDE.md and the generator's own header.\n`
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

  const detBySid = invertSourceIds('det')
  const dsBySid = invertSourceIds('ds')
  const allegTables = {
    groups: new Map(table('allegiance_ability_group.json').map((g) => [g.id, g])),
    abilities: table('allegiance_ability.json').reduce((m, a) => {
      if (!m.has(a.allegianceAbilityGroupId)) m.set(a.allegianceAbilityGroupId, [])
      m.get(a.allegianceAbilityGroupId).push(a)
      return m
    }, new Map()),
    dsGroup: new Map(table('datasheet.json').filter((d) => d.allegianceAbilityGroupId).map((d) => [d.id, d.allegianceAbilityGroupId])),
  }
  const totals = { stale: 0, fresh: 0, orphan: 0, ok: 0, unreviewed: 0 }
  const queueItems = []
  if (!check && !queue && !fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

  for (const slug of factionSlugs()) {
    const appSlug = SLUG_MAP[slug] || slug
    const bundle = loadJson(path.join(APPDATA, 'factions', `${appSlug}.json`))
    if (!bundle) continue
    const sources = [
      ...sourcesOf(bundle, detBySid),
      ...allegianceSources(allegTables, (bundle.datasheets || []).map((d) => d.id)),
      ...abilitySources(bundle, dsBySid),
      ...wargearSources(bundle, dsBySid),
    ]
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
    // The queue is the REVIEW list, not the diff: a record whose prose hasn't moved but which
    // nobody has read yet still needs reading, and is the bulk of the work on a first pass.
    // Listed after the changed items, which are the urgent ones.
    for (const e of result.ok) {
      if (e.reviewed) continue
      const src = bySidOf(sources).get(e.sid)
      queueItems.push({ slug, sid: e.sid, status: 'unreviewed', kind: e.kind, name: e.name, det: e.det, newHash: e.hash, prose: src?.prose || '', effects: e.effects })
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
