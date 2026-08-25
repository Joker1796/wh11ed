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
            <span class="rub-group-name">
              {{ groupLabel(g) }}
              <em v-if="g.ally" class="rub-ally-cap">{{ allyCap(g.ally) }}</em>
            </span>
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
                  <span class="rub-name">{{ u.name }}<span v-if="countOf(u.id)" class="rub-count" :class="{ over: isOver(u) }"> {{ countLabel(u) }}</span></span>
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
                  :disabled="atCap(u)"
                  :aria-label="labels.rosterAddUnit"
                  :title="atCap(u) ? labels.rosterAtDuplicateCap : undefined"
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
    <!-- Detachments only, no entry: this previews a unit that isn't in the roster yet, so there's
         no loadout to reflect — the printed sheet, showing every option, is what's wanted while
         deciding whether to add it. The roster's detachments DO already apply though (a unit can
         gain Battleline from one), so those go in. -->
    <RosterUnitRulesModal
      v-if="previewId && previewSlug"
      :unit-id="previewUnitId"
      :faction-slug="previewSlug"
      :ctx="{ detachments }"
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
import { GROUP_LABEL_KEYS, allySourceOf, mandatoryEnhancementFor, capKeyOf, sectionsOf } from '../../composables/rosterEngine.js'
import { duplicateLimit } from '../../composables/rosterValidation.js'

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
  // The roster's effective battle size (rosterEngine.js's effectiveBattle) — only `.dupLimit` is
  // read, to compute each unit's duplicate cap (rosterValidation.js's duplicateLimit). Absent
  // (e.g. no battle size resolvable yet) means no cap is enforced, same as checkLegality: false.
  battle: { type: Object, default: null },
  // The faction's allied contexts (data/roster/<slug>.js `allies`). Their units arrive in `units`
  // like any other, but they are listed in their own sections rather than in the battlefield-role
  // buckets, and a group whose Detachment isn't selected isn't offered at all — see sectionsOf.
  allies: { type: Array, default: () => [] },
  // "Проверка легитимности" — live-enforces the duplicate cap on the "+" button below instead of
  // only surfacing it later in the issues list (see rosterValidation.js's validateRoster). Off
  // restores today's unlimited-add behaviour.
  checkLegality: { type: Boolean, default: true },
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

function groupLabel(g) { return g.ally ? g.ally.name : (labels.value[GROUP_LABEL_KEYS[g.id]] || '') }

// What the group allows at this battle size, in the header: "up to 500 pts", "1× Titanic / 3×
// Armiger" (mutex groups print the either/or with a slash, everyone else with a dot).
function allyCap(g) {
  const size = props.battle?.base || props.battle?.id
  const parts = []
  const pts = g.pts?.[size]
  if (pts != null) parts.push(labels.value.rosterAllyCapPts.replace('{n}', String(pts)))
  for (const [kw, bySize] of Object.entries(g.lim || {})) {
    if (bySize[size] != null) parts.push(labels.value.rosterAllyCapKw.replace('{n}', String(bySize[size])).replace('{kw}', kw))
  }
  return parts.join(g.mutex ? ' / ' : ' · ')
}

const groups = computed(() =>
  sectionsOf(filtered.value, { faction: { allies: props.allies }, detachments: props.detachments })
    .map((sec) => ({ ...sec, units: sec.items.slice().sort((a, b) => a.name.localeCompare(b.name)) })),
)

const defById = computed(() => new Map(props.units.map((u) => [u.id, u])))

