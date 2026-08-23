// The two readers that decide what this layer ever SEES. Both live in scripts/ (not shipped), and
// both have silently swallowed real rules before — so they are pinned from here, where the records
// they produce are tested, rather than left to the next full run of the generator to reveal.
import { describe, it, expect } from 'vitest'
import { isCandidate } from '../../../scripts/gen-roster-modifiers.mjs'
import { bodyText } from '../../../scripts/lib/sync-common.mjs'

describe('bodyText', () => {
  // A trigger/effect block carries the condition in one field and the rule in the other. Reading
  // `text || trigger || effect` kept the trigger and dropped the effect, which is where the
  // modifier lives — Aeldari's "add 2\" to the Move characteristic" was in no reader's hands.
  it('keeps every text field of a block, not the first one it finds', () => {
    const body = [{ type: 'triggerEffectAccordion', title: 'Swift as the Wind', trigger: 'When an eligible unit is selected to move.', effect: 'Until the end of the phase, add 2" to the Move characteristic of models in that unit.' }]
    const out = bodyText(body)
    expect(out).toContain('When an eligible unit is selected to move.')
    expect(out).toContain('add 2" to the Move characteristic')
  })

  it('still drops the flavour blocks wh11ed stores separately', () => {
    expect(bodyText([{ type: 'loreAccordion', text: 'flavour' }, { type: 'text', text: 'rule' }])).toBe('rule')
  })
})

describe('isCandidate', () => {
  // Each of these is a wording that reached nobody until 2026-08-23: the gate is the only filter
  // between appdata and the review queue, so a rule it rejects is not "unreviewed", it is invisible.
  it.each([
    ['improve THAT unit’s, not THE', 'While a friendly NECRONS unit is within 6" of this model, improve that unit’s Leadership characteristic by 1.'],
    ['a bracket ability with any subject', 'The bearer’s Eldritch Storm weapon has the [DEVASTATING WOUNDS] ability.'],
    ['a characteristic set as "is N"', 'While this unit is not within 6" of a CHAPLAIN, its Objective Control characteristic is 0.'],
    ['a multiplied characteristic', 'Until the end of the turn, double the Objective Control characteristic of models in your unit.'],
    ['a characteristic changed to a value', 'Change the Attacks characteristic of the bearer’s killa jet – burna weapon to 3D6.'],
  ])('proposes %s', (_label, prose) => {
    expect(isCandidate(prose)).toBe(true)
  })

  it('still says no to prose that changes no printed number', () => {
    expect(isCandidate('Each time a model in this unit makes an attack, you can re-roll the Hit roll.')).toBe(false)
  })
})
