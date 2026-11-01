<template>
  <section class="camp-block">
    <template v-if="!state.finished">
      <!-- The phase's Location is its card, as the rules page draws it: the bonus and the war zone. -->
      <DomLocationCard
        v-if="location"
        :location="location"
      />
      <p
        v-else
        class="camp-line camp-dim"
      >
        {{ labels.campNoLocation }}
      </p>
      <!-- Staging Post: the Alliance holding Cerbera Base chooses the next Location. -->
      <p
        v-if="!location && stagingBy"
        class="camp-line"
      >
        {{ labels.campStagingPost.replace('{a}', allianceName(stagingBy)) }}
      </p>
      <!-- The Warmaster picks or rolls the Location, and may pick again (the Event Companion: they
           may select it instead of rolling). -->
      <button
        v-if="isOwner && location && !choosing"
        class="btn-ghost camp-change-loc"
        @click="choosing = true"
      >
        {{ labels.campChangeLocation }}
      </button>
      <div
        v-if="isOwner && (!location || choosing)"
        class="filter-chips"
      >
        <button
          v-for="l in phaseLocations"
          :key="l.slug"
          class="filter-chip"
          :class="{ on: location?.slug === l.slug }"
          @click="setLocation(l.slug)"
        >
          {{ l.roll }} · {{ l.name }}
        </button>
        <button
          class="filter-chip"
          data-press
          @click="roll"
        >
          {{ labels.trackerDomRoll }}
        </button>
        <button
          v-if="location"
          class="filter-chip"
          @click="choosing = false"
        >
          {{ labels.trackerCancel }}
        </button>
      </div>

      <!-- Ending the phase: what the fold will make of it, shown before it is done. -->
      <div
        v-if="isOwner && location"
        class="camp-end"
      >
        <p class="camp-line">
          {{ preview }}
        </p>
        <div
          v-if="tied.length > 1"
          class="seg"
        >
          <button
            v-for="a in tied"
            :key="a"
            :class="{ on: override === a }"
            @click="override = a"
          >
            {{ allianceName(a) }}
          </button>
        </div>
        <button
          class="btn-primary"
          :disabled="tied.length > 1 && !override"
          @click="endPhase"
        >
          {{ labels.campEndPhase.replace('{n}', phaseLabel(state.phase)) }}
        </button>
      </div>
    </template>

    <ul
      v-if="results.length"
      class="camp-results"
    >
      <li
        v-for="r in results"
        :key="r.phase"
      >
        <strong>{{ phaseLabel(r.phase) }}:</strong> {{ resultLine(r) }}
      </li>
    </ul>
    <!-- The Warmaster undoes the last end of a phase (an `amend`, reopenPhase): not under a battle
         of the phase after it. -->
    <div
      v-if="isOwner && back"
      class="camp-end"
    >
      <button
        class="btn-ghost"
        :disabled="back.blocked"
        @click="reopening = true"
      >
        {{ labels.campReopen.replace('{n}', phaseLabel(back.phase)) }}
      </button>
      <p
        v-if="back.blocked"
        class="camp-dim"
      >
        {{ labels.campReopenBlocked }}
      </p>
    </div>
    <ConfirmModal
      v-if="reopening"
      :title="labels.campReopen.replace('{n}', phaseLabel(back.phase))"
      :message="labels.campReopenConfirm.replace('{n}', phaseLabel(back.phase))"
      :confirm-label="labels.campReopen.replace('{n}', phaseLabel(back.phase))"
      :cancel-label="labels.trackerCancel"
      @confirm="reopen"
      @close="reopening = false"
    />
  </section>
</template>

<script setup>
// The campaign phase: its Location (the Warmaster picks or rolls), the Location's war zone rules,
// and the end of the phase — with the result the fold will reach shown first, and the
// Warmaster's word on a tie nothing else breaks.
import { ref, computed } from 'vue'
import DomLocationCard from '../DomLocationCard.vue'
import ConfirmModal from '../../ConfirmModal.vue'
import { campaignState, reopenable, reopenPhase } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'

const { entry, state, isOwner, act, labels, deck, allianceName, locationName, phaseLabel } = useCampaignView()
const override = ref(null)

const phaseLocations = computed(() => deck.value?.locations.filter((l) => l.phase === state.value.phase) || [])
const location = computed(() => deck.value?.locations.find((l) => l.slug === state.value.locations[state.value.phase]) || null)
const stagingBy = computed(() => (state.value.phase > 1 ? state.value.control['cerbera-base'] || null : null))

// The end of the phase, folded ahead of time.
const ahead = computed(() => {
  if (!location.value) return null
  const evs = [...(entry.value.events || []), { seq: Infinity, author: 'owner', type: 'endPhase', payload: { phase: state.value.phase } }]
  return campaignState(evs, deck.value).results[state.value.phase] || null
})
const tied = computed(() => {
  const r = ahead.value
  if (!r || !r.tie) return []
  const top = Math.max(...Object.values(r.honours))
  return Object.keys(r.honours).filter((a) => r.honours[a] === top)
})
const preview = computed(() => {
  const r = ahead.value
  if (!r) return ''
  if (!r.control && !r.tie) return labels.value.campNobodyControls
  return r.tie ? labels.value.campTie : labels.value.campWillControl.replace('{a}', allianceName(r.control))
})

const choosing = ref(false)
async function setLocation(slug) {
  if (slug === location.value?.slug || (await act('location', { phase: state.value.phase, slug }))) choosing.value = false
}
function roll() {
  const n = 1 + Math.floor(Math.random() * 6)
  const l = phaseLocations.value[Math.ceil(n / 2) - 1]
  if (l) setLocation(l.slug)
}
function endPhase() {
  act('endPhase', { phase: state.value.phase, ...(override.value ? { control: override.value } : {}) })
  override.value = null
}

const results = computed(() => Object.entries(state.value.results).map(([phase, r]) => ({ phase: Number(phase), ...r })))
function resultLine(r) {
  const l = labels.value
  const parts = [r.control ? l.campControlled.replace('{a}', allianceName(r.control)).replace('{loc}', locationName(state.value.locations[r.phase])) : l.campNobodyControls]
  if (r.ascendancy.length) parts.push(l.campAscendancy.replace('{a}', r.ascendancy.map(allianceName).join(', ')))
  parts.push(Object.entries(r.np).map(([a, n]) => `${allianceName(a)} ${n} ${l.campNpShort}`).join(', '))
  return parts.join(' · ')
}

const back = computed(() => reopenable(state.value))
const reopening = ref(false)
async function reopen() {
  const edits = reopenPhase(entry.value.events, state.value)
  reopening.value = false
  if (edits.length) await act('amend', { edits })
}
</script>
