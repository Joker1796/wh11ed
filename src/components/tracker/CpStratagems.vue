<template>
  <section
    ref="cpsEl"
    class="cps"
    :class="{ opp: !isYouSide(current.players[side], side), 'side-frame': controlled }"
  >
    <!-- Whose CP the stratagems spend: the app's own page tabs (owner, 2026-09-29), the same two
         tabs as the missions panel's — names alone, so switching between the panels moves nothing;
         the balance is on the bank line under them. Both sides may play one at any moment — half the core stratagems are played
         in the other player's turn — so this is a choice, set by default to whose turn it is (this
         phone's own side in a shared game). The whole block wears the chosen side's colour, so
         the list below says whose it is; the chosen side's bank is one line under the tabs
         (RoundTracker's #bank slot). -->
    <PageTabs
      v-if="!controlled"
      class="cps-tabs"
      fill
      :tabs="sideTabs"
      @select="(i) => (side = i)"
    />
    <!-- Whose CP these are, in words: the side is picked on the score cards above, and only
         their colour said which (QA, 2026-10-17). -->
    <p
      v-if="controlled"
      class="cps-whose"
    >
      {{ labels.trackerCpWhose.replace('{name}', names[side]) }}
    </p>
    <slot
      name="bank"
      :side="side"
    />
    <!-- Stratagems are played here only where the game plays them (`trackStratPlay`, a child of
         CP since 2026-10-17): without, this tab is the CP counter alone. -->
    <template v-if="stratsPlayed">
      <!-- Not this side's turn: what is on offer is what it can play in the other's (the rest is
         greyed with why — stratBlock). -->
      <p
        v-if="!sideOnTurn"
        class="cps-oppturn"
      >
        <i
          class="wi wi-clock"
          aria-hidden="true"
        /> {{ labels.trackerStratOppTurn.replace('{name}', names[turnIdx]) }}
      </p>
      <p
        v-if="!canEdit(side)"
        class="cps-note"
      >
        {{ labels.trackerStratOtherPhone }}
      </p>

      <!-- The same toolbar as the Stratagems page, without its list/phases toggle: here the list is
         always grouped by phase (owner, 2026-10-06) — a stratagem is looked for by WHEN. With
         the clock, the phase it stands on comes first, open and marked "now". -->
      <div
        ref="headEl"
        class="cps-head"
      >
        <h4 class="panel-label">
          {{ labels.stratagemsHeading }}
        </h4>
        <StratFilterBar
          v-model:filter="deck"
          :filters="deckFilters"
          :phase-toggle="false"
        />
      </div>

      <p
        v-if="loading && deck !== 'core'"
        class="cps-empty"
      >
        {{ labels.trackerStratLoading }}
      </p>

      <StratPhaseGroups
        v-model:open="openPhases"
        :groups="groups"
        :now="phasesOn ? 'now' : null"
        card
      >
        <template #default="{ group }">
          <ul class="cps-list in-card">
            <StratRow
              v-for="s in group.strats"
              :key="s._key"
              :strat="s"
              :tag="deck === 'all' && isCore(s) ? labels.trackerStratCoreTag : ''"
              v-bind="rowProps(s)"
              :playable="spends"
              @open="openStrat = s"
              @use="use(s)"
              @adjust="ask(s)"
              @undo="undoStratagem(side, s._key)"
            />
          </ul>
        </template>
      </StratPhaseGroups>
    </template>

    <!-- The full card. -->
    <BaseModal
      v-if="openStrat"
      :title="openStrat.name"
      max-width="520px"
      @close="openStrat = null"
    >
      <div class="modal-body">
        <StratCard
          :strat="openStrat"
          :sublabel="openStrat.sublabel || null"
        />
      </div>
      <!-- Played from the card too (owner, 2026-10-08): the card is where the decision is made.
           The same button and lock as its row; the dialog hands over to the play dialog. -->
      <footer
        v-if="canEdit(side) && spends"
        class="cps-card-foot"
      >
        <!-- Why it cannot be played, short of CP included: a disabled button's tooltip never
             opens under a finger. -->
        <p
          v-if="cardRow.title"
          class="cps-card-why"
        >
          {{ cardRow.title }}
        </p>
        <button
          type="button"
          class="btn-ghost cps-card-use"
          data-press
          :disabled="cardRow.locked"
          :title="cardRow.title || labels.trackerStratUse"
          @click="use(openStrat, true)"
        >
          {{ labels.trackerStratUse }}
        </button>
      </footer>
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
import { groupByPhase, usableInSlot, phaseLabel } from '../../core/rules/stratagemPhases.js'
import { tracks } from '../../data/trackerOptions.js'
import { useSwapFade } from '../../composables/useSwapFade.js'
import { loadStratTargets } from '../../composables/stratagemPlay.js'
import { provideSideScope } from '../../composables/modalScope.js'
import { turnIndex } from '../../core/game/clock.js'

// The stratagems in the CP tab: spend a side's CP on one, and take it back. Mounted only while
// the CP tab is open, so the faction data (dynamically imported by gameStratagems.js) is fetched
// only then — never with the game screen itself.
const props = defineProps({
  names: { type: Array, required: true },       // the two sides' display names
  defaultSide: { type: Number, required: true }, // whose turn it is / this phone's own side
  // Set by the game screen when the score cards pick the side (ScoreBoard `selected`): no tabs
  // here then, and the block is framed in the side's colour, hanging from the tab strip.
  side: { type: Number, default: null },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, stratUses, stratBlock, lastStratUse, undoStratagem, playStratagem, strictUndoWhy: strictWhyOf } = useTracker()
const strictUndoWhy = (pi, key) => strictWhyOf('strat', pi, key)
const { canEdit } = useParty()

const controlled = computed(() => props.side === 0 || props.side === 1)
const side = ref(controlled.value ? props.side : props.defaultSide)
watch(() => props.side, (v) => { if (v === 0 || v === 1) side.value = v })
// The bank's and the stratagems' dialogs in the colour of the side shown, not of the side on turn.
provideSideScope(() => (current.value?.players?.[side.value] ? !isYouSide(current.value.players[side.value], side.value) : null))
// Another side's stratagems fade in under the standing tabs (useSwapFade).
const cpsEl = ref(null)
useSwapFade(side, () => [...(cpsEl.value?.children || [])].filter((el) => !el.matches('.page-tabs')))
watch(() => props.defaultSide, (v) => { if (!controlled.value) side.value = v })
const turnIdx = computed(() => turnIndex(current.value))
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
    // A Combat Patrol game drops the three core stratagems its mission sequence forbids.
    loadCoreStratagems(locale.value, { combatPatrol }),
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
const stratsPlayed = computed(() => tracks(current.value?.settings, 'trackStratPlay'))
// …and paid for here (`stratSpendCp`, owner 2026-10-25). Off: the list is a reference.
const spends = computed(() => tracks(current.value?.settings, 'stratSpendCp'))
const livePhase = computed(() => current.value?.currentPhase || 'command')
const deck = ref('all')
// The deck filter (all / core / army) shortens the list the same way: the page holds its height and
// glides the filter row back under the header, the new list fading in (owner, 2026-10-20).
const headEl = ref(null)
useSwapFade(() => deck.value, () => [...(cpsEl.value?.children || [])].filter((el) => !el.matches('.page-tabs, .cps-head')), { strip: () => headEl.value })
const deckFilters = computed(() => [
  { key: 'all', label: labels.value.stratFilterAll },
  { key: 'core', label: labels.value.stratFilterCore },
  { key: 'army', label: labels.value.trackerStratArmyFilter },
])
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
  const mine = turnIndex(current.value) === side.value
  return shown.value.filter((s) => usableInSlot(s._phases, s._sides, livePhase.value, mine))
})
const groups = computed(() => [
  ...(phasesOn.value
    // "Playable now · Command phase", not "Now · Command phase": beside the phase's own group the
    // bare "Now" read as a second copy of it with another count (QA, 2026-10-17); this one holds
    // what THIS side can play at this moment.
    ? [{ key: 'now', label: `${labels.value.trackerStratPlayableNow} · ${phaseLabel(livePhase.value, labels.value)}`, strats: nowStrats.value }]
    : []),
  ...groupByPhase(shown.value),
])

