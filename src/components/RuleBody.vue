<template>
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
        <span class="info-label">{{ row.label }}</span><span v-if="row.content" class="info-content" v-html="renderInline(row.content)"></span>
        <ul v-if="row.items.length" class="info-items">
          <li v-for="(item, m) in row.items" :key="m" v-html="renderInline(item)"></li>
        </ul>
      </div>
    </div>
    <div v-else-if="block.type === 'img-group'" class="img-group">
      <AppImage v-for="(item, k) in block.srcs" :key="k" :src="item.src" :alt="item.alt" />
    </div>
    <div v-else-if="block.type === 'faq'" class="faq-list">
      <FaqItem v-for="(item, j) in block.items" :key="j" :q="item.q" :a="item.a" />
    </div>
    <h4 v-else-if="block.type === 'h4'" :id="id ? h4AnchorId(id, block.n) : undefined" class="rule-subheading">
      <span v-html="renderInline(block.text)"></span>
      <span v-if="block.ru" class="rule-subheading-ru">{{ block.ru }}</span>
    </h4>
    <p v-else v-html="renderInline(block.text)"></p>
  </template>
</template>

<script setup>
import { computed } from 'vue'
import AppImage from './AppImage.vue'
import FaqItem from './FaqItem.vue'
import { useRenderInline } from '../composables/useRenderInline.js'
import { h4AnchorId } from '../composables/anchors.js'

// Renders a rule `body` string as typed blocks. Multi-root (fragment) on purpose: its
// nodes become direct children of the parent's `.rule-body`, so a floated `sideImage`
// sibling still wraps the text. Shared by RuleBlock (subsections) and SubRuleBlock
// (x.x.x children) so the body markup is parsed/rendered in exactly one place.
const props = defineProps({
  id: String,
  body: String,
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
    if (mode === 'faq') {
      if (buf.length) result.push({ type: 'faq', items: [...buf] })
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
      // Inside a FAQ block, blank lines only separate Q/A pairs — keep grouping them
      // into the same block so they render as one connected list.
      if (mode === 'faq') continue
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
    const isFaqQ = /^\*\*[QВ]:\*\*/.test(line)
    const isFaqA = /^\*\*[AО]:\*\*/.test(line)
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
    } else if (isFaqQ) {
      if (mode !== 'faq') { flush(); mode = 'faq' }
      buf.push({ q: line.replace(/^\*\*[QВ]:\*\*\s*/, ''), a: '' })
    } else if (isFaqA && mode === 'faq' && buf.length) {
      buf[buf.length - 1].a = line.replace(/^\*\*[AО]:\*\*\s*/, '')
    } else if (isSubheading) {
      flush()
      // A subheading may carry a RU translation after ` | ` (faction rule bodies), shown as
      // a small muted line under the English heading — mirrors the bilingual rule/name titles.
      const raw = line.slice(4)
      const pipe = raw.indexOf(' | ')
      result.push({
        type: 'h4',
        text: pipe >= 0 ? raw.slice(0, pipe) : raw,
        ru: pipe >= 0 ? raw.slice(pipe + 3).trim() : undefined,
        n: ++h4n,
      })
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
</script>

<style scoped>
p {
  margin-bottom: 0.7rem;
}

.rule-subheading {
  font-family: var(--font-display);
  font-size: var(--fs-subheading);
  font-weight: var(--fw-heading);
  color: var(--text-primary);
  margin: 0.75rem 0 0.25rem;
  scroll-margin-top: 100px;
}

/* RU translation of an English subheading — small muted line tucked under it */
.rule-subheading-ru {
  display: block;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
  opacity: 0.75;
  line-height: 1.1;
  margin-top: -1px;
}

.rule-list {
  padding-left: 1.3rem;
  margin-bottom: 0.6rem;
}

.rule-list li {
  margin-bottom: 0.3rem;
  line-height: 1.4;
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

/* A "type card" (◈…) — move/shoot/charge/fight/deploy TYPE rules. Paired with the
   plaque header in RuleBlock.vue's `.rule-header--type`; the two aren't visually fused
   (this card floats just below it) so the layout stays robust regardless of what else
   the rule carries (note/example/children). Each row is a run-in label ("LABEL: text",
   like the source PDF) rather than a stacked label bar — a fixed-width label column
   would work for the short EN labels but not the much longer RU ones (МАКСИМАЛЬНОЕ
   РАССТОЯНИЕ vs MAXIMUM DISTANCE), so the label just flows with its content instead. */
/* Border/divider/highlight all mix toward --text-primary rather than using --border /
   --bg-secondary directly: those two sit only a couple of luminance steps from --bg-card
   in dark theme (by design, for subtle chrome elsewhere), which made this card's edges
   and its first-row highlight nearly disappear against its own background. Mixing in the
   theme's own max-contrast foreground color instead guarantees a visible line/wash in
   both themes without hand-tuning two separate palettes. */
.info-card {
  border: 1px solid color-mix(in srgb, var(--text-primary) 18%, var(--bg-card));
  border-radius: 6px;
  overflow: hidden;
  margin: 0.5rem 0;
  font-size: 0.88rem;
  line-height: 1.5;
  background: var(--bg-card);
}

.info-row {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid color-mix(in srgb, var(--text-primary) 10%, var(--bg-card));
}

.info-row:last-child { border-bottom: none; }

/* The opening condition (MAXIMUM DISTANCE / ELIGIBLE IF / SET-UP DISTANCE, …) is the
   card's key line — a wash makes it the first thing the eye lands on, echoing the source
   PDF's grey MAXIMUM DISTANCE band. Deliberately not --accent — these type cards keep
   the app's brand accent to just the section-number badge in the header. */
.info-row:first-child {
  background: color-mix(in srgb, var(--text-primary) 8%, var(--bg-card));
}

.info-label {
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  color: var(--text-primary);
}

.info-label::after {
  content: ': ';
}

.rule-list--sub {
  list-style: disc;
  padding-left: 1.2rem;
  margin: 0.2rem 0 0.1rem;
}

.info-items {
  list-style: disc;
  padding-left: 1.3rem;
  margin: 0.3rem 0 0;
}

.info-items li { margin-bottom: 0.2rem; }

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0.5rem 0 0.7rem;
}

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
    padding: 0.4rem 0.6rem;
  }
}
</style>
