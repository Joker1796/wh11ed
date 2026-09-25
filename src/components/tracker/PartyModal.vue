<template>
  <BaseModal
    :title="labels.partyTitle"
    max-width="440px"
    @close="$emit('close')"
  >
    <div class="modal-body">
      <p class="pt-hint">
        {{ labels.partyHint }}
      </p>

      <!-- Not shared yet: the host's way in. Signed out it is shown disabled with the reason —
           the server carries the link between the phones, so there is no offline version. A
           handle the host revoked or ended is still on the game until the reader lets go of it. -->
      <template v-if="!active">
        <p
          v-if="party"
          class="pt-note pt-gone"
        >
          {{ party.revoked ? labels.partyStatusRevoked : labels.partyStatusEnded }}
          <button
            class="btn-ghost pt-small"
            @click="onLeave"
          >
            {{ labels.partyLeave }}
          </button>
        </p>
        <p
          v-if="!canShare"
          class="pt-note"
        >
          {{ labels.partySignIn }}
        </p>
        <button
          v-else
          class="btn-primary pt-share"
          :disabled="sharing"
          @click="onShare"
        >
          {{ labels.partyShare }}
        </button>
      </template>

      <template v-else>
        <!-- The host's invite: link, its QR, the code — the same block the lobby screen shows
             (PartyInvite.vue), because they are the same invitation. -->
        <PartyInvite
          v-if="isHost && invite"
          :invite="invite"
        />

        <!-- A guest's standing. -->
        <p
          v-else
          class="pt-note"
        >
          {{ labels.partyYouAre }} {{ seatLabel(party.side, party.mi) }}
        </p>

        <!-- Who is in. Every seat is a line; the host's controls sit on each other line. -->
        <div class="pt-members">
          <span class="pt-label">{{ labels.partyMembers }}</span>
          <ul class="pt-list">
            <li
              v-for="m in members"
              :key="m.memberId"
              class="pt-member"
            >
              <span class="pt-mname">
                {{ m.name || seatLabel(m.side, m.mi) }}
                <span
                  v-if="m.you"
                  class="pt-badge"
                >{{ labels.partyYouBadge }}</span>
                <span
                  v-if="m.host"
                  class="pt-badge"
                >{{ labels.partyHostBadge }}</span>
              </span>
              <span class="pt-mseat">{{ m.side == null ? labels.partySeatNone : seatLabel(m.side, m.mi) }}</span>
              <span class="pt-mseen">{{ seenLabel(m) }}</span>
              <div
                v-if="isHost && !m.you"
                class="pt-mactions"
              >
                <select
                  class="pt-seat-pick"
                  :value="seatKey(m.side, m.mi)"
                  :aria-label="labels.partySeatOf"
                  @change="onMove(m, $event.target.value)"
                >
                  <option value="">
                    {{ labels.partySeatNone }}
                  </option>
                  <option
                    v-for="s in seats"
                    :key="s.key"
                    :value="s.key"
                  >
                    {{ s.label }}
                  </option>
                </select>
                <button
                  class="btn-ghost pt-small"
                  @click="onMakeHost(m)"
                >
                  {{ labels.partyMakeHost }}
                </button>
                <button
                  class="btn-ghost pt-small pt-danger"
                  @click="kick(m.memberId)"
                >
                  {{ labels.partyKick }}
                </button>
              </div>
            </li>
          </ul>
        </div>

        <!-- The host's one switch: by default a side another phone sits on is locked on the host's
             screen too (see useParty.canEdit); this keeps both sides open here — for the guest who
             joined to watch, or is busy, and wants the host to keep score. Local to this phone. -->
        <label
          v-if="isHost"
          class="check pt-score-all"
          :class="{ on: party.scoreAll }"
        >
          <input
            type="checkbox"
            :checked="!!party.scoreAll"
            @change="setScoreAll($event.target.checked)"
          >
          <span>
            {{ labels.partyScoreAll }}
            <em class="check-note">{{ labels.partyScoreAllHint }}</em>
          </span>
        </label>

        <div class="pt-actions">
          <template v-if="isHost">
            <button
              class="btn-ghost"
              :title="labels.partyNewLinkHint"
              @click="newInvite({ link: true })"
            >
              {{ labels.partyNewLink }}
            </button>
            <button
              class="btn-ghost pt-danger"
              :title="labels.partyEndHint"
              @click="onEnd"
            >
              {{ labels.partyEnd }}
            </button>
          </template>
          <button
            v-else
            class="btn-ghost pt-danger"
            :title="labels.partyLeaveHint"
            @click="onLeave"
          >
            {{ labels.partyLeave }}
          </button>
        </div>
      </template>

      <p
        v-if="lastError"
        class="pt-err"
      >
        {{ devHint ? `${labels.partyStatusError} — ${lastError}` : labels.partyStatusError }}
      </p>
      <!-- The stand's one trap, said where it bites: with the mock account and no dev token the
           share is a 401, and "sync error" alone sends the tester to the network tab. -->
      <p
        v-if="devHint"
        class="pt-note-small"
      >
        {{ labels.partyDevJwtHint }}
      </p>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BaseModal from '../BaseModal.vue'
