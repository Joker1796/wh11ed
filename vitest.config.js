import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// Standalone test config — deliberately does NOT pull in vite.config.js (which loads the
// PWA plugin and a 27 MB precache that has no place in unit tests). Only the Vue SFC
// transform is needed; jsdom gives us localStorage + a DOM for store/component tests.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // Without a dev server, plugin-vue compiles absolute template URLs (`src="/images/…"`)
    // into imports; point them at public/ so vitest can resolve them (on Windows the bare
    // `file:///images/…` URL is invalid and crashes the suite at import time).
    alias: [{ find: /^\/images\//, replacement: fileURLToPath(new URL('./public/images/', import.meta.url)) }],
  },
  // Injected by vite.config.js in a real build; components read it for the footer / export header.
  define: { __APP_VERSION__: JSON.stringify('0.0.0-test') },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.js'],
    setupFiles: ['./src/test-setup.js'],
    restoreMocks: true,
  },
})
