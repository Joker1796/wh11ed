<template>
  <section class="camp-block">
    <!-- Play a battle of the campaign in the tracker: the phase, the Location, both players and
         their Alliances set up already, and the game knows where to go back to. -->
    <!-- A player enters their own battles unless the campaign leaves battles to the Warmaster. -->
    <p
      v-if="!state.finished && !isOwner && mine && state.battlesBy === 'warmaster'"
      class="camp-dim"
    >
      {{ labels.campBattlesByWarmasterNote }}
    </p>
    <!-- The two buttons said apart in one line above them (owner, 2026-11-03: a player could not
         tell them apart); above, so nothing moves when a form opens under them. -->
    <p
      v-if="!state.finished && (isOwner || mine) && !(!isOwner && state.battlesBy === 'warmaster')"
      class="camp-dim camp-battle-note"
    >
      {{ labels.campPlayOrEnterNote }}
    </p>
    <div
      v-if="!state.finished && (isOwner || mine) && !(!isOwner && state.battlesBy === 'warmaster')"
      class="camp-row camp-battle-actions"
    >
      <button
        type="button"
        class="btn-primary"
        aria-haspopup="dialog"
        :disabled="!state.locations[state.phase]"
        :title="state.locations[state.phase] ? '' : labels.campNoLocation"
        @click="startPlay"
      >
        {{ labels.campPlayBattle }}
      </button>
      <span
        v-if="!state.locations[state.phase]"
        class="camp-dim"
      >{{ labels.campNoLocation }}</span>
      <!-- A battle entered by hand (one played without the tracker); a tracker game is sent from its
           finished screen. A member enters only battles they played (the fold checks). -->
      <CampOpenForm
        v-slot="{ close }"
        :label="labels.campAddBattle"
      >
        <form
          class="camp-form"
          @submit.prevent="add().then((ok) => ok && close())"
        >
          <CampBattleSides
            v-model="sides"
            :fixed="isOwner ? null : mine?.id"
          />
          <label
            v-if="state.strict"
            class="check"
          >
            <input
              v-model="strictPlayed"
              type="checkbox"
            ><span>{{ labels.campStrictOn }}</span>
          </label>
          <CampBattleResult
            v-model:victor="victor"
            v-model:achieved="achieved"
            :name-a="sideName(sides, 'a')"
            :name-b="sideName(sides, 'b')"
            :names="namesOf(sides)"
            :cap="state.phase === 3 ? 2 : 1"
          />
          <button
            class="btn-primary"
            type="submit"
            :disabled="!!battleSidesReason(state, sides) || (state.strict && !strictPlayed)"
          >
            {{ labels.campSendBattle }}
          </button>
        </form>
      </CampOpenForm>
    </div>

    <CampPairings v-if="!state.finished" />

    <CampPick
      v-if="state.players.length > 2 && state.battles.length"
      v-model="only"
      class="camp-filter"
      :placeholder="labels.campAllPlayers"
      :options="[{ value: null, label: labels.campAllPlayers }, ...state.players.map(playerOption)]"
    />
    <p
      v-if="!groups.length"
      class="empty-note"
    >
      {{ labels.campNoBattles }}
    </p>
    <CampFold
      v-for="g in groups"
      :key="g.phase"
      :label="`${phaseLabel(g.phase)} · ${g.battles.length}`"
      :start-open="g.phase === state.phase || state.finished"
    >
      <ul class="camp-list">
        <li
          v-for="x in g.battles"
          :key="x.id"
          class="camp-battle"
          :class="`is-${x.status}`"
          :data-battle="x.id"
        >
          <span>{{ labels.campBattleLine.replace('{a}', sideName(x, 'a')).replace('{b}', sideName(x, 'b')).replace('{res}', outcome(x)) }}</span>
          <span class="camp-dim">{{ labels[`campStatus_${x.status}`] }}<template v-if="x.edited">{{ ' · ' + labels.campEdited }}</template></span>
          <span
            v-if="isOwner && dupes.has(x.id)"
            class="camp-warn"
          >{{ labels.campLikelyDuplicate }}</span>
          <span
            v-if="isOwner"
            class="camp-actions"
          >
            <button
              v-if="isTeam(x) && x.status === 'approved' && !x.rewards"
              type="button"
              class="btn-ghost"
              aria-haspopup="dialog"
              :disabled="locked(x)"
              @click="rewarding = x"
            >{{ labels.campTeamRewards }}</button>
            <template v-if="x.status === 'pending'">
              <button
                type="button"
                class="btn-ghost"
                @click="act('review', { battle: x.id, ok: true })"
              >{{ labels.campApprove }}</button>
              <button
                type="button"
                class="btn-ghost"
                @click="act('review', { battle: x.id, ok: false })"
              >{{ labels.campReject }}</button>
            </template>
            <!-- The Warmaster's corrections (the booklet leaves the campaign to them): the result, or
                 the battle taken out. A closed phase's battles wait for the phase to be reopened. -->
            <ActionMenu
              :open="menuFor === x.id"
              :title="`${sideName(x, 'a')} — ${sideName(x, 'b')}`"
              @update:open="(v) => (menuFor = v ? x.id : null)"
            >
              <template #trigger="{ toggle }">
                <button
                  type="button"
                  class="camp-more"
                  :aria-label="labels.rosterMoreActions"
                  aria-haspopup="menu"
                  @click.stop="toggle"
                >
                  <i class="wi wi-more-v" />
                </button>
              </template>
              <button
                type="button"
                class="act-btn"
                :disabled="locked(x)"
                @click="startEdit(x)"
              >
                {{ labels.campEditBattle }}
              </button>
              <button
                type="button"
                class="act-btn act-danger"
                :disabled="locked(x)"
                @click="menuFor = null; removing = x"
              >
                {{ labels.campDeleteBattle }}
              </button>
              <p
                v-if="locked(x)"
                class="camp-act-note"
              >
                {{ labels.campBattleLocked }}
              </p>
            </ActionMenu>
          </span>
        </li>
      </ul>
    </CampFold>


    <BaseModal
      v-if="editing"
      :title="labels.campEditBattle"
      :subtitle="`${sideName(editing, 'a')} — ${sideName(editing, 'b')}`"
      @close="editing = null"
    >
      <form
        class="modal-body camp-form camp-modal-form"
        @submit.prevent="saveEdit"
      >
        <CampBattleResult
          v-model:victor="edit.victor"
          v-model:achieved="edit.achieved"
          :name-a="sideName(editing, 'a')"
          :name-b="sideName(editing, 'b')"
          :names="namesOf(editing)"
          :cap="editing.phase === 3 ? 2 : 1"
        />
        <p class="camp-dim">
          {{ labels.campEditBattleNote }}
        </p>
        <button
          class="btn-primary"
          type="submit"
          :disabled="!changed"
        >
          {{ labels.trackerSave }}
        </button>
      </form>
    </BaseModal>
    <BaseModal
      v-if="playing"
      :title="labels.campPlayBattle"
      :subtitle="phaseLabel(state.phase)"
      @close="playing = false"
    >
      <form
        class="modal-body camp-form camp-modal-form"
        @submit.prevent="play"
      >
        <CampBattleSides
          v-model="playSides"
          :fixed="fixedSelf?.id"
        />
        <p class="camp-dim">
          {{ labels.campPlayNote }}
        </p>
        <button
          class="btn-primary"
          type="submit"
          :disabled="!!battleSidesReason(state, playSides)"
        >
          {{ labels.campPlayGo }}
        </button>
      </form>
    </BaseModal>
    <CampTeamRewards
      v-if="rewarding"
      :battle="rewarding"
      @close="rewarding = null"
    />
    <ConfirmModal
      v-if="removing"
      :title="labels.campDeleteBattle"
      :message="labels.campDeleteBattleConfirm"
      :confirm-label="labels.campDeleteBattle"
      :cancel-label="labels.trackerCancel"
      @confirm="remove"
      @close="removing = null"
    />
  </section>
