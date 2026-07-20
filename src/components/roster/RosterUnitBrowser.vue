<template>
  <div class="rub">
    <input
      ref="searchEl"
      v-model="query"
      type="search"
      class="rub-search"
      :placeholder="labels.rosterSearchUnits"
      autocomplete="off"
    />
    <div class="rub-body">
      <p v-if="!filtered.length" class="rub-empty">{{ labels.rosterNoResults }}</p>
      <template v-for="g in groups" :key="g.id">
        <template v-if="g.units.length">
          <h4 class="rub-group">{{ groupLabel(g.id) }}</h4>
          <div v-for="u in g.units" :key="u.id" class="rub-item" @click="previewId = u.id">
            <span class="rub-text">
              <span class="rub-name">{{ u.name }}<span v-if="countOf(u.id)" class="rub-count"> ×{{ countOf(u.id) }}</span></span>
              <span class="rub-pts">{{ minPoints(u) }}{{ labels.rosterPointsLabel }}</span>
            </span>
            <button
              type="button"
              class="rub-add"
              :aria-label="labels.rosterAddUnit"
              @click.stop="$emit('add', u.id)"
            >
              <i class="bi bi-plus-lg"></i>
            </button>
          </div>
        </template>
      </template>
    </div>

    <!-- Rules preview — clicking a row (not the add button) opens the unit's full card. -->
    <RosterUnitRulesModal
      v-if="previewId && factionSlug"
      :unit-id="previewId"
      :faction-slug="factionSlug"
      @close="previewId = null"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import RosterUnitRulesModal from './RosterUnitRulesModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { UNIT_GROUPS, bucketOf } from '../../composables/rosterEngine.js'

const props = defineProps({
  units: { type: Array, required: true },
  factionSlug: { type: String, default: '' },
  // ids currently in the roster/pending list (may repeat for multiple copies) — shown as a
  // small ×N badge so it's clear what's already been added while browsing.
  addedIds: { type: Array, default: () => [] },
})
defineEmits(['add'])

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

const addedCounts = computed(() => {
  const m = new Map()
  for (const id of props.addedIds) m.set(id, (m.get(id) || 0) + 1)
  return m
})
function countOf(id) { return addedCounts.value.get(id) || 0 }

// Cheapest bracket, so the list shows the "from" price.
function minPoints(u) {
  return Math.min(...(u.sizes || []).map((s) => s.pts))
}

const previewId = ref(null)
</script>

<style scoped>
.rub { display: flex; flex-direction: column; min-height: 0; }
.rub-search {
  margin: 0 0 0.6rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
}
.rub-search:focus { outline: none; border-color: var(--accent); }
.rub-body { display: flex; flex-direction: column; gap: 0.4rem; overflow-y: auto; }
.rub-empty { color: var(--text-muted); font-style: italic; padding: 0.5rem; }
.rub-group {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  margin: 0.6rem 0 0.1rem;
}
.rub-group:first-child { margin-top: 0; }
.rub-item {
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.15s;
}
.rub-item:hover { border-color: var(--accent); }
.rub-text { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.55rem 0.7rem; }
.rub-name { font-size: 0.88rem; font-weight: 600; color: var(--text-primary); }
.rub-count { font-weight: 700; color: var(--accent); }
.rub-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); flex-shrink: 0; font-size: 0.8rem; }
.rub-add {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  background: none;
  border: none;
  border-left: 1px solid var(--border);
  color: var(--accent);
  font-size: 1.1rem;
  cursor: pointer;
}
.rub-add:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); }
@media (max-width: 560px) { .rub-body { gap: 0.35rem; } }
</style>
