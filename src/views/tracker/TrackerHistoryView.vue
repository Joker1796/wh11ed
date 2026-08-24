<template>
  <div v-if="game" class="history-view">
    <button class="back" @click="back">
      <i class="bi bi-chevron-left"></i> {{ labels.trackerBackToTracker }}
    </button>

    <div class="hv-head">
      <h1>{{ labels.trackerViewGame }}</h1>
      <span class="hv-date">{{ formatDate(game.finishedAt || game.createdAt) }}</span>
    </div>

    <!-- The lists that were fielded, if they were attached at setup — the game carries its own
         snapshot of each, so this still works long after the saved roster changed or went away. -->
    <div v-if="rosterLinks.length" class="hv-rosters">
      <RouterLink v-for="l in rosterLinks" :key="l.pi" class="hv-roster" :to="`/tracker/history/${game.id}/roster/${l.pi}`">
        <i class="bi bi-card-list"></i>
        <span class="hv-roster-who">{{ l.who }}</span>
        <span class="hv-roster-name">{{ l.name }}</span>
      </RouterLink>
    </div>

    <ScoreBoard :game="game" :finished="true" />
    <ScoreBreakdown :game="game" />
    <ArmyRuleSummary :game="game" />

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
import ArmyRuleSummary from '../../components/tracker/ArmyRuleSummary.vue'
import LayoutCard from '../../components/event/LayoutCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'
import { resolveLayout } from '../../composables/trackerLayout.js'
import { useFormatDate } from '../../composables/useFormatDate.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { formatDate } = useFormatDate()
const { history } = useTracker()

const game = computed(() => history.value.find((g) => g.id === route.params.id) || null)

const rosterLinks = computed(() => (game.value?.players || [])
  .map((p, pi) => ({ pi, name: p.roster?.name || '', who: p.name || (p.isYou ? labels.value.trackerYou : labels.value.trackerOpponent), has: !!p.roster?.units }))
  .filter((l) => l.has))

// Battlefield layout diagram — recommended (by dispositions + letter) or a custom pick.
const layout = computed(() => {
  const g = game.value
  if (!g) return null
  return resolveLayout(g.settings, g.players[0]?.disposition, g.players[1]?.disposition)
})

function back() {
  router.push('/tracker')
}

// Unknown id (e.g. deep link to a deleted game) → back to the list.
if (!game.value) router.replace('/tracker')
</script>

<style scoped>
.hv-rosters { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.9rem; }
.hv-roster {
  display: inline-flex; align-items: center; gap: 0.4rem;
  /* A list can be named anything, including a whole poem — the pill gives way rather than
     widening the page (same reason .players uses minmax(0, 1fr); see GameSetup.vue). */
  max-width: 100%; min-width: 0;
  padding: 0.4rem 0.75rem; border: 1px solid var(--border); border-radius: 999px;
  background: var(--bg-card); color: var(--text-primary); text-decoration: none; font-size: 0.82rem;
}
.hv-roster:hover { border-color: var(--accent); color: var(--accent); }
.hv-roster-who { color: var(--text-muted); }
.hv-roster-name { font-weight: 600; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

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
  font-family: var(--font-display);
  font-size: 1.76rem;
  font-weight: 500;
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
  font-family: var(--font-display);
  font-size: 1.32rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
}
</style>
