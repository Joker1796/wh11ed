// Report-only audit: every wh40k-appdata structural wargear choice for a datasheet — the
// tables/loadout_choice(+_set/_wargear_item), limited_wargear_choice(+_set/_wargear_item) +
// wargear_limit, all_model_wargear_choice(+_set/_wargear_item), and
// base_miniature_loadout(+_wargear_option) families — must be reflected somewhere in that
// wh11ed datasheet's text (its `options[]`, `loadout`, `ranged[]`/`melee[]` names, or
// `abilities[]` names).
//
// Why this exists: this is by far the largest source of past manual fixes across the 30-faction
// reconciliation (detached footnotes, wrong option counts, missing options entirely — Boyz,
// Warboss, Kasrkin, Skitarii Rangers, etc., repeated across nearly every faction commit on the
// closed branch — see APPDATA-COVERAGE-PLAN.md). `sync-faction-text.mjs` only fuzzy-diffs
// `wargearRules` prose against appdata's free text; nothing has ever checked the actual
// structural choice/count/limit data. This script does.
//
// Matching: bridged via src/data/sourceIds.json's `ds:<wh11ed-id>` → appdata datasheet uuid
// (never match by bare name — collisions are common, see sync-leader-units.mjs's header). Per
// wh40k-appdata's own SCHEMA.md, `base_miniature_loadout_wargear_option` links through the
// `wargear_option` table (`wargearOptionId` → `wargear_option.wargearItemId`), unlike the other
// three families which reference `wargearItemId` directly.
//
// Approach: NOT a 1:1 option-block match — appdata sometimes splits what wh11ed presents as one
// option, and vice versa (see APPDATA-COVERAGE-PLAN.md's own note on this). Instead, for every
// appdata choice set this script checks (a) presence: each wargear item the set references has
// its name findable *somewhere* in the datasheet's combined text (options + loadout + weapon
// profile names + ability names — appdata's "pick one of ghostaxe/ghostsword" style choice is
// often represented in wh11ed as two separate melee profile rows instead of prose, e.g.
// Wraithblades, so profile names must count as coverage too, or every such datasheet false-flags);
// (b) count/limit: any set/limit/item-count number greater than 1 (a bare "1" is too common to be
// signal — it's every single-item swap) is checked for appearing as a digit anywhere in that same
// text. Both checks are presence-only, not structural — expect noise from merged-profile
// datasheets and Ork-style informal pluralization; false positives need the same manual
// cross-check other sync-*.mjs scripts already require.
//
// Report only — nothing is written (options[] is hand-authored prose in a specific house style;
// a silent auto-write risks EN/RU desync and doesn't match the file's phrasing conventions). Read
// the flagged lines and fix src/data/datasheets/<slug>.js (English source of truth; the RU
// datasheet files carry no separate options text of their own — confirm before editing RU).
//
// Usage: node scripts/sync-wargear-options.mjs   (also run as part of `npm run sync`).

import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, APPDATA, norm, loadJson, combatPatrolNames, loadWh11edDatasheets, sourceIds as sourceIdsMap, table as read, groupBy, escapeRegex, NUMBER_WORDS } from './lib/sync-common.mjs'

const wargearItemName = new Map(read('wargear_item.json').map((r) => [r.id, r?.localisations?.en?.name || '']))

