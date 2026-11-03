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
                <!-- A roster: attached by the player or the Warmaster when the campaign takes them. -->
                <button
                  v-if="state.roster !== 'none'"
                  class="act-btn"
                  @click="menuFor = null; rosterFor = p"
                >
                  {{ p.roster ? labels.campRosterReplace : labels.campRosterAttach }}
                </button>
                <button
                  v-if="p.roster"
                  class="act-btn"
                  @click="menuFor = null; act('roster', { player: p.id, code: null })"
                >
                  {{ labels.campRosterRemove }}
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
            <!-- The roster attached, as a snapshot anyone in the campaign opens; missing where the
                 campaign requires one. -->
            <a
              v-if="p.roster"
              class="camp-roster"
              :href="`/roster/shared#r=${p.roster.code}`"
            >{{ rosterLine(p.roster) }}</a>
            <span
              v-else-if="state.roster === 'required'"
              class="camp-warn"
            >{{ labels.campRosterMissing }}</span>
            <!-- The Battle Schedule: this phase's battles played of those due. -->
            <span
              v-if="!state.finished && p.alliance && state.schedule[state.phase - 1]"
              class="camp-dim camp-played"
              :class="{ 'is-done': playedIn(state, p.id) >= state.schedule[state.phase - 1] }"
            ><CountText
              :text="labels.campPlayedOf"
              :vals="{ k: playedIn(state, p.id), n: state.schedule[state.phase - 1] }"
            /><template v-if="waitingOf(p.id)"> · <CountText
              :text="labels.campPlayedWaiting"
              :vals="{ n: waitingOf(p.id) }"
            /></template></span>
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
      <p
        v-if="!isOwner && entry.role === 'member' && !mine && state.join === 'closed'"
        class="camp-dim"
      >
        {{ labels.campJoinClosedNote }}
      </p>
      <CampOpenForm
        v-else-if="isOwner || (entry.role === 'member' && !mine)"
        ref="joinForm"
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
          <!-- The Alliance is the player's to pick unless the campaign leaves it to the Warmaster. -->
          <p
            v-if="!pickAlliance"
            class="camp-dim"
          >
            {{ labels.campAllianceByWarmasterNote }}
          </p>
          <div
            v-else
            class="seg"
          >
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
            :disabled="!name || (pickAlliance && !alliance)"
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
        <CampFactionPick
          v-model="edit.faction"
          :disabled="factionLocked"
        />
        <p
          v-if="factionLocked"
          class="camp-dim"
        >
          {{ labels.campFactionLockedNote }}
        </p>
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
        <!-- Who speaks for the player (`member`): the Warmaster gives the player to the entry a
             player's new device made, when the old one is lost (a guest's member lives on one
             device; an account's follows them). -->
        <template v-if="isOwner && memberOptions.length > 1">
          <span class="camp-dim">{{ labels.campPlayerMember }}</span>
          <CampPick
            v-model="edit.member"
            :placeholder="labels.campPlayerMember"
            :options="memberOptions"
          />
          <p class="camp-dim">
            {{ labels.campMemberNote }}
          </p>
        </template>
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
    <BaseModal
      v-if="rosterFor"
      :title="rosterFor.roster ? labels.campRosterReplace : labels.campRosterAttach"
      :subtitle="rosterFor.name"
      @close="rosterFor = null"
    >
      <div class="modal-body camp-modal-form">
        <p class="camp-dim">
          {{ labels.campRosterNote }}
        </p>
        <p
          v-if="!rosterChoices.length"
          class="empty-note"
        >
          {{ labels.campRosterNone }}
        </p>
        <div
          v-else
          class="act-list"
        >
          <button
            v-for="r in rosterChoices"
            :key="r.id"
            type="button"
            class="act-btn"
            :disabled="attaching"
            @click="attachRoster(r)"
          >
            <span class="cpick-two"><span>{{ r.name }}</span><span class="cpick-sub">{{ rosterSub(r) }}</span></span>
          </button>
        </div>
      </div>
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
import CampPick from './CampPick.vue'
import CountText from '../../CountText.vue'
import { useRosters } from '../../../composables/useRosters.js'
import { encodeRoster } from '../../../composables/rosterShare.js'
import { countLabel } from '../../../utils/plural.js'
import CampFactionPick from './CampFactionPick.vue'
import FactionBadge from '../../FactionBadge.vue'
import { recordOf, removable, removePlayer, playedIn, MAX_AGENDA_ACHIEVED } from '../../../core/dominatus/campaign.js'
import { factionIndexBySlug } from '../../../data/factionsIndex.js'
import { useCampaignView } from './useCampaignView.js'
import { useLocale } from '../../../composables/useLocale.js'

