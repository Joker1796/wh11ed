<template>
  <div class="tracker-game">
    <!-- Setting up. Alone, or as the host of a lobby, that is the wizard. A guest gets the same
         component cut down to its own side — and, once it has pressed Done, the waiting screen
         (useLobby.js explains why a side is filled by exactly one phone). -->
    <template v-if="!current || current.phase === 'setup'">
      <LobbyWait
        v-if="guestWaiting"
        @edit="editing = true"
      />
      <GameSetup
        v-else
        :key="guestSetup ? 'guest' : 'wizard'"
        :mode="guestSetup ? 'guest' : 'wizard'"
        @start="onStart"
        @cancel="goHome"
        @done="editing = false"
        @leave="leaveLobby"
      />
    </template>
    <RoundTracker v-else-if="current.phase === 'playing'" />

    <div
      v-else-if="current.phase === 'finished'"
      class="finished"
    >
      <h2 class="finished-title">
        {{ labels.trackerGameOver }}
      </h2>
      <p
        v-if="endReasonLabel"
        class="finished-reason"
      >
        {{ endReasonLabel }}
      </p>
      <ScoreBoard :finished="true" />
      <ScoreBreakdown />
      <ArmyRuleSummary />
      <!-- A shared game reopens only from the host's phone (the server refuses everyone else);
           a guest sees the button disabled with the reason. "Back to tracker" archives the game
           on this phone either way — for a guest that is how the game becomes theirs to keep. -->
      <div class="finished-actions">
        <button
          class="btn-ghost"
          :disabled="!canResume"
          :title="canResume ? '' : labels.partyResumeHostOnly"
          @click="resume"
        >
          {{ labels.trackerResume }}
        </button>
        <button
          class="btn-primary"
          @click="backToTracker"
        >
          {{ partyActive && !isHost ? labels.partySaveToHistory : labels.trackerBackToTracker }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
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
import LobbyWait from '../../components/tracker/LobbyWait.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'
import { useParty } from '../../composables/useParty.js'
import { useLobby } from '../../composables/useLobby.js'

const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, newGame, resumeGame, archiveGame } = useTracker()

// This is a LIVE screen of the game: while it is up, a shared game polls for the other phones'
// changes (useParty's gate); leaving it sends what is pending and stops the polling.
const { active: partyActive, isHost, canResume, attach, detach, leave, reseat } = useParty()
onMounted(attach)
onUnmounted(detach)

// Which of the three setup screens this phone is on. `editing` is the one piece of screen state
// the lobby needs: a guest that asked to change its side (and was allowed) is back in the form
// even though the side it sent is still marked confirmed until it presses Done again.
const { shared: sharedSetup, mySide, isEditor, isReady } = useLobby()
const editing = ref(false)
const guestSetup = computed(() =>
  sharedSetup.value && !isHost.value && isEditor(mySide.value) && (editing.value || !isReady(mySide.value)))
const guestWaiting = computed(() => sharedSetup.value && !isHost.value && !guestSetup.value)
// A guest that leaves keeps the game as its own setup — the party handle is what goes.
async function leaveLobby() {
  await leave()
  router.push('/tracker')
}

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

async function onStart(setup) {
  // Starting the game can exchange the two sides (the first-turn player is always players[0]).
  // In a shared game the seats have to travel with them, or every phone but the host's is now
  // sitting on the other army.
  const { swapped } = newGame(setup) || {}
  if (swapped && partyActive.value && isHost.value) await reseat()
}
function goHome() {
  router.push('/tracker')
}
function resume() {
  if (canResume.value) resumeGame()
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
