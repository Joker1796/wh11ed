// Roster validation — a pure module (no Vue, no store). Philosophy: NEVER block. Like the
// official app, we always compute a total and surface violations for the user to judge, rather
// than preventing an illegal list. Each issue is `{ code, level, uid?, params? }`; `code` maps
// to an i18n message (see RosterIssuesModal), `level` is 'error' (illegal) or 'warn'
// (incomplete / soft). `uid` ties an issue to a specific unit entry.
import { hasKeyword, canBeWarlord, enhEligible, findEnhancement, rosterPoints, effectiveBattle, capKeyOf, leadsFor, wargearGroupCap, wargearGroupLive, wargearGroupSpent, modelsPerMini, allegFor, allegKeyword } from './rosterEngine.js'

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

  // An entry whose datasheet the faction data no longer has. Rosters live in localStorage for as
  // long as the user keeps them and the generated data is replaced on every deploy, so a GW rename
  // (or a unit dropped from the codex) leaves entries pointing at nothing. Every other reader
  // filters those out — the grouped lists, the export, the points total — so without this the unit
  // silently vanishes and the army quietly gets cheaper. Reported, not removed: which unit to put
  // back is the player's call, and the entry still carries their wargear picks.
  if (faction) {
    for (const u of units) if (u.id && !defOf(u.id)) add('unknownUnit', 'error', { uid: u.uid, params: { id: u.id } })
  }

  // Points limit.
  if (points > battle.points) {
    add('overPoints', 'error', { params: { over: points - battle.points, limit: battle.points } })
  }

  // Detachment-Points budget: the selected detachments' costs must fit the battle size's DP.
  const dpSpent = detachments.reduce((s, d) => s + (d.dp || 0), 0)
  if (dpSpent > battle.dp) add('overDp', 'error', { params: { spent: dpSpent, limit: battle.dp } })

  // Detachment tags: "This detachment has the DYNASTY tag and cannot be taken with another DYNASTY
  // detachment" (core rules 25.04). 26 tags across 17 factions, and 19 of those pairs fit inside a
  // 3 DP budget, so this is reachable in two clicks — the editor's picker greys the second one out,
  // and this catches a list that was imported or built before the tag was known.
  {
    const byTag = new Map()
    for (const d of detachments) {
      if (!d.unique) continue
      if (!byTag.has(d.unique)) byTag.set(d.unique, [])
      byTag.get(d.unique).push(d.name)
    }
    for (const [tag, names] of byTag) {
      if (names.length > 1) add('detachmentTagClash', 'error', { params: { tag, names: names.join(', ') } })
    }
  }

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

  // Wargear pick limits. The editor caps the steppers as you click, so this can only fire on a
  // list that was legal when it was built and stopped being one — almost always by SHRINKING the
  // unit ("up to 4 at 10 models" → 2 when it drops to 5). Reported, never auto-trimmed: which
  // weapon to give up is the player's call, not ours.
  for (const u of units) {
    const def = defOf(u.id)
    for (const [gi] of (def?.gear || []).entries()) {
      const cap = wargearGroupCap(def, u, gi)
      if (!wargearGroupLive(def, u, gi)) continue
      if (!cap) {
        // No structural cap: the ceiling is however many models the group belongs to, which on a
        // multi-profile datasheet is that PROFILE's count ("any number of Sicarian Ruststalkers"
        // excludes the Princeps). Deliberately conservative — a "for every 5 models" group has a
        // tighter limit still, but its wording isn't available here, so this only reports what it
        // can prove, never a guess.
        const g = def.gear[gi]
        const own = g.all || g.m == null ? null : modelsPerMini(def, u)?.get(g.m)
        const used = wargearGroupSpent(u, gi)
        if (own != null && used > own) {
          add('overWargearLimit', 'error', { uid: u.uid, params: { name: def.name, count: used, limit: own } })
        }
        continue
      }
      const spent = wargearGroupSpent(u, gi)
      if (spent > cap.limit) {
        add('overWargearLimit', 'error', { uid: u.uid, params: { name: def.name, count: spent, limit: cap.limit } })
        continue
      }
      const over = cap.dup && (u.wg || []).find(([g, , n]) => g === gi && (n || 1) > cap.dup)
      if (over) add('overWargearDup', 'error', { uid: u.uid, params: { name: def.name, count: over[2] || 1, limit: cap.dup } })
    }
  }

  // Allegiance choices — the mark a unit must pick, and the army-wide cap on the optional upgrades.
  {
    const spentByGroup = new Map()
    for (const u of units) {
      const def = defOf(u.id)
      const a = allegFor(def, detachments)
      if (!a) continue
      if (u.alleg) spentByGroup.set(a.g, (spentByGroup.get(a.g) || 0) + 1)
      else if (a.req) add('allegMissing', 'error', { uid: u.uid, params: { name: def.name, group: a.t || a.g } })
    }
    // "Select up to 3 …" is a cap; "select 3 …" (Chaos Knights' Houndpack Lance, min 3 / max 3) is
    // also a floor, and a list one War Dog short of it is illegal in the same way one over is.
    const capOf = new Map()
    for (const u of units) {
      const a = allegFor(defOf(u.id), detachments)
      if (a?.max || a?.min) capOf.set(a.g, { max: a.max, min: a.min, t: a.t || a.g })
    }
    for (const [g, { max, min, t }] of capOf) {
      const spent = spentByGroup.get(g) || 0
      if (max && spent > max) add('allegOverLimit', 'error', { params: { group: t, count: spent, limit: max } })
      if (min && spent < min) add('allegUnderLimit', 'error', { params: { group: t, count: spent, limit: min } })
    }

    // "A Character unit can only be attached to a unit if both units share the same keyword" —
    // the restriction printed in the Marks of Chaos detachment rule. Scoped to that group by key,
    // because it is that rule's own wording, not a property of allegiances in general: the
    // CHARACTER-granting upgrades carry no such clause.
    for (const u of units) {
      if (!u.leaderOf || !u.alleg) continue
      const own = allegFor(defOf(u.id), detachments)
      if (own?.g !== 'mark-of-chaos') continue
      const target = units.find((x) => x.uid === u.leaderOf)
      if (!target?.alleg || target.alleg === u.alleg) continue
      add('allegMismatch', 'error', {
        uid: u.uid,
        params: { name: defOf(u.id)?.name, own: u.alleg, target: defOf(target.id)?.name, theirs: target.alleg },
      })
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
  // An enhancement its own rules bar from the Warlord (World Eaters' Disciple of Khorne).
  for (const w of warlords) {
    const e = w.enh && findEnhancement(detachments, w.enh)
    if (e?.notWarlord) add('enhNotWarlord', 'error', { uid: w.uid, params: { enh: w.enh } })
  }

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
    // Asked about the ENTRY, not the printed datasheet — the same question enhOptionsFor answers
    // when the editor offers the enhancement in the first place. An allegiance upgrade can hand a
    // vehicle CHARACTER (Solar Spearhead, Steel Hammer), and that is exactly what lets it carry one;
    // reading only `def` here made the editor offer Honoured Fallen to a Telemon Dreadnought and
    // the validator call the same list illegal.
    const granted = [allegKeyword(def, u, detachments)].filter(Boolean)
    if (!e || (def && !enhEligible(e, def, granted))) add('enhIneligible', 'error', { uid: u.uid, params: { enh: u.enh } })
  }

  // "No unit (including ATTACHED units) can have more than one enhancement" (core rules, Muster —
  // src/data/muster.js). Every check above asks about one entry; an attached unit is several
  // entries that fight as a single unit, so a Leader with an enhancement joining a bodyguard unit
  // whose other Leader also has one breaks the rule without any single entry being wrong. Grouped
  // by the unit that is actually on the table: the attach target, or the entry itself.
  {
    const byUnit = new Map()
    for (const u of enhUnits) {
      const host = u.leaderOf || u.uid
      if (!byUnit.has(host)) byUnit.set(host, [])
      byUnit.get(host).push(u)
    }
    for (const list of byUnit.values()) {
      // Flag the extras, not the whole group — the same shape dupEnh uses, so the issue points at
      // an entry the reader can act on rather than at every part of the attached unit.
      for (const u of list.slice(1)) add('enhAttachedDup', 'error', { uid: u.uid, params: { enh: u.enh } })
    }
  }

  // Leader attachments must point at a unit in the roster that this leader can actually join.
  for (const u of units) {
    if (!u.leaderOf) continue
    const def = defOf(u.id)
    const target = units.find((x) => x.uid === u.leaderOf)
    // leadsFor, not def.leads: an enhancement can grant an attach the datasheet doesn't list.
    const canJoin = new Set(leadsFor(def, u, detachments).map((l) => l.to))
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
      const type = leadsFor(defOf(u.id), u, detachments)
        .find((l) => l.to === units.find((x) => x.uid === u.leaderOf)?.id)?.type || ''
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
