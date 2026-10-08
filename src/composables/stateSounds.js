import { playSound } from './uiSound.js'

// What sounds by what it DID rather than by the finger (uiSound.js), from document listeners like
// pressFeedback.js, so no component has to call anything:
//
// - a MARK — star, pin, checkbox — by its new state, `toggle-on` / `toggle-off`. A button says it
//   is one with `data-press-sound="toggle"` (plus `aria-pressed`); a checkbox is found by shape.
// - a SWITCH — a tab, a segment, a fold's head — slides, `seg` (owner, 2026-10-08: the tracker's
//   tabs and the accordions sound like the segmented switch). Found by its ARIA: `role="tab"`, a
//   `.seg` button, a button with `aria-expanded` — except one that opens a menu or a picker, which
//   says so with `aria-haspopup` and is an ordinary press.
//
// Either one is silent under the finger (pressSound.js asks `soundsOwnState`): one action, one
// sound. Capture phase: a mark inside a clickable row stops its click (`@click.stop`).

const MARK = '[data-press-sound="toggle"]'
const SWITCH = '[role="tab"], .seg > button, button[aria-expanded]:not([aria-haspopup])'

const isCheckRow = (el) => el.tagName === 'LABEL' && !!el.querySelector('input[type="checkbox"]')

export function soundsOwnState(el) {
  return !!el?.matches && (el.matches(MARK) || el.matches(SWITCH) || isCheckRow(el))
}

// A tap always flips a mark or a fold, and always moves a tab or a segment that is not lit — so
// what it will do is known as it is tapped, and read then, not after: a pinned unit's button is
// drawn anew in the "Pinned" group, and the node tapped is gone with the old state on it.
const isLit = (el) => el.getAttribute('aria-selected') === 'true' || (el.parentElement?.classList.contains('seg') && el.classList.contains('on'))

export function installStateSounds(root = document) {
  root.addEventListener('change', (e) => {
    const box = e.target
    if (box instanceof HTMLInputElement && box.type === 'checkbox') playSound(box.checked ? 'toggle-on' : 'toggle-off')
  }, true)

  root.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return
    const mark = e.target.closest(MARK)
    if (mark) {
      if (!mark.disabled) playSound(mark.getAttribute('aria-pressed') === 'true' ? 'toggle-off' : 'toggle-on')
      return
    }
    const sw = e.target.closest(SWITCH)
    if (sw && !sw.disabled && sw.getAttribute('aria-disabled') !== 'true' && !isLit(sw)) playSound('seg')
  }, true)
}
