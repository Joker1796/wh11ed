<template>
  <article class="dcard dom-deck-briefing camp-outcome">
    <header class="camp-outcome-head">
      <i
        class="wi camp-outcome-emblem"
        :class="`wi-dom-${alliance}`"
        aria-hidden="true"
      />
      <h3 class="dcard-name">
        {{ allianceName(alliance) }}
      </h3>
      <p class="camp-outcome-np">
        {{ labels[`domNarrative${np}`] || np }}
      </p>
    </header>
    <p
      v-if="text"
      class="dcard-lore lines"
    >
      {{ text }}
    </p>
  </article>
</template>

<script setup>
// An Alliance's Outcome of a phase: the reverse of its Briefing card, read at the phase's end (the
// booklet's step 4), picked by the Narrative Points the Alliance earned. It is the Briefing card's
// other side, so it wears that deck's spine and its lore stays when lore is hidden.
import { computed } from 'vue'
import { useCampaignView } from './useCampaignView.js'

const props = defineProps({
  alliance: { type: String, required: true },
  phase: { type: Number, required: true },
  np: { type: Number, required: true },
})
const { deck, labels, allianceName } = useCampaignView()
const text = computed(() => {
  const b = deck.value?.briefings.find((x) => x.alliance === props.alliance && x.phase === props.phase)
  return b?.outcomes?.[props.np] || ''
})
</script>

<style scoped>
.camp-outcome { display: grid; gap: 0.75rem; }
.camp-outcome-head { display: grid; grid-template-columns: auto minmax(0, 1fr); align-items: center; gap: 0.2rem 0.85rem; }
.camp-outcome-emblem { grid-row: 1 / 3; width: 2.6rem; height: 2.6rem; margin: 0; color: var(--text-primary); }
.camp-outcome .dcard-lore { margin: 0; padding-left: 0; border-left: none; }
.camp-outcome-np { margin: 0; font-family: var(--font-mono); font-size: 1rem; color: var(--text-muted); }
@media (min-width: 768px) {
  .camp-outcome-head { grid-template-columns: auto minmax(0, 1fr) auto; }
  .camp-outcome-emblem { grid-row: auto; }
}
</style>
