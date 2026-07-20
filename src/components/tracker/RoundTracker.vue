<template>
  <div class="round-tracker">
    <ScoreBoard />

    <div class="round-bar">
      <button class="rb-nav" :disabled="current.currentRound <= 1" :aria-label="labels.ariaPrevRound" @click="goToRound(current.currentRound - 1)">‹</button>
      <div class="rb-rounds">
        <button
          v-for="n in ROUND_COUNT"
          :key="n"
          class="rb-round"
          :class="{ on: current.currentRound === n }"
          :aria-label="`${labels.trackerRound} ${n}`"
          :aria-current="current.currentRound === n ? 'step' : undefined"
          @click="goToRound(n)"
        >{{ n }}</button>
      </div>
      <button class="rb-nav" :disabled="current.currentRound >= ROUND_COUNT" :aria-label="labels.ariaNextRound" @click="goToRound(current.currentRound + 1)">›</button>
    </div>

    <!-- Active twist reminder (mission-changing twists are already applied to the primary). -->
    <details v-if="activeTwist" class="twist-card">
      <summary><span class="tc-label">{{ labels.trackerTwist }}</span> {{ activeTwist.title }}</summary>
      <div class="twist-card-body">
        <RuleBody :body="activeTwist.body" />
      </div>
    </details>

    <div class="players">
      <div v-for="(pl, i) in current.players" :key="i" class="player">
        <h3 class="ptitle">{{ pl.name || ((pl.isYou ?? i === 0) ? labels.trackerYou : labels.trackerOpponent) }}</h3>
        <p class="pmeta">{{ dispositionName(pl.disposition) }}</p>
        <p v-if="pl.detachments && pl.detachments.length" class="pdet">{{ pl.detachments.join(' · ') }}</p>

        <!-- Primary mission — tap to open the scoring modal -->
        <div class="sec-title-row">{{ labels.trackerPrimary }}</div>
        <button v-if="primaryMission(i)" class="card-open" @click="openPrimary = i">
          <span class="card-name">{{ primaryName(i) }}</span>
          <span class="card-vp">{{ pl.rounds[current.currentRound - 1].primary }} / {{ PRIMARY_ROUND_CAP }} VP</span>
        </button>
        <div v-else class="score-row">
          <NumberStepper
            :modelValue="pl.rounds[current.currentRound - 1].primary"
            :min="0" :max="PRIMARY_ROUND_CAP"
            @update:modelValue="v => setRoundPrimary(i, current.currentRound - 1, v)"
          />
          <span class="sr-sub">/ {{ PRIMARY_ROUND_CAP }} {{ labels.trackerThisRound }}</span>
        </div>

        <div v-if="current.settings.trackCP" class="score-row cp-row">
          <span class="sr-label">{{ labels.trackerCp }}</span>
          <NumberStepper :modelValue="pl.cp" :min="0" @update:modelValue="v => setCp(i, v)" />
        </div>

        <SecondaryDeck :pi="i" />
      </div>
    </div>

    <ScoringModal
      v-if="openPrimary >= 0 && primaryMission(openPrimary)"
      :title="primaryName(openPrimary)"
      :subtitle="`${labels.trackerPrimary} · ${dispositionName(current.players[openPrimary].disposition)}`"
      :vp="current.players[openPrimary].rounds[current.currentRound - 1].primary"
      :blocks="primaryBlocks(openPrimary)"
      :briefing="primaryMission(openPrimary).briefing"
      :count="(bi, ri) => primaryRowCount(openPrimary, current.currentRound - 1, bi, ri)"
      :note="`${labels.trackerPrimary}: ${labels.trackerThisRound} ≤ ${PRIMARY_ROUND_CAP} · ${PRIMARY_GAME_CAP}/${labels.trackerTotal}`"
      @set="(bi, ri, c) => setPrimaryRow(openPrimary, current.currentRound - 1, bi, ri, c)"
      @close="openPrimary = -1"
    />

    <div class="actions">
      <div class="actions-left">
        <button class="btn-ghost" @click="editSetupOpen = true">{{ labels.trackerEditSetup }}</button>
        <button class="btn-ghost" @click="endModalOpen = true">{{ labels.trackerFinish }}</button>
      </div>
      <button
        v-if="current.currentRound < ROUND_COUNT"
        class="btn-primary"
        @click="goToRound(current.currentRound + 1)"
      >{{ labels.trackerNext }}</button>
    </div>

    <GameEndModal v-if="endModalOpen" @confirm="onEndBattle" @close="endModalOpen = false" />
    <EditSetupModal v-if="editSetupOpen" @close="editSetupOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NumberStepper from './NumberStepper.vue'
