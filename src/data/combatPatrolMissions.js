// How a Combat Patrol game is played: each box's own primary mission, the twelve-step mission
// sequence and the three deployment maps (generated: src/data/combatPatrolMissionsData.js, from
// appdata) with their RU overlay. The box page, the "How to play" page and the tracker all read
// them through here. A mission's slug is `cp-<box id>`, a namespace of its own beside the
// Chapter Approved slugs of missions.js — the tracker stores it as a player's `primarySlug`.
import { combatPatrolMissionsData as data } from './combatPatrolMissionsData.js'
import { combatPatrolMissionsRu as ru } from './combatPatrolMissionsRu.js'
import { overlayMission } from './missionOverlay.js'
import { combatPatrolBoxOf } from '../core/roster/combatPatrolBox.js'

export const CP_MISSION_PREFIX = 'cp-'
export const isCpMissionSlug = (slug) => typeof slug === 'string' && slug.startsWith(CP_MISSION_PREFIX)

/** The box's mission, in the reader's language. */
export function cpMissionOfBox(boxId, locale = 'en') {
  const m = data.missions[boxId] || null
  return locale === 'ru' ? overlayMission(m, ru.missions[boxId]) : m
}

/** The mission slug of the box an army in a game is playing ({ factionSlug, detachments }), or null. */
const BOXES = data.boxes.map((b) => ({ id: b.id, slug: b.slug, rule: { name: b.rule } }))
export function cpMissionSlugFor(army) {
  const box = combatPatrolBoxOf(BOXES, army)
  return box && data.missions[box.id] ? CP_MISSION_PREFIX + box.id : null
}

/** A mission by its tracker slug (`cp-<box id>`). */
export function cpMissionBySlug(slug, locale = 'en') {
  return isCpMissionSlug(slug) ? cpMissionOfBox(slug.slice(CP_MISSION_PREFIX.length), locale) : null
}

/** The mission sequence: [{ id, title, body }], `body` in block markup. */
export function cpSequence(locale = 'en') {
  return data.sequence.map((s) => (locale === 'ru' && ru.sequence[s.id] ? { ...s, ...ru.sequence[s.id] } : s))
}

/** The deployment maps: [{ id: 'A'|'B'|'C', image }]. */
export const cpLayouts = data.layouts

/** The deployment map a D6 result picks: 1–2 → A, 3–4 → B, 5–6 → C. */
export const cpLayoutForRoll = (d6) => (d6 <= 2 ? 'A' : d6 <= 4 ? 'B' : 'C')
