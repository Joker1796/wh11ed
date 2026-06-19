<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.eventLayoutsHeading }}</h1>
      <p class="view-hero-desc">{{ labels.eventLayoutsDesc }}</p>
    </div>

    <p
      v-for="(para, i) in introParagraphs"
      :key="i"
      class="lead"
      v-html="renderInline(para)"
    ></p>

    <DataTable
      :title="ec.terrain.footprints.title"
      :headers="ec.terrain.footprints.headers"
      :rows="ec.terrain.footprints.rows"
    />

    <p
      class="footprint-source"
      v-html="renderInline(ec.terrain.footprints.footnote)"
    ></p>

    <p class="key-note" v-html="renderInline(ec.terrain.keyNote)"></p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DataTable from '../../components/DataTable.vue'
import { getEventContent } from '../../data/eventCompanion.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const labels = computed(() => ui[locale.value])

const ec = computed(() => getEventContent(locale.value))

const introParagraphs = computed(() => ec.value.terrain.intro.split('\n\n').filter(p => p.trim()))
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

.key-note {
  margin: 1.25rem 0;
  line-height: 1.6;
  color: var(--text-muted);
  font-size: 0.92rem;
}

.footprint-source {
  margin: 1.25rem 0;
  padding: 0.8rem 1rem;
  border: 1px solid var(--accent);
  border-left-width: 3px;
  border-radius: 6px;
  background: var(--bg-row-hover);
  line-height: 1.5;
  font-size: 0.95rem;
  font-weight: 600;
}
.footprint-source :deep(.ext-link) {
  color: var(--accent);
  text-decoration: underline;
}
</style>
