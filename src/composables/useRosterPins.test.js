import { describe, it, expect } from 'vitest'
import { isRosterPinned, toggleRosterPin, pinnedFirst } from './useRosterPins.js'

describe('roster pins', () => {
  it('puts pinned lists first, each half in its own order, and remembers them', () => {
    const list = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
    toggleRosterPin('c')
    expect(isRosterPinned('c')).toBe(true)
    expect(pinnedFirst(list).map((r) => r.id)).toEqual(['c', 'a', 'b'])
    expect(JSON.parse(localStorage.getItem('wh11ed-roster-pins'))).toEqual(['c'])
    toggleRosterPin('c')
    expect(pinnedFirst(list).map((r) => r.id)).toEqual(['a', 'b', 'c'])
  })
})
