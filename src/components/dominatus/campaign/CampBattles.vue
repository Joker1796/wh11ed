<template>
  <section class="camp-block">
    <h2 class="dgroup-label">
      {{ labels.campBattles }}
      <span
        v-if="waiting"
        class="camp-waiting"
      >{{ labels.campWaiting }}</span>
    </h2>
    <ul
      v-if="battles.length"
      class="camp-list"
    >
      <li
        v-for="x in battles"
        :key="x.id"
        class="camp-battle"
        :class="`is-${x.status}`"
      >
        <span>{{ phaseLabel(x.phase) }} · {{ playerName(x.a) }} — {{ playerName(x.b) }}: {{ outcome(x) }}</span>
        <span class="camp-dim">{{ labels[`campStatus_${x.status}`] }}</span>
        <span
          v-if="isOwner && x.status === 'pending'"
          class="camp-actions"
        >
          <button
            class="btn-ghost"
            @click="act('review', { battle: x.id, ok: true })"
          >{{ labels.campApprove }}</button>
          <button
            class="btn-ghost"
            @click="act('review', { battle: x.id, ok: false })"
          >{{ labels.campReject }}</button>
        </span>
      </li>
    </ul>
    <p
      v-else
      class="empty-note"
    >
      {{ labels.campNoBattles }}
    </p>

    <!-- A battle entered by hand (one played without the tracker); a tracker game is sent from its
         finished screen. A member enters only battles they played (the fold checks). -->
    <CampOpenForm
      v-if="!state.finished && (isOwner || mine)"
      v-slot="{ close }"
      :label="labels.campAddBattle"
    >
      <form
        class="camp-form"
        @submit.prevent="add().then((ok) => ok && close())"
      >
        <div class="camp-pair">
          <CampPick
            v-model="a"
            :placeholder="labels.campSideA"
            :options="choosable.map((p) => ({ value: p.id, label: p.name }))"
          />
          <CampPick
            v-model="b"
            :placeholder="labels.campSideB"
            :options="opponentsOf(a).map((p) => ({ value: p.id, label: p.name }))"
          />
        </div>
        <div class="seg seg-fill">
          <button
            type="button"
            :class="{ on: victor === 'a' }"
            @click="victor = 'a'"
          >
            {{ a ? playerName(a) : labels.campSideA }}
          </button>
          <button
            type="button"
            :class="{ on: victor === null }"
            @click="victor = null"
          >
            {{ labels.campDraw }}
          </button>
          <button
            type="button"
            :class="{ on: victor === 'b' }"
            @click="victor = 'b'"
          >
            {{ b ? playerName(b) : labels.campSideB }}
          </button>
        </div>
        <div class="camp-pair">
          <label
            v-for="side in ['a', 'b']"
            :key="side"
            class="camp-num"
          >
            <span>{{ labels.domAgendaAchieved }} · {{ playerName(side === 'a' ? a : b) || '—' }}</span>
            <NumberStepper
              :model-value="achieved[side]"
              :min="0"
              :max="state.phase === 3 ? 2 : 1"
              @update:model-value="(v) => (achieved[side] = v)"
            />
          </label>
        </div>
        <div class="camp-row">
          <button
            class="btn-primary"
            type="submit"
            :disabled="!a || !b"
          >
            {{ labels.campSendBattle }}
          </button>
          <button
            type="button"
            class="btn-ghost"
            @click="close"
          >
            {{ labels.trackerCancel }}
          </button>
        </div>
      </form>
    </CampOpenForm>
  </section>
</template>

<script setup>
// The campaign's battles: who fought, who won, the Agenda Achieved cards each earned, and whether
// the Warmaster has approved it (only then do its rewards come). Entered here by hand, or sent
// from a finished tracker game (CampSendGame).
import { ref, reactive, computed } from 'vue'
import NumberStepper from '../../tracker/NumberStepper.vue'
import CampOpenForm from './CampOpenForm.vue'
import CampPick from './CampPick.vue'
import { useCampaignView } from './useCampaignView.js'

// `waiting`: the Warmaster has battles to count, and the block stands among what waits for them.
defineProps({ waiting: { type: Boolean, default: false } })

const { state, isOwner, mine, act, labels, playerName, phaseLabel } = useCampaignView()
const a = ref(null)
const b = ref(null)
const victor = ref('a')
const achieved = reactive({ a: 0, b: 0 })

const battles = computed(() => [...state.value.battles].reverse())
// A member fights as their own player; the Warmaster enters anyone's battle.
const choosable = computed(() => (isOwner.value ? state.value.players : mine.value ? [mine.value] : []))
const opponentsOf = (id) => {
  const me = state.value.players.find((p) => p.id === id)
  return state.value.players.filter((p) => p.id !== id && p.alliance && p.alliance !== me?.alliance)
}
function outcome(x) {
  if (!x.victor) return labels.value.campDraw
  return labels.value.campWon.replace('{p}', playerName(x[x.victor]))
}
async function add() {
  if (!(await act('battle', { id: `b${Date.now().toString(36)}`, a: a.value, b: b.value, victor: victor.value, achieved: { ...achieved } }))) return false
  a.value = null
  b.value = null
  victor.value = 'a'
  achieved.a = 0
  achieved.b = 0
  return true
}
</script>
