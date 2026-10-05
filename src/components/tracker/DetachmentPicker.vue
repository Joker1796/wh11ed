<template>
  <AdaptivePicker
    v-model:open="open"
    :panel-width="panelWidth"
    :modal-width="modalWidth"
    :align="align"
    :title="labels.trackerDpBudget"
  >
    <template #trigger="t">
      <slot
        name="trigger"
        v-bind="t"
      />
    </template>
    <template #aside>
      <span
        class="mh-count"
        :class="{ over: dpSpent > limit }"
      >{{ dpSpent }} / {{ limit }} DP</span>
    </template>
    <template #default="{ compact, bodyClass }">
      <DetachmentPickerList
        :class="bodyClass"
        :compact="compact"
        :detachments="detachments"
        :selected="selected"
        :max-dp="maxDp"
        :dp-spent="dpSpent"
        :faction-slug="factionSlug"
        @toggle="(d) => $emit('toggle', d)"
        @clear="$emit('clear')"
      />
    </template>
  </AdaptivePicker>
</template>

<script setup>
// Picking an army's detachments under its DP budget — the one picker the roster builder (the
// phone's form and the desk's settings line) and the tracker's game setup all open. A dropdown
// under the trigger from 901px up, the modal below (AdaptivePicker), the same rows in both
// (DetachmentPickerList). Several can be taken, so a pick leaves it open. Until 2026-10-05 the
// builder had a modal of its own for the phone and a dropdown of its own for the desk.
import { computed } from 'vue'
import AdaptivePicker from '../AdaptivePicker.vue'
import DetachmentPickerList from './DetachmentPickerList.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { dpLimitFor } from '../../composables/rosterEngine.js'

const props = defineProps({
  detachments: { type: Array, required: true },
  selected:    { type: Array, required: true },
  maxDp:       { type: Number, required: true },
  dpSpent:     { type: Number, required: true },
  factionSlug: { type: String, default: '' },
  panelWidth:  { type: String, default: '30rem' },
  modalWidth:  { type: String, default: '520px' },
  align:       { type: String, default: 'left' },
})
defineEmits(['toggle', 'clear'])
const open = defineModel('open', { type: Boolean, default: false })

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// The budget the selection is held to: `maxDp` is the battle's, and a lone 3 DP detachment at
// Incursion makes it 3 (core rules 25.04 — rosterEngine's dpLimitFor).
const limit = computed(() => dpLimitFor(props.detachments.filter((d) => props.selected.includes(d.name)), props.maxDp))
</script>
