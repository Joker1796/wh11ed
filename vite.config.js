import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

const pkgVersion = JSON.parse(readFileSync('./package.json', 'utf8')).version

// Canonical origin baked into index.html's static SEO tags (og/twitter/JSON-LD) via the
// %SITE_ORIGIN% placeholder. Same var + fallback as src/config.js and scripts/gen-seo-routes.mjs,
// so a single VITE_SITE_ORIGIN drives runtime canonical, the sitemap, robots.txt AND the static
// tags — no hand-editing index.html/robots at the domain cutover.
const SITE_ORIGIN = process.env.VITE_SITE_ORIGIN || 'https://wh-rules.ru'

// Replace the %SITE_ORIGIN% placeholder in index.html at build time. Not Vite's built-in
// %VITE_*% mechanism, so we control the fallback (a bare `npm run build` with no env still emits
// a valid absolute origin instead of an empty string).
function injectSiteOrigin() {
  return {
    name: 'site-origin',
    transformIndexHtml(html) {
      return html.replaceAll('%SITE_ORIGIN%', SITE_ORIGIN)
    },
  }
}

// Emit `image-manifest.json` (the list of every `/images/**` URL) into the build.
// Images are NOT precached anymore (they're runtime-cached, CacheFirst — see the PWA
// config below); the installed app reads this manifest to "warm" the offline cache after
// install (src/composables/useOfflineWarmup.js). Walks public/images, where files keep
// stable (non-hashed) names, so the emitted URLs match what the app requests at runtime.
function imageManifest() {
  const walk = (dir, base = '/images') => {
    const out = []
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const url = `${base}/${entry.name}`
      if (entry.isDirectory()) out.push(...walk(join(dir, entry.name), url))
      else out.push(url)
    }
    return out
  }
  return {
    name: 'image-manifest',
    apply: 'build',
    generateBundle() {
      const files = walk('public/images').sort()
      this.emitFile({ type: 'asset', fileName: 'image-manifest.json', source: JSON.stringify(files) })
    },
  }
}

export default defineConfig({
  base: '/',
  define: {
    __APP_VERSION__: JSON.stringify(pkgVersion),
  },
  plugins: [
    vue(),
    injectSiteOrigin(),
    imageManifest(),
    VitePWA({
      // 'prompt' (not 'autoUpdate'): a new version is downloaded in the background
      // but only applied when the user clicks "Update" in UpdateToast.vue — so we
      // never auto-reload mid-game in the tracker. Offline precache is unaffected.
      registerType: 'prompt',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        // Explicit `id` keeps the app identity stable across deploys even if
        // start_url ever changes (avoids duplicate installs).
        id: '/',
        name: 'Warhammer 40,000 11th Edition — Rules, Factions & Tracker',
        // Shown under the installed icon — this is the app's user-facing name. Keep it short
        // enough not to be truncated on a phone home screen (~12 chars).
        short_name: 'WH Rules',
        description:
          'Bilingual (EN/RU) interactive reference for Warhammer 40,000 11th Edition: core rules, the Event Companion, faction rules and unit datasheets, plus an offline game tracker.',
        lang: 'en',
        dir: 'ltr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        theme_color: '#242428',
        background_color: '#242428',
        categories: ['games', 'reference', 'books'],
        icons: [
          { src: 'pwa-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: 'pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        // History routing (createWebHistory): shortcut URLs are clean paths.
        shortcuts: [
          {
            name: 'Game Tracker',
            short_name: 'Tracker',
            url: '/tracker',
            icons: [{ src: 'pwa-192.png', sizes: '192x192', type: 'image/png' }],
          },
          {
            name: 'Missions',
            short_name: 'Missions',
            url: '/event-companion/missions',
            icons: [{ src: 'pwa-192.png', sizes: '192x192', type: 'image/png' }],
          },
        ],
        screenshots: [
          {
            src: 'screenshot-wide.png',
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Warhammer 40,000 11th Edition rules reference',
          },
          {
            src: 'screenshot-narrow.png',
            sizes: '720x1280',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Searchable bilingual rules on mobile',
          },
        ],
      },
      workbox: {
        // Precache ONLY the app shell (JS/CSS/HTML/SVG, self-hosted fonts, and the small
        // root PWA icons) — NOT the ~27 MB of `/images/**`. This keeps the web/tab version
        // light: a casual visitor downloads only the shell and lazily caches images as they
        // browse (runtimeCaching below). Full offline is for the INSTALLED app, reached by
        // warming the image cache after install (useOfflineWarmup.js + image-manifest.json).
        globPatterns: ['**/*.{js,css,html,svg,woff2,png}'],
        globIgnores: ['**/images/**'], // images are runtime-cached, not precached
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        cleanupOutdatedCaches: true,
        navigateFallback: '/index.html',
        // Images (stable, non-hashed names) — CacheFirst. A tab caches them on demand as the
        // user views them; the installed app's warm-up fetches all of them up front. Because
        // names are stable, a changed image must be renamed (same rule as before) or the old
        // cached copy is served. cleanupOutdatedCaches does NOT purge this cache; maxEntries
        // bounds its growth (287 image files today — keep generous headroom).
        // `wh11ed-images` keeps its legacy name ON PURPOSE: renaming it orphans the ~27 MB
        // every installed user already warmed up (nothing purges the old cache, and the new
        // one re-downloads from scratch). The cache name is data, not branding.
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/images/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'wh11ed-images',
              expiration: { maxEntries: 600, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
        },
      },
    },
  },
})
