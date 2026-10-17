import { foldChars } from '../../src/utils/foldName.js'

// What a wargear group is CONDITIONED on: "[if …] not equipped with X" / "equipped with X" — the
// item phrase and whether it is negated, or null. Read off the folded text: appdata types "1
// Tempestus Scion equipped with a hot‐shot lasgun" with U+2010, and an unfolded read found no
// item there, so that group lost the condition its plain-hyphen twin (the Veteran Guardsman's
// standard) carries (2026-10-17). `src/utils/proseReaders.test.js` holds every prose reader to that.
const NOT_EQ_RE = /\bnot equipped with (?:a |an |1 |one )?([a-z][a-z' -]*?)(?:[,.]|\s+(?:it|its|can)\b)/i
const EQ_RE = /\bequipped with (?:a |an |1 |one )?([a-z][a-z' -]*?)(?:[,.]|\s+(?:it|its|can)\b)/i

/** @param {string} text @returns {{ item: string, negated: boolean } | null} */
export function equippedCondition(text) {
  const t = foldChars(text)
  const not = t.match(NOT_EQ_RE)
  if (not) return { item: not[1], negated: true }
  const eq = t.match(EQ_RE)
  return eq ? { item: eq[1], negated: false } : null
}
