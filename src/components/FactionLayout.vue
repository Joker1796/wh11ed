<template>
  <div class="faction-view" :class="{ themed: !!color }" :style="colorVars">
    <div v-if="hero" class="hero">
      <RouterLink to="/factions" class="back-link">← {{ labels.factionsBack }}</RouterLink>
      <h1 class="hero-title">{{ faction ? faction.name : labels.factionsHeading }}</h1>
      <!-- Mobile-only page tabs: the desktop subnav (App.vue) is hidden ≤900px, where the
           drawer is the only other way to switch between the three faction pages. -->
      <nav v-if="faction" ref="tabsEl" class="faction-tabs" :aria-label="labels.navFactions">
        <RouterLink
          v-for="t in tabs"
          :key="t.path"
          :to="t.path"
          class="faction-tab"
          :class="{ active: isTabActive(t) }"
        ><i class="faction-tab-icon" :class="t.icon"></i>{{ t.label }}</RouterLink>
      </nav>
    </div>

    <slot v-if="faction" />
    <p v-else class="fsoon">{{ labels.factionsSoon }}</p>

    <!-- Desktop-only floating controls, bottom-right, shown only while the hero tabs are
         scrolled out of view (>900px has no bottom nav). Stacked in a column: a "back to
         top" button on top, and below it a jump to the other tab (the tab you can go to,
         named by its tooltip) — switching Rules ↔ Units without scrolling back up. Hidden
         on the per-unit page (hero=false) — the top subnav with the same links stays
         visible there (see App.vue isFactionUnitPage). -->
    <div v-if="faction && hero" class="faction-fabs">
      <Transition name="fab">
        <button
          v-if="!tabsInView"
          type="button"
          class="fab-btn"
          :title="labels.backToTop"
          :aria-label="labels.backToTop"
          @click="scrollToTop"
        >
          <i class="bi bi-arrow-up"></i>
        </button>
      </Transition>
      <Transition name="fab">
        <RouterLink
          v-if="otherTab && !tabsInView"
          :to="otherTab.path"
          class="fab-btn"
          :title="otherTab.label"
          :aria-label="otherTab.label"
        >
          <i :class="otherTab.icon"></i>
        </RouterLink>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { factionIndexBySlug } from '../data/factionsIndex.js'
import { useFactionPage } from '../composables/useFactionPage.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

// hero=false hides the whole faction header (name + "All factions" + mobile tabs) —
// used by the per-unit datasheet page for a clean, chrome-free sheet.
defineProps({ hero: { type: Boolean, default: true } })

const route = useRoute()
const { slug, faction } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Wahapedia-style faction theming: the palette in factionsIndex.js is exposed as two
// private custom props; the scoped CSS below folds them into --accent per theme.
const color = computed(() => factionIndexBySlug(slug.value)?.color || null)
const colorVars = computed(() =>
  color.value ? { '--fa-light': color.value.light, '--fa-dark': color.value.dark } : undefined,
)

const tabs = computed(() => {
  const base = `/factions/${slug.value}`
  const l = labels.value
  return [
    // Army rule + detachments are merged onto the base page. Icons match the mobile
    // bottom nav (bi-shield-shaded = faction, bi-people-fill = units) — used by the FAB.
    { path: base, label: l.factionRules, icon: 'bi bi-shield-shaded' },
    // prefix: the per-unit pages (/datasheets/:unit) keep this tab highlighted
    { path: `${base}/datasheets`, label: l.factionDatasheets, prefix: true, icon: 'bi bi-people-fill' },
  ]
})

const isTabActive = (t) => route.path === t.path || (t.prefix && route.path.startsWith(t.path + '/'))

// The tab FAB links to the tab you're NOT on.
const otherTab = computed(() => tabs.value.find((t) => !isTabActive(t)))

// Back-to-top FAB: honour prefers-reduced-motion (the app zeroes all CSS motion there,
// so a smooth JS scroll would be the odd one out).
const scrollToTop = () => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

// Show the FAB only while the hero tabs are scrolled out of view — with them on
// screen it would just duplicate what's already in front of the user.
const tabsEl = ref(null)
const tabsInView = ref(true)
let tabsObserver = null
watch(tabsEl, (el) => {
  tabsObserver?.disconnect()
  tabsObserver = null
  if (!el) { tabsInView.value = true; return }
  tabsObserver = new IntersectionObserver(([entry]) => { tabsInView.value = entry.isIntersecting })
  tabsObserver.observe(el)
})
onBeforeUnmount(() => tabsObserver?.disconnect())
</script>

