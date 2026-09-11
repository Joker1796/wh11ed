// Build-time config. Vite inlines import.meta.env.VITE_* at build. Set VITE_API_BASE_URL when
// building for production (e.g. VITE_API_BASE_URL=https://api.wh-rules.ru npm run build); the
// default targets a local wh11ed-api dev server.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787'

// Canonical public origin (scheme + host, no trailing slash). The single source of truth for
// every absolute URL the site emits — per-route canonical/hreflang/og:url (useSeoMeta.js) and,
// via process.env, the sitemap (scripts/gen-seo-routes.mjs). Still overridable per build
// (VITE_SITE_ORIGIN in deploy.sh / .env.deploy) — the retired wh11ed.ru is frozen, not rebuilt.
export const SITE_ORIGIN = import.meta.env.VITE_SITE_ORIGIN || 'https://wh-rules.ru'

// The domain the "we've moved" banner points visitors to. Deliberately a fixed constant, NOT
// SITE_ORIGIN: the banner only shows on the old host, whose build self-canonicals to itself, so
// reusing SITE_ORIGIN would advertise the old domain as the "new" one.
export const MOVED_TO_ORIGIN = 'https://wh-rules.ru'
// Move-banner phase (MIGRATION.md): 'pre' = Phase 2 heads-up on the old domain ("we're moving —
// log in so your games follow, reinstall the app afterwards"), 'moved' = the post-301 variant
// ("we've moved, new address"). Off unless VITE_ANNOUNCE_MOVE is set per-build; the legacy value
// `true` maps to 'moved' so an old .env.deploy keeps working.
const announceRaw = import.meta.env.VITE_ANNOUNCE_MOVE
export const ANNOUNCE_MOVE =
  announceRaw === 'pre' ? 'pre' : announceRaw === 'moved' || announceRaw === 'true' ? 'moved' : false
