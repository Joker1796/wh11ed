import { onMounted, onBeforeUnmount } from 'vue'

// Shared modal accessibility: Escape-to-close, a Tab focus trap, initial focus into the
// dialog, and focus restore to the trigger on close. Pass the dialog root element ref and
// a close callback.
//
// Deliberately NO body scroll lock: on iOS Safari `body{overflow:hidden}` resets the scroll
// position (the page jumps/sticks to the top on open/close) and doesn't reliably lock anyway.
// Background scroll-chaining is already contained by `.modal-body { overscroll-behavior:
// contain }` in style.css, which is the iOS-safe approach.

const FOCUSABLE =
  'a[href],area[href],button:not([disabled]),input:not([disabled]),' +
  'select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function useModalA11y(rootRef, onClose) {
  let prevActive = null

  function focusables() {
    const root = rootRef.value
    if (!root) return []
    return Array.from(root.querySelectorAll(FOCUSABLE)).filter(
      (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement,
    )
  }

  function onKey(e) {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    if (e.key !== 'Tab') return
    const items = focusables()
    if (!items.length) {
      e.preventDefault()
      rootRef.value?.focus()
      return
    }
    const first = items[0]
    const last = items[items.length - 1]
    const active = document.activeElement
    const inside = rootRef.value?.contains(active)
    if (e.shiftKey) {
      if (!inside || active === first) {
        e.preventDefault()
        last.focus()
      }
    } else if (!inside || active === last) {
      e.preventDefault()
      first.focus()
    }
  }

  onMounted(() => {
    prevActive = document.activeElement
    window.addEventListener('keydown', onKey)
    // Move focus into the dialog so keyboard/screen-reader users land inside it.
    requestAnimationFrame(() => rootRef.value?.focus?.())
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey)
    if (prevActive && typeof prevActive.focus === 'function') prevActive.focus()
  })
}
