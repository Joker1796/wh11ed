<template>
  <figure class="hd">
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
defineProps({ title: { type: String, default: '' } })
</script>

<style scoped>
.hd {
  margin: 0.2rem 0 0.9rem;
  padding: 0.6rem 0.7rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
}
.hd-title {
  margin-bottom: 0.4rem;
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
.hd :deep(.hd-row + .hd-row) { margin-top: 0.45rem; }
</style>