import PartyInvite from './PartyInvite.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useParty } from '../../composables/useParty.js'
import { useTracker, membersOf, sideName } from '../../composables/useTracker.js'

const emit = defineEmits(['close'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const {
  party, active, isHost, canShare, lastError, members, invite,
  share, refreshMembers, refreshInvite, newInvite, kick, moveSeat, transferHost, end, leave, setScoreAll,
} = useParty()
const { current } = useTracker()

// DEV only (stripped from production builds): the share failed and no stand token is set.
const devHint = computed(() => {
  if (!import.meta.env.DEV || !lastError.value) return false
  try { return !localStorage.getItem('wh11ed-dev-jwt') } catch { return false }
})

// The clock behind "seen N minutes ago" (the invite block keeps its own for the code's
// expiry — see PartyInvite.vue).
const now = ref(Date.now())

const sharing = ref(false)
async function onShare() {
  sharing.value = true
  await share()
  sharing.value = false
  await refreshMembers()
}

// Seats are named by the game's own players: "Anna" rather than "side 1".
const seats = computed(() => {
  const g = current.value
  if (!g) return []
  const out = []
  g.players.forEach((pl, side) => {
    const ms = membersOf(pl)
    if (g.settings?.gameType === 'doubles') {
      ms.forEach((m, mi) => out.push({ key: seatKey(side, mi), side, mi, label: `${pl.name || pl.teamName || ''} · ${m.name || (mi === 0 ? labels.value.trackerPlayer1 : labels.value.trackerPlayer2)}` }))
    } else {
      out.push({ key: seatKey(side, null), side, mi: null, label: sideName(pl, side, labels.value) })
    }
  })
  return out
})
function seatKey(side, mi) {
  return side == null ? '' : `${side}:${mi ?? ''}`
}
function seatLabel(side, mi) {
  if (side == null) return labels.value.partySeatNone
  const s = seats.value.find((x) => x.side === side && (x.mi ?? null) === (mi ?? null))
  return s ? s.label : current.value?.players?.[side]?.name || ''
}

function seenLabel(m) {
  if (!m.lastSeenAt) return ''
  const min = Math.round((now.value - new Date(m.lastSeenAt).getTime()) / 60000)
  if (min < 2) return labels.value.partySeenNow
  if (min < 120) return labels.value.partySeenAgo.replace('{n}', min)
  return labels.value.partySeenLong
}

async function onMove(m, key) {
  const s = seats.value.find((x) => x.key === key)
  await moveSeat(m.memberId, s ? { side: s.side, mi: s.mi } : { side: null })
}
async function onMakeHost(m) {
  await transferHost(m.memberId)
}
async function onEnd() {
  await end()
  emit('close')
}
async function onLeave() {
  await leave()
  emit('close')
}

// The list and the code are refreshed while the dialog is open — the host reads "who is in"
// here, and the code's ten minutes run out in front of them.
let timer = null
let ticks = 0
onMounted(async () => {
  if (active.value) {
    await Promise.all([refreshMembers(), refreshInvite()])
  }
  timer = setInterval(() => {
    now.value = Date.now()
    if (active.value && ++ticks % 10 === 0) refreshMembers()
  }, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.modal-body { padding: 0.9rem 1rem 1rem; }
.pt-hint {
  margin: 0 0 0.75rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-muted);
}
.pt-note {
  margin: 0;
  padding: 0.6rem 0.7rem;
  background: var(--bg-secondary);
  font-size: 0.82rem;
  color: var(--text-muted);
}
.pt-note-small {
  margin: 0.3rem 0 0;
  font-size: 0.74rem;
  line-height: 1.45;
  color: var(--text-muted);
}
.pt-share { width: 100%; }
.pt-gone {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}
.pt-score-all { margin-top: 0.8rem; }

.pt-members {
  margin-top: 0.8rem;
  padding-top: 0.7rem;
  border-top: 1px solid var(--border);
}
.pt-list { list-style: none; margin: 0; padding: 0; }
.pt-member {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.15rem 0.6rem;
  padding: 0.4rem 0;
  border-bottom: 1px solid var(--border);
  font-size: 0.82rem;
}
.pt-mname { color: var(--text-primary); }
.pt-badge {
  margin-left: 0.3rem;
  padding: 0 0.3rem;
  border: 1px solid var(--border);
  font-size: 0.68rem;
  color: var(--text-muted);
  text-transform: uppercase;
}
.pt-mseat { color: var(--text-muted); text-align: right; }
.pt-mseen { grid-column: 1 / -1; font-size: 0.72rem; color: var(--text-muted); }
.pt-mactions {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.2rem;
}
.pt-seat-pick {
  flex: 1 1 8rem;
  min-width: 0;
  padding: 0.3rem 0.4rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font: inherit;
  font-size: 0.8rem;
}
.pt-small { padding: 0.3rem 0.5rem; font-size: 0.78rem; }
.pt-danger { color: var(--text-muted); }
.pt-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
}
.pt-err {
  margin: 0.6rem 0 0;
  font-size: 0.78rem;
  color: var(--accent);
}
</style>
