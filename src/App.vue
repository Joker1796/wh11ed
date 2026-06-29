<template>
  <div class="app-layout" :style="{ '--resume-bar-h': showResumeGame ? '3.5rem' : '0px' }">
    <!-- Top navbar: brand + action buttons -->
    <header class="navbar">
      <div class="navbar-inner">
        <RouterLink to="/" class="navbar-logo">
          <span class="logo-wh">WH40K</span>
          <span class="logo-sub">11th Edition</span>
        </RouterLink>

        <nav class="navbar-links">
          <RouterLink
            to="/introduction"
            class="nav-link"
            :class="{ active: isCoreRoute }"
          >{{ labels.navCoreRules }}</RouterLink>
          <RouterLink
            to="/event-companion"
            class="nav-link"
            :class="{ active: isEventRoute }"
          >{{ labels.navEventCompanion }}</RouterLink>
          <RouterLink
            to="/tracker"
            class="nav-link"
            :class="{ active: isTrackerRoute }"
          >{{ labels.navTracker }}</RouterLink>
          <RouterLink
            to="/links"
            class="nav-link"
            :class="{ active: isLinksRoute }"
          >{{ labels.navLinks }}</RouterLink>
        </nav>

        <div class="navbar-actions">
          <button class="search-btn" @click="searchOpen = true" :title="labels.ariaSearchTitle" :aria-label="labels.ariaSearchTitle">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span class="search-hint">Ctrl K</span>
          </button>
          <button class="lang-btn" @click="toggleLocale" :title="locale === 'en' ? labels.langToRu : labels.langToEn" :aria-label="locale === 'en' ? labels.langToRu : labels.langToEn">
            {{ locale === 'en' ? 'RU' : 'EN' }}
          </button>
          <button
            class="lore-btn"
            :class="{ active: hideLore }"
            @click="toggleLore"
            :title="hideLore ? labels.loreShow : labels.loreHide"
            :aria-label="hideLore ? labels.loreShow : labels.loreHide"
            :aria-pressed="hideLore"
          >
            <i :class="hideLore ? 'bi bi-book' : 'bi bi-book-fill'"></i>
          </button>
          <button
            class="theme-btn"
            @click="toggleTheme"
            :title="theme === 'dark' ? labels.themeToLight : labels.themeToDark"
            :aria-label="theme === 'dark' ? labels.themeToLight : labels.themeToDark"
          >
            <i :class="theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
          </button>
          <div class="settings-wrap">
            <button
              class="settings-btn"
              :class="{ active: settingsOpen }"
              @click="toggleSettings"
              :aria-expanded="settingsOpen"
              :aria-label="labels.ariaSettings"
            >
              <i class="bi bi-gear-fill"></i>
            </button>
            <div v-if="settingsOpen" class="settings-backdrop" @click="settingsOpen = false"></div>
            <div v-if="settingsOpen" class="settings-menu">
              <button class="settings-item" @click="toggleTheme">
                <i :class="theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill'"></i>
                <span>{{ theme === 'dark' ? labels.themeToLight : labels.themeToDark }}</span>
              </button>
              <button class="settings-item" :class="{ active: hideLore }" @click="toggleLore">
                <i :class="hideLore ? 'bi bi-book' : 'bi bi-book-fill'"></i>
                <span>{{ hideLore ? labels.loreShow : labels.loreHide }}</span>
              </button>
              <button
                v-if="(canInstall || iosInstall) && !isStandalone"
                class="settings-item"
                @click="onInstallClick"
              >
                <i class="bi bi-download"></i>
                <span>{{ labels.installApp }}</span>
              </button>
            </div>
          </div>
          <button
            class="hamburger"
            :class="{ open: mobileNavOpen }"
            @click="toggleMobileNav"
            :aria-expanded="mobileNavOpen"
            :aria-label="labels.ariaToggleMenu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile drawer (visible only on mobile via NavSidebar internal CSS) -->
    <NavSidebar :mobileOpen="mobileNavOpen" @close="mobileNavOpen = false" />

    <!-- Subnav: core rules links (hidden on the section-less landing & links pages) -->
    <nav v-if="!isLanding && !isLinksRoute" class="subnav">
      <div class="subnav-inner">
        <RouterLink
          v-for="item in subNavItems"
          :key="item.path"
          :to="item.path"
          class="subnav-link"
          :class="{ active: $route.path === item.path }"
        >{{ item.label }}</RouterLink>
      </div>
    </nav>

    <!-- Overlay backdrop for drawer -->
    <div v-if="mobileNavOpen" class="nav-overlay" @click="mobileNavOpen = false"></div>

    <main class="main-content">
      <RouterView />
    </main>

    <!-- Mobile bottom nav — quick switch between the global sections -->
    <nav class="bottom-nav">
      <RouterLink to="/basic-rules" class="bn-item" :class="{ active: isCoreRoute }">
        <i class="bi bi-book-half"></i>
        <span>{{ labels.navCoreRulesShort }}</span>
      </RouterLink>
      <RouterLink to="/stratagems" class="bn-item" :class="{ active: isStratagemsRoute }">
        <i class="bi bi-lightning-charge"></i>
        <span>{{ labels.navStratagemsShort }}</span>
      </RouterLink>
      <RouterLink to="/event-companion/missions" class="bn-item" :class="{ active: isMissionsRoute }">
        <i class="bi bi-card-checklist"></i>
        <span>{{ labels.subNavEventMissions }}</span>
      </RouterLink>
      <RouterLink to="/tracker" class="bn-item" :class="{ active: isTrackerRoute }">
        <i class="bi bi-clipboard-data"></i>
        <span>{{ labels.navTracker }}</span>
      </RouterLink>
    </nav>

    <SearchModal v-if="searchOpen" @close="searchOpen = false" />
    <InstallHintModal v-if="installHintOpen" @close="installHintOpen = false" />
    <KeywordPopover />
    <ResumeGameButton v-if="showResumeGame" />
    <UpdateToast />
    <OfflineWarmupToast />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'
