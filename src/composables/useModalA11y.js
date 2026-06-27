import { onMounted, onBeforeUnmount } from 'vue'

// Shared modal accessibility: Escape-to-close, a Tab focus trap, initial focus into the
// dialog, focus restore to the trigger on close, and a (nest-safe) body scroll lock.
// Pass the dialog root element ref and a close callback.

const FOCUSABLE =
  'a[href],area[href],button:not([disabled]),input:not([disabled]),' +
  'select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

// Body scroll lock is reference-counted so stacked modals don't unlock prematurely.
let lockCount = 0
let savedOverflow = ''
let savedPadRight = ''
function lockScroll() {
  if (lockCount === 0) {
    const sbw = window.innerWidth - document.documentElement.clientWidth
    savedOverflow = document.body.style.overflow
    savedPadRight = document.body.style.paddingRight
    document.body.style.overflow = 'hidden'
    // Compensate for the vanishing scrollbar so the page doesn't shift (skip the bogus
    // width jsdom reports in tests).
    if (sbw > 0 && sbw < 40) document.body.style.paddingRight = `${sbw}px`
  }
  lockCount++
}
function unlockScroll() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    document.body.style.overflow = savedOverflow
    document.body.style.paddingRight = savedPadRight
  }
}

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
    lockScroll()
    // Move focus into the dialog so keyboard/screen-reader users land inside it.
    requestAnimationFrame(() => rootRef.value?.focus?.())
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey)
    unlockScroll()
    if (prevActive && typeof prevActive.focus === 'function') prevActive.focus()
  })
}
