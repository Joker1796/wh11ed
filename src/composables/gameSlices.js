// A game cut into the SLICES that multi-device sync moves independently. Pure — no store, no Vue,
// no data imports — so the sync layer and the tests can use it without the tracker's mission
// datasets, the same reason rosterGameLink.js stays light.
//
// WHY SLICES AND NOT ONE BLOB. Two phones tapping CP and scores in the same minute would overwrite
// each other silently under "last write wins" on the whole game. The tree is already cleanly cut
// along the lines the rules draw: what belongs to the battle (the clock, the settings, finished or
// not) and what belongs to each SIDE (its scores, cards, CP, army state, the roster switches). Each
// slice carries its own version on the server, so a conflict is only possible inside one slice —
// and a slice is also the unit of RIGHTS: a side's slices are written by that side (in doubles, by
// either partner — the companion keys CP, cards and Battle Ready to the team, so the two share the
// slice knowingly), the shared one by anyone in the game.
//
// WHY THE ROSTER IS ITS OWN SLICE. The army list is the heaviest thing in a game (a Strike Force
// snapshot is ~1–2 KB against ~2 KB for a whole side after five rounds) and it changes only when a
// list is attached or detached — at setup, or from EditSetupModal mid-game. Kept inside the side
// slice it would ride along with every CP tap; as a slice of its own it is sent once on join and
// again only when it actually changes, with the same owner as the side it belongs to.
//
// WHAT IS NOT SYNCED — what belongs to the device, not the game. `isYou` marks which side THIS
// PHONE plays (the stats page and the You/Opponent labels hang on it), and the other phone's
// answer is the opposite one. The two `trackArmyYou` / `trackArmyOpp` settings (and their retired
// `trackArmyRule`) are read through that flag — "show MY army's card" — so on the other phone
// they would mean the other army: they stay each phone's own too — the option table marks them
// `local`, and that flag is also what lets a guest flip them (EditSetupModal's guest mode). And the
// game's own sync and broadcast handles (`party`, `broadcast`) are this phone's credentials — a
// member token, a stream token — never the other phone's. applySlice keeps every one of these;
// assembleGame sets `isYou` from the joiner's seat and leaves the rest for the caller.

import { LOCAL_TRACK_SETTINGS } from '../data/trackerOptions.js'

export const SLICE_NAMES = ['shared', 'side0', 'side1', 'roster0', 'roster1']

// Which side owns a slice: 0 / 1, or null for the shared one.
export function sideOfSlice(name) {
  const m = /^(?:side|roster)([01])$/.exec(name || '')
  return m ? Number(m[1]) : null
}

// The army list and its provenance travel together (rosterGameLink.js: `roster` is the snapshot,
// `rosterId` may dangle) — on the side in singles, on each member in doubles.
const ROSTER_KEYS = ['rosterId', 'roster']
const LOCAL_KEYS = ['isYou']
export const LOCAL_GAME_KEYS = ['party', 'broadcast']
export const LOCAL_SETTING_KEYS = LOCAL_TRACK_SETTINGS

const clone = (v) => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)))

function omit(obj, keys) {
  const out = {}
  for (const k of Object.keys(obj || {})) if (!keys.includes(k)) out[k] = obj[k]
  return out
}

function rosterPart(holder) {
  return { rosterId: holder?.rosterId ?? null, roster: holder?.roster ?? null }
}

// The side without its list(s) and without the device-local flag. Members keep their army/ctx
// state (that IS side state in a force of convenience) but lose their roster fields too.
function sideSlice(pl) {
  const out = omit(pl, [...ROSTER_KEYS, ...LOCAL_KEYS])
  if (Array.isArray(pl?.members)) out.members = pl.members.map((m) => omit(m, ROSTER_KEYS))
  return out
}

function rosterSlice(pl) {
  const out = rosterPart(pl)
  if (Array.isArray(pl?.members)) out.members = pl.members.map(rosterPart)
  return out
}

