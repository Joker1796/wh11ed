<template>
  <figure
    class="hd"
    :class="{ bare }"
  >
    <figcaption
      v-if="title"
      class="hd-title"
    >
      {{ title }}
    </figcaption>
    <slot />
  </figure>
</template>

<script setup>
// The frame every help demo sits in (help/*Demo.vue): a card above the help's words, its title the
// unit or screen it shows. One frame, so the demos look like one family and no two copy its rules.
defineProps({
  title: { type: String, default: '' },
  // A demo with a frame of its own (a game tab hanging from its strip): no second card around it.
  bare: { type: Boolean, default: false },
})
</script>

<style scoped>
.hd {
  margin: 0 0 0.75rem;
  padding: 0.45rem 0.6rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
}
.hd.bare { padding: 0; border: 0; background: none; }
.hd-title {
  margin-bottom: 0.25rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  color: var(--text-primary);
}
.hd :deep(.hd-cap) {
  display: block;
  margin-bottom: 0.15rem;
  font-size: 0.72rem;
  color: var(--text-muted);
}
.hd :deep(.hd-row + .hd-row) { margin-top: 0.35rem; }
</style>
