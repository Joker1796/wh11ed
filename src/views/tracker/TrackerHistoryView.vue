<template>
  <div v-if="game" class="history-view">
    <button class="back" @click="back">
      <i class="bi bi-chevron-left"></i> {{ labels.trackerBackToTracker }}
    </button>

    <div class="hv-head">
      <h1>{{ labels.trackerViewGame }}</h1>
      <span class="hv-date">{{ formatDate(game.finishedAt || game.createdAt) }}</span>
    </div>

    <ScoreBoard :game="game" :finished="true" />
    <ScoreBreakdown :game="game" />

    <section v-if="layout" class="hv-layout">
      <h2>{{ labels.trackerLayout }} {{ layout.id }}</h2>
      <LayoutCard :layout="layout" />
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ScoreBoard from '../../components/tracker/ScoreBoard.vue'
import ScoreBreakdown from '../../components/tracker/ScoreBreakdown.vue'
import LayoutCard from '../../components/event/LayoutCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'
import { eventCompanion } from '../../data/eventCompanion.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { history } = useTracker()

const game = computed(() => history.value.find((g) => g.id === route.params.id) || null)

// Resolve the battlefield layout diagram from the two dispositions + the chosen letter
// (same lookup as GameSetup.vue). Layout image paths are language-agnostic.
const matchups = eventCompanion.en.matchups
const layout = computed(() => {
  const g = game.value
  if (!g) return null
  const d0 = g.players[0]?.disposition
  const d1 = g.players[1]?.disposition
  const matchup = matchups.find(
    (m) => (m.a === d0 && m.b === d1) || (m.a === d1 && m.b === d0),
  )
  return matchup?.layouts.find((l) => l.id === g.settings?.layout) || null
})

function back() {
  router.push('/tracker')
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(locale.value === 'ru' ? 'ru-RU' : 'en-GB')
  } catch {
    return ''
  }
}

// Unknown id (e.g. deep link to a deleted game) → back to the list.
if (!game.value) router.replace('/tracker')
</script>

<style scoped>
.history-view {
  padding-top: 0.5rem;
}
.back {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.88rem;
  cursor: pointer;
  padding: 0.3rem 0;
  margin-bottom: 0.5rem;
}
.back:hover {
  color: var(--accent);
}
.hv-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid var(--accent);
  margin-bottom: 1rem;
}
.hv-head h1 {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}
.hv-date {
  font-size: 0.8rem;
  color: var(--text-dim);
}
.hv-layout {
  margin-top: 1.5rem;
}
.hv-layout h2 {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
}
</style>
