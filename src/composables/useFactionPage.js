import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getFaction } from '../data/factions/index.js'
import { useLocale } from './useLocale.js'

// Shared by the three faction sub-pages (rule / detachments / datasheets):
// resolves the localized faction object for the current /factions/:slug route.
// EN-first: data.ru currently reuses data.en; resolves the RU object when it diverges.
export function useFactionPage() {
  const route = useRoute()
  const { locale } = useLocale()
  const slug = computed(() => route.params.slug)
  const faction = computed(() => {
    const data = getFaction(slug.value)
    return data ? (locale.value === 'ru' ? data.ru : data.en) : null
  })
  return { slug, faction }
}
