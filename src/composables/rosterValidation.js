// Roster validation — a pure module (no Vue, no store). Philosophy: NEVER block. Like the
// official app, we always compute a total and surface violations for the user to judge, rather
// than preventing an illegal list. Each issue is `{ code, level, uid?, params? }`; `code` maps
// to an i18n message (see RosterIssuesModal), `level` is 'error' (illegal) or 'warn'
// (incomplete / soft). `uid` ties an issue to a specific unit entry.
import { hasKeyword, canBeWarlord, enhEligible, findEnhancement, rosterPoints, effectiveBattle, capKeyOf } from './rosterEngine.js'

// Per-unit duplicate cap: the battle size's limit, doubled for Battleline / Dedicated Transport,
// and hard-capped at 1 for every Epic Hero — regardless of battle size (rule 25).
export function duplicateLimit(def, dupLimit) {
  if (def.flags?.epic) return 1
  if (hasKeyword(def, 'Battleline') || def.condBattleline || hasKeyword(def, 'Dedicated Transport')) return dupLimit * 2
  return dupLimit
}

// How many roster entries currently occupy each duplicate-cap "slot" (rosterEngine.js's
// capKeyOf — normally one per datasheet id, but a future same-character/multiple-datasheets
// case would share a key). Shared by validateRoster's own check below and
// RosterUnitBrowser.vue's live add-button guard, so the two never disagree about the count.
export function duplicateCounts(units, defOf) {
  const m = new Map()
  for (const u of units || []) {
    const def = defOf(u.id)
    if (!def) continue
    const key = capKeyOf(def)
    m.set(key, (m.get(key) || 0) + 1)
  }
  return m
}

