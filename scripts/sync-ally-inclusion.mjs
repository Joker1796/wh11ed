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
// to any one detachment — these can't be bridged to one detachment, so every faction the rule
// `faction_keyword_allied_faction` says it applies to gets its WHOLE file (armyRule + every
// detachment) searched instead (see `bodyGrantsInclusion` below for why bare name-presence isn't
// safe there). Still not hard-flagged either way — deciding whether/where wh11ed should carry that
// content is a product question (and lesson 17 — appdata doesn't even have a file for every ally
// faction, e.g. no harlequins.json/ynnari.json) — but "not found anywhere, in any applicable
// faction's file" is a strong signal, not just "unchecked": of the 8, only 1 (Harlequins→Asuryani)
// turned out to actually be present; the other 7 are a confirmed real gap, tracked separately
// (see APPDATA-COVERAGE-PLAN.md's "New task" entry — authoring that content is a much bigger job
// than this guardrail script, deliberately out of scope here).
//
// Matching: bridged via src/data/sourceIds.json's `det:<wh11ed-id>` → appdata detachment uuid
// (inverted here: appdata uuid → {slug, wh11ed detachment}, since we start from the appdata side).
// Report only — nothing is written (this is prose the detachment rule already carries or doesn't;
// a silent auto-write risks EN/RU desync and there's no template that fits every clause's wording).
//
// Usage: node scripts/sync-ally-inclusion.mjs   (also run as part of `npm run sync`).

import fs from 'node:fs'
import path from 'node:path'
import { ROOT, APPDATA, SLUG_MAP, norm, loadModule } from './lib/sync-common.mjs'

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
const appliesFkByAF = groupBy(read('faction_keyword_allied_faction.json'), 'alliedFactionId')

