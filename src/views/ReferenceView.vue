<template>
  <div class="view">
    <div class="view-hero">
      <h1>{{ labels.referenceHeading }}</h1>
      <p class="view-hero-desc">{{ labels.referenceDesc }}</p>
    </div>

    <TableOfContents :sections="tocSections" />

    <!-- Section 24: Core Abilities -->
    <SectionHeader
      id="section-24"
      num="24"
      :title="labels.coreAbilitiesTitle"
      :description="labels.coreAbilitiesDesc"
    />

    <!-- 24.01 и 24.02 -->
    <RuleBlock
      v-for="sub in abilityIntroData"
      :key="sub.id"
      :id="sub.id"
      :sectionNum="sub.sectionNum"
      :title="sub.title"
      :body="sub.body"
      :example="sub.example"
      :children="sub.children"
    />

    <!-- Filter buttons -->
    <div id="abilities-list" class="ability-filters">
      <button
        v-for="f in filters"
        :key="f.value"
        class="filter-btn"
        :class="{ active: activeFilter === f.value }"
        @click="activeFilter = f.value"
      >
        {{ f.label }}
      </button>
    </div>

    <div class="abilities-list">
      <div
        v-for="ability in filteredAbilities"
        :key="ability.num"
        class="ability-card"
        :id="'ability-' + ability.num.replace('.','_')"
      >
        <div class="ability-header">
          <span class="ability-num">{{ ability.num }}</span>
          <h3 class="ability-name" :class="ability.type">{{ ability.name }}</h3>
          <span class="ability-type-badge" :class="ability.type">{{ ability.type === 'weapon' ? labels.badgeWeapon : labels.badgeUnit }}</span>
        </div>

        <div class="ability-body" @click="handleDefClick">
          <p v-if="ability.flavor" class="ability-flavor" v-html="renderInline(ability.flavor)" />

          <template v-for="(block, bi) in parseBody(ability.fullText)" :key="bi">
            <ul v-if="block.type === 'ul'" class="ability-list">
              <li v-for="(item, li) in block.items" :key="li" v-html="renderInline(item)" />
            </ul>
            <ol v-else-if="block.type === 'ol'" class="ability-ol">
              <li v-for="(item, li) in block.items" :key="li" v-html="renderInline(item)" />
            </ol>
            <div v-else-if="block.type === 'info-card'" class="info-card">
              <div v-for="(row, ri) in block.rows" :key="ri" class="info-row">
                <div class="info-label">{{ row.label }}</div>
                <div class="info-content" v-html="renderInline(row.content)" />
              </div>
            </div>
            <p v-else v-html="renderInline(block.text)" />
          </template>
        </div>

        <div v-if="ability.example" class="example-block" v-html="renderInline(ability.example)" />

        <div v-if="ability.note" class="note-box ability-note-box" v-html="renderNoteHtml(ability.note)" />

        <SubRuleBlock
          v-for="child in ability.children"
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

    <!-- Rules Appendix -->
    <SectionHeader
      id="section-appendix"
      num="—"
      :title="labels.rulesAppendixTitle"
      :description="labels.rulesAppendixDesc"
    />

    <div class="digital-support">
      <h2 class="digital-support-title">{{ labels.digitalSupportTitle }}</h2>
      <div class="digital-support-body">
        <div class="digital-support-qr">
          <a href="https://warhammer40000.com/" target="_blank" rel="noopener">
            <img src="/images/wh40k-app-qr.png" alt="QR code — Warhammer 40,000 App" class="qr-img" />
          </a>
        </div>
        <p>{{ labels.digitalSupportText }}</p>
      </div>
    </div>

    <div v-for="entry in appendixData" :key="entry.id" :id="entry.id" class="appendix-block">
      <h3 class="appendix-title">{{ entry.title }}</h3>

      <div @click="handleDefClick">
        <template v-for="(block, bi) in parseBody(entry.body)" :key="bi">
          <ul v-if="block.type === 'ul'" class="appendix-list">
            <li v-for="(item, li) in block.items" :key="li" v-html="renderInline(item)" />
          </ul>
          <p v-else v-html="renderInline(block.text)" />
        </template>
      </div>

      <DataTable
        v-if="entry.table"
        :headers="entry.table.headers"
        :rows="entry.table.rows"
      />

      <div v-if="entry.example" class="example-block" v-html="renderInline(entry.example)" />
      <div v-if="entry.note" class="note-box" v-html="renderNoteHtml(entry.note)" />
    </div>

    <!-- FAQs -->
    <SectionHeader
      id="section-faq"
      num="—"
      :title="labels.faqsTitle"
      :description="labels.faqsDesc"
    />

    <div class="faq-list">
      <div v-for="(faq, i) in faqsData" :key="i" :id="'faq-' + i" class="faq-item">
        <div class="faq-q">
          <span class="faq-badge">Q</span>
          <span v-html="renderInline(faq.q)" />
        </div>
        <div class="faq-a">
          <span class="faq-badge ans">A</span>
          <span v-html="renderInline(faq.a)" />
        </div>
      </div>
    </div>

    <PageNav />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import DataTable from '../components/DataTable.vue'
