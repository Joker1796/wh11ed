// The link between a saved roster and a tracker game. Pure — no store, no Vue, and deliberately
// NO import of useTracker.js: that module statically pulls the mission/event datasets (~280 KB of
// source), and the roster view must be able to read a game's roster without paying for them.
// rosterHandoff.js (which does own the store) builds on these.
//
// WHY A SNAPSHOT AND NOT A rosterId. A game outlives the roster it was played with: the list gets
// edited between games, renamed, deleted, or never existed locally at all (an opponent's list
// arrives as a share link). A finished game sitting in history — or restored from the cloud on
// another device — has to render exactly the army that was fielded, so the army travels INSIDE the
// game. `rosterId` is kept alongside purely as provenance and may dangle.
//
// SIZE: wh11ed-api caps a synced game at 64 KB (config.maxGameBytes) and the whole game shares
// that budget, so the snapshot stores the roster the way it is STORED (ids and indices into the
// generated data), never resolved names or datasheets. Measured: ~150 bytes per unit entry, so
// two full Strike Force lists cost single-digit KB. rosterGameLink.test.js pins that.

import { migrateRoster } from './useRosters.js'
import { rosterPayload } from './rosterShare.js'

// The army as it stood when the game began. Same field set (and the same `v`) a share link
// carries — one definition of "a roster in transit", so a snapshot and a link migrate identically.
export function rosterSnapshot(roster) {
  if (!roster || !Array.isArray(roster.units)) return null
  return rosterPayload(roster)
}

// Read a player's snapshot back into a roster-shaped object the roster views can render.
//
// MIGRATED ON READ, not on write: a game from three releases ago holds a snapshot built under an
// older schema, and wargear/size picks are INDICES into generated data that the generator
// renumbers. This is the same treatment importRoster gives a share payload — without it an old
// game would quietly show whatever weapon now sits at that index. `v` is dropped afterwards so the
// object matches a stored roster; `id` is the provenance id, which may point at nothing.
export function rosterFromPlayer(player) {
  const snap = player?.roster
  if (!snap || !Array.isArray(snap.units)) return null
  const r = JSON.parse(JSON.stringify(snap))
  const v = r.v
  delete r.v
  migrateRoster(r, v)
  r.id = player.rosterId || null
  return r
}

// Does this player have an army list attached? Attaching is optional on both sides — a game with
// no rosters at all is the normal case and must stay first-class.
export function hasRoster(player) {
  return !!player?.roster?.units
}
