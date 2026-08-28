<template>
  <div class="rub">
    <input
      v-model="query"
      type="search"
      class="rub-search"
      :placeholder="labels.rosterSearchUnits"
      autocomplete="off"
    />

    <!-- Two narrowing checkboxes, folded away under their own header — the same accordion the
         groups below use, so the pane reads as one list of collapsible things rather than as a
         toolbar plus a list. They HIDE rather than dim, which this list forces: opacity here
         already means "not in the roster yet" (`.rub-item`), so there is no dim left to spend on
         "you cannot afford it".

         Two things stay OUTSIDE the fold, because a closed accordion must not hide why the
         catalogue is short: the count of what the filters took (same note the detachment picker
         prints) and, on the header itself, how many of them are on. -->
    <div class="rub-filters">
      <button
        type="button"
        class="rub-head"
        :aria-expanded="filtersOpen"
        @click="filtersOpen = !filtersOpen"
      >
        <i class="bi rub-chev" :class="filtersOpen ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
        <span class="rub-group-name">{{ labels.rosterFilters }}</span>
        <span v-if="activeFilters" class="rub-group-count on">{{ activeFilters }}</span>
      </button>
      <CollapseTransition :show="filtersOpen">
        <div class="rub-filter-list">
          <label v-if="hasBudget" class="check" :class="{ on: onlyAffordable }">
            <input v-model="onlyAffordable" type="checkbox" />
            <span>{{ labels.rosterFilterBudget }}</span>
          </label>
          <label class="check" :class="{ on: onlyOwned }">
            <input v-model="onlyOwned" type="checkbox" />
            <span><i class="bi bi-star-fill"></i> {{ labels.rosterFilterOwned }}</span>
          </label>
        </div>
      </CollapseTransition>
      <em v-if="hiddenCount" class="rub-hidden">{{ labels.rosterFilterHidden.replace('{n}', hiddenCount) }}</em>
    </div>

    <div class="rub-body">
      <p v-if="!shownCount" class="rub-empty">{{ labels.rosterNoResults }}</p>
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
                <button
                  type="button"
                  class="rub-star"
                  :class="{ on: ownsUnit(u) }"
                  :aria-pressed="ownsUnit(u)"
                  :title="ownsUnit(u) ? labels.dsOwnRemove : labels.dsOwnAdd"
                  :aria-label="ownsUnit(u) ? labels.dsOwnRemove : labels.dsOwnAdd"
                  @click.stop="toggleOwnUnit(u)"
                >
                  <i :class="ownsUnit(u) ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                </button>
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
import { computed, ref, watch } from 'vue'
import CollapseTransition from '../CollapseTransition.vue'
import RosterUnitRulesModal from './RosterUnitRulesModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { GROUP_LABEL_KEYS, allySourceOf, mandatoryEnhancementFor, capKeyOf, sectionsOf } from '../../composables/rosterEngine.js'
import { duplicateLimit } from '../../composables/rosterValidation.js'
import { useCollection } from '../../composables/useCollection.js'
import { getItem, setItem } from '../../composables/safeStorage.js'

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
  // Points still unspent (the views' `limit - points`), which is all the budget filter needs.
  // Null — no battle size resolvable — takes that filter off the screen rather than guessing.
  remaining: { type: Number, default: null },
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

// "I own this model" — set from the star on each row here, and from the faction datasheet pages.
const { isOwned, toggleOwned } = useCollection()

// No autofocus. The catalogue used to have a screen to itself, where taking the keyboard was the
// obvious opening move; it is now one pane of the build screen, which opens showing the list
// beside it — popping the keyboard there covers the very thing the reader came to look at.
const query = ref('')

// Search only. The toggles below narrow this further; the two stay apart so the "N hidden" note
// can compare them and say how much the toggles — not the typing — took away.
const searched = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.units
  return props.units.filter((u) => u.name.toLowerCase().includes(q))
})

