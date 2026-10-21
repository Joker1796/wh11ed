<template>
  <div
    class="app-layout"
    :style="{ '--mobile-bar-h': mobileBarVisible ? '3.5rem' : '0px' }"
  >
    <DomainMoveBanner v-if="!isBare" />
    <BetaBanner v-if="IS_BETA && !isBare" />
    <!-- The tracker tour (useTour.js): mounted only where a screen has chapters — the tracker and
         the rosters — so a tab reading rules never loads it (~19 KB gzip of chapters). -->
    <TourOverlay
      v-if="TOUR_ON && tourScreen"
      :page="pageKey"
    />
    <UpdateNoticeBar v-if="!isBare" />

    <AppNavbar
      v-if="!isBare"
      ref="navbarRef"
      :mobile-nav-open="mobileNavOpen"
      @toggle-mobile-nav="toggleMobileNav"
      @open-search="searchOpen = true"
      @open-install-hint="installHintOpen = true"
    />

    <!-- Mobile drawer (visible only on mobile via NavSidebar internal CSS) -->
    <NavSidebar
      v-if="!isBare"
      :mobile-open="mobileNavOpen"
      @close="mobileNavOpen = false"
    />

    <AppSubnav v-if="!isBare" />

    <!-- Overlay backdrop for drawer (fades in/out in step with the sliding drawer) -->
    <Transition name="fade">
      <div
        v-if="mobileNavOpen"
        class="nav-overlay"
        @click="mobileNavOpen = false"
      />
    </Transition>

    <main
      class="main-content"
      :class="{ 'main-content--wide': isCoreRoute || isEventRoute || isFactionPageRoute || isCombatPatrolPageRoute, 'main-content--broad': isFactionsIndexRoute, 'main-content--desk': isRosterDeskRoute || isRosterBrowseDesk, 'main-content--browse': isRosterBrowseDesk, 'main-content--fill': isFactionUnitsDesk }"
    >
      <RouterView v-slot="{ Component }">
        <Transition
          name="fade"
          mode="out-in"
          @before-leave="pageLeaving"
          @enter="pageArrived"
        >
          <component
            :is="Component"
            :key="pageKey"
          />
        </Transition>
      </RouterView>
      <AppFooter v-if="!isTrackerGameRoute && !isRosterEditRoute && !isRosterBrowseDesk && !isFactionUnitsDesk && !isBare" />
    </main>

    <AppBottomNav
      v-if="!isBare"
      @open-rules="showRules = true"
      @open-factions="showFactions = true"
    />

    <WelcomeModal
      v-if="welcomeOpen"
      @close="welcomeOpen = false"
    />
    <AppFirstRun
      v-if="appFirstOpen"
      @close="appFirstOpen = false"
    />
    <InstallOffer
      v-if="installOfferOpen && appUpdate.phase === 'idle' && cacheMigration.phase !== 'shown'"
      @close="installOfferOpen = false"
      @ios-help="installHintOpen = true"
    />
    <Transition name="search">
      <SearchModal
        v-if="searchOpen"
        :anchor="searchAnchor"
        @close="searchOpen = false"
      />
    </Transition>
    <InstallHintModal
      v-if="installHintOpen"
      @close="installHintOpen = false"
    />
    <FeedbackModal v-if="feedbackOpen" />
    <SignInModal v-if="signInOpen" />
    <FactionsNavModal
      v-if="showFactions"
      @close="showFactions = false"
    />
    <RulesNavModal
      v-if="showRules"
      @close="showRules = false"
    />
    <KeywordPopover />
    <!-- A faction's unit keyword tapped in rule prose → the units carrying it (useFactionKeywordUnits). -->
    <KeywordUnitsModal
      v-if="fkwShown"
      :keyword="fkwShown.keyword"
      :heading="fkwShown.heading"
      :units="fkwShown.units"
      :faction-slug="fkwShown.factionSlug"
      :anchor="fkwShown.anchor"
      @close="closeFactionKeyword"
    />
    <UnitCardModal
      v-if="unitLink"
      :key="unitLink.slug + '/' + unitLink.id"
      :unit-id="unitLink.id"
      :faction-slug="unitLink.slug"
      @close="unitLink = null"
    />
    <MobileUtilityBar
      v-if="!isBare"
      ref="mobileBarRef"
      :show-resume-game="showResumeGame"
      :resume-draft-id="resumeDraftId"
    />
    <BackToTopButton v-if="isCoreRoute || isEventRoute || isCombatPatrolPageRoute" />
    <UpdateToast v-if="!holdReloads && workerOn" />
    <OfflineWarmupToast v-if="!isBare && appUpdate.phase === 'idle'" />
    <UpdatePlate v-if="!isBare" />
    <ErrorReportsOffer
      v-if="errorOfferOpen && cacheMigration.phase !== 'shown'"
      @close="errorOfferOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { pageLeaving, pageArrived } from './composables/usePageMotion.js'
