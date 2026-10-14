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
//   group        which block it belongs to (owner, 2026-10-14): 'turn' (the turn and the score),
//                'armies' (the armies' rules and stratagems), 'roster' (only means anything with
//                an army list attached), 'look' (how the screen looks)
//   fold         drawn under "Details" beneath its parent row (the modifier families)
//   label        ui.js key — the checkbox's caption, and the help modal's title
//   help         ui.js key — one paragraph saying what turning it off costs
//   default      what a game gets when nobody chose, INCLUDING every game saved before the flag
//                existed. Never change one without meaning to change old saved games too.
//   remember     carry the last finished game's choice into the next setup
//   legacy       an older field name still sitting in saved games (read-only fallback)
//   requires     another row's `setting` this one hangs off; off there is off here, whatever this
//                row's own value says. Drawn as a child of that row.
//   local        this PHONE's choice, not the game's: kept out of the shared-game sync
//                (gameSlices.js) and the one kind of row a guest may flip in a game another phone
//                hosts. Everything else on the setup dialog is the host's, because it is the game.
//   enabled      (ctx) => boolean — whether the row can be flipped in THIS game
//   unavailable  (ctx) => ui.js key | null — why not, printed under a disabled caption
//   note         (ctx) => ui.js key | null — a caveat for an enabled row, appended to its help
//   preview      what TrackOptions draws under the row to show the choice ('sideColors')
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
    group: 'turn',
    label: 'trackerTrackCp',
    help: 'trackerHelpCp',
    default: true,
    remember: true,
  },
  {
    id: 'army-you',
    setting: 'trackArmyYou',
    group: 'armies',
    label: 'trackerTrackArmyYou',
    help: 'trackerHelpArmyRule',
    default: true,
    remember: true,
    local: true,
    legacy: 'trackArmyRule',
    unavailable: (ctx) => (ctx.you.faction ? null : 'trackerOptNeedsFaction'),
    note: (ctx) => (ctx.you.trackable ? null : 'trackerArmyReferenceOnly'),
  },
  {
    id: 'army-opp',
    setting: 'trackArmyOpp',
    group: 'armies',
    label: 'trackerTrackArmyOpp',
    help: 'trackerHelpArmyRule',
    default: true,
    remember: true,
    local: true,
    legacy: 'trackArmyRule',
    unavailable: (ctx) => (ctx.opp.faction ? null : 'trackerOptNeedsFaction'),
    note: (ctx) => (ctx.opp.trackable ? null : 'trackerArmyReferenceOnly'),
  },
  {
    // Playing a stratagem asks which unit and whether a rule changed its cost (StratPlayModal).
    // Off: the printed cost is spent at one tap, on no unit from the CP tab, on the unit from its
    // card (owner, 2026-10-14). Only where CP are counted — there is no play without them.
    id: 'strat-ask',
    setting: 'askStratagems',
    group: 'armies',
    label: 'trackerAskStratagems',
    help: 'trackerHelpAskStratagems',
    default: true,
    remember: true,
    requires: 'trackCP',
  },

  {
    // The clock. It used to sit in the roster group and be offered only with a list attached,
    // because the roster screen was the only thing that read a phase. **PhaseRules is the second
    // reader and it needs no list** — an army rule and a detachment rule name their phase in any
    // game — so the gate went with the justification. It is also NOT under the modifier master:
    // the clock drives the stratagem page's timing too, which is not a modifier question.
    id: 'phases',
    setting: 'trackPhases',
    group: 'turn',
    label: 'trackerTrackPhases',
    help: 'trackerHelpPhases',
    // Off by default: an optional ornament, never a precondition.
    default: false,
    remember: true,
  },
  {
    id: 'phase-rules',
    setting: 'trackPhaseRules',
    group: 'turn',
    label: 'trackerTrackPhaseRules',
    help: 'trackerHelpPhaseRules',
    default: true,
    remember: true,
    // No `requires` since 2026-10-08: without the clock the tab lists the whole turn instead.
  },
  {
    // Before the turn passes, the conditions on cards nobody is looking at — the other side's "end
    // of your opponent's turn" secondaries, every End of Battle condition on the last turn
    // (TurnEndCheckModal). On by default; a player who keeps score by hand can turn it off
    // (owner, 2026-10-14).
    id: 'turn-checks',
    setting: 'trackTurnChecks',
    group: 'turn',
    label: 'trackerTrackTurnChecks',
    help: 'trackerHelpTurnChecks',
    default: true,
    remember: true,
  },
  {
    // The OBS-broadcast button. A niche feature, so the ROW is what puts the button on the
    // game screen at all — off by default, remembered like the clock. One deliberate
    // asymmetry in the reader (RoundTracker): a broadcast already LIVE keeps its lit button
    // whatever this row says — a stream running with no visible control would be the
    // dishonest kind of hidden. Signing in is required at USE time, not here: the row is
    // always offered, and the broadcast dialog explains the account part itself.
    id: 'broadcast',
    setting: 'trackBroadcast',
    group: 'look',
    label: 'trackerTrackBroadcast',
    help: 'trackerHelpBroadcast',
    default: false,
    remember: true,
  },
  {
    // The Log and Stats tabs (owner, 2026-10-14): two of the seven icons on a phone's tab strip,
    // read after a turn rather than during one. This phone's own choice, like the colours.
    id: 'log-stats',
    setting: 'showLogStats',
    group: 'look',
    label: 'trackerShowLogStats',
    help: 'trackerHelpLogStats',
    default: true,
    remember: true,
    local: true,
  },
  {
    // The sides' colours on the game screen: each side's faction accent by default; on, this
    // phone picks either side's colour from a short palette (composables/sideColors.js — the picks
    // are `settings.sideColors`, drawn under the row by TrackOptions). A way of LOOKING at the
    // game, so it is this phone's own, like the army-rule cards. The row draws a preview of both
    // sides under it (`preview`). Replaced the "Faction colours" switch (owner, 2026-09-29):
    // faction colours became the default and the old `factionColors` field means nothing now.
    id: 'custom-colors',
    setting: 'customColors',
    // Its own card on the setup step since 2026-10-02 (owner): the preview under it is two side
    // cards wide, and squeezed into the "What to track" column it read as part of that list.
    group: 'look',
    label: 'trackerTrackCustomColors',
    help: 'trackerHelpCustomColors',
    default: false,
    remember: false,
    local: true,
    preview: 'sideColors',
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
    // Where each unit of the list is — on the battlefield, in Strategic Reserves, destroyed
    // (UnitStatusButton on the list's rows). Its own row, not a modifier family (owner, 2026-10-14).
    id: 'unit-status',
    setting: 'trackUnitStatus',
    group: 'roster',
    label: 'trackerTrackUnitStatus',
    help: 'trackerHelpUnitStatus',
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
    fold: true,
    unavailable: NEEDS_ROSTER,
  },
  {
    // Battle-shock on its own row (owner, 2026-10-10, from Misha's "bureaucracy" note): it is the one
    // unit state the tracker ACTS on — a shocked unit cannot be targeted by its own side's stratagems
    // (Core 01.07), so the CP tab greys it and its ongoing ones end — and the one marked every
    // Command phase. 99 rules in 25 of 36 factions read it, but the app does little with the mark
    // beyond stratagems: on by default only where command points are counted, so stratagems are spent
    // here. Off: no chip, nothing blocked, no rule switched by it.
    id: 'battle-shock',
    setting: 'trackBattleShock',
    group: 'roster',
    label: 'trackerTrackBattleShock',
    help: 'trackerHelpBattleShock',
    default: true,
    defaultWhen: (settings) => tracks(settings, 'trackCP'),
    remember: true,
    requires: 'trackModifiers',
    fold: true,
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
    fold: true,
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
    fold: true,
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
    fold: true,
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
    fold: true,
    unavailable: NEEDS_ROSTER,
  },
]

