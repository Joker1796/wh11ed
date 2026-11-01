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
            v-if="isOwner"
            class="act-btn"
            @click="startRename"
          >
            {{ labels.campRename }}
          </button>
          <button
            v-if="isOwner && state"
            class="act-btn"
            @click="menuOpen = false; settingsOpen = true"
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
      <PageTabs
        class="camp-tabs"
        :tabs="tabs"
        @select="picked = $event"
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
    <CampSettings
      v-if="settingsOpen"
      @close="settingsOpen = false"
    />

    <AppToast
      :show="!!error"
      :text="error"
      tone="error"
      @close="error = ''"
    />
    <!-- The Warmaster renames the campaign: a settings event, which the server also carries into the
         campaign list (wh11ed-api README). -->
    <BaseModal
      v-if="renaming"
      :title="labels.campRename"
      @close="renaming = false"
    >
      <form
        class="modal-body camp-rename"
        @submit.prevent="rename"
      >
        <input
          v-model.trim="newName"
          class="form-input"
          type="text"
          maxlength="80"
          :placeholder="labels.campName"
          :aria-label="labels.campName"
        >
        <button
          class="btn-primary"
          type="submit"
          :disabled="!newName || newName === entry?.name"
        >
          {{ labels.campRenameSave }}
        </button>
      </form>
    </BaseModal>
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
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmModal from '../../components/ConfirmModal.vue'
import ActionMenu from '../../components/ActionMenu.vue'
import BaseModal from '../../components/BaseModal.vue'
import PageTabs from '../../components/PageTabs.vue'
import { bringTabsIntoView } from '../../composables/bringTabsIntoView.js'
import AppToast from '../../components/AppToast.vue'
import CampStandings from '../../components/dominatus/campaign/CampStandings.vue'
import CampPhase from '../../components/dominatus/campaign/CampPhase.vue'
import CampRewards from '../../components/dominatus/campaign/CampRewards.vue'
import CampBattles from '../../components/dominatus/campaign/CampBattles.vue'
import CampPlayers from '../../components/dominatus/campaign/CampPlayers.vue'
import CampSettings from '../../components/dominatus/campaign/CampSettings.vue'
import { provideCampaignView } from '../../components/dominatus/campaign/useCampaignView.js'
import '../../components/dominatus/dominatus.css'
import '../../components/dominatus/campaign/campaign.css'
import { useCampaigns } from '../../composables/useCampaigns.js'
import { useAuth } from '../../composables/useAuth.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const route = useRoute()
const router = useRouter()
const { byId, refreshOwned, joinCampaign, watchCampaign, syncCampaign, appendEvent, deleteCampaign, forgetCampaign, stateOf, myPlayer, waitingFor, noteWaiting } = useCampaigns()
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
const settingsOpen = ref(false)
const renaming = ref(false)
const newName = ref('')
// The menu hands over to the dialog in one tick (a swap, BaseModal's modalLeave).
function startRename() {
  newName.value = entry.value?.name || ''
  menuOpen.value = false
  renaming.value = true
}
async function rename() {
  if (await act('settings', { name: newName.value })) renaming.value = false
}
// What waits for this reader: the rewards they take (all of them for the Warmaster, a member's own),
// the battles the Warmaster has to count.
const waiting = computed(() => waitingFor(entry.value, state.value))
const rewardsWaiting = computed(() => waiting.value.rewards)
const battlesWaiting = computed(() => waiting.value.battles > 0)
// The list and the tracker's home show the mark without folding the log: noted as it changes.
watch(waiting, (w) => { if (state.value) noteWaiting(id.value, w.rewards + w.battles) }, { immediate: true })
// Open on what waits first; it follows the log as it comes in until the reader picks a tab.
const picked = ref(null)
const tab = computed(() => picked.value || (rewardsWaiting.value ? 'rewards' : battlesWaiting.value ? 'battles' : 'phase'))
const tabs = computed(() => {
  const l = labels.value
  const s = state.value
  const phaseName = s?.finished ? l.campFinished : l.domPhase.replace('{n}', ['I', 'II', 'III'][(s?.phase || 1) - 1])
  return [
    { key: 'phase', label: phaseName, icon: s && !s.finished ? `wi wi-dom-phase-${s.phase}` : '' },
    { key: 'standings', label: l.campStandings },
    { key: 'battles', label: l.campBattles, warn: battlesWaiting.value ? l.campWaiting : '' },
    { key: 'players', label: l.campPlayers },
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
    error.value = labels.value.campFailed.replace('{code}', e.code || 'network')
    return false
  }
}
provideCampaignView({ entry, state, isOwner, mine, act })

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
// The Warmaster opening their campaign on a device that has not seen it: the account knows it,
// once the session is back.
watch(status, async (s) => {
  if (s !== 'authed' || byId(id.value)) return
  try {
    await refreshOwned()
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
.camp-rename { display: grid; gap: 0.6rem; justify-items: start; padding: 0.9rem 1rem 1.1rem; }
.camp-rename input { width: 100%; }
</style>
