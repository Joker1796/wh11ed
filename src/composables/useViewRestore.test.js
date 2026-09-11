import { afterEach, describe, it, expect } from 'vitest'
import { currentSectionId, storedLocation } from './useViewRestore.js'

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

describe('storedLocation', () => {
  it('keeps the query — it is what a resumed screen needs to know WHICH thing it was on', () => {
    // Losing this reopened the roster wizard empty, and the next faction pick started a second
    // draft while the first sat orphaned on the Drafts tab.
    expect(storedLocation('/roster/new?draft=abc123', null)).toBe('/roster/new?draft=abc123')
    expect(storedLocation('/stratagems?phase=shooting', null)).toBe('/stratagems?phase=shooting')
  })

  it('replaces the URL hash with the section actually in view', () => {
    expect(storedLocation('/core-rules#section-01', 'section-14')).toBe('/core-rules#section-14')
  })

  it('keeps a hash that is the payload when there is no section to displace it', () => {
    expect(storedLocation('/roster/shared#r=eNpTeg', 'r=eNpTeg')).toBe('/roster/shared#r=eNpTeg')
  })

  it('carries query and anchor together', () => {
    expect(storedLocation('/roster/xyz?unit=u1#top', 'section-03')).toBe('/roster/xyz?unit=u1#section-03')
  })

  it('leaves a plain path alone', () => {
    expect(storedLocation('/ru/tracker', null)).toBe('/ru/tracker')
  })
})
