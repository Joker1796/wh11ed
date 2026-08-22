// What is true RIGHT NOW, at the table — the half of a conditional modifier the data cannot know.
// Pure: no Vue, no store (the game object is passed in), same discipline as rosterEngine.js.
//
// Each condition id (src/data/rosterModifiers/conditions.js) is answered from exactly ONE source,
// never a mixture:
//   auto    the tracker already knows, because the player told it elsewhere (a called Waaagh!)
//   roster  the army list already says so (a Leader is attached to a unit)
//   switch  nothing can know it, so the player flips it — army-wide or on one unit
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

import { conditions, groupLimitOf } from '../data/rosterModifiers/conditions.js'
import { BATTLE_PHASES } from './stratagemPhases.js'

// ── The clock ─────────────────────────────────────────────────────────────────────────────────
// What the game is standing on, from the point of view of ONE player: which battle round, whose
// turn it is (`mine`), which phase, and whether the game is keeping phases at all. Built once by
// the caller and passed down, rather than each function digging into the game object.
export function clockOf(game, pi = 0) {
  const tracked = !!game?.settings?.trackPhases
  return {
    round: game?.currentRound || 1,
    turn: game?.currentTurn === 1 ? 1 : 0,
    phase: game?.currentPhase || BATTLE_PHASES[0],
    mine: (game?.currentTurn === 1 ? 1 : 0) === pi,
    tracked,
  }
}

// A moment, as one number. Phases are numbered from 1 so that an untracked game (stamp
// `round*100`) can never be mistaken for one standing in a phase.
export function stampOf(clock) {
  const c = normaliseClock(clock)
  if (!c.tracked) return c.round * 100
  return c.round * 100 + c.turn * 10 + (BATTLE_PHASES.indexOf(c.phase) + 1 || 1)
}

// Tolerate a bare round number where a clock is expected — that is what a game saved before the
// clock existed hands us, and what the older tests pass.
function normaliseClock(clock) {
  if (typeof clock === 'number') return { round: clock, turn: 0, phase: BATTLE_PHASES[0], mine: true, tracked: false }
  return clock || { round: 1, turn: 0, phase: BATTLE_PHASES[0], mine: true, tracked: false }
}

// A stored value from before stamps existed is a bare round number (1..5); a stamp is ≥ 100.
const isLegacy = (at) => at < 100
const roundOfStamp = (at) => (isLegacy(at) ? at : Math.floor(at / 100))
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
const AUTO = {
  // Orks — a `toggle` spec that records the round the Waaagh! was called in.
  'waaagh-active': (player, round) => player?.factionSlug === 'orks'
    && (player?.army?.toggleRounds || []).includes(round),
  // Adeptus Mechanicus — a per-round `selection` whose option ids are the Imperatives themselves.
  'imperative-protector': (player, round) => player?.factionSlug === 'adeptus-mechanicus'
    && player?.army?.selectionByRound?.[round] === 'protector',
  'imperative-conqueror': (player, round) => player?.factionSlug === 'adeptus-mechanicus'
    && player?.army?.selectionByRound?.[round] === 'conqueror',
}

export const isAuto = (id) => Object.hasOwn(AUTO, id)

// Is a switch still in force? Compared at the granularity its own rule states — except against a
// legacy round-only value (or in a game not keeping phases), where the round is all either side
// knows and a shorter duration can only be answered as coarsely as that.
function switchOn(store, id, clock) {
  const at = store?.[id]
  if (at == null) return false
  const c = conditions[id]
  if (!c) return false
  return stampHolds(at, c.duration, clock)
}

// Is a stamp still inside the window a duration gives it? Shared by switches and by stratagems,
// which expire the same way for the same reason.
function stampHolds(at, duration, clock) {
  if (at == null) return false
  if (duration === 'battle') return true
  const now = stampOf(clock)
  const coarse = isLegacy(at) || !normaliseClock(clock).tracked
  if (duration === 'phase' && !coarse) return at === now
  if (duration === 'turn' && !coarse) return turnOfStamp(at) === turnOfStamp(now)
  return roundOfStamp(at) === roundOfStamp(now)
}

// Answered by the list itself. `unit-leading` is the only one so far: a Leader entry records the
// unit it is attached to, so asking the player would be asking them to repeat themselves.
function rosterAnswers(id, entry) {
  if (id === 'unit-leading') return !!entry?.leaderOf
  return false
}

