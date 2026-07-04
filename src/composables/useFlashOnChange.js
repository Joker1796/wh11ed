import { watch, onBeforeUnmount } from 'vue'

// Re-triggers a CSS animation class on an element whenever `source` changes (never on
// mount) — pair with the global `.vp-flash` keyframes in style.css. `target` is a template
// ref or a function returning the element (for v-for/array refs).
export function useFlashOnChange(source, target, cls = 'vp-flash') {
  let timer = null
  watch(source, () => {
    const el = typeof target === 'function' ? target() : target.value
    if (!el) return
    // Remove + forced reflow restarts the animation even mid-flash.
    el.classList.remove(cls)
    void el.offsetWidth
    el.classList.add(cls)
    clearTimeout(timer)
    timer = setTimeout(() => el.classList.remove(cls), 600)
  })
  onBeforeUnmount(() => clearTimeout(timer))
}
