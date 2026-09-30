<template>
  <div
    class="ap"
    :class="{ opp: army && !isYouSide(current.players[army.pi], army.pi) }"
  >
    <!-- Which army: one per side, one per member in doubles (up to four) — on the same page tabs as
         the Missions and CP panels (owner, 2026-09-29), the block in that army's side colour. -->
    <PageTabs
      class="ap-tabs"
      fill
      :tabs="armyTabs"
      @select="(k) => (sel = k)"
    />

    <!-- One card per army (ArmyCard.vue), all built with the panel and kept (owner, 2026-09-30:
         switching sides rebuilt the card, it came up without its rules for a moment and the page
         jumped). A switch shows another one, fading in. -->
    <ArmyCard
      v-for="(a, k) in armies"
      v-show="k === sel"
      :key="`${a.pi}:${a.mi ?? ''}`"
      :ref="(el) => { cards[k] = el }"
      :army="a"
      :is-doubles="isDoubles"
      @roster="(at) => $emit('roster', at)"
    />
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'
import PageTabs from '../PageTabs.vue'
import ArmyCard from './ArmyCard.vue'
import { useTracker, isYouSide } from '../../composables/useTracker.js'
import { useGameArmies } from '../../composables/useGameArmies.js'
import { useSwapFade } from '../../composables/useSwapFade.js'

// The Armies tab: each army of the game (a side, or each member of a doubles team) on its own tab —
// its faction, the way to its units, its rules (ArmyCard.vue).
const props = defineProps({
  names: { type: Array, required: true },   // the sides' display names
  defaultSide: { type: Number, default: 0 },
})
defineEmits(['roster'])
const { current } = useTracker()

const { armies, isDoubles } = useGameArmies(() => props.names)
const sel = ref(Math.max(0, armies.value.findIndex((a) => a.pi === props.defaultSide)))
const army = computed(() => armies.value[sel.value] || null)
const armyTabs = computed(() => armies.value.map((a, k) => ({ key: k, label: a.label, active: sel.value === k })))

// A switch fades the new card in (useSwapFade).
const cards = ref([])
useSwapFade(sel, () => cards.value[sel.value]?.$el)

// Open an army's rule (the Phase tab's line to it — RoundTracker): its tab, and the rule unfolded.
async function reveal({ pi, mi, rule }) {
  const k = armies.value.findIndex((a) => a.pi === pi && (mi == null || a.mi === mi))
  if (k < 0) return
  sel.value = k
  await nextTick()
  cards.value[k]?.reveal(rule)
}
defineExpose({ reveal })
</script>

<style scoped>
/* The tabs' lit edge in the chosen army's side colour. */
.ap { --side: var(--side-you); --accent: var(--side); --accent-hover: color-mix(in srgb, var(--side) 80%, #000); }
.ap.opp { --side: var(--side-opponent); }
.ap > .ap-card { margin-top: 0.6rem; }
</style>
