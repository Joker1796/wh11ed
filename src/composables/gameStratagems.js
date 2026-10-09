// The armies of a game in progress, read from the faction rules data: the core stratagems (Core
// Rules §15), each side's detachment stratagems, and each army's rules (the army rule, its
// detachments' rules). Shared by the Stratagems page (a game on, it adds both sides' decks) and
// the game screen's CP and Armies tabs.
//
// The faction files are heavy and are imported dynamically, per side, only when a caller asks —
// the game screen must never carry a faction bundle in its own chunk (root CLAUDE.md: the game
// screen stays light). Every stratagem comes back with fields derived from its ENGLISH text, so
// the phase grouping, the side a phase belongs to and the usage limits are the same in EN and RU:
//   _phases  — phasesOf(when)         _sides — phaseSidesOf(when)
//   _cost    — the printed cost as a number (every cost in the data is "1CP" or "2CP")
//   _limits  — usageLimits(restrictions)
//   _key     — a stable id within the game: the core number, or detachment|name
//   _enName  — the English name (the card's modifier records name it so)
//   _target  — the English TARGET line: whether the stratagem is aimed at a unit, and whose
//   _detId   — the detachment's id (detachment stratagems), what the modifier records point at
import { mergeSections } from './useBilingualMerge.js'
import { membersOf } from './rosterGameLink.js'
import { phasesOf, phaseSidesOf } from './stratagemPhases.js'
import { detachmentSources } from '../data/detachmentSources.js'

// A stratagem's own usage limits, from its ENGLISH restrictions. Only limits on USING the
// stratagem — "you cannot select the same model more than once per battle" is about a target
// the tracker does not know, and is left to the players. The phrasings are the ones the data
// holds (gameStratagems.test.js counts them):
//   perBattle — "You can only use this Stratagem once per battle." / "…more than once per battle."
//   perRound  — "…once per battle round."   perTurn — "…once per turn."
//   minRound  — "…during the first battle round" (2) / "…during the first or second battle rounds" (3)
export function usageLimits(restrictions) {
  const t = String(restrictions || '').replace(/\[gloss:[^:\]]*:([^\]]*)\]/g, '$1').replace(/\*\*/g, '')
  const use = '(?:can only use this stratagem|cannot use this stratagem more than)'
  const out = {}
  if (new RegExp(`${use} once per battle(?! round)`, 'i').test(t)) out.perBattle = true
  if (new RegExp(`${use} once per battle round`, 'i').test(t)) out.perRound = true
  if (new RegExp(`${use} once per turn`, 'i').test(t)) out.perTurn = true
  if (/cannot use this stratagem during the first or second battle rounds?/i.test(t)) out.minRound = 3
  else if (/cannot use this stratagem during the first battle round/i.test(t)) out.minRound = 2
  return out
}

const costOf = (cp) => parseInt(String(cp || '').replace(/\D+/g, ''), 10) || 0

function derive(localized, en, key) {
  return {
    ...localized,
    _phases: phasesOf(en?.when),
    _sides: phaseSidesOf(en?.when),
    _cost: costOf(en?.cp ?? localized.cp),
    _limits: usageLimits(en?.restrictions),
    _key: key,
    _enName: en?.name || localized.name,
    _target: en?.target ?? localized.target ?? '',
  }
}

// Core stratagems — same EN/RU merge as BattlefieldsView, section 15 cards only, matched to the
// English card by index. Imported dynamically too: the Core Rules battlefield section is ~22 KB
// gzipped, and the game screen must not pay for it until its CP tab is opened.
export async function loadCoreStratagems(loc) {
  const { battlefields } = await import('../data/battlefields.js')
  const coreEn = battlefields.en.find((s) => s.id === '15')?.stratagems || []
  const sections = loc === 'en'
    ? battlefields.en
    : mergeSections(battlefields.en, battlefields.ru, (section, ruSection) =>
      section.stratagems && ruSection.stratagems
        ? { stratagems: section.stratagems.map((strat, k) => ({ ...strat, ...ruSection.stratagems[k] })) }
        : {})
  return (sections.find((s) => s.id === '15')?.stratagems || []).map((s, i) => derive(s, coreEn[i], `core:${coreEn[i]?.num || i}`))
}

// The Chapters share the Codex Space Marines detachments (Gladius Task Force, etc.), which live only
// in the space-marines faction data — fall back to it for detachments not in the Chapter's file.
// The set itself is data/smChapters.js, shared with the tracker and the roster.

