// Per-route title and description — the PURE half of the SEO metadata, with no DOM in it.
//
// Split out of useSeoMeta.js on 2026-08-26 so the build can generate the same titles it will set
// at runtime: `scripts/gen-seo-routes.mjs` imports this from Node to write a real <title> and
// <meta description> into each route's static HTML. Two copies of these strings would drift, and
// the drift would be invisible — the crawler sees one, the reader the other.
//
// Keep this file DOM-free and free of `import.meta.env` (config.js is out of bounds) so plain
// Node can import it. Absolute URLs are NOT built here: the origin is a build-time value, and
// both callers already know their own.
//
// Faction / datasheet pages (~1500 of them) aren't in the static ROUTES map — their meta is
// generated from templates below. `unitName` is optional: at runtime FactionDatasheetView pushes
// the precise name in once its datasheet loads, and the generator reads it from the data files;
// without it the slug is prettified as a fallback.
import { factionIndexBySlug } from '../data/factionsIndex.js'
import { combatPatrolIndex } from '../data/combatPatrolIndex.js'

const SITE = { en: 'Warhammer 40,000 11th Ed', ru: 'Warhammer 40,000' }

const DEFAULT = {
  title: {
    en: 'Warhammer 40,000 11th Edition — Rules, Rosters & Game Tracker',
    ru: 'Warhammer 40,000 11-я редакция — правила, ростеры и трекер партии',
  },
  description: {
    en: 'A free bilingual (EN/RU) app for playing Warhammer 40,000 11th edition: core rules and the Event Companion, faction rules and unit datasheets, an army list builder, and a game tracker that applies your army\'s own rules. Offline, no account needed.',
    ru: 'Бесплатное двуязычное (EN/RU) приложение для игры в Warhammer 40,000 11-й редакции: основные правила и Event Companion, правила фракций и листы данных юнитов, конструктор армейских листов и трекер партии, применяющий правила вашей армии. Офлайн, без аккаунта.',
  },
}

