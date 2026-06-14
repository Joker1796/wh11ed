<template>
  <div class="view">
    <div class="view-hero">
      <h1>Battlefields &amp; Tactics</h1>
      <p class="view-hero-desc">Terrain, objectives, stratagems and actions</p>
    </div>

    <TableOfContents :sections="tocSections" />

    <template v-for="section in battlefields" :key="section.id">
      <SectionHeader
        :id="'section-' + section.id.padStart(2,'0')"
        :num="section.num"
        :title="section.title"
        :description="section.description"
        :page="section.page"
      />

      <template v-for="sub in section.subsections.filter(s => !s.renderAfterStratagems)" :key="sub.id">
        <GroupLabelBlock
          v-if="sub.isGroupLabel"
          :title="sub.title"
          :body="sub.body"
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
        />
      </template>

      <!-- Stratagems grid for section 15 -->
      <template v-if="section.id === '15' && section.stratagems">
        <div class="stratagems-section" id="section-15-list">
          <h3 class="strat-list-title">Core Stratagems</h3>
          <div class="strat-grid">
            <div v-for="strat in section.stratagems" :key="strat.num" class="strat-card">
              <div class="strat-header">
                <span class="strat-num">{{ strat.num }}</span>
                <span class="strat-name">{{ strat.name }}</span>
                <span class="strat-cp">{{ strat.cp }}</span>
              </div>
              <div class="strat-body">
                <div class="strat-row"><span class="strat-label">WHEN</span><span v-html="renderStratField(strat.when)"></span></div>
                <div v-if="strat.target" class="strat-row"><span class="strat-label">TARGET</span><span v-html="renderStratField(strat.target)"></span></div>
                <div class="strat-row"><span class="strat-label">EFFECT</span><span v-html="renderStratField(strat.effect)"></span></div>
                <div v-if="strat.restrictions" class="strat-row strat-restrict"><span class="strat-label">RESTRICTIONS</span><span v-html="renderStratField(strat.restrictions)"></span></div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Subsections rendered after stratagem grid (e.g. Snap Shooting) -->
      <template v-for="sub in section.subsections.filter(s => s.renderAfterStratagems)" :key="sub.id + '-after'">
        <RuleBlock
          :id="sub.id"
          :section-num="sub.sectionNum"
          :title="sub.title"
          :body="sub.body"
          :note="sub.note"
          :example="sub.example"
          :see-also="sub.seeAlso"
        />
      </template>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SectionHeader from '../components/SectionHeader.vue'
import RuleBlock from '../components/RuleBlock.vue'
import GroupLabelBlock from '../components/GroupLabelBlock.vue'
import TableOfContents from '../components/TableOfContents.vue'
import { battlefields } from '../data/battlefields.js'
import { useRenderInline } from '../composables/useRenderInline.js'

const { renderInline } = useRenderInline()

const tocSections = computed(() =>
  battlefields.map(s => ({
    id: 'section-' + s.id.padStart(2, '0'),
    num: s.num,
    label: s.title,
  }))
)

function renderStratField(text) {
  if (!text) return ''
  return text.split('\n').map((line, i) => {
    const trimmed = line.trim()
    const prefix = i > 0 ? '<br>' : ''
    return prefix + renderInline(trimmed)
  }).join('')
}
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

.stratagems-section {
  margin: 1.5rem 0 2rem;
}

.strat-list-title {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border);
}

.strat-grid {
  display: grid;
  gap: 1rem;
}

.strat-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
}

.strat-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1rem;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}

.strat-num {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-muted);
  background: rgba(110, 0, 8, 0.08);
  padding: 1px 6px;
  border-radius: 2px;
  border: 1px solid rgba(110, 0, 8, 0.2);
}

.strat-name {
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
  color: var(--text-primary);
  font-family: var(--font-sans);
}

.strat-cp {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--accent);
  font-family: var(--font-mono);
}

.strat-body {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.88rem;
}

.strat-row {
  display: flex;
  gap: 0.75rem;
  line-height: 1.5;
}

.strat-label {
  flex-shrink: 0;
  width: 90px;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--accent);
  padding-top: 2px;
}

.strat-restrict {
  color: var(--text-muted);
  font-style: italic;
  font-size: 0.82rem;
}
</style>
