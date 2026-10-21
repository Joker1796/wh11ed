<template>
  <!-- One unit in a faction's list: its name; under it the price at the left (the Legends and
       collection badges beside it) and a Space Marines unit's Chapter at the right — on the price's
       line where it fits, on a line of its own, still at the right, where it does not (owner,
       2026-10-21). A link to the unit's page: the list catches the tap and shows the unit where
       it is (utils/unitLink.js), a new tab still gets the page. `data-unit` is what the list's long
       press reads (useLongPress). -->
  <RouterLink
    :to="`/factions/${slug}/datasheets/${sheet.id}`"
    :data-unit="sheet.id"
    class="ds-chip"
    :class="{ 'ds-chip--row': row, picked }"
    :aria-current="picked ? 'true' : undefined"
  >
    <span class="ds-chip-name">{{ sheet.name }}</span>
    <span
      v-if="chapter"
      class="ds-chip-chapter"
    >{{ chapter }}</span>
    <span
      v-if="sheet.legends"
      class="legends-badge"
      :title="labels.dsLegendsNote"
    >{{ labels.dsLegends }}</span>
    <!-- The collection shown, as the roster catalogue shows it; set from the "…". -->
    <span
      v-if="owned"
      class="legends-badge owned-badge"
      :title="labels.rosterFilterOwned"
      :aria-label="labels.rosterFilterOwned"
    ><i class="wi wi-own-on" /></span>
    <span
      v-if="sheet.points"
      class="ds-chip-pts"
    >{{ ptsSummary(sheet.points) }}</span>
    <!-- The unit's own actions (pin, collection, a new tab…): its menu, hung from this button
         (owner, 2026-10-21 — the pin and collection marks it replaced). -->
    <button
      type="button"
      class="ds-more"
      :title="labels.rosterMoreActions"
      :aria-label="labels.rosterMoreActions"
      aria-haspopup="menu"
      @click.stop.prevent="$emit('more', $event.currentTarget)"
    >
      <i class="wi wi-more" />
    </button>
  </RouterLink>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useCollection } from '../composables/useCollection.js'
import { ptsSummary } from '../data/datasheets/index.js'

const props = defineProps({
  slug: { type: String, required: true },
  sheet: { type: Object, required: true },
  // The unit's Chapter, where the list names one (a Space Marines list with no Chapter chosen).
  chapter: { type: String, default: '' },
  // Shown beside the list now (a wide screen's unit column).
  picked: { type: Boolean, default: false },
  // A wide screen's list of rows rather than a phone's grid of chips.
  row: { type: Boolean, default: false },
})
defineEmits(['more'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { isOwned } = useCollection()
const owned = computed(() => isOwned(props.slug, props.sheet.id))
</script>

<style scoped>
.ds-chip {
  position: relative;
  /* A long press is the unit's menu (useLongPress): not iOS's link preview, not a text selection. */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* A chip stretched to a taller neighbour's row keeps its lines at the top. */
  align-content: flex-start;
  gap: 0.05rem 0.45rem;
  text-align: left;
  /* The top right corner is the "…"'s, so a name never runs under it. */
  padding: 0.35rem 2.1rem 0.35rem 0.55rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  cursor: pointer;
  text-decoration: none;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}
.ds-chip:hover {
  text-decoration: none;
  background: color-mix(in srgb, var(--accent) 8%, var(--bg-card));
  border-color: var(--accent);
}
.ds-chip.picked {
  background: color-mix(in srgb, var(--accent) 12%, var(--bg-card));
  border-color: var(--accent);
}

.ds-chip-name {
  flex: 1 1 100%;
  min-width: 0;
  font-family: var(--font-display);
  font-size: 1.1rem;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}
.ds-chip-pts {
  order: 2;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--text-muted);
  white-space: nowrap;
}
/* Muted on the picked tint falls under 4.5:1 in the dark theme (a11y gate, 2026-10-21). */
.ds-chip.picked .ds-chip-pts { color: var(--text-primary); }
.ds-chip > .legends-badge { order: 3; }
.ds-chip-chapter {
  order: 4;
  margin-left: auto;
  /* Into the "…"'s gutter: the "…" holds only the top corner. */
  margin-right: -1.75rem;
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--accent-ink);
  white-space: nowrap;
}

/* The "…" in the chip's top right corner, where the two marks stood until 2026-10-21. */
.ds-more {
  position: absolute;
  top: 0.2rem;
  right: 0.15rem;
  display: grid;
  place-items: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 0;
  background: none;
  color: var(--text-muted);
  cursor: pointer;
}
@media (hover: hover) {
  .ds-more:hover { color: var(--text-primary); background: color-mix(in srgb, var(--accent) 12%, transparent); }
}

/* A row (a wide screen's list): the chip's own lines, the "…" moved onto the name's line — the
   name's basis leaves it exactly its room, so what follows wraps. The rows touch, sharing one
   edge (components/CLAUDE.md, Borders that touch). */
.ds-chip--row { padding: 0.3rem 0.3rem 0.3rem 0.55rem; }
.ds-chip--row + .ds-chip--row { margin-top: -1px; }
.ds-chip--row:hover,
.ds-chip--row.picked { z-index: 1; }
.ds-chip--row .ds-chip-name { flex-basis: calc(100% - 2.2rem); font-size: 1rem; }
.ds-chip--row .ds-more { position: static; order: 1; height: 1.6rem; }
.ds-chip--row .ds-chip-chapter { margin-right: 0; padding-right: 0.25rem; }
</style>
