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
import { SITE_ORIGIN } from '../config.js'
import { metaFor, pick, isIndexablePath } from './seoMetaData.js'
import { localePath, stripLocale } from '../router/locale.js'

const ORIGIN = SITE_ORIGIN

// Precise unit names supplied by FactionDatasheetView (keyed by path, so a locale switch that
// re-runs applyRouteMeta keeps the real name). Faction/unit NAMES stay English in both locales
// (project convention) — only the surrounding phrasing is localized.
const unitNames = new Map()

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
// self-canonical (EN = /path, RU = /ru/path) with hreflang pointing at its
// sibling — canonicalizing RU onto EN would deindex the RU pages. Non-indexable paths
// (tracker game/history/auth-callback, unknown → NotFoundView with its noindex) get the
// canonical trio removed instead of pointing somewhere misleading.
function applyCanonical(path, loc) {
  const indexable = isIndexablePath(path)
  if (!indexable) {
    removeCanonicalTags()
    return
  }
  const enUrl = `${ORIGIN}${path}`
  const ruUrl = `${ORIGIN}${localePath(path, 'ru')}`
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
export function setDatasheetName(rawPath, name) {
  const path = stripLocale(rawPath)
  if (!name || unitNames.get(path) === name) return
  unitNames.set(path, name)
  if (path === _lastPath) applyRouteMeta(_lastPath, _lastLocale)
}

/** Set document.title, <meta name="description"> and the canonical/og:url/hreflang trio
 *  for the given route + locale. */
// `rawPath` may carry the `/ru` prefix; everything below is keyed on the bare path, so the two
// language variants of a page share one entry in ROUTES rather than needing one each.
export function applyRouteMeta(rawPath, locale) {
  if (typeof document === 'undefined') return
  const path = stripLocale(rawPath)
  const loc = pick(locale)
  _lastPath = path
  _lastLocale = locale
  const { title, description } = metaFor(path, loc, unitNames.get(path))
  document.title = title
  upsertMeta('meta[name="description"]', () => {
    const el = document.createElement('meta')
    el.setAttribute('name', 'description')
    return el
  }, description)
  applyCanonical(path, loc)
}
