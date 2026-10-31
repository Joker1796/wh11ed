<template>
  <div
    class="dmark"
    aria-hidden="true"
  >
    <i
      class="wi dmark-kind"
      :class="`wi-dom-${kind}`"
      :title="kindName(kind)"
    />
    <span
      v-if="phase"
      class="dmark-phase"
      :title="phaseLabel(phase)"
    >{{ ROMAN[phase - 1] }}</span>
    <i
      v-if="alliance"
      class="wi dmark-ally"
      :class="`wi-dom-${alliance}`"
      :title="allianceName(alliance)"
    />
  </div>
</template>

<script setup>
// The marks a Dominatus card prints in its corner: what kind of card it is, the campaign phase it
// belongs to (a boxed numeral) and the Alliance whose card it is. Decoration — the tag line in the
// card's head says the same in words, so all of it is hidden from a screen reader.
import { useDominatus } from './useDominatus.js'

defineProps({
  kind: { type: String, required: true }, // agenda | briefing | honour | skill | relic | location
  phase: { type: Number, default: 0 },
  alliance: { type: String, default: '' },
})
const ROMAN = ['I', 'II', 'III']
const { kindName, phaseLabel, allianceName } = useDominatus()
</script>