// appdata contradicts itself in three narrow ways, and each one used to be reported as a gap in
// OUR transcription. They are counted separately now, because a report whose every line is a
// non-problem is a report nobody reads.
//
// 1. An item row spells its own name differently from the sentence that offers it —
//    "Nuncio-acquila" against "can be equipped with 1 nuncio aquila" (3 Imperial Agents squads).
//    Matched by NEAR name: one word differing by a single letter, the same tolerance
//    gen-roster-data.mjs's `nearName` applies to the same class of typo. Costs no coverage: it
//    only ever fires on a name that was already about to be reported missing.
// 2. A number the tables state and appdata's own prose never does. A `loadout_choice_set` of
//    "2 arm weapons, duplicates allowed" enumerates legal loadouts, and GW words it as one
//    replace-sentence per hardpoint (both Warhound Titans, Armiger/War Dog Moirax); Death
//    Company Marines with Jump Packs is the known prose-says-1/table-says-2 conflict the roster
//    generator also resolves in favour of the prose. Measured: no number anywhere in the corpus
//    is currently found in our text while missing from appdata's, so this gives up nothing.
// 3. A base loadout row pointing at another datasheet's gear: Blood Angels' Death Company
//    Dreadnought is given BRUTALIS fists and bolt rifles while its own composition sentence says
//    blood fists (the roster generator patches the same row by hand — LOADOUT_ITEM_FIXES).
const optionGroupsByDatasheet = groupBy(read('wargear_option_group.json'), 'datasheetId')
const datasheetProse = new Map(read('datasheet.json').map((r) => [r.id, norm([
  r?.localisations?.en?.unitComposition || '',
  ...(optionGroupsByDatasheet.get(r.id) || []).map((g) => g?.localisations?.en?.instructionText || ''),
].join(' \n '))]))
const proseHas = (uuid, needle) => {
  const prose = datasheetProse.get(uuid) || ''
  return typeof needle === 'number' ? numberFound(needle, prose) : (nameRegex(needle)?.test(prose) ?? false)
}
// One word of the name differing by a single letter, everything else identical — appdata's own
// typo, not a missing option. Deliberately not a general fuzzy match: two real weapons never
// differ by one letter, but "shoota"/"shootas" style plurals are already folded by norm().
const oneLetterApart = (a, b) => {
  if (Math.abs(a.length - b.length) > 1) return false
  let i = 0, j = 0, diff = 0
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue }
    if (++diff > 1) return false
    if (a.length > b.length) i++
    else if (b.length > a.length) j++
    else { i++; j++ }
  }
  return diff + (a.length - i) + (b.length - j) <= 1
}
// Hyphens are folded to spaces on both sides first: appdata writes the item as "Nuncio-acquila"
// and its own sentence as "nuncio aquila", so the word boundary itself is part of the typo.
const nearName = (name, text) => {
  const words = (t) => t.replace(/-/g, ' ').split(/\s+/).map((w) => w.replace(/^[^a-z0-9]+|[^a-z0-9]+$/g, '')).filter(Boolean)
  const want = words(norm(name))
  if (!want.length) return false
  const got = words(text)
  for (let k = 0; k + want.length <= got.length; k++) {
    let off = 0
    let ok = true
    for (let w = 0; w < want.length; w++) {
      const word = got[k + w]
      if (word === want[w]) continue
      if (!off && want[w].length >= 5 && oneLetterApart(want[w], word)) { off = 1; continue }
      ok = false
      break
    }
    if (ok && off) return true
  }
  return false
}
const wargearOptionItem = new Map(read('wargear_option.json').map((r) => [r.id, r.wargearItemId]))

// --- Family 1: loadout_choice_set ------------------------------------------------------------
const loadoutChoicesBySet = groupBy(read('loadout_choice.json'), 'loadoutChoiceSetId')
const loadoutItemsByChoice = groupBy(read('loadout_choice_wargear_item.json'), 'loadoutChoiceId')

// --- Family 2: limited_wargear_choice_set ----------------------------------------------------
const limitedChoicesBySet = groupBy(read('limited_wargear_choice.json'), 'limitedWargearChoiceSetId')
const limitedItemsByChoice = groupBy(read('limited_wargear_choice_wargear_item.json'), 'limitedWargearChoiceId')
const limitsBySet = groupBy(read('wargear_limit.json'), 'limitedWargearChoiceSetId')

// --- Family 3: all_model_wargear_choice_set ---------------------------------------------------
const allModelChoicesBySet = groupBy(read('all_model_wargear_choice.json'), 'allModelWargearChoiceSetId')
const allModelItemsByChoice = groupBy(read('all_model_wargear_choice_wargear_item.json'), 'allModelWargearChoiceId')

// --- Family 4: base_miniature_loadout (default/mandatory equipment, checked against `loadout`) --
const baseOptionsByLoadout = groupBy(read('base_miniature_loadout_wargear_option.json'), 'baseMiniatureLoadoutId')

