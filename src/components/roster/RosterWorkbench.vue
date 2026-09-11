<!-- The desk: catalogue, the list being built, and the chosen unit's configuration, side by side.
     Used above 1200px by both building screens; below that each keeps what it had (two panes with
     an inline accordion, and a modal on a phone).

     It is a layout and nothing else — the columns are slots, because between them they need some
     twenty-five values the callers have already computed, and threading those through a component
     would only move the work. Both arrangements live here so the catalogue and the list are
     written ONCE per screen: below the threshold this renders the same `.roster-panes` markup it
     always did.

     What the desk owns is the part neither caller can express on its own: three independent
     scroll areas that stay put while the page behind them scrolls.

     Each column sticks under the navbar and scrolls inside itself, which is the same trick the
     catalogue pane already used — not a fixed-height shell, whose height every floating bar in the
     app is free to invalidate. -->
<template>
  <div v-if="desk" class="rw-cols">
    <div class="rw-col rw-col-fill"><slot name="catalog" /></div>
    <div class="rw-col rw-col-scroll"><slot name="list" /></div>
    <div class="rw-col rw-col-scroll">
      <slot v-if="selected" name="editor" />
      <p v-else class="rw-empty">{{ labels.rosterPickUnitHint }}</p>
    </div>
  </div>
  <!-- Narrower: the two panes exactly as they were, down to the global `.roster-panes` classes
       (style.css) both building screens have always used. The fields go back inside the list,
       which draws them itself — inline, or in a modal on a phone. -->
  <div v-else class="roster-panes">
    <div class="rp-catalog"><slot name="catalog" /></div>
    <div class="rp-list"><slot name="list" /></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

defineProps({
  // Whether a unit is chosen. A slot with a `v-if` inside still counts as provided, so the empty
  // state cannot be slot fallback — the caller says which of the two this is.
  selected: { type: Boolean, default: false },
  // Three columns, or the two panes. The caller decides, because the same answer also settles
  // where the unit's fields go (`RosterUnitList`'s `placement`) and whether the settings live in
  // a bar or in a tab — one media query, read once per screen.
  desk: { type: Boolean, default: false },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.rw-cols {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr) minmax(0, 1.25fr);
  gap: 0.8rem;
  align-items: start;
}

.rw-col {
  position: sticky;
  /* Under the app's own sticky navbar, and clear of the fixed Cancel/Save bar below
     (--roster-sticky-h, set by App.vue for any screen carrying a .rc-sticky). */
  top: calc(var(--navbar-height) + var(--safe-top) + 0.5rem);
  max-height: calc(100dvh - var(--navbar-height) - var(--safe-top) - var(--roster-sticky-h, 0px) - 1.5rem);
  min-width: 0;
  /* Everything inside a column sizes itself against the COLUMN, exactly as the two panes do:
     the same rows render at a third of the window here and at half a phone there. */
  container-type: inline-size;
}

/* The catalogue scrolls its own body (it has a search box that must stay put), so it gets the
   height and lets its child fill it. */
.rw-col-fill {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.rw-col-fill > :deep(*) { flex: 1; min-height: 0; }

/* The list and the unit's fields are plain content — the column is what scrolls. */
.rw-col-scroll {
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-right: 0.2rem;
}

.rw-empty {
  margin: 2rem 0 0;
  padding: 0 1rem;
  text-align: center;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--text-dim);
}
</style>
