<template>
  <div class="rule-block" :id="id">
    <div class="rule-header">
      <span v-if="sectionNum" class="section-num">{{ sectionNum }}</span>
      <h3 class="rule-title">{{ title }}</h3>
    </div>

    <div class="rule-body-wrap">
      <SeeAlsoBlock v-if="seeAlso && seeAlso.length" :refs="seeAlso" />

      <div class="rule-body" @click="handleDefClick">
        <img v-if="sideImage" class="side-image" :src="sideImage.src" :alt="sideImage.alt" :style="sideImage.width ? { maxWidth: sideImage.width } : undefined" />
        <template v-for="(block, i) in blocks" :key="i">
          <ul v-if="block.type === 'ul'" class="rule-list">
            <li v-for="(item, j) in block.items" :key="j" v-html="renderInline(item)"></li>
          </ul>
          <ol v-else-if="block.type === 'ol'" class="rule-ol">
            <li v-for="(item, j) in block.items" :key="j" v-html="renderInline(item)"></li>
          </ol>
          <div v-else-if="block.type === 'flow'" class="flow-list">
            <div v-for="(item, j) in block.items" :key="j" class="flow-item">
              <span class="flow-arrow">→</span>
              <span v-html="renderInline(item)"></span>
            </div>
          </div>
          <div v-else-if="block.type === 'result-table'" class="result-table">
            <div v-for="(row, j) in block.items" :key="j" class="result-row">
              <span class="result-arrow">→</span>
              <span class="result-condition" v-html="renderInline(row.condition)"></span>
              <span
                class="result-outcome"
                :class="row.isFail ? 'result-fail' : 'result-success'"
                v-html="renderInline(row.outcome)"
              ></span>
            </div>
          </div>
          <img v-else-if="block.type === 'img'" :src="block.src" alt="" class="body-image" />
          <div v-else-if="block.type === 'img-group'" class="img-group">
            <img v-for="(src, k) in block.srcs" :key="k" :src="src" alt="" />
          </div>
          <h4 v-else-if="block.type === 'h4'" class="rule-subheading">{{ block.text }}</h4>
          <p v-else v-html="renderInline(block.text)"></p>
        </template>

        <div v-if="note" class="note-box" v-html="renderInline(note)"></div>

        <div v-if="example" class="example-block" v-html="renderInline(example)"></div>

        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SeeAlsoBlock from './SeeAlsoBlock.vue'
import { useRenderInline } from '../composables/useRenderInline.js'

const props = defineProps({
  id: String,
  sectionNum: String,
  title: String,
  body: String,
  note: String,
  example: String,
  seeAlso: Array,
  sideImage: Object,
})

