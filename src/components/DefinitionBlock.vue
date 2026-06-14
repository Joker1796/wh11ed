<template>
  <div class="definition-block">
    <div v-for="(def, i) in definitions" :key="i" :id="'def-' + def.id" class="definition-item">
      <p class="definition-term">{{ def.term }}</p>
      <div class="definition-text" v-html="renderLines(def.text)"></div>
    </div>
  </div>
</template>

<script setup>
import { useRenderInline } from '../composables/useRenderInline.js'

defineProps({
  definitions: {
    type: Array,
    required: true,
  },
})

const { renderInline } = useRenderInline()

function renderLines(text) {
  return text
    .split('\n\n')
    .map(p => `<p>${renderInline(p.trim())}</p>`)
    .join('')
}
</script>

<style scoped>
.definition-block {
  background: #cfd0c3;
  border-radius: 4px;
  margin-top: 1rem;
  overflow: hidden;
}

.definition-item {
  padding: 0.6rem 0.9rem;
  font-size: 0.88rem;
  line-height: 1.6;
  scroll-margin-top: var(--header-total);
}

.definition-item + .definition-item {
  border-top: 1px solid #b8b9ac;
}

.definition-term {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.15rem;
  color: var(--text-primary);
}

.definition-text :deep(p) {
  margin-bottom: 0.4rem;
}

.definition-text :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
