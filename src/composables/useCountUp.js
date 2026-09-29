import { ref, watch, onBeforeUnmount } from 'vue'
import { motionMs } from './motionToken.js'

// A number that runs to its new value instead of jumping — the roster total "counting up" as a
// unit lands (owner request, 2026-09-28). Starts at the source's value (no count on mount), and a
// change mid-run continues from wherever the count has got to.
//
// The duration is the CSS token `--motion-count` read at each change, so the one
// prefers-reduced-motion override in style.css (token → 0s) makes it jump straight to the value.
export function useCountUp(source) {
  const shown = ref(source())
  let frame = 0

  watch(source, (to) => {
    cancelAnimationFrame(frame)
    const from = shown.value
    const ms = motionMs('--motion-count')
    if (!ms || from === to) {
      shown.value = to
      return
    }
    const t0 = performance.now()
    const step = (now) => {
      const t = Math.min(1, (now - t0) / ms)
      const eased = 1 - (1 - t) ** 3 // ease-out: quick at first, settling on the value
      shown.value = Math.round(from + (to - from) * eased)
      if (t < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
  })
  onBeforeUnmount(() => cancelAnimationFrame(frame))

  return shown
}
