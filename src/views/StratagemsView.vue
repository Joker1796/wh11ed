<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.stratagemsHeading }}</h1>
    </div>

    <!-- Detachment filters — only while a game is in progress. Without a game this page
         stays the plain core-stratagem quick reference (no filter bar). -->
    <div v-if="hasGame" class="strat-filters" role="tablist">
      <button
        v-for="f in filters"
        :key="f.key"
        class="strat-filter"
        :class="{ active: filter === f.key }"
        role="tab"
        :aria-selected="filter === f.key"
        @click="filter = f.key"
      >
        {{ f.label }}
      </button>
    </div>

    <div v-if="visibleStratagems.length" class="strat-grid">
      <StratCard v-for="strat in visibleStratagems" :key="stratKey(strat)" :strat="strat" />
    </div>
    <p v-else class="strat-empty">{{ labels.stratNoneForFilter }}</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import StratCard from '../components/StratCard.vue'
import { battlefields } from '../data/battlefields.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useBilingualSections } from '../composables/useBilingualMerge.js'
import { useTracker } from '../composables/useTracker.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { current } = useTracker()
const hasGame = computed(() => current.value?.phase === 'playing')
const you = computed(() => current.value?.players?.find((p) => p.isYou) || null)
const opp = computed(() => current.value?.players?.find((p) => !p.isYou) || null)

// Core stratagems — same EN/RU merge as BattlefieldsView, section 15 cards only.
const sections = useBilingualSections(battlefields, (section, ruSection) =>
  section.stratagems && ruSection.stratagems
    ? { stratagems: section.stratagems.map((strat, k) => ({ ...strat, ...ruSection.stratagems[k] })) }
    : {}
)
const coreStrats = computed(() => sections.value.find((s) => s.id === '15')?.stratagems || [])

// Detachment stratagems for each player, resolved from the (heavy) faction rules data,
// which is dynamically imported so it never rides in this page's chunk unless a game is on.
const youStrats = ref([])
const oppStrats = ref([])

// These chapters share the Codex Space Marines detachments (Gladius Task Force, etc.), which
// live only in the space-marines faction data — fall back to it for detachments not defined
// in the chapter's own file.
const SM_CHAPTERS = new Set(['black-templars', 'blood-angels', 'dark-angels', 'deathwatch', 'space-wolves'])

// Detachment names come from the MFM dataset (tracker) but stratagems from the faction rules
// data; the two occasionally disagree on apostrophe glyph / letter case, so match loosely.
const normName = (s) => s.replace(/[’'`]/g, "'").trim().toLowerCase()

// Resolve one faction's localized detachment list + its RU stratagem-name map.
async function loadFactionSource(slug, loc) {
  const { getFaction } = await import('../data/factions/index.js')
  const data = getFaction(slug)
  if (!data) return null
  if (loc !== 'ru') return { faction: data.en, stratNamesRu: null }
  const { loadFactionRu, deepOverlay } = await import('../data/factions/ru/index.js')
  const mod = await loadFactionRu(slug)
  return { faction: mod ? deepOverlay(data.en, mod.default) : data.ru, stratNamesRu: mod?.stratNamesRu || null }
}

async function loadPlayerStrats(player, loc) {
  if (!player?.factionSlug || !player.detachments?.length) return []
  const sources = [player.factionSlug]
  if (SM_CHAPTERS.has(player.factionSlug)) sources.push('space-marines')
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
  for (const name of player.detachments) {
    const entry = lookup.get(normName(name))
    if (!entry) continue
    for (const s of entry.det.stratagems || []) {
      const strat = { ...s }
      const ru = entry.stratNamesRu && entry.stratNamesRu[s.name]
      if (ru) strat.nameRu = ru
      out.push(strat)
    }
  }
  return out
}

let loadToken = 0
async function loadStrats() {
  if (!hasGame.value) {
    youStrats.value = []
    oppStrats.value = []
    return
  }
  const token = ++loadToken
  const loc = locale.value
  const [y, o] = await Promise.all([loadPlayerStrats(you.value, loc), loadPlayerStrats(opp.value, loc)])
  if (token !== loadToken) return // a newer load superseded this one
  youStrats.value = y
  oppStrats.value = o
}

watch(
  [
    hasGame,
    locale,
    () => you.value?.factionSlug,
    () => opp.value?.factionSlug,
    () => (you.value?.detachments || []).join('|'),
    () => (opp.value?.detachments || []).join('|'),
  ],
  loadStrats,
  { immediate: true },
)

const filter = ref('core')
// Reset to Core whenever a game ends, so the hidden filter state can't strand the view.
watch(hasGame, (on) => { if (!on) filter.value = 'core' })

const filters = computed(() => {
  if (!hasGame.value) return []
  return [
    { key: 'core', label: labels.value.stratFilterCore },
    { key: 'you', label: labels.value.stratFilterYou },
    { key: 'opp', label: labels.value.stratFilterOpp },
  ]
})

const visibleStratagems = computed(() => {
  if (!hasGame.value || filter.value === 'core') return coreStrats.value
  if (filter.value === 'you') return youStrats.value
  if (filter.value === 'opp') return oppStrats.value
  return coreStrats.value
})

function stratKey(strat) {
  return strat.num || `${strat.sublabel || ''}|${strat.name}`
}
</script>

<style scoped>
.strat-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.strat-filter {
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast);
}

.strat-filter:hover {
  color: var(--text-primary);
  border-color: var(--accent);
}

.strat-filter.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.strat-empty {
  color: var(--text-muted);
  font-style: italic;
  padding: 1.5rem 0;
  text-align: center;
}

.strat-grid {
  column-count: 2;
  column-gap: 1rem;
}

.strat-grid > * {
  break-inside: avoid;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .strat-grid {
    column-count: 1;
  }
}
</style>
