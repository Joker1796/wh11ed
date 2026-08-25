<template>
  <!-- Subnav: core rules links (hidden on the section-less landing & links pages) -->
  <Transition name="fade">
    <nav v-if="!isLanding && !isLinksRoute && !isRulesLandingRoute && !isCombatPatrolRoute && !isRosterRoute && (!isFactionRoute || isFactionUnitPage)" class="subnav">
      <div class="subnav-inner" :class="{ 'subnav-inner--overflow-visible': isFactionUnitPage }">
        <template v-for="item in subNavItems" :key="item.path || item.hash">
          <!-- "Units" on a per-unit datasheet page: hover/focus reveals a compact
               multi-column jump-list of the faction's units (desktop only — .subnav
               itself is hidden on mobile). -->
          <div v-if="item.unitsMenu" class="subnav-dropdown" @mouseenter="preloadUnitsMenu" @focusin="preloadUnitsMenu">
            <RouterLink
              :to="item.path"
              class="subnav-link"
              :class="{ active: route.path === item.path || (item.prefix && route.path.startsWith(item.path + '/')) }"
            >{{ item.label }}</RouterLink>
            <div class="subnav-dropdown-menu">
              <div class="subnav-dropdown-panel">
                <RouterLink
                  v-for="u in unitsMenuList"
                  :key="u[0]"
                  :to="`/factions/${route.params.slug}/datasheets/${u[0]}`"
                  class="nd-link"
                  :class="{ current: u[0] === route.params.unit }"
                >{{ u[1] }}</RouterLink>
              </div>
            </div>
          </div>
          <!-- Core Rules / Event Companion: the chapters are anchors on one page, not
               routes. The highlight follows the scroll-spy, not the URL — scrolling never
               changes it. -->
          <a
            v-else-if="item.hash"
            :href="item.hash"
            class="subnav-link"
            :class="{ active: isChapterActive(item) }"
            @click.prevent="goToChapterAnchor(item.hash.slice(1))"
          >{{ item.label }}</a>
          <RouterLink
            v-else
            :to="item.path"
            class="subnav-link"
            :class="{ active: route.path === item.path || (item.prefix && route.path.startsWith(item.path + '/')) }"
          >{{ item.label }}</RouterLink>
        </template>
      </div>
    </nav>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '../composables/useLocale.js'
import { useRefNavigation } from '../composables/useRefNavigation.js'
import { activeSectionId } from '../composables/useActiveSection.js'
import { useRouteSection } from '../composables/useRouteSection.js'
import { navGroups, navGroupsRu, CORE_PATH, eventGroups, eventGroupsRu, EVENT_PATH } from '../router/index.js'
import { ui } from '../i18n/ui.js'

const route = useRoute()
const { locale } = useLocale()
const { navigateTo } = useRefNavigation()
const {
  isLanding, isLinksRoute, isRulesLandingRoute, isCombatPatrolRoute,
  isFactionRoute, isFactionUnitPage, isFactionDetailRoute,
  isEventRoute, isTrackerRoute, isStratagemsRoute, isRosterRoute,
} = useRouteSection()

const labels = computed(() => ui[locale.value])

// The Core Rules chapters are anchors on one page, so the subnav carries hashes, not paths.
// Built off navGroups (which owns the anchors) with the subnav's own shorter labels, in the
// same order.
const CORE_SUBNAV_LABELS = [
  'subNavIntro', 'subNavBasicRules', 'subNavBattleRound', 'subNavBattlefields',
  'subNavAdvanced', 'subNavReference', 'subNavMuster',
]

const coreSubNavItems = computed(() => {
  const groups = locale.value === 'ru' ? navGroupsRu : navGroups
  return groups.map((g, i) => ({
    hash: g.hash,
    label: labels.value[CORE_SUBNAV_LABELS[i]],
    sectionIds: g.sections.map((s) => s.id),
  }))
})

// Event Companion's chapters are anchors on the one /event-companion page too — built off
// eventGroups the same way, with the subnav's own shorter labels, in the same order
// (Teams included: since everything's one page now, hiding one of the seven chapters from
// the subnav would be an arbitrary exception).
const EVENT_SUBNAV_LABELS = [
  'subNavEventIntro', 'subNavEventSequence', 'subNavEventMissions', 'subNavEventLayouts',
  'subNavEventPairings', 'subNavEventTeams', 'subNavEventFaq',
]

const eventSubNavItems = computed(() => {
  const groups = locale.value === 'ru' ? eventGroupsRu : eventGroups
  return groups.map((g, i) => ({
    hash: g.hash,
    label: labels.value[EVENT_SUBNAV_LABELS[i]],
    sectionIds: g.sections.map((s) => s.id),
  }))
})

// A chapter tab stays lit for any of its sections, so the highlight tracks reading position
// rather than the last click. Shared by Core Rules and Event Companion — both write the same
// module-singleton activeSectionId (useActiveSection.js), and only one of the two pages is
// ever mounted at a time, so there's never a mismatch between item.hash and the active id.
function isChapterActive(item) {
  const id = activeSectionId.value
  if (!id) return false
  return item.hash.slice(1) === id || item.sectionIds.includes(id)
}

function goToChapterAnchor(anchor) {
  navigateTo({ route: isEventRoute.value ? EVENT_PATH : CORE_PATH, anchor })
}

