// Writes src/data/ownWeaponAbilities.js — see scripts/lib/own-abilities.mjs.
// Usage: node scripts/gen-own-abilities.mjs [--check]
import fs from 'node:fs'
import path from 'node:path'
import { ROOT } from './lib/sync-common.mjs'
import { buildOwnAbilities, renderOwnAbilities } from './lib/own-abilities.mjs'

const file = path.join(ROOT, 'src/data/ownWeaponAbilities.js')
const map = await buildOwnAbilities(ROOT)
const text = renderOwnAbilities(map)
const n = Object.keys(map).length
if (process.argv.includes('--check')) {
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
  if (current !== text) {
    console.error(`✗ src/data/ownWeaponAbilities.js is stale — run npm run own-abilities`)
    process.exit(1)
  }
  console.log(`✓ own weapon abilities: ${n}, up to date`)
} else {
  fs.writeFileSync(file, text)
  console.log(`own weapon abilities: ${n} → src/data/ownWeaponAbilities.js`)
  for (const [base, variants] of Object.entries(map)) {
    console.log(`  ${base}: ${variants.length} text(s)${variants.some((v) => !v.ru) ? ' (no RU in some)' : ''}${variants.length > 1 ? ' — ' + variants.map((v) => (v.units || ['rule']).join('/')).join(' | ') : ''}`)
  }
}
