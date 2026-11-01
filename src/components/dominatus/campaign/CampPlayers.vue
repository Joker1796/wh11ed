<template>
  <section class="camp-block">
    <!-- The players by Alliance, a column each on a desk, the Alliance's emblem and name over it. -->
    <p
      v-if="!groups.length"
      class="empty-note"
    >
      {{ labels.campNoPlayers }}
    </p>
    <div
      v-else
      class="camp-allies"
    >
      <section
        v-for="g in groups"
        :key="g.id || 'none'"
        class="camp-ally"
      >
        <h3 class="camp-ally-head">
          <DomAllianceName
            :id="g.id"
            :name="g.id ? allianceName(g.id) : '—'"
            big
          />
        </h3>
        <ul class="camp-list">
          <li
            v-for="p in g.players"
            :key="p.id"
            class="camp-player"
          >
            <!-- The name, then on the right the counted battles (won–drawn–lost); the faction under
                 the name. What a player gains over the campaign follows: Agenda Achieved, cards. -->
            <div class="camp-player-head">
              <strong>{{ p.name || p.id }}</strong>
              <span
                v-if="p.id === mine?.id"
                class="camp-you"
              >{{ labels.campYou }}</span>
              <span
                class="camp-record"
                :title="labels.campRecordTitle"
              >{{ recordLine(p.id) }}</span>
              <!-- The Warmaster edits anyone and holds their cards; a player edits themselves. -->
              <ActionMenu
                v-if="isOwner || p.id === mine?.id"
                :open="menuFor === p.id"
                :title="p.name || p.id"
                @update:open="(v) => (menuFor = v ? p.id : null)"
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
                  @click="startEdit(p)"
                >
                  {{ labels.campEditPlayer }}
                </button>
                <button
                  v-if="isOwner"
                  class="act-btn"
                  @click="startCards(p)"
                >
                  {{ labels.campPlayerCards }}
                </button>
                <button
                  v-if="isOwner"
                  class="act-btn act-danger"
                  :disabled="!removable(state, p.id)"
                  @click="menuFor = null; removing = p"
                >
                  {{ labels.campRemovePlayer }}
                </button>
                <p
                  v-if="isOwner && !removable(state, p.id)"
                  class="camp-act-note"
                >
                  {{ labels.campRemovePlayerLocked }}
                </p>
              </ActionMenu>
            </div>
            <div
              v-if="factionOf(p)"
              class="camp-faction"
            >
              <FactionBadge :faction="factionOf(p)" />
              {{ factionOf(p).name }}
            </div>
            <!-- The Battle Schedule: this phase's battles played of those due. -->
            <span
              v-if="!state.finished && p.alliance && state.schedule[state.phase - 1]"
              class="camp-dim camp-played"
              :class="{ 'is-done': playedIn(state, p.id) >= state.schedule[state.phase - 1] }"
            ><CountText
              :text="labels.campPlayedOf"
              :vals="{ k: playedIn(state, p.id), n: state.schedule[state.phase - 1] }"
            /></span>
            <span
              v-if="p.agenda.length"
              class="camp-badge"
            >{{ labels.domAgendaAchieved }} {{ p.agenda.length }}</span>
            <!-- Each card held opens its text, as a card's corner mark does. -->
            <p
              v-if="p.upgrades.length"
              class="camp-cards"
            >
              <button
                v-for="slug in p.upgrades"
                :key="slug"
                type="button"
                class="camp-card"
                data-kw-open
                aria-haspopup="dialog"
                @click.stop="showUpgrade(slug, $event)"
              >
                {{ upgradeName(slug) }}
              </button>
            </p>
          </li>
        </ul>
      </section>
    </div>

    <!-- On one line: add a player (the Warmaster anyone, a player who joined by the link
         themselves, once) and hand out the links. -->
    <div class="camp-row camp-player-actions">
      <CampOpenForm
        v-if="isOwner || (entry.role === 'member' && !mine)"
        v-slot="{ close }"
        :label="isOwner ? labels.campAddPlayer : labels.campJoinAs"
        :primary="!isOwner"
      >
        <form
          class="camp-form"
          @submit.prevent="add().then((ok) => ok && close())"
        >
          <input
            v-model.trim="name"
            class="form-input"
            type="text"
            maxlength="40"
            :placeholder="labels.campPlayerName"
            :aria-label="labels.campPlayerName"
          >
          <CampFactionPick v-model="faction" />
          <div class="seg">
            <button
              v-for="a in alliances"
              :key="a.id"
              type="button"
              :class="{ on: alliance === a.id }"
              @click="alliance = a.id"
            >
              <DomAllianceName
                :id="a.id"
                :name="a.name"
              />
            </button>
          </div>
          <button
            class="btn-primary"
            type="submit"
            :disabled="!name || !alliance"
          >
            {{ isOwner ? labels.campAddPlayer : labels.campJoinAs }}
          </button>
        </form>
      </CampOpenForm>
      <CampShare />
    </div>

    <BaseModal
      v-if="editing"
      :title="labels.campEditPlayer"
      :subtitle="editing.name"
      @close="editing = null"
    >
      <form
        class="modal-body camp-form camp-modal-form"
        @submit.prevent="saveEdit"
      >
        <input
          v-model.trim="edit.name"
          class="form-input"
          type="text"
          maxlength="40"
          :placeholder="labels.campPlayerName"
          :aria-label="labels.campPlayerName"
        >
        <CampFactionPick v-model="edit.faction" />
        <!-- Grouping the players is the Warmaster's (the Event Companion: they may require a player
             to change their Alliance). -->
        <div
          v-if="isOwner"
          class="camp-num"
        >
          <span>{{ labels.campAlliance }}</span>
          <div class="seg">
            <button
              v-for="a in alliances"
              :key="a.id"
              type="button"
              :class="{ on: edit.alliance === a.id }"
              @click="edit.alliance = a.id"
            >
              <DomAllianceName
                :id="a.id"
                :name="a.name"
              />
            </button>
          </div>
        </div>
        <button
          class="btn-primary"
          type="submit"
          :disabled="!edit.name"
        >
          {{ labels.trackerSave }}
        </button>
      </form>
    </BaseModal>

    <!-- The Warmaster's hand on a player's cards (`adjust`): what they hold and their Agenda
         Achieved cards, set without a battle. -->
    <BaseModal
      v-if="carding"
      :title="labels.campPlayerCards"
      :subtitle="carding.name"
      @close="carding = null"
    >
      <form
        class="modal-body camp-form camp-modal-form"
        @submit.prevent="saveCards"
      >
        <p class="camp-dim">
          {{ labels.campPlayerCardsNote }}
        </p>
        <ul
          v-if="cards.upgrades.length"
          class="camp-held"
        >
          <!-- A card taken off stays on its line, struck through, until Save: nothing leaves the
               player before that, and "Put back" undoes it in place. -->
          <li
            v-for="slug in cards.upgrades"
            :key="slug"
            :class="{ 'is-off': cards.off.includes(slug) }"
          >
            <span class="camp-held-name">{{ upgradeName(slug) }}</span>
            <button
              v-if="cards.off.includes(slug)"
              type="button"
              class="camp-held-back"
              @click="cards.off = cards.off.filter((u) => u !== slug)"
            >
              {{ labels.campPutBack }}
            </button>
            <button
              v-else
              type="button"
              class="camp-held-x"
              :aria-label="labels.campRemoveCard.replace('{card}', upgradeName(slug))"
              @click="takeOff(slug)"
            >
              <i class="wi wi-close" />
            </button>
          </li>
        </ul>
        <button
          type="button"
          class="btn-ghost"
          aria-haspopup="dialog"
          @click="adding = true"
        >
          + {{ labels.campAddCard }}
        </button>
        <label class="camp-num">
          <span>{{ labels.domAgendaAchieved }}</span>
          <NumberStepper
            :model-value="cards.agenda"
            :min="0"
            :max="MAX_AGENDA_ACHIEVED"
            @update:model-value="(v) => (cards.agenda = v)"
          />
        </label>
        <button
          class="btn-primary"
          type="submit"
        >
          {{ labels.trackerSave }}
        </button>
      </form>
    </BaseModal>
    <CampCardPicker
      v-if="adding"
      :held="cards.upgrades"
      :subtitle="carding?.name || ''"
      @pick="(slug) => { cards.upgrades.push(slug); adding = false }"
      @close="adding = false"
    />
    <ConfirmModal
      v-if="removing"
      :title="labels.campRemovePlayer"
      :message="labels.campRemovePlayerConfirm.replace('{p}', removing.name || removing.id)"
      :confirm-label="labels.campRemovePlayer"
      :cancel-label="labels.trackerCancel"
      @confirm="remove"
      @close="removing = null"
    />
  </section>