// Lazy: SearchModal pulls in useSearch.js, which imports every data file to build
// its index. Async-loading it keeps those data files out of the initial bundle.
const SearchModal = defineAsyncComponent(() => import('./components/SearchModal.vue'))
const InstallHintModal = defineAsyncComponent(() => import('./components/InstallHintModal.vue'))
import KeywordPopover from './components/KeywordPopover.vue'
import NavSidebar from './components/NavSidebar.vue'
import UpdateToast from './components/UpdateToast.vue'
import OfflineWarmupToast from './components/OfflineWarmupToast.vue'
import ResumeGameButton from './components/ResumeGameButton.vue'
import { useLocale } from './composables/useLocale.js'
import { useTheme } from './composables/useTheme.js'
import { useLoreVisibility } from './composables/useLoreVisibility.js'
import { useInstallPrompt } from './composables/useInstallPrompt.js'
import { useKeywordPopover } from './composables/useKeywordPopover.js'
import { useTracker } from './composables/useTracker.js'
import { resolveRef, useRefNavigation } from './composables/useRefNavigation.js'
import { useViewRestore } from './composables/useViewRestore.js'
import { applyRouteMeta } from './composables/useSeoMeta.js'
import { ui } from './i18n/ui.js'

const route = useRoute()
useViewRestore() // PWA-only: remember & restore the last page + in-view section
const mobileNavOpen = ref(false)
const searchOpen = ref(false)
const settingsOpen = ref(false)
const installHintOpen = ref(false)

function toggleSettings() {
  settingsOpen.value = !settingsOpen.value
  if (settingsOpen.value) mobileNavOpen.value = false
}

function toggleMobileNav() {
  mobileNavOpen.value = !mobileNavOpen.value
  if (mobileNavOpen.value) settingsOpen.value = false
}
const { locale, toggleLocale } = useLocale()

// Per-route <title> + meta description (read-only w.r.t. the router; hash routing unchanged).
watch([() => route.path, locale], ([path, loc]) => applyRouteMeta(path, loc), { immediate: true })

const { theme, toggleTheme } = useTheme()
const { hideLore, toggleLore } = useLoreVisibility()
const { canInstall, isStandalone, iosInstall, promptInstall } = useInstallPrompt()

// Chromium fires `beforeinstallprompt` → native prompt; iOS Safari has none →
// show the "Add to Home Screen" how-to instead.
function onInstallClick() {
  settingsOpen.value = false
  if (canInstall.value) promptInstall()
  else if (iosInstall.value) installHintOpen.value = true
}
const { open: openKeyword, close: closeKeyword } = useKeywordPopover()
const { navigateTo } = useRefNavigation()

const labels = computed(() => ui[locale.value])

const coreRoutes = ['/introduction', '/basic-rules', '/battle-round', '/battlefields', '/advanced-rules', '/reference', '/muster']
const isLanding = computed(() => route.path === '/')
const isLinksRoute = computed(() => route.path === '/links')
const isEventRoute = computed(() => route.path.startsWith('/event-companion'))
const isMissionsRoute = computed(() => route.path === '/event-companion/missions')
const isStratagemsRoute = computed(() => route.path === '/stratagems')
const isTrackerRoute = computed(() => route.path.startsWith('/tracker'))