const { entry, state, isOwner, mine, act, labels, deck, allianceName, upgradeName, showUpgrade, onAsk } = useCampaignView()
// "What next": signing up opens the form.
const joinForm = ref(null)
onAsk({ register: () => joinForm.value?.show() })
const { locale } = useLocale()
const name = ref('')
const alliance = ref(null)
const faction = ref(null)
const factionOf = (p) => (p.faction ? factionIndexBySlug(p.faction) : null)
// Battles counted toward the schedule that the Warmaster has not counted yet — why "2 of 2" can sit
// beside a record with one battle.
const waitingOf = (id) => state.value.battles.filter((b) => b.phase === state.value.phase && b.status === 'pending' && (b.a === id || b.b === id)).length
const recordLine = (id) => { const r = recordOf(state.value, id); return `${r.won}–${r.drawn}–${r.lost}` }
const alliances = computed(() => deck.value?.alliances || [])
// The Alliances that have players, in the deck's order; anyone not yet in one last.
const groups = computed(() => {
  const players = state.value.players
  const out = alliances.value.map((a) => ({ id: a.id, players: players.filter((p) => p.alliance === a.id) }))
  out.push({ id: null, players: players.filter((p) => !p.alliance) })
  return out.filter((g) => g.players.length)
})

// What the campaign leaves to the player: the Alliance (or the Warmaster's), the faction once
// they have played (when the campaign keeps it).
const pickAlliance = computed(() => isOwner.value || state.value.allianceBy !== 'warmaster')
const factionLocked = computed(() => !isOwner.value && state.value.factionLock && !!editing.value
  && state.value.battles.some((b) => b.status !== 'rejected' && (b.a === editing.value.id || b.b === editing.value.id)))

// A roster attached as a snapshot (the share code): this device's saved lists, the player's
// faction first. Its points as the builder last counted them.
const { activeRosters } = useRosters()
const rosterFor = ref(null)
const attaching = ref(false)
const pts = (n) => countLabel(n, labels.value.campPointsForms)
const rosterLine = (r) => labels.value.campRosterLine.replace('{name}', r.name).replace('{pts}', pts(r.points))
const rosterChoices = computed(() => {
  const f = rosterFor.value?.faction
  return [...activeRosters.value].sort((a, b) => (b.faction === f) - (a.faction === f))
})
function rosterSub(r) {
  const fac = r.faction ? factionIndexBySlug(r.faction)?.name || r.faction : ''
  return [fac, r.summary?.points ? pts(r.summary.points) : ''].filter(Boolean).join(' · ')
}
async function attachRoster(r) {
  attaching.value = true
  try {
    const code = await encodeRoster(r)
    if (await act('roster', { player: rosterFor.value.id, code, name: r.name, points: r.summary?.points || 0, faction: r.faction || null })) rosterFor.value = null
  } finally {
    attaching.value = false
  }
}

async function add() {
  const id = isOwner.value ? `p${Date.now().toString(36)}` : `m-${entry.value.memberId}`
  const payload = { id, name: name.value, faction: faction.value }
  if (pickAlliance.value) payload.alliance = alliance.value
  if (!(await act('player', payload))) return false
  name.value = ''
  alliance.value = null
  faction.value = null
  return true
}

const menuFor = ref(null)
// The menu hands over to the dialog in one tick (a swap, BaseModal's modalLeave).
const editing = ref(null)
const edit = reactive({ name: '', faction: null, alliance: null, member: '' })
function startEdit(p) {
  Object.assign(edit, { name: p.name, faction: p.faction, alliance: p.alliance, member: p.member || '' })
  menuFor.value = null
  editing.value = p
}
async function saveEdit() {
  const p = editing.value
  const payload = { id: p.id, name: edit.name }
  if (!factionLocked.value) payload.faction = edit.faction
  if (isOwner.value) payload.alliance = edit.alliance
  if (isOwner.value && edit.member !== (p.member || '')) payload.member = edit.member || null
  if (await act('player', payload)) editing.value = null
}

// The entries a player can be given to (the server's member list, the Warmaster's only): those not
// speaking for another player, newest first — the one a lost device's owner just made is on top.
const joinedFmt = computed(() => new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-GB', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }))
function joinedAt(at) {
  try {
    return at ? joinedFmt.value.format(new Date(at)).replace(',', '') : ''
  } catch {
    return ''
  }
}
const memberOptions = computed(() => {
  const l = labels.value
  const taken = new Set(state.value.players.filter((x) => x.id !== editing.value?.id && x.member).map((x) => x.member))
  const free = (entry.value?.members || []).filter((m) => !m.revoked && !taken.has(m.memberId)).reverse()
  return [
    { value: '', label: l.campMemberNone },
    ...free.map((m) => ({
      value: m.memberId,
      label: m.name || l.campMemberJoined.replace('{when}', joinedAt(m.joinedAt)),
      sub: m.account ? l.campMemberAccount : l.campMemberDevice,
    })),
  ]
})

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
