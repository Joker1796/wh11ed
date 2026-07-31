import { computed } from 'vue'
import { basicRules } from '../data/basicRules.js'
import { battleRound } from '../data/battleRound.js'
import { battlefields } from '../data/battlefields.js'
import { advancedRules } from '../data/advancedRules.js'
import { muster } from '../data/muster.js'
import { useLocale } from './useLocale.js'

// The five chapters that use the numbered Section[] shape (each Section carries
// subsections with an "NN.MM" sectionNum). Reference (ability numbers, a flat list) and
// Introduction (no numbering) don't fit this shape and are left out.
const SOURCES = [basicRules, battleRound, battlefields, advancedRules, muster]

// Titles only, not the full useBilingualSections merge (image localization etc.) — this
// feeds a contents list, not a rendered rule, so the cheaper merge is enough.
function extract(data, isRu) {
  const out = {}
  for (let i = 0; i < data.en.length; i++) {
    const enSection = data.en[i]
    const ruSection = isRu ? data.ru?.[i] : null
    const topId = 'section-' + String(enSection.id).padStart(2, '0')
    const subs = enSection.subsections || []
    const list = []
    for (let j = 0; j < subs.length; j++) {
      const sub = subs[j]
      // Skip the SectionTocBlock intro (empty sectionNum) and group labels (unnumbered,
      // and not currently rendered with their own DOM id, so not a real jump target).
      if (!sub.sectionNum || sub.isGroupLabel) continue
      const ruSub = ruSection?.subsections?.[j]
      list.push({ id: sub.id, sectionNum: sub.sectionNum, title: (isRu && ruSub?.title) || sub.title })
    }
    out[topId] = list
  }
  return out
}

// The "NN.MM" rule subsections (e.g. "03.02 Moving Models"), one level deeper than the
// chapter/section list navGroups drives — keyed by the top-level section id ("section-03")
// so a caller can look up what belongs under one of navGroups[].sections entries. Used by
// the Contents modal (CoreRulesToc's `modal` variant only — the compact page TOC stays at
// the section level).
export function useCoreRulesSubsections() {
  const { locale } = useLocale()
  return computed(() => {
    const isRu = locale.value === 'ru'
    return Object.assign({}, ...SOURCES.map((data) => extract(data, isRu)))
  })
}
