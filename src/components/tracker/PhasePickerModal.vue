<template>
  <!-- Where in the battle round the game is. Ten rows — five phases per player — in play order,
       split into the first-turn player's half and the second's, because "Shooting phase" on its
       own is ambiguous at the table and the rules that care always say WHOSE. -->
  <!-- Header by `title`, not a hand-rolled one in the #header slot: BaseModal's own header is
       exactly this (heading + close), and its styles are scoped to BaseModal — a copy in the slot
       renders in THIS component's scope, where those rules cannot reach it, so it comes out as
       bare browser defaults. Passing the title also gives the dialog its aria-labelledby. -->
  <BaseModal
    :title="`${labels.trackerPhaseHeading} \u00b7 ${labels.trackerRoundShort} ${round}`"
    max-width="380px"
    @close="$emit('close')"
  >
    <div class="modal-body pp-body">
      <!-- Strict rules: the phases already behind the clock are shut, and this says why. -->
      <small
        v-if="backWhy"
        class="check-note"
      >{{ backWhy }}</small>
      <section
        v-for="(t, ti) in turns"
        :key="ti"
        class="pp-turn"
      >
        <h4 class="pp-who">
          {{ t.name }}
          <span class="pp-order">{{ ti === 0 ? labels.trackerTurnFirst : labels.trackerTurnSecond }}</span>
        </h4>
        <button
          v-for="p in BATTLE_PHASES"
          :key="p"
          type="button"
          class="pp-phase"
          data-press
          :class="{ on: ti === turn && p === phase }"
          :disabled="!!backWhy && isBehind(ti, p)"
          @click="$emit('pick', ti, p)"
        >
          {{ phaseLabel(p, labels) }}
        </button>
      </section>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { BATTLE_PHASES, phaseLabel } from '../../core/rules/stratagemPhases.js'

const props = defineProps({
  // Player names in turn order — players[0] is always the first-turn player (useTracker).
  names: { type: Array, required: true },
  turn: { type: Number, default: 0 },
  phase: { type: String, default: 'command' },
  // The live round, in the title: the ten rows are this round's (owner, 2026-10-06).
  round: { type: Number, default: 1 },
  // Why the clock cannot go back (strict rules) — the slots behind the live one are greyed.
  backWhy: { type: String, default: '' },
})
defineEmits(['pick', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const turns = computed(() => props.names.map((name) => ({ name })))
const isBehind = (ti, p) => ti < props.turn || (ti === props.turn && BATTLE_PHASES.indexOf(p) < BATTLE_PHASES.indexOf(props.phase))
</script>

<style scoped>
/* Body padding is per-dialog (it is not part of the global modal chrome) — same values as the
   other tracker pickers. */
.pp-body { display: flex; flex-direction: column; gap: 0.9rem; }
.pp-turn { display: flex; flex-direction: column; gap: 0.3rem; }
.pp-who {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-primary);
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0.2rem;
}
.pp-order { font-size: 1.15rem; font-weight: 400; color: var(--text-muted); }
.pp-phase {
  text-align: left;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-dim);
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
}
.pp-phase:disabled { opacity: 0.45; cursor: default; }
@media (hover: hover) { .pp-phase:not(:disabled):hover { border-color: var(--accent); } }
.pp-phase.on {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  font-weight: 600;
}
</style>
