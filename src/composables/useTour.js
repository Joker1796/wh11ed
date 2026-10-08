import { ref, computed } from 'vue'
import { IS_BETA } from '../config.js'
import { TOUR_CHAPTERS } from '../data/tourChapters.js'
import { getItem, setItem } from './safeStorage.js'

// The new tracker's guided tour (owner, 2026-10-08): chapters along the game's own flow — the
// tracker home, each setup step, the game screen — each shown by itself the first time its screen
// comes up, and again on request. A step darkens the screen and lights one element
// (`data-tour="…"` on it, never a CSS class: a restyle must not lose the tour). The beta only —
// and the dev stand, where it is being written.
//
// The state is a module singleton: one tour on screen at a time, whichever screen asked.

export const TOUR_ON = IS_BETA || import.meta.env.DEV

const SEEN_KEY = 'wh11ed-tour-seen'

function readSeen() {
  try {
    return new Set(JSON.parse(getItem(SEEN_KEY) || '[]'))
  } catch {
    return new Set()
  }
}

// `?tour=reset` in the address shows every chapter again — for whoever is reviewing the texts.
if (TOUR_ON && typeof location !== 'undefined' && new URLSearchParams(location.search).get('tour') === 'reset') {
  setItem(SEEN_KEY, '[]')
}
const seen = ref(readSeen())
const active = ref(null) // { id, i }

export function useTour() {
  const chapter = computed(() => (active.value ? TOUR_CHAPTERS[active.value.id] : null))
  const step = computed(() => chapter.value?.steps[active.value.i] || null)

  function markSeen(id) {
    if (seen.value.has(id)) return
    seen.value = new Set([...seen.value, id])
    setItem(SEEN_KEY, JSON.stringify([...seen.value]))
  }

  // A chapter the first time its screen comes up. Never over another one already on screen.
  function maybeStart(id) {
    if (!TOUR_ON || !TOUR_CHAPTERS[id] || seen.value.has(id) || active.value) return
    start(id)
  }

  function start(id) {
    if (!TOUR_ON || !TOUR_CHAPTERS[id]) return
    active.value = { id, i: 0 }
  }

  function next() {
    if (!active.value) return
    if (active.value.i < chapter.value.steps.length - 1) active.value = { ...active.value, i: active.value.i + 1 }
    else finish()
  }

  function back() {
    if (active.value?.i > 0) active.value = { ...active.value, i: active.value.i - 1 }
  }

  // Done or skipped, the chapter is seen: skipping is an answer too.
  function finish() {
    if (active.value) markSeen(active.value.id)
    active.value = null
  }

  // Every chapter shown again, each on its own screen.
  function resetAll() {
    seen.value = new Set()
    setItem(SEEN_KEY, '[]')
  }

  return { active, chapter, step, maybeStart, start, next, back, finish, resetAll }
}
