import { readdirSync } from 'node:fs'
import { localizeSheet } from '../../src/data/datasheets/ru/localize.js'
import { deepOverlay } from '../../src/data/deepOverlay.js'
import { plain } from './ru-reroll-wording.mjs'

const root = new URL('../../src/data/', import.meta.url)
const load = path => import(new URL(path, root).href)
const files = dir => readdirSync(new URL(dir, root)).filter(f => f.endsWith('.js') && !f.endsWith('.test.js') && f !== 'index.js')

// Read authored data, not generated search copies. Shared Chapter sheets are read once
// in their owning file. localizeSheet and deepOverlay are the app's actual RU render inputs.
export async function rerollPairs() {
  const rows = []
  function walk(en, ru, path) {
    if (typeof en === 'string') {
      if (/re-?roll/i.test(plain(en))) rows.push({ path, en, ru })
      return
    }
    if (en && typeof en === 'object') for (const [k, v] of Object.entries(en)) walk(v, ru?.[k], `${path}/${k}`)
  }
  function bilingual(v, path) {
    if (!v || typeof v !== 'object') return
    if (v.en !== undefined && v.ru !== undefined) { walk(v.en, v.ru, path); return }
    for (const [k, x] of Object.entries(v)) bilingual(x, `${path}/${k}`)
  }
  for (const f of files('datasheets/')) {
    const en = (await load(`datasheets/${f}`)).default
    const ru = await load(`datasheets/ru/${f}`)
    for (const sheet of en) walk(sheet, localizeSheet(sheet, ru.default[sheet.id], ru.abilityNamesRu), `datasheets/${f}/${sheet.id}`)
  }
  for (const f of files('factions/ru/')) {
    const en = Object.values(await load(`factions/${f}`)).find(v => v?.en)?.en
    if (!en) throw new Error(`Missing faction EN tree: ${f}`)
    const ru = (await load(`factions/ru/${f}`)).default
    walk(en, deepOverlay(en, ru), `factions/${f}`)
  }
  for (const f of ['basicRules.js', 'advancedRules.js', 'reference.js', 'battleRound.js', 'battlefields.js', 'glossary.js', 'combatPatrol.js', 'missions.js', 'combatPatrolMissions.js']) bilingual(await load(f), f)
  const { getDominatus } = await load('dominatus.js')
  walk(getDominatus('en'), getDominatus('ru'), 'dominatus.js')
  for (const dir of ['armyTrackers/', 'factions/extras/']) for (const f of files(dir)) bilingual(await load(dir + f), dir + f)
  return rows
}
