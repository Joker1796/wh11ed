<template>
  <div class="enhancement-card">
    <div class="enhancement-header">
      <span class="enhancement-name">{{ enhancement.name }}</span>
      <span v-if="enhancement.pts" class="enhancement-pts">{{ enhancement.pts }} pts</span>
    </div>
    <div class="enhancement-body">
      <span v-if="enhancement.restriction" class="enhancement-restriction">
        {{ labels.restrictionLabel }}: {{ enhancement.restriction }}
      </span>
      <p class="enhancement-text" v-html="renderInline(enhancement.text)"></p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRenderInline } from '../composables/useRenderInline.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

defineProps({
  enhancement: { type: Object, required: true },
})

const { renderInline } = useRenderInline()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.enhancement-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
}

.enhancement-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.85rem;
  background: #2a2a2c;
  color: #fff;
}

.enhancement-name {
  font-family: var(--font-serif);
  font-size: 0.88rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.enhancement-pts {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  color: rgba(255,255,255,0.6);
  flex-shrink: 0;
}

.enhancement-body {
  padding: 0.6rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}

.enhancement-restriction {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  color: var(--accent);
}

.enhancement-text {
  margin: 0;
  line-height: 1.5;
  color: var(--text-primary);
}
</style>
