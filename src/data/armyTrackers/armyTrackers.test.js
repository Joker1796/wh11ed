import { describe, it, expect } from 'vitest'
import { resolveArmyTracker, localizeArmyTracker, applyOverride } from './index.js'

describe('resolveArmyTracker', () => {
  it('returns null for a faction without a spec', () => {
    expect(resolveArmyTracker('necrons')).toBeNull()
    expect(resolveArmyTracker(null)).toBeNull()
  })

  it('resolves the Drukhari counter spec', () => {
    const spec = resolveArmyTracker('drukhari')
    expect(spec).toBeTruthy()
    expect(spec.kind).toBe('counter')
    expect(spec.label).toBe('Pain tokens')
    expect(spec.min).toBe(0)
  })

  it('tolerates arbitrary active detachments (no overrides → base spec)', () => {
    const base = resolveArmyTracker('drukhari')
    const withDet = resolveArmyTracker('drukhari', ["Realspace Raiders", "Kabal of the Black Heart"])
    expect(withDet).toEqual(base)
  })

  it('resolves the Votann counter spec with a threshold', () => {
    const spec = resolveArmyTracker('leagues-of-votann')
    expect(spec.kind).toBe('counter')
    expect(spec.threshold).toMatchObject({
      at: 7,
      below: { name: 'Hostile Acquisition' },
      atOrAbove: { name: 'Fortify Takeover' },
    })
  })

  it('resolves the AdMech selection spec with its base options', () => {
    const spec = resolveArmyTracker('adeptus-mechanicus')
    expect(spec.kind).toBe('selection')
    expect(spec.options.map((o) => o.id)).toEqual(['protector', 'conqueror'])
  })

  it('resolves the Sororitas dice-pool spec', () => {
    const spec = resolveArmyTracker('adepta-sororitas')
    expect(spec.kind).toBe('dice')
    const view = localizeArmyTracker(spec, 'en')
    expect(view.label).toBe('Miracle dice')
    expect(view.gains.length).toBeGreaterThan(0)
    expect(view.note).toMatch(/substitute/)
  })

  it('resolves the Orks toggle spec (base = once per battle)', () => {
    const en = localizeArmyTracker(resolveArmyTracker('orks'), 'en')
    expect(en.kind).toBe('toggle')
    expect(en.effect.name).toBe('War Cry called')
    expect(en.effect.body).toMatch(/riled up/)
    expect(en.maxUses).toBe(1)
    expect(en.againLabel).toBeNull()
  })

  // No Ork detachment raises the War Cry any more — Codex: Orks retired the Bully Boyz rule that
  // granted a second Waaagh!, and the card that used to be pinned here is the one example this
  // faction had. The detachment-override path itself is covered by Aeldari's Warhost below,
  // including the "a different detachment leaves the base spec alone" half.
  it('leaves the Orks spec alone whichever detachment is active', () => {
    for (const det of ['Bully Boyz', 'War Horde', 'Wurrband']) {
      expect(localizeArmyTracker(resolveArmyTracker('orks', [det]), 'en').maxUses).toBe(1)
    }
  })

  it('resolves the Aeldari pool spec (per-round allotment by battle size)', () => {
    const spec = resolveArmyTracker('aeldari')
    expect(spec.kind).toBe('pool')
    expect(spec.label).toBe('Battle Focus')
    expect(spec.perRound).toEqual({ combatPatrol: 2, incursion: 2, strikeForce: 4, onslaught: 6 })
    expect(spec.bonus).toBe(0)
  })

  it('applies the Warhost detachment override (+1 token per round)', () => {
    const base = resolveArmyTracker('aeldari')
    const warhost = resolveArmyTracker('aeldari', ['Warhost'])
    expect(warhost.bonus).toBe(1)
    // The extra reminder accumulates onto the base two; the base spec is not mutated.
    expect(warhost.gains).toHaveLength(3)
    expect(localizeArmyTracker(warhost, 'en').gains[2]).toMatch(/Warhost/)
    expect(base.gains).toHaveLength(2)
    expect(base.bonus).toBe(0)
    // A different detachment leaves the base allotment untouched.
    expect(resolveArmyTracker('aeldari', ['Windrider Host']).bonus).toBe(0)
  })

  it('resolves the Genestealer Cults counter spec with a battle-size start pool', () => {
    const spec = resolveArmyTracker('genestealer-cults')
    expect(spec.kind).toBe('counter')
    expect(spec.label).toBe('Resurgence points')
    expect(spec.start).toEqual({ combatPatrol: 2, incursion: 6, strikeForce: 10, onslaught: 14 })
    // One-tap resurrect spends: 5 unit types × 2 Starting Strengths = 10 costed buttons.
    const en = localizeArmyTracker(spec, 'en')
    expect(en.spends).toHaveLength(10)
    expect(en.spends[0]).toMatchObject({ label: 'Aberrants ×5', cost: 4 })
    // Unit-name labels are language-agnostic (English) and note localizes.
    const ru = localizeArmyTracker(spec, 'ru')
    expect(ru.spends[0].label).toBe('Aberrants ×5')
    expect(ru.note).toMatch(/Cult Ambush/)
    // Round-1 start bonus (Deeds That Speak to the Masses): a language-agnostic enhancement name,
    // rides through localization untouched like the spend labels.
    expect(en.startBonus).toEqual({ label: 'Deeds That Speak to the Masses', amount: 2 })
    expect(ru.startBonus.label).toBe('Deeds That Speak to the Masses')
  })

  it('resolves the Black Templars selection spec as a battle-long (once) pick', () => {
    const spec = resolveArmyTracker('black-templars')
    expect(spec.kind).toBe('selection')
    expect(spec.once).toBe(true)
    expect(spec.options).toHaveLength(4)
    const en = localizeArmyTracker(spec, 'en')
    const ru = localizeArmyTracker(spec, 'ru')
    // Vow names are proper names — English in both locales; the effect text is translated.
    expect(en.options[0].name).toBe('Abhor the Witch, Destroy the Witch')
    expect(ru.options[0].name).toBe('Abhor the Witch, Destroy the Witch')
    expect(en.options[0].body).not.toEqual(ru.options[0].body)
  })

  it('resolves the Death Guard once-selection with a round-gated Contagion Range readout', () => {
    const spec = resolveArmyTracker('death-guard')
    expect(spec.kind).toBe('selection')
    expect(spec.once).toBe(true)
    expect(spec.options).toHaveLength(3)
    const en = localizeArmyTracker(spec, 'en')
    const ru = localizeArmyTracker(spec, 'ru')
    // The readout label is an English game term; its note is translated. Round 1 = 3", later = 6".
    expect(en.roundReadout.label).toBe('Contagion Range')
    expect(ru.roundReadout.label).toBe('Contagion Range')
    expect(en.roundReadout.byRound[1]).toBe('3"')
    expect(en.roundReadout.fallback).toBe('6"')
    expect(en.roundReadout.note).not.toEqual(ru.roundReadout.note)
    // Plague names stay English in both locales; the effect text is translated.
    expect(ru.options[0].name).toBe('Skullsquirm Blight')
    expect(en.options[0].body).not.toEqual(ru.options[0].body)
  })

  it('resolves the World Eaters multi spec (activate up to two Blessings)', () => {
    const spec = resolveArmyTracker('world-eaters')
    expect(spec.kind).toBe('multi')
    expect(spec.max).toBe(2)
    expect(spec.options).toHaveLength(6)
    const en = localizeArmyTracker(spec, 'en')
    const ru = localizeArmyTracker(spec, 'ru')
    // Blessing names are proper names — English in both locales; the dice requirement rides in `req`.
    expect(en.options[0].name).toBe('Unbridled Bloodlust')
    expect(ru.options[0].name).toBe('Unbridled Bloodlust')
    expect(en.options[0].req).toBe('Double 1+')
    expect(en.options[5].req).toBe('Double 6')
    // Rules text is translated; the eight-dice/two-blessing note carries the mechanic.
    expect(en.options[0].body).not.toEqual(ru.options[0].body)
    expect(en.note).toMatch(/eight D6/)
    expect(ru.note).toMatch(/восемь D6/)
  })

  it('resolves the Thousand Sons multi spec (the four Rituals, keyed by Warp Charge)', () => {
    const spec = resolveArmyTracker('thousand-sons')
    expect(spec.kind).toBe('multi')
    expect(spec.max).toBe(4)
    expect(spec.options.map((o) => o.id)).toEqual(['destinys-ruin', 'temporal-surge', 'doombolt', 'twist-of-fate'])
    const en = localizeArmyTracker(spec, 'en')
    const ru = localizeArmyTracker(spec, 'ru')
    // Ritual names are proper names — English in both locales; the Warp Charge rides in `req`.
    expect(en.options[0].name).toBe("Destiny's Ruin")
    expect(ru.options[0].name).toBe("Destiny's Ruin")
    expect(en.options.map((o) => o.req)).toEqual(['WC 5', 'WC 6', 'WC 7', 'WC 9'])
    // Rules text is translated; the Psychic-test note carries the mechanic.
    expect(en.options[0].body).not.toEqual(ru.options[0].body)
    expect(en.note).toMatch(/Psychic test/)
    expect(ru.note).toMatch(/Psychic test/)
  })
})

