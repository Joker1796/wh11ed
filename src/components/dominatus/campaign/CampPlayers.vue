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
        <!-- The Alliance's standing under its name (owner, 2026-11-05: a tab of its own held one
             short table): Battle Honours this phase over the campaign's, Agenda Achieved, NP, and
             the Locations it controls. -->
        <header class="camp-ally-head">
          <h3>
            <DomAllianceName
              :id="g.id"
              :name="g.id ? allianceName(g.id) : '—'"
              big
            />
          </h3>
          <p
            v-if="g.score"
            class="camp-ally-score"
          >
            <span :title="labels.campHonoursTitle">{{ labels.campHonoursPhase }} <b>{{ g.score.honours }}</b><span class="camp-dim"> / {{ g.score.totalHonours }}</span></span>
            <DomMarkCount
              kind="achieved"
              :n="g.score.agendaAchieved"
            />
            <span :title="labels.campNpTitle">{{ labels.campNpShort }} <b>{{ g.score.np }}</b></span>
            <span
              v-for="l in g.score.locations"
              :key="l"
              class="camp-ally-loc"
            ><i class="wi wi-dom-location" />{{ locationName(l) }}</span>
          </p>
        </header>
        <ul class="camp-list">
          <li
            v-for="p in g.players"
            :key="p.id"
            class="camp-player"
            :data-player="p.id"
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
                  @click="startEdit(p)"
                >
                  {{ labels.campEditPlayer }}
                </button>
                <!-- A roster: attached by the player or the Warmaster when the campaign takes them. -->
                <button
                  v-if="state.roster !== 'none'"
                  type="button"
                  class="act-btn"
                  @click="menuFor = null; rosterFor = p"
                >
                  {{ p.roster ? labels.campRosterReplace : labels.campRosterAttach }}
                </button>
                <button
                  v-if="p.roster"
                  type="button"
                  class="act-btn"
                  @click="menuFor = null; act('roster', { player: p.id, code: null })"
                >
                  {{ labels.campRosterRemove }}
                </button>
                <button
                  v-if="isOwner"
                  type="button"
                  class="act-btn"
                  @click="startCards(p)"
                >
                  {{ labels.campPlayerCards }}
                </button>
                <button
                  v-if="isOwner"
                  type="button"
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
            <!-- The player asks for another faction after their first battle; the Warmaster answers. -->
            <div
              v-if="p.factionAsk"
              class="camp-faction-ask"
            >
              <span class="camp-warn">{{ labels.campFactionAsk.replace('{f}', factionName(p.factionAsk)) }}</span>
              <span
                v-if="isOwner"
                class="camp-actions"
              >
                <button
                  type="button"
                  class="btn-ghost"
                  @click="act('player', { id: p.id, faction: p.factionAsk })"
                >{{ labels.campFactionAskYes }}</button>
                <button
                  type="button"
                  class="btn-ghost"
                  @click="act('player', { id: p.id, factionAsk: null })"
                >{{ labels.campFactionAskNo }}</button>
              </span>
              <span
                v-else
                class="camp-dim"
              >{{ labels.campFactionAskWaiting }}</span>
            </div>
            <!-- The same for the Alliance, when the campaign keeps it (allianceLock). -->
            <div
              v-if="p.allianceAsk"
              class="camp-faction-ask"
            >
              <span class="camp-warn">{{ labels.campAllianceAsk.replace('{a}', allianceName(p.allianceAsk)) }}</span>
              <span
                v-if="isOwner"
                class="camp-actions"
              >
                <button
                  type="button"
                  class="btn-ghost"
                  @click="act('player', { id: p.id, alliance: p.allianceAsk })"
                >{{ labels.campFactionAskYes }}</button>
                <button
                  type="button"
                  class="btn-ghost"
                  @click="act('player', { id: p.id, allianceAsk: null })"
                >{{ labels.campFactionAskNo }}</button>
              </span>
              <span
                v-else
                class="camp-dim"
              >{{ labels.campFactionAskWaiting }}</span>
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
            <!-- Each card held opens its text, as a card's corner mark does. A hand the campaign keeps
                 to its player (`hands: 'hidden'`) is a count to everyone else. -->
            <span
              v-if="p.upgrades.length && !handOpen(p.id)"
              class="camp-badge"
            >{{ labels.campCardsHidden.replace('{n}', p.upgrades.length) }}</span>
            <p
              v-else-if="p.upgrades.length"
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
                <i
                  v-if="upgradeKind(slug)"
                  class="wi"
                  :class="`wi-dom-${upgradeKind(slug)}`"
                  aria-hidden="true"
                /><span>{{ upgradeName(slug) }}</span>
              </button>
            </p>
            <!-- The foot of the card, a strip as on the list of campaigns (owner, 2026-11-05): this
                 phase's battles played of those due — tinted while some are still to play — and the
                 Agenda Achieved cards held, by the deck's mark. -->
            <div
              v-if="dueNow(p) || p.agenda.length"
              class="camp-player-foot"
              :class="{ 'is-todo': dueNow(p) && playedIn(state, p.id) < dueNow(p) }"
            >
              <span v-if="dueNow(p)"><CountText
                :text="labels.campPlayedOf"
                :vals="{ k: playedIn(state, p.id), n: dueNow(p) }"
              /><template v-if="waitingOf(p.id)"> · <CountText
                :text="labels.campPlayedWaiting"
                :vals="{ n: waitingOf(p.id) }"
              /></template></span>
              <DomMarkCount
                v-if="p.agenda.length"
                class="camp-player-agenda"
                kind="achieved"
                :n="p.agenda.length"
              />
            </div>
          </li>
        </ul>
      </section>
    </div>

    <!-- A player who joined by the link and speaks for no one yet may be one the Warmaster entered
         by name: they take that player instead of signing up a second one (owner, 2026-11-05). -->
    <div
      v-if="canTake"
      class="camp-take"
    >
      <p class="camp-dim">
        {{ labels.campTakeNote }}
      </p>
      <div class="camp-row">
        <button
          v-for="p in takeable"
          :key="p.id"
          type="button"
          class="btn-ghost"
          aria-haspopup="dialog"
          @click="taking = p"
        >
          {{ p.name || p.id }}
        </button>
      </div>
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
          <!-- The Warmaster entering themselves says so, or the player is anyone's to take as
               "This is me" (stand walkthrough, 2026-11-06). -->
          <label
            v-if="isOwner && !state.me"
            class="check"
          >
            <input
              v-model="isMe"
              type="checkbox"
            >
            <span>{{ labels.campIsMe }}</span>
          </label>
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
        <CampFactionPick v-model="edit.faction" />
        <p
          v-if="factionLocked"
          class="camp-dim"
        >
          {{ labels.campFactionLockedNote }}
        </p>
        <!-- The Alliance: the Warmaster's to change, or the player's own where the campaign leaves it
             to them (the Event Companion: the Warmaster may require a player to change it). Kept
             after the first battle, a player's change is an ask (allianceLock). -->
        <div
          v-if="pickAlliance"
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
          <p
            v-if="allianceLocked"
            class="camp-dim"
          >
            {{ labels.campAllianceLockedNote }}
          </p>
        </div>
        <!-- Who speaks for the player (`member`): the Warmaster gives the player to an account that
             joined by the link — one they entered by name, or a player who signed up twice. -->
        <label
          v-if="canBeMe(editing)"
          class="check"
        >
          <input
            v-model="edit.isMe"
            type="checkbox"
          >
          <span>{{ labels.campIsMe }}</span>
        </label>
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
      v-if="taking"
      :title="labels.campTakeTitle"
      :message="labels.campTakeConfirm.replace('{p}', taking.name || taking.id)"
      :confirm-label="labels.campTakeYes"
      :cancel-label="labels.trackerCancel"
      @confirm="take"
      @close="taking = null"
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
import DomMarkCount from '../DomMarkCount.vue'
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
import { recordOf, removable, removePlayer, standings, playedIn, takeablePlayers, MAX_AGENDA_ACHIEVED } from '../../../core/dominatus/campaign.js'
import { factionIndexBySlug } from '../../../data/factionsIndex.js'
import { useCampaignView } from './useCampaignView.js'
import { useLocale } from '../../../composables/useLocale.js'

