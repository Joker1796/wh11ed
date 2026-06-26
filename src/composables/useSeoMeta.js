// Per-route document title + meta description (bilingual).
//
// The app uses hash routing (createWebHashHistory), so search engines index only the
// root URL — these JS-set tags do NOT make sections separately indexable (that needs
// history mode + an SPA fallback). What they DO give us: correct browser-tab / bookmark
// / history titles, the title/description Google sees when it renders the SPA, and a
// foundation that's ready if we ever switch to history mode. Social scrapers don't run
// JS, so they keep reading the static tags in index.html — we intentionally leave those
// (canonical/hreflang/OG/Twitter) alone and only touch <title> + <meta name=description>.
//
// No head-management dependency: we just set document.title and one <meta> element.

const SITE = { en: 'Warhammer 40,000 11th Ed', ru: 'Warhammer 40,000' }

const DEFAULT = {
  title: {
    en: 'Warhammer 40,000 — Core Rules 11th Edition',
    ru: 'Warhammer 40,000 — Основные правила 11-й редакции',
  },
  description: {
    en: 'Bilingual (EN/RU) interactive reference for the Warhammer 40,000 11th Edition Core Rules and Event Companion — searchable, offline-capable, free.',
    ru: 'Двуязычный (EN/RU) интерактивный справочник по основным правилам Warhammer 40,000 11-й редакции и Event Companion — с поиском, офлайн, бесплатно.',
  },
}

// The "/" landing page — overview of the whole project (all three sections).
const LANDING = {
  title: {
    en: 'Warhammer 40,000 11th Edition — Rules, Event Companion & Tracker',
    ru: 'Warhammer 40,000 11-й редакции — правила, Event Companion и трекер',
  },
  description: DEFAULT.description,
}

