<template>
  <CollapseTransition :show="show">
    <div
      class="top-banner"
      role="status"
    >
      <i
        class="wi top-banner-icon"
        :class="icon"
      />
      <button
        class="top-banner-close"
        :aria-label="closeLabel"
        @click="$emit('close')"
      >
        <i class="wi wi-close" />
      </button>
      <slot />
    </div>
  </CollapseTransition>
</template>

<script setup>
// The bar across the top of the app, above the navbar (first child of .app-layout): the "new
// version" notice (UpdateNoticeBar) and the old domain's "we've moved" (DomainMoveBanner). The
// two drew the same bar with the same CSS under two prefixes; when to show one, what it says and
// what closing it remembers stay with each of them.
//
// It collapses rather than vanishing (`show`, not a caller's v-if): the bar sits above the navbar,
// so a v-if dropped the whole page by its height in one frame when it was closed. (Said here, not
// in the template: a comment before the root makes the root a Fragment in dev.)
import CollapseTransition from './CollapseTransition.vue'

defineProps({
  // Driven by state, not v-if, so closing can animate (CollapseTransition).
  show: { type: Boolean, default: true },
  // A Bootstrap Icons class: 'wi-stars', 'wi-signpost'.
  icon: { type: String, required: true },
  closeLabel: { type: String, required: true },
})
defineEmits(['close'])
</script>

<style scoped>
/* A tinted-accent bar; the icon and the close button float, so the text lines wrap around them
   instead of each reserving a full-height column (which left an awkward gap next to the short
   icon glyph). */
.top-banner {
  /* Sits before the sticky navbar, which pads itself by --safe-top to clear the iOS status
     bar/notch (viewport-fit=cover). Do the same here, or on an installed PWA this content
     renders under the status bar icons instead of below them. */
  padding: calc(0.6rem + var(--safe-top)) 1rem 0.6rem;
  background: color-mix(in srgb, var(--accent) 12%, var(--bg-insert));
  border-bottom: 1px solid var(--accent);
  color: var(--text-on-dark);
  font-size: 0.82rem;
  line-height: 1.4;
  /* One line of the text: the icon and the cross are centred on the FIRST line, whatever wraps. */
  --tb-line: calc(0.82rem * 1.4);
  overflow: hidden; /* clearfix: enclose the floats */
}

.top-banner-icon {
  float: left;
  /* The box is exactly one line tall and the glyph is centred in it (the mask is `contain`); the
     shared .wi's baseline nudge would put it back under the line (owner, 2026-10-16). */
  width: 1.2rem;
  height: var(--tb-line);
  margin: 0 0.6rem 0 0;
  vertical-align: top;
  color: var(--accent-ink);
}

.top-banner-close {
  float: right;
  /* 24px is taller than the line: the overhang is split above and below it. */
  margin: calc((var(--tb-line) - 24px) / 2) 0 0 0.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  /* The cross at the size of the text beside it (owner, 2026-10-16: at 1.1rem it was the loudest
     thing on the bar); the box keeps a 24px tap target around it. */
  font-size: 0.8rem;
  min-width: 24px;
  min-height: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.top-banner-close:hover {
  color: var(--text-on-dark);
}
</style>
