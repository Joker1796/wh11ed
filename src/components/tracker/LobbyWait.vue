<template>
  <div class="lw">
    <div class="lw-card">
      <span
        class="lw-dot"
        aria-hidden="true"
      />
      <h2 class="lw-title">
        {{ title }}
      </h2>
      <p class="lw-body">
        {{ body }}
      </p>

      <!-- The side as it was sent, so the wait is not a blank screen: what this phone confirmed
           is exactly what the host is looking at. -->
      <ul
        v-if="summary.length"
        class="lw-summary"
      >
        <li
          v-for="(line, n) in summary"
          :key="n"
        >
          {{ line }}
        </li>
      </ul>

      <p
        v-if="notice"
        class="lw-notice"
        :class="{ deny: myRequestDenied || hostQuiet }"
      >
        {{ notice }}
      </p>

      <div class="lw-sync">
        <SyncIndicator />
      </div>

      <div class="lw-actions">
        <!-- One button, two meanings: while the host is still on the armies step a change is
             simply taken; after that it is a request the host answers. -->
        <button
          v-if="canChange"
          class="btn-primary"
          :disabled="myRequestPending"
          @click="change"
        >
          {{ canReopenFreely ? labels.lobbyWaitEdit : labels.lobbyWaitRequest }}
        </button>
        <button
          v-else-if="!amEditor"
          class="btn-ghost"
          @click="takeOverOpen = true"
        >
          {{ labels.lobbyTakeOver }}
        </button>
        <button
          class="btn-ghost"
          @click="leaveOpen = true"
        >
          {{ labels.lobbyLeave }}
        </button>
      </div>
    </div>

    <ConfirmModal
      v-if="takeOverOpen"
      :title="labels.lobbyTakeOver"
      :message="labels.lobbyTakeOverConfirm"
      :confirm-label="labels.lobbyTakeOver"
      :cancel-label="labels.trackerCancel"
      @confirm="doTakeOver"
      @cancel="takeOverOpen = false"
    />
    <ConfirmModal
      v-if="leaveOpen"
      :title="labels.lobbyLeave"
      :message="labels.lobbyLeaveConfirm"
      :confirm-label="labels.lobbyLeave"
      :cancel-label="labels.trackerCancel"
      @confirm="doLeave"
      @cancel="leaveOpen = false"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import ConfirmModal from '../ConfirmModal.vue'
import SyncIndicator from './SyncIndicator.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'
import { useLobby } from '../../composables/useLobby.js'
import { useParty } from '../../composables/useParty.js'
import { FACTIONS } from '../../composables/trackerFactions.js'

// What a guest sees between "Done" and the first battle round: its side as it was sent, and the
// one thing it may still do — ask to change it. The screen is deliberately quiet; the game opens
// here by itself when the host starts it (the shared slice's phase arrives on the next tick).
const emit = defineEmits(['edit'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current } = useTracker()
const {
  mySide, isEditor, isReady, editorName, canReopenFreely, reopen, requestReopen,
  myRequestPending, myRequestDenied, takeOver,
} = useLobby()
const { leave, members, refreshMembers } = useParty()

// A lobby whose host closed the app leaves everyone else waiting on nothing, and nothing else on
// this screen would ever say so. The member list already carries `lastSeenAt`; asking for it
// twice a minute while this screen is up is the cheapest honest answer. "Leave" is beside it.
const QUIET_MS = 3 * 60 * 1000
const now = ref(Date.now())
let timer = null
onMounted(() => {
  refreshMembers()
  timer = setInterval(() => { now.value = Date.now(); refreshMembers() }, 30000)
})
onUnmounted(() => clearInterval(timer))
const hostQuiet = computed(() => {
  const host = members.value.find((m) => m.host)
  const seen = host?.lastSeenAt ? new Date(host.lastSeenAt).getTime() : 0
  return !!seen && now.value - seen > QUIET_MS
})

const takeOverOpen = ref(false)
const leaveOpen = ref(false)

const me = computed(() => current.value?.players?.[mySide.value] || null)
const amEditor = computed(() => isEditor(mySide.value))
const confirmed = computed(() => isReady(mySide.value))
// A phone that neither edits nor has confirmed is the partner of whoever does: it waits on them,
// not on the host.
const canChange = computed(() => amEditor.value && confirmed.value)

const title = computed(() => (amEditor.value ? labels.value.lobbyWaitTitle : labels.value.lobbyWaitPartner))
const body = computed(() => {
  if (!amEditor.value) {
    return labels.value.lobbyWaitHeld.replace('{name}', editorName(mySide.value) || labels.value.partyHostBadge)
  }
  return labels.value.lobbyWaitBody
})
const notice = computed(() => {
  if (hostQuiet.value) return labels.value.lobbyHostQuiet
  if (myRequestDenied.value) return labels.value.lobbyWaitRequestDenied
  if (myRequestPending.value) return labels.value.lobbyWaitRequestSent
  return ''
})

function factionName(slug) {
  return FACTIONS.find((f) => f.slug === slug)?.name || ''
}
// The armies of this side: itself in singles, both members in doubles.
const summary = computed(() => {
  const p = me.value
  if (!p) return []
  const armies = Array.isArray(p.members) && current.value?.settings?.gameType === 'doubles' ? p.members : [p]
  return armies
    .map((m) => [m.name, factionName(m.factionSlug), m.roster?.name].filter(Boolean).join(' · '))
    .filter(Boolean)
})

function change() {
  if (canReopenFreely.value) {
    reopen(mySide.value, me.value?.name || '')
    emit('edit')
    return
  }
  requestReopen(mySide.value)
}
function doTakeOver() {
  takeOverOpen.value = false
  takeOver(mySide.value, me.value?.name || '')
  emit('edit')
}
async function doLeave() {
  leaveOpen.value = false
  await leave()
}
</script>

<style scoped>
.lw {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}
.lw-card {
  width: 100%;
  max-width: 28rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 1.5rem 1.25rem;
  text-align: center;
}
/* The one moving thing on the screen: a slow pulse, so a phone left on the table still reads as
   connected rather than frozen. */
.lw-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: var(--accent);
  animation: lw-pulse 2s ease-in-out infinite;
}
@keyframes lw-pulse {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .lw-dot { animation: none; opacity: 0.8; }
}
.lw-title {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0.6rem 0 0.4rem;
  color: var(--text-primary);
}
.lw-body {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-muted);
}
.lw-summary {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0.75rem 0 0;
  border-top: 1px solid var(--border);
  font-size: 0.9rem;
  color: var(--text-primary);
  display: grid;
  gap: 0.3rem;
}
.lw-notice {
  margin: 1rem 0 0;
  font-size: 0.85rem;
  color: var(--text-muted);
}
.lw-notice.deny { color: var(--danger); }
/* The connection, where a waiting screen most needs it: a phone on the table has to say it is
   still listening. */
.lw-sync {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
/* One row, always: two short buttons on a 390px screen have no business stacking, and the
   waiting screen is the last place that needs to look busy. */
.lw-actions {
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
}
.lw-actions > * {
  padding: 0.45rem 0.9rem;
  font-size: 0.85rem;
  white-space: nowrap;
}
</style>
