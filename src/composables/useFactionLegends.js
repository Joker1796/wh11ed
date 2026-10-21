import { ref, watch } from 'vue'
import { useLocale } from './useLocale.js'

// The prose half of a faction's "Legends: <Faction>" publication (src/data/factionLegends.json): GW's
// intro on Legends and the Legendary Proxies table. Null for the factions without one — all but the
// Space Marines, their Chapters and Orks today. Its own lazy chunk, tiny; the RU intro is a drop-in
// overlay with EN fallback, the same import.meta.glob arrangement FactionFaqView uses so a missing
// file costs nothing.
const legendsRuGlob = import.meta.glob('../data/factionLegendsRu.json', { import: 'default' })
const legendsRuLoader = legendsRuGlob['../data/factionLegendsRu.json'] || null

async function loadLegends(slug, locale) {
  const all = (await import('../data/factionLegends.json')).default
  const en = all[slug]
  if (!en) return null
  let ru = null
  if (locale === 'ru' && legendsRuLoader) {
    // A Chapter carries the Codex publication (`of`), whose RU intro lives under the Codex slug.
    try { ru = (await legendsRuLoader())?.[en.of || slug] || null } catch { ru = null }
  }
  return { ...en, intro: ru?.intro || en.intro }
}

/** @param {import('vue').Ref<string>} slug */
export function useFactionLegends(slug) {
  const { locale } = useLocale()
  const legends = ref(null)
  // Whether the faction's answer is in — null is also "no Legends publication".
  const ready = ref(false)
  // Another faction, or the other language (the intro's; the proxies are unit names).
  watch([slug, locale], async ([s, loc], old) => {
    if (s !== old?.[0]) { legends.value = null; ready.value = false }
    const leg = s ? await loadLegends(s, loc) : null
    if (slug.value === s) { legends.value = leg; ready.value = true }
  }, { immediate: true })
  return { legends, ready }
}

/** The proxies a query names: by a retired name or by the unit they are fielded as. */
export function proxiesMatching(proxies, query) {
  const q = query.trim().toLowerCase()
  if (!q) return proxies
  return proxies.filter((p) => p.legacy.some((n) => n.toLowerCase().includes(q)) || p.use.toLowerCase().includes(q))
}
