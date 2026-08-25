<template>
  <!-- Where in the battle round the game is. Ten rows — five phases per player — in play order,
       split into the first-turn player's half and the second's, because "Shooting phase" on its
       own is ambiguous at the table and the rules that care always say WHOSE. -->
  <!-- Header by `title`, not a hand-rolled one in the #header slot: BaseModal's own header is
       exactly this (heading + close), and its styles are scoped to BaseModal — a copy in the slot
       renders in THIS component's scope, where those rules cannot reach it, so it comes out as
       bare browser defaults. Passing the title also gives the dialog its aria-labelledby. -->
  <BaseModal :title="labels.trackerPhaseHeading" max-width="380px" @close="$emit('close')">
    <div class="modal-body pp-body">
      <section v-for="(t, ti) in turns" :key="ti" class="pp-turn">
        <h4 class="pp-who">
          {{ t.name }}
          <span class="pp-order">{{ ti === 0 ? labels.trackerTurnFirst : labels.trackerTurnSecond }}</span>
        </h4>
        <button
          v-for="p in BATTLE_PHASES"
          :key="p"
          type="button"
          class="pp-phase"
          :class="{ on: ti === turn && p === phase }"
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
import { BATTLE_PHASES, phaseLabel } from '../../composables/stratagemPhases.js'

const props = defineProps({
  // Player names in turn order — players[0] is always the first-turn player (useTracker).
  names: { type: Array, required: true },
  turn: { type: Number, default: 0 },
  phase: { type: String, default: 'command' },
})
defineEmits(['pick', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const turns = computed(() => props.names.map((name) => ({ name })))
</script>

<style scoped>
/* Body padding is per-dialog (it is not part of the global modal chrome) — same values as the
   other tracker pickers. */
.pp-body { display: flex; flex-direction: column; gap: 0.9rem; }
.pp-turn { display: flex; flex-direction: column; gap: 0.3rem; }
.pp-who {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 0.2rem;
}
.pp-order { font-size: 0.75rem; font-weight: 400; color: var(--text-muted); }
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
.pp-phase:hover { border-color: var(--accent); }
.pp-phase.on {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  font-weight: 600;
}
</style>
