import { describe, it, expect } from 'vitest'
import { modDelta } from './rosterModNotes.js'

describe('modDelta', () => {
  it('keeps a characteristic symbolic', () => {
    expect(modDelta({ stat: 's', op: 'add', value: 2 })).toBe('+2 S')
  })

  it('words a dice modifier through the labels, since no printed column carries it', () => {
    const ru = { modToHit: 'к попаданию', modToWound: 'к ранению' }
    expect(modDelta({ stat: 'hit', op: 'add', value: 1, roll: true }, ru)).toBe('+1 к попаданию')
    expect(modDelta({ stat: 'wound', op: 'add', value: -1, roll: true }, ru)).toBe('−1 к ранению')
  })
})

describe('modDelta on an incoming attack', () => {
  const en = { modToHit: 'to Hit', modToWound: 'to Wound', modIncoming: 'Attacks against this unit', modIncomingMelee: 'Melee attacks against this unit', modApWorse: 'AP worse by {n}', modDHalved: 'D halved' }
  const ru = { modToWound: 'к ранению', modIncoming: 'Атаки по этому отряду', modApWorse: 'AP хуже на {n}', modDHalved: 'D вдвое меньше' }
  it('says whose number it is', () => {
    expect(modDelta({ incoming: true, stat: 'wound', op: 'add', value: -1 }, en)).toBe('Attacks against this unit: −1 to Wound')
    expect(modDelta({ incoming: true, stat: 'wound', op: 'add', value: -1 }, ru)).toBe('Атаки по этому отряду: −1 к ранению')
    expect(modDelta({ incoming: true, stat: 'hit', op: 'add', value: -1, vs: 'melee' }, en)).toBe('Melee attacks against this unit: −1 to Hit')
    expect(modDelta({ incoming: true, stat: 'ap', op: 'add', value: 1 }, ru)).toBe('Атаки по этому отряду: AP хуже на 1')
    expect(modDelta({ incoming: true, stat: 'd', op: 'add', value: -1 }, en)).toBe('Attacks against this unit: −1 D')
    expect(modDelta({ incoming: true, stat: 'd', op: 'set', value: 1 }, en)).toBe('Attacks against this unit: D = 1')
    expect(modDelta({ incoming: true, stat: 'd', op: 'mul', value: 0.5 }, ru)).toBe('Атаки по этому отряду: D вдвое меньше')
  })
})
