// Every weapon-ability tag a reader can tap opens a text, wherever it is printed — the Core Rules,
// the Event Companion glossary, or an ability no core rule has (ownWeaponAbilities.js: a datasheet's
// own, or one a faction rule defines). 2026-10-16: [PSYCHIC ASSASSIN], [CONVERSION] and
// [PLASMA WARHEAD] in the changelog, [HARPOONED] in a faction FAQ and [SUPA-HAZARDOUS] in the Orks'
// rules looked like every other tag and opened nothing.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { lookup } from '../composables/useKeywordPopover.js'
import { coreAbilities } from './reference.js'
import { eventCompanion } from './eventCompanion.js'
import ownAbilities from './ownWeaponAbilities.js'
import { buildOwnAbilities, renderOwnAbilities } from '../../scripts/lib/own-abilities.mjs'

const DATA = import.meta.dirname
const ROOT = path.join(DATA, '../..')
const data = { coreAbilities, eventCompanion, ownAbilities }

// The inside of a tag as the renderer reads it (useRenderInline.js TAG_RE, without its private marks).
const TAG = /\[([A-Z](?:[A-Z\s\-–:0-9+/'’,]|non-)*)\]/g

function strings(v, acc = []) {
  if (typeof v === 'string') acc.push(v)
  else if (Array.isArray(v)) v.forEach((x) => strings(x, acc))
  else if (v && typeof v === 'object') Object.values(v).forEach((x) => strings(x, acc))
  return acc
}
function files(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) return files(p)
    return /\.(js|json)$/.test(e.name) && !/test|index\.js$|Index\.js$|SearchIndex/.test(e.name) ? [p] : []
  })
}

describe('own weapon abilities', () => {
  it('src/data/ownWeaponAbilities.js is up to date (npm run own-abilities)', async () => {
    const built = renderOwnAbilities(await buildOwnAbilities(ROOT))
    expect(fs.readFileSync(path.join(DATA, 'ownWeaponAbilities.js'), 'utf8')).toBe(built)
  }, 120000)

  it('each carries its text in both languages', () => {
    const missing = Object.entries(ownAbilities).flatMap(([base, vs]) => vs.filter((v) => !v.en || !v.ru).map(() => base))
    expect(missing).toEqual([])
  })

  it('every tag printed in what a reader sees opens a text, EN and RU', async () => {
    const dead = new Set()
    for (const file of files(DATA)) {
      let mod
      try {
        mod = file.endsWith('.json') ? JSON.parse(fs.readFileSync(file, 'utf8')) : await import(pathToFileURL(file).href)
      } catch { continue } // a module only Vite can load (import.meta.glob) holds no prose of its own
      for (const s of strings(mod)) {
        // A list in one pair of brackets is one pill per item, as the renderer splits it.
        for (const tag of [...s.matchAll(TAG)].flatMap((m) => m[1].split(/,\s*/))) {
          for (const loc of ['en', 'ru']) {
            if (!lookup(tag, data, loc)) dead.add(`[${tag}] ${loc} — ${path.relative(DATA, file)}`)
          }
        }
      }
    }
    expect([...dead].sort()).toEqual([])
  }, 180000)
})
