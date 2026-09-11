// Report-only audit: wh40k-appdata's structural roster-composition restrictions — a named unit's
// default "only include one of these in your army" cap (`keyword_restriction_group` +
// `_keyword`), a detachment overriding that cap (`restriction_group_detachment_limit`, e.g.
// Houndpack Lance's "3+ War Dog units", Ghosts of the Webway/Serpent's Brood's "up to three
// Shadowseer/Troupe Master/Death Jester"), and named-datasheet exclusions scoped to one
// detachment (`detachment_excluded_datasheet`, e.g. Black Spear Task Force) or a whole faction
// (`faction_keyword_excluded_datasheet`, e.g. Black Templars' banned Codex: Space Marines kit) —
// must be reflected in wh11ed's text.
//
// Why this exists: APPDATA-COVERAGE-PLAN.md flagged this as script #3. Before writing any
// checking logic, every row in `keyword_restriction_group` (16) was read by hand against the
// actual wh11ed datasheet/faction files — all 16 turned out to already be present, correctly
// worded (Patriarch's SUPREME COMMANDER, Emperor's Champion's CHOSEN OF THE EMPEROR, Death
// Jester/Shadowseer/Troupe Master's TRAVELLING PLAYERS incl. both detachment overrides, Commander
// Farsight↔Ethereal and The Yncarne/Yvraine/The Visarch's mutual-exclusion text, Houndpack Lance's
// "three or more WAR DOG units", Sicarius/Marneus Calgar/Commissar Graves already covered by the
// core EPIC HERO limit footnote in muster.js 25.04). So — like script #2
// ([[project_appdata_coverage_plan]] / APPDATA-SYNC-LESSONS.md lesson 24) — this table carries no
// content debt; the value here is the standing guardrail against future drift, not a one-off
// authoring pass. The excluded-datasheet tables initially looked like they'd surfaced a genuine
// miss (Black Spear Task Force never explicitly bans Watch Master/Corvus Blackstar/Watch Captain
// Artemis/Deathwatch Kill Team, unlike appdata's `detachment_excluded_datasheet` row for it) —
// but tracing those specific datasheet ids back to `wh40k-appdata/tables/datasheet.json` showed
// they're the Codex: Imperial Agents-printed versions of those same-named units, already banned
// wholesale by this faction's own armyRule ("cannot include any Agents of the Imperium Deathwatch
// units"). See KNOWN_EQUIVALENT below and [[feedback_verify_dont_assert]] — checking the name
// alone would have produced a false "missing" report a 4th time in this same investigation.
//
// Not covered here: `unit_composition_required_detachment`/`_required_faction_keyword` (structural
// "which faction/detachment can take this points bracket at all" data, closer to the
// datasheet-filing question sync-appdata.mjs/the datasheet-drift reconciliation already covers
// than to a prose restriction) — reported separately, informationally, below rather than hard
// flagged; APPDATA-COVERAGE-PLAN.md has the open question.
//
// Matching: bridged via src/data/sourceIds.json's `det:<wh11ed-id>` → appdata detachment uuid for
// detachment-scoped checks. Named-unit checks match by datasheet NAME across every wh11ed
// datasheets file (these are unique per-model identity keywords — "Patriarch", "Sicarius" — not
// bridged via sourceIds' `ds:` map, since that map is keyed by wh11ed's own `id`, not appdata
// name, and a plain name index is simpler here and matches sync-leader-units.mjs's own approach).
//
// Report only — nothing is written. Usage: node scripts/sync-roster-restrictions.mjs (also run as
// part of `npm run sync`).

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, APPDATA, SLUG_MAP, norm, loadJson, loadModule, loadWh11edDatasheets, allFactionBundles, sourceIds as sourceIdsMap, table as read, nameOfEn as nameOf, groupBy, escapeRegex, NUMBER_WORDS, invertSourceIds } from './lib/sync-common.mjs'

const factionKeywordName = new Map(read('faction_keyword.json').map((r) => [r.id, nameOf(r)]))
const keywordName = new Map(read('keyword.json').map((r) => [r.id, nameOf(r)]))
const detachmentName = new Map(read('detachment.json').map((r) => [r.id, nameOf(r)]))
const datasheetName = new Map(read('datasheet.json').map((r) => [r.id, nameOf(r)]))

