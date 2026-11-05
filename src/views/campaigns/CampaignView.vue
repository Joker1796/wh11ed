<template>
  <div class="campaign">
    <div class="camp-hero">
      <RouterLink
        to="/campaigns"
        class="back"
      >
        ← {{ labels.navCampaigns }}
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
            @click="menuOpen = false; router.push(campaignPath(id, 'settings'))"
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

    <!-- The campaign in tabs (owner, 2026-11-01), always the same four in the same order; a tab
         that holds something this reader has to do carries the warning mark, and the page opens on
         the first such tab. -->
    <template v-else>
      <!-- The invite opened signed out: the campaign reads, and taking part asks for an account
           (owner, 2026-11-05); signed in, the device joins by itself (refreshAccount). The
           Warmaster's or a player's session gone: what they can do needs it back. -->
      <CampSignIn
        v-if="signInText"
        :text="signInText"
        :switch-account="otherAccount"
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
import { campaignPath } from '../../router/nav.js'
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
const signedOut = computed(() => status.value === 'anon' && ['owner', 'member'].includes(entry.value?.role))
// Another account signed in where this device holds the campaign for one (`heldRole`): it reads
// until that account is back, and says whose it is.
const otherAccount = computed(() => !!entry.value?.heldRole && status.value === 'authed')
const signInText = computed(() => {
  const e = entry.value
  if (otherAccount.value) return e.accountName ? labels.value.campOtherAccount.replace('{name}', e.accountName) : labels.value.campOtherAccountNoName
  if (e?.invite) return status.value !== 'idle' && status.value !== 'authed' ? labels.value.campSignInToPlay : ''
  return signedOut.value ? labels.value.campSignedOut : ''
})
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
// A tab remembered from before it went (the Alliances', 2026-11-05) opens the phase.
const TAB_KEYS = ['phase', 'players', 'battles', 'rewards']
const savedTab = computed(() => (TAB_KEYS.includes(entry.value?.prefs?.tab) ? entry.value.prefs.tab : 'phase'))
const tab = computed(() => picked.value || (rewardsWaiting.value ? 'rewards' : battlesWaiting.value ? 'battles' : savedTab.value))
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
    // The players before their battles (owner, 2026-11-05).
    { key: 'players', label: l.campPlayers },
    { key: 'battles', label: l.campBattles, warn: battlesWaiting.value ? l.campWaiting : '' },
    { key: 'rewards', label: l.campRewardsTab, warn: rewardsWaiting.value ? l.campWaiting : '' },
  ].map((t) => ({ ...t, active: tab.value === t.key }))
})

// True once the event is in: a form closes only then, keeping what was typed when it failed.
async function act(type, payload) {
  error.value = ''
  try {
    await appendEvent(id.value, type, payload)
    return true
  } catch (e) {
    // Signed out, the server hides the campaign behind not_found: the words for it, not the code.
    error.value = signedOut.value ? labels.value.campSignedOut : labels.value.campFailed.replace('{code}', e.code || 'network')
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
    // Reading again fails quietly (owner, 2026-11-02): the page shows what the device has, and a
    // session gone says so above the tabs. The server answers a signed-out Warmaster not_found.
    if (byId(id.value)) await syncCampaign(id.value).catch(() => {})
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
  router.push('/campaigns')
}
function forget() {
  forgetCampaign(id.value)
  router.push('/campaigns')
}
</script>

<style scoped>
.campaign { max-width: 760px; margin: 0 auto; padding: 0.5rem 0 2rem; }
</style>
