import { reactive } from 'vue'
import { getItem, setItem, removeItem } from './safeStorage.js'

// Per-faction "army choice" — the active detachment and (for factions with
// chapters, i.e. Space Marines) the chosen Chapter. Module singleton shared by
// the faction rule page and the datasheets page, so a pick made on one page is
// reflected on the other. Persisted per faction slug to a single localStorage
// map. The chapter↔detachment consistency rules (a chapter-locked detachment
// implies its chapter, and vice versa) live in FactionPickerBar, which has both
// lists — this store is just state + persistence.
const STORAGE_KEY = 'wh11ed-faction-choice'
// Pre-chapter-picker key (slug → detachment id) — folded into the new map once.
const LEGACY_DET_KEY = 'wh11ed-faction-detachment'

function load() {
  let map
  try { map = JSON.parse(getItem(STORAGE_KEY) || '{}') || {} } catch { map = {} }
  const legacy = getItem(LEGACY_DET_KEY)
  if (legacy) {
    try {
      for (const [slug, det] of Object.entries(JSON.parse(legacy) || {})) {
        if (!map[slug]) map[slug] = { det }
      }
    } catch { /* corrupt legacy map — nothing to migrate */ }
    removeItem(LEGACY_DET_KEY)
    setItem(STORAGE_KEY, JSON.stringify(map))
  }
  return map
}

const choices = reactive(load())

function persist() {
  setItem(STORAGE_KEY, JSON.stringify(choices))
}

export function useFactionChoice() {
  const getChoice = (slug) => choices[slug] || {}

  function setDetachment(slug, id) {
    if (!slug) return
    choices[slug] = { ...choices[slug], det: id }
    persist()
  }

  function setChapter(slug, chapter) {
    if (!slug) return
    choices[slug] = { ...choices[slug], chapter: chapter || undefined }
    persist()
  }

  // Pure resolvers — the saved value validated against the faction's actual lists
  // (a stale/foreign saved id falls back to the first detachment / no chapter).
  // Call inside a computed; they read the reactive store.
  const activeDetachment = (slug, detachments) =>
    detachments.find((d) => d.id === getChoice(slug).det) || detachments[0] || null

  const activeChapter = (slug, chapters) => {
    const c = getChoice(slug).chapter
    return chapters?.includes(c) ? c : null
  }

  return { getChoice, setDetachment, setChapter, activeDetachment, activeChapter }
}