// Does the tracker's own clock say this condition holds? Two kinds. A `rounds` window needs no
// phases — every game knows its battle round — so it answers always. A phase needs a game keeping
// them, and a `side: 'own'` one ("your Shooting phase") additionally wants the turn to belong to
// the player whose card is being drawn; an ownerless one (the Fight phase) is true in both turns.
function clockHolds(c, clock) {
  const k = normaliseClock(clock)
  if (c.rounds) return c.rounds.includes(k.round)
  if (!k.tracked || k.phase !== c.phase) return false
  return c.side === 'any' || k.mine
}

// Every condition currently true for one roster entry. `player` is the tracker's player object,
// `clock` what the game is standing on (clockOf(); a bare round number still works), `entry` the
// roster line the card is being drawn for.
export function activeConditions(player, clock, entry) {
  const round = normaliseClock(clock).round
  const out = new Set()
  for (const [id, c] of Object.entries(conditions)) {
    let on = false
    if (c.scope === 'clock') on = clockHolds(c, clock)
    else if (isAuto(id)) on = AUTO[id](player, round)
    else if (c.scope === 'roster') on = rosterAnswers(id, entry)
    else if (c.scope === 'army') on = switchOn(player?.ctx?.army, id, clock)
    else if (entry?.uid) on = switchOn(player?.ctx?.units?.[entry.uid], id, clock)
    if (on) out.add(id)
  }
  capGroups(out, player, entry)
  return out
}

// A group can hold only so many at once (conditions.js's GROUP_LIMITS). useTracker enforces that on
// write, so a game played on this build never over-fills one — but a game SAVED before the cap
// existed can hold all six of Creations of Bile's augmentations, each rewriting a stat. Reading is
// where that has to be caught, so the cap is applied here too and the newest switches win, the same
// ones the store would have kept. Nothing is deleted: the game's own record stays as it was played.
function capGroups(out, player, entry) {
  const byGroup = new Map()
  for (const id of out) {
    const group = conditions[id]?.group
    if (!group) continue
    if (!byGroup.has(group)) byGroup.set(group, [])
    byGroup.get(group).push(id)
  }
  for (const [group, ids] of byGroup) {
    const limit = groupLimitOf(group)
    if (ids.length <= limit) continue
    const stampFor = (id) => (conditions[id].scope === 'army'
      ? player?.ctx?.army?.[id]
      : player?.ctx?.units?.[entry?.uid]?.[id]) ?? 0
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

// The stratagems worth offering on a card: this entry's own records that actually carry an effect,
// each with whether it is in force right now.
export function stratagemsFor(resolvedEntries, player, clock, entry) {
  const active = activeStratagems(player, clock, entry, resolvedEntries)
  return (resolvedEntries || [])
    .filter((rec) => rec.kind === 'stratagem' && rec.effects?.length)
    .map((rec) => ({
      id: rec.sid,
      label: { en: rec.name, ru: rec.name },   // stratagem names stay English by project convention
      det: rec.det || null,
      on: active.has(rec.sid),
      auto: false,
      duration: rec.dur || 'phase',
    }))
}

// The switches worth showing for a set of resolved modifier records: the conditions their effects
// actually name, at the given scope, and only where every condition on that effect is answerable —
// a switch that cannot change anything on screen is worse than no switch at all.
export function switchesFor(resolvedEntries, scope, player, clock, entry) {
  const ids = new Set()
  const answerable = (id) => {
    const c = conditions[id]
    if (!c) return false
    if (c.scope !== 'clock') return true
    return c.rounds ? true : normaliseClock(clock).tracked
  }
  for (const rec of resolvedEntries || []) {
    for (const eff of rec.effects || []) {
      if (!eff.cond?.length) continue
      // A clock half is answered by the clock, not by a switch — so it no longer disqualifies the
      // effect. A battle-round window always answers; a phase only in a game keeping phases,
      // without which an effect whose other half can be flipped would offer a switch that changes
      // nothing on screen.
      if (!eff.cond.every(answerable)) continue
      for (const id of eff.cond) if (conditions[id].scope === scope) ids.add(id)
    }
  }
  const active = activeConditions(player, clock, entry)
  return [...ids].map((id) => ({
    id,
    label: conditions[id].label,
    on: active.has(id),
    auto: isAuto(id),           // shown, but not the player's to flip here
    duration: conditions[id].duration,
    // Who the switch belongs to, so a view that shows army-wide and per-unit switches side by side
    // (a rule's own chips inside the unit card) still writes each to the right store.
    scope: conditions[id].scope,
    // Alternatives travel with the switch so a view can say how many of a set are still free.
    // The store enforces the cap either way (useTracker's enforceGroupLimit) — this is only for
    // showing it, because a group of six chips that silently holds two needs to say so.
    group: conditions[id].group || null,
    groupLimit: groupLimitOf(conditions[id].group),
  }))
}
