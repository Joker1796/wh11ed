<template>
  <BaseModal
    :title="labels.trackerDisposition"
    max-width="440px"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <p class="rdm-hint">
        {{ labels.rosterDispositionHint }}
      </p>
      <div
        class="rdm-list"
        role="radiogroup"
      >
        <button
          v-for="d in candidates"
          :key="d"
          type="button"
          role="radio"
          class="rdm-opt tone"
          :class="{ on: pick === d }"
          :aria-checked="pick === d"
          :style="toneVars(dispositionColor(d))"
          @click="pick = d"
        >
          <img
            v-if="iconOf(d)"
            :src="iconOf(d)"
            alt=""
            class="rdm-icon"
          >
          <span class="rdm-text">
            <span class="rdm-name">{{ d }}</span>
            <span
              v-if="sources[d]?.length"
              class="rdm-from"
            >{{ sources[d].join(', ') }}</span>
          </span>
          <span
            v-if="d === declared"
            class="rdm-now"
          >{{ labels.rosterMissionsInList }}</span>
        </button>
      </div>
    </div>

    <footer class="modal-foot">
      <button
        class="btn-ghost"
        @click="$emit('close')"
      >
        {{ labels.rosterCancel }}
      </button>
      <button
        class="btn-primary"
        :disabled="!pick || pick === declared"
        @click="$emit('save', pick)"
      >
        {{ labels.rosterSave }}
      </button>
    </footer>
  </BaseModal>
</template>

<script setup>
// Declaring which Force Disposition a list plays, from its Missions tab. A dialog with its own
// Save rather than a tap that writes at once (owner, 2026-10-02): the tab beside it previews the
// alternatives freely, so the one act that changes the list is made deliberately. Each candidate
// names the detachment that offers it — the reason the list has a choice at all.
import { ref, computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import { DISPOSITIONS } from '../../data/dispositions.js'
import { dispositionColor } from '../../data/dispositionColors.js'
import { toneVars } from '../../utils/tone.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  candidates: { type: Array, required: true },
  declared: { type: String, default: null },
  // disposition name → names of the detachments that offer it
  sources: { type: Object, default: () => ({}) },
  // Where the dialog opens: the one the tab was previewing, so "I like this one" is one tap.
  initial: { type: String, default: null },
})
defineEmits(['close', 'save'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const iconOf = (name) => DISPOSITIONS.find((d) => d.name === name)?.icon || ''

const pick = ref(props.candidates.includes(props.initial) ? props.initial : props.declared)
</script>

<style scoped>
.rdm-hint { margin: 0 0 0.75rem; font-size: 0.86rem; color: var(--text-muted); line-height: 1.5; }
.rdm-list { display: flex; flex-direction: column; gap: 0.4rem; }
.rdm-opt {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 48px;
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--border);
  border-left: 4px solid var(--tone, var(--border));
  background: var(--bg-card); /* not --bg-secondary: the muted detachment line is under 4.5:1 on it */
  color: var(--text-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.rdm-opt.on {
  border-color: var(--tone);
  background: color-mix(in srgb, var(--tone) 14%, var(--bg-card));
}
.rdm-icon { width: 24px; height: 24px; object-fit: contain; flex: none; }
.rdm-text { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.rdm-name { font-weight: 600; }
.rdm-from { font-size: 0.76rem; color: var(--text-muted); }
.rdm-now {
  flex: none;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--tone);
}
/* Cancel and Save share the row evenly, sized for a thumb — the shape ConfirmModal's footer has. */
.modal-foot {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  padding: 0.7rem 0.9rem;
  border-top: 1px solid var(--border);
}
.modal-foot button { min-height: 46px; justify-content: center; }
</style>