// Which groups are open, remembered on the device (owner's call, 2026-09-27). Their starting state
// follows the clock (owner, 2026-10-10, from Misha's note): with phases kept the groups start folded
// and the "now" group is the one to open; without them there is no "now", the list IS the reference,
// and it starts open like the first tracker's — the player folds what they do not want. Each mode
// remembers its own, so folding one does not fold the other: with the clock what is kept is the
// OPEN set, without it the CLOSED one.
const OPEN_KEY = 'wh11ed-tracker-strats-open'
const CLOSED_KEY = 'wh11ed-tracker-strats-closed'
const readSet = (key) => {
  try { return new Set(JSON.parse(getItem(key) || '[]')) } catch { return new Set() }
}
const openOn = ref(readSet(OPEN_KEY))
const closedOff = ref(readSet(CLOSED_KEY))
watch(openOn, (set) => setItem(OPEN_KEY, JSON.stringify([...set])))
watch(closedOff, (set) => setItem(CLOSED_KEY, JSON.stringify([...set])))
const openPhases = computed({
  get: () => (phasesOn.value ? openOn.value : new Set(groups.value.map((g) => g.key).filter((k) => !closedOff.value.has(k)))),
  set: (next) => {
    if (phasesOn.value) openOn.value = next
    else closedOff.value = new Set(groups.value.map((g) => g.key).filter((k) => !next.has(k)))
  },
})

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
    undoWhy: (() => { const w = strictUndoWhy(side.value, s._key); return w ? labels.value[`trackerStrict_${w}`] : '' })(),
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
// `fromCard`: played from its open card, which closes in the same tick the play dialog opens — a
// swap, not a close and an open (modalLeave.js), so the units are gathered before either moves.
async function use(s, fromCard = false) {
  if (!canEdit(side.value)) return
  const pi = side.value
  // Not asking (`askStratagems` off, owner 2026-10-14): the printed cost at one tap, on no unit. A
  // play the tracker refuses (short of CP, a limit) opens the dialog after all — it says why.
  if (!tracks(current.value?.settings, 'askStratagems') && playStratagem(pi, s, s._cost, null)) {
    if (fromCard) openStrat.value = null
    return
  }
  await ask(s, fromCard)
}
// The dialog: the cost (a rule may have changed it) and the unit — the row's ⚙, and the cost
// button when the game asks every time or the tracker refused the plain spend.
async function ask(s, fromCard = false) {
  if (!canEdit(side.value)) return
  const pi = side.value
  const targets = await loadStratTargets(current.value, pi, s)
  if (fromCard) openStrat.value = null
  playing.value = { strat: s, pi, targets }
}
const cardRow = computed(() => (openStrat.value ? rowProps(openStrat.value) : {}))
</script>

