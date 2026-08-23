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
import { combatPatrolIndex } from '../data/combatPatrolIndex.js'
import { SITE_ORIGIN } from '../config.js'

const ORIGIN = SITE_ORIGIN

const SITE = { en: 'Warhammer 40,000 11th Ed', ru: 'Warhammer 40,000' }

const DEFAULT = {
  title: {
    en: 'Warhammer 40,000 11th Edition — Rules, Factions & Tracker',
    ru: 'Warhammer 40,000 11-я редакция — правила, фракции и трекер',
  },
  description: {
    en: 'Bilingual (EN/RU) interactive reference for Warhammer 40,000 11th edition: core rules, Event Companion, faction rules and unit datasheets, plus a free army list builder and an offline game tracker — searchable, free.',
    ru: 'Двуязычный (EN/RU) интерактивный справочник по Warhammer 40,000 11-й редакции: основные правила, Event Companion, правила фракций и листы данных юнитов, плюс бесплатный конструктор армейских листов и офлайн-трекер партии — с поиском, бесплатно.',
  },
}

// The "/" landing page — overview of the whole project (all three sections). The main
// entry point for crawlers, so it carries the primary keywords: the brand in both
// scripts (Warhammer / Вархаммер), "11-я редакция" and "на русском" for RU queries.
const LANDING = {
  title: {
    en: 'Warhammer 40,000 11th Edition — Rules, Factions & Tracker',
    ru: 'Warhammer 40,000 (Вархаммер) 11-я редакция — правила, фракции и ростеры на русском',
  },
  description: {
    en: 'Bilingual (EN/RU) reference for Warhammer 40,000 11th edition: core rules, Event Companion, faction rules and unit datasheets, plus a free army list builder and an offline game tracker. Searchable, installable, free.',
    ru: 'Справочник по Warhammer 40 000 (Вархаммер) 11-й редакции на русском: основные правила, миссии и стратагемы, правила фракций и листы данных юнитов, конструктор армейских листов (ростер-билдер) и трекер очков. С поиском, офлайн, бесплатно.',
  },
}

