<!-- A saved list's Stratagems tab: the stratagems of its own detachments, as the Stratagems page
     shows them — the same toolbar and phase groups (StratFilterBar, StratPhaseGroups), and no
     deck row, since there is nothing to filter between. In a live game that keeps a clock the
     toolbar also offers "usable now". -->
<template>
  <div
    ref="rootEl"
    class="rv-strats"
  >
    <p
      v-if="detachments && !detachments.length"
      class="empty-note"
    >
      {{ labels.rosterViewNoDetachment }}
    </p>
    <template v-else-if="detachments">
      <StratFilterBar
        ref="barEl"
        v-model:by-phase="byPhase"
        v-model:now-only="nowOnly"
        :now-available="!!gameSlot"
      />

      <Transition name="fade">
        <p
          v-if="nowOnly && !visible.length"
          class="empty-note"
        >
          {{ labels.stratNowEmpty }}
        </p>
      </Transition>

      <!-- Grouping by phase while filtering TO one phase would be one group with everything in
           it, so "usable now" shows the flat list. -->
      <StratPhaseGroups
        v-if="byPhase && !nowOnly"
        v-model:open="openPhases"
        :groups="phaseGroups"
      >
        <template #default="{ group }">
          <div class="strat-grid">
            <StratCard
              v-for="s in group.strats"
              :key="stratKey(s)"
              :strat="s"
              :sublabel="s.sublabel"
            />
          </div>
        </template>
      </StratPhaseGroups>

      <div
        v-else-if="visible.length"
        class="strat-grid"
      >
        <StratCard
          v-for="s in visible"
          :key="stratKey(s)"
          :strat="s"
          :sublabel="s.sublabel"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import StratCard from '../StratCard.vue'
import StratFilterBar from '../StratFilterBar.vue'
import StratPhaseGroups from '../StratPhaseGroups.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { groupByPhase, usableInSlot } from '../../core/rules/stratagemPhases.js'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { useSwapFade } from '../../composables/useSwapFade.js'

// `detachments` — the list's own, each carrying its stratagems (every card's sublabel already says
// which detachment it is from, so no grouping by detachment on top), null while the faction's rules
// are still loading; `gameSlot` — the phase and whose turn a live game stands on, or null off the
// table, in a finished game and in a game not keeping phases.
const props = defineProps({
  detachments: { type: Array, default: null },
  gameSlot: { type: Object, default: null },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const all = computed(() => (props.detachments || []).flatMap((det) => det.stratagems || []))

const nowOnly = ref(false)
// The filter can only be on while there is a slot: leaving the game (or the round bar losing the
// setting) must not leave the list silently filtered by a phase nobody is in.
watch(() => props.gameSlot, (slot) => { if (!slot) nowOnly.value = false })

const visible = computed(() => {
  const slot = props.gameSlot
  if (!nowOnly.value || !slot) return all.value
  return all.value.filter((s) => usableInSlot(s._phases, s._sides, slot.phase, slot.mine))
})

// The view preference is the Stratagems page's own (same storage key), so it is one setting, not
// one to learn twice.
const VIEW_KEY = 'wh11ed-stratagems-by-phase'
const byPhase = ref(getItem(VIEW_KEY) === '1')
watch(byPhase, (on) => setItem(VIEW_KEY, on ? '1' : '0'))
// Switching the view or "usable now" changes the list's length under a reader scrolled down it: the
// page holds its height and glides the toolbar back under the header (useSwapFade, owner 2026-10-20).
const barEl = ref(null)
const rootEl = ref(null)
useSwapFade(() => `${byPhase.value}|${nowOnly.value}`, () => [...(rootEl.value?.children || [])].slice(1), { strip: () => barEl.value })
const openPhases = ref(new Set())
const phaseGroups = computed(() => groupByPhase(visible.value))

function stratKey(strat) {
  return strat.num || `${strat.sublabel || ''}|${strat.name}`
}
</script>
