<template>
  <div class="view">
    <!-- Without a game the toolbar is the phase toggle alone: it sits opposite the title rather
         than taking a line of its own (owner, 2026-10-08). -->
    <div class="view-hero strat-hero">
      <h1>{{ labels.stratagemsHeading }}</h1>
      <StratFilterBar
        v-if="!hasGame"
        ref="barEl"
        v-model:by-phase="byPhase"
        class="strat-hero-bar"
      />
    </div>

    <!-- Detachment filters only while a game is in progress: without one this page stays the
         plain core-stratagem quick reference. Shared with the tracker's CP tab. -->
    <StratFilterBar
      v-if="hasGame"
      ref="barEl"
      v-model:filter="filter"
      v-model:by-phase="byPhase"
      :filters="filters"
    />

    <Transition name="fade">
      <p
        v-if="!visibleStratagems.length"
        class="strat-empty"
      >
        {{ labels.stratNoneForFilter }}
      </p>
    </Transition>

    <!-- Phase view: one accordion per phase, stratagems for that phase inside. The empty note
         above is its own condition (not the head of this chain) so it can fade on its own. -->
    <StratPhaseGroups
      v-if="visibleStratagems.length && byPhase"
      v-model:open="openPhases"
      :groups="phaseGroups"
    >
      <template #default="{ group }">
        <div class="strat-grid">
          <StratCard
            v-for="strat in group.strats"
            :key="stratKey(strat)"
            :strat="strat"
            :sublabel="sublabelOf(strat)"
          />
        </div>
      </template>
    </StratPhaseGroups>

    <!-- Flat list -->
    <div
      v-else-if="visibleStratagems.length"
      class="strat-grid"
    >
      <StratCard
        v-for="strat in visibleStratagems"
        :key="stratKey(strat)"
        :strat="strat"
        :sublabel="sublabelOf(strat)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import StratCard from '../components/StratCard.vue'
import StratFilterBar from '../components/StratFilterBar.vue'
import StratPhaseGroups from '../components/StratPhaseGroups.vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useTracker } from '../composables/useTracker.js'
import { loadCoreStratagems, loadSideStratagems, sideSignature } from '../composables/gameStratagems.js'
import { PHASE_ORDER, groupByPhase } from '../composables/stratagemPhases.js'
import { getItem, setItem } from '../composables/safeStorage.js'
import { hold, settle } from '../composables/settleScroll.js'
import { stripOffset } from '../composables/bringTabsIntoView.js'
import { motionMs } from '../composables/motionToken.js'

const route = useRoute()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const { current } = useTracker()
const hasGame = computed(() => current.value?.phase === 'playing')
const you = computed(() => current.value?.players?.find((p) => p.isYou) || null)
const opp = computed(() => current.value?.players?.find((p) => !p.isYou) || null)

// Core stratagems and each side's detachment deck (gameStratagems.js — shared with the game
// screen's CP tab). The faction data is imported dynamically, per side, only while a game is on.
const coreStrats = ref([])
watch(locale, async (loc) => {
  const core = await loadCoreStratagems(loc)
  if (loc === locale.value) coreStrats.value = core
}, { immediate: true })
const youStrats = ref([])
const oppStrats = ref([])

let loadToken = 0
async function loadStrats() {
  if (!hasGame.value) {
    youStrats.value = []
    oppStrats.value = []
    return
  }
  const token = ++loadToken
  const loc = locale.value
  const combatPatrol = !!current.value?.settings?.combatPatrol
  const [y, o] = await Promise.all([
    loadSideStratagems(you.value, loc, { combatPatrol }),
    loadSideStratagems(opp.value, loc, { combatPatrol }),
  ])
  if (token !== loadToken) return // a newer load superseded this one
  youStrats.value = y
  oppStrats.value = o
}

watch(
  [hasGame, locale, () => sideSignature(you.value), () => sideSignature(opp.value)],
  loadStrats,
  { immediate: true },
)

