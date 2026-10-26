// @ts-check
// What is true RIGHT NOW, at the table — the half of a conditional modifier the data cannot know.
// Pure: no Vue, no store (the game object is passed in), same discipline as rosterEngine.js.
//
// Each condition id (src/data/rosterModifiers/conditions.js) is answered from exactly ONE source,
// never a mixture:
//   auto    the tracker already knows, because the player told it elsewhere (a called Waaagh!)
//   roster  the army list already says so (a Leader is attached to a unit)
//   switch  nothing can know it, so the player flips it — army-wide or on one unit
//   negation  the ordinary state a rule names only to say when it stops (`negates` in the
//           vocabulary): true unless the state it negates is, from whatever answers THAT
// A condition with an auto reader is NOT hand-switchable: two sources for one fact is how a card
// ends up disagreeing with the tracker card next to it. To take a Waaagh! back you take it back
// in the tracker.
//
// THE CLOCK. A switch records WHEN it was flipped, and anything whose rule says it lasts less
// than the whole battle stops being true once that moment has passed. The moment is a single
// monotonic stamp — `round*100 + turn*10 + phase` — so every duration is one comparison: `phase`
// wants the same stamp, `turn` the same round and turn, `round` the same round, `battle` anything.
//
// A game that isn't keeping phases (settings.trackPhases off, which is the default) has no turn or
// phase to record, so its stamps are round-only and every duration degrades to the round boundary
// — exactly what this file did before the clock existed. Games saved back then stored the bare
// round number, which a stamp can never collide with (the smallest real stamp is 100), so those
// values are recognised and read as rounds. Erring towards clearing EARLY is deliberate either
// way: a switch that has gone stale would silently rewrite a number.

import { conditions, groupLimitOf, WHOLE_GROUPS } from '../data/rosterModifiers/conditions.js'
import { SM_FAMILY } from '../data/smChapters.js'
import { tracks } from '../data/trackerOptions.js'
import { BATTLE_PHASES, usableInSlot } from '../core/rules/stratagemPhases.js'
import { unitKeywordsOf } from './ruleTargets.js'
import { foldName } from '../core/shared/foldName.js'

/** @typedef {import('../core/shared/roster.types.js').GameClock} GameClock */
/** @typedef {import('../core/shared/roster.types.js').Condition} Condition */
/** @typedef {import('../core/shared/roster.types.js').GameState} GameState */
/** @typedef {import('../core/shared/roster.types.js').GamePlayer} GamePlayer */
/** @typedef {import('../core/shared/roster.types.js').Stamp} Stamp */
/** @typedef {import('../core/shared/roster.types.js').StampStore} StampStore */
/** @typedef {import('../core/shared/roster.types.js').CondSwitch} CondSwitch */
/** @typedef {import('../core/shared/roster.types.js').AuraReach} AuraReach */
/** @typedef {import('../core/shared/roster.types.js').RosterEntry} RosterEntry */
/** The entry a card is drawn for — read for its uid, id and leaderOf only. @typedef {Partial<RosterEntry>} EntryLike */
/** @typedef {import('../core/shared/roster.types.js').ModifierRecord} ModifierRecord */
/** @typedef {import('../core/shared/roster.types.js').ModEntry} ModEntry */
/** @typedef {import('../core/shared/roster.types.js').SheetOf} SheetOf */
/** A group's size for one unit, where a rule raises it above the group's own: `{ order: 2 }`. @typedef {Record<string, number>} GroupLimits */
/** A clock, or the bare round number a game saved before the clock existed stores. @typedef {GameClock | number | null | undefined} ClockLike */

// ── The clock ─────────────────────────────────────────────────────────────────────────────────
// What the game is standing on, from the point of view of ONE player: which battle round, whose
// turn it is (`mine`), which phase, and whether the game is keeping phases at all. Built once by
// the caller and passed down, rather than each function digging into the game object.
/**
 * @param {GameState | null | undefined} game
 * @param {number} [pi] the player whose side the clock is read from
 * @returns {GameClock}
 */
export function clockOf(game, pi = 0) {
  const tracked = tracks(game?.settings, 'trackPhases')
  return {
    round: game?.currentRound || 1,
    turn: game?.currentTurn === 1 ? 1 : 0,
    phase: game?.currentPhase || BATTLE_PHASES[0],
    mine: (game?.currentTurn === 1 ? 1 : 0) === pi,
    tracked,
    // Whether this game keeps Battle-shock (trackerOptions' battle-shock row): off, the state is
    // not consulted at all — no stratagem blocked, no rule switched by it.
    shock: tracks(game?.settings, 'trackBattleShock'),
  }
}
// Battle-shock's own two conditions, answered by the battle-shock row rather than the unit states'.
const SHOCK_IDS = new Set(['unit-battle-shocked', 'unit-not-battle-shocked'])
/** @param {string} id */
export const isShockCondition = (id) => SHOCK_IDS.has(id)

// A moment, as one number. Phases are numbered from 1 so that an untracked game (stamp
// `round*100`) can never be mistaken for one standing in a phase.
/** @param {ClockLike} clock @returns {Stamp} */
export function stampOf(clock) {
  const c = normaliseClock(clock)
  if (!c.tracked) return c.round * 100
  return c.round * 100 + c.turn * 10 + (BATTLE_PHASES.indexOf(c.phase) + 1 || 1)
}

// Tolerate a bare round number where a clock is expected — that is what a game saved before the
// clock existed hands us, and what the older tests pass.
/** @param {ClockLike} clock @returns {GameClock} */
function normaliseClock(clock) {
  if (typeof clock === 'number') return { round: clock, turn: 0, phase: BATTLE_PHASES[0], mine: true, tracked: false }
  return clock || { round: 1, turn: 0, phase: BATTLE_PHASES[0], mine: true, tracked: false }
}

// A stored value from before stamps existed is a bare round number (1..5); a stamp is ≥ 100.
/** @param {Stamp} at */
const isLegacy = (at) => at < 100
/** @param {Stamp} at */
const roundOfStamp = (at) => (isLegacy(at) ? at : Math.floor(at / 100))
/** @param {Stamp} at */
const turnOfStamp = (at) => Math.floor(at / 10)

