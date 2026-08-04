import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import { isStandaloneDisplay } from '../composables/standalone.js'
import { combatPatrolIndex } from '../data/combatPatrolIndex.js'

// Route views are lazy-loaded so each page (and its data file) ships in its own
// chunk, keeping the initial bundle small. LandingView (the project landing at "/")
// stays eager.
const CoreRulesView     = () => import('../views/CoreRulesView.vue')
const EventCompanionView = () => import('../views/EventCompanionView.vue')
const TrackerHomeView   = () => import('../views/tracker/TrackerHomeView.vue')
const TrackerGameView   = () => import('../views/tracker/TrackerGameView.vue')
const AuthCallbackView  = () => import('../views/tracker/AuthCallbackView.vue')
const TrackerHistoryView = () => import('../views/tracker/TrackerHistoryView.vue')
const RosterListView    = () => import('../views/tracker/RosterListView.vue')
const RosterCreateView  = () => import('../views/tracker/RosterCreateView.vue')
const RosterViewView    = () => import('../views/tracker/RosterViewView.vue')
const RosterEditorView  = () => import('../views/tracker/RosterEditorView.vue')
const RosterSharedView  = () => import('../views/tracker/RosterSharedView.vue')
const LinksView         = () => import('../views/LinksView.vue')
const DisclaimerView    = () => import('../views/DisclaimerView.vue')
const ChangelogView     = () => import('../views/ChangelogView.vue')
const StratagemsView    = () => import('../views/StratagemsView.vue')
const FactionsListView  = () => import('../views/FactionsListView.vue')
const FactionRuleView        = () => import('../views/faction/FactionRuleView.vue')
const FactionDatasheetsView  = () => import('../views/faction/FactionDatasheetsView.vue')
const FactionDatasheetView   = () => import('../views/faction/FactionDatasheetView.vue')
const FactionFaqView         = () => import('../views/faction/FactionFaqView.vue')
const RulesLandingView  = () => import('../views/RulesLandingView.vue')
const CombatPatrolIndexView  = () => import('../views/combat-patrol/CombatPatrolIndexView.vue')
const CombatPatrolFactionView = () => import('../views/combat-patrol/CombatPatrolFactionView.vue')
const NotFoundView      = () => import('../views/NotFoundView.vue')

// The seven Core Rules chapters live on ONE page now; what used to be a route per chapter
// is an anchor on it. This map is the single registry: it drives the old-URL redirects
// below, the chapter links inside the Introduction, and the `hash` on each nav group.
export const CORE_PATH = '/core-rules'
export const CORE_CHAPTER_ANCHORS = {
  '/introduction':   'chapter-intro',
  '/basic-rules':    'section-01',
  '/battle-round':   'section-07',
  '/battlefields':   'section-13',
  '/advanced-rules': 'section-17',
  '/reference':      'section-24',
  '/muster':         'section-25',
}

export const navGroups = [
  { label: 'Introduction',        path: CORE_PATH, hash: '#chapter-intro', sections: [] },
  {
    label: 'Basic Rules', path: CORE_PATH, hash: '#section-01',
    sections: [
      { id: 'section-01', label: '01 Core Concepts' },
      { id: 'section-02', label: '02 Datasheets' },
      { id: 'section-03', label: '03 Moving' },
      { id: 'section-04', label: '04 Making Attacks' },
      { id: 'section-05', label: '05 Attack Sequence' },
      { id: 'section-06', label: '06 Other Concepts' },
    ],
  },
  {
    label: 'The Battle Round', path: CORE_PATH, hash: '#section-07',
    sections: [
      { id: 'section-07', label: '07 The Battle Round' },
      { id: 'section-08', label: '08 Command Phase' },
      { id: 'section-09', label: '09 Movement Phase' },
      { id: 'section-10', label: '10 Shooting Phase' },
      { id: 'section-11', label: '11 Charge Phase' },
      { id: 'section-12', label: '12 Fight Phase' },
    ],
  },
  {
    label: 'Battlefields & Tactics', path: CORE_PATH, hash: '#section-13',
    sections: [
      { id: 'section-13', label: '13 Terrain' },
      { id: 'section-14', label: '14 Objectives' },
      { id: 'section-15', label: '15 Stratagems' },
      { id: 'section-16', label: '16 Actions' },
    ],
  },
  {
    label: 'Advanced Rules', path: CORE_PATH, hash: '#section-17',
    sections: [
      { id: 'section-17', label: '17 Monsters & Vehicles' },
      { id: 'section-18', label: '18 Transports' },
      { id: 'section-19', label: '19 Attached Units' },
      { id: 'section-20', label: '20 Strategic Reserves' },
      { id: 'section-21', label: '21 Flying & Surging' },
      { id: 'section-22', label: '22 Other Rules' },
      { id: 'section-23', label: '23 Aircraft' },
    ],
  },
  {
    label: 'Reference', path: CORE_PATH, hash: '#section-24',
    sections: [
      { id: 'section-24', label: '24 Core Abilities' },
      { id: 'abilities-list', label: 'Unit Abilities',   filter: 'unit' },
      { id: 'abilities-list', label: 'Weapon Abilities', filter: 'weapon' },
      { id: 'section-appendix', label: 'Rules Appendix' },
      { id: 'section-errata', label: 'Errata' },
      { id: 'section-faq', label: 'FAQs' },
    ],
  },
  {
    label: 'Muster Your Army', path: CORE_PATH, hash: '#section-25',
    sections: [
      { id: 'section-25', label: '25 Muster Your Army' },
    ],
  },
]

