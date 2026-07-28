// Report-only audit: every wh40k-appdata "allied faction" clause — a detachment's rule granting
// permission to include another faction's units (Blood Legions in Khorne Daemonkin, Harlequins in
// Reaper's Wager, Scintillating Legions, Plague Legions, Legions of Excess, Devoted of Ynnead, …) —
// must be reflected in that detachment's wh11ed `rule.body`, with the right points brackets.
//
// Why this exists: every one of these clauses found so far needed a manual multi-table grep
// (APPDATA-SYNC-LESSONS.md lesson 13) because `factions/<slug>.json` (the flat export
// `sync-appdata.mjs`/`sync-faction-text.mjs` read) does not carry `allied_faction*` at all — only
// `tables/` has it. This script does that grep once and remembers it.
//
// Scope: `allied_faction` has 21 rows total (small, checked by hand once — see
// APPDATA-COVERAGE-PLAN.md). 13 of them have at least one `allied_faction_required_detachment` row
// — a detachment whose rule grants the inclusion, checked here (a row spanning several detachments,
// e.g. 16 for the "every Chaos Space Marines detachment can include one signature unit from another
// Chaos Legion" rule, is just checked once per detachment). The other 8 are universal — a codex-wide
// "any detachment of this faction can include Titans/Knights/Agents of the Imperium" rule not tied
// to any one detachment — and can't be checked this way at all. Per the plan's own note (and lesson
// 17 — appdata doesn't even have a file for every ally faction, e.g. no harlequins.json/ynnari.json),
// these are surfaced in a separate list for human judgment, not hard-flagged — deciding whether
// wh11ed should carry that content at all, and where, is a product question this script can't answer.
//
// Matching: bridged via src/data/sourceIds.json's `det:<wh11ed-id>` → appdata detachment uuid
// (inverted here: appdata uuid → {slug, wh11ed detachment}, since we start from the appdata side).
// Report only — nothing is written (this is prose the detachment rule already carries or doesn't;
// a silent auto-write risks EN/RU desync and there's no template that fits every clause's wording).
//
// Usage: node scripts/sync-ally-inclusion.mjs   (also run as part of `npm run sync`).

import fs from 'node:fs'
import path from 'node:path'
import { ROOT, APPDATA, norm, loadModule } from './lib/sync-common.mjs'

const T = path.join(APPDATA, 'tables')
const read = (f) => {
  const p = path.join(T, f)
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : []
}
const groupBy = (rows, key) => {
  const m = new Map()
  for (const r of rows) {
    const arr = m.get(r[key]) || []
    arr.push(r)
    m.set(r[key], arr)
  }
  return m
}
const nameOf = (r) => r?.localisations?.en?.name || ''

const factionKeywordName = new Map(read('faction_keyword.json').map((r) => [r.id, nameOf(r)]))
const keywordName = new Map(read('keyword.json').map((r) => [r.id, nameOf(r)]))
const battleSizeName = new Map(read('battle_size.json').map((r) => [r.id, nameOf(r)]))

const requiredDetsByAF = groupBy(read('allied_faction_required_detachment.json'), 'alliedFactionId')
const parentFkByAF = groupBy(read('allied_faction_parent_faction_keyword.json'), 'alliedFactionId')
const pointsLimitByAF = groupBy(read('allied_faction_points_limit.json'), 'alliedFactionId')
const keywordsByAF = groupBy(read('allied_faction_keyword.json'), 'alliedFactionId')
const alliedDsByAF = groupBy(read('allied_faction_datasheet.json'), 'alliedFactionId')

// The parent faction keyword (e.g. "Heretic Astartes") is the ally's OVERARCHING faction, but a
// detachment's rule sometimes grants a narrower shared keyword instead (chaos-knights' "Iconoclast
// Fiefdom" grants "DAMNED" units, not literally "Heretic Astartes" units) — so also compute, per
// allied_faction row, any keyword shared by every one of its allowed datasheets, as a fallback
// match. Datasheet keywords only exist in the flat per-faction bundles (no raw `tables/` join), so
// scan all of them once.
const datasheetKeywords = new Map()
for (const file of fs.readdirSync(path.join(APPDATA, 'factions'))) {
  const bundle = JSON.parse(fs.readFileSync(path.join(APPDATA, 'factions', file), 'utf8'))
  for (const d of bundle.datasheets || []) datasheetKeywords.set(d.id, d.keywords || [])
}
function commonKeywords(datasheetIds) {
  if (!datasheetIds.length) return []
  let common = new Set(datasheetKeywords.get(datasheetIds[0]) || [])
  for (const id of datasheetIds.slice(1)) {
    const kws = new Set(datasheetKeywords.get(id) || [])
    common = new Set([...common].filter((k) => kws.has(k)))
  }
  return [...common]
}

// --- sourceIds bridge, inverted: appdata detachment uuid → { slug, wh11ed detachment } -----------
const sourceIds = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/sourceIds.json'), 'utf8'))
const detByUuid = new Map()
for (const [slug, entries] of Object.entries(sourceIds)) {
  for (const [key, uuid] of Object.entries(entries)) {
    if (key.startsWith('det:')) detByUuid.set(uuid, { slug, id: key.slice(4) })
  }
}

