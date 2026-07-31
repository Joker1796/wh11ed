import { ref, onMounted, onUnmounted } from 'vue'

// Scroll-spy for the single Core Rules page: which of the anchors the TOC lists is
// currently at the top of the reading area. Drives the highlight in CoreRulesToc (inside
// the view) AND in App.vue's subnav (outside it) — hence the module-level ref, the same
// shared-singleton pattern as useLocale/useAbilityFilter. Only one page uses it, so there
// is never more than one writer.
//
// The rule is useViewRestore's currentSectionId(): the last anchor whose top has passed the
// header line. What differs is that this walks an EXPLICIT id list rather than a selector —
// `[id^="section-"]` would also match every subsection (`section-03-02`) and the highlight
// would drift off the chapter the reader is in. The list comes from the TOC itself, so the
// two can't disagree.
//
// Deliberately not IntersectionObserver: the chapters are `content-visibility: auto`, so
// their boxes appear and resize as they're revealed — re-reading positions on scroll is
// both simpler and always current.

export const activeSectionId = ref(null)

const HEADER_OFFSET = 110 // ~navbar + subnav

export function useActiveSection(ids) {
  function measure() {
    let found = null
    for (const id of ids.value) {
      const el = document.getElementById(id)
      if (!el) continue
      const rect = el.getBoundingClientRect()
      if (rect.height === 0) continue // collapsed / not laid out yet
      if (rect.top <= HEADER_OFFSET) found = id
      else break // document order = visual order: everything after is below the line too
    }
    activeSectionId.value = found
  }

  let raf = 0
  function onScroll() {
    if (raf) return
    raf = requestAnimationFrame(() => { raf = 0; measure() })
  }

  onMounted(() => {
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
  })
  onUnmounted(() => {
    if (raf) cancelAnimationFrame(raf)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    activeSectionId.value = null
  })

  return { activeId: activeSectionId, measure }
}
