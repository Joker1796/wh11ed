<template>
  <!-- A plate. One with rule text to show opens on a tap anywhere on its header line — the text
       used to hang off a small "Text changed" link that was hard to hit (owner, 2026-10-01). -->
  <li
    class="pe"
    :class="[`pe-${item.change}`, { open }]"
  >
    <component
      :is="texts.length ? 'button' : 'div'"
      class="pe-head"
      v-bind="texts.length ? { type: 'button', 'aria-expanded': open } : {}"
      @click="texts.length && toggle()"
    >
      <span class="pe-title">
        <span
          v-if="kindLabel"
          class="pe-kind"
        >{{ kindLabel }}</span>
        <span class="pe-name">{{ item.name }}</span>
        <span
          v-if="item.was"
          class="pe-note"
        >({{ labels.patchesWas }}: {{ item.was }})</span>
        <span
          v-if="item.change === 'added'"
          class="pe-badge pe-badge-new"
        >{{ labels.patchesNew }}</span>
        <span
          v-else-if="item.change === 'removed'"
          class="pe-badge pe-badge-gone"
        >{{ labels.patchesRemoved }}</span>
        <span
          v-if="item.kind === 'publication' && item.date"
          class="pe-note"
        >{{ item.change === 'changed' ? `${labels.patchesErrata} ` : '' }}{{ item.date }}</span>
      </span>
      <!-- What opening it shows: the abilities, the stratagem's parts, or just "text". -->
      <span
        v-if="texts.length"
        class="pe-summary"
      >{{ texts.map((t) => t.label).join(' · ') }}</span>
      <i
        v-if="texts.length"
        class="bi bi-chevron-down pe-chev"
      />
    </component>

    <!-- The numbers: one chip each, "T 4 → 5". -->
    <div
      v-if="chips.length"
      class="pe-chips"
    >
      <span
        v-for="(c, i) in chips"
        :key="i"
        class="pe-chip"
      >{{ c }}</span>
    </div>

    <!-- Lists that gained or lost entries: keywords, the units a Leader can join, core abilities. -->
    <p
      v-for="(s, i) in sets"
      :key="'s' + i"
      class="pe-line"
    >
      <span class="pe-label">{{ s.label }}:</span>
      <span
        v-for="k in s.added"
        :key="'+' + k"
        class="pe-plus"
      >+ {{ k }}</span>
      <span
        v-for="k in s.removed"
        :key="'-' + k"
        class="pe-minus"
      >− {{ k }}</span>
    </p>

    <!-- Weapons: a profile whose numbers moved, a renamed one, one that came or went. -->
    <p
      v-for="(w, i) in weapons"
      :key="'w' + i"
      class="pe-line"
    >
      <span
        v-if="w.change === 'added'"
        class="pe-plus"
      >+ {{ w.name }}</span>
      <span
        v-else-if="w.change === 'removed'"
        class="pe-minus"
      >− {{ w.name }}</span>
      <template v-else-if="w.change === 'retyped'">
        <span class="pe-label">{{ w.name }}:</span>
        <span class="pe-chip">{{ weaponType(w.fromType) }} → {{ weaponType(w.toType) }}</span>
      </template>
      <template v-else>
        <span class="pe-label">{{ w.name }}<template v-if="w.from"> ({{ labels.patchesWas }}: {{ w.from }})</template>:</span>
        <span
          v-for="s in w.stats"
          :key="s.stat"
          class="pe-chip"
        >{{ s.stat }} {{ s.from || '–' }} → {{ s.to || '–' }}</span>
        <span
          v-for="t in w.tags.added"
          :key="'+' + t"
          class="pe-plus"
        >+ {{ t }}</span>
        <span
          v-for="t in w.tags.removed"
          :key="'-' + t"
          class="pe-minus"
        >− {{ t }}</span>
      </template>
    </p>

    <CollapseTransition :show="open">
      <div
        v-if="open || wasOpen"
        class="pe-texts"
      >
        <div
          v-for="(t, i) in texts"
          :key="i"
          class="pe-text"
        >
          <h5
            v-if="texts.length > 1 || t.named"
            class="pe-text-label"
          >
            <span
              v-if="t.prefix"
              class="pe-plus"
            >{{ t.prefix }}</span>
            {{ t.label }}
          </h5>
          <PatchTextDiff
            :from="t.from"
            :to="t.to"
          />
        </div>
      </div>
    </CollapseTransition>
  </li>
