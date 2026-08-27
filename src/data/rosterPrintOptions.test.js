import { describe, it, expect } from 'vitest'
import {
  PRINT_OPTIONS, normalizePrintSettings, presetOf, presetSettings, printOptionOn, printScale,
} from './rosterPrintOptions.js'

describe('roster print presets', () => {
  it('answers every row in both presets', () => {
    const missing = PRINT_OPTIONS.filter((o) => typeof o.compact !== 'boolean' || typeof o.full !== 'boolean')
    expect(missing.map((o) => o.id)).toEqual([])
  })

  // The difference between the two is the point of having two: compact is the sheet you fold into
  // a pocket, full is the booklet.
  it('keeps the long sections out of the compact one', () => {
    const compact = presetSettings('compact')
    expect(compact.unitCards).toBe(false)
    expect(compact.stratagemText).toBe(false)
    expect(compact.stratagems).toBe(true)
    expect(presetSettings('full').unitCards).toBe(true)
  })

  it("recognises the preset it produced, and calls anything else nobody's", () => {
    expect(presetOf(presetSettings('compact'))).toBe('compact')
    expect(presetOf(presetSettings('full'))).toBe('full')
    expect(presetOf({ ...presetSettings('compact'), stratagems: false })).toBe(null)
  })

  // Density is not what makes a document compact or full — squeezing the type is a separate
  // decision, and making it leave the preset would say the reader had changed the contents.
  it('does not read density as leaving the preset', () => {
    expect(presetOf({ ...presetSettings('full'), density: 'denser' })).toBe('full')
  })
})

describe('a row that hangs off another', () => {
  it('is off when its parent is off, whatever it says itself', () => {
    const on = { ...presetSettings('full'), stratagems: false, stratagemText: true }
    expect(printOptionOn(on, 'stratagemText')).toBe(false)
    expect(printOptionOn({ ...presetSettings('full') }, 'stratagemText')).toBe(true)
  })

  it('takes the whole card block down with the cards', () => {
    const s = { ...presetSettings('full'), unitCards: false }
    for (const id of ['modifiers', 'possible', 'trim', 'choices', 'pageBreak']) {
      expect(printOptionOn(s, id)).toBe(false)
    }
  })
})

describe('what was stored last time', () => {
  it('falls back to the compact answer for anything it cannot read', () => {
    expect(normalizePrintSettings(null)).toEqual(presetSettings('compact'))
    expect(normalizePrintSettings({ unitCards: 'yes' }).unitCards).toBe(false)
    expect(normalizePrintSettings({ density: 'microscopic' }).density).toBe('normal')
    expect(normalizePrintSettings({ orientation: 'diagonal' }).orientation).toBe('portrait')
  })

  it('keeps what it can', () => {
    const saved = { ...presetSettings('full'), density: 'dense', orientation: 'landscape' }
    expect(normalizePrintSettings(saved)).toEqual(saved)
    expect(printScale(saved)).toBeLessThan(1)
  })
})
