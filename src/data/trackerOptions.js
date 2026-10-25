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
//   requires     another row's `setting` this one hangs off (or a list of them, all needed); off
//                there is off here, whatever this row's own value says. Drawn as a child of the
//                first one — and a child of a child is drawn one step further in.
//   local        this PHONE's choice, not the game's: kept out of the shared-game sync
//                (gameSlices.js) and the kind of row a guest may flip in a game another phone
//                hosts. The rule (owner, 2026-10-25): what a phone SHOWS is its own, what the game
//                RECORDS for both is the host's — command points and the clock, which the other
//                phone reads (a guest not counting CP would leave the host a stale balance, a host
//                not keeping phases would leave the guest's reminder stuck on Command), and the
//                broadcast, which is the host's stream. Every other row is local. A local row says
//                nothing on screen, since on one phone "on this phone" is every row.
//   everyPhone   a shared row the host decides FOR every phone (CP, the clock): the host's screen
//                says so in a shared game (TrackOptions `shared`). Not the broadcast — that one is
//                the host's alone, and a guest sees it as "host only" like every shared row.
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
  // CP, and under it playing stratagems, and under that asking for the unit and the cost (owner,
  // 2026-10-17: "CP отдельный чекбокс, дочерний для него стратагемы", the ask moved under them).
  {
    id: 'cp',
    setting: 'trackCP',
    group: 'turn',
    label: 'trackerTrackCp',
    help: 'trackerHelpCp',
    default: true,
    remember: true,
    everyPhone: true,
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
    // Stratagems in the tracker: the CP tab's list and a unit card's stratagem box. Paying for them
    // is the row under it (owner, 2026-10-25). Off: the CP tab is the counter alone.
    id: 'strat-play',
    setting: 'trackStratPlay',
    group: 'turn',
    label: 'trackerTrackStratPlay',
    help: 'trackerHelpStratPlay',
    default: true,
    remember: true,
    local: true,
    requires: 'trackCP',
  },
  {
    // Paying CP for a stratagem: its cost button spends it, the card's box plays it (owner,
    // 2026-10-25, a player's report: shown and paid were one row, and in a game that showed none
    // the only way to spend CP was the pencil). Off: the list is a reference, the card's box a plain
    // mark, and the balance carries − and + (CpBank's `stepper`). On by default: a game saved before
    // the row paid as it did.
    id: 'strat-spend',
    setting: 'stratSpendCp',
    group: 'turn',
    label: 'trackerTrackStratSpend',
    help: 'trackerHelpStratSpend',
    default: true,
    remember: true,
    local: true,
    requires: 'trackStratPlay',
  },
  {
    // Playing a stratagem asks which unit and whether a rule changed its cost (StratPlayModal).
    // Off: the printed cost is spent at one tap, on no unit from the CP tab, on the unit from its
    // card (owner, 2026-10-14). Only where stratagems are played — there is nothing to ask without.
    id: 'strat-ask',
    setting: 'askStratagems',
    group: 'turn',
    label: 'trackerAskStratagems',
    help: 'trackerHelpAskStratagems',
    // Off: a tap spends the printed cost, and the row's ⚙ asks (Mikhail, 2026-10-19).
    default: false,
    remember: true,
    local: true,
    requires: 'stratSpendCp',
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
    everyPhone: true,
  },
  {
    id: 'phase-rules',
    setting: 'trackPhaseRules',
    group: 'turn',
    label: 'trackerTrackPhaseRules',
    help: 'trackerHelpPhaseRules',
    default: true,
    remember: true,
    local: true,
    // No `requires` since 2026-10-08: without the clock the tab lists the whole turn instead.
  },
  {
    // The help around the missions (owner, 2026-10-17: one row for the primary and the secondaries):
    // the check before the turn passes — the conditions on cards nobody is looking at, the other
    // side's "end of your opponent's turn" secondaries, every End of Battle condition on the last
    // turn (TurnEndCheckModal) — and the take dialog opening by itself when a turn starts with
    // tactical secondaries to draw (SecondaryDeck). Off: neither; the take button is still there.
    // The missions themselves are never a row (see the header).
    id: 'missions',
    setting: 'trackMissionAids',
    group: 'turn',
    label: 'trackerTrackMissionAids',
    help: 'trackerHelpMissionAids',
    default: true,
    remember: true,
    local: true,
    legacy: 'trackTurnChecks',
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
    // The Log and the Stats tabs (owner, 2026-10-14): two of the seven icons on a phone's tab strip,
    // read after a turn rather than during one. This phone's own choice, like the colours. One row
    // until 2026-10-25 (`showLogStats`, still read for older games): the owner wanted the log in the
    // Base preset and the stats only in Maximal.
    id: 'log',
    setting: 'showLog',
    group: 'look',
    label: 'trackerShowLog',
    help: 'trackerHelpLog',
    default: true,
    remember: true,
    local: true,
    legacy: 'showLogStats',
  },
  {
    id: 'stats',
    setting: 'showStats',
    group: 'look',
    label: 'trackerShowStats',
    help: 'trackerHelpStats',
    default: true,
    remember: true,
    local: true,
    legacy: 'showLogStats',
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
    local: true,
    unavailable: NEEDS_ROSTER,
  },
  {
    // The unit's states AND where it is — on the battlefield, in Strategic Reserves, destroyed
    // (UnitStatusButton on the list's rows): one row since 2026-10-17 (owner: "это в сущности одно
    // и то же"); "Where each unit is" was a row of its own from 2026-10-14.
    id: 'unit-states',
    setting: 'trackUnitStates',
    group: 'roster',
    label: 'trackerTrackUnitStates',
    help: 'trackerHelpUnitStates',
    default: true,
    remember: true,
    local: true,
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
    local: true,
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
    local: true,
    requires: 'trackModifiers',
    fold: true,
    unavailable: NEEDS_ROSTER,
  },
  {
    // A spent stratagem changing the numbers on a card: needs the modifiers AND stratagems being
    // played — without the play there is nothing spent to change them (owner, 2026-10-17).
    id: 'stratagems',
    setting: 'trackStratagems',
    group: 'roster',
    label: 'trackerTrackStratagems',
    help: 'trackerHelpStratagems',
    default: true,
    remember: true,
    local: true,
    requires: ['trackModifiers', 'trackStratPlay'],
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
    local: true,
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
    local: true,
    requires: 'trackModifiers',
    fold: true,
    unavailable: NEEDS_ROSTER,
  },
]

