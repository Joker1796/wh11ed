// Who may carry an enhancement — read by the roster builder (through rosterEngine.js, which
// re-exports these) and by gen-roster-data.mjs for a datasheet's "Led by" rows. A module of its
// own, without imports, so the Node generator can load it: rosterEngine.js pulls a JSON file in,
// and plain Node will not import that.

export function hasKeyword(unit, name) {
  const n = name.toLowerCase()
  return (unit.kws || []).some((k) => k.toLowerCase() === n)
}

// A tiny handful of enhancements (Necrons' Pantheon of Woe, Imperial Agents' Veiled Blade Elim.
// Force — see gen-roster-data.mjs ENH_REQ_FIXES) are locked to one exact datasheet by name
// ("X model only" in their rules text) rather than a general Character/Epic-Hero pool. Naming one
// specific unit is already maximally restrictive, so it overrides that unit's general noEnh/
// epic-without-epicOk gates below — those exist to keep *generic* enhancements off units that
// can't normally take them, not to block a unit from its own dedicated option.
const sameName = (a, b) => String(a).replace(/[\u2019']/g, "'").toLowerCase() === String(b).replace(/[\u2019']/g, "'").toLowerCase()

export function lockedToExactUnit(enh, def) {
  return enh.req?.length === 1 && enh.req[0].kw?.length === 1 && enh.req[0].kw[0] === def.name
}

// Is an enhancement legal on this unit? Enhancements go on Characters (unless the enhancement is
// flagged for non-characters), never on Epic Heroes unless flagged, never on enhancement-barred
// units. Then the keyword gates: any excluded keyword disqualifies; the OR-groups of required
// keywords must have at least one group fully satisfied (faction-keyword parts are satisfied by
// being in the faction, so only the per-unit keywords are checked here); a group may also name
// one datasheet (`ds`, appdata's own "ARCHON model only"). `lockDs` narrows to specific datasheets
// by `sid`, overriding those keyword gates the same way lockedToExactUnit does.
//
// Its ONLY source is gen-roster-data.mjs's hand-curated ENH_LOCK_FIXES — an enhancement whose
// prose names one unit while appdata records neither a keyword nor a datasheet for it. Empty since
// 2026-10-07, when appdata's datasheet groups (`ds`) turned out to say all of them. It used to ALSO be fed by appdata's enhancement_bodyguard_group, which was a
// misreading (those tables list the units the BEARER may attach to, not who may take it) and
// inverted eligibility for all 13 attach-granting enhancements — Murdermind was offered on
// Skorpekh Destroyers and refused to every Cryptek. That source was removed on 2026-08-19; if a
// future audit sees `lockDs` on an enhancement that is not in ENH_LOCK_FIXES, it has come back.
export function enhEligible(enh, def, granted = []) {
  if (!enh || !def) return false
  // `granted` are keywords the ENTRY gained rather than the datasheet printing them — today the
  // allegiance upgrades that hand CHARACTER to a vehicle, which is precisely what makes it able to
  // carry an enhancement. Callers without an entry pass nothing and get the printed sheet's answer.
  const lc = (x) => String(x || '').toLowerCase()
  const has = (k) => hasKeyword(def, k) || granted.some((g) => lc(g) === lc(k))
  if (lockedToExactUnit(enh, def)) return !enh.exclKw?.some((k) => has(k))
  if (enh.lockDs?.length) return enh.lockDs.includes(def.sid) && !enh.exclKw?.some((k) => has(k))
  if (def.flags?.noEnh) return false
  if (!def.flags?.char && !enh.nonCharOk && !granted.some((g) => lc(g) === 'character')) return false
  if (def.flags?.epic && !enh.epicOk) return false
  if (enh.exclKw?.some((k) => has(k))) return false
  if (enh.req?.length) {
    // `ds` — the group names one datasheet ("ARCHON model only"), matched by name like
    // lockedToExactUnit, apostrophes aside.
    const ok = enh.req.some((g) => (!g.ds || sameName(g.ds, def.name)) && (g.kw || []).every((k) => has(k)))
    if (!ok) return false
  }
  return true
}