// Conditions read from the game rather than asked about. Keyed by condition id; each reader gets
// the player object and the current battle round.
//
// EVERY reader checks the faction first. The army-rule specs are built from a handful of shared
// PRIMITIVES (`toggle`, `selection`, `counter`…), so `army.toggleRounds` means "the Waaagh! was
// called" for Orks and something else entirely for the next faction that gets a toggle spec.
// Reading the primitive without the faction would be reading someone else's mail.
//
// Adding to this map is a per-faction job: the spec has to actually record the same thing the
// condition asks about, which most do not — Drukhari's tracker counts Pain tokens, not which
// Combat Drug is running, and the Sororitas one banks Miracle dice and says nothing about which
// unit is Righteous. Those stay switches.
/** A condition the tracker answers from the player's army-rule state this round. @typedef {(player: GamePlayer | null | undefined, round: number) => boolean} AutoReader */
/** @type {Record<string, AutoReader>} */
const AUTO = {
  // Adeptus Mechanicus — a per-round `selection` whose option ids are the Imperatives themselves.
  'imperative-protector': (player, round) => player?.factionSlug === 'adeptus-mechanicus'
    && player?.army?.selectionByRound?.[round] === 'protector',
  'imperative-conqueror': (player, round) => player?.factionSlug === 'adeptus-mechanicus'
    && player?.army?.selectionByRound?.[round] === 'conqueror',
  // World Eaters — a `multi` spec: up to two Blessings of Khorne are active each round, stored as
  // that round's array of option ids. Two of the six carry a modifier, so only those two are in the
  // condition vocabulary; the tracker already knows which are up, and asking again on the card
  // would be a second source for one fact.
  'blessing-martial-excellence': (player, round) => player?.factionSlug === 'world-eaters'
    && (player?.army?.multiByRound?.[round] || []).includes('martial-excellence'),
  'blessing-warp-blades': (player, round) => player?.factionSlug === 'world-eaters'
    && (player?.army?.multiByRound?.[round] || []).includes('warp-blades'),
}

/** @param {string} id */
export const isAuto = (id) => Object.hasOwn(AUTO, id)

// Conditions the tracker can prove ON but whose OFF proves nothing, so the hand switch has to stay
// alongside. One so far: Codex: Orks replaced the army-wide Waaagh! window with the per-unit `riled
// up` state, and the War Cry the tracker records is only one of THIRTY-TWO rules that grant it —
// detachment rules, stratagems, enhancements and a long tail of datasheet abilities, each riling
// one unit at a time. So the War Cry turns it on for everybody while its window is open, and the
// unit's own switch answers the rest. (Plain AUTO would have been wrong in both directions: it
// would have taken the switch away, and read "no War Cry" as "nothing is riled up".)
/** @type {Record<string, AutoReader>} */
const SOFT_AUTO = {
  'riled-up': (player, round) => player?.factionSlug === 'orks'
    && (player?.army?.toggleRounds || []).includes(round),
  // Combat Doctrines — the army's pick of the round turns the doctrine on for every unit; a unit made
  // subject to a different one keeps its own switch (see conditions.js). Codex: Space Marines and
  // all five Codex Supplements share the army rule (app data 963), so every one of them reads it.
  ...Object.fromEntries(['assault', 'devastator', 'tactical'].filter((d) => conditions[`doctrine-${d}`])
    .map((d) => [`doctrine-${d}`,
      (player, round) => !!player?.factionSlug && SM_FAMILY.has(player.factionSlug) && player?.army?.selectionByRound?.[round] === d])),
}

// …and two datasheets answer it outright, with no trigger and no window: the Stompa's Waaagh!
// Effigy and Zodgrod Wortsnagga's Super Runts both read, flatly, "This unit is riled up." Those
// two are riled up from deployment to the end of the battle, so their chip is on and is not the
// player's to flip — asking would be asking them to confirm what their own datasheet prints.
// Guarded by a test that scans every Orks datasheet for the phrase, so a third one cannot appear
// in a later codex and quietly go unread.
/** @type {Record<string, Set<string>>} */
const ENTRY_PROVES = { 'riled-up': new Set(['stompa', 'zodgrod-wortsnagga']) }
/** @param {string} id @param {EntryLike | null | undefined} entry */
const entryProves = (id, entry) => !!(entry?.id && ENTRY_PROVES[id]?.has(entry.id))

// …and the unit's place on the table answers two more (owner, 2026-10-21): a unit the tracker saw
// come out of Strategic Reserves THIS turn (unitStatus.js keeps the round and turn of the move)
// arrived from Reserves, and so was set up on the battlefield this turn. Before, the player marked
// the arrival on the unit's status and then again on its card, or Fire Zone Purge's +1 to hit never
// came. A disembark is not tracked (there is no transport state), so "set up" after one stays the
// player's switch.
const ARRIVAL_IDS = new Set(['unit-arrived-from-reserves', 'unit-set-up-this-turn'])
/** @param {string} id @param {any} player @param {EntryLike | null | undefined} entry @param {ClockLike} clock */
export function statusProves(id, player, entry, clock) {
  if (!ARRIVAL_IDS.has(id) || !entry?.uid) return false
  const rec = player?.unitStatus?.[entry.uid]
  const c = normaliseClock(clock)
  return rec?.s === 'table' && rec.round === c.round && rec.turn === (c.turn ?? 0)
}

// Is a switch still in force? Compared at the granularity its own rule states — except against a
// legacy round-only value (or in a game not keeping phases), where the round is all either side
// knows and a shorter duration can only be answered as coarsely as that.
/** @param {StampStore | undefined} store @param {string} id @param {ClockLike} clock */
function switchOn(store, id, clock) {
  const at = store?.[id]
  if (at == null) return false
  const c = conditions[id]
  if (!c) return false
  return stampHolds(at, c.duration, clock)
}

// Is a stamp still inside the window a duration gives it? Shared by switches and by stratagems,
// which expire the same way for the same reason.
/** @param {Stamp | null | undefined} at @param {string | undefined} duration @param {ClockLike} clock */
function stampHolds(at, duration, clock) {
  if (at == null) return false
  if (duration === 'battle') return true
  const now = stampOf(clock)
  const coarse = isLegacy(at) || !normaliseClock(clock).tracked
  if (duration === 'phase' && !coarse) return at === now
  if (duration === 'turn' && !coarse) return turnOfStamp(at) === turnOfStamp(now)
  return roundOfStamp(at) === roundOfStamp(now)
}

