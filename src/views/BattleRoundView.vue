<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.battleRoundHeading }}</h1>
      <p class="view-hero-desc">{{ labels.battleRoundDesc }}</p>
    </div>

    <TableOfContents :sections="tocSections" />

    <template v-for="section in sections" :key="section.id">
      <SectionHeader
        :id="'section-' + section.id.padStart(2,'0')"
        :num="section.num"
        :title="section.title"
        :description="section.description"
        :page="section.page"
        :phase="section.phase"
      />

      <template v-for="sub in section.subsections" :key="sub.id">
        <GroupLabelBlock
          v-if="sub.isGroupLabel"
          :title="sub.title"
          :body="sub.body"
        />
        <SectionTocBlock
          v-else-if="!sub.sectionNum"
          :items="section.subsections.filter(s => s.sectionNum)"
          :description="sub.body.split('\n').find(l => l.trim() && !/^[▪•▫]/.test(l.trim()))"
          route="/battle-round"
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
          :children="sub.children"
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
import SectionTocBlock from '../components/SectionTocBlock.vue'
import GroupLabelBlock from '../components/GroupLabelBlock.vue'
import TableOfContents from '../components/TableOfContents.vue'
import PageNav from '../components/PageNav.vue'
import { battleRound } from '../data/battleRound.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useBilingualSections } from '../composables/useBilingualMerge.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const sections = useBilingualSections(battleRound)

const tocSections = computed(() =>
  sections.value.map(s => ({
    id: 'section-' + s.id.padStart(2, '0'),
    num: s.num,
    label: s.title,
  }))
)
</script>

<style scoped>
</style>
