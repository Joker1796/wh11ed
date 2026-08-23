import { describe, it, expect } from 'vitest'
import { ruleTargets, ruleScopes, keywordsMatchTarget, ruleAppliesTo } from './ruleTargets.js'

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

describe('ruleScopes — exclusions and the wordings that hide targets', () => {
  it('binds an exclusion to its own bullet, not to the whole rule', () => {
    // Necrons' Cold Fervour: bullet 1 targets DESTROYER CULT, bullet 2 targets every other
    // NECRONS model. Merging them would let bullet 2's exclusion cancel bullet 1's own target.
    const body = [
      '▪ Add 2 to the Strength characteristic of weapons equipped by Destroyer Cult models from your army.',
      '▪ …add 2 to the Strength characteristic of weapons equipped by friendly Necrons models (excluding Destroyer Cult, Monster and Titanic models).',
    ].join('\n')
    const scopes = ruleScopes(body)
    expect(scopes).toHaveLength(2)
    expect(scopes[0]).toEqual({ targets: ['Destroyer Cult'], excludes: [] })
    expect(scopes[1].excludes).toEqual(expect.arrayContaining(['Destroyer Cult', 'Monster', 'Titanic']))

    const nightbringer = ['Character', 'Epic Hero', 'Fly', 'Monster', 'Necrons']
    const skorpekh = ['Skorpekh Destroyers', 'Destroyer Cult', 'Infantry', 'Necrons']
    const warrior = ['Battleline', 'Necron Warriors', 'Infantry', 'Necrons']
    const faction = [nightbringer, skorpekh, warrior]
    expect(ruleAppliesTo(body, nightbringer, faction)).toBe(false) // a NECRONS MONSTER, excluded
    expect(ruleAppliesTo(body, skorpekh, faction)).toBe(true) // named by bullet 1
    expect(ruleAppliesTo(body, warrior, faction)).toBe(true) // covered by bullet 2
  })

  it('matches a plural exclusion against the singular keyword', () => {
    const body = 'Friendly Necrons models (excluding MONSTERS and VEHICLES) have the Stealth ability.'
    const monster = ['Monster', 'Necrons']
    const infantry = ['Infantry', 'Necrons']
    expect(ruleAppliesTo(body, monster, [monster, infantry])).toBe(false)
    expect(ruleAppliesTo(body, infantry, [monster, infantry])).toBe(true)
  })

  it('ignores an exclusion that names no keyword', () => {
    // "excluding Battle-shocked units" is a game state, not a keyword — it must exclude nobody.
    const body = 'Friendly Orks units (excluding Battle-shocked units) have the Scouts 6" ability.'
    const boyz = ['Infantry', 'Orks']
    expect(ruleAppliesTo(body, boyz, [boyz])).toBe(true)
  })

  it('reads a sentence-opening "Friendly …"', () => {
    // Capital F: the patterns spell [Ff]riendly rather than using the /i flag, which would also
    // make the capitalisation in the keyword pattern case-insensitive and destroy the signal.
    expect(ruleTargets('Friendly Tomb Blades units have Deep Strike.')).toEqual(['Tomb Blades'])
  })

  it('splits a slash alternation into separate targets', () => {
    expect(ruleTargets("Friendly Immortals/Necron Warriors units' ranged attacks have [ASSAULT]."))
      .toEqual(['Immortals', 'Necron Warriors'])
  })

  it('reads the list form of an alternation as well as the slash form', () => {
    // "Friendly SKITARII INFANTRY, SKITARII MOUNTED and IRONSTRIDER BALLISTARII units have Stealth"
    // used to match no keyword end to end and fall through escape 2 — the rule was shown to the
    // whole army. The comma/or/and list is as common as the slash in this corpus.
    expect(ruleTargets('Friendly Skitarii Infantry, Skitarii Mounted and Ironstrider Ballistarii units have Stealth.'))
      .toEqual(['Skitarii Infantry', 'Skitarii Mounted', 'Ironstrider Ballistarii'])
    expect(ruleTargets('While a friendly Jakhals or Goremongers unit is within 6" of this model, add 1" to the Move characteristic of models in that unit.'))
      .toEqual(['Jakhals', 'Goremongers'])
    // …and a "X, Y or Z" written mid-sentence keeps every keyword, not just the last one.
    expect(ruleTargets('While a Wraithblades, Wraithguard or Wraithlord unit from your army is within 12" of this model, that unit has the Battle Focus ability.'))
      .toEqual(['Wraithblades', 'Wraithguard', 'Wraithlord'])
  })

  it('does not let the list form swallow the sentence after the keyword', () => {
    // The separators may only extend a run that is still followed by "units"/"models", so an "and"
    // joining two clauses backtracks to the plain form rather than inventing a target.
    expect(ruleTargets('Friendly Necrons units and enemy units within 6" of them are affected.'))
      .toEqual(['Necrons'])
    // "Detachment" is game vocabulary, never a unit keyword — Blood Angels' Lost Brethren opens its
    // keyword clause with "If you select this Detachment, DEATH COMPANY MARINES and …".
    expect(ruleTargets('If you select this Detachment, Death Company Marines and Death Company Marines With Bolt Rifles units from your army have the Battleline keyword.'))
      .toEqual(['Death Company Marines', 'Death Company Marines With Bolt Rifles'])
  })

  it('reads through a parenthetical sitting before "from your army"', () => {
    const body = 'Each time a Necrons model (excluding Monster models) from your army makes an attack, add 1 to the Hit roll.'
    expect(ruleTargets(body)).toEqual(['Necrons'])
    expect(ruleScopes(body)[0].excludes).toContain('Monster')
  })

  it('matches a singular target against the plural keyword the datasheet carries', () => {
    // Rules say "Vyper units from your army"; the datasheet keyword is VYPERS.
    const vyper = ['Vypers', 'Mounted', 'Aeldari']
    expect(keywordsMatchTarget(vyper, 'Vyper')).toBe(true)
    expect(ruleAppliesTo('Vyper units from your army have the Scouts 12" ability.', vyper, [vyper])).toBe(true)
  })
})