const blocks = computed(() => {
  if (!props.body) return []
  const lines = props.body.split('\n')
  const result = []
  let buf = []
  let mode = null

  const flush = () => {
    if (!buf.length) return
    if (mode === 'ul') {
      result.push({ type: 'ul', items: buf.map(l => l.replace(/^[▪•▫]\s*/, '').trim()).filter(Boolean) })
    } else if (mode === 'ol') {
      result.push({ type: 'ol', items: buf.map(l => l.replace(/^\d+\.\s*/, '').trim()).filter(Boolean) })
    } else if (mode === 'flow') {
      result.push({ type: 'flow', items: buf.map(l => l.replace(/^→\s*/, '').trim()).filter(Boolean) })
    } else if (mode === 'result-table') {
      result.push({
        type: 'result-table',
        items: buf.map(l => {
          const parts = l.replace(/^◆\s*/, '').split(' → ')
          const condition = parts[0]?.trim() || ''
          const outcome = parts.slice(1).join(' → ').trim()
          const isFail = /FAIL|ПРОВАЛ|НЕ УДАЁТСЯ/i.test(outcome)
          return { condition, outcome, isFail }
        }).filter(r => r.condition),
      })
    } else if (mode === 'img-group') {
      if (buf.length === 1) result.push({ type: 'img', src: buf[0] })
      else result.push({ type: 'img-group', srcs: [...buf] })
    } else {
      const text = buf.join('<br>').trim()
      if (text) result.push({ type: 'p', text })
    }
    buf = []
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (line === '') {
      flush()
      mode = null
      continue
    }
    const isBullet = /^[▪•▫]/.test(line)
    const isOrdered = /^\d+\.\s/.test(line)
    const isFlow = line.startsWith('→ ')
    const isResultRow = line.startsWith('◆ ')
    const isSubheading = line.startsWith('### ')
    const isImg = /^\[img:[^\]]+\]$/.test(line)
    if (isImg) {
      if (mode !== 'img-group') { flush(); mode = 'img-group' }
      buf.push(line.slice(5, -1))
    } else if (isSubheading) {
      flush()
      result.push({ type: 'h4', text: line.slice(4) })
    } else if (isBullet) {
      if (mode !== 'ul') { flush(); mode = 'ul' }
      buf.push(line)
    } else if (isOrdered) {
      if (mode !== 'ol') { flush(); mode = 'ol' }
      buf.push(line)
    } else if (isFlow) {
      if (mode !== 'flow') { flush(); mode = 'flow' }
      buf.push(line)
    } else if (isResultRow) {
      if (mode !== 'result-table') { flush(); mode = 'result-table' }
      buf.push(line)
    } else {
      if (mode !== 'p') { flush(); mode = 'p' }
      buf.push(line)
    }
  }
  flush()
  return result
})

const { renderInline } = useRenderInline()

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
  padding: 1.4rem 0;
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
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 0.65rem;
  flex-wrap: wrap;
}

.rule-title {
  font-family: var(--font-serif);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.2px;
}

.rule-body {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-primary);
}

.rule-body p {
  margin-bottom: 0.7rem;
}

.rule-subheading {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0.75rem 0 0.25rem;
}

.rule-list {
  padding-left: 1.3rem;
  margin-bottom: 0.6rem;
}

.rule-list li {
  margin-bottom: 0.3rem;
  line-height: 1.6;
}

.rule-ol {
  padding-left: 1.3rem;
  margin-bottom: 0.6rem;
  list-style: decimal;
}

.rule-ol li {
  margin-bottom: 0.3rem;
  line-height: 1.6;
}

.flow-list {
  border: 1px solid var(--border);
  border-radius: 4px;
  margin: 0.5rem auto 0.7rem;
  overflow: hidden;
  max-width: 70%;
}

.flow-item {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
  padding: 0.45rem 0.8rem;
  border-bottom: 1px solid var(--border-light);
  font-size: 0.9rem;
  line-height: 1.5;
}

.flow-item:last-child {
  border-bottom: none;
}

.flow-arrow {
  color: var(--accent);
  flex-shrink: 0;
  font-weight: 600;
}

.result-table {
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem auto 0.7rem;
}

.result-row {
  display: flex;
  align-items: stretch;
  gap: 0;
  border-bottom: 1px solid var(--border-light);
  font-size: 0.9rem;
  line-height: 1.5;
}

.result-row:last-child {
  border-bottom: none;
}

.result-arrow {
  color: var(--text-dim);
  flex-shrink: 0;
  padding: 0.35rem 0.4rem 0.35rem 0.75rem;
  align-self: center;
}

.result-condition {
  flex: 1;
  padding: 0.35rem 0.6rem 0.35rem 0;
  align-self: center;
}

.result-outcome {
  font-weight: 700;
  flex: 0 0 10rem;
  white-space: nowrap;
  padding: 0.35rem 0.75rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.result-fail    { background: #9d060d; }
.result-success { background: #027360; }

.body-image {
  display: block;
  max-width: 100%;
  margin: 0.5rem 0;
  border-radius: 4px;
}

.img-group {
  margin: 0.5rem 0;
  overflow: hidden;
  border-radius: 4px;
}

.img-group img {
  display: block;
  width: 100%;
}

.img-group img + img {
  margin-top: 6px;
}

.side-image {
  float: left;
  max-width: 40%;
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
</style>