const BY_SETTING = new Map(TRACK_OPTIONS.map((o) => [o.setting, o]))

/** The rows a row hangs off, as a list (`requires` is one setting or several). */
export function requiresOf(o) {
  return o?.requires ? [].concat(o.requires) : []
}
/** How far in a row is drawn: a child of a child of the rows in its own group. */
export function depthOf(o) {
  const parent = BY_SETTING.get(requiresOf(o)[0])
  return parent && parent.group === o.group ? 1 + depthOf(parent) : 0
}

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
  if (requiresOf(o).some((r) => !tracks(settings, r))) return false
  const own = settings?.[setting]
  const old = o.legacy ? settings?.[o.legacy] : undefined
  return (own ?? old ?? defaultOf(o, settings)) !== false
}
// A row's default, for a game that never set it: fixed, or (`defaultWhen`) read off the game's other
// settings — Battle-shock follows command points.
function defaultOf(o, settings) {
  return o.defaultWhen ? o.defaultWhen(settings || {}) : o.default
}

// A game played before the presets (2.9.7 and older) carries none of the rows 2.10.0 added. Its
// choices were made in a different table, so the first game after the update starts from the
// default preset rather than inheriting them half-filled with row defaults (owner, 2026-10-20).
export function fromBeforePresets(last) {
  return !!last && Object.keys(last).length > 0 && !('trackStratPlay' in last)
}

// The last finished game's settings as the basis of the next one's — none for a game played before
// the presets (fromBeforePresets above).
export function rememberedSettings(last) {
  return fromBeforePresets(last) ? {} : (last ?? {})
}

