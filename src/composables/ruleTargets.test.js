import { describe, it, expect } from 'vitest'
import { ruleTargets, keywordsMatchTarget, ruleAppliesTo } from './ruleTargets.js'

describe('ruleTargets', () => {
  it('reads the target out of the ordinary "X units from your army" wording', () => {
    expect(ruleTargets('Speed Freeks units from your army are eligible to shoot after Advancing.'))
      .toEqual(['Speed Freeks'])
  })

  it('reads a "friendly X model" wording', () => {
    expect(ruleTargets('While a friendly Beast Snagga unit is within 6", add 1 to the roll.'))
      .toEqual(['Beast Snagga'])
  })

  it('collects several targets named in one passage', () => {
    expect(ruleTargets('Each time a Mek, Orks Walker or Grots Vehicle unit from your army is selected to shoot, roll one D6.'))
      .toEqual(expect.arrayContaining(['Grots Vehicle']))
  })

  it('does not gate a rule that never mentions your own units', () => {
    expect(ruleTargets('At the start of your Command phase, select one objective marker.')).toBeNull()
  })

  it('does not gate when a passage talks about your units without naming a keyword', () => {
    // Escape 2 — "Units from your army with this ability" names no keyword, so the rule is not
    // understood end to end and must not be gated on whatever the other passages happen to name.
    const body = 'Units from your army with this ability are eligible to charge after Advancing.\n\nADD: Boyz units from your army gain +1 Strength.'
    expect(ruleTargets(body)).toBeNull()
  })

  it('does not gate a multi-part rule where only one part names a keyword', () => {
    // The Aeldari Battle Focus shape: five triggers, one of which happens to say VEHICLE.
    const body = [
      '### Fire and Fade', 'TRIGGER: When a unit from your army is selected to shoot.',
      '', '### Star Engines', 'TRIGGER: When an eligible VEHICLE unit from your army makes an Advance move.',
    ].join('\n')
    expect(ruleTargets(body)).toBeNull()
  })

  it('ignores the bold markers the faction files wrap keywords in', () => {
    expect(ruleTargets('**ADEPTA SORORITAS** units from your army have the Stealth ability.'))
      .toEqual(['ADEPTA SORORITAS'])
  })

  it('drops sentence-opening and game-vocabulary words that are not keywords', () => {
    expect(ruleTargets('Each Boyz unit from your army counts as two units.')).toEqual(['Boyz'])
  })
})

describe('keywordsMatchTarget', () => {
  const custodian = ['Infantry', 'Terminator', 'Character', 'Adeptus Custodes', 'Imperium']

  it('matches a single-keyword target', () => {
    expect(keywordsMatchTarget(custodian, 'Terminator')).toBe(true)
    expect(keywordsMatchTarget(custodian, 'Vehicle')).toBe(false)
  })

  it('covers a multi-keyword run written as one phrase', () => {
    // "ADEPTUS CUSTODES TERMINATOR" is the faction keyword AND the Terminator keyword, not a
    // single three-word keyword — the naive per-word check fails this and hid 42 real rules.
    expect(keywordsMatchTarget(custodian, 'Adeptus Custodes Terminator')).toBe(true)
    expect(keywordsMatchTarget(custodian, 'Adeptus Custodes Vehicle')).toBe(false)
  })

  it('is case- and apostrophe-insensitive', () => {
    expect(keywordsMatchTarget(['T’au Empire', 'Battlesuit'], "T'AU EMPIRE BATTLESUIT")).toBe(true)
  })

  it('rejects an empty target rather than matching everything', () => {
    expect(keywordsMatchTarget(custodian, '')).toBe(false)
  })
})

describe('ruleAppliesTo', () => {
  const body = 'Speed Freeks units from your army are eligible to shoot after Advancing.'
  const speedFreek = ['Speed Freeks', 'Vehicle', 'Orks']
  const boyz = ['Infantry', 'Battleline', 'Orks']
  const faction = [speedFreek, boyz]

  it('shows a rule to the unit it names and hides it from the one it does not', () => {
    expect(ruleAppliesTo(body, speedFreek, faction)).toBe(true)
    expect(ruleAppliesTo(body, boyz, faction)).toBe(false)
  })

  it('shows an ungated rule to everyone', () => {
    expect(ruleAppliesTo('At the start of the battle round, gain 1CP.', boyz, faction)).toBe(true)
  })

  it('shows the rule to everyone when its target matches no unit in the faction', () => {
    // Escape 3 — the faction files say "Votann units" where the datasheets carry LEAGUES OF
    // VOTANN; 14 of 196 gated rules are like this and every one of them must fail open.
    const stale = 'Votann units from your army have the Feel No Pain 6+ ability.'
    expect(ruleAppliesTo(stale, boyz, faction)).toBe(true)
    expect(ruleAppliesTo(stale, speedFreek, faction)).toBe(true)
  })

  it('still gates without the faction list, just with one escape fewer', () => {
    expect(ruleAppliesTo(body, boyz)).toBe(false)
  })
})
