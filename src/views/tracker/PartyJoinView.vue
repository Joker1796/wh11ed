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
      <p
        v-if="error"
        class="pj-err"
      >
        {{ error }}
      </p>
    </template>

    <!-- Step two: the seat, named by the game's own players. A seat another phone holds is
         shown disabled with who holds it, never hidden — the reader should see the whole table. -->
    <template v-else>
      <h2 class="pj-sub">
        {{ isLobby ? labels.partyJoinPickSeatLobby : labels.partyJoinPickSeat }}
      </h2>
      <ul class="pj-seats">
        <li
          v-for="s in seats"
          :key="s.key"
        >
          <button
            class="pj-seat"
            :class="{ taken: s.takenBy }"
            :disabled="busy || !!s.takenBy"
            @click="onPick(s)"
          >
            <span class="pj-seat-name">{{ s.label }}</span>
            <span
              v-if="s.sub"
              class="pj-seat-sub"
            >{{ s.sub }}</span>
            <span
              v-if="s.takenBy"
              class="pj-seat-taken"
            >{{ labels.partyJoinSeatTaken.replace('{name}', s.takenBy) }}</span>
          </button>
        </li>
      </ul>
      <p
        v-if="error"
        class="pj-err"
      >
        {{ error }}
      </p>
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmModal from '../../components/ConfirmModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useParty } from '../../composables/useParty.js'
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
const joined = ref(null) // the server's answer to /join: slices, members, the member token

function errorText(err) {
  const l = labels.value
  if (err === 'not_found' || err === 'invalid_invite') return l.partyJoinNotFound
  if (err === 'too_many') return l.partyJoinTooMany
  if (err === 'network') return l.partyJoinNetwork
  if (err === 'seat_taken') return l.partyRejoinBlocked
  return l.partyStatusError
}

async function doJoin(credential) {
  busy.value = true
  error.value = ''
  const res = await join(credential)
  busy.value = false
  if (res.error) {
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
          label: m.name || (mi === 0 ? labels.value.trackerPlayer1 : labels.value.trackerPlayer2),
          sub: pl.name || pl.teamName || '',
          takenBy: h ? h.name || labels.value.partyHostBadge : null,
        })
      })
    } else {
      const h = holder(side, null)
      out.push({
        key: `${side}`, side, mi: null,
        label: pl.name || (side === 0 ? labels.value.trackerPlayer1 : labels.value.trackerPlayer2),
        sub: '',
        takenBy: h ? h.name || labels.value.partyHostBadge : null,
      })
    }
  })
  return out
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
  const err = await takeSeat(joined.value, { side: seat.side, mi: seat.mi, name: seat.label })
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
.pj-seat-name { font-size: 1.05rem; font-weight: 600; }
.pj-seat-sub, .pj-seat-taken { font-size: 0.78rem; color: var(--text-muted); }
.pj-seat-taken { color: var(--accent); }
.pj-err {
  margin: 0.6rem 0 0;
  font-size: 0.85rem;
  color: var(--accent);
}
</style>
