<template>
  <article class="ds-card">
    <!-- Lore: gated by the page's book-icon toggle (showFlavor) and still hidden
         app-wide by the "Hide lore" toggle via data-hide-lore -->
    <p v-if="sheet.flavor && showFlavor" class="ds-flavor">{{ sheet.flavor }}</p>

    <!-- Stat profiles -->
    <div v-for="(p, i) in sheet.profiles" :key="i" class="ds-statline">
      <span v-if="sheet.profiles.length > 1" class="ds-prof-name">{{ p.name }}</span>
      <div class="ds-stats">
        <template v-for="s in statCells(p)" :key="s.label">
          <!-- The invulnerable save is a second stat box stacked under SV; a conditional
               (e.g. one-use / ranged-only) invuln gets an asterisk explained below. -->
          <div v-if="s.label === 'SV' && p.inv" class="ds-stat-col">
            <div class="ds-stat">
              <span class="ds-stat-label">{{ s.label }}</span>
              <span class="ds-stat-value">{{ s.value }}</span>
            </div>
            <div class="ds-stat ds-stat-inv">
              <span class="ds-stat-label">INV</span>
              <span class="ds-stat-value">{{ p.inv }}{{ p.invNote ? '*' : '' }}</span>
            </div>
          </div>
          <div v-else class="ds-stat">
            <span class="ds-stat-label">{{ s.label }}</span>
            <span class="ds-stat-value">{{ s.value }}</span>
          </div>
        </template>
      </div>
      <div v-if="p.invNote" class="ds-inv-note">{{ invNoteText(p.invNote) }}</div>
    </div>

    <!-- Weapons -->
    <div v-if="sheet.ranged" class="ds-weapons">
      <table>
        <thead>
          <tr><th class="wname">{{ labels.dsRanged }}</th><th>Range</th><th>A</th><th>BS</th><th>S</th><th>AP</th><th>D</th></tr>
        </thead>
        <tbody>
          <tr v-for="(w, i) in sheet.ranged" :key="i">
            <td class="wname">{{ w.name }} <span v-for="t in w.tags" :key="t" class="wtag" v-html="renderInline('[' + t + ']')"></span></td>
            <td>{{ w.range }}</td><td>{{ w.a }}</td><td>{{ w.bs }}</td><td>{{ w.s }}</td><td>{{ w.ap }}</td><td>{{ w.d }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="sheet.melee" class="ds-weapons">
      <table>
        <thead>
          <tr><th class="wname">{{ labels.dsMelee }}</th><th>Range</th><th>A</th><th>WS</th><th>S</th><th>AP</th><th>D</th></tr>
        </thead>
        <tbody>
          <tr v-for="(w, i) in sheet.melee" :key="i">
            <td class="wname">{{ w.name }} <span v-for="t in w.tags" :key="t" class="wtag" v-html="renderInline('[' + t + ']')"></span></td>
            <td>Melee</td><td>{{ w.a }}</td><td>{{ w.ws }}</td><td>{{ w.s }}</td><td>{{ w.ap }}</td><td>{{ w.d }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Abilities -->
    <div class="ds-abilities">
      <!-- Core abilities are clickable keywords: Leader, Deep Strike, Scouts 9"… all
           resolve in KeywordPopover via the coreAbilities lookup (exact or prefix match). -->
      <p v-if="sheet.core" class="ds-ability-line">
        <strong>{{ labels.dsCore }}:</strong>
        <template v-for="(c, i) in coreParts" :key="c">{{ i ? ', ' : ' ' }}<span class="keyword">{{ c }}</span></template>
      </p>
      <p v-if="sheet.faction" class="ds-ability-line">
        <strong>{{ labels.dsFaction }}:</strong> <span class="ds-faction-rule">{{ sheet.faction }}</span>
      </p>
      <div v-for="a in sheet.abilities" :key="a.name" class="ds-ability">
        <strong>{{ a.name }}:</strong> <span v-html="dsText(a.text)"></span>
      </div>
      <template v-if="sheet.wargearAbilities">
        <h5 class="ds-group-title">{{ labels.dsWargearAbilities }}</h5>
        <div v-for="a in sheet.wargearAbilities" :key="a.name" class="ds-ability">
          <strong>{{ a.name }}:</strong> <span v-html="dsText(a.text)"></span>
        </div>
      </template>
      <div v-for="a in sheet.specialAbilities" :key="a.name" class="ds-ability">
        <strong>{{ a.name }}:</strong> <span v-html="dsText(a.text)"></span>
      </div>
      <div v-if="sheet.damaged" class="ds-damaged">
        <strong>{{ labels.dsDamaged }}: {{ sheet.damaged.note }}</strong>
        <div v-html="dsText(sheet.damaged.text)"></div>
      </div>
    </div>

    <!-- Transport / Leader -->
    <div v-if="sheet.transport" class="ds-block">
      <h5 class="ds-group-title">{{ labels.dsTransport }}</h5>
      <div v-html="dsText(sheet.transport)"></div>
    </div>
    <div v-if="sheet.leader" class="ds-block">
      <h5 class="ds-group-title">{{ labels.dsLeader }}</h5>
      <div v-html="dsText(sheet.leader.text)"></div>
      <ul class="ds-list">
        <li v-for="u in sheet.leader.units" :key="u">{{ u }}</li>
      </ul>
      <div v-if="sheet.leader.footer" v-html="dsText(sheet.leader.footer)"></div>
    </div>

    <!-- Composition / loadout / options -->
    <div v-if="sheet.composition || sheet.loadout" class="ds-block">
      <h5 class="ds-group-title">{{ labels.dsComposition }}</h5>
      <ul v-if="sheet.composition" class="ds-list">
        <li v-for="c in sheet.composition" :key="c" v-html="dsText(c)"></li>
      </ul>
      <div v-if="sheet.loadout" class="ds-loadout" v-html="dsText(sheet.loadout)"></div>
    </div>
    <div v-if="sheet.options" class="ds-block">
      <h5 class="ds-group-title">{{ labels.dsOptions }}</h5>
      <div v-for="(o, i) in sheet.options" :key="i" class="ds-option" v-html="dsText(o)"></div>
    </div>

    <!-- Keywords -->
    <div class="ds-keywords">
      <div>
        <strong>{{ labels.dsKeywords }}:</strong>
        <template v-for="(k, i) in sheet.keywords" :key="k">{{ i ? ', ' : ' ' }}<span class="ds-kw">{{ k }}</span></template>
      </div>
      <div>
        <strong>{{ labels.dsFactionKeywords }}:</strong>
        <template v-for="(k, i) in sheet.factionKeywords" :key="k">{{ i ? ', ' : ' ' }}<span class="ds-kw">{{ k }}</span></template>
      </div>
    </div>

    <!-- Points: unit sizes × MFM copy tiers (1st-2nd / 3rd+ copy of this datasheet) -->
    <div v-if="pointsTable" class="ds-points">
      <table>
        <thead>
          <tr>
            <th class="pname">{{ pointsTable.hasLabels ? '' : labels.dsModels }}</th>
            <th v-for="t in pointsTable.tiers" :key="t || 'pts'">{{ tierLabel(t) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in pointsTable.rows" :key="r.key">
            <td class="pname">{{ r.label || r.models }}</td>
            <td v-for="t in pointsTable.tiers" :key="t || 'pts'">{{ r.cells[t ?? ''] != null ? r.cells[t ?? ''] + ' pts' : '—' }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="pointsTable.tiers.some((t) => t)" class="ds-points-note">{{ labels.dsPointsCopyNote }}</p>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useRenderInline } from '../composables/useRenderInline.js'

const props = defineProps({
  sheet: { type: Object, required: true },
  showFlavor: { type: Boolean, default: true },
})

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const labels = computed(() => ui[locale.value])

const coreParts = computed(() => (props.sheet.core ? props.sheet.core.split(/,\s*/) : []))

// MFM points notes are either a bare copy tier ('1st-2nd', '3rd+', '2nd+', '1st-3rd'…),
// a composition label with the tier in parens ('3 Wolf Guard Headtakers (1st-2nd)'),
// or absent. Pivot them into rows (unit size / composition) × columns (copy tier).
const TIER_RE = /^\d+(?:st|nd|rd|th)(?:-\d+(?:st|nd|rd|th))?\+?$/
function splitNote(note) {
  if (!note) return { label: null, tier: null }
  if (TIER_RE.test(note)) return { label: null, tier: note }
  const m = note.match(/^(.*?)\s*\((\d[^)]*)\)$/)
  if (m) return { label: m[1], tier: m[2] }
  return { label: note, tier: null }
}

const pointsTable = computed(() => {
  const pts = props.sheet.points
  // A single flat cost is already fully shown in the accordion toggle — no table needed.
  if (!pts || pts.length < 2) return null
  const rows = []
  const tiers = []
  for (const p of pts) {
    const { label, tier } = splitNote(p.note)
    const key = label ?? String(p.models ?? '')
    let row = rows.find((r) => r.key === key)
    if (!row) {
      row = { key, label, models: p.models, cells: {} }
      rows.push(row)
    }
    if (!tiers.includes(tier)) tiers.push(tier)
    row.cells[tier ?? ''] = p.points
  }
  return { rows, tiers, hasLabels: rows.some((r) => r.label) }
})

// '1st-2nd' / '3rd+' → "1st–2nd copy" / «1–2-я копия»: which copy of this datasheet
// in the army the price applies to (explained by the note under the table).
function tierLabel(tier) {
  if (!tier) return labels.value.dsPoints
  if (locale.value === 'ru') {
    const nums = (tier.match(/\d+/g) || []).join('–')
    return `${nums}-я${tier.includes('+') ? '+' : ''} копия`
  }
  return `${tier.replace('-', '–')} copy`
}

// invNote data is inconsistent about the leading asterisk — normalize to one '* '.
function invNoteText(note) {
  return '* ' + note.replace(/^\*\s*/, '')
}

// Bold this sheet's faction keywords (ORKS, ADEPTUS ASTARTES…) wherever the rules text
// mentions them, matching the codex typography. [BRACKET] tags and existing **bold**
// runs are matched first and passed through untouched so the markup never nests.
const factionKwRegex = computed(() => {
  const kws = (props.sheet.factionKeywords || [])
    .map((k) => k.toUpperCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .sort((a, b) => b.length - a.length)
  return kws.length ? new RegExp(`\\[[^\\]]*\\]|\\*\\*.*?\\*\\*|\\b(${kws.join('|')})\\b`, 'g') : null
})

function dsText(text) {
  const re = factionKwRegex.value
  const marked = re ? text.replace(re, (m, kw) => (kw ? `**${kw}**` : m)) : text
  return renderInline(marked)
}

function statCells(p) {
  return [
    { label: 'M', value: p.m },
    { label: 'T', value: p.t },
    { label: 'SV', value: p.sv },
    { label: 'W', value: p.w },
    { label: 'LD', value: p.ld },
    { label: 'OC', value: p.oc },
  ]
}
</script>

<style scoped>
.ds-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0 0 6px 6px;
  padding: 0.9rem 1rem 1rem;
}

/* Stat line */
.ds-statline { margin-bottom: 0.7rem; }
.ds-prof-name {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}
.ds-stats { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 0.35rem; }
.ds-stat-col { display: flex; flex-direction: column; gap: 0.35rem; }
.ds-stat {
  min-width: 3rem;
  text-align: center;
  background: color-mix(in srgb, var(--accent) 7%, transparent);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 0.25rem 0.3rem;
}
.ds-stat-label {
  display: block;
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-muted);
}
.ds-stat-value {
  font-family: var(--font-display);
  font-size: 1.15rem;
  color: var(--text-primary);
}
.ds-stat-inv { border-color: var(--accent); }
.ds-stat-inv .ds-stat-label, .ds-stat-inv .ds-stat-value { color: var(--accent); }
.ds-inv-note { font-size: 0.75rem; font-style: italic; color: var(--text-muted); margin-top: 0.25rem; }

/* Points */
.ds-points { overflow-x: auto; margin-top: 0.8rem; }
.ds-points table { border-collapse: collapse; font-size: 0.8rem; }
.ds-points th {
  text-align: center;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
  padding: 0.2rem 0.7rem;
  white-space: nowrap;
}
.ds-points td {
  text-align: center;
  padding: 0.25rem 0.7rem;
  color: var(--text-primary);
  font-family: var(--font-mono);
  white-space: nowrap;
}
.ds-points .pname { text-align: left; padding-left: 0; }
.ds-points td.pname { font-family: var(--font-sans); color: var(--text-muted); white-space: normal; }
.ds-points-note {
  margin-top: 0.35rem;
  font-size: 0.72rem;
  font-style: italic;
  color: var(--text-muted);
}

/* Weapons */
.ds-weapons { overflow-x: auto; margin-bottom: 0.7rem; }
.ds-weapons table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.ds-weapons th {
  text-align: center;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #fff;
  background: var(--ds-th-bg, var(--accent));
  padding: 0.3rem 0.35rem;
  white-space: nowrap;
}

.ds-weapons th:first-child { border-top-left-radius: 4px; }
.ds-weapons th:last-child { border-top-right-radius: 4px; }
.ds-weapons td {
  text-align: center;
  padding: 0.3rem 0.35rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-primary);
  white-space: nowrap;
}
.ds-weapons .wname { text-align: left; white-space: normal; min-width: 10rem; }
.wtag { font-size: 0.72rem; }

/* Abilities */
.ds-abilities { font-size: 0.85rem; line-height: 1.5; color: var(--text-primary); }
.ds-faction-rule { font-weight: 600; }
.ds-ability-line { margin-bottom: 0.3rem; }
.ds-ability { margin-bottom: 0.45rem; }
.ds-group-title {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  margin: 0.7rem 0 0.3rem;
}
.ds-damaged {
  margin-top: 0.6rem;
  padding: 0.5rem 0.7rem;
  border-left: 3px solid #c0392b;
  background: color-mix(in srgb, #c0392b 8%, transparent);
  border-radius: 0 4px 4px 0;
  font-size: 0.82rem;
}

.ds-block { font-size: 0.85rem; line-height: 1.5; color: var(--text-primary); margin-top: 0.5rem; }
.ds-list { margin: 0.2rem 0 0.3rem 1.1rem; padding: 0; }
.ds-loadout, .ds-option { margin-bottom: 0.3rem; white-space: pre-line; }

.ds-keywords {
  margin-top: 0.8rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.75rem;
  color: var(--text-muted);
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.ds-kw {
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-primary);
}

.ds-flavor {
  margin-bottom: 0.8rem;
  font-style: italic;
  font-size: 0.82rem;
  line-height: 1.5;
  color: var(--text-muted);
}
</style>

<!-- Unscoped on purpose (same reason as FactionLayout): a data-theme selector above the
     component root can't be expressed in scoped CSS without the :global() pitfall.
     Weapon-table headers are Wahapedia-style solid faction-color bands with white text.
     In the dark theme the accents are deliberately LIGHT (unreadable under white text),
     so the band uses the faction's dark variant (--fa-light, inherited from
     FactionLayout) — darkened plain accent as the non-faction fallback. -->
<style>
.ds-card { --ds-th-bg: var(--accent); }
@media (prefers-color-scheme: dark) {
  .ds-card { --ds-th-bg: var(--fa-light, color-mix(in srgb, var(--accent) 55%, black)); }
}
:root[data-theme='light'] .ds-card { --ds-th-bg: var(--accent); }
:root[data-theme='dark'] .ds-card { --ds-th-bg: var(--fa-light, color-mix(in srgb, var(--accent) 55%, black)); }
</style>