// --- wh11ed side: load every faction's datasheets/detachments once ------------------------------
const sourceIds = sourceIdsMap() || {}
const detByUuid = invertSourceIds('det')
async function loadFaction(slug) {
  const mod = await loadModule(path.join(ROOT, 'src/data/factions', `${slug}.js`))
  return Object.values(mod || {})[0]?.en || null
}
async function findDetachment(slug, id) {
  const en = await loadFaction(slug)
  return (en?.detachments || []).find((d) => d.id === id) || null
}
async function factionWideBody(slug) {
  const en = await loadFaction(slug)
  if (!en) return null
  const parts = [en.armyRule?.body || '']
  for (const d of en.detachments || []) parts.push(d.rule?.body || '')
  return parts.join('\n')
}
// appdata `faction.name` → its own bundle slug, for faction_keyword_excluded_datasheet's faction
// side (same approach as sync-ally-inclusion.mjs).
const appdataNameToSlug = new Map()
for (const { bundle } of allFactionBundles()) {
  if (bundle.faction?.name && bundle.faction?.slug) appdataNameToSlug.set(bundle.faction.name, bundle.faction.slug)
}
const appdataSlugToWh11edSlug = new Map(Object.entries(SLUG_MAP).map(([wh, app]) => [app, wh]))
function wh11edSlugFor(appdataFactionName) {
  const appdataSlug = appdataNameToSlug.get(appdataFactionName)
  if (!appdataSlug) return null
  return appdataSlugToWh11edSlug.get(appdataSlug) || appdataSlug
}

// A datasheet's own restriction/limit prose lives in one of several array fields depending on
// house style (`specialAbilities` — Death Jester, Emperor's Champion; `rules` — Patriarch;
// sometimes folded into `abilities`/`wargearAbilities` for a mutual-exclusion note). Combine them
// all so the check doesn't care which field a given faction file happened to use.
function datasheetRestrictionText(d) {
  const parts = []
  for (const key of ['specialAbilities', 'rules', 'abilities', 'wargearAbilities']) {
    for (const a of d[key] || []) parts.push(`${a.name || ''} ${a.text || ''}`)
  }
  return parts.join('\n')
}
// Index every wh11ed datasheet by normalized name once (unique per-model identity keywords like
// "Patriarch"/"Sicarius" match a datasheet name 1:1 — no sourceIds bridge needed).
const datasheetsByName = new Map() // norm(name) -> [{ slug, d }]
for (const slug of Object.keys(sourceIds)) {
  for (const d of await loadWh11edDatasheets(slug)) {
    const key = norm(d.name)
    const arr = datasheetsByName.get(key) || []
    arr.push({ slug, d })
    datasheetsByName.set(key, arr)
  }
}

function nameRe(name) {
  const words = norm(name)
    .split(' ')
    .filter(Boolean)
    .map((w) => escapeRegex(w))
  return new RegExp(`\\b${words.join('\\s+')}\\b`, 'i')
}
// "cannot include more than one/1 <NAME>" in either order (name-then-cap or cap-then-name) — the
// two confirmed house-style phrasings (Patriarch: "You cannot include more than one PATRIARCH
// model…"; T'au: "If your army includes COMMANDER FARSIGHT, it cannot include any Ethereal
// units…"). A THIRD confirmed phrasing is self-referential and never repeats the unit's own name
// at all (Harlequins' TRAVELLING PLAYERS: "Unless otherwise stated, you cannot include more than
// one of this model in your army.") — safe to accept unconditionally here since this function is
// only ever called against a datasheet that IS the named subject, so "this model" already means it.
function bodyCapsInclusion(body, name) {
  const n = nameRe(name).source.slice(2, -2) // reuse the same word-boundary token pattern, unwrapped
  const re = new RegExp(`(?:cannot include (?:more than (?:one|1)\\s+)?(?:[a-z ]*\\b${n}\\b)|\\b${n}\\b[^.]*?\\bcannot include\\b)`, 'i')
  if (re.test(norm(body))) return true
  return /cannot include (?:more than (?:one|1) )?(?:[a-z ]*)?of this model/i.test(body)
}
// wh11ed spells small counts out as words in prose ("up to three", "three or more"), not digits —
// appdata's own min/max are always bare numbers, so check both forms.
function bodyHasNumber(body, n) {
  if (new RegExp(`\\b${n}\\b`).test(body)) return true
  const word = NUMBER_WORDS[n]
  return word ? new RegExp(`\\b${word}\\b`, 'i').test(body) : false
}

