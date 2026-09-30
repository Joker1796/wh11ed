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