// "Back to game" bar: only when a game is actively in progress and the user is reading something
// outside the tracker. Hidden while a full-screen modal/drawer is open so it never overlaps them.
const { current: currentGame } = useTracker()
const showResumeGame = computed(() =>
  currentGame.value?.phase === 'playing' &&
  !isTrackerRoute.value &&
  !isLanding.value &&
  !searchOpen.value &&
  !installHintOpen.value &&
  !mobileNavOpen.value
)
const isCoreRoute = computed(() => !isEventRoute.value && !isTrackerRoute.value && coreRoutes.includes(route.path))

const coreSubNavItems = computed(() => {
  const l = labels.value
  return [
    { path: '/introduction', label: l.subNavIntro },
    { path: '/basic-rules', label: l.subNavBasicRules },
    { path: '/battle-round', label: l.subNavBattleRound },
    { path: '/battlefields', label: l.subNavBattlefields },
    { path: '/advanced-rules', label: l.subNavAdvanced },
    { path: '/reference', label: l.subNavReference },
    { path: '/muster', label: l.subNavMuster },
  ]
})

const eventSubNavItems = computed(() => {
  const l = labels.value
  return [
    { path: '/event-companion', label: l.subNavEventIntro },
    { path: '/event-companion/sequence', label: l.subNavEventSequence },
    { path: '/event-companion/missions', label: l.subNavEventMissions },
    { path: '/event-companion/layouts', label: l.subNavEventLayouts },
    { path: '/event-companion/pairings', label: l.subNavEventPairings },
    { path: '/event-companion/faq', label: l.subNavEventFaq },
  ]
})

const trackerSubNavItems = computed(() => {
  const l = labels.value
  return [
    { path: '/tracker', label: l.subNavTrackerHome },
    { path: '/tracker/game', label: l.subNavTrackerGame },
    { path: '/stratagems', label: l.navStratagemsShort },
  ]
})

const subNavItems = computed(() => {
  // /stratagems rides with the tracker subnav so reaching it from there keeps the
  // Game Tracker / Current Game tabs in view (desktop has no "Back to game" bar).
  if (isTrackerRoute.value || isStratagemsRoute.value) return trackerSubNavItems.value
  if (isEventRoute.value) return eventSubNavItems.value
  return coreSubNavItems.value
})

function onKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    searchOpen.value = true
  }
  if (e.key === 'Escape') {
    searchOpen.value = false
    mobileNavOpen.value = false
    settingsOpen.value = false
    closeKeyword()
  }
}

function onGlobalClick(e) {
  const refEl = e.target.closest('.cross-ref')
  if (refEl) {
    const { route, anchor } = resolveRef(refEl.dataset.ref)
    if (route && anchor) navigateTo({ route, anchor })
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

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onGlobalClick)
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

/* ── Top navbar ── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 200;
  background: var(--bg-insert);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  /* Extend under the iOS translucent status bar (viewport-fit=cover) and pad
     the content down so the menu never overlaps the battery/clock. */
  height: calc(var(--navbar-height) + var(--safe-top));
  padding-top: var(--safe-top);
}

.navbar-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.navbar-logo {
  display: flex;
  flex-direction: column;
  gap: 1px;
  text-decoration: none;
  flex-shrink: 0;
}

.logo-wh {
  font-family: var(--font-display);
  font-size: 1.54rem;
  font-weight: 500;
  color: var(--text-on-dark);
  /* Tracked out so the condensed wordmark spans the same width as the "11th
     Edition" subtitle below it (the lockup lines up flush on both edges). */
  letter-spacing: 5px;
  line-height: 1;
}

.logo-sub {
  font-size: 0.62rem;
  color: rgba(255,255,255,0.45);
  letter-spacing: 0.8px;
  text-transform: uppercase;
  line-height: 1;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
}

.nav-link {
  padding: 0.4rem 0.85rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255,255,255,0.65);
  border-radius: 3px;
  transition: color 0.15s, background 0.15s;
  white-space: nowrap;
}

.nav-link:hover {
  color: #fff;
  background: rgba(255,255,255,0.08);
  text-decoration: none;
}

.nav-link.active {
  color: #fff;
  background: var(--accent);
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.lang-btn {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.65);
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  font-size: 0.72rem;
  font-weight: 700;
  font-family: var(--font-mono);
  letter-spacing: 0.5px;
  transition: background 0.15s, color 0.15s;
}

.lang-btn:hover {
  background: rgba(255,255,255,0.13);
  color: #fff;
}

.theme-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.65);
  border-radius: 4px;
  padding: 0.3rem 0.55rem;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1;
  transition: background 0.15s, color 0.15s;
}

.theme-btn:hover {
  background: rgba(255,255,255,0.13);
  color: #fff;
}

.lore-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.65);
  border-radius: 4px;
  padding: 0.3rem 0.55rem;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1;
  transition: background 0.15s, color 0.15s;
}

