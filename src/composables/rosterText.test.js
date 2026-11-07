import { describe, it, expect } from 'vitest'
import { entrySummary, enhLabel, issueText } from './rosterText.js'

const intercessor = { id: 'intercessor-squad', kws: ['Battleline', 'Infantry'], flags: {}, sizes: [{ pts: 80, per: [5, 5], default: 1 }, { pts: 150, per: [6, 10] }] }
const captain = { id: 'captain', kws: ['Character', 'Infantry'], flags: { char: 1 }, sizes: [{ pts: 85, per: [1, 1], default: 1 }] }

describe('entrySummary', () => {
  // The Warlord's mark on the read-only view's rows. It was a bare '★' until 2026-08-28, when the
  // star was given to "I own this model" (useCollection.js) — and a lone symbol on its own line
  // said less than the word does anyway.
  it('names the Warlord in the caller\u2019s locale, ahead of the size', () => {
    const e = { uid: 'u1', id: 'intercessor-squad', size: 1, warlord: true }
    expect(entrySummary(e, intercessor, 'моделей', 'Варлорд')).toBe('Варлорд · 6 моделей')
  })

  // A count of wargear picks read as an enhancement on a bodyguard's row (2026-10-27).
  it('says nothing of the wargear picked', () => {
    const e = { uid: 'u1', id: 'intercessor-squad', size: 1, wg: [[0, 0, 1]] }
    expect(entrySummary(e, intercessor, 'моделей', 'Варлорд')).toBe('6 моделей')
  })

  it('says nothing about a unit that is not the Warlord', () => {
    const e = { uid: 'u1', id: 'captain', size: 0 }
    expect(entrySummary(e, captain, 'models', 'Warlord')).toBe('')
  })
})

// The data carries an Upgrade's kind in its name; a screen shows the name alone (owner, 2026-11-07).
describe('enhLabel', () => {
  it('drops the Upgrade tag, and only that', () => {
    expect(enhLabel('Gore-stained Veterans (Upgrade)')).toBe('Gore-stained Veterans')
    expect(enhLabel('Knight of the Opus Machina (Aura)')).toBe('Knight of the Opus Machina (Aura)')
    expect(enhLabel(null)).toBe('')
  })
  it('reaches the summary line and an issue\'s sentence', () => {
    const e = { size: 0, enh: 'Gore-stained Veterans (Upgrade)' }
    expect(entrySummary(e, intercessor, 'models')).toBe('5 models · Gore-stained Veterans')
    expect(issueText({ code: 'x', params: { enh: 'Gore-stained Veterans (Upgrade)' } }, { issue_x: 'Twice: {enh}' })).toBe('Twice: Gore-stained Veterans')
  })
})
