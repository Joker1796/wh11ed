<template>
  <div class="rule-block" :id="id">
    <div class="rule-header" :class="{ 'rule-header--type': bodyIsInfoCard }">
      <span v-if="sectionNum" class="section-num">{{ sectionNum }}</span>
      <div class="rule-title-wrap">
        <h3 class="rule-title">{{ title }}</h3>
        <div v-if="subtitle" class="rule-title-ru">{{ subtitle }}</div>
      </div>
    </div>

    <div class="rule-body-wrap">
      <!-- An info-card (◈…) body is a grid of labeled rows, not reflowing prose — floating
           SeeAlsoBlock beside it (the normal placement) squeezes its rows instead of wrapping
           cleanly. Render it after the table for those bodies instead. -->
      <SeeAlsoBlock v-if="seeAlso && seeAlso.length && !bodyIsInfoCard" :refs="seeAlso" />

      <div class="rule-body" @click="handleDefClick">
        <AppImage v-if="sideImage" class="side-image" :src="sideImage.src" :alt="sideImage.alt" :style="sideImage.width ? { '--side-image-width': sideImage.width } : undefined" />
        <RuleBody :id="id" :body="body" />

        <SeeAlsoBlock v-if="seeAlso && seeAlso.length && bodyIsInfoCard" :refs="seeAlso" />

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
import { computed } from 'vue'
import SeeAlsoBlock from './SeeAlsoBlock.vue'
import AppImage from './AppImage.vue'
import RuleBody from './RuleBody.vue'
import SubRuleBlock from './SubRuleBlock.vue'
import { useRenderInline } from '../composables/useRenderInline.js'

const props = defineProps({
  id: String,
  sectionNum: String,
  title: String,
  subtitle: String,
  body: String,
  note: String,
  example: String,
  seeAlso: Array,
  sideImage: Object,
  children: Array,
})

const { renderInline } = useRenderInline()

const bodyIsInfoCard = computed(() => (props.body || '').trimStart().startsWith('◈'))

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

/* "Type card" header — move/shoot/charge/fight/deploy TYPE rules (an info-card ◈ body,
   see RuleBody.vue) get this plaque header instead of the plain one above, so a reader
   scanning the page recognizes "here's a type card" at a glance. Modeled on StratCard's
   dark header bar (same #1c1c1e), but a chamfered top-right corner — instead of
   StratCard's flat rectangle — keeps the two families visually distinct rather than
   reading as more stratagems. Plain solid black, no border/stripe of its own — it's
   glued directly to the info-card below (zero gap, see the :deep() rule further down)
   so the two read as one continuous card with a clean black-to-card edge. */
.rule-header--type {
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: 0.5rem;
  background: #1c1c1e;
  padding: 0.5rem 1rem;
  margin-bottom: 0;
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
}

/* The info-card immediately following a type-card header (RuleBody.vue) — strip its own
   top border/margin so it sits flush under the header instead of floating below it as a
   separate box. (It carried two `border-*-radius: 0` here too, left over from when cards
   were rounded; corners are square now, so they said nothing.) */
.rule-header--type + .rule-body-wrap :deep(.rule-body > .info-card:first-child) {
  margin-top: 0;
  border-top: none;
}

/* The section number keeps the app's normal --accent badge (already a red tone) — the
   one deliberate accent touch left on these cards, everything else uses neutral colors
   (see .info-row/.info-label in RuleBody.vue). */
.rule-header--type .section-num {
  order: 2;
  flex-shrink: 0;
  margin-right: 0;
}

.rule-header--type .rule-title-wrap {
  order: 1;
  min-width: 0;
}

.rule-header--type .rule-title {
  color: #fff;
  text-transform: uppercase;
}

.rule-header--type .rule-title-ru {
  color: rgba(255, 255, 255, 0.65);
  opacity: 1;
}

.rule-title {
  font-family: var(--font-display);
  font-size: var(--fs-rule-title);
  font-weight: var(--fw-heading);
  color: var(--text-primary);
  letter-spacing: 0.2px;
}

/* RU translation of the rule name — small, muted line tucked under the English title */
.rule-title-ru {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  opacity: 0.75;
  line-height: 1.05;
  margin-top: -5px;
}

.rule-body {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-primary);
}

:deep(.side-image) {
  float: left;
  max-width: var(--side-image-width, 50%);
  margin: 0 1.5rem 1rem 0;
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
