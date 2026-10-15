<template>
  <div
    class="tabs layout-tabs"
    :class="{ letters }"
  >
    <button
      v-for="l in layouts"
      :key="l.id"
      class="tab"
      :class="{ active: selected === l.id }"
      @click="$emit('select', l.id)"
    >
      <span class="tab-word">{{ labels.eventLayout }}</span> {{ l.id }}
    </button>
    <button
      v-if="custom"
      class="tab"
      :class="{ active: selected === 'custom' }"
      @click="$emit('custom')"
    >
      {{ labels.trackerLayoutCustom }}
    </button>
    <!-- Whatever else picks a layout rides at the end of the row (Combat Patrol's D6 roll). -->
    <slot />
  </div>
</template>

<script setup>
// The layout tabs of a game's setup (A / B / C / custom): the wizard's step 3 draws them in two
// places — beside the picture on a phone, in the side column on a desktop — and the edit dialog
// of a game under way draws them once more. The choice behind them is trackerLayout.js's
// useSetupLayout.
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({
  layouts: { type: Array, required: true },
  selected: { type: String, default: null },
  // Combat Patrol plays only its own three maps: no "custom" tab.
  custom: { type: Boolean, default: true },
  // The letter alone at every width, on a square — so a row with something after it (Combat
  // Patrol's D6 roll) stays one row in the desk's narrow side column too.
  letters: { type: Boolean, default: false },
})
defineEmits(['select', 'custom'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
/* Four tabs in a narrow side column go to two rows rather than out of the card. */
.layout-tabs { flex-wrap: wrap; }
/* On a phone the word goes and the letter stays, on a tappable square (the rule GameSetup
   carried for these tabs before they moved here). */
@media (max-width: 700px) {
  .tab-word { display: none; }
  .tab { min-width: 44px; min-height: 44px; }
}
.letters .tab-word { display: none; }
.letters .tab { min-width: 44px; min-height: 44px; }
/* The narrowest side column (see CpLayoutRoll): 40px squares, so the roll still fits beside them. */
@media (min-width: 701px) and (max-width: 789px) {
  .letters .tab { min-width: 40px; padding-inline: 0; }
}
</style>
