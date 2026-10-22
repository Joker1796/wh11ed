<template>
  <div
    class="rub-item"
    :class="{ added: count }"
    @click="row.preview(unit.id)"
  >
    <span class="rub-text">
      <span class="rub-name">{{ unit.name }}<span
        v-if="unit.flags?.legends"
        class="legends-badge"
        :title="labels.dsLegendsNote"
      >{{ labels.dsLegends }}</span><span
        v-if="owned"
        class="legends-badge owned-badge"
        :title="labels.rosterFilterOwned"
        :aria-label="labels.rosterFilterOwned"
      ><i class="wi wi-own-on" /></span><span
        v-if="count"
        class="rub-count"
        :class="{ over }"
      > {{ countLabel }}</span></span>
      <span class="rub-pts">{{ points }}{{ labels.rosterPointsLabel }}</span>
    </span>
    <!-- Add only. The "−" that used to sit under it took the last copy of the
         datasheet — a second, hidden way to delete, one tap below the button that
         adds, and on a phone that is where the mis-tap lands. Removing a unit is the
         list's own business, beside the unit being removed (2026-09-23). -->
    <span class="rub-rail">
      <button
        type="button"
        class="rub-add"
        data-tour="cat-add"
        data-press
        :disabled="capped"
        :aria-label="labels.rosterAddUnit"
        :title="capped ? labels.rosterAtDuplicateCap : undefined"
        @click.stop="row.add(unit.id)"
      >
        <i class="wi wi-add" />
      </button>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

// One row of RosterUnitBrowser. A component of its own so that an edit to the list re-renders
// only the rows whose count, price or cap it moved — see RosterUnitBrowserGroup for why the
// catalogue must not re-render as a whole.
const props = defineProps({
  unit: { type: Object, required: true },
  // The catalogue's answers about a unit (RosterUnitBrowser's `row`): one object for the
  // catalogue's lifetime, so passing it never counts as a change.
  row: { type: Object, required: true },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const count = computed(() => props.row.countOf(props.unit.id))
const over = computed(() => props.row.isOver(props.unit))
const capped = computed(() => props.row.atCap(props.unit))
const countLabel = computed(() => props.row.countLabel(props.unit))
const points = computed(() => props.row.minPoints(props.unit))
const owned = computed(() => props.row.ownsUnit(props.unit))
</script>

<style scoped>
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
/* The list's own name size (RosterUnitRow .rur-name): a unit reads the same in both panes. */
.rub-name { min-width: 0; overflow-wrap: break-word; font-size: 0.95rem; font-weight: 600; color: var(--text-primary); }
/* A step under the name it follows (owner, 2026-10-08), in em so it keeps to the name's size. */
.rub-count { margin-left: 0.3em; font-size: 0.85em; font-weight: 700; color: var(--text-muted); }
.rub-count.over { color: var(--danger); }
.rub-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); flex-shrink: 0; font-size: 0.8rem; }
.rub-rail { flex-shrink: 0; display: flex; align-items: stretch; }
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
.rub-add { color: var(--accent-ink); }
@media (hover: hover) { .rub-add:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); } }
.rub-add:disabled { opacity: 0.35; cursor: not-allowed; }
@media (hover: hover) { .rub-add:disabled:hover { background: none; } }
/* In the build panes (RosterUnitBrowser's own container rule says why the pane, not the
   viewport): the name over its price, on the list's scale. */
@container (max-width: 300px) {
  .rub-text { flex-direction: column; align-items: flex-start; justify-content: center; gap: 0.05rem; padding: 0.4rem 0.45rem; }
  /* One scale for both panes. The row is ~59px tall either way — the name sat at 12px inside it
     while the list beside it read at 14 — so this is size the arrangement already had. */
  .rub-name { font-size: 0.85rem; line-height: 1.25; }
  .rub-pts { font-size: 0.85rem; }
  .rub-add { width: 1.7rem; min-height: 1.7rem; font-size: 0.85rem; }
}
</style>
