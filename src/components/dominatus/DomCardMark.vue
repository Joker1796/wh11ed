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
    <i
      v-if="phase"
      class="wi dmark-phase"
      :class="`wi-dom-phase-${phase}`"
      :title="phaseLabel(phase)"
    />
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
// belongs to (its numeral in the card's frame) and the Alliance whose card it is. Decoration — the tag line in the
// card's head says the same in words, so all of it is hidden from a screen reader.
import { useDominatus } from './useDominatus.js'

defineProps({
  kind: { type: String, required: true }, // agenda | briefing | honour | skill | relic | location
  phase: { type: Number, default: 0 },
  alliance: { type: String, default: '' },
})
const { kindName, phaseLabel, allianceName } = useDominatus()
</script>
