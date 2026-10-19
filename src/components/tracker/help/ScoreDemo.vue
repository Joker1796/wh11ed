<template>
  <HelpDemoFrame>
    <div
      v-for="b in boards"
      :key="b.key"
      class="hd-row side-colored"
      :style="b.style"
    >
      <span class="hd-cap">{{ b.caption }}</span>
      <ScoreBoard :game="b.game" />
    </div>
  </HelpDemoFrame>
</template>

<script setup>
// The score board itself, on one example game: "VP vs BP" shows it both ways (the score-mode help),
// "colours" shows the default sides and a custom pair (the "Customise colours" help).
import { computed } from 'vue'
import HelpDemoFrame from './HelpDemoFrame.vue'
import ScoreBoard from '../ScoreBoard.vue'
import { gameSideColorStyle } from '../../../composables/sideColors.js'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'
import { demoGame } from './demos.js'

const props = defineProps({ kind: { type: String, default: 'score' } }) // 'score' | 'colors'
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const boards = computed(() => {
  const l = labels.value
  const one = (key, caption, game) => ({ key, caption, game, style: gameSideColorStyle(game) })
  return props.kind === 'colors'
    ? [one('std', l.trackerDemoColorsStandard, demoGame()), one('own', l.trackerDemoColorsCustom, demoGame({ sideColors: { you: 'gold', opp: 'purple' } }))]
    : [one('vp', 'VP', demoGame()), one('bp', 'BP', demoGame({ scoreMode: 'bp' }))]
})
</script>
