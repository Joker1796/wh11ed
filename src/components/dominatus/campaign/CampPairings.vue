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
          <span>{{ playerName(x.a) }} — {{ playerName(x.b) }}</span>
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
    <CampOpenForm
      v-if="isOwner"
      v-slot="{ close }"
      :label="labels.campPairAdd"
    >
      <form
        class="camp-form"
        @submit.prevent="addPairing().then((ok) => ok && close())"
      >
        <div class="camp-pair">
          <CampPick
            v-model="pa"
            :placeholder="labels.campSideA"
            :options="state.players.filter((p) => p.alliance).map(playerOption)"
          />
          <CampPick
            v-model="pb"
            :placeholder="labels.campSideB"
            :options="opponentsOf(pa).map(playerOption)"
          />
        </div>
        <button
          class="btn-primary"
          type="submit"
          :disabled="!pa || !pb"
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
import CampPick from './CampPick.vue'
import CampOpenForm from './CampOpenForm.vue'
import { pairingsNow, amendments } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'

const { entry, state, isOwner, act, labels, playerName, playerOption } = useCampaignView()

const pairings = computed(() => pairingsNow(state.value))
const pa = ref(null)
const pb = ref(null)
const opponentsOf = (id) => {
  const me = state.value.players.find((p) => p.id === id)
  return state.value.players.filter((p) => p.id !== id && p.alliance && p.alliance !== me?.alliance)
}
async function addPairing() {
  if (!(await act('pairing', { id: `x${Date.now().toString(36)}`, phase: state.value.phase, a: pa.value, b: pb.value }))) return false
  pa.value = null
  pb.value = null
  return true
}
function removePairing(x) {
  const events = entry.value.events || []
  const am = amendments(events)
  const e = events.find((ev) => ev.type === 'pairing' && ev.payload?.id === x.id && am.get(ev.seq) !== null)
  if (e) act('amend', { edits: [{ seq: e.seq, payload: null }] })
}
</script>