// Answered by the list itself: a Leader entry records the unit it is attached to, so asking the
// player would be asking them to repeat themselves. `units` is the roster's entries — `unit-led`
// has to look the other way along the link, for a Leader pointing at THIS entry.
/** @param {string} id @param {EntryLike | null | undefined} entry @param {RosterEntry[] | null | undefined} units @param {SheetOf | null} [sheetOf] */
function rosterAnswers(id, entry, units, sheetOf = null) {
  if (id === 'unit-leading') return !!entry?.leaderOf
  if (id === 'unit-led') return !!entry?.leaderOf || (!!entry?.uid && (units || []).some((u) => u.leaderOf === entry.uid))
  if (id === 'unit-warlord') return !!entry?.warlord
  const c = conditions[id]
  // The allegiance the entry picked is stored on it — nothing to look up.
  if (c?.alleg) return !!entry?.alleg && foldName(entry.alleg) === foldName(c.alleg)
  // The rest read the printed sheets of the OTHER entries — the Bodyguard's keywords, the
  // Warlord's — so without a lookup they stay unanswered rather than guessed.
  if (!sheetOf || !entry) return false
  const list = units || []
  /** @param {string | undefined} unitId */
  const kwsOf = (unitId) => new Set((unitId ? unitKeywordsOf(sheetOf(unitId)) : []).map((k) => foldName(k)))
  if (c.warlord) {
    const w = list.find((u) => u.warlord)
    const kws = kwsOf(w?.id)
    return !!w && c.warlord.every((k) => kws.has(foldName(k)))
  }
  if (c.self) {
    const kws = kwsOf(entry.id)
    return c.self.some((k) => kws.has(foldName(k)))
  }
  if (!c.bodyguard && !c.bodyguardCore && !c.attachedCharacter) return false
  // The attached unit this entry is in: the Bodyguard it leads (or itself), and every Leader on it.
  const host = entry.leaderOf ? list.find((u) => u.uid === entry.leaderOf) : entry
  const leaders = host?.uid ? list.filter((u) => u.leaderOf === host.uid) : []
  if (!host || !leaders.length) return false
  if (c.bodyguard) {
    const kws = kwsOf(host.id)
    return c.bodyguard.some((k) => kws.has(foldName(k)))
  }
  if (c.bodyguardCore) {
    const want = foldName(c.bodyguardCore)
    return String(sheetOf(host.id || '')?.core || '').split(',').some((a) => foldName(a.trim()).startsWith(want))
  }
  return [host, ...leaders].some((u) => u.uid !== entry.uid && kwsOf(u.id).has('character'))
}

// Does the tracker's own clock say this condition holds? Two kinds. A `rounds` window needs no
// phases — every game knows its battle round — so it answers always. A phase needs a game keeping
// them, and a `side: 'own'` one ("your Shooting phase") additionally wants the turn to belong to
// the player whose card is being drawn; an ownerless one (the Fight phase) is true in both turns.
/** @param {Condition} c @param {ClockLike} clock */
function clockHolds(c, clock) {
  const k = normaliseClock(clock)
  if (c.rounds) return c.rounds.includes(k.round)
  if (!k.tracked || k.phase !== c.phase) return false
  return c.side === 'any' || k.mine
}

// Every condition currently true for one roster entry. `player` is the tracker's player object,
// `clock` what the game is standing on (clockOf(); a bare round number still works), `entry` the
// roster line the card is being drawn for.
//
// `opts.units` is the roster's entries, for the conditions the list answers across an attachment.
// `opts` also says which families of hand-flipped switch this game is keeping (settings.trackArmyStates
// / trackUnitStates — see src/data/trackerOptions.js). A family switched off stops being CONSULTED;
// what the player flipped stays in the game untouched, and the effects that hung on it fall back to
// being listed with their condition, which is the same honest degradation a game without phases
// has. The other three sources are never gated: `auto` (the tracker already knows), `clock` and
// `roster` cost the player nothing to maintain, so there is nothing to switch off.
/**
 * @param {GamePlayer | null | undefined} player
 * @param {ClockLike} clock
 * @param {EntryLike | null | undefined} entry
 * @param {{ units?: RosterEntry[] | null, sheetOf?: SheetOf | null, army?: boolean, unit?: boolean, shock?: boolean, groupLimits?: GroupLimits, proves?: Set<string>, forbids?: Set<string> }} [opts]
 *   `proves` / `forbids`: what the unit's own rules settle (doctrineRules.js's unitDoctrines) — on
 *   whatever the switches say, and never on whatever they say
 * @returns {Set<string>}
 */
export function activeConditions(player, clock, entry, opts = {}) {
  const army = opts.army !== false
  const unit = opts.unit !== false
  const shock = opts.shock ?? (clock && typeof clock === 'object' ? clock.shock !== false : true)
  const round = normaliseClock(clock).round
  const out = new Set()
  for (const [id, c] of Object.entries(conditions)) {
    if (c.negates) continue   // answered from the rest, below
    let on = false
    if (c.scope === 'clock') on = clockHolds(c, clock)
    else if (isAuto(id)) on = AUTO[id](player, round)
    else if (c.scope === 'roster') on = rosterAnswers(id, entry, opts.units, opts.sheetOf)
    else if (c.scope === 'army') on = army && switchOn(player?.ctx?.army, id, clock)
    else if (entry?.uid) on = (SHOCK_IDS.has(id) ? shock : unit) && switchOn(player?.ctx?.units?.[entry.uid], id, clock)
    // …and a soft-auto condition is also on while the tracker — or the entry's own datasheet —
    // can prove it, switch or no switch.
    if (!on && SOFT_AUTO[id]) on = SOFT_AUTO[id](player, round) || entryProves(id, entry)
    if (!on && unit && statusProves(id, player, entry, clock)) on = true
    // …and a state the unit's own rules make permanent is on, switch or no switch (Calgar's
    // Codex Adept: all three doctrines) — and one they forbid is off whatever turned it on
    // (Death Company: "regardless of any other rules", the army's pick included).
    if (opts.proves?.has(id)) on = true
    if (opts.forbids?.has(id)) on = false
    if (on) out.add(id)
  }
  // The ordinary state holds unless its opposite does. A game not keeping unit states cannot
  // record the opposite, so there the ordinary state simply stays — the same "says less, never
  // lies" degradation as everywhere else here, and the same answer the list gives off the table.
  for (const [id, c] of Object.entries(conditions)) {
    if (c.negates && !out.has(c.negates)) out.add(id)
  }
  capGroups(out, player, entry, opts.groupLimits, opts.proves)
  return out
}

