<template>
  <div class="score-rows">
    <div
      v-for="b in blocks"
      :key="b.bi"
      class="m-block"
    >
      <div
        v-if="showHeadings || b.when"
        class="m-bhead"
      >
        <span
          v-if="showHeadings && b.kind"
          class="kind"
          :class="b.kind"
        >{{ b.kind }}</span>
        <span
          v-if="showHeadings"
          class="m-heading"
        >{{ b.heading }}</span>
        <span
          v-if="b.when"
          class="m-when"
        >{{ b.when }}</span>
      </div>
      <!-- A row whose moment cannot have come yet (an "end of your opponent's turn" condition
           during the owner's own turn, see missionTiming.js) is greyed and not tickable, with the
           reason on hover — shown, never hidden: it is still the card's condition. -->
      <label
        v-for="r in b.rows"
        :key="r.ri"
        class="m-cond"
        :class="{ on: count(b.bi, r.ri) > 0, readonly: readonly || isLocked(b), locked: isLocked(b) }"
        :title="isLocked(b) ? lockedNote : undefined"
      >
        <!-- Read-only (set-aside card, a locked row): the recorded value, no editable control. -->
        <span
          v-if="readonly || isLocked(b)"
          class="m-static"
          :class="{ hit: count(b.bi, r.ri) > 0 }"
        >
          {{ r.perEach ? count(b.bi, r.ri) : (count(b.bi, r.ri) > 0 ? '✓' : '—') }}
        </span>
        <NumberStepper
          v-else-if="r.perEach"
          :model-value="count(b.bi, r.ri)"
          :min="0"
          :max="20"
          @update:model-value="v => $emit('set', b.bi, r.ri, v)"
        />
        <input
          v-else
          type="checkbox"
          class="m-check"
          :checked="count(b.bi, r.ri) > 0"
          @change="e => $emit('set', b.bi, r.ri, e.target.checked ? 1 : 0)"
        >
        <span class="m-text">
          <em
            v-if="r.modifier === 'or' && !r.perEach"
            class="or"
          >{{ labels.trackerOr }}</em>
          {{ r.text }}
        </span>
        <strong class="m-vp">{{ r.vp }} VP{{ r.perEach ? ' ' + labels.trackerEach : '' }}</strong>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import NumberStepper from './NumberStepper.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

// The scoring rows of a mission: one block per scoring moment, one row per condition. Drawn
// both in the full-text dialog (ScoringModal, with the block headings) and right on the mission
// cards of the game screen (headings off: the round gate already chose the blocks, and the
// moment — `when` — is the line a player needs next to the tick).
const props = defineProps({
  blocks: { type: Array, required: true },    // [{ bi, kind?, heading, when?, rows:[{ri,text,vp,modifier,perEach}] }]
  count: { type: Function, required: true },  // (bi, ri) => number
  readonly: { type: Boolean, default: false },
  showHeadings: { type: Boolean, default: true },
  locked: { type: Function, default: null },  // (block) => true when its moment cannot have come
  lockedNote: { type: String, default: '' },
})
defineEmits(['set'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const isLocked = (b) => !props.readonly && !!props.locked?.(b)
</script>

<style scoped>
.m-block { margin-top: 0.6rem; }
.m-block:first-child { margin-top: 0; }
.m-bhead { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem; margin-bottom: 0.3rem; }
.kind {
  font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;
  padding: 1px 5px;
}
.kind.fixed { background: #b3401b; color: #fff; }
.kind.tactical { background: #1f3a5f; color: #fff; }
.m-heading { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: var(--text-dim); }
.m-when { font-size: 0.74rem; font-weight: 600; color: var(--text-dim); }
.m-cond {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.5rem;
  border: 1px solid var(--border);
  margin-top: 0.35rem;
  cursor: pointer;
  background: var(--bg-secondary);
}
/* Ticks in the colour of the side the rows score for (`--side`, set by the card or block around
   them), not the screen's accent — that is the side ON TURN, and the end-of-turn check scores the
   other side's cards (2026-09-29). Where no side is set (a scoring dialog), the accent. */
.m-cond.on { border-color: var(--side, var(--accent)); background: color-mix(in srgb, var(--side, var(--accent)) 10%, transparent); }
.m-cond.readonly { cursor: default; }
.m-cond.locked { opacity: 0.55; }
.m-check { width: 22px; height: 22px; margin-top: 1px; flex-shrink: 0; accent-color: var(--side, var(--accent)); cursor: pointer; }
/* Static value shown in place of the stepper/checkbox for a read-only row. */
.m-static {
  flex-shrink: 0;
  min-width: 22px;
  text-align: center;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text-dim);
}
.m-static.hit { color: var(--side, var(--accent)); }
.m-text { flex: 1 1 auto; min-width: 0; font-size: 0.86rem; color: var(--text-muted); line-height: 1.45; }
.m-vp { flex-shrink: 0; font-size: 0.86rem; color: var(--text-primary); white-space: nowrap; }
.or { font-style: normal; font-size: 0.62rem; font-weight: 700; text-transform: uppercase; color: var(--text-dim); margin-right: 0.2rem; }
</style>
