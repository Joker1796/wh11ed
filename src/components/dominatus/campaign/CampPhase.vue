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
      <p
        v-if="phaseDeadline"
        class="camp-line"
        :class="{ 'camp-late': phaseDeadline.late }"
      >
        {{ phaseDeadline.text }}
      </p>

      <!-- The phase's Location is its card folded to its head (the war zone is a screen high on a
           phone); a tap opens it, as in the Location picker. -->
      <div
        v-if="location"
        class="camp-card-pick camp-loc-now"
        data-press
        role="button"
        tabindex="0"
        :aria-expanded="locOpen"
        @click="toggleLoc"
        @keydown.enter.space.self.prevent="locOpen = !locOpen"
      >
        <DomLocationCard
          :location="location"
          :folded="!locOpen"
        />
      </div>
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
      <!-- The Warmaster's pairing for this device's player; the pairings themselves are on the
           battles tab, beside the battles. -->
      <p
        v-if="myOpponent"
        class="camp-line"
      >
        {{ labels.campMyPairing.replace('{p}', playerName(myOpponent)) }}
      </p>

      <!-- Step 1 of every phase: the players read their Alliance's Briefing card. One at a time,
           the reader's own first; the others a switch away. -->
      <div
        v-if="briefings.length"
        class="camp-sub"
      >
        <h3 class="dgroup-label">
          {{ labels.campBriefings }}
        </h3>
        <div
          v-if="briefings.length > 1"
          class="seg camp-brief-seg"
        >
          <button
            v-for="b in briefings"
            :key="b.alliance"
            type="button"
            :class="{ on: shownBriefing === b }"
            @click="briefFor = b.alliance"
          >
            {{ allianceName(b.alliance) }}
          </button>
        </div>
        <DomBriefingCard
          v-if="shownBriefing"
          :key="shownBriefing.alliance"
          :briefing="shownBriefing"
        />
      </div>
    </template>

    <!-- The Warmaster's part of the phase in one place, under what everyone reads: the Location,
         ending the phase (its forecast in the dialog), undoing the last end. -->
    <div
      v-if="isOwner && (!state.finished || back)"
      class="camp-sub"
    >
      <h3 class="dgroup-label">
        {{ labels.campForWarmaster }}
      </h3>
      <div
        v-if="!state.finished"
        class="camp-wm-row"
      >
        <span class="camp-wm-what">
          <span class="camp-set-label">{{ labels.campLocationLabel }}</span>
          <span>{{ location ? location.name : labels.campNoLocationShort }}</span>
        </span>
        <button
          class="btn-ghost"
          aria-haspopup="dialog"
          @click="choosing = true"
        >
          {{ location ? labels.campChangeLocation : labels.campChooseLocation }}
        </button>
      </div>
      <div
        v-if="!state.finished"
        class="camp-wm-row"
      >
        <span class="camp-wm-what">
          <span class="camp-set-label">{{ phaseLabel(state.phase) }}</span>
          <span :class="{ 'camp-dim': !location }">{{ location ? preview : labels.campEndNeedsLocation }}</span>
        </span>
        <button
          class="btn-primary"
          aria-haspopup="dialog"
          :disabled="!location"
          @click="ending = true"
        >
          {{ labels.campEndPhase.replace('{n}', phaseLabel(state.phase)) }}
        </button>
      </div>
      <!-- The Warmaster undoes the last end of a phase (an `amend`, reopenPhase): not under a
           battle of the phase after it. -->
      <div
        v-if="back"
        class="camp-wm-row"
      >
        <span
          v-if="back.blocked"
          class="camp-dim"
        >{{ labels.campReopenBlocked }}</span>
        <button
          class="btn-ghost"
          :disabled="back.blocked"
          @click="reopening = true"
        >
          {{ labels.campReopen.replace('{n}', phaseLabel(back.phase)) }}
        </button>
      </div>
    </div>
    <CampLocationPicker
      v-if="choosing"
      :locations="phaseLocations"
      :current="location?.slug || ''"
      @pick="setLocation"
      @close="choosing = false"
    />
    <!-- Ending the phase: what the fold will make of it, shown before it is done, and the
         Warmaster's word on a tie nothing else breaks. -->
    <BaseModal
      v-if="ending"
      :title="labels.campEndPhase.replace('{n}', phaseLabel(state.phase))"
      max-width="480px"
      @close="ending = false"
    >
      <div class="modal-body camp-end-body">
        <p class="camp-line">
          {{ preview }}
        </p>
        <table
          v-if="ahead"
          class="camp-table"
        >
          <thead>
            <tr>
              <th>{{ labels.campAlliance }}</th>
              <th>{{ labels.campNpShort }}</th>
              <th>{{ labels.campAscendancyShort }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(n, a) in ahead.np"
              :key="a"
            >
              <th>{{ allianceName(a) }}</th>
              <td class="camp-num-cell">
                {{ n }}
              </td>
              <td>{{ ahead.ascendancy.includes(a) ? '✓' : '' }}</td>
            </tr>
          </tbody>
        </table>
        <p
          v-if="relicDraws.length"
          class="camp-line"
        >
          {{ labels.campRelicDraws }}: {{ relicDraws.join(', ') }}
        </p>
        <template v-if="tied.length > 1">
          <span class="camp-set-label">{{ labels.campTieWho }}</span>
          <div class="seg">
            <button
              v-for="a in tied"
              :key="a"
              type="button"
              :class="{ on: override === a }"
              @click="override = a"
            >
              {{ allianceName(a) }}
            </button>
          </div>
        </template>
      </div>
      <footer class="camp-draw-foot">
        <button
          class="btn-primary"
          :disabled="tied.length > 1 && !override"
          @click="endPhase"
        >
          {{ labels.campEndPhase.replace('{n}', phaseLabel(state.phase)) }}
        </button>
      </footer>
    </BaseModal>

    <!-- The campaign over: Narrative Points over the three phases, most first. Its own condition:
         a v-else here once hung off the Warmaster's block and showed in a new campaign. -->
    <div
      v-if="state.finished"
      class="camp-sub"
    >
      <h3 class="dgroup-label">
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
      <h3 class="dgroup-label">
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
// The campaign phase. On top what every player reads: where the phase stands against the Battle
// Schedule, its Location, their pairing, the Briefings. Under it the Warmaster's block: the
// Location (picked or rolled), ending the phase — the result the fold will reach shown in the
// dialog first, with the Warmaster's word on a tie nothing else breaks — and undoing the last end.
// Then the Outcomes of the ended phases and the chronicle. (Owner, 2026-11-01: the Warmaster's
// buttons sat between the content, and the forecast read as part of the Briefings.)
import { ref, computed } from 'vue'
import DomLocationCard from '../DomLocationCard.vue'
import CampLocationPicker from './CampLocationPicker.vue'
import CountText from '../../CountText.vue'
import DomBriefingCard from '../DomBriefingCard.vue'
import DomAllianceName from '../DomAllianceName.vue'
import ConfirmModal from '../../ConfirmModal.vue'
import CampFold from './CampFold.vue'
import BaseModal from '../../BaseModal.vue'
import CampOutcomeCard from './CampOutcomeCard.vue'
import CampChronicle from './CampChronicle.vue'
import { campaignState, reopenable, reopenPhase, scheduleProgress, pairingsNow, standings } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'

const { entry, state, isOwner, mine, act, labels, deck, allianceName, locationName, playerName, phaseLabel, remembered, onAsk, phaseDeadline } = useCampaignView()
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
// The Alliance last switched to stays (a player reads their own one all campaign).
const briefFor = remembered('briefing')
const shownBriefing = computed(() => briefings.value.find((b) => b.alliance === briefFor.value) || briefings.value[0] || null)

// The Location card opens on a tap and stays as the reader left it; a tap on a keyword or a mark
// inside it is theirs.
const locOpen = remembered('locationOpen')
function toggleLoc(ev) {
  if (ev.target.closest('.keyword, [data-kw-open], a, button')) return
  locOpen.value = !locOpen.value
}

// The opponent the Warmaster paired this device's player with, while the battle is still to play.
const myOpponent = computed(() => {
  const me = mine.value?.id
  const x = me && pairingsNow(state.value).find((p) => !p.played && (p.a === me || p.b === me))
  return x ? (x.a === me ? x.b : x.a) : null
})

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
const ending = ref(false)
// "What next": the Warmaster's Location and end of the phase open their dialogs.
onAsk({
  location: () => { choosing.value = true },
  endPhase: () => { if (location.value) ending.value = true },
})
async function setLocation(slug) {
  if (slug === location.value?.slug || (await act('location', { phase: state.value.phase, slug }))) choosing.value = false
}
function endPhase() {
  act('endPhase', { phase: state.value.phase, ...(override.value ? { control: override.value } : {}) })
  override.value = null
  ending.value = false
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
