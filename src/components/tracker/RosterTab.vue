<template>
  <div
    class="rt"
    :class="{ opp: army && !isYouSide(current.players[army.pi], army.pi) }"
  >
    <!-- Which list: one per army that carries one, on the same page tabs as the Armies panel. -->
    <PageTabs
      v-if="withLists.length > 1"
      class="rt-tabs"
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
import { computed, defineAsyncComponent, nextTick, ref, watch } from 'vue'
import PageTabs from '../PageTabs.vue'
import { useTracker, isYouSide } from '../../composables/useTracker.js'
import { useGameArmies } from '../../composables/useGameArmies.js'
import { useSwapFade } from '../../composables/useSwapFade.js'

// The game screen's Roster tab (owner, 2026-09-30): the attached lists, read without leaving the
// game. The roster screen is heavy (the faction's datasheets, its modifier layer), so it is loaded
// with the first list asked for — the game screen itself never carries it.
const RosterViewView = defineAsyncComponent(() => import('../../views/tracker/RosterViewView.vue'))

const props = defineProps({
  names: { type: Array, required: true },   // the sides' display names
  defaultSide: { type: Number, default: 0 },
  // The tab is on screen: the list shown reads the live game, every other one stays frozen.
  active: { type: Boolean, default: false },
})
const { current } = useTracker()
const { armies } = useGameArmies(() => props.names)

const keyOf = (pi, mi) => `${pi}:${mi ?? ''}`
const withLists = computed(() => armies.value.filter((a) => a.member.roster).map((a) => ({ ...a, key: keyOf(a.pi, a.mi) })))
const sel = ref(null)
const army = computed(() => withLists.value.find((a) => a.key === sel.value)
  || withLists.value.find((a) => a.pi === props.defaultSide) || withLists.value[0] || null)
const listTabs = computed(() => withLists.value.map((a) => ({ key: a.key, label: a.label, active: a.key === army.value?.key })))

// Built on the tab's first visit, then kept: the list on screen at once, the other armies' right
// after while the browser is idle — built on their own first visit instead, a list came up empty
// for a moment and the page jumped by its height (2026-09-30).
const built = ref(new Set())
let restQueued = false
watch([army, () => props.active], ([a, on]) => {
  if (!a || !on) return
  built.value.add(a.key)
  if (restQueued) return
  restQueued = true
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 250))
  idle(() => { for (const x of withLists.value) built.value.add(x.key) })
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
.rt { --side: var(--side-you); --accent: var(--side); }
.rt.opp { --side: var(--side-opponent); }
.rt-tabs { margin-bottom: 0.6rem; }
</style>