import SecondaryDeck from './SecondaryDeck.vue'
import ScoreBoard from './ScoreBoard.vue'
import ScoringModal from './ScoringModal.vue'
import GameEndModal from './GameEndModal.vue'
import EditSetupModal from './EditSetupModal.vue'
import RuleBody from '../RuleBody.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { getEventContent } from '../../data/eventCompanion.js'
import { useTracker, ROUND_COUNT, PRIMARY_ROUND_CAP, PRIMARY_GAME_CAP, dispositionName, missionBySlug, scorableBlocks } from '../../composables/useTracker.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, setRoundPrimary, setPrimaryRow, primaryRowCount, setCp, goToRound, finishGame } = useTracker()

const openPrimary = ref(-1)   // index of the player whose primary scoring modal is open
const endModalOpen = ref(false)
const editSetupOpen = ref(false)

// Active twist (if any) — shown as a collapsible reminder; its mission effect (Mirrored
// World / Scrambled Communications) is already baked into each player's primarySlug.
const activeTwist = computed(() => {
  const id = current.value?.settings?.twist
  if (!id) return null
  return getEventContent(locale.value).twists.blocks.find(b => b.id === id) || null
})

function primaryMission(i) {
  return missionBySlug(current.value.players[i].primarySlug, null, locale.value)
}
function primaryName(i) {
  const m = primaryMission(i)
  return m ? m.name : ''
}
// Scorable primary blocks for the current round (round-gated by block heading).
function primaryBlocks(i) {
  return scorableBlocks(current.value.players[i].primarySlug, null, current.value.currentRound, locale.value)
}
function onEndBattle(reason) {
  endModalOpen.value = false
  finishGame(reason)
}
</script>

<style scoped>
.round-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0 1.2rem;
}
.rb-rounds { display: flex; gap: 0.3rem; }
.rb-round {
  width: 38px; height: 38px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  border-radius: 50%;
  font-weight: 700;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}
.rb-round.on { background: var(--accent); color: #fff; border-color: var(--accent); }
.rb-nav {
  width: 34px; height: 34px;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;
}
.rb-nav:disabled { opacity: 0.35; cursor: not-allowed; }
.twist-card {
  max-width: 640px;
  margin: -0.4rem auto 1rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-card);
}
.twist-card > summary {
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--text-primary);
}
.twist-card .tc-label {
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent);
  margin-right: 0.35rem;
}
.twist-card-body {
  padding: 0 0.75rem 0.6rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-muted);
}
.players { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.player {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.8rem;
}
.ptitle { font-family: var(--font-display); font-size: 1.45rem; font-weight: 500; color: var(--text-primary); margin: 0; }
.pmeta { font-size: 0.78rem; color: var(--text-muted); margin: 0.1rem 0 0.1rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; }
.pdet { font-size: 0.72rem; color: var(--text-dim); margin: 0 0 0.7rem; font-family: var(--font-mono); }
.sec-title-row {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-dim);
  margin-bottom: 0.3rem;
}
.card-open {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--bg-secondary);
  cursor: pointer;
  text-align: left;
  margin-bottom: 0.55rem;
}
.card-open:hover { border-color: var(--accent); }
.card-name { font-weight: 700; font-size: 0.88rem; color: var(--text-primary); }
.card-vp { font-family: var(--font-mono); font-weight: 700; font-size: 0.82rem; color: var(--accent); flex-shrink: 0; }
.score-row { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.55rem; }
.sr-label {
  min-width: 4.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
}
.sr-sub { font-size: 0.72rem; color: var(--text-dim); }
.actions { display: flex; justify-content: space-between; gap: 0.6rem; margin-top: 1.25rem; }
.actions-left { display: flex; gap: 0.6rem; }
.btn-primary {
  padding: 0.6rem 1.4rem; background: var(--accent); color: #fff;
  border: none; border-radius: 4px; font-weight: 600; font-size: 0.9rem; cursor: pointer;
}
.btn-ghost {
  padding: 0.6rem 1.1rem; background: none; color: var(--text-muted);
  border: 1px solid var(--border); border-radius: 4px; font-size: 0.9rem; cursor: pointer;
}
@media (max-width: 700px) {
  .players { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .actions { flex-wrap: wrap; }
}
</style>
