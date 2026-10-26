// A unit an ability brings into the game, named where the text brings it in — "add one new Spore
// Mines unit", «добавить один новый юнит Ripper Swarms» — becomes a tap that opens that unit's card
// over the page (App.vue, `.unit-link`): a player wants its characteristics at the table, and a link
// to its page would take them out of the roster or the game (a player's report, 2026-10-17).
//
// Only there, not wherever the name stands: "Seed Spore Mines" is an ability's name, and the Spore
// Mines' own text speaks of itself. The names are generated with the datasheet index
// (`spawnUnits` in src/data/factionUnitKeywords.js, from the same spawnPhrases the roster's
// `spawns` are read with). Matched on the folded text, one character for one (foldName.js), so a
// position found is a position in the original; case is free, appdata writes SPORE MINES as well.

import { foldChars } from '../core/shared/foldName.js'

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** @param {Record<string, [string, string]>} units name → [faction slug, datasheet id] */
export function unitLinkPatterns(units) {
  const names = Object.keys(units || {})
  if (!names.length) return null
  const alt = names.map((n) => escape(foldChars(n))).sort((a, b) => b.length - a.length).join('|')
  return {
    byName: new Map(names.map((n) => [foldChars(n).toLowerCase(), units[n]])),
    en: new RegExp(`(?<![\\p{L}])new\\s+(?:<strong>)?(${alt})(?=(?:</strong>)?\\s+units?(?![\\p{L}]))`, 'giu'),
    ru: new RegExp(`(?<![\\p{L}])нов[а-яё]*\\s+юнит[а-яё]*\\s+(?:<strong>)?(${alt})(?![\\p{L}])`, 'giu'),
  }
}

/** Every such name in `text`: [[slug, id, index, length], …]. */
export function unitLinksAt(text, p) {
  if (!p || !text) return []
  const folded = foldChars(text)
  const found = []
  for (const re of [p.en, p.ru]) {
    for (const m of folded.matchAll(re)) {
      const target = p.byName.get(m[1].toLowerCase())
      if (target) found.push([target[0], target[1], m.index + m[0].length - m[1].length, m[1].length])
    }
  }
  return found.sort((a, b) => a[2] - b[2])
}

/** `text` with each such name wrapped as a `.unit-link` span naming its sheet. */
export function markUnitLinks(text, p) {
  const at = unitLinksAt(text, p)
  if (!at.length) return text
  let out = ''
  let from = 0
  for (const [slug, id, i, len] of at) {
    if (i < from) continue
    out += text.slice(from, i) + `<span class="unit-link" data-slug="${slug}" data-unit="${id}">${text.slice(i, i + len)}</span>`
    from = i + len
  }
  return out + text.slice(from)
}
