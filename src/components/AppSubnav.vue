<template>
  <!-- Subnav: core rules links (hidden on the section-less landing & links pages). Not on a
       faction page: its per-unit page reaches Rules / Units / FAQ by the corner buttons
       (FactionLayout, owner 2026-10-01), the other faction pages by their own tabs. -->
  <Transition name="fade">
    <nav
      v-if="!isLanding && !isLinksRoute && !isRulesLandingRoute && !isCombatPatrolRoute && !isRosterRoute && !isFactionRoute && !isPatchesRoute"
      class="subnav"
    >
      <div class="subnav-inner">
        <template
          v-for="item in subNavItems"
          :key="item.path || item.hash"
        >
          <!-- Core Rules / Event Companion: the chapters are anchors on one page, not
               routes. The highlight follows the scroll-spy, not the URL — scrolling never
               changes it. -->
          <a
            v-if="item.hash"
            :href="item.hash"
            class="subnav-link"
            :class="{ active: isChapterActive(item) }"
            @click.prevent="goToChapterAnchor(item.hash.slice(1))"
          >{{ item.label }}</a>
          <RouterLink
            v-else
            :to="item.path"
            class="subnav-link"
            :class="{ active: isItemActive(item) }"
          >
            {{ item.label }}
          </RouterLink>
        </template>
      </div>
    </nav>
  </Transition>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { stripLocale } from '../router/locale.js'
import { useLocale } from '../composables/useLocale.js'
import { useRefNavigation } from '../composables/useRefNavigation.js'
import { activeSectionId } from '../composables/useActiveSection.js'
import { useRouteSection } from '../composables/useRouteSection.js'
import { CORE_PATH, EVENT_PATH } from '../router/nav.js'
import { useNavGroups } from '../composables/useNavGroups.js'
import { ui } from '../i18n/ui.js'

const route = useRoute()
// The patch notes are about every part of the game at once — no chapter strip over them.
const isPatchesRoute = computed(() => stripLocale(route.path) === '/patches')

// Subnav targets are bare paths; the address may carry the `/ru` prefix.
const isItemActive = (item) => {
  const p = stripLocale(route.path)
  return p === item.path || (item.prefix && p.startsWith(item.path + '/'))
}
const { locale } = useLocale()
const { navigateTo } = useRefNavigation()
const {
  isLanding, isLinksRoute, isRulesLandingRoute, isCombatPatrolRoute,
  isFactionRoute,
  isEventRoute, isTrackerRoute, isStratagemsRoute, isRosterRoute,
} = useRouteSection()

const labels = computed(() => ui[locale.value])

// Core Rules and the Event Companion are each one page, so their subnav carries hashes, not paths —
// built off the book's own navGroups (which own the anchors), with the subnav's shorter labels.
// Keyed by the chapter's anchor, not by position: a positional list went one short when Doubles
// joined the Event Companion, and every tab after it wore its neighbour's name (the "FAQ" tab
// opened Doubles, the FAQ's own tab had no label at all). A chapter with no short label here
// shows its full one.
const SUBNAV_LABELS = {
  '#chapter-intro': 'subNavIntro',
  '#section-01': 'subNavBasicRules',
  '#section-07': 'subNavBattleRound',
  '#section-13': 'subNavBattlefields',
  '#section-17': 'subNavAdvanced',
  '#section-24': 'subNavReference',
  '#section-25': 'subNavMuster',
  '#ec-chapter-intro': 'subNavEventIntro',
  '#ec-chapter-sequence': 'subNavEventSequence',
  '#ec-chapter-missions': 'subNavEventMissions',
  '#ec-chapter-layouts': 'subNavEventLayouts',
  '#ec-chapter-pairings': 'subNavEventPairings',
  '#ec-chapter-teams': 'subNavEventTeams',
  '#ec-chapter-faq': 'subNavEventFaq',
}
const chapterItems = (groups) => groups.value.map((g) => ({
  hash: g.hash,
  label: labels.value[SUBNAV_LABELS[g.hash]] || g.label,
  sectionIds: g.sections.map((s) => s.id),
}))
const coreGroups = useNavGroups('core')
const eventGroups = useNavGroups('event')
const coreSubNavItems = computed(() => chapterItems(coreGroups))
const eventSubNavItems = computed(() => chapterItems(eventGroups))

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

const subNavItems = computed(() => {
  // /stratagems rides with the tracker subnav so reaching it from there keeps the
  // Game Tracker / Current Game tabs in view (desktop has no "Back to game" bar).
  if (isTrackerRoute.value || isStratagemsRoute.value) return trackerSubNavItems.value
  if (isEventRoute.value) return eventSubNavItems.value
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
