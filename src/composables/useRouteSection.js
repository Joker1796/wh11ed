import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTracker } from './useTracker.js'

// Route-derived section flags, shared by App.vue and its nav sub-components (AppNavbar/
// AppSubnav/AppBottomNav) — one definition of "what counts as Core Rules / Event
// Companion / …" instead of a path-prefix list repeated per component. Reads off the
// matched route's `meta.section` (set in router/index.js) rather than guessing from
// `route.path` at every call site.
export function useRouteSection() {
  const route = useRoute()
  const { current: currentGame } = useTracker()

  const isLanding = computed(() => route.meta.section === 'landing')
  const isLinksRoute = computed(() => route.meta.section === 'links')
  const isFactionRoute = computed(() => route.meta.section === 'faction')
  // A specific faction's pages (/factions/:slug...) get their own subnav; the /factions list doesn't.
  const isFactionDetailRoute = computed(() => isFactionRoute.value && !!route.params.slug)
  // A single unit's datasheet page is chrome-free (FactionLayout hero=false → no in-hero tabs),
  // so it keeps the top subnav for the Rules/Units switch; the faction hero pages use in-hero tabs.
  const isFactionUnitPage = computed(() => isFactionRoute.value && !!route.params.unit)
  // True on the datasheets list AND a single unit's page — used to hand off the bottom-nav
  // "active" highlight from the Factions button to the Units button while browsing units,
  // so only one of the two is ever lit at a time.
  const isUnitsRoute = computed(() => isFactionDetailRoute.value && route.path.includes('/datasheets'))
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
  const isTrackerGameRoute = computed(() => route.path === '/tracker/game')
  const isCoreRoute = computed(() => route.meta.section === 'core')
  // The "Rules" umbrella (navbar dropdown / bottom-nav button) is active on its own landing
  // page and on any of the 3 sections it groups — Core Rules, Event Companion, Combat Patrol.
  const isRulesRoute = computed(() =>
    isRulesLandingRoute.value || isCoreRoute.value || isEventRoute.value || isCombatPatrolRoute.value
  )

  // The bottom-nav "Units" link — same button used on unit pages (bi-people-fill → the faction's
  // datasheets list). Shown on any faction-with-slug page (faction overview / datasheet list /
  // single unit) AND, during a game, pointing to the "You" player's faction — a quick jump from
  // the tracker to your army's datasheets. Null when there's no faction context.
  const unitsNavPath = computed(() => {
    if (isFactionDetailRoute.value) return `/factions/${route.params.slug}/datasheets`
    const g = currentGame.value
    if (g?.phase === 'playing') {
      const you = g.players?.find((p) => p.isYou) ?? g.players?.[0]
      if (you?.factionSlug) return `/factions/${you.factionSlug}/datasheets`
    }
    return null
  })

  return {
    isLanding,
    isLinksRoute,
    isFactionRoute,
    isFactionDetailRoute,
    isFactionUnitPage,
    isUnitsRoute,
    isEventRoute,
    isCombatPatrolRoute,
    isCombatPatrolFactionRoute,
    isRulesLandingRoute,
    isStratagemsRoute,
    isTrackerRoute,
    isTrackerGameRoute,
    isRosterRoute,
    isCoreRoute,
    isRulesRoute,
    unitsNavPath,
  }
}
