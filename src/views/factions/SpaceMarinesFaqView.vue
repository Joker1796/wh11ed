<template>
  <div class="faq-view">
    <div v-if="space_marines.faqs.length === 0" class="faq-empty">
      {{ labels.faqEmpty }}
    </div>
    <div v-for="(faq, i) in space_marines.faqs" :key="i" class="faq-card">
      <div class="faq-q">
        <span class="faq-label faq-label-q">Q</span>
        <span class="faq-text">{{ faq.q }}</span>
      </div>
      <div class="faq-a">
        <span class="faq-label faq-label-a">A</span>
        <span class="faq-text">{{ faq.a }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { space_marines } from '../../data/factions/space-marines.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.faq-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1.5rem;
}

.faq-empty {
  padding: 1.5rem;
  text-align: center;
  color: var(--text-dim);
  font-style: italic;
  font-size: 0.88rem;
  border: 1px dashed var(--border);
  border-radius: 6px;
}

.faq-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}

.faq-q,
.faq-a {
  display: flex;
  gap: 0.9rem;
  padding: 0.8rem 1rem;
  align-items: baseline;
}

.faq-q {
  border-bottom: 1px solid var(--border);
}

.faq-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  flex-shrink: 0;
  width: 1.1rem;
  text-align: center;
  padding: 0.15rem 0.35rem;
  border-radius: 2px;
  margin-top: 0.1rem;
}

.faq-label-q {
  background: rgba(110, 0, 8, 0.12);
  color: var(--accent);
  border: 1px solid rgba(110, 0, 8, 0.25);
}

.faq-label-a {
  background: rgba(40, 120, 40, 0.1);
  color: #4a9a4a;
  border: 1px solid rgba(40, 120, 40, 0.2);
}

.faq-text {
  font-size: 0.88rem;
  line-height: 1.55;
  color: var(--text-primary);
}

.faq-q .faq-text {
  color: var(--text-primary);
}

.faq-a .faq-text {
  font-weight: 600;
}
</style>
