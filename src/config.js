// Build-time config. Vite inlines import.meta.env.VITE_* at build. Set VITE_API_BASE_URL when
// building for production (e.g. VITE_API_BASE_URL=https://api.wh11ed.ru npm run build); the
// default targets a local wh11ed-api dev server.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787'

// Canonical public origin (scheme + host, no trailing slash). The single source of truth for
// every absolute URL the site emits — per-route canonical/hreflang/og:url (useSeoMeta.js) and,
// via process.env, the sitemap (scripts/gen-seo-routes.mjs). Overridable for the wh11ed.ru →
// wh-rules.ru move: set VITE_SITE_ORIGIN at build time (deploy.sh / .env.deploy) — no code edit.
export const SITE_ORIGIN = import.meta.env.VITE_SITE_ORIGIN || 'https://wh11ed.ru'

// The domain the "we've moved" banner points visitors to. Deliberately a fixed constant, NOT
// SITE_ORIGIN: the banner only shows on the old host, whose build self-canonicals to itself, so
// reusing SITE_ORIGIN would advertise the old domain as the "new" one.
export const MOVED_TO_ORIGIN = 'https://wh-rules.ru'
// The banner stays dormant until the new domain is the place to actually send people (i.e. after
// the backend is switched so login works there). Enable per-build with VITE_ANNOUNCE_MOVE=true.
export const ANNOUNCE_MOVE = import.meta.env.VITE_ANNOUNCE_MOVE === 'true'
