import { readdirSync, readFileSync, statSync } from 'node:fs'
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

// Every `/images/**` URL, with the bytes behind it. Walks public/images, where files keep stable
// (non-hashed) names, so the emitted URLs match what the app requests at runtime.
//
// Images only: the directory carries its own CLAUDE.md, and the warm-up has been dutifully
// downloading that doc since the manifest was written.
const IMAGE_FILE = /\.(webp|png|jpe?g|gif|svg|avif|ico)$/i

function imageFiles(dir = 'public/images', base = '/images') {
  const out = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const url = `${base}/${entry.name}`
    if (entry.isDirectory()) out.push(...imageFiles(join(dir, entry.name), url))
    else if (IMAGE_FILE.test(entry.name)) out.push([url, statSync(join(dir, entry.name)).size])
  }
  return out
}

// `image-manifest.json` — the flat URL list, unchanged in shape since 2026-08.
//
// Superseded by `offline-manifest.json` below and kept for ONE release: an installed app is
// running the JS it last precached, and that code fetches this file and iterates it as an array.
// Changing its shape under a client that has not updated yet would throw inside its warm-up.
// Delete after a deploy has been out long enough that nobody is on the old shell.
function imageManifest() {
  return {
    name: 'image-manifest',
    apply: 'build',
    generateBundle() {
      const files = imageFiles().map(([url]) => url).sort()
      this.emitFile({ type: 'asset', fileName: 'image-manifest.json', source: JSON.stringify(files) })
    },
  }
}

// What the app needs to BOOT, as opposed to what it eventually uses. Filled during the build and
// read by the service worker config below, which precaches this and nothing else.
//
// It is computed from the bundle rather than from a naming convention: walk the static import
// graph out of the entry chunk (plus the CSS each chunk pulls in) and whatever it reaches is the
// shell. A rule written as a glob — "everything except assets/data/**" — would have to be kept
// true by hand every time a chunk is renamed or a heavy module moves; this cannot go stale,
// because it asks the bundler what it actually linked.
//
// Everything else — the route components, the per-faction data chunks, the font subsets — is
// runtime-cached instead (CacheFirst, safe because those names are content-hashed) and fetched up
// front only by the offline warm-up. That split is the product requirement: a browser tab pays for
// the shell, the installed app (or anyone who asks for it) pays for the rest.
const shellFiles = new Set()

// A built file's size, whichever kind of output it is — rolldown gives a chunk its `code` and an
// asset its `source`, and neither is always a string.
function byteLength(output) {
  const body = output?.type === 'chunk' ? output.code : output?.source
  if (body == null) return 0
  return typeof body === 'string' ? Buffer.byteLength(body) : body.byteLength
}

