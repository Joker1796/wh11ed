import { describe, it, expect } from 'vitest'
import { dominates } from './abilityDominance.js'
import { extraCoreOf, printedCoreOf } from '../../composables/datasheetParts.js'

describe('dominates — one instance at least as good as another (24.02)', () => {
  it.each([
    ['SUSTAINED HITS 2', 'SUSTAINED HITS 1', true],
    ['SUSTAINED HITS 1', 'SUSTAINED HITS 2', false],
    ['ANTI-VEHICLE 2+', 'ANTI-VEHICLE 4+', true],
    ['ANTI-VEHICLE 4+', 'ANTI-VEHICLE 2+', false],
    ['ANTI-INFANTRY 2+', 'ANTI-MONSTER 5+', false], // different targets: a real choice
    ['Feel No Pain 5+', 'Feel No Pain 6+', true],
    ['Scouts 7"', 'Scouts 6"', true],
    ['LETHAL HITS', 'LETHAL HITS: non-MONSTER/VEHICLE', true],
    ['LETHAL HITS: non-MONSTER/VEHICLE', 'LETHAL HITS', false],
    ['LETHAL HITS: MONSTER/VEHICLE', 'LETHAL HITS: non-MONSTER/VEHICLE', false],
    ['SUSTAINED HITS D3', 'SUSTAINED HITS 1', false], // a D3 can roll 1, and 1 can roll nothing else
    ['SUSTAINED HITS 1', 'SUSTAINED HITS D3', false],
    ['Deep Strike', 'Deep Strike', true],
    ['TWIN-LINKED', 'TWIN‑LINKED', true], // U+2011
    ['Stealth', 'Deep Strike', false],
    // a reach is a set of targets
    ['LETHAL HITS: CHARACTER/MONSTER/VEHICLE', 'LETHAL HITS: MONSTER/VEHICLE', true],
    ['LETHAL HITS: MONSTER/VEHICLE', 'LETHAL HITS: VEHICLE/MONSTER', true],
    ['LETHAL HITS: non-VEHICLE', 'LETHAL HITS: non-MONSTER/VEHICLE', true],
    ['LETHAL HITS: non-MONSTER/VEHICLE', 'LETHAL HITS: non-VEHICLE', false],
    ['LETHAL HITS: non-VEHICLE', 'LETHAL HITS: INFANTRY', false], // a list and a non- list never compare
    ['SUSTAINED HITS 2: NON-MONSTER/VEHICLE', 'SUSTAINED HITS 1: non-MONSTER/VEHICLE', true],
    ['SUSTAINED HITS 1', 'SUSTAINED HITS 2: MONSTER/VEHICLE', false],
    ['ANTI-MONSTER/VEHICLE 4+', 'ANTI-VEHICLE 4+', true],
    ['ANTI-VEHICLE 2+', 'ANTI-MONSTER/VEHICLE 4+', false],
    ['ANTI-NON-MONSTER/VEHICLE 2+', 'ANTI-INFANTRY 2+', false],
    ['DEVASTATING WOUNDS', 'DEVASTATING WOUNDS: PSYKER', true],
    // a condition in brackets
    ['Feel No Pain 4+', 'Feel No Pain 5+ (vs mortal wounds)', true],
    ['Feel No Pain 4+ (vs mortal wounds)', 'Feel No Pain 5+', false],
    ['Feel No Pain 4+ (vs mortal wounds)', 'Feel No Pain 5+ (vs mortal wounds)', true],
    ['Feel No Pain 4+ (vs mortal wounds)', 'Feel No Pain 4+ (vs Psychic Attacks)', false],
    // "(vs …)" is a set of attacks, whichever order the sheet names them in
    ['Feel No Pain 5+ (vs Psychic Attacks and mortal wounds)', 'Feel No Pain 5+ (vs mortal wounds and Psychic Attacks)', true],
    ['Feel No Pain 5+ (vs mortal wounds and Psychic Attacks)', 'Feel No Pain 5+ (vs Psychic Attacks and mortal wounds)', true],
    ['Feel No Pain 5+ (vs mortal wounds and Psychic Attacks)', 'Feel No Pain 6+ (vs mortal wounds)', true],
    ['Feel No Pain 5+ (vs mortal wounds)', 'Feel No Pain 5+ (vs mortal wounds and Psychic Attacks)', false],
    ['Feel No Pain 4+ (vs mortal wounds, Psychic Attacks and [DEVASTATING WOUNDS])', 'Feel No Pain 5+ (vs Psychic Attacks)', true],
    ['Feel No Pain 5+ (vs attacks with a Damage characteristic of 1)', 'Feel No Pain 5+ (vs attacks with an unmodified Damage characteristic of 1)', false],
    ['Deadly Demise 2D6', 'Deadly Demise D6', false],
    ['Deadly Demise 2D6', 'Deadly Demise 2D6', true],
  ])('%s over %s → %s', (a, b, want) => expect(dominates(a, b)).toBe(want))
})

describe('the Core line', () => {
  const sheet = { core: 'Deep Strike, Feel No Pain 6+, Scouts 7"' }
  const g = (ability) => ({ ability, source: 'x' })
  it('drops a grant the sheet prints as well or better', () => {
    expect(extraCoreOf(sheet, [g('Scouts 6"'), g('Deep Strike'), g('Stealth')]).map((x) => x.ability)).toEqual(['Stealth'])
  })
  it('a better grant hides the printed one', () => {
    expect(extraCoreOf(sheet, [g('Feel No Pain 5+')]).map((x) => x.ability)).toEqual(['Feel No Pain 5+'])
    expect(printedCoreOf(sheet, [g('Feel No Pain 5+')])).toEqual(['Deep Strike', 'Scouts 7"'])
  })
  it('of two grants keeps the better, once', () => {
    expect(extraCoreOf({ core: '' }, [g('Feel No Pain 6+'), g('Feel No Pain 5+'), g('Feel No Pain 5+')]).map((x) => x.ability)).toEqual(['Feel No Pain 5+'])
  })
})
