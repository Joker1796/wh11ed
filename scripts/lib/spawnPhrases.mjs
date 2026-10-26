import { foldChars } from '../../src/core/shared/foldName.js'

// The units an ability brings into the game, by the name it gives them: "you can add one new
// **SPORE MINES** unit to your army" → ["SPORE MINES"]. Only a capitalised name counts — "a new
// unit", "a new enemy unit", "a new Order is issued to this unit" name nobody. Read folded (a
// U+2011 hyphen is a hyphen, proseReaders.test.js) with the bold and the appdata <b> taken off.
const NEW_UNIT = /\bnew\s+([A-Z][A-Za-z'-]*(?:\s+[A-Z][A-Za-z'-]*)*)\s+units?\b/g

/** @param {string} text @returns {string[]} */
export function spawnPhrases(text) {
  const plain = foldChars(text).replace(/\*\*|<\/?b>/g, '')
  return [...plain.matchAll(NEW_UNIT)].map((m) => m[1])
}
