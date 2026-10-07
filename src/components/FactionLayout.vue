<template>
  <div
    class="faction-view"
    :class="{ themed: !!color }"
    :style="colorVars"
  >
    <div
      v-if="hero"
      class="hero"
    >
      <h1 class="hero-title">
        <FactionEmblem
          :faction="indexEntry"
          in-title
        />
        {{ faction ? faction.name : labels.factionsHeading }}
      </h1>
      <!-- Page tabs (also the only way to switch between the three faction pages ≤900px,
           where the desktop subnav in App.vue is hidden and only the drawer is left). -->
      <PageTabs
        v-if="faction"
        ref="tabsEl"
        class="hero-tabs"
        :tabs="navTabs"
        :aria-label="labels.navFactions"
      />
    </div>

    <slot v-if="faction" />
    <p
      v-else
      class="fsoon"
    >
      {{ labels.factionsSoon }}
    </p>

    <!-- Desktop-only floating controls, bottom-right, shown only while the hero tabs are
         scrolled out of view (>900px has no bottom nav). Stacked in a column: a button for
         each of the two OTHER tabs (jump straight to either without cycling), then a "back
         to top" button at the bottom. The per-unit page (hero=false) has its own column
         below. -->
    <div
      v-if="faction && hero"
      class="faction-fabs"
    >
      <TransitionGroup
        v-if="!tabsInView"
        name="fab"
      >
        <RouterLink
          v-for="t in otherTabs"
          :key="t.to"
          :to="t.to"
          class="fab-btn"
          :aria-label="t.label"
        >
          <i :class="t.icon" />
        </RouterLink>
      </TransitionGroup>
      <Transition name="fab">
        <button
          v-if="!tabsInView"
          type="button"
          class="fab-btn"
          data-press="pop"
          :aria-label="labels.backToTop"
          @click="scrollToTop"
        >
          <i class="bi bi-arrow-up" />
        </button>
      </Transition>
    </div>
    <!-- The per-unit page has no tabs: all three are corner buttons there, at any scroll — they
         replaced the desktop subnav strip over the sheet (owner, 2026-10-01). Units goes back to
         the list when the page was opened from it, like the phone's button (backToUnits). -->
    <div
      v-else-if="faction && route.params.unit"
      class="faction-fabs"
    >
      <template
        v-for="t in tabs"
        :key="t.to"
      >
        <button
          v-if="t.prefix"
          type="button"
          class="fab-btn"
          :aria-label="t.label"
          @click="backToUnits"
        >
          <i :class="t.icon" />
        </button>
        <RouterLink
          v-else
          :to="t.to"
          class="fab-btn"
          :aria-label="t.label"
        >
          <i :class="t.icon" />
        </RouterLink>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { stripLocale } from '../router/locale.js'
import { factionIndexBySlug } from '../data/factionsIndex.js'
import { useFactionPage } from '../composables/useFactionPage.js'
import PageTabs from './PageTabs.vue'
import FactionEmblem from './FactionEmblem.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { scrollToTop } from '../composables/useBackToTop.js'
import { useContributeMobileActions } from '../composables/useMobileActionBar.js'

// hero=false hides the whole faction header (name + "All factions" + mobile tabs) —
// used by the per-unit datasheet page for a clean, chrome-free sheet.
const props = defineProps({ hero: { type: Boolean, default: true } })

const route = useRoute()
const router = useRouter()
const { slug, faction } = useFactionPage()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Wahapedia-style faction theming: the palette in factionsIndex.js is exposed as two
// private custom props; the scoped CSS below folds them into --accent per theme.
const indexEntry = computed(() => factionIndexBySlug(slug.value))
const color = computed(() => indexEntry.value?.color || null)
const colorVars = computed(() =>
  color.value ? { '--fa-light': color.value.light, '--fa-dark': color.value.dark } : undefined,
)

