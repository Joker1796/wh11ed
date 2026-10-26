// @ts-check
// A Combat Patrol box as a list, for a Combat Patrol game: the tracker attaches it to the player
// at the start, so the game screen's Armies tab shows the box the way it shows any list — its unit
// cards, their states, the reserves (owner, 2026-10-15). A box is an army with nothing to build:
// its units are fixed (the detachment's `linkedUnits`, twice for two of a unit), its Warlord is
// named there, and the only choice is which of its two enhancements to take — the bearer is the
// unit the enhancement names ("'Ardmob Warboss model only", an Upgrade on a vehicle), read from the
// enhancement's own eligibility.
import { enhEligible } from './rosterEnhEligible.js'
import { foldName } from '../shared/foldName.js'

/**
 * @param {{ id: string, slug: string, boxName: string }} box the box (combatPatrol.js)
 * @param {{ units: Array<{ id: string }>, detachments: Array<any> }} faction loadRosterFaction(slug, { cp: box.id })
 * @param {string | null | undefined} enhName the enhancement chosen, by name
 * @param {() => string} newUid
 */
export function combatPatrolRoster(box, faction, enhName, newUid) {
  const det = faction?.detachments?.[0]
  if (!det?.linkedUnits?.length) return null
  const defOf = (id) => faction.units.find((u) => u.id === id)
  /** @type {Array<{ uid: string, id: string, size: number, warlord?: boolean, enh?: string }>} */
  const units = []
  for (const l of det.linkedUnits) {
    for (let k = 0; k < (l.count || 1); k++) {
      units.push({ uid: newUid(), id: l.unit, size: 0, ...(l.warlord && !units.some((u) => u.warlord) && { warlord: true }) })
    }
  }
  // The box page names an Upgrade plainly ("Goldenwrath"), the list data as appdata does
  // ("Goldenwrath (Upgrade)"): matched without the tag, stored as the list data names it.
  const key = (n) => foldName(String(n || '').replace(/\s*\(upgrade\)\s*$/i, ''))
  const enh = (det.enhancements || []).find((e) => key(e.name) === key(enhName))
  const bearer = enh && units.find((u) => enhEligible(enh, defOf(u.id)))
  if (bearer) bearer.enh = enh.name
  return { name: box.boxName, faction: box.slug, cp: box.id, detachments: [det.name], disposition: null, units }
}

/** The enhancement GW gives a box unless the player picks the other: the one flagged default. */
export function defaultCombatPatrolEnhancement(box) {
  return (box?.enhancements || []).find((e) => e.isDefault)?.name || box?.enhancements?.[0]?.name || null
}
