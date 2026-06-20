<template>
  <div class="tracker-game">
    <GameSetup v-if="!current || current.phase === 'setup'" @start="onStart" @cancel="goHome" />
    <RoundTracker v-else-if="current.phase === 'playing'" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import GameSetup from '../../components/tracker/GameSetup.vue'
import RoundTracker from '../../components/tracker/RoundTracker.vue'
import { useTracker } from '../../composables/useTracker.js'

const router = useRouter()
const { current, newGame } = useTracker()

function onStart(setup) {
  newGame(setup)
}
function goHome() {
  router.push('/tracker')
}
</script>

<style scoped>
.tracker-game { padding-top: 0.5rem; }
</style>
