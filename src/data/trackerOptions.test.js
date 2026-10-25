import { describe, it, expect } from 'vitest'
import { TRACK_OPTIONS, TRACK_PRESETS, LOCAL_TRACK_SETTINGS, applyTrackPreset, presetOf, tracks, depthOf, defaultTrackSettings, fromBeforePresets, trackSettingsOf, normalizeTrackSettings, optionsIn, optionEnabled, localTrackSeed } from './trackerOptions.js'
import { ui } from '../i18n/ui.js'

const CTX_FULL = {
  you: { faction: 'orks', trackable: true },
  opp: { faction: 'necrons', trackable: false },
  anyRoster: true,
}
const CTX_BARE = { you: {}, opp: {}, anyRoster: false }

describe('tracker options table', () => {
  // Every caption and every explanation must exist in BOTH languages: ui.js has no parity gate of
  // its own (npm run parity covers faction data), so a row added with only the English half would
  // otherwise ship as a blank checkbox in RU.
  it('has both halves of every string it names', () => {
    for (const o of TRACK_OPTIONS) {
      for (const key of [o.label, o.help]) {
        expect(ui.en[key], `${o.id}: ui.en.${key}`).toBeTruthy()
        expect(ui.ru[key], `${o.id}: ui.ru.${key}`).toBeTruthy()
      }
      const note = o.note?.(CTX_FULL) ?? o.note?.(CTX_BARE)
      if (note) {
        expect(ui.en[note]).toBeTruthy()
        expect(ui.ru[note]).toBeTruthy()
      }
    }
  })

  it('gives every row a distinct id and setting', () => {
    expect(new Set(TRACK_OPTIONS.map(o => o.id)).size).toBe(TRACK_OPTIONS.length)
    expect(new Set(TRACK_OPTIONS.map(o => o.setting)).size).toBe(TRACK_OPTIONS.length)
  })
})

describe('tracks()', () => {
  it('answers with the option default for a game saved before the flag existed', () => {
    expect(tracks({}, 'trackCP')).toBe(true)
    expect(tracks({}, 'trackArmyYou')).toBe(true)
    expect(tracks({}, 'trackPhases')).toBe(false)
  })

  it('reads the retired single army flag when the split ones are absent', () => {
    expect(tracks({ trackArmyRule: false }, 'trackArmyYou')).toBe(false)
    expect(tracks({ trackArmyRule: false }, 'trackArmyOpp')).toBe(false)
    // …and the split flag wins wherever it is present.
    expect(tracks({ trackArmyRule: false, trackArmyYou: true }, 'trackArmyYou')).toBe(true)
  })

  it('is false for a setting no row owns', () => {
    expect(tracks({ nonsense: true }, 'nonsense')).toBe(false)
  })
})

describe('defaults', () => {
  it('carries the last game\'s choice into the next setup', () => {
    const s = defaultTrackSettings({ trackCP: false, trackPhases: true })
    expect(s.trackCP).toBe(false)
    expect(s.trackPhases).toBe(true)
    expect(s.trackArmyYou).toBe(true)   // untouched last game → the row's own default
  })

  it('fills an older game in for the edit dialog', () => {
    const s = trackSettingsOf({ trackCP: false })
    expect(s.trackCP).toBe(false)
    for (const o of TRACK_OPTIONS) expect(typeof s[o.setting]).toBe('boolean')
  })
})

