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

// Apostrophes travel badly between datasets: the roster stores the detachment name the MFM prints,
// the faction file spells it its own way. Compare through this, never raw.
export const normName = (s) => s.replace(/[\u2019'`]/g, "'").trim().toLowerCase()

const SM_CHAPTERS = new Set(['black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'space-wolves'])


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
// lookup is what a roster reads: it names detachments, and a Chapter's list may name one that
// lives in the Space Marines file.
export async function loadRosterFactionRules(slug, loc) {
  const sources = [slug]
  if (SM_CHAPTERS.has(slug)) sources.push('space-marines')
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
