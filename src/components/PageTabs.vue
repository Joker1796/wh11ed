<template>
  <!-- Angular 40k-style page tabs. Two shapes of tab, one look: a router-linked tab (`to`)
       for pages that are separate routes, a plain button (`key`) for an in-page switch. -->
  <nav
    class="page-tabs"
    :class="{ 'page-tabs--fill': fill }"
    :aria-label="ariaLabel"
    :role="asTablist ? 'tablist' : undefined"
  >
    <template
      v-for="t in tabs"
      :key="t.key || t.to"
    >
      <RouterLink
        v-if="t.to"
        :to="t.to"
        class="page-tab"
        :class="{ active: t.active }"
      >
        <span
          class="pt-bg"
          aria-hidden="true"
        /><span
          class="pt-frame"
          aria-hidden="true"
        /><span
          class="pt-line"
          aria-hidden="true"
        /><i
          v-if="t.icon"
          class="page-tab-icon"
          :class="t.icon"
        /><span class="page-tab-label">{{ t.label }}</span>
        <i
          v-if="t.warn"
          class="bi bi-exclamation-triangle-fill page-tab-warn"
          role="img"
          :aria-label="t.warn"
          :title="t.warn"
        />
        <span
          v-if="t.count != null"
          class="page-tab-n"
        >{{ t.count }}</span>
      </RouterLink>
      <button
        v-else
        type="button"
        class="page-tab"
        :class="{ active: t.active }"
        role="tab"
        :aria-selected="!!t.active"
        @click="emit('select', t.key)"
      >
        <span
          class="pt-bg"
          aria-hidden="true"
        /><span
          class="pt-frame"
          aria-hidden="true"
        /><span
          class="pt-line"
          aria-hidden="true"
        /><i
          v-if="t.icon"
          class="page-tab-icon"
          :class="t.icon"
        /><span class="page-tab-label">{{ t.label }}</span>
        <i
          v-if="t.warn"
          class="bi bi-exclamation-triangle-fill page-tab-warn"
          role="img"
          :aria-label="t.warn"
          :title="t.warn"
        />
        <span
          v-if="t.count != null"
          class="page-tab-n"
        >{{ t.count }}</span>
      </button>
    </template>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

// Which tab is open is the caller's business (a route prefix here, a ref there), so every tab
// arrives with its own `active` — this component only draws them.
const props = defineProps({
  // [{ key?, to?, label, icon?, count?, active?, warn? }] — `warn` is the sentence the mark
  // stands for (it is both the tooltip and the accessible name), so an empty string draws nothing.
  tabs: { type: Array, required: true },
  ariaLabel: { type: String, default: '' },
  // The tabs share the row equally, and a label longer than its share is cut with "…" — a
  // player's name can be any length (the tracker's side tabs).
  fill: { type: Boolean, default: false },
})
const emit = defineEmits(['select'])

// Links are navigation, not a tablist; buttons switching one panel are. A mixed set is not a
// thing we do, so the whole nav follows whichever it is.
const asTablist = computed(() => props.tabs.every((t) => !t.to))

</script>

<style scoped>
/* Classic folder tabs, square corners: the closed (inactive) tabs are recessed
   (--bg-secondary) boxes whose bottom sits flush with a full-width accent line; the open
   (active) tab is a content-coloured (--bg-primary) box with an accent frame whose bottom
   border matches the content, erasing the line under it so it merges into the content. The
   open/closed states are told apart by their background colour.
   --accent is inherited, so the faction pages get these tabs in their own colour for free. */
.page-tabs {
  display: flex;
  gap: 0;
  /* The row is measured, not the window: the same tabs stand in a narrow column on a wide screen
     (the rosters desk with its unit pane open) and must tighten there as they do on a phone. */
  container: page-tabs / inline-size;
  /* full-width accent line the tabs sit on */
  border-bottom: 1px solid var(--accent);
}

