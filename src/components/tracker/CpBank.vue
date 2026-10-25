<template>
  <div
    class="cp-bank"
    :class="{ 'player-locked': locked }"
    :inert="inert"
  >
    <!-- The round's bonus CP as one toggle (owner, 2026-10-06 — a "0/1" label, a counter and
         a button were three things saying one): outlined while it can be taken, filled
         with a tick once taken. A tap takes it or gives it back; one a secondary discard
         gave is undone with the discard, so it shows taken and says where it came from. -->
    <button
      class="cr-btn"
      :class="{ on: bonus }"
      data-press="pop"
      :aria-pressed="bonus"
      :disabled="bonusDisabled"
      :title="bonusTitle"
      @click="$emit('bonus')"
    >
      <i
        class="wi"
        :class="bonus ? 'wi-check' : 'wi-add'"
        aria-hidden="true"
      />
      {{ labels.trackerBonusToggle }}
    </button>
    <!-- The balance, and a pencil for the rare correction (owner, 2026-10-19 — Mikhail asked why
         − and + sat beside the stratagems when CP come by themselves and go on stratagems): the
         stepper lives in a dialog that says what it is for. -->
    <!-- Where stratagems are not paid for here (`stratSpendCp` off, or none shown), CP are spent by
         hand: − and + at the balance (owner, 2026-10-25). "−" spends, "+" corrects. -->
    <NumberStepper
      v-if="stepper"
      class="cr-adjust cr-inline"
      :model-value="cp"
      :min="0"
      :max="editWhy ? cp : null"
      :disabled="locked"
      :aria-label="`${name} — CP`"
      @update:model-value="v => v < cp ? $emit('spend') : $emit('update:cp', v)"
    />
    <span
      v-else
      class="cr-adjust cr-count"
    >{{ cp }} CP</span>
    <button
      v-if="!stepper"
      type="button"
      class="cr-edit"
      data-press
      :disabled="!!editWhy"
      :aria-label="labels.trackerCpEdit"
      :title="editWhy || labels.trackerCpEdit"
      @click="editOpen = true"
    >
      <i
        class="wi wi-edit"
        aria-hidden="true"
      />
    </button>
    <button
      type="button"
      class="cr-help"
      data-press
      :aria-label="labels.trackerCpHelpTitle"
      :title="labels.trackerCpHelpTitle"
      @click="$emit('help')"
    >
      <i class="wi wi-help" />
    </button>
    <BaseModal
      v-if="editOpen"
      :title="labels.trackerCpEditTitle"
      max-width="400px"
      @close="editOpen = false"
    >
      <div class="modal-body">
        <p class="cr-note">
          {{ auto ? labels.trackerCpEditNote : labels.trackerCpEditNoteManual }}
        </p>
        <NumberStepper
          class="cr-stepper"
          :model-value="cp"
          :min="0"
          :aria-label="`${name} — CP`"
          @update:model-value="v => $emit('update:cp', v)"
        />
      </div>
      <div class="modal-footer">
        <button
          class="btn-primary"
          @click="editOpen = false"
        >
          {{ labels.trackerTakeDone }}
        </button>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
// One side's command points, the line under CpStratagems' side tabs: the round's bonus point, the
// balance and a "?" for where CP come from. Pure presentation — RoundTracker decides every value
// and what a tap does; the CP help shows the same line with example values (help/CpDemo.vue).
import { computed, ref } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import NumberStepper from './NumberStepper.vue'
import BaseModal from '../BaseModal.vue'

defineProps({
  cp: { type: Number, required: true },
  name: { type: String, default: '' },          // the side's player, for the stepper's label
  bonus: { type: Boolean, default: false },      // this round's bonus point taken
  bonusDisabled: { type: Boolean, default: false },
  bonusTitle: { type: String, default: '' },
  locked: { type: Boolean, default: false },     // another phone's side: dimmed
  inert: { type: Boolean, default: false },
  auto: { type: Boolean, default: true },        // core CP come by themselves (the game's cpAuto)
  editWhy: { type: String, default: '' },       // why the pencil is refused (strict rules), said on it
  stepper: { type: Boolean, default: false },   // − and + at the balance instead of the pencil
})
defineEmits(['bonus', 'update:cp', 'spend', 'help'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const editOpen = ref(false)
</script>

<style scoped>
.cp-bank {
  display: flex; align-items: center; gap: 0.5rem;
  margin-bottom: 0.6rem; padding: 0.4rem 0 0.1rem;
}
.player-locked { opacity: 0.72; }
.cr-adjust { margin-left: auto; }
.cr-btn {
  display: inline-flex; align-items: center; gap: 0.25rem;
  min-height: 36px; padding: 0.25rem 0.55rem;
  border: 1px solid var(--side); background: color-mix(in srgb, var(--side) 8%, var(--bg-card));
  font: inherit; font-size: 0.8rem; font-weight: 700; color: var(--side); cursor: pointer; white-space: nowrap;
}
.cr-btn.on { background: var(--side); color: #fff; }
.cr-btn:disabled:not(.on) { border-color: var(--border); background: var(--bg-secondary); color: var(--text-dim); cursor: default; }
/* Taken by a discard: still reads taken, just not a button here. */
.cr-btn.on:disabled { cursor: default; opacity: 0.75; }
.cr-count { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; color: var(--side); }
.cr-edit { flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; min-width: 36px; min-height: 36px; padding: 0; border: 1px solid var(--border); background: none; color: var(--text-muted); cursor: pointer; }
.cr-edit:disabled { opacity: 0.45; cursor: default; }
@media (hover: hover) { .cr-edit:not(:disabled):hover { color: var(--accent-ink); border-color: var(--accent); } }
.cr-note { margin: 0 0 0.8rem; line-height: 1.45; }
.cr-stepper { justify-content: center; }
.cr-help { flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; min-width: 36px; min-height: 36px; padding: 0; border: 0; background: none; font-size: 1.35rem; color: var(--text-dim); cursor: pointer; }
@media (hover: hover) { .cr-help:hover { color: var(--accent-ink); } }
</style>