import TableOfContents from '../components/TableOfContents.vue'
import RuleBlock from '../components/RuleBlock.vue'
import SubRuleBlock from '../components/SubRuleBlock.vue'
import PageNav from '../components/PageNav.vue'
import { useRenderInline } from '../composables/useRenderInline.js'
import { useLocale } from '../composables/useLocale.js'
import { useAbilityFilter } from '../composables/useAbilityFilter.js'
import { useRoute } from 'vue-router'
import { ui } from '../i18n/ui.js'
import { abilityIntro, coreAbilities, appendix, faqs } from '../data/reference.js'

const { renderInline } = useRenderInline()
const { locale } = useLocale()
const route = useRoute()

const labels = computed(() => ui[locale.value])

// Merge EN + RU, including any x.x.x `children` (RU child overrides title/body,
// inherits id/sectionNum/fromApp from EN — same pattern as useBilingualMerge).
function mergeWithChildren(en, ru) {
  const merged = { ...en, ...ru }
  if (en.children) {
    merged.children = en.children.map((c, k) => ({ ...c, ...(ru.children?.[k]) }))
  }
  return merged
}

const abilityIntroData = computed(() =>
  locale.value === 'ru'
    ? abilityIntro.en.map((e, i) => mergeWithChildren(e, abilityIntro.ru[i]))
    : abilityIntro.en
)

const coreAbilitiesData = computed(() =>
  locale.value === 'ru'
    ? coreAbilities.en.map((e, i) => mergeWithChildren(e, coreAbilities.ru[i]))
    : coreAbilities.en
)

const appendixData = computed(() =>
  locale.value === 'ru'
    ? appendix.en.map((e, i) => ({ ...e, ...appendix.ru[i] }))
    : appendix.en
)

const faqsData = computed(() =>
  locale.value === 'ru' ? faqs.ru : faqs.en
)

const tocSections = computed(() => [
  { id: 'section-24', num: '24', label: labels.value.coreAbilitiesTitle },
  { id: 'section-appendix', num: '—', label: labels.value.rulesAppendixTitle },
  { id: 'section-faq', num: '—', label: labels.value.faqsTitle },
])

const filters = computed(() => [
  { label: labels.value.filterAll, value: 'all' },
  { label: labels.value.filterUnit, value: 'unit' },
  { label: labels.value.filterWeapon, value: 'weapon' },
])

const { activeFilter } = useAbilityFilter()

watch(() => route.hash, (hash) => {
  if (hash && hash.startsWith('#ability-')) {
    activeFilter.value = 'all'
  }
})

const filteredAbilities = computed(() => {
  if (activeFilter.value === 'all') return coreAbilitiesData.value
  return coreAbilitiesData.value.filter(a => a.type === activeFilter.value)
})

function parseBody(text) {
  if (!text) return []
  const lines = text.split('\n')
  const result = []
  let buf = []
  let mode = null
  let cardRows = []

  const flush = () => {
    if (mode === 'info-card') {
      if (cardRows.length) result.push({ type: 'info-card', rows: [...cardRows] })
      cardRows = []
    } else if (mode === 'ul' && buf.length) {
      result.push({ type: 'ul', items: buf.map(l => l.replace(/^[▪•]\s*/, '').trim()) })
    } else if (mode === 'ol' && buf.length) {
      result.push({ type: 'ol', items: buf.map(l => l.replace(/^\d+\.\s*/, '').trim()) })
    } else if (buf.length) {
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
    if (line.startsWith('◈ ')) {
      if (mode !== 'info-card') { flush(); mode = 'info-card' }
      const sep = line.indexOf(' | ')
      cardRows.push({
        label: line.slice(2, sep < 0 ? undefined : sep).trim(),
        content: sep >= 0 ? line.slice(sep + 3).trim() : '',
      })
    } else if (/^[▪•]/.test(line)) {
      if (mode !== 'ul') { flush(); mode = 'ul' }
      buf.push(line)
    } else if (/^\d+\.\s/.test(line)) {
      if (mode !== 'ol') { flush(); mode = 'ol' }
      buf.push(line)
    } else {
      if (mode !== 'p') { flush(); mode = 'p' }
      buf.push(line)
    }
  }
  flush()
  return result
}

function renderNoteHtml(text) {
  return text.split('\n\n')
    .map(p => `<p>${renderInline(p.trim().replace(/\n/g, ' '))}</p>`)
    .join('')
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

/* Filter */
.ability-filters {
  display: flex;
  gap: 0.5rem;
  margin: 1.25rem 0;
  flex-wrap: wrap;
}

.filter-btn {
  background: var(--bg-card);
  border: 1px solid var(--border);
  color: var(--text-muted);
  padding: 0.3rem 0.9rem;
  border-radius: 20px;
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.15s;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: var(--accent);
  color: var(--text-primary);
}

.filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--text-on-accent);
}

/* Ability list */
.abilities-list {
  display: grid;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}

.ability-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  scroll-margin-top: 72px;
}

.ability-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.55rem 1rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-light);
  flex-wrap: wrap;
}

.ability-num {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-dim);
  width: 38px;
  flex-shrink: 0;
}

