<template>
  <!-- The battle rounds as a thin line of points (owner, 2026-09-30): a row of five buttons read as
       a way to move the game, which only the turn row at the foot of the screen does. Rounds gone
       by are filled, the live one pulses, the ones to come are hollow; a past round opened for
       correction wears a ring. The whole line is one button — it opens what it is and what it is
       for, and the past rounds to correct.
       With the phase clock on (`phase`), a point is where its round STARTS and the stretch after it
       is the round itself: the live one widens into its phases — both turns, a gap between them —
       filled up to the phase the clock stands on, which pulses instead of the point. -->
  <button
    type="button"
    class="rs"
    :aria-label="`${labels.trackerRound} ${live} / ${count}`"
    @click="open = true"
  >
    <template
      v-for="n in count"
      :key="n"
    >
      <span
        v-if="n > 1 && !phase"
        class="rs-ln"
        :class="{ done: n <= live }"
      />
      <!-- A hint on hover names the round under the pointer (owner, 2026-10-02). -->
      <!-- The live round's point wears the colour of the side whose turn it is (owner, 2026-10-08). -->
      <span
        class="rs-pt"
        :class="{ done: n < live, now: n === live, live: n === live && !phase, shown: n === shown && n !== live }"
        :style="n === live && turnColor ? { '--rs-now': turnColor } : null"
        :title="`${labels.trackerRound} ${n}`"
      />
      <span
        v-if="phase && n === live"
        class="rs-phases"
      >
        <span
          v-for="k in phase.steps"
          :key="k"
          class="rs-tick"
          :class="{ done: k - 1 < phase.at, live: k - 1 === phase.at, half: k === phase.steps / 2 }"
          :style="{ '--tick': k <= phase.steps / 2 ? phase.colors[0] : phase.colors[1] }"
        />
      </span>
      <span
        v-else-if="phase"
        class="rs-ln"
        :class="{ done: n < live }"
      />
    </template>
    <!-- The end of the battle: with the rounds as stretches, the last one needs an edge. -->
    <span
      v-if="phase"
      class="rs-end"
    />
  </button>

  <BaseModal
    v-if="open"
    :title="labels.trackerRoundsTitle"
    max-width="420px"
    @close="open = false"
  >
    <div class="modal-body">
      <p class="rs-text">
        {{ labels.trackerRoundsHelp }}
      </p>
      <p
        v-if="phase"
        class="rs-text"
      >
        {{ labels.trackerRoundsPhasesHelp }}
      </p>
      <div class="rs-list">
        <button
          v-for="n in count"
          :key="n"
          type="button"
          class="rs-item"
          :class="{ on: n === shown }"
          :disabled="n > live"
          @click="pick(n)"
        >
          <span class="rs-item-n">{{ labels.trackerRound }} {{ n }}</span>
          <span class="rs-item-state">{{ n === live ? (phase?.label ? `${labels.trackerRoundLive} · ${phase.label}` : labels.trackerRoundLive) : n < live ? labels.trackerRoundCorrect : '' }}</span>
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  count: { type: Number, required: true }, // rounds in a game
  live: { type: Number, required: true },  // the round the game is in
  shown: { type: Number, required: true }, // the round on screen (a past one while correcting)
  // With the phase clock: { steps (phases in a round, both turns), at (0-based, the live one),
  // colors ([first turn's, second turn's] side colour), label (the phase and whose turn, for the
  // dialog) }; null without it.
  phase: { type: Object, default: null },
  // The colour of the side whose turn it is — the live round's point wears it.
  turnColor: { type: String, default: '' },
})
// `pick(n)`: the round to show — the live one takes the screen back from a correction.
const emit = defineEmits(['pick'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const open = ref(false)
function pick(n) {
  open.value = false
  if (n !== props.shown) emit('pick', n)
}
</script>

<style scoped>
.rs {
  /* The rounds' grey is the phases' still to come (owner, 2026-10-08 — the bright grey out-shouted
     the phases' colour beside it). A past round differs from a coming one by its fill alone. */
  --rs-mute: var(--border);
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
  height: 24px;
  padding: 0 6px;
  border: 0;
  background: none;
  cursor: pointer;
}
/* The points and lines are grey (owner, 2026-09-30): the colour on the line is the phases', each in
   the colour of the side whose turn it was. */
.rs-ln { flex: 1 1 0; height: 2px; background: var(--border); }
.rs-ln.done { background: var(--rs-mute); }
.rs-pt {
  position: relative;
  flex: 0 0 auto;
  width: 12px;
  height: 12px;
  border: 2px solid var(--rs-mute);
  background: var(--bg-primary);
}
.rs-pt.done { background: var(--rs-mute); }
.rs-pt.now { border-color: var(--rs-now, var(--rs-mute)); background: var(--rs-now, var(--rs-mute)); }
/* A past round open for correction: a frame the colour of the page around it. Square, like every
   corner in the app (owner, 2026-09-30: the points were circles). */
.rs-pt.shown { box-shadow: 0 0 0 2px var(--bg-primary), 0 0 0 4px var(--text-primary); }
/* The live round breathes — slow, so it reads as "here", not as an alert. */
.rs-pt.live::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: var(--rs-now, var(--rs-mute));
  animation: rs-pulse 2.4s ease-out infinite;
}
@keyframes rs-pulse {
  from { opacity: 0.6; transform: scale(1); }
  to { opacity: 0; transform: scale(2.6); }
}
@media (prefers-reduced-motion: reduce) {
  .rs-pt.live::after, .rs-tick.live::after { animation: none; }
}
/* The live round's phases: three times a plain stretch, so ten ticks fit on a 320px phone. */
.rs-phases { display: flex; align-items: center; gap: 2px; flex: 3 1 0; min-width: 0; padding: 0 3px; }
.rs-tick { position: relative; flex: 1 1 0; height: 6px; background: var(--border); }
.rs-tick.done, .rs-tick.live { background: var(--tick); }
.rs-tick.half { margin-right: 4px; } /* the turn changes here */
.rs-tick.live::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--tick);
  animation: rs-pulse-tick 2.4s ease-out infinite;
}
@keyframes rs-pulse-tick {
  from { opacity: 0.6; transform: scale(1); }
  to { opacity: 0; transform: scale(1.6, 2.6); }
}
.rs-end { flex: 0 0 auto; width: 2px; height: 10px; background: var(--border); }

.rs-text { margin: 0 0 0.8rem; font-size: 0.9rem; line-height: 1.45; color: var(--text-secondary); }
.rs-list { display: grid; gap: 0.3rem; }
.rs-item {
  display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
  min-height: 40px; padding: 0.3rem 0.7rem;
  border: 1px solid var(--border); background: var(--bg-card);
  color: var(--text-primary); font: inherit; text-align: left; cursor: pointer;
}
.rs-item.on { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, var(--bg-card)); }
.rs-item:disabled { opacity: 0.45; cursor: default; }
.rs-item-n { font-weight: 700; }
.rs-item-state { font-size: 0.8rem; color: var(--text-muted); }
</style>
