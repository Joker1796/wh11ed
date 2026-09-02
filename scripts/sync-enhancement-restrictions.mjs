// Report-only audit: every wh40k-appdata enhancement's eligibility restriction — a leading "X
// model/unit only[, excluding Y models]" clause — must be reflected in wh11ed's enhancement `body`.
//
// Why this exists: this class of bug was already found once by luck rather than a standing check
// (necrons' "Veil of Darkness" — its own appdata prose never says "NECRONS model only" anywhere;
// only the STRUCTURAL `enhancement_required_keyword_group_faction_keyword` row says so. wh11ed had
// been missing it until fixed in an earlier session — see APPDATA-COVERAGE-PLAN.md #4). Building
// this script found a second, previously-unknown case the same way: space-marines.js's "Scroll of
// Proclamation" was missing "Adeptus Astartes model only." in EN — and RU (ru/space-marines.js)
// already had "Только модель Adeptus Astartes." in the equivalent position, so this was a one-sided
// EN gap, not a missing translation. Fixed 2026-07-28 (see APPDATA-SYNC-LESSONS.md).
//
// Two-tier check, discovered the hard way while building this (see APPDATA-SYNC-LESSONS.md for the
// full write-up — a whole first version of this script that reconstructed the expected wording
// purely from the structural join tables produced 26 false positives out of 28 flags on the first
// run):
//   1. If appdata's OWN rules prose already states an "only" clause, compare wh11ed's clause
//      against THAT TEXT directly (significant-word overlap) — not against the structural
//      `_faction_keyword`/`_keyword` join. The join and the prose routinely disagree in ways that
//      are not wh11ed bugs: GW's prose omits a keyword's containing faction when the keyword is
//      already faction-exclusive ("Tech-Priest model only", no "Adeptus Mechanicus"), sometimes
//      names a DIFFERENT keyword the same datasheet also carries (Brôkhyr Iron-master's enhancement
//      is grouped under keyword "Brôkhyr" in appdata but its own prose says "IRON-MASTER" — the same
//      single unit, either keyword identifies it), and plurals don't always agree between the
//      keyword catalog and the sentence ("Monster" the keyword vs "excluding MONSTERS models" in the
//      prose; "Scout Sentinels" the datasheet name vs "SCOUT SENTINEL unit only" in the prose).
//      Comparing wh11ed to appdata's own prose sidesteps all of that.
//   2. Only when appdata's prose has NO "only" clause at all (genuinely silent — the Veil of
//      Darkness/Scroll of Proclamation case) does this script fall back to reconstructing the
//      expected name(s) from the structural join (`enhancement_required_keyword_group` +
//      `_faction_keyword`/`_keyword`/`datasheetId`, unioned across a multi-group "X or Y" row) —
//      this silent case is the entire reason this script exists, so it's still checked, just not
//      used as the default path for every enhancement.
// `enhancement_excluded_keyword` (32 rows) and `enhancement_required_wargear_item` (1 row) were
// checked by hand — every row's own appdata prose already states its "(excluding X)"/"equipped
// with Y" clause inline in the same "only" sentence, so tier 1's word-overlap check already covers
// them; no separate join-based logic needed. `enhancement_datasheet_ability` (6 rows, all the same
// "Deep Strike" core ability) also always has an "only" sentence in prose ("...model with the Deep
// Strike ability only") — tier 1 covers these too, which is why the clause window is sentence-
// bounded rather than requiring the name and "only" to sit immediately adjacent.
// `enhancement_wargear_item_profile` (5 rows — enhancements that GRANT a weapon rather than
// restrict eligibility) is a different question, and it used to be out of scope here: when the
// table held two rows, both were verified by hand and left unchecked. Codex: Orks added three
// more, all shipped with the prose alone — "This model has the following weapon:" and nothing
// after the colon — and no gate could catch it, because appdata's own prose stops at that colon
// too, so the drift check saw our text and theirs agree. It is checked below now: the profile is
// the only place those numbers exist, so the body has to carry them.
//
// Bridged via src/data/sourceIds.json's `enh:det:<detId>:<normName>` key (gen-source-ids.mjs),
// inverted here since we start from the appdata side; skips Combat Patrol rows implicitly (a CP-
// only enhancement was never matched into sourceIds in the first place, since wh11ed carries no CP
// content — see combatPatrolNames() in sync-common.mjs for how the other scripts filter it).
//
// Usage: node scripts/sync-enhancement-restrictions.mjs   (also run as part of `npm run sync`).

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, APPDATA, norm, appdataToMarkup, loadJson, loadModule, sourceIds as sourceIdsMap, table as read, nameOfEn as nameOf, groupBy } from './lib/sync-common.mjs'