// Flatten every family into one shape: { items:[{name,count}], numbers:[n,...] } per datasheetId.
// `numbers` only keeps values >1 — a bare 1 is the norm for a single-item swap and would be noise.
function itemsOf(itemRows) {
  return itemRows.map((r) => ({ name: wargearItemName.get(r.wargearItemId) || '', count: r.count || 1 })).filter((i) => i.name)
}

const choiceSetsByDatasheet = new Map() // datasheetId -> [{ items, numbers }]
function addChoiceSet(datasheetId, items, numbers = []) {
  if (!items.length) return
  const arr = choiceSetsByDatasheet.get(datasheetId) || []
  arr.push({ items, numbers: numbers.filter((n) => n != null && n > 1) })
  choiceSetsByDatasheet.set(datasheetId, arr)
}

// Tracks every item name any loadout_choice_set (family 1) references, per datasheet — used below
// to recognize when a limited_wargear_choice_set (family 2) duplicates a family-1 set for the
// exact same items (see the Tau Crisis-suit drone note).
const family1ItemNamesByDatasheet = new Map()
function noteFamily1Items(datasheetId, items) {
  if (!items.length) return
  const set = family1ItemNamesByDatasheet.get(datasheetId) || new Set()
  for (const i of items) set.add(i.name)
  family1ItemNamesByDatasheet.set(datasheetId, set)
}

for (const set of read('loadout_choice_set.json')) {
  const choices = loadoutChoicesBySet.get(set.id) || []
  const items = choices.flatMap((c) => itemsOf(loadoutItemsByChoice.get(c.id) || []))
  // A `miniatureId: null` set is a whole-unit stackable cap (e.g. Aspect Warrior squads' "Aspect
  // Shrine token", capped at 2 for a max-size 10-model unit) that's *also* encoded, scaled by unit
  // size, in a limited_wargear_choice_set for the same item ("for every 5 models, 1 token") —
  // wh11ed states the scaling ratio and leaves this redundant whole-unit total unstated, so don't
  // check this set's number (the item name itself is still checked).
  addChoiceSet(set.datasheetId, items, set.miniatureId ? [set.limit] : [])
  noteFamily1Items(set.datasheetId, items)
}
for (const set of read('limited_wargear_choice_set.json')) {
  const choices = limitedChoicesBySet.get(set.id) || []
  const items = choices.flatMap((c) => itemsOf(limitedItemsByChoice.get(c.id) || []))
  const limits = limitsBySet.get(set.id) || []
  // Multiple wargear_limit rows on one set are scaling brackets for bigger unit sizes (e.g.
  // modelCount 0/choiceLimit 2 *and* modelCount 10/choiceLimit 4 on the same set) — wh11ed states
  // the base ratio ("for every 5 models, up to 2...") and leaves the scaled-up bracket implicit
  // rather than spelling out "10"/"4" too, so only the smallest-modelCount row's numbers are
  // checked (the larger brackets would otherwise false-flag on every scaling squad).
  const base = limits.reduce((min, l) => (min == null || l.modelCount < min.modelCount ? l : min), null)
  // A `miniatureId: null` set here isn't scoped to one miniature type, so its modelCount can count
  // the WHOLE unit (all sub-types combined) rather than one sub-type — a different, legitimate
  // basis, not an error by itself (see APPDATA-SYNC-LESSONS.md lesson 22). Two confirmed cases so
  // far both happen to also carry a `miniatureId: null` loadout_choice_set (family 1) for the exact
  // same items, so skipping the number check when that's true is a safe, cheap way to avoid
  // false-flagging both: (a) Tau Crisis suits' drones — a per-model cap ("up to two… cannot take
  // duplicates") on each real miniature slot, where this set's modelCount 3/choiceLimit 3 for a
  // fixed 3-model unit is just "at most 1 of this type per model" restated as a redundant unit
  // total; (b) imperial-agents' Inquisitorial Agents' Tome-skull — modelCount 6/11 here counts
  // Agents+Gun Servitors combined, which only *happens* to equal the sibling brackets' 5/10
  // Agent-only count because of that datasheet's own composition constraint (a 2nd Gun Servitor
  // requires exactly 10 Agents) — verified by hand, not assumed; don't extend this specific
  // equivalence to a new datasheet without re-deriving it from that datasheet's own composition.
  const family1Names = family1ItemNamesByDatasheet.get(set.datasheetId)
  const isDuplicateOfFamily1 = !set.miniatureId && items.length && items.every((i) => family1Names?.has(i.name))
  const numbers = base && !isDuplicateOfFamily1 ? [base.modelCount, base.choiceLimit, base.duplicateLimit] : []
  addChoiceSet(set.datasheetId, items, numbers)
}
for (const set of read('all_model_wargear_choice_set.json')) {
  const choices = allModelChoicesBySet.get(set.id) || []
  const items = choices.flatMap((c) => itemsOf(allModelItemsByChoice.get(c.id) || []))
  addChoiceSet(set.datasheetId, items)
}

