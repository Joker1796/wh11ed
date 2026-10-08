import { playSound } from './uiSound.js'
import { soundsOwnState } from './stateSounds.js'

// The sound of a press (uiSound.js): a mechanical click as a button sinks and as it comes back up,
// and a heavier one with a longer travel for a big card. Played from pressFeedback.js at the same
// two moments its animation starts, so sound and motion are one event — except that a quick tap
// is heard once, as it goes down (owner, 2026-10-08): its let-go came while the press was still
// sounding, and the two ran into one smeared click.

const PRESS = { click: ['click-down', 'click-up'], card: ['card-down', 'card-up'] }

// A card is a big target: wider than a button row and taller than one line. Read from the
// element, so any large thing that sinks gets the heavier sound without being marked; a
// `data-press-sound="card" | "click"` overrides. A mark, a tab, a segment or a fold's head is
// silent under the finger: it sounds what it did instead (stateSounds.js).
const CARD_W = 200
const CARD_H = 80

// Held shorter than this, a press is a tap: no let-go sound. A finger's tap is 40–100 ms, a
// mouse click 80–120 ms; a press meant as a press is held longer.
const TAP_MS = 150

export function soundKindOf(el) {
  if (soundsOwnState(el)) return null
  const own = el?.dataset?.pressSound
  if (own === 'card' || own === 'click') return own
  return el && el.offsetWidth > CARD_W && el.offsetHeight > CARD_H ? 'card' : 'click'
}

// `phase` 0 — pressed, 1 — let go. `held` — how long a pointer held it (a key has none, and its
// press is heard whole). A let-go that comes before the sounds have loaded is dropped.
export function pressSound(el, phase, { held } = {}) {
  const sounds = PRESS[soundKindOf(el)]
  if (!sounds || (phase === 1 && held < TAP_MS)) return
  playSound(sounds[phase], { late: phase === 0 })
}
