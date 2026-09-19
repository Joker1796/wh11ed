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
     two panes 2026-09-19). The screen's root (`.rw-host`, a class the two screens put on
     themselves while the columns are showing) is a flex column exactly as tall as the window has
     left under whatever is above it and above the fixed Cancel/Save bar; everything between the
     root and the columns is `.rw-fill` (a flex column that passes the room down), and the columns
     take what is left after the header, tabs and the faction-rules fold have had their say. The
     two numbers CSS cannot know — where the root starts, and how much padding the page keeps
     under it — are measured here and handed to the root as --rw-top / --rw-below. Everything
     else is the flex algorithm: the fold opening above the columns shrinks them in the same
     layout pass, with no script in the loop. The first version measured where the COLUMNS start
     instead, from a ResizeObserver, and re-measured on every frame of the fold's animation —
     the columns then lagged the fold by a frame, the page became scrollable and unscrollable in
     alternation, and a phone showed it as the whole screen shivering. Before either version the
     panes were capped against the navbar with the catalogue stuck under it, so a finger on the
     catalogue scrolled the catalogue until it ran out and then the page (scroll chaining), which
     a player described as the page «lagging». -->
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

// Where the screen's root starts, in document space (--rw-top: the navbar, an update banner, the
// page's top padding — whatever is above it), and how much the page keeps under it (--rw-below:
// the root's own bottom margin plus the paddings of everything up to and including
// `.main-content`, which is where App.vue reserves the fixed bars' room). Both handed to the
// root as CSS variables; its height is the window minus the two. Neither changes while the user
// works inside the screen — only on resize, or when something above the screen appears or goes
// (the update banner), which the body's or `.main-content`'s size reports. Written only when
// changed. --rw-below is summed from computed styles, never read off the boxes: `.main-content`
// can be as tall as the window on a short page, and measuring against its edge fed the root's
// own height back into itself.
const colsEl = ref(null)
let observer = null
function hostOf(el) { return el?.closest('.rw-host') || el }
function measure() {
  const host = hostOf(colsEl.value)
  if (!host) return
  const top = `${Math.round(host.getBoundingClientRect().top + window.scrollY)}px`
  if (host.style.getPropertyValue('--rw-top') !== top) host.style.setProperty('--rw-top', top)
  const main = host.closest('.main-content')
  if (!main) return
  let px = 0
  for (let n = host; n && n !== main.parentElement; n = n.parentElement) {
    const cs = getComputedStyle(n)
    px += parseFloat(cs.marginBottom) || 0
    if (n !== host) px += (parseFloat(cs.paddingBottom) || 0) + (parseFloat(cs.borderBottomWidth) || 0)
  }
  const below = `${Math.ceil(px)}px`
  if (host.style.getPropertyValue('--rw-below') !== below) host.style.setProperty('--rw-below', below)
}
onMounted(() => {
  measure()
  // App.vue puts its `--desk` class and the bar's --roster-sticky-h on the page in its own
  // render, which can land after this mount — measure once more when that has settled.
  nextTick(measure)
  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(measure)
    observer.observe(document.body)
    // Border box: the reserve under the screen is `.main-content`'s padding, and a padding
    // change does not move the content box the observer watches by default.
    const main = colsEl.value?.closest('.main-content')
    if (main) observer.observe(main, { box: 'border-box' })
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
/* The columns take the room the `.rw-host` flex column has left (style.css: `.rw-host`,
   `.rw-fill`); the one row is exactly that room, and the columns stretch to it. The floor keeps
   a column usable if the fold above opens on something long; the columns then overflow the row
   and the page scrolls, which beats an unusable column. */
.rw-cols {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr) minmax(0, 1.25fr);
  grid-template-rows: minmax(0, 1fr);
  gap: 0.8rem;
  align-items: stretch;
  flex: 1 1 auto;
  min-height: 0;
}

.rw-col {
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
   this overrides the catalogue's sticky-and-capped arrangement. The floor is lower than the
   desk's — a phone with the keyboard up has less window to give. */
.rw-panes {
  grid-template-rows: minmax(0, 1fr);
  align-items: stretch;
  flex: 1 1 auto;
  min-height: 0;
}
.rw-panes > .rp-catalog,
.rw-panes > .rp-list {
  max-height: none;
  min-height: 12rem;
}
.rw-panes > .rp-catalog { position: static; }
.rw-panes > .rp-list {
  overflow-y: auto;
  overscroll-behavior: contain;
}
/* The phone's floating chips («К партии») sit over this pane's bottom-right corner; the pane
   keeps its height, only its scroll end gets the slack, so the last unit can be pulled clear. */
@media (max-width: 900px) {
  .rw-panes > .rp-list { padding-bottom: var(--mobile-bar-h, 0px); }
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
