// The hand-authored faction bundle, as a ROSTER needs it: the army rule, and every detachment
// this list plays with its rule, stratagems and enhancements, localised, with the English names
// the project keeps English carrying their translation beside them.
//
// It exists as a function rather than as three copies because three screens ask this same
// question — the list's Rules and Stratagems tabs, and the print sheet — and each used to answer
// it with its own loader. The faction page has its own (useFactionPage.js): it serves a page that
// switches detachments, this one serves a list that already picked them.
//
// NEVER import src/data/factions/* statically from a view. The bundle is 30-60 KB per faction and
// this is the reason every caller here is dynamic — see wh11ed/CLAUDE.md.
import { phasesOf, phaseSidesOf } from './stratagemPhases.js'
import { detachmentSources } from '../data/detachmentSources.js'
import { foldName } from '../core/shared/foldName.js'

// Apostrophes travel badly between datasets: the roster stores the detachment name the MFM prints,
// the faction file spells it its own way. Compare through this, never raw.
export const normName = foldName

async function loadFactionSource(slug, loc) {
  const { loadFaction } = await import('../data/factions/index.js')
  const data = await loadFaction(slug)
  if (!data) return null
  // Tag each stratagem with `_phases` derived from its ENGLISH `when` (data.en, aligned by
  // detachment+stratagem index with the localized faction) — same recipe as StratagemsView.vue,
  // so the Stratagems tab's phase grouping is identical EN/RU.
  const withPhase = (faction) => ({
    ...faction,
    detachments: (faction.detachments || []).map((det, di) => ({
      ...det,
      stratagems: (det.stratagems || []).map((s, si) => ({
        ...s,
        _phases: phasesOf(data.en.detachments?.[di]?.stratagems?.[si]?.when),
        _sides: phaseSidesOf(data.en.detachments?.[di]?.stratagems?.[si]?.when),
      })),
    })),
  })
  if (loc !== 'ru') return withPhase(data.en)
  const { loadFactionRu, deepOverlay } = await import('../data/factions/ru/index.js')
  const mod = await loadFactionRu(slug)
  if (!mod) return withPhase(data.ru)
  return withPhase(withRuNames(deepOverlay(data.en, mod.default), mod))
}

// Army-rule, detachment, detachment-rule and stratagem NAMES stay English by project convention —
// that is what the card in the box and the GW app both say — so the RU files keep their
// translations in separate name maps rather than in the overlay, and every view that shows one
// renders it as a small line under the English name (RuleBlock's `subtitle`, StratCard's
// `nameRu`). This view's templates have always asked for those lines; nothing was attaching them.
// Same maps and same shape as the faction page's own loader (useFactionPage.js).
function withRuNames(fac, mod) {
  const out = { ...fac }
  if (mod.armyRuleNameRu && out.armyRule) out.armyRule = { ...out.armyRule, nameRu: mod.armyRuleNameRu }
  out.detachments = (out.detachments || []).map((d) => ({
    ...d,
    nameRu: mod.detNamesRu?.[d.name] || d.nameRu,
    rule: d.rule ? { ...d.rule, nameRu: mod.detRuleNamesRu?.[d.rule.name] || d.rule.nameRu } : d.rule,
    stratagems: (d.stratagems || []).map((st) => ({ ...st, nameRu: mod.stratNamesRu?.[st.name] || st.nameRu })),
    enhancements: (d.enhancements || []).map((e) => ({ ...e, nameRu: mod.enhNamesRu?.[e.name] || e.nameRu })),
  }))
  return out
}

// Every detachment this faction can field, by normalised name, plus the faction itself. The
// lookup is what a roster reads: it names detachments, and a list may name one that lives in
// another faction's file (detachmentSources).
export async function loadRosterFactionRules(slug, loc) {
  const sources = detachmentSources(slug)
  const lookup = new Map()
  let faction = null
  for (const s of sources) {
    const f = await loadFactionSource(s, loc)
    if (!f) continue
    if (s === slug) faction = f
    for (const det of f.detachments || []) {
      const key = normName(det.name)
      if (!lookup.has(key)) lookup.set(key, det)
    }
  }
  return { faction, lookup }
}

// The faction's prose as a CARD reads it — English (the modifier layer and the rule gates read EN)
// and the reader's language — with the detachments it borrows from other files after its own
// (detachmentSources): a Blood Angels list on Gladius Task Force had no detachment rule,
// enhancement or stratagem on its cards (a player's report, 2026-10-01), a Space Marines list on
// Deathwatch Support the same (2026-10-09). Its own come first, so a name it reprints is read
// from there.
// `stratNamesRu` is the RU name map of every file read (stratagem names stay English on the card).
// `cp` — a Combat Patrol box fielded as the list (`roster.cp`): its own detachment joins the rest
// (combatPatrolDetachment), which no faction file holds.
/** @param {string} slug @param {string} loc @param {string | null} [cp] */
export async function loadFactionWithCodex(slug, loc, cp = null) {
  const [{ loadFaction }, { loadFactionRu, deepOverlay }] = await Promise.all([
    import('../data/factions/index.js'),
    import('../data/factions/ru/index.js'),
  ])
  let en = null
  let local = null
  let stratNamesRu = null
  for (const src of detachmentSources(slug)) {
    const data = await loadFaction(src)
    if (!data?.en) continue
    let l = data.en
    if (loc === 'ru') {
      const mod = await loadFactionRu(src)
      if (mod) l = deepOverlay(l, mod.default)
      if (mod?.stratNamesRu) stratNamesRu = { ...mod.stratNamesRu, ...stratNamesRu }
    }
    if (!en) { en = data.en; local = l; continue }
    en = { ...en, detachments: [...(en.detachments || []), ...(data.en.detachments || [])] }
    local = { ...local, detachments: [...(local.detachments || []), ...(l.detachments || [])] }
  }
  if (cp && en) {
    const { combatPatrol } = await import('../data/combatPatrol.js')
    const boxEn = combatPatrolDetachment(combatPatrol.en, cp)
    const boxLocal = combatPatrolDetachment(combatPatrol[loc === 'ru' ? 'ru' : 'en'], cp)
    if (boxEn) en = { ...en, detachments: [...(en.detachments || []), boxEn] }
    if (boxLocal) local = { ...local, detachments: [...(local.detachments || []), boxLocal] }
  }
  return { en, local, stratNamesRu }
}

// A Combat Patrol box's detachment in a faction file's shape — its rule, stratagems and
// enhancements as printed in the box. Its id is `cp:<box id>`, the one the modifier records of the
// box's rules point at (gen-roster-modifiers.mjs, combatPatrolIds); until 2026-10-20 a box played in
// the tracker had none of them on its cards. Named by the box, which is the detachment's name.
/** @param {{ factions: any[] }} data combatPatrol.js, one locale @param {string} box */
export function combatPatrolDetachment(data, box) {
  const b = (data?.factions || []).find((f) => f.id === box)
  if (!b) return null
  return { id: `cp:${box}`, name: b.boxName, rule: b.rule, stratagems: b.stratagems || [], enhancements: b.enhancements || [] }
}
