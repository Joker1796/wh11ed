import { foldChars } from '../shared/foldName.js'

// A weapon tag, or a core ability named with its number, as printed → the ability it is an
// instance of. Numbers, dice, `X+`, a distance and a `: KEYWORD` scope are parameters of one
// ability, not abilities of their own: [SUSTAINED HITS 2], [MELTA D3], [ANTI-PSYKER 2+],
// [LETHAL HITS: VEHICLE], Scouts 6".
//
// It is what a tap looks up (useKeywordPopover.js) and what `npm run wtags` checks against, so the
// two agree on what a tag IS. Until 2026-10-16 the tap matched the tag's START against the core
// list instead, with no word boundary: [PSYCHIC ASSASSIN] (the Culexus Assassin's own ability)
// opened [PSYCHIC] (a player's report).
export function baseTag(tag) {
  let t = foldChars(tag).toUpperCase().trim()
  t = t.split(':')[0].trim()
  if (t.startsWith('ANTI')) return 'ANTI'
  t = t.replace(/\s+(\d+|D\d+|\d*D\d+\+\d+|\d+\+|X|\d+(\\?"|”|″))$/i, '')
  return t.trim()
}

// Letters only, so "C'TAN POWER" meets "C’tan Powers" and [PLASMA WARHEAD] meets "Plasma Warhead".
export const foldTag = (s) => foldChars(s).toUpperCase().replace(/[^A-Z']+/g, ' ').trim()

/**
 * The datasheet's own ability a weapon tag stands for — [PSYCHIC ASSASSIN], [CONVERSION],
 * [PLASMA WARHEAD]: abilities GW prints on the sheet, not in the Core Rules. By name, singular or
 * plural, over the sheet's ability lists (the localized sheet, so the text is the reader's).
 * @param {string} tag
 * @param {{ name?: string, nameEn?: string, text?: string }[]} rules
 */
export function sheetRuleForTag(tag, rules) {
  const want = foldTag(baseTag(tag))
  if (!want) return null
  // By the ENGLISH name only: a Russian sheet renames the header and keeps the original in
  // `nameEn` (localize.js), and a Russian header folded to Latin letters is not a name at all —
  // "Гипнотический взгляд (Psychic)" folds to "PSYCHIC" and took over the core [PSYCHIC] tag.
  return rules.find((r) => {
    const n = foldTag(r?.nameEn || r?.name || '')
    return r?.text && n && (n === want || n === `${want}S` || `${n}S` === want)
  }) || null
}
