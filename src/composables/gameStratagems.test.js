import { describe, it, expect } from 'vitest'
import { battlefields } from '../data/battlefields.js'
import { usageLimits } from './gameStratagems.js'

// The usage limits the CP tab enforces, read from the stratagems' own English restrictions.
describe('usageLimits', () => {
  it('reads the core stratagems\' two limits', () => {
    const core = Object.fromEntries(battlefields.en.find((s) => s.id === '15').stratagems.map((s) => [s.name, usageLimits(s.restrictions)]))
    expect(core['Insane Bravery']).toEqual({ perBattle: true })
    expect(core['Rapid Ingress']).toEqual({ minRound: 2 })
    expect(core['Command Re-roll']).toEqual({})
  })

  it('tells a limit on the stratagem from a limit on its target', () => {
    expect(usageLimits('You can only use this Stratagem once per battle round.')).toEqual({ perRound: true })
    expect(usageLimits('You cannot use this Stratagem more than once per battle.')).toEqual({ perBattle: true })
    expect(usageLimits('You can only use this Stratagem once per turn.')).toEqual({ perTurn: true })
    expect(usageLimits('You cannot use this Stratagem during the first or second battle rounds.')).toEqual({ minRound: 3 })
    // A target the tracker does not know: left to the players.
    expect(usageLimits('You cannot use this Stratagem on the same VEHICLE model more than once per battle.')).toEqual({})
    expect(usageLimits('Each model can only be targeted with this Stratagem once per battle.')).toEqual({})
  })

  // The gate: every restriction in the faction data that SPEAKS of using the stratagem once
  // per battle / round / turn, or of the first rounds, is understood — a new phrasing fails here
  // instead of silently letting a limited stratagem be spent again.
  it('understands every "use this Stratagem" limit in the faction data', async () => {
    const files = import.meta.glob(['../data/factions/*.js', '!../data/factions/index.js'])
    const missed = []
    let limited = 0
    for (const [f, load] of Object.entries(files)) {
      const m = await load()
      const data = Object.values(m).find((v) => v?.en?.detachments)
      for (const d of data?.en.detachments || []) {
        for (const s of d.stratagems || []) {
          const r = String(s.restrictions || '')
          const speaks = /use this stratagem (?:once|more than once) per|use this stratagem during the first/i.test(r)
          if (!speaks) continue
          if (Object.keys(usageLimits(r)).length) limited++
          else missed.push(`${f} ${s.name}: ${r}`)
        }
      }
    }
    expect(missed).toEqual([])
    expect(limited).toBeGreaterThan(10)
  })
})
