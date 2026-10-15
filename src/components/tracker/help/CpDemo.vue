<template>
  <HelpDemoFrame>
    <div class="cpd side-colored">
      <CpBank
        :cp="demo.cp"
        :bonus="demo.bonus"
        :name="labels.trackerYou"
        :bonus-title="labels.trackerBonusUndo"
        @bonus="bonus = !bonus"
        @update:cp="(v) => (cp = v)"
      />
      <ul class="cpd-list">
        <StratRow
          v-for="r in rows"
          :key="r.strat._key"
          v-bind="r.props"
          :strat="r.strat"
        />
      </ul>
    </div>
  </HelpDemoFrame>
</template>

<script setup>
// "CP and stratagems": the CP tab as the game screen draws it — the side's bank line (the round's
// bonus point, the balance) and stratagem rows in their three states: to play, used this round,
// not affordable. The same components (CpBank, StratRow) with example values; the bank answers a
// tap here, a row does not.
import { computed, ref, watch } from 'vue'
import HelpDemoFrame from './HelpDemoFrame.vue'
import CpBank from '../CpBank.vue'
import StratRow from '../StratRow.vue'
import { ui } from '../../../i18n/ui.js'
import { useLocale } from '../../../composables/useLocale.js'
import { loadCoreStratagems } from '../../../composables/gameStratagems.js'
import { CP_DEMO } from './demos.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const cp = ref(CP_DEMO.cp)
const bonus = ref(CP_DEMO.bonus)
const demo = computed(() => ({ cp: cp.value, bonus: bonus.value }))

const core = ref([])
watch(locale, async (loc) => {
  const list = await loadCoreStratagems(loc)
  if (loc === locale.value) core.value = list
}, { immediate: true })

const rows = computed(() => CP_DEMO.rows.map((r) => {
  const strat = core.value.find((s) => s._enName === r.name)
  if (!strat) return null
  const why = r.block ? labels.value[`trackerStratBlock_${r.block}`] : ''
  return {
    strat,
    props: {
      cost: strat._cost,
      used: r.used || 0,
      undoable: !!r.undoable,
      reason: r.block && r.block !== 'cp' ? why : '',
      title: why,
      locked: !!r.block || strat._cost > cp.value,
    },
  }
}).filter(Boolean))
</script>

<style scoped>
/* The CP tab's own colours: the side's colour as the accent (CpStratagems' .cps). */
.cpd { --side: var(--side-you); --accent: var(--side); --accent-ink: var(--side); }
.cpd-list { display: grid; gap: 0.3rem; margin: 0.2rem 0 0; padding: 0; list-style: none; }
</style>
