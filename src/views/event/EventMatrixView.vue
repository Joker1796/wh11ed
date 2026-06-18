<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventMatrixHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventMatrixHint }}</p>
    </div>

    <section class="layouts-key">
      <div class="key-header">
        <h2 class="legend-heading">{{ labels.eventLayoutsKey }}</h2>
        <button
          class="key-toggle"
          :aria-expanded="showKey"
          @click="toggleKey"
        >
          <i :class="showKey ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
          <span>{{ showKey ? labels.legendHide : labels.legendShow }}</span>
        </button>
      </div>

      <div v-show="showKey" class="key-body">
        <ul class="legend legend-terrain">
          <li v-for="item in terrainLegend" :key="item.id">
            <img v-if="item.icon" :src="item.icon" :alt="item.label" class="legend-icon" />
            <div class="legend-text">
              <span class="legend-label">{{ item.label }}</span>
              <span v-if="item.desc" class="legend-desc">{{ item.desc }}</span>
            </div>
          </li>
        </ul>

        <ul class="legend">
          <li v-for="item in zoneLegend" :key="item.id">
            <img v-if="item.icon" :src="item.icon" :alt="item.label" class="legend-icon" />
            <div class="legend-text">
              <span class="legend-label">{{ item.label }}</span>
              <span v-if="item.desc" class="legend-desc">{{ item.desc }}</span>
            </div>
          </li>
        </ul>

        <ul class="legend-edges">
          <li v-for="item in edgeLegend" :key="item.id">
            <span class="legend-label">{{ item.label }}</span>
            <img :src="item.icon" :alt="item.label" class="edge-bar" />
          </li>
        </ul>

        <ul class="legend-objectives">
          <li v-for="item in objectiveLegend" :key="item.id">
            <img :src="item.icon" :alt="item.label" class="legend-icon" />
            <span class="legend-label">{{ item.label }}</span>
            <span v-if="item.desc" class="legend-desc">{{ item.desc }}</span>
          </li>
        </ul>
      </div>
    </section>

    <MissionMatrix
      :dispositions="ec.dispositions"
      :selected="selected"
      @select="selectCell"
    />

    <!-- Matchup detail -->
    <div v-if="matchup" class="matchup">
      <div class="matchup-sides">
        <div class="side side-you">
          <span class="side-label">{{ labels.eventMatrixYou }}</span>
          <span class="side-dispo">{{ dispoName(selected.you) }}</span>
          <span class="side-mission">{{ youMission }}</span>
        </div>
        <span class="side-vs">VS</span>
        <div class="side side-opp">
          <span class="side-label">{{ labels.eventMatrixOpponent }}</span>
          <span class="side-dispo">{{ dispoName(selected.opp) }}</span>
          <span class="side-mission">{{ oppMission }}</span>
        </div>
      </div>

      <div class="tabs">
        <button
          v-for="l in matchup.layouts"
          :key="l.id"
          class="tab"
          :class="{ active: activeLayout === l.id }"
          @click="activeLayout = l.id"
        >{{ labels.eventLayout }} {{ l.id }}</button>
      </div>

      <LayoutCard v-if="currentLayout" :layout="currentLayout" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MissionMatrix from '../../components/event/MissionMatrix.vue'
import LayoutCard from '../../components/event/LayoutCard.vue'
import { getEventContent } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const ec = computed(() => getEventContent(locale.value))

// Layouts Key — collapsible; preference persisted (stored value is the "hidden" flag).
const KEY_STORAGE = 'wh11ed-event-key-hidden'
const showKey = ref(localStorage.getItem(KEY_STORAGE) !== 'true')
function toggleKey() {
  showKey.value = !showKey.value
  localStorage.setItem(KEY_STORAGE, String(!showKey.value))
}