import { useRoute, useRouter } from 'vue-router'
import { shouldWelcome } from './composables/useWelcome.js'
import { appFirstRunDue, countVisit, offerDue, offerShown, preview as installPreview } from './composables/installPath.js'
import { useInstallPrompt } from './composables/useInstallPrompt.js'
import { useFeedbackModal } from './composables/useFeedbackModal.js'
import { useSignInModal } from './composables/useSignInModal.js'
import { useBackToCloseWhile } from './composables/useBackToClose.js'
// Lazy: SearchModal pulls in useSearch.js, which imports every data file to build
// its index. Async-loading it keeps those data files out of the initial bundle.
// A page caught reloading itself in a loop gets no update applied for a while (reloadLoop.js):
// without the toast's service worker nothing reloads it.
const holdReloads = reloadsHeld()
// Whether this page runs under a service worker (workerPolicy.js): the installed app and a tab beside
// it always; any other tab only while it still has one from before 2.9.5 — until its plate moves it
// off (cacheMigration.js). A tab without one watches the server's version itself (tabFreshness.js).
const workerOn = ref(workerWanted())
const SearchModal = defineAsyncComponent(() => import('./components/SearchModal.vue'))
// Loaded only where the tour exists; the flag is read here, not from useTour, so the chapters'
// texts stay out of the root bundle.
const TourOverlay = defineAsyncComponent(() => import('./components/TourOverlay.vue'))
const TOUR_ON = true // on everywhere since the new tracker moved to the site (useTour.js)
const InstallHintModal = defineAsyncComponent(() => import('./components/InstallHintModal.vue'))
const InstallOffer = defineAsyncComponent(() => import('./components/InstallOffer.vue'))
const ErrorReportsOffer = defineAsyncComponent(() => import('./components/ErrorReportsOffer.vue'))
// A unit an ability brings into the game, tapped in rule prose (`.unit-link`): its card over the
// page, so a reader in a roster or a game stays where they are (src/utils/unitLinkMarkup.js).
const UnitCardModal = defineAsyncComponent(() => import('./components/roster/RosterUnitRulesModal.vue'))
const unitLink = ref(null)
const AppFirstRun = defineAsyncComponent(() => import('./components/AppFirstRun.vue'))
// Async like the search palette: the dialog pulls the tracker store for its attach offer.
const FeedbackModal = defineAsyncComponent(() => import('./components/FeedbackModal.vue'))
const SignInModal = defineAsyncComponent(() => import('./components/SignInModal.vue'))
const FactionsNavModal = defineAsyncComponent(() => import('./components/FactionsNavModal.vue'))
const RulesNavModal = defineAsyncComponent(() => import('./components/RulesNavModal.vue'))
import KeywordPopover from './components/KeywordPopover.vue'
import KeywordUnitsModal from './components/KeywordUnitsModal.vue'
import { useFactionKeywordUnits } from './composables/useFactionKeywordUnits.js'
import NavSidebar from './components/NavSidebar.vue'
import AppNavbar from './components/AppNavbar.vue'
import AppSubnav from './components/AppSubnav.vue'
import AppBottomNav from './components/AppBottomNav.vue'
import WelcomeModal from './components/WelcomeModal.vue'
import UpdateToast from './components/UpdateToast.vue'
import { reloadsHeld } from './composables/reloadLoop.js'
import OfflineWarmupToast from './components/OfflineWarmupToast.vue'
import UpdatePlate from './components/UpdatePlate.vue'
import { appUpdate } from './composables/useAppUpdate.js'
import { cacheMigration, watchForCalm } from './composables/cacheMigration.js'
import { watchTabFreshness } from './composables/tabFreshness.js'
import { currentRegistration, tabMayLeaveWorker, tidyAfterWorker, workerWanted } from './composables/workerPolicy.js'
import MobileUtilityBar from './components/MobileUtilityBar.vue'
import BackToTopButton from './components/BackToTopButton.vue'
import DomainMoveBanner from './components/DomainMoveBanner.vue'
import BetaBanner from './components/BetaBanner.vue'
import { IS_BETA } from './config.js'
import UpdateNoticeBar from './components/UpdateNoticeBar.vue'
import AppFooter from './components/AppFooter.vue'
import { useLocale } from './composables/useLocale.js'
import { useAuth } from './composables/useAuth.js'
import { ERROR_OFFER_KEY, onUnsentError, reportsOn } from './composables/useErrorLog.js'
import { getItem, setItem } from './composables/safeStorage.js'
import { startPrefsSync } from './composables/useUserPrefs.js'
import { useKeywordPopover, opensPopover } from './composables/useKeywordPopover.js'
import { gameInPlay } from './composables/gameInPlay.js'
import { resolveRef, useRefNavigation } from './composables/useRefNavigation.js'
import { useRouteSection } from './composables/useRouteSection.js'
import { useMediaQuery } from './composables/useMediaQuery.js'
import { useRosterDraftResume } from './composables/useRosterDraftResume.js'
import { useViewRestore } from './composables/useViewRestore.js'
import { applyRouteMeta } from './composables/useSeoMeta.js'
import { localePath, stripLocale } from './router/locale.js'

