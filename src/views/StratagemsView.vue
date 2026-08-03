<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.stratagemsHeading }}</h1>
    </div>

    <div class="strat-toolbar">
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
      <!-- Toggle: flat list ↔ grouped-by-phase accordions -->
      <button
        type="button"
        class="strat-toggle"
        :class="{ active: byPhase }"
        :aria-pressed="byPhase"
        :aria-label="byPhase ? labels.stratGroupAsList : labels.stratGroupByPhase"
        @click="byPhase = !byPhase"
      >
        <i class="bi" :class="byPhase ? 'bi-list-ul' : 'bi-collection'"></i>
        <span class="strat-toggle-label">{{ byPhase ? labels.stratGroupAsList : labels.stratGroupByPhase }}</span>
      </button>
    </div>

    <p v-if="!visibleStratagems.length" class="strat-empty">{{ labels.stratNoneForFilter }}</p>

    <!-- Phase view: one accordion per phase, stratagems for that phase inside. -->
    <template v-else-if="byPhase">
      <div v-for="g in phaseGroups" :key="g.key" class="phase-group">
        <button
          type="button"
          class="phase-head"
          :aria-expanded="openPhases.has(g.key)"
          @click="togglePhase(g.key)"
        >
          <i class="bi phase-chev" :class="openPhases.has(g.key) ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
          <span class="phase-name">{{ phaseLabel(g.key, labels) }}</span>
          <span class="phase-count">{{ g.strats.length }}</span>
        </button>
        <CollapseTransition :show="openPhases.has(g.key)">
          <div class="strat-grid phase-grid">
            <StratCard v-for="strat in g.strats" :key="stratKey(strat)" :strat="strat" />
          </div>
        </CollapseTransition>
      </div>
    </template>

    <!-- Flat list -->
    <div v-else class="strat-grid">
      <StratCard v-for="strat in visibleStratagems" :key="stratKey(strat)" :strat="strat" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import StratCard from '../components/StratCard.vue'
import CollapseTransition from '../components/CollapseTransition.vue'
import { battlefields } from '../data/battlefields.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useBilingualSections } from '../composables/useBilingualMerge.js'
import { useTracker } from '../composables/useTracker.js'
import { phasesOf, phaseLabel, PHASE_ORDER } from '../composables/stratagemPhases.js'
import { getItem, setItem } from '../composables/safeStorage.js'

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
// Phase is derived from the English `when` (battlefields.en §15), keyed by index, so the
// grouping is identical in EN and RU even though the displayed `when` is localized.
const coreEnStrats = battlefields.en.find((s) => s.id === '15')?.stratagems || []
const coreStrats = computed(() =>
  (sections.value.find((s) => s.id === '15')?.stratagems || []).map((s, i) => ({
    ...s,
    _phases: phasesOf(coreEnStrats[i]?.when),
  })),
)

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

// Combat Patrol: the active detachment/stratagems live in src/data/combatPatrol.js, not in
// src/data/factions/*.js — dynamically imported here (heavy, datasheet-bearing file), only
// while a Combat Patrol game is in progress.
async function loadCombatPatrolFaction(slug, loc) {
  const { combatPatrol } = await import('../data/combatPatrol.js')
  return combatPatrol[loc]?.factions?.find((f) => f.slug === slug) || null
}

// Resolve one faction's localized detachment list + its RU stratagem-name map.
async function loadFactionSource(slug, loc) {
  const { loadFaction } = await import('../data/factions/index.js')
  const data = await loadFaction(slug)
  if (!data) return null
  // Tag each stratagem with `_phase` derived from its ENGLISH `when` (data.en, aligned by
  // detachment+stratagem index with the localized faction) so phase grouping matches EN/RU.
  const withPhase = (faction) => ({
    ...faction,
    detachments: (faction.detachments || []).map((det, di) => ({
      ...det,
      stratagems: (det.stratagems || []).map((s, si) => ({
        ...s,
        _phases: phasesOf(data.en.detachments?.[di]?.stratagems?.[si]?.when),
      })),
    })),
  })
  if (loc !== 'ru') return { faction: withPhase(data.en), stratNamesRu: null }
  const { loadFactionRu, deepOverlay } = await import('../data/factions/ru/index.js')
  const mod = await loadFactionRu(slug)
  return {
    faction: withPhase(mod ? deepOverlay(data.en, mod.default) : data.ru),
    stratNamesRu: mod?.stratNamesRu || null,
  }
}

async function loadPlayerStrats(player, loc) {
  if (!player?.factionSlug || !player.detachments?.length) return []
  if (current.value?.settings?.combatPatrol) {
    const f = await loadCombatPatrolFaction(player.factionSlug, loc)
    if (!f) return []
    // Phase grouping always keys off the English `when` text (see coreEnStrats above), even
    // when rendering the RU faction — fetch the EN entry too when locale isn't already 'en'.
    const enF = loc === 'en' ? f : await loadCombatPatrolFaction(player.factionSlug, 'en')
    return (f.stratagems || []).map((s, i) => ({ ...s, _phases: phasesOf(enF?.stratagems?.[i]?.when) }))
  }
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

// Group-by-phase view: a toggle swaps the flat grid for one accordion per phase.
// Accordions start collapsed — the user expands whichever phase they need. The chosen
// view mode is remembered across visits.
const VIEW_KEY = 'wh11ed-stratagems-by-phase'
const byPhase = ref(getItem(VIEW_KEY) === '1')
watch(byPhase, (on) => setItem(VIEW_KEY, on ? '1' : '0'))
const openPhases = ref(new Set())

const phaseGroups = computed(() => {
  // A stratagem can span several phases (its `_phases` array), so it appears under each.
  const by = new Map()
  for (const s of visibleStratagems.value) {
    for (const k of s._phases?.length ? s._phases : ['any']) {
      if (!by.has(k)) by.set(k, [])
      by.get(k).push(s)
    }
  }
  return PHASE_ORDER.filter((k) => by.has(k)).map((k) => ({ key: k, strats: by.get(k) }))
})

function togglePhase(key) {
  const next = new Set(openPhases.value)
  next.has(key) ? next.delete(key) : next.add(key)
  openPhases.value = next
}
</script>

<style scoped>
.strat-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.strat-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

/* Push the by-phase toggle to the right even when there's no filter row (no game). */
.strat-toggle {
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
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

.strat-toggle:hover {
  color: var(--text-primary);
  border-color: var(--accent);
}

.strat-toggle.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

/* Phase accordions */
.phase-group {
  margin-bottom: 0.75rem;
}

.phase-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  transition: border-color var(--motion-fast);
}

.phase-head:hover {
  border-color: var(--accent);
}

.phase-chev {
  flex-shrink: 0;
  font-size: 0.8rem;
  color: var(--text-dim);
}

.phase-name {
  flex: 1;
  text-align: left;
}

.phase-count {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
}

.phase-grid {
  padding-top: 0.75rem;
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

/* Narrow phones: with a game on there are 4 toolbar buttons (3 filters + the toggle),
   which wrap to a second row. Compact them so they fit one line — tighter filter pills
   and an icon-only toggle (its text label is the widest of the lot). */
@media (max-width: 480px) {
  .strat-toolbar {
    gap: 0.4rem;
  }
  .strat-filters {
    gap: 0.3rem;
  }
  .strat-filter {
    padding: 0.35rem 0.6rem;
    font-size: 0.75rem;
  }
  .strat-toggle {
    padding: 0.35rem 0.55rem;
  }
  .strat-toggle-label {
    display: none;
  }
}
</style>
