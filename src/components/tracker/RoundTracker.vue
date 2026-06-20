<template>
  <div class="round-tracker">
    <ScoreBoard />

    <div class="round-bar">
      <button class="rb-nav" :disabled="current.currentRound <= 1" @click="goToRound(current.currentRound - 1)">‹</button>
      <div class="rb-rounds">
        <button
          v-for="n in ROUND_COUNT"
          :key="n"
          class="rb-round"
          :class="{ on: current.currentRound === n }"
          @click="goToRound(n)"
        >{{ n }}</button>
      </div>
      <button class="rb-nav" :disabled="current.currentRound >= ROUND_COUNT" @click="goToRound(current.currentRound + 1)">›</button>
    </div>
    <p class="round-label">{{ labels.trackerRound }} {{ current.currentRound }}</p>

    <div class="players">
      <div v-for="(pl, i) in current.players" :key="i" class="player">
        <h3 class="ptitle">{{ pl.name || `${labels.trackerPlayer} ${i + 1}` }}</h3>
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
      :count="(bi, ri) => primaryRowCount(openPrimary, current.currentRound - 1, bi, ri)"
      :note="`${labels.trackerPrimary}: ${labels.trackerThisRound} ≤ ${PRIMARY_ROUND_CAP} · ${PRIMARY_GAME_CAP}/${labels.trackerTotal}`"
      @set="(bi, ri, c) => setPrimaryRow(openPrimary, current.currentRound - 1, bi, ri, c)"
      @close="openPrimary = -1"
    />

    <div class="actions">
      <button class="btn-ghost" @click="confirmFinish">{{ labels.trackerFinish }}</button>
      <button
        v-if="current.currentRound < ROUND_COUNT"
        class="btn-primary"
        @click="goToRound(current.currentRound + 1)"
      >{{ labels.trackerNext }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import NumberStepper from './NumberStepper.vue'
import SecondaryDeck from './SecondaryDeck.vue'
import ScoreBoard from './ScoreBoard.vue'
import ScoringModal from './ScoringModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, ROUND_COUNT, PRIMARY_ROUND_CAP, PRIMARY_GAME_CAP, dispositionName, missionBySlug } from '../../composables/useTracker.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, setRoundPrimary, setPrimaryRow, primaryRowCount, setCp, goToRound, finishGame } = useTracker()

const openPrimary = ref(-1)   // index of the player whose primary scoring modal is open

function primaryMission(i) {
  return missionBySlug(current.value.players[i].primarySlug, null, locale.value)
}
function primaryName(i) {
  const m = primaryMission(i)
  return m ? m.name : ''
}
// Scorable blocks of a player's primary this round: all except End-of-Battle,
// plus End-of-Battle blocks only in the final round.
function primaryBlocks(i) {
  const m = primaryMission(i)
  if (!m) return []
  return m.blocks
    .map((b, bi) => ({ b, bi }))
    .filter(({ b }) => !/end of battle/i.test(b.heading) || current.value.currentRound === ROUND_COUNT)
    .map(({ b, bi }) => ({
      bi, heading: b.heading, when: b.when,
      rows: b.rows.map((r, ri) => ({ ...r, ri, perEach: /^For each/i.test(r.text) })),
    }))
}
function confirmFinish() {
  if (window.confirm(labels.value.trackerFinishConfirm)) finishGame()
}
</script>

<style scoped>
.round-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0 0.2rem;
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
.round-label {
  text-align: center;
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem;
}
.players { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.player {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.8rem;
}
.ptitle { font-family: var(--font-serif); font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin: 0; }
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
</style>
