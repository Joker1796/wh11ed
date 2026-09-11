<template>
  <div class="tracker-game">
    <GameSetup v-if="!current || current.phase === 'setup'" @start="onStart" @cancel="goHome" />
    <RoundTracker v-else-if="current.phase === 'playing'" />

    <div v-else-if="current.phase === 'finished'" class="finished">
      <h2 class="finished-title">{{ labels.trackerGameOver }}</h2>
      <p v-if="endReasonLabel" class="finished-reason">{{ endReasonLabel }}</p>
      <ScoreBoard :finished="true" />
      <ScoreBreakdown />
      <ArmyRuleSummary />
      <div class="finished-actions">
        <button class="btn-ghost" @click="resume">{{ labels.trackerResume }}</button>
        <button class="btn-primary" @click="backToTracker">{{ labels.trackerBackToTracker }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import SetupLoading from '../../components/tracker/SetupLoading.vue'
// Async: GameSetup pulls in the faction/detachment dataset (mfmFactions.js, ~290 KB via
// trackerFactions.js). It's only shown in the setup phase, so loading it lazily keeps that
// data out of the playing/finished screens (RoundTracker, ScoreBreakdown). A spinner fills
// the gap on a cold/slow load instead of a blank screen.
const GameSetup = defineAsyncComponent({
  loader: () => import('../../components/tracker/GameSetup.vue'),
  loadingComponent: SetupLoading,
  delay: 150,
})
import RoundTracker from '../../components/tracker/RoundTracker.vue'
import ScoreBoard from '../../components/tracker/ScoreBoard.vue'
import ScoreBreakdown from '../../components/tracker/ScoreBreakdown.vue'
import ArmyRuleSummary from '../../components/tracker/ArmyRuleSummary.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'

const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, newGame, resumeGame, archiveGame } = useTracker()

const END_REASON_LABELS = {
  played: 'trackerEndPlayed',
  early: 'trackerEndEarly',
  'friendly-concede': 'trackerEndFriendlyConcede',
  'opponent-concede': 'trackerEndOpponentConcede',
}
const endReasonLabel = computed(() => {
  const key = END_REASON_LABELS[current.value?.endReason]
  return key ? labels.value[key] : ''
})

function onStart(setup) {
  newGame(setup)
}
function goHome() {
  router.push('/tracker')
}
function resume() {
  resumeGame()
}
function backToTracker() {
  archiveGame()
  router.push('/tracker')
}
</script>

<style scoped>
/* touch-action: manipulation across the whole tracker surface (not just the buttons) so a
   rapid second tap landing in the gap between +/- controls can't double-tap-zoom on iOS
   either. Scrolling and two-finger pinch-zoom still work. */
.tracker-game { padding-top: 0.5rem; touch-action: manipulation; }
.finished { padding-top: 0.5rem; }
.finished-title {
  text-align: center;
  font-family: var(--font-display);
  font-size: 1.76rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--accent);
}
.finished-reason {
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0 0 1rem;
}
.finished-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
</style>
