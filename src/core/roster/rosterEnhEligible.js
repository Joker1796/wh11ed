// @ts-check
// Who may carry an enhancement — read by the roster engine, the validator and gen-roster-data.mjs
// (a datasheet's "Led by" rows). A module of its own because the generator needs only this, not the
// whole engine.

import { foldName } from '../shared/foldName.js'
/** @typedef {import('../shared/roster.types.js').RosterUnit} RosterUnit */
/** @typedef {import('../shared/roster.types.js').Enhancement} Enhancement */

/**
 * @param {{ kws?: string[], name?: string } | null | undefined} unit
 * @param {string} name
 * @returns {boolean}
 */
export function hasKeyword(unit, name) {
  const n = foldName(name)
  // A unit the data no longer has (an entry left by a retired datasheet) has no keywords — the
  // validator's ally checks ask this of every unit in the army, and threw on one (2026-10-12).
  // Its name is one of them: "each datasheet name acts as an additional keyword" (Core Rules) —
  // appdata does not list it, so "BIG MEK model only" was offered to the Big Mek only because a
  // datasheet group happened to say so too (2026-10-15).
  return (unit?.kws || []).some((k) => foldName(k) === n) || (!!unit?.name && foldName(unit.name) === n)
}

// A tiny handful of enhancements (Necrons' Pantheon of Woe, Imperial Agents' Veiled Blade Elim.
// Force — see gen-roster-data.mjs ENH_REQ_FIXES) are locked to one exact datasheet by name
// ("X model only" in their rules text) rather than a general Character/Epic-Hero pool. Naming one
// specific unit is already maximally restrictive, so it overrides that unit's general noEnh/
// epic-without-epicOk gates below — those exist to keep *generic* enhancements off units that
// can't normally take them, not to block a unit from its own dedicated option.
/** @param {unknown} a @param {unknown} b */
const sameName = (a, b) => foldName(a) === foldName(b)

/**
 * @param {Enhancement} enh
 * @param {RosterUnit} def
 * @returns {boolean}
 */
export function lockedToExactUnit(enh, def) {
  return enh.req?.length === 1 && enh.req[0].kw?.length === 1 && enh.req[0].kw[0] === def.name
}

// Is an enhancement legal on this unit? Enhancements go on Characters (unless the enhancement is
// flagged for non-characters), never on Epic Heroes unless flagged, never on enhancement-barred
// units. Then the keyword gates: any excluded keyword disqualifies; the OR-groups of required
// keywords must have at least one group fully satisfied — its faction keywords (`fac`, against the
// unit's own `fkws`: a Knight-Centura is ANATHEMA PSYKANA in the Custodes book, a Shadowseer
// HARLEQUINS in the Aeldari one) and its per-unit keywords alike; a group may also name
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
/**
 * @param {Enhancement | null | undefined} enh
 * @param {RosterUnit | null | undefined} def
 * @param {string[]} [granted]
 * @returns {boolean}
 */
export function enhEligible(enh, def, granted = []) {
  if (!enh || !def) return false
  // What it needs besides keywords — an ability or an item carried (`needs`, appdata's
  // enhancement_datasheet_ability / _required_wargear_item): the unit must have each (`has`).
  if (enh.needs?.some((n) => !(def.has || []).includes(n))) return false
  // `granted` are keywords the ENTRY gained rather than the datasheet printing them — today the
  // allegiance upgrades that hand CHARACTER to a vehicle, which is precisely what makes it able to
  // carry an enhancement. Callers without an entry pass nothing and get the printed sheet's answer.
  /** @param {unknown} x */
  const lc = (x) => String(x || '').toLowerCase()
  /** @param {string} k */
  const has = (k) => hasKeyword(def, k) || granted.some((g) => lc(g) === lc(k))
  if (lockedToExactUnit(enh, def)) return !enh.exclKw?.some((k) => has(k))
  if (enh.lockDs?.length) return !!def.sid && enh.lockDs.includes(def.sid) && !enh.exclKw?.some((k) => has(k))
  if (def.flags?.noEnh) return false
  if (!def.flags?.char && !enh.nonCharOk && !granted.some((g) => lc(g) === 'character')) return false
  if (def.flags?.epic && !enh.epicOk) return false
  if (enh.exclKw?.some((k) => has(k))) return false
  if (enh.req?.length) {
    // `ds` — the group names one datasheet ("ARCHON model only"), matched by name like
    // lockedToExactUnit, apostrophes aside.
    // A unit with no `fkws` (a hand-built test unit) is taken as of the faction, as everything was
    // before 2026-10-24; every generated unit carries them (src/data/roster/index.test.js).
    /** @param {string} k */
    const fac = (k) => !def.fkws || def.fkws.some((f) => sameName(f, k))
    const ok = enh.req.some((g) => (!g.ds || sameName(g.ds, def.name)) && (g.fac || []).every(fac) && (g.kw || []).every((k) => has(k)))
    if (!ok) return false
  }
  return true
}
