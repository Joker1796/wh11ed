<template>
  <BaseModal
    :title="labels.trackerDpBudget"
    @close="$emit('close')"
  >
    <template #aside>
      <span
        class="mh-count"
        :class="{ over: dpSpent > maxDp && !overAllowed }"
      >{{ dpSpent }} / {{ maxDp }} DP</span>
    </template>

    <div class="modal-body modal-list">
      <!-- What cannot be taken right now is GONE, not greyed: once the budget is spent that is
           most of the list, and a page of dimmed rows reads as a broken screen rather than as a
           constraint. The count says how many went and why, and Clear brings them all back in one
           tap — which is also the only way out of a full budget. -->
      <div
        v-if="selected.length || hidden"
        class="det-tools"
      >
        <button
          type="button"
          class="btn-ghost det-clear"
          :disabled="!selected.length"
          @click="$emit('clear')"
        >
          {{ labels.detachmentClear }}
        </button>
        <em
          v-if="hidden"
          class="det-hidden"
        >{{ labels.detachmentHidden.replace('{n}', hidden) }}</em>
      </div>
      <DetachmentOption
        v-for="d in offered"
        :key="d.name"
        :name="d.name"
        :force-disposition="d.forceDisposition"
        :unique="d.unique || ''"
        :dp="d.dp"
        :on="selected.includes(d.name)"
        @click="$emit('toggle', d)"
      />
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import DetachmentOption from '../DetachmentOption.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  detachments: { type: Array, required: true },
  selected:    { type: Array, required: true },
  maxDp:       { type: Number, required: true },
  dpSpent:     { type: Number, required: true },
})
defineEmits(['toggle', 'clear', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// A single Detachment is always allowed even over budget (see the toggle-disable rule
// below) — not official yet, but GW has said it's fine as long as it's the only one taken.
// Don't flag that legal case as an error.
const overAllowed = computed(() => props.selected.length === 1 && props.dpSpent > props.maxDp)

// A detachment's TAG bars a second detachment sharing it ("this detachment has the DYNASTY tag and
// cannot be taken with another DYNASTY detachment", core rules 25.04). 26 tags across 17 factions,
// 19 of the pairs affordable inside a 3 DP budget — so without this the illegal pair is two clicks
// away. validateRoster repeats the check for imported lists.
const takenTags = computed(() => new Set(props.detachments
  .filter((d) => props.selected.includes(d.name) && d.unique)
  .map((d) => d.unique.toUpperCase())))
const clashes = (d) => !props.selected.includes(d.name) && !!d.unique && takenTags.value.has(d.unique.toUpperCase())

// Everything a tap could actually do: what is already taken (so it can be given back), and what
// still fits the budget and clashes with nothing. The first detachment is always affordable — you
// may take one whatever it costs — which is what keeps a full list on offer at the start.
const offered = computed(() => props.detachments.filter((d) => props.selected.includes(d.name)
  || (!clashes(d) && (props.selected.length === 0 || props.dpSpent + d.dp <= props.maxDp))))
const hidden = computed(() => props.detachments.length - offered.value.length)

</script>

<style scoped>

/* The row above the list: what to press to start over, and what the list is not showing. */
.det-tools { display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; }
.det-clear { padding: 0.3rem 0.6rem; font-size: 0.8rem; }
.det-hidden { font-size: 0.75rem; font-style: normal; color: var(--text-dim); text-align: right; }
</style>