function sharedSlice(g) {
  const out = omit(g, ['players', ...LOCAL_GAME_KEYS])
  if (out.settings) out.settings = omit(out.settings, LOCAL_SETTING_KEYS)
  return out
}

// Cut a game into its five slices. Deep copies — the result never aliases the live tree.
export function sliceGame(game) {
  const g = clone(game)
  return {
    shared: sharedSlice(g),
    side0: sideSlice(g.players[0]),
    side1: sideSlice(g.players[1]),
    roster0: rosterSlice(g.players[0]),
    roster1: rosterSlice(g.players[1]),
  }
}

// One side put back together from its two slices, `isYou` set by the caller. A missing roster
// slice reads as "no list attached" — the normal case, never an error.
function assembleSide(side, roster, isYou) {
  const pl = { ...clone(side), ...rosterPart(roster) }
  if (Array.isArray(pl.members)) {
    pl.members = pl.members.map((m, mi) => ({ ...m, ...rosterPart(roster?.members?.[mi]) }))
  }
  pl.isYou = isYou
  return pl
}

// A whole game from its slices — what a joining device builds from the server's first answer.
// `you` is the side this device plays.
export function assembleGame(slices, { you = 0 } = {}) {
  return {
    ...clone(slices.shared),
    players: [
      assembleSide(slices.side0, slices.roster0, you === 0),
      assembleSide(slices.side1, slices.roster1, you === 1),
    ],
  }
}

// Replace `target`'s own keys with `next`'s, IN PLACE, leaving `keep` alone. In place so the
// reactive game object and the player objects inside it keep their identity — every reader holds
// `current.value.players[pi]`, and a slice landing every few seconds must not reseat the tree.
function replaceKeys(target, next, keep = []) {
  for (const k of Object.keys(target)) if (!keep.includes(k) && !(k in next)) delete target[k]
  for (const k of Object.keys(next)) if (!keep.includes(k)) target[k] = next[k]
}

// Write one slice into a game in place. Everything outside that slice is untouched: the other
// side, the roster of this side, and this device's `isYou`. Returns false for a slice name it
// does not know or a game without two players (isValidGame is the caller's guard; this only
// refuses to write into nothing).
export function applySlice(game, name, data) {
  if (!game || !Array.isArray(game.players) || game.players.length !== 2) return false
  const side = sideOfSlice(name)
  const next = clone(data) || {}
  if (name === 'shared') {
    const local = {}
    for (const k of LOCAL_SETTING_KEYS) if (game.settings && k in game.settings) local[k] = game.settings[k]
    replaceKeys(game, sharedSlice(next), ['players', ...LOCAL_GAME_KEYS])
    if (!game.settings) game.settings = {}
    Object.assign(game.settings, local)
    return true
  }
  if (side == null) return false
  const pl = game.players[side]
  if (name.startsWith('side')) {
    const roster = rosterSlice(pl)
    const merged = assembleSide(next, roster, pl.isYou)
    replaceKeys(pl, merged)
    return true
  }
  // rosterN — only the list fields move, on the side and, in doubles, on each member.
  Object.assign(pl, rosterPart(next))
  if (Array.isArray(pl.members)) {
    pl.members.forEach((m, mi) => Object.assign(m, rosterPart(next.members?.[mi])))
  }
  return true
}

// JSON with keys in sorted order, so two trees that hold the same data serialize the same way
// whatever order their keys were written in (applySlice rewrites keys; a game restored from
// storage may differ from a freshly built one). This is what makes "did the slice change" honest.
export function stableJson(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return '[' + value.map((v) => (v === undefined ? 'null' : stableJson(v))).join(',') + ']'
  const keys = Object.keys(value).filter((k) => value[k] !== undefined).sort()
  return '{' + keys.map((k) => JSON.stringify(k) + ':' + stableJson(value[k])).join(',') + '}'
}

// Names of the slices that differ between two cuts — what the client has to send. A slice missing
// on one side counts as changed.
export function changedSlices(before, after) {
  return SLICE_NAMES.filter((n) => stableJson(before?.[n] ?? null) !== stableJson(after?.[n] ?? null))
}
