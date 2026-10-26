<template>
  <HelpDemoFrame>
    <div class="side-colored">
      <p class="hd-cap">
        {{ labels.trackerDemoPhasesOff }}
      </p>
      <TurnBar
        mode="plain"
        can-undo
      />
      <div class="hd-row">
        <p class="hd-cap">
          {{ labels.trackerDemoPhasesOn }}
        </p>
        <TurnBar
          mode="phased"
          :who="labels.trackerYou"
          :phase="phase"
          can-undo
          :can-prev="at > 0"
          :can-next="at < BATTLE_PHASES.length - 1"
          @step="(d) => (phase = BATTLE_PHASES[at + d])"
        />
      </div>
    </div>
  </HelpDemoFrame>
</template>

<script setup>
// "Track phases": what it changes at the foot of the game screen — the turn bar without the clock
// and with it, the phase between undo and end. The same TurnBar the game draws; the arrows step
// the example's phase.
import { computed, ref } from 'vue'
import HelpDemoFrame from './HelpDemoFrame.vue'
import TurnBar from '../TurnBar.vue'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'
import { BATTLE_PHASES } from '../../../core/rules/stratagemPhases.js'
import { PHASES_DEMO } from './demos.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const phase = ref(PHASES_DEMO.phase)
const at = computed(() => BATTLE_PHASES.indexOf(phase.value))
</script>
