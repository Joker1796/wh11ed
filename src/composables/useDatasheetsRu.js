// @ts-check
// The RU overlay of a faction's datasheets (src/data/datasheets/ru/<slug>.js), loaded for the
// current faction while the locale is Russian — null outside RU and while the chunk is still on its
// way, so the caller shows the English sheet until it arrives, never an empty one. An answer that
// comes back after the faction or the locale moved on is dropped. The datasheet page, the roster's
// unit card and its weapon-profile window each kept a copy of this watcher.
import { ref, watch } from 'vue'
import { useLocale } from './useLocale.js'
import { loadDatasheetsRu } from '../data/datasheets/ru/index.js'

/**
 * @param {() => string | null | undefined} slugOf the faction slug, read reactively
 * @param {() => string | null | undefined} [cpOf] a Combat Patrol box whose sheets join the faction's
 */
export function useDatasheetsRu(slugOf, cpOf = () => null) {
  const { locale } = useLocale()
  /** @type {import('vue').Ref<import('../core/shared/data.types.js').DatasheetsRuModule | null>} */
  const ruModule = ref(null)
  watch(
    [slugOf, locale, cpOf],
    async ([slug, loc, cp]) => {
      ruModule.value = null
      if (!slug || loc !== 'ru') return
      const mod = await loadDatasheetsRu(slug, { cp })
      if (slugOf() === slug && locale.value === 'ru' && (cpOf() || null) === (cp || null)) ruModule.value = mod
    },
    { immediate: true },
  )
  return ruModule
}
