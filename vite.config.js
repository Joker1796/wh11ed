import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
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
        name: 'Warhammer 40,000 — Core Rules 11th Edition',
        short_name: 'WH11ED',
        description:
          'Bilingual (EN/RU) interactive reference for the Warhammer 40,000 11th Edition Core Rules and Event Companion.',
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
        // Hash routing (createWebHashHistory): shortcut URLs MUST carry the `#`
        // or they resolve to home (no path-based routes exist).
        shortcuts: [
          {
            name: 'Game Tracker',
            short_name: 'Tracker',
            url: '/#/tracker',
            icons: [{ src: 'pwa-192.png', sizes: '192x192', type: 'image/png' }],
          },
          {
            name: 'Missions',
            short_name: 'Missions',
            url: '/#/event-companion/missions',
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
        // Full offline: precache the app shell, all rules data (in JS) AND every image.
        globPatterns: ['**/*.{js,css,html,svg,png,webp,woff2}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // largest webp ~0.5 MB
        cleanupOutdatedCaches: true,
        navigateFallback: '/index.html',
        // Fonts (Inter, EB Garamond) and bootstrap-icons are now self-hosted (src/fonts.js)
        // and precached via globPatterns (woff2), so no external-CDN runtimeCaching is needed.
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