// Detachment names come from the MFM dataset (tracker) but stratagems from the faction rules
// data; the two occasionally disagree on apostrophe glyph / letter case, so match loosely.
export const normName = (s) => s.replace(/[’'`]/g, "'").trim().toLowerCase()

// Combat Patrol: the active detachment/stratagems live in src/data/combatPatrol.js, not in
// src/data/factions/*.js — dynamically imported here (heavy, datasheet-bearing file), only
// while a Combat Patrol game is in progress.
async function loadCombatPatrolFaction(slug, loc) {
  const { combatPatrol } = await import('../data/combatPatrol.js')
  return combatPatrol[loc]?.factions?.find((f) => f.slug === slug) || null
}

// One faction's localized detachments with every stratagem derived from its English twin
// (aligned by detachment + stratagem index), and its RU stratagem-name map.
async function loadFactionSource(slug, loc) {
  const { loadFaction } = await import('../data/factions/index.js')
  const data = await loadFaction(slug)
  if (!data) return null
  const withDerived = (faction) => ({
    ...faction,
    detachments: (faction.detachments || []).map((det, di) => ({
      ...det,
      stratagems: (det.stratagems || []).map((s, si) => {
        const en = data.en.detachments?.[di]?.stratagems?.[si]
        return derive(s, en, `${normName(data.en.detachments?.[di]?.name || det.name)}|${en?.name || s.name}`)
      }),
    })),
  })
  if (loc !== 'ru') return { faction: withDerived(data.en), stratNamesRu: null }
  const { loadFactionRu, deepOverlay } = await import('../data/factions/ru/index.js')
  const mod = await loadFactionRu(slug)
  return {
    faction: withDerived(mod ? deepOverlay(data.en, mod.default) : data.ru),
    stratNamesRu: mod?.stratNamesRu || null,
  }
}

// One ARMY's detachment stratagems (the side itself in singles, one doubles member otherwise).
export async function loadArmyStrats(m, loc, combatPatrol = false) {
  if (!m?.factionSlug || !m.detachments?.length) return []
  if (combatPatrol) {
    const f = await loadCombatPatrolFaction(m.factionSlug, loc)
    if (!f) return []
    // Derived fields always key off the English entry, even when rendering the RU faction.
    const enF = loc === 'en' ? f : await loadCombatPatrolFaction(m.factionSlug, 'en')
    return (f.stratagems || []).map((s, i) => derive(s, enF?.stratagems?.[i], `cp:${m.factionSlug}|${enF?.stratagems?.[i]?.name || s.name}`))
  }
  const sources = detachmentSources(m.factionSlug)
  // normName(detachment) → { det, stratNamesRu }; the chapter's own data wins over the shared one.
  const lookup = new Map()
  for (const slug of sources) {
    const src = await loadFactionSource(slug, loc)
    if (!src) continue
    for (const det of src.faction.detachments || []) {
      const key = normName(det.name)
      if (!lookup.has(key)) lookup.set(key, { det, stratNamesRu: src.stratNamesRu })
    }
  }
  const out = []
  for (const name of m.detachments) {
    const entry = lookup.get(normName(name))
    if (!entry) continue
    for (const s of entry.det.stratagems || []) {
      const strat = { ...s, _det: normName(name), _detId: entry.det.id || null }
      const ru = entry.stratNamesRu && entry.stratNamesRu[s.name]
      if (ru) strat.nameRu = ru
      out.push(strat)
    }
  }
  return out
}

// A SIDE's stratagems: its one army in singles, both members' in doubles. The same detachment
// fielded by both teammates yields ONE set of cards — within a team the two copies are identical
// (the owner prefix only disambiguates across sides), so a second copy is noise.
export async function loadSideStratagems(player, loc, { combatPatrol = false } = {}) {
  if (!player) return []
  const out = []
  const seenDets = new Set()
  for (const m of membersOf(player)) {
    for (const s of await loadArmyStrats(m, loc, combatPatrol)) {
      if (s._det && seenDets.has(s._det)) continue
      out.push(s)
    }
    for (const name of m?.detachments || []) seenDets.add(normName(name))
  }
  return out
}

// One signature per side covering every army it fields (both members' factions/detachments in
// doubles) — what a caller watches to know when to load again.
export const sideSignature = (pl) =>
  membersOf(pl || {})
    .map((m) => `${m?.factionSlug || ''}:${(m?.detachments || []).join(',')}`)
    .join('|')

// One ARMY's rules — the army rule and the rule of each detachment it fields, localized — for the
// Armies tab. `{ armyRule: { name, body } | null, detachments: [{ name, rule }] }`, or null for
// an army with no faction. Same sources and the same loose detachment match as the stratagems.
export async function loadArmyRules(m, loc, combatPatrol = false) {
  if (!m?.factionSlug) return null
  if (combatPatrol) {
    const f = await loadCombatPatrolFaction(m.factionSlug, loc)
    if (!f) return null
    return { armyRule: f.armyRule || null, detachments: f.rule ? [{ name: f.rule.name, rule: f.rule }] : [] }
  }
  const sources = detachmentSources(m.factionSlug)
  let armyRule = null
  const dets = new Map()
  for (const slug of sources) {
    const src = await loadFactionSource(slug, loc)
    if (!src) continue
    if (!armyRule && slug === m.factionSlug) armyRule = src.faction.armyRule || null
    for (const det of src.faction.detachments || []) {
      const key = normName(det.name)
      if (!dets.has(key)) dets.set(key, det)
    }
  }
  const detachments = (m.detachments || [])
    .map((name) => dets.get(normName(name)))
    .filter((d) => d?.rule)
    .map((d) => ({ name: d.name, rule: d.rule }))
  return { armyRule, detachments }
}
