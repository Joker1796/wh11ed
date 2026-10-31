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
      >{{ labels[`campRole_${entry.role}`] }}</span>
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
        <div
          v-else-if="tab === 'players'"
          key="players"
        >
          <CampPlayers />
          <CampShare />
        </div>
        <CampRewards v-else />
      </Transition>
      <section
        v-if="isOwner && state.rejected.length"
        class="camp-block"
      >
        <h2 class="dgroup-label">
          {{ labels.campRejectedEvents }}
        </h2>
        <ul class="camp-results">
          <li
            v-for="r in state.rejected"
            :key="r.seq"
          >
            #{{ r.seq }}: {{ r.reason }}
          </li>
        </ul>
      </section>
      <div class="camp-foot">
        <button
          v-if="isOwner"
          class="btn-ghost"
          @click="confirmDelete = true"
        >
          {{ labels.campDelete }}
        </button>
        <button
          v-else
          class="btn-ghost"
          @click="forget"
        >
          {{ labels.campForget }}
        </button>
      </div>
    </template>

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
import PageTabs from '../../components/PageTabs.vue'
import { bringTabsIntoView } from '../../composables/bringTabsIntoView.js'
import AppToast from '../../components/AppToast.vue'
import CampStandings from '../../components/dominatus/campaign/CampStandings.vue'
import CampPhase from '../../components/dominatus/campaign/CampPhase.vue'
import CampRewards from '../../components/dominatus/campaign/CampRewards.vue'
import CampBattles from '../../components/dominatus/campaign/CampBattles.vue'
import CampPlayers from '../../components/dominatus/campaign/CampPlayers.vue'
import CampShare from '../../components/dominatus/campaign/CampShare.vue'
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
const { byId, refreshOwned, joinCampaign, watchCampaign, syncCampaign, appendEvent, deleteCampaign, forgetCampaign, stateOf, myPlayer } = useCampaigns()
const { status, ensureSession } = useAuth()

const id = computed(() => route.params.id)
const entry = computed(() => byId(id.value))
const state = computed(() => (entry.value ? stateOf(id.value) : null))
const isOwner = computed(() => entry.value?.role === 'owner')
const mine = computed(() => myPlayer(entry.value, state.value))
const error = ref('')
const loading = ref(true)
const confirmDelete = ref(false)
// What waits for this reader: the rewards they take (all of them for the Warmaster, a member's own),
// the battles the Warmaster has to count.
const rewardsWaiting = computed(() => (state.value?.pending || []).filter((r) => isOwner.value || r.player === mine.value?.id).length)
const battlesWaiting = computed(() => isOwner.value && !!state.value?.battles.some((b) => b.status === 'pending'))
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

async function remove() {
  confirmDelete.value = false
  try {
    await deleteCampaign(id.value)
    router.push('/tracker/campaigns')
  } catch (e) {
    error.value = labels.value.campFailed.replace('{code}', e.code || 'network')
  }
}
function forget() {
  forgetCampaign(id.value)
  router.push('/tracker/campaigns')
}
</script>

<style scoped>
.campaign { max-width: 760px; margin: 0 auto; padding-top: 0.5rem; }
.camp-foot { display: flex; justify-content: flex-end; margin: 1rem 0 2rem; }
</style>
