<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.stratagemsHeading }}</h1>
    </div>

    <div class="strat-grid">
      <StratCard v-for="strat in stratagems" :key="strat.num" :strat="strat" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import StratCard from '../components/StratCard.vue'
import { battlefields } from '../data/battlefields.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useBilingualSections } from '../composables/useBilingualMerge.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Reuse the same EN/RU stratagem merge as BattlefieldsView, then pull just section 15's
// cards — this page is a stripped-down, game-time quick reference (cards only, no prose).
const sections = useBilingualSections(battlefields, (section, ruSection) =>
  section.stratagems && ruSection.stratagems
    ? { stratagems: section.stratagems.map((strat, k) => ({ ...strat, ...ruSection.stratagems[k] })) }
    : {}
)

const stratagems = computed(() => sections.value.find((s) => s.id === '15')?.stratagems || [])
</script>

<style scoped>
.strat-grid {
  column-count: 2;
  column-gap: 1rem;
}

.strat-grid > * {
  break-inside: avoid;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .strat-grid {
    column-count: 1;
  }
}
</style>
