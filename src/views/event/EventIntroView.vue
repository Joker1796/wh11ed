<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventIntroHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventIntroDesc }}</p>
    </div>

    <RuleBlock
      :id="intro.id"
      :body="intro.body"
      :note="intro.note"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RuleBlock from '../../components/RuleBlock.vue'
import { eventCompanion } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const ec = computed(() => ({ ...eventCompanion.en, ...eventCompanion.ru }))
const intro = computed(() => ec.value.sequence.introduction)
</script>

<style scoped>
.view-hero {
  padding: 1.25rem 0 0.9rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1.25rem;
}
.view-hero h1 {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  margin-bottom: 0.4rem;
}
.view-hero-desc {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-style: italic;
}
/* Hero already provides the "Introduction" heading; hide the empty rule header. */
:deep(.rule-block > .rule-header) {
  display: none;
}
</style>