</template>

<script setup>
// One change in a GW update, as scripts/gen-patch-notes.mjs wrote it (the shapes are documented in
// scripts/patch-notes/). Numbers are chips, lists are +/− words, rule texts open on request — a
// datasheet rewrite would otherwise put a screen of struck words between two unit names.
import { computed, ref } from 'vue'
import CollapseTransition from '../CollapseTransition.vue'
import PatchTextDiff from './PatchTextDiff.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { copyTierLabel, modelsLabel } from '../../utils/copyTier.js'

const props = defineProps({
  item: { type: Object, required: true },
  // A detachment's own entries are listed under its name, so they name their kind instead.
  inDetachment: { type: Boolean, default: false },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const open = ref(false)
// Rendered once opened, kept while it folds, so closing animates.
const wasOpen = ref(false)
function toggle() {
  open.value = !open.value
  if (open.value) wasOpen.value = true
}

const fields = computed(() => props.item.fields || [])

const kindLabel = computed(() => {
  const l = labels.value
  const k = props.item.kind
  if (k === 'stratagem') return l.patchesStratagem
  if (k === 'enhancement' || k === 'enhancementPoints') return l.patchesEnhancement
  if (k === 'detachmentRule') return l.patchesRule
  if (k === 'faq') return props.item.type === 'qa' ? l.patchesQuestion : l.patchesErrataEntry
  if (k === 'coreRule' && props.item.num) return props.item.num
  return ''
})

// Today's page of a unit named here (null for one that is gone).
const arrow = (from, to) => `${from || '–'} → ${to || '–'}`
const chips = computed(() => {
  const l = labels.value
  const x = props.item
  const out = []
  if (x.kind === 'points') {
    // "6 моделей · 3-я+ копия" — the MFM's make-up label stands for the size when it names one.
    const size = (o) => [o.label || modelsLabel(o.models, locale.value), o.tier ? copyTierLabel(o.tier, locale.value) : ''].filter(Boolean).join(' · ')
    for (const o of x.fields || []) out.push(`${size(o)}: ${arrow(o.from, o.to)}`)
    for (const o of x.options || []) out.push(`${size(o)}: ${o.to} ${l.patchesPts}`)
    return out
  }
  if (x.kind === 'enhancementPoints') return [`${arrow(x.from, x.to)} ${l.patchesPts}`]
  // A stat that moved the same way on every model line is one chip; otherwise each names its model.
  const stats = fields.value.filter((f) => f.field === 'stat')
  const models = new Set(stats.map((f) => f.model))
  const seen = new Set()
  for (const f of stats) {
    const same = stats.filter((g) => g.stat === f.stat && g.from === f.from && g.to === f.to)
    const k = `${f.stat}|${f.from}|${f.to}`
    if (same.length === models.size && models.size > 1) {
      if (!seen.has(k)) out.push(`${f.stat} ${arrow(f.from, f.to)}`)
      seen.add(k)
    } else {
      out.push(`${models.size > 1 ? `${f.model}: ` : ''}${f.stat} ${arrow(f.from, f.to)}`)
    }
  }
  const named = { invul: l.patchesInvul, damaged: l.patchesDamaged, sizes: l.patchesSizes, dp: 'DP', forceDisposition: 'Force Disposition', cp: 'CP' }
  for (const f of fields.value) if (named[f.field]) out.push(`${named[f.field]} ${arrow(f.from, f.to)}`)
  return out
})

const sets = computed(() => {
  const l = labels.value
  const named = { keywords: l.patchesKeywords, factionKeywords: l.patchesKeywords, leaderOf: l.patchesLeads, coreAbilities: l.patchesAbilities, tag: l.patchesTag }
  const out = fields.value.filter((f) => named[f.field]).map((f) => ({ label: named[f.field], added: f.added || [], removed: f.removed || [] }))
  // An ability that went has no text left to show — it is a line of names, like a keyword.
  const gone = fields.value.filter((f) => f.field === 'ability' && f.change === 'removed').map((f) => f.name)
  if (gone.length) out.push({ label: l.patchesAbilities, added: [], removed: gone })
  return out
})

const weapons = computed(() => fields.value.filter((f) => f.field === 'weapon'))
// Which table a weapon sits in — the change a "retyped" weapon reports.
const weaponType = (t) => (t === 'melee' ? labels.value.patchesMelee : labels.value.patchesRanged)

const texts = computed(() => {
  const l = labels.value
  const x = props.item
  const out = []
  const part = { when: l.patchesWhen, target: l.patchesTarget, effect: l.patchesEffect, restriction: l.patchesRestriction }
  for (const f of fields.value) {
    if (f.field === 'ability') {
      if (f.change !== 'removed') out.push({ label: f.name, named: true, prefix: f.change === 'added' ? '+' : '', from: f.from || '', to: f.to || '' })
    } else if (f.field === 'text') out.push({ label: l.patchesTextChanged, from: f.from, to: f.to })
    else if (part[f.field]) out.push({ label: part[f.field], named: true, from: f.from, to: f.to })
  }
  // An added rule, FAQ answer or core rule: its text as it reads.
  if (x.change === 'added' && x.to) out.push({ label: labels.value.patchesText, from: '', to: x.to })
  return out.filter((t) => t.from || t.to)
})
</script>

<style scoped>
.pe {
  list-style: none;
  margin-bottom: 0.35rem;
  background: var(--bg-row-alt);
  border: 1px solid var(--border-light);
}
.pe:last-child { margin-bottom: 0; }
.pe-head {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.15rem 0.6rem;
  padding: 0.45rem 0.6rem;
  background: none;
  border: none;
  font: inherit;
  text-align: left;
  color: var(--text-primary);
}
button.pe-head { cursor: pointer; transition: background var(--motion-fast); }
button.pe-head:hover { background: color-mix(in srgb, var(--accent) 7%, transparent); }
.pe-title {
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.2rem 0.5rem;
}
.pe-kind {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
}
.pe-name { font-weight: 600; font-size: 0.9rem; }
.pe-removed .pe-name { color: var(--text-muted); text-decoration: line-through; }
.pe-badge {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0 0.3rem;
  border: 1px solid currentColor;
}
.pe-badge-new { color: var(--accent); }
.pe-badge-gone { color: var(--text-muted); }
.pe-note { font-size: 0.78rem; color: var(--text-muted); }
.pe-summary {
  font-size: 0.78rem;
  color: var(--text-muted);
  overflow-wrap: anywhere;
}
.pe-chev {
  margin-left: auto;
  font-size: 0.8rem;
  color: var(--text-muted);
  transition: transform var(--motion-fast) ease;
}
.pe.open .pe-chev { transform: rotate(180deg); }

.pe-chips,
.pe-line {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 0.45rem;
  margin: 0;
  padding: 0 0.6rem 0.45rem;
  font-size: 0.82rem;
}
.pe-chip {
  max-width: 100%;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 0.78rem;
  padding: 0.05rem 0.35rem;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  /* "Force Disposition Priority Assets → Take and Hold" is wider than a phone: it wraps inside
     its chip instead of running off the screen. */
  overflow-wrap: anywhere;
}
.pe-label { color: var(--text-muted); }
.pe-plus { color: var(--accent); }
.pe-minus { color: var(--text-muted); text-decoration: line-through; }

.pe-texts { padding: 0 0.6rem 0.5rem; border-top: 1px solid var(--border-light); }
.pe-text + .pe-text { margin-top: 0.4rem; }
.pe-text-label {
  margin: 0.4rem 0 0;
  font-family: var(--font-sans);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-primary);
}
</style>