const route = useRoute()
const router = useRouter()
const { open: feedbackOpen } = useFeedbackModal()
const { open: signInOpen } = useSignInModal()
useViewRestore() // PWA-only: remember & restore the last page + in-view section
const { ensureSession, status: authStatus } = useAuth()
const mobileNavOpen = ref(false)
// The drawer is a page to a phone: Back closes it before it leaves the route (useBackToClose.js).
useBackToCloseWhile(mobileNavOpen, () => { mobileNavOpen.value = false })
const searchOpen = ref(false)
const installHintOpen = ref(false)
const showFactions = ref(false)
const showRules = ref(false)

function toggleMobileNav() {
  mobileNavOpen.value = !mobileNavOpen.value
}

const { locale } = useLocale()

// The address carries the language (`/ru/…`); everything that asks "which page is this?" must ask
// without it, or every predicate written against a bare path quietly stops matching in Russian.
const appPath = computed(() => stripLocale(route.path))
// The screens that carry tutorial chapters (they import useTour themselves).
const tourScreen = computed(() => /^\/(?:tracker|roster)(?:\/|$)/.test(appPath.value))
// What counts as "another page" for the swap above. A route with children (a faction's pages)
// is one page per faction: moving between its tabs changes the child, drawn by the parent's own
// RouterView (FactionPagesView), and must not re-create the parent — that is what kept the hero
// and the tabs sliding out and in with every tab (2026-09-28).
const pageKey = computed(() => {
  // The rosters desk: the list and every roster's page are ONE screen on a wide window
  // (RosterDeskView) — opening another roster changes its right-hand side, not the page.
  if (isRosterBrowseDesk.value) return 'roster-desk'
  return route.matched.length > 1 ? `${route.matched[0].path}|${route.params.slug ?? ''}` : appPath.value
})
// A bare route (the broadcast overlay OBS captures) renders with NO app chrome at all —
// navbar, drawer, subnav, bottom nav, utility bar and toasts stay out of the frame.
const isBare = computed(() => !!route.meta.bare)

// Per-route <title> + meta description (read-only w.r.t. the router; hash routing unchanged).
watch([() => route.path, locale], ([path, loc]) => applyRouteMeta(path, loc), { immediate: true })

const { open: openKeyword, openGloss, close: closeKeyword } = useKeywordPopover()
const { shown: fkwShown, openFactionKeyword, closeFactionKeyword } = useFactionKeywordUnits()
// The faction whose page this is, for a keyword several factions share.
const pageFaction = computed(() => (appPath.value.startsWith('/factions/') ? route.params.slug || null : null))
const { navigateTo } = useRefNavigation()

const {
  isLanding, isEventRoute, isCoreRoute,
  isTrackerRoute, isTrackerGameRoute, isGameRosterRoute,
} = useRouteSection()

// The footer is a tall multi-column block — fine on content/browsing pages, but it just eats
// scarce mobile viewport below a dense, task-focused screen. Hidden on the tracker's own
// live-game screen (isTrackerGameRoute, from useRouteSection) and on the roster builder's
// creation wizard / editor (not the roster list, the shared-link landing, or a roster's
// read-only view — those are browsing, not configuring).
const isRosterEditRoute = computed(() =>
  appPath.value.startsWith('/roster') &&
  appPath.value !== '/roster' &&
  appPath.value !== '/roster/shared' &&
  !appPath.value.endsWith('/view')
)