</template>

<script setup>
// The campaign's battles: who fought, who won, the Agenda Achieved cards each earned, and whether
// the Warmaster has approved it (only then do its rewards come). Entered here by hand, or sent
// from a finished tracker game (CampSendGame). The Warmaster corrects a battle of the open phase
// or takes it out — an `amend` of the log (battleAmend says what else it touches).
import { ref, reactive, computed, watch } from 'vue'
import ActionMenu from '../../ActionMenu.vue'
import BaseModal from '../../BaseModal.vue'
import ConfirmModal from '../../ConfirmModal.vue'
import CampOpenForm from './CampOpenForm.vue'
import CampPick from './CampPick.vue'
import CampBattleResult from './CampBattleResult.vue'
import CampFold from './CampFold.vue'
import CampPairings from './CampPairings.vue'
import CampBattleSides from './CampBattleSides.vue'
import CampTeamRewards from './CampTeamRewards.vue'
import { battleAmend, battleLocked, likelyDuplicates, pairingsNow, sizeOf, battlePlayers, battleSidesReason, slotOf, isTeam, opponentsOf as pairedOpponents } from '../../../core/dominatus/campaign.js'
import { useRouter } from 'vue-router'
import { useCampaignView } from './useCampaignView.js'

const { entry, state, isOwner, mine, act, labels, playerName, playerOption, phaseLabel, remembered, onAsk, bringIntoView } = useCampaignView()
// A battle entered by hand starts from this device's own player and their pairing, when there are.
const sides = ref({ a: null, b: null })
const a = computed({ get: () => sides.value.a, set: (v) => { sides.value.a = v } })
watch(() => mine.value?.id, (me) => {
  if (a.value || !me) return
  sides.value = sidesFor(me)
}, { immediate: true })
const strictPlayed = ref(false)
const victor = ref('a')
const achieved = ref({ a: 0, b: 0 })

