// What a game keeps track of — one table, read by everything that offers, defaults or obeys the
// choice. Before this file the flags were written out by hand in the wizard AND in
// EditSetupModal, and the two copies had already drifted: the wizard offered the army-rule toggle
// for any chosen faction (with a "reference only" note), the edit dialog only for a faction with a
// tracker spec — so a game whose faction had none showed a card that could never be turned off.
// A row here is offered in both places or in neither, by construction.
//
// A row is:
//   id           stable key (tests, help modal)
//   setting      the field it writes on game.settings
//   group        which block it belongs to: 'game' (the tracker itself) | 'roster' (only means
//                anything with an army list attached)
//   label        ui.js key — the checkbox's caption, and the help modal's title
//   help         ui.js key — one paragraph saying what turning it off costs
//   default      what a game gets when nobody chose, INCLUDING every game saved before the flag
//                existed. Never change one without meaning to change old saved games too.
//   remember     carry the last finished game's choice into the next setup
//   legacy       an older field name still sitting in saved games (read-only fallback)
//   requires     another row's `setting` this one hangs off; off there is off here, whatever this
//                row's own value says. Drawn as a child of that row.
//   enabled      (ctx) => boolean — whether the row can be flipped in THIS game
//   unavailable  (ctx) => ui.js key | null — why not, printed under a disabled caption
//   note         (ctx) => ui.js key | null — a caveat printed under an enabled caption
//
// **Every row is always listed.** A row that cannot apply yet is drawn disabled with the reason,
// never hidden: hiding made the list a different length in every game, and it meant "Track phases"
// was seen only by someone who had already attached a list — the people who needed telling were
// exactly the ones who never saw it. Its help button stays live, because what a greyed-out option
// would do is precisely what you want to read while it is greyed out.
//
// `ctx` is `{ you, opp, anyRoster }`, each side `{ faction, trackable }` — keyed by SIDE, not by
// index, because the players array is reordered by first turn once the game starts (players[0] is
// the first-turn player, `isYou` says which side that is).
//
// Turning a row off HIDES a block, it never clears what it tracked: a CP count, a flipped
// condition and a spent stratagem all stay in the game, so a toggle flipped mid-game is fully
// reversible. Readers therefore gate the UI on `tracks()` and leave the state alone. For the
// modifier rows that means a switched-off family stops PROVING its conditions, so the numbers it
// held fall back into the "possible" list with their condition text — the honest degradation a
// game without phases already has. A disabled family can make the card say less; it can never
// make it say something false.
//
// NOT everything on the game screen may become a row. **The missions are the game** — the primary,
// the secondaries and the way they are scored are what the tracker is FOR, and a switch that hides
// them (or swaps condition-scoring for a hand-typed number) offers to turn the app into a
// notepad. Both were built and removed on 2026-08-25 for exactly that reason. A row here has to be
// an aid AROUND the game — a counter, a reference card, a clock — never the game itself.
const NEEDS_ROSTER = (ctx) => (ctx.anyRoster ? null : 'trackerOptNeedsRoster')

