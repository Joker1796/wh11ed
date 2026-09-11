// Generate the SEO route artifacts for history-mode routing (run AFTER `vite build`):
//
//   dist/sitemap.xml      — every indexable URL, EN (/path) and RU (/ru/path), hreflang-paired
//   dist/.seo-routes.txt  — the same paths, one per line, consumed by deploy.sh, which
//                           uploads an index.html copy under each path as its bucket key
//                           so deep links return HTTP 200 (the bucket's ErrorDocument
//                           fallback serves index.html with a 404 status — fine for
//                           users, invisible to search engines).
//
// STATIC_ROUTES mirrors the indexable routes in src/router/index.js — keep them in sync
// when adding a page (private/transient tracker routes are deliberately absent).
// Faction pages are auto-detected: when src/data/factionsIndex.js exists (the factions
// feature branch), /factions, per-faction pages and per-unit datasheet pages are
// enumerated from the data files, so this script needs no changes when factions land.

import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
// Same helper the router and useSeoMeta use — one definition of what a Russian URL looks like.
import { localePath } from '../src/router/locale.js'
// The same titles/descriptions the app sets at runtime — one source, so the crawler and the
// reader can't be shown different things (see src/composables/seoMetaData.js).
import { metaFor, isIndexablePath } from '../src/composables/seoMetaData.js'
import { renderPage, datasheetBody, datasheetsIndexBody, genericBody } from './lib/seo-html.mjs'

// path → what the page actually is, filled in while routes are enumerated. Without it the HTML
// pass would have to re-derive a unit from its slug, and a slug is not a datasheet.
const pageData = new Map()

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIST = join(ROOT, 'dist')
// Deliberately outside dist/ — see the HTML section in main().
const SEO_HTML = join(ROOT, 'seo-html')
// Mirror src/config.js's SITE_ORIGIN. This is a Node build script (no import.meta.env), so it
// reads the same VITE_SITE_ORIGIN var deploy.sh exports; default keeps parity with config.js.
const ORIGIN = process.env.VITE_SITE_ORIGIN || 'https://wh-rules.ru'

const STATIC_ROUTES = [
  '/',
  // The former per-chapter routes (Core Rules' seven, Event Companion's six) are gone
  // from the sitemap — they now redirect to an anchor on their merged page. Their keys
  // stay in the bucket (deploy never deletes keys) and keep returning 200, so old links
  // still work; they just aren't advertised any more.
  '/core-rules',
  '/event-companion',
  '/rules',
  '/tracker',
  '/roster',
  '/stratagems',
  '/links',
  '/help',
  // The guide's six topic pages (src/data/help.js) — each is a real URL since 2026-08-25.
  '/help/search',
  '/help/rules',
  '/help/rosters',
  '/help/tracker',
  '/help/offline',
  '/help/data',
  '/disclaimer',
  '/changelog',
]

// The 5 SM-Chapter codex files don't duplicate datasheets identical to space-marines.js —
// they list those ids in `sharedUnitIds` instead (see src/data/datasheets/index.js). Fold
// them back in so their per-unit SEO route keys still get generated.
let smUnits = null
async function loadSpaceMarines() {
  if (!smUnits) smUnits = (await import(pathToFileURL(join(ROOT, 'src/data/datasheets/space-marines.js')))).default
  return smUnits
}

async function factionRoutes() {
  const indexFile = join(ROOT, 'src/data/factionsIndex.js')
  if (!existsSync(indexFile)) return []
  const { factionGroups } = await import(pathToFileURL(indexFile))
  // Which factions have an FAQ/errata tab (src/data/factionFaq.json, generated from appdata).
  const faqFile = join(ROOT, 'src/data/factionFaq.json')
  const faqSlugs = existsSync(faqFile) ? new Set(Object.keys(JSON.parse(readFileSync(faqFile, 'utf8')))) : new Set()
  const routes = ['/factions']
  for (const group of factionGroups) {
    for (const f of group.factions) {
      // Same gate FactionsListView uses: only `ready` factions with a data file link through.
      if (!f.ready || !existsSync(join(ROOT, `src/data/factions/${f.slug}.js`))) continue
      routes.push(`/factions/${f.slug}`)
      if (faqSlugs.has(f.slug)) routes.push(`/factions/${f.slug}/faq`)
      const sheetsFile = join(ROOT, `src/data/datasheets/${f.slug}.js`)
      if (!existsSync(sheetsFile)) continue
      routes.push(`/factions/${f.slug}/datasheets`)
      const mod = await import(pathToFileURL(sheetsFile))
      let units = mod.default ?? []
      if (mod.sharedUnitIds?.length) {
        const idSet = new Set(mod.sharedUnitIds)
        const sm = await loadSpaceMarines()
        units = [...units, ...sm.filter((u) => idSet.has(u.id))]
      }
      // RU overlay: ability text and flavour translated, keyed by unit id. Names and keywords
      // stay English in both locales by project convention, so only these two fields move.
      const ruFile = join(ROOT, `src/data/datasheets/ru/${f.slug}.js`)
      const ru = existsSync(ruFile) ? (await import(pathToFileURL(ruFile))).default ?? {} : {}
      pageData.set(`/factions/${f.slug}/datasheets`, { kind: 'datasheets', faction: f.name, units })
      for (const u of units) {
        routes.push(`/factions/${f.slug}/datasheets/${u.id}`)
        pageData.set(`/factions/${f.slug}/datasheets/${u.id}`, {
          kind: 'datasheet', faction: f.name, unit: u, ru: ru[u.id],
        })
      }
    }
  }
  return routes
}

