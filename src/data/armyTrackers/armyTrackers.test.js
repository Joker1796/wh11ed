import { describe, it, expect } from 'vitest'
import { resolveArmyTracker, localizeArmyTracker } from './index.js'

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
})
