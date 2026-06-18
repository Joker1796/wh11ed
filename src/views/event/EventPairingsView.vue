<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventPairingsHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventPairingsDesc }}</p>
    </div>

    <p class="lead">{{ pairings.intro }}</p>

    <RuleBlock
      v-for="block in pairings.blocks"
      :key="block.id"
      :id="block.id"
      :title="block.title"
      :body="block.body"
      :note="block.note"
      :see-also="block.seeAlso"
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
const pairings = computed(() => ec.value.pairings)
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
.lead {
  margin: 0 0 1.25rem;
  line-height: 1.6;
}
</style>