const baseItemsByDatasheet = new Map() // datasheetId -> [{name,count}]
for (const bml of read('base_miniature_loadout.json')) {
  const opts = baseOptionsByLoadout.get(bml.id) || []
  const items = opts
    .map((o) => ({ name: wargearItemName.get(wargearOptionItem.get(o.wargearOptionId)) || '', count: o.count || 1 }))
    .filter((i) => i.name)
  if (!items.length) continue
  const arr = baseItemsByDatasheet.get(bml.datasheetId) || []
  arr.push(...items)
  baseItemsByDatasheet.set(bml.datasheetId, arr)
}

// --- Name/number presence checks --------------------------------------------------------------
// Last word gets an optional plural suffix — wh11ed/Ork-slang text often pluralizes informally
// ("shoota" → "shootas"); this is loose on purpose (see header note on expected noise).
function nameRegex(name) {
  // A handful of unique-wargear names carry a leading article ("The Staff of Ulthamar and
  // witchblade") that wh11ed's prose drops when it's folded into a sentence — strip it before
  // matching, it's never load-bearing for identifying the item.
  const n = norm(name).replace(/^(the|an?)\s+/, '')
  if (!n) return null
  // Some appdata item names are hyphenated compounds ("Close-combat weapon") that wh11ed almost
  // always spells with a plain space ("close combat weapon") — treat hyphen and space as the same
  // separator on both sides of the match, in the name AND in the token join below.
  const parts = n.split(/[\s-]+/).filter(Boolean)
  const lastWord = parts.pop()
  // "battery" → "batteries" is an irregular plural the simple (e?s)? suffix can't produce —
  // accept either the bare word or its -y→-ies form.
  const last = /[^aeiou]y$/i.test(lastWord)
    ? `(?:${escapeRegex(lastWord)}|${escapeRegex(lastWord.slice(0, -1))}ies)`
    : `${escapeRegex(lastWord)}(?:e?s)?`
  const pat = [...parts.map(escapeRegex), last].join('[\\s-]+')
  // Several Ork-slang item names lead with a dropped-letter apostrophe ('Ard Case, 'Eavy lobba) —
  // `\b` never matches there (apostrophe and the preceding space are both non-word chars, so no
  // \w/\W transition exists to anchor on), so use alnum lookaround instead of `\b`.
  return new RegExp(`(?<![a-z0-9])${pat}(?![a-z0-9])`, 'i')
}
// wh11ed sometimes spells a small count as a word, not a digit ("up to two of the following",
// "more than twice") — check both forms before flagging.
function numberFound(n, text) {
  if (new RegExp(`\\b${n}\\b`).test(text)) return true
  if (NUMBER_WORDS[n] && new RegExp(`\\b${NUMBER_WORDS[n]}\\b`).test(text)) return true
  if (n === 2 && /\btwice\b/.test(text)) return true
  return new RegExp(`\\b${n}\\s+times?\\b`).test(text)
}

// norm() folds curly quotes/dashes + case — item names carry both (curly ’, en/em dashes), so
// the searched text needs the same folding or an exact-looking name never matches.
function blobOf(d) {
  return norm(
    [
      ...(d.options || []),
      d.loadout || '',
      ...(d.ranged || []).map((w) => w.name),
      ...(d.melee || []).map((w) => w.name),
      ...(d.abilities || []).map((a) => a.name),
      d.damaged?.text || '',
    ].join('\n'),
  )
}

