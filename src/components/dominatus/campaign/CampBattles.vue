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
          <div class="camp-pair">
            <CampPick
              v-model="a"
              :placeholder="labels.campSideA"
              :options="choosable.map(playerOption)"
            />
            <CampPick
              v-model="b"
              :placeholder="labels.campSideB"
              :options="opponentsOf(a).map(playerOption)"
            />
          </div>
          <CampBattleResult
            v-model:victor="victor"
            v-model:achieved="achieved"
            :name-a="a ? playerName(a) : ''"
            :name-b="b ? playerName(b) : ''"
            :cap="state.phase === 3 ? 2 : 1"
          />
          <button
            class="btn-primary"
            type="submit"
            :disabled="!a || !b"
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
          <span>{{ playerName(x.a) }} — {{ playerName(x.b) }}: {{ outcome(x) }}</span>
          <span class="camp-dim">{{ labels[`campStatus_${x.status}`] }}<template v-if="x.edited">{{ ' · ' + labels.campEdited }}</template></span>
          <span
            v-if="isOwner && dupes.has(x.id)"
            class="camp-warn"
          >{{ labels.campLikelyDuplicate }}</span>
          <span
            v-if="isOwner"
            class="camp-actions"
          >
            <template v-if="x.status === 'pending'">
              <button
                class="btn-ghost"
                @click="act('review', { battle: x.id, ok: true })"
              >{{ labels.campApprove }}</button>
              <button
                class="btn-ghost"
                @click="act('review', { battle: x.id, ok: false })"
              >{{ labels.campReject }}</button>
            </template>
            <!-- The Warmaster's corrections (the booklet leaves the campaign to them): the result, or
                 the battle taken out. A closed phase's battles wait for the phase to be reopened. -->
            <ActionMenu
              :open="menuFor === x.id"
              :title="`${playerName(x.a)} — ${playerName(x.b)}`"
              @update:open="(v) => (menuFor = v ? x.id : null)"
            >
              <template #trigger="{ toggle }">
                <button
                  class="camp-more"
                  :aria-label="labels.rosterMoreActions"
                  aria-haspopup="menu"
                  @click.stop="toggle"
                >
                  <i class="wi wi-more-v" />
                </button>
              </template>
              <button
                class="act-btn"
                :disabled="locked(x)"
                @click="startEdit(x)"
              >
                {{ labels.campEditBattle }}
              </button>
              <button
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
      :subtitle="`${playerName(editing.a)} — ${playerName(editing.b)}`"
      @close="editing = null"
    >
      <form
        class="modal-body camp-form camp-modal-form"
        @submit.prevent="saveEdit"
      >
        <CampBattleResult
          v-model:victor="edit.victor"
          v-model:achieved="edit.achieved"
          :name-a="playerName(editing.a)"
          :name-b="playerName(editing.b)"
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
        <div class="camp-pair">
          <CampPick
            v-model="pa"
            :placeholder="labels.campSideA"
            :disabled="!!fixedSelf"
            :options="(fixedSelf ? [fixedSelf] : state.players.filter((p) => p.alliance)).map(playerOption)"
          />
          <CampPick
            v-model="pb"
            :placeholder="labels.campSideB"
            :options="opponentsOf(pa).map(playerOption)"
          />
        </div>
        <p class="camp-dim">
          {{ labels.campPlayNote }}
        </p>
        <button
          class="btn-primary"
          type="submit"
          :disabled="!pa || !pb"
        >
          {{ labels.campPlayGo }}
        </button>
      </form>
    </BaseModal>
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
import { battleAmend, battleLocked, likelyDuplicates, pairingsNow, sizeOf } from '../../../core/dominatus/campaign.js'
import { useRouter } from 'vue-router'
import { useCampaignView } from './useCampaignView.js'

const { entry, state, isOwner, mine, act, labels, playerName, playerOption, phaseLabel, remembered, onAsk, bringIntoView } = useCampaignView()
// The opponent the Warmaster paired a player with this phase, while that battle is still to play.
function pairedWith(id) {
  const x = id && pairingsNow(state.value).find((p) => !p.played && (p.a === id || p.b === id))
  return x ? (x.a === id ? x.b : x.a) : null
}
// A battle entered by hand starts from this device's own player and their pairing, when there are.
const a = ref(null)
const b = ref(null)
watch(() => mine.value?.id, (me) => {
  if (a.value || !me) return
  a.value = me
  b.value = pairedWith(me)
}, { immediate: true })
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
  const bs = state.value.battles.filter((b) => !only.value || b.a === only.value || b.b === only.value)
  return [3, 2, 1]
    .map((phase) => ({ phase, battles: bs.filter((b) => b.phase === phase).reverse() }))
    .filter((g) => g.battles.length)
})
const dupes = computed(() => likelyDuplicates(state.value))
// A member fights as their own player; the Warmaster enters anyone's battle.
const choosable = computed(() => (isOwner.value ? state.value.players : mine.value ? [mine.value] : []))
// Under pairings (`pairBy` not 'free') a member's battle is with their pair this phase — the
// campaign refuses any other; the Warmaster enters anyone's.
const opponentsOf = (id) => {
  const me = state.value.players.find((p) => p.id === id)
  const all = state.value.players.filter((p) => p.id !== id && p.alliance && p.alliance !== me?.alliance)
  if (isOwner.value || state.value.pairBy === 'free') return all
  const pairs = pairingsNow(state.value).filter((x) => x.a === id || x.b === id).map((x) => (x.a === id ? x.b : x.a))
  return all.filter((p) => pairs.includes(p.id))
}
function outcome(x) {
  if (!x.victor) return labels.value.campDraw
  return labels.value.campWon.replace('{p}', playerName(x[x.victor]))
}
async function add() {
  if (!(await act('battle', { id: `b${Date.now().toString(36)}`, a: a.value, b: b.value, victor: victor.value, achieved: { ...achieved.value } }))) return false
  a.value = mine.value?.id || null
  b.value = pairedWith(a.value)
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
  return !!x && (edit.victor !== x.victor || edit.achieved.a !== x.achieved.a || edit.achieved.b !== x.achieved.b)
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
const pa = ref(null)
const pb = ref(null)
const fixedSelf = computed(() => (isOwner.value ? null : mine.value))
// A pairing the Warmaster set for this device's player and not yet played names the opponent.
function startPlay() {
  pa.value = mine.value?.id || null
  pb.value = pairedWith(pa.value)
  playing.value = true
}
// "What next": the pairing to play opens the dialog with that opponent; battles to count, the first.
onAsk({
  play: (x) => { startPlay(); pb.value = x.player },
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
  await playCampaignBattle({ campaignId: entry.value.id, phase: s.phase, location: s.locations[s.phase], size: sizeOf(s), strict: s.strict, upgradeLimit: s.upgradeLimit, a: side(pa.value), b: side(pb.value) }, router, () => { playing.value = false })
}
</script>
