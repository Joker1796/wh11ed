import { combatPatrolIndex } from '../data/combatPatrolIndex.js'

// The site's nav tables and path constants — everything the app's chrome needs to know about the
// routes, WITHOUT the route table itself.
//
// They lived in router/index.js until 2026-09-27. That module also holds the lazy `import()` of
// every page, so it names every page chunk by its hashed file name; and the navbar, the sidebar,
// the subnav and two pages imported these constants from it. The result was a loop in the build's
// chunk graph: any page that changed (the changelog, on every release) renamed the router's
// chunk, and with it every page importing it back — ~80 files the installed app downloaded again
// after each deploy. Kept here, the router is imported by main.js alone, and a page is renamed
// only when something it actually contains changes (vite.config.js `manualChunks` does the rest).
//
// Don't import router/index.js from anything but main.js; `useRouter()` is the way in from a
// component. `npm run chunks` (part of `npm run build`) fails a graph that would bring the loop back.

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
// not a redirect; neither is Doubles, which was added after the merge and so never had a
// route of its own to redirect FROM) and for the `hash` on each group below.
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
  {
    label: 'Doubles', path: EVENT_PATH, hash: '#ec-chapter-doubles',
    sections: [
      { id: 'doubles-muster',      label: 'Muster Armies' },
      { id: 'doubles-sequence',    label: 'The Rest of the Sequence' },
      { id: 'doubles-terminology', label: 'Terminology' },
      { id: 'doubles-units-models', label: 'Core Rules Changes' },
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
  {
    label: 'Doubles', path: EVENT_PATH, hash: '#ec-chapter-doubles',
    sections: [
      { id: 'doubles-muster',      label: 'Сбор армий' },
      { id: 'doubles-sequence',    label: 'Остальная последовательность' },
      { id: 'doubles-terminology', label: 'Терминология' },
      { id: 'doubles-units-models', label: 'Изменения базовых правил' },
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

// Combat Patrol — one group per box, sourced from the lightweight combatPatrolIndex.js (not the
// full src/data/combatPatrol.js, which also carries every box's rule text and datasheets — too
// heavy to statically import into the router, which sits in the module graph of virtually every
// page). A faction with one box is named by the faction; one with several (Adeptus Custodes) by
// faction and box, or the drawer would list the same name three times. Names stay English, so
// both exports read the same list.
const cpBoxCount = (slug) => combatPatrolIndex.filter((b) => b.slug === slug).length
export const combatPatrolGroups = combatPatrolIndex.map((b) => ({
  label: cpBoxCount(b.slug) > 1 ? `${b.name} · ${b.boxName}` : b.name, path: `/combat-patrol/${b.id}`, sections: [],
}))
export const combatPatrolGroupsRu = combatPatrolGroups

// Remember the last open page+section and reopen it on the next launch (PWA only) —
// the key and the routes never restored. The restore itself is in router/index.js.
export const LAST_ROUTE_KEY = 'wh11ed-last-route'
export const SKIP_RESTORE = new Set(['/tracker/auth-callback']) // transient OAuth callback
