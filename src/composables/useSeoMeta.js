// Per-route document title, meta description, canonical, og:url and hreflang (bilingual).
//
// The app uses history routing (createWebHistory) and the deploy uploads an index.html
// copy under every public route key (deploy.sh + scripts/gen-seo-routes.mjs), so each
// section is separately crawlable at a clean URL with HTTP 200. Every deep URL serves the
// same index.html, whose static tags describe the ROOT — so the per-route canonical /
// og:url / hreflang MUST be managed here (Google processes JS-set canonicals) and must
// NOT be hardcoded in index.html: a static canonical pointing at "/" on every deep page
// would collapse the whole site back into one indexed URL. Static og:title/description/
// image in index.html stay as the site-wide fallback for social scrapers (they don't
// run JS; og:url is optional and falls back to the request URL).
//
// No head-management dependency: we just set document.title and a few head elements.
//
// Faction / datasheet pages (/factions/:slug[/datasheets[/:unit]]) aren't in the static
// ROUTES map — there are ~1500 of them — so their title/description/canonical are generated
// from templates below. The faction name comes from the light factionsIndex (safe to import
// into the entry chunk); the precise unit name is pushed in by FactionDatasheetView via
// setDatasheetName once its datasheet has loaded (the heavy per-faction file never rides here).
import { factionIndexBySlug } from '../data/factionsIndex.js'
import { SITE_ORIGIN } from '../config.js'

const ORIGIN = SITE_ORIGIN

const SITE = { en: 'Warhammer 40,000 11th Ed', ru: 'Warhammer 40,000' }

const DEFAULT = {
  title: {
    en: 'Warhammer 40,000 — Core Rules 11th Edition',
    ru: 'Warhammer 40,000 — Основные правила 11-й редакции',
  },
  description: {
    en: 'Bilingual (EN/RU) interactive reference for Warhammer 40,000 11th edition: core rules, Event Companion, faction rules and unit datasheets, plus an offline game tracker — searchable, free.',
    ru: 'Двуязычный (EN/RU) интерактивный справочник по Warhammer 40,000 11-й редакции: основные правила, Event Companion, правила фракций и листы данных юнитов, плюс офлайн-трекер партии — с поиском, бесплатно.',
  },
}