// A later Faction Pack errata sometimes converts a specific-detachments ally clause into a blanket
// "any detachment of this Army Faction" rule folded into the faction's own armyRule instead — e.g.
// Drukhari's "Corsairs and Travelling Players" and chaos-space-marines' "Cults of the Dark Gods",
// both confirmed (by their own inline source comments) as Faction-Pack additions to `armyRule.body`
// that superseded an older per-detachment restriction appdata's structural join table still lists.
// So a detachment's rule.body is the primary place to look, but the faction's armyRule.body is a
// legitimate alternate location — check both before flagging.
async function loadFaction(slug) {
  const mod = await loadModule(path.join(ROOT, 'src/data/factions', `${slug}.js`))
  return Object.values(mod || {})[0]?.en || null
}
async function findDetachment(slug, id) {
  const en = await loadFaction(slug)
  return (en?.detachments || []).find((d) => d.id === id) || null
}

// wh11ed writes "Incursion — up to 500 pts" / "**Incursion:** Up to 500 pts" style prose — presence
// of the battle-size name and the digit count is enough, not an exact phrase match.
function bodyHasNumber(body, n) {
  return new RegExp(`\\b${n}\\b`).test(body)
}
function bodyHasName(body, name) {
  const n = norm(name)
  const words = n.split(' ').filter(Boolean).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return new RegExp(`\\b${words.join('\\s+')}\\b`, 'i').test(norm(body))
}

const flagged = []
const needsReview = []
let checked = 0

for (const af of read('allied_faction.json')) {
  const reqDets = requiredDetsByAF.get(af.id) || []
  const allyNames = (parentFkByAF.get(af.id) || []).map((r) => factionKeywordName.get(r.factionKeywordId)).filter(Boolean)
  const points = (pointsLimitByAF.get(af.id) || []).map((r) => ({ size: battleSizeName.get(r.battleSizeId), pts: r.pointsLimit }))
  const kwLimits = (keywordsByAF.get(af.id) || []).map((r) => ({
    kw: keywordName.get(r.keywordId),
    limit: r.limitCount,
    size: battleSizeName.get(r.battleSizeId),
  }))

  // Only a "no gating detachment at all" row is a genuinely different (universal/codex-wide) rule
  // this script can't check — a row spanning several detachments (5, or 16 for the CSM
  // cross-Legion-unit rule) just means checking that same criteria against each one in turn below.
  if (!reqDets.length) {
    needsReview.push({ af, allyNames, reqDetCount: 0 })
    continue
  }

  // A detachment sometimes grants a narrower shared keyword instead of the ally's overarching
  // faction name (see the DAMNED/Heretic Astartes header note) — accept either.
  const shared = commonKeywords((alliedDsByAF.get(af.id) || []).map((r) => r.datasheetId))

  for (const reqDet of reqDets) {
    const bridge = detByUuid.get(reqDet.detachmentId)
    if (!bridge) {
      needsReview.push({ af, allyNames, reqDetCount: reqDets.length, note: 'a required detachment is not bridged by sourceIds' })
      continue
    }
    const det = await findDetachment(bridge.slug, bridge.id)
    if (!det) {
      needsReview.push({ af, allyNames, reqDetCount: reqDets.length, note: `sourceIds points at det:${bridge.id} but ${bridge.slug}.js has no such detachment` })
      continue
    }
    checked++

    const faction = await loadFaction(bridge.slug)
    const body = `${det.rule?.body || ''}\n${faction?.armyRule?.body || ''}`
    const missing = []
    for (const name of allyNames) {
      if (!bodyHasName(body, name) && !shared.some((k) => bodyHasName(body, k))) {
        missing.push(`ally name "${name}" not found${shared.length ? ` (also tried shared keyword(s): ${shared.join(', ')})` : ''}`)
      }
    }
    // Distinct point values only — Incursion/Strike Force/Onslaught sometimes share a value (e.g.
    // Adeptus Mechanicus↔Imperial Knights is flat 500 at every size), so checking each battle size
    // separately would just repeat the same "500 not found" line three times for one real miss.
    const distinctPts = [...new Set(points.map((p) => p.pts))]
    for (const pts of distinctPts) {
      if (!bodyHasNumber(body, pts)) missing.push(`points limit "${pts}" not found`)
    }
    for (const { kw, limit, size } of kwLimits) {
      if (limit > 1 && !bodyHasNumber(body, limit)) missing.push(`"${kw}" limit "${limit}" (${size}) not found`)
    }

    if (missing.length) flagged.push({ slug: bridge.slug, detachment: det.name, allyNames, missing: [...new Set(missing)] })
  }
}

console.log(
  `ally-inclusion clauses: ${checked} detachments checked, ${flagged.length} FLAGGED, ${needsReview.length} need manual review (universal rules with no gating detachment, or a bridging gap).`,
)
if (flagged.length) {
  console.log('\n  ✗ appdata carries an ally-inclusion detail this detachment\'s wh11ed rule body appears to be missing:')
  for (const r of flagged) {
    console.log(`\n    ${r.slug} · ${r.detachment} (allies: ${r.allyNames.join(', ')})`)
    for (const m of r.missing) console.log(`      ${m}`)
  }
}
if (needsReview.length) {
  console.log('\n  ⚠ Not checked — universal rule with no gating detachment at all (or a bridging gap):')
  for (const r of needsReview) {
    console.log(`    allied_faction ${r.af.id} · allies: ${r.allyNames.join(', ') || '(none)'} · ${r.reqDetCount} required detachment(s)${r.note ? ` · ${r.note}` : ''}`)
  }
  console.log(
    '\n  For each: decide by hand whether wh11ed should carry this (see APPDATA-SYNC-LESSONS.md\n  lesson 17 — some ally factions have no appdata file of their own either) and where it belongs\n  (a detachment rule, an army-wide note, or out of scope).',
  )
}
process.exitCode = flagged.length ? 1 : 0