// The setup wizard's starting values: the last finished game's choice where the row remembers one,
// else the row's default. `last` is that game's settings (or `{}` when there is no history).
// Read through `tracks` per row, so a parent switched off in the last game doesn't drag its
// children's remembered values down with it.
export function defaultTrackSettings(last = {}) {
  // No game behind this one: the default preset, not each row's own default (owner, 2026-10-17 —
  // a row's `default` speaks for games saved before it existed and must not move).
  if (!last || !Object.keys(last).length) {
    const out = {}
    for (const o of TRACK_OPTIONS) out[o.setting] = defaultOf(o, {}) !== false
    return { ...out, ...TRACK_PRESETS.find((p) => p.id === DEFAULT_PRESET).values }
  }
  const out = {}
  for (const o of TRACK_OPTIONS) {
    const own = o.remember ? last?.[o.setting] : undefined
    const old = o.remember && o.legacy ? last?.[o.legacy] : undefined
    out[o.setting] = (own ?? old ?? defaultOf(o, { ...last, ...out })) !== false
  }
  return out
}

// A guest's own rows on joining someone else's game: what this phone chose last time, as the host's
// wizard starts from the host's last game. The shared slice carries none of them (gameSlices), so
// without this a guest started every game from the rows' defaults.
export function localTrackSeed(last) {
  const all = defaultTrackSettings(rememberedSettings(last))
  return Object.fromEntries(TRACK_OPTIONS.filter((o) => o.local).map((o) => [o.setting, all[o.setting]]))
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

// Three presets over the rows (owner, 2026-10-17; ready sets since 2026-10-14). A preset sets every
// row it names; touching any box keeps everything else and stops calling itself a preset
// (`presetOf` → null, "your own set"). Not named, by decision: the colours and the broadcast
// button — how the screen looks, not how much the tracker does.
//   minimal  nothing: the score and the missions, which are the game
//   base     the default: CP without stratagems, the mission help, the army-rule counters, the
//            modifiers without a single family under them, and the Log tab (owner, 2026-10-25:
//            the log is how a game is put right afterwards; the Stats tab is Maximal's)
//   maximal  everything
const PRESET_ROWS = TRACK_OPTIONS.filter((o) => o.group !== 'look' || o.id === 'log' || o.id === 'stats').map((o) => o.setting)
const every = (on) => Object.fromEntries(PRESET_ROWS.map((k) => [k, on]))
export const TRACK_PRESETS = [
  {
    id: 'minimal',
    label: 'trackerPresetMinimal',
    blurb: 'trackerPresetMinimalBlurb',
    values: every(false),
  },
  {
    id: 'base',
    label: 'trackerPresetBase',
    blurb: 'trackerPresetBaseBlurb',
    values: { ...every(false), trackCP: true, trackMissionAids: true, trackArmyYou: true, trackArmyOpp: true, trackModifiers: true, showLog: true },
  },
  {
    id: 'maximal',
    label: 'trackerPresetMaximal',
    blurb: 'trackerPresetMaximalBlurb',
    values: every(true),
  },
]
export const DEFAULT_PRESET = 'base'

// A guest's presets set and read only its own rows: the shared ones are the host's (`local`).
const presetRows = (p, localOnly) => Object.entries(p.values).filter(([k]) => !localOnly || BY_SETTING.get(k)?.local)

/** Write a preset onto a settings draft, in place (the callers hold the draft by identity). */
export function applyTrackPreset(settings, id, { localOnly = false } = {}) {
  const p = TRACK_PRESETS.find((x) => x.id === id)
  if (p) Object.assign(settings, Object.fromEntries(presetRows(p, localOnly)))
}

// Which preset the draft is, or null. Only the rows the game can offer are compared — a row a game
// without a list must keep off (normalizeTrackSettings) does not make "Normal" read as a custom set.
export function presetOf(settings, ctx, { localOnly = false } = {}) {
  const now = trackSettingsOf(settings)
  const offered = (k) => { const o = BY_SETTING.get(k); return !o || !ctx || optionEnabled(o, ctx) }
  return TRACK_PRESETS.find((p) => presetRows(p, localOnly).every(([k, v]) => !offered(k) || now[k] === v))?.id ?? null
}