export const navGroupsRu = [
  { label: 'Введение',                  path: CORE_PATH, hash: '#chapter-intro', sections: [] },
  {
    label: 'Базовые правила', path: CORE_PATH, hash: '#section-01',
    sections: [
      { id: 'section-01', label: '01 Основные концепции' },
      { id: 'section-02', label: '02 Листы данных' },
      { id: 'section-03', label: '03 Движение' },
      { id: 'section-04', label: '04 Совершение атак' },
      { id: 'section-05', label: '05 Последовательность атаки' },
      { id: 'section-06', label: '06 Другие концепции' },
    ],
  },
  {
    label: 'Раунд боя', path: CORE_PATH, hash: '#section-07',
    sections: [
      { id: 'section-07', label: '07 Раунд боя' },
      { id: 'section-08', label: '08 Фаза командования' },
      { id: 'section-09', label: '09 Фаза движения' },
      { id: 'section-10', label: '10 Фаза стрельбы' },
      { id: 'section-11', label: '11 Фаза нападения' },
      { id: 'section-12', label: '12 Фаза ближнего боя' },
    ],
  },
  {
    label: 'Поля сражений и тактика', path: CORE_PATH, hash: '#section-13',
    sections: [
      { id: 'section-13', label: '13 Укрытия' },
      { id: 'section-14', label: '14 Цели' },
      { id: 'section-15', label: '15 Стратегемы' },
      { id: 'section-16', label: '16 Задания' },
    ],
  },
  {
    label: 'Продвинутые правила', path: CORE_PATH, hash: '#section-17',
    sections: [
      { id: 'section-17', label: '17 Монстры и техника' },
      { id: 'section-18', label: '18 Транспорты' },
      { id: 'section-19', label: '19 Составные юниты' },
      { id: 'section-20', label: '20 Стратегические резервы' },
      { id: 'section-21', label: '21 Полёт и рывок' },
      { id: 'section-22', label: '22 Другие правила' },
      { id: 'section-23', label: '23 Авиация' },
    ],
  },
  {
    label: 'Справочный раздел', path: CORE_PATH, hash: '#section-24',
    sections: [
      { id: 'section-24', label: '24 Базовые способности' },
      { id: 'abilities-list', label: 'Способности юнита',  filter: 'unit' },
      { id: 'abilities-list', label: 'Способности оружия', filter: 'weapon' },
      { id: 'section-appendix', label: 'Приложение к правилам' },
      { id: 'section-errata', label: 'Эррата' },
      { id: 'section-faq', label: 'FAQs' },
    ],
  },
  {
    label: 'Сбор армии', path: CORE_PATH, hash: '#section-25',
    sections: [
      { id: 'section-25', label: '25 Сбор армии' },
    ],
  },
]

