import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import HomeView from '../views/HomeView.vue'
import { isStandaloneDisplay } from '../composables/standalone.js'

// Route views are lazy-loaded so each page (and its data file) ships in its own
// chunk, keeping the initial bundle small. LandingView (the project landing at "/")
// and HomeView (the Core Rules introduction at "/introduction") stay eager.
const BasicRulesView    = () => import('../views/BasicRulesView.vue')
const BattleRoundView   = () => import('../views/BattleRoundView.vue')
const BattlefieldsView  = () => import('../views/BattlefieldsView.vue')
const AdvancedRulesView = () => import('../views/AdvancedRulesView.vue')
const ReferenceView     = () => import('../views/ReferenceView.vue')
const MusterView        = () => import('../views/MusterView.vue')
const EventIntroView    = () => import('../views/event/EventIntroView.vue')
const EventSequenceView = () => import('../views/event/EventSequenceView.vue')
const EventMissionsView = () => import('../views/event/EventMissionsView.vue')
const EventLayoutsView  = () => import('../views/event/EventLayoutsView.vue')
const EventPairingsView = () => import('../views/event/EventPairingsView.vue')
const EventTeamsView    = () => import('../views/event/EventTeamsView.vue')
const EventFaqView      = () => import('../views/event/EventFaqView.vue')
const TrackerHomeView   = () => import('../views/tracker/TrackerHomeView.vue')
const TrackerGameView   = () => import('../views/tracker/TrackerGameView.vue')
const AuthCallbackView  = () => import('../views/tracker/AuthCallbackView.vue')
const TrackerHistoryView = () => import('../views/tracker/TrackerHistoryView.vue')
const LinksView         = () => import('../views/LinksView.vue')
const DisclaimerView    = () => import('../views/DisclaimerView.vue')
const StratagemsView    = () => import('../views/StratagemsView.vue')
const FactionsListView  = () => import('../views/FactionsListView.vue')
const FactionRuleView        = () => import('../views/faction/FactionRuleView.vue')
const FactionDatasheetsView  = () => import('../views/faction/FactionDatasheetsView.vue')
const FactionDatasheetView   = () => import('../views/faction/FactionDatasheetView.vue')
const NotFoundView      = () => import('../views/NotFoundView.vue')

export const navGroups = [
  { label: 'Introduction',        path: '/introduction',   sections: [] },
  {
    label: 'Basic Rules', path: '/basic-rules',
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
    label: 'The Battle Round', path: '/battle-round',
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
    label: 'Battlefields & Tactics', path: '/battlefields',
    sections: [
      { id: 'section-13', label: '13 Terrain' },
      { id: 'section-14', label: '14 Objectives' },
      { id: 'section-15', label: '15 Stratagems' },
      { id: 'section-16', label: '16 Actions' },
    ],
  },
  {
    label: 'Advanced Rules', path: '/advanced-rules',
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
    label: 'Reference', path: '/reference',
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
    label: 'Muster Your Army', path: '/muster',
    sections: [
      { id: 'section-25', label: '25 Muster Your Army' },
    ],
  },
]

export const navGroupsRu = [
  { label: 'Введение',                  path: '/introduction',   sections: [] },
  {
    label: 'Базовые правила', path: '/basic-rules',
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
    label: 'Раунд боя', path: '/battle-round',
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
    label: 'Поля сражений и тактика', path: '/battlefields',
    sections: [
      { id: 'section-13', label: '13 Укрытия' },
      { id: 'section-14', label: '14 Цели' },
      { id: 'section-15', label: '15 Стратегемы' },
      { id: 'section-16', label: '16 Задания' },
    ],
  },
  {
    label: 'Продвинутые правила', path: '/advanced-rules',
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
    label: 'Справочный раздел', path: '/reference',
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
    label: 'Сбор армии', path: '/muster',
    sections: [
      { id: 'section-25', label: '25 Сбор армии' },
    ],
  },
]

