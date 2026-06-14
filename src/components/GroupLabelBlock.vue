<template>
  <div class="group-label-block">
    <div class="group-label-title">{{ title }}</div>
    <p class="group-label-body">{{ body }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  body: String,
})
</script>

<style scoped>
.group-label-block {
  border-top: 2px solid var(--border);
  padding: 1rem 0 0.5rem;
  margin-top: 0.5rem;
}

.group-label-title {
  font-family: var(--font-serif);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--accent);
  margin-bottom: 0.35rem;
}

.group-label-body {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
}
</style>