// The two building screens lay themselves out in three columns above 1200px (see
// components/roster/RosterWorkbench.vue), which the 860px reading measure cannot hold. Printing
// is excluded: it is a roster route by path, but its width is the paper's.
const isRosterDeskRoute = computed(() => isRosterEditRoute.value && !appPath.value.endsWith('/print'))
// The factions index lays its four groups out as four columns, which the 860px measure cannot fit.
const isFactionsIndexRoute = computed(() => appPath.value === '/factions')
// A faction's own page — its rules, units and FAQ tabs, one width for all three so a tab switch
// does not move the page: the rules lay their long texts out in two columns, like the Core Rules
// (owner, 2026-10-13). A unit's datasheet stays at the reading measure.
const isFactionPageRoute = computed(() => /^\/factions\/[^/]+(\/(datasheets|faq))?$/.test(appPath.value))
// A Combat Patrol box and "How to play": laid out like a faction page and the Event Companion
// (two columns from 1024px), so they take the same wide panel. The box list stays at the measure.
const isCombatPatrolPageRoute = computed(() => /^\/combat-patrol\/[^/]+$/.test(appPath.value))
// The list of rosters and a saved roster's page, which a window wider than the bottom nav's
// 900px shows as one screen of columns (RosterDeskView): as wide as the builder's desk, filling the
// window with no footer under it, and one page for the swap (pageKey).
const rosterBrowseWide = useMediaQuery('(min-width: 901px)')
const isRosterBrowseDesk = computed(() => rosterBrowseWide.value &&
  (appPath.value === '/roster' || /^\/roster\/[^/]+\/view$/.test(appPath.value)))
// A faction's units on a wide screen: the list and the unit scroll in columns that fill the window
// (FactionDatasheetsView), so the page itself does not scroll and has no footer under it.
const isFactionUnitsDesk = computed(() => rosterBrowseWide.value && /^\/factions\/[^/]+\/datasheets$/.test(appPath.value))

// "Back to game" bar: only when a game is actively in progress and the user is reading something
// that isn't the game — anywhere outside the tracker, plus the one tracker screen that is itself
// a long read (a roster opened out of the live game). Hidden while a full-screen modal/drawer is
// open so it never overlaps them.
// Not over the roster builder: the chip floated on the list pane's corner and covered a unit
// (a player's report, 2026-09-19), and the builder's footer has no room left for it. The game is
// one tap away on the bottom nav's Tracker. The front page shows it too (owner, 2026-10-05): it
// was left out from the start, and a player coming back to the app mid-game lands there first.
const showResumeGame = computed(() =>
  gameInPlay.value &&
  (!isTrackerRoute.value || isGameRosterRoute.value) &&
  !isRosterEditRoute.value &&
  !searchOpen.value &&
  !installHintOpen.value &&
  !mobileNavOpen.value
)
// "Back to your roster": the same idea one screen over. The creation wizard is left on purpose
// mid-build — to go read what a detachment does — and its draft survives that, but the way back
// didn't: /roster opens on Saved lists and the draft is one tab over, so a returning reader saw a
// list without their roster in it. RosterCreateView notes the draft as it unmounts; the id is a
// hint, so re-check it's still a draft — it may have been saved (finish() clears the flags) or
// deleted from the list while the chip was up (draftToResume does).
const { draftToResume } = useRosterDraftResume()
const resumeDraftId = computed(() => {
  if (appPath.value === '/roster/new') return null
  if (isLanding.value || searchOpen.value || installHintOpen.value || mobileNavOpen.value) return null
  return draftToResume()
})