// Event Companion — second top-level section. Like Core Rules, all seven former routes
// live on the one /event-companion page now; what used to be a route per page is an
// anchor on it. EVENT_CHAPTER_ANCHORS is the single registry for the old-URL redirects
// (Introduction itself isn't in there — /event-companion IS the merged page's own path,
// not a redirect) and for the `hash` on each group below.
export const EVENT_PATH = '/event-companion'
export const EVENT_CHAPTER_ANCHORS = {
  '/event-companion/sequence': 'ec-chapter-sequence',
  '/event-companion/missions': 'ec-chapter-missions',
  '/event-companion/layouts':  'ec-chapter-layouts',
  '/event-companion/pairings': 'ec-chapter-pairings',
  '/event-companion/teams':    'ec-chapter-teams',
  '/event-companion/faq':      'ec-chapter-faq',
}

export const eventGroups = [
  { label: 'Introduction',     path: EVENT_PATH, hash: '#ec-chapter-intro', sections: [] },
  {
    label: 'Mission Sequence', path: EVENT_PATH, hash: '#ec-chapter-sequence',
    sections: [
      { id: 'step-1',  label: 'Muster Armies' },
      { id: 'step-2',  label: 'Determine Mission' },
      { id: 'step-4',  label: 'Create the Battlefield' },
      { id: 'step-8',  label: 'Deploy Armies' },
      { id: 'step-12', label: 'Begin the Battle' },
      { id: 'step-14', label: 'Determine Victor' },
    ],
  },
  {
    label: 'Missions', path: EVENT_PATH, hash: '#ec-chapter-missions',
    sections: [
      { id: 'missions-primary',   label: 'Primary Missions' },
      { id: 'missions-secondary', label: 'Secondary Missions' },
      { id: 'missions-twists',    label: 'Twists' },
    ],
  },
  { label: 'Terrain & Layouts', path: EVENT_PATH, hash: '#ec-chapter-layouts', sections: [] },
  {
    label: 'Pairings & Rankings', path: EVENT_PATH, hash: '#ec-chapter-pairings',
    sections: [
      { id: 'pairing-players', label: 'Pairing Players' },
      { id: 'ranking-players', label: 'Ranking Players' },
      { id: 'rules-appendix',  label: 'Rules Appendix, Errata & FAQs' },
    ],
  },
  {
    label: 'Teams', path: EVENT_PATH, hash: '#ec-chapter-teams',
    sections: [
      { id: 'team-composition', label: 'Team Composition' },
      { id: 'pairing-system',   label: 'Pairing System' },
      { id: 'team-scoring-bp',  label: 'Team Scoring' },
      { id: 'teams-pairing',    label: 'Pairing Teams' },
    ],
  },
  { label: 'Errata & FAQs',    path: EVENT_PATH, hash: '#ec-chapter-faq', sections: [] },
]

export const eventGroupsRu = [
  { label: 'Введение',                  path: EVENT_PATH, hash: '#ec-chapter-intro', sections: [] },
  {
    label: 'Последовательность миссии', path: EVENT_PATH, hash: '#ec-chapter-sequence',
    sections: [
      { id: 'step-1',  label: 'Сбор армий' },
      { id: 'step-2',  label: 'Определение миссии' },
      { id: 'step-4',  label: 'Создание поля боя' },
      { id: 'step-8',  label: 'Развёртывание армий' },
      { id: 'step-12', label: 'Начало битвы' },
      { id: 'step-14', label: 'Определение победителя' },
    ],
  },
  {
    label: 'Миссии', path: EVENT_PATH, hash: '#ec-chapter-missions',
    sections: [
      { id: 'missions-primary',   label: 'Основные миссии' },
      { id: 'missions-secondary', label: 'Вторичные миссии' },
      { id: 'missions-twists',    label: 'Твисты' },
    ],
  },
  { label: 'Террейн и раскладки',       path: EVENT_PATH, hash: '#ec-chapter-layouts', sections: [] },
  {
    label: 'Паринги и ранжирование',    path: EVENT_PATH, hash: '#ec-chapter-pairings',
    sections: [
      { id: 'pairing-players', label: 'Составление пар' },
      { id: 'ranking-players', label: 'Ранжирование игроков' },
      { id: 'rules-appendix',  label: 'Rules Appendix, эррата и FAQ' },
    ],
  },
  {
    label: 'Команды', path: EVENT_PATH, hash: '#ec-chapter-teams',
    sections: [
      { id: 'team-composition', label: 'Состав команды' },
      { id: 'pairing-system',   label: 'Система паринга' },
      { id: 'team-scoring-bp',  label: 'Командный подсчёт' },
      { id: 'teams-pairing',    label: 'Составление пар команд' },
    ],
  },
  { label: 'Эррата и FAQ',              path: EVENT_PATH, hash: '#ec-chapter-faq', sections: [] },
]

