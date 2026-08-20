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
// THE CLOCK. A switch records the battle round it was flipped in, and anything whose rule says it
// lasts less than the whole battle is true only in that round. That is coarser than the rules
// (most of these end with a phase or a turn) — the tracker has no phases and no notion of whose
// turn it is, so the round boundary is the only honest clock available. Erring towards clearing
// EARLY is deliberate: a switch that has gone stale would silently rewrite a number.

import { conditions } from '../data/rosterModifiers/conditions.js'

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
// unit is Righteous. Those stay switches. (R2 in ROSTER-IN-GAME-PROGRESS.md.)
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

// A switch is stored as the round it was turned on in; `battle`-long ones ignore the round.
function switchOn(store, id, round) {
  const at = store?.[id]
  if (at == null) return false
  const c = conditions[id]
  if (!c) return false
  return c.duration === 'battle' || at === round
}

// Answered by the list itself. `unit-leading` is the only one so far: a Leader entry records the
// unit it is attached to, so asking the player would be asking them to repeat themselves.
function rosterAnswers(id, entry) {
  if (id === 'unit-leading') return !!entry?.leaderOf
  return false
}

// Every condition currently true for one roster entry. `player` is the tracker's player object,
// `round` the current battle round, `entry` the roster line the card is being drawn for.
export function activeConditions(player, round, entry) {
  const out = new Set()
  for (const [id, c] of Object.entries(conditions)) {
    if (c.scope === 'phase') continue // not tracked yet — see conditions.js
    let on = false
    if (isAuto(id)) on = AUTO[id](player, round)
    else if (c.scope === 'roster') on = rosterAnswers(id, entry)
    else if (c.scope === 'army') on = switchOn(player?.ctx?.army, id, round)
    else if (entry?.uid) on = switchOn(player?.ctx?.units?.[entry.uid], id, round)
    if (on) out.add(id)
  }
  return out
}

// The switches worth showing for a set of resolved modifier records: the conditions their effects
// actually name, at the given scope, and only where every condition on that effect is answerable —
// a switch that cannot change anything on screen is worse than no switch at all.
export function switchesFor(resolvedEntries, scope, player, round, entry) {
  const ids = new Set()
  for (const rec of resolvedEntries || []) {
    for (const eff of rec.effects || []) {
      if (!eff.cond?.length) continue
      if (!eff.cond.every((id) => conditions[id] && conditions[id].scope !== 'phase')) continue
      for (const id of eff.cond) if (conditions[id].scope === scope) ids.add(id)
    }
  }
  const active = activeConditions(player, round, entry)
  return [...ids].map((id) => ({
    id,
    label: conditions[id].label,
    on: active.has(id),
    auto: isAuto(id),           // shown, but not the player's to flip here
    duration: conditions[id].duration,
  }))
}
