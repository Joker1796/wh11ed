<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.battlefieldsHeading }}</h1>
      <p class="view-hero-desc">{{ labels.battlefieldsDesc }}</p>
    </div>

    <TableOfContents :sections="tocSections" />

    <template v-for="section in sections" :key="section.id">
      <SectionHeader
        :id="'section-' + section.id.padStart(2,'0')"
        :num="section.num"
        :title="section.title"
        :description="section.description"
        :page="section.page"
      />

      <template v-for="sub in section.subsections.filter(s => !s.renderAfterStratagems && !s.inline)" :key="sub.id">
        <GroupLabelBlock
          v-if="sub.isGroupLabel"
          :title="sub.title"
          :body="sub.body"
        />
        <RuleBlock
          v-else
          :id="sub.id"
          :section-num="sub.sectionNum"
          :title="sub.title"
          :body="sub.body"
          :note="sub.note"
          :example="sub.example"
          :see-also="sub.seeAlso"
          :side-image="sub.sideImage"
        />
      </template>

      <!-- Stratagems grid for section 15 -->
      <template v-if="section.id === '15' && section.stratagems">
        <div class="stratagems-section" id="section-15-list">
          <div class="strat-grid">
            <StratCard v-for="strat in section.stratagems" :key="strat.num" :strat="strat" />
          </div>
        </div>
      </template>

      <!-- Subsections rendered after stratagem grid (e.g. Snap Shooting) -->
      <template v-for="sub in section.subsections.filter(s => s.renderAfterStratagems && !s.inline)" :key="sub.id + '-after'">
        <RuleBlock
          :id="sub.id"
          :section-num="sub.sectionNum"
          :title="sub.title"
          :body="sub.body"
          :note="sub.note"
          :example="sub.example"
          :see-also="sub.seeAlso"
          :side-image="sub.sideImage"
        />
      </template>
    </template>

    <PageNav />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import RuleBlock from '../components/RuleBlock.vue'
import GroupLabelBlock from '../components/GroupLabelBlock.vue'
import StratCard from '../components/StratCard.vue'
import TableOfContents from '../components/TableOfContents.vue'
import PageNav from '../components/PageNav.vue'
import { battlefields } from '../data/battlefields.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const sections = computed(() => {
  if (locale.value === 'en') return battlefields.en
  return battlefields.en.map((section, i) => ({
    ...section,
    title: battlefields.ru[i].title,
    description: battlefields.ru[i].description,
    subsections: section.subsections.map((sub, j) => {
      const merged = { ...sub, ...battlefields.ru[i].subsections[j] }
      if (merged.sideImage?.src)
        merged.sideImage = { ...merged.sideImage, src: merged.sideImage.src.replace('.png', '-ru.png') }
      return merged
    }),
    ...(section.stratagems && battlefields.ru[i].stratagems ? {
      stratagems: section.stratagems.map((strat, k) => ({
        ...strat,
        ...battlefields.ru[i].stratagems[k],
      }))
    } : {}),
  }))
})

const tocSections = computed(() =>
  sections.value.map(s => ({
    id: 'section-' + s.id.padStart(2, '0'),
    num: s.num,
    label: s.title,
  }))
)
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

.stratagems-section {
  margin: 1.5rem 0 2rem;
}

.strat-grid {
  column-count: 2;
  column-gap: 1rem;
}

.strat-grid > * {
  break-inside: avoid;
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .strat-grid {
    column-count: 1;
  }
}
</style>
