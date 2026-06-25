import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { scrollToAnchor } from './useRefNavigation.js'
import { isStandaloneDisplay } from './standalone.js'
import { LAST_ROUTE_KEY, SKIP_RESTORE } from '../router/index.js'

// PWA-only "resume where I left off". The router (router/index.js) restores the saved
// `path#section` on first launch; this composable owns PERSISTENCE — it tracks which
// in-page section is at the top of the viewport (a scroll-spy, since scrolling never
// touches the URL hash) and writes `path#section-anchor` back to LAST_ROUTE_KEY — and the
// robust re-scroll to that section on launch (correcting for late-loading illustrations).

// Section anchors set by the views: rules (`section-NN…`), reference abilities
// (`ability-NN_MM`), and the Event Companion in-page sections (sequence steps, missions,
// pairings/rankings). Matches the ids in router/index.js navGroups/eventGroups.
const SECTION_SELECTOR =
  '[id^="section-"], [id^="ability-"], [id^="step-"], [id^="missions-"], [id^="pairing-"], [id^="ranking-"]'
const HEADER_OFFSET = 110 // ~navbar + subnav; a section counts as "current" once its top passes this line

// The id of the last section whose top is at/above the header line (= the one occupying
// the top of the content area), or null when scrolled above the first section. Handles
// subsections: second-level `section-NN-MM` (always-visible RuleBlock) and third-level
// `section-NN-MM-NN` (SubRuleBlock — its `<section>` wrapper stays in the DOM even when
// the accordion is collapsed, so its header position is tracked). Exported for unit testing.
export function currentSectionId() {
  let anchor = null
  for (const el of document.querySelectorAll(SECTION_SELECTOR)) {
    const rect = el.getBoundingClientRect()
    // Skip anchors hidden inside collapsed accordions (e.g. h4 `section-NN-MM-hN` under a
    // collapsed SubRuleBlock): display:none gives a 0×0 rect at top 0 that would otherwise
    // falsely win. Don't `break` on them — later siblings may still be visible.
    if (rect.height === 0) continue
    // querySelectorAll yields document order = visual order, so the first VISIBLE element
    // below the line means everything after it is below too.
    if (rect.top <= HEADER_OFFSET) anchor = el.id
    else break
  }
  return anchor
}

export function useViewRestore() {
  if (!isStandaloneDisplay()) return // normal browser tab — leave the URL/storage untouched
  const route = useRoute()

  function persist() {
    if (SKIP_RESTORE.has(route.path)) return
    // Prefer the scrolled-to section; fall back to an explicit URL hash (cross-ref /
    // subnav navigation) while still at the top of a freshly opened page.
    const anchor = currentSectionId() || (route.hash ? route.hash.slice(1) : null)
    try {
      localStorage.setItem(LAST_ROUTE_KEY, anchor ? `${route.path}#${anchor}` : route.path)
    } catch { /* quota / private mode — ignore */ }
  }

  let raf = 0
  function onScroll() {
    if (raf) return
    raf = requestAnimationFrame(() => { raf = 0; persist() })
  }

  onMounted(async () => {
    await nextTick()
    // If the router restored us onto a section, re-scroll robustly (the initial
    // scrollBehavior can fire before async illustrations have laid the page out). Don't
    // persist here — the saved value already matches, and scrolling would clobber it with
    // a top-of-page reading mid-animation. A fresh launch with no section persists once.
    if (route.hash) scrollToAnchor(route.hash.slice(1))
    else persist()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))

  // Each navigation resets the remembered location to the new page (after it renders);
  // the scroll-spy then refines it with the section as the user reads.
  watch(() => route.fullPath, () => nextTick().then(persist))
}