const trackerSubNavItems = computed(() => {
  const l = labels.value
  return [
    { path: '/tracker', label: l.subNavTrackerHome },
    { path: '/tracker/game', label: l.subNavTrackerGame },
    { path: '/stratagems', label: l.navStratagemsShort },
    // Last: the first three are what a game runs on, this is what it leaves behind. The record bar
    // on the tracker home is hidden at this width precisely because this tab exists — one way in
    // per viewport, not two stacked on the same screen.
    { path: '/tracker/stats', label: l.statsTitle },
  ]
})

const factionSubNavItems = computed(() => {
  const l = labels.value
  const base = `/factions/${route.params.slug}`
  return [
    // Army rule + detachments are merged onto the base page.
    { path: base, label: l.factionRules },
    // prefix: the per-unit pages (/datasheets/:unit) keep this item highlighted.
    // unitsMenu: this is the only "Units" instance that gets the hover jump-list
    // (see preloadUnitsMenu/unitsMenuList below) — it only ever renders on a
    // per-unit page, since the subnav itself is hidden on the other faction pages.
    { path: `${base}/datasheets`, label: l.factionDatasheets, prefix: true, unitsMenu: true },
    { path: `${base}/faq`, label: l.factionFaq },
  ]
})

// "Units" hover dropdown (desktop subnav, per-unit datasheet pages only) — a compact
// jump-list to another unit without leaving the page. Reuses the same compact name-only
// index the Ctrl+K search uses (src/data/datasheetIndex.js, ~60 KB for ALL factions) so
// hovering never fetches a faction's much heavier full datasheet file/chunk.
let dsIndexCache = null
let dsIndexPromise = null
const dsIndexVersion = ref(0)
function preloadUnitsMenu() {
  dsIndexPromise ??= import('../data/datasheetIndex.js').then((m) => {
    dsIndexCache = m.datasheetIndex
    dsIndexVersion.value++
  })
}
// Unit names stay English in both locales (project convention, same as faction names in
// factionsIndex.js) — no locale-aware sort needed.
const unitsMenuList = computed(() => {
  dsIndexVersion.value
  const entry = dsIndexCache?.find(([s]) => s === route.params.slug)
  if (!entry) return []
  return [...entry[2]].sort((a, b) => a[1].localeCompare(b[1]))
})

const subNavItems = computed(() => {
  // /stratagems rides with the tracker subnav so reaching it from there keeps the
  // Game Tracker / Current Game tabs in view (desktop has no "Back to game" bar).
  if (isTrackerRoute.value || isStratagemsRoute.value) return trackerSubNavItems.value
  if (isEventRoute.value) return eventSubNavItems.value
  if (isFactionDetailRoute.value) return factionSubNavItems.value
  return coreSubNavItems.value
})
</script>

<style scoped>
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

/* The faction subnav is always exactly 2 short tabs (Rules/Units) — never needs the
   horizontal scroll above, and overflow-x:auto there would also clip the "Units" hover
   dropdown's vertical overflow (per spec, overflow-y computes to auto when overflow-x
   isn't visible — can't have one axis scroll and the other stay visible). */
.subnav-inner--overflow-visible {
  overflow: visible;
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

/* ── "Units" hover dropdown (subnav, per-unit datasheet page only) — same recipe as the
   navbar "Factions" mega-menu above, positioned under a .subnav-link instead of a .nav-link. */
.subnav-dropdown {
  position: relative;
  display: flex;
  align-items: stretch;
}

.subnav-dropdown-menu {
  position: absolute;
  top: 100%;
  /* The "Units" tab sits near the horizontal centre of the subnav (it's one of only
     2 tabs in a centered group), so a menu anchored to its left edge and wide enough
     for the longest unit names overflows the viewport on anything narrower than a very
     wide desktop. Center the menu under the trigger instead, and clamp its width to
     the viewport so it never runs off either edge. */
  left: 50%;
  z-index: 210;
  padding-top: 6px; /* transparent bridge so the gap doesn't dismiss the menu on hover */
  opacity: 0;
  visibility: hidden;
  transform: translateX(-50%) translateY(4px);
  pointer-events: none;
  transition: opacity var(--motion-fast), transform var(--motion-fast), visibility var(--motion-fast);
}

.subnav-dropdown:hover .subnav-dropdown-menu,
.subnav-dropdown:focus-within .subnav-dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%);
  pointer-events: auto;
}

.subnav-dropdown-panel {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: min(64rem, 96vw);
  gap: 0.1rem 1.25rem;
  max-height: min(70vh, 420px);
  overflow-y: auto;
  padding: 0.9rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: 0 6px 24px rgba(0,0,0,0.25);
}

/* Base link look — same rule as AppNavbar.vue's Factions/Rules dropdown (scoped styles
   don't cross component boundaries, so this small shared bit is duplicated there too). */
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

.nd-link.current {
  color: var(--accent);
  font-weight: 700;
}

/* Some unit names are very long (40-54 chars, e.g. "Overlord with Translocation Shroud")
   — clip with an ellipsis instead of letting nowrap text spill into the next column. A
   slightly smaller size than the base .nd-link buys back some of that room too. */
.subnav-dropdown-panel .nd-link {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.06rem 0;
  font-size: 0.8rem;
}

/* ── Mobile ── */
@media (max-width: 900px) {
  .subnav {
    display: none;
  }

  .subnav-inner {
    padding: 0 0.75rem;
  }

  .subnav-link {
    padding: 0 0.7rem;
    font-size: 0.78rem;
  }
}
</style>
