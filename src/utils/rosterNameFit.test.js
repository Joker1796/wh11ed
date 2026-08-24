import { describe, it, expect } from 'vitest'
import { rosterNameFit } from './rosterNameFit.js'

describe('rosterNameFit', () => {
  it('leaves an ordinary list name alone', () => {
    expect(rosterNameFit('Warpbane Task Force')).toBe('')
    expect(rosterNameFit('')).toBe('')
    expect(rosterNameFit(undefined)).toBe('')
  })

  it('steps a wordy name down one size', () => {
    expect(rosterNameFit('We build thick city on rock and roll')).toBe('long')
  })

  it('steps a quote-as-a-name down two', () => {
    const quote = 'I am Warpbane-- and I could kill you...but death would only end your agony--and silence your shame.'
    expect(rosterNameFit(quote)).toBe('xlong')
  })

  it('ignores padding around the name', () => {
    expect(rosterNameFit('   Warpbane   ')).toBe('')
  })
})
