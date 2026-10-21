// How a faction's unit list is cut into groups: Codex-style unit types, in roster-building order.
// A sheet lands in the first group whose keyword it carries (Epic Heroes are also CHARACTER, so
// precedence matters). Pure: the faction page reads it (FactionDatasheetsView), and the labels are
// ui.js keys, filled in by the caller.
export const TYPE_GROUPS = [
  { key: 'epic',       kw: 'Epic Hero',           label: 'dsGroupEpicHeroes' },
  { key: 'character',  kw: 'Character',           label: 'dsGroupCharacters' },
  { key: 'battleline', kw: 'Battleline',          label: 'dsGroupBattleline' },
  { key: 'transport',  kw: 'Dedicated Transport', label: 'dsGroupTransports' },
  { key: 'fortification', kw: 'Fortification',    label: 'dsGroupFortifications' },
  // Split out of "Other" — these two Unit Type keywords alone cover 82% of what used to
  // land there (Vehicle 229, Infantry 195 across all factions' datasheets); the remaining
  // Unit Types (Monster/Aircraft/Mounted/Beast) are each too small to earn their own
  // section and stay lumped into "Other" below.
  { key: 'vehicle',    kw: 'Vehicle',             label: 'dsGroupVehicles' },
  { key: 'infantry',   kw: 'Infantry',            label: 'dsGroupInfantry' },
  { key: 'other',      kw: null,                  label: 'dsGroupOther' },
]

/** Every type group, in order, each with the sheets that land in it (empty ones included).
 *  @param {Array<{ keywords?: string[] }>} sheets
 *  @param {Record<string, string>} labels ui.js strings of the reader's language */
export function groupByType(sheets, labels) {
  const buckets = TYPE_GROUPS.map((g) => ({ key: g.key, kw: g.kw, label: labels[g.label], sheets: [] }))
  for (const s of sheets) {
    buckets.find((b) => !b.kw || (s.keywords || []).includes(b.kw)).sheets.push(s)
  }
  return buckets
}

// A unit's Chapter = the second Faction keyword on its datasheet. Order in factionKeywords[] is not
// stable (Pedro Kantor lists Adeptus Astartes first), so the non-umbrella keyword is found instead of
// taking [0]. A sheet with none is a generic Adeptus Astartes unit, legal in any Chapter's army.
const UMBRELLA_KEYWORDS = new Set(['Adeptus Astartes', 'Imperium'])
/** @param {{ factionKeywords?: string[] }} sheet */
export function chapterOf(sheet) {
  return (sheet.factionKeywords || []).find((k) => !UMBRELLA_KEYWORDS.has(k))
}