export function validateRoster(roster, { faction, core } = {}) {
  const units = roster?.units || []
  const defMap = new Map((faction?.units || []).map((u) => [u.id, u]))
  const defOf = (id) => defMap.get(id)
  const battle = effectiveBattle(roster, core)
  // Selected detachments (roster stores names, like the tracker) → their data objects.
  const detachments = (roster?.detachments || [])
    .map((name) => (faction?.detachments || []).find((d) => d.name === name))
    .filter(Boolean)

  const points = rosterPoints(units, defOf, detachments)
  const issues = []
  const add = (code, level, extra) => issues.push({ code, level, ...extra })

  // Incompleteness (soft).
  if (!roster?.faction) add('noFaction', 'warn')
  else if (!roster?.detachments?.length) add('noDetachment', 'warn')

  // Points limit.
  if (points > battle.points) {
    add('overPoints', 'error', { params: { over: points - battle.points, limit: battle.points } })
  }

  // Detachment-Points budget: the selected detachments' costs must fit the battle size's DP.
  const dpSpent = detachments.reduce((s, d) => s + (d.dp || 0), 0)
  if (dpSpent > battle.dp) add('overDp', 'error', { params: { spent: dpSpent, limit: battle.dp } })

  // Duplicate datasheet limits — grouped by capKeyOf, not raw id, so a future same-character/
  // multiple-datasheets case (see rosterEngine.js's capKeyOf) is capped as one slot.
  {
    const byKey = new Map()
    for (const u of units) {
      const def = defOf(u.id)
      if (!def) continue
      const key = capKeyOf(def)
      if (!byKey.has(key)) byKey.set(key, [])
      byKey.get(key).push(u)
    }
    for (const list of byKey.values()) {
      const def = defOf(list[0].id)
      const limit = duplicateLimit(def, battle.dupLimit)
      if (list.length > limit) {
        const over = defOf(list[limit].id) || def
        add('overDuplicate', 'error', { uid: list[limit].uid, params: { name: over.name, count: list.length, limit } })
      }
    }
  }

  // Warlord: exactly one, eligible, and matching a mandatory warlord if the detachment sets one.
  const warlords = units.filter((u) => u.warlord)
  if (units.length && warlords.length === 0) add('noWarlord', 'error')
  if (warlords.length > 1) add('manyWarlords', 'error', { uid: warlords[1].uid })
  for (const w of warlords) {
    const def = defOf(w.id)
    if (def && !canBeWarlord(def, detachments)) add('warlordIneligible', 'error', { uid: w.uid, params: { name: def.name } })
  }
  // A detachment can name MORE THAN ONE candidate (Aeldari's "Devoted of Ynnead": Yvraine OR The
  // Yncarne) — every detachment's own list is an OR-alternative, flattened across all selected
  // detachments (gen-roster-data.mjs's detMandWarlord already collects every row per detachment).
  const mandWarlords = detachments.flatMap((d) => d.mandWarlord || [])
  if (mandWarlords.length && warlords.length === 1 && !mandWarlords.includes(warlords[0].id)) {
    add('mandatoryWarlord', 'warn', { uid: warlords[0].uid })
  }
  // Supreme Commander ("if this model is in your army, it must be your Warlord" — a hard RAW
  // rule, unlike the detachment-level mandatory pick above): 17 datasheets in the game carry this
  // (Guilliman, Ghazghkull, Abaddon, …). Two of them (Belisarius Cawl / Thulia Ghuld) can legally
  // be fielded in the SAME army — nothing in wh40k-appdata prevents it — which makes the rule
  // impossible to satisfy for both at once, so that combination is flagged as its own conflict
  // rather than silently picking a winner.
  const supremeUnits = units.filter((u) => defOf(u.id)?.flags?.supreme)
  const supremeIds = new Set(supremeUnits.map((u) => u.id))
  if (supremeIds.size > 1) {
    for (const u of supremeUnits) add('supremeCommanderConflict', 'error', { uid: u.uid, params: { name: defOf(u.id)?.name } })
  } else if (supremeUnits.length === 1 && !supremeUnits[0].warlord) {
    add('supremeCommanderNotWarlord', 'error', { uid: supremeUnits[0].uid, params: { name: defOf(supremeUnits[0].id)?.name } })
  }

  // Enhancements: each up to its own per-name cap (an "(Upgrade)" enhancement — see
  // rosterEngine.js's enhOptionsFor — explicitly allows several units to share the same one,
  // ordinary enhancements cap at 1), within the army-wide enhancement-slot limit (counted ones
  // only), on a legal unit.
  const enhUnits = units.filter((u) => u.enh)
  const byEnhName = new Map()
  for (const u of enhUnits) {
    if (!byEnhName.has(u.enh)) byEnhName.set(u.enh, [])
    byEnhName.get(u.enh).push(u)
  }
  for (const [name, list] of byEnhName) {
    const limit = findEnhancement(detachments, name)?.limit || 1
    for (const u of list.slice(limit)) add('dupEnh', 'error', { uid: u.uid, params: { enh: name } })
  }
  if (detachments.length) {
    const counted = enhUnits.filter((u) => {
      const e = findEnhancement(detachments, u.enh)
      return e && !e.uncounted
    }).length
    if (counted > battle.enhLimit) add('overEnhLimit', 'error', { params: { count: counted, limit: battle.enhLimit } })
  }
  for (const u of enhUnits) {
    if (!detachments.length) { add('enhNoDetachment', 'error', { uid: u.uid }); continue }
    const e = findEnhancement(detachments, u.enh)
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

  // A Bodyguard unit takes one Leader AND one Support at a time (the two are independent slots —
  // see rosterEngine.js leaderTargetsFor), so group by (target, type) rather than target alone.
  // The picker already disables an occupied target of the same type; this catches it anyway for
  // data that predates that guard (or a detachment swap that left two of the same type attached).
  {
    const byTargetType = new Map()
    for (const u of units) {
      if (!u.leaderOf) continue
      const type = defOf(u.id)?.leads?.find((l) => l.to === units.find((x) => x.uid === u.leaderOf)?.id)?.type || ''
      const key = `${u.leaderOf}:${type}`
      if (!byTargetType.has(key)) byTargetType.set(key, [])
      byTargetType.get(key).push(u)
    }
    for (const leaders of byTargetType.values()) {
      if (leaders.length > 1) for (const u of leaders.slice(1)) add('manyLeaders', 'error', { uid: u.uid })
    }
  }

  // Detachment-excluded datasheets (union across the selected detachments).
  const excl = new Set(detachments.flatMap((d) => d.excludedUnits || []))
  if (excl.size) {
    for (const u of units) if (excl.has(u.id)) add('unitExcluded', 'error', { uid: u.uid, params: { name: defOf(u.id)?.name || u.id } })
  }

  const errorCount = issues.filter((i) => i.level === 'error').length
  return { points, issues, errorCount }
}
