import { ref } from 'vue'

// Finding a unit by what it HAS rather than what it is called: its ability names (its own,
// wargear, core, the faction rule — EN, and RU where the overlay renames the header) and its
// keywords. One matcher for the three unit searches — the global palette (useSearch.js), the
// faction's datasheet grid and the roster builder's catalogue — so "deep strike" finds the same
// units in all three.
//
// The data is src/data/datasheetTagIndex.js (scripts/gen-datasheet-index.mjs), a chunk of its own,
// dynamic-imported the first time a query is long enough to use it. `tagVersion` ticks when it
// arrives: a computed that calls unitTagHit() re-runs then, so results fill in mid-typing.

// Below three characters a tag search matches half of every faction ("in" → Infantry, Leader…).
export const TAG_MIN = 3

// Case-, ё- and apostrophe-blind, like the palette's name matching: the data spells T’au and
// Keep Huntin’! with the typographic ’ nobody types.
export function foldName(s) {
  return s.toLowerCase().replace(/ё/g, 'е').replace(/[’'`]/g, '')
}

// A query matches a text when every one of its words is in it, in any order: the RU names put
// the words where Russian puts them ("сционы Темпестус" for Tempestus Scions), and a player types
// them in either order. A Russian word is matched without its case ending, so "сционов" finds
// "сционы" and "орков" finds "орки". A player's report (2026-10-09): "темпестус сционов" found
// nothing, in the builder or anywhere else. One answer for every unit search that uses this.
const RU_ENDING = /(ами|ями|ого|его|ому|ему|ыми|ими|ов|ев|ей|ам|ям|ах|ях|ой|ый|ий|ая|яя|ое|ее|ые|ие|ую|юю|ом|ем|а|я|ы|и|у|ю|о|е|ь)$/
export function queryWords(q) {
  return foldName(q).split(/[\s\-–—]+/).filter(Boolean).map((w) => {
    if (!/[а-я]/.test(w)) return w
    // Short words keep their ending: «газя» is a nickname, not «газ» + a case.
    if (w.length < 5) return w
    const stem = w.replace(RU_ENDING, '')
    return stem.length >= 3 ? stem : w
  })
}
export function wordsIn(text, words) {
  if (!text || !words.length) return false
  const t = foldName(text)
  return words.every((w) => t.includes(w))
}

let tagIndex = null
let promise = null
const tagVersion = ref(0)

export function preloadDatasheetTags() {
  promise ??= import('../data/datasheetTagIndex.js').then((m) => {
    // Folded once here, not on every keystroke.
    tagIndex = {}
    for (const [slug, [table, byUnit]] of Object.entries(m.datasheetTagIndex)) {
      tagIndex[slug] = { table, folded: table.map(foldName), byUnit }
    }
    tagVersion.value++
  })
  return promise
}

// The first of the unit's tags that contains the (already folded) query, or null. Also null while
// the chunk is still on its way, or for a query too short to be one — the caller then matches by
// name alone, as it did before tags existed.
export function unitTagHit(slug, unitId, q) {
  void tagVersion.value
  if (!tagIndex || q.length < TAG_MIN) return null
  const f = tagIndex[slug]
  const idx = f?.byUnit[unitId]
  if (!idx) return null
  const words = queryWords(q)
  for (const i of idx) if (words.every((w) => f.folded[i].includes(w))) return f.table[i]
  return null
}