// The conditions a ROSTER can answer on its own, with no game anywhere: `unit-leading` and
// `unit-led`, because the list itself records which entry is attached to which. Used off the
// table (the roster builder, a list being read before the game), where an enhancement that reads
// "while the bearer is leading a unit" is as true as any printed number and should be applied,
// not footnoted. Deliberately NOT activeConditions() with an empty player: that would also answer
// the clock-scoped conditions, and a null clock reads as round 1 — "during battle rounds 1-3"
// would switch itself on in a list nobody is playing yet.
//
// An ordinary state (`negates`) is answered here too: nothing has happened to a list nobody is
// playing, so "while not Battle-shocked" is as true as the printed number.
/**
 * @param {EntryLike | null | undefined} entry
 * @param {RosterEntry[] | null} [units]
 * @param {SheetOf | null} [sheetOf] the printed sheets, for the conditions that read another entry's keywords
 * @param {Set<string> | null} [proves] states the unit's own rules make permanent (unitDoctrines)
 * @returns {Set<string>}
 */
export function rosterConditions(entry, units = null, sheetOf = null, proves = null) {
  const out = new Set()
  for (const [id, c] of Object.entries(conditions)) {
    if (c.scope === 'roster' && rosterAnswers(id, entry, units, sheetOf)) out.add(id)
  }
  // What the unit's own rules make permanent holds off the table too: Calgar's unit has all three
  // doctrines in the list as much as in the game.
  for (const id of proves || []) out.add(id)
  // An ordinary state holds unless its opposite does — off the table nothing has happened, so only
  // a state the list itself answers can be its opposite.
  for (const [id, c] of Object.entries(conditions)) {
    if (c.negates && !out.has(c.negates)) out.add(id)
  }
  return out
}

// A group can hold only so many at once (conditions.js's GROUP_LIMITS). useTracker enforces that on
// write, so a game played on this build never over-fills one — but a game SAVED before the cap
// existed can hold all six of Creations of Bile's augmentations, each rewriting a stat. Reading is
// where that has to be caught, so the cap is applied here too and the newest switches win, the same
// ones the store would have kept. Nothing is deleted: the game's own record stays as it was played.
/**
 * @param {Set<string>} out
 * @param {GamePlayer | null | undefined} player
 * @param {EntryLike | null | undefined} entry
 * @param {GroupLimits} [limits] this unit's own sizes, where a rule raises one (groupLimitsFor)
 * @param {Set<string>} [proves] states the unit's rules hold on — they are never the ones dropped
 */
function capGroups(out, player, entry, limits, proves) {
  /** @type {Map<string, string[]>} */
  const byGroup = new Map()
  for (const id of out) {
    const group = conditions[id]?.group
    if (!group) continue
    let ids = byGroup.get(group)
    if (!ids) byGroup.set(group, (ids = []))
    ids.push(id)
  }
  for (const [group, ids] of byGroup) {
    const limit = limits?.[group] ?? groupLimitOf(group)
    if (ids.length <= limit) continue
    /** @param {string} id */
    const stampFor = (id) => (proves?.has(id) ? Infinity : conditions[id].scope === 'army'
      ? player?.ctx?.army?.[id]
      : entry?.uid ? player?.ctx?.units?.[entry.uid]?.[id] : undefined) ?? 0
    // Oldest first, then drop from the front until the group fits. Ids came out of `out` in
    // dictionary order, which is the same tie-break the store uses for switches sharing a stamp.
    const ordered = ids.map((id, i) => ({ id, at: stampFor(id), i }))
      .sort((a, b) => a.at - b.at || a.i - b.i)
    for (const o of ordered.slice(0, ids.length - limit)) out.delete(o.id)
  }
}

// ── Stratagems ────────────────────────────────────────────────────────────────────────────────
// A stratagem is not a state of the battle, it is something SPENT: on one unit, for a stated
// window, once the player decides to. So it is not in the condition vocabulary at all — the record
// itself is the condition, and what is stored is which records are in force on which entry
// (`player.ctx.strats[uid][sid]` = the clock stamp it was spent at).
//
// The window comes from the record's own `dur`, read from the stratagem's prose in the same review
// pass that wrote its effects — "until the end of the phase" is the common one, "until the end of
// the turn" next, and a handful last the battle. Expiry is the same single comparison a switch
// uses, so a stratagem spent in the Shooting phase stops rewriting the card in the Fight phase
// without anyone having to remember to turn it off.
/**
 * @param {GamePlayer | null | undefined} player
 * @param {ClockLike} clock
 * @param {EntryLike | null | undefined} entry
 * @param {ModEntry[] | null | undefined} records
 * @returns {Set<string>}
 */
export function activeStratagems(player, clock, entry, records) {
  const out = new Set()
  const store = entry?.uid ? player?.ctx?.strats?.[entry.uid] : null
  if (!store) return out
  const byId = new Map((records || []).map((r) => [r.sid, r]))
  for (const [sid, at] of Object.entries(store)) {
    const rec = byId.get(sid)
    if (!rec) continue
    if (stampHolds(at, rec.dur || 'phase', clock)) out.add(sid)
  }
  return out
}

// ── Once per battle ───────────────────────────────────────────────────────────────────────────
// "Once per battle, when this unit is selected to fight, you can use this ability. If you do…" —
// 70 rules across the game (Finest Hour, Moment Shackle, Watcher in the Dark, Plasmacyte…). Like a
// stratagem it is SPENT: the record is its own condition, and what is stored is when it was used
// (`player.ctx.uses[uid][sid]` = the clock stamp). Unlike a stratagem the stamp stays after its
// window closes, because "already used" is half of what the player needs from it — the effect
// stops rewriting the card at the end of the window the rule gives it, and the chip goes on
// saying it was used. The window and who it is counted for travel on the effect (`once: { per, dur }`):
// `per: 'army'` ("Once per battle, per army") means a use on any unit spends it for every other.
/** @param {ModEntry | ModifierRecord} rec */
const onceOf = (rec) => (rec.effects || []).find((e) => e.once)?.once || null
/** @param {ModEntry | ModifierRecord} rec */
export const isOnceRule = (rec) => !!onceOf(rec)

