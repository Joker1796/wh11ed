import { watch } from 'vue'

// Restarts a CSS animation class on an element, even if it is mid-run: remove, force a reflow,
// add back. The class comes off again when the animation ends, ready for the next time.
export function restartAnimation(el, cls) {
  if (!el) return
  el.classList.remove(cls)
  void el.offsetWidth
  el.classList.add(cls)
  el.addEventListener('animationend', () => el.classList.remove(cls), { once: true })
}

// Re-triggers a CSS animation class on an element whenever `source` changes (never on
// mount) — pair with the global `.vp-flash` keyframes in style.css. `target` is a template
// ref or a function returning the element (for v-for/array refs).
export function useFlashOnChange(source, target, cls = 'vp-flash') {
  watch(source, () => {
    restartAnimation(typeof target === 'function' ? target() : target.value, cls)
  })
}
