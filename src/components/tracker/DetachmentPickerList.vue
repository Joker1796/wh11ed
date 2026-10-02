<template>
  <div class="modal-list">
    <!-- What cannot be taken right now is GONE, not greyed: once the budget is spent that is
         most of the list, and a page of dimmed rows reads as a broken screen rather than as a
         constraint. The count says how many went and why, and Clear brings them all back in one
         tap — which is also the only way out of a full budget. -->
    <div
      v-if="selected.length || hidden"
      class="det-tools"
      :class="{ compact }"
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
      :force-dispositions="d.forceDispositions || []"
      :unique="d.unique || ''"
      :dp="d.dp"
      :on="selected.includes(d.name)"
      :compact="compact"
      @click="$emit('toggle', d)"
    />
  </div>
</template>

<script setup>
// The detachments a DP budget still allows, without the frame around them — the modal (phones, the
// tracker) and the desk's dropdown (RosterSettingsBar) draw the same rows, the same "what is hidden
// and why" line and the same way back.
import { computed } from 'vue'
import DetachmentOption from '../DetachmentOption.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  detachments: { type: Array, required: true },
  selected:    { type: Array, required: true },
  maxDp:       { type: Number, required: true },
  dpSpent:     { type: Number, required: true },
  // The desk's dropdown: one-line rows and a quiet tools line (DetachmentOption's `compact`).
  compact:     { type: Boolean, default: false },
})
defineEmits(['toggle', 'clear'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])


// A detachment's TAG bars a second detachment sharing it ("this detachment has the DYNASTY tag and
// cannot be taken with another DYNASTY detachment", core rules 25.04). 26 tags across 17 factions,
// 19 of the pairs affordable inside a 3 DP budget — so without this the illegal pair is two clicks
// away. validateRoster repeats the check for imported lists.
const takenTags = computed(() => new Set(props.detachments
  .filter((d) => props.selected.includes(d.name) && d.unique)
  .map((d) => d.unique.toUpperCase())))
const clashes = (d) => !props.selected.includes(d.name) && !!d.unique && takenTags.value.has(d.unique.toUpperCase())

// Everything a tap could actually do: what is already taken (so it can be given back), and what
// still fits the budget and clashes with nothing. The first detachment is always affordable — no
// detachment costs more than the 3 DP a lone one may (25.04) — which keeps a full list on offer at
// the start. A second is judged against the battle's own budget: beside another, the exception is gone.
const offered = computed(() => props.detachments.filter((d) => props.selected.includes(d.name)
  || (!clashes(d) && (props.selected.length === 0 || props.dpSpent + d.dp <= props.maxDp))))
const hidden = computed(() => props.detachments.length - offered.value.length)

</script>

<style scoped>

/* The row above the list: what to press to start over, and what the list is not showing. */
.det-tools { display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; }
.det-clear { padding: 0.3rem 0.6rem; font-size: 0.8rem; }
.det-hidden { font-size: 0.75rem; font-style: normal; color: var(--text-dim); text-align: right; }
.det-tools.compact .det-clear { padding: 0.15rem 0.45rem; font-size: 0.75rem; white-space: nowrap; }
.det-tools.compact .det-hidden { font-size: 0.7rem; line-height: 1.25; }
</style>