describe('availability', () => {
  const enabled = (ctx) => TRACK_OPTIONS.filter((o) => optionEnabled(o, ctx)).map((o) => o.id)

  // Availability is a STATE of a row, never a filter on the list: the whole table is drawn in
  // every game, and a row that cannot be flipped says why instead of vanishing.
  it('lists every row whatever the game looks like', () => {
    // Four groups (owner, 2026-10-14) and every row in one of them.
    const groups = ['turn', 'armies', 'roster', 'look']
    expect(groups.reduce((n, g) => n + optionsIn(g).length, 0)).toBe(TRACK_OPTIONS.length)
    // The clock is a TURN row: PhaseRules reads it with no list in sight.
    expect(optionsIn('turn').map((o) => o.id)).toContain('phases')
  })

  it('disables an army row for a side with no faction, and says so', () => {
    const ctx = { ...CTX_FULL, opp: {} }
    expect(enabled(ctx)).toContain('army-you')
    expect(enabled(ctx)).not.toContain('army-opp')
    const opp = TRACK_OPTIONS.find((o) => o.id === 'army-opp')
    expect(opp.unavailable(ctx)).toBe('trackerOptNeedsFaction')
  })

  it('disables every roster row until a list is attached', () => {
    const off = TRACK_OPTIONS.filter((o) => o.group === 'roster' && !optionEnabled(o, CTX_BARE))
    expect(off).toHaveLength(optionsIn('roster').length)
    expect(off[0].unavailable(CTX_BARE)).toBe('trackerOptNeedsRoster')
    expect(enabled({ ...CTX_BARE, anyRoster: true })).toContain('phases')
  })

  it('leaves the tracker\'s own rows alone', () => {
    // The two army rows want a faction; the clock, its reminder and the colours are always offered
    // (a side with no faction still has a colour to customise).
    expect(enabled(CTX_BARE)).toEqual(['cp', 'strat-play', 'strat-ask', 'phases', 'phase-rules', 'missions', 'broadcast', 'log', 'stats', 'custom-colors'])
    expect(enabled({ ...CTX_BARE, you: { faction: 'orks' } })).toEqual(['cp', 'army-you', 'strat-play', 'strat-ask', 'phases', 'phase-rules', 'missions', 'broadcast', 'log', 'stats', 'custom-colors'])
  })
})

describe('the modifier master', () => {
  // The five families are the hand-maintained half of the layer; the master is the layer itself.
  it('switches every family off with it', () => {
    const s = { trackModifiers: false, trackStratagems: true, trackAuras: true }
    expect(tracks(s, 'trackStratagems')).toBe(false)
    expect(tracks(s, 'trackAuras')).toBe(false)
    // …but not the clock, which is a game row and drives the phase reminder and the stratagem
    // timing as well.
    expect(tracks({ ...s, trackPhases: true }, 'trackPhases')).toBe(true)
  })

  it('does not drag a remembered child value down when seeding the next game', () => {
    const s = defaultTrackSettings({ trackModifiers: false, trackStratagems: true })
    expect(s.trackModifiers).toBe(false)
    expect(s.trackStratagems).toBe(true)   // stored as the player left it; the master still hides it
  })
})

describe('normalizeTrackSettings', () => {
  // A disabled checkbox never carried the player's answer, so its value must not survive into the
  // game: "Track phases", remembered from a game that had a list, would otherwise raise the phase
  // row in a game that has none.
  it('writes a row the game cannot offer as off', () => {
    const s = normalizeTrackSettings({ trackModifiers: true, trackCP: true }, CTX_BARE)
    expect(s.trackModifiers).toBe(false)   // no list → nothing for the layer to read
    expect(s.trackCP).toBe(true)
  })

  it('leaves an offered row exactly as chosen', () => {
    expect(normalizeTrackSettings({ trackModifiers: true }, CTX_FULL).trackModifiers).toBe(true)
    // The clock is offered in every game, list or no list.
    expect(normalizeTrackSettings({ trackPhases: true }, CTX_BARE).trackPhases).toBe(true)
  })
})

