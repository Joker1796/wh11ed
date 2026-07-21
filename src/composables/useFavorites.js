import { reactive } from 'vue'
import { getItem, setItem } from './safeStorage.js'

// Pinned favourites — a lightweight "float my regulars to the top" layer for the long
// selection lists (faction picker first; detachments/chapters later). Module singleton +
// localStorage, same pattern as useFactionChoice/useLocale. Pins are stored as arrays of
// stable ids in pick order, so the "Pinned" group lists newest-pinned first.
//
// NOT a roster: this only reorders existing pickers, it never adds army-list semantics
// (counts, points, wargear) — that's the roster builder's territory.
const STORAGE_KEY = 'wh11ed-favorites'

function load() {
  let saved
  try { saved = JSON.parse(getItem(STORAGE_KEY) || '{}') || {} } catch { saved = {} }
  return { factions: Array.isArray(saved.factions) ? saved.factions : [] }
}

const favorites = reactive(load())

function persist() {
  setItem(STORAGE_KEY, JSON.stringify(favorites))
}

export function useFavorites() {
  const isFactionPinned = (slug) => favorites.factions.includes(slug)

  function toggleFaction(slug) {
    const i = favorites.factions.indexOf(slug)
    if (i === -1) favorites.factions.unshift(slug)
    else favorites.factions.splice(i, 1)
    persist()
  }

  // Resolve the pinned slugs to their entries within the given grouped faction data
  // (factionGroups / FACTION_GROUPS), in pin order, dropping any that no longer exist.
  function pinnedFactionsFrom(groups) {
    const bySlug = {}
    for (const g of groups) for (const f of g.factions) bySlug[f.slug] = f
    return favorites.factions.map((s) => bySlug[s]).filter(Boolean)
  }

  return { favorites, isFactionPinned, toggleFaction, pinnedFactionsFrom }
}
