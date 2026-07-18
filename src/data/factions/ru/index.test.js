import { describe, it, expect } from 'vitest'
import { deepOverlay } from './index.js'

describe('deepOverlay', () => {
  it('merges array entries by index when the RU side has no id/name (today\'s hand-authored overlays)', () => {
    const en = [{ id: 'a', body: 'A' }, { id: 'b', body: 'B' }]
    const ru = [{ body: 'А' }, { body: 'Б' }]
    expect(deepOverlay(en, ru)).toEqual([{ id: 'a', body: 'А' }, { id: 'b', body: 'Б' }])
  })

  it('merges array entries by id, surviving reordering/insertion in EN', () => {
    const en = [{ id: 'a', body: 'A' }, { id: 'new', body: 'N' }, { id: 'b', body: 'B' }]
    const ru = [{ id: 'b', body: 'Б' }, { id: 'a', body: 'А' }]
    expect(deepOverlay(en, ru)).toEqual([
      { id: 'a', body: 'А' },
      { id: 'new', body: 'N' },
      { id: 'b', body: 'Б' },
    ])
  })

  it('falls back to name when there is no id', () => {
    const en = [{ name: 'Strat A', effect: 'X' }, { name: 'Strat B', effect: 'Y' }]
    const ru = [{ name: 'Strat B', effect: 'Y-ru' }]
    expect(deepOverlay(en, ru)).toEqual([
      { name: 'Strat A', effect: 'X' },
      { name: 'Strat B', effect: 'Y-ru' },
    ])
  })
})
