import { describe, it, expect } from 'vitest'
import { phasesOf, phaseSidesOf, usableInSlot, BATTLE_PHASES } from './stratagemPhases.js'

// The timing line is the only place GW says WHEN a stratagem may be used, and it always names the
// phase — and, when it matters, whose it is. These are real wordings out of src/data/factions.
describe('phaseSidesOf', () => {
  it('reads the possessive that sits in front of the phase', () => {
    expect(phaseSidesOf('In your Shooting phase.')).toEqual({ shooting: 'own' })
    expect(phaseSidesOf("End of your opponent's Charge phase.")).toEqual({ charge: 'opp' })
    expect(phaseSidesOf('End of your opponent’s Charge phase.')).toEqual({ charge: 'opp' })
  })

  it('treats a phase named without an owner as both turns — "the Fight phase" is', () => {
    expect(phaseSidesOf('Fight phase.')).toEqual({ fight: 'both' })
    expect(phaseSidesOf('Your Shooting phase or the Fight phase.'))
      .toEqual({ shooting: 'own', fight: 'both' })
  })

  it('widens to both when the same phase is named for each side', () => {
    expect(phaseSidesOf("Your Command phase or your opponent's Command phase."))
      .toEqual({ command: 'both' })
  })

  it('has nothing to say about "any phase" — that is phasesOf\'s answer', () => {
    expect(phaseSidesOf('Any phase, just after your opponent uses a Stratagem.')).toEqual({})
    expect(phasesOf('Any phase, just after your opponent uses a Stratagem.')).toEqual(['any'])
  })
})

describe('usableInSlot', () => {
  const own = [['shooting'], { shooting: 'own' }]
  it('offers an own-turn stratagem only on your own turn', () => {
    expect(usableInSlot(...own, 'shooting', true)).toBe(true)
    expect(usableInSlot(...own, 'shooting', false)).toBe(false)
  })

  it('offers an opponent-turn one only on theirs', () => {
    expect(usableInSlot(['charge'], { charge: 'opp' }, 'charge', false)).toBe(true)
    expect(usableInSlot(['charge'], { charge: 'opp' }, 'charge', true)).toBe(false)
  })

  it('offers an ownerless phase in both turns', () => {
    expect(usableInSlot(['fight'], { fight: 'both' }, 'fight', true)).toBe(true)
    expect(usableInSlot(['fight'], { fight: 'both' }, 'fight', false)).toBe(true)
  })

  it('never hides one whose timing it could not read', () => {
    for (const p of BATTLE_PHASES) {
      expect(usableInSlot(['any'], {}, p, true)).toBe(true)
      expect(usableInSlot([], {}, p, false)).toBe(true)
      expect(usableInSlot(undefined, undefined, p, false)).toBe(true)
    }
  })

  it('hides one whose phase simply is not the one being played', () => {
    expect(usableInSlot(['shooting'], { shooting: 'own' }, 'fight', true)).toBe(false)
  })
})
