<template>
  <HelpDemoFrame :title="DEMO.unit">
    <div class="hd-row">
      <span class="hd-cap">{{ labels.trackerDemoPrinted }}</span>
      <RosterStatPlates :stats="DEMO.printed" />
    </div>
    <div class="hd-row">
      <span class="hd-cap">{{ labels.trackerDemoInList.replace('{enh}', DEMO.enhancement) }}</span>
      <RosterStatPlates :stats="DEMO.inList" />
    </div>
  </HelpDemoFrame>
</template>

<script setup>
// The "Live modifiers" help, shown rather than told: one unit's plates as its datasheet prints
// them and as this list reads them, the changed one in the accent — the very plates the roster
// draws (RosterStatPlates). A Canoness with Iron Surplice of Saint Istalela (Bringers of Flame):
// Sv 3+ becomes 2+. DEMO is held to the real data by demos.test.js.
import { computed } from 'vue'
import HelpDemoFrame from './HelpDemoFrame.vue'
import RosterStatPlates from '../../roster/RosterStatPlates.vue'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'
import { MODIFIERS_DEMO as DEMO } from './demos.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>