<style scoped>
.faction-view {
  padding-top: 0.5rem;
}

/* ── Per-faction accent (--fa-light / --fa-dark set inline from factionsIndex.js) ──
   Mirrors the app's three-step theme resolution in style.css: prefers-color-scheme is
   the default signal, an explicit :root[data-theme] wins in both directions.
   --link-accent must be re-declared locally: on :root it is declared as var(--accent)
   and inherits already computed (the app-wide red), so it would not follow --accent. */
.faction-view.themed {
  --accent: var(--fa-light);
  --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black);
  --link-accent: var(--accent);
  --link-accent-hover: var(--accent-hover);
}

/* Dark theme: links stay the app's gold (--link-accent in style.css is a readability
   choice there, not the accent) — keep the literals in sync with :root[data-theme='dark'].
   The explicit :root[data-theme] overrides live in the UNSCOPED style block below:
   Vue's :global() drops the descendant part of the selector, which turned them into
   bare :root rules that poisoned --accent app-wide once this lazy CSS chunk loaded. */
@media (prefers-color-scheme: dark) {
  .faction-view.themed {
    --accent: var(--fa-dark);
    --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white);
    --link-accent: #e8c96a;
    --link-accent-hover: #f0d98a;
  }
}

.hero {
  padding: 0.5rem 0 0.9rem;
  margin-bottom: 1.5rem;
}

.back-link {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  text-decoration: none;
  margin-bottom: 0.6rem;
}

.back-link:hover {
  color: var(--accent);
  text-decoration: none;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1;
}

/* Angular 40k-style tabs under the faction name (both mobile and desktop — on desktop they
   replace the App.vue subnav for faction hero pages). Classic folder tabs, square corners:
   the closed (inactive) tabs are recessed (--bg-secondary) boxes whose bottom sits flush with a
   full-width faction-accent line; the open (active) tab is a content-coloured (--bg-primary) box
   with an accent frame whose bottom border matches the content, erasing the line under it so it
   merges into the content. The open/closed states are told apart by their background colour. */
.faction-tabs {
  display: flex;
  gap: 0;
  margin-top: 1rem;
  /* full-width faction-accent line the tabs sit on */
  border-bottom: 1px solid var(--accent);
}

.faction-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-muted);
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-bottom: 1px solid var(--accent);
  border-radius: 0;
  padding: 0.55rem 1.3rem;
  margin-bottom: -1px; /* overlap the container's accent line */
  text-decoration: none;
  transition: color var(--motion-fast), background var(--motion-fast), border-color var(--motion-fast);
}

.faction-tab:hover {
  color: var(--text-primary);
}

.faction-tab.active {
  color: var(--accent);
  background: var(--bg-primary);
  border-color: var(--accent);
  border-bottom-color: var(--bg-primary); /* erase the accent line under the open tab → merge with content */
}

/* Same icons as the desktop FAB and the mobile bottom nav — the visual link between
   the three ways of reaching these pages. Slightly smaller than the tab text so the
   display-font label stays the anchor. */
.faction-tab-icon {
  font-size: 0.9em;
}

.fsoon {
  color: var(--text-muted);
  font-size: 1rem;
}

/* Floating controls column — hidden by default, shown only >900px (the exact inverse of
   App.vue's bottom-nav breakpoint). Fixed in the bottom-right corner; sits inside
   .faction-view.themed so the FABs pick up the faction accent. Stacks the back-to-top
   button above the tab-jump FAB; both names ride in the native title tooltip. */
.faction-fabs {
  display: none;
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 195; /* below drawer-overlay (299) and modals (400–500), same tier as ResumeGameButton */
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 901px) {
  .faction-fabs { display: flex; }
}

@media (max-width: 640px) {
  .hero-title { font-size: 2.2rem; }
}
</style>

<!-- Unscoped on purpose: an explicit data-theme on :root must win over the
     prefers-color-scheme fallback above in BOTH directions. Written without :global()
     because Vue's scoped compiler mishandles a descendant after it (see note above);
     the .faction-view.themed class keeps these rules from touching anything else. -->
<style>
:root[data-theme='light'] .faction-view.themed {
  --accent: var(--fa-light);
  --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black);
  --link-accent: var(--accent);
  --link-accent-hover: var(--accent-hover);
}

:root[data-theme='dark'] .faction-view.themed {
  --accent: var(--fa-dark);
  --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white);
  --link-accent: #e8c96a;
  --link-accent-hover: #f0d98a;
}
</style>
