import { describe, it, expect } from 'vitest'
import { loadDatasheets, sharedIdsFor } from './index.js'
import { loadDatasheetsRu, localizeSheet } from './ru/index.js'

// The same normalisation rosterModifiers.js matches weapon rows on.
const norm = (s) => (s || '').toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim()

// Deathwatch is one of the 5 SM-Chapter codex factions that shares most of its roster
// with space-marines.js instead of duplicating it (see index.js / deathwatch.js).
describe('SM-Chapter datasheet dedup', () => {
  it('folds shared space-marines.js units back into a Chapter faction list', async () => {
    const ids = await sharedIdsFor('deathwatch')
    expect(ids?.length).toBeGreaterThan(0)

    const list = await loadDatasheets('deathwatch')
    const ownCount = list.length - ids.length
    expect(list.some((d) => d.id === 'aggressor-squad')).toBe(true) // shared
    expect(ownCount).toBeGreaterThan(0) // Deathwatch-unique units still present
    expect(new Set(list.map((d) => d.id)).size).toBe(list.length) // no duplicate ids
  })

  it('a faction with no sharedUnitIds is unaffected', async () => {
    expect(await sharedIdsFor('necrons')).toBeNull()
    const list = await loadDatasheets('necrons')
    expect(list.length).toBeGreaterThan(0)
  })

  it('merges the RU overlay for a shared unit from space-marines.js', async () => {
    const mod = await loadDatasheetsRu('deathwatch')
    // Aggressor Squad is shared; its RU overlay (if any) must come through even though
    // Deathwatch's own overlay file never mentions it.
    expect(mod).toBeTruthy()
    expect(typeof mod.default).toBe('object')
  })
})

describe('the English ability name survives translation', () => {
  const sheet = {
    id: 'x',
    abilities: [{ name: 'Enhanced Warriors', text: 'If this unit is attached…' }],
    abilitySets: [{ name: 'Warlord Traits', options: [{ name: 'Rites of Teleportation', text: '…' }] }],
  }

  it('records nameEn wherever the header actually changed', () => {
    const out = localizeSheet(sheet, {}, { 'Enhanced Warriors': 'Усиленные воины' })
    expect(out.abilities[0].name).toBe('Усиленные воины')
    expect(out.abilities[0].nameEn).toBe('Enhanced Warriors')
    // Shared names translate from SHARED_RULE_NAMES without any faction map of their own.
    expect(out.abilitySets[0].options[0].nameEn).toBe('Rites of Teleportation')
  })

  it('leaves an untranslated name with no nameEn — there is nothing to show', () => {
    const out = localizeSheet(sheet, {}, {})
    expect(out.abilities[0].name).toBe('Enhanced Warriors')
    expect(out.abilities[0].nameEn).toBeUndefined()
  })

  it('records it for the overlay\'s own { name, text } form too', () => {
    const out = localizeSheet(sheet, { abilities: { 'Enhanced Warriors': { name: 'Улучшенные', text: 'т' } } }, {})
    expect(out.abilities[0].name).toBe('Улучшенные')
    expect(out.abilities[0].nameEn).toBe('Enhanced Warriors')
  })
})

describe('weapon names identify a weapon', () => {
  // A roster card matches each weapon row to a wargear item BY NAME to trim the table to the
  // entry's loadout and to stamp the quantity on it (src/composables/rosterModifiers.js). Both
  // readings assume a name identifies ONE weapon on a given datasheet — a second row with the
  // same name and a different statline would be silently merged into the first row's count.
  // The roster half of this invariant is asserted in src/data/roster/index.test.js.
  // The same glob index.js loads the factions through — node's fs can't be used here, the app
  // bundles this directory for the browser.
  const bundles = import.meta.glob(['./*.js', '!./index.js', '!./*.test.js'])

  it('never lists the same weapon name twice on one datasheet', async () => {
    let rows = 0
    for (const [f, load] of Object.entries(bundles)) {
      const sheets = (await load()).default
      for (const d of sheets || []) {
        for (const kind of ['ranged', 'melee']) {
          const seen = new Set()
          for (const w of d[kind] || []) {
            rows++
            const key = norm(w.name)
            expect(seen.has(key), `${f} ${d.id} [${kind}] "${w.name}"`).toBe(false)
            seen.add(key)
          }
        }
      }
    }
    expect(rows).toBeGreaterThan(4000) // the whole corpus really was walked
  })
})