// The entries one use is shared by: a Character's "this unit" ability lands on the unit he leads
// too (19.04), so Finest Hour ticked on the Captain's card is in force on the Intercessors' card,
// and the other way round. This entry, the Bodyguard it leads or is, and every Leader on that.
/** @param {EntryLike | null | undefined} entry @param {RosterEntry[] | null | undefined} units @returns {string[]} */
export function attachedUids(entry, units) {
  if (!entry?.uid) return []
  const host = entry.leaderOf || entry.uid
  const out = new Set([entry.uid, host])
  for (const u of units || []) if (u.leaderOf === host && u.uid) out.add(u.uid)
  return [...out]
}

// When a record was used on this entry's attached unit, if it was.
/** @param {GamePlayer | null | undefined} player @param {string[]} uids @param {string} sid */
const usedAt = (player, uids, sid) => {
  for (const uid of uids) {
    const at = player?.ctx?.uses?.[uid]?.[sid]
    if (at != null) return at
  }
  return undefined
}

/**
 * The once-per-battle records whose effect is in force on this entry right now.
 * @param {GamePlayer | null | undefined} player
 * @param {ClockLike} clock
 * @param {EntryLike | null | undefined} entry
 * @param {(ModEntry | ModifierRecord)[] | null | undefined} records
 * @param {RosterEntry[] | null} [units] the roster's entries, for the attached unit a use is shared by
 * @returns {Set<string>}
 */
export function activeUses(player, clock, entry, records, units = null) {
  const out = new Set()
  const uids = attachedUids(entry, units)
  if (!uids.length || !player?.ctx?.uses) return out
  for (const rec of records || []) {
    const once = onceOf(rec)
    if (once && stampHolds(usedAt(player, uids, rec.sid), once.dur, clock)) out.add(rec.sid)
  }
  return out
}

// The chips: one per once-per-battle record that bears on this card. Ticked = used in this battle;
// `live` says whether its effect is still running. A use is always taken back by the same chip — a
// mis-tap has to be undoable — and a per-army one used on ANOTHER unit is blocked, not hidden:
// "where did Moment Shackle go" is the question it would otherwise raise.
/**
 * @param {(ModEntry | ModifierRecord)[] | null | undefined} records
 * @param {GamePlayer | null | undefined} player
 * @param {ClockLike} clock
 * @param {EntryLike | null | undefined} entry
 * @param {RosterEntry[] | null} [units] the roster's entries, for the attached unit a use is shared by
 * @returns {CondSwitch[]}
 */
export function usesFor(records, player, clock, entry, units = null) {
  const uses = player?.ctx?.uses || {}
  const uids = attachedUids(entry, units)
  const live = activeUses(player, clock, entry, records, units)
  const seen = new Set()
  return (records || []).flatMap((rec) => {
    const once = onceOf(rec)
    if (!once || seen.has(rec.sid)) return []
    seen.add(rec.sid)
    const used = usedAt(player, uids, rec.sid) != null
    const elsewhere = !used && once.per === 'army'
      && Object.entries(uses).some(([uid, store]) => !uids.includes(uid) && store?.[rec.sid] != null)
    const at = rec.name.indexOf(': ')
    const name = at === -1 ? rec.name : rec.name.slice(at + 2)
    return [{
      id: rec.sid,
      // "Captain: Finest Hour (Once per battle, per unit)" → "Finest Hour": the chip sits under a
      // heading that already says once per battle, and on the card that already names the unit.
      label: { en: name.replace(/\s*\(once per battle[^)]*\)/i, ''), ru: name.replace(/\s*\(once per battle[^)]*\)/i, '') },
      on: used,
      live: live.has(rec.sid),
      spent: used && !live.has(rec.sid),
      auto: false,
      blocked: elsewhere,
      blockedBy: elsewhere ? 'usedArmy' : null,
      duration: once.dur,
      once: once.per,
      // The card the rule is printed on and its full name there, for the view to put the RU name
      // and the rule's text on the chip (it holds the sheets; this layer does not).
      unit: rec.ref && 'unit' in rec.ref ? rec.ref.unit || null : null,
      ability: name,
    }]
  })
}

// WHICH OPTION OF AN ABILITY SET IS UP — the same shape as a spent stratagem: keyed by the option
// record's sid, stamped when it was picked, and lasting the battle round the set's own wording
// gives it ("until the start of the next battle round this model has those abilities"). Every set
// in the game is worded that way, so the window is not per-record.
/** @param {GamePlayer | null | undefined} player @param {ClockLike} clock @param {EntryLike | null | undefined} entry @returns {Set<string>} */
export function activePicks(player, clock, entry) {
  const out = new Set()
  const store = entry?.uid ? player?.ctx?.picks?.[entry.uid] : null
  if (!store) return out
  for (const [sid, at] of Object.entries(store)) {
    if (stampHolds(at, 'round', clock)) out.add(sid)
  }
  return out
}

// Every option picked anywhere in this army, whichever model picked it. An ability set belongs to a
// named character — 15 of the 16 in the game are on a unique model — so "the Fiery Heart is up"
// is effectively an army-wide fact, and the modifiers it feeds land on OTHER units (its aura), whose
// own `ctx.picks` know nothing about it. The one non-unique exception is the Drukhari Raider, where
// two of them would share one choice; that is the price of not threading the source entry through
// every apply pass, and it is written down rather than hidden.
/** @param {GamePlayer | null | undefined} player @param {ClockLike} clock @returns {Set<string>} */
export function allPicks(player, clock) {
  const out = new Set()
  for (const store of Object.values(player?.ctx?.picks || {})) {
    for (const [sid, at] of Object.entries(store)) {
      if (stampHolds(at, 'round', clock)) out.add(sid)
    }
  }
  return out
}

