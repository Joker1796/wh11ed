<template>
  <div class="detachment-block">
    <div class="detachment-header">
      <span class="detachment-rule-badge">{{ labels.detachmentRuleLabel }}</span>
      <span class="detachment-rule-name">{{ rule.name }}</span>
    </div>
    <div class="detachment-body" v-html="renderedText"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRenderInline } from '../composables/useRenderInline.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const props = defineProps({
  rule: { type: Object, required: true },
})

const { renderInline } = useRenderInline()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const renderedText = computed(() => {
  const lines = (props.rule.text || '').split('\n')
  let html = ''
  let inUl = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('▪ ')) {
      if (!inUl) { html += '<ul>'; inUl = true }
      html += `<li>${renderInline(trimmed.slice(2))}</li>`
    } else {
      if (inUl) { html += '</ul>'; inUl = false }
      if (trimmed) {
        if (html) html += '<br>'
        html += renderInline(trimmed)
      }
    }
  }
  if (inUl) html += '</ul>'
  return html
})
</script>

<style scoped>
.detachment-block {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.detachment-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.9rem;
  background: #1c1c1e;
  color: #fff;
}

.detachment-rule-badge {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.2);
  padding: 0.15rem 0.4rem;
  border-radius: 2px;
}

.detachment-rule-name {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.detachment-body {
  padding: 0.8rem 0.9rem;
  font-size: 0.87rem;
  line-height: 1.55;
  color: var(--text-primary);
}

.detachment-body :deep(ul) {
  margin: 0.4rem 0 0;
  padding-left: 1.25rem;
}

.detachment-body :deep(li) {
  margin-bottom: 0.25rem;
}
</style>
