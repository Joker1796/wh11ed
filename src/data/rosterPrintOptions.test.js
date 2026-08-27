import { describe, it, expect } from 'vitest'
import {
  PRINT_OPTIONS, normalizePrintSettings, pageEdgesOf, presetOf, presetSettings, printOptionOn, printScale,
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

// The line drawn across the preview is a promise about where the printer will end the sheet, so
// the arithmetic behind it is worth testing on numbers rather than by eye on a screenshot.
describe('where the sheets end', () => {
  const PAGE = 1000

  it('says nothing about a document that fits one sheet', () => {
    expect(pageEdgesOf([], 900, PAGE)).toEqual([])
  })

  it('breaks every sheet where nothing is in the way', () => {
    expect(pageEdgesOf([], 2500, PAGE)).toEqual([1000, 2000])
  })

  // The whole point: a printer moves a block it may not cut, so the sheet ends above it.
  it('ends the sheet above a block it would have cut', () => {
    const atoms = [{ top: 950, bottom: 1100 }]
    expect(pageEdgesOf(atoms, 1600, PAGE)).toEqual([950])
  })

  // …and the sheet after it is measured from the new edge, not from where the edge would have been.
  it('measures the next sheet from the edge it moved to', () => {
    const atoms = [{ top: 900, bottom: 1100 }]
    expect(pageEdgesOf(atoms, 2500, PAGE)).toEqual([900, 1900])
  })

  // Two blocks straddling the same edge: the sheet ends above the higher one, or the lower one is
  // cut after all.
  it('clears every block straddling the same edge', () => {
    const atoms = [{ top: 980, bottom: 1050 }, { top: 940, bottom: 1020 }]
    expect(pageEdgesOf(atoms, 1600, PAGE)).toEqual([940])
  })

  // A block taller than a sheet has to be cut — the printer cuts it too — and the loop must not
  // keep pulling the edge back onto it.
  it('cuts a block that is taller than a sheet', () => {
    const atoms = [{ top: 200, bottom: 2400 }]
    expect(pageEdgesOf(atoms, 2500, PAGE)).toEqual([1000, 2000])
  })

  // Four stray pixels past a whole sheet are a rounded millimetre, not another sheet.
  it('does not invent a sheet for a rounding error', () => {
    expect(pageEdgesOf([], 1004, PAGE)).toEqual([])
    expect(pageEdgesOf([], 1200, PAGE)).toEqual([1000])
  })

  it('answers nothing when it has nothing to measure', () => {
    expect(pageEdgesOf([], 0, PAGE)).toEqual([])
    expect(pageEdgesOf([], 2000, 0)).toEqual([])
  })
})
