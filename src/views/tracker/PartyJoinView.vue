<template>
  <div class="party-join">
    <RouterLink
      class="back"
      to="/tracker"
    >
      <i class="bi bi-chevron-left" /> {{ labels.trackerBackToTracker }}
    </RouterLink>
    <h1 class="pj-title">
      {{ labels.partyJoinTitle }}
    </h1>

    <!-- Step one: the invite. A link brought the reader here with it; otherwise the code. -->
    <template v-if="!joined">
      <p class="pj-hint">
        {{ labels.partyJoinHint }}
      </p>
      <form
        class="pj-code-form"
        @submit.prevent="onCode"
      >
        <input
          v-model="code"
          class="pj-code"
          type="text"
          inputmode="numeric"
          autocomplete="one-time-code"
          maxlength="7"
          placeholder="000 000"
          :aria-label="labels.partyCode"
          :disabled="busy"
        >
        <button
          class="btn-primary"
          type="submit"
          :disabled="busy || digits.length !== 6"
        >
          {{ labels.partyJoinGo }}
        </button>
      </form>
      <ExpandTransition>
        <div
          v-if="error"
          class="pj-err"
        >
          <p>{{ error }}</p>
          <!-- The host plays the other tracker: the same invite, on its site (trackerGen.js). -->
          <a
            v-if="otherGen"
            class="btn-primary pj-other"
            :href="otherHref"
          >
            {{ labels[`partyJoinOpenGen${otherGen}`] }}
          </a>
        </div>
      </ExpandTransition>
    </template>

    <!-- Step two: the seat, named by the game's own players. A seat another phone holds is
         shown disabled with who holds it, never hidden — the reader should see the whole table. -->
    <template v-else>
      <h2 class="pj-sub">
        {{ labels.partyJoinPickSeat }}
      </h2>
      <!-- Doubles: one group per team, under the team's name — four seats in one column read as
           four strangers, and which two play together is the first thing a joining player needs. -->
      <section
        v-for="g in seatGroups"
        :key="g.side"
        class="pj-group"
      >
        <h3
          v-if="g.label"
          class="pj-team"
        >
          {{ g.label }}
        </h3>
        <ul class="pj-seats">
          <li
            v-for="s in g.seats"
            :key="s.key"
          >
            <button
              class="pj-seat"
              :class="{ free: !s.takenBy }"
              :disabled="busy || !!s.takenBy"
              @click="onPick(s)"
            >
              <span class="pj-seat-name">{{ s.label }}</span>
              <span
                v-if="s.takenBy"
                class="pj-seat-taken"
              >{{ labels.partyJoinSeatTaken.replace('{name}', s.takenBy) }}</span>
            </button>
          </li>
        </ul>
      </section>
      <ExpandTransition>
        <p
          v-if="error"
          class="pj-err"
        >
          {{ error }}
        </p>
      </ExpandTransition>
    </template>

    <!-- The reader's own unfinished game stands in the way: it goes to history at its current
         score, or the join is called off. Never silently overwritten. -->
    <ConfirmModal
      v-if="pendingSeat"
      :title="labels.partyJoinTitle"
      :message="labels.partyJoinReplace"
      :confirm-label="labels.partyJoinReplaceConfirm"
      :cancel-label="labels.trackerCancel"
      @confirm="onReplaceConfirmed"
      @close="pendingSeat = null"
    />
  </div>
</template>

<script setup>
import ExpandTransition from '../../components/ExpandTransition.vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmModal from '../../components/ConfirmModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useParty } from '../../composables/useParty.js'
import { SITE_GENS, siteOfGen } from '../../composables/trackerGen.js'
import { useTracker } from '../../composables/useTracker.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { join, takeSeat, peekMembers } = useParty()
const { current, putAwayCurrent } = useTracker()

const code = ref('')
const digits = computed(() => code.value.replace(/\D/g, ''))
const busy = ref(false)
const error = ref('')
const otherGen = ref(0) // the tracker generation the host plays, when it is not this one
// A link brought its invite in the path; a code is typed again there.
const otherHref = computed(() => siteOfGen(otherGen.value) + route.fullPath)
const joined = ref(null) // the server's answer to /join: slices, members, the member token

function errorText(err) {
  const l = labels.value
  if (err === 'not_found' || err === 'invalid_invite') return l.partyJoinNotFound
  if (err === 'too_many') return l.partyJoinTooMany
  if (err === 'network') return l.partyJoinNetwork
  if (err === 'seat_taken') return l.partyRejoinBlocked
  if (err === 'tracker_version') return l[`partyJoinOtherGen${otherGen.value}`] || l.partyStatusError
  return l.partyStatusError
}

async function doJoin(credential) {
  busy.value = true
  error.value = ''
  const res = await join(credential)
  busy.value = false
  if (res.error) {
    otherGen.value = res.error === 'tracker_version' && SITE_GENS.includes(res.gen) ? res.gen : 0
    error.value = errorText(res.error)
    return
  }
  joined.value = res
  // A game still being set up usually has exactly one free seat — the side this phone came to
  // fill. Asking "who are you?" when there is only one answer is a screen for its own sake; the
  // seat list stays for doubles, and for a game already in progress.
  const free = seats.value.filter((s) => !s.takenBy)
  if (isLobby.value && free.length === 1 && !current.value) sit(free[0])
}

