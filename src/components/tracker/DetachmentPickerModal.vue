<template>
  <BaseModal @close="$emit('close')">
    <template #header>
      <header class="modal-head">
        <h3 class="mh-title">{{ labels.trackerDpBudget }}</h3>
        <div class="mh-right">
          <em class="dp-modal-count" :class="{ over: dpSpent > maxDp && !overAllowed }">{{ dpSpent }} / {{ maxDp }} DP</em>
          <button class="mh-close" @click="$emit('close')" :aria-label="labels.modalClose">✕</button>
        </div>
      </header>
    </template>

    <div class="modal-body modal-list">
      <!-- What cannot be taken right now is GONE, not greyed: once the budget is spent that is
           most of the list, and a page of dimmed rows reads as a broken screen rather than as a
           constraint. The count says how many went and why, and Clear brings them all back in one
           tap — which is also the only way out of a full budget. -->
      <div v-if="selected.length || hidden" class="det-tools">
        <button type="button" class="btn-ghost det-clear" :disabled="!selected.length" @click="$emit('clear')">
          {{ labels.detachmentClear }}
        </button>
        <em v-if="hidden" class="det-hidden">{{ labels.detachmentHidden.replace('{n}', hidden) }}</em>
      </div>
      <button
        v-for="d in offered"
        :key="d.name"
        class="det"
        :class="{ on: selected.includes(d.name) }"
        @click="$emit('toggle', d)"
      >
        <span class="det-name">{{ d.name }}</span>
        <span class="det-meta">{{ d.dp }}DP · {{ d.forceDisposition }}<template v-if="d.unique"> · {{ d.unique }}</template></span>
      </button>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
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
.dp-modal-count {
  font-size: 0.82rem;
  font-family: var(--font-mono);
  color: var(--text-muted);
  font-style: normal;
}
.dp-modal-count.over { color: #c0392b; }
[data-theme='dark'] .dp-modal-count.over { color: #ef6e60; }

.det {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
  text-align: left;
  padding: 0.4rem 0.55rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
  width: 100%;
}
.det:hover { border-color: var(--accent); }
.det.on { background: color-mix(in srgb, var(--accent) 16%, transparent); border-color: var(--accent); }

/* The row above the list: what to press to start over, and what the list is not showing. */
.det-tools { display: flex; align-items: center; justify-content: space-between; gap: 0.6rem; }
.det-clear { padding: 0.3rem 0.6rem; font-size: 0.8rem; }
.det-hidden { font-size: 0.75rem; font-style: normal; color: var(--text-dim); text-align: right; }
.det-name { font-size: 0.85rem; font-weight: 600; color: var(--text-primary); }
.det-meta { font-size: 0.7rem; color: var(--text-dim); font-family: var(--font-mono); }
</style>
