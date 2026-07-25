// Generate the SEO route artifacts for history-mode routing (run AFTER `vite build`):
//
//   dist/sitemap.xml      — every indexable URL, with EN + ?lang=ru hreflang variants
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

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { join } from 'node:path'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const DIST = join(ROOT, 'dist')
// Mirror src/config.js's SITE_ORIGIN. This is a Node build script (no import.meta.env), so it
// reads the same VITE_SITE_ORIGIN var deploy.sh exports; default keeps parity with config.js.
const ORIGIN = process.env.VITE_SITE_ORIGIN || 'https://wh11ed.ru'

const STATIC_ROUTES = [
  '/',
  '/introduction',
  '/basic-rules',
  '/battle-round',
  '/battlefields',
  '/advanced-rules',
  '/reference',
  '/muster',
  '/event-companion',
  '/event-companion/sequence',
  '/event-companion/missions',
  '/event-companion/layouts',
  '/event-companion/pairings',
  '/event-companion/teams',
  '/event-companion/faq',
  '/tracker',
  '/stratagems',
  '/links',
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
      for (const u of units) routes.push(`/factions/${f.slug}/datasheets/${u.id}`)
    }
  }
  return routes
}

// Depth-based priority hint (crawlers mostly ignore it, but it costs nothing).
function priority(path) {
  if (path === '/') return '1.0'
  const depth = path.split('/').length - 1
  return depth === 1 ? '0.8' : depth === 2 ? '0.7' : depth === 3 ? '0.6' : '0.5'
}

function urlEntry(loc, path, lastmod) {
  const en = `${ORIGIN}${path}`
  const ru = path === '/' ? `${ORIGIN}/?lang=ru` : `${en}?lang=ru`
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

  const routes = [...STATIC_ROUTES, ...(await factionRoutes())]
  const lastmod = new Date().toISOString().slice(0, 10)

  // Each language variant is its own sitemap entry (both carry the same hreflang pair),
  // matching the self-canonical scheme in useSeoMeta.js.
  const entries = routes.flatMap((path) => {
    const en = `${ORIGIN}${path}`
    const ru = path === '/' ? `${ORIGIN}/?lang=ru` : `${en}?lang=ru`
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
  writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`)

  // "/" is excluded: the bucket's IndexDocument already serves index.html at the root.
  const keyRoutes = routes.filter((p) => p !== '/')
  writeFileSync(join(DIST, '.seo-routes.txt'), keyRoutes.join('\n') + '\n')

  console.log(`gen-seo-routes: ${routes.length} routes → sitemap.xml (${entries.length} URLs), robots.txt, .seo-routes.txt (${keyRoutes.length} keys)`)
}

await main()
