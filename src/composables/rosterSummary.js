// The `summary` denormalised onto every stored roster — `{ points, unitCount, issues }` — is what
// the two list screens show: RosterListView and the tracker's RosterPickerModal, neither of which
// loads a faction's data chunk. Points live in that chunk (a unit's bracket, its copy tax, its
// paid wargear), so the list can only show a number somebody else already worked out.
//
// That makes the summary a CACHE, and it is only ever as good as its last writer. It has to be
// written by every screen that changes a roster while holding its faction data — the editor and
// the add-units page (`useRosterEditing`) and the creation wizard — because each of them is a
// place a roster can be finished and left. A wizard-built list used to reach the list screen
// reading "0 points" for exactly this reason: the wizard wrote the units and nothing wrote the
// price.
//
// `refreshSummaries` is the safety net under those writers, for rosters no writer ever touched:
// one built before this module existed, one imported from a share link (a share payload carries
// no summary on purpose — it would be the sender's arithmetic). It prices only a roster whose
// cache is missing or contradicted by the roster's own unit count, and loads one faction chunk
// per faction that needs it, so a healthy collection loads nothing at all.

import { rosterPoints, usesAllies } from './rosterEngine.js'
import { validateRoster } from './rosterValidation.js'
import rosterCore from '../data/roster/core.js'
import { loadRosterFaction } from '../data/roster/index.js'

// The shape, in one place. Callers on an editing screen pass the points and error count they
// already compute live, rather than paying for a second pass over the same units.
export function summaryOf(roster, points, errorCount = 0) {
  return { points, unitCount: roster?.units?.length || 0, issues: errorCount }
}

// A cache that cannot be believed. An empty roster is never stale — 0 points is the right answer
// for it whether or not anything was ever written. For the rest, a `unitCount` that disagrees
// with the units present means the cache predates them; a missing summary means no writer has
// ever seen this roster. Neither test catches a change that keeps the count (swapping wargear),
// which is why this is a safety net and not the mechanism.
export function summaryStale(roster) {
  if (!roster?.units?.length) return false
  return !roster.summary || roster.summary.unitCount !== roster.units.length
}

// The whole summary computed from scratch — the repair path, which has no live computeds to reuse.
export function summarize(roster, factionData) {
  const units = new Map((factionData?.units || []).map((u) => [u.id, u]))
  const detachments = (roster?.detachments || [])
    .map((name) => (factionData?.detachments || []).find((d) => d.name === name))
    .filter(Boolean)
  const { errorCount } = validateRoster(roster, { faction: factionData, core: rosterCore })
  return summaryOf(roster, rosterPoints(roster?.units, (id) => units.get(id), detachments), errorCount)
}

// Prices every stale roster in the collection, one faction chunk per faction involved. Writes the
// summary straight onto the roster object (the store deep-watches and persists it) rather than
// through `updateRoster`, which would bump `updatedAt` — repairing a number the app failed to
// cache is not the user editing their list, and the list screen shows that date.
export async function refreshSummaries(rosters) {
  const byFaction = new Map()
  for (const r of rosters || []) {
    if (!r?.faction || !summaryStale(r)) continue
    if (!byFaction.has(r.faction)) byFaction.set(r.faction, [])
    byFaction.get(r.faction).push(r)
  }
  for (const [slug, list] of byFaction) {
    // An unknown slug (a faction dropped from the data) must not take the screen down with it.
    // Allies only if one of these lists actually holds a unit from another faction's bundle —
    // the summary is computed for every saved list at once, so an unconditional load would pull
    // three extra bundles per Imperium faction just to re-price a list that has no allies.
    const data = await loadRosterFaction(slug, { allies: list.some(usesAllies) }).catch(() => null)
    if (!data) continue
    for (const r of list) r.summary = summarize(r, data)
  }
}
