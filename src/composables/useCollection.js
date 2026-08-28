import { reactive } from 'vue'
import { getItem, setItem } from './safeStorage.js'

// "Which models do I actually own" — a per-datasheet mark, set from the faction datasheet pages
// and from the roster catalogue, and read back by the catalogue (a star on the row, plus the
// "only what I own" filter). Module singleton + localStorage, same pattern as useFavorites.js.
//
// Deliberately NOT a layer of `wh11ed-favorites`: a pin only reorders a picker and is documented
// as never carrying army-list semantics; owning a box is a fact about the shelf, and the two are
// kept apart so neither inherits the other's meaning.
//
// Shape: { [factionSlug]: { [unitId]: { n, name } } }
//   • the slug is the unit's OWN faction — an allied datasheet browsed inside a Custodes list is
//     an Imperial Agents one (rosterEngine's allySourceOf), and without that split the ids of two
//     factions would share one bucket;
//   • `n` is how many are owned. Nothing sets it above 1 yet — the mark is an on/off star — but
//     the shape is here so "I have two boxes of these" doesn't need a migration later;
//   • `name` is the datasheet's name as it read when it was marked. It is the only way back if a
//     later appdata bump moves the id out from under the mark: an id is not stable across bumps,
//     a name mostly is. Nothing re-resolves by it yet — this only makes that possible.
//
// Device-local. Rosters sync to the cloud, this does not: a second device starts with an empty
// shelf until there is a `/collection` endpoint to sync it to.
const STORAGE_KEY = 'wh11ed-collection'

function load() {
  let saved
  try { saved = JSON.parse(getItem(STORAGE_KEY) || '{}') || {} } catch { saved = {} }
  const out = {}
  for (const [slug, units] of Object.entries(saved)) {
    if (!units || typeof units !== 'object' || Array.isArray(units)) continue
    const bucket = {}
    for (const [id, rec] of Object.entries(units)) {
      if (!rec || typeof rec !== 'object') continue
      const n = Number(rec.n)
      bucket[id] = { n: Number.isFinite(n) && n > 0 ? Math.floor(n) : 1, name: typeof rec.name === 'string' ? rec.name : '' }
    }
    if (Object.keys(bucket).length) out[slug] = bucket
  }
  return out
}

const collection = reactive(load())

function persist() { setItem(STORAGE_KEY, JSON.stringify(collection)) }

export function useCollection() {
  const isOwned = (slug, id) => !!(slug && id && collection[slug]?.[id])

  // On/off. `name` is only recorded on the way in — un-marking drops the record entirely, and an
  // empty faction bucket goes with it so a cleared collection stores `{}` rather than a husk.
  function toggleOwned(slug, id, name = '') {
    if (!slug || !id) return
    const bucket = collection[slug] || (collection[slug] = {})
    if (bucket[id]) {
      delete bucket[id]
      if (!Object.keys(bucket).length) delete collection[slug]
    } else {
      bucket[id] = { n: 1, name: String(name || '') }
    }
    persist()
  }

  return { collection, isOwned, toggleOwned }
}
