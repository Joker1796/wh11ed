import { describe, it, expect } from 'vitest'
import { resolveLayout, matchupFor, ALL_MATCHUPS } from './trackerLayout.js'

const A = ALL_MATCHUPS[0].a
const B = ALL_MATCHUPS[1].b // a different disposition

describe('matchupFor', () => {
  it('finds a matchup regardless of disposition order', () => {
    const m = ALL_MATCHUPS[2]
    expect(matchupFor(m.a, m.b)).toBe(m)
    expect(matchupFor(m.b, m.a)).toBe(m)
  })
  it('returns null when a disposition is missing', () => {
    expect(matchupFor(null, A)).toBe(null)
    expect(matchupFor(A, undefined)).toBe(null)
  })
})

describe('resolveLayout', () => {
  it('resolves the recommended letter within the dispositions matchup', () => {
    const m = matchupFor(A, B)
    const l = resolveLayout({ layout: 'B' }, A, B)
    expect(l).toEqual(m.layouts.find(x => x.id === 'B'))
  })
  it('falls back to the first layout for an unknown letter', () => {
    const m = matchupFor(A, B)
    expect(resolveLayout({ layout: 'Z' }, A, B)).toBe(m.layouts[0])
  })
  it('returns the custom layout when settings.layout is "custom"', () => {
    const custom = { id: 'C', image: '/img/x.jpg', edge: 'h', label: 'Custom' }
    expect(resolveLayout({ layout: 'custom', customLayout: custom }, A, B)).toBe(custom)
  })
  it('backward compatible: old game (letter, no customLayout) → recommended', () => {
    const m = matchupFor(A, B)
    expect(resolveLayout({ layout: 'A' }, A, B)).toBe(m.layouts.find(x => x.id === 'A'))
  })
  it('null when dispositions are missing and no custom layout', () => {
    expect(resolveLayout({ layout: 'A' }, null, null)).toBe(null)
  })
})
