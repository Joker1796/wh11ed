// Plain-text roster export — a shareable army list in the style of the official app. English
// names throughout (unit / detachment / wargear names are EN by convention). Pure function.
import { UNIT_GROUPS, bucketOf, enhancementPoints, unitPoints, rosterPoints, effectiveBattle } from './rosterEngine.js'

const GROUP_TITLES = {
  epic: 'EPIC HEROES', characters: 'CHARACTERS', battleline: 'BATTLELINE',
  transports: 'DEDICATED TRANSPORTS', other: 'OTHER',
}

// Names of the wargear items a unit entry has swapped/added, for the export line.
function wargearNames(def, entry, items) {
  if (!entry.wg?.length) return []
  return entry.wg.map(([gi, oi, n]) => {
    const opt = def.gear?.[gi]?.o?.[oi]
    if (!opt) return null
    const name = items?.[opt[0]] || ''
    return n > 1 ? `${name} ×${n}` : name
  }).filter(Boolean)
}

export function buildRosterText(roster, { faction, core, items } = {}) {
  const defMap = new Map((faction?.units || []).map((u) => [u.id, u]))
  const defOf = (id) => defMap.get(id)
  const detachments = (roster?.detachments || [])
    .map((name) => (faction?.detachments || []).find((d) => d.name === name))
    .filter(Boolean)
  const battle = effectiveBattle(roster, core)
  const total = rosterPoints(roster?.units, defOf, detachments)

  const lines = []
  lines.push(roster?.name || 'Roster')
  const header = [faction?.name, ...(roster?.detachments || [])].filter(Boolean).join(' — ')
  if (header) lines.push(header)
  const sizeName = battle.custom ? 'Custom' : (core?.battleSizes?.find((b) => b.id === roster?.battleSize)?.name || '')
  lines.push(`${sizeName ? `${sizeName} ` : ''}(${total}/${battle.points} pts)`)

  // Copy index per datasheet id (for the copy tax), matching how points are summed.
  const seen = new Map()
  const copyIdx = new Map()
  for (const e of roster?.units || []) {
    const ci = (seen.get(e.id) || 0) + 1
    seen.set(e.id, ci)
    copyIdx.set(e.uid, ci)
  }

  for (const gid of UNIT_GROUPS) {
    const entries = (roster?.units || []).filter((e) => { const d = defOf(e.id); return d && bucketOf(d) === gid })
    if (!entries.length) continue
    lines.push('', GROUP_TITLES[gid])
    for (const e of entries) {
      const def = defOf(e.id)
      const pts = unitPoints(def, e, copyIdx.get(e.uid), detachments)
      const size = def.sizes[e.size ?? 0] || def.sizes[0]
      const models = e.count ?? size.per[0]
      const sizeStr = size.per[1] > 1 ? ` (${models})` : ''
      lines.push(`  ${def.name}${sizeStr} — ${pts} pts`)
      if (e.warlord) lines.push('    • Warlord')
      if (e.enh) lines.push(`    • Enhancement: ${e.enh} (+${enhancementPoints(detachments, e)})`)
      for (const wn of wargearNames(def, e, items)) lines.push(`    • ${wn}`)
      if (e.leaderOf) {
        const target = (roster.units || []).find((x) => x.uid === e.leaderOf)
        const tName = target && defOf(target.id)?.name
        if (tName) lines.push(`    • Leading: ${tName}`)
      }
    }
  }

  lines.push('', `Total: ${total} / ${battle.points} pts`)
  return lines.join('\n')
}
