<template>
  <article class="dcard dom-deck-briefing camp-outcome">
    <header class="dcard-head">
      <span class="dcard-tag">{{ allianceName(alliance) }} · {{ labels.domOutcome }}</span>
      <h3 class="dcard-name">
        {{ phaseLabel(phase) }}
      </h3>
    </header>
    <p class="camp-outcome-np">
      {{ labels[`domNarrative${np}`] || np }}
    </p>
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
const { deck, labels, allianceName, phaseLabel } = useCampaignView()
const text = computed(() => {
  const b = deck.value?.briefings.find((x) => x.alliance === props.alliance && x.phase === props.phase)
  return b?.outcomes?.[props.np] || ''
})
</script>

<style scoped>
.camp-outcome-np { margin: 0.2rem 0 0.4rem; font-family: var(--font-num); font-size: 0.85rem; color: var(--text-muted); }
</style>