const tabs = computed(() => {
  const base = `/factions/${slug.value}`
  const l = labels.value
  return [
    // Army rule + detachments are merged onto the base page. Icons match the mobile
    // bottom nav (bi-shield-shaded = faction, bi-people-fill = units) — used by the FAB.
    { to: base, label: l.factionRules, icon: 'bi bi-shield-shaded' },
    // prefix: the per-unit pages (/datasheets/:unit) keep this tab highlighted
    { to: `${base}/datasheets`, label: l.factionDatasheets, prefix: true, icon: 'bi bi-people-fill' },
    // Official GW FAQ & errata for the faction (src/data/factionFaq.json).
    { to: `${base}/faq`, label: l.factionFaq, icon: 'bi bi-patch-question' },
  ]
})

// Tab targets are written bare (`/factions/x/datasheets`); the address may carry `/ru`.
const isTabActive = (t) => {
  const p = stripLocale(route.path)
  return p === t.to || (t.prefix && p.startsWith(t.to + '/'))
}

// PageTabs draws whatever it is handed and asks the caller which one is open — here that is
// the route, so the highlight follows navigation rather than a click.
const navTabs = computed(() => tabs.value.map((t) => ({ ...t, active: isTabActive(t) })))

// The tab FABs jump straight to either of the two tabs NOT currently open (Rules/Units/FAQ
// minus the active one, in their original order) — one tap to any other page, no cycling.
const otherTabs = computed(() => tabs.value.filter((t) => !isTabActive(t)))

// Show the FAB only while the hero tabs are scrolled out of view — with them on
// screen it would just duplicate what's already in front of the user.
const tabsEl = ref(null)
const tabsInView = ref(true)
let tabsObserver = null
watch(tabsEl, (el) => {
  tabsObserver?.disconnect()
  tabsObserver = null
  // tabsEl is a component now, so what needs observing is its root <nav>, not the instance.
  const node = el?.$el ?? el
  if (!node) { tabsInView.value = true; return }
  tabsObserver = new IntersectionObserver(([entry]) => { tabsInView.value = entry.isIntersecting })
  tabsObserver.observe(node)
})
onBeforeUnmount(() => tabsObserver?.disconnect())

// Mobile equivalent of the desktop FAB column above: contribute the same "other tabs" links to
// the shared MobileUtilityBar (App.vue) whenever the hero tabs are scrolled out of view.
useContributeMobileActions('faction-tabs', () =>
  faction.value && props.hero && !tabsInView.value
    ? otherTabs.value.map((t) => ({ key: t.to, to: t.to, icon: t.icon, label: t.label }))
    : [],
)

// The per-unit page has no hero and no tabs of its own, and `.subnav` — where the desktop keeps
// the same links — is hidden on mobile. So a phone had no way back to the faction's unit list at
// all: you left through the drawer and walked in again through Factions → faction → Units. This
// button is that way back, and it is offered at any scroll position, not only once scrolled down.
const unitsTab = computed(() => tabs.value[1])
useContributeMobileActions('faction-back-to-units', () =>
  faction.value && !props.hero && route.params.unit
    ? [{ key: 'units', icon: unitsTab.value.icon, label: unitsTab.value.label, onClick: backToUnits }]
    : [],
)

// Back, not a fresh push, when this page WAS opened from that list: the router restores the saved
// scroll position on a real back, so the reader returns to the row they tapped instead of the top
// of a list that can run to ninety units.
function backToUnits() {
  const to = unitsTab.value.to
  if (String(history.state?.back || '').startsWith(to)) router.back()
  else router.push(to)
}
</script>

<style scoped>
.faction-view {
  padding-top: 0.25rem;
}

/* ── Per-faction accent (--fa-light / --fa-dark set inline from factionsIndex.js) ──
   Mirrors the app's three-step theme resolution in style.css: prefers-color-scheme is
   the default signal, an explicit :root[data-theme] wins in both directions.
   --link-accent must be re-declared locally: on :root it is declared as var(--accent)
   and inherits already computed (the app-wide red), so it would not follow --accent. */
