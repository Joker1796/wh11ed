// Every war zone rule of the deck has its phases read by hand, in the reminder's shape — and where
// the rule's own words name a phase, the reading keeps it (owner, 2026-11-04: 16 of 19 rules never
// reached the phase reminder, read only from their words).
import { describe, it, expect } from 'vitest'
import { dominatusEn } from './dominatus.js'
import { warZonePhases } from './dominatusWarZonePhases.js'
import { BATTLE_PHASES, phaseEntryOf } from '../core/rules/stratagemPhases.js'

const rules = dominatusEn.locations.flatMap((l) => l.warZone.map((w) => ({ ...w, loc: l.slug })))

describe('war zone rules in the phase reminder', () => {
  it('reads every rule of the deck, and nothing the deck does not have', () => {
    expect(rules).toHaveLength(19)
    expect(rules.filter((w) => !warZonePhases[w.name]).map((w) => w.name)).toEqual([])
    const names = new Set(rules.map((w) => w.name))
    expect(Object.keys(warZonePhases).filter((n) => !names.has(n))).toEqual([])
  })

  it.each(Object.entries(warZonePhases))('%s is in the reminder\'s shape', (name, e) => {
    const kinds = [e.p ? 'p' : null, e.at ? 'at' : null, e.none ? 'none' : null].filter(Boolean)
    expect(kinds).toHaveLength(1)
    if (e.at) expect(e.at).toBe('round-end')
    if (e.none) expect(e.none.length).toBeGreaterThan(20)
    if (!e.p) return
    expect(e.p.length).toBeGreaterThan(0)
    for (const ph of e.p) {
      expect(BATTLE_PHASES).toContain(ph)
      expect(['own', 'opp', 'both']).toContain(e.s?.[ph])
    }
    expect(Object.keys(e.s)).toEqual(e.p)
    for (const [ph, m] of Object.entries(e.m || {})) {
      expect(e.p).toContain(ph)
      expect(['start', 'end']).toContain(m)
    }
  })

  it('keeps the phase a rule\'s own words name', () => {
    const read = rules.map((w) => ({ w, e: phaseEntryOf(w.name, w.body) })).filter((x) => x.e)
    expect(read.length).toBeGreaterThan(0)
    for (const { w, e } of read) {
      const mine = warZonePhases[w.name]
      for (const ph of e.p) {
        expect(mine.p, w.name).toContain(ph)
        if (e.m?.[ph]) expect(mine.m?.[ph], w.name).toBe(e.m[ph])
      }
    }
  })

  it('a rule of the end of the round is one the words say so of', () => {
    for (const [name, e] of Object.entries(warZonePhases)) {
      if (e.at === 'round-end') expect(rules.find((w) => w.name === name).body, name).toMatch(/end of the battle round/i)
    }
  })
})
