<template>
  <section class="camp-block">
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
        <span class="camp-dim">{{ labels[`campStatus_${x.status}`] }}<template v-if="x.edited">{{ ' · ' + labels.campEdited }}</template></span>
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
import { ref, reactive, computed } from 'vue'
import ActionMenu from '../../ActionMenu.vue'
import BaseModal from '../../BaseModal.vue'
import ConfirmModal from '../../ConfirmModal.vue'
import CampOpenForm from './CampOpenForm.vue'
import CampPick from './CampPick.vue'
import CampBattleResult from './CampBattleResult.vue'
import { battleAmend, battleLocked } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'

const { entry, state, isOwner, mine, act, labels, playerName, phaseLabel } = useCampaignView()
const a = ref(null)
const b = ref(null)
const victor = ref('a')
const achieved = ref({ a: 0, b: 0 })

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
  if (!(await act('battle', { id: `b${Date.now().toString(36)}`, a: a.value, b: b.value, victor: victor.value, achieved: { ...achieved.value } }))) return false
  a.value = null
  b.value = null
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
</script>
