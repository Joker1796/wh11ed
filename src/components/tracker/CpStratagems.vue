<template>
  <section
    ref="cpsEl"
    class="cps"
    :class="{ opp: !isYouSide(current.players[side], side) }"
  >
    <!-- Whose CP the stratagems spend: the app's own page tabs (owner, 2026-09-29), the same two
         tabs as the missions panel's — names alone, so switching between the panels moves nothing;
         the balance is on the bank line under them. Both sides may play one at any moment — half the core stratagems are played
         in the other player's turn — so this is a choice, set by default to whose turn it is (this
         phone's own side in a shared game). The whole block wears the chosen side's colour, so
         the list below says whose it is; the chosen side's bank is one line under the tabs
         (RoundTracker's #bank slot). -->
    <PageTabs
      class="cps-tabs"
      fill
      :tabs="sideTabs"
      @select="(i) => (side = i)"
    />
    <slot
      name="bank"
      :side="side"
    />
    <!-- Not this side's turn: what is on offer is what it can play in the other's (the rest is
         greyed with why — stratBlock). -->
    <p
      v-if="!sideOnTurn"
      class="cps-oppturn"
    >
      <i
        class="bi bi-hourglass-split"
        aria-hidden="true"
      /> {{ labels.trackerStratOppTurn.replace('{name}', names[turnIdx]) }}
    </p>
    <p
      v-if="!canEdit(side)"
      class="cps-note"
    >
      {{ labels.trackerStratOtherPhone }}
    </p>

    <!-- The same toolbar as the Stratagems page: which deck, and the list flat or grouped by
         phase. Grouped, the phase the clock stands on (when the game keeps one) comes first,
         open and marked "now". -->
    <StratFilterBar
      v-model:filter="deck"
      v-model:by-phase="byPhase"
      :filters="deckFilters"
    />

    <p
      v-if="loading && deck !== 'core'"
      class="cps-empty"
    >
      {{ labels.trackerStratLoading }}
    </p>

    <StratPhaseGroups
      v-if="byPhase"
      v-model:open="openPhases"
      :groups="groups"
      :now="phasesOn ? 'now' : null"
    >
      <template #default="{ group }">
        <ul class="cps-list">
          <StratRow
            v-for="s in group.strats"
            :key="s._key"
            :strat="s"
            :tag="deck === 'all' && isCore(s) ? labels.trackerStratCoreTag : ''"
            v-bind="rowProps(s)"
            @open="openStrat = s"
            @use="use(s)"
            @undo="undoStratagem(side, s._key)"
          />
        </ul>
      </template>
    </StratPhaseGroups>

    <template v-else>
      <template v-if="deck !== 'core'">
        <h4 class="cps-title">
          {{ labels.trackerStratArmy }} · {{ names[side] }}
        </h4>
        <p
          v-if="!loading && !armyAll.length"
          class="cps-empty"
        >
          {{ labels.trackerStratNoArmy }}
        </p>
        <ul
          v-else
          class="cps-list"
        >
          <StratRow
            v-for="s in armyAll"
            :key="s._key"
            :strat="s"
            v-bind="rowProps(s)"
            @open="openStrat = s"
            @use="use(s)"
            @undo="undoStratagem(side, s._key)"
          />
        </ul>
      </template>
      <template v-if="deck !== 'army'">
        <h4 class="cps-title">
          {{ labels.trackerStratCore }}
        </h4>
        <p class="cps-hint">
          {{ labels.trackerStratCoreNote }}
        </p>
        <ul class="cps-list">
          <StratRow
            v-for="s in core"
            :key="s._key"
            :strat="s"
            v-bind="rowProps(s)"
            @open="openStrat = s"
            @use="use(s)"
            @undo="undoStratagem(side, s._key)"
          />
        </ul>
      </template>
    </template>

    <!-- The full card. -->
    <BaseModal
      v-if="openStrat"
      :title="openStrat.name"
      :subtitle="`${openStrat._cost}CP`"
      max-width="520px"
      @close="openStrat = null"
    >
      <div class="modal-body">
        <StratCard
          :strat="openStrat"
          :sublabel="openStrat.sublabel || null"
        />
      </div>
    </BaseModal>

    <!-- Playing one (StratPlayModal): the unit it is played on, when it is aimed at one and a
         list is attached, then whether a rule changed its cost this time — asked every time, for
         this use only (owner, 2026-09-30). -->
    <StratPlayModal
      v-if="playing"
      :strat="playing.strat"
      :pi="playing.pi"
      :targets="playing.targets"
      @close="playing = null"
    />
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BaseModal from '../BaseModal.vue'
import StratCard from '../StratCard.vue'
import StratPlayModal from './StratPlayModal.vue'
import StratRow from './StratRow.vue'
import PageTabs from '../PageTabs.vue'
import StratFilterBar from '../StratFilterBar.vue'
import StratPhaseGroups from '../StratPhaseGroups.vue'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, isYouSide } from '../../composables/useTracker.js'
import { useParty } from '../../composables/useParty.js'
import { loadCoreStratagems, loadSideStratagems, sideSignature } from '../../composables/gameStratagems.js'
import { groupByPhase, usableInSlot, phaseLabel } from '../../composables/stratagemPhases.js'
import { tracks } from '../../data/trackerOptions.js'
import { useSwapFade } from '../../composables/useSwapFade.js'
import { loadStratTargets } from '../../composables/stratagemPlay.js'

