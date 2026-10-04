import { describe, it, expect } from 'vitest'
import { rosterNameFit } from './rosterNameFit.js'

describe('rosterNameFit', () => {
  it('leaves an ordinary list name at full size', () => {
    expect(rosterNameFit('Warpbane Task Force')).toBe('')
    expect(rosterNameFit('')).toBe('')
    expect(rosterNameFit(undefined)).toBe('')
  })

  it('keeps the full size for a name that fits a phone’s line', () => {
    expect(rosterNameFit('This is a blunting army')).toBe('')
  })

  // A name that would wrap at full size steps down at once: two lines of the full size were a
  // third of a phone screen above the list (owner, 2026-10-03).
  it('steps a name that would wrap down one size', () => {
    expect(rosterNameFit('Wagonpilled Crayoncel goes Waaaaghehehehe')).toBe('long')
    expect(rosterNameFit('We build thick city on rock and roll')).toBe('long')
    expect(rosterNameFit('PORTRAIT OF A MACHINE')).toBe('long')
  })

  it('steps a sentence or a quote-as-a-name down two', () => {
    expect(rosterNameFit('I am Warpbane and I could kill you, but death would only end your agony')).toBe('xlong')
    const quote = 'I am Warpbane-- and I could kill you...but death would only end your agony--and silence your shame.'
    expect(rosterNameFit(quote)).toBe('xlong')
  })

  // A capital is the wider letter: an all-caps name reaches a size step sooner than its
  // character count alone would say.
  it('counts capitals as the wider letters they are', () => {
    const caps = 'CUSTODES DO NOT SHOOT WELL'   // 26 characters
    expect(rosterNameFit(caps)).toBe('long')
    expect(rosterNameFit(caps.toLowerCase())).toBe('')
  })

  it('ignores padding around the name', () => {
    expect(rosterNameFit('   Warpbane   ')).toBe('')
  })
})
