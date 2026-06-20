<template>
  <div class="sec">
    <div class="sec-head">
      <span class="sec-title">{{ labels.trackerSecondary }}</span>
      <button
        v-if="mode === 'tactical'"
        class="draw-btn"
        :disabled="!player.secondary.deck.length"
        @click="onDraw"
      >{{ player.secondary.deck.length ? labels.trackerDraw : labels.trackerNoMoreCards }}</button>
    </div>

    <!-- Active cards (drawn for tactical, or the fixed set locked at setup) -->
    <ul class="cards">
      <li v-for="m in handMissions" :key="m.slug" class="card">
        <div class="card-top">
          <span class="card-name">{{ m.name }}</span>
          <div class="card-score">
            <span class="card-vp">{{ secondaryCardVp(pi, m.slug) }} VP</span>
            <button v-if="mode === 'tactical'" class="discard" :title="labels.trackerSetAside" @click="discardFromHand(pi, m.slug)">✕</button>
          </div>
        </div>

        <!-- one scoring control per condition row of the relevant block(s) -->
        <div v-for="b in relevantBlocks(m)" :key="b.bi" class="rule-block">
          <span class="kind" :class="b.kind">{{ b.kind }}</span>
          <div v-for="r in b.rows" :key="r.ri" class="cond">
            <NumberStepper
              v-if="r.perEach"
              :modelValue="secondaryRowCount(pi, m.slug, b.bi, r.ri)"
              :min="0" :max="20"
              @update:modelValue="v => scoreSecondaryRow(pi, m.slug, b.bi, r.ri, v)"
            />
            <input
              v-else
              type="checkbox"
              class="cond-check"
              :checked="secondaryRowCount(pi, m.slug, b.bi, r.ri) > 0"
              @change="e => scoreSecondaryRow(pi, m.slug, b.bi, r.ri, e.target.checked ? 1 : 0)"
            />
            <span class="cond-text">
              <em v-if="r.modifier === 'or'" class="or">{{ labels.trackerOr }}</em>
              {{ r.text }} <strong>{{ r.vp }} VP{{ r.perEach ? ' ' + labels.trackerEach : '' }}</strong>
            </span>
          </div>
        </div>
      </li>
    </ul>

    <!-- Set aside (discarded) — points kept, won't be redrawn -->
    <div v-if="discardedMissions.length" class="aside">
      <span class="aside-label">{{ labels.trackerSetAside }}</span>
      <span v-for="m in discardedMissions" :key="m.slug" class="aside-item">
        {{ m.name }} <strong>{{ totalCardVp(m.slug) }} VP</strong>
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import NumberStepper from './NumberStepper.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, missionBySlug } from '../../composables/useTracker.js'

const props = defineProps({ pi: { type: Number, required: true } })
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { current, drawSecondary, discardFromHand, scoreSecondaryRow, secondaryRowCount, secondaryCardVp } = useTracker()

const player = computed(() => current.value.players[props.pi])
const mode = computed(() => player.value.secondaryMode)
const handMissions = computed(() =>
  player.value.secondary.hand.map(slug => missionBySlug(slug, player.value.role)).filter(Boolean)
)
const discardedMissions = computed(() =>
  (player.value.secondary.discarded || []).map(slug => missionBySlug(slug, player.value.role)).filter(Boolean)
)

// Only the block(s) matching this player's mode are scorable; annotate rows.
function relevantBlocks(m) {
  return m.blocks
    .map((b, bi) => ({ ...b, bi }))
    .filter(b => b.kind === mode.value)
    .map(b => ({ ...b, rows: b.rows.map((r, ri) => ({ ...r, ri, perEach: /^(For each|Each time)/i.test(r.text) })) }))
}

function onDraw() { drawSecondary(props.pi) }

// Total a discarded card scored across all rounds (for the set-aside summary).
function totalCardVp(slug) {
  return player.value.secondary.scored
    .filter(e => e.slug === slug)
    .reduce((s, e) => s + (e.vp || 0), 0)
}
</script>

<style scoped>
.sec { margin-top: 0.6rem; }
.sec-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.4rem;
}
.sec-title {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-dim);
}
.draw-btn {
  padding: 0.35rem 0.8rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
}
.draw-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.cards { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.card {
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 0.55rem 0.65rem;
  background: var(--bg-secondary);
}
.card-top { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.card-name { font-weight: 700; font-size: 0.9rem; color: var(--text-primary); }
.card-score { display: flex; align-items: center; gap: 0.5rem; }
.card-vp { font-family: var(--font-mono); font-weight: 700; font-size: 0.85rem; color: var(--accent); }
.discard {
  background: none; border: none; color: var(--text-dim);
  cursor: pointer; font-size: 0.85rem; padding: 0 0.2rem;
}
.discard:hover { color: var(--accent); }
.rule-block { margin-top: 0.45rem; }
.kind {
  display: inline-block;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 1px 5px;
  border-radius: 2px;
  margin-bottom: 0.3rem;
}
.kind.fixed { background: #b3401b; color: #fff; }
.kind.tactical { background: #1f3a5f; color: #fff; }
.cond {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  margin-top: 0.3rem;
}
.cond-check { width: 18px; height: 18px; margin-top: 1px; flex-shrink: 0; accent-color: var(--accent); cursor: pointer; }
.cond-text { font-size: 0.78rem; color: var(--text-muted); line-height: 1.4; }
.cond-text strong { color: var(--text-primary); white-space: nowrap; }
.or {
  font-style: normal;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--text-dim);
  margin-right: 0.2rem;
}
.aside {
  margin-top: 0.55rem;
  padding-top: 0.45rem;
  border-top: 1px dashed var(--border);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  color: var(--text-dim);
}
.aside-label {
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.aside-item strong { color: var(--text-muted); font-family: var(--font-mono); }
</style>
