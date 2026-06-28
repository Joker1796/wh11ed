<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventSequenceHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventSequenceDesc }}</p>
    </div>

    <p class="lead">{{ seq.intro }}</p>

    <template v-for="block in seq.blocks" :key="block.id">
      <RuleBlock :id="block.id" :title="block.title" :body="block.body" :note="block.note" :see-also="block.seeAlso" />
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
      :see-also="block.seeAlso"
    />

    <h2 class="group-heading">{{ labels.eventDesignerHeading }}</h2>
    <RuleBlock
      v-for="block in seq.designerNotes"
      :key="block.id"
      :id="block.id"
      :title="block.title"
      :body="block.body"
      :see-also="block.seeAlso"
    />

    <PageNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RuleBlock from '../../components/RuleBlock.vue'
import DataTable from '../../components/DataTable.vue'
import PageNav from '../../components/PageNav.vue'
import { getEventContent } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const ec = computed(() => getEventContent(locale.value))
const seq = computed(() => ec.value.sequence)
</script>

<style scoped>
.lead {
  margin: 0 0 1.25rem;
  line-height: 1.6;
}
.group-heading {
  font-family: var(--font-display);
  font-size: var(--fs-rule-title);
  margin: 2rem 0 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}
.table-section {
  margin: 1rem 0;
}
</style>