// The chips for the sets this entry's own card prints: one per option, grouped by set, with the
// set's size on the group so the tally reads "2 of 6" rather than "2 of the two we modelled".
// An option that changes no number is a chip all the same — a set showing two of its six options
// is a tally nobody can read, and the point of these chips is following the choice.
// `records` are the RAW option records (rosterModifiers' pickEntries), not resolved ones: an option
// that changes no number carries no effects and so never reaches the resolver — and those are
// exactly the ones a tally needs.
/**
 * @param {ModifierRecord[] | null | undefined} records
 * @param {GamePlayer | null | undefined} player
 * @param {ClockLike} clock
 * @param {EntryLike | null | undefined} entry
 * @returns {CondSwitch[]}
 */
export function pickSwitchesFor(records, player, clock, entry) {
  const on = activePicks(player, clock, entry)
  // Only an ability record can belong to a set.
  return (records || []).flatMap((rec) => {
    const ref = rec.ref
    if (ref?.kind !== 'ability' || !ref.set || ref.unit !== entry?.id) return []
    const at = rec.name.indexOf(': ')
    return [{
      id: rec.sid,
      // The record is named "<unit>: <ability>"; the chip shows the ability, and the view swaps
      // in the RU card's own name for it.
      label: { en: at === -1 ? rec.name : rec.name.slice(at + 2), ru: at === -1 ? rec.name : rec.name.slice(at + 2) },
      on: on.has(rec.sid),
      auto: false,
      pick: true,
      group: `set:${ref.set}`,
      groupLimit: ref.pickLimit || 1,
      from: {
        owner: at === -1 ? null : rec.name.slice(0, at),
        ability: at === -1 ? rec.name : rec.name.slice(at + 2),
        set: ref.set,
        unit: ref.unit,
      },
    }]
  })
}

// The auras the player says are reaching this unit right now, as a set of record ids. The window is
// a BATTLE ROUND: what makes an aura start or stop applying is movement, and re-confirming every
// phase would be a tap per unit per phase for a fact that rarely changes inside one round. Erring
// early, as everywhere else here — a mark that has gone stale would quietly rewrite a number.
/** @param {GamePlayer | null | undefined} player @param {ClockLike} clock @param {EntryLike | null | undefined} entry @returns {Set<string>} */
export function activeAuras(player, clock, entry) {
  const out = new Set()
  const store = entry?.uid ? player?.ctx?.auras?.[entry.uid] : null
  if (!store) return out
  for (const [sid, at] of Object.entries(store)) {
    if (stampHolds(at, 'round', clock)) out.add(sid)
  }
  return out
}

// The chips: one per aura that could reach this unit (rosterStatMods' aurasReaching decides which),
// each saying where it radiates from, and whether the player has marked it. Same shape as the
// condition and stratagem switches, so they render in the same strip on the unit's row.
/**
 * @param {AuraReach[] | null | undefined} reaching
 * @param {GamePlayer | null | undefined} player
 * @param {ClockLike} clock
 * @param {EntryLike | null | undefined} entry
 * @returns {CondSwitch[]}
 */
export function auraSwitchesFor(reaching, player, clock, entry) {
  const on = activeAuras(player, clock, entry)
  return (reaching || []).map((a) => ({
    id: a.sid,
    // The UNIT's name stays English by project convention; the ABILITY has a translation on its own
    // card (the RU overlay), and a chip that names it in English while the card names it in Russian
    // is one more thing for the reader to match up. `nameRu` is the caller's to supply.
    label: { en: `${a.source} · ${a.name}`, ru: `${a.source} · ${a.nameRu || a.name}` },
    on: on.has(a.sid),
    auto: false,
    aura: true,
    // The rule behind the chip, for its "i" — an aura is printed on a card the reader is not
    // looking at. The caller supplies it (only it has the sheets), and null is fine.
    info: a.info || null,
  }))
}

// Is a condition that forbids spending stratagems on this unit on right now? (Battle-shock is the
// only one, but which condition it is belongs in the vocabulary, not in this file.)
/** @param {GamePlayer | null | undefined} player @param {ClockLike} clock @param {EntryLike | null | undefined} entry */
export function stratagemsBlocked(player, clock, entry) {
  for (const id of activeConditions(player, clock, entry)) {
    if (conditions[id]?.blocksStratagems) return true
  }
  return false
}

// The stratagems that must come OFF the unit when `condId` is switched on: everything it has in
// force whose effect is still ongoing. A stratagem that lasts the whole battle is left alone — its
// effect (Daemonic Possession's DAEMON) was resolved when it was spent and nothing takes it back,
// while a phase- or turn-long one is still affecting the unit, which is exactly what a
// Battle-shocked unit may not be. Returns sids for the caller to un-spend; pure, so the store stays
// the single writer.
/**
 * @param {string} condId
 * @param {ModEntry[] | null | undefined} resolvedEntries
 * @param {GamePlayer | null | undefined} player
 * @param {ClockLike} clock
 * @param {EntryLike | null | undefined} entry
 * @returns {string[]}
 */
export function stratagemsClearedBy(condId, resolvedEntries, player, clock, entry) {
  if (!conditions[condId]?.blocksStratagems) return []
  const byId = new Map((resolvedEntries || []).map((r) => [r.sid, r]))
  return [...activeStratagems(player, clock, entry, resolvedEntries)]
    .filter((sid) => (byId.get(sid)?.dur || 'phase') !== 'battle')
}

// WHAT WAS SPENT IN THE PHASE THE GAME IS STANDING IN — the two per-phase limits of rule 15.01
// ("each player cannot use the same stratagem more than once in the same phase", and "unless
// otherwise stated, each player cannot target the same unit with more than one stratagem in the
// same phase") are both about the phase a stratagem was SPENT in, not about how long its effect
// lasts: a turn-long stratagem spent in the Movement phase does not stop the unit being targeted
// again in the Shooting phase.
//
// Only a game that keeps phases can answer this. Without one every stamp is a bare round (see the
// clock note at the top), so "the same phase" is unknowable, and blocking a whole round would
// forbid play the rules allow — the wrong way to be wrong. Returns null there, and the limits sit out.
/**
 * @param {GamePlayer | null | undefined} player
 * @param {ClockLike} clock
 * @returns {{ sids: Set<string>, byUid: Map<string, Set<string>> } | null}
 */
