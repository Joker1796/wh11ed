import { createMarkStore, liveCell, deadCell, isLive, liveIds } from './markStore.js'

// Pinned favourites — a lightweight "float my regulars to the top" layer for the long selection
// lists (faction picker first; detachments/chapters later). Module singleton over a mark store
// (markStore.js), which is what makes a pin the player's rather than the phone's: every pin
// carries when it was made, unpinning leaves a tombstone, and useUserPrefs merges the lot across
// a player's devices.
//
// Two independent layers, kept as scopes of the same store:
//   • `@factions` — pinned faction slugs (the faction picker's "Pinned" group).
//   • <faction slug> — that faction's favourite datasheet ids, surfaced as the "Favorites" group
//     plus the star on each chip / the unit page header.
//
// Pin ORDER is not stored: a cell's timestamp is the order, newest first, which is exactly what
// the "Pinned" group wants and one less thing for two devices to disagree about.
//
// NOT a roster: this only reorders existing pickers, it never adds army-list semantics (counts,
// points, wargear) — that's the roster builder's territory.
const STORAGE_KEY = 'wh11ed-favorites'
export const GLOBAL_SCOPE = '@factions'

// Shape written before marks carried timestamps: `{ factions: [slug…], units: { slug: [id…] } }`,
// pin order by position. Position can't be recovered as a time, so every migrated mark is stamped
// 0 — "it was already there" — and any later act on any device outranks it.
function migrate(saved) {
  const scopes = {}
  const cells = (ids) => Object.fromEntries((Array.isArray(ids) ? ids : []).map((id) => [id, { at: 0 }]))
  const pinned = cells(saved?.factions)
  if (Object.keys(pinned).length) scopes[GLOBAL_SCOPE] = pinned
  for (const [slug, ids] of Object.entries(saved?.units || {})) {
    const units = cells(ids)
    if (Object.keys(units).length) scopes[slug] = units
  }
  return scopes
}

export const favoritesStore = createMarkStore({ key: STORAGE_KEY, version: 2, migrate })
favoritesStore.load()

export function useFavorites() {
  const isFactionPinned = (slug) => isLive(favoritesStore.cellsOf(GLOBAL_SCOPE)[slug])

  function toggleFaction(slug) {
    if (!slug) return
    favoritesStore.setCell(GLOBAL_SCOPE, slug, isFactionPinned(slug) ? deadCell() : liveCell())
  }

  // Resolve the pinned slugs to their entries within the given grouped faction data
  // (factionGroups / FACTION_GROUPS), newest pin first, dropping any that no longer exist.
  function pinnedFactionsFrom(groups) {
    const bySlug = {}
    for (const g of groups) for (const f of g.factions) bySlug[f.slug] = f
    return liveIds(favoritesStore.cellsOf(GLOBAL_SCOPE))
      .map((s) => bySlug[s])
      .filter(Boolean)
  }

  // Per-faction favourite datasheets.
  const favoriteUnitIds = (slug) => liveIds(favoritesStore.cellsOf(slug))
  const isUnitFavorite = (slug, id) => isLive(favoritesStore.cellsOf(slug)[id])

  function toggleUnitFavorite(slug, id) {
    if (!slug || !id) return
    favoritesStore.setCell(slug, id, isUnitFavorite(slug, id) ? deadCell() : liveCell())
  }

  return {
    favorites: favoritesStore.state,
    isFactionPinned,
    toggleFaction,
    pinnedFactionsFrom,
    favoriteUnitIds,
    isUnitFavorite,
    toggleUnitFavorite,
  }
}
