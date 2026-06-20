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
        <p class="pmeta">
          {{ dispositionName(pl.disposition) }}
          <span v-if="primaryName(i)"> · {{ primaryName(i) }}</span>
        </p>

        <div class="score-row">
          <span class="sr-label">{{ labels.trackerPrimary }}</span>
          <NumberStepper
            :modelValue="pl.rounds[current.currentRound - 1].primary"
            :min="0"
            :max="roundPrimaryMax(i, current.currentRound - 1)"
            @update:modelValue="v => setRoundPrimary(i, current.currentRound - 1, v)"
          />
          <span class="sr-sub">/ {{ roundPrimaryMax(i, current.currentRound - 1) }} {{ labels.trackerThisRound }}</span>
        </div>

        <div v-if="current.settings.trackCP" class="score-row">
          <span class="sr-label">{{ labels.trackerCp }}</span>
          <NumberStepper :modelValue="pl.cp" :min="0" @update:modelValue="v => setCp(i, v)" />
        </div>

        <SecondaryDeck :pi="i" />
      </div>
    </div>

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
import { computed } from 'vue'
import NumberStepper from './NumberStepper.vue'
import SecondaryDeck from './SecondaryDeck.vue'
import ScoreBoard from './ScoreBoard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, ROUND_COUNT, dispositionName, primaryFor } from '../../composables/useTracker.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, setRoundPrimary, setCp, roundPrimaryMax, goToRound, finishGame } = useTracker()

function primaryName(i) {
  const me = current.value.players[i], opp = current.value.players[i === 0 ? 1 : 0]
  const m = primaryFor(me.disposition, opp.disposition)
  return m ? m.name : ''
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
.pmeta { font-size: 0.78rem; color: var(--text-muted); margin: 0.1rem 0 0.7rem; }
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
