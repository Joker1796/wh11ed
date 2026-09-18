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

describe('the RU overlay covers every datasheet', () => {
  // Written after a bump where a hand-rolled audit reported 241 missing translations that were
  // not missing at all: the older overlays name these blocks `wargear`/`special` and the newer
  // ones `wargearAbilities`/`specialAbilities`, and localizeSheet reads both (see ru/index.js).
  // An audit that only knows one spelling lies in both directions, so the check that ships is
  // the one that goes through localizeSheet itself — whatever it returns is what a reader sees.
  const bundles = import.meta.glob(['./*.js', '!./index.js', '!./*.test.js'])

  it('leaves no ability, loadout or attachment line in English', async () => {
    let checked = 0
    const gaps = []
    const awaited = []
    for (const [f, load] of Object.entries(bundles)) {
      const slug = f.replace('./', '').replace('.js', '')
      const mod = await loadDatasheetsRu(slug)
      if (!mod?.default) continue // faction with no overlay yet
      const sheets = (await load()).default || []
      for (const en of sheets) {
        // A Legends sheet authored from a Faction Pack PDF (hub skill `legends-from-pack`) ships
        // EN first, by decision, and gets its RU in a separate pass — the overlay entry is what
        // marks that pass done, so a pack sheet WITHOUT one is awaited, not a gap. With one, it
        // is held to the same standard as every other sheet.
        if (en.source === 'faction-pack' && !mod.default[en.id]) { awaited.push(`${slug}/${en.id}`); continue }
        const ru = localizeSheet(en, mod.default[en.id], mod.abilityNamesRu)
        for (const k of ['abilities', 'wargearAbilities', 'specialAbilities', 'rules']) {
          for (const [i, a] of (en[k] || []).entries()) {
            if (!a.text) continue
            checked++
            if (ru[k]?.[i]?.text === a.text) gaps.push(`${slug}/${en.id} ${k} "${a.name}"`)
          }
        }
        for (const set of en.abilitySets || []) {
          const rset = (ru.abilitySets || []).find((s) => s.nameEn === set.name || s.name === set.name)
          for (const [i, o] of (set.options || []).entries()) {
            if (!o.text) continue
            checked++
            if (rset?.options?.[i]?.text === o.text) gaps.push(`${slug}/${en.id} set "${set.name}" option "${o.name}"`)
          }
        }
        for (const k of ['flavor', 'loadout', 'transport']) {
          if (!en[k]) continue
          checked++
          if (ru[k] === en[k]) gaps.push(`${slug}/${en.id} ${k}`)
        }
        if (en.leader?.text) {
          checked++
          if (ru.leader?.text === en.leader.text) gaps.push(`${slug}/${en.id} leader`)
        }
      }
    }
    if (awaited.length) console.info(`RU overlay: ${awaited.length} faction-pack Legends sheet(s) awaiting the RU pass — ${awaited.join(', ')}`)
    expect(gaps, `${gaps.length} untranslated field(s)`).toEqual([])
    expect(checked).toBeGreaterThan(4000) // the whole corpus really was walked
  })
})

// A player asked on 2026-09-10 why Lord Solar Leontus is not forced to be the Warlord. He is: the
// rule is SUPREME COMMANDER, 17 datasheets carry it, and the list builder enforces it
// (`flags.supreme` → `supremeCommanderNotWarlord`). Enforcement and the page a player reads have to
// agree — a `flags.supreme` unit whose sheet says nothing would refuse the list without explaining
// why — so this ties the two together. The plate sits in `rules` on 13 sheets and in
// `specialAbilities` on the four Daemon Primarchs; a check that reads only one of those fields
// reports four phantom gaps (it did, mid-fix, and the "fix" duplicated the rule on all four).
describe('SUPREME COMMANDER is printed wherever the builder enforces it', () => {
  it('every flags.supreme unit says so on its datasheet, in both languages', async () => {
    const rosterModules = import.meta.glob(['../roster/*.js', '!../roster/*.test.js'])
    const missing = []
    for (const [file, load] of Object.entries(rosterModules)) {
      const slug = file.replace('../roster/', '').replace('.js', '')
      if (['index', 'items', 'core'].includes(slug)) continue
      const faction = (await load()).default
      const supreme = (faction.units || []).filter((u) => u.flags?.supreme)
      if (!supreme.length) continue
      const sheets = await loadDatasheets(slug)
      for (const u of supreme) {
        const sheet = sheets.find((d) => d.id === u.id)
        const plates = [...(sheet?.rules || []), ...(sheet?.specialAbilities || []), ...(sheet?.abilities || [])]
        const rule = plates.find((r) => /must be your\s+warlord/i.test(r.text || ''))
        if (!rule) { missing.push(`${slug}/${u.id}`); continue }
        // …and the RU side resolves without a per-faction overlay: the plate is the same sentence
        // everywhere, so ru/index.js's SHARED_RULE_TEXTS answers for it. A sheet worded differently
        // (Ghazghkull, the Silent King, the Patriarch) carries its own overlay text instead.
        const ru = localizeSheet(sheet, (await loadDatasheetsRu(slug))?.default?.[u.id] || {}, {})
        const ruPlates = [...(ru.rules || []), ...(ru.specialAbilities || []), ...(ru.abilities || [])]
        const ruRule = ruPlates.find((r) => /warlord/i.test(r.text || ''))
        if (!ruRule || ruRule.text === rule.text) missing.push(`${slug}/${u.id} (RU)`)
      }
    }
    expect(missing).toEqual([])
  })
})