// Per device, like the missions screen's own filters (ChapterMissions.vue). Both start off: the
// catalogue's first answer should be the whole catalogue.
const onlyAffordable = ref(getItem('wh11ed-roster-filter-budget') === '1')
const onlyOwned = ref(getItem('wh11ed-roster-filter-owned') === '1')
watch(onlyAffordable, (v) => setItem('wh11ed-roster-filter-budget', v ? '1' : ''))
watch(onlyOwned, (v) => setItem('wh11ed-roster-filter-owned', v ? '1' : ''))

const hasBudget = computed(() => Number.isFinite(props.remaining))
// Open if anything is already filtering — a fold that hides a switch which is ON would leave the
// reader looking for units that the pane has quietly taken away.
const filtersOpen = ref(onlyAffordable.value || onlyOwned.value)
const activeFilters = computed(() => (onlyAffordable.value && hasBudget.value ? 1 : 0) + (onlyOwned.value ? 1 : 0))
const anyFilter = computed(() => (onlyAffordable.value && hasBudget.value) || onlyOwned.value)

// An allied datasheet belongs to ITS faction, not to the army browsing it (allySourceOf) — the
// collection is keyed that way, or two factions' ids would share one bucket.
function srcOf(u) {
  const src = allySourceOf(u.id)
  return { slug: src?.[0] || props.factionSlug, id: src?.[1] || u.id }
}
function ownsUnit(u) { const s = srcOf(u); return isOwned(s.slug, s.id) }
function toggleOwnUnit(u) { const s = srcOf(u); toggleOwned(s.slug, s.id, u.name) }

// A unit already in the list is never filtered away — same reason the detachment picker keeps the
// detachments you took: its row carries the "−" button, and a list that hides what you just added
// (because the budget ran out, or because you are proxying something you don't own) reads as a
// bug rather than as a filter. It is also what keeps the copy tax (`def.step`, rosterEngine's
// unitBasePoints) out of this: the surcharge lands on the Nth copy, and every unit this test
// prices is on its first.
//
// The promise the budget filter makes is "its cheapest configuration fits" — `minPoints` is the
// cheapest bracket plus any mandatory enhancement. Choosing a bigger bracket or paid wargear
// afterwards can still take the list over, and saying so is the points readout's job.
function passesFilters(u) {
  if (countOf(u.id)) return true
  if (onlyAffordable.value && hasBudget.value && minPoints(u) > props.remaining) return false
  if (onlyOwned.value && !ownsUnit(u)) return false
  return true
}

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

const sectionsFor = (list) =>
  sectionsOf(list, { faction: { allies: props.allies }, detachments: props.detachments })
    .map((sec) => ({ ...sec, units: sec.items.slice().sort((a, b) => a.name.localeCompare(b.name)) }))

// Counted after sectionsOf, not before it: a group whose ally Detachment isn't selected is not on
// offer whatever the toggles say, and counting it as "hidden by the filter" would be a lie.
const allSections = computed(() => sectionsFor(searched.value))
const groups = computed(() => (anyFilter.value ? sectionsFor(searched.value.filter(passesFilters)) : allSections.value))
const totalOf = (secs) => secs.reduce((n, sec) => n + sec.units.length, 0)
const shownCount = computed(() => totalOf(groups.value))
const hiddenCount = computed(() => (anyFilter.value ? totalOf(allSections.value) - shownCount.value : 0))


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
  margin: 0 0 0.5rem;
  padding: 0.55rem 0.7rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
}
.rub-search:focus { outline: none; border-color: var(--accent); }

/* The fold and the line that says what its switches took away. The rows themselves are the app's
   shared `.check` (style.css) — the same box the wizard's settings use. */
/* The rule under the block is what keeps its own header from reading as one more unit group: two
   accordions in a column, and the top one is not a battlefield role. The "N hidden" note lives
   INSIDE the block, above the line — it is the filters talking, not the list. */
.rub-filters {
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}
.rub-filter-list { display: flex; flex-direction: column; gap: 0.35rem; padding-top: 0.35rem; }
.rub-group-count.on { color: var(--accent); }
.rub-hidden { font-style: normal; font-size: 0.7rem; color: var(--text-dim); margin-top: 0.35rem; }
/* flex/min-height, not just overflow: inside the build panes this component's height is bounded
   by the pane, and a column flex item defaults to min-height:auto — without these the body grows
   past the pane and is CLIPPED by it instead of scrolling. Inert where nothing bounds it. */
