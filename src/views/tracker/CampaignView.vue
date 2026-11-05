<template>
  <div class="campaign">
    <div class="camp-hero">
      <RouterLink
        to="/tracker/campaigns"
        class="back"
      >
        ← {{ labels.campTitle }}
      </RouterLink>
      <h1>{{ entry?.name || labels.campTitle }}</h1>
      <span
        v-if="entry"
        class="camp-role"
      >{{ labels[`campRole_${entry.role}`] }}
        <!-- How the open tab works: the same "?" and dialog as the tracker's settings. -->
        <button
          v-if="state"
          type="button"
          class="help-btn camp-help"
          data-press
          aria-haspopup="dialog"
          :aria-label="labels.campHelp"
          :title="labels.campHelp"
          @click="helpOpen = true"
        ><i class="wi wi-help" /></button>
        <!-- The campaign's own actions in its "…" (owner, 2026-11-01): deleting it is the
             Warmaster's, a player or a watcher only takes it off this device. -->
        <ActionMenu
          v-model:open="menuOpen"
          :title="entry.name || labels.campTitle"
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
            v-if="isOwner && state"
            class="act-btn"
            @click="menuOpen = false; router.push(`/tracker/campaigns/${id}/settings`)"
          >
            {{ labels.campSettings }}
          </button>
          <button
            v-if="isOwner"
            class="act-btn act-danger"
            @click="menuOpen = false; confirmDelete = true"
          >
            {{ labels.campDelete }}
          </button>
          <button
            v-else
            class="act-btn"
            @click="menuOpen = false; forget()"
          >
            {{ labels.campForget }}
          </button>
        </ActionMenu>
      </span>
    </div>

    <p
      v-if="!entry && !loading"
      class="empty-note"
    >
      {{ labels.campUnknown }}
    </p>
    <p
      v-else-if="!state"
      class="empty-note"
    >
      {{ labels.campLoading }}
    </p>

    <!-- The campaign in tabs (owner, 2026-11-01), always the same five in the same order; a tab
         that holds something this reader has to do carries the warning mark, and the page opens on
         the first such tab. -->
    <template v-else>
      <!-- The invite opened signed out: the campaign reads, and taking part asks for an account
           (owner, 2026-11-05); signed in, the device joins by itself (refreshAccount). -->
      <CampSignIn
        v-if="entry.invite && status !== 'idle' && status !== 'authed'"
        :text="labels.campSignInToPlay"
      />
      <CampNext
        @go="goStep"
      />
      <PageTabs
        class="camp-tabs"
        :tabs="tabs"
        @select="pickTab"
      />
      <Transition
        name="fade"
        mode="out-in"
        @enter="bringTabsIntoView"
      >
        <CampPhase v-if="tab === 'phase'" />
        <CampStandings v-else-if="tab === 'standings'" />
        <CampBattles v-else-if="tab === 'battles'" />
        <CampPlayers v-else-if="tab === 'players'" />
        <CampRewards v-else />
      </Transition>
    </template>
    <OptionHelpModal
      v-if="helpOpen"
      :title="tabs.find((t) => t.active)?.label || labels.campHelp"
      :text="labels[`campHelp_${tab}`]"
      @close="helpOpen = false"
    />

    <AppToast
      :show="!!error"
      :text="error"
      tone="error"
      @close="error = ''"
    />
    <ConfirmModal
      v-if="confirmDelete"
      :title="labels.campDelete"
      :message="labels.campDeleteConfirm"
      :confirm-label="labels.campDelete"
      :cancel-label="labels.trackerCancel"
      @confirm="remove"
      @close="confirmDelete = false"
    />
  </div>
</template>

<script setup>
// One Dominatus campaign: the Alliances' standing, the phase and its Location, the rewards owed,
// the battles, the players and the links. The log is read on entry and every 20 seconds while the
// page is open (a campaign moves at the pace of games, not of turns); every change is an event
// appended and read back. `?join=` (an invite) and `?t=` (a view link) are taken once and dropped
// from the address, so a shared screenshot of the address bar hands out nothing.
import OptionHelpModal from '../../components/tracker/OptionHelpModal.vue'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmModal from '../../components/ConfirmModal.vue'
import ActionMenu from '../../components/ActionMenu.vue'
import PageTabs from '../../components/PageTabs.vue'
import { bringTabsIntoView } from '../../composables/bringTabsIntoView.js'
import AppToast from '../../components/AppToast.vue'
import CampStandings from '../../components/dominatus/campaign/CampStandings.vue'
import CampNext from '../../components/dominatus/campaign/CampNext.vue'
import CampSignIn from '../../components/dominatus/campaign/CampSignIn.vue'
import CampPhase from '../../components/dominatus/campaign/CampPhase.vue'
import CampRewards from '../../components/dominatus/campaign/CampRewards.vue'
import CampBattles from '../../components/dominatus/campaign/CampBattles.vue'
import CampPlayers from '../../components/dominatus/campaign/CampPlayers.vue'
import { provideCampaignView } from '../../components/dominatus/campaign/useCampaignView.js'
import '../../components/dominatus/dominatus.css'
import '../../components/dominatus/campaign/campaign.css'
import { useCampaigns, setCampaignPref } from '../../composables/useCampaigns.js'
import { phaseEndsByItself } from '../../core/dominatus/campaign.js'
import { useAuth } from '../../composables/useAuth.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const route = useRoute()
const router = useRouter()
const { byId, refreshAccount, joinCampaign, watchCampaign, syncCampaign, appendEvent, deleteCampaign, forgetCampaign, stateOf, myPlayer, waitingFor, noteWaiting } = useCampaigns()
const { status, ensureSession } = useAuth()