export const TRACK_OPTIONS = [
  // ── The tracker's own screen ───────────────────────────────────────────────────────────────
  {
    id: 'cp',
    setting: 'trackCP',
    group: 'game',
    label: 'trackerTrackCp',
    help: 'trackerHelpCp',
    default: true,
    remember: true,
  },
  {
    id: 'army-you',
    setting: 'trackArmyYou',
    group: 'game',
    label: 'trackerTrackArmyYou',
    help: 'trackerHelpArmyRule',
    default: true,
    remember: true,
    legacy: 'trackArmyRule',
    unavailable: (ctx) => (ctx.you.faction ? null : 'trackerOptNeedsFaction'),
    note: (ctx) => (ctx.you.trackable ? null : 'trackerArmyReferenceOnly'),
  },
  {
    id: 'army-opp',
    setting: 'trackArmyOpp',
    group: 'game',
    label: 'trackerTrackArmyOpp',
    help: 'trackerHelpArmyRule',
    default: true,
    remember: true,
    legacy: 'trackArmyRule',
    unavailable: (ctx) => (ctx.opp.faction ? null : 'trackerOptNeedsFaction'),
    note: (ctx) => (ctx.opp.trackable ? null : 'trackerArmyReferenceOnly'),
  },

  {
    // The clock. It used to sit in the roster group and be offered only with a list attached,
    // because the roster screen was the only thing that read a phase. **PhaseRules is the second
    // reader and it needs no list** — an army rule and a detachment rule name their phase in any
    // game — so the gate went with the justification. It is also NOT under the modifier master:
    // the clock drives the stratagem page's timing too, which is not a modifier question.
    id: 'phases',
    setting: 'trackPhases',
    group: 'game',
    label: 'trackerTrackPhases',
    help: 'trackerHelpPhases',
    // Off by default: an optional ornament, never a precondition.
    default: false,
    remember: true,
  },
  {
    id: 'phase-rules',
    setting: 'trackPhaseRules',
    group: 'game',
    label: 'trackerTrackPhaseRules',
    help: 'trackerHelpPhaseRules',
    default: true,
    remember: true,
    requires: 'trackPhases',
  },

  // ── The roster screen ──────────────────────────────────────────────────────────────────────
  // The master, and under it the five families of switch the modifier layer asks a player to
  // maintain. Everything the layer does WITHOUT asking — the ~990 unconditional effects — hangs
  // off the master alone: those are not tracking, they are this list's correct numbers.
  {
    id: 'modifiers',
    setting: 'trackModifiers',
    group: 'roster',
    label: 'trackerTrackModifiers',
    help: 'trackerHelpModifiers',
    default: true,
    remember: true,
    unavailable: NEEDS_ROSTER,
  },
  {
    id: 'unit-states',
    setting: 'trackUnitStates',
    group: 'roster',
    label: 'trackerTrackUnitStates',
    help: 'trackerHelpUnitStates',
    default: true,
    remember: true,
    requires: 'trackModifiers',
    unavailable: NEEDS_ROSTER,
  },
  {
    id: 'army-states',
    setting: 'trackArmyStates',
    group: 'roster',
    label: 'trackerTrackArmyStates',
    help: 'trackerHelpArmyStates',
    default: true,
    remember: true,
    requires: 'trackModifiers',
    unavailable: NEEDS_ROSTER,
  },
  {
    id: 'stratagems',
    setting: 'trackStratagems',
    group: 'roster',
    label: 'trackerTrackStratagems',
    help: 'trackerHelpStratagems',
    default: true,
    remember: true,
    requires: 'trackModifiers',
    unavailable: NEEDS_ROSTER,
  },
  {
    id: 'auras',
    setting: 'trackAuras',
    group: 'roster',
    label: 'trackerTrackAuras',
    help: 'trackerHelpAuras',
    default: true,
    remember: true,
    requires: 'trackModifiers',
    unavailable: NEEDS_ROSTER,
  },
  {
    id: 'ability-sets',
    setting: 'trackAbilitySets',
    group: 'roster',
    label: 'trackerTrackAbilitySets',
    help: 'trackerHelpAbilitySets',
    default: true,
    remember: true,
    requires: 'trackModifiers',
    unavailable: NEEDS_ROSTER,
  },
]

const BY_SETTING = new Map(TRACK_OPTIONS.map((o) => [o.setting, o]))

// Whether a row can be flipped in this game. `unavailable` says WHY not in one ui key; a row with
// neither is always available.
export function optionEnabled(o, ctx) {
  return !(o.unavailable?.(ctx) ?? null)
}

// The one reader. Answers for a game saved before the flag existed (its `default`) and for a game
// carrying only the retired name (`legacy`), and honours a parent row — no caller writes its own
// `?? true` chain or remembers which options hang off which.
export function tracks(settings, setting) {
  const o = BY_SETTING.get(setting)
  if (!o) return false
  if (o.requires && !tracks(settings, o.requires)) return false
  const own = settings?.[setting]
  const old = o.legacy ? settings?.[o.legacy] : undefined
  return (own ?? old ?? o.default) !== false
}

// The setup wizard's starting values: the last finished game's choice where the row remembers one,
// else the row's default. `last` is that game's settings (or `{}` when there is no history).
// Read through `tracks` per row, so a parent switched off in the last game doesn't drag its
// children's remembered values down with it.
export function defaultTrackSettings(last = {}) {
  const out = {}
  for (const o of TRACK_OPTIONS) {
    const own = o.remember ? last?.[o.setting] : undefined
    const old = o.remember && o.legacy ? last?.[o.legacy] : undefined
    out[o.setting] = (own ?? old ?? o.default) !== false
  }
  return out
}

// The live game's values, for a dialog that edits a game already under way. Same shape, but every
// flag filled in, so an older game arrives complete rather than undefined.
export function trackSettingsOf(settings = {}) {
  const out = {}
  for (const o of TRACK_OPTIONS) {
    const own = settings?.[o.setting]
    const old = o.legacy ? settings?.[o.legacy] : undefined
    out[o.setting] = (own ?? old ?? o.default) !== false
  }
  return out
}

// What actually gets written onto the game. A row the game cannot offer is stored as OFF rather
// than as whatever the last game happened to leave in it — otherwise "Track phases", remembered
// from a game that had a list, would raise the phase row in a game that has none, through a
// checkbox nobody was able to touch.
export function normalizeTrackSettings(settings, ctx) {
  const out = { ...settings }
  for (const o of TRACK_OPTIONS) if (!optionEnabled(o, ctx)) out[o.setting] = false
  return out
}

// The rows of one block, in table order. Every row is returned — availability is a STATE of a row,
// not a filter on the list.
export function optionsIn(group) {
  return TRACK_OPTIONS.filter((o) => o.group === group)
}
