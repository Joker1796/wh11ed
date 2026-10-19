<template>
  <div
    class="ap"
    :class="{ opp: army && !isYouSide(current.players[army.pi], army.pi), 'side-frame': controlled }"
  >
    <!-- Which army: one per side, one per member in doubles (up to four), the block in that army's
         side colour. On the game screen the side is picked on the score cards (`side`), and the
         tabs are left only where the side has two armies — a doubles team's members. -->
    <PageTabs
      v-if="armyTabs.length > 1"
      class="ap-tabs"
      data-tour="game-members"
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
    />
    <!-- Under the card, inside the same frame: the army's attached list (RoundTracker puts it here). -->
    <slot />
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import PageTabs from '../PageTabs.vue'
import ArmyCard from './ArmyCard.vue'
import { useTracker, isYouSide } from '../../composables/useTracker.js'
import { useGameArmies } from '../../composables/useGameArmies.js'
import { useSwapFade } from '../../composables/useSwapFade.js'
import { useTourShow } from '../../composables/useTour.js'
import { useParty } from '../../composables/useParty.js'

// The Armies tab: each army of the game (a side, or each member of a doubles team) on its own tab —
// its faction, the way to its units, its rules (ArmyCard.vue).
const props = defineProps({
  names: { type: Array, required: true },   // the sides' display names
  defaultSide: { type: Number, default: 0 },
  // The side picked on the score cards (RoundTracker): only its armies are offered here then.
  side: { type: Number, default: null },
})
const emit = defineEmits(['army'])
const { current } = useTracker()

const { armies, isDoubles } = useGameArmies(() => props.names)
const controlled = computed(() => props.side === 0 || props.side === 1)
const firstOf = (pi) => Math.max(0, armies.value.findIndex((a) => a.pi === pi))
const sel = ref(firstOf(controlled.value ? props.side : props.defaultSide))
// Another side picked: its first army, unless the one on screen is already that side's.
watch(() => props.side, (pi) => {
  if ((pi === 0 || pi === 1) && armies.value[sel.value]?.pi !== pi) sel.value = firstOf(pi)
})
const army = computed(() => armies.value[sel.value] || null)
// The army on screen, for the list under its card (RoundTracker puts the attached roster there —
// one Army tab since 2026-10-10, owner, from Misha's note).
watch(army, (a) => emit('army', a ? `${a.pi}:${a.mi ?? ''}` : null), { immediate: true })
const armyTabs = computed(() => armies.value
  .map((a, k) => ({ key: k, label: a.label, active: sel.value === k, pi: a.pi }))
  .filter((t) => !controlled.value || t.pi === props.side))

// The tour in a doubles game opens the partner's army and then this phone's own again
// (useTourShow, 'partner' / 'mine'): which member is whose is this phone's seat in a shared game,
// This phone's army in a side: its seat's member in a shared game, else the first.
const { party: partyHandle } = useParty()
const mySeatIn = (pi) => (partyHandle.value?.side === pi && partyHandle.value?.mi != null ? partyHandle.value.mi : 0)
// the first army when one phone keeps the whole team.
useTourShow('member', (who) => {
  const t = armyTabs.value.find((x) => (armies.value[x.key].mi === mySeatIn(x.pi)) === (who === 'mine'))
  if (t) sel.value = t.key
})
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
// Show an army (its list under the card): "Mark reserves", the Phase tab's line to several units.
function show({ pi, mi }) {
  const k = armies.value.findIndex((a) => a.pi === pi && (mi == null || a.mi === mi))
  if (k >= 0) sel.value = k
}
defineExpose({ reveal, show })
</script>

<style scoped>
/* The tabs' lit edge in the chosen army's side colour. */
.ap { --side: var(--side-you); --accent: var(--side); --accent-hover: color-mix(in srgb, var(--side) 80%, #000); --accent-ink: var(--side); --accent-ink-hover: color-mix(in srgb, var(--side) 80%, #000); }
.ap.opp { --side: var(--side-opponent); }
.ap > .ap-card { margin-top: 0.6rem; }
/* Under a doubles team's tabs the card hangs from them (owner, 2026-10-08 — a gap and two grounds
   read as two blocks): no gap, the open tab on the card's own ground, and the card's frame in the
   side colour with its top edge given to the strip's line, which the open tab parts. The thick
   side bar goes too — 4px under the tab's 1px edge was a step in the frame; the frame's colour
   names the side, as on every other panel hanging from tabs (`.side-frame`). */
.ap-tabs { --page-tab-open-bg: color-mix(in srgb, var(--side) 6%, var(--bg-card)); }
.ap-tabs ~ .ap-card { margin-top: 0; border: 1px solid var(--side); border-top: 0; }
</style>
