<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventSequenceHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventSequenceDesc }}</p>
    </div>

    <p class="lead">{{ seq.intro }}</p>

    <template v-for="block in seq.blocks" :key="block.id">
      <RuleBlock :id="block.id" :title="block.title" :body="block.body" :note="block.note" />
      <div v-if="block.table" class="table-section">
        <DataTable
          :title="block.table.title"
          :headers="block.table.headers"
          :rows="block.table.rows"
          :footnote="block.tableNote"
        />
      </div>
    </template>

    <h2 class="group-heading">{{ labels.eventSecondaryHeading }}</h2>
    <RuleBlock
      v-for="block in seq.secondary"
      :key="block.id"
      :id="block.id"
      :title="block.title"
      :body="block.body"
    />

    <h2 class="group-heading">{{ labels.eventDesignerHeading }}</h2>
    <RuleBlock
      v-for="block in seq.designerNotes"
      :key="block.id"
      :id="block.id"
      :title="block.title"
      :body="block.body"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RuleBlock from '../../components/RuleBlock.vue'
import DataTable from '../../components/DataTable.vue'
import { eventCompanion } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const ec = computed(() => ({ ...eventCompanion.en, ...eventCompanion.ru }))
const seq = computed(() => ec.value.sequence)
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
.group-heading {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  margin: 2rem 0 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}
.table-section {
  margin: 1rem 0;
}
</style>