// Game Tracker — third top-level section. Two routes (home + active game), no anchors.
export const trackerGroups = [
  { label: 'Game Tracker', path: '/tracker',      sections: [] },
  { label: 'Current Game', path: '/tracker/game', sections: [] },
  { label: 'Stratagems',   path: '/stratagems',   sections: [] },
]

export const trackerGroupsRu = [
  { label: 'Трекер игры',   path: '/tracker',      sections: [] },
  { label: 'Текущая игра',  path: '/tracker/game', sections: [] },
  { label: 'Стратагемы',    path: '/stratagems',   sections: [] },
]

// Roster Builder — its own top-level section, next to the Tracker (no longer folded into
// it). One entry, like factionGroups below — the list page (/roster) is the section's own
// landing page; the wizard/editor/shared-link routes underneath it aren't in the nav.
export const rosterGroups = [
  { label: 'Rosters', path: '/roster', sections: [] },
]

export const rosterGroupsRu = [
  { label: 'Ростеры', path: '/roster', sections: [] },
]

// Factions — top-level section. List page (/factions) + two per-faction pages:
// /factions/:slug (army rule + detachments, merged) and .../datasheets (units). The old
// .../detachments URL redirects to the merged page. On desktop those two ride in the subnav
// (App.vue); on mobile they're in-page tabs in the FactionLayout hero.
export const factionGroups = [
  { label: 'Factions', path: '/factions', sections: [] },
]

export const factionGroupsRu = [
  { label: 'Фракции', path: '/factions', sections: [] },
]

// Combat Patrol — one group per authored faction, sourced from the lightweight
// combatPatrolIndex.js (not the full src/data/combatPatrol.js, which also carries every box's
// rule text and datasheets — too heavy to statically import into the router, which sits in the
// module graph of virtually every page). RU is `ru: en` today, so both exports read the same list.
export const combatPatrolGroups = combatPatrolIndex.map((f) => ({
  label: f.name, path: `/combat-patrol/${f.slug}`, sections: [],
}))
export const combatPatrolGroupsRu = combatPatrolIndex.map((f) => ({
  label: f.name, path: `/combat-patrol/${f.slug}`, sections: [],
}))

// The Links page (/links, external source PDFs) is deliberately NOT in the navbar or
// the drawer — it's reachable only from its card on the landing page (src/data/landing.js).

