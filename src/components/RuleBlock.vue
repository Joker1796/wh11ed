<template>
  <div class="rule-block" :id="id">
    <div class="rule-header">
      <span v-if="sectionNum" class="section-num">{{ sectionNum }}</span>
      <h3 class="rule-title">{{ title }}</h3>
    </div>

    <div class="rule-body-wrap">
      <SeeAlsoBlock v-if="seeAlso && seeAlso.length" :refs="seeAlso" />

      <div class="rule-body" @click="handleDefClick">
        <AppImage v-if="sideImage" class="side-image" :src="sideImage.src" :alt="sideImage.alt" :style="sideImage.width ? { maxWidth: sideImage.width } : undefined" />
        <template v-for="(block, i) in blocks" :key="i">
          <ul v-if="block.type === 'ul'" class="rule-list">
            <li v-for="(item, j) in block.items" :key="j">
              <span v-html="renderInline(item.text)"></span>
              <ul v-if="item.sub?.length" class="rule-list rule-list--sub">
                <li v-for="(s, k) in item.sub" :key="k" v-html="renderInline(s)"></li>
              </ul>
            </li>
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
          <AppImage v-else-if="block.type === 'img'" :src="block.src" :alt="block.alt" class="body-image" />
          <div v-else-if="block.type === 'info-card'" class="info-card">
            <div v-for="(row, k) in block.rows" :key="k" class="info-row">
              <div class="info-label">{{ row.label }}</div>
              <div class="info-content">
                <span v-if="row.content" v-html="renderInline(row.content)"></span>
                <ul v-if="row.items.length" class="info-items">
                  <li v-for="(item, m) in row.items" :key="m" v-html="renderInline(item)"></li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else-if="block.type === 'img-group'" class="img-group">
            <AppImage v-for="(item, k) in block.srcs" :key="k" :src="item.src" :alt="item.alt" />
          </div>
          <h4 v-else-if="block.type === 'h4'" :id="id ? h4AnchorId(id, block.n) : undefined" class="rule-subheading" v-html="renderInline(block.text)"></h4>
          <p v-else v-html="renderInline(block.text)"></p>
        </template>

        <div v-if="note" class="note-box" v-html="renderParagraphs(note)"></div>

        <div v-if="example" class="example-block" v-html="renderInline(example)"></div>

        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SeeAlsoBlock from './SeeAlsoBlock.vue'
import AppImage from './AppImage.vue'
import { useRenderInline } from '../composables/useRenderInline.js'
import { h4AnchorId } from '../composables/anchors.js'

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
  let cardRows = []
  let h4n = 0

  const flush = () => {
    if (mode === 'info-card') {
      if (cardRows.length) result.push({ type: 'info-card', rows: [...cardRows] })
      cardRows = []
      buf = []
      return
    }
    if (!buf.length) return
    if (mode === 'ul') {
      const items = []
      for (const l of buf) {
        if (/^▫/.test(l)) {
          if (items.length) {
            if (!items[items.length - 1].sub) items[items.length - 1].sub = []
            items[items.length - 1].sub.push(l.replace(/^▫\s*/, '').trim())
          }
        } else {
          items.push({ text: l.replace(/^[▪•]\s*/, '').trim() })
        }
      }
      result.push({ type: 'ul', items })
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
      if (buf.length === 1) result.push({ type: 'img', src: buf[0].src, alt: buf[0].alt })
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
    const isInfoRow = line.startsWith('◈ ')
    const isSubheading = line.startsWith('### ')
    const isImg = /^\[img:[^\]]+\]$/.test(line)
    if (isImg) {
      if (mode !== 'img-group') { flush(); mode = 'img-group' }
      const imgContent = line.slice(5, -1)
      const pipeIdx = imgContent.indexOf('|')
      buf.push({
        src: pipeIdx >= 0 ? imgContent.slice(0, pipeIdx).trim() : imgContent,
        alt: pipeIdx >= 0 ? imgContent.slice(pipeIdx + 1).trim() : '',
      })
    } else if (isInfoRow) {
      if (mode !== 'info-card') { flush(); mode = 'info-card' }
      const sep = line.indexOf(' | ')
      const label = line.slice(2, sep < 0 ? undefined : sep).trim()
      const content = sep >= 0 ? line.slice(sep + 3).trim() : ''
      cardRows.push({ label, content, items: [] })
    } else if (isBullet && mode === 'info-card') {
      if (cardRows.length) cardRows[cardRows.length - 1].items.push(line.replace(/^[▪•▫]\s*/, '').trim())
    } else if (isSubheading) {
      flush()
      result.push({ type: 'h4', text: line.slice(4), n: ++h4n })
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
  scroll-margin-top: 100px;
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
  margin: 0.5rem 0 0.7rem;
  overflow: hidden;
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
  white-space: normal;
  padding: 0.35rem 0.75rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.result-fail    { background: #9d060d; }
.result-success { background: #027360; }

:deep(.body-image) {
  display: block;
  max-width: 100%;
  margin: 0.5rem 0;
  border-radius: 4px;
}

.info-card {
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5rem 0;
  font-size: 0.88rem;
  line-height: 1.5;
}

.info-row {
  display: grid;
  grid-template-columns: 9rem 1fr;
  border-bottom: 1px solid var(--border-light);
}

.info-row:last-child { border-bottom: none; }

.info-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding: 0.45rem 0.6rem;
  background: var(--bg-card);
  color: var(--text-muted);
  border-right: 1px solid var(--border-light);
}

.info-content {
  padding: 0.45rem 0.7rem;
}

.rule-list--sub {
  list-style: disc;
  padding-left: 1.2rem;
  margin: 0.2rem 0 0.1rem;
}

.info-items {
  list-style: disc;
  padding-left: 1.1rem;
  margin: 0.2rem 0 0;
}

.info-items li { margin-bottom: 0.15rem; }

.img-group {
  margin: 0.5rem 0;
  /* AppImage wraps each <img> in a display:contents <picture>, so the <img>s are the
     flex items here — use gap (an `img + img` selector won't match across pictures). */
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.img-group :deep(img) {
  display: block;
  width: 100%;
}

:deep(.side-image) {
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

@media (max-width: 600px) {
  .result-table {
    width: 100%;
  }

  .result-row {
    font-size: 0.85rem;
  }

  .result-arrow {
    display: none;
  }

  .result-condition {
    padding-left: 0.6rem;
  }

  .result-outcome {
    flex: 0 0 6.5rem;
    white-space: normal;
  }

  .info-row {
    grid-template-columns: 7rem 1fr;
  }

  :deep(.side-image) {
    float: none;
    max-width: 100%;
    margin: 0 0 1rem;
  }
}
</style>
