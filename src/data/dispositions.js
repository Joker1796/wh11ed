// The five Force Dispositions (src/core/roster/dispositions.js) with the id and icon the screens
// draw them by. A module of its own so the Primary Mission matrix in missions.js can read them
// without importing the whole Event Companion (eventCompanion.js re-exports this list as its
// `dispositions`).
import { DISPOSITION_NAMES } from '../core/roster/dispositions.js'
import { slugify } from '../core/shared/slugify.js'

export const DISPOSITIONS = DISPOSITION_NAMES.map((name) => {
  const id = slugify(name)
  return { id, name, icon: `/images/event/dispo-${id}.webp` }
})

/** The icon of a disposition named as a detachment spells it (case aside), or ''. */
export function dispositionIcon(name) {
  const k = String(name || '').toLowerCase()
  return DISPOSITIONS.find((d) => d.name.toLowerCase() === k)?.icon || ''
}