// `meta.section` groups routes for App.vue's nav-highlight/subnav predicates (isCoreRoute,
// isEventRoute, …) — one flag read off the matched route instead of a `path.startsWith()` guess
// repeated at every call site. Routes with no bearing on that nav chrome (landing, disclaimer,
// changelog, tracker sub-pages, 404) carry no section.
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',               component: LandingView, meta: { section: 'landing' } },
    { path: CORE_PATH, component: CoreRulesView, meta: { section: 'core' } },
    // The seven former chapter routes. They stay valid forever — old bookmarks, shared
    // links and the stale SEO keys still in the bucket all land on the right chapter.
    ...Object.entries(CORE_CHAPTER_ANCHORS).map(([path, anchor]) => ({
      path,
      redirect: { path: CORE_PATH, hash: '#' + anchor },
    })),
    { path: EVENT_PATH, component: EventCompanionView, meta: { section: 'event' } },
    // The six former chapter routes. They stay valid forever — old bookmarks, shared
    // links and the stale SEO keys still in the bucket all land on the right chapter.
    ...Object.entries(EVENT_CHAPTER_ANCHORS).map(([path, anchor]) => ({
      path,
      redirect: { path: EVENT_PATH, hash: '#' + anchor },
    })),
    { path: '/tracker',      component: TrackerHomeView, meta: { section: 'tracker' } },
    { path: '/tracker/game', component: TrackerGameView, meta: { section: 'tracker' } },
    // Roster builder rides with the Tracker section (subnav + nav highlight) — public list
    // (/roster, indexable) + private creation wizard, read-only view and editor (/roster/new,
    // /roster/:id/view, /roster/:id — none in STATIC_ROUTES, like /tracker/game). Static
    // /roster/new and /roster/shared must precede the :id route so neither is captured as an id.
    { path: '/roster',        component: RosterListView, meta: { section: 'roster' } },
    { path: '/roster/new',    component: RosterCreateView, meta: { section: 'roster' } },
    { path: '/roster/shared', component: RosterSharedView, meta: { section: 'roster' } },
    { path: '/roster/:id/view', component: RosterViewView, meta: { section: 'roster' } },
    { path: '/roster/:id',    component: RosterEditorView, meta: { section: 'roster' } },
    { path: '/tracker/history/:id', component: TrackerHistoryView, meta: { section: 'tracker' } },
    { path: '/tracker/auth-callback', component: AuthCallbackView, meta: { section: 'tracker' } },
    { path: '/links', component: LinksView, meta: { section: 'links' } },
    { path: '/disclaimer', component: DisclaimerView },
    { path: '/changelog', component: ChangelogView },
    { path: '/factions',       component: FactionsListView, meta: { section: 'faction' } },
    { path: '/factions/:slug',             component: FactionRuleView, meta: { section: 'faction' } },
    // Merged into /factions/:slug — redirect old bookmarks/links to the combined page.
    { path: '/factions/:slug/detachments', redirect: (to) => `/factions/${to.params.slug}` },
    { path: '/factions/:slug/datasheets',  component: FactionDatasheetsView, meta: { section: 'faction' } },
    { path: '/factions/:slug/datasheets/:unit', component: FactionDatasheetView, meta: { section: 'faction' } },
    { path: '/factions/:slug/faq',         component: FactionFaqView, meta: { section: 'faction' } },
    // "Rules" umbrella landing (Core Rules / Event Companion / Combat Patrol summary cards).
    { path: '/rules', component: RulesLandingView, meta: { section: 'rules-landing' } },
    // Combat Patrol.
    { path: '/combat-patrol',       component: CombatPatrolIndexView, meta: { section: 'combat-patrol' } },
    { path: '/combat-patrol/:slug', component: CombatPatrolFactionView, meta: { section: 'combat-patrol' } },
    // Game-time stratagem reference. Reachable only via the mobile bottom-nav (and direct
    // URL on desktop) — intentionally not in navGroups / NavSidebar / the top navbar.
    { path: '/stratagems', component: StratagemsView, meta: { section: 'stratagems' } },
    // Catch-all 404. The bucket's ErrorDocument serves index.html (HTTP 404) for any
    // unknown path, so the SPA must render its own not-found page (with noindex).
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
  // Every `hash` in the app targets /core-rules or /event-companion, and both already
  // self-handle scrolling via the robust, polling `scrollToAnchor()` (onMounted + a
  // route.hash watcher in CoreRulesView.vue/EventCompanionView.vue) — it retries for up to
  // 1.5s and re-corrects after 400ms, which `content-visibility: auto` chapters need since
  // their layout isn't settled right after navigation. Vue Router's own single-shot `el`
  // scroll would run concurrently with that and can win the race with a stale position
  // (landing on the wrong section) before the page has finished laying out. Leave hash
  // scrolling to scrollToAnchor entirely.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

// Remember the last open page+section and reopen it on the next launch — only for the
// installed PWA (display-mode standalone); a normal browser tab is left untouched.
// The stored value is `path` or `path#section-anchor`. PERSISTENCE lives in
// useViewRestore.js (it needs a scroll-spy for the in-view section); the router only
// owns the one-time RESTORE below, which must run before the first view mounts so the
// app never flashes home first.
export const LAST_ROUTE_KEY = 'wh11ed-last-route'
export const SKIP_RESTORE = new Set(['/tracker/auth-callback']) // transient OAuth callback

if (isStandaloneDisplay()) {
  // One-time restore on the very first navigation, only if we landed on home (no deep link).
  let restored = false
  router.beforeEach((to) => {
    if (restored) return
    restored = true
    if (to.path !== '/') return
    let saved = null
    try { saved = localStorage.getItem(LAST_ROUTE_KEY) } catch { /* ignore */ }
    if (!saved || saved === to.fullPath) return
    const resolved = router.resolve(saved)
    if (resolved.matched.length && !SKIP_RESTORE.has(resolved.path)) return saved
  })
}
