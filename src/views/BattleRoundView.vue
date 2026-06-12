<template>
  <div class="view">
    <div class="view-hero">
      <h1>The Battle Round</h1>
      <p class="view-hero-desc">Warhammer 40,000 is played in a series of battle rounds</p>
    </div>

    <TableOfContents :sections="tocSections" />

    <template v-for="section in battleRound" :key="section.id">
      <SectionHeader
        :id="'section-' + section.id.padStart(2,'0')"
        :num="section.num"
        :title="section.title"
        :description="section.description"
        :page="section.page"
        :phase="section.phase"
      />

      <RuleBlock
        v-for="sub in section.subsections"
        :key="sub.id"
        :id="sub.id"
        :section-num="sub.sectionNum"
        :title="sub.title"
        :body="sub.body"
        :note="sub.note"
        :example="sub.example"
        :see-also="sub.seeAlso"
      />
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import RuleBlock from '../components/RuleBlock.vue'
import TableOfContents from '../components/TableOfContents.vue'
import { battleRound } from '../data/battleRound.js'

const tocSections = computed(() =>
  battleRound.map(s => ({
    id: 'section-' + s.id.padStart(2, '0'),
    num: s.num,
    label: s.title,
  }))
)
</script>

<style scoped>
.view-hero {
  padding: 2rem 0 1.5rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 2rem;
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
</style>
