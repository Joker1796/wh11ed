// @ts-check
// Which Combat Patrol box an army in a game is playing. A faction can have several boxes
// (Adeptus Custodes: Tristraen's Gilded Blades, Aquilan Talon, Aquilan Wing — data 981), and
// each box fixes ONE detachment of its own name, so the game already records the box: it is the
// box whose rule the army's detachment names. No field of its own in the saved game — a game from
// before the choice existed (or from a faction with one box) resolves to the faction's first box,
// which is what it was played with. `boxes` is combatPatrol.<locale>.factions; the match reads the
// detachment name, which stays English in both locales.
import { foldName as norm } from '../shared/foldName.js'

/** @typedef {import('../shared/roster.types.js').CombatPatrolBox} CombatPatrolBox */

/**
 * @param {CombatPatrolBox[] | undefined} boxes
 * @param {string | undefined} slug
 */
export function combatPatrolBoxesOf(boxes, slug) {
  return (boxes || []).filter((b) => b.slug === slug)
}

/**
 * @param {CombatPatrolBox[] | undefined} boxes
 * @param {{ factionSlug?: string, detachments?: string[] } | null | undefined} army
 */
export function combatPatrolBoxOf(boxes, army) {
  const mine = combatPatrolBoxesOf(boxes, army?.factionSlug)
  if (!mine.length) return null
  const det = norm(army?.detachments?.[0])
  return (det && mine.find((b) => norm(b.rule?.name) === det)) || mine[0]
}

/**
 * The same box in another locale's list: boxes are matched on the English one, by id.
 * @param {Record<string, { factions?: CombatPatrolBox[] } | undefined>} combatPatrol the whole dataset, by locale
 * @param {string} loc
 * @param {{ factionSlug?: string, detachments?: string[] } | null | undefined} army
 */
export function combatPatrolBoxIn(combatPatrol, loc, army) {
  const en = combatPatrolBoxOf(combatPatrol.en?.factions, army)
  return en ? combatPatrol[loc]?.factions?.find((b) => b.id === en.id) || null : null
}