// MobileUtilityBar decides its own visibility (resume / faction tabs / scroll-to-top, any
// combination); this just mirrors that via the template ref so --mobile-bar-h stays in sync
// without duplicating the logic.
const mobileBarRef = ref(null)
// The navbar's search button: on a wide screen the search field unfolds out of it.
const navbarRef = ref(null)
const searchAnchor = () => navbarRef.value?.searchRect() ?? null
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
  // An in-app link rendered into v-html text (a changelog note pointing at a page). A plain
  // <a href> would reload the whole SPA — and in the installed app that is a cold boot — so it
  // is routed here, through localePath so a Russian reader stays under /ru.
  const intEl = e.target.closest('a.int-link')
  if (intEl && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
    const href = intEl.getAttribute('href')
    if (href?.startsWith('/')) {
      e.preventDefault()
      router.push(localePath(href, locale.value))
      return
    }
  }
  const glossEl = e.target.closest('.gloss')
  if (glossEl) {
    openGloss(glossEl.dataset.gloss, glossEl.getBoundingClientRect())
    return
  }
  const unitEl = e.target.closest('.unit-link')
  if (unitEl) {
    closeKeyword()
    unitLink.value = { id: unitEl.dataset.unit, slug: unitEl.dataset.slug }
    return
  }
  const fkwEl = e.target.closest('.fkw')
  if (fkwEl) {
    closeKeyword()
    openFactionKeyword(fkwEl.dataset.fkw, pageFaction.value, { anchor: fkwEl.getBoundingClientRect() })
    return
  }
  // `.core-ability` is the same popover from a quieter span — a core ability named in rule prose,
  // printed bold and in Title Case rather than as a bracketed pill (see useRenderInline).
  const kwEl = e.target.closest('.keyword, .core-ability')
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
// The installed app's own first launch, in place of the site's welcome (installPath.js).
const appFirstOpen = ref(false)
// The one offer to install, at the first sign the site is used for real (installPath.js): looked
// at a moment after each page arrives — never over a dialog, a welcome, or a game or list in the
// making — and shown once a session until it is answered.
const installOfferOpen = ref(false)
const { canInstall, iosInstall } = useInstallPrompt()
let offerTimer = 0
watch(() => appPath.value, (path) => {
  clearTimeout(offerTimer)
  offerTimer = setTimeout(() => {
    if (installOfferOpen.value || welcomeOpen.value || appFirstOpen.value) return
    if (document.querySelector('.modal-overlay:not([inert]), .tour')) return
    if (!offerDue(path, { installable: canInstall.value || iosInstall.value })) return
    offerShown()
    installOfferOpen.value = true
  }, 2500)
}, { immediate: true })

// The one question about sending errors (useErrorLog.js, owner 2026-10-14): off by default, asked
// once per browser — only of a signed-in player, only after a real error, and at a calm moment:
// never over a dialog or the tour, a game or a list being edited. Not calm now: the next page.
const errorOfferOpen = ref(false)
let errorPending = false
function tryErrorOffer() {
  if (!errorPending || errorOfferOpen.value || authStatus.value !== 'authed') return
  if (reportsOn() || getItem(ERROR_OFFER_KEY, '')) return
  if (document.querySelector('.modal-overlay:not([inert]), .tour')) return
  if (/\/tracker\/game|\/roster\/(new|[^/]+$)/.test(appPath.value)) return
  setItem(ERROR_OFFER_KEY, '1')
  errorOfferOpen.value = true
}
onUnsentError(() => { errorPending = true; setTimeout(tryErrorOffer, 1500) })
watch([() => appPath.value, authStatus], () => setTimeout(tryErrorOffer, 2500))

async function settleWorker() {
  if (workerOn.value) return
  if (!await currentRegistration()) {
    tidyAfterWorker()
    watchTabFreshness(router)
    return
  }
  workerOn.value = true
  if (!tabMayLeaveWorker()) return
  watchForCalm(router, {
    dialogBusy: () => welcomeOpen.value || appFirstOpen.value || installOfferOpen.value || errorOfferOpen.value,
    applied: () => { workerOn.value = false; watchTabFreshness(router) },
  })
}

