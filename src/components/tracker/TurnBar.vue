<template>
  <!-- Before the first turn the bar is one button that starts it (2026-10-02, owner): the
       setup lands here while the armies are still being deployed. -->
  <div
    v-if="mode === 'begin'"
    class="tb begin"
    :class="{ 'with-reserves': reserves, 'with-invite': invite }"
  >
    <!-- Calling the opponent's phone in at deployment (a player's report, 2026-10-15: "share the
         game at deployment") — the same invitation as the game's "⋯" → shared game. A word beside
         Start alone; an icon when the reserves take the row too. -->
    <button
      v-if="invite"
      class="tr-btn tr-invite"
      :class="{ 'tr-icon': reserves }"
      data-press
      :aria-label="labels.partyInviteOpponent"
      :title="labels.partyInviteOpponent"
      @click="$emit('invite')"
    >
      <i class="wi wi-coop" />
      <span
        v-if="!reserves"
        class="tr-label"
      >{{ labels.partyInviteShort }}</span>
    </button>
    <!-- Before the battle, the reserves are chosen (20.01): straight to the attached lists,
         whose rows carry each unit's status (owner, 2026-10-09). Only when a list is there
         to mark — without one there is no unit to put in reserve. -->
    <button
      v-if="reserves"
      class="tr-btn tr-reserves"
      data-press
      data-tour="game-reserves"
      :title="labels.trackerMarkReserves"
      :aria-label="labels.trackerMarkReserves"
      @click="$emit('reserves')"
    >
      <i class="wi wi-unit-reserve" />
      <!-- The short word beside its icon: «Отметить резервы» was cut beside «Начать» at 390px. -->
      <span class="tr-label">{{ labels.trackerReservesShort }}</span>
    </button>
    <button
      class="tr-btn tr-end"
      data-press
      data-tour="game-start"
      :class="{ opp, says: endLocked && lockedText }"
      :disabled="endLocked && !startGo"
      @click="endLocked ? $emit('go') : $emit('start')"
    >
      <span class="tr-label">{{ endLocked && lockedText ? lockedText : labels.trackerStart }}</span>
    </button>
  </div>
  <!-- With the phase clock on, the phase joins this row (owner's call, 2026-09-27): undo turn as
       an icon, the phase arrows, the phase itself (tap → any phase of either turn), and End turn.
       The arrows stay INSIDE the turn — they stop at Command and at Fight — so a turn changes only
       through End / Undo turn, never past the end-of-turn check by a stray tap. -->
  <div
    v-else-if="mode === 'phased'"
    class="tb phased"
  >
    <button
      class="tr-btn tr-prev tr-icon"
      data-press
      :disabled="!canUndo"
      :title="undoTitle"
      :aria-label="labels.trackerUndoTurn"
      @click="$emit('undo')"
    >
      <i
        class="wi wi-undo"
        aria-hidden="true"
      />
    </button>
    <button
      class="tr-step"
      data-press
      :disabled="!canPrev"
      :aria-label="labels.ariaPrevPhase"
      @click="$emit('step', -1)"
    >
      ‹
    </button>
    <button
      class="tr-phase"
      data-press
      :title="labels.trackerPhasePick"
      @click="$emit('pick-phase')"
    >
      <span class="tp-who">{{ who }}</span>
      <span class="tp-name">{{ phaseLabel(phase, labels) }}</span>
    </button>
    <button
      class="tr-step"
      data-press
      :disabled="!canNext"
      :aria-label="labels.ariaNextPhase"
      @click="$emit('step', 1)"
    >
      ›
    </button>
    <button
      class="tr-btn tr-end"
      data-press
      :class="{ opp, says: canEnd && endLocked && lockedText }"
      :disabled="canEnd && endLocked"
      :title="canEnd ? endTitle : labels.trackerFinish"
      @click="$emit('end')"
    >
      <span class="tr-label">{{ canEnd ? (endLocked && lockedText ? lockedText : labels.trackerEndTurnShort) : labels.trackerFinish }}</span>
    </button>
  </div>
  <div
    v-else
    class="tb"
  >
    <button
      class="tr-btn tr-prev"
      data-press
      :disabled="!canUndo"
      :title="undoTitle"
      @click="$emit('undo')"
    >
      <i
        class="wi wi-arrow-left"
        aria-hidden="true"
      />
      <span class="tr-label">{{ labels.trackerUndoTurn }}</span>
    </button>
    <button
      v-if="canEnd"
      class="tr-btn tr-end"
      data-press
      :class="{ opp, says: endLocked && lockedText }"
      :disabled="endLocked"
      :title="endTitle"
      @click="$emit('end')"
    >
      <span class="tr-label">{{ endLocked && lockedText ? lockedText : labels.trackerEndTurnPlain }}</span>
    </button>
    <button
      v-else
      class="tr-btn tr-end"
      data-press
      @click="$emit('end')"
    >
      <span class="tr-label">{{ labels.trackerFinish }}</span>
    </button>
  </div>
</template>

<script setup>
// The turn bar pinned at the foot of the game screen: start the battle, then undo / end the turn —
// and, with the phase clock on, the phase between them. Pure presentation — RoundTracker decides
// every value and what a tap does; the help for "Track phases" shows the same bar with example
// values, both shapes side by side (help/PhasesDemo.vue).
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { phaseLabel } from '../../core/rules/stratagemPhases.js'

defineProps({
  // Start waits for a choice THIS phone makes before the battle (the first turn's roll, its own
  // secondaries): the button then takes there instead of sitting greyed (owner, 2026-10-25: «I press
  // it and nothing happens»). It says what it waits for; a tap emits 'go'.
  startGo: { type: Boolean, default: false },
  mode: { type: String, default: 'plain' },     // 'begin' | 'phased' | 'plain'
  who: { type: String, default: '' },           // whose turn, over the phase
  phase: { type: String, default: 'command' },
  opp: { type: Boolean, default: false },       // the side on turn is the opponent: its colour
  reserves: { type: Boolean, default: false },  // before the battle: offer the reserves
  invite: { type: Boolean, default: false },    // before the battle, not yet shared: call the opponent in
  canUndo: { type: Boolean, default: false },
  canPrev: { type: Boolean, default: false },
  canNext: { type: Boolean, default: false },
  canEnd: { type: Boolean, default: true },     // a turn to end (false: the game to finish)
  endLocked: { type: Boolean, default: false }, // the turn is another phone's to end
  undoTitle: { type: String, default: '' },
  endTitle: { type: String, default: '' },
  // What a locked Start / End turn says ON the button: a phone has no hover for the title, and a
  // grey "Start game" read as broken to a guest (2026-10-17) — "Alice starts", "Alice's turn".
  lockedText: { type: String, default: '' },
})
defineEmits(['start', 'go', 'reserves', 'invite', 'undo', 'step', 'pick-phase', 'end'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
/* Back and forward by a turn: two equal halves. Forward wears the colour of the side on turn. */
.tb { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; align-items: center; }
.tb.begin { grid-template-columns: 1fr; }
.tb.begin.with-reserves { grid-template-columns: 1fr 1fr; }
.tb.begin.with-invite { grid-template-columns: auto 1fr; }
.tb.begin.with-invite.with-reserves { grid-template-columns: 42px 1fr 1fr; }
.tr-invite { font-size: 0.95rem; }
.tr-reserves { font-size: 0.95rem; }
/* With phases: undo · ‹ · the phase · › · end. */
.tb.phased { grid-template-columns: 42px 34px minmax(0, 1fr) 34px auto; gap: 0.3rem; }
.tr-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.4rem;
  min-width: 0;
  min-height: 36px;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
}
.tr-icon { padding: 0; font-size: 1.1rem; }
.tr-step {
  min-height: 36px; padding: 0;
  border: 1px solid var(--border); background: var(--bg-card);
  font-size: 1.2rem; color: var(--text-primary); cursor: pointer;
}
.tr-step:disabled { opacity: 0.35; cursor: default; }
.tr-phase {
  display: grid; align-content: center; min-width: 0; min-height: 36px; padding: 0.15rem 0.4rem;
  border: 1px solid var(--border); background: var(--bg-card); font: inherit; cursor: pointer; text-align: center;
}
.tp-who { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 0.7rem; color: var(--text-dim); line-height: 1.2; }
.tp-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-family: var(--font-display); font-size: 0.9rem; font-weight: 700; text-transform: uppercase; line-height: 1.1; color: var(--text-primary); }
@media (hover: hover) { .tr-phase:hover, .tr-step:not(:disabled):hover { border-color: var(--accent); } }
.tr-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
/* «Завершить ход» beside the longest phase («Фаза ближнего боя») on a 360px phone (owner, 2026-10-08):
   both a step under the bar's other words, measured — at 1.05/1.1rem they needed 205px of 179. */
.tr-end { --side: var(--side-you); background: var(--side); border-color: var(--side); color: #fff; font-size: 0.95rem; }
.tr-end.opp { --side: var(--side-opponent); }
.tr-btn:disabled { opacity: 0.45; cursor: default; }
/* Held by another phone, the button says whose turn it is — a line to read, not a faded button:
   white on the washed-out side colour was hard to read (acceptance, 2026-10-18). */
.tr-end.says:disabled { opacity: 1; background: color-mix(in srgb, var(--side) 14%, var(--bg-card)); color: var(--text-primary); }
@media (hover: hover) {
  .tr-prev:not(:disabled):hover { border-color: var(--accent); }
  .tr-end:not(:disabled):hover { background: color-mix(in srgb, var(--side) 85%, #000); }
}
/* A 320px phone: the fixed buttons narrower too, the words another step down (measured to fit). */
@media (max-width: 340px) {
  .tb.phased { grid-template-columns: 36px 28px minmax(0, 1fr) 28px auto; gap: 0.2rem; }
  .tp-name { font-size: 0.82rem; }
  .tr-end { font-size: 0.86rem; padding-inline: 0.45rem; }
}
</style>
