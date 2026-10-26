// One spelling for a name, so the same unit, weapon or rule from two sources compares equal.
//
// GW's data spells one name several ways, and not consistently even within a source: appdata
// writes "Shield‑Captain" with a non-breaking hyphen (U+2011) where the Munitorum Field Manual
// writes "Shield-Captain", "Hot‐shot long‐las" with U+2010, "Hell’s Last" with a typographic
// apostrophe where another table has "Hell's Last"; a weapon's profile is "Plasma pistol –
// standard" in one sheet and "- standard" in the next. Every matcher used to fold its own subset
// of these — 2026-10-15 a match that folded apostrophes but not hyphens kept seven Custodes
// sheets off their MFM price tiers, and the unit search could not find "grav-tank".
// `src/core/shared/foldName.test.js` fails on a name matcher written anywhere else.
// A READER of rule prose (a regex over raw text) folds its input with `foldChars` too, and
// `src/utils/proseReaders.test.js` holds each one to reading a string and its folded copy alike.

const APOSTROPHES = /[’‘ʼ`´′‛]/g
// Every dash and hyphen (Unicode's Pd class: U+2010 hyphen, U+2011 non-breaking, en/em dash…),
// the minus sign and the soft hyphen.
const DASHES = /[\p{Pd}\u2212\u00ad]/gu
// No-break and narrow no-break spaces.
const SPACES = /[\u00a0\u202f\u2007]/g

/**
 * The character-level fold alone — one character for one, so an index into the result is an index
 * into the original (search snippets slice the original by positions found in the folded copy).
 * Case is kept.
 * @param {unknown} s
 */
export function foldChars(s) {
  return String(s ?? '').replace(APOSTROPHES, "'").replace(DASHES, '-').replace(SPACES, ' ')
}

/**
 * The key two names are compared by: the character fold, lower case, runs of space collapsed.
 * @param {unknown} s
 */
export function foldName(s) {
  return foldChars(s).toLowerCase().replace(/\s+/g, ' ').trim()
}
