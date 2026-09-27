<template>
  <section class="cps">
    <!-- Whose CP the stratagems spend. Both sides may play one at any moment — half the core
         stratagems are played in the other player's turn — so this is a choice, set by default to
         whose turn it is (this phone's own side in a shared game). -->
    <div
      class="cps-sides"
      role="tablist"
    >
      <button
        v-for="i in [0, 1]"
        :key="i"
        role="tab"
        class="cps-side"
        :class="{ on: side === i, opp: !isYouSide(current.players[i], i) }"
        :aria-selected="side === i"
        @click="side = i"
      >
        <span class="cps-side-name">{{ names[i] }}</span>
        <span class="cps-side-cp">{{ current.players[i].cp }} CP</span>
      </button>
    </div>
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
      :now="phasesOn ? livePhase : null"
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
            @modify="modFor = s"
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
            @modify="modFor = s"
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
            @modify="modFor = s"
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
      :subtitle="`${costNow(openStrat)}CP · ${labels.trackerStratBase} ${openStrat._cost}CP`"
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

    <!-- A cost changed by a rule (−1 / +1): the Core Rules cap a change at one either way and
         never below 0. Not saved — it is how THIS use is priced, and a new round forgets it. -->
    <BaseModal
      v-if="modFor"
      :title="labels.trackerStratModify"
      :subtitle="`${modFor.name} · ${labels.trackerStratBase} ${modFor._cost}CP`"
      dense
      max-width="340px"
      @close="modFor = null"
    >
      <div class="modal-body act-list">
        <button
          v-for="m in [-1, 0, 1]"
          :key="m"
          class="act-btn cps-mod"
          :class="{ on: modOf(modFor) === m }"
          @click="setMod(modFor, m)"
        >
          <strong>{{ m < 0 ? labels.trackerStratReduced : m > 0 ? labels.trackerStratIncreased : labels.trackerStratNormal }}</strong>
          <span>{{ Math.max(0, modFor._cost + m) }}CP</span>
        </button>
      </div>
    </BaseModal>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BaseModal from '../BaseModal.vue'
import StratCard from '../StratCard.vue'
import StratRow from './StratRow.vue'
import StratFilterBar from '../StratFilterBar.vue'
import StratPhaseGroups from '../StratPhaseGroups.vue'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, isYouSide } from '../../composables/useTracker.js'
import { useParty } from '../../composables/useParty.js'
import { loadCoreStratagems, loadSideStratagems, sideSignature } from '../../composables/gameStratagems.js'
import { PHASE_ORDER, groupByPhase } from '../../composables/stratagemPhases.js'

// The stratagems in the CP tab: spend a side's CP on one, and take it back. Mounted only while
// the CP tab is open, so the faction data (dynamically imported by gameStratagems.js) is fetched
// only then — never with the game screen itself.
const props = defineProps({
  names: { type: Array, required: true },       // the two sides' display names
  defaultSide: { type: Number, required: true }, // whose turn it is / this phone's own side
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, stratUses, stratBlock, useStratagem, lastStratUse, undoStratagem } = useTracker()
const { canEdit } = useParty()

const side = ref(props.defaultSide)
watch(() => props.defaultSide, (v) => { side.value = v })

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
const phasesOn = computed(() => !!current.value?.settings?.trackPhases)
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
const groups = computed(() => groupByPhase(shown.value, phasesOn.value ? livePhase.value : null))

// Which phase groups are open: with the clock, the phase it stands on (and it follows the clock);
// without one, every group — in a game a folded list is one tap too many.
const openPhases = ref(new Set())
function resetOpen() {
  openPhases.value = new Set(phasesOn.value ? [livePhase.value] : PHASE_ORDER)
}
resetOpen()
watch([livePhase, phasesOn], resetOpen)

// ── The cost this use is asked at ──
const mods = ref({})
const modKey = (s) => `${side.value}|${s._key}`
const modOf = (s) => mods.value[modKey(s)] || 0
function setMod(s, m) {
  mods.value = { ...mods.value, [modKey(s)]: m }
  modFor.value = null
}
const costNow = (s) => Math.max(0, s._cost + modOf(s))
// A new round forgets every changed cost (Mikhail's prototype: a change is for this round only).
watch(() => current.value?.currentRound, () => { mods.value = {} })

const openStrat = ref(null)
const modFor = ref(null)

// What one row shows: the cost, whether a changed cost is on, how many times it was used this
// round and whether that can be taken back, and — when it cannot be used — why.
function rowProps(s) {
  const R = current.value.currentRound
  const block = canEdit(side.value) ? stratBlock(side.value, s, costNow(s)) : 'phone'
  return {
    cost: costNow(s),
    mod: modOf(s),
    used: stratUses(side.value, s._key).filter((e) => e.round === R).length,
    undoable: canEdit(side.value) && !!lastStratUse(side.value, s._key),
    // Short of CP is the one reason every row would repeat at once: the grey button (and its
    // tooltip) says it; the line under a row is kept for the stratagem's own limits.
    reason: block && block !== 'cp' ? labels.value[`trackerStratBlock_${block}`] : '',
    title: block ? labels.value[`trackerStratBlock_${block}`] : '',
    locked: !!block,
  }
}
function use(s) {
  if (!canEdit(side.value)) return
  if (useStratagem(side.value, s, costNow(s))) mods.value = { ...mods.value, [modKey(s)]: 0 }
}
</script>

<style scoped>
.cps { margin-top: 1rem; }
.cps-sides { display: grid; grid-template-columns: 1fr 1fr; gap: 0.35rem; }
.cps-side {
  --side: var(--accent);
  display: flex; align-items: baseline; justify-content: space-between; gap: 0.4rem;
  min-width: 0; min-height: 44px; padding: 0.4rem 0.6rem;
  border: 1px solid var(--border); border-bottom: 3px solid var(--border);
  background: var(--bg-card); font: inherit; cursor: pointer; color: var(--text-muted);
}
.cps-side.opp { --side: var(--side-opponent); }
.cps-side.on { border-bottom-color: var(--side); color: var(--side); }
.cps-side-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 700; }
.cps-side-cp { flex-shrink: 0; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; }
.cps-note { margin: 0.4rem 0 0; font-size: 0.78rem; color: var(--text-dim); }
.cps-title {
  margin: 1rem 0 0.4rem;
  font-family: var(--font-display); font-size: 1.35rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.02em; color: var(--text-primary);
}
.cps-hint { margin: -0.2rem 0 0.4rem; font-size: 0.78rem; color: var(--text-dim); }
.cps-empty { margin: 0; font-size: 0.84rem; color: var(--text-dim); }
.cps-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.4rem; }
.cps-mod { display: flex; justify-content: space-between; align-items: center; }
.cps-mod.on { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, var(--bg-secondary)); }
</style>
