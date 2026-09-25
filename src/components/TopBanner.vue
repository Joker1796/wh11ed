<template>
  <div
    class="top-banner"
    role="status"
  >
    <i
      class="bi top-banner-icon"
      :class="icon"
    />
    <button
      class="top-banner-close"
      :aria-label="closeLabel"
      @click="$emit('close')"
    >
      <i class="bi bi-x" />
    </button>
    <slot />
  </div>
</template>

<script setup>
// The bar across the top of the app, above the navbar (first child of .app-layout): the "new
// version" notice (UpdateNoticeBar) and the old domain's "we've moved" (DomainMoveBanner). The
// two drew the same bar with the same CSS under two prefixes; when to show one, what it says and
// what closing it remembers stay with each of them.
defineProps({
  // A Bootstrap Icons class: 'bi-stars', 'bi-signpost-2'.
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
  overflow: hidden; /* clearfix: enclose the floats */
}

.top-banner-icon {
  float: left;
  margin: 0.15rem 0.6rem 0.2rem 0;
  color: var(--accent);
  font-size: 1rem;
}

.top-banner-close {
  float: right;
  margin: 0 0 0.2rem 0.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.1rem;
}

.top-banner-close:hover {
  color: var(--text-on-dark);
}
</style>
