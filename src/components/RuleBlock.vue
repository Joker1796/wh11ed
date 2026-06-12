<template>
  <div class="rule-block" :id="id">
    <div class="rule-header">
      <span v-if="sectionNum" class="section-num">{{ sectionNum }}</span>
      <h3 class="rule-title">{{ title }}</h3>
    </div>

    <div class="rule-body-wrap">
      <div class="rule-body">
        <template v-for="(block, i) in blocks" :key="i">
          <ul v-if="block.type === 'ul'" class="rule-list">
            <li v-for="(item, j) in block.items" :key="j" v-html="renderInline(item)"></li>
          </ul>
          <p v-else v-html="renderInline(block.text)"></p>
        </template>

        <div v-if="note" class="note-box" v-html="renderInline(note)"></div>

        <div v-if="example" class="example-block" v-html="renderInline(example)"></div>

        <slot></slot>
      </div>

      <div v-if="seeAlso && seeAlso.length" class="see-also">
        <div class="see-also-title">See Also</div>
        <ul>
          <li v-for="ref in seeAlso" :key="ref">
            <RouterLink
              v-if="resolveRef(ref).route"
              :to="{ path: resolveRef(ref).route, hash: '#' + resolveRef(ref).anchor }"
              class="see-also-link"
              @click.prevent="navigateTo(resolveRef(ref))"
            >{{ resolveRef(ref).label }}</RouterLink>
            <span v-else>{{ ref }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const ROUTE_MAP = {
  '01': '/basic-rules', '02': '/basic-rules', '03': '/basic-rules',
  '04': '/basic-rules', '05': '/basic-rules', '06': '/basic-rules',
  '07': '/battle-round', '08': '/battle-round', '09': '/battle-round',
  '10': '/battle-round', '11': '/battle-round', '12': '/battle-round',
  '13': '/battlefields', '14': '/battlefields', '15': '/battlefields',
  '16': '/battlefields',
  '17': '/advanced-rules', '18': '/advanced-rules', '19': '/advanced-rules',
  '20': '/advanced-rules', '21': '/advanced-rules', '22': '/advanced-rules',
  '23': '/advanced-rules',
  '24': '/reference',
}

function resolveRef(text) {
  const match = text.match(/\b(\d{2})\.(\d{2})$/)
  if (!match) return { label: text, route: null, anchor: null }
  const major = match[1]
  const minor = match[2]
  const label = text.replace(/\s*\d{2}\.\d{2}$/, '').trim()
  const route = ROUTE_MAP[major]
  if (!route) return { label, route: null, anchor: null }
  let anchor
  if (minor === '00') {
    anchor = 'section-' + major
  } else if (major === '24') {
    anchor = 'ability-' + major + '_' + minor
  } else {
    anchor = 'section-' + major + '-' + minor
  }
  return { label, route, anchor }
}

async function navigateTo({ route, anchor }) {
  await router.push({ path: route, hash: '#' + anchor })
  await new Promise(r => setTimeout(r, 80))
  const el = document.getElementById(anchor)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const props = defineProps({
  id: String,
  sectionNum: String,
  title: String,
  body: String,
  note: String,
  example: String,
  seeAlso: Array,
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
    } else {
      const text = buf.join(' ').trim()
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
    if (isBullet) {
      if (mode !== 'ul') { flush(); mode = 'ul' }
      buf.push(line)
    } else {
      if (mode !== 'p') { flush(); mode = 'p' }
      buf.push(line)
    }
  }
  flush()
  return result
})

function renderInline(text) {
  return text
    .replace(/\[([A-Z][A-Z\s\-–:0-9+]*)\]/g, '<span class="keyword">[$1]</span>')
    .replace(/\b(INFANTRY|VEHICLE|MONSTER|AIRCRAFT|CHARACTER|TITANIC|TRANSPORT|FORTIFICATION|BEAST|SWARM|WALKER|PSYKER|FLY|MOBILE|HOVER|FRAME|FLYING|EXPLOSIVES|GRENADES|SMOKE|DEDICATED)\b/g, '<strong>$1</strong>')
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

.rule-body-wrap {
  display: flex;
  gap: 2rem;
}

.rule-body {
  flex: 1;
  min-width: 0;
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-primary);
}

.rule-body p {
  margin-bottom: 0.7rem;
}

.rule-list {
  padding-left: 1.3rem;
  margin-bottom: 0.6rem;
}

.rule-list li {
  margin-bottom: 0.3rem;
  line-height: 1.6;
}

.see-also {
  flex-shrink: 0;
  width: 160px;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.6rem 0.8rem;
  font-size: 0.78rem;
  align-self: flex-start;
}

.see-also-title {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.68rem;
  letter-spacing: 1px;
  color: var(--accent);
  margin-bottom: 0.4rem;
}

.see-also ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.see-also ul li {
  padding: 0.15rem 0;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-light);
  font-size: 0.8rem;
}

.see-also ul li:last-child {
  border-bottom: none;
}

.see-also-link {
  color: var(--accent);
  text-decoration: none;
  font-size: 0.8rem;
}

.see-also-link:hover {
  text-decoration: underline;
}

@media (max-width: 700px) {
  .rule-body-wrap {
    flex-direction: column;
  }
  .see-also {
    width: 100%;
  }
}
</style>
