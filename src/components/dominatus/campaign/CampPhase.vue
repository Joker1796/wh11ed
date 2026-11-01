<template>
  <section class="camp-block">
    <template v-if="!state.finished">
      <!-- Where the phase stands against the Battle Schedule: played, and whether it can end. -->
      <p
        v-if="progress.due"
        class="camp-line"
        :class="{ 'camp-ready': progress.done }"
      >
        <template v-if="progress.done">
          {{ labels.campScheduleDone }}
        </template>
        <CountText
          v-else
          :text="labels.campScheduleLine"
          :vals="{ n: progress.due, k: playedAll, m: progress.rows.length }"
        />
      </p>

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
      <!-- The Warmaster picks or rolls the Location in a dialog, and may pick again (the Event
           Companion: they may select it instead of rolling). -->
      <button
        v-if="isOwner"
        class="btn-ghost camp-change-loc"
        aria-haspopup="dialog"
        @click="choosing = true"
      >
        {{ location ? labels.campChangeLocation : labels.campChooseLocation }}
      </button>
      <CampLocationPicker
        v-if="choosing"
        :locations="phaseLocations"
        :current="location?.slug || ''"
        @pick="setLocation"
        @close="choosing = false"
      />

      <!-- The Warmaster's pairings this phase (the booklet: they may organise who plays whom). -->
      <div
        v-if="pairings.length || isOwner"
        class="camp-sub"
      >
        <h3 class="camp-sub-head">
          {{ labels.campPairings }}
        </h3>
        <ul
          v-if="pairings.length"
          class="camp-list"
        >
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
                :options="state.players.filter((p) => p.alliance).map((p) => ({ value: p.id, label: p.name }))"
              />
              <CampPick
                v-model="pb"
                :placeholder="labels.campSideB"
                :options="opponentsOf(pa).map((p) => ({ value: p.id, label: p.name }))"
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

      <!-- Step 1 of every phase: the players read their Alliance's Briefing card — a player's own
           open, the rest folded. -->
      <div class="camp-sub">
        <h3 class="camp-sub-head">
          {{ labels.campBriefings }}
        </h3>
        <CampFold
          v-for="b in briefings"
          :key="b.alliance"
          :label="allianceName(b.alliance)"
          :start-open="b.alliance === mine?.alliance"
        >
          <DomBriefingCard :briefing="b" />
        </CampFold>
      </div>

      <!-- Ending the phase: what the fold will make of it, shown before it is done. -->
      <div
        v-if="isOwner && location"
        class="camp-end"
      >
        <p class="camp-line">
          {{ preview }}
        </p>
        <ul
          v-if="ahead"
          class="camp-results"
        >
          <li
            v-for="(n, a) in ahead.np"
            :key="a"
          >
            {{ allianceName(a) }}: {{ labels[`domNarrative${n}`] }}<template v-if="ahead.ascendancy.includes(a)">
              {{ ' · ' + labels.campAscendancyShort }}
            </template>
          </li>
          <li v-if="relicDraws.length">
            {{ labels.campRelicDraws }}: {{ relicDraws.join(', ') }}
          </li>
        </ul>
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

    <!-- The campaign over: Narrative Points over the three phases, most first. -->
    <div
      v-else
      class="camp-sub"
    >
      <h3 class="camp-sub-head">
        {{ labels.campFinal }}
      </h3>
      <ol class="camp-results">
        <li
          v-for="r in finalRows"
          :key="r.alliance"
        >
          <DomAllianceName
            :id="r.alliance"
            :name="allianceName(r.alliance)"
          />
          {{ ' — ' }}<CountText
            :text="`{n} ${labels.campNpShort}`"
            :vals="{ n: r.np }"
          />
        </li>
      </ol>
    </div>

    <!-- Each ended phase: what happened, and each Alliance's Outcome as its Briefing's reverse
         tells it (step 4). The last one open. -->
    <div
      v-if="results.length"
      class="camp-sub"
    >
      <h3 class="camp-sub-head">
        {{ labels.campOutcomes }}
      </h3>
      <CampFold
        v-for="r in results"
        :key="r.phase"
        :label="phaseLabel(r.phase)"
        :start-open="r.phase === lastResult"
      >
        <p class="camp-line">
          {{ resultLine(r) }}
        </p>
        <div class="camp-outcomes">
          <CampOutcomeCard
            v-for="(n, a) in r.np"
            :key="a"
            :alliance="a"
            :phase="r.phase"
            :np="n"
          />
        </div>
      </CampFold>
    </div>

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

    <CampChronicle class="camp-sub" />

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
// The campaign phase: where it stands against the Battle Schedule, its Location (the Warmaster
// picks or rolls), the Warmaster's pairings, each Alliance's Briefing, the end of the phase — with
// the result the fold will reach shown first and the Warmaster's word on a tie nothing else breaks
// — and, once phases have ended, their Outcomes; the campaign's chronicle under it all.
import { ref, computed } from 'vue'
import DomLocationCard from '../DomLocationCard.vue'
import CampLocationPicker from './CampLocationPicker.vue'
import CountText from '../../CountText.vue'
import DomBriefingCard from '../DomBriefingCard.vue'
import DomAllianceName from '../DomAllianceName.vue'
import ConfirmModal from '../../ConfirmModal.vue'
import CampFold from './CampFold.vue'
import CampPick from './CampPick.vue'
import CampOpenForm from './CampOpenForm.vue'
import CampOutcomeCard from './CampOutcomeCard.vue'
import CampChronicle from './CampChronicle.vue'
import { campaignState, reopenable, reopenPhase, scheduleProgress, pairingsNow, amendments, standings } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'

