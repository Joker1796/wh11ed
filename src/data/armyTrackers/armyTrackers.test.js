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
    expect(en.effect.name).toBe('Waaagh! active')
    expect(en.effect.body).toMatch(/invulnerable save/)
    expect(en.maxUses).toBe(1)
    expect(en.againLabel).toBeNull()
  })

  it('applies the Bully Boyz detachment override for the second Waaagh!', () => {
    // The second Waaagh! is a Detachment rule (Da Boss Is Watchin'), so it's auto-detected from the
    // active detachment — the real detachment-override path in production.
    const en = localizeArmyTracker(resolveArmyTracker('orks', ['Bully Boyz']), 'en')
    expect(en.maxUses).toBe(2)
    expect(en.againLabel).toBe('Second Waaagh!')
    expect(en.note).toMatch(/Bully Boyz/)
    expect(localizeArmyTracker(resolveArmyTracker('orks', ['Bully Boyz']), 'ru').againLabel).toBe('Второй Waaagh!')
    // A different detachment leaves the base spec untouched.
    expect(localizeArmyTracker(resolveArmyTracker('orks', ['War Horde']), 'en').maxUses).toBe(1)
  })

  it('resolves the Aeldari pool spec (per-round allotment by battle size)', () => {
    const spec = resolveArmyTracker('aeldari')
    expect(spec.kind).toBe('pool')
    expect(spec.label).toBe('Battle Focus')
    expect(spec.perRound).toEqual({ incursion: 2, strikeForce: 4, onslaught: 6 })
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
