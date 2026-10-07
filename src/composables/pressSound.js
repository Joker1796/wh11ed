import { ref } from 'vue'
import { getItem, setItem } from './safeStorage.js'

// The sound of a press — a mechanical click as a button sinks and as it comes back up, and a heavier
// one with a longer travel for a big card (owner, 2026-10-07: his own recordings, public/sounds/).
// Played from pressFeedback.js, at the same two moments its animation starts, so sound and motion
// are one event. OFF until the reader turns it on in the ⚙ menu: a phone clicking at a gaming
// table is a sound the next player did not ask for.
//
// Web Audio, not <audio>: a decoded buffer starts within a frame and overlaps itself when tapped
// fast, where an element restarts late or cuts its own tail. The browser lets a page make a sound
// only after the reader touched it, so the context is made, and the four files fetched (~6 KB, in
// the PWA precache), at the first press after the switch is on — never at page load.

const KEY = 'wh11ed-press-sound'
const VOLUME = 0.4 // the recordings' own README: comfortable at 0.3–0.6
const FILES = { click: ['click-down', 'click-up'], card: ['card-down', 'card-up'] }

// A card is a big target: wider than a button row and taller than one line. Read from the
// element, so any large thing that sinks gets the heavier sound without being marked; a
// `data-press-sound="card" | "click"` overrides.
const CARD_W = 200
const CARD_H = 80

export const pressSoundOn = ref(getItem(KEY) === '1')

let ctx = null
let loading = null
const buffers = {}

function context() {
  if (ctx) return ctx
  const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)
  if (!AC) return null
  // iOS: mix with whatever the reader is listening to and stay silent on the mute switch, instead
  // of the default session that ducks or stops their music (Safari 16.4+; elsewhere a no-op).
  try { if (navigator.audioSession) navigator.audioSession.type = 'ambient' } catch { /* older Safari */ }
  ctx = new AC()
  return ctx
}

function load() {
  if (loading) return loading
  const c = context()
  if (!c) return Promise.resolve()
  const base = `${import.meta.env.BASE_URL || '/'}sounds/`
  loading = Promise.all(Object.values(FILES).flat().map(async (name) => {
    try {
      const res = await fetch(`${base}${name}.mp3`)
      buffers[name] = await c.decodeAudioData(await res.arrayBuffer())
    } catch { /* offline before the precache landed: stay silent */ }
  }))
  return loading
}

function play(name) {
  const c = ctx
  const buf = buffers[name]
  if (!c || !buf) return
  if (c.state === 'suspended') c.resume() // iOS suspends it in the background
  const src = c.createBufferSource()
  const gain = c.createGain()
  gain.gain.value = VOLUME
  src.buffer = buf
  src.connect(gain).connect(c.destination)
  src.start()
}

export function soundKindOf(el) {
  const own = el?.dataset?.pressSound
  if (own === 'card' || own === 'click') return own
  return el && el.offsetWidth > CARD_W && el.offsetHeight > CARD_H ? 'card' : 'click'
}

// `phase` 0 — pressed, 1 — let go. The first press after the switch is on starts the load and plays
// once the buffers are in; a let-go that arrives before them is simply silent.
export function pressSound(el, phase) {
  if (!pressSoundOn.value) return
  const name = FILES[soundKindOf(el)][phase]
  if (buffers[name]) play(name)
  else if (phase === 0) load().then(() => play(name))
}

export function usePressSound() {
  function togglePressSound() {
    pressSoundOn.value = !pressSoundOn.value
    setItem(KEY, pressSoundOn.value ? '1' : '')
    // Turning it on IS a press: the context may start now, so the next tap is not the first one.
    if (pressSoundOn.value) load()
  }
  return { pressSoundOn, togglePressSound }
}
