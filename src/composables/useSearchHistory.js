import { ref } from 'vue'
import { getItem, setItem } from './safeStorage.js'

// Recent search queries — the command palette's empty state. Module singleton +
// localStorage, same pattern as useFavorites/useFactionChoice: SearchModal is mounted with
// v-if and torn down on close, so nothing inside the component can survive to the next open.
//
// Written on COMMIT, not while typing: remember() is called from SearchModal's navigate(), so
// only a query that actually took the user somewhere is kept. Recording every keystroke would
// fill the list with the prefixes of one real search ("acc", "accu", "accur"…).
//
// Strings, not result objects, deliberately: datasheet/detachment ids move with every appdata
// bump, so a stored result can rot into a dead anchor. A stored query is re-run against the
// current index and can't.
const STORAGE_KEY = 'wh11ed-search-history'
const MAX = 7

function load() {
  try {
    const saved = JSON.parse(getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(saved)) return []
    return saved.filter((q) => typeof q === 'string' && q.trim()).slice(0, MAX)
  } catch {
    return []
  }
}

const history = ref(load())

const persist = () => setItem(STORAGE_KEY, JSON.stringify(history.value))
// Case-insensitive: searching "chosen" after "Chosen" is the same search, not a second entry.
const same = (a, b) => a.toLowerCase() === b.toLowerCase()

export function useSearchHistory() {
  function remember(query) {
    const q = (query || '').trim()
    if (!q) return
    history.value = [q, ...history.value.filter((h) => !same(h, q))].slice(0, MAX)
    persist()
  }

  function forget(query) {
    history.value = history.value.filter((h) => !same(h, query))
    persist()
  }

  function clearHistory() {
    history.value = []
    persist()
  }

  return { history, remember, forget, clearHistory }
}
