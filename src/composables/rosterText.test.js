import { describe, it, expect } from 'vitest'
import { entrySummary } from './rosterText.js'

const intercessor = { id: 'intercessor-squad', kws: ['Battleline', 'Infantry'], flags: {}, sizes: [{ pts: 80, per: [5, 5], default: 1 }, { pts: 150, per: [6, 10] }] }
const captain = { id: 'captain', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 85, per: [1, 1], default: 1 }] }

describe('entrySummary', () => {
  // The Warlord's mark on the read-only view's rows. It was a bare '★' until 2026-08-28, when the
  // star was given to "I own this model" (useCollection.js) — and a lone symbol on its own line
  // said less than the word does anyway.
  it('names the Warlord in the caller\u2019s locale, ahead of the size and the upgrades', () => {
    const e = { uid: 'u1', id: 'intercessor-squad', size: 1, warlord: true, wg: [[0, 0, 1]] }
    expect(entrySummary(e, intercessor, 'моделей', 'улучшений', 'Варлорд'))
      .toBe('Варлорд · 6 моделей · 1 улучшений')
  })

  it('says nothing about a unit that is not the Warlord', () => {
    const e = { uid: 'u1', id: 'captain', size: 0 }
    expect(entrySummary(e, captain, 'models', 'upgrades', 'Warlord')).toBe('')
  })
})
