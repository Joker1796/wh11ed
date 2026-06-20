<template>
  <div class="tracker-game">
    <AlphaBanner />
    <GameSetup v-if="!current || current.phase === 'setup'" @start="onStart" @cancel="goHome" />
    <RoundTracker v-else-if="current.phase === 'playing'" />

    <div v-else-if="current.phase === 'finished'" class="finished">
      <h2 class="finished-title">{{ labels.trackerGameOver }}</h2>
      <ScoreBoard :finished="true" />
      <div class="finished-actions">
        <button class="btn-ghost" @click="resume">{{ labels.trackerResume }}</button>
        <button class="btn-primary" @click="backToTracker">{{ labels.trackerBackToTracker }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import GameSetup from '../../components/tracker/GameSetup.vue'
import RoundTracker from '../../components/tracker/RoundTracker.vue'
import ScoreBoard from '../../components/tracker/ScoreBoard.vue'
import AlphaBanner from '../../components/tracker/AlphaBanner.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'

const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, newGame, resumeGame, archiveGame } = useTracker()

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
.tracker-game { padding-top: 0.5rem; }
.finished { padding-top: 0.5rem; }
.finished-title {
  text-align: center;
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem;
  padding-bottom: 0.4rem;
  border-bottom: 2px solid var(--accent);
}
.finished-actions {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
.btn-primary {
  padding: 0.65rem 1.5rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
}
.btn-ghost {
  padding: 0.65rem 1.3rem;
  background: none;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-radius: 5px;
  font-size: 0.92rem;
  cursor: pointer;
}
.btn-ghost:hover { color: var(--text-primary); border-color: var(--accent); }
</style>
