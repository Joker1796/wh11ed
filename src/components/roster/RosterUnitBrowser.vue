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
        <div v-if="g.units.length" class="rub-group">
          <button
            type="button"
            class="rub-head"
            :aria-expanded="isOpen(g.id)"
            @click="toggleGroup(g.id)"
          >
            <i class="bi rub-chev" :class="isOpen(g.id) ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            <span class="rub-group-name">{{ groupLabel(g.id) }}</span>
            <span class="rub-group-count">{{ g.units.length }}</span>
          </button>
          <CollapseTransition :show="isOpen(g.id)">
            <div class="rub-list">
              <div
                v-for="u in g.units"
                :key="u.id"
                class="rub-item"
                :class="{ added: countOf(u.id) }"
                @click="previewId = u.id"
              >
                <span class="rub-text">
                  <span class="rub-name">{{ u.name }}<span v-if="countOf(u.id)" class="rub-count"> ×{{ countOf(u.id) }}</span></span>
                  <span class="rub-pts">{{ minPoints(u) }}{{ labels.rosterPointsLabel }}</span>
                </span>
                <button
                  v-if="countOf(u.id)"
                  type="button"
                  class="rub-remove"
                  :aria-label="labels.rosterRemove"
                  @click.stop="$emit('remove', u.id)"
                >
                  <i class="bi bi-dash-lg"></i>
                </button>
                <button
                  type="button"
                  class="rub-add"
                  :aria-label="labels.rosterAddUnit"
                  @click.stop="$emit('add', u.id)"
                >
                  <i class="bi bi-plus-lg"></i>
                </button>
              </div>
            </div>
          </CollapseTransition>
        </div>
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
import CollapseTransition from '../CollapseTransition.vue'
import RosterUnitRulesModal from './RosterUnitRulesModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { UNIT_GROUPS, GROUP_LABEL_KEYS, bucketOf, mandatoryEnhancementFor } from '../../composables/rosterEngine.js'

const props = defineProps({
  units: { type: Array, required: true },
  factionSlug: { type: String, default: '' },
  // ids currently in the roster/pending list (may repeat for multiple copies) — shown as a
  // small ×N badge so it's clear what's already been added while browsing.
  addedIds: { type: Array, default: () => [] },
  // The roster's selected detachments — a unit locked to one of Necrons' Pantheon of Woe /
  // Imperial Agents' Veiled Blade Elim. Force's mandatory enhancements (rosterEngine.js
  // mandatoryEnhancementFor) shows that surcharge already baked into its browse price, not just
  // once its config accordion is opened on step 3.
  detachments: { type: Array, default: () => [] },
})
defineEmits(['add', 'remove'])

// Groups start collapsed (same pattern as StratagemsView's per-phase accordions) — the list
// runs to 90+ units, so a fully-open browser is a wall of rows to scroll past. While the
// search box has a query, every group with a match force-opens (so results are never hidden
// behind a collapsed header) regardless of its manual toggle state.
const openGroups = ref(new Set())
function toggleGroup(id) {
  const next = new Set(openGroups.value)
  next.has(id) ? next.delete(id) : next.add(id)
  openGroups.value = next
}
function isOpen(id) { return !!query.value.trim() || openGroups.value.has(id) }

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

// Cheapest bracket (the "from" price) plus any mandatory enhancement this exact unit is stuck
// with under the roster's selected detachments — so the browse price already matches what
// step 3's config screen (and the final total) will show, not just the bare datasheet cost.
function minPoints(u) {
  const base = Math.min(...(u.sizes || []).map((s) => s.pts))
  return base + (mandatoryEnhancementFor(u, props.detachments)?.pts || 0)
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
.rub-body { display: flex; flex-direction: column; gap: 0.35rem; overflow-y: auto; }
.rub-empty { color: var(--text-muted); font-style: italic; padding: 0.5rem; }

.rub-group { display: flex; flex-direction: column; }
.rub-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.6rem;
  border: none;
  border-radius: 5px;
  background: none;
  color: var(--text-dim);
  cursor: pointer;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.rub-head:hover { color: var(--text-primary); }
.rub-chev { flex-shrink: 0; font-size: 0.7rem; }
.rub-group-name { flex: 1; text-align: left; }
.rub-group-count { flex-shrink: 0; font-family: var(--font-mono); color: var(--text-dim); }

.rub-list { display: flex; flex-direction: column; gap: 0.35rem; padding-top: 0.35rem; }
.rub-item {
  display: flex;
  align-items: stretch;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.55;
  transition: border-color 0.15s, opacity 0.15s;
}
.rub-item:hover, .rub-item.added { opacity: 1; }
.rub-item:hover { border-color: var(--accent); }
.rub-text { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.55rem 0.7rem; }
.rub-name { font-size: 0.88rem; font-weight: 600; color: var(--text-primary); }
.rub-count { font-weight: 700; color: var(--accent); }
.rub-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); flex-shrink: 0; font-size: 0.8rem; }
.rub-remove,
.rub-add {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  background: none;
  border: none;
  border-left: 1px solid var(--border);
  font-size: 1.1rem;
  cursor: pointer;
}
.rub-remove { color: var(--text-muted); }
.rub-remove:hover { background: color-mix(in srgb, var(--text-muted) 12%, transparent); }
.rub-add { color: var(--accent); }
.rub-add:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); }
@media (max-width: 560px) { .rub-body { gap: 0.3rem; } }
</style>