// Event Companion — second top-level section. Each entry is its own route
// (no in-page anchors), so `sections` is empty and the sidebar navigates on click.
export const eventGroups = [
  { label: 'Introduction',     path: '/event-companion',          sections: [] },
  {
    label: 'Mission Sequence', path: '/event-companion/sequence',
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
    label: 'Missions', path: '/event-companion/missions',
    sections: [
      { id: 'missions-primary',   label: 'Primary Missions' },
      { id: 'missions-secondary', label: 'Secondary Missions' },
      { id: 'missions-twists',    label: 'Twists' },
    ],
  },
  { label: 'Terrain & Layouts', path: '/event-companion/layouts', sections: [] },
  {
    label: 'Pairings & Rankings', path: '/event-companion/pairings',
    sections: [
      { id: 'pairing-players', label: 'Pairing Players' },
      { id: 'ranking-players', label: 'Ranking Players' },
      { id: 'rules-appendix',  label: 'Rules Appendix, Errata & FAQs' },
    ],
  },
  {
    label: 'Teams', path: '/event-companion/teams',
    sections: [
      { id: 'team-composition', label: 'Team Composition' },
      { id: 'pairing-system',   label: 'Pairing System' },
      { id: 'team-scoring-bp',  label: 'Team Scoring' },
      { id: 'teams-pairing',    label: 'Pairing Teams' },
    ],
  },
  { label: 'Errata & FAQs',    path: '/event-companion/faq',      sections: [] },
]

export const eventGroupsRu = [
  { label: 'Введение',                  path: '/event-companion',          sections: [] },
  {
    label: 'Последовательность миссии', path: '/event-companion/sequence',
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
    label: 'Миссии', path: '/event-companion/missions',
    sections: [
      { id: 'missions-primary',   label: 'Основные миссии' },
      { id: 'missions-secondary', label: 'Вторичные миссии' },
      { id: 'missions-twists',    label: 'Твисты' },
    ],
  },
  { label: 'Террейн и раскладки',       path: '/event-companion/layouts',  sections: [] },
  {
    label: 'Паринги и ранжирование',    path: '/event-companion/pairings',
    sections: [
      { id: 'pairing-players', label: 'Составление пар' },
      { id: 'ranking-players', label: 'Ранжирование игроков' },
      { id: 'rules-appendix',  label: 'Rules Appendix, эррата и FAQ' },
    ],
  },
  {
    label: 'Teams', path: '/event-companion/teams',
    sections: [
      { id: 'team-composition', label: 'Состав команды' },
      { id: 'pairing-system',   label: 'Система паринга' },
      { id: 'team-scoring-bp',  label: 'Командный подсчёт' },
      { id: 'teams-pairing',    label: 'Составление пар команд' },
    ],
  },
  { label: 'Эррата и FAQ',              path: '/event-companion/faq',      sections: [] },
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

// The Links page (/links, external source PDFs) is deliberately NOT in the navbar or
// the drawer — it's reachable only from its card on the landing page (src/data/landing.js).

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',               component: LandingView },
    { path: '/introduction',   component: HomeView },
    { path: '/basic-rules',    component: BasicRulesView },
    { path: '/battle-round',   component: BattleRoundView },
    { path: '/battlefields',   component: BattlefieldsView },
    { path: '/advanced-rules', component: AdvancedRulesView },
    { path: '/reference',      component: ReferenceView },
    { path: '/muster',         component: MusterView },
    { path: '/event-companion',          component: EventIntroView },
    { path: '/event-companion/sequence', component: EventSequenceView },
    { path: '/event-companion/missions', component: EventMissionsView },
    { path: '/event-companion/layouts',  component: EventLayoutsView },
    { path: '/event-companion/pairings', component: EventPairingsView },
    { path: '/event-companion/teams',    component: EventTeamsView },
    { path: '/event-companion/faq',      component: EventFaqView },
    { path: '/tracker',      component: TrackerHomeView },
    { path: '/tracker/game', component: TrackerGameView },
    { path: '/tracker/history/:id', component: TrackerHistoryView },
    { path: '/tracker/auth-callback', component: AuthCallbackView },
    { path: '/links', component: LinksView },
    { path: '/disclaimer', component: DisclaimerView },
    { path: '/factions',       component: FactionsListView },
    { path: '/factions/:slug',             component: FactionRuleView },
    // Merged into /factions/:slug — redirect old bookmarks/links to the combined page.
    { path: '/factions/:slug/detachments', redirect: (to) => `/factions/${to.params.slug}` },
    { path: '/factions/:slug/datasheets',  component: FactionDatasheetsView },
    { path: '/factions/:slug/datasheets/:unit', component: FactionDatasheetView },
    // Game-time stratagem reference. Reachable only via the mobile bottom-nav (and direct
    // URL on desktop) — intentionally not in navGroups / NavSidebar / the top navbar.
    { path: '/stratagems', component: StratagemsView },
    // Catch-all 404. The bucket's ErrorDocument serves index.html (HTTP 404) for any
    // unknown path, so the SPA must render its own not-found page (with noindex).
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
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
