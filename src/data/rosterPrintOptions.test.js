import { describe, it, expect } from 'vitest'
import {
  PRINT_OPTIONS, normalizePrintSettings, paginatePrint, presetOf, presetSettings, printOptionOn, printScale,
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

// The pages the preview draws are a promise about what the printer will put on each sheet, so
// the dealing arithmetic is worth testing on numbers rather than by eye on a screenshot.
describe('dealing the document onto pages', () => {
  const PAGE = 1000
  // A stack of same-block units, `h` tall each, packed head to tail.
  const stack = (n, h, extra = {}) => Array.from({ length: n }, (_, i) => ({
    block: 'b', index: i, top: i * h, bottom: (i + 1) * h, ...extra,
  }))
  const flat = (pages) => pages.map((p) => p.fragments)

  it('deals one page when everything fits', () => {
    const pages = paginatePrint(stack(4, 200), PAGE)
    expect(flat(pages)).toEqual([[{ block: 'b', from: 0, to: 4 }]])
  })

  it('starts the next page with the unit that did not fit', () => {
    // 3 × 400: two fit, the third crosses 1000 — it opens page two whole.
    const pages = paginatePrint(stack(3, 400), PAGE)
    expect(flat(pages)).toEqual([
      [{ block: 'b', from: 0, to: 2 }],
      [{ block: 'b', from: 2, to: 3 }],
    ])
  })

  // …and measures the second page from that unit's own top: 400-tall units restart the budget.
  it('measures every page from its first unit', () => {
    const pages = paginatePrint(stack(7, 400), PAGE)
    expect(flat(pages).map((f) => f[0])).toEqual([
      { block: 'b', from: 0, to: 2 },
      { block: 'b', from: 2, to: 4 },
      { block: 'b', from: 4, to: 6 },
      { block: 'b', from: 6, to: 7 },
    ])
  })

  // A heading never ends a page: it moves forward with the unit it heads — and a heading over
  // that heading follows too.
  it('takes a heading with it onto the next page', () => {
    const units = [
      { block: 'a', index: 0, top: 0, bottom: 700 },
      { block: 'b', index: 0, top: 700, bottom: 750, keepWithNext: true },
      { block: 'b', index: 1, top: 750, bottom: 800, keepWithNext: true },
      { block: 'b', index: 2, top: 800, bottom: 1400 },
    ]
    const pages = paginatePrint(units, PAGE)
    expect(flat(pages)).toEqual([
      [{ block: 'a', from: 0, to: 1 }],
      [{ block: 'b', from: 0, to: 3 }],
    ])
  })

  // The per-card page-break option: the unit opens a fresh page — but its own heading, pulled
  // forward to accompany it, does not count as a page it has to leave.
  it('honours break-before without orphaning the heading above it', () => {
    const units = [
      { block: 'h', index: 0, top: 0, bottom: 40, keepWithNext: true },
      { block: 'c', index: 0, top: 40, bottom: 300, breakBefore: true },
      { block: 'c', index: 1, top: 300, bottom: 560, breakBefore: true },
    ]
    const pages = paginatePrint(units, PAGE)
    expect(flat(pages)).toEqual([
      [{ block: 'h', from: 0, to: 1 }, { block: 'c', from: 0, to: 1 }],
      [{ block: 'c', from: 1, to: 2 }],
    ])
  })

  // A table that runs onto a second page repeats its header there, and those pixels are not in
  // the measured flow — the continuation page holds one row fewer than the arithmetic without
  // the overhead would say.
  it('charges a continued block its overhead', () => {
    const pages = paginatePrint(stack(15, 100), PAGE, { overheads: { b: 150 } })
    expect(flat(pages)).toEqual([
      [{ block: 'b', from: 0, to: 10 }],
      [{ block: 'b', from: 10, to: 15 }],
    ])
    const tight = paginatePrint(stack(22, 100), PAGE, { overheads: { b: 150 } })
    // Page two starts at unit 10 (top 1000) with 150 of header on top: only 8 of the next rows
    // fit (150 + 800 ≤ 1000), not 10.
    expect(flat(tight)[1]).toEqual([{ block: 'b', from: 10, to: 18 }])
  })

  // A unit taller than a sheet gets a page of its own, flagged, and the walk moves on — text is
  // the printer's to run over two sheets, never this function's to clip.
  it('gives an overtall unit a page of its own and says so', () => {
    const units = [
      { block: 'b', index: 0, top: 0, bottom: 200 },
      { block: 'b', index: 1, top: 200, bottom: 1600 },
      { block: 'b', index: 2, top: 1600, bottom: 1700 },
    ]
    const pages = paginatePrint(units, PAGE)
    expect(pages.map((p) => p.spill)).toEqual([false, true, false])
    expect(flat(pages)[1]).toEqual([{ block: 'b', from: 1, to: 2 }])
  })

  it('answers nothing when it has nothing to deal', () => {
    expect(paginatePrint([], PAGE)).toEqual([])
    expect(paginatePrint(stack(3, 100), 0)).toEqual([])
  })
})
