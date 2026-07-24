import { reactive } from 'vue'
import { getItem, setItem } from './safeStorage.js'

// Pinned favourites — a lightweight "float my regulars to the top" layer for the long
// selection lists (faction picker first; detachments/chapters later). Module singleton +
// localStorage, same pattern as useFactionChoice/useLocale. Pins are stored as arrays of
// stable ids in pick order, so the "Pinned" group lists newest-pinned first.
//
// Two independent layers under one key:
//   • factions — pinned faction slugs (the faction picker's "Pinned" group).
//   • units    — per-faction favourite datasheet ids ({ slug: [id,…] }), surfaced as the
//                "Favorites" group + the star on each chip / the unit page header.
//
// NOT a roster: this only reorders existing pickers, it never adds army-list semantics
// (counts, points, wargear) — that's the roster builder's territory.
const STORAGE_KEY = 'wh11ed-favorites'

function load() {
  let saved
  try { saved = JSON.parse(getItem(STORAGE_KEY) || '{}') || {} } catch { saved = {} }
  const units = saved.units && typeof saved.units === 'object' ? saved.units : {}
  for (const k of Object.keys(units)) if (!Array.isArray(units[k])) delete units[k]
  return { factions: Array.isArray(saved.factions) ? saved.factions : [], units }
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

  // Per-faction favourite datasheets.
  const favoriteUnitIds = (slug) => favorites.units[slug] || []
  const isUnitFavorite = (slug, id) => (favorites.units[slug] || []).includes(id)

  function toggleUnitFavorite(slug, id) {
    if (!slug || !id) return
    const list = favorites.units[slug] || (favorites.units[slug] = [])
    const i = list.indexOf(id)
    if (i === -1) list.unshift(id)
    else list.splice(i, 1)
    if (!list.length) delete favorites.units[slug]
    persist()
  }

  return {
    favorites,
    isFactionPinned,
    toggleFaction,
    pinnedFactionsFrom,
    favoriteUnitIds,
    isUnitFavorite,
    toggleUnitFavorite,
  }
}