// The "/" landing page — overview of the whole project (all three sections). The main
// entry point for crawlers, so it carries the primary keywords: the brand in both
// scripts (Warhammer / Вархаммер), "11-я редакция" and "на русском" for RU queries.
const LANDING = {
  title: {
    en: 'Warhammer 40,000 11th Edition — Rules, Event Companion & Tracker',
    ru: 'Warhammer 40,000 (Вархаммер) 11-я редакция — правила на русском',
  },
  description: {
    en: 'Bilingual (EN/RU) reference for Warhammer 40,000 11th edition: core rules, Event Companion, faction rules and unit datasheets, plus a free offline game tracker. Searchable, installable, free.',
    ru: 'Справочник по Warhammer 40 000 (Вархаммер) 11-й редакции на русском: основные правила, миссии и стратагемы, правила фракций и листы данных юнитов, трекер очков. С поиском, офлайн, бесплатно.',
  },
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
  '/stratagems': {
    title: { en: 'Stratagems', ru: 'Стратагемы' },
    description: {
      en: 'The core stratagems of Warhammer 40,000 11th edition — a quick card reference for use during a game.',
      ru: 'Базовые стратагемы Warhammer 40,000 11-й редакции — быстрый просмотр карточек во время партии.',
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
  '/event-companion/teams': {
    title: { en: 'Teams Event — Event Companion', ru: 'Командный ивент — Event Companion' },
    description: {
      en: 'Running a Warhammer 40,000 Teams Event: team composition, the pairing system (Initial Skirmish, Main Engagement, Champion System) and team scoring.',
      ru: 'Проведение командного ивента Warhammer 40,000: состав команды, система паринга (Initial Skirmish, Main Engagement, Champion System) и командный подсчёт.',
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
  '/links': {
    title: { en: 'Links', ru: 'Ссылки' },
    description: {
      en: 'Official Warhammer Community source PDFs for Warhammer 40,000 11th edition — Core Rules, Event Companion, Teams Event Companion and Terrain Area Footprints.',
      ru: 'Официальные исходные PDF Warhammer Community для Warhammer 40,000 11-й редакции — Core Rules, Event Companion, Teams Event Companion и Terrain Area Footprints.',
    },
  },
  '/disclaimer': {
    title: { en: 'Legal & Disclaimer', ru: 'Правовая информация' },
    description: {
      en: 'Legal disclaimer: this is an unofficial fan project, not affiliated with or endorsed by Games Workshop; all Warhammer 40,000 names, rules and imagery belong to Games Workshop.',
      ru: 'Отказ от ответственности: неофициальный фан-проект, не связанный с Games Workshop; все названия, правила и изображения Warhammer 40,000 принадлежат Games Workshop.',
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

// --- Faction / datasheet pages (dynamic, template-driven) ----------------------------------
const FACTION_RE = /^\/factions\/([^/]+)$/
const DATASHEETS_RE = /^\/factions\/([^/]+)\/datasheets$/
const DATASHEET_RE = /^\/factions\/([^/]+)\/datasheets\/([^/]+)$/
export const isFactionPath = (path) => FACTION_RE.test(path) || DATASHEETS_RE.test(path) || DATASHEET_RE.test(path)

// Precise unit names supplied by FactionDatasheetView (keyed by path, so a locale switch that
// re-runs applyRouteMeta keeps the real name). Faction/unit NAMES stay English in both locales
// (project convention) — only the surrounding phrasing is localized.
const unitNames = new Map()
const prettifySlug = (s) => s.split('-').map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(' ')
const factionName = (slug) => factionIndexBySlug(slug)?.name || prettifySlug(slug)

function dynamicMetaFor(path, loc) {
  let m = path.match(DATASHEET_RE)
  if (m) {
    const faction = factionName(m[1])
    const unit = unitNames.get(path) || prettifySlug(m[2])
    return loc === 'ru'
      ? { title: `${unit} — датащит ${faction} — ${SITE.ru}`, description: `${unit} — лист данных ${faction} для Warhammer 40,000 11-й редакции: характеристики, оружие, способности, ключевые слова и очки.` }
      : { title: `${unit} — ${faction} Datasheet — ${SITE.en}`, description: `${unit} datasheet for ${faction} in Warhammer 40,000 11th edition: statline, weapons, abilities, keywords and points.` }
  }
  m = path.match(DATASHEETS_RE)
  if (m) {
    const faction = factionName(m[1])
    return loc === 'ru'
      ? { title: `Датащиты ${faction} — ${SITE.ru}`, description: `Все листы данных юнитов ${faction} для Warhammer 40,000 11-й редакции: характеристики, оружие, способности, ключевые слова и очки.` }
      : { title: `${faction} Datasheets — ${SITE.en}`, description: `All unit datasheets for ${faction} in Warhammer 40,000 11th edition: statlines, weapons, abilities, keywords and points.` }
  }
  m = path.match(FACTION_RE)
  if (m) {
    const faction = factionName(m[1])
    return loc === 'ru'
      ? { title: `${faction} — правила фракции — ${SITE.ru}`, description: `${faction} в Warhammer 40,000 11-й редакции: армейское правило, детачменты, стратагемы, улучшения и листы данных юнитов.` }
      : { title: `${faction} — Army Rules & Detachments — ${SITE.en}`, description: `${faction} in Warhammer 40,000 11th edition: army rule, detachments, stratagems, enhancements and unit datasheets.` }
  }
  return null
}

function metaFor(path, loc) {
  if (path === '/') return { title: LANDING.title[loc], description: LANDING.description[loc] }
  const dyn = dynamicMetaFor(path, loc)
  if (dyn) return dyn
  let entry = ROUTES[path]
  // dynamic / transient tracker routes (history/:id, auth-callback) → tracker default
  if (!entry && path.startsWith('/tracker')) entry = ROUTES['/tracker']
  if (!entry) return { title: DEFAULT.title[loc], description: DEFAULT.description[loc] }
  // page-name titles that already contain '—' carry their own context; others get the brand suffix
  const name = entry.title[loc]
  const title = name.includes('—') ? name : `${name} — ${SITE[loc]}`
  return { title, description: entry.description[loc] }
}

function upsertMeta(selector, create, content) {
  let el = document.querySelector(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
  return el
}

function upsertLink(rel, href, hreflang) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function removeCanonicalTags() {
  document
    .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang], meta[property="og:url"]')
    .forEach((el) => el.remove())
}

// Canonical + og:url + hreflang for the indexable routes. Each language variant is
// self-canonical (EN = clean path, RU = path?lang=ru) with hreflang pointing at its
// sibling — canonicalizing RU onto EN would deindex the RU pages. Non-indexable paths
// (tracker game/history/auth-callback, unknown → NotFoundView with its noindex) get the
// canonical trio removed instead of pointing somewhere misleading.
function applyCanonical(path, loc) {
  const indexable = path === '/' || (!!ROUTES[path] && path !== '/tracker/game') || isFactionPath(path)
  if (!indexable) {
    removeCanonicalTags()
    return
  }
  const enUrl = `${ORIGIN}${path}`
  const ruUrl = path === '/' ? `${ORIGIN}/?lang=ru` : `${enUrl}?lang=ru`
  const canonical = loc === 'ru' ? ruUrl : enUrl
  upsertLink('canonical', canonical)
  upsertLink('alternate', enUrl, 'en')
  upsertLink('alternate', ruUrl, 'ru')
  upsertLink('alternate', enUrl, 'x-default')
  upsertMeta('meta[property="og:url"]', () => {
    const el = document.createElement('meta')
    el.setAttribute('property', 'og:url')
    return el
  }, canonical)
}

// Last applied route, so setDatasheetName can re-render the title/description in place once the
// view supplies the precise unit name (the first paint uses the slug-derived fallback).
let _lastPath = null
let _lastLocale = 'en'

/** Called by FactionDatasheetView once its datasheet loads, to replace the slug-derived unit
 *  name in the title/description with the real one (unit names are never translated). */
export function setDatasheetName(path, name) {
  if (!name || unitNames.get(path) === name) return
  unitNames.set(path, name)
  if (path === _lastPath) applyRouteMeta(_lastPath, _lastLocale)
}

/** Set document.title, <meta name="description"> and the canonical/og:url/hreflang trio
 *  for the given route + locale. */
export function applyRouteMeta(path, locale) {
  if (typeof document === 'undefined') return
  const loc = pick(locale)
  _lastPath = path
  _lastLocale = locale
  const { title, description } = metaFor(path, loc)
  document.title = title
  upsertMeta('meta[name="description"]', () => {
    const el = document.createElement('meta')
    el.setAttribute('name', 'description')
    return el
  }, description)
  applyCanonical(path, loc)
}
