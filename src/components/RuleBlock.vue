<template>
  <div class="rule-block" :id="id">
    <div class="rule-header">
      <span v-if="sectionNum" class="section-num">{{ sectionNum }}</span>
      <h3 class="rule-title">{{ title }}</h3>
    </div>

    <div class="rule-body-wrap">
      <SeeAlsoBlock v-if="seeAlso && seeAlso.length" :refs="seeAlso" />

      <div class="rule-body" @click="handleDefClick">
        <AppImage v-if="sideImage" class="side-image" :src="sideImage.src" :alt="sideImage.alt" :style="sideImage.width ? { '--side-image-width': sideImage.width } : undefined" />
        <RuleBody :id="id" :body="body" />

        <div v-if="note" class="note-box" v-html="renderParagraphs(note)"></div>

        <div v-if="example" class="example-block" v-html="renderInline(example)"></div>

        <slot></slot>

        <SubRuleBlock
          v-for="child in children"
          :key="child.id"
          :id="child.id"
          :section-num="child.sectionNum"
          :title="child.title"
          :body="child.body"
          :note="child.note"
          :example="child.example"
          :see-also="child.seeAlso"
          :table="child.table"
          :from-app="child.fromApp"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import SeeAlsoBlock from './SeeAlsoBlock.vue'
import AppImage from './AppImage.vue'
import RuleBody from './RuleBody.vue'
import SubRuleBlock from './SubRuleBlock.vue'
import { useRenderInline } from '../composables/useRenderInline.js'

defineProps({
  id: String,
  sectionNum: String,
  title: String,
  body: String,
  note: String,
  example: String,
  seeAlso: Array,
  sideImage: Object,
  children: Array,
})

const { renderInline } = useRenderInline()

function renderParagraphs(text) {
  return text.split('\n\n').map(p => `<p>${renderInline(p.trim().replace(/\n/g, ' '))}</p>`).join('')
}

function handleDefClick(e) {
  const target = e.target.closest('[data-def]')
  if (!target) return
  const el = document.getElementById('def-' + target.dataset.def)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<style scoped>
.rule-block {
  border-bottom: 1px solid var(--border-light);
  padding: 0.85rem 0;
  scroll-margin-top: var(--header-total);
}

.rule-block:last-child {
  border-bottom: none;
}

.rule-body-wrap {
  overflow: hidden;
}

.rule-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.65rem;
  flex-wrap: wrap;
}

.rule-title {
  font-family: var(--font-display);
  font-size: var(--fs-rule-title);
  font-weight: var(--fw-heading);
  color: var(--text-primary);
  letter-spacing: 0.2px;
}

.rule-body {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-primary);
}

:deep(.side-image) {
  float: left;
  max-width: var(--side-image-width, 45%);
  margin: 0 1.5rem 1rem 0;
  border-radius: 4px;
}

@media (max-width: 700px) {
  :deep(.see-also) {
    float: none;
    width: 100%;
    margin-left: 0;
    margin-bottom: 1rem;
  }
}

@media (max-width: 600px) {
  :deep(.side-image) {
    float: none;
    max-width: 100%;
    margin: 0 0 1rem;
  }
}
</style>
