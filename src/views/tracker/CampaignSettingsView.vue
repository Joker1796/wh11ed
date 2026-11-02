<template>
  <div class="campaign-settings">
    <div class="camp-hero">
      <RouterLink
        :to="id ? `/tracker/campaigns/${id}` : '/tracker/campaigns'"
        class="back"
      >
        ← {{ id ? entry?.name || labels.campTitle : labels.campTitle }}
      </RouterLink>
      <h1>{{ id ? labels.campSettings : labels.campNew }}</h1>
    </div>
    <p
      v-if="!initial"
      class="empty-note"
    >
      {{ loading ? labels.campLoading : labels.campSettingsNoAccess }}
    </p>
    <CampSettingsForm
      v-else
      :key="id || 'new'"
      :initial="initial"
      :players="players"
      :submit-label="id ? labels.campSettingsSave : labels.campCreate"
      :busy="busy"
      @submit="save"
    />
    <AppToast
      :show="!!error"
      :text="error"
      tone="error"
      @close="error = ''"
    />
  </div>
</template>

<script setup>
// A campaign's settings on a page of their own (owner, 2026-11-01): `/tracker/campaigns/new` starts
// a campaign with them, `/tracker/campaigns/:id/settings` changes them. Only the Warmaster's; one
// `settings` event carries what differs from the defaults (new) or from the campaign (edit).
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppToast from '../../components/AppToast.vue'
import CampSettingsForm from '../../components/dominatus/campaign/CampSettingsForm.vue'
import { playerOptionOf } from '../../components/dominatus/campaign/useCampaignView.js'
import '../../components/dominatus/dominatus.css'
import '../../components/dominatus/campaign/campaign.css'
import { SETTINGS_DEFAULTS } from '../../core/dominatus/campaign.js'
import { dominatusDeck } from '../../composables/dominatusMissions.js'
import { useCampaigns } from '../../composables/useCampaigns.js'
import { useAuth } from '../../composables/useAuth.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const route = useRoute()
const router = useRouter()
const { byId, createCampaign, refreshAccount, syncCampaign, appendEvent, stateOf } = useCampaigns()
const { status, ensureSession } = useAuth()

const id = computed(() => route.params.id || '')
const entry = computed(() => (id.value ? byId(id.value) : null))
const state = computed(() => (id.value ? stateOf(id.value) : null))
const loading = ref(true)
const busy = ref(false)
const error = ref('')

const KEYS = Object.keys(SETTINGS_DEFAULTS)
const initial = computed(() => {
  if (!id.value) return status.value === 'authed' ? { name: '', ...SETTINGS_DEFAULTS } : null
  if (entry.value?.role !== 'owner' || !state.value) return null
  return { name: state.value.name || entry.value.name, ...Object.fromEntries(KEYS.map((k) => [k, state.value[k]])) }
})
const players = computed(() => {
  const deck = dominatusDeck(locale.value)
  const allianceName = (a) => deck?.alliances.find((x) => x.id === a)?.name || a
  return (state.value?.players || []).map((p) => playerOptionOf(p, allianceName))
})

onMounted(async () => {
  try {
    await ensureSession()
    if (id.value && !byId(id.value)) await refreshAccount()
    if (id.value && byId(id.value)) await syncCampaign(id.value)
  } catch (e) {
    error.value = labels.value.campFailed.replace('{code}', e.code || 'network')
  } finally {
    loading.value = false
  }
})

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)
async function save(values) {
  busy.value = true
  error.value = ''
  try {
    if (!id.value) {
      // The name and the draw ride the creation; the rest, where it differs, one settings event.
      const c = await createCampaign(values.name, values.draw)
      const rest = Object.fromEntries(KEYS.filter((k) => k !== 'draw' && !same(values[k], SETTINGS_DEFAULTS[k])).map((k) => [k, values[k]]))
      if (Object.keys(rest).length) await appendEvent(c.id, 'settings', rest)
      router.replace(`/tracker/campaigns/${c.id}`)
    } else {
      const was = initial.value
      const changed = Object.fromEntries(['name', ...KEYS].filter((k) => !same(values[k], was[k])).map((k) => [k, values[k]]))
      if (Object.keys(changed).length) await appendEvent(id.value, 'settings', changed)
      router.push(`/tracker/campaigns/${id.value}`)
    }
  } catch (e) {
    error.value = labels.value.campFailed.replace('{code}', e.code || 'network')
  } finally {
    busy.value = false
  }
}
</script>

<style scoped>
.campaign-settings { max-width: 640px; margin: 0 auto; padding-top: 0.5rem; }
.campaign-settings .camp-hero { margin-bottom: 1rem; }
</style>