const factionKeywordName = new Map(read('faction_keyword.json').map((r) => [r.id, nameOf(r)]))
const keywordName = new Map(read('keyword.json').map((r) => [r.id, nameOf(r)]))
const datasheetName = new Map(read('datasheet.json').map((r) => [r.id, nameOf(r)]))
const enhancementById = new Map(read('enhancement.json').map((e) => [e.id, e]))

const groups = read('enhancement_required_keyword_group.json')
const groupsByEnh = groupBy(groups, 'enhancementId')
const fkByGroup = groupBy(read('enhancement_required_keyword_group_faction_keyword.json'), 'enhancementRequiredKeywordGroupId')
const kwByGroup = groupBy(read('enhancement_required_keyword_group_keyword.json'), 'enhancementRequiredKeywordGroupId')

// A stray placeholder keyword ("DNU" — Do Not Use) sits in appdata's own catalog and is joined to 8
// otherwise-unrelated enhancement_required_keyword_group_keyword rows across two unrelated factions
// (Necrons' C'Tan Shard enhancements, Imperial Agents' named-Assassin enhancements) — an appdata
// data-quality artifact, not a real eligibility name. All 8 of those enhancements' own prose already
// has an "only" clause (so tier 1 handles them and never reaches this filter in practice), but it's
// filtered here defensively in case a future silent case ever joins to it.
const JUNK_KEYWORD_NAMES = new Set(['dnu'])

function namesForGroup(g) {
  if (g.datasheetId) return [datasheetName.get(g.datasheetId)].filter(Boolean)
  const names = []
  for (const r of fkByGroup.get(g.id) || []) names.push(factionKeywordName.get(r.factionKeywordId))
  for (const r of kwByGroup.get(g.id) || []) names.push(keywordName.get(r.keywordId))
  return names.filter((n) => n && !JUNK_KEYWORD_NAMES.has(norm(n)))
}

// --- sourceIds bridge, inverted: appdata enhancement uuid → { slug, detKey, enhName } -----------
const sourceIds = sourceIdsMap() || {}
const enhByUuid = new Map()
for (const [slug, entries] of Object.entries(sourceIds)) {
  for (const [key, uuid] of Object.entries(entries)) {
    const m = key.match(/^enh:(det:[^:]+):(.+)$/)
    if (m) enhByUuid.set(uuid, { slug, detKey: m[1], enhName: m[2] })
  }
}

async function loadFaction(slug) {
  const mod = await loadModule(path.join(ROOT, 'src/data/factions', `${slug}.js`))
  return Object.values(mod || {})[0]?.en || null
}
async function findEnhancement(slug, detKey, enhNormName) {
  const en = await loadFaction(slug)
  const det = (en?.detachments || []).find((d) => `det:${d.id || norm(d.name)}` === detKey)
  if (!det) return { det: null }
  const enh = (det.enhancements || []).find((e) => norm(e.name) === enhNormName)
  return { det, enh: enh || null }
}

