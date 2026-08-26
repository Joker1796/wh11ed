<template>
  <div class="board">
    <div
      v-for="(pl, i) in game.players"
      :key="i"
      class="col"
      :class="{ lead: leaderIdx === i }"
    >
      <div class="col-head">
        <span class="pname">{{ pl.name || ((pl.isYou ?? i === 0) ? labels.trackerYou : labels.trackerOpponent) }}</span>
        <span v-if="leaderIdx === i && !finished" class="lead-tag">{{ labels.trackerLeader }}</span>
      </div>
      <div class="grand" :ref="el => (grandEls[i] = el)">
        <template v-if="bpMode">
          {{ bp[i] }}<span class="grand-unit">BP</span>
          <span class="grand-vp">{{ grandTotal(i) }} VP</span>
        </template>
        <template v-else>{{ grandTotal(i) }}<span class="grand-unit">VP</span></template>
      </div>
      <dl v-if="!finished" class="breakdown">
        <div><dt>{{ labels.trackerPrimary }}</dt><dd>{{ primaryTotal(i) }}</dd></div>
        <div><dt>{{ labels.trackerSecondary }}</dt><dd>{{ secondaryTotal(i) }}</dd></div>
        <div v-if="showCp"><dt>{{ labels.trackerCp }}</dt><dd>{{ pl.cp }}</dd></div>
      </dl>
    </div>
    <div v-if="leaderIdx === -1" class="tie">{{ labels.trackerTie }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useFlashOnChange } from '../../composables/useFlashOnChange.js'
import { useTracker } from '../../composables/useTracker.js'
import { primaryTotal as primaryTotalOf, secondaryTotal as secondaryTotalOf, grandTotal as grandTotalOf, leader as leaderOf, battlePoints as battlePointsOf } from '../../composables/gameScoring.js'
import { tracks } from '../../data/trackerOptions.js'

// `game` prop drives a finished/history game; defaults to the active game from the store.
const props = defineProps({
  finished: { type: Boolean, default: false },
  game: { type: Object, default: null },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current } = useTracker()
const game = computed(() => props.game || current.value)

const primaryTotal = (i) => primaryTotalOf(game.value, i)
const secondaryTotal = (i) => secondaryTotalOf(game.value, i)
const grandTotal = (i) => grandTotalOf(game.value, i)
const leaderIdx = computed(() => leaderOf(game.value))
const showCp = computed(() => tracks(game.value?.settings, 'trackCP'))
// Battle Points are a finished-game metric — only shown on results when scoreMode is 'bp'.
const bpMode = computed(() => props.finished && game.value?.settings?.scoreMode === 'bp')
const bp = computed(() => battlePointsOf(game.value))

// Pulse a column's grand total when it changes (scoring feedback).
const grandEls = []
useFlashOnChange(() => grandTotal(0), () => grandEls[0])
useFlashOnChange(() => grandTotal(1), () => grandEls[1])
</script>

<style scoped>
.board {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.col {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-top: 3px solid var(--border);
  padding: 0.8rem;
  text-align: center;
}
.col.lead {
  border-top-color: #e3b341;
}
.col-head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 0.3rem;
}
.pname { font-weight: 700; color: var(--text-primary); font-size: 1.2rem; }
.lead-tag {
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #1a1a1a;
  background: #e3b341;
  padding: 1px 6px;
}
.grand {
  font-family: var(--font-display);
  font-size: 2.42rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1;
}
.grand-unit { font-size: 0.8rem; color: var(--text-dim); margin-left: 0.2rem; font-family: var(--font-mono); }
.grand-vp { font-size: 0.85rem; opacity: 0.5; margin-left: 0.4rem; font-family: var(--font-mono); font-weight: 600; }
.breakdown {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 0.5rem 0 0;
}
.breakdown div { display: flex; flex-direction: column; gap: 1px; }
.breakdown dt { font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-dim); }
.breakdown dd { margin: 0; font-family: var(--font-mono); font-weight: 700; color: var(--text-muted); }
.tie {
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.66rem;
  text-transform: uppercase;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  padding: 1px 8px;
  color: var(--text-dim);
}

/* Keep the two score boxes side-by-side on phones, but shrink so they fit. */
@media (max-width: 560px) {
  .board { gap: 0.4rem; }
  .col { padding: 0.55rem 0.35rem; }
  .col-head { flex-direction: column; gap: 0.15rem; }
  /* Hide the "Leading" tag on phones so both score columns stay aligned; the accent top-border
     already marks the leader. Desktop keeps it. (On a finished game no tag shows at all — the
     gold top-border marks the winner.) */
  .lead-tag { display: none; }
  .pname { font-size: 1.05rem; word-break: break-word; }
  .grand { font-size: 1.7rem; }
  .grand-unit { font-size: 0.7rem; }
  .breakdown { gap: 0.5rem; }
  .breakdown dt { font-size: 0.58rem; }
  .breakdown dd { font-size: 0.82rem; }
}
</style>
