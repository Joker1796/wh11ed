import { ref, computed, watch } from 'vue'
import { IS_BETA } from '../config.js'
import { TOUR_CHAPTERS } from '../data/tourChapters.js'
import { getItem, setItem } from './safeStorage.js'
import { asked } from './tourScreen.js'

export { forgetScreen } from './tourScreen.js'

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
let waiting = null // the timer looking for a free screen (maybeStart)
const pending = new Map() // id → { ctx, at }: chapters asked for and not yet shown, in order
const PENDING_MS = 60000 // a chapter not shown within a minute of its screen asking is dropped
const dialogOpen = () => typeof document !== 'undefined' && !!document.querySelector('.modal-overlay:not([inert])')
// The chapter's steps that hold for this state of its screen.
const stepsOf = (id, ctx) => TOUR_CHAPTERS[id].steps.filter((s) => !s.when || s.when(ctx))
// Whether a step's element is on screen now.
function present(st) {
  if (typeof document === 'undefined') return true
  const desk = window.matchMedia?.('(min-width: 901px)').matches
  const t = st.target && typeof st.target === 'object' ? (desk ? st.target.desk : st.target.phone) : st.target
  return !!t && [...document.querySelectorAll(`[data-tour="${t}"]`)].some((el) => el.getClientRects().length > 0)
}
// Whether any element the chapter lights is on screen — its screen is still the one showing.
const onScreen = (id, ctx) => stepsOf(id, ctx).some(present)
const active = ref(null) // { id, i, steps } — the chapter's steps that hold for the screen's state

// The page changed (TourOverlay, from App.vue's pageKey): its chapters go with it. One still
// waiting would start in the moment the leaving page is in the DOM — the tracker home's did, and
// its card stood over the lobby's invite with nothing lit (2026-10-09) — and one on screen would
// stay there, lighting nothing. Closed, not finished: unread, it shows again on its own screen.
export function leavePage() {
  pending.clear()
  if (waiting) { clearInterval(waiting); waiting = null }
  active.value = null
}

// What a step shows on its screen before it lights anything (owner, 2026-10-09: "if there is
// something on the screen to switch and tell about, switch it for the telling") — a tab opened, a
// side picked, a pane brought forward. A step says it as `show: { <key>: value }`; the screen that
// owns that state answers here with how to set it, so a chapter never clicks the page itself and a
// step walked back to puts its own state back. A key the step does not name is left alone.
export function useTourShow(key, apply) {
  watch(
    () => {
      const st = active.value?.steps[active.value.i]
      return st?.show && Object.hasOwn(st.show, key) ? { v: st.show[key] } : null
    },
    (got) => { if (got) apply(got.v) },
    { immediate: true },
  )
}

export function useTour() {
  const chapter = computed(() => (active.value ? { steps: active.value.steps } : null))
  const step = computed(() => active.value?.steps[active.value.i] || null)

  function markSeen(id) {
    if (seen.value.has(id)) return
    seen.value = new Set([...seen.value, id])
    setItem(SEEN_KEY, JSON.stringify([...seen.value]))
  }

  // A chapter the first time its screen comes up. Never over another one already on screen, and
  // never over a dialog: "Start game" opens the secondaries' draw at once, and the turn's chapter
  // lit the bar under it (owner, 2026-10-09). So it waits a beat for a dialog that is about to
  // open, then for every open one to close (a leaving copy is inert — modalLeave.js).
  // `ctx` is the screen's state a step may ask about (`when`): the game screen before the battle
  // has "Start game" where the phases will be (owner, 2026-10-08).
  // Chapters asked for together WAIT IN LINE: the rosters' desk is the list of lists and a roster
  // side by side, each with its chapter, and the second used to cancel the first. A waiting
  // chapter starts only while something it lights is on screen, and one not shown within a minute
  // is dropped — its screen has gone.
  function maybeStart(id, ctx = {}) {
    if (!TOUR_ON || !TOUR_CHAPTERS[id]) return
    const targets = [...new Set(stepsOf(id, ctx).flatMap((st) => (st.target && typeof st.target === 'object' ? [st.target.phone, st.target.desk] : [st.target])).filter(Boolean))]
    asked.value = [...asked.value.filter((a) => a.id !== id), { id, ctx, targets }]
    if (seen.value.has(id)) return
    pending.set(id, { ctx, at: Date.now() })
    if (waiting) return
    let free = 0 // the screen has to stay free for two looks: a dialog may open a moment late
    waiting = setInterval(() => {
      free = active.value || dialogOpen() ? 0 : free + 1
      if (free < 2) return
      for (const [pid, p] of pending) {
        if (seen.value.has(pid) || Date.now() - p.at > PENDING_MS) { pending.delete(pid); continue }
        if (!onScreen(pid, p.ctx)) continue // not drawn yet, or its screen is not the one up
        pending.delete(pid)
        start(pid, p.ctx)
        break
      }
      if (!pending.size) { clearInterval(waiting); waiting = null }
      free = 0
    }, 400)
  }

  function start(id, ctx = {}) {
    if (!TOUR_ON || !TOUR_CHAPTERS[id]) return
    // A step about an element this screen does not have now (a field a choice not made yet would
    // bring, a column of another width) is left out, so the count says what is coming. One that
    // first opens something (`show`) is kept: its element comes with what it opens.
    const steps = stepsOf(id, ctx).filter((st) => st.show || !st.target || present(st))
    if (steps.length) active.value = { id, i: 0, steps, dir: 1 }
  }

  function next() {
    if (!active.value) return
    if (active.value.i < chapter.value.steps.length - 1) active.value = { ...active.value, i: active.value.i + 1, dir: 1 }
    else finish()
  }

  function back() {
    if (active.value?.i > 0) active.value = { ...active.value, i: active.value.i - 1, dir: -1 }
  }

  // Done or skipped, the chapter is seen: skipping is an answer too.
  function finish() {
    if (active.value) markSeen(active.value.id)
    active.value = null
    // The chapters in line waited for this one: their minute starts now, not when they were asked
    // for — a fifteen-step chapter read slowly outlasted it, and the next was dropped.
    for (const p of pending.values()) p.at = Date.now()
  }

  // This screen's chapters again, in the order it asked for them — those whose elements are still
  // here (a page that turned from the setup into the game keeps only the game's).
  const replayable = computed(() => TOUR_ON && asked.value.length > 0)
  function replay() {
    const again = asked.value.filter((a) => onScreen(a.id, a.ctx))
    if (!again.length) return
    if (active.value) active.value = null
    seen.value = new Set([...seen.value].filter((id) => !again.some((a) => a.id === id)))
    setItem(SEEN_KEY, JSON.stringify([...seen.value]))
    for (const a of again) maybeStart(a.id, a.ctx)
  }

  // Every chapter shown again, each on its own screen.
  function resetAll() {
    seen.value = new Set()
    setItem(SEEN_KEY, '[]')
  }

  // A step whose element is not on screen is passed over the way the reader was going: a field
  // that comes with a choice not made yet (the Force Disposition before a faction), a column only
  // a wide screen has. Back at the first step, it goes forward instead.
  function pass() {
    if (!active.value) return
    if (active.value.dir < 0 && active.value.i > 0) back()
    else next()
  }

  return { active, chapter, step, maybeStart, start, next, back, pass, finish, resetAll, replayable, replay }
}