// path → { title:{en,ru}, description:{en,ru} }. `title` here is the page-name prefix;
// the brand suffix (SITE) is appended below, except for '/' which uses DEFAULT.title.
const ROUTES = {
  '/introduction': {
    title: { en: 'Introduction', ru: 'Введение' },
    description: DEFAULT.description,
  },
  '/basic-rules': {
    title: { en: 'Basic Rules', ru: 'Основные правила' },
    description: {
      en: 'Core concepts, datasheets, moving, making attacks and the attack sequence — the foundational rules of Warhammer 40,000 11th edition.',
      ru: 'Базовые концепции, листы данных, движение, совершение атак и последовательность атаки — основы правил Warhammer 40,000 11-й редакции.',
    },
  },
  '/battle-round': {
    title: { en: 'The Battle Round', ru: 'Раунд боя' },
    description: {
      en: 'The battle round and its five phases — Command, Movement, Shooting, Charge and Fight: turn structure and sequencing for Warhammer 40,000 11th edition.',
      ru: 'Раунд боя и его пять фаз — командования, движения, стрельбы, нападения и ближнего боя: структура хода в Warhammer 40,000 11-й редакции.',
    },
  },
  '/battlefields': {
    title: { en: 'Battlefields & Stratagems', ru: 'Поле боя и стратагемы' },
    description: {
      en: 'Terrain, objectives, stratagems and actions — battlefield rules and the core stratagems of Warhammer 40,000 11th edition.',
      ru: 'Террейн, цели, стратагемы и действия — правила поля боя и базовые стратагемы Warhammer 40,000 11-й редакции.',
    },
  },
  '/advanced-rules': {
    title: { en: 'Advanced Rules', ru: 'Продвинутые правила' },
    description: {
      en: 'Monsters & vehicles, transports, attached units (leaders), strategic reserves, flying and aircraft — advanced rules for Warhammer 40,000 11th edition.',
      ru: 'Монстры и техника, транспорт, объединённые отряды (лидеры), стратегический резерв, полёт и воздушные суда — продвинутые правила 40k 11-й редакции.',
    },
  },
  '/reference': {
    title: { en: 'Reference & Abilities', ru: 'Справочник и способности' },
    description: {
      en: 'Core abilities, unit and weapon ability keywords, the rules appendix and FAQs — the quick-reference glossary for Warhammer 40,000 11th edition.',
      ru: 'Базовые способности, ключевые слова способностей юнитов и оружия, приложение правил и FAQ — краткий справочник Warhammer 40,000 11-й редакции.',
    },
  },
  '/muster': {
    title: { en: 'Muster Your Army', ru: 'Сбор армии' },
    description: {
      en: 'Muster your army: battle sizes, detachments, enhancements and points — army-building rules for Warhammer 40,000 11th edition.',
      ru: 'Сбор армии: размеры битвы, детачменты, улучшения и очки — правила построения армии Warhammer 40,000 11-й редакции.',
    },
  },
  '/event-companion': {
    title: { en: 'Event Companion', ru: 'Event Companion' },
    description: {
      en: 'The Warhammer 40,000 Event Companion: matched-play missions, terrain layouts, pairings and FAQs for tournaments.',
      ru: 'Warhammer 40,000 Event Companion: турнирные миссии, раскладки террейна, паринги и FAQ для matched play.',
    },
  },
  '/event-companion/sequence': {
    title: { en: 'Mission Sequence — Event Companion', ru: 'Последовательность миссии — Event Companion' },
    description: {
      en: 'Pre-game sequence: muster armies, determine the mission, create the battlefield, deploy and begin the battle — Warhammer 40,000 Event Companion.',
      ru: 'Предбоевая последовательность: сбор армий, определение миссии, создание поля боя, развёртывание и начало битвы — Event Companion.',
    },
  },
  '/event-companion/missions': {
    title: { en: 'Missions — Event Companion', ru: 'Миссии — Event Companion' },
    description: {
      en: 'All 25 primary and 18 secondary missions plus pre-game twists, browsable by Force Disposition — Warhammer 40,000 Event Companion.',
      ru: 'Все 25 основных и 18 вторичных миссий плюс предбоевые твисты, с фильтром по диспозициям сил — Warhammer 40,000 Event Companion.',
    },
  },
  '/event-companion/layouts': {
    title: { en: 'Terrain & Layouts — Event Companion', ru: 'Террейн и раскладки — Event Companion' },
    description: {
      en: 'Terrain footprints, the layouts key and the 5×5 mission matrix with matchup diagrams — Warhammer 40,000 Event Companion.',
      ru: 'Footprints террейна, легенда раскладок и матрица миссий 5×5 с диаграммами матчапов — Warhammer 40,000 Event Companion.',
    },
  },
  '/event-companion/pairings': {
    title: { en: 'Pairings & Rankings — Event Companion', ru: 'Паринги и ранжирование — Event Companion' },
    description: {
      en: 'Pairing and ranking players at events, plus the rules appendix, errata and FAQs — Warhammer 40,000 Event Companion.',
      ru: 'Составление пар и ранжирование игроков на турнирах, приложение правил, эррата и FAQ — Warhammer 40,000 Event Companion.',
    },
  },
  '/event-companion/faq': {
    title: { en: 'Errata & FAQs — Event Companion', ru: 'Эррата и FAQ — Event Companion' },
    description: {
      en: 'Errata and frequently asked questions for the Warhammer 40,000 Event Companion.',
      ru: 'Эррата и часто задаваемые вопросы по Warhammer 40,000 Event Companion.',
    },
  },
  '/tracker': {
    title: { en: 'Game Tracker', ru: 'Трекер игры' },
    description: {
      en: 'Free offline 2-player VP / Battle Points tracker for a game of Warhammer 40,000 11th edition — missions, secondaries and scoring.',
      ru: 'Бесплатный офлайн-трекер очков на 2 игроков для партии Warhammer 40,000 11-й редакции — миссии, вторичные задачи и подсчёт.',
    },
  },
  '/tracker/game': {
    title: { en: 'Current Game — Tracker', ru: 'Текущая игра — Трекер' },
    description: {
      en: 'Current game scoring — track victory points, secondaries and command points for Warhammer 40,000 11th edition.',
      ru: 'Текущая партия: подсчёт победных очков, вторичных задач и командных очков для Warhammer 40,000 11-й редакции.',
    },
  },
}

function pick(loc) {
  return loc === 'ru' ? 'ru' : 'en'
}

function metaFor(path, loc) {
  if (path === '/') return { title: LANDING.title[loc], description: LANDING.description[loc] }
  let entry = ROUTES[path]
  // dynamic / transient tracker routes (history/:id, auth-callback) → tracker default
  if (!entry && path.startsWith('/tracker')) entry = ROUTES['/tracker']
  if (!entry) return { title: DEFAULT.title[loc], description: DEFAULT.description[loc] }
  // page-name titles that already contain '—' carry their own context; others get the brand suffix
  const name = entry.title[loc]
  const title = name.includes('—') ? name : `${name} — ${SITE[loc]}`
  return { title, description: entry.description[loc] }
}

/** Set document.title and <meta name="description"> for the given route + locale. */
export function applyRouteMeta(path, locale) {
  if (typeof document === 'undefined') return
  const loc = pick(locale)
  const { title, description } = metaFor(path, loc)
  document.title = title
  let el = document.querySelector('meta[name="description"]')
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', 'description')
    document.head.appendChild(el)
  }
  el.setAttribute('content', description)
}
