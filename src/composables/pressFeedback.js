import { motionMs } from './motionToken.js'

// How a button answers the finger, app-wide, from ONE document listener (owner, 2026-09-28).
// Two feels:
//
// - **press** — the whole button sinks a little while held and comes back up on release. Every
//   shared button primitive gets it by class (PRESS_CLASSES, below); a one-off opts in with a bare
//   `data-press`.
// - **pop** (`data-press="pop"`) — for an icon button whose result stays on screen (a mark, a
//   toggle, "back to top"): the ICON sinks while held and springs back with a small wobble when
//   let go. Every checkbox row (a <label> holding a checkbox) pops its BOX the same way, found by
//   its shape — no row has to be marked.
//
// A pointer that slides off the button or turns into a scroll (pointercancel) just lets it rise; a
// keyboard press (a click with no pointer behind it) plays a pop whole.
//
// Web Animations rather than a class or `:active`: a tap usually flips the button's own `:class`
// (`on`), and Vue rewrites the whole attribute when a class binding changes, so an added class is
// gone before it can play; `:active` is unreliable on iOS and loses to every scoped `transition`
// a button already declares. Durations are motion tokens, so reduced motion turns it all off.

// The shared primitives from style.css (and the bottom nav). A per-screen button that wants the
// press says so with `data-press` instead of joining this list. NOT `.seg button`: its answer is the
// lit plate sliding over (segSlider.js), and a button shrinking inside a plate that does not left
// the plate showing round its edges.
const PRESS_CLASSES = ['.btn-primary', '.btn-ghost', '.tab', '.bn-item', '.filter-chip']
const CHECK_ROW = 'label:has(input[type="checkbox"])'
const SELECTOR = ['[data-press]', CHECK_ROW, ...PRESS_CLASSES].join(', ')

// A press sinks a button by about 4px of its width, within 3–10%: 0.96 on a 40px square is a
// pixel and a half nobody sees, the same 10% on a wide button reads as a lurch.
const pressedScale = (el) => `scale(${1 - Math.min(0.1, Math.max(0.03, 4 / (el.offsetWidth || 100)))})`
const SUNK = 'scale(0.8)'
const WOBBLE = [
  { transform: SUNK },
  { transform: 'scale(1.18)', offset: 0.35 },
  { transform: 'scale(0.94)', offset: 0.6 },
  { transform: 'scale(1.04)', offset: 0.8 },
  { transform: 'scale(1)' },
]

const held = new WeakMap() // button → { target, anim, pop, down }
const lastRelease = new WeakMap() // button → when it was last let go (see the click handler)

const boxOf = (el) => el.querySelector('input[type="checkbox"]')
const isPop = (el) => el.dataset.press === 'pop' || !!boxOf(el)

function targetOf(el, pop) {
  if (!pop) return el
  const box = boxOf(el)
  if (box) return box
  const icon = el.querySelector('i')
  // A transform does nothing to an inline box; a lone glyph draws the same as inline-block.
  if (icon && getComputedStyle(icon).display === 'inline') icon.style.display = 'inline-block'
  return icon
}

function press(el) {
  const pop = isPop(el)
  const target = targetOf(el, pop)
  const ms = motionMs('--motion-fast')
  if (!target?.animate || !ms) return false
  held.get(el)?.anim.cancel()
  const down = pop ? SUNK : pressedScale(el)
  const anim = target.animate([{ transform: 'scale(1)' }, { transform: down }], {
    duration: ms, easing: 'ease-out', fill: 'forwards',
  })
  held.set(el, { target, anim, pop, down })
  return true
}

function release(el, letGo) {
  const s = held.get(el)
  if (!s) return
  held.delete(el)
  lastRelease.set(el, performance.now())
  s.anim.cancel()
  const wobble = letGo && s.pop
  const ms = motionMs(wobble ? '--motion-count' : '--motion-fast')
  if (!ms) return
  s.target.animate(
    wobble ? WOBBLE : [{ transform: s.down }, { transform: 'scale(1)' }],
    { duration: ms, easing: wobble ? 'ease-out' : 'ease' },
  )
}

function pressable(target) {
  const el = target instanceof Element ? target.closest(SELECTOR) : null
  if (!el || el.disabled || el.getAttribute('aria-disabled') === 'true' || boxOf(el)?.disabled) return null
  return el
}

export function installPressFeedback(root = document) {
  root.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return
    const el = pressable(e.target)
    if (!el || !press(el)) return
    const up = () => done(true)
    const off = () => done(false)
    const done = (letGo) => {
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointerleave', off)
      el.removeEventListener('pointercancel', off)
      release(el, letGo)
    }
    el.addEventListener('pointerup', up)
    el.addEventListener('pointerleave', off)
    el.addEventListener('pointercancel', off)
  })
  // Enter / Space: no pointer went down, so a pop plays whole (a plain press has nothing to show).
  // A tap on a checkbox row's text makes the browser click the box as well, and that forwarded
  // click also has no pointer detail — so one just after a release is the same tap, not a key.
  root.addEventListener('click', (e) => {
    if (e.detail !== 0) return
    const el = pressable(e.target)
    if (!el || !isPop(el) || performance.now() - (lastRelease.get(el) ?? -1e9) < 400) return
    if (press(el)) release(el, true)
  })
}
