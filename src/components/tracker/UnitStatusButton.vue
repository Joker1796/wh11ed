<template>
  <!-- Where a unit of the attached list is — on the battlefield, in Strategic Reserves, destroyed
       (unitStatus.js; owner, 2026-10-08: an icon button opposite the Battle-shock chip, a dialog to
       choose, the icon then says the answer). Read-only in a finished game's record. -->
  <button
    type="button"
    class="us-btn"
    :class="`us-${status}`"
    data-press
    data-tour="unit-status"
    aria-haspopup="dialog"
    :disabled="disabled"
    :title="label(status)"
    :aria-label="`${labels.unitStatusTitle}: ${label(status)}`"
    @click="open = true"
  >
    <i
      class="us-icon wi"
      :class="`wi-unit-${status}`"
    />
  </button>

  <BaseModal
    v-if="open"
    :title="name"
    :subtitle="labels.unitStatusTitle"
    max-width="360px"
    @close="open = false"
  >
    <div class="modal-body">
      <!-- Strict rules: a destroyed unit stays destroyed unless that was the side's last act. -->
      <p
        v-if="lockedWhy"
        class="check-note us-why"
      >
        {{ lockedWhy }}
      </p>
      <div class="act-list">
        <button
          v-for="s in UNIT_STATUSES"
          :key="s"
          type="button"
          class="act-btn us-opt"
          :class="{ on: s === status }"
          :aria-pressed="s === status"
          :disabled="!!lockedWhy && s !== status"
          data-press
          @click="pick(s)"
        >
          <i
            class="us-icon wi"
            :class="`wi-unit-${s}`"
          />
          <span>{{ label(s) }}</span>
          <i
            v-if="s === status"
            class="wi wi-check us-check"
          />
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
import { UNIT_STATUSES } from '../../core/game/unitStatus.js'

defineProps({
  status: { type: String, default: 'table' },
  // The unit's name, for the dialog's title.
  name: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  // Why the unit cannot leave its status (strict rules): the dialog opens, says so, offers nothing.
  lockedWhy: { type: String, default: '' },
})
const emit = defineEmits(['set'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const KEYS = { table: 'unitStatusTable', reserve: 'unitStatusReserve', destroyed: 'unitStatusDestroyed' }
const label = (s) => labels.value[KEYS[s]]

const open = ref(false)
function pick(s) {
  open.value = false
  emit('set', s)
}
</script>

<style scoped>
.us-why { margin: 0 0 0.5rem; }
/* The chip row's other end: a square the height of the Battle-shock chip, the icon the answer. */
.us-btn {
  flex-shrink: 0;
  display: inline-flex; align-items: center; justify-content: center;
  width: 2rem; height: 2rem; margin-left: auto;
  border: 1px solid var(--border); background: none;
  color: var(--text-muted); font-size: 0.95rem; cursor: pointer;
  transition: border-color var(--motion-fast), color var(--motion-fast);
}
@media (hover: hover) { .us-btn:not(:disabled):hover { border-color: var(--accent); color: var(--accent-ink); } }
.us-btn:disabled { cursor: default; }
/* In play in the army's colour (the roster screen's accent is its faction's); gone, grey — it is
   out of the game, not an error (owner, 2026-10-08). */
.us-table, .us-reserve { border-color: var(--accent); color: var(--accent-ink); }
.us-destroyed { border-color: var(--border); color: var(--text-dim); }
/* The owner's drawings (`.wi-unit-*`, style.css). On the row the drawing fills its square: at the
   text's size its detail ran together. */
.us-icon { flex-shrink: 0; font-size: 1.15em; }
.us-btn > .us-icon { font-size: 1.25rem; }
.us-opt { display: flex; align-items: center; gap: 0.6rem; }
.us-opt.on { border-color: var(--accent); }
.us-check { margin-left: auto; color: var(--accent-ink); }
</style>
