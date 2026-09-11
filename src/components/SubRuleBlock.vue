<template>
  <section :id="id" class="sub-rule">
    <button class="sub-rule-head" :aria-expanded="open" @click="open = !open">
      <span class="sub-rule-title">
        <span class="section-num">{{ sectionNum }}</span>
        <span>{{ title }}</span>
      </span>
      <span v-if="fromApp" class="from-app">from app</span>
      <i class="bi sub-rule-chevron" :class="open ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
    </button>

    <CollapseTransition :show="open">
      <div class="sub-rule-body-wrap">
        <SeeAlsoBlock v-if="seeAlso && seeAlso.length" :refs="seeAlso" />

        <div class="rule-body" @click="handleDefClick">
          <RuleBody :id="id" :body="body" />

          <DataTable v-if="table" :headers="table.headers" :rows="table.rows" :footnote="table.footnote" :stacked="table.stacked" />

          <div v-if="note" class="note-box" v-html="renderParagraphs(note)"></div>

          <div v-if="example" class="example-block" v-html="renderInline(example)"></div>
        </div>
      </div>
    </CollapseTransition>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SeeAlsoBlock from './SeeAlsoBlock.vue'
import RuleBody from './RuleBody.vue'
import DataTable from './DataTable.vue'
import CollapseTransition from './CollapseTransition.vue'
import { useRenderInline } from '../composables/useRenderInline.js'

// A third-level rule block (x.x.x), nested inside a subsection (x.x) and rendered as a
// collapsible accordion (collapsed by default). Body markup is parsed by the shared RuleBody,
// so it supports the same blocks as a normal rule. `fromApp` shows a provenance badge for
// content transcribed verbatim from the official WH40k app.
const props = defineProps({
  id: String,
  sectionNum: String,
  title: String,
  body: String,
  note: String,
  example: String,
  seeAlso: Array,
  table: Object,
  fromApp: Boolean,
})

const open = ref(false)

// Auto-expand when navigated to via a cross-ref or search result — either the block's own
// anchor (#id) or one of its inner h4 anchors (#id-hN). Otherwise the jump would land on a
// collapsed header with the content hidden.
const route = useRoute()
watch(() => route.hash, (hash) => {
  if (hash && (hash === '#' + props.id || hash.startsWith('#' + props.id + '-'))) {
    open.value = true
  }
}, { immediate: true })

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
/* Warm-yellow "from app" callout — palette (light + dark) lives in style.css as
   --sub-rule-* so it reads as a distinct, imported-content block in both themes. */
.sub-rule {
  margin: 0.85rem 0;
  border: 1px solid var(--sub-rule-border);
  background: var(--sub-rule-bg);
  scroll-margin-top: 100px;
  overflow: hidden;
}

.sub-rule-head {
  width: 100%;
  display: flex;
  /* Top-align so the "from app" badge and chevron sit level with the section number on
     the first line when a long title wraps (esp. on mobile), instead of centering on the
     whole multi-line title. Single-line titles look identical to `center`. */
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.6rem 0.85rem;
  background: var(--sub-rule-head-bg);
  border: none;
  border-bottom: 1px solid var(--sub-rule-border);
  cursor: pointer;
  text-align: left;
  font-family: var(--font-display);
  color: var(--sub-rule-ink);
}

.sub-rule-title {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  flex-wrap: wrap;
  font-size: var(--fs-subrule);
  font-weight: var(--fw-heading);
  overflow-wrap: anywhere;
}

.from-app {
  flex-shrink: 0;
  font-family: var(--font-sans);
  font-size: 0.62rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.45;
  pointer-events: none;
}

.sub-rule-chevron {
  flex-shrink: 0;
  font-size: 0.95rem;
  opacity: 0.7;
}

.sub-rule-body-wrap {
  padding: 0.7rem 0.85rem;
  overflow: hidden;
}

.rule-body {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--sub-rule-ink);
}

@media (max-width: 700px) {
  :deep(.see-also) {
    float: none;
    width: 100%;
    margin-left: 0;
    margin-bottom: 1rem;
  }
}

@media (max-width: 480px) {
  .sub-rule-title {
    font-size: 1.1rem;
  }
}
</style>
