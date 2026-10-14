import { describe, it, expect } from 'vitest'
import { TRACK_OPTIONS, TRACK_PRESETS, applyTrackPreset, presetOf, tracks, defaultTrackSettings, trackSettingsOf, normalizeTrackSettings, optionsIn, optionEnabled } from './trackerOptions.js'
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
    expect(enabled(CTX_BARE)).toEqual(['cp', 'strat-ask', 'phases', 'phase-rules', 'turn-checks', 'broadcast', 'log-stats', 'custom-colors'])
    expect(enabled({ ...CTX_BARE, you: { faction: 'orks' } })).toEqual(['cp', 'army-you', 'strat-ask', 'phases', 'phase-rules', 'turn-checks', 'broadcast', 'log-stats', 'custom-colors'])
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

  it('starts the setup the same way', () => {
    expect(defaultTrackSettings({ trackCP: false }).trackBattleShock).toBe(false)
    expect(defaultTrackSettings({}).trackBattleShock).toBe(true)
  })

  it('needs the modifiers master, like the unit states', () => {
    expect(tracks({ trackCP: true, trackModifiers: false }, 'trackBattleShock')).toBe(false)
  })
})

describe('presets (owner, 2026-10-14)', () => {
  it('a new game starts as "Normal"', () => {
    expect(presetOf(defaultTrackSettings(), CTX_FULL)).toBe('normal')
  })
  it('applies each preset and recognises it, and a touched box is your own set', () => {
    for (const p of TRACK_PRESETS) {
      const s = defaultTrackSettings()
      applyTrackPreset(s, p.id)
      expect(presetOf(s, CTX_FULL)).toBe(p.id)
    }
    const s = defaultTrackSettings()
    applyTrackPreset(s, 'quick')
    s.showLogStats = true
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
  it('a game without a list is still "Normal" — the list rows it cannot offer are not compared', () => {
    const s = normalizeTrackSettings(defaultTrackSettings(), CTX_BARE)
    expect(presetOf(s, CTX_BARE)).toBe('normal')
  })
  it('the quick game asks nothing and hides the log and the stats', () => {
    const s = defaultTrackSettings()
    applyTrackPreset(s, 'quick')
    for (const k of ['askStratagems', 'trackTurnChecks', 'showLogStats', 'trackModifiers', 'trackPhases']) expect(tracks(s, k), k).toBe(false)
  })
})
