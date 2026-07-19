<template>
  <div class="roster-shared">
    <RouterLink to="/roster" class="back"><i class="bi bi-chevron-left"></i> {{ labels.rosterBackToList }}</RouterLink>
    <h1 class="rs-title">{{ labels.rosterSharedTitle }}</h1>

    <p v-if="error" class="rs-error"><i class="bi bi-exclamation-triangle"></i> {{ labels.rosterSharedInvalid }}</p>
    <template v-else-if="payload">
      <pre class="rs-preview">{{ preview }}</pre>
      <button class="rs-save" @click="save">
        <i class="bi bi-download"></i> {{ labels.rosterSaveToMine }}
      </button>
    </template>
    <p v-else class="rs-loading"><i class="bi bi-arrow-repeat spin"></i></p>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters } from '../../composables/useRosters.js'
import { decodeRoster } from '../../composables/rosterShare.js'
import { buildRosterText } from '../../composables/rosterExport.js'
import rosterCore from '../../data/roster/core.js'
import { loadRosterFaction } from '../../data/roster/index.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { importRoster } = useRosters()

const payload = ref(null)
const faction = ref(null)
const error = ref(false)

onMounted(async () => {
  // Payload rides in the hash (…/roster/shared#r=<payload>) so it never hits the server.
  const m = (route.hash || '').match(/[#&]r=([^&]+)/)
  if (!m) { error.value = true; return }
  const decoded = await decodeRoster(decodeURIComponent(m[1]))
  if (!decoded) { error.value = true; return }
  payload.value = decoded
  if (decoded.faction) faction.value = await loadRosterFaction(decoded.faction)
})

const preview = computed(() =>
  payload.value ? buildRosterText(payload.value, { faction: faction.value, core: rosterCore }) : '')

function save() {
  const r = importRoster(payload.value, payload.value.name)
  if (r) router.replace(`/roster/${r.id}`)
}
</script>

<style scoped>
.roster-shared { padding-top: 0.75rem; }
.back { display: inline-flex; align-items: center; gap: 0.3rem; color: var(--text-muted); text-decoration: none; font-size: 0.85rem; }
.back:hover { color: var(--accent); }
.rs-title { font-family: var(--font-display); font-weight: 500; color: var(--text-primary); margin: 0.75rem 0 1rem; }
.rs-error { color: #c0392b; display: flex; align-items: center; gap: 0.4rem; }
.rs-loading { color: var(--text-muted); }
.spin { display: inline-block; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.rs-preview {
  white-space: pre-wrap;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--text-primary);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.8rem 0.9rem;
  overflow-x: auto;
}
.rs-save {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
  padding: 0.65rem 1.5rem;
  background: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
}
</style>
