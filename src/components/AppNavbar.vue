<template>
  <header class="navbar">
    <div class="navbar-inner">
      <RouterLink to="/" class="navbar-logo">
        <span class="logo-wh">WH40K</span>
        <span class="logo-sub">11th Edition</span>
      </RouterLink>

      <nav class="navbar-links">
        <div
          class="nav-dropdown"
          :class="{ 'nd-suppressed': rulesMenuSuppressed }"
          @mouseleave="rulesMenuSuppressed = false"
        >
          <RouterLink
            to="/rules"
            class="nav-link"
            :class="{ active: isRulesRoute }"
            aria-haspopup="true"
            @click="closeRulesMenu"
          >{{ labels.navRules }}</RouterLink>
          <div class="nav-dropdown-menu">
            <div class="nav-dropdown-panel nav-dropdown-panel-simple">
              <RouterLink
                v-for="s in rulesLanding[locale].sections"
                :key="s.key"
                :to="s.path"
                class="nd-link"
                @click="closeRulesMenu"
              >{{ s.label }}</RouterLink>
            </div>
          </div>
        </div>
        <div
          class="nav-dropdown"
          :class="{ 'nd-suppressed': factionMenuSuppressed }"
          @mouseleave="factionMenuSuppressed = false"
        >
          <RouterLink
            to="/factions"
            class="nav-link"
            :class="{ active: isFactionRoute }"
            aria-haspopup="true"
            @click="closeFactionMenu"
          >{{ labels.navFactions }}</RouterLink>
          <div class="nav-dropdown-menu">
            <div class="nav-dropdown-panel">
              <div v-for="g in factionGroups" :key="g.id" class="nd-group">
                <h4 class="nd-group-title">{{ labels[groupLabelKey(g.id)] }}</h4>
                <template v-for="f in g.factions" :key="f.slug">
                  <RouterLink v-if="f.ready" :to="`/factions/${f.slug}`" class="nd-link" @click="closeFactionMenu">{{ f.name }}</RouterLink>
                  <span v-else class="nd-link disabled">{{ f.name }}<span class="nd-soon">{{ labels.factionsSoon }}</span></span>
                </template>
              </div>
            </div>
          </div>
        </div>
        <RouterLink
          to="/tracker"
          class="nav-link"
          :class="{ active: isTrackerRoute }"
        >{{ labels.navTracker }}</RouterLink>
        <RouterLink
          to="/roster"
          class="nav-link"
          :class="{ active: isRosterRoute }"
        >{{ labels.navRoster }}</RouterLink>
      </nav>

      <div class="navbar-actions">
        <button class="search-btn" @click="$emit('open-search')" :title="labels.ariaSearchTitle" :aria-label="labels.ariaSearchTitle">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span class="search-hint">Ctrl K</span>
        </button>
        <button
          class="lang-btn"
          role="switch"
          :aria-checked="locale === 'ru'"
          @click="toggleLocale"
          :title="locale === 'en' ? labels.langToRu : labels.langToEn"
          :aria-label="locale === 'en' ? labels.langToRu : labels.langToEn"
        >
          <span class="lang-thumb" aria-hidden="true"></span>
          <span class="lang-opt" data-lang="en">EN</span>
          <span class="lang-opt" data-lang="ru">RU</span>
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
          <Transition name="fade">
            <div v-if="settingsOpen" class="settings-backdrop" @click="settingsOpen = false"></div>
          </Transition>
          <Transition name="fade-pop">
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
          </Transition>
        </div>
        <button
          class="hamburger"
          :class="{ open: mobileNavOpen }"
          @click="$emit('toggle-mobile-nav')"
          :aria-expanded="mobileNavOpen"
          :aria-label="labels.ariaToggleMenu"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { useTheme } from '../composables/useTheme.js'
import { useLoreVisibility } from '../composables/useLoreVisibility.js'
import { useInstallPrompt } from '../composables/useInstallPrompt.js'
import { useRouteSection } from '../composables/useRouteSection.js'
import { ui } from '../i18n/ui.js'
import { factionGroups } from '../data/factionsIndex.js'
import { rulesLanding } from '../data/rulesLanding.js'

defineProps({
  mobileNavOpen: Boolean,
})
const emit = defineEmits(['toggle-mobile-nav', 'open-search', 'open-install-hint'])

const { locale, toggleLocale } = useLocale()
const { theme, toggleTheme } = useTheme()
const { hideLore, toggleLore } = useLoreVisibility()
const { canInstall, isStandalone, iosInstall, promptInstall } = useInstallPrompt()
const { isRulesRoute, isFactionRoute, isTrackerRoute, isRosterRoute } = useRouteSection()

const labels = computed(() => ui[locale.value])

const settingsOpen = ref(false)
function toggleSettings() {
  settingsOpen.value = !settingsOpen.value
}

