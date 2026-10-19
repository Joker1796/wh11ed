<template>
  <div
    class="rt"
    data-tour="game-roster"
    :class="{ opp: shownSide != null && !isYouSide(current.players[shownSide], shownSide), 'side-frame': controlled && !embedded, embedded }"
  >
    <!-- Which list: one per army that carries one, on the same page tabs as the Armies panel — on
         the game screen only the picked side's (a doubles team's two members). -->
    <SideEmptyState
      v-if="controlled && !army && !embedded"
      :faction="sideFaction"
    >
      {{ labels.trackerRosterNoneSide }}
    </SideEmptyState>
    <PageTabs
      v-if="listTabs.length > 1 && !embedded"
      class="rt-tabs"
      data-tour="game-members"
      fill
      :tabs="listTabs"
      @select="(k) => (sel = k)"
    />
    <!-- Each list is the roster screen itself, built the first time it is asked for and kept, so
         coming back to it is showing, not building; off screen it is `frozen` (RosterViewView). -->
    <RosterViewView
      v-for="a in builtArmies"
      v-show="a.key === army?.key"
      :key="a.key"
      :ref="(el) => setView(a.key, el)"
      in-tracker
      :pi="a.pi"
      :mi="a.mi"
      :frozen="!active || a.key !== army?.key"
    />
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, nextTick, onMounted, ref, watch } from 'vue'
import PageTabs from '../PageTabs.vue'
import { useTracker, isYouSide, membersOf } from '../../composables/useTracker.js'
import { useGameArmies } from '../../composables/useGameArmies.js'
import { useSwapFade } from '../../composables/useSwapFade.js'
import { useLocale } from '../../composables/useLocale.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import SideEmptyState from './SideEmptyState.vue'
import { ui } from '../../i18n/ui.js'
import { useTourShow } from '../../composables/useTour.js'
import { useParty } from '../../composables/useParty.js'

// The game screen's Roster tab (owner, 2026-09-30): the attached lists, read without leaving the
// game. The roster screen is heavy (the faction's datasheets, its modifier layer), so it is its own
// chunk, loaded while the browser is idle after the game screen is up — and only in a game that
// has a list attached; the game screen itself never carries it.
const RosterViewView = defineAsyncComponent(() => import('../../views/tracker/RosterViewView.vue'))

const props = defineProps({
  names: { type: Array, required: true },   // the sides' display names
  defaultSide: { type: Number, default: 0 },
  // The tab is on screen: the list shown reads the live game, every other one stays frozen.
  active: { type: Boolean, default: false },
  // The side picked on the score cards (RoundTracker): only its lists are offered here then.
  side: { type: Number, default: null },
  // Under the army's card in the Army tab (owner, 2026-10-10 — one tab for the army and its list):
  // the army is the card's (`armyKey`, ArmiesPanel's pick), so no tabs and no empty state of its
  // own — an army without a list shows only its card, which says where its units are.
  embedded: { type: Boolean, default: false },
  armyKey: { type: String, default: null },
})
const { current } = useTracker()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { armies } = useGameArmies(() => props.names)

const keyOf = (pi, mi) => `${pi}:${mi ?? ''}`
const withLists = computed(() => armies.value.filter((a) => a.member.roster).map((a) => ({ ...a, key: keyOf(a.pi, a.mi) })))
const sel = ref(null)
const controlled = computed(() => props.side === 0 || props.side === 1)
const offered = computed(() => (controlled.value ? withLists.value.filter((a) => a.pi === props.side) : withLists.value))
const army = computed(() => (props.embedded
  ? withLists.value.find((a) => a.key === props.armyKey) || null
  : offered.value.find((a) => a.key === sel.value)
    || offered.value.find((a) => a.pi === props.defaultSide) || offered.value[0] || null))
const shownSide = computed(() => (controlled.value ? props.side : army.value?.pi ?? null))
// A side with no list says so over its army's emblem (SideEmptyState).
const sideFaction = computed(() => (controlled.value
  ? factionIndexBySlug(membersOf(current.value.players[props.side])[0]?.factionSlug) || null
  : null))
const listTabs = computed(() => offered.value.map((a) => ({ key: a.key, label: a.label, active: a.key === army.value?.key })))
// This phone's army in a side: its seat's member in a shared game, else the first.
const { party: partyHandle } = useParty()
const mySeatIn = (pi) => (partyHandle.value?.side === pi && partyHandle.value?.mi != null ? partyHandle.value.mi : 0)
// The tour in a doubles game opens the partner's list, then this phone's own (see ArmiesPanel).
useTourShow('member', (who) => {
  const a = offered.value.find((x) => (x.mi === mySeatIn(x.pi)) === (who === 'mine'))
  if (a) sel.value = a.key
})

// Built ahead of the first visit, then kept: the game screen builds this panel while the browser
// is idle after it comes up (RoundTracker), and the panel builds every list the same way, frozen
// and off screen. Built on their own first visit instead, a list came up empty for a moment and
// the page jumped by its height (2026-09-30) — and the FIRST list still did, because it waited
// for the tab to be shown: after a reload the first tap on "Roster" loaded the roster screen and
// its faction data in front of the player, the panel growing in four steps (2026-10-06). Shown
// before the idle build gets there, the list on screen is built at once.
const built = ref(new Set())
const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 250))
const buildRest = () => idle(() => { for (const x of withLists.value) built.value.add(x.key) })
onMounted(buildRest)
watch([army, () => props.active], ([a, on]) => {
  if (a && on) built.value.add(a.key)
}, { immediate: true })
const builtArmies = computed(() => withLists.value.filter((a) => built.value.has(a.key)))

// The screens, by army — for a card opened from another tab.
const views = new Map()
const waiting = new Map()
function setView(key, el) {
  if (!el) { views.delete(key); return }
  views.set(key, el)
  const uid = waiting.get(key)
  if (uid) { waiting.delete(key); el.openUnit(uid) }
}

// Another army's list fades in (useSwapFade).
useSwapFade(() => army.value?.key, () => views.get(army.value?.key)?.$el)

// Show an army's list (the Armies card's button, the Phase tab's line to several units).
function show({ pi, mi }) {
  sel.value = keyOf(pi, mi)
}
// Open one unit's card over whatever tab is on screen (the Phase tab's line to it): that list is
// built if it was not — frozen, off screen — and the card opens as soon as its screen is up.
async function openUnit({ pi, mi, uid }) {
  const key = keyOf(pi, mi)
  if (!withLists.value.some((a) => a.key === key)) return
  built.value.add(key)
  await nextTick()
  const v = views.get(key)
  if (v) v.openUnit(uid)
  else waiting.set(key, uid)
}
defineExpose({ show, openUnit })
</script>

<style scoped>
/* In the chosen army's side colour, like the Armies panel's tabs. */
.rt { --side: var(--side-you); --accent: var(--side); --accent-ink: var(--side); }
.rt.opp { --side: var(--side-opponent); }
.rt-tabs { margin-bottom: 0.6rem; }
/* Under the army's card in the Army tab: a step down from it, no frame of its own. */
.rt.embedded { margin-top: 0.75rem; }
/* In the side's frame the open tab opens onto the frame's ground, as the Armies tabs onto their card
   (owner, 2026-10-08) — on the page's darker ground it read as a block apart from the list. */
.rt.side-frame .rt-tabs { --page-tab-open-bg: var(--bg-card); }
.rt.side-frame { display: flex; flex-direction: column; }
</style>
