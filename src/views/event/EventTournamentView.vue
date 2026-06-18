<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.tournamentHeading }}</h1>
      <p class="view-hero-desc">{{ labels.tournamentDesc }}</p>
    </div>

    <div class="action-bar">
      <button class="act" @click="onNew">{{ labels.tNew }}</button>
      <button class="act" @click="exportJSON">{{ labels.tExport }}</button>
      <button class="act" @click="fileInput.click()">{{ labels.tImport }}</button>
      <input ref="fileInput" type="file" accept="application/json,.json" class="hidden-file" @change="onImport" />
    </div>

    <div class="tabs">
      <button
        v-for="t in tabs"
        :key="t.key"
        class="tab"
        :class="{ active: tab === t.key }"
        @click="tab = t.key"
      >{{ t.label }}</button>
    </div>

    <div class="tab-body">
      <TournamentSetup v-if="tab === 'setup'" />
      <PairingsBoard v-else-if="tab === 'pairings'" />
      <RoundResults v-else-if="tab === 'rounds'" />
      <StandingsTable v-else-if="tab === 'standings'" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import TournamentSetup from '../../components/tournament/TournamentSetup.vue'
import RoundResults from '../../components/tournament/RoundResults.vue'
import PairingsBoard from '../../components/tournament/PairingsBoard.vue'
import StandingsTable from '../../components/tournament/StandingsTable.vue'
import { useTournament } from '../../composables/useTournament.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { newTournament, exportJSON, importJSON } = useTournament()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const tab = ref('setup')
const fileInput = ref(null)

const tabs = computed(() => [
  { key: 'setup', label: labels.value.tTabSetup },
  { key: 'pairings', label: labels.value.tTabPairings },
  { key: 'rounds', label: labels.value.tTabRounds },
  { key: 'standings', label: labels.value.tTabStandings },
])

function onNew() {
  if (confirm(labels.value.tConfirmNew)) newTournament()
}

async function onImport(e) {
  const file = e.target.files?.[0]
  if (!file) return
  try {
    await importJSON(file)
  } catch {
    /* ignore malformed files */
  }
  e.target.value = ''
}
</script>

<style scoped>
.view-hero {
  padding: 1.25rem 0 0.9rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.25rem;
}
.view-hero h1 { font-family: var(--font-serif); font-size: 2.2rem; margin-bottom: 0.4rem; }
.view-hero-desc { color: var(--text-muted); font-size: 0.9rem; font-style: italic; }

.action-bar { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
.act {
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}
.act:hover { border-color: var(--accent); }
.hidden-file { display: none; }

.tabs { display: flex; gap: 0.4rem; flex-wrap: wrap; border-bottom: 1px solid var(--border); margin-bottom: 1.25rem; }
.tab {
  padding: 0.5rem 1.1rem;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  font-family: var(--font-serif);
  font-size: 1rem;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}
.tab:hover { color: var(--text-primary); }
.tab.active { color: var(--accent); border-bottom-color: var(--accent); }
</style>