.rub-body { flex: 1; min-height: 0; margin-top: 0.5rem; display: flex; flex-direction: column; gap: 0.35rem; overflow-y: auto; }
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
@media (hover: hover) { .rub-head:hover { color: var(--text-primary); } }
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
.rub-item.added { opacity: 1; }
@media (hover: hover) {
  .rub-item:hover { opacity: 1; border-color: var(--accent); }
}
.rub-text { flex: 1; min-width: 0; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.55rem 0.7rem; }
/* min-width, or a long name refuses to shrink past its min-content and runs UNDER the price
   beside it instead of wrapping — "Huron Blackheart" over "130очк" at pane width. */
.rub-name { min-width: 0; overflow-wrap: break-word; font-size: 0.88rem; font-weight: 600; color: var(--text-primary); }
.rub-count { margin-left: 0.3em; font-weight: 700; color: var(--accent); }
.rub-count.over { color: #c0392b; }
.rub-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); flex-shrink: 0; font-size: 0.8rem; }
/* Owned-mark rail, mirroring the +/− rail on the other side of the row rather than floating over
   the text — these rows are too dense for a corner overlay. Marked rows take the faction's accent,
   the same colour the datasheet grid's star uses (the editor's root folds `--fa-light`/`--fa-dark`
   into `--accent`, so this is the ROSTER's faction — an allied unit's star wears the army's colour,
   which is the pane it is being browsed in). */
.rub-star {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  background: none;
  border: none;
  border-right: 1px solid var(--border);
  color: var(--text-muted);
  opacity: 0.5;
  font-size: 0.85rem;
  cursor: pointer;
}
.rub-star.on { color: var(--accent); opacity: 1; }
@media (hover: hover) { .rub-star:hover { opacity: 1; } }

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
@media (hover: hover) { .rub-remove:hover { background: color-mix(in srgb, var(--text-muted) 12%, transparent); } }
.rub-add { color: var(--accent); }
@media (hover: hover) { .rub-add:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); } }
.rub-add:disabled { opacity: 0.35; cursor: not-allowed; }
@media (hover: hover) { .rub-add:disabled:hover { background: none; } }
@media (max-width: 560px) { .rub-body { gap: 0.3rem; } }
/* In the build panes the catalogue gets half a phone. The name and its price stop competing for
   one line — a unit row is three or four words and a number, and side by side neither fits — and
   the whole scale steps down to match the list beside it.

   Keyed off the PANE, not the viewport: a 390px phone and a 780px tablet hand this component the
   same ~180px, so a viewport breakpoint answers the wrong question (the first attempt used
   `@media (max-width: 380px)` and never fired on the phone it was written for). */
@container (max-width: 300px) {
  .rub-search { font-size: 0.78rem; padding: 0.35rem 0.45rem; margin-bottom: 0.4rem; }
  .rub-head { font-size: 0.62rem; padding: 0.35rem 0.3rem; gap: 0.25rem; }
  .rub-ally-cap { display: block; margin-left: 0; }
  .rub-list { gap: 0.25rem; }
  .rub-text { flex-direction: column; align-items: flex-start; justify-content: center; gap: 0.05rem; padding: 0.4rem 0.45rem; }
  .rub-name { font-size: 0.74rem; line-height: 1.25; }
  .rub-pts { font-size: 0.66rem; }
  .rub-filter-list .check { padding: 0.35rem 0.4rem; gap: 0.35rem; font-size: 0.7rem; }
  .rub-filter-list .check input[type="checkbox"] { width: 16px; height: 16px; }
  .rub-hidden { font-size: 0.62rem; }
  .rub-star { width: 1.5rem; font-size: 0.75rem; }
  .rub-remove,
  .rub-add { width: 1.7rem; font-size: 0.85rem; }
}
</style>
