<template>
  <div class="app-layout">
    <!-- Top navbar: brand + action buttons -->
    <header class="navbar">
      <div class="navbar-inner">
        <RouterLink to="/" class="navbar-logo">
          <span class="logo-wh">WH40K</span>
          <span class="logo-sub">11th Edition</span>
        </RouterLink>

        <nav class="navbar-links">
          <RouterLink
            to="/"
            class="nav-link"
            :class="{ active: isCoreRoute }"
          >{{ labels.navCoreRules }}</RouterLink>
          <RouterLink
            to="/factions/orks"
            class="nav-link"
            :class="{ active: isFactionsRoute }"
          >{{ labels.navFactions }}</RouterLink>
        </nav>

        <div class="navbar-actions">
          <button class="lang-btn" @click="toggleLocale" :title="locale === 'en' ? 'Switch to Russian' : 'Switch to English'">
            {{ locale === 'en' ? 'RU' : 'EN' }}
          </button>
          <button class="search-btn" @click="searchOpen = true" title="Search (Ctrl+K)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <span class="search-hint">Ctrl K</span>
          </button>
          <button
            class="hamburger"
            :class="{ open: mobileNavOpen }"
            @click="mobileNavOpen = !mobileNavOpen"
            :aria-expanded="mobileNavOpen"
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile drawer (visible only on mobile via NavSidebar internal CSS) -->
    <NavSidebar :mobileOpen="mobileNavOpen" @close="mobileNavOpen = false" />

    <!-- Subnav: changes based on active top-level section -->
    <nav class="subnav" @click.self="openCat = null">
      <div class="subnav-inner" :class="{ 'factions-mode': isFactionsRoute }">
        <!-- Core Rules mode: route links -->
        <template v-if="!isFactionsRoute">
          <RouterLink
            v-for="item in coreSubNavItems"
            :key="item.path"
            :to="item.path"
            class="subnav-link"
            :class="{ active: $route.path === item.path }"
          >{{ item.label }}</RouterLink>
        </template>

        <!-- Factions mode: category dropdowns -->
        <template v-else>
          <div
            v-for="cat in factionSubNavGroups"
            :key="cat.label"
            class="subnav-faction-cat"
            :class="{ open: openCat === cat.label }"
          >
            <button
              class="subnav-link subnav-cat-btn"
              :class="{ active: isCatActive(cat) }"
              @click.stop="openCat = openCat === cat.label ? null : cat.label"
            >
              {{ cat.label }}
              <svg class="chevron-tiny" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="faction-dropdown" v-if="cat.factions.length" @click.stop>
              <RouterLink
                v-for="f in cat.factions"
                :key="f.path"
                :to="f.path"
                class="faction-dropdown-item"
                :class="{ active: $route.path === f.path }"
                @click="openCat = null"
              >{{ f.label }}</RouterLink>
            </div>
          </div>
        </template>
      </div>
    </nav>

    <!-- Overlay backdrop for drawer -->
    <div v-if="mobileNavOpen" class="nav-overlay" @click="mobileNavOpen = false"></div>

    <main class="main-content">
      <RouterView />
    </main>

    <SearchModal v-if="searchOpen" @close="searchOpen = false" />
    <KeywordPopover />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import SearchModal from './components/SearchModal.vue'
import KeywordPopover from './components/KeywordPopover.vue'
import NavSidebar from './components/NavSidebar.vue'
import { useLocale } from './composables/useLocale.js'
import { useKeywordPopover } from './composables/useKeywordPopover.js'
import { resolveRef, useRefNavigation } from './composables/useRefNavigation.js'
import { ui } from './i18n/ui.js'
import { navGroups, navGroupsRu } from './router/index.js'

const route = useRoute()
const mobileNavOpen = ref(false)
const searchOpen = ref(false)
const openCat = ref(null)
const { locale, toggleLocale } = useLocale()
const { open: openKeyword, close: closeKeyword } = useKeywordPopover()
const { navigateTo } = useRefNavigation()

const labels = computed(() => ui[locale.value])

const coreRoutes = ['/', '/basic-rules', '/battle-round', '/battlefields', '/advanced-rules', '/reference', '/files']
const isCoreRoute = computed(() => coreRoutes.includes(route.path))
const isFactionsRoute = computed(() => route.path.startsWith('/factions/'))

const coreSubNavItems = computed(() => {
  const l = labels.value
  return [
    { path: '/', label: l.subNavIntro },
    { path: '/basic-rules', label: l.subNavBasicRules },
    { path: '/battle-round', label: l.subNavBattleRound },
    { path: '/battlefields', label: l.subNavBattlefields },
    { path: '/advanced-rules', label: l.subNavAdvanced },
    { path: '/reference', label: l.subNavReference },
    { path: '/files', label: l.subNavFiles },
  ]
})

const factionSubNavGroups = computed(() => {
  const groups = locale.value === 'ru' ? navGroupsRu : navGroups
  const fg = groups.find(g => g.path === '/factions')
  return fg?.factionGroups ?? []
})

function isCatActive(cat) {
  return cat.factions.some(f => f.path === route.path)
}

function onKeydown(e) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    searchOpen.value = true
  }
  if (e.key === 'Escape') {
    searchOpen.value = false
    mobileNavOpen.value = false
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

function onDocClick() {
  openCat.value = null
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  document.addEventListener('click', onGlobalClick)
  document.addEventListener('click', onDocClick)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.removeEventListener('click', onGlobalClick)
  document.removeEventListener('click', onDocClick)
})
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  background: var(--bg-primary);
}

/* ── Top navbar ── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 200;
  background: var(--bg-insert);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  height: var(--navbar-height);
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
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
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

.search-btn {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.65);
  border-radius: 4px;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  font-size: 0.8rem;
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
  top: var(--navbar-height);
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

/* ── Faction mode: allow overflow so dropdown isn't clipped ── */
.subnav-inner.factions-mode {
  overflow: visible;
}

/* ── Faction category dropdown ── */
.subnav-faction-cat {
  position: relative;
  display: flex;
  align-items: stretch;
}

.subnav-cat-btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans);
}

.chevron-tiny {
  flex-shrink: 0;
  color: var(--text-dim);
  transition: transform 0.18s ease;
}

.subnav-faction-cat.open .chevron-tiny {
  transform: rotate(180deg);
}

.faction-dropdown {
  display: none;
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  z-index: 400;
  background: var(--bg-insert);
  border: 1px solid var(--border);
  border-radius: 5px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  min-width: 190px;
  padding: 0.35rem 0;
}

.subnav-faction-cat.open .faction-dropdown {
  display: block;
}

.faction-dropdown-item {
  display: block;
  padding: 0.45rem 1rem;
  font-size: 0.83rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: background 0.12s, color 0.12s;
  white-space: nowrap;
}

.faction-dropdown-item:hover {
  background: rgba(110,0,8,0.08);
  color: var(--text-primary);
  text-decoration: none;
}

.faction-dropdown-item.active {
  color: var(--accent);
  font-weight: 600;
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
    padding: 0 1rem;
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

  /* Increase tap targets for action buttons */
  .lang-btn {
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
    padding: 0 1rem 3rem;
  }
}
</style>