// The legend is split into groups, mirroring the source key page:
// terrain (large icons), zones/territory (compact), battlefield edges (full-width
// bars), and objectives (a centred row).
const TERRAIN_IDS = ['dense', 'light', 'separate', 'single', 'letters']
const EDGE_IDS = ['atk-edge', 'def-edge']
const OBJECTIVE_IDS = ['home-obj', 'central-obj', 'expansion-obj']
const inGroup = (item, ids) => ids.includes(item.id)
const terrainLegend = computed(() => ec.value.terrain.legend.filter(i => inGroup(i, TERRAIN_IDS)))
const edgeLegend = computed(() => ec.value.terrain.legend.filter(i => inGroup(i, EDGE_IDS)))
const objectiveLegend = computed(() => ec.value.terrain.legend.filter(i => inGroup(i, OBJECTIVE_IDS)))
const zoneLegend = computed(() =>
  ec.value.terrain.legend.filter(
    i => !inGroup(i, TERRAIN_IDS) && !inGroup(i, EDGE_IDS) && !inGroup(i, OBJECTIVE_IDS)
  )
)

const selected = ref({ you: ec.value.dispositions[0].id, opp: ec.value.dispositions[0].id })
const activeLayout = ref('A')

function selectCell({ you, opp }) {
  selected.value = { you, opp }
  activeLayout.value = 'A'
}

function dispoName(id) {
  return ec.value.dispositions.find(d => d.id === id)?.name ?? id
}

const matchup = computed(() => {
  const { you, opp } = selected.value
  return ec.value.matchups.find(
    m => (m.a === you && m.b === opp) || (m.a === opp && m.b === you)
  )
})

// Orient the matchup so the row player ("you") gets the correct Primary Mission.
const youMission = computed(() =>
  matchup.value ? (matchup.value.a === selected.value.you ? matchup.value.missionA : matchup.value.missionB) : ''
)
const oppMission = computed(() =>
  matchup.value ? (matchup.value.a === selected.value.opp ? matchup.value.missionA : matchup.value.missionB) : ''
)

const currentLayout = computed(() =>
  matchup.value?.layouts.find(l => l.id === activeLayout.value)
)
</script>

<style scoped>
.view-hero {
  padding: 1.25rem 0 0.9rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.25rem;
}
.view-hero h1 {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  margin-bottom: 0.4rem;
}
.view-hero-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-style: italic;
}

/* The whole key set apart in a titled panel, mirroring the source "LAYOUTS KEY". */
.layouts-key {
  margin: 0 0 2rem;
  padding: 1.25rem 1.5rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-card);
}
.key-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.key-body {
  margin-top: 1.5rem;
}
.key-body > :last-child {
  margin-bottom: 0;
}
.legend-heading {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0;
}
.key-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  padding: 0.35rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.82rem;
  transition: color 0.15s, border-color 0.15s;
}
.key-toggle:hover {
  color: var(--text-primary);
  border-color: var(--accent);
}

.legend {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 0.75rem 1.25rem;
}
.legend li {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.legend-icon {
  flex: none;
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 4px;
}

/* Terrain key — set apart with a divider and larger, more readable icons. */
.legend-terrain {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--border);
}
.legend-terrain li {
  gap: 0.9rem;
}
.legend-terrain .legend-icon {
  width: 92px;
  height: 68px;
  border-radius: 6px;
}

/* Battlefield edges — full-width bars, label above each, as on the source page. */
.legend-edges {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}
.legend-edges li {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.legend-edges .legend-label {
  text-align: center;
}
.edge-bar {
  display: block;
  width: 100%;
  height: auto;
}

/* Objective points — a centred row of icon-over-label cards. */
.legend-objectives {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem 2.5rem;
}
.legend-objectives li {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.35rem;
  max-width: 200px;
}
.legend-objectives .legend-icon {
  width: 64px;
  height: 64px;
}
.legend-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}
.legend-label {
  font-weight: 600;
  font-size: 0.9rem;
}
.legend-desc {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.matchup {
  margin-top: 1.5rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.25rem;
  background: var(--bg-card);
}

.matchup-sides {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
}
.side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  flex: 1;
  text-align: center;
}
.side-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}
.side-dispo {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.side-mission {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: var(--accent);
  line-height: 1.2;
}
.side-vs {
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--text-dim);
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 1rem;
}
.tab {
  padding: 0.4rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  font-family: var(--font-serif);
  font-size: 0.95rem;
  transition: background 0.12s, border-color 0.12s;
}
.tab:hover {
  border-color: var(--accent);
}
.tab.active {
  background: var(--accent);
  color: var(--text-on-accent);
  border-color: var(--accent);
}

@media (max-width: 600px) {
  .matchup-sides { gap: 0.75rem; }
  .side-mission { font-size: 1rem; }
}
</style>
