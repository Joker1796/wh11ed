<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventLayoutsHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventLayoutsDesc }}</p>
    </div>

    <p
      v-for="(para, i) in introParagraphs"
      :key="i"
      class="lead"
      v-html="renderInline(para)"
    ></p>

    <DataTable
      :title="ec.terrain.footprints.title"
      :headers="ec.terrain.footprints.headers"
      :rows="ec.terrain.footprints.rows"
    />

    <p class="key-note" v-html="renderInline(ec.terrain.keyNote)"></p>

    <ul class="legend">
      <li v-for="item in ec.terrain.legend" :key="item.id">
        <span class="legend-label">{{ item.label }}</span>
        <span class="legend-desc">{{ item.desc }}</span>
      </li>
    </ul>

    <!-- Interactive matrix -->
    <h2 class="matrix-heading">{{ labels.eventMatrixHeading }}</h2>
    <p class="matrix-hint">{{ labels.eventMatrixHint }}</p>

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
import DataTable from '../../components/DataTable.vue'
import MissionMatrix from '../../components/event/MissionMatrix.vue'
import LayoutCard from '../../components/event/LayoutCard.vue'
import { eventCompanion } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const labels = computed(() => ui[locale.value])

// EN/RU merge — RU fields override EN when present (RU pass pending).
const ec = computed(() => ({ ...eventCompanion.en, ...eventCompanion.ru }))

const introParagraphs = computed(() => ec.value.terrain.intro.split('\n\n').filter(p => p.trim()))

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

.lead {
  margin: 0 0 1.25rem;
  line-height: 1.6;
}

.key-note {
  margin: 1.25rem 0;
  line-height: 1.6;
  color: var(--text-muted);
  font-size: 0.92rem;
}

.legend {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 0.5rem 1.25rem;
}
.legend li {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  border-left: 3px solid var(--border);
  padding-left: 0.7rem;
}
.legend-label {
  font-weight: 600;
  font-size: 0.9rem;
}
.legend-desc {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.matrix-heading {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  margin: 1.5rem 0 0.4rem;
}
.matrix-hint {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0 0 0.5rem;
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
