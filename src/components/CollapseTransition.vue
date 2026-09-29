<template>
  <div
    class="collapse"
    :class="{ 'is-open': show }"
  >
    <div class="collapse-clip">
      <slot />
    </div>
  </div>
</template>

<script setup>
// Reusable height-collapse for accordions/disclosures whose content height is unknown/variable
// (rule bodies, briefings, legends). Driven by state via the `show` prop.
//
// Technique: the CSS grid `0fr → 1fr` row trick. The outer `.collapse` is a single-row grid whose
// track size is animated; the inner `.collapse-clip` has `overflow:hidden; min-height:0`, so the
// slotted (padded) content is clipped cleanly to nothing at 0fr — padding/margins collapse for free
// with NO per-frame padding/margin/box-sizing churn and NO synchronous scrollHeight read. Only two
// properties transition (the grid track + opacity), and `contain` scopes the reflow to this subtree,
// which is what fixes the jank on phones. Late-loading images just grow the open row naturally.
//
// Duration comes from the shared --motion-med token, so `prefers-reduced-motion` (which zeroes the
// token in style.css) collapses instantly with no special-casing here.
//
// Unlike the old <Transition>+v-show wrapper, the slot may have any number of root nodes, and the
// caller no longer toggles the content itself — pass the open state as `:show`.
defineProps({
  show: { type: Boolean, default: false },
})
</script>

<style scoped>
.collapse {
  display: grid;
  grid-template-rows: 0fr;
  /* `--motion-fold` on a curve that STARTS slowly (2026-09-28). A tall body — a detachment's
     nine stratagems, a few thousand px — shows only its first few hundred px while it opens (a
     sheet grows to its cap on those), and a decelerating curve spent that part in a few
     hundredths of a second: at --motion-med, and still at a front-loaded curve, it read as a
     jump to the full height. */
  transition: grid-template-rows var(--motion-fold) cubic-bezier(0.4, 0, 0.2, 1);
}
.collapse.is-open {
  grid-template-rows: 1fr;
}

.collapse-clip {
  overflow: hidden;
  min-height: 0;
  /* Scope layout/paint of the (potentially large) collapsed subtree so the per-frame track resize
     doesn't force the browser to reconsider the whole page — the main mobile-jank win. */
  contain: layout paint;
  /* Fade with the height so content doesn't pop in at full opacity. Collapsed content also leaves
     the a11y tree + tab order (like the old v-show's display:none): visibility flips to hidden only
     after the collapse finishes, and back to visible immediately on open. */
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--motion-fast) ease, visibility 0s linear var(--motion-fold);
}
.collapse.is-open .collapse-clip {
  opacity: 1;
  visibility: visible;
  /* Opening, the content fades in a beat after the room starts to open, not ahead of it. */
  transition: opacity var(--motion-fold) ease calc(var(--motion-fold) / 4), visibility 0s;
}
</style>