// Grouped by capKeyOf, not raw id, so a future same-character/multiple-datasheets case (see
// rosterEngine.js's capKeyOf) is counted as one duplicate-cap slot across both ids — mirrors
// rosterValidation.js's duplicateCounts.
const addedCounts = computed(() => {
  const m = new Map()
  for (const id of props.addedIds) {
    const def = defById.value.get(id)
    const key = def ? capKeyOf(def) : id
    m.set(key, (m.get(key) || 0) + 1)
  }
  return m
})
function countOf(id) {
  const def = defById.value.get(id)
  const key = def ? capKeyOf(def) : id
  return addedCounts.value.get(key) || 0
}
// The duplicate cap for this unit (Infinity when no battle size is resolvable, i.e. nothing to
// cap against), and whether checkLegality is on AND that cap is already reached.
function limitOf(u) { return props.battle ? duplicateLimit(u, props.battle.dupLimit) : Infinity }
function atCap(u) { return props.checkLegality && countOf(u.id) >= limitOf(u) }
// Strictly OVER the cap — not just at it. Unreachable through this browser's own "+" button
// (atCap already stops that at ==), but reachable from outside: units were added under a
// bigger battle size, then the size was lowered back on step 1, shrinking everyone's limit
// out from under counts that already exist. validateRoster's overDuplicate issue (see
// rosterValidation.js) is the same >, so this and the warnings list never disagree.
function isOver(u) { return props.checkLegality && countOf(u.id) > limitOf(u) }
// "1/1", "2/6" while the cap is known and enforced; plain "×N" otherwise (checkLegality off, or
// no battle size resolvable yet — nothing to show a cap against).
function countLabel(u) {
  const n = countOf(u.id)
  const limit = limitOf(u)
  return (props.checkLegality && Number.isFinite(limit)) ? `${n}/${limit}` : `×${n}`
}

// Cheapest bracket (the "from" price) plus any mandatory enhancement this exact unit is stuck
// with under the roster's selected detachments — so the browse price already matches what
// step 3's config screen (and the final total) will show, not just the bare datasheet cost.
function minPoints(u) {
  const base = Math.min(...(u.sizes || []).map((s) => s.pts))
  return base + (mandatoryEnhancementFor(u, props.detachments)?.pts || 0)
}

const previewId = ref(null)
// An allied unit's rules live in ITS faction's data, not in the army's (Draxus is an Imperial
// Agents datasheet in a Custodes list) — the namespaced id says which.
const previewSrc = computed(() => allySourceOf(previewId.value))
const previewSlug = computed(() => previewSrc.value?.[0] || props.factionSlug)
const previewUnitId = computed(() => previewSrc.value?.[1] || previewId.value)
</script>

<style scoped>
.rub { display: flex; flex-direction: column; min-height: 0; }
.rub-search {
  margin: 0 0 0.6rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--border);
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
/* The group's ceiling, printed next to its name: normal-case and dimmer, so the header still
   reads as one label rather than two competing ones. */
.rub-ally-cap {
  margin-left: 0.5em;
  font-size: 0.92em;
  font-weight: 600;
  font-style: normal;
  text-transform: none;
  letter-spacing: 0;
  color: var(--text-muted);
}
.rub-group-count { flex-shrink: 0; font-family: var(--font-mono); color: var(--text-dim); }

.rub-list { display: flex; flex-direction: column; gap: 0.35rem; padding-top: 0.35rem; }
.rub-item {
  display: flex;
  align-items: stretch;
  background: var(--bg-card);
  border: 1px solid var(--border);
  overflow: hidden;
  cursor: pointer;
  opacity: 0.55;
  transition: border-color 0.15s, opacity 0.15s;
}
.rub-item:hover, .rub-item.added { opacity: 1; }
.rub-item:hover { border-color: var(--accent); }
.rub-text { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.55rem 0.7rem; }
.rub-name { font-size: 0.88rem; font-weight: 600; color: var(--text-primary); }
.rub-count { margin-left: 0.3em; font-weight: 700; color: var(--accent); }
.rub-count.over { color: #c0392b; }
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
.rub-add:disabled { opacity: 0.35; cursor: not-allowed; }
.rub-add:disabled:hover { background: none; }
@media (max-width: 560px) { .rub-body { gap: 0.3rem; } }
</style>