function spentThisPhase(player, clock) {
  if (!normaliseClock(clock).tracked) return null
  const now = stampOf(clock)
  const sids = new Set()          // every stratagem used this phase, whoever it was used on
  const byUid = new Map()         // …and which of them landed on each unit
  for (const [uid, store] of Object.entries(player?.ctx?.strats || {})) {
    for (const [sid, at] of Object.entries(store)) {
      if (isLegacy(at) || at !== now) continue
      sids.add(sid)
      if (!byUid.has(uid)) byUid.set(uid, new Set())
      byUid.get(uid).add(sid)
    }
  }
  return { sids, byUid }
}

// The stratagems worth offering on a card: this entry's own records that actually carry an effect,
// each with whether it is in force right now.
//
// A chip the rules forbid tapping is BLOCKED rather than hidden — what you cannot spend right now
// is still worth knowing you have — and it says WHY, because all three reasons are temporary and a
// player who cannot see the reason cannot tell when it lifts:
//   shock      Battle-shocked: this unit cannot be targeted with stratagems at all (01.07)
//   wrongPhase the stratagem's own WHEN does not include the phase (or the turn) the game is in
//   unitPhase  the unit has already been targeted with one this phase (15.01)
//   usedPhase  this stratagem has already been used this phase, here or on another unit (15.01)
// Ones already in force stay flippable whatever the reason, so a mis-tap can always be taken back —
// which is also the escape hatch for the "unless otherwise stated" stratagem that IS allowed to
// double up: un-spend the other one. (Switching Battle-shock on un-spends them for you, so a
// shocked unit normally has none left — stratagemsClearedBy.)
/**
 * @param {ModEntry[] | null | undefined} resolvedEntries
 * @param {GamePlayer | null | undefined} player
 * @param {ClockLike} clock
 * @param {EntryLike | null | undefined} entry
 * @returns {CondSwitch[]}
 */
export function stratagemsFor(resolvedEntries, player, clock, entry) {
  const active = activeStratagems(player, clock, entry, resolvedEntries)
  const shocked = stratagemsBlocked(player, clock, entry)
  const spent = spentThisPhase(player, clock)
  const takenThisPhase = !!(entry?.uid && spent?.byUid.get(entry.uid)?.size)
  // The slot the game is standing in — only a game keeping phases has one, and without it the
  // timing line is unanswerable, exactly as the per-phase limits above are.
  const k = normaliseClock(clock)
  const slot = k.tracked ? { phase: k.phase, mine: k.mine } : null
  return (resolvedEntries || [])
    .filter((rec) => rec.kind === 'stratagem' && rec.effects?.length)
    .map((rec) => {
      const on = active.has(rec.sid)
      /** @type {CondSwitch['blockedBy']} */
      let blockedBy = null
      if (!on) {
        if (shocked) blockedBy = 'shock'
        // A stratagem states the moment it may be used ("Your opponent's Shooting phase…"), and a
        // game keeping a clock knows whether that moment is now. One already in force is never
        // blocked — it was used when it could be, and taking it back must stay possible.
        else if (slot && !usableInSlot(rec.slot?.phases, rec.slot?.sides, slot.phase, slot.mine)) blockedBy = 'wrongPhase'
        else if (takenThisPhase) blockedBy = 'unitPhase'
        else if (spent?.sids.has(rec.sid)) blockedBy = 'usedPhase'
      }
      return {
        id: rec.sid,
        label: { en: rec.name, ru: rec.name },   // stratagem names stay English by project convention
        det: rec.det || null,
        on,
        auto: false,
        blocked: !!blockedBy,
        blockedBy,
        duration: rec.dur || 'phase',
      }
    })
}

// The switches worth showing for a set of resolved modifier records: the conditions their effects
// actually name, at the given scope, and only where every condition on that effect is answerable —
// a switch that cannot change anything on screen is worse than no switch at all.
/**
 * @param {ModEntry[] | null | undefined} resolvedEntries
 * @param {string} scope
 * @param {GamePlayer | null | undefined} player
 * @param {ClockLike} clock
 * @param {EntryLike | null | undefined} entry
 * @param {GroupLimits} [limits] this unit's own group sizes (groupLimitsFor)
 * @param {{ proves?: Set<string>, forbids?: Set<string>, units?: RosterEntry[] | null }} [unitRules] what the unit's own rules
 *   settle (doctrineRules.js): a proven state is shown on and not the player's to flip, a forbidden
 *   one shown off and blocked, each saying why; `units`, the roster's entries, for a once-per-battle
 *   use ticked on another card of the same attached unit
 * @returns {CondSwitch[]}
 */