</template>

<script setup>
// The campaign's players, their Alliance, the Upgrade cards they hold and their Agenda Achieved
// cards. A player who joined by the link registers themselves here; the fold lets a member speak
// for that one player only. Each player's "…": edit (name, faction; the Alliance the Warmaster's),
// and for the Warmaster the player's cards by hand and taking out a player with no battles.
import { ref, reactive, computed } from 'vue'
import ActionMenu from '../../ActionMenu.vue'
import BaseModal from '../../BaseModal.vue'
import ConfirmModal from '../../ConfirmModal.vue'
import NumberStepper from '../../tracker/NumberStepper.vue'
import DomAllianceName from '../DomAllianceName.vue'
import CampOpenForm from './CampOpenForm.vue'
import CampShare from './CampShare.vue'
import CampCardPicker from './CampCardPicker.vue'
import CountText from '../../CountText.vue'
import CampFactionPick from './CampFactionPick.vue'
import FactionBadge from '../../FactionBadge.vue'
import { recordOf, removable, removePlayer, playedIn, MAX_AGENDA_ACHIEVED } from '../../../core/dominatus/campaign.js'
import { factionIndexBySlug } from '../../../data/factionsIndex.js'
import { useCampaignView } from './useCampaignView.js'

const { entry, state, isOwner, mine, act, labels, deck, allianceName, upgradeName, showUpgrade } = useCampaignView()
const name = ref('')
const alliance = ref(null)
const faction = ref(null)
const factionOf = (p) => (p.faction ? factionIndexBySlug(p.faction) : null)
const recordLine = (id) => { const r = recordOf(state.value, id); return `${r.won}–${r.drawn}–${r.lost}` }
const alliances = computed(() => deck.value?.alliances || [])
// The Alliances that have players, in the deck's order; anyone not yet in one last.
const groups = computed(() => {
  const players = state.value.players
  const out = alliances.value.map((a) => ({ id: a.id, players: players.filter((p) => p.alliance === a.id) }))
  out.push({ id: null, players: players.filter((p) => !p.alliance) })
  return out.filter((g) => g.players.length)
})

