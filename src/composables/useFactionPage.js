import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getFaction } from '../data/factions/index.js'
import { deepOverlay, loadFactionRu } from '../data/factions/ru/index.js'
import { useLocale } from './useLocale.js'

// Shared by the faction pages (rules — army rule + detachments — and datasheets):
// resolves the localized faction object for the current /factions/:slug route.
// EN is the source of truth; the RU overlay (src/data/factions/ru/<slug>.js) is
// lazy-loaded only in the RU locale and deep-merged over EN — until it resolves
// (or where no overlay exists yet) RU falls back to the EN text.
export function useFactionPage() {
  const route = useRoute()
  const { locale } = useLocale()
  const slug = computed(() => route.params.slug)

  const ruOverlay = ref(null)
  watch(
    [slug, locale],
    async ([s, loc]) => {
      ruOverlay.value = null
      if (!s || loc !== 'ru') return
      const overlay = await loadFactionRu(s)
      // guard against a stale resolve after a rapid route/locale change
      if (slug.value === s && locale.value === 'ru') ruOverlay.value = overlay
    },
    { immediate: true },
  )

  const faction = computed(() => {
    const data = getFaction(slug.value)
    if (!data) return null
    if (locale.value === 'ru') {
      return ruOverlay.value ? deepOverlay(data.en, ruOverlay.value) : data.ru
    }
    return data.en
  })

  return { slug, faction }
}
