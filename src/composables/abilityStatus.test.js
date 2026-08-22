import { describe, it, expect } from 'vitest'
import { abilityPrecondition, abilityStatusOf, abilityStatusesOf } from './abilityStatus.js'

describe('abilityPrecondition', () => {
  it('reads the leader side of the clause, in its several wordings', () => {
    expect(abilityPrecondition('While this model is leading a unit, models in that unit have Feel No Pain 5+.')).toBe('leading')
    expect(abilityPrecondition('While the bearer is leading a unit, that unit can be affected by two Orders.')).toBe('leading')
    expect(abilityPrecondition('If this unit is attached to a unit at the start of the battle, add 1 to Strength.')).toBe('leading')
    expect(abilityPrecondition('If this model is leading a Kastelan Robots unit, that unit gains Lethal Hits.')).toBe('leading')
  })

  it('reads the led side, and does not mistake it for the leader side', () => {
    expect(abilityPrecondition('While a CHARACTER model is leading this unit, that model has Feel No Pain 4+.')).toBe('led')
    expect(abilityPrecondition('While **Typhus** is leading this unit, enemy models destroyed by it…')).toBe('led')
  })

  // The words alone are not the precondition — an ability that merely mentions attaching is not
  // gated on it, and a negated clause means the opposite of what a badge would say.
  it('ignores a passing mention and a negation', () => {
    expect(abilityPrecondition('If a CHARACTER unit from your army can be attached to a Skitarii Ranger unit, it can be attached to this one.')).toBeNull()
    expect(abilityPrecondition('While this model is within 3" of a Vehicle, unless it is leading a unit, repair it.')).toBeNull()
    expect(abilityPrecondition('Each time this unit ends a Normal move, it can embark.')).toBeNull()
  })
})

describe('abilityStatusOf', () => {
  const text = 'While this model is leading a unit, models in that unit have Feel No Pain 5+.'

  it('answers the leader side from the attachment the list records', () => {
    expect(abilityStatusOf(text, { leading: 'Chaos Space Marines' })).toEqual({ id: 'leading', on: true, subject: 'Chaos Space Marines' })
    expect(abilityStatusOf(text, { leading: null })).toEqual({ id: 'leading', on: false, subject: null })
  })

  // The attachment can be recorded without the target's name being resolvable (the modal is not
  // always given the leaderTargets list). It is still attached, and that is the half that matters.
  it('takes a nameless attachment as attached', () => {
    expect(abilityStatusOf(text, { leading: true })).toEqual({ id: 'leading', on: true, subject: null })
  })

  it('answers the led side from whether anyone is attached to this entry', () => {
    const led = 'While a CHARACTER model is leading this unit, that model has Feel No Pain 4+.'
    expect(abilityStatusOf(led, { led: true }).on).toBe(true)
    expect(abilityStatusOf(led, {}).on).toBe(false)
  })

  it('says nothing about an ability with no precondition', () => {
    expect(abilityStatusOf('Each time this model makes an attack, add 1 to the Hit roll.', { leading: 'X' })).toBeNull()
  })
})

describe('abilityStatusesOf', () => {
  it('keys the whole sheet by ENGLISH ability name, skipping the ungated ones', () => {
    const sheet = {
      abilities: [
        { name: 'Enhanced Warriors', text: 'If this unit is attached to a unit at the start of the battle, add 1 to Strength.' },
        { name: 'Chirurgeon', text: 'When this model is destroyed, roll one D6.' },
      ],
      abilitySets: [{ name: 'Set', options: [{ name: 'Alpha Leader', text: 'While this model is leading a unit, re-roll Hit rolls.' }] }],
    }
    expect(abilityStatusesOf(sheet, { leading: 'Chosen' })).toEqual({
      'Enhanced Warriors': { id: 'leading', on: true, subject: 'Chosen' },
      'Alpha Leader': { id: 'leading', on: true, subject: 'Chosen' },
    })
  })

  it('is empty for a sheet with nothing gated', () => {
    expect(abilityStatusesOf({ abilities: [{ name: 'A', text: 'Deep Strike.' }] }, {})).toEqual({})
  })
})