// The "/" landing page — overview of the whole project (all three sections). The main
// entry point for crawlers, so it carries the primary keywords: the brand in both
// scripts (Warhammer / Вархаммер), "11-я редакция" and "на русском" for RU queries.
const LANDING = {
  title: {
    en: 'Warhammer 40,000 11th Edition — rules, army lists and a live game tracker',
    ru: 'Warhammer 40 000 (Вархаммер) 11-я редакция на русском — правила, ростеры и трекер партии',
  },
  description: {
    en: 'Everything the table needs for Warhammer 40,000 11th edition: core rules and the Event Companion, faction rules and unit datasheets, an army list builder priced against the current MFM, and a tracker that applies your army\'s own rules while you play. Bilingual, installable, fully offline, free — and it all works without an account.',
    ru: 'Всё, что нужно за столом в Warhammer 40 000 (Вархаммер) 11-й редакции: основные правила и Event Companion, правила фракций и листы данных юнитов, конструктор ростеров по актуальному MFM и трекер партии, применяющий правила вашей армии. Двуязычно, офлайн, бесплатно — и всё работает без аккаунта.',
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
  '/factions': {
    title: { en: 'Factions', ru: 'Фракции' },
    description: {
      en: 'Every Warhammer 40,000 11th edition faction: army rules, detachments, stratagems, enhancements and the full set of unit datasheets, in English and Russian.',
      ru: 'Все фракции Warhammer 40,000 (Вархаммер) 11-й редакции: армейские правила, детачменты, стратагемы, улучшения и полный набор листов данных юнитов на русском и английском.',
    },
  },
  '/changelog': {
    title: { en: 'What\'s New', ru: 'Что нового' },
    description: {
      en: 'Release notes for the app: what changed in each version of the rules reference, the army list builder and the game tracker.',
      ru: 'История обновлений приложения: что менялось в каждой версии справочника правил, конструктора ростеров и трекера партии.',
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
  // The guide's six topics, each its own crawlable page. Kept here rather than derived from
  // help.js so the whole guide's text does not ride in the entry chunk for the sake of a title.
  '/help/search': {
    title: { en: 'Finding a rule fast', ru: 'Быстрый поиск правила' },
    description: {
      en: 'Search every Warhammer 40,000 11th edition rule at once — core rules, faction rules, stratagems and unit datasheets — and open a keyword or a rule number where you tapped it.',
      ru: 'Поиск сразу по всем правилам Warhammer 40,000 11-й редакции — основные правила, правила фракций, стратагемы и листы данных — плюс кейворды и номера правил прямо в тексте.',
    },
  },
  '/help/rules': {
    title: { en: 'Rules and factions', ru: 'Правила и фракции' },
    description: {
      en: 'What the rules section holds: all 30 Warhammer 40,000 11th edition factions in full — army rules, detachments, stratagems, enhancements and datasheets — plus the Core Rules and Event Companion.',
      ru: 'Что есть в разделе правил: все 30 фракций Warhammer 40,000 11-й редакции целиком — армейские правила, детачменты, стратагемы, улучшения и листы данных — плюс основные правила и Event Companion.',
    },
  },
  '/help/rosters': {
    title: { en: 'Building an army list', ru: 'Сборка армейского листа' },
    description: {
      en: 'How the army list builder works: units, wargear, leaders, enhancements and allies costed against the current Munitorum Field Manual, plus importing, exporting and sharing a list.',
      ru: 'Как работает конструктор ростеров: юниты, вооружение, лидеры, улучшения и союзники по актуальному Munitorum Field Manual, а также импорт, экспорт и обмен листом.',
    },
  },
  '/help/tracker': {
    title: { en: 'Tracking a game', ru: 'Ведение партии' },
    description: {
      en: 'How the game tracker works: missions and secondaries, victory and command points across the five battle rounds, game history and statistics, with your army list\'s own rules applied.',
      ru: 'Как работает трекер партии: миссии и секондари, очки победы и командные очки по пяти раундам, история игр и статистика, с применением правил вашего листа.',
    },
  },
  '/help/offline': {
    title: { en: 'Offline, and installing the app', ru: 'Офлайн и установка' },
    description: {
      en: 'A browser tab stays light; the installed app goes fully offline. How to install WH Rules on a phone, and what it downloads for a venue with no signal.',
      ru: 'Вкладка в браузере остаётся лёгкой, установленное приложение работает полностью офлайн. Как установить WH Rules на телефон и что оно скачивает для площадки без связи.',
    },
  },
  '/help/data': {
    title: { en: 'Your data, and ours', ru: 'Ваши данные и наши' },
    description: {
      en: 'Where your army lists and games are kept, what signing in changes, and why our Warhammer 40,000 points can disagree with a list built somewhere else.',
      ru: 'Где хранятся ваши листы и партии, что меняет вход в аккаунт и почему наши очки Warhammer 40,000 могут расходиться с листом, собранным в другом месте.',
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

export function pick(loc) {
  return loc === 'ru' ? 'ru' : 'en'
}

// --- Faction / datasheet pages (dynamic, template-driven) ----------------------------------
const FACTION_RE = /^\/factions\/([^/]+)$/
const DATASHEETS_RE = /^\/factions\/([^/]+)\/datasheets$/
const DATASHEET_RE = /^\/factions\/([^/]+)\/datasheets\/([^/]+)$/
const FACTION_FAQ_RE = /^\/factions\/([^/]+)\/faq$/
export const isFactionPath = (path) =>
  FACTION_RE.test(path) || DATASHEETS_RE.test(path) || DATASHEET_RE.test(path) || FACTION_FAQ_RE.test(path)

// /combat-patrol/:slug — one page per faction's Combat Patrol box (src/data/combatPatrol.js).
const COMBAT_PATROL_RE = /^\/combat-patrol\/([^/]+)$/
export const isCombatPatrolPath = (path) => COMBAT_PATROL_RE.test(path)

const prettifySlug = (s) => s.split('-').map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w)).join(' ')
const factionName = (slug) => factionIndexBySlug(slug)?.name || prettifySlug(slug)

function dynamicMetaFor(path, loc, unitName) {
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
    const unit = unitName || prettifySlug(m[2])
    return loc === 'ru'
      ? { title: `${unit} — датащит ${faction} — ${SITE.ru}`, description: `${unit} — лист данных ${faction} для Warhammer 40,000 11-й редакции: характеристики, оружие, способности, ключевые слова и очки.` }
      : { title: `${unit} — ${faction} Datasheet — ${SITE.en}`, description: `${unit} datasheet for ${faction} in Warhammer 40,000 11th edition: statline, weapons, abilities, keywords and points.` }
  }
  m = path.match(FACTION_FAQ_RE)
  if (m) {
    const faction = factionName(m[1])
    return loc === 'ru'
      ? { title: `${faction} — FAQ и errata — ${SITE.ru}`, description: `Официальные ответы на вопросы и errata по фракции ${faction} для Warhammer 40,000 11-й редакции.` }
      : { title: `${faction} — FAQ & Errata — ${SITE.en}`, description: `Official FAQs and errata for ${faction} in Warhammer 40,000 11th edition.` }
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

export function metaFor(path, loc, unitName) {
  if (path === '/') return { title: LANDING.title[loc], description: LANDING.description[loc] }
  const dyn = dynamicMetaFor(path, loc, unitName)
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

/** Does this path deserve a canonical/hreflang trio at all?
 *  Private and transient screens (a live game, a history entry, the OAuth callback) and unknown
 *  paths must NOT claim one — a canonical pointing somewhere misleading is worse than none.
 *  Shared with the build so a page's static HTML and its runtime tags agree about this. */
export function isIndexablePath(path) {
  if (path === '/') return true
  if (isFactionPath(path) || isCombatPatrolPath(path)) return true
  return !!ROUTES[path] && path !== '/tracker/game'
}
