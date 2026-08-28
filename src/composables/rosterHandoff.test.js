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

  // The list already declared which Force Disposition it plays; without this the tracker asks
  // again and answers for the player by taking whichever candidate its own data lists first.
  it("carries the declared Force Disposition over as the tracker's own id", () => {
    mod.prefillDraftFromRoster({ faction: 'space-marines', detachments: ['Gladius Task Force'], disposition: 'Take and Hold' })
    expect(tracker.setupDraft.value.players[0].disposition).toBe('take-and-hold')
  })

  it('leaves the tracker to derive one when the list declared nothing it knows', () => {
    mod.prefillDraftFromRoster({ faction: 'space-marines', detachments: ['Gladius Task Force'] })
    expect(tracker.setupDraft.value.players[0].disposition).toBeNull()
    mod.prefillDraftFromRoster({ faction: 'space-marines', detachments: [], disposition: 'Not A Disposition' })
    expect(tracker.setupDraft.value.players[0].disposition).toBeNull()
  })

  // Coming here from "play this list" is the one moment we know for sure which list is fielded,
  // so the wizard opens with it already attached instead of asking again a screen later.
  it('attaches the roster it was prefilled from', () => {
    const roster = {
      id: 'r1', name: 'Gladius 2k', faction: 'space-marines', detachments: ['Gladius Task Force'],
      battleSize: 'strike-force', units: [{ uid: 'a', id: 'captain', size: 0 }],
    }
    mod.prefillDraftFromRoster(roster)
    const p = tracker.setupDraft.value.players[0]
    expect(p.rosterId).toBe('r1')
    expect(p.roster.name).toBe('Gladius 2k')
    expect(p.roster.units).toEqual(roster.units)
    expect(p.roster.id).toBeUndefined()   // provenance lives in rosterId
  })

  it('handles a roster with no detachment and maps custom → strikeForce', () => {
    mod.prefillDraftFromRoster({ faction: 'orks', detachments: [], battleSize: 'custom', customPoints: 1750 })
    const d = tracker.setupDraft.value
    expect(d.players[0].detachments).toEqual([])
    expect(d.settings.battleSize).toBe('strikeForce')
  })
})
