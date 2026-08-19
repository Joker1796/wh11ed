// Russian overlay for the roster's own generated data. Lazily loaded so an EN reader never
// downloads it — same discipline as data/factions/ru/index.js and data/datasheets/ru/index.js.
//
// Only the wargear GROUP INSTRUCTIONS are here. Weapon and unit names (items.js) stay English by
// project convention, so there is nothing to overlay for them.
let cached = null

// The instruction id → Russian map, or null if it can't be loaded (which the caller must treat as
// "show the English original", never as an error).
export async function loadRosterTextsRu() {
  if (cached) return cached
  try {
    cached = (await import('./texts.js')).default
  } catch {
    cached = null
  }
  return cached
}
