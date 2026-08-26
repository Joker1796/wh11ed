<template>
  <div class="app-layout" :style="{ '--mobile-bar-h': mobileBarVisible ? '3.5rem' : '0px' }">
    <DomainMoveBanner />
    <UpdateNoticeBar />

    <AppNavbar
      :mobile-nav-open="mobileNavOpen"
      @toggle-mobile-nav="toggleMobileNav"
      @open-search="searchOpen = true"
      @open-install-hint="installHintOpen = true"
    />

    <!-- Mobile drawer (visible only on mobile via NavSidebar internal CSS) -->
    <NavSidebar :mobileOpen="mobileNavOpen" @close="mobileNavOpen = false" />

    <AppSubnav />

    <!-- Overlay backdrop for drawer (fades in/out in step with the sliding drawer) -->
    <Transition name="fade">
      <div v-if="mobileNavOpen" class="nav-overlay" @click="mobileNavOpen = false"></div>
    </Transition>

    <main class="main-content" :class="{ 'main-content--wide': isCoreRoute || isEventRoute }">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
      <AppFooter v-if="!isTrackerGameRoute && !isRosterEditRoute" />
    </main>

    <AppBottomNav @open-rules="showRules = true" @open-factions="showFactions = true" />

    <WelcomeModal v-if="welcomeOpen" @close="welcomeOpen = false" />
    <SearchModal v-if="searchOpen" @close="searchOpen = false" />
    <InstallHintModal v-if="installHintOpen" @close="installHintOpen = false" />
    <FactionsNavModal v-if="showFactions" @close="showFactions = false" />
    <RulesNavModal v-if="showRules" @close="showRules = false" />
    <KeywordPopover />
    <MobileUtilityBar ref="mobileBarRef" :show-resume-game="showResumeGame" />
    <BackToTopButton v-if="isCoreRoute || isEventRoute || isCombatPatrolFactionRoute" />
    <UpdateToast />
    <OfflineWarmupToast />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
import { shouldWelcome } from './composables/useWelcome.js'
// Lazy: SearchModal pulls in useSearch.js, which imports every data file to build
// its index. Async-loading it keeps those data files out of the initial bundle.
const SearchModal = defineAsyncComponent(() => import('./components/SearchModal.vue'))
const InstallHintModal = defineAsyncComponent(() => import('./components/InstallHintModal.vue'))
const FactionsNavModal = defineAsyncComponent(() => import('./components/FactionsNavModal.vue'))
const RulesNavModal = defineAsyncComponent(() => import('./components/RulesNavModal.vue'))
import KeywordPopover from './components/KeywordPopover.vue'
import NavSidebar from './components/NavSidebar.vue'
import AppNavbar from './components/AppNavbar.vue'
import AppSubnav from './components/AppSubnav.vue'
import AppBottomNav from './components/AppBottomNav.vue'
import WelcomeModal from './components/WelcomeModal.vue'
import UpdateToast from './components/UpdateToast.vue'
import OfflineWarmupToast from './components/OfflineWarmupToast.vue'
import MobileUtilityBar from './components/MobileUtilityBar.vue'
import BackToTopButton from './components/BackToTopButton.vue'
import DomainMoveBanner from './components/DomainMoveBanner.vue'
import UpdateNoticeBar from './components/UpdateNoticeBar.vue'
import AppFooter from './components/AppFooter.vue'
import { useLocale } from './composables/useLocale.js'
import { useKeywordPopover, opensPopover } from './composables/useKeywordPopover.js'
import { useTracker } from './composables/useTracker.js'
import { resolveRef, useRefNavigation } from './composables/useRefNavigation.js'
import { useRouteSection } from './composables/useRouteSection.js'
import { useViewRestore } from './composables/useViewRestore.js'
import { applyRouteMeta } from './composables/useSeoMeta.js'

const route = useRoute()
useViewRestore() // PWA-only: remember & restore the last page + in-view section
const mobileNavOpen = ref(false)
const searchOpen = ref(false)
const installHintOpen = ref(false)
const showFactions = ref(false)
const showRules = ref(false)

function toggleMobileNav() {
  mobileNavOpen.value = !mobileNavOpen.value
}

const { locale } = useLocale()

// Per-route <title> + meta description (read-only w.r.t. the router; hash routing unchanged).
watch([() => route.path, locale], ([path, loc]) => applyRouteMeta(path, loc), { immediate: true })

const { open: openKeyword, openGloss, close: closeKeyword } = useKeywordPopover()
const { navigateTo } = useRefNavigation()

const {
  isLanding, isEventRoute, isCoreRoute, isCombatPatrolFactionRoute,
  isTrackerRoute, isTrackerGameRoute, isGameRosterRoute,
} = useRouteSection()

// The footer is a tall multi-column block — fine on content/browsing pages, but it just eats
// scarce mobile viewport below a dense, task-focused screen. Hidden on the tracker's own
// live-game screen (isTrackerGameRoute, from useRouteSection) and on the roster builder's
// creation wizard / editor (not the roster list, the shared-link landing, or a roster's
// read-only view — those are browsing, not configuring).
const isRosterEditRoute = computed(() =>
  route.path.startsWith('/roster') &&
  route.path !== '/roster' &&
  route.path !== '/roster/shared' &&
  !route.path.endsWith('/view')
)