const { entry, state, isOwner, mine, act, labels, deck, allianceName, locationName, upgradeName, upgradeKind, showUpgrade, onAsk, bringIntoView, handOpen } = useCampaignView()
// The players this member may take as theirs (entered by the Warmaster, no one speaking for them).
const takeable = computed(() => takeablePlayers(state.value))
const canTake = computed(() => !isOwner.value && entry.value?.role === 'member' && !mine.value && takeable.value.length > 0)
const taking = ref(null)
async function take() {
  const p = taking.value
  taking.value = null
  await act('player', { id: p.id, member: entry.value.memberId })
}
// "What next": signing up opens the form; taking a player shows the players to take.
const joinForm = ref(null)
onAsk({
  register: () => joinForm.value?.show(),
  take: () => bringIntoView('.camp-take'),
  invite: () => bringIntoView('.camp-share'),
  claimMe: () => { if (takeable.value[0]) bringIntoView(`[data-player="${takeable.value[0].id}"]`) },
  factionAsk: (x) => bringIntoView(`[data-player="${x.player}"]`),
  allianceAsk: (x) => bringIntoView(`[data-player="${x.player}"]`),
})
const factionName = (slug) => factionIndexBySlug(slug)?.name || slug
const { locale } = useLocale()
const name = ref('')
const isMe = ref(false)
const alliance = ref(null)
const faction = ref(null)
const factionOf = (p) => (p.faction ? factionIndexBySlug(p.faction) : null)
// Battles counted toward the schedule that the Warmaster has not counted yet — why "2 of 2" can sit
// beside a record with one battle.
const waitingOf = (id) => state.value.battles.filter((b) => b.phase === state.value.phase && b.status === 'pending' && (b.a === id || b.b === id)).length
// The battles this phase's schedule asks of a player (none once the campaign is over, or for a
// player in no Alliance yet).
const dueNow = (p) => (!state.value.finished && p.alliance && state.value.schedule[state.value.phase - 1]) || 0
const recordLine = (id) => { const r = recordOf(state.value, id); return `${r.won}–${r.drawn}–${r.lost}` }
const alliances = computed(() => deck.value?.alliances || [])
// The Alliances that have players, in the deck's order; anyone not yet in one last.
const groups = computed(() => {
  const players = state.value.players
  const score = new Map(standings(state.value).map((r) => [r.alliance, r]))
  const out = alliances.value.map((a) => ({ id: a.id, players: players.filter((p) => p.alliance === a.id), score: score.get(a.id) }))
  out.push({ id: null, players: players.filter((p) => !p.alliance) })
  return out.filter((g) => g.players.length)
})

