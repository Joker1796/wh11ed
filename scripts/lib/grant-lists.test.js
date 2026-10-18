// The 11th-edition grant shapes both readers of "what does this rule hand out" must see — the
// modifier generator's candidate heuristic and the core-grants gate. Each wording is appdata's own,
// as bodyText() hands it over. Until 2026-10-18 every one of these was invisible to both.
import { describe, it, expect } from 'vitest'
import { flattenGrantLists } from './grant-lists.mjs'
import { isCandidate } from '../gen-roster-modifiers.mjs'
import { grantsInProse } from '../check-core-grants.mjs'

// Lords of the Forge (Adeptus Mechanicus), the player's report edb4f838.
const WAR_FORM = 'Friendly TECH-PRIEST models have:\n▪ 4+ **InSv**.\n▪ **Feel No Pain 5+**. Friendly TECH-PRIEST models have the following ability: Baffling Data Screed: In your Shooting phase, when this unit is **selected to shoot**, you can use this ability.'

describe('flattenGrantLists', () => {
  it('gives each item of a list its verb back', () => {
    expect(flattenGrantLists('Your unit has:\n▪ **Stealth**.\n▪ -3" **detection range**.'))
      .toBe('Your unit has.\nhas **Stealth**.\nhas -3" **detection range**.')
  })

  it('reads an alternative as an item', () => {
    expect(flattenGrantLists("Your unit's attacks have:\n▪ [SUSTAINED HITS 1]\n▪ __Or:__ [LETHAL HITS]."))
      .toBe("Your unit's attacks have.\nhave [SUSTAINED HITS 1]\nhave [LETHAL HITS].")
  })

  it('leaves a list under any other head alone', () => {
    const text = 'If you do:\n▪ This unit suffers 1 **mortal wound**.'
    expect(flattenGrantLists(text)).toBe(text)
  })
})

describe('the list and shorthand shapes are proposed', () => {
  it.each([
    ['a list with the InSv shorthand and a core ability', WAR_FORM],
    ['the InSv shorthand in a sentence', 'This unit has 5+ **InSv**.'],
    ['weapon abilities as a list', "Your unit's ranged attacks have:\n▪ [LETHAL HITS].\n▪ [SUSTAINED HITS 1]."],
    ['core abilities as a list', 'ADEPTUS CUSTODES model only. This model has:\n▪ **Stealth**\n▪ **Lone Operative**.'],
  ])('%s', (_, prose) => {
    expect(isCandidate(prose)).toBe(true)
  })

  it('the core-grants gate reads a core ability out of a list', () => {
    expect([...grantsInProse(WAR_FORM)]).toEqual(['feel no pain'])
    expect([...grantsInProse('This model has:\n▪ **Stealth**\n▪ **Lone Operative**.')].sort())
      .toEqual(['lone operative', 'stealth'])
  })
})
