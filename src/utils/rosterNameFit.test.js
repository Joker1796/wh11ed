import { describe, it, expect } from 'vitest'
import { rosterNameFit } from './rosterNameFit.js'

describe('rosterNameFit', () => {
  it('leaves an ordinary list name at full size', () => {
    expect(rosterNameFit('Warpbane Task Force')).toBe('')
    expect(rosterNameFit('')).toBe('')
    expect(rosterNameFit(undefined)).toBe('')
  })

  // Two lines of header type are not a problem — the name has the row to itself.
  it('keeps the full size for a name that only reaches a second line', () => {
    expect(rosterNameFit('We build thick city on rock and roll')).toBe('')
    expect(rosterNameFit("It's not what it used to be '-_-")).toBe('')
    expect(rosterNameFit('PORTRAIT OF A MACHINE')).toBe('')
  })

  it('steps a sentence-long name down one size', () => {
    expect(rosterNameFit('I am Warpbane and I could kill you, but death would only end your agony')).toBe('long')
  })

  it('steps a quote-as-a-name down two', () => {
    const quote = 'I am Warpbane-- and I could kill you...but death would only end your agony--and silence your shame.'
    expect(rosterNameFit(quote)).toBe('xlong')
  })

  // A capital is the wider letter: an all-caps name reaches a size step sooner than its
  // character count alone would say.
  it('counts capitals as the wider letters they are', () => {
    const caps = 'CUSTODES DO NOT SHOOT WELL AND THEY NEVER WILL AGAIN'   // 52 characters
    expect(rosterNameFit(caps)).toBe('long')
    expect(rosterNameFit(caps.toLowerCase())).toBe('')
  })

  it('ignores padding around the name', () => {
    expect(rosterNameFit('   Warpbane   ')).toBe('')
  })
})