// The stratagems in the CP tab: spend a side's CP on one, and take it back. Mounted only while
// the CP tab is open, so the faction data (dynamically imported by gameStratagems.js) is fetched
// only then — never with the game screen itself.
const props = defineProps({
  names: { type: Array, required: true },       // the two sides' display names
  defaultSide: { type: Number, required: true }, // whose turn it is / this phone's own side
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, stratUses, stratBlock, lastStratUse, undoStratagem } = useTracker()
const { canEdit } = useParty()

const side = ref(props.defaultSide)
// Another side's stratagems fade in under the standing tabs (useSwapFade).
const cpsEl = ref(null)
useSwapFade(side, () => [...(cpsEl.value?.children || [])].filter((el) => !el.matches('.page-tabs')))
watch(() => props.defaultSide, (v) => { side.value = v })
const turnIdx = computed(() => (current.value.currentTurn === 1 ? 1 : 0))
const sideOnTurn = computed(() => side.value === turnIdx.value)
const sideTabs = computed(() => [0, 1].map((i) => ({
  key: i, label: props.names[i], active: side.value === i,
})))

// ── The decks ──
const core = ref([])
const decks = ref([[], []])
const loading = ref(false)
let token = 0
async function load() {
  const t = ++token
  loading.value = true
  const g = current.value
  const combatPatrol = !!g?.settings?.combatPatrol
  const [c, ...out] = await Promise.all([
    loadCoreStratagems(locale.value),
    ...g.players.map((pl) => loadSideStratagems(pl, locale.value, { combatPatrol })),
  ])
  if (t !== token) return
  core.value = c
  decks.value = out
  loading.value = false
}
watch(
  [locale, () => sideSignature(current.value?.players?.[0]), () => sideSignature(current.value?.players?.[1])],
  load,
  { immediate: true },
)

// ── The filter: the Stratagems page's toolbar (StratFilterBar) ──
const phasesOn = computed(() => tracks(current.value?.settings, 'trackPhases'))
const livePhase = computed(() => current.value?.currentPhase || 'command')
const deck = ref('all')
const deckFilters = computed(() => [
  { key: 'all', label: labels.value.stratFilterAll },
  { key: 'core', label: labels.value.stratFilterCore },
  { key: 'army', label: labels.value.trackerStratArmyFilter },
])
// Grouped by phase is the tracker's default — a stratagem is looked for by WHEN — and the choice
// is remembered on this device, apart from the Stratagems page's own.
const BY_PHASE_KEY = 'wh11ed-tracker-strats-by-phase'
const byPhase = ref(getItem(BY_PHASE_KEY) !== '0')
watch(byPhase, (on) => setItem(BY_PHASE_KEY, on ? '1' : '0'))

const byName = (a, b) => a.name.localeCompare(b.name)
const armyAll = computed(() => [...(decks.value[side.value] || [])].sort(byName))
const isCore = (s) => String(s._key).startsWith('core:')
const shown = computed(() => [
  ...(deck.value !== 'core' ? armyAll.value : []),
  ...(deck.value !== 'army' ? core.value : []),
])
// With the clock, a group of its own on top: what THIS side can play right now — the phase, and
// whose phase it is ("your opponent's Movement phase" is Fire Overwatch's, not the mover's), by
// the same usableInSlot the phase reminder and the roster screen use. The phase groups follow.
const nowStrats = computed(() => {
  if (!phasesOn.value) return []
  const mine = (current.value.currentTurn === 1 ? 1 : 0) === side.value
  return shown.value.filter((s) => usableInSlot(s._phases, s._sides, livePhase.value, mine))
})
const groups = computed(() => [
  ...(phasesOn.value
    ? [{ key: 'now', label: `${labels.value.trackerStratNow} · ${phaseLabel(livePhase.value, labels.value)}`, strats: nowStrats.value }]
    : []),
  ...groupByPhase(shown.value),
])

// Which groups are open: all closed at first, then as the player left them — remembered on the
// device (owner's call, 2026-09-27).
const OPEN_KEY = 'wh11ed-tracker-strats-open'
const openPhases = ref(new Set(readOpen()))
function readOpen() {
  try { return JSON.parse(getItem(OPEN_KEY) || '[]') } catch { return [] }
}
watch(openPhases, (set) => setItem(OPEN_KEY, JSON.stringify([...set])))
// Come from the Phase tab's "Stratagems of this phase" (RoundTracker): grouped, with the "now"
// group open — the list the line promised, not the phases folded as they were left.
function showNow() {
  byPhase.value = true
  if (!openPhases.value.has('now')) openPhases.value = new Set([...openPhases.value, 'now'])
}
defineExpose({ showNow })

const openStrat = ref(null)

// What one row shows: the cost, whether a changed cost is on, how many times it was used this
// round and whether that can be taken back, and — when it cannot be used — why.
function rowProps(s) {
  const R = current.value.currentRound
  // Locked only when not even a cost reduced by a rule could pay for it — the price is asked on
  // playing (StratPlayModal).
  const block = canEdit(side.value) ? stratBlock(side.value, s, Math.max(0, s._cost - 1)) : 'phone'
  return {
    cost: s._cost,
    used: stratUses(side.value, s._key).filter((e) => e.round === R).length,
    undoable: canEdit(side.value) && !!lastStratUse(side.value, s._key),
    // Short of CP is the one reason every row would repeat at once: the grey button (and its
    // tooltip) says it; the line under a row is kept for the stratagem's own limits.
    reason: block && block !== 'cp' ? labels.value[`trackerStratBlock_${block}`] : '',
    title: block ? labels.value[`trackerStratBlock_${block}`] : '',
    locked: !!block,
  }
}
// Playing one: the units it may be played on are gathered first (stratagemPlay.js), then the
// dialog asks.
const playing = ref(null)
async function use(s) {
  if (!canEdit(side.value)) return
  const pi = side.value
  const targets = await loadStratTargets(current.value, pi, s)
  playing.value = { strat: s, pi, targets }
}
</script>

<style scoped>
.cps { margin-top: 0; }
/* The block in the chosen side's colour: the tabs' lit edge, the filters, the rows' buttons. */
.cps { --side: var(--side-you); --accent: var(--side); --accent-hover: color-mix(in srgb, var(--side) 80%, #000); }
.cps.opp { --side: var(--side-opponent); }
.cps-tabs { margin-bottom: 0; }
.cps-oppturn {
  display: flex; align-items: center; gap: 0.4rem;
  margin: 0 0 0.6rem; padding: 0.35rem 0.6rem;
  border-left: 3px solid var(--side); background: color-mix(in srgb, var(--side) 8%, var(--bg-card));
  font-size: 0.8rem; font-weight: 600; color: var(--text-primary);
}
.cps-note { margin: 0.4rem 0 0; font-size: 0.78rem; color: var(--text-dim); }
.cps-title {
  margin: 1rem 0 0.4rem;
  font-family: var(--font-display); font-size: 1.35rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.02em; color: var(--text-primary);
}
.cps-hint { margin: -0.2rem 0 0.4rem; font-size: 0.78rem; color: var(--text-dim); }
.cps-empty { margin: 0; font-size: 0.84rem; color: var(--text-dim); }
.cps-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.3rem; }
</style>
