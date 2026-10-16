<template>
  <div class="group-label-block">
    <div class="group-label-title">
      {{ title }}
    </div>
    <p
      v-safe-html="renderedBody"
      class="group-label-body"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRenderInline } from '../composables/useRenderInline.js'
import { vSafeHtml } from '../directives/safeHtml.js'

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
/* Dark theme: light text behind a red bar — the dark red is below AA as text (npm run a11y,
   owner 2026-10-16). */
:root[data-theme='dark'] .group-label-title {
  color: var(--text-primary);
  padding-left: 0.5rem;
  border-left: 3px solid var(--accent);
}

.group-label-body {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
}
</style>
