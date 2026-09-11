import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { stripLocale } from '../router/locale.js'

// Route-derived section flags, shared by App.vue and its nav sub-components (AppNavbar/
// AppSubnav/AppBottomNav) — one definition of "what counts as Core Rules / Event
// Companion / …" instead of a path-prefix list repeated per component. Reads off the
// matched route's `meta.section` (set in router/index.js) rather than guessing from
// `route.path` at every call site.
export function useRouteSection() {
  const route = useRoute()

  const isLanding = computed(() => route.meta.section === 'landing')
  const isLinksRoute = computed(() => route.meta.section === 'links')
  const isFactionRoute = computed(() => route.meta.section === 'faction')
  // A specific faction's pages (/factions/:slug...) get their own subnav; the /factions list doesn't.
  const isFactionDetailRoute = computed(() => isFactionRoute.value && !!route.params.slug)
  // A single unit's datasheet page is chrome-free (FactionLayout hero=false → no in-hero tabs),
  // so it keeps the top subnav for the Rules/Units switch; the faction hero pages use in-hero tabs.
  const isFactionUnitPage = computed(() => isFactionRoute.value && !!route.params.unit)
  const isEventRoute = computed(() => route.meta.section === 'event')
  const isCombatPatrolRoute = computed(() => route.meta.section === 'combat-patrol')
  // The one combined per-faction page (/combat-patrol/:slug) is a long scroll (rule + army rule +
  // stratagems + enhancements + datasheets) — same "Back to top" FAB as the Core Rules pages.
  // The index list (/combat-patrol) is short, doesn't need it.
  const isCombatPatrolFactionRoute = computed(() => isCombatPatrolRoute.value && !!route.params.slug)
  const isRulesLandingRoute = computed(() => route.meta.section === 'rules-landing')
  const isStratagemsRoute = computed(() => route.meta.section === 'stratagems')
  const isTrackerRoute = computed(() => route.meta.section === 'tracker')
  // Roster Builder — its own top-level section next to Tracker, not folded into it.
  const isRosterRoute = computed(() => route.meta.section === 'roster')
  // GameSetup (wizard) and the active/finished game screen both render on this one route —
  // the footer would otherwise push below the fold under the fixed "Back to game" bar / bottom nav.
  const isTrackerGameRoute = computed(() => stripLocale(route.path) === '/tracker/game')
  // A roster opened out of the live game (/tracker/game/roster/:pi) counts as a tracker route,
  // but it is NOT the game: it's a long read — several screens of units and stratagem cards —
  // and the shared "Back to game" button is how you leave a long read everywhere else. The
  // history variant (/tracker/history/:gid/roster/:pi) is deliberately excluded: that record
  // belongs to a finished game, not to whatever is being played right now.
  const isGameRosterRoute = computed(() => stripLocale(route.path).startsWith('/tracker/game/roster/'))
  const isCoreRoute = computed(() => route.meta.section === 'core')
  // The "Rules" umbrella (navbar dropdown / bottom-nav button) is active on its own landing
  // page and on any of the 3 sections it groups — Core Rules, Event Companion, Combat Patrol.
  const isRulesRoute = computed(() =>
    isRulesLandingRoute.value || isCoreRoute.value || isEventRoute.value || isCombatPatrolRoute.value
  )

  return {
    isLanding,
    isLinksRoute,
    isFactionRoute,
    isFactionDetailRoute,
    isFactionUnitPage,
    isEventRoute,
    isCombatPatrolRoute,
    isCombatPatrolFactionRoute,
    isRulesLandingRoute,
    isStratagemsRoute,
    isTrackerRoute,
    isTrackerGameRoute,
    isGameRosterRoute,
    isRosterRoute,
    isCoreRoute,
    isRulesRoute,
  }
}