// GW's "with the Deep Strike ability"/"equipped with an X" qualifier sits BETWEEN the restricted
// name and the word "only" — so the check window is the whole sentence containing "only", not a
// fixed-length prefix or a name-adjacent-to-"only" pattern. Returns '' if no sentence has "only".
function onlyClause(text) {
  // Some raw appdata rules text is missing the space after a sentence-ending period (e.g. Orks'
  // "Slippery Git": "...MEGA ARMOUR models).This model has..."), so split on a period followed by
  // EITHER whitespace or an immediate capital letter, not just whitespace.
  const sentences = (text || '').split(/(?<=\.)\s*(?=[A-Z])|(?<=\.)\s+/)
  const idx = sentences.findIndex((s) => /\bonly\b/i.test(s))
  return idx === -1 ? '' : sentences.slice(0, idx + 1).join(' ')
}

const STOPWORDS = new Set(['model', 'models', 'unit', 'units', 'only', 'the', 'a', 'an', 'and', 'or', 'with', 'excluding', 'equipped'])
function significantWords(clause) {
  const cleaned = norm(clause).replace(/[^a-z0-9'\-\s]/gi, ' ')
  return [...new Set(cleaned.split(/\s+/).filter((w) => w.length >= 3 && !STOPWORDS.has(w)))]
}
function wordPresent(word, haystackNorm) {
  return new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(haystackNorm)
}
// One confirmed appdata prose typo (missing space): Necrons' "Animus Damper" reads "**C'TAN SHARD
// OF THE VOIDDRAGON** model only" — but the datasheet's own catalog name (datasheet.json) is
// correctly spaced "C'tan Shard of the Void Dragon", matching wh11ed and every other reference to
// it. Same class as the "Nuncio-acquila" appdata self-contradiction documented in
// APPDATA-COVERAGE-PLAN.md's sync-wargear-options section — a verified non-issue, not a wh11ed gap.
const KNOWN_PROSE_TYPO_WORDS = new Set(['voiddragon'])
// Tolerant of the last word's plural form disagreeing (e.g. structural datasheet name "Scout
// Sentinels" vs a prose reference to just "one Sentinel") — used only in the tier-2 structural
// fallback, since tier 1 already compares like-for-like prose.
function nameRe(name) {
  let n = norm(name)
  if (n.endsWith('s')) n = n.slice(0, -1)
  const words = n.split(' ').filter(Boolean).map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  return new RegExp(`\\b${words.join('\\s+')}s?\\b`, 'i')
}

export async function run() {
const flagged = []
const needsReview = []
let checked = 0
let tier1Count = 0
let tier2Count = 0

for (const [enhId, enhGroups] of groupsByEnh) {
  const bridge = enhByUuid.get(enhId)
  if (!bridge) continue // not bridged (likely Combat Patrol-only or a pre-sourceIds name mismatch)

  const { slug, detKey, enhName } = bridge
  const { det, enh } = await findEnhancement(slug, detKey, enhName)
  if (!det) {
    needsReview.push({ slug, detKey, enhName, note: `sourceIds points at ${detKey} but ${slug}.js has no such detachment` })
    continue
  }
  if (!enh) {
    needsReview.push({ slug, detKey, enhName, note: `detachment "${det.name}" has no enhancement named "${enhName}"` })
    continue
  }

  const appdataClause = onlyClause(appdataToMarkup(enhancementById.get(enhId)?.localisations?.en?.rules || ''))
  const wh11edClauseNorm = norm(onlyClause(enh.body || '') || enh.body || '')
  checked++
  const missing = []

  if (appdataClause) {
    // Tier 1: appdata's own prose states the restriction — compare against THAT wording.
    tier1Count++
    const words = significantWords(appdataClause)
    const absent = words.filter((w) => !wordPresent(w, wh11edClauseNorm) && !KNOWN_PROSE_TYPO_WORDS.has(w))
    if (absent.length) missing.push(`appdata's own "only" clause ("${appdataClause.trim()}") has term(s) not found in wh11ed: ${absent.join(', ')}`)
  } else {
    // Tier 2: appdata's prose is silent — reconstruct the expected name(s) from the structural join.
    tier2Count++
    const names = [...new Set(enhGroups.flatMap(namesForGroup))]
    if (!names.length) continue // no faction_keyword/keyword/datasheet join either — nothing to check
    const absent = names.filter((n) => !nameRe(n).test(wh11edClauseNorm))
    if (absent.length) missing.push(`appdata's prose states no restriction at all, but the structural data requires: ${absent.join(', ')} — wh11ed should still state it (see the Veil of Darkness/Scroll of Proclamation precedent)`)
  }

  if (missing.length) flagged.push({ slug, detachment: det.name, enhancement: enh.name, missing })
}

// ── Granted weapons: the profile appdata keeps outside the prose ───────────────────────────────
// A handful of enhancements hand the bearer a weapon. appdata states it structurally (the profile
// table), and the rule's own text ends at the colon — so the body has to spell the profile out,
// the way TL-4ø9 and Orksbane already do. Checked by NUMBERS, not by wording: the name plus every
// characteristic must appear somewhere in the body, in either locale's file.
const profileById = new Map(read('wargear_item_profile.json').map((r) => [r.id, r]))
const abilityName = new Map(read('wargear_ability.json').map((r) => [r.id, nameOf(r)]))
const abilitiesByProfile = groupBy(read('wargear_item_profile_wargear_ability.json'), (r) => r.wargearItemProfileId)
const weaponFlagged = []
let weaponsChecked = 0
for (const row of read('enhancement_wargear_item_profile.json')) {
  const bridge = enhByUuid.get(row.enhancementId)
  if (!bridge) continue
  const { slug, detKey, enhName } = bridge
  const { det, enh } = await findEnhancement(slug, detKey, enhName)
  if (!enh) continue // already reported as a bridging gap above
  const p = profileById.get(row.wargearItemProfileId)
  if (!p) continue
  weaponsChecked++
  const stats = [p.range, p.attacks, p.ballisticSkill || p.weaponSkill, p.strength, p.armourPenetration, p.damage].filter(Boolean)
  const abil = (abilitiesByProfile.get(p.id) || []).map((r) => abilityName.get(r.wargearAbilityId)).filter(Boolean)
  const body = enh.body || ''
  const absent = [nameOf(p), ...stats, ...abil].filter((x) => !body.includes(String(x)))
  if (absent.length) weaponFlagged.push({ slug, detachment: det?.name, enhancement: enh.name, absent })
}

console.log(
  `enhancement restrictions: ${checked} checked (${tier1Count} against appdata's own prose, ${tier2Count} reconstructed from structural data), ${flagged.length} FLAGGED, ${needsReview.length} need manual review (bridging gap).`,
)
if (flagged.length) {
  console.log('\n  ✗ appdata carries an eligibility restriction this enhancement\'s wh11ed body appears to be missing:')
  for (const r of flagged) {
    console.log(`\n    ${r.slug} · ${r.detachment} · "${r.enhancement}"`)
    for (const m of r.missing) console.log(`      ${m}`)
  }
}
console.log(`enhancement granted weapons: ${weaponsChecked} checked, ${weaponFlagged.length} FLAGGED.`)
if (weaponFlagged.length) {
  console.log('\n  ✗ appdata gives this enhancement a weapon profile the wh11ed body does not state:')
  for (const r of weaponFlagged) {
    console.log(`    ${r.slug} · ${r.detachment} · "${r.enhancement}" — missing: ${r.absent.join(', ')}`)
  }
  console.log('    Add it to BOTH src/data/factions/<slug>.js and .../ru/<slug>.js, e.g.:')
  console.log('      ▪ **<Weapon>** [ABILITY] — Range 24", A 3, BS 2+, S 11, AP -2, D D3+2.')
}
if (needsReview.length) {
  console.log('\n  ⚠ Bridging gaps (sourceIds points somewhere that no longer matches wh11ed\'s current data):')
  for (const r of needsReview) console.log(`    ${r.slug} · ${r.detKey} · "${r.enhName}": ${r.note}`)
}
return flagged.length || weaponFlagged.length ? 1 : 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
