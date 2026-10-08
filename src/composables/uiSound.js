import { ref } from 'vue'
import { getItem, setItem } from './safeStorage.js'

// The interface's sounds, one engine for all of them (owner's set, 2026-10-08,
// sources/wh-ui-sounds-final.zip, public/sounds/). Who plays what lives with the thing that
// sounds: a press in pressSound.js, a mark or a segmented switch in stateSounds.js, an error toast
// in AppToast.vue. Everything else in a game — points, CP, a phase — is heard only as the button
// that did it. OFF until the reader turns it on in the ⚙ menu: a phone clicking at a gaming table
// is a sound the next player did not ask for.
//
// Web Audio, not <audio>: a decoded buffer starts within a frame and overlaps itself when tapped
// fast, where an element restarts late or cuts its own tail. With the switch on, the files (~15 KB,
// in the PWA precache) are fetched and decoded as soon as the page is idle (installUiSound): loaded
// at the first tap instead, that tap's click came late and its let-go not at all (owner,
// 2026-10-08: "the first click sounds strange"). Decoding needs no permission — it runs on an
// offline context — but playing does: the browser lets a page sound only from a reader's gesture,
// so the playing context is made at the first touch, before the press it sounds. Switched off,
// nothing is fetched.

export const SOUNDS = ['click-down', 'click-up', 'card-down', 'card-up', 'toggle-on', 'toggle-off', 'seg', 'error']

const KEY = 'wh11ed-press-sound' // the switch's first name, kept: readers have it set
const VOLUME = 0.15 // the README's 0.3–0.6 was loud at the table: owner, 2026-10-08, "quieter", twice
// A sound's own level against the rest, where the recording itself is the louder one: the button
// click is heard on every tap and stood out (owner, 2026-10-08). A trim here, not a new file — the
// timbre was right, only its level was not.
const TRIM = { 'click-down': 0.6, 'click-up': 0.6 }

export const soundOn = ref(getItem(KEY) === '1')

let ctx = null
let loading = null
const buffers = {}

// One event can reach two players of the same sound — a dialog closing as the next one opens, a
// tab that is also a fold: closer than this, the second is the same sound, played once.
const SAME_MS = 50
const lastAt = {}

// The playing context — made from a gesture (installUiSound's first touch, the switch itself).
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

// Decoding: an offline context needs no gesture, and a decoded buffer plays in any context.
function load() {
  if (loading) return loading
  const OAC = typeof window !== 'undefined' && (window.OfflineAudioContext || window.webkitOfflineAudioContext)
  if (!OAC) return Promise.resolve()
  const decoder = new OAC(1, 1, 44100)
  const base = `${import.meta.env.BASE_URL || '/'}sounds/`
  loading = Promise.all(SOUNDS.map(async (name) => {
    try {
      const res = await fetch(`${base}${name}.mp3`)
      buffers[name] = await decoder.decodeAudioData(await res.arrayBuffer())
    } catch { /* offline before the precache landed: stay silent */ }
  }))
  return loading
}

function start(name) {
  const buf = buffers[name]
  const c = buf && context()
  if (!c) return
  const now = performance.now()
  if (now - (lastAt[name] ?? -Infinity) < SAME_MS) return
  lastAt[name] = now
  if (c.state === 'suspended') c.resume() // iOS suspends it in the background
  const src = c.createBufferSource()
  const gain = c.createGain()
  gain.gain.value = VOLUME * (TRIM[name] ?? 1)
  src.buffer = buf
  src.connect(gain).connect(c.destination)
  src.start()
}

// Plays `name` (one of SOUNDS) if the switch is on. A sound asked for before the files are in (a
// tap in the first moment after opening) plays once they are; `late: false` drops it instead — a
// let-go that would sound after the finger is long up.
export function playSound(name, { late = true } = {}) {
  if (!soundOn.value) return
  if (buffers[name]) start(name)
  else if (late) load().then(() => start(name))
}

// At start (main.js): with the switch on, the files load while the page is idle, and the first
// touch — in the capture phase, ahead of the press it starts — makes the playing context.
export function installUiSound() {
  if (typeof window === 'undefined') return
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 500))
  if (soundOn.value) idle(() => load())
  const unlock = () => {
    if (!soundOn.value) return
    const c = context()
    if (c?.state === 'suspended') c.resume()
  }
  window.addEventListener('pointerdown', unlock, { capture: true })
  window.addEventListener('keydown', unlock, { capture: true })
}

export function useUiSound() {
  function toggleSound() {
    soundOn.value = !soundOn.value
    setItem(KEY, soundOn.value ? '1' : '')
    // Turning it on IS a tap: load now, and the context may start now.
    if (soundOn.value) { load(); context() }
  }
  return { soundOn, toggleSound }
}
