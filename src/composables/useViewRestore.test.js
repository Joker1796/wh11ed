import { afterEach, describe, it, expect } from 'vitest'
import { currentSectionId } from './useViewRestore.js'

// Build a column of section elements and fix each one's viewport `top` (jsdom has no
// layout, so getBoundingClientRect is stubbed per element).
function mountSections(specs) {
  document.body.innerHTML = ''
  for (const { id, top, height = 50 } of specs) {
    const el = document.createElement('div')
    el.id = id
    // height 0 simulates a display:none anchor (jsdom has no layout); collapsed-accordion
    // inner h4s report a 0×0 rect at top 0.
    el.getBoundingClientRect = () => ({ top, bottom: top + height, left: 0, right: 0, width: height ? 100 : 0, height })
    document.body.appendChild(el)
  }
}

afterEach(() => { document.body.innerHTML = '' })

describe('currentSectionId (scroll-spy)', () => {
  it('returns the last section whose top is at/above the header line', () => {
    mountSections([
      { id: 'section-01', top: -400 },
      { id: 'section-02', top: -120 },
      { id: 'section-03', top: 60 },   // last one above the 110 line
      { id: 'section-04', top: 600 },
    ])
    expect(currentSectionId()).toBe('section-03')
  })

  it('returns null when scrolled above the first section', () => {
    mountSections([
      { id: 'section-01', top: 300 },
      { id: 'section-02', top: 800 },
    ])
    expect(currentSectionId()).toBeNull()
  })

  it('matches reference-ability and event-companion anchor ids too', () => {
    mountSections([
      { id: 'ability-24_01', top: -50 },
      { id: 'step-2', top: 50 },
      { id: 'missions-secondary', top: 900 },
    ])
    expect(currentSectionId()).toBe('step-2')
  })

  it('ignores elements without a tracked id prefix', () => {
    mountSections([
      { id: 'section-05', top: 40 },
      { id: 'random-banner', top: 80 },
    ])
    expect(currentSectionId()).toBe('section-05')
  })

  it('tracks a subsection (second- and third-level) at the top', () => {
    mountSections([
      { id: 'section-01', top: -800 },
      { id: 'section-01-02', top: -300 },       // second-level RuleBlock
      { id: 'section-01-02-01', top: 40 },      // third-level SubRuleBlock header — current
      { id: 'section-01-03', top: 500 },
    ])
    expect(currentSectionId()).toBe('section-01-02-01')
  })

  it('skips display:none h4 anchors inside a collapsed accordion (no false win)', () => {
    mountSections([
      { id: 'section-02-03', top: -40 },        // collapsed SubRuleBlock header, above the line
      { id: 'section-02-03-h1', top: 0, height: 0 }, // hidden inner h4 — must be ignored
      { id: 'section-02-04', top: 300 },        // below the line → stops the scan
    ])
    expect(currentSectionId()).toBe('section-02-03')
  })
})