// The parent faction keyword (e.g. "Heretic Astartes") is the ally's OVERARCHING faction, but a
// detachment's rule sometimes grants a narrower shared keyword instead (chaos-knights' "Iconoclast
// Fiefdom" grants "DAMNED" units, not literally "Heretic Astartes" units) — so also compute, per
// allied_faction row, any keyword shared by every one of its allowed datasheets, as a fallback
// match. Datasheet keywords only exist in the flat per-faction bundles (no raw `tables/` join), so
// scan all of them once — and track how many datasheets carry each keyword game-wide while we're
// at it, to filter out generic ones below.
const datasheetKeywords = new Map()
const keywordDatasheetCount = new Map()
let totalDatasheets = 0
// appdata `faction.name` (e.g. "Agents of the Imperium") → its own bundle slug — used below to
// resolve a universal ally rule's "applies to" faction keyword back to a wh11ed faction file.
const appdataNameToSlug = new Map()
for (const file of fs.readdirSync(path.join(APPDATA, 'factions'))) {
  const bundle = JSON.parse(fs.readFileSync(path.join(APPDATA, 'factions', file), 'utf8'))
  if (bundle.faction?.name && bundle.faction?.slug) appdataNameToSlug.set(bundle.faction.name, bundle.faction.slug)
  for (const d of bundle.datasheets || []) {
    totalDatasheets++
    datasheetKeywords.set(d.id, d.keywords || [])
    for (const k of d.keywords || []) keywordDatasheetCount.set(k, (keywordDatasheetCount.get(k) || 0) + 1)
  }
}
// SLUG_MAP is wh11ed-slug → appdata-bundle-slug for the handful of renamed factions; invert it,
// and default to the identity mapping for every other faction (same slug on both sides).
const appdataSlugToWh11edSlug = new Map(Object.entries(SLUG_MAP).map(([wh, app]) => [app, wh]))
function wh11edSlugFor(appdataFactionName) {
  const appdataSlug = appdataNameToSlug.get(appdataFactionName)
  if (!appdataSlug) return null
  return appdataSlugToWh11edSlug.get(appdataSlug) || appdataSlug
}
// A keyword shared by, say, "Infantry" (55% of all datasheets in the game) or "Chaos" (24%) isn't a
// meaningful ally-identity signal — nearly any detachment's rule text will contain that word
// somewhere for unrelated reasons, so it'd pass regardless of whether the real ally clause is
// there. The two confirmed useful signals (DAMNED, Anhrathe) sit at 0.5-0.7% of all datasheets;
// 2% comfortably separates those from the generic race/unit-type keywords (Aeldari 9%, Titanic 6%,
// Towering 5%, even god-affiliation ones like Nurgle/Tzeentch at ~4.5%).
const GENERIC_KEYWORD_THRESHOLD = 0.02
function commonKeywords(datasheetIds) {
  if (!datasheetIds.length) return []
  let common = new Set(datasheetKeywords.get(datasheetIds[0]) || [])
  for (const id of datasheetIds.slice(1)) {
    const kws = new Set(datasheetKeywords.get(id) || [])
    common = new Set([...common].filter((k) => kws.has(k)))
  }
  return [...common].filter((k) => (keywordDatasheetCount.get(k) || 0) / totalDatasheets <= GENERIC_KEYWORD_THRESHOLD)
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
// For a "no gating detachment" (universal/codex-wide) row there's no one rule.body to check —
// the clause could be in the armyRule or in any detachment (or, as found for Drukhari/CSM, folded
// into the armyRule after superseding a per-detachment version) — so search the WHOLE faction file.
async function factionWideBody(slug) {
  const en = await loadFaction(slug)
  if (!en) return null
  const parts = [en.armyRule?.body || '']
  for (const d of en.detachments || []) parts.push(d.rule?.body || '')
  return parts.join('\n')
}

// A bare digit search risks a coincidental match (an unrelated points cost, a stat line, a CP
// value) silently masking a real gap — wh11ed always phrases a points bracket as "up to N pts",
// so require that context instead of just the digit.
function bodyHasPoints(body, n) {
  return new RegExp(`\\b${n}\\s*(?:pts?|points?)\\b`, 'i').test(body)
}
function bodyHasNumber(body, n) {
  return new RegExp(`\\b${n}\\b`).test(body)
}
function bodyHasName(body, name) {
  const n = norm(name)
  const words = n.split(' ').filter(Boolean).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return new RegExp(`\\b${words.join('\\s+')}\\b`, 'i').test(norm(body))
}
// Bare name-presence is fine for a single, already-bridged detachment's rule (the whole rule.body
// is short and specific to one clause), but checking a WHOLE faction file for a universal rule is
// a different, riskier search: the ally's name can appear for unrelated reasons — a restriction
// ("your army cannot include any Agents of the Imperium Deathwatch units"), or simply because the
// checking faction's OWN name is the ally identity being searched for (Harlequins→Asuryani checked
// against aeldari.js, which says "Asuryani" constantly as its own self-reference in stratagem
// targeting text). Require the established idiom instead — "can include ... <name>" with no
// "cannot" in between — so a restriction or a self-reference can't masquerade as a grant.
function bodyGrantsInclusion(body, name) {
  const n = norm(name)
  const words = n.split(' ').filter(Boolean).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const namePattern = words.join('\\s+')
  return new RegExp(`\\bcan include\\b(?:(?!\\bcannot\\b)[^.])*?\\b${namePattern}\\b`, 'i').test(norm(body))
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

  // A "no gating detachment at all" row is a universal/codex-wide rule ("any detachment of this
  // faction can include Titans/Knights/Agents of the Imperium") — there's no single rule.body to
  // bridge to, but it still names which of MY OWN factions the rule applies to
  // (faction_keyword_allied_faction), so check each of those factions' whole file (armyRule + every
  // detachment) instead of giving up entirely. Whether wh11ed SHOULD carry this content, and where,
  // is still a product decision this script can't make — but at least it now reports what's
  // actually there instead of nothing.
  if (!reqDets.length) {
    const shared = commonKeywords((alliedDsByAF.get(af.id) || []).map((r) => r.datasheetId))
    const applyNames = (appliesFkByAF.get(af.id) || []).map((r) => factionKeywordName.get(r.factionKeywordId)).filter(Boolean)
    const distinctPts = [...new Set((pointsLimitByAF.get(af.id) || []).map((r) => r.pointsLimit))]
    const perFaction = []
    for (const applyName of applyNames) {
      const slug = wh11edSlugFor(applyName)
      if (!slug) {
        perFaction.push({ applyName, status: 'no wh11ed slug resolved (name mismatch or no data file)' })
        continue
      }
      const body = await factionWideBody(slug)
      if (body == null) {
        perFaction.push({ applyName, slug, status: `no src/data/factions/${slug}.js` })
        continue
      }
      const hasName = allyNames.some((n) => bodyGrantsInclusion(body, n) || shared.some((k) => bodyGrantsInclusion(body, k)))
      const hasPts = !distinctPts.length || distinctPts.every((pts) => bodyHasPoints(body, pts))
      perFaction.push({ applyName, slug, status: hasName && hasPts ? 'found' : hasName ? '"can include" clause found, points bracket not found nearby' : 'no "can include ... <ally>" clause found in this faction file' })
    }
    needsReview.push({ af, allyNames, reqDetCount: 0, perFaction })
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
      if (!bodyHasPoints(body, pts)) missing.push(`points limit "${pts}" not found`)
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
  console.log('\n  ⚠ Universal rules (no gating detachment) — searched each applicable faction\'s whole file, not just one detachment:')
  for (const r of needsReview) {
    console.log(`\n    allied_faction ${r.af.id} · allies: ${r.allyNames.join(', ') || '(none)'}`)
    if (r.note) {
      console.log(`      ${r.note}`)
      continue
    }
    for (const pf of r.perFaction) {
      console.log(`      ${pf.applyName}${pf.slug ? ` (${pf.slug})` : ''}: ${pf.status}`)
    }
  }
  console.log(
    '\n  These are still not hard-flagged — whether/where wh11ed should carry a codex-wide ally rule\n  is a product decision (see APPDATA-SYNC-LESSONS.md lesson 17 — some ally factions have no\n  appdata file of their own either), but "not found anywhere in this faction file" across the\n  board is a strong signal the content is simply missing, not just unchecked.',
  )
}
process.exitCode = flagged.length ? 1 : 0
