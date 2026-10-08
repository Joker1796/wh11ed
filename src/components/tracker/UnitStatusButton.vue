<template>
  <!-- Where a unit of the attached list is — on the battlefield, in Strategic Reserves, destroyed
       (unitStatus.js; owner, 2026-10-08: an icon button opposite the Battle-shock chip, a dialog to
       choose, the icon then says the answer). Read-only in a finished game's record. -->
  <button
    type="button"
    class="us-btn"
    :class="`us-${status}`"
    data-press
    aria-haspopup="dialog"
    :disabled="disabled"
    :title="label(status)"
    :aria-label="`${labels.unitStatusTitle}: ${label(status)}`"
    @click="open = true"
  >
    <i
      class="bi"
      :class="ICONS[status]"
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
      <div class="act-list">
        <button
          v-for="s in UNIT_STATUSES"
          :key="s"
          type="button"
          class="act-btn us-opt"
          :class="{ on: s === status }"
          :aria-pressed="s === status"
          data-press
          @click="pick(s)"
        >
          <i
            class="bi"
            :class="ICONS[s]"
          />
          <span>{{ label(s) }}</span>
          <i
            v-if="s === status"
            class="bi bi-check-lg us-check"
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
import { UNIT_STATUSES } from '../../composables/unitStatus.js'

defineProps({
  status: { type: String, default: 'table' },
  // The unit's name, for the dialog's title.
  name: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
})
const emit = defineEmits(['set'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const ICONS = { table: 'bi-geo-alt-fill', reserve: 'bi-clock-history', destroyed: 'bi-x-octagon-fill' }
const KEYS = { table: 'unitStatusTable', reserve: 'unitStatusReserve', destroyed: 'unitStatusDestroyed' }
const label = (s) => labels.value[KEYS[s]]

const open = ref(false)
function pick(s) {
  open.value = false
  emit('set', s)
}
</script>

<style scoped>
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
/* Off the battlefield says so in colour: waiting in the side's, gone in the danger red. */
.us-reserve { border-color: var(--accent); color: var(--accent-ink); }
.us-destroyed { border-color: var(--danger); color: var(--danger); }
.us-opt { display: flex; align-items: center; gap: 0.6rem; }
.us-opt.on { border-color: var(--accent); }
.us-check { margin-left: auto; color: var(--accent-ink); }
</style>
