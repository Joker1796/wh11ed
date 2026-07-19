import { beforeEach, describe, it, expect, vi } from 'vitest'

let mod, tracker

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  mod = await import('./rosterHandoff.js')
  tracker = (await import('./useTracker.js')).useTracker()
})

describe('toTrackerBattleSize', () => {
  it('maps the roster slug to the tracker id', () => {
    expect(mod.toTrackerBattleSize('strike-force')).toBe('strikeForce')
    expect(mod.toTrackerBattleSize('incursion')).toBe('incursion')
    expect(mod.toTrackerBattleSize('onslaught')).toBe('onslaught')
  })
})

describe('prefillDraftFromRoster', () => {
  it('writes a minimal setup draft with faction, detachments and battle size', () => {
    const roster = { faction: 'space-marines', detachments: ['Gladius Task Force'], battleSize: 'strike-force' }
    mod.prefillDraftFromRoster(roster)
    const d = tracker.setupDraft.value
    expect(d.step).toBe(1)
    expect(d.players[0].factionSlug).toBe('space-marines')
    expect(d.players[0].detachments).toEqual(['Gladius Task Force'])
    expect(d.players[1]).toEqual({})
    expect(d.settings.battleSize).toBe('strikeForce')
  })

  it('handles a roster with no detachment and maps custom → strikeForce', () => {
    mod.prefillDraftFromRoster({ faction: 'orks', detachments: [], battleSize: 'custom', customPoints: 1750 })
    const d = tracker.setupDraft.value
    expect(d.players[0].detachments).toEqual([])
    expect(d.settings.battleSize).toBe('strikeForce')
  })
})