async function add() {
  const id = isOwner.value ? `p${Date.now().toString(36)}` : `m-${entry.value.memberId}`
  if (!(await act('player', { id, name: name.value, alliance: alliance.value, faction: faction.value }))) return false
  name.value = ''
  alliance.value = null
  faction.value = null
  return true
}

const menuFor = ref(null)
// The menu hands over to the dialog in one tick (a swap, BaseModal's modalLeave).
const editing = ref(null)
const edit = reactive({ name: '', faction: null, alliance: null })
function startEdit(p) {
  Object.assign(edit, { name: p.name, faction: p.faction, alliance: p.alliance })
  menuFor.value = null
  editing.value = p
}
async function saveEdit() {
  const p = editing.value
  const payload = { id: p.id, name: edit.name, faction: edit.faction }
  if (isOwner.value) payload.alliance = edit.alliance
  if (await act('player', payload)) editing.value = null
}

const carding = ref(null)
const cards = reactive({ upgrades: [], off: [], agenda: 0 })
const adding = ref(false)
function startCards(p) {
  cards.upgrades = [...p.upgrades]
  cards.off = []
  cards.agenda = p.agenda.length
  menuFor.value = null
  carding.value = p
}
// A card added in this dialog and taken off again simply goes; one the player held waits struck
// through until Save.
function takeOff(slug) {
  if (carding.value.upgrades.includes(slug)) cards.off.push(slug)
  else cards.upgrades = cards.upgrades.filter((u) => u !== slug)
}
async function saveCards() {
  const upgrades = cards.upgrades.filter((u) => !cards.off.includes(u))
  if (await act('adjust', { player: carding.value.id, upgrades, agenda: cards.agenda })) carding.value = null
}

const removing = ref(null)
async function remove() {
  const edits = removePlayer(entry.value.events, removing.value.id)
  removing.value = null
  if (edits.length) await act('amend', { edits })
}
</script>