onMounted(() => {
  settleWorker()
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onGlobalClick)
  countVisit()
  welcomeOpen.value = !installPreview && shouldWelcome(appPath.value)
  appFirstOpen.value = appFirstRunDue() || !!installPreview?.startsWith('first')
  if (installPreview?.startsWith('offer')) installOfferOpen.value = true
  // Silent session restore, once per load: the navbar's account menu is on every page, so the
  // answer to "am I signed in" can no longer wait for the tracker to be opened. Costs one
  // request against the refresh cookie, resolves to 'anon' offline or with no backend.
  ensureSession()
  // A player's own marks — pinned factions, favourite datasheets, the model collection — follow
  // the account from here on. Signed out it is a no-op; localStorage stays the primary store.
  startPrefsSync()
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
  /* + a pinned bar's height, where a screen carries one (--roster-sticky-h, set below), and the
     update plate's while it waits for its button (--dock-h, UpdatePlate.vue) — the last line of
     a page can always be scrolled clear of it. */
  padding: 0 2rem calc(4rem + var(--roster-sticky-h, 0px) + var(--dock-h, 0px));
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
/* The same width without the panel: the factions index (four columns of faction rows). */
.main-content--broad { max-width: 1120px; }

/* The roster builder's desk layout: catalogue, list and the chosen unit's fields side by side.
   Only above the threshold that layout itself uses — below it the screen is back to two panes at
   the ordinary measure, and this class must not widen them. */
@media (min-width: 1200px) {
  .main-content--desk {
    max-width: 1600px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

/* A faction's units on a wide screen fill the window (FactionDatasheetsView): the page's own 4rem
   under the last line is for a page that scrolls, and here it was a band of nothing under the
   columns. */
.main-content--fill { padding-bottom: 0.75rem; }

/* The rosters desk (list + a roster, RosterDeskView) — from where the bottom nav goes. */
@media (min-width: 901px) {
  .main-content--browse {
    max-width: 1600px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

/* The roster screens keep their columns scrolling inside themselves on a page that does not
   scroll (RosterWorkbench measures the room under them from THIS padding), so the reserve is
   exactly the fixed Cancel/Save bar — plus the bottom nav below 900px. No gap: the columns end
   flush on the bar; a 1rem one read as a stray empty strip, on the phone and the desk alike
   (owner's call, 2026-09-27). The general 4rem reserve is for the phone's bars. */
.main-content--desk { padding-bottom: calc(var(--roster-sticky-h, 0px) + var(--dock-h, 0px)); }

/* ── Mobile ── */
@media (max-width: 900px) {
  .main-content {
    padding: 0 calc(1rem + var(--safe-right)) calc(4.5rem + var(--safe-bottom) + var(--mobile-bar-h, 0px) + var(--roster-sticky-h, 0px) + var(--dock-h, 0px)) calc(1rem + var(--safe-left));
  }
  .main-content--desk { padding-bottom: calc(var(--roster-sticky-h, 0px) + 52px + var(--safe-bottom) + var(--dock-h, 0px)); }
}

/* Very narrow phones (≤480px): the 900px tier's 1rem gutter still wastes a large share
   of a 320-375px viewport, so shrink it further here — almost-zero but not edge-to-edge.
   The sides only: a `padding` shorthand here, later in the file and just as specific, also
   reset the bottom and took away the roster panes' reserve (.main-content--desk above) — their
   last rows sat under the points bar on every phone up to 480px (a player's report, 2026-09-26). */
@media (max-width: 480px) {
  .main-content {
    padding-left: calc(0.5rem + var(--safe-left));
    padding-right: calc(0.5rem + var(--safe-right));
  }
}

/* Roster creation wizard's fixed Back/Next bar (RosterCreateView's .rc-sticky — an unscoped
   class name reached across the component boundary via :has(), same trick as its own
   .rc-panel:has(.rc-sticky)) is glued flush above the bottom nav and doesn't move. It floats
   in the same bottom-right corner MobileUtilityBar's own buttons (resume/faction tabs/
   back-to-top) want, so THEY yield instead: this reserves the bar's real height in a variable
   MobileUtilityBar's own bottom offset adds (see its .mobile-bar rule) — always the fixed
   .rc-sticky height, not RosterEditorView's unrelated .red-sticky (a sticky totals readout,
   no buttons, nothing to block).
   A bar on a page that is on its way OUT (`.page-leaving`, set by the route transition above for
   whichever animation it runs) reserves
   nothing: the room is being freed, and a "to game" chip coming in for the next page aimed above
   the leaving bar and then dropped onto its place (owner, 2026-09-28). */
.app-layout:has(.rc-sticky:not(.page-leaving .rc-sticky)) { --roster-sticky-h: 3.75rem; }
/* The bar's compact tier (style.css, ≤480px) is ~49px, not ~59px: the full 3.75rem left a ~10px
   empty strip between the roster panes and the bar, and floated the undo/utility bars as high. */
@media (max-width: 480px) {
  .app-layout:has(.rc-sticky:not(.page-leaving .rc-sticky)) { --roster-sticky-h: 3.1rem; }
}
/* The tracker's pinned turn buttons (RoundTracker's .tf-sticky): 36px buttons + 2 × 0.25rem +
   the border — the same reserve the roster bar makes, so the floating buttons yield to it and the
   page's end is not under it (the padding rules below add it). */
.app-layout:has(.tf-sticky) { --roster-sticky-h: 2.85rem; }
</style>
