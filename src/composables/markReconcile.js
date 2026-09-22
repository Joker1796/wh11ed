import { deadCell, isLive } from './markStore.js'

// What happens to a player's marks when the rules data moves under them. Datasheet ids are stable
// by convention and by gate (`npm run dsids`, src/data/CLAUDE.md), but "stable" is not "never": GW
// renames a unit, or takes one out of the game, and a mark that points at the old id would sit
// there forever, invisible and uncollectable.
//
// Three outcomes, and the rename map (src/data/datasheetRenames.json) is what tells them apart —
// which is why that file is maintained by hand at the moment the gate catches the change, rather
// than guessed at here:
//
//   renamed  → the mark moves to the new id, keeping when it was made
//   retired  → the unit left the game; the mark goes
//   unknown  → an id this build does not ship and nothing accounts for: a mark left over from
//              before any of this existed. It goes too, but only under the guard below.
//
// THE GUARD. "The unit is gone from the game" and "the unit is missing from the data I happen to
// have" are different statements, and an installed PWA can sit offline for weeks on an old build.
// If such a device cleaned up, it would delete marks for units it simply has not been told about
// — and, because the marks are synced, it would delete them for every device at once. So a client
// only cleans when its own data is at least as new as the newest any of the account's devices has
// reported. An older one merges and leaves the tidying to a newer one.

/**
 * Reconcile one scope's cells against the datasheets this build ships.
 * Returns the new cells and what happened, or null when nothing moved.
 */
export function reconcileCells(cells, { liveIds, renames = {}, mayClean = true, now = Date.now() }) {
  const out = { ...cells }
  const moved = []
  const dropped = []

  for (const [id, cell] of Object.entries(cells)) {
    if (!isLive(cell)) continue
    if (liveIds.has(id)) continue

    if (id in renames) {
      const to = renames[id]
      if (to === null) {
        out[id] = deadCell(now)
        dropped.push(id)
        continue
      }
      // Move it, keeping the original timestamp: the player marked the box then, not now, and a
      // fresh stamp would beat a deliberate unmarking made on another device in between.
      const existing = out[to]
      if (!isLive(existing) || (Number(existing.at) || 0) < (Number(cell.at) || 0)) out[to] = { ...cell }
      out[id] = deadCell(now)
      moved.push([id, to])
      continue
    }

    if (!mayClean) continue
    out[id] = deadCell(now)
    dropped.push(id)
  }

  if (!moved.length && !dropped.length) return null
  return { cells: out, moved, dropped }
}