export async function run() {
const flagged = []
const needsReview = []
let checked = 0

// --- 1. keyword_restriction_group + _keyword + restriction_group_detachment_limit --------------
const krg = read('keyword_restriction_group.json')
const krgKeywordsByGroup = groupBy(read('keyword_restriction_group_keyword.json'), 'keywordRestrictionGroupId')
const overridesByGroup = groupBy(read('restriction_group_detachment_limit.json'), 'restrictionGroupId')

for (const g of krg) {
  checked++
  const allKeywords = (krgKeywordsByGroup.get(g.id) || []).map((k) => keywordName.get(k.keywordId)).filter(Boolean)
  const subjects = allKeywords.filter((k) => k !== 'Epic Hero')
  const overrides = overridesByGroup.get(g.id) || []

  if (g.limit != null && subjects.length) {
    // Resolve every subject to its wh11ed datasheet(s) first — exact norm-name match, falling back
    // to a whole-word substring match (Sicarius → "Cato Sicarius", Marneus Calgar → "Marneus Calgar
    // in Armour of Antilochus": the unique keyword names the character, not the exact datasheet
    // title, when a model has a named wargear/armour variant in its title).
    const matchesBySubject = new Map()
    for (const subject of subjects) {
      let matches = datasheetsByName.get(norm(subject)) || []
      if (!matches.length) {
        const re = nameRe(subject)
        for (const [key, arr] of datasheetsByName) {
          if (re.test(key)) matches = matches.concat(arr)
        }
      }
      if (!matches.length) {
        needsReview.push({ kind: 'keyword-limit', subject, note: `no wh11ed datasheet named "${subject}" found (checked keyword group ${g.id})` })
      }
      matchesBySubject.set(subject, matches)
    }

    const excludedFk = factionKeywordName.get(g.excludedFactionKeywordId)
    if (excludedFk) {
      // e.g. "Epic Hero"+"The Yncarne" with excludedFactionKeyword "Ynnari": a mutual exclusion
      // between this named character and Epic Heroes generally, carved out for the excluded
      // faction keyword's own units. Stated once, on the named character's own datasheet.
      for (const subject of subjects) {
        for (const { slug, d } of matchesBySubject.get(subject) || []) {
          const text = datasheetRestrictionText(d)
          const ok = /cannot include/i.test(text) && /epic hero/i.test(text) && nameRe(excludedFk).test(text)
          if (!ok) flagged.push({ kind: 'keyword-limit', slug, name: d.name, detail: `no mutual-exclusion text found for "${subject}" vs Epic Hero/${excludedFk} (limit=${g.limit})` })
        }
      }
    } else if (subjects.length > 1) {
      // Shared pool between two+ named subjects: GW states the mutual restriction once, on ONE of
      // the datasheets — not necessarily all of them — so check the group's combined text, not
      // each datasheet individually. Two confirmed phrasings: a bidirectional "cannot include"
      // pair (Commander Farsight ↔ Ethereal) or "your army can only include one A or B unit"
      // (Commissar Graves ↔ Commissar Graves on Foot, two forms of the same named character).
      const combined = subjects.flatMap((s) => matchesBySubject.get(s) || []).map(({ d }) => datasheetRestrictionText(d)).join('\n')
      const canOnlyIncludeOne = subjects.every((s) => new RegExp(`can only include (?:one|1)\\b[^.]*?\\b${nameRe(s).source.slice(2, -2)}\\b`, 'i').test(norm(combined)))
      const mutualCannotInclude = subjects.every((s) => bodyCapsInclusion(combined, s) || (nameRe(s).test(combined) && /cannot include/i.test(combined)))
      if (!canOnlyIncludeOne && !mutualCannotInclude) flagged.push({ kind: 'keyword-limit', slug: matchesBySubject.get(subjects[0])?.[0]?.slug, name: subjects.join(' / '), detail: `no mutual-exclusion text found between ${subjects.join(', ')} (limit=${g.limit})` })
    } else {
      const subject = subjects[0]
      for (const { slug, d } of matchesBySubject.get(subject) || []) {
        // Already covered by the core rule (25.04's battleSizeTable footnote: "every EPIC HERO has
        // a unit limit of 1, regardless of the battle size") — no per-unit text needed or expected.
        if ((d.keywords || []).some((k) => norm(k) === 'epic hero')) continue
        const text = datasheetRestrictionText(d)
        if (!bodyCapsInclusion(text, subject)) {
          flagged.push({ kind: 'keyword-limit', slug, name: d.name, detail: `no "cannot include more than one" text found for "${subject}" (limit=${g.limit})` })
        }
      }
    }
  }

  for (const ov of overrides) {
    const detName = detachmentName.get(ov.detachmentId)
    // Overrides aren't bridged by uuid in this table — resolve via sourceIds by matching the
    // detachment's appdata name against every wh11ed faction's own detachment list (small enough
    // — 7 rows total — that a linear scan per row is fine).
    let found = null
    for (const [slug, entries] of Object.entries(sourceIds)) {
      for (const [key, uuid] of Object.entries(entries)) {
        if (!key.startsWith('det:')) continue
        if (uuid !== ov.detachmentId) continue
        found = { slug, id: key.slice(4) }
      }
    }
    if (!found) {
      needsReview.push({ kind: 'keyword-limit-override', detachment: detName, note: 'not bridged by sourceIds' })
      continue
    }
    const det = await findDetachment(found.slug, found.id)
    if (!det) {
      needsReview.push({ kind: 'keyword-limit-override', detachment: detName, note: `sourceIds points at ${found.slug}/det:${found.id} but no such detachment found` })
      continue
    }
    const body = det.rule?.body || ''
    const missing = []
    for (const subject of subjects) {
      if (!nameRe(subject).test(norm(body))) missing.push(`"${subject}" not named in rule body`)
    }
    if (ov.maxRosterLimit != null && !bodyHasNumber(body, ov.maxRosterLimit)) missing.push(`max "${ov.maxRosterLimit}" not found`)
    if (ov.minRosterLimit != null && !bodyHasNumber(body, ov.minRosterLimit)) missing.push(`min "${ov.minRosterLimit}" not found`)
    if (missing.length) flagged.push({ kind: 'keyword-limit-override', slug: found.slug, name: det.name, detail: missing.join('; ') })
  }
}

// Some exclusions are worded in wh11ed as a CATEGORY ban (a Psyker/Epic-Hero/Daemon-Prince keyword
// restriction covers several appdata-named datasheets at once, without spelling out each name) or
// are already structurally impossible to include (absent from a Chapter's sharedUnitIds fold-in
// list — see CLAUDE.md's "SM-Chapter datasheet dedup" — or, for a unique pilot-ejection model like
// Sir Hekhtur, carries no factionKeywords/points at all in wh11ed) — each verified by hand against
// the actual wh11ed files (2026-07-28), not assumed; see APPDATA-COVERAGE-PLAN.md script #3 notes.
// Filtered out here so they don't false-flag every run.
const KNOWN_EQUIVALENT = {
  'Shadow Legion': { names: null, note: 'covered by this detachment\'s own "Thralls of the First Prince" category ban (Daemon Prince/Daemon Prince with Wings/Epic Hero, excluding Be’lakor)' },
  'Black Spear Task Force': {
    names: null,
    note:
      'these appdata rows are the Codex: Imperial Agents-printed Watch Master/Corvus Blackstar/Watch Captain Artemis/Deathwatch Kill Team datasheets (verified via wh40k-appdata/tables/datasheet.json publicationId, distinct ids from the Index: Deathwatch versions already in deathwatch.js) plus the same 5 Codex: Space Marines squads — already covered by this faction\'s own armyRule ("cannot include any Agents of the Imperium Deathwatch units" + the Chapter/squad exclusion list), which applies regardless of detachment',
  },
  'Black Templars': { names: ['Librarian in Terminator Armour', 'Librarian in Phobos Armour', 'Librarian'], note: 'covered by this faction\'s own "cannot include any Adeptus Astartes Psyker models" category ban' },
  'Imperial Knights': { names: ['Sir Hekhtur'], note: 'already carries no factionKeywords and no points cost in wh11ed — structurally not includable, no prose needed' },
  'Emperor’s Children': { names: ['Khorne Lord of Skulls'], note: 'exists only in world-eaters.js — Emperor’s Children’s own datasheets file never lists it, so it’s already structurally unavailable' },
  'Space Wolves': { names: ['Tactical Squad', 'Apothecary Biologis', 'Devastator Squad', 'Apothecary'], note: 'absent from sharedUnitIds (the Chapter-fold list in space-wolves.js) — structurally unavailable, no prose needed' },
}
const resolvedStructural = []
// Returns the subset of `names` that ISN'T covered by a known equivalent for `key`, and records a
// resolved-note for the ones that are.
function filterKnownEquivalent(key, names, context) {
  const known = KNOWN_EQUIVALENT[key]
  if (!known) return names
  const covered = known.names ? names.filter((n) => known.names.includes(n)) : names
  if (covered.length) resolvedStructural.push({ key, context, covered, note: known.note })
  return known.names ? names.filter((n) => !known.names.includes(n)) : []
}

// --- 2. detachment_excluded_datasheet -----------------------------------------------------------
const detExclByDet = groupBy(read('detachment_excluded_datasheet.json'), 'detachmentId')
for (const [detachmentId, rows] of detExclByDet) {
  const bridge = detByUuid.get(detachmentId)
  const detName = detachmentName.get(detachmentId)
  if (!bridge) {
    needsReview.push({ kind: 'detachment-exclusion', detachment: detName, note: 'not bridged by sourceIds' })
    continue
  }
  const det = await findDetachment(bridge.slug, bridge.id)
  if (!det) {
    needsReview.push({ kind: 'detachment-exclusion', detachment: detName, note: `sourceIds points at ${bridge.slug}/det:${bridge.id} but no such detachment found` })
    continue
  }
  checked++
  const body = norm(det.rule?.body || '')
  let missing = []
  for (const row of rows) {
    const dsName = datasheetName.get(row.datasheetId)
    if (dsName && !nameRe(dsName).test(body)) missing.push(dsName)
  }
  missing = filterKnownEquivalent(det.name, missing, `${bridge.slug} · ${det.name}`)
  if (missing.length) flagged.push({ kind: 'detachment-exclusion', slug: bridge.slug, name: det.name, detail: `excluded datasheet(s) not named in this detachment's own rule body: ${missing.join(', ')}` })
}

// --- 3. faction_keyword_excluded_datasheet -------------------------------------------------------
const fkExclByFk = groupBy(read('faction_keyword_excluded_datasheet.json'), 'factionKeywordId')
for (const [factionKeywordId, rows] of fkExclByFk) {
  const fkName = factionKeywordName.get(factionKeywordId)
  const slug = wh11edSlugFor(fkName)
  if (!slug) {
    needsReview.push({ kind: 'faction-exclusion', faction: fkName, note: 'no wh11ed slug resolved for this faction keyword' })
    continue
  }
  const body = await factionWideBody(slug)
  if (body == null) {
    needsReview.push({ kind: 'faction-exclusion', faction: fkName, note: `no src/data/factions/${slug}.js` })
    continue
  }
  checked++
  const normBody = norm(body)
  let missing = []
  for (const row of rows) {
    const dsName = datasheetName.get(row.datasheetId)
    if (dsName && !nameRe(dsName).test(normBody)) missing.push(dsName)
  }
  missing = filterKnownEquivalent(fkName, missing, `${slug} · ${fkName}`)
  if (missing.length) flagged.push({ kind: 'faction-exclusion', slug, name: fkName, detail: `excluded datasheet(s) not named anywhere in this faction's file: ${missing.join(', ')}` })
}

// --- 4. unit_composition_required_detachment / _required_faction_keyword — informational only ---
// Structural "which faction/detachment can field this points bracket at all" data — closer to the
// datasheet-filing question sync-appdata.mjs and the datasheet-drift reconciliation already cover
// than to a prose restriction (see header note). Reported as a plain count, not hard-flagged;
// worth a closer look only if that investigation is picked up later.
const ucReqFk = read('unit_composition_required_faction_keyword.json')
const ucReqDet = read('unit_composition_required_detachment.json')

console.log(
  `roster restrictions: ${checked} checked, ${flagged.length} FLAGGED, ${resolvedStructural.length} resolved via known category/structural equivalents, ${needsReview.length} need manual review.\n  (${ucReqFk.length} unit_composition_required_faction_keyword + ${ucReqDet.length} unit_composition_required_detachment rows exist but are informational-only here — see header note.)`,
)
if (resolvedStructural.length) {
  console.log('\n  ✓ Resolved via a known category/structural equivalent (not a gap):')
  for (const r of resolvedStructural) {
    console.log(`    ${r.context}: ${r.covered.join(', ')} — ${r.note}`)
  }
}
if (flagged.length) {
  console.log("\n  ✗ appdata carries a roster restriction wh11ed's text appears to be missing:")
  for (const r of flagged) {
    console.log(`\n    [${r.kind}] ${r.slug ? `${r.slug} · ` : ''}${r.name}`)
    console.log(`      ${r.detail}`)
  }
}
if (needsReview.length) {
  console.log('\n  ⚠ Needs manual review (bridging gap or unresolved name):')
  for (const r of needsReview) {
    console.log(`    [${r.kind}] ${r.subject || r.detachment || r.faction} — ${r.note}`)
  }
}
return flagged.length ? 1 : 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
