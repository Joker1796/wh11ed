<template>
  <div class="detachment-block">
    <div class="detachment-header">
      <span class="detachment-rule-badge">{{ labels.detachmentRuleLabel }}</span>
      <span class="detachment-rule-name">{{ rule.name }}</span>
      <span v-if="unique" class="detachment-unique-badge">
        {{ labels.uniqueLabel }}: {{ unique }}
      </span>
    </div>
    <div v-if="description" class="detachment-description">{{ description }}</div>
    <div class="detachment-body"><RuleBody :body="rule.text" /></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import RuleBody from './RuleBody.vue'

defineProps({
  rule: { type: Object, required: true },
  description: { type: String, default: '' },
  unique: { type: String, default: '' },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
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
  flex-wrap: wrap;
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

.detachment-unique-badge {
  margin-left: auto;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  color: #ff8a92;
  flex-shrink: 0;
  background: rgba(110, 0, 8, 0.35);
  border: 1px solid rgba(255, 138, 146, 0.4);
  padding: 0.2rem 0.45rem;
  border-radius: 2px;
}

@media (max-width: 480px) {
  .detachment-unique-badge {
    margin-left: 0;
  }
}

.detachment-description {
  padding: 0.65rem 0.9rem 0;
  font-size: 0.82rem;
  font-style: italic;
  color: var(--text-secondary);
  line-height: 1.5;
}

.detachment-body {
  padding: 0.8rem 0.9rem;
  font-size: 0.87rem;
  line-height: 1.55;
  color: var(--text-primary);
}
</style>
