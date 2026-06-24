import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// Standalone test config — deliberately does NOT pull in vite.config.js (which loads the
// PWA plugin and a 27 MB precache that has no place in unit tests). Only the Vue SFC
// transform is needed; jsdom gives us localStorage + a DOM for store/component tests.
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.test.js'],
    setupFiles: ['./src/test-setup.js'],
    restoreMocks: true,
  },
})
