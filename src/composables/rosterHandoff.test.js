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
  it('writes a minimal setup draft with faction, detachment and battle size', () => {
    const roster = { faction: 'space-marines', detachment: 'sid-x', battleSize: 'strike-force' }
    mod.prefillDraftFromRoster(roster, 'Gladius Task Force')
    const d = tracker.setupDraft.value
    expect(d.step).toBe(1)
    expect(d.players[0].factionSlug).toBe('space-marines')
    expect(d.players[0].detachments).toEqual(['Gladius Task Force'])
    expect(d.players[1]).toEqual({})
    expect(d.settings.battleSize).toBe('strikeForce')
  })

  it('handles a roster with no detachment', () => {
    mod.prefillDraftFromRoster({ faction: 'orks', battleSize: 'incursion' }, null)
    const d = tracker.setupDraft.value
    expect(d.players[0].detachments).toEqual([])
    expect(d.settings.battleSize).toBe('incursion')
  })
})