function offlineShell() {
  return {
    name: 'offline-shell',
    apply: 'build',
    generateBundle(_options, bundle) {
      shellFiles.clear()
      const visit = (fileName) => {
        const chunk = bundle[fileName]
        if (!chunk || shellFiles.has(fileName)) return
        shellFiles.add(fileName)
        // A chunk's CSS is loaded with it, so it belongs to the shell exactly when the chunk does.
        for (const css of chunk.viteMetadata?.importedCss || []) shellFiles.add(css)
        // STATIC imports only. A dynamic import is the whole point of the split — following it
        // would drag every faction bundle back into the precache.
        for (const imported of chunk.imports || []) visit(imported)
      }
      for (const [fileName, output] of Object.entries(bundle)) {
        if (output.type === 'chunk' && output.isEntry) visit(fileName)
      }

      // The other side of the same coin: everything built but NOT precached, so the warm-up knows
      // what to fetch to make the app whole offline (useOfflineWarmup.js). Emitted here rather
      // than derived at runtime because only the build knows the hashed names.
      //
      // `.woff` is left out on purpose: @fontsource ships it beside every `.woff2` for browsers
      // that predate woff2, and this app's floor is Safari 16. Nobody who can run it will ever
      // request those 84 files, and downloading ~2 MB of them is not what "make it work offline"
      // was asked for.
      const assets = Object.keys(bundle)
        .filter((f) => f.startsWith('assets/') && !shellFiles.has(f) && !f.endsWith('.woff'))
        .sort()
        .map((f) => [`/${f}`, byteLength(bundle[f])])

      // The BYTES ride along because the one thing a reader must be told before tapping
      // "download everything" is how much of their data it will spend. Nothing can work that out
      // at runtime without fetching the very files in question.
      const images = imageFiles().sort((a, b) => (a[0] < b[0] ? -1 : 1))
      const sum = (rows) => rows.reduce((n, [, bytes]) => n + bytes, 0)
      this.emitFile({
        type: 'asset',
        fileName: 'offline-manifest.json',
        source: JSON.stringify({
          assets: { files: assets.map(([u]) => u), bytes: sum(assets) },
          images: { files: images.map(([u]) => u), bytes: sum(images) },
        }),
      })
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
    offlineShell(),
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
        name: 'Warhammer 40,000 11th Edition — Rules, Rosters & Game Tracker',
        // Shown under the installed icon — this is the app's user-facing name. Keep it short
        // enough not to be truncated on a phone home screen (~12 chars).
        short_name: 'WH Rules',
        description:
          'A bilingual (EN/RU) app for playing Warhammer 40,000 11th Edition: core rules and the Event Companion, faction rules and unit datasheets, an army list builder, and a game tracker that applies your army\'s own rules. Works fully offline, no account needed.',
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
            name: 'Army Lists',
            short_name: 'Rosters',
            url: '/roster',
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
            label: 'Warhammer 40,000 11th Edition rules, rosters and game tracker',
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
        // Precache ONLY the app shell, and this time it is true. The comment here used to claim
        // as much while `globPatterns` swept in every route chunk and all thirty factions' data:
        // a browser tab installed a 15.5 MB precache to show one rule. It is ~1 MB now.
        //
        // That size was also what made an update feel slow. A new service worker only takes over
        // once its install FINISHES, and install means fetching everything in the manifest that
        // changed — and a commit touching the templates, or a bundler bump, changes every hashed
        // name at once. Shrinking the manifest is the whole fix.
        //
        // The glob still casts wide; `manifestTransforms` below is what narrows it, because the
        // shell is a fact about the import graph and not about filenames.
        globPatterns: ['**/*.{js,css,html,svg,woff2,png}'],
        globIgnores: ['**/images/**'], // images are runtime-cached, not precached
        // Keep the shell (offlineShell() above) plus the handful of root files that are not
        // chunks: the HTML the navigate fallback serves, and the icons an installed app shows
        // before any of its JS runs. Everything else drops to runtimeCaching.
        manifestTransforms: [
          (entries) => {
            const ROOT = /^(index\.html|registerSW\.js|manifest\.webmanifest|favicon\.svg|apple-touch-icon\.png|pwa-\d+\.png|maskable-\d+\.png)$/
            return { manifest: entries.filter((e) => ROOT.test(e.url) || shellFiles.has(e.url)) }
          },
        ],
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
          // Everything the shell does NOT statically need: route components, the per-faction data
          // chunks, the font subsets. CacheFirst is safe here and nowhere else in this file —
          // these names carry their own content hash, so a name that is in the cache can never be
          // out of date. `maxEntries` is what bounds the growth instead: each deploy renames the
          // chunks it changed, and the LRU drops the versions nobody asks for any more.
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/assets/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'wh-rules-assets',
              expiration: { maxEntries: 1200, maxAgeSeconds: 60 * 60 * 24 * 180 },
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
        // Vue and the router in one long-lived chunk, so a deploy that only touches app code
        // leaves it (and its precache entry) alone. Written as a FUNCTION, not the `{ vendor:
        // ['vue', 'vue-router'] }` object it used to be: Vite 8 bundles with Rolldown, which
        // accepts only the function form and fails the build outright on the object
        // ("manualChunks is not a function"). The regex has to name `@vue` as well — the object
        // form pulled in whatever was reachable only from those two entries, which is where
        // @vue/runtime-dom and friends live.
        // The id is normalised before matching rather than the separator being spelled into the
        // pattern: a module id arrives with backslashes on Windows, and a posix-only pattern is
        // exactly how `npm run radii` once ran red on one machine and green in CI on one tree.
        manualChunks(id) {
          return /\/node_modules\/(vue|vue-router|@vue)\//.test(id.replace(/\\/g, '/'))
            ? 'vendor'
            : undefined
        },
      },
    },
  },
})
