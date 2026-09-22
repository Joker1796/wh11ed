import { createMarkStore, liveCell, deadCell, isLive } from './markStore.js'

// "Which models do I actually own" — a per-datasheet mark, set from the faction datasheet pages
// and from the roster catalogue, and read back by the catalogue (a star on the row, plus the
// "only what I own" filter). Module singleton over a mark store (markStore.js), same as
// useFavorites.js: the mark carries when it was made and unmarking leaves a tombstone, which is
// what lets useUserPrefs carry a shelf between a player's devices without a star ever coming back
// from the device that had not heard it was taken off.
//
// Deliberately NOT a layer of `wh11ed-favorites`: a pin only reorders a picker and is documented
// as never carrying army-list semantics; owning a box is a fact about the shelf, and the two are
// kept apart so neither inherits the other's meaning. (They do share a cloud row per faction —
// that is transport, not meaning.)
//
// Scope is the faction slug, cell id the datasheet id. The slug is the unit's OWN faction as the
// page that marked it knew it — an allied datasheet browsed inside a Custodes list is an Imperial
// Agents one (rosterEngine's allySourceOf), and without that split the ids of two factions would
// share one bucket.
//
// A live cell is `{ n, name, at }`:
//   • `n` is how many are owned. Nothing sets it above 1 yet — the mark is an on/off star — but
//     the shape is here so "I have two boxes of these" doesn't need a migration later;
//   • `name` is the datasheet's name as it read when it was marked. The rename map
//     (src/data/datasheetRenames.json) is what actually moves a mark when an id changes; `name`
//     stays as the human-readable trace of what was marked.
const STORAGE_KEY = 'wh11ed-collection'

// Shape written before marks carried timestamps: `{ [slug]: { [id]: { n, name } } }`. Stamped 0 —
// "it was already there" — so any later act on any device outranks it.
function migrate(saved) {
  const scopes = {}
  for (const [slug, units] of Object.entries(saved || {})) {
    if (!units || typeof units !== 'object' || Array.isArray(units)) continue
    const bucket = {}
    for (const [id, rec] of Object.entries(units)) {
      if (!rec || typeof rec !== 'object') continue
      const n = Number(rec.n)
      bucket[id] = { n: Number.isFinite(n) && n > 0 ? Math.floor(n) : 1, name: typeof rec.name === 'string' ? rec.name : '', at: 0 }
    }
    if (Object.keys(bucket).length) scopes[slug] = bucket
  }
  return scopes
}

export const collectionStore = createMarkStore({ key: STORAGE_KEY, version: 2, migrate })
collectionStore.load()

export function useCollection() {
  const isOwned = (slug, id) => !!(slug && id && isLive(collectionStore.cellsOf(slug)[id]))

  // On/off. `name` is only recorded on the way in — taking the mark off leaves a tombstone, which
  // carries no name, because what it records is the act, not the box.
  function toggleOwned(slug, id, name = '') {
    if (!slug || !id) return
    collectionStore.setCell(slug, id, isOwned(slug, id) ? deadCell() : liveCell({ n: 1, name: String(name || '') }))
  }

  return { collection: collectionStore.state, isOwned, toggleOwned }
}
