import { describe, it, expect } from 'vitest'
import { rosterNameFit } from './rosterNameFit.js'

describe('rosterNameFit', () => {
  it('leaves an ordinary list name alone', () => {
    expect(rosterNameFit('Warpbane Task Force')).toBe('')
    expect(rosterNameFit('')).toBe('')
    expect(rosterNameFit(undefined)).toBe('')
  })

  // A name that wraps to a second line gets the row to itself, but keeps the full size: two
  // lines of a header are not a problem, and shrinking them would be a loss for nothing.
  it('gives a name past one line the row, at the same size', () => {
    expect(rosterNameFit('We build thick city on rock and roll')).toBe('wrap')
    expect(rosterNameFit("It's not what it used to be '-_-")).toBe('wrap')
  })

  it('steps a sentence-long name down one size', () => {
    expect(rosterNameFit('I am Warpbane-- and I could kill you, but death would end your agony')).toBe('long')
  })

  it('steps a quote-as-a-name down two', () => {
    const quote = 'I am Warpbane-- and I could kill you...but death would only end your agony--and silence your shame.'
    expect(rosterNameFit(quote)).toBe('xlong')
  })

  it('ignores padding around the name', () => {
    expect(rosterNameFit('   Warpbane   ')).toBe('')
  })
})