.page-tab {
  position: relative;
  overflow: hidden; /* hides the frame while it waits below the tab */
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-muted);
  /* The content's colour under every tab: it covers the container's line, so where the open
     tab's own line has parted the tab opens into the content. The closed look is a layer on top.
     Content on a ground of its own (a card) names that ground in --page-tab-open-bg. */
  background: var(--page-tab-open-bg, var(--bg-primary));
  border: 0;
  padding: 0.55rem 1.3rem;
  margin-bottom: -1px; /* overlap the container's accent line */
  text-decoration: none;
  cursor: pointer;
  transition: color calc(var(--motion-page-tab) * 0.6) ease;
}
.page-tab.active { color: var(--accent-ink); }
@media (hover: hover) {
  .page-tab:not(.active):hover { color: var(--text-primary); }
}

/* Switching (owner's mock "frame from the line", 2026-09-30): the new tab's line parts from its
   centre and its frame rises out of it; the old tab's frame drops away, then its line closes
   again. Each part is a layer moved by transform/opacity only; a layer's timing for entering and
   for leaving is the one its TARGET state carries (.active or not). */
.pt-bg, .pt-frame, .pt-line { position: absolute; pointer-events: none; }
/* The closed tab: recessed, with its own hairline edge. */
.pt-bg {
  inset: 0;
  background: var(--bg-secondary);
  box-shadow: inset 0 0 0 1px var(--border);
  transition: opacity calc(var(--motion-page-tab) * 0.5) ease;
}
.page-tab.active .pt-bg {
  opacity: 0;
  transition-delay: calc(var(--motion-page-tab) * 0.1);
}
/* The open tab's frame: top and sides, open at the bottom into the content. */
.pt-frame {
  inset: 0;
  z-index: 1;
  border: 1px solid var(--accent);
  border-bottom: 0;
  transform: translateY(100%);
  transition: transform calc(var(--motion-page-tab) * 0.4) cubic-bezier(0.6, 0, 0.8, 0.4);
}
.page-tab.active .pt-frame {
  transform: none;
  transition: transform calc(var(--motion-page-tab) * 0.6) cubic-bezier(0.2, 0.8, 0.2, 1) calc(var(--motion-page-tab) * 0.18);
}
/* The accent line under a closed tab. */
.pt-line {
  left: 0; right: 0; bottom: 0;
  z-index: 1;
  height: 1px;
  background: var(--accent);
  transition: transform calc(var(--motion-page-tab) * 0.3) cubic-bezier(0.65, 0, 0.35, 1) calc(var(--motion-page-tab) * 0.3);
}
.page-tab.active .pt-line {
  transform: scaleX(0);
  transition-delay: 0s;
}
/* What the tab says, over the layers, on one line in every tab. The mock sat a closed tab's word
   3px lower and lifted it on opening; at rest that read as the words not lining up (owner,
   2026-09-30), so the word stays put and only the frame, line and fill move. */
.page-tab > :not(.pt-bg, .pt-frame, .pt-line) { position: relative; z-index: 2; }

.page-tab-label { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.page-tab-n, .page-tab-icon, .page-tab-warn { flex-shrink: 0; }
.page-tabs--fill .page-tab { flex: 1 1 0; min-width: 0; justify-content: center; padding-inline: 0.6rem; }

/* Slightly smaller than the tab text so the display-font label stays the anchor. */
.page-tab-icon {
  font-size: 0.9em;
}
/* The owner's drawings are lighter than a Bootstrap glyph of the same box: a step up to read the
   same beside the label (owner, 2026-10-08). */
.page-tab-icon.wi { font-size: 1.05em; }

/* "There is something left to answer behind this tab." Amber, not the error red: what it marks is
   a list that is legal and saveable — the player simply still owes a choice, and a red mark would
   read as "you broke something". It keeps its own colour in both tab states on purpose: the whole
   point of it is that a CLOSED tab says so, instead of the player finding out at Save. */
.page-tab-warn {
  font-size: 0.78em;
  color: var(--warning);
}

/* A count is a footnote to the label, not part of it — same monospace treatment the roster
   cards use for their numbers. */
.page-tab-n {
  font-family: var(--font-mono);
  font-size: 0.72em;
  opacity: 0.75;
}

@container page-tabs (max-width: 640px) {
  /* Three tabs share the row on the faction pages — tighten them so they fit on a phone (or in a
     narrow column) without scrolling. */
  .page-tab {
    flex: 1 1 0;
    justify-content: center;
    gap: 0.35rem;
    font-size: 1rem;
    padding: 0.5rem 0.4rem;
  }
}
</style>