.lore-btn:hover {
  background: rgba(255,255,255,0.13);
  color: #fff;
}

.lore-btn.active {
  background: color-mix(in srgb, var(--accent) 30%, transparent);
  border-color: var(--accent);
  color: #fff;
}

/* ── Settings dropdown (mobile only) ── */
.settings-wrap {
  position: relative;
  display: none;
}

.settings-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.65);
  border-radius: 4px;
  padding: 0.3rem 0.55rem;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1;
  transition: background 0.15s, color 0.15s;
}

.settings-btn:hover {
  background: rgba(255,255,255,0.13);
  color: #fff;
}

.settings-btn.active {
  background: color-mix(in srgb, var(--accent) 30%, transparent);
  border-color: var(--accent);
  color: #fff;
}

.settings-backdrop {
  position: fixed;
  inset: 0;
  z-index: 205;
}

.settings-menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 210;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  box-shadow: 0 6px 24px rgba(0,0,0,0.25);
}

.settings-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.6rem 0.7rem;
  background: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  font-size: 0.85rem;
  color: var(--text-primary);
  transition: background 0.15s, color 0.15s;
}

.settings-item i {
  font-size: 1rem;
  width: 1.2rem;
  text-align: center;
  flex-shrink: 0;
}

.settings-item:hover {
  background: color-mix(in srgb, var(--accent) 10%, transparent);
}

.settings-item.active {
  color: var(--accent);
}

.search-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.7);
  border-radius: 4px;
  padding: 0.42rem 0.85rem;
  cursor: pointer;
  font-size: 0.88rem;
  transition: background 0.15s, color 0.15s;
}

.search-btn:hover {
  background: rgba(255,255,255,0.13);
  color: #fff;
}

.search-hint {
  font-size: 0.7rem;
  opacity: 0.55;
  font-family: var(--font-mono);
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  min-width: 44px;
  min-height: 44px;
  align-items: center;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: rgba(255,255,255,0.75);
  border-radius: 2px;
  transition: transform 0.25s ease, opacity 0.2s ease;
  transform-origin: center;
}

/* Animate hamburger → ✕ */
.hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}
.hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ── Subnav ── */
.subnav {
  position: sticky;
  top: calc(var(--navbar-height) + var(--safe-top));
  z-index: 190;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  height: var(--subnav-height);
}

.subnav-inner {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.subnav-inner::-webkit-scrollbar {
  display: none;
}

.subnav-link {
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-muted);
  white-space: nowrap;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.15s, border-color 0.15s;
  text-decoration: none;
}

.subnav-link:hover {
  color: var(--text-primary);
  text-decoration: none;
}

.subnav-link.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
  font-weight: 600;
}

/* ── Mobile bottom nav (shown only on mobile, see media query) ── */
.bottom-nav {
  display: none;
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

/* ── Mobile ── */
@media (max-width: 900px) {
  .navbar-inner {
    /* +side insets so the logo/hamburger clear the landscape notch */
    padding: 0 calc(1rem + var(--safe-right)) 0 calc(1rem + var(--safe-left));
    gap: 0.75rem;
  }

  .navbar-links {
    display: none;
  }

  .hamburger {
    display: flex;
  }

  .search-hint {
    display: none;
  }

  .subnav {
    display: none;
  }

  /* Collapse lore + theme into the settings (gear) menu on mobile */
  .lore-btn,
  .theme-btn {
    display: none;
  }

  .settings-wrap {
    display: block;
  }

  /* Increase tap targets for action buttons */
  .lang-btn,
  .settings-btn {
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search-btn {
    min-height: 44px;
    padding: 0 0.75rem;
  }

  .subnav-inner {
    padding: 0 0.75rem;
  }

  .subnav-link {
    padding: 0 0.7rem;
    font-size: 0.78rem;
  }

  .main-content {
    padding: 0 calc(1rem + var(--safe-right)) calc(4.5rem + var(--safe-bottom) + var(--resume-bar-h, 0px)) calc(1rem + var(--safe-left));
  }

  .bottom-nav {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: var(--bg-insert);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: var(--safe-bottom);
    padding-left: var(--safe-left);
    padding-right: var(--safe-right);
    /* Promote to its own compositor layer so iOS doesn't repaint-lag (the bar detaching from
       the bottom edge) during fast momentum scrolling. */
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .bn-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    min-height: 52px;
    padding: 0.4rem 0;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 0.64rem;
    font-weight: 500;
    text-align: center;
  }

  .bn-item i {
    font-size: 1.2rem;
    line-height: 1;
  }

  .bn-item.active {
    /* The bottom-nav is always a dark surface, so use the on-dark accent — the light
       theme's deep-red --accent is near-invisible against it. */
    color: var(--accent-on-dark);
  }
}
</style>