// By phase, newest phase and battle first; one player's only when the filter says so. The filter
// stays as the reader left it; a player no longer in the campaign filters nothing.
const remOnly = remembered('battlesOf')
const only = computed({
  get: () => (state.value.players.some((p) => p.id === remOnly.value) ? remOnly.value : null),
  set: (v) => { remOnly.value = v },
})
const groups = computed(() => {
  const bs = state.value.battles.filter((b) => !only.value || battlePlayers(b).includes(only.value))
  return [3, 2, 1]
    .map((phase) => ({ phase, battles: bs.filter((b) => b.phase === phase).reverse() }))
    .filter((g) => g.battles.length)
})
const dupes = computed(() => likelyDuplicates(state.value))
const namesOf = (b) => Object.fromEntries(['a', 'a2', 'b', 'b2'].filter((k) => b[k]).map((k) => [k, playerName(b[k])]))
const sideName = (b, side) => [b[side], b[`${side}2`]].filter(Boolean).map(playerName).join(' + ')
const rewarding = ref(null)
function sidesFor(id, against = null) {
  const p = id && pairingsNow(state.value).find((p) => !p.played && slotOf(p, id) && (!against || (pairedOpponents(p, id).length === against.length && against.every((x) => pairedOpponents(p, id).includes(x)))))
  if (!p) return { a: id || null, b: null }
  const side = slotOf(p, id)[0]
  const other = side === 'a' ? 'b' : 'a'
  return { a: id, b: p[other], ...(isTeam(p) ? { a2: [p[side], p[`${side}2`]].find((x) => x !== id), b2: p[`${other}2`] } : {}) }
}
function outcome(x) {
  if (!x.victor) return labels.value.campDrawRes
  return labels.value.campWon.replace('{p}', sideName(x, x.victor))
}
async function add() {
  // The phase it is entered for, as a battle from the tracker says: one sent after the phase ended
  // is refused instead of landing in the next (stand walkthrough, 2026-11-06).
  if (!(await act('battle', { id: `b${Date.now().toString(36)}`, phase: state.value.phase, ...sides.value, strict: strictPlayed.value, victor: victor.value, achieved: { ...achieved.value } }))) return false
  sides.value = sidesFor(mine.value?.id)
  victor.value = 'a'
  achieved.value = { a: 0, b: 0 }
  return true
}

const locked = (x) => !!battleLocked(state.value, x)
const menuFor = ref(null)
// The menu hands over to the dialog in one tick (a swap, BaseModal's modalLeave).
const editing = ref(null)
const edit = reactive({ victor: 'a', achieved: { a: 0, b: 0 } })
function startEdit(x) {
  edit.victor = x.victor
  edit.achieved = { ...x.achieved }
  menuFor.value = null
  editing.value = x
}
const changed = computed(() => {
  const x = editing.value
  return !!x && (edit.victor !== x.victor || Object.keys(x.achieved).some((k) => edit.achieved[k] !== x.achieved[k]))
})
async function saveEdit() {
  const edits = battleAmend(entry.value.events, editing.value.id, { victor: edit.victor, achieved: { ...edit.achieved } })
  if (edits.length && (await act('amend', { edits }))) editing.value = null
}
const removing = ref(null)
async function remove() {
  const edits = battleAmend(entry.value.events, removing.value.id, null)
  removing.value = null
  if (edits.length) await act('amend', { edits })
}

// Play a battle in the tracker: this device's own player on the left (a member's, the Warmaster's
// if they play), the opponent from another Alliance.
const router = useRouter()
const playing = ref(false)
const playSides = ref({ a: null, b: null })
const fixedSelf = computed(() => (isOwner.value ? null : mine.value))
// A pairing the Warmaster set for this device's player and not yet played names the opponent.
function startPlay(against = null) {
  playSides.value = sidesFor(mine.value?.id, Array.isArray(against) ? against : null)
  playing.value = true
}
// "What next": the pairing to play opens the dialog with that opponent; battles to count, the first.
onAsk({
  play: (x) => { startPlay(x.players || [x.player]); if (!isTeam(playSides.value)) playSides.value.b = x.player },
  teamRewards: () => { rewarding.value = state.value.battles.find((b) => isTeam(b) && b.status === 'approved' && !b.rewards) || null },
  playMore: () => startPlay(),
  count: () => {
    const first = state.value.battles.find((x) => x.status === 'pending')
    if (first) bringIntoView(`[data-battle="${first.id}"]`)
  },
})
async function play() {
  const s = state.value
  const side = (id) => s.players.find((p) => p.id === id)
  const { playCampaignBattle } = await import('../../../composables/campaignHandoff.js')
  await playCampaignBattle({ campaignId: entry.value.id, phase: s.phase, location: s.locations[s.phase], size: sizeOf(s), strict: s.strict, upgradeLimit: s.upgradeLimit, a: side(playSides.value.a), b: side(playSides.value.b), ...(isTeam(playSides.value) ? { a2: side(playSides.value.a2), b2: side(playSides.value.b2) } : {}) }, router, () => { playing.value = false })
}
</script>