const BY_SETTING = new Map(TRACK_OPTIONS.map((o) => [o.setting, o]))

// The settings that stay on the phone in a shared game — the `local` rows and their retired names
// (a saved game may still carry the old field, and it must not travel either).
// Plus two fields that are not rows: the colour picks under "Customise colours", and the retired
// "Faction colours" switch still sitting in older games.
export const LOCAL_TRACK_SETTINGS = [
  ...TRACK_OPTIONS.filter((o) => o.local).flatMap((o) => [o.setting, ...(o.legacy ? [o.legacy] : [])]),
  'sideColors', 'factionColors',
].filter((k, i, a) => a.indexOf(k) === i)

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
  return (own ?? old ?? defaultOf(o, settings)) !== false
}
// A row's default, for a game that never set it: fixed, or (`defaultWhen`) read off the game's other
// settings — Battle-shock follows command points.
function defaultOf(o, settings) {
  return o.defaultWhen ? o.defaultWhen(settings || {}) : o.default
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
    out[o.setting] = (own ?? old ?? defaultOf(o, { ...last, ...out })) !== false
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
    out[o.setting] = (own ?? old ?? defaultOf(o, settings)) !== false
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

// Three ready sets over the rows (owner, 2026-10-14), like the print sheet's presets: a preset
// sets every row it names, touching any box keeps everything else and stops calling itself a
// preset (`presetOf` → null, "your own set"). The colours and the broadcast button are left out:
// neither is about how much the tracker does.
const FAMILIES = TRACK_OPTIONS.filter((o) => o.fold).map((o) => o.setting)
const all = (on) => Object.fromEntries(FAMILIES.map((k) => [k, on]))
export const TRACK_PRESETS = [
  {
    id: 'quick',
    label: 'trackerPresetQuick',
    values: { trackCP: true, trackPhases: false, trackPhaseRules: false, trackTurnChecks: false, trackArmyYou: true, trackArmyOpp: false, askStratagems: false, trackModifiers: false, trackUnitStatus: false, showLogStats: false },
  },
  {
    id: 'normal',
    label: 'trackerPresetNormal',
    values: { trackCP: true, trackPhases: false, trackPhaseRules: true, trackTurnChecks: true, trackArmyYou: true, trackArmyOpp: true, askStratagems: true, trackModifiers: true, ...all(true), trackUnitStatus: true, showLogStats: true },
  },
  {
    id: 'full',
    label: 'trackerPresetFull',
    values: { trackCP: true, trackPhases: true, trackPhaseRules: true, trackTurnChecks: true, trackArmyYou: true, trackArmyOpp: true, askStratagems: true, trackModifiers: true, ...all(true), trackUnitStatus: true, showLogStats: true },
  },
]

/** Write a preset onto a settings draft, in place (the callers hold the draft by identity). */
export function applyTrackPreset(settings, id) {
  const p = TRACK_PRESETS.find((x) => x.id === id)
  if (p) Object.assign(settings, p.values)
}

// Which preset the draft is, or null. Only the rows the game can offer are compared — a row a game
// without a list must keep off (normalizeTrackSettings) does not make "Normal" read as a custom set.
export function presetOf(settings, ctx) {
  const now = trackSettingsOf(settings)
  const offered = (k) => { const o = BY_SETTING.get(k); return !o || !ctx || optionEnabled(o, ctx) }
  return TRACK_PRESETS.find((p) => Object.entries(p.values).every(([k, v]) => !offered(k) || now[k] === v))?.id ?? null
}
