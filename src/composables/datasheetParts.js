// The datasheet's derived parts, as pure functions — shared by the two renderings of a card:
// DatasheetCard (the screen: faction pages, modals, Combat Patrol) and RosterPrintCard (paper).
// The print card is a different TYPOGRAPHY of the same sheet, not a different reading of it, and
// this module is what enforces that: which core abilities are granted rather than printed, which
// keywords need a footnote, how the faction keywords get bolded inside rule text — decided once,
// here, whatever the card is drawn on.

// The Core line is a comma-separated list ("Deep Strike, Leader") — split for rendering each
// ability as its own keyword.
export function corePartsOf(sheet) {
  return sheet?.core ? sheet.core.split(/,\s*/) : []
}

// Core abilities a rule granted (a Hospitaller's Feel No Pain, the Triumph's aura), minus any the
// sheet already prints — a unit with its own Feel No Pain 5+ does not gain a second one.
export function extraCoreOf(sheet, grantedCore) {
  const printed = new Set(corePartsOf(sheet).map((c) => c.toLowerCase()))
  const seen = new Set()
  return (grantedCore || []).filter((g) => {
    const key = String(g.ability).toLowerCase()
    if (printed.has(key) || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

// The faction line is a comma-separated list too ("Oath of Moment, Curse of the Wulfen").
export function factionPartsOf(sheet) {
  return sheet?.faction ? sheet.faction.split(/,\s*/) : []
}

// Per-model keyword split (e.g. The Silent King) — sheet.keywordsByModel is [{ model, list }];
// falls back to a single unlabelled group for the common flat-array case.
export function keywordGroupsOf(sheet) {
  return sheet?.keywordsByModel ? sheet.keywordsByModel : [{ model: null, list: sheet?.keywords || [] }]
}

// Rule-granted keywords appended after the printed ones, minus any the sheet already prints in
// any model group — a grant never doubles a printed keyword.
export function extraKeywordsOf(sheet, grantedKeywords) {
  const printed = new Set(keywordGroupsOf(sheet).flatMap((g) => g.list))
  return (grantedKeywords || []).filter((g) => !printed.has(g.kw))
}

// One footnote line per distinct source, grouping every granted keyword that shares it — so e.g.
// Deathwing/Ravenwing (both roster-wide) collapse into a single line instead of repeating the
// same sentence twice. `extra` folds its caveat into the note string itself, so an `extra` grant
// never silently merges with a plain one that happens to share the base sentence.
export function keywordNotesOf(extraKeywords, labels) {
  const groups = new Map()
  for (const g of extraKeywords) {
    let note = g.detName
      ? labels.dsKeywordGrantedByDetachment.replace('{det}', g.detName)
      : labels.dsKeywordGrantedByFaction
    if (g.extra) note += ' ' + labels.dsKeywordExtraCondition
    const kws = groups.get(note) || []
    kws.push(g.kw)
    groups.set(note, kws)
  }
  return [...groups.entries()].map(([note, kws]) => ({ note, kws }))
}

// One profile's six stat columns, in datasheet order, with the keys the marks use.
export function statCells(p) {
  return [
    { key: 'm', label: 'M', value: p.m },
    { key: 't', label: 'T', value: p.t },
    { key: 'sv', label: 'SV', value: p.sv },
    { key: 'w', label: 'W', value: p.w },
    { key: 'ld', label: 'LD', value: p.ld },
    { key: 'oc', label: 'OC', value: p.oc },
  ]
}

// invNote data is inconsistent about the leading asterisk — normalize to one '* '.
export function invNoteText(note) {
  return '* ' + note.replace(/^\*\s*/, '')
}

// Bold this sheet's faction keywords (ORKS, ADEPTUS ASTARTES…) wherever the rules text mentions
// them, matching the codex typography. [BRACKET] tags and existing **bold** runs are matched
// first and passed through untouched so the markup never nests. Returns a text→text function for
// the given sheet (identity when it has no faction keywords).
export function factionKwMarker(sheet) {
  const kws = (sheet?.factionKeywords || [])
    .map((k) => k.toUpperCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)
  if (!kws.length) return (text) => text
  const re = new RegExp(`\\[[^\\]]*\\]|\\*\\*.*?\\*\\*|\\b(${kws.join('|')})\\b`, 'g')
  return (text) => text.replace(re, (m, kw) => (kw ? `**${kw}**` : m))
}
