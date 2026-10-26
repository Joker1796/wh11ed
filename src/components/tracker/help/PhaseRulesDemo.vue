<template>
  <HelpDemoFrame bare>
    <DemoTabs active="phase">
      <PhaseRules
        v-if="sides"
        :example="sides"
        :side="0"
      />
    </DemoTabs>
  </HelpDemoFrame>
</template>

<script setup>
// "Phase rules": the Phase tab for one army — the turn as folds, one per phase, each with the
// abilities that fire in it at their step. PhaseRules itself, handed an example turn built from
// the index it reads in a game (phaseIndex.js), so the names are the game's own.
import { computed, ref } from 'vue'
import HelpDemoFrame from './HelpDemoFrame.vue'
import DemoTabs from './DemoTabs.vue'
import PhaseRules from '../PhaseRules.vue'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'
import { BATTLE_PHASES, phaseLabel } from '../../../core/rules/stratagemPhases.js'
import { PHASE_STEPS, stepOfMoment } from '../../../composables/usePhaseRules.js'
import { PHASE_RULES_DEMO } from './demos.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const index = ref(null)
import('../../../data/phaseIndex.js').then((m) => { index.value = m.phaseIndex[PHASE_RULES_DEMO.faction] })

const stepLabel = (st) => labels.value[`trackerStep${st.replace(/(^|-)(\w)/g, (_, _d, c) => c.toUpperCase())}`]
const sides = computed(() => {
  if (!index.value) return null
  const L = labels.value
  // Only the phases the example has a rule in: a help is short (owner), and the empty folds say
  // nothing the full tab would not.
  const shown = BATTLE_PHASES.filter((ph) => PHASE_RULES_DEMO.rows.some(([p]) => p === ph))
  const turn = shown.map((ph) => ({
    key: ph,
    title: phaseLabel(ph, L),
    steps: PHASE_STEPS[ph].map((st) => ({
      id: `${ph}|${st}`,
      label: stepLabel(st),
      rows: PHASE_RULES_DEMO.rows
        .filter(([p, u, k]) => p === ph && stepOfMoment(index.value.units[u].a[k].m?.[ph] || 'during', ph) === st)
        .map(([, u, k]) => {
          const unit = index.value.units[u]
          const a = unit.a[k]
          return { key: `${u}|${k}`, kind: 'unit', name: (locale.value === 'ru' && a.ru) || a.n, sub: unit.n, units: true }
        }),
    })),
  }))
  return [{ pi: 0, name: L.trackerYou, you: true, turn }]
})
</script>