// The shared slice says which of the two this is: a lobby, or a game already being played.
const isLobby = computed(() => joined.value?.slices?.shared?.data?.phase === 'setup')

function onCode() {
  if (digits.value.length !== 6) return
  doJoin({ code: digits.value })
}

// The seats, from the game as the server holds it: each side by its player's name (doubles:
// each member of each team), with who already sits there.
// An empty seat reads as a seat ("Player 1's seat"), not as a person called "Player 1" — the
// name sent on sitting down stays the plain "Player 1" until its owner types one (owner, 2026-10-05).
const seatOf = (n) => (n === 0 ? labels.value.partySeat1 : labels.value.partySeat2)
const seats = computed(() => {
  const j = joined.value
  if (!j) return []
  const g = { players: [j.slices.side0?.data, j.slices.side1?.data], settings: j.slices.shared?.data?.settings }
  const holder = (side, mi) => j.members.find((m) => m.side === side && (m.mi ?? null) === (mi ?? null))
  const out = []
  g.players.forEach((pl, side) => {
    if (!pl) return
    if (g.settings?.gameType === 'doubles' && Array.isArray(pl.members)) {
      pl.members.forEach((m, mi) => {
        const h = holder(side, mi)
        out.push({
          key: `${side}:${mi}`, side, mi,
          label: m.name || seatOf(mi),
          name: m.name || (mi === 0 ? labels.value.trackerPlayer1 : labels.value.trackerPlayer2),
          team: pl.teamName || '',
          takenBy: h ? h.name || labels.value.partyHostBadge : null,
        })
      })
    } else {
      const h = holder(side, null)
      out.push({
        key: `${side}`, side, mi: null,
        label: pl.name || seatOf(side),
        name: pl.name || (side === 0 ? labels.value.trackerPlayer1 : labels.value.trackerPlayer2),
        team: '',
        takenBy: h ? h.name || labels.value.partyHostBadge : null,
      })
    }
  })
  return out
})

// The seats by side, for the screen: in doubles each team is its own group under its name; in
// singles the two sides stay one list, as before.
const seatGroups = computed(() => {
  const doubles = joined.value?.slices?.shared?.data?.settings?.gameType === 'doubles'
  if (!doubles) return [{ side: 'all', label: '', seats: seats.value }]
  return [0, 1].map((side) => {
    const list = seats.value.filter((s) => s.side === side)
    return { side, label: list[0]?.team || labels.value.trackerTeamName, seats: list }
  }).filter((g) => g.seats.length)
})

const pendingSeat = ref(null)
function onPick(seat) {
  // A game of the reader's own in progress is not thrown away for a seat at another table.
  if (current.value) {
    pendingSeat.value = seat
    return
  }
  sit(seat)
}
function onReplaceConfirmed() {
  const seat = pendingSeat.value
  pendingSeat.value = null
  putAwayCurrent()
  sit(seat)
}
async function sit(seat) {
  busy.value = true
  error.value = ''
  const err = await takeSeat(joined.value, { side: seat.side, mi: seat.mi, name: seat.name })
  busy.value = false
  if (err) {
    error.value = errorText(err)
    // Someone sat down first: the table is redrawn with who holds what.
    if (err === 'seat_taken') joined.value = { ...joined.value, members: await peekMembers(joined.value) }
    return
  }
  router.replace('/tracker/game')
}

onMounted(() => {
  if (route.params.invite) doJoin({ invite: route.params.invite })
})
</script>

<style scoped>
.party-join { padding-top: 0.5rem; max-width: 520px; margin: 0 auto; }
.pj-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0.5rem 0 0.6rem;
}
.pj-sub {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0.4rem 0 0.6rem;
}
.pj-hint {
  margin: 0 0 0.9rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-muted);
}
.pj-code-form { display: flex; gap: 0.5rem; }
.pj-code {
  flex: 1;
  min-width: 0;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--accent);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 1.3rem;
  letter-spacing: 0.12em;
  text-align: center;
}
.pj-seats { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.5rem; }
.pj-group + .pj-group { margin-top: 1.25rem; }
.pj-team {
  margin: 0 0 0.4rem;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text-muted);
}
.pj-seat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
@media (hover: hover) { .pj-seat:not(:disabled):hover { border-color: var(--accent); } }
.pj-seat:disabled { cursor: default; opacity: 0.6; }
/* A seat nobody holds yet is an open slot, drawn as one: dashed until someone sits there. */
.pj-seat.free { border-style: dashed; border-color: var(--text-muted); }
.pj-seat-name { font-size: 1.05rem; font-weight: 600; }
.pj-seat-taken { font-size: 0.78rem; color: var(--accent-ink); }
.pj-err {
  margin: 0.6rem 0 0;
  font-size: 0.85rem;
  color: var(--danger);
}
.pj-err p { margin: 0; }
.pj-other { display: inline-block; margin-top: 0.6rem; text-decoration: none; }
</style>
