// The units of a side's attached list an Upgrade card may go to (Declare Battle Formations,
// DomUpgradesEditor): each with its name, its keywords as the datasheet prints them and whether it
// is the Warlord — what src/core/dominatus/upgrades.js reads. Empty when the side fields no list;
// the editor then takes the unit as text. Imported when the pre-battle step shows, with the list's
// faction data, never with the game screen — the same way the CP tab asks for a stratagem's unit
// (stratagemPlay.js loadStratTargets).

/**
 * @param {any} side a game player
 * @returns {Promise<Array<{ uid: string, mi: number, name: string, kws: string[], warlord: boolean }>>}
 */
export async function loadUpgradeUnits(side) {
  const [{ membersOf, rosterFromPlayer }, { loadRosterFaction }, { usesAllies }] = await Promise.all([
    import('./rosterGameLink.js'),
    import('../data/roster/index.js'),
    import('../core/roster/rosterEngine.js'),
  ])
  const out = []
  for (const [mi, m] of membersOf(side).entries()) {
    const roster = rosterFromPlayer(m)
    if (!roster?.units?.length) continue
    const data = await loadRosterFaction(roster.faction || m.factionSlug, { allies: usesAllies(roster), cp: roster.cp || null }).catch(() => null)
    const defs = new Map((data?.units || []).map((u) => [u.id, u]))
    for (const u of roster.units) {
      const def = defs.get(u.id)
      out.push({ uid: u.uid, mi, name: def?.name || u.id, kws: def?.kws || [], warlord: !!u.warlord })
    }
  }
  // Two squads of one datasheet are two units: numbered, so the picker tells them apart.
  const count = new Map()
  for (const u of out) count.set(u.name, (count.get(u.name) || 0) + 1)
  const seen = new Map()
  for (const u of out) {
    if (count.get(u.name) < 2) continue
    const n = (seen.get(u.name) || 0) + 1
    seen.set(u.name, n)
    u.name = `${u.name} ${n}`
  }
  return out
}
