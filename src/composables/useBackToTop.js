import { ref, computed } from 'vue'

// Module-scope scroll tracking, same idiom as useTracker.js's pagehide/visibilitychange
// listeners — installed once, never torn down, cheap enough to just always be on.
const scrollY = ref(window.scrollY)
let ticking = false
window.addEventListener(
  'scroll',
  () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      scrollY.value = window.scrollY
      ticking = false
    })
  },
  { passive: true },
)

// Honours prefers-reduced-motion (the app zeroes all CSS motion there, so a smooth JS scroll
// would be the odd one out). Shared by every back-to-top button in the app.
export function scrollToTop() {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

export function useBackToTop(threshold = 500) {
  return { visible: computed(() => scrollY.value > threshold), scrollToTop }
}
