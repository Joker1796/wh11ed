<template>
  <div class="group-label-block">
    <div class="group-label-title">
      {{ title }}
    </div>
    <p
      class="group-label-body"
      v-html="renderedBody"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRenderInline } from '../composables/useRenderInline.js'

const { renderInline } = useRenderInline()

const props = defineProps({
  title: String,
  body: String,
})

const renderedBody = computed(() => props.body ? renderInline(props.body) : '')
</script>

<style scoped>
.group-label-block {
  border-top: 2px solid var(--border);
  padding: 1rem 0 0.5rem;
  margin-top: 0.5rem;
}

/* The condensed display face this small reads cramped above 400 (owner, 2026-10-07). */
.group-label-title {
  font-family: var(--font-display);
  font-size: 1.01rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: var(--accent-ink);
  margin-bottom: 0.35rem;
}

.group-label-body {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
}
</style>
