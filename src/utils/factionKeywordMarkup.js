// A unit keyword of a faction's own — ENDLESS MULTITUDE, SYNAPSE, KHORNE — named in rule prose:
// "one Endless Multitude unit from your army", «юнит Endless Multitude вашей армии». The data
// writes these as plain Title Case words, so they are found here rather than marked by hand, and
// a tap on one lists the units that carry it (useFactionKeywordUnits.js, player request
// 2026-09-29).
//
// A keyword counts only where it stands as one: right before "unit/model/keyword" in English,
// right after «юнит…/модел…/слов…» in Russian, alone or in a list ("Khorne or Nurgle unit",
// «юнит Anhrathe или Aspect Warriors»). The same words are ordinary prose elsewhere — "Synapse
// Range" is a rule, "Terminator armour" is armour — and the neighbour is what tells them apart.
// A keyword that is part of a unit's or model's name written out in full is that name, not the
// keyword: "Khorne Berzerkers unit", "Lord on Juggernaut model", «модель Beasts of Nurgle» —
// `names` carries, per keyword, the names that contain it. A Russian keyword followed by another
// capitalised Latin word is the start of a name the list may not know, and is left alone too.
//
// Shared by the renderer (useRenderInline.js) and the generator that decides which keywords are
// worth listing (scripts/gen-datasheet-index.mjs), so the two can never disagree.

import { foldChars } from '../core/shared/foldName.js'

// Read folded (foldName.js): appdata types "Shield‑Captain" and "Grav‑tank" with U+2011, the
// keyword list carries the plain hyphen. One character for one, so positions found in the folded
// text are positions in the original (proseReaders.test.js).

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// `names`: { keyword: [a unit or model name containing it, …] } — optional.
export function factionKeywordPatterns(keywords, names = {}) {
  if (!keywords.length) return null
  // Longest first: "Aspect Warriors" before a shorter keyword it might contain.
  const k = `(?:${[...keywords].map(foldChars).sort((a, b) => b.length - a.length).map(escape).join('|')})`
  const endEn = '(?![\\p{L}\\p{N}’\'-])'
  const endRu = '(?![\\p{L}\\p{N}’\'-]|\\s+[A-Z])'
  return {
    names,
    // The keyword as the list spells it, from the folded spelling the patterns match.
    spelled: new Map(keywords.map((kw) => [foldChars(kw), kw])),
    one: new RegExp(`(?<![\\p{L}\\p{N}’'-])${k}${endEn}`, 'gu'),
    en: new RegExp(`(?<![\\p{L}\\p{N}’'-])(${k}(?:(?:,\\s+|,?\\s+(?:or|and)\\s+)${k})*)(?=\\s+(?:units?|models?|keywords?)(?![\\p{L}]))`, 'gu'),
    ru: new RegExp(`(?<![\\p{L}])((?:юнит|модел|слов)[а-яё]*\\s+)(${k}(?:(?:,\\s+|,?\\s+(?:или|и)\\s+)${k})*)${endRu}`, 'gu'),
  }
}

// The name (from `names`) the keyword at `at` in `text` is part of, written out in full, if any.
export function nameAround(text, at, kw, names) {
  const t = foldChars(text)
  const k = foldChars(kw)
  for (const name of names[kw] || []) {
    const n = foldChars(name)
    for (let j = n.indexOf(k); j !== -1; j = n.indexOf(k, j + 1)) {
      if (at - j >= 0 && t.startsWith(n, at - j)) return name
    }
  }
  return null
}

// Calls `take(keyword, position)` for every keyword standing as one in `text`.
function eachKeyword(raw, p, take) {
  const text = foldChars(raw)
  const chain = (str, at) => {
    for (const m of str.matchAll(p.one)) {
      const kw = p.spelled.get(m[0]) ?? m[0]
      if (!nameAround(text, at + m.index, kw, p.names)) take(kw, at + m.index)
    }
  }
  for (const m of text.matchAll(p.en)) chain(m[1], m.index)
  for (const m of text.matchAll(p.ru)) chain(m[2], m.index + m[1].length)
}

// Every keyword the patterns find standing as one in `text`, with where: [[keyword, index], …].
export function factionKeywordsAt(text, p) {
  const found = []
  if (p && text) eachKeyword(text, p, (kw, at) => found.push([kw, at]))
  return found
}

// `text` with each such keyword wrapped as a `.fkw` span naming it (App.vue opens the units).
export function markFactionKeywords(text, p) {
  if (!p || !text) return text
  const at = factionKeywordsAt(text, p)
  if (!at.length) return text
  let out = ''
  let from = 0
  for (const [kw, i] of at.sort((a, b) => a[1] - b[1])) {
    if (i < from) continue
    out += text.slice(from, i) + `<span class="fkw" data-fkw="${kw}">${text.slice(i, i + kw.length)}</span>`
    from = i + kw.length
  }
  return out + text.slice(from)
}