export async function run() {
// --- sourceIds bridge (`ds:<wh11ed-id>` → appdata uuid) -----------------------------------------
const sourceIds = sourceIdsMap() || {}
const cp = combatPatrolNames()

let scanned = 0
let unbridged = 0
let noAppdataData = 0
const flagged = []
// Structural rows appdata's own prose never states — see datasheetProse above. Reported, not flagged.
const structureOnly = []

// The 5 Codex-sharing Chapters (see CLAUDE.md's "SM-Chapter datasheet dedup") fold
// space-marines.js units back into their own list via loadWh11edDatasheets, but sourceIds.json's
// `ds:` bridge is generated per-file — a shared unit's uuid only lives under sourceIds['space-marines'],
// never re-listed under the Chapter's own entry — so fall back there before calling it unbridged.
const smDsMap = new Map()
for (const [key, uuid] of Object.entries(sourceIds['space-marines'] || {})) {
  if (key.startsWith('ds:')) smDsMap.set(key.slice(3), uuid)
}

for (const [slug, entries] of Object.entries(sourceIds)) {
  const wh11edToUuid = new Map()
  for (const [key, uuid] of Object.entries(entries)) {
    if (key.startsWith('ds:')) wh11edToUuid.set(key.slice(3), uuid)
  }
  if (!wh11edToUuid.size) continue

  const datasheets = await loadWh11edDatasheets(slug)
  for (const d of datasheets) {
    if (cp.datasheets.has(norm(d.name))) continue
    scanned++
    const uuid = wh11edToUuid.get(d.id) || smDsMap.get(d.id)
    if (!uuid) {
      unbridged++
      continue
    }
    const choiceSets = choiceSetsByDatasheet.get(uuid) || []
    const baseItems = baseItemsByDatasheet.get(uuid) || []
    if (!choiceSets.length && !baseItems.length) {
      noAppdataData++
      continue
    }

    const blob = blobOf(d)
    const loadoutText = d.loadout ? norm(d.loadout) : blob // fall back to the full blob if `loadout` is empty
    const missing = []

    for (const set of choiceSets) {
      for (const item of set.items) {
        const re = nameRegex(item.name)
        if (re && !re.test(blob)) {
          if (nearName(item.name, blob)) structureOnly.push(`${slug} · ${d.name}: item "${item.name}" — appdata's own sentence spells it differently, and that spelling is what we carry`)
          else missing.push(`item "${item.name}" not found`)
        }
      }
      for (const n of set.numbers) {
        if (!numberFound(n, blob)) {
          if (proseHas(uuid, n)) missing.push(`number "${n}" (set limit/model-count) not found`)
          else structureOnly.push(`${slug} · ${d.name}: number "${n}" — appdata's own prose never states it either`)
        }
      }
    }
    for (const item of baseItems) {
      const re = nameRegex(item.name)
      if (re && !re.test(loadoutText)) {
        if (proseHas(uuid, item.name)) missing.push(`base-loadout item "${item.name}" not found in \`loadout\``)
        else structureOnly.push(`${slug} · ${d.name}: base-loadout item "${item.name}" — appdata's own composition sentence does not name it either`)
      }
    }

    if (missing.length) flagged.push({ slug, name: d.name, missing: [...new Set(missing)] })
  }
}

console.log(
  `wargear structural options: ${scanned} wh11ed datasheets scanned, ${unbridged} not bridged by sourceIds, ${noAppdataData} have no appdata wargear-choice data, ${flagged.length} FLAGGED, ${structureOnly.length} structure-only (appdata's tables disagree with appdata's own prose).`,
)
if (structureOnly.length) {
  console.log('\n  · structure-only — appdata records it but never says it; wh11ed follows the prose:')
  for (const m of [...new Set(structureOnly)]) console.log(`      ${m}`)
}
if (flagged.length) {
  console.log('\n  ✗ appdata carries a wargear choice/limit this datasheet\'s wh11ed text appears to be missing:')
  for (const r of flagged) {
    console.log(`\n    ${r.slug} · ${r.name}`)
    for (const m of r.missing) console.log(`      ${m}`)
  }
  console.log(
    '\n  Check src/data/datasheets/<slug>.js `options`/`loadout` — this is presence-only (not a\n  structural match), so also cross-check by hand before editing: merged-profile datasheets and\n  informal Ork-style pluralization are known sources of noise here (see header comment).',
  )
}
return flagged.length ? 1 : 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