// Owner, 2026-10-10: Battle-shock on by default only where command points are counted — that is
// where the mark blocks a stratagem; a game not counting CP starts without the chip.
describe('the Battle-shock row', () => {
  it('follows command points when a game never set it', () => {
    expect(tracks({ trackCP: true }, 'trackBattleShock')).toBe(true)
    expect(tracks({ trackCP: false }, 'trackBattleShock')).toBe(false)
    expect(tracks({ trackCP: false, trackBattleShock: true }, 'trackBattleShock')).toBe(true)
  })

  it('starts the setup the same way, after a game', () => {
    expect(defaultTrackSettings({ trackCP: false }).trackBattleShock).toBe(false)
    expect(defaultTrackSettings({ trackCP: true }).trackBattleShock).toBe(true)
  })

  it('needs the modifiers master, like the unit states', () => {
    expect(tracks({ trackCP: true, trackModifiers: false }, 'trackBattleShock')).toBe(false)
  })
})

// A shared game (owner, 2026-10-25): what a phone shows is its own; command points, the clock and
// the broadcast are the host's.
describe('the rows a phone keeps for itself', () => {
  it('is every row but CP, the clock and the broadcast', () => {
    expect(TRACK_OPTIONS.filter((o) => !o.local).map((o) => o.setting)).toEqual(['trackCP', 'trackPhases', 'trackBroadcast'])
    expect(TRACK_OPTIONS.filter((o) => o.everyPhone).map((o) => o.setting)).toEqual(['trackCP', 'trackPhases'])
    expect(LOCAL_TRACK_SETTINGS).toContain('trackTurnChecks') // a retired name stays home too
  })
  it('seeds a guest from its own last game, and only its own rows', () => {
    const last = { ...defaultTrackSettings(), trackPhaseRules: false, showLog: false, trackCP: false }
    const seed = localTrackSeed(last)
    expect(seed.trackPhaseRules).toBe(false)
    expect(seed.showLog).toBe(false)
    expect(seed).not.toHaveProperty('trackCP')
    expect(Object.keys(seed).sort()).toEqual(TRACK_OPTIONS.filter((o) => o.local).map((o) => o.setting).sort())
    // No game behind it: the default preset's rows.
    expect(presetOf({ trackCP: true, ...localTrackSeed(undefined) }, CTX_FULL)).toBe('base')
  })
  it('a guest\'s preset sets and reads its own rows, never the host\'s', () => {
    const s = { ...defaultTrackSettings(), trackCP: false, trackPhases: true }
    applyTrackPreset(s, 'maximal', { localOnly: true })
    expect(s.trackCP).toBe(false)
    expect(s.trackPhases).toBe(true)
    expect(s.trackPhaseRules).toBe(true)
    expect(presetOf(s, CTX_FULL, { localOnly: true })).toBe('maximal')
    expect(presetOf(s, CTX_FULL)).toBeNull() // whole-table: CP is off, so not "Maximal"
  })
})

// One row until 2026-10-25: a game saved with `showLogStats` answers for both tabs.
describe('the Log and Stats tabs', () => {
  it('are two rows, both read from the retired one', () => {
    expect(tracks({ showLogStats: false }, 'showLog')).toBe(false)
    expect(tracks({ showLogStats: false }, 'showStats')).toBe(false)
    expect(tracks({}, 'showLog')).toBe(true)
    expect(tracks({ showLogStats: true, showStats: false }, 'showStats')).toBe(false)
  })
})