const { entry, state, isOwner, mine, act, labels, deck, allianceName, locationName, playerName, phaseLabel } = useCampaignView()
const override = ref(null)

const phaseLocations = computed(() => deck.value?.locations.filter((l) => l.phase === state.value.phase) || [])
const location = computed(() => deck.value?.locations.find((l) => l.slug === state.value.locations[state.value.phase]) || null)
const stagingBy = computed(() => (state.value.phase > 1 ? state.value.control['cerbera-base'] || null : null))

const progress = computed(() => scheduleProgress(state.value))
const playedAll = computed(() => progress.value.rows.filter((r) => r.played >= r.due).length)

// The Alliances in the campaign, the reader's own first.
const alliancesIn = computed(() => {
  const ids = [...new Set(state.value.players.map((p) => p.alliance).filter(Boolean))]
  const own = mine.value?.alliance
  return own && ids.includes(own) ? [own, ...ids.filter((a) => a !== own)] : ids
})
const briefings = computed(() => alliancesIn.value
  .map((a) => deck.value?.briefings.find((b) => b.alliance === a && b.phase === state.value.phase))
  .filter(Boolean))

// The end of the phase, folded ahead of time — and what it hands out.
const aheadState = computed(() => {
  if (!location.value) return null
  const evs = [...(entry.value.events || []), { seq: Infinity, author: 'owner', type: 'endPhase', payload: { phase: state.value.phase } }]
  return campaignState(evs, deck.value)
})
const ahead = computed(() => aheadState.value?.results[state.value.phase] || null)
const relicDraws = computed(() => (aheadState.value?.pending || [])
  .filter((r) => r.kind === 'relic' && r.phase === state.value.phase)
  .map((r) => `${playerName(r.player)} ${r.draw}`))
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
function endPhase() {
  act('endPhase', { phase: state.value.phase, ...(override.value ? { control: override.value } : {}) })
  override.value = null
}

// Pairings: set by the Warmaster, taken back by an amend of the event that set it.
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

const results = computed(() => Object.entries(state.value.results).map(([phase, r]) => ({ phase: Number(phase), ...r })))
const lastResult = computed(() => Math.max(0, ...results.value.map((r) => r.phase)))
function resultLine(r) {
  const l = labels.value
  const parts = [r.control ? l.campControlled.replace('{a}', allianceName(r.control)).replace('{loc}', locationName(state.value.locations[r.phase])) : l.campNobodyControls]
  if (r.ascendancy.length) parts.push(l.campAscendancy.replace('{a}', r.ascendancy.map(allianceName).join(', ')))
  return parts.join(' · ')
}
const finalRows = computed(() => standings(state.value).sort((a, b) => b.np - a.np))

const back = computed(() => reopenable(state.value))
const reopening = ref(false)
async function reopen() {
  const edits = reopenPhase(entry.value.events, state.value)
  reopening.value = false
  if (edits.length) await act('amend', { edits })
}
</script>
