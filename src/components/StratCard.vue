<template>
  <div class="strat-card" :class="`turn-${strat.turn || 'your'}`">
    <div class="strat-header">
      <div class="strat-heading">
        <div class="strat-title-row">
          <span class="strat-name">{{ strat.name }}</span>
          <span class="strat-num">{{ strat.num }}</span>
        </div>
        <span v-if="strat.nameRu" class="strat-name-ru">{{ strat.nameRu }}</span>
      </div>
      <span class="strat-cp">{{ strat.cp }}</span>
    </div>

    <div class="strat-sublabel">{{ sublabel || labels.stratCoreLabel }}</div>

    <div class="strat-body">
      <p v-if="strat.flavor" class="strat-flavor">{{ strat.flavor }}</p>

      <div class="strat-row">
        <span class="strat-label">{{ labels.stratWhen }}</span>
        <div class="strat-content" v-html="renderField(strat.when)"></div>
      </div>
      <div v-if="strat.target" class="strat-row">
        <span class="strat-label">{{ labels.stratTarget }}</span>
        <div class="strat-content" v-html="renderField(strat.target)"></div>
      </div>
      <div class="strat-row">
        <span class="strat-label">{{ labels.stratEffect }}</span>
        <div class="strat-content" v-html="renderField(strat.effect)"></div>
      </div>

      <template v-for="extra in (strat.extraCost || [])" :key="extra.title">
        <div class="strat-extra">
          <div class="strat-extra-header">
            <span class="strat-extra-title">{{ extra.title }}</span>
            <span class="strat-extra-cp">{{ extra.cp }}</span>
          </div>
          <div class="strat-content" v-html="renderField(extra.body)"></div>
        </div>
      </template>

      <div v-if="strat.restrictions" class="strat-row strat-restrict">
        <span class="strat-label">{{ labels.stratRestrictions }}</span>
        <div class="strat-content" v-html="renderInline(strat.restrictions)"></div>
      </div>
    </div>

    <div v-if="strat.subRule" class="strat-sub-rule">
      <div class="strat-sub-rule-header">
        <span class="strat-sub-num">{{ strat.subRule.sectionNum }}</span>
        <span class="strat-sub-title">{{ strat.subRule.title }}</span>
      </div>
      <div class="strat-body strat-sub-body">
        <div v-for="field in strat.subRule.fields" :key="field.label" class="strat-row">
          <span class="strat-label">{{ field.label }}</span>
          <div class="strat-content" v-html="renderField(field.text)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRenderInline } from '../composables/useRenderInline.js'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const { renderInline } = useRenderInline()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

defineProps({
  strat: { type: Object, required: true },
  sublabel: { type: String, default: null },
})

function renderField(text) {
  if (!text) return ''
  const lines = text.split('\n')
  let html = ''
  let inUl = false
  let inOl = false

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('▪ ')) {
      if (inOl) { html += '</ol>'; inOl = false }
      if (!inUl) { html += '<ul>'; inUl = true }
      html += `<li>${renderInline(trimmed.slice(2))}</li>`
    } else if (/^\d+\. /.test(trimmed)) {
      if (inUl) { html += '</ul>'; inUl = false }
      if (!inOl) { html += '<ol>'; inOl = true }
      html += `<li>${renderInline(trimmed.replace(/^\d+\. /, ''))}</li>`
    } else {
      if (inUl) { html += '</ul>'; inUl = false }
      if (inOl) { html += '</ol>'; inOl = false }
      if (trimmed) {
        if (html) html += '<br>'
        html += renderInline(trimmed)
      }
    }
  }
  if (inUl) html += '</ul>'
  if (inOl) html += '</ol>'
  return html
}
</script>

<style scoped>
/* Turn color tokens */
.turn-either { --turn-color: #1e7a5a; }
.turn-your   { --turn-color: #1a3a6e; }
.turn-opponent { --turn-color: #8b1a1a; }

.strat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
}

/* Header */
.strat-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.9rem;
  background: #1c1c1e;
  color: #fff;
}

.strat-heading {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.strat-title-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  min-width: 0;
}

/* RU translation of the stratagem name — small, semi-transparent second line */
.strat-name-ru {
  font-size: 0.66rem;
  font-weight: 400;
  letter-spacing: 0.2px;
  color: rgba(255, 255, 255, 0.45);
  line-height: 1.05;
  margin-top: -6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.strat-name {
  font-family: var(--font-display);
  font-size: var(--fs-subheading);
  font-weight: var(--fw-heading);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.strat-num {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: rgba(255,255,255,0.5);
  flex-shrink: 0;
}

.strat-cp {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  flex-shrink: 0;
}

/* Colored sublabel */
.strat-sublabel {
  background: var(--turn-color);
  color: #fff;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 0.2rem 0.9rem;
}

/* Body */
.strat-body {
  padding: 0.65rem 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
}

.strat-flavor {
  font-style: italic;
  color: var(--text-muted);
  font-size: 0.8rem;
  line-height: 1.4;
  margin: 0 0 0.3rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--border);
}

.strat-row {
  display: flex;
  gap: 0.5rem;
  line-height: 1.45;
}

.strat-label {
  flex-shrink: 0;
  min-width: 64px;
  width: auto;
  font-size: 0.62rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-primary);
  padding-top: 2px;
}

.strat-content {
  flex: 1;
  min-width: 0;
}

.strat-content :deep(ul),
.strat-content :deep(ol) {
  margin: 0.2rem 0 0;
  padding-left: 1.1rem;
}

.strat-content :deep(li) {
  margin-bottom: 0.15rem;
}

/* +1CP section */
.strat-extra {
  margin-top: 0.3rem;
  border-top: 1px dashed var(--border);
  padding-top: 0.4rem;
}

.strat-extra-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--turn-color);
  color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  margin-bottom: 0.3rem;
}

.strat-extra-title {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.strat-extra-cp {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.85rem;
}

/* Sub-rule (e.g. Snap Shooting attached to Fire Overwatch) */
.strat-sub-rule {
  border-top: 2px dashed var(--border);
  margin-top: 0.25rem;
}

.strat-sub-rule-header {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.45rem 0.9rem;
  background: #2e2e30;
  color: #fff;
}

.strat-sub-num {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  color: rgba(255,255,255,0.5);
  flex-shrink: 0;
}

.strat-sub-title {
  font-family: var(--font-display);
  font-size: 0.94rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.strat-sub-body {
  padding-top: 0.5rem;
}

/* Restrictions */
.strat-restrict {
  color: var(--text-muted);
  font-style: italic;
  font-size: 0.8rem;
  margin-top: 0.1rem;
}
</style>
