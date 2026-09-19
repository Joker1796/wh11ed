<!-- The desk: catalogue, the list being built, and the chosen unit's configuration, side by side.
     Used above 1200px by both building screens; below that each keeps what it had (two panes with
     an inline accordion, and a modal on a phone).

     It is a layout and nothing else — the columns are slots, because between them they need some
     twenty-five values the callers have already computed, and threading those through a component
     would only move the work. Both arrangements live here so the catalogue and the list are
     written ONCE per screen: below the threshold this renders the same `.roster-panes` markup it
     always did.

     What the desk owns is the part neither caller can express on its own: independent scroll
     areas that stay put, on a page that does not scroll.

     Each column scrolls inside itself, and the PAGE does not scroll at all (desk 2026-09-18, the
     two panes 2026-09-19): the columns are sized to what the window has left under whatever sits
     above them and above the fixed Cancel/Save bar, measured — where the columns start, and how
     much padding the page keeps under them, are the two numbers CSS cannot know, because the bar
     and the faction-rules fold above them are as tall as their content. Before, the panes were
     capped against the navbar alone with the catalogue stuck under it, so a finger on the
     catalogue scrolled the catalogue until it ran out and then the page (scroll chaining), which
     a player described as the page «lagging»; a nested scroll on a phone always feels like that. -->
<template>
  <div
    v-if="desk"
    ref="colsEl"
    class="rw-cols"
  >
    <div class="rw-col rw-col-fill">
      <slot name="catalog" />
    </div>
    <div class="rw-col rw-col-scroll">
      <slot name="list" />
    </div>
    <div class="rw-col rw-col-scroll">
      <slot
        v-if="selected"
        name="editor"
      />
      <p
        v-else
        class="rw-empty"
      >
        {{ labels.rosterPickUnitHint }}
      </p>
    </div>
  </div>
  <!-- Narrower: the two panes exactly as they were, down to the global `.roster-panes` classes
       (style.css) both building screens have always used. The fields go back inside the list,
       which draws them itself — inline, or in a modal on a phone. -->
  <div
    v-else
    ref="colsEl"
    class="roster-panes rw-panes"
  >
    <div class="rp-catalog">
      <slot name="catalog" />
    </div>
    <div class="rp-list">
      <slot name="list" />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
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

// Where the columns start, in document space (--rw-top), and how much the page keeps under them
// (--rw-below: the paddings between the columns' bottom edge and the end of `.main-content`,
// which is where App.vue reserves the fixed bars' room). Both handed to the CSS; the column
// height is the window minus the two. Re-measured when anything on the page changes size (the
// faction-rules fold opening, a detachment name wrapping the bar onto two lines) and on resize —
// a ResizeObserver on the body is one observer for all of those. Written only when changed, so
// the observer's own reaction to the height it just set does not loop.
const colsEl = ref(null)
let observer = null
function measure() {
  const el = colsEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const top = `${Math.round(rect.top + window.scrollY)}px`
  if (el.style.getPropertyValue('--rw-top') !== top) el.style.setProperty('--rw-top', top)
  // Summed from the computed styles, not read off the boxes: `.main-content` is a flex item that
  // fills the window, so its bottom edge is the window's whenever the page is short — measuring
  // the gap against it fed the columns' own height back into itself and shrank them to the floor.
  const main = el.closest('.main-content')
  if (!main) return
  let px = 0
  for (let n = el; n && n !== main.parentElement; n = n.parentElement) {
    const cs = getComputedStyle(n)
    px += parseFloat(cs.marginBottom) || 0
    if (n !== el) px += (parseFloat(cs.paddingBottom) || 0) + (parseFloat(cs.borderBottomWidth) || 0)
  }
  const below = `${Math.ceil(px)}px`
  if (el.style.getPropertyValue('--rw-below') !== below) el.style.setProperty('--rw-below', below)
}
onMounted(() => {
  measure()
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(measure)
    observer.observe(document.body)
    // The body is min-height: 100vh and `.main-content` fills the window, so a page shorter than
    // the window can change height without either noticing — the screen's own root element (the
    // child of `.main-content` the columns sit in) is as tall as its content and does.
    const main = colsEl.value?.closest('.main-content')
    let root = colsEl.value
    while (root && root.parentElement !== main) root = root.parentElement
    if (root) observer.observe(root)
  }
  window.addEventListener('resize', measure)
})
onUnmounted(() => {
  observer?.disconnect()
  window.removeEventListener('resize', measure)
})
watch(() => props.desk, () => nextTick(measure))
</script>

<style scoped>
.rw-cols {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr) minmax(0, 1.25fr);
  gap: 0.8rem;
  align-items: start;
}

.rw-col {
  /* The window, minus where the columns start (--rw-top, measured above), minus the fixed
     Cancel/Save bar (--roster-sticky-h, set by App.vue for any screen carrying a .rc-sticky)
     and the gap above it — the same sum App.vue's desk padding reserves below, so the page
     ends exactly at the window's edge and has nothing to scroll. Until the first measurement
     the fallback is the navbar alone. The floor keeps the columns usable if the fold above
     them opens on something long; the page then scrolls, which beats an unusable column. */
  height: calc(100dvh - var(--rw-top, calc(var(--navbar-height) + var(--safe-top))) - var(--rw-below, calc(var(--roster-sticky-h, 0px) + 1rem)));
  min-height: 16rem;
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

/* The two panes, same model: each pane is a scroll area of its own and the page stands still.
   The base `.roster-panes` rules (style.css) still lay them out and make them query containers;
   this overrides the catalogue's sticky-and-capped arrangement with a fixed height. The floor
   is lower than the desk's — a phone with the keyboard up has less window to give. */
.rw-panes > .rp-catalog,
.rw-panes > .rp-list {
  height: calc(100dvh - var(--rw-top, calc(var(--navbar-height) + var(--safe-top))) - var(--rw-below, calc(var(--roster-sticky-h, 0px) + 1rem)));
  max-height: none;
  min-height: 12rem;
}
.rw-panes > .rp-catalog { position: static; }
.rw-panes > .rp-list {
  overflow-y: auto;
  overscroll-behavior: contain;
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
