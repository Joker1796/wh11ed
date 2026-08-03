// Which datasheets in a faction's roster carry a given printed keyword — backs the "units
// with this keyword" modal opened from DatasheetCard's Keywords line. Checks both the flat
// `keywords` list and the per-model `keywordsByModel` groups (e.g. The Silent King has
// keywords that only apply to specific named models within the unit).
export function unitsWithKeyword(sheets, keyword) {
  if (!keyword) return []
  return (sheets || []).filter((s) => {
    if (s.keywords?.includes(keyword)) return true
    return !!s.keywordsByModel?.some((g) => g.list.includes(keyword))
  })
}