// Mid-game the useful question is "what can anyone play right now", not "whose deck am I in" —
// so All is the default while a game is on, and the three narrower tabs are there for when you
// do want one deck. Without a game there is nothing to combine and the page stays core-only.
const filter = ref(hasGame.value ? 'all' : 'core')
// A game ending strands the combined view (its two thirds are gone), and a game starting is the
// moment All becomes the useful default.
watch(hasGame, (on) => { filter.value = on ? 'all' : 'core' })

const filters = computed(() => {
  if (!hasGame.value) return []
  return [
    { key: 'all', label: labels.value.stratFilterAll },
    { key: 'core', label: labels.value.stratFilterCore },
    { key: 'you', label: labels.value.stratFilterYou },
    { key: 'opp', label: labels.value.stratFilterOpp },
  ]
})

// In the combined list a card has to say whose it is: two players can field the SAME detachment
// (a mirror match), and then the two copies are identical down to the sublabel. `_owner` answers
// that, and keeps their keys apart.
const owned = (strats, key) => strats.map((s) => ({ ...s, _owner: key }))
const allStrats = computed(() => [
  ...coreStrats.value,
  ...owned(youStrats.value, 'you'),
  ...owned(oppStrats.value, 'opp'),
])

const visibleStratagems = computed(() => {
  if (!hasGame.value) return coreStrats.value
  if (filter.value === 'all') return allStrats.value
  if (filter.value === 'you') return youStrats.value
  if (filter.value === 'opp') return oppStrats.value
  return coreStrats.value
})

// The player's own name where they gave one, else the tab's word for them.
function ownerName(key) {
  const pl = key === 'you' ? you.value : opp.value
  return pl?.name || (key === 'you' ? labels.value.stratFilterYou : labels.value.stratFilterOpp)
}

// A detachment stratagem carries its own sublabel ("Gladius Task Force – Battle Tactic
// Stratagem"); a core one carries none and StratCard falls back to "CORE STRATAGEM". Passing it
// at all is the fix for every detachment card on this page having claimed to be a core one.
function sublabelOf(strat) {
  if (!strat.sublabel) return null
  return strat._owner ? `${ownerName(strat._owner)} · ${strat.sublabel}` : strat.sublabel
}

function stratKey(strat) {
  return `${strat._owner || ''}|${strat.num || `${strat.sublabel || ''}|${strat.name}`}`
}

// Group-by-phase view: a toggle swaps the flat grid for one accordion per phase.
// Accordions start collapsed — the user expands whichever phase they need. The chosen
// view mode is remembered across visits.
const VIEW_KEY = 'wh11ed-stratagems-by-phase'
// …unless the link that brought the reader here named a phase (`?phase=shooting`, from the
// tracker's phase reminder): that is a request to see THAT phase, open. Both are read here, into
// the refs' INITIAL values, rather than assigned afterwards — going through the toggle would fire
// the watcher below and persist a view mode the reader never chose. `route` is optional-chained:
// the page renders fine mounted without a router, and a missing query is not a reason to fail.
const wantedPhase = PHASE_ORDER.includes(String(route?.query?.phase)) ? String(route.query.phase) : null
const byPhase = ref(wantedPhase ? true : getItem(VIEW_KEY) === '1')
watch(byPhase, (on) => setItem(VIEW_KEY, on ? '1' : '0'))

// A filter or the phase view can shorten the page under the reader (the phases fold to their
// heads): the page glides to the new list's start, filters just under the header, instead of the
// browser clamping it in one frame (owner, 2026-10-08; settleScroll.js).
const barEl = ref(null)
watch([filter, byPhase], hold)
watch([filter, byPhase], () => settle(motionMs('--motion-swap'), stripOffset(barEl.value?.$el)), { flush: 'post' })
const openPhases = ref(new Set(wantedPhase ? [wantedPhase] : []))

const phaseGroups = computed(() => groupByPhase(visibleStratagems.value))
</script>

<style scoped>
/* A reference page read on a phone: the hero takes a line, not a screen's sixth (owner, 2026-10-08). */
.strat-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 0 0.6rem;
  margin-bottom: 0.9rem;
}
.strat-hero h1 { margin-bottom: 0; }
.strat-hero .strat-hero-bar { margin-bottom: 0; }
.strat-empty {
  color: var(--text-muted);
  font-style: italic;
  padding: 1.5rem 0;
  text-align: center;
}
</style>