const id = computed(() => route.params.id)
const entry = computed(() => byId(id.value))
const state = computed(() => (entry.value ? stateOf(id.value) : null))
const isOwner = computed(() => entry.value?.role === 'owner')
const mine = computed(() => myPlayer(entry.value, state.value))
const error = ref('')
const loading = ref(true)
const confirmDelete = ref(false)
const menuOpen = ref(false)
// What waits for this reader: the rewards they take (all of them for the Warmaster, a member's own),
// the battles the Warmaster has to count.
const waiting = computed(() => waitingFor(entry.value, state.value))
const rewardsWaiting = computed(() => waiting.value.rewards)
const battlesWaiting = computed(() => waiting.value.battles > 0)
// The list and the tracker's home show the mark without folding the log: noted as it changes.
watch(waiting, (w) => { if (state.value) noteWaiting(id.value, w.rewards + w.battles) }, { immediate: true })
// Open on what waits first; it follows the log as it comes in until the reader picks a tab.
const picked = ref(null)
const helpOpen = ref(false)
// With nothing waiting it opens on the tab the reader had last (this device, setCampaignPref).
const tab = computed(() => picked.value || (rewardsWaiting.value ? 'rewards' : battlesWaiting.value ? 'battles' : entry.value?.prefs?.tab || 'phase'))
function pickTab(key) {
  picked.value = key
  setCampaignPref(id.value, 'tab', key)
}
// A step of "What next" pressed: its tab opens and does the step there (onAsk in the tab's block).
const ask = ref(null)
function goStep(step) {
  pickTab(step.tab)
  ask.value = { ...step }
}
const tabs = computed(() => {
  const l = labels.value
  const s = state.value
  const phaseName = s?.finished ? l.campFinished : l.domPhase.replace('{n}', ['I', 'II', 'III'][(s?.phase || 1) - 1])
  return [
    { key: 'phase', label: phaseName, icon: s && !s.finished ? `wi wi-dom-phase-${s.phase}` : '' },
    { key: 'battles', label: l.campBattles, warn: battlesWaiting.value ? l.campWaiting : '' },
    { key: 'players', label: l.campPlayers },
    { key: 'rewards', label: l.campRewardsTab, warn: rewardsWaiting.value ? l.campWaiting : '' },
    // The Alliances' standing last (owner, 2026-11-01).
    { key: 'standings', label: l.campStandings },
  ].map((t) => ({ ...t, active: tab.value === t.key }))
})

// True once the event is in: a form closes only then, keeping what was typed when it failed.
async function act(type, payload) {
  error.value = ''
  try {
    await appendEvent(id.value, type, payload)
    return true
  } catch (e) {
    error.value = labels.value.campFailed.replace('{code}', e.code || 'network')
    return false
  }
}
provideCampaignView({ entry, state, isOwner, mine, act, ask })

// A campaign whose phases end by themselves (`phaseEnd: 'auto'`, owner 2026-11-04): the Warmaster's
// device writes the end once the schedule is played and counted and no tie waits for their word —
// the same event as the phase tab's button. Once a phase: a phase the Warmaster reopened (its end
// taken back) stays open until they end it again by hand.
const endingPhase = ref(0)
watch(() => (isOwner.value && state.value && !loading.value && phaseEndsByItself(state.value) ? state.value.phase : 0), async (phase) => {
  if (!phase || endingPhase.value === phase) return
  if ((entry.value?.events || []).some((e) => e.type === 'endPhase' && e.payload?.phase === phase)) return
  endingPhase.value = phase
  await act('endPhase', { phase })
})

let timer = null
onMounted(async () => {
  try {
    // The Warmaster's reads ride the session, which a page opened from the address bar does not
    // have yet: asked without it, the server answers not_found.
    await ensureSession()
    const { join, t } = route.query
    if (typeof join === 'string') await joinCampaign(id.value, join)
    else if (typeof t === 'string') await watchCampaign(id.value, t)
    if (join || t) router.replace({ query: {} })
    if (byId(id.value)) await syncCampaign(id.value)
  } catch (e) {
    error.value = labels.value.campFailed.replace('{code}', e.code || 'network')
  } finally {
    loading.value = false
  }
  timer = setInterval(() => { if (byId(id.value) && document.visibilityState === 'visible') syncCampaign(id.value).catch(() => {}) }, 20_000)
})
onUnmounted(() => clearInterval(timer))
// A campaign this device has not seen, opened signed in (the Warmaster's, or one the account plays
// in): the account knows it, once the session is back. And an invite opened here signed out is
// taken up once the reader signs in (refreshAccount), so they play at once.
watch(status, async (s) => {
  const c = byId(id.value)
  if (s !== 'authed' || (c && !c.invite)) return
  try {
    await refreshAccount()
    if (byId(id.value)) await syncCampaign(id.value)
  } catch {
    // the page already says what it can
  }
}, { immediate: true })

// The dialog stays up while the server deletes, then closes in the same tick as the page changes:
// closed first, its deferred history pop (useBackToClose) landed after the push and brought the
// reader back to the campaign just deleted.
async function remove() {
  try {
    await deleteCampaign(id.value)
  } catch (e) {
    confirmDelete.value = false
    error.value = labels.value.campFailed.replace('{code}', e.code || 'network')
    return
  }
  confirmDelete.value = false
  router.push('/tracker/campaigns')
}
function forget() {
  forgetCampaign(id.value)
  router.push('/tracker/campaigns')
}
</script>

<style scoped>
.campaign { max-width: 760px; margin: 0 auto; padding: 0.5rem 0 2rem; }
</style>