// Combat Patrol routes are auto-detected from src/data/combatPatrol.js the same way faction
// routes are above — this list grows on its own as Phase 3 authors more boxes, no changes
// needed here (see APPDATA-COVERAGE-PLAN.md's "Combat Patrol support" plan).
async function combatPatrolRoutes() {
  const file = join(ROOT, 'src/data/combatPatrol.js')
  if (!existsSync(file)) return []
  const { combatPatrol } = await import(pathToFileURL(file))
  return ['/combat-patrol', ...combatPatrol.en.factions.map((f) => `/combat-patrol/${f.slug}`)]
}

// Depth-based priority hint (crawlers mostly ignore it, but it costs nothing).
function priority(path) {
  if (path === '/') return '1.0'
  const depth = path.split('/').length - 1
  return depth === 1 ? '0.8' : depth === 2 ? '0.7' : depth === 3 ? '0.6' : '0.5'
}

function urlEntry(loc, path, lastmod) {
  const en = `${ORIGIN}${path}`
  const ru = `${ORIGIN}${localePath(path, 'ru')}`
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority(path)}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${en}" />
    <xhtml:link rel="alternate" hreflang="ru" href="${ru}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${en}" />
  </url>`
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('gen-seo-routes: dist/ not found — run `vite build` first')
    process.exit(1)
  }

  const routes = [...STATIC_ROUTES, ...(await factionRoutes()), ...(await combatPatrolRoutes())]
  const lastmod = new Date().toISOString().slice(0, 10)

  // Each language variant is its own sitemap entry (both carry the same hreflang pair),
  // matching the self-canonical scheme in useSeoMeta.js.
  const entries = routes.flatMap((path) => {
    const en = `${ORIGIN}${path}`
    const ru = `${ORIGIN}${localePath(path, 'ru')}`
    return [urlEntry(en, path, lastmod), urlEntry(ru, path, lastmod)]
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap)

  // robots.txt is generated (not static in public/) so its Sitemap URL tracks ORIGIN — same
  // domain as the site, otherwise search engines distrust a cross-host Sitemap directive.
  // `Clean-param: lang` is a Yandex extension (other crawlers ignore unknown directives) and it
  // cleans up after the locale move: RU lived at `?lang=ru` for the site's whole life, so ~1571
  // such URLs are already known to Yandex. They still answer 200 — the bucket keys by path and the
  // CDN ignores query strings, so there is no server-side redirect to give them, and the raw HTML
  // carries no canonical (that is set by JS, which Yandex barely runs). Left alone they stay in the
  // index as duplicates of their bare twins. This tells Yandex to drop the parameter and treat them
  // as one page. The Russian content is unaffected — it lives at /ru/… now, where no query is
  // involved. Drop this only when the old URLs are gone from the index for good.
  writeFileSync(
    join(DIST, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nClean-param: lang\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
  )

  // Every route needs its Russian twin as a bucket key too, or `/ru/rules` would fall through
  // to the ErrorDocument's 404 and the crawler we care about would never index it. `/ru` itself
  // IS a key (unlike `/`, which the bucket's IndexDocument already covers).
  const keyRoutes = [
    ...routes.filter((p) => p !== '/'),
    ...routes.map((p) => localePath(p, 'ru')),
  ]
  writeFileSync(join(DIST, '.seo-routes.txt'), keyRoutes.join('\n') + '\n')

  // --- per-route static HTML -----------------------------------------------------------------
  // Written to seo-html/, NOT dist/: vite's globPatterns precaches `**/*.html`, so generating
  // these into dist/ would drag thousands of pages into the service worker's precache and break
  // the "light tab" product requirement. deploy.sh uploads them as bucket keys instead.
  const template = readFileSync(join(DIST, 'index.html'), 'utf8')
  rmSync(SEO_HTML, { recursive: true, force: true })
  let written = 0
  for (const path of routes) {
    if (!isIndexablePath(path)) continue
    const info = pageData.get(path)
    const enUrl = `${ORIGIN}${path}`
    const ruUrl = `${ORIGIN}${localePath(path, 'ru')}`
    for (const locale of ['en', 'ru']) {
      const routePath = localePath(path, locale)
      // "/" is served by the bucket's IndexDocument, which is the same object the service worker
      // precaches as the app shell — it must stay the generic shell, so the landing page gets no
      // static body. Every other route, "/ru" included, is its own key and does.
      if (routePath === '/') continue
      const meta = metaFor(path, locale, info?.kind === 'datasheet' ? info.unit.name : undefined)
      const body =
        info?.kind === 'datasheet'
          ? datasheetBody(info.unit, info.faction, locale, locale === 'ru' ? info.ru : null)
          : info?.kind === 'datasheets'
            ? datasheetsIndexBody(info.faction, info.units, locale, localePath(path, locale))
            : genericBody(meta.title, meta.description)
      const html = renderPage(template, {
        locale, title: meta.title, description: meta.description,
        canonical: locale === 'ru' ? ruUrl : enUrl, enUrl, ruUrl, body,
      })
      // `.html` suffix, stripped again at upload: a bucket key can be both an object and a
      // directory ("/ru" is a page AND the parent of "/ru/rules"), a filesystem path cannot.
      const file = join(SEO_HTML, routePath.slice(1) + '.html')
      mkdirSync(dirname(file), { recursive: true })
      writeFileSync(file, html)
      written++
    }
  }

  console.log(`gen-seo-routes: ${routes.length} routes → sitemap.xml (${entries.length} URLs), robots.txt, .seo-routes.txt (${keyRoutes.length} keys), seo-html/ (${written} pages)`)
}

await main()
