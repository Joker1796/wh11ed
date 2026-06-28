<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventTeamsHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventTeamsDesc }}</p>
    </div>

    <p class="lead">{{ teams.intro }}</p>

    <template v-for="block in teams.blocks" :key="block.id">
      <RuleBlock
        :id="block.id"
        :title="block.title"
        :body="block.body"
        :note="block.note"
        :see-also="block.seeAlso"
      />
      <div v-if="block.table" class="table-section">
        <DataTable
          :title="block.table.title"
          :headers="block.table.headers"
          :rows="block.table.rows"
          :footnote="block.tableNote"
        />
      </div>
    </template>

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
const teams = computed(() => ec.value.teams)
</script>

<style scoped>
.lead {
  margin: 0 0 1.25rem;
  line-height: 1.6;
}
.table-section {
  margin: 1rem 0;
}
</style>