// path → { title:{en,ru}, description:{en,ru} }. `title` here is the page-name prefix;
// the brand suffix (SITE) is appended below, except for '/' which uses DEFAULT.title.
const ROUTES = {
  // All seven chapters are one page now, so this single entry has to carry the keywords the
  // seven separate ones used to: basic rules, the battle round and its phases, terrain and
  // stratagems, advanced rules, core abilities, mustering an army. The old paths still
  // resolve — they redirect (see router/index.js) — but they render no component, so they
  // need no entry of their own.
  '/core-rules': {
    title: { en: 'Core Rules', ru: 'Основные правила' },
    description: {
      en: 'The complete core rules of Warhammer 40,000 11th edition on one page: core concepts and datasheets, moving and making attacks, the battle round and its five phases, terrain, objectives, stratagems and actions, advanced rules, core abilities and mustering your army.',
      ru: 'Полные основные правила Warhammer 40,000 (Вархаммер) 11-й редакции одной страницей: базовые концепции и листы данных, движение и атаки, раунд боя и его пять фаз, террейн, цели, стратагемы и действия, продвинутые правила, базовые способности и сбор армии.',
    },
  },
  '/stratagems': {
    title: { en: 'Stratagems', ru: 'Стратагемы' },
    description: {
      en: 'The core stratagems of Warhammer 40,000 11th edition — a quick card reference for use during a game.',
      ru: 'Базовые стратагемы Warhammer 40,000 11-й редакции — быстрый просмотр карточек во время партии.',
    },
  },
  '/rules': {
    title: { en: 'Rules', ru: 'Правила' },
    description: {
      en: 'Core Rules, Event Companion and Combat Patrol — all the rules content for Warhammer 40,000 11th edition, in one place.',
      ru: 'Основные правила, Event Companion и Combat Patrol — весь контент правил Warhammer 40,000 11-й редакции в одном месте.',
    },
  },
  '/combat-patrol': {
    title: { en: 'Combat Patrol', ru: 'Combat Patrol' },
    description: {
      en: 'Combat Patrol starter boxes for Warhammer 40,000 11th edition — detachment rule, stratagems, enhancements and datasheets for each faction\'s fixed-roster box.',
      ru: 'Стартовые наборы Combat Patrol для Warhammer 40,000 11-й редакции — правило детачмента, стратагемы, улучшения и датащиты для каждой фракции.',
    },
  },
  // All seven chapters are one page now, so this single entry has to carry the keywords the
  // seven separate ones used to: mission sequence, missions and twists, terrain and layouts,
  // pairings and rankings, teams events, errata and FAQs. The old paths still resolve — they
  // redirect (see router/index.js) — but they render no component, so they need no entry.
  '/event-companion': {
    title: { en: 'Event Companion', ru: 'Event Companion' },
    description: {
      en: 'The Warhammer 40,000 Event Companion on one page: pre-game mission sequence, all primary and secondary missions plus twists, terrain layouts and the mission matrix, pairings and rankings, running a Teams Event, and errata & FAQs for tournaments.',
      ru: 'Warhammer 40,000 Event Companion одной страницей: предбоевая последовательность миссии, все основные и вторичные миссии плюс твисты, раскладки террейна и матрица миссий, паринги и ранжирование, командные ивенты, эррата и FAQ для турниров.',
    },
  },
  '/tracker': {
    title: { en: 'Game Tracker', ru: 'Трекер игры' },
    description: {
      en: 'Free offline 2-player VP / Battle Points tracker for a game of Warhammer 40,000 11th edition — missions, secondaries and scoring.',
      ru: 'Бесплатный офлайн-трекер очков на 2 игроков для партии Warhammer 40,000 11-й редакции — миссии, вторичные задачи и подсчёт.',
    },
  },
  '/roster': {
    title: { en: 'Roster Builder', ru: 'Ростербилдер' },
    description: {
      en: 'Free army list builder for Warhammer 40,000 11th edition — pick units, wargear, leaders and enhancements, cost your list and check restrictions offline.',
      ru: 'Бесплатный конструктор армейских листов для Warhammer 40,000 11-й редакции — юниты, вооружение, лидеры и улучшения, подсчёт очков и проверка ограничений офлайн.',
    },
  },
  '/help': {
    title: { en: 'How to use this', ru: 'Как пользоваться' },
    description: {
      en: 'A short guide to WH Rules: searching the Warhammer 40,000 11th edition rules, building and importing army lists, tracking a game, working offline, and where your data is kept.',
      ru: 'Короткий гид: как искать правила Warhammer 40,000 11-й редакции, собирать и импортировать армейские листы, вести партию, работать офлайн и где хранятся ваши данные.',
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

// /combat-patrol/:slug — one page per faction's Combat Patrol box (src/data/combatPatrol.js).
const COMBAT_PATROL_RE = /^\/combat-patrol\/([^/]+)$/
export const isCombatPatrolPath = (path) => COMBAT_PATROL_RE.test(path)

// Precise unit names supplied by FactionDatasheetView (keyed by path, so a locale switch that
// re-runs applyRouteMeta keeps the real name). Faction/unit NAMES stay English in both locales
// (project convention) — only the surrounding phrasing is localized.
const unitNames = new Map()
const prettifySlug = (s) => s.split('-').map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(' ')
const factionName = (slug) => factionIndexBySlug(slug)?.name || prettifySlug(slug)

function dynamicMetaFor(path, loc) {
  let m = path.match(COMBAT_PATROL_RE)
  if (m) {
    const f = combatPatrolIndex.find((x) => x.slug === m[1])
    const name = f?.name || factionName(m[1])
    const box = f?.boxName || ''
    return loc === 'ru'
      ? { title: `${name} — Combat Patrol «${box}» — ${SITE.ru}`, description: `Combat Patrol «${box}» (${name}) для Warhammer 40,000 11-й редакции: правило детачмента, стратагемы, улучшения и датащиты стартового набора.` }
      : { title: `${name} — Combat Patrol "${box}" — ${SITE.en}`, description: `Combat Patrol "${box}" (${name}) for Warhammer 40,000 11th edition: detachment rule, stratagems, enhancements and starter-box datasheets.` }
  }
  m = path.match(DATASHEET_RE)
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
  const indexable = path === '/' || (!!ROUTES[path] && path !== '/tracker/game') || isFactionPath(path) || isCombatPatrolPath(path)
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
