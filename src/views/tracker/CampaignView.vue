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
      v-if="error"
      class="camp-error"
    >
      {{ error }}
    </p>
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

    <template v-else>
      <CampStandings />
      <CampPhase />
      <CampRewards />
      <CampBattles />
      <CampPlayers />
      <CampShare />
      <section
        v-if="isOwner && state.rejected.length"
        class="camp-block"
      >
        <h2 class="camp-h">
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmModal from '../../components/ConfirmModal.vue'
import CampStandings from '../../components/dominatus/campaign/CampStandings.vue'
import CampPhase from '../../components/dominatus/campaign/CampPhase.vue'
import CampRewards from '../../components/dominatus/campaign/CampRewards.vue'
import CampBattles from '../../components/dominatus/campaign/CampBattles.vue'
import CampPlayers from '../../components/dominatus/campaign/CampPlayers.vue'
import CampShare from '../../components/dominatus/campaign/CampShare.vue'
import { provideCampaignView } from '../../components/dominatus/campaign/useCampaignView.js'
import '../../components/dominatus/campaign/campaign.css'
import { useCampaigns } from '../../composables/useCampaigns.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const route = useRoute()
const router = useRouter()
const { byId, joinCampaign, watchCampaign, syncCampaign, appendEvent, deleteCampaign, forgetCampaign, stateOf, myPlayer } = useCampaigns()

const id = computed(() => route.params.id)
const entry = computed(() => byId(id.value))
const state = computed(() => (entry.value ? stateOf(id.value) : null))
const isOwner = computed(() => entry.value?.role === 'owner')
const mine = computed(() => myPlayer(entry.value, state.value))
const error = ref('')
const loading = ref(true)
const confirmDelete = ref(false)

async function act(type, payload) {
  error.value = ''
  try {
    await appendEvent(id.value, type, payload)
  } catch (e) {
    error.value = labels.value.campFailed.replace('{code}', e.code || 'network')
  }
}
provideCampaignView({ entry, state, isOwner, mine, act })

let timer = null
onMounted(async () => {
  try {
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
.camp-hero { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.3rem 0.75rem; border-bottom: 2px solid var(--accent); margin-bottom: 1rem; }
.camp-hero .back { flex-basis: 100%; }
.camp-hero h1 { margin: 0; font-family: var(--font-display); font-size: 2.1rem; font-weight: 400; }
.camp-role { font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; }
.camp-error { color: var(--danger); font-size: 0.85rem; }
.camp-foot { display: flex; justify-content: flex-end; margin: 1rem 0 2rem; }
</style>
