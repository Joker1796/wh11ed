// @ts-check
// Combat Doctrines a unit has from its RULES rather than from the army's pick (Codex: Space Marines,
// 11th edition, and the five Chapters sharing its army rule). Read from the sentences themselves,
// not from a list of names, so the next codex's wording is either read or fails the test beside
// this file. Pure: the caller hands in the texts an attached unit carries.
//
// What the rules say, and what this answers:
//   "The assault doctrine, devastator doctrine and tactical doctrine are active for this unit."
//       (Calgar, Guilliman, Logan Grimnar)             → all three PROVEN, the unit holds three
//   "The tactical doctrine is active for this unit in addition to any other combat doctrine."
//       (Adept of the Codex, Tactical Insight, Student of the Codex, Dante, Wrath of Angels)
//                                                      → that one PROVEN, room for one more
//   "At the start of each phase, the assault doctrine is active for this unit. The devastator/
//    tactical doctrine cannot be active for this unit." (Death Company)
//                                                      → assault PROVEN, the other two FORBIDDEN
//   "…active for this unit in addition to any other combat doctrine until the start of your next
//    Command phase." (Mephiston, Lion El'Jonson, the Tome of Ectoclades)
//                                                      → nothing proven (the player switches it),
//                                                        but the unit may hold more at once
//   "That combat doctrine is active for that unit in addition to any other…" (Guilliman's Author of
//    the Codex, on ANOTHER unit within 12")           → every unit of the army may hold two: which
//                                                        one he picked is the player's to say
//   "select one combat doctrine to be active for this unit…" (Strategic Acumen, stratagems)
//                                                      → an ordinary per-unit switch: nothing here
// A rule that only ASKS ("If the assault doctrine is active for this unit…") is not read at all.

/** @typedef {'assault' | 'devastator' | 'tactical'} Doctrine */
/**
 * What one rule text says about doctrines.
 * @typedef {object} DoctrineRule
 * @property {Doctrine[]} proves     active, always (no window)
 * @property {Doctrine[]} forbids    can never be active
 * @property {number} limit          how many the unit may hold at once (1 = no change)
 * @property {'self' | 'other'} on   this unit, or a unit the rule selects elsewhere
 * @property {string | null} keyword the units a detachment rule names ("SANGUINARY GUARD units")
 * @property {boolean} select        an ordinary "select one doctrine for this unit" — a switch
 */

import { foldChars } from '../core/shared/foldName.js'

const NAMES = /** @type {Doctrine[]} */ (['assault', 'devastator', 'tactical'])
export const doctrineCond = (/** @type {Doctrine} */ d) => `doctrine-${d}`

// The text the reader sees, without the markup: a gloss token keeps its label, emphasis goes, and
// appdata's typographic hyphens and apostrophes read as plain ones.
/** @param {string | null | undefined} text */
const plain = (text) => foldChars(String(text || '')
  .replace(/\[gloss:[^:\]]+:([^\]]+)\]/g, '$1')
  .replace(/\*\*|__/g, ''))
  .replace(/\s+/g, ' ')

/** @param {string} s @returns {Doctrine[]} */
const namesIn = (s) => NAMES.filter((d) => new RegExp(`\\b${d}\\b`, 'i').test(s))

/**
 * @param {string | null | undefined} text
 * @returns {DoctrineRule | null} null when the text says nothing about a doctrine being active
 */
export function readDoctrineRule(text) {
  const t = plain(text)
  if (!/doctrine/i.test(t)) return null
  // "Friendly DEATH COMPANY units have the following: ▪ … this unit" — the rule's own subject.
  const subject = t.match(/Friendly ([A-Z][A-Z'’ -]*[A-Z]) units (?:have|with)/)?.[1] || null
  /** @type {DoctrineRule} */
  const out = { proves: [], forbids: [], limit: 1, on: 'self', keyword: subject, select: false }
  let read = false
  for (const s of t.split(/(?<=\.)\s+|▪/).map((x) => x.trim()).filter(Boolean)) {
    if (!/doctrine/i.test(s)) continue
    if (/\bif the [^.]*doctrines? (?:is|are) active/i.test(s)) continue
    if (/doctrines? cannot be active/i.test(s)) {
      out.forbids.push(...namesIn(s.split(/cannot/i)[0]))
      read = true
      continue
    }
    const inAddition = /in addition to any other/i.test(s)
    // A doctrine the player picks: for this unit (an ordinary switch), or for another unit — which
    // only matters here when it is "in addition".
    if (/select (?:one|up to one)[^.]*combat doctrine|(?:that|the selected) combat doctrine is active|that doctrine is active/i.test(s)) {
      read = true
      if (inAddition) {
        out.limit = Math.max(out.limit, 2)
        if (/active for that unit/i.test(s)) out.on = 'other'
      } else out.select = true
      continue
    }
    const m = s.match(/^(.*?)\b(?:is|are) active for (this unit|your unit|([A-Z][A-Z'’ -]*[A-Z]) units)/i)
    if (!m) continue
    const names = namesIn(m[1])
    if (!names.length) continue
    read = true
    if (m[3]) out.keyword = m[3]
    const temporary = /\buntil\b/i.test(s)
    out.limit = Math.max(out.limit, names.length === NAMES.length ? NAMES.length : names.length + (inAddition ? 1 : 0))
    if (!temporary) out.proves.push(...names)
  }
  return read ? out : null
}

/**
 * Everything the texts an attached unit carries say, put together. `texts` are the rules of its
 * own models (datasheet abilities, the options of an ability set, wargear, enhancements); `detTexts`
 * the detachment rules, which bind only units with the keyword they name — `hasKeyword` answers that
 * against the attached unit. `armyTexts` are every unit's rules, for the ones that act on ANOTHER unit.
 * @param {{ texts?: string[], detTexts?: string[], armyTexts?: string[], hasKeyword?: (kw: string) => boolean }} src
 * @returns {{ proves: Set<string>, forbids: Set<string>, limit: number }}
 */
export function unitDoctrines({ texts = [], detTexts = [], armyTexts = [], hasKeyword = () => false }) {
  const proves = new Set()
  const forbids = new Set()
  let limit = 1
  /** @param {DoctrineRule | null} r */
  const take = (r) => {
    if (!r) return
    for (const d of r.proves) proves.add(doctrineCond(d))
    for (const d of r.forbids) forbids.add(doctrineCond(d))
    limit = Math.max(limit, r.limit)
  }
  for (const text of texts) {
    const r = readDoctrineRule(text)
    if (r && r.on === 'self') take(r)
  }
  for (const text of detTexts) {
    const r = readDoctrineRule(text)
    if (r && r.keyword && hasKeyword(r.keyword)) take(r)
  }
  for (const text of armyTexts) {
    const r = readDoctrineRule(text)
    if (r?.on === 'other') limit = Math.max(limit, r.limit)
  }
  // A doctrine the rules forbid is never proven, whatever else says so ("regardless of any other
  // rules" — Sanguinius' Fury), and the room it would have taken is not room the unit has.
  for (const id of forbids) proves.delete(id)
  return { proves, forbids, limit: Math.min(limit, NAMES.length - forbids.size) }
}
