// A context menu for the things in a list: the right click on a desktop, the long press on a phone
// (owner, 2026-10-21 — the faction's unit chips). One handler for both, `onMenu(el, point)`, where
// `el` is the item under the finger (the closest `selector`) and `point` the spot to open at.
//
// Why a timer and not the browser's own event: Android turns a long press into `contextmenu`, iOS
// Safari never does — it shows its own link preview instead (the items take
// `-webkit-touch-callout: none` to switch that off). So a touch is timed here, and the
// `contextmenu` Android sends at the same moment is swallowed as a repeat. A finger that moves is
// scrolling, not pressing; and a press that opened the menu must not also be a tap when it lifts.
// That click goes to whatever is under the finger by then — on a phone the menu's own sheet, whose
// first row rose right under it ("Open", 2026-10-21) — so it is stopped at the document.
const HOLD_MS = 450
const SLOP_PX = 10

export function useLongPress(selector, onMenu) {
  let timer = null
  let start = null
  let openedAt = 0
  let held = false

  const cancel = () => { clearTimeout(timer); timer = null }
  const itemOf = (e) => (e.target instanceof Element ? e.target.closest(selector) : null)
  const at = (x, y) => ({ left: x, right: x, top: y, bottom: y })

  function open(el, point) {
    // The touch and Android's contextmenu for the same press: one menu.
    if (Date.now() - openedAt < 700) return
    openedAt = Date.now()
    onMenu(el, point)
  }

  function onPointerDown(e) {
    if (e.pointerType !== 'touch') return
    held = false
    const el = itemOf(e)
    if (!el) return
    start = { x: e.clientX, y: e.clientY }
    cancel()
    timer = setTimeout(() => {
      timer = null
      held = true
      open(el, at(start.x, start.y))
    }, HOLD_MS)
  }
  function onPointerMove(e) {
    if (timer && start && Math.hypot(e.clientX - start.x, e.clientY - start.y) > SLOP_PX) cancel()
  }
  function onContextMenu(e) {
    const el = itemOf(e)
    if (!el) return
    e.preventDefault()
    open(el, at(e.clientX, e.clientY))
  }
  // The lift of a press that opened the menu: the click it is about to make is stopped, wherever
  // it lands. A browser that sends none after a hold leaves the guard to expire.
  function onPointerUp() {
    cancel()
    if (!held) return
    held = false
    const stop = (e) => { e.preventDefault(); e.stopPropagation(); done() }
    const done = () => { clearTimeout(expiry); document.removeEventListener('click', stop, true) }
    document.addEventListener('click', stop, true)
    const expiry = setTimeout(done, 400)
  }

  return {
    listeners: {
      pointerdown: onPointerDown,
      pointermove: onPointerMove,
      pointerup: onPointerUp,
      pointercancel: cancel,
      contextmenu: onContextMenu,
    },
  }
}