// Was handled by App.vue's global Escape handler before this dropdown lived here —
// kept as its own listener so the behavior survives the split without App.vue reaching
// into this component's local state.
function onEscape(e) {
  if (e.key === 'Escape') settingsOpen.value = false
}
onMounted(() => window.addEventListener('keydown', onEscape))
onUnmounted(() => window.removeEventListener('keydown', onEscape))

// Chromium fires `beforeinstallprompt` → native prompt; iOS Safari has none →
// show the "Add to Home Screen" how-to instead.
function onInstallClick() {
  settingsOpen.value = false
  if (canInstall.value) promptInstall()
  else if (iosInstall.value) emit('open-install-hint')
}

// Faction-group headings for the desktop navbar "Factions" hover dropdown (same tiny
// id→i18n-key map used by FactionsListView; faction names themselves stay English).
const GROUP_LABEL_KEYS = {
  astartes: 'factionGroupAstartes', imperium: 'factionGroupImperium',
  xenos: 'factionGroupXenos', chaos: 'factionGroupChaos',
}
function groupLabelKey(id) { return GROUP_LABEL_KEYS[id] || id }

// The Factions dropdown is CSS hover/focus-within; clicking a link navigates but the cursor
// stays over the trigger, so force-hide it on click and re-enable on mouseleave.
const factionMenuSuppressed = ref(false)
function closeFactionMenu() {
  factionMenuSuppressed.value = true
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
}

// Same click-then-still-hovering fix as the Factions dropdown above, for the "Rules" one.
const rulesMenuSuppressed = ref(false)
function closeRulesMenu() {
  rulesMenuSuppressed.value = true
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
}
</script>

<style scoped>
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

/* ── "Factions" hover dropdown (desktop only — .navbar-links is display:none ≤900px) ── */
.nav-dropdown {
  position: relative;
}

.nav-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 210;
  padding-top: 6px; /* transparent bridge so the gap doesn't dismiss the menu on hover */
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  pointer-events: none;
  transition: opacity var(--motion-fast), transform var(--motion-fast), visibility var(--motion-fast);
}

.nav-dropdown:hover .nav-dropdown-menu,
.nav-dropdown:focus-within .nav-dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: none;
  pointer-events: auto;
}

/* After a click the pointer is still over the trigger — force the menu shut (higher
   specificity than the hover/focus-within rule above) until the cursor leaves. */
.nav-dropdown.nd-suppressed:hover .nav-dropdown-menu,
.nav-dropdown.nd-suppressed:focus-within .nav-dropdown-menu {
  opacity: 0;
  visibility: hidden;
  transform: translateY(4px);
  pointer-events: none;
}

.nav-dropdown-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(160px, 1fr));
  gap: 0.9rem 1.4rem;
  max-height: min(70vh, 460px);
  overflow-y: auto;
  padding: 0.9rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: 0 6px 24px rgba(0,0,0,0.25);
}

/* "Rules" dropdown — 3 flat links, no grouped grid needed. */
.nav-dropdown-panel-simple {
  grid-template-columns: 1fr;
  min-width: 200px;
  gap: 0.3rem;
}

.nd-group-title {
  font-family: var(--font-sans);
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  margin: 0 0 0.3rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--border);
}

.nd-link {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  padding: 0.16rem 0;
  font-size: 0.85rem;
  color: var(--text-primary);
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--motion-fast);
}

a.nd-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.nd-link.disabled {
  color: var(--text-dim);
  cursor: default;
}

.nd-soon {
  font-size: 0.55rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-dim);
  border: 1px solid var(--border);
  padding: 0 4px;
  align-self: center;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.lang-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 2.15rem;
  width: 3.2rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  transition: background 0.15s;
}

.lang-btn:hover {
  background: rgba(255,255,255,0.13);
}

/* Sliding thumb — sits behind the two labels, ~half the track, and slides to
   whichever side (EN/RU) is the current locale. */
.lang-thumb {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50%;
  background: color-mix(in srgb, var(--accent) 55%, transparent);
  border: 1px solid var(--accent);
  transition: left 0.18s ease;
}

.lang-btn[aria-checked="true"] .lang-thumb {
  left: 50%;
}

.lang-opt {
  position: relative;
  z-index: 1;
  flex: 1;
  text-align: center;
  font-size: 0.72rem;
  font-weight: 700;
  font-family: var(--font-mono);
  letter-spacing: 0.5px;
  color: rgba(255,255,255,0.55);
  transition: color 0.15s;
  pointer-events: none;
}

.lang-btn[aria-checked="false"] .lang-opt[data-lang="en"],
.lang-btn[aria-checked="true"] .lang-opt[data-lang="ru"] {
  color: #fff;
}

.theme-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2.15rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.65);
  padding: 0 0.65rem;
  cursor: pointer;
  font-size: 1.05rem;
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
  height: 2.15rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.65);
  padding: 0 0.65rem;
  cursor: pointer;
  font-size: 1.05rem;
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
  height: 2.15rem;
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  color: rgba(255,255,255,0.7);
  padding: 0 0.85rem;
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
}
</style>
