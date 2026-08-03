import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { loadFaction } from '../data/factions/index.js'
import { deepOverlay, loadFactionRu } from '../data/factions/ru/index.js'
import { useLocale } from './useLocale.js'

// Shared by the faction pages (rules — army rule + detachments — and datasheets):
// resolves the localized faction object for the current /factions/:slug route.
// EN is the source of truth; the RU overlay (src/data/factions/ru/<slug>.js) is
// lazy-loaded only in the RU locale and deep-merged over EN — until it resolves
// (or where no overlay exists yet) RU falls back to the EN text.
//
// BOTH sides are lazy: `faction` is null until the EN chunk for this slug resolves, so
// consumers must guard on it (FactionLayout gates its slot on `v-if="faction"`, and the views
// that dereference it do the same). It reads null for an unknown slug too, which is the same
// state the old synchronous getFaction() returned.
export function useFactionPage() {
  const route = useRoute()
  const { locale } = useLocale()
  const slug = computed(() => route.params.slug)

  const enData = ref(null)
  watch(
    slug,
    async (s) => {
      enData.value = null
      if (!s) return
      const data = await loadFaction(s)
      // guard against a stale resolve after a rapid route change
      if (slug.value === s) enData.value = data
    },
    { immediate: true },
  )

  const ruModule = ref(null)
  watch(
    [slug, locale],
    async ([s, loc]) => {
      ruModule.value = null
      if (!s || loc !== 'ru') return
      const mod = await loadFactionRu(s)
      // guard against a stale resolve after a rapid route/locale change
      if (slug.value === s && locale.value === 'ru') ruModule.value = mod
    },
    { immediate: true },
  )

  const faction = computed(() => {
    const data = enData.value
    if (!data) return null
    if (locale.value !== 'ru') return data.en
    const mod = ruModule.value
    if (!mod) return data.ru
    const merged = deepOverlay(data.en, mod.default)
    // Attach RU display names (shown as a small line under the English name). Keyed by the
    // English name; merged objects are fresh copies from deepOverlay, so this does not
    // mutate the EN source.
    if (mod.armyRuleNameRu && merged.armyRule) merged.armyRule.nameRu = mod.armyRuleNameRu
    for (const d of merged.detachments || []) {
      if (mod.detNamesRu) d.nameRu = mod.detNamesRu[d.name]
      if (mod.detRuleNamesRu && d.rule) d.rule.nameRu = mod.detRuleNamesRu[d.rule.name]
      if (mod.stratNamesRu) {
        for (const s of d.stratagems || []) {
          const ru = mod.stratNamesRu[s.name]
          if (ru) s.nameRu = ru
        }
      }
      if (mod.enhNamesRu) {
        for (const e of d.enhancements || []) {
          const ru = mod.enhNamesRu[e.name]
          if (ru) e.nameRu = ru
        }
      }
    }
    return merged
  })

  return { slug, faction }
}
