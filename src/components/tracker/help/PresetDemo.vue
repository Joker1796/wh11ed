<template>
  <!-- Laid out at a phone's width and scaled to the card as a whole: the three cards of a wide
       dialog are ~210px, where the board drops its columns and the strip runs out of room. -->
  <div
    ref="fit"
    class="psd-fit"
  >
    <div
      class="psd side-colored turn-colored"
      :style="{ zoom: scale }"
    >
      <ScoreBoard :game="game" />
      <GameTabs
        class="pd-tabs"
        :tabs="tabs"
        active="missions"
        :pinned="false"
      />
      <TurnBar
        :mode="tracks(values, 'trackPhases') ? 'phased' : 'plain'"
        :who="labels.trackerYou"
        phase="command"
        can-undo
      />
    </div>
  </div>
</template>

<script setup>
// What a preset does to the game screen, drawn rather than photographed (owner, 2026-10-20: the
// pictures stayed light in the dark theme, and every change to the screen needed new ones). The
// three parts a preset changes, as the game draws them: the score board (its CP column), the tab
// strip (which tabs there are) and the bar at the foot (with the phase or without). The missions
// themselves are the same under every preset, and their panel needs a live game, so it is left out.
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import ScoreBoard from '../ScoreBoard.vue'
import GameTabs from '../GameTabs.vue'
import TurnBar from '../TurnBar.vue'
import { tracks } from '../../../data/trackerOptions.js'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'
import { demoGame } from './demos.js'

const props = defineProps({ values: { type: Object, required: true } })
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const game = computed(() => demoGame({ track: props.values }))

const WIDTH = 380 // px — the phone the demo is laid out for
const fit = ref(null)
const scale = ref(1)
let ro = null
onMounted(() => {
  if (typeof ResizeObserver === 'undefined' || !fit.value) return
  ro = new ResizeObserver(([e]) => { scale.value = Math.min(1, e.contentRect.width / WIDTH) || 1 })
  ro.observe(fit.value)
})
onBeforeUnmount(() => ro?.disconnect())
// The strip RoundTracker draws for these settings, in its order.
const tabs = computed(() => {
  const l = labels.value
  const on = (k) => tracks(props.values, k)
  return [
    { id: 'missions', label: l.trackerTabMissions, icon: 'wi wi-missions' },
    ...(on('trackPhaseRules') ? [{ id: 'phase', label: on('trackPhases') ? l.trackerTabPhase : l.trackerTabTurn, icon: 'wi wi-phase' }] : []),
    ...(on('trackCP') ? [{ id: 'cp', label: l.trackerCp, icon: 'wi wi-cp' }] : []),
    { id: 'armies', label: l.trackerTabArmies, icon: 'wi wi-army' },
    ...(on('showLog') ? [{ id: 'log', label: l.trackerTabLog, icon: 'wi wi-log' }] : []),
    ...(on('showStats') ? [{ id: 'stats', label: l.trackerTabStats, icon: 'wi wi-stats' }] : []),
  ]
})
</script>

<style scoped>
.psd-fit { width: 100%; min-width: 0; overflow: hidden; }
.psd { --side: var(--side-you); width: 380px; display: flex; flex-direction: column; gap: 0.5rem; pointer-events: none; }
</style>
