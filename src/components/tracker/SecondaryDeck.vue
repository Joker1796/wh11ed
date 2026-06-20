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

    <!-- Fixed mode: pick the locked set -->
    <div v-if="mode === 'fixed'" class="fixed-pick">
      <p class="hint">{{ labels.trackerChooseFixed }}</p>
      <div class="chips">
        <button
          v-for="m in pool"
          :key="m.slug"
          class="chip"
          :class="{ on: inHand(m.slug) }"
          @click="toggleFixed(m.slug)"
        >{{ m.name }}</button>
      </div>
    </div>

    <!-- Active cards (drawn or locked) -->
    <ul class="cards">
      <li v-for="m in handMissions" :key="m.slug" class="card">
        <div class="card-top">
          <span class="card-name">{{ m.name }}</span>
          <div class="card-score">
            <NumberStepper
              :modelValue="scoredVp(m.slug)"
              :min="0"
              :max="cardMax(m)"
              @update:modelValue="v => scoreSecondary(pi, m.slug, v)"
            />
            <span class="vp-unit">VP</span>
            <button class="discard" :title="labels.trackerDelete" @click="discardFromHand(pi, m.slug)">✕</button>
          </div>
        </div>
        <div class="card-rules">
          <div v-for="(b, bi) in m.blocks" :key="bi" class="rule-block">
            <span v-if="b.kind" class="kind" :class="b.kind">{{ b.kind }}</span>
            <span v-for="(r, ri) in b.rows" :key="ri" class="rule-row">
              {{ r.text }} <strong>{{ r.vp }} VP</strong><template v-if="r.modifier === 'or'"> ·or· </template>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import NumberStepper from './NumberStepper.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, secondaryPool, missionBySlug } from '../../composables/useTracker.js'

const props = defineProps({ pi: { type: Number, required: true } })
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { current, drawSecondary, scoreSecondary, lockFixed, discardFromHand } = useTracker()

const mode = computed(() => current.value.settings.secondaryMode)
const player = computed(() => current.value.players[props.pi])
const pool = computed(() => secondaryPool(player.value.role))
const handMissions = computed(() =>
  player.value.secondary.hand.map(slug => missionBySlug(slug, player.value.role)).filter(Boolean)
)

function inHand(slug) { return player.value.secondary.hand.includes(slug) }
function toggleFixed(slug) {
  const set = new Set(player.value.secondary.hand)
  if (set.has(slug)) set.delete(slug); else set.add(slug)
  lockFixed(props.pi, [...set])
}
function onDraw() { drawSecondary(props.pi) }

function scoredVp(slug) {
  const round = current.value.currentRound
  const e = player.value.secondary.scored.find(x => x.slug === slug && x.round === round)
  return e ? e.vp : 0
}
function cardMax(m) {
  const nums = m.blocks.flatMap(b => b.rows.map(r => typeof r.vp === 'number' ? r.vp : parseInt(String(r.vp).replace('+', ''), 10) || 0))
  return Math.max(10, ...nums)
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
.hint { font-size: 0.78rem; color: var(--text-muted); margin: 0 0 0.4rem; }
.chips { display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.5rem; }
.chip {
  padding: 0.3rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-muted);
  border-radius: 999px;
  font-size: 0.76rem;
  cursor: pointer;
}
.chip.on { background: var(--accent); color: #fff; border-color: var(--accent); }
.cards { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.card {
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 0.55rem 0.65rem;
  background: var(--bg-secondary);
}
.card-top { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.card-name { font-weight: 700; font-size: 0.9rem; color: var(--text-primary); }
.card-score { display: flex; align-items: center; gap: 0.4rem; }
.vp-unit { font-size: 0.7rem; color: var(--text-dim); font-family: var(--font-mono); }
.discard {
  background: none; border: none; color: var(--text-dim);
  cursor: pointer; font-size: 0.85rem; padding: 0 0.2rem;
}
.discard:hover { color: var(--accent); }
.card-rules { margin-top: 0.4rem; font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; }
.rule-block { margin-top: 0.2rem; }
.kind {
  display: inline-block;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 1px 5px;
  border-radius: 2px;
  margin-right: 0.35rem;
}
.kind.fixed { background: #b3401b; color: #fff; }
.kind.tactical { background: #1f3a5f; color: #fff; }
.rule-row strong { color: var(--text-primary); }
</style>
