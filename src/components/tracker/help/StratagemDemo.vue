<template>
  <HelpDemoFrame>
    <StratCard
      v-if="strat"
      :strat="strat"
    />
  </HelpDemoFrame>
</template>

<script setup>
// "CP and stratagems": a stratagem card as the CP tab draws them — a core one (the faction ones need
// a list). Loaded the way the game screen loads the core deck (gameStratagems.js).
import { ref, watch } from 'vue'
import HelpDemoFrame from './HelpDemoFrame.vue'
import StratCard from '../../StratCard.vue'
import { useLocale } from '../../../composables/useLocale.js'
import { loadCoreStratagems } from '../../../composables/gameStratagems.js'
import { STRATAGEM_DEMO } from './demos.js'

const { locale } = useLocale()
const strat = ref(null)
watch(locale, async (loc) => {
  const core = await loadCoreStratagems(loc)
  const en = await loadCoreStratagems('en')
  const i = en.findIndex((s) => s.name === STRATAGEM_DEMO)
  if (loc === locale.value) strat.value = core[i] || null
}, { immediate: true })
</script>