export function switchesFor(resolvedEntries, scope, player, clock, entry, limits, unitRules = {}) {
  const ids = new Set()
  // …and WHICH rule named each one. A chip reading "Adrenalight" says nothing on its own: finding
  // out that the six of them are Combat Drugs, off the Spectacle of Spite detachment, meant
  // opening units one by one and expanding their abilities. The first record to name an id is
  // taken — a condition is named by one rule in all but a handful of cases, and the second would
  // be the same rule under another unit anyway.
  const namedBy = new Map()
  /** @param {string} id */
  const answerable = (id) => {
    const c = conditions[id]
    if (!c) return false
    if (c.scope !== 'clock') return true
    return c.rounds ? true : normaliseClock(clock).tracked
  }
  // A spent rule's own options are asked only once it is spent here — a stratagem in force on the
  // unit, a once-per-battle ability used inside its window. Before, there is nothing to pick.
  const spentHere = activeStratagems(player, clock, entry, resolvedEntries)
  const usedHere = activeUses(player, clock, entry, resolvedEntries, unitRules.units || null)
  for (const rec of resolvedEntries || []) {
    for (const eff of rec.effects || []) {
      if (!eff.cond?.length) continue
      if (eff.cond.some((cid) => conditions[cid]?.onUse) && !spentHere.has(rec.sid) && !usedHere.has(rec.sid)) continue
      // A clock half is answered by the clock, not by a switch — so it no longer disqualifies the
      // effect. A battle-round window always answers; a phase only in a game keeping phases,
      // without which an effect whose other half can be flipped would offer a switch that changes
      // nothing on screen.
      if (!eff.cond.every(answerable)) continue
      for (const cid of eff.cond) {
        // An ordinary state has no switch of its own: the chip offered is the state it negates
        // (Battle-shocked, which every unit's row carries anyway), and the rule that names THAT
        // state is the one the chip is attributed to.
        const id = conditions[cid].negates || cid
        if (conditions[id].scope !== scope) continue
        ids.add(id)
        if (!conditions[cid].negates && !namedBy.has(id)) namedBy.set(id, rec)
      }
    }
  }
  // A whole group stands in at its first member's place, in the order conditions.js lists it, and
  // every member is credited to the rule that named that first one — one heading over the set, not
  // the set split between the army rule and whichever ability happened to name a doctrine too.
  const shown = []
  for (const id of ids) {
    const group = conditions[id].group
    if (!group || !WHOLE_GROUPS.has(group)) { shown.push(id); continue }
    if (shown.some((s) => conditions[s].group === group)) continue
    const members = Object.keys(conditions).filter((k) => conditions[k].group === group && conditions[k].scope === scope)
    for (const m of members) namedBy.set(m, namedBy.get(id))
    shown.push(...members)
  }
  const active = activeConditions(player, clock, entry, { groupLimits: limits, ...unitRules })
  const own = entry?.uid ? player?.ctx?.units?.[entry.uid] || {} : {}
  const round = normaliseClock(clock).round
  return shown.map((id) => {
    const proven = !!unitRules.proves?.has(id)
    // The unit's status recorded it (an arrival this turn): on, and not the player's to flip here —
    // moving the unit back to Reserves is what takes it off.
    const byStatus = statusProves(id, player, entry, clock)
    const forbidden = !!unitRules.forbids?.has(id)
    // On because the ARMY picked it (the doctrine of the round) and nothing on this unit did: the
    // unit cannot take back what the army chose, so the chip says where it came from instead of
    // looking like a switch that does nothing when tapped. Another doctrine ticked on the unit still
    // replaces it — that chip is free. Doctrines only: riled up keeps its own switch under a War Cry
    // (thirty-two other Ork rules rile one unit at a time — see SOFT_AUTO).
    const fromArmy = !proven && WHOLE_GROUPS.has(conditions[id].group || '') && active.has(id)
      && !switchOn(own, id, clock) && !!SOFT_AUTO[id]?.(player, round)
    /** @type {CondSwitch['blockedBy']} */
    const blockedBy = forbidden ? 'forbidden' : proven ? 'rule' : fromArmy ? 'armyPick' : null
    return {
      id,
      label: conditions[id].label,
      on: active.has(id),
      // Shown, but not the player's to flip here: the tracker already recorded it, the entry's own
      // datasheet states it outright, or the unit's rules settle it either way.
      auto: isAuto(id) || entryProves(id, entry) || proven || fromArmy || byStatus,
      blocked: forbidden,
      blockedBy,
      duration: conditions[id].duration,
      // Who the switch belongs to, so a view that shows army-wide and per-unit switches side by side
      // (a rule's own chips inside the unit card) still writes each to the right store.
      scope: conditions[id].scope,
      // Alternatives travel with the switch so a view can say how many of a set are still free.
      // The store enforces the cap either way (useTracker's enforceGroupLimit) — this is only for
      // showing it, because a group of six chips that silently holds two needs to say so.
      group: conditions[id].group || null,
      groupLimit: limits?.[conditions[id].group || ''] ?? groupLimitOf(conditions[id].group),
      // Enough for a view to name the rule and find its text; resolving either needs the faction
      // data, which this pure layer does not have (see RosterViewView's withRuleInfo).
      src: srcOf(namedBy.get(id)),
    }
  })
}

/** @param {ModEntry | undefined} rec */
function srcOf(rec) {
  if (!rec) return null
  const ref = rec.ref
  return {
    kind: rec.kind,
    name: rec.name,
    det: (ref && 'det' in ref && ref.det) || null,
    unit: (ref && 'unit' in ref && ref.unit) || null,
  }
}

// ── A unit that may hold more of a group ──────────────────────────────────────────────────────
// "While this model is leading a unit, that unit can be affected by up to two different Orders at
// the same time" — Ursula Creed's Lord Castellan, and the Command Rod a Militarum Tempestus Command
// Squad can carry (a player's report, 2026-10-12: the tracker let that unit hold one Order). Those
// two are every such rule appdata has; the sentence is read rather than the names listed, and
// rosterGameContext.test.js fails on a wording in the data this does not read.
const GROUP_RAISES = [{ group: 'order', re: /can be affected by up to (\w+) different Orders at the same time/i }]
/** @type {Record<string, number>} */
const NUMBER_WORDS = { one: 1, two: 2, three: 3, four: 4 }

/**
 * The group sizes a rule's text grants the unit its bearer leads.
 * @param {string | null | undefined} text
 * @returns {GroupLimits}
 */
export function groupRaisesOf(text) {
  /** @type {GroupLimits} */
  const out = {}
  for (const { group, re } of GROUP_RAISES) {
    const m = String(text || '').match(re)
    const n = m ? NUMBER_WORDS[m[1].toLowerCase()] ?? Number(m[1]) : NaN
    if (n > 1) out[group] = Math.max(out[group] || 0, n)
  }
  return out
}

/**
 * The group sizes of the attached unit an entry belongs to: what the rules of a Character LEADING
 * it raise ("while this model is leading a unit"). Every card of that unit gets the same answer —
 * an Order affects the whole attached unit (19.01), and so does the room for a second one.
 * @param {EntryLike | null | undefined} entry
 * @param {RosterEntry[] | null | undefined} units the roster's entries
 * @param {(e: RosterEntry) => string[]} rulesOf the rule texts an entry carries — its datasheet's
 *   abilities and the wargear abilities of what it took
 * @returns {GroupLimits}
 */
export function groupLimitsFor(entry, units, rulesOf) {
  /** @type {GroupLimits} */
  const out = {}
  const hostUid = entry?.leaderOf || entry?.uid
  if (!hostUid) return out
  const list = units || []
  if (!list.some((u) => u.uid === hostUid)) return out
  for (const leader of list.filter((u) => u.leaderOf === hostUid)) {
    for (const text of rulesOf(leader)) {
      for (const [group, n] of Object.entries(groupRaisesOf(text))) out[group] = Math.max(out[group] || 0, n)
    }
  }
  return out
}