describe('presets (owner, 2026-10-17)', () => {
  it('a first game starts as "Base"; a later one from the last game\'s choices', () => {
    expect(presetOf(defaultTrackSettings(), CTX_FULL)).toBe('base')
    const after = defaultTrackSettings({ ...TRACK_PRESETS.find((p) => p.id === 'maximal').values })
    expect(presetOf(after, CTX_FULL)).toBe('maximal')
  })
  it('applies each preset and recognises it, and a touched box is your own', () => {
    for (const p of TRACK_PRESETS) {
      const s = defaultTrackSettings()
      applyTrackPreset(s, p.id)
      expect(presetOf(s, CTX_FULL)).toBe(p.id)
    }
    const s = defaultTrackSettings()
    applyTrackPreset(s, 'base')
    s.trackPhases = true
    expect(presetOf(s, CTX_FULL)).toBeNull()
  })
  it('names only rows the table has, and leaves the colours and the broadcast alone', () => {
    const known = new Set(TRACK_OPTIONS.map((o) => o.setting))
    for (const p of TRACK_PRESETS) {
      for (const k of Object.keys(p.values)) expect(known.has(k), `${p.id}: ${k}`).toBe(true)
      expect(p.values).not.toHaveProperty('customColors')
      expect(p.values).not.toHaveProperty('trackBroadcast')
    }
  })
  it('a game without a list is still "Base" — the list rows it cannot offer are not compared', () => {
    const s = normalizeTrackSettings(defaultTrackSettings(), CTX_BARE)
    expect(presetOf(s, CTX_BARE)).toBe('base')
  })
  const on = (id) => {
    const s = defaultTrackSettings()
    applyTrackPreset(s, id)
    return TRACK_OPTIONS.filter((o) => !['customColors', 'trackBroadcast'].includes(o.setting) && tracks(s, o.setting)).map((o) => o.id)
  }
  it('minimal: nothing', () => {
    expect(on('minimal')).toEqual([])
  })
  it('base: CP without stratagems, the missions, the army counters, the modifiers without a family, the log', () => {
    expect(on('base')).toEqual(['cp', 'army-you', 'army-opp', 'missions', 'log', 'modifiers'])
  })
  it('maximal: everything', () => {
    expect(on('maximal')).toHaveLength(TRACK_OPTIONS.length - 2)
  })
})

describe('the rows of 2026-10-17', () => {
  it('stratagems hang off CP, and the ask off the stratagems', () => {
    expect(tracks({ trackCP: false, trackStratPlay: true }, 'trackStratPlay')).toBe(false)
    expect(tracks({ trackCP: true, trackStratPlay: false, askStratagems: true }, 'askStratagems')).toBe(false)
    expect(depthOf(TRACK_OPTIONS.find((o) => o.id === 'strat-play'))).toBe(1)
    expect(depthOf(TRACK_OPTIONS.find((o) => o.id === 'strat-ask'))).toBe(2)
  })
  it('a spent stratagem changes the card only where stratagems are played AND the modifiers are on', () => {
    const s = { trackCP: true, trackStratPlay: true, trackModifiers: true, trackStratagems: true }
    expect(tracks(s, 'trackStratagems')).toBe(true)
    expect(tracks({ ...s, trackStratPlay: false }, 'trackStratagems')).toBe(false)
    expect(tracks({ ...s, trackModifiers: false }, 'trackStratagems')).toBe(false)
  })
  it('the mission help reads a game saved with the old turn-check switch', () => {
    expect(tracks({ trackTurnChecks: false }, 'trackMissionAids')).toBe(false)
    expect(tracks({}, 'trackMissionAids')).toBe(true)
  })
  it('where each unit is, is one row with its states', () => {
    expect(TRACK_OPTIONS.some((o) => o.id === 'unit-status')).toBe(false)
  })
})

// The first game after updating from 2.9.7 starts as Base (owner, 2026-10-20): a game from before
// the presets carries none of the rows they brought.
describe('a last game from before the presets', () => {
  const old297 = { trackCP: true, trackArmyYou: true, trackArmyOpp: true, trackPhases: false, trackPhaseRules: true, trackBroadcast: false, trackModifiers: true, trackUnitStates: true, trackArmyStates: true, trackStratagems: true, trackAuras: true, trackAbilitySets: true }
  it('is told apart from one played with them', () => {
    expect(fromBeforePresets(old297)).toBe(true)
    expect(fromBeforePresets({ ...old297, trackStratPlay: false })).toBe(false)
    expect(fromBeforePresets({})).toBe(false)
    expect(fromBeforePresets(null)).toBe(false)
  })
  it('gives the default preset', () => {
    expect(presetOf(defaultTrackSettings(fromBeforePresets(old297) ? {} : old297), CTX_FULL)).toBe('base')
  })
})
