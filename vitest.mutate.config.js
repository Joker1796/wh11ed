import { defineConfig } from 'vitest/config'
import base from './vitest.config.js'

// The config `npm run mutate` (scripts/mutate.mjs) runs a mutant's tests with. A mutation worker
// is a tree of symlinks with the one mutated file copied in; without this Vite follows a link back
// into the real tree, cannot find the setup file from there, and every mutant "dies" of that error —
// 2026-10-27 the first run scored 100% with a test that never calls the mutated file. Keep every
// path inside the worker. Not mergeConfig: that concatenates `setupFiles`.
const root = process.cwd()
export default defineConfig({
  ...base,
  root,
  resolve: { ...base.resolve, preserveSymlinks: true },
  test: { ...base.test, setupFiles: [`${root}/src/test-setup.js`] },
})