.ability-name {
  margin: 0;
  font-weight: 700;
  font-size: 0.9rem;
  line-height: 1.3;
  flex: 1;
  color: var(--text-primary);
}

.ability-name.weapon {
  color: var(--ability-weapon, #7a5a00);
  font-family: var(--font-mono);
}

.ability-name.unit {
  color: var(--ability-unit, #004a6e);
}

.ability-type-badge {
  font-size: 0.63rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 1px 7px;
  border-radius: 10px;
}

.ability-type-badge.weapon {
  background: color-mix(in srgb, var(--ability-weapon, #7a5a00) 12%, transparent);
  color: var(--ability-weapon, #7a5a00);
  border: 1px solid color-mix(in srgb, var(--ability-weapon, #7a5a00) 30%, transparent);
}

.ability-type-badge.unit {
  background: color-mix(in srgb, var(--ability-unit, #004a6e) 12%, transparent);
  color: var(--ability-unit, #004a6e);
  border: 1px solid color-mix(in srgb, var(--ability-unit, #004a6e) 30%, transparent);
}

/* Ability body */
.ability-body {
  padding: 0.75rem 1rem 0.5rem;
  font-size: 0.9rem;
  line-height: 1.55;
  color: var(--text-primary);
}

.ability-flavor {
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.875rem;
  margin: 0 0 0.6rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed var(--border-light);
}

.ability-body p {
  margin-bottom: 0.5rem;
}

.ability-body p:last-child {
  margin-bottom: 0;
}

.ability-list {
  padding-left: 1.3rem;
  margin-bottom: 0.5rem;
}

.ability-list li {
  margin-bottom: 0.25rem;
  line-height: 1.55;
}

.ability-ol {
  padding-left: 1.3rem;
  list-style: decimal;
  margin-bottom: 0.5rem;
}

.ability-ol li {
  margin-bottom: 0.3rem;
  line-height: 1.55;
}

/* Info card inside ability (Scout Move) */
.ability-body .info-card {
  border: 1px solid var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin: 0.25rem 0 0.5rem;
  font-size: 0.88rem;
  line-height: 1.5;
}

.ability-body .info-row {
  display: grid;
  grid-template-columns: 10rem 1fr;
  border-bottom: 1px solid var(--border-light);
}

.ability-body .info-row:last-child { border-bottom: none; }

.ability-body .info-label {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  padding: 0.45rem 0.6rem;
  background: var(--bg-card);
  color: var(--text-muted);
  border-right: 1px solid var(--border-light);
}

.ability-body .info-content {
  padding: 0.45rem 0.7rem;
}

/* Note box label override */
.ability-note-box::before {
  content: 'Designer\'s Note';
  display: block;
  font-style: normal;
  font-weight: 700;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.7px;
  color: var(--accent-light, #e8c96a);
  margin-bottom: 0.35rem;
}

/* Example and note boxes inside ability cards — flush to card edges */
.ability-card .example-block,
.ability-card .note-box {
  margin: 0;
  border-radius: 0;
  border-top: 1px solid var(--border-light);
}

/* Digital Support */
.digital-support {
  margin-bottom: 1.25rem;
  padding: 1.25rem 1.5rem;
  border-left: 3px solid var(--accent);
  background: var(--bg-secondary);
  border-radius: 0 6px 6px 0;
}

.digital-support-title {
  font-family: var(--font-serif);
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  margin-bottom: 0.5rem;
}

.digital-support-body {
  overflow: hidden;
}

.digital-support-qr {
  float: right;
  margin: 0 0 0.75rem 1.25rem;
  width: 120px;
}

.digital-support-qr .qr-img {
  width: 120px;
  height: auto;
  display: block;
  border-radius: 4px;
}

.digital-support p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 500px) {
  .digital-support-qr {
    float: none;
    margin: 0 auto 0.75rem;
  }
}

@media (max-width: 600px) {
  .ability-body .info-row {
    display: block;
  }

  .ability-body .info-label {
    border-right: none;
    border-bottom: 1px solid var(--border-light);
    padding: 0.35rem 0.7rem;
  }
}

/* Appendix */
.appendix-block {
  border-bottom: 1px solid var(--border-light);
  padding: 1.25rem 0;
  scroll-margin-top: 72px;
}

.appendix-title {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border-light);
}

.appendix-block p {
  font-size: 0.92rem;
  line-height: 1.6;
  color: var(--text-primary);
  margin-bottom: 0.6rem;
}

.appendix-list {
  padding-left: 1.25rem;
  margin-bottom: 0.6rem;
}

.appendix-list li {
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* FAQs */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.faq-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}

.faq-q, .faq-a {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  align-items: flex-start;
}

.faq-q {
  border-bottom: 1px solid var(--border-light);
  font-weight: 600;
}

.faq-a {
  color: var(--text-muted);
}

.faq-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  min-width: 22px;
  background: var(--accent);
  border-radius: 3px;
  font-weight: 700;
  font-size: 0.75rem;
  color: var(--text-on-accent);
  flex-shrink: 0;
}

.faq-badge.ans {
  background: var(--text-muted);
}
</style>
