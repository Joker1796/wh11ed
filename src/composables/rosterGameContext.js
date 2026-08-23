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
import { BATTLE_PHASES, usableInSlot } from './stratagemPhases.js'

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

// The conditions a ROSTER can answer on its own, with no game anywhere: today that is only
// `unit-leading`, because the list itself records which entry is attached to which. Used off the
// table (the roster builder, a list being read before the game), where an enhancement that reads
// "while the bearer is leading a unit" is as true as any printed number and should be applied,
// not footnoted. Deliberately NOT activeConditions() with an empty player: that would also answer
// the clock-scoped conditions, and a null clock reads as round 1 — "during battle rounds 1-3"
// would switch itself on in a list nobody is playing yet.
export function rosterConditions(entry) {
  const out = new Set()
  for (const [id, c] of Object.entries(conditions)) {
    if (c.scope === 'roster' && rosterAnswers(id, entry)) out.add(id)
  }
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

// The auras the player says are reaching this unit right now, as a set of record ids. The window is
// a BATTLE ROUND: what makes an aura start or stop applying is movement, and re-confirming every
// phase would be a tap per unit per phase for a fact that rarely changes inside one round. Erring
// early, as everywhere else here — a mark that has gone stale would quietly rewrite a number.
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
export function stratagemsFor(resolvedEntries, player, clock, entry) {
  const active = activeStratagems(player, clock, entry, resolvedEntries)
  const shocked = stratagemsBlocked(player, clock, entry)
  const spent = spentThisPhase(player, clock)
  const takenThisPhase = !!spent?.byUid.get(entry?.uid)?.size
  // The slot the game is standing in — only a game keeping phases has one, and without it the
  // timing line is unanswerable, exactly as the per-phase limits above are.
  const k = normaliseClock(clock)
  const slot = k.tracked ? { phase: k.phase, mine: k.mine } : null
  return (resolvedEntries || [])
    .filter((rec) => rec.kind === 'stratagem' && rec.effects?.length)
    .map((rec) => {
      const on = active.has(rec.sid)
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
export function switchesFor(resolvedEntries, scope, player, clock, entry) {
  const ids = new Set()
  const answerable = (id) => {
    const c = conditions[id]
    if (!c) return false
    if (c.scope !== 'clock') return true
    return c.rounds ? true : normaliseClock(clock).tracked
  }
  // WHERE a switch comes from, for the ones that belong to a rule printed on a named unit: an
  // ability set's options ("select up to two Relics of the Matriarchs") are switched above the
  // list, far from the card that explains them, so the chip has to be able to say whose they are,
  // name itself the way that card does, and hand the reader the rule text.
  const owners = new Map()
  for (const rec of resolvedEntries || []) {
    for (const eff of rec.effects || []) {
      if (!eff.cond?.length) continue
      // A clock half is answered by the clock, not by a switch — so it no longer disqualifies the
      // effect. A battle-round window always answers; a phase only in a game keeping phases,
      // without which an effect whose other half can be flipped would offer a switch that changes
      // nothing on screen.
      if (!eff.cond.every(answerable)) continue
      for (const id of eff.cond) {
        if (conditions[id].scope !== scope) continue
        ids.add(id)
        if (!owners.has(id) && rec.ref?.set) {
          owners.set(id, { owner: rec.owner || null, ability: rec.name, set: rec.ref.set, unit: rec.ref.unit || null })
        }
      }
    }
  }
  const active = activeConditions(player, clock, entry)
  return [...ids].map((id) => ({
    id,
    label: conditions[id].label,
    // Null for every switch that is just a state of the battle ("this unit charged"); set for the
    // options of an ability set, which are somebody's printed rule.
    from: owners.get(id) || null,
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
