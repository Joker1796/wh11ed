<template>
  <div class="board">
    <div
      v-for="(pl, i) in current.players"
      :key="i"
      class="col"
      :class="{ lead: leaderIdx === i }"
    >
      <div class="col-head">
        <span class="pname">{{ pl.name || `${labels.trackerPlayer} ${i + 1}` }}</span>
        <span v-if="leaderIdx === i" class="lead-tag">{{ finished ? labels.trackerWinner : labels.trackerLeader }}</span>
      </div>
      <div class="grand">{{ grandTotal(i) }}<span class="grand-unit">VP</span></div>
      <dl class="breakdown">
        <div><dt>{{ labels.trackerPrimary }}</dt><dd>{{ primaryTotal(i) }}</dd></div>
        <div><dt>{{ labels.trackerSecondary }}</dt><dd>{{ secondaryTotal(i) }}</dd></div>
        <div v-if="current.settings.trackCP"><dt>{{ labels.trackerCp }}</dt><dd>{{ pl.cp }}</dd></div>
      </dl>
    </div>
    <div v-if="leaderIdx === -1" class="tie">{{ labels.trackerTie }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'

defineProps({ finished: { type: Boolean, default: false } })
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, primaryTotal, secondaryTotal, grandTotal, leader } = useTracker()
const leaderIdx = computed(() => leader())
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
  border-radius: 0 0 6px 6px;
  padding: 0.8rem;
  text-align: center;
}
.col.lead {
  border-top-color: var(--accent);
}
.col-head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 0.3rem;
}
.pname { font-weight: 700; color: var(--text-primary); font-size: 0.92rem; }
.lead-tag {
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #fff;
  background: var(--accent);
  padding: 1px 6px;
  border-radius: 999px;
}
.grand {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}
.grand-unit { font-size: 0.8rem; color: var(--text-dim); margin-left: 0.2rem; font-family: var(--font-mono); }
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
  border-radius: 999px;
  padding: 1px 8px;
  color: var(--text-dim);
}

/* Keep the two score boxes side-by-side on phones, but shrink so they fit. */
@media (max-width: 560px) {
  .board { gap: 0.4rem; }
  .col { padding: 0.55rem 0.35rem; }
  .col-head { flex-direction: column; gap: 0.15rem; }
  .pname { font-size: 0.8rem; word-break: break-word; }
  .grand { font-size: 1.7rem; }
  .grand-unit { font-size: 0.7rem; }
  .breakdown { gap: 0.5rem; }
  .breakdown dt { font-size: 0.58rem; }
  .breakdown dd { font-size: 0.82rem; }
}
</style>
