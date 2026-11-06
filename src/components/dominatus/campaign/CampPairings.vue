<template>
  <!-- The Warmaster's pairings this phase (the booklet: they may organise who plays whom). The head
       shows only once there is a pairing: an empty section was half a screen of nothing. -->
  <div
    v-if="pairings.length || isOwner"
    class="camp-pairings"
  >
    <template v-if="pairings.length">
      <h3 class="dgroup-label">
        {{ labels.campPairings }}
      </h3>
      <ul class="camp-list">
        <li
          v-for="x in pairings"
          :key="x.id"
          class="camp-battle"
        >
          <span>{{ labels.campPairLine.replace('{a}', sideName(x, 'a')).replace('{b}', sideName(x, 'b')) }}</span>
          <span class="camp-dim">{{ x.played ? labels.campPairPlayed : labels.campPairWaiting }}</span>
          <button
            v-if="isOwner && !x.played"
            type="button"
            class="camp-more"
            :aria-label="labels.campPairRemove"
            @click="removePairing(x)"
          >
            <i class="wi wi-close" />
          </button>
        </li>
      </ul>
    </template>
    <!-- The app draws the phase's pairs (pairBy 'random'), once the phase has its Location. -->
    <button
      v-if="canDraw"
      type="button"
      class="btn-primary camp-draw-pairs"
      :disabled="drawing"
      @click="drawPairs"
    >
      {{ labels.campDrawPairs }}
    </button>
    <CampOpenForm
      v-if="isOwner"
      v-slot="{ close }"
      :label="labels.campPairAdd"
    >
      <form
        class="camp-form"
        @submit.prevent="addPairing().then((ok) => ok && close())"
      >
        <CampBattleSides
          v-model="sides"
          pairing
        />
        <button
          class="btn-primary"
          type="submit"
          :disabled="!!battleSidesReason(state, sides)"
        >
          {{ labels.campPairAdd }}
        </button>
      </form>
    </CampOpenForm>
  </div>
</template>

<script setup>
// Pairings of the running phase, on the battles tab beside the battles they are for: set by the
// Warmaster, taken back by an amend of the event that set it.
import { ref, computed } from 'vue'
import CampBattleSides from './CampBattleSides.vue'
import CampOpenForm from './CampOpenForm.vue'
import { pairingsNow, amendments, randomPairings, battleSidesReason } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'

const { entry, state, isOwner, act, labels, playerName, onAsk } = useCampaignView()

const pairings = computed(() => pairingsNow(state.value))
const sides = ref({ a: null, b: null })
const sideName = (p, side) => [p[side], p[`${side}2`]].filter(Boolean).map(playerName).join(' + ')
async function addPairing() {
  if (!(await act('pairing', { id: `x${Date.now().toString(36)}`, phase: state.value.phase, ...sides.value }))) return false
  sides.value = { a: null, b: null }
  return true
}
// The draw: written as the Warmaster's pairings, one event each, so each is taken back the same way.
const canDraw = computed(() => isOwner.value && state.value.pairBy === 'random' && !!state.value.locations[state.value.phase] && !pairings.value.length)
const drawing = ref(false)
async function drawPairs() {
  if (!canDraw.value) return
  drawing.value = true
  try {
    const stamp = Date.now().toString(36)
    for (const [i, x] of randomPairings(state.value).entries()) {
      if (!(await act('pairing', { id: `r${stamp}${i}`, phase: state.value.phase, a: x.a, b: x.b }))) break
    }
  } finally {
    drawing.value = false
  }
}
onAsk({ drawPairs: () => drawPairs() })
function removePairing(x) {
  const events = entry.value.events || []
  const am = amendments(events)
  const e = events.find((ev) => ev.type === 'pairing' && ev.payload?.id === x.id && am.get(ev.seq) !== null)
  if (e) act('amend', { edits: [{ seq: e.seq, payload: null }] })
}
</script>