.faction-view.themed {
  --accent: var(--fa-light);
  --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black);
  --accent-ink: var(--fa-ink-light);
  --accent-ink-hover: color-mix(in srgb, var(--fa-light) 70%, black);
  --link-accent: var(--accent-ink);
  --link-accent-hover: var(--accent-ink-hover);
}

/* The faction's colour as TEXT on the dark theme — a link, the "Invulnerable Save" band — is the
   same hue held at an OKLCH lightness of at least 0.76. Twelve dark colours sat under 4.5:1 on
   their own tinted card (Chaos Space Marines 3.2:1, Adepta Sororitas 3.4:1; `npm run a11y` over
   one datasheet per faction, 2026-10-07); 0.76 is the floor at which the worst of all thirty reads
   4.8:1, and the colours already above it are left exactly as they are. Fills keep --fa-dark:
   white text sits on those, and a lighter fill would only lower that. */
/* The light theme's ink, the mirror case: held at a lightness of at most 0.45, which darkens only
   the lightest — Aeldari's and the Votann's weapon tags were 4.4:1 on their own tinted pill. */
.faction-view.themed {
  --fa-ink-dark: var(--fa-dark);
  --fa-ink-light: color-mix(in srgb, var(--fa-light) 85%, black);
}

@supports (color: oklch(from red l c h)) {
  .faction-view.themed {
    --fa-ink-dark: oklch(from var(--fa-dark) max(l, 0.76) c h);
    --fa-ink-light: oklch(from color-mix(in srgb, var(--fa-light) 85%, black) min(l, 0.45) c h);
  }
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
    --accent-ink: var(--fa-ink-dark);
    --accent-ink-hover: color-mix(in srgb, var(--fa-ink-dark) 80%, white);
    --link-accent: #e8c96a;
    --link-accent-hover: #f0d98a;
  }
}

/* Vertical space is the scarce axis on a phone (see CLAUDE.md, "Vertical density"): the hero is a
   back-link, a name and the tabs, and it used to spend ~2.4rem of empty page under them before the
   first heading — now 0.6rem. Nothing here wants more: the open tab erases the strip's accent line
   under itself so the content reads as hanging FROM the tab (see PageTabs), and a band of empty
   page between them is what breaks that join. */
/* No "← All factions" link above the title (removed 2026-09-28, owner): the navbar's Factions
   and the bottom nav's Factions button both reach every faction from anywhere. The padding the
   link used to give the title is kept here. */
.hero {
  padding: 1rem 0 0;
  margin-bottom: 0.6rem;
}

.hero-title {
  display: flex;
  align-items: center;
  gap: 0.25em;
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 400;
  color: var(--text-primary);
  line-height: 1;
}

/* The tabs sit under the faction name; PageTabs itself brings no outer spacing. */
.hero-tabs {
  margin-top: 0.7rem;
}

.fsoon {
  color: var(--text-muted);
  font-size: 1rem;
}

/* Floating controls column — hidden by default, shown only >900px (the exact inverse of
   App.vue's bottom-nav breakpoint). Fixed in the bottom-right corner; sits inside
   .faction-view.themed so the FABs pick up the faction accent. Stacks the two tab-jump
   FABs above the back-to-top button; each name slides out beside it on hover (.fab-btn::after). */
.faction-fabs {
  display: none;
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 195; /* below drawer-overlay (299) and modals (400–500), same tier as MobileUtilityBar */
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
  --accent-ink: var(--fa-ink-light);
  --accent-ink-hover: color-mix(in srgb, var(--fa-light) 70%, black);
  --link-accent: var(--accent-ink);
  --link-accent-hover: var(--accent-ink-hover);
}

:root[data-theme='dark'] .faction-view.themed {
  --accent: var(--fa-dark);
  --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white);
  --accent-ink: var(--fa-ink-dark);
  --accent-ink-hover: color-mix(in srgb, var(--fa-ink-dark) 80%, white);
  --link-accent: #e8c96a;
  --link-accent-hover: #f0d98a;
}
</style>
