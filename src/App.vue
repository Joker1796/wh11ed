<template>
  <div class="app-layout">
    <!-- Top navbar: brand + top-level sections -->
    <header class="navbar">
      <div class="navbar-inner">
        <RouterLink to="/" class="navbar-logo">
          <span class="logo-wh">WH40K</span>
          <span class="logo-sub">11th Edition</span>
        </RouterLink>

        <nav class="navbar-links" :class="{ open: mobileNavOpen }">
          <RouterLink
            to="/"
            class="nav-link"
            :class="{ active: isCoreRoute }"
            @click="mobileNavOpen = false"
          >Core Rules</RouterLink>
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
          <button class="hamburger" @click="mobileNavOpen = !mobileNavOpen" :aria-expanded="mobileNavOpen" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- Subnav: section-level links, sticky below navbar -->
    <nav class="subnav" :class="{ open: mobileNavOpen }">
      <div class="subnav-inner">
        <RouterLink
          v-for="item in subNavItems"
          :key="item.path"
          :to="item.path"
          class="subnav-link"
          :class="{ active: $route.path === item.path }"
          @click="mobileNavOpen = false"
        >{{ item.label }}</RouterLink>
      </div>
    </nav>

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
import { useLocale } from './composables/useLocale.js'
import { useKeywordPopover } from './composables/useKeywordPopover.js'
import { resolveRef, useRefNavigation } from './composables/useRefNavigation.js'

const route = useRoute()
const mobileNavOpen = ref(false)
const searchOpen = ref(false)
const { locale, toggleLocale } = useLocale()
const { open: openKeyword, close: closeKeyword } = useKeywordPopover()
const { navigateTo } = useRefNavigation()

const coreRoutes = ['/', '/basic-rules', '/battle-round', '/battlefields', '/advanced-rules', '/reference', '/files']
const isCoreRoute = computed(() => coreRoutes.includes(route.path))

const subNavItems = [
  { path: '/', label: 'Introduction' },
  { path: '/basic-rules', label: 'Basic Rules' },
  { path: '/battle-round', label: 'Battle Round' },
  { path: '/battlefields', label: 'Battlefields' },
  { path: '/advanced-rules', label: 'Advanced' },
  { path: '/reference', label: 'Reference' },
  { path: '/files', label: 'Files' },
]

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
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.hamburger span {
  display: block;
  width: 22px;
  height: 2px;
  background: rgba(255,255,255,0.75);
  border-radius: 2px;
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
  max-width: 1100px;
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

/* ── Overlay ── */
.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  z-index: 198;
}

/* ── Main content ── */
.main-content {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
}

/* ── Mobile ── */
@media (max-width: 900px) {
  .navbar-links {
    display: none;
  }

  .subnav {
    position: sticky;
    top: var(--navbar-height);
    height: auto;
  }

  .subnav-inner {
    padding: 0 1rem;
  }

  .subnav-link {
    padding: 0.6rem 0.75rem;
  }

  /* On mobile, show subnav as dropdown when hamburger is open */
  .subnav.open .subnav-inner {
    flex-direction: column;
    height: auto;
    overflow-x: visible;
    padding: 0.5rem 1rem 0.75rem;
    gap: 0;
  }

  .subnav.open .subnav-link {
    border-bottom: none;
    border-left: 2px solid transparent;
    padding: 0.5rem 0.75rem;
    margin-bottom: 0;
  }

  .subnav.open .subnav-link.active {
    border-bottom: none;
    border-left-color: var(--accent);
  }

  .hamburger {
    display: flex;
  }

  .search-hint {
    display: none;
  }

  .main-content {
    padding: 0 1rem 3rem;
  }
}
</style>
