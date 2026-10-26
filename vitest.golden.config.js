import { defineConfig } from 'vitest/config'
import base from './vitest.config.js'

// The golden master (golden/README.md): what the rules engine makes of every faction's units, held
// byte for byte while the core is separated from the data. Its own run — `npm run golden` — so the
// everyday suite does not pay for ~30 factions of cards. Not mergeConfig: that concatenates
// `include` and ran the whole suite beside it.
export default defineConfig({
  ...base,
  test: { ...base.test, include: ['golden/**/*.golden.js'], testTimeout: 600000 },
})
