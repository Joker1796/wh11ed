<template>
  <BaseModal :title="labels.rosterAddUnit" max-width="520px" @close="$emit('close')">
    <div class="rup">
      <input
        ref="searchEl"
        v-model="query"
        type="search"
        class="rup-search"
        :placeholder="labels.rosterSearchUnits"
        autocomplete="off"
      />
      <div class="modal-body rup-body">
        <p v-if="!filtered.length" class="rup-empty">{{ labels.rosterNoResults }}</p>
        <template v-for="g in groups" :key="g.id">
          <template v-if="g.units.length">
            <h4 class="rup-group">{{ groupLabel(g.id) }}</h4>
            <button
              v-for="u in g.units"
              :key="u.id"
              type="button"
              class="rup-item"
              @click="$emit('pick', u.id)"
            >
              <span class="rup-name">{{ u.name }}</span>
              <span class="rup-pts">{{ minPoints(u) }}<span class="rup-unit">{{ labels.rosterPointsLabel }}</span></span>
            </button>
          </template>
        </template>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { UNIT_GROUPS, bucketOf } from '../../composables/rosterEngine.js'

const props = defineProps({
  units: { type: Array, required: true },
})
defineEmits(['pick', 'close'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const query = ref('')
const searchEl = ref(null)
onMounted(() => searchEl.value?.focus())

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.units
  return props.units.filter((u) => u.name.toLowerCase().includes(q))
})

const GROUP_LABEL_KEYS = {
  epic: 'rosterGroupEpic', characters: 'rosterGroupCharacters', battleline: 'rosterGroupBattleline',
  transports: 'rosterGroupTransports', other: 'rosterGroupOther',
}
function groupLabel(id) { return labels.value[GROUP_LABEL_KEYS[id]] || '' }

const groups = computed(() =>
  UNIT_GROUPS.map((id) => ({
    id,
    units: filtered.value.filter((u) => bucketOf(u) === id).sort((a, b) => a.name.localeCompare(b.name)),
  })),
)

// Cheapest bracket, so the list shows the "from" price.
function minPoints(u) {
  return Math.min(...(u.sizes || []).map((s) => s.pts))
}
</script>

<style scoped>
.rup { display: flex; flex-direction: column; min-height: 0; }
.rup-search {
  margin: 0.6rem 0.75rem 0.4rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
}
.rup-search:focus { outline: none; border-color: var(--accent); }
.rup-body { display: flex; flex-direction: column; gap: 0.25rem; padding: 0.25rem 0.75rem 0.75rem; overflow-y: auto; }
.rup-empty { color: var(--text-muted); font-style: italic; padding: 0.5rem; }
.rup-group {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  margin: 0.6rem 0 0.1rem;
}
.rup-group:first-child { margin-top: 0; }
.rup-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}
.rup-item:hover { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); }
.rup-name { font-size: 0.88rem; font-weight: 600; color: var(--text-primary); }
.rup-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); flex-shrink: 0; }
.rup-unit { font-size: 0.6rem; color: var(--text-dim); margin-left: 0.15rem; }
@media (max-width: 560px) { .rup-body { padding: 0.25rem 0.4rem 0.5rem; } }
</style>
