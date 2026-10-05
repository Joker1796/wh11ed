import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { loadFaction } from '../data/factions/index.js'
import { deepOverlay, loadFactionRu } from '../data/factions/ru/index.js'
import { useLocale } from './useLocale.js'
import { SM_FAMILY } from '../data/smChapters.js'

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

  // The detachments this faction fields from another file, after its own: a Chapter takes most of
  // Codex: Space Marines' (and Deathwatch Support), the Space Marines take Deathwatch Support. The
  // list and each one's cost to THIS army are generated with the roster data
  // (src/data/chapterDetachments.js, the same entitlements the roster editor offers); the text is
  // the other faction's own, localised the same way. Each carries `from` (the other faction's
  // slug), which the picker groups under. Only the Space Marines family has any, so no one else
  // loads a thing.
  const shared = ref([])
  watch(
    [slug, locale],
    async ([s, loc]) => {
      shared.value = []
      if (!SM_FAMILY.has(s)) return
      const list = (await import('../data/chapterDetachments.js')).default[s]
      if (!list?.length) return
      const out = []
      for (const src of [...new Set(list.map((e) => e.from))]) {
        const data = await loadFaction(src)
        const mod = loc === 'ru' ? await loadFactionRu(src) : null
        const local = localize(data, mod, loc)
        if (!local) continue
        for (const e of list.filter((x) => x.from === src)) {
          const d = local.detachments?.find((x) => x.name === e.name)
          if (d) out.push({ ...d, ...(e.dp != null ? { dp: e.dp } : {}), from: src })
        }
      }
      // guard against a stale resolve after a rapid route/locale change
      if (slug.value === s && locale.value === loc) shared.value = out
    },
    { immediate: true },
  )

  const faction = computed(() => {
    const own = localize(enData.value, ruModule.value, locale.value)
    if (!own || !shared.value.length) return own
    const ids = new Set((own.detachments || []).map((d) => d.id))
    return { ...own, detachments: [...(own.detachments || []), ...shared.value.filter((d) => !ids.has(d.id))] }
  })

  return { slug, faction }
}

// EN as is; RU as the overlay deep-merged over EN, with the RU display names (shown as a small line
// under the English name) attached. Keyed by the English name; merged objects are fresh copies from
// deepOverlay, so this does not mutate the EN source. `mod` null in RU = the overlay is still
// loading or does not exist: the bundle's own `ru` (EN text) stands in.
function localize(data, mod, loc) {
  if (!data) return null
  if (loc !== 'ru') return data.en
  if (!mod) return data.ru
  const merged = deepOverlay(data.en, mod.default)
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
}
