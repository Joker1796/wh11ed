import { foldChars } from '../../src/core/shared/foldName.js'

// What a wargear group is CONDITIONED on: "[if …] not equipped with X" / "equipped with X" — the
// items named and whether the sentence negates them, or null. Read off the folded text: appdata
// types "1 Tempestus Scion equipped with a hot‐shot lasgun" with U+2010, and an unfolded read found
// no item there, so that group lost the condition its plain-hyphen twin (the Veteran Guardsman's
// standard) carries (2026-10-17). `src/utils/proseReaders.test.js` holds every prose reader to that.
//
// Several items, joined: "equipped with a plasma pistol and a power weapon" (the Canoness's rod of
// office — read as one item called "plasma pistol and a power weapon", which names nothing, and
// the group came out with no condition at all: a player's report, 2026-10-17), "not equipped with
// either a HYLas rotary cannon or an ion beamer". Positive, every item must be carried; negated,
// none of them — "and" and "or" ask the same thing of the items, so `items` is all of them.
//
// "This model CAN BE equipped with 1 storm bolter" is the group's own offer, not a condition: it
// was read as one until the same day (harmless while no other group gave the item, a false link
// where one did), so a match right after "can be" / "can each be" is skipped — and after "cannot
// be", a footnote's limit ("cannot be equipped with more than one bellatus reaper chainsword").
const ITEM = String.raw`(?:either )?(?:a |an |1 |one )?([a-z][a-z' -]*?)(?:[,.]|\s+(?:it|its|can)\b)`
const NOT_EQ_RE = new RegExp(String.raw`\bnot equipped with ${ITEM}`, 'i')
const EQ_RE = new RegExp(String.raw`(?<!\bcan(?:not)?\s+(?:each\s+)?be\s+)\bequipped with ${ITEM}`, 'i')
const JOIN = /\s+(?:and|or)\s+(?:a |an |1 |one )?/i

/** @param {string} text @returns {{ items: string[], negated: boolean } | null} */
export function equippedCondition(text) {
  const t = foldChars(text)
  const not = t.match(NOT_EQ_RE)
  const m = not || t.match(EQ_RE)
  return m ? { items: m[1].split(JOIN).map((s) => s.trim()).filter(Boolean), negated: !!not } : null
}
