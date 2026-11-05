// Every war zone rule of the deck says whether it goes on a unit's card, and the keywords it asks
// for are ones the roster data prints.
import { describe, it, expect } from 'vitest'
import { dominatusEn } from './dominatus.js'
import { warZoneUnits } from './dominatusWarZoneUnits.js'
import { warZoneRulesOn } from '../core/dominatus/upgrades.js'
import { loadRosterFaction } from './roster/index.js'

const rules = dominatusEn.locations.flatMap((l) => l.warZone)

describe('war zone rules on a unit\'s card', () => {
  it('reads every rule of the deck, and nothing the deck does not have', () => {
    expect(rules).toHaveLength(19)
    expect(rules.filter((w) => !warZoneUnits[w.name]).map((w) => w.name)).toEqual([])
    const names = new Set(rules.map((w) => w.name))
    expect(Object.keys(warZoneUnits).filter((n) => !names.has(n))).toEqual([])
  })

  it.each(Object.entries(warZoneUnits))('%s says one thing', (_, e) => {
    expect([e.all, e.kws, e.warlord, e.none].filter(Boolean)).toHaveLength(1)
    if (e.none) expect(e.none.length).toBeGreaterThan(10)
  })

  it('asks only for keywords the roster data prints', async () => {
    const { units } = await loadRosterFaction('space-marines')
    const printed = new Set(units.flatMap((u) => u.kws || []))
    for (const e of Object.values(warZoneUnits)) for (const k of e.kws || []) expect(printed).toContain(k)
  })

  it('names the rules a unit\'s own keywords reach', () => {
    const on = (kws, warlord = false) => warZoneRulesOn(rules, warZoneUnits, { kws, warlord }).map((w) => w.name)
    const zone = (slug) => dominatusEn.locations.find((l) => l.slug === slug).warZone
    const of = (slug, kws, warlord = false) => warZoneRulesOn(zone(slug), warZoneUnits, { kws, warlord }).map((w) => w.name)
    expect(of('the-morpheon-line', ['Vehicle'])).toEqual(['Defence Networks'])
    expect(of('the-morpheon-line', ['Infantry'])).toEqual(['Defence Networks', 'Foxholes'])
    expect(of('blackfire-death-pits', ['Infantry'])).toEqual([])
    expect(of('blackfire-death-pits', ['BATTLELINE'])).toEqual(['Veteran Fighters'])
    expect(of('hive-acheron-subsprawl', ['Character'], true)).toEqual(['Lead from the Front'])
    expect(of('hive-acheron-subsprawl', ['Character'])).toEqual([])
    expect(on(['Fly'])).toContain('Ash Clouds')
  })
})