// What the campaign leaves to the player: the Alliance (or the Warmaster's), the faction once
// they have played (when the campaign keeps it).
const pickAlliance = computed(() => isOwner.value || state.value.allianceBy !== 'warmaster')
const playedYet = () => !!editing.value && state.value.battles.some((b) => b.status !== 'rejected' && (b.a === editing.value.id || b.b === editing.value.id))
const factionLocked = computed(() => !isOwner.value && state.value.factionLock && playedYet())
const allianceLocked = computed(() => !isOwner.value && state.value.allianceLock && playedYet())

// A roster attached as a snapshot (the share code): this device's saved lists, the player's
// faction first. Its points as the builder last counted them.
const { activeRosters } = useRosters()
const rosterFor = ref(null)
const attaching = ref(false)
const pts = (n) => countLabel(n, labels.value.campPointsForms)
// The roster is a copy made when it was attached; its date says so beside it.
const rosterLine = (r) => {
  const line = labels.value.campRosterLine.replace('{name}', r.name).replace('{pts}', pts(r.points))
  const day = r.at ? copyDay(r.at) : ''
  return day ? `${line} · ${labels.value.campRosterCopyOf.replace('{when}', day)}` : line
}
function copyDay(at) {
  try {
    return new Intl.DateTimeFormat(locale.value === 'ru' ? 'ru-RU' : 'en-GB', { day: '2-digit', month: '2-digit' }).format(new Date(at))
  } catch {
    return ''
  }
}
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
  if (isOwner.value && isMe.value) await act('settings', { me: id })
  isMe.value = false
  name.value = ''
  alliance.value = null
  faction.value = null
  return true
}

const menuFor = ref(null)
// The menu hands over to the dialog in one tick (a swap, BaseModal's modalLeave).
const editing = ref(null)
const edit = reactive({ name: '', faction: null, alliance: null, member: '', isMe: false })
// The Warmaster's own player: one no member speaks for, while the campaign names no other as theirs.
const canBeMe = (p) => isOwner.value && !p.member && (!state.value.me || state.value.me === p.id)
function startEdit(p) {
  Object.assign(edit, { name: p.name, faction: p.factionAsk || p.faction, alliance: p.allianceAsk || p.alliance, member: p.member || '', isMe: state.value.me === p.id })
  menuFor.value = null
  editing.value = p
}
async function saveEdit() {
  const p = editing.value
  const payload = { id: p.id, name: edit.name }
  // Once kept, a player's new faction is an ask the Warmaster answers (the fold); asking for the one
  // they have takes the ask back.
  if (!factionLocked.value || (edit.faction && edit.faction !== (p.factionAsk || p.faction))) payload.faction = edit.faction
  if (isOwner.value) payload.alliance = edit.alliance
  // A player's own: only a change is sent (an ask, once kept — the fold), as for the faction.
  else if (pickAlliance.value && edit.alliance && edit.alliance !== (p.allianceAsk || p.alliance)) payload.alliance = edit.alliance
  if (isOwner.value && edit.member !== (p.member || '')) payload.member = edit.member || null
  if (!(await act('player', payload))) return
  if (canBeMe(p) && edit.isMe !== (state.value.me === p.id) && !(await act('settings', { me: edit.isMe ? p.id : null }))) return
  editing.value = null
}

// The entries a player can be given to (the server's member list, the Warmaster's only — named by
// their account): those not speaking for another player, newest first.
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
      ...(m.name ? { sub: l.campMemberJoined.replace('{when}', joinedAt(m.joinedAt)) } : {}),
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