describe('applyOverride (detachment overrides)', () => {
  it('accumulates gains and selectable options, and replaces scalars', () => {
    const base = {
      kind: 'selection',
      min: 0,
      gains: [{ en: 'a' }],
      options: [{ id: 'x' }],
    }
    const merged = applyOverride(base, {
      min: 2,
      gains: [{ en: 'b' }],
      options: [{ id: 'y' }],
    })
    expect(merged.min).toBe(2) // scalar replaced
    expect(merged.gains.map((g) => g.en)).toEqual(['a', 'b']) // accumulated
    expect(merged.options.map((o) => o.id)).toEqual(['x', 'y']) // accumulated
    expect(base.options).toHaveLength(1) // base not mutated
  })
})

describe('localizeArmyTracker', () => {
  it('returns null for a null spec', () => {
    expect(localizeArmyTracker(null, 'en')).toBeNull()
  })

  it('localizes bilingual rules text and keeps English game terms', () => {
    const spec = resolveArmyTracker('drukhari')
    const en = localizeArmyTracker(spec, 'en')
    const ru = localizeArmyTracker(spec, 'ru')

    // The resource label is an English game term — identical in both locales.
    expect(en.label).toBe('Pain tokens')
    expect(ru.label).toBe('Pain tokens')

    // Gains + note are rules text — translated per locale, and resolved to plain strings.
    expect(en.gains.every((g) => typeof g === 'string')).toBe(true)
    expect(en.gains).not.toEqual(ru.gains)
    expect(en.note).not.toEqual(ru.note)
    expect(en.gains[0]).toMatch(/Command phase/)
    expect(ru.gains[0]).toMatch(/Command phase/) // English game term kept inside RU text
  })

  it('carries the threshold (name + localized rule text) through localization', () => {
    const en = localizeArmyTracker(resolveArmyTracker('leagues-of-votann'), 'en')
    const ru = localizeArmyTracker(resolveArmyTracker('leagues-of-votann'), 'ru')
    expect(en.threshold.at).toBe(7)
    expect(en.threshold.below.name).toBe('Hostile Acquisition')
    // The ability body is rules text — resolved to a plain string and translated per locale.
    expect(typeof en.threshold.below.body).toBe('string')
    expect(en.threshold.below.body).not.toEqual(ru.threshold.below.body)
    expect(en.threshold.atOrAbove.body).toMatch(/Hit roll/)
  })
})
