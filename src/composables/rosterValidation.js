// Roster validation — a pure module (no Vue, no store). Philosophy: NEVER block. Like the
// official app, we always compute a total and surface violations for the user to judge, rather
// than preventing an illegal list. Each issue is `{ code, level, uid?, params? }`; `code` maps
// to an i18n message (see RosterIssuesModal), `level` is 'error' (illegal) or 'warn'
// (incomplete / soft). `uid` ties an issue to a specific unit entry.
import { hasKeyword, canBeWarlord, enhEligible, rosterPoints } from './rosterEngine.js'

// Per-unit duplicate cap: the battle size's limit, doubled for Battleline / Dedicated Transport,
// and hard-capped at 1 for every Epic Hero — regardless of battle size (rule 25).
export function duplicateLimit(def, dupLimit) {
  if (def.flags?.epic) return 1
  if (hasKeyword(def, 'Battleline') || def.condBattleline || hasKeyword(def, 'Dedicated Transport')) return dupLimit * 2
  return dupLimit
}

export function validateRoster(roster, { faction, core } = {}) {
  const units = roster?.units || []
  const defMap = new Map((faction?.units || []).map((u) => [u.id, u]))
  const defOf = (id) => defMap.get(id)
  const battleSize = core?.battleSizes?.find((b) => b.id === roster?.battleSize) || null
  const detachment = (faction?.detachments || []).find((d) => d.sid === roster?.detachment) || null

  const points = rosterPoints(units, defOf, detachment)
  const issues = []
  const add = (code, level, extra) => issues.push({ code, level, ...extra })

  // Incompleteness (soft).
  if (!roster?.faction) add('noFaction', 'warn')
  else if (!roster?.detachment) add('noDetachment', 'warn')

  // Points limit.
  if (battleSize && points > battleSize.points) {
    add('overPoints', 'error', { params: { over: points - battleSize.points, limit: battleSize.points } })
  }

  // Duplicate datasheet limits.
  if (battleSize) {
    const byId = new Map()
    for (const u of units) { if (!byId.has(u.id)) byId.set(u.id, []); byId.get(u.id).push(u) }
    for (const [id, list] of byId) {
      const def = defOf(id)
      if (!def) continue
      const limit = duplicateLimit(def, battleSize.dupLimit)
      if (list.length > limit) {
        add('overDuplicate', 'error', { uid: list[limit].uid, params: { name: def.name, count: list.length, limit } })
      }
    }
  }

  // Warlord: exactly one, eligible, and matching a mandatory warlord if the detachment sets one.
  const warlords = units.filter((u) => u.warlord)
  if (units.length && warlords.length === 0) add('noWarlord', 'error')
  if (warlords.length > 1) add('manyWarlords', 'error', { uid: warlords[1].uid })
  for (const w of warlords) {
    const def = defOf(w.id)
    if (def && !canBeWarlord(def)) add('warlordIneligible', 'error', { uid: w.uid, params: { name: def.name } })
  }
  if (detachment?.mandWarlord && warlords.length === 1 && warlords[0].id !== detachment.mandWarlord) {
    add('mandatoryWarlord', 'warn', { uid: warlords[0].uid })
  }

  // Enhancements: each once, within the limit (counted ones only), on a legal unit.
  const enhUnits = units.filter((u) => u.enh)
  const enhSeen = new Set()
  for (const u of enhUnits) {
    if (enhSeen.has(u.enh)) add('dupEnh', 'error', { uid: u.uid, params: { enh: u.enh } })
    enhSeen.add(u.enh)
  }
  if (detachment && battleSize) {
    const counted = enhUnits.filter((u) => {
      const e = detachment.enhancements.find((x) => x.name === u.enh)
      return e && !e.uncounted
    }).length
    if (counted > battleSize.enhLimit) add('overEnhLimit', 'error', { params: { count: counted, limit: battleSize.enhLimit } })
  }
  for (const u of enhUnits) {
    if (!detachment) { add('enhNoDetachment', 'error', { uid: u.uid }); continue }
    const e = detachment.enhancements.find((x) => x.name === u.enh)
    const def = defOf(u.id)
    if (!e || (def && !enhEligible(e, def))) add('enhIneligible', 'error', { uid: u.uid, params: { enh: u.enh } })
  }

  // Leader attachments must point at a unit in the roster that this leader can actually join.
  for (const u of units) {
    if (!u.leaderOf) continue
    const def = defOf(u.id)
    const target = units.find((x) => x.uid === u.leaderOf)
    const canJoin = new Set((def?.leads || []).map((l) => l.to))
    if (!target || !canJoin.has(target.id)) add('leaderTargetInvalid', 'warn', { uid: u.uid })
  }

  // Detachment-excluded datasheets.
  if (detachment?.excludedUnits?.length) {
    const excl = new Set(detachment.excludedUnits)
    for (const u of units) if (excl.has(u.id)) add('unitExcluded', 'error', { uid: u.uid, params: { name: defOf(u.id)?.name || u.id } })
  }

  const errorCount = issues.filter((i) => i.level === 'error').length
  return { points, issues, errorCount }
}
