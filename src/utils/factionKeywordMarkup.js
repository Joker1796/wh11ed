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

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// `names`: { keyword: [a unit or model name containing it, …] } — optional.
export function factionKeywordPatterns(keywords, names = {}) {
  if (!keywords.length) return null
  // Longest first: "Aspect Warriors" before a shorter keyword it might contain.
  const k = `(?:${[...keywords].sort((a, b) => b.length - a.length).map(escape).join('|')})`
  const endEn = '(?![\\p{L}\\p{N}’\'-])'
  const endRu = '(?![\\p{L}\\p{N}’\'-]|\\s+[A-Z])'
  return {
    names,
    one: new RegExp(`(?<![\\p{L}\\p{N}’'-])${k}${endEn}`, 'gu'),
    en: new RegExp(`(?<![\\p{L}\\p{N}’'-])(${k}(?:(?:,\\s+|,?\\s+(?:or|and)\\s+)${k})*)(?=\\s+(?:units?|models?|keywords?)(?![\\p{L}]))`, 'gu'),
    ru: new RegExp(`(?<![\\p{L}])((?:юнит|модел|слов)[а-яё]*\\s+)(${k}(?:(?:,\\s+|,?\\s+(?:или|и)\\s+)${k})*)${endRu}`, 'gu'),
  }
}

// The name (from `names`) the keyword at `at` in `text` is part of, written out in full, if any.
export function nameAround(text, at, kw, names) {
  for (const name of names[kw] || []) {
    for (let j = name.indexOf(kw); j !== -1; j = name.indexOf(kw, j + 1)) {
      if (at - j >= 0 && text.startsWith(name, at - j)) return name
    }
  }
  return null
}

// Calls `take(keyword, position)` for every keyword standing as one in `text`.
function eachKeyword(text, p, take) {
  const chain = (str, at) => {
    for (const m of str.matchAll(p.one)) if (!nameAround(text, at + m.index, m[0], p.names)) take(m[0], at + m.index)
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
    out += text.slice(from, i) + `<span class="fkw" data-fkw="${kw}">${kw}</span>`
    from = i + kw.length
  }
  return out + text.slice(from)
}
