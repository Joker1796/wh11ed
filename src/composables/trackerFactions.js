// Faction / detachment data for the tracker setup wizard. Split out of useTracker.js so
// the store module (imported by every in-game/finished tracker screen) no longer pulls in
// mfmFactions.js (~290 KB of points/detachment data). Only GameSetup needs this, so it
// loads with the setup chunk instead of bloating the playing/breakdown views.
import { mfmFactions } from '../data/mfmFactions.js'
import { combatPatrolIndex } from '../data/combatPatrolIndex.js'

export const FACTIONS = mfmFactions.en.map(f => ({ slug: f.slug, name: f.name }))

// Visual grouping of factions for the setup dropdown (`<optgroup>`) — the full list is
// always selectable, the four groups only improve readability. Group ids map to labels
// in ui.js (`factionGroup*`). Factions not listed here fall into an "other" group, so
// new MFM factions never silently disappear from the picker.
const FACTION_GROUP_SLUGS = {
  astartes: ['space-marines', 'black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'grey-knights', 'space-wolves'],
  imperium: ['adepta-sororitas', 'adeptus-custodes', 'adeptus-mechanicus', 'astra-militarum', 'imperial-agents', 'imperial-knights', 'titan-legions'],
  chaos: ['chaos-space-marines', 'death-guard', 'thousand-sons', 'world-eaters', 'emperors-children', 'chaos-daemons', 'chaos-knights', 'chaos-titan-legions'],
  xenos: ['aeldari', 'drukhari', 'necrons', 'orks', 'tau-empire', 'tyranids', 'genestealer-cults', 'leagues-of-votann'],
}
export const FACTION_GROUPS = (() => {
  const byName = (a, b) => a.name.localeCompare(b.name)
  const seen = new Set()
  const groups = ['astartes', 'imperium', 'chaos', 'xenos'].map(id => {
    const factions = FACTION_GROUP_SLUGS[id]
      .map(slug => FACTIONS.find(f => f.slug === slug))
      .filter(Boolean)
    factions.forEach(f => seen.add(f.slug))
    return { id, factions: factions.sort(byName) }
  })
  const other = FACTIONS.filter(f => !seen.has(f.slug)).sort(byName)
  if (other.length) groups.push({ id: 'other', factions: other })
  return groups
})()

// Same grouping as FACTION_GROUPS, filtered down to factions that have a Combat Patrol box
// (combatPatrolIndex.js) — used by the faction picker when Game Setup's "Тип игры" is set to
// Combat Patrol, so a player can't pick a faction with no CP content to select a box from.
export const COMBAT_PATROL_FACTION_GROUPS = (() => {
  const cpSlugs = new Set(combatPatrolIndex.map(f => f.slug))
  return FACTION_GROUPS
    .map(g => ({ ...g, factions: g.factions.filter(f => cpSlugs.has(f.slug)) }))
    .filter(g => g.factions.length)
})()

export function factionBySlug(slug) {
  return mfmFactions.en.find(f => f.slug === slug) || null
}
export function detachmentsFor(slug) {
  const f = factionBySlug(slug)
  return f ? f.detachments : []
}
export function detachmentInfo(slug, name) {
  return detachmentsFor(slug).find(d => d.name === name) || null
}
