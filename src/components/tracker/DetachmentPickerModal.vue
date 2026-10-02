<template>
  <BaseModal
    :title="labels.trackerDpBudget"
    @close="$emit('close')"
  >
    <template #aside>
      <span
        class="mh-count"
        :class="{ over: dpSpent > limit }"
      >{{ dpSpent }} / {{ limit }} DP</span>
    </template>

    <DetachmentPickerList
      class="modal-body"
      :detachments="detachments"
      :selected="selected"
      :max-dp="maxDp"
      :dp-spent="dpSpent"
      @toggle="(d) => $emit('toggle', d)"
      @clear="$emit('clear')"
    />
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import DetachmentPickerList from './DetachmentPickerList.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { dpLimitFor } from '../../composables/rosterEngine.js'

const props = defineProps({
  detachments: { type: Array, required: true },
  selected:    { type: Array, required: true },
  maxDp:       { type: Number, required: true },
  dpSpent:     { type: Number, required: true },
})
defineEmits(['toggle', 'clear', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// The budget the selection is held to: `maxDp` is the battle's, and a lone 3 DP detachment at
// Incursion makes it 3 (core rules 25.04 — rosterEngine's dpLimitFor).
const limit = computed(() => dpLimitFor(props.detachments.filter((d) => props.selected.includes(d.name)), props.maxDp))

</script>