<style scoped>
.cps-whose { margin: 0 0 0.45rem; font-size: 0.84rem; color: var(--text-muted); line-height: 1.4; }
.cps { margin-top: 0; }
/* The block in the chosen side's colour: the tabs' lit edge, the filters, the rows' buttons. */
.cps { --side: var(--side-you); --accent: var(--side); --accent-hover: color-mix(in srgb, var(--side) 80%, #000); --accent-ink: var(--side); --accent-ink-hover: color-mix(in srgb, var(--side) 80%, #000); }
.cps.opp { --side: var(--side-opponent); }
.cps-tabs { margin-bottom: 0; }
.cps-oppturn {
  display: flex; align-items: center; gap: 0.4rem;
  margin: 0 0 0.6rem; padding: 0.35rem 0.6rem;
  border-left: 3px solid var(--side); background: color-mix(in srgb, var(--side) 8%, var(--bg-card));
  font-size: 0.8rem; font-weight: 600; color: var(--text-primary);
}
.cps-note { margin: 0.4rem 0 0; font-size: 0.78rem; color: var(--text-dim); }
.cps-empty { margin: 0; font-size: 0.84rem; color: var(--text-dim); }
/* The CP above, the stratagems below: the label and its deck switch on one line, ruled off. Not
   var(--border): on the dark page it all but vanishes (as ScoreBoard's breakdown rule did). */
.cps-head {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.4rem 0.75rem;
  margin: 0.7rem 0 0.6rem; padding-top: 0.7rem;
  border-top: 1px solid color-mix(in srgb, var(--text-muted) 35%, transparent);
}
.cps-head .panel-label { margin: 0; }
.cps-head > .strat-toolbar { margin: 0; }
.cps-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.3rem; }
/* Inside a phase card the rows are its lines: no frame of their own, a rule between them. */
.cps-list.in-card { gap: 0; }
.cps-list.in-card > .sr { --sr-bg: var(--bg-card); border: 0; }
.cps-list.in-card > .sr + .sr { border-top: 1px solid var(--border); }
/* The card's way to play it: under the scrolling card, always in reach. */
.cps-card-foot {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 0.4rem 0.75rem;
  padding: 0.6rem 0.9rem calc(0.6rem + var(--safe-bottom, 0px));
  border-top: 1px solid var(--border);
}
.cps-card-why { flex: 1 1 12rem; margin: 0; font-size: 0.8rem; color: var(--text-muted); }
/* Outlined in the side's colour, like the rows' CP buttons — not filled (owner, 2026-10-08). */
.cps-card-use { flex: 0 0 auto; border-color: var(--accent); color: var(--accent-ink); }
.cps-card-use:disabled { border-color: var(--border); color: var(--text-dim); cursor: default; }
</style>
