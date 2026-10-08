import { onBeforeUnmount, watch } from 'vue'

// Closes a dropdown on a tap anywhere else — the settings gear's menu, PickerDropdown, the sync
// indicator's note. It used to be a transparent backdrop over the whole screen, and that backdrop
// covered the dropdown's own trigger too: a second tap on the gear closed the menu through it
// without pressing the gear — no sink, no sound (owner, 2026-10-08). Listeners on the window do
// what the backdrop did, and leave the trigger reachable:
//
// - a tap inside (`inside()` — the trigger and the panel) passes untouched: the trigger presses,
//   sounds and toggles like any button;
// - a tap outside closes, and is swallowed as the backdrop swallowed it — the thing under the
//   finger neither presses (pointerdown stopped before pressFeedback) nor acts (its click stopped).
//
// Closed on the pointer's release, not on `click`: iOS sends no click for a tap on something it
// does not consider clickable, and the page around a menu mostly is not. A drag that turns into a
// scroll is cancelled, not released, so scrolling past an open menu leaves it open.
export function useOutsideTap(open, inside, close) {
  let downOutside = false
  const isOutside = (t) => !(t instanceof Node) || !inside().some((el) => el?.contains(t))

  function onDown(e) {
    downOutside = e.button === 0 && isOutside(e.target)
    if (downOutside) e.stopPropagation()
  }
  function onUp(e) {
    if (!downOutside) return
    downOutside = false
    if (!isOutside(e.target)) return
    e.stopPropagation()
    swallowNextClick()
    close()
  }

  function listen(on) {
    const method = on ? 'addEventListener' : 'removeEventListener'
    window[method]('pointerdown', onDown, true)
    window[method]('pointerup', onUp, true)
  }
  // Added after the tap that opened it has gone by: a watcher runs after that event's listeners.
  watch(open, (v) => listen(!!v), { immediate: true })
  onBeforeUnmount(() => listen(false))
}

// The click that follows a closing release, if one comes — outliving the listeners above, which
// go as soon as the dropdown has closed.
function swallowNextClick() {
  const stop = (e) => { e.stopPropagation(); e.preventDefault(); done() }
  const done = () => { window.removeEventListener('click', stop, true); clearTimeout(timer) }
  window.addEventListener('click', stop, true)
  const timer = setTimeout(done, 400)
}