// "Back to game" bar: only when a game is actively in progress and the user is reading something
// that isn't the game — anywhere outside the tracker, plus the one tracker screen that is itself
// a long read (a roster opened out of the live game). Hidden while a full-screen modal/drawer is
// open so it never overlaps them.
const { current: currentGame } = useTracker()
const showResumeGame = computed(() =>
  currentGame.value?.phase === 'playing' &&
  (!isTrackerRoute.value || isGameRosterRoute.value) &&
  !isLanding.value &&
  !searchOpen.value &&
  !installHintOpen.value &&
  !mobileNavOpen.value
)
// MobileUtilityBar decides its own visibility (resume / faction tabs / scroll-to-top, any
// combination); this just mirrors that via the template ref so --mobile-bar-h stays in sync
// without duplicating the logic.
const mobileBarRef = ref(null)
const mobileBarVisible = computed(() => !!mobileBarRef.value?.visible)

function onKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    searchOpen.value = true
  }
  if (e.key === 'Escape') {
    searchOpen.value = false
    mobileNavOpen.value = false
    showFactions.value = false
    closeKeyword()
  }
}

function onGlobalClick(e) {
  // A button that opened the popover on its own (a chip's "i", a rule name under a datasheet's
  // stats) is not "somewhere else" — without this its own click closes what it just opened.
  if (opensPopover(e.target)) return
  const refEl = e.target.closest('.cross-ref')
  if (refEl) {
    const { route, anchor } = resolveRef(refEl.dataset.ref)
    if (route && anchor) navigateTo({ route, anchor })
    return
  }
  const glossEl = e.target.closest('.gloss')
  if (glossEl) {
    openGloss(glossEl.dataset.gloss, glossEl.getBoundingClientRect())
    return
  }
  const kwEl = e.target.closest('.keyword')
  if (kwEl) {
    const text = kwEl.textContent.replace(/^\[|\]$/g, '').trim()
    openKeyword(text, kwEl.getBoundingClientRect())
  } else {
    closeKeyword()
  }
}

// The first-visit card, on the landing page only and only once (useWelcome.js). Decided on mount
// rather than in a route watcher: a reader who navigates TO the landing later in the session is
// already using the site, and telling them what it is at that point is noise.
const welcomeOpen = ref(false)

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onGlobalClick)
  welcomeOpen.value = shouldWelcome(route.path)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onGlobalClick)
})
</script>

<style scoped>
.app-layout {
  min-height: 100dvh;
  background: var(--bg-primary);
}

/* ── Overlay ── */
.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  z-index: 299;
}

/* ── Main content ── */
.main-content {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

/* Only the merged Core Rules and Event Companion pages: their prose chapters lay out in
   two columns (`.rule-columns` in style.css), which needs room. Every other section stays
   at the 860px reading measure. Below 900px the mobile padding rules take over and this
   has no effect. The background sets these two pages apart as a distinct content panel
   against the page's own background — `--bg-content` (style.css), a dedicated tone one
   gentle step up from `--bg-primary`, not `--bg-secondary` (that one is tuned as a
   *recessed* strip for the subnav and is darker than `--bg-primary` in light mode, which
   made a full panel look muddy). */
.main-content--wide {
  max-width: 1120px;
  background: var(--bg-content);
}

/* ── Mobile ── */
@media (max-width: 900px) {
  .main-content {
    padding: 0 calc(1rem + var(--safe-right)) calc(4.5rem + var(--safe-bottom) + var(--mobile-bar-h, 0px)) calc(1rem + var(--safe-left));
  }
}

/* Very narrow phones (≤480px): the 900px tier's 1rem gutter still wastes a large share
   of a 320-375px viewport, so shrink it further here — almost-zero but not edge-to-edge. */
@media (max-width: 480px) {
  .main-content {
    padding: 0 calc(0.5rem + var(--safe-right)) calc(4.5rem + var(--safe-bottom) + var(--mobile-bar-h, 0px)) calc(0.5rem + var(--safe-left));
  }
}

/* Roster creation wizard's fixed Back/Next bar (RosterCreateView's .rc-sticky — an unscoped
   class name reached across the component boundary via :has(), same trick as its own
   .rc-panel:has(.rc-sticky)) is glued flush above the bottom nav and doesn't move. It floats
   in the same bottom-right corner MobileUtilityBar's own buttons (resume/faction tabs/
   back-to-top) want, so THEY yield instead: this reserves the bar's real height in a variable
   MobileUtilityBar's own bottom offset adds (see its .mobile-bar rule) — always the fixed
   .rc-sticky height, not RosterEditorView's unrelated .red-sticky (a sticky totals readout,
   no buttons, nothing to block). */
.app-layout:has(.rc-sticky) { --roster-sticky-h: 3.75rem; }
</style>
