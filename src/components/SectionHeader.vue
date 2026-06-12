<template>
  <div class="section-header" :id="id">
    <div v-if="phase" class="phase-tag">{{ phase }}</div>
    <div class="section-header-inner">
      <div class="section-num-large">{{ num }}</div>
      <div class="section-info">
        <h2>{{ title }}</h2>
        <p v-if="description" class="section-desc">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  num: String,
  title: String,
  description: String,
  page: [Number, String],
  phase: String,
})
</script>

<style scoped>
.section-header {
  margin: 2.5rem 0 0;
  scroll-margin-top: var(--header-total);
}

.phase-tag {
  display: inline-block;
  background: var(--accent);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 600;
  font-family: var(--font-sans);
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 2px 2px 0 0;
  margin-bottom: 0;
}

.section-header-inner {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0 0.9rem;
  border-top: 3px solid var(--accent);
  border-bottom: 1px solid var(--border);
  margin-bottom: 0;
}

.section-num-large {
  font-family: var(--font-serif);
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--accent);
  opacity: 0.35;
  line-height: 1;
  min-width: 3.5rem;
  flex-shrink: 0;
  user-select: none;
}

.section-info {
  flex: 1;
  padding-top: 0.25rem;
}

.section-info h2 {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.section-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0.3rem 0 0;
  line-height: 1.55;
  font-style: italic;
}


</style>
