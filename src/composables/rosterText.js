// @ts-check
// A roster in words, for the screens: an entry's summary line and an issue's sentence. The facts come
// from the rules core (core/roster — size, model count, the issue and its params); the words are the
// app's (ui.js labels, handed in), so they live here and not in the core.
import { sizeOf, modelCount } from '../core/roster/rosterEngine.js'

/** @typedef {import('../core/shared/roster.types.js').RosterUnit} RosterUnit */
/** @typedef {import('../core/shared/roster.types.js').RosterIssue} RosterIssue */
/** The entry a row is drawn for. @typedef {Partial<import('../core/shared/roster.types.js').RosterEntry>} EntryLike */

// A one-line summary of an entry's size and enhancement for its list row (the read-only view's).
// Every noun is passed in: callers pass their current locale's `rosterModelsLabel`/`rosterWarlord`.
//
// No count of wargear picks (until 2026-10-27, "1 улучшение"): it said nothing about what was
// picked, and in Russian it read as an enhancement — on a bodyguard row, right under the leader
// whose row named the real one (owner).
//
// The Warlord used to be a bare '★' here. The star now means "I own this model" elsewhere in the
// app (useCollection.js), and a lone symbol on its own line was never decodable anyway — the word
// is both unambiguous and free of the glyph-coverage roulette a flag character would bring.
/**
 * @param {EntryLike} e
 * @param {RosterUnit | null | undefined} def
 * @param {string | ((n: number) => string)} modelsLabel
 * @param {string} [warlordLabel]
 * @returns {string}
 */
export function entrySummary(e, def, modelsLabel, warlordLabel = '') {
  const size = sizeOf(def, e)
  if (!def || !size) return ''
  const n = modelCount(def, e)
  const parts = []
  if (e.warlord && warlordLabel) parts.push(warlordLabel)
  // A label may be a function of the count (the caller's plural forms: «2 улучшения», not «2 улучшений»).
  /** @param {number} k @param {string | ((n: number) => string)} l */
  const count = (k, l) => (typeof l === 'function' ? l(k) : `${k} ${l}`)
  if (size.per[1] > 1) parts.push(count(n, modelsLabel))
  if (e.enh) parts.push(e.enh)
  return parts.join(' · ')
}

// An issue in words: its `issue_<code>` template from ui.js (handed in) with the params filled in.
// The issues dialog and the save-time disposition prompt read it.
/**
 * @param {RosterIssue} iss
 * @param {Record<string, string>} labels
 * @returns {string}
 */
export function issueText(iss, labels) {
  const tpl = labels[`issue_${iss.code}`] || iss.code
  const p = iss.params || {}
  return tpl.replace(/\{(\w+)\}/g, (_, k) => String(p[k] ?? ''))
}
