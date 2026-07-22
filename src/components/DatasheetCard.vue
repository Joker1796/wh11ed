<template>
  <article class="ds-card">
    <!-- Stat profiles -->
    <!-- The whole statline zone is part of the datasheet header: it bleeds over the card
         padding and carries an accent-tinted background, reading as one band with the
         solid faction-color name plate (.ds-head) that the parent view renders above. -->
    <!-- Grid: row 1 = the six stat columns + (multi-profile) model name to the right;
         row 2 = the invulnerable box straight under SV, with the faction-color band
         top-aligned to its right and the asterisk note under the band. -->
    <div v-if="sheet.profiles?.length" class="ds-cardhead">
      <div v-for="(p, i) in sheet.profiles" :key="i" class="ds-statline">
        <div class="ds-stats" :class="{ 'has-name': sheet.profiles.length > 1 }">
          <!-- Stat labels only once, above the first profile's row -->
          <div v-for="s in statCells(p)" :key="s.label" class="ds-stat">
            <span v-if="i === 0" class="ds-stat-label">{{ s.label }}</span>
            <span class="ds-stat-box">{{ s.value }}</span>
          </div>
          <span v-if="sheet.profiles.length > 1" class="ds-prof-name">{{ p.name }}<span v-if="p.baseSize" class="ds-base"> ({{ fmtBase(p.baseSize) }})</span></span>
          <template v-if="p.inv">
            <div class="ds-stat ds-inv-box">
              <span class="ds-stat-box">{{ p.inv }}{{ p.invNote ? '*' : '' }}</span>
            </div>
            <div class="ds-inv-side">
              <span class="ds-inv-band">Invulnerable Save</span>
              <span v-if="p.invNote" class="ds-inv-note">{{ invNoteText(p.invNote) }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Weapons -->
    <div v-if="sheet.ranged" class="ds-weapons">
      <table>
        <thead>
          <tr><th class="wname">{{ labels.dsRanged }}</th><th>Range</th><th>A</th><th>BS</th><th>S</th><th>AP</th><th>D</th></tr>
        </thead>
        <tbody>
          <tr v-for="(w, i) in rangedRows" :key="i" :class="'wg-' + w.gpos">
            <td class="wname"><span v-if="w.gpos !== 'single'" class="wprofile-arrow" aria-hidden="true"></span>{{ w.name }} <span v-for="t in w.tags" :key="t" class="wtag" v-html="renderInline('[' + t + ']')"></span></td>
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
          <tr v-for="(w, i) in meleeRows" :key="i" :class="'wg-' + w.gpos">
            <td class="wname"><span v-if="w.gpos !== 'single'" class="wprofile-arrow" aria-hidden="true"></span>{{ w.name }} <span v-for="t in w.tags" :key="t" class="wtag" v-html="renderInline('[' + t + ']')"></span></td>
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
      <template v-if="sheet.abilities">
        <div class="ds-ability-group">
          <h5 class="ds-group-title">{{ labels.dsAbilities }}</h5>
          <div v-for="a in sheet.abilities" :key="a.name" class="ds-ability">
            <strong>{{ a.name }}:</strong> <span v-html="dsText(a.text)"></span>
          </div>
        </div>
      </template>
      <template v-if="sheet.wargearAbilities">
        <div class="ds-ability-group">
          <h5 class="ds-group-title">{{ labels.dsWargearAbilities }}</h5>
          <div v-for="a in sheet.wargearAbilities" :key="a.name" class="ds-ability">
            <strong>{{ a.name }}:</strong> <span v-html="dsText(a.text)"></span>
          </div>
        </div>
      </template>
      <template v-if="sheet.specialAbilities">
        <div class="ds-ability-group">
          <h5 class="ds-group-title">{{ labels.dsSpecialAbilities }}</h5>
          <div v-for="a in sheet.specialAbilities" :key="a.name" class="ds-ability">
            <strong>{{ a.name }}:</strong> <span v-html="dsText(a.text)"></span>
          </div>
        </div>
      </template>
      <!-- Selectable ability sets (Primarch/named-character "pick one" groups). The heading is
           the parent ability's name, so its "(see below)" reference resolves to this block. -->
      <template v-if="sheet.abilitySets">
        <div v-for="set in sheet.abilitySets" :key="set.name" class="ds-ability-group">
          <h5 class="ds-group-title">{{ set.name }}</h5>
          <div v-for="a in set.options" :key="a.name" class="ds-ability">
            <strong>{{ a.name }}:</strong> <span v-html="dsText(a.text)"></span>
          </div>
        </div>
      </template>
      <template v-if="sheet.rules">
        <div v-for="r in sheet.rules" :key="r.name" class="ds-ability-group">
          <h5 class="ds-group-title">{{ r.name }}</h5>
          <div class="ds-ability">
            <span v-html="dsText(r.text)"></span>
          </div>
        </div>
      </template>
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
    <div v-if="sheet.leader" class="ds-ability-group">
      <h5 class="ds-group-title">{{ leaderGroupLabel }}</h5>
      <div class="ds-ability">
        <div v-html="dsText(sheet.leader.text)"></div>
        <ul class="ds-list">
          <li v-for="u in sheet.leader.units" :key="u">
            <RouterLink v-if="unitIndex?.get(u)" :to="`/factions/${factionSlug}/datasheets/${unitIndex.get(u)}`">{{ u }}</RouterLink>
            <template v-else>{{ u }}</template>
          </li>
        </ul>
        <div v-if="sheet.leader.footer" v-html="dsText(sheet.leader.footer)"></div>
      </div>
    </div>

    <!-- Composition / loadout / options -->
    <div v-if="sheet.composition || sheet.loadout" class="ds-ability-group">
      <h5 class="ds-group-title">{{ labels.dsComposition }}</h5>
      <div class="ds-ability">
        <ul v-if="sheet.composition" class="ds-list">
          <li v-for="c in sheet.composition" :key="c" v-html="dsText(c)"></li>
        </ul>
        <div v-if="sheet.loadout" class="ds-loadout" v-html="dsText(sheet.loadout)"></div>
      </div>
    </div>
    <div v-if="sheet.options" class="ds-ability-group">
      <h5 class="ds-group-title">{{ labels.dsOptions }}</h5>
      <div class="ds-ability">
        <div v-for="(o, i) in sheet.options" :key="i" class="ds-option" v-html="dsText(o)"></div>
      </div>
    </div>

    <!-- Keywords -->
    <div class="ds-keywords">
      <div>
        <strong>{{ labels.dsKeywords }}:</strong>
        <template v-for="(g, gi) in keywordGroups" :key="gi">
          <template v-if="gi">{{ ' |' }}</template>
          <template v-if="g.model">{{ ' ' + g.model + ' -' }}</template>
          <template v-for="(k, i) in g.list" :key="k">{{ i ? ', ' : ' ' }}<span class="ds-kw">{{ k }}</span></template>
        </template>
      </div>
      <div>
        <strong>{{ labels.dsFactionKeywords }}:</strong>
        <template v-for="(k, i) in sheet.factionKeywords" :key="k">{{ i ? ', ' : ' ' }}<span class="ds-kw">{{ k }}</span></template>
      </div>
    </div>

    <!-- Points: unit sizes × MFM copy tiers (1st-2nd / 3rd+ copy of this datasheet).
         Always the LAST section of the card (mirrors the source books: costs live at the
         bottom of a datasheet, never in its header) — an accent-tinted band like the
         statline zone at the top, so the card is framed by the faction colour. -->
    <div v-if="pointsTable" class="ds-points">
      <h5 class="ds-points-title">{{ labels.dsPoints }}</h5>
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
import { formatBaseSize } from '../utils/baseSize.js'

const props = defineProps({
  sheet: { type: Object, required: true },
  // Name → id lookup (this faction's datasheets only) and the faction slug, used to turn
  // Leader/Attached-unit bodyguard-unit names into links to their own datasheet page.
  // Optional so DatasheetCard still works if a future caller doesn't wire them up — names
  // just render as plain text then, same as before this feature existed.
  unitIndex: { type: Object, default: null },
  factionSlug: { type: String, default: '' },
})

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const labels = computed(() => ui[locale.value])
const fmtBase = (raw) => formatBaseSize(raw, labels.value)

const coreParts = computed(() => (props.sheet.core ? props.sheet.core.split(/,\s*/) : []))

// The "Leader" ability-group heading above the bodyguard-unit list: a handful of
// characters carry the "Support" core ability instead of "Leader" (a Faction-Pack
// errata override — e.g. Necrons' six Cryptek Leaders, see datasheets/necrons.js's
// header comment) but populate the exact same sheet.leader field, so the heading must
// follow whichever core ability this specific sheet actually has.
const leaderGroupLabel = computed(() =>
  /\bSupport\b/.test(props.sheet.core || '') ? labels.value.dsSupport : labels.value.dsLeader,
)

// Per-model keyword split (e.g. The Silent King: keywords shared by every model in the
// unit vs ones that only apply to a specific named model) — sheet.keywordsByModel is
// [{ model, list }]; falls back to a single unlabelled group for the common flat-array case.
const keywordGroups = computed(() =>
  props.sheet.keywordsByModel ? props.sheet.keywordsByModel : [{ model: null, list: props.sheet.keywords || [] }],
)

// Multi-profile weapons are stored as adjacent rows sharing a base name with a spaced-dash
// suffix ("Scythe of the Nightbringer – strike" / "– sweep"). The data is inconsistent about
// the dash — some entries use an en-dash "–", others a plain hyphen "-" (e.g. Ghazghkull's
// "Gork's Klaw - strike") — so split on a SPACED dash of any kind (hyphen / en / em). The
// surrounding spaces keep AP values like "-3" (a separate field anyway) from ever matching.
function weaponBase(name) { return (name || '').split(/ [-–—] /)[0].trim() }
function withGroupPos(list) {
  const rows = list || []
  return rows.map((w, i) => {
    const base = weaponBase(w.name)
    const prevSame = i > 0 && weaponBase(rows[i - 1].name) === base
    const nextSame = i < rows.length - 1 && weaponBase(rows[i + 1].name) === base
    let gpos = 'single'
    if (prevSame && nextSame) gpos = 'mid'
    else if (nextSame) gpos = 'start'
    else if (prevSame) gpos = 'end'
    return { ...w, gpos }
  })
}
const rangedRows = computed(() => withGroupPos(props.sheet.ranged))
const meleeRows = computed(() => withGroupPos(props.sheet.melee))

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
  // Even a single flat cost renders (the card is the only place showing prices now —
  // the header plate deliberately carries none, matching the source datasheets).
  if (!pts?.length) return null
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

/* Header zone of the card: bleeds over the card padding so the accent-tinted band runs
   edge-to-edge under the solid name plate above; a border separates it from the body.
   Stat boxes get a plain card-colored fill so they pop on the tinted background. */
.ds-cardhead {
  margin: -0.9rem -1rem 0.8rem;
  padding: 0.75rem 1rem 0.7rem;
  background: color-mix(in srgb, var(--ds-th-bg, var(--accent)) 10%, var(--bg-card));
  border-bottom: 1px solid var(--border);
}
.ds-cardhead .ds-stat-box::before { background: var(--bg-card); }
.ds-cardhead .ds-statline:last-child { margin-bottom: 0; }

/* Stat line (consecutive profile rows sit tight — labels render only on the first) */
.ds-statline { margin-bottom: 0.7rem; }
.ds-statline:has(+ .ds-statline) { margin-bottom: 0.35rem; }
.ds-stats {
  display: grid;
  grid-template-columns: repeat(6, max-content) minmax(0, 1fr);
  gap: 0.35rem;
  align-items: start;
}
.ds-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.ds-stat-label {
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text-muted);
}
/* Stat boxes: 10th-ed look — no rounding, top-left + bottom-right corners chamfered.
   clip-path can't carry a border, so the fill is an inset ::before over a border-colour
   base (isolation keeps the z-index:-1 fill inside this box). Numbers are big + heavy. */
.ds-stat-box {
  position: relative;
  isolation: isolate;
  display: block;
  min-width: 3.1rem;
  text-align: center;
  background: var(--border);
  clip-path: polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px);
  padding: 0.28rem 0.3rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.65rem;
  line-height: 1.1;
  color: var(--text-primary);
}
.ds-stat-box::before {
  content: '';
  position: absolute;
  inset: 1px;
  z-index: -1;
  background: color-mix(in srgb, var(--accent) 8%, var(--bg-card));
  clip-path: polygon(7px 0, 100% 0, 100% calc(100% - 7px), calc(100% - 7px) 100%, 0 100%, 0 7px);
}
/* Multi-profile model name: right of the stat row, vertically centred on it. */
.ds-prof-name {
  grid-column: 7;
  grid-row: 1;
  align-self: center;
  justify-self: start;
  padding-left: 0.4rem;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 1.25;
  color: var(--text-muted);
}
/* Base size (⌀32mm / 75×42mm …) after the model name — secondary: same muted colour as
   the name but lighter weight, so it never stands out more than the model name itself. */
.ds-prof-name .ds-base {
  font-weight: 400;
  text-transform: none;
  letter-spacing: 0;
  color: var(--text-muted);
  white-space: nowrap;
}
/* Invulnerable save: shield straight under SV (column 3), label + note to its right.
   Source style — the value sits in a downward-pointing shield (flat top, pointed bottom)
   and the label is plain uppercase text, not a coloured pill. */
.ds-inv-box { grid-column: 3; grid-row: 2; }
.ds-inv-box .ds-stat-box,
.ds-inv-box .ds-stat-box::before {
  clip-path: polygon(0 0, 100% 0, 100% 52%, 50% 100%, 0 52%);
}
.ds-inv-box .ds-stat-box { padding-bottom: 0.85rem; }
.ds-inv-side {
  grid-column: 4 / -1;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 3px;
  min-width: 0;
}
.ds-inv-band {
  color: var(--accent);
  font-size: 0.66rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  white-space: nowrap;
}
.ds-inv-note { font-size: 0.72rem; font-style: italic; line-height: 1.35; color: var(--text-muted); }

@media (max-width: 480px) {
  .ds-stat-box {
    min-width: 2.7rem;
    font-size: 1.4rem;
    padding: 0.24rem;
    clip-path: polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px);
  }
  .ds-stat-box::before {
    clip-path: polygon(5px 0, 100% 0, 100% calc(100% - 5px), calc(100% - 5px) 100%, 0 100%, 0 5px);
  }
  .ds-inv-box .ds-stat-box,
  .ds-inv-box .ds-stat-box::before {
    clip-path: polygon(0 0, 100% 0, 100% 52%, 50% 100%, 0 52%);
  }
}

/* Mobile: multi-profile model names move above their stat row (right of it on desktop) */
@media (max-width: 640px) {
  .ds-stats.has-name .ds-prof-name {
    grid-column: 1 / -1;
    grid-row: 1;
    align-self: end;
    padding-left: 0;
  }
  .ds-stats.has-name .ds-stat { grid-row: 2; }
  .ds-stats.has-name .ds-inv-box { grid-row: 3; }
  .ds-stats.has-name .ds-inv-side { grid-row: 3; }
}

/* Points — closing faction-colour band: bleeds over the card padding (mirroring
   .ds-cardhead at the top) with the same accent-tinted fill, so the header and the
   costs frame the card in the faction colour. */
.ds-points {
  overflow-x: auto;
  margin: 0.8rem -1rem -1rem;
  padding: 0.55rem 1rem 0.75rem;
  background: color-mix(in srgb, var(--ds-th-bg, var(--accent)) 10%, var(--bg-card));
  border-top: 1px solid var(--border);
  border-radius: 0 0 5px 5px;
}
.ds-points-title {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  margin: 0 0 0.25rem;
}
.ds-points table { border-collapse: collapse; font-size: 0.8rem; }
.ds-points th {
  text-align: center;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  /* Override the global dark `th` fill — the points band already carries its own
     accent-tinted background, so the header must stay transparent (was dark in light theme). */
  background: none;
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

/* Multi-profile weapons (Wahapedia-style): each profile row carries an accent arrow-pennant
   before the name, and all rows of one weapon share a faint faction-accent background so the
   profiles read as one weapon. Single-profile weapons are untouched. */
.ds-weapons tr.wg-start td,
.ds-weapons tr.wg-mid td,
.ds-weapons tr.wg-end td {
  background: color-mix(in srgb, var(--accent) 8%, transparent);
}
.wprofile-arrow {
  display: inline-block;
  width: 13px;
  height: 9px;
  margin-right: 0.4rem;
  background: var(--accent);
  clip-path: polygon(0 0, 65% 0, 100% 50%, 65% 100%, 0 100%);
  vertical-align: middle;
}

/* Very narrow phones (≤480px): placed after the base .ds-card/.ds-cardhead/.ds-points/
   .ds-weapons rules above so it wins the cascade at equal specificity (a same-specificity
   override defined earlier in the file, e.g. inside the .ds-stat-box media block, loses to
   these later unconditional rules regardless of the media query matching). The card bleeds
   past .main-content's own gutter to the true viewport edge (same 100vw trick as
   FactionPickerBar's .fpb) and loses its rounding — a full-bleed native-feeling section
   flush under the header, not a floating card with two stacked gutters. Its own small
   0.4rem padding is what's left to keep content off the screen edge; the header/points
   bands re-bleed to the CARD's edge (their negative margins key off that 0.4rem), and
   tighten the weapon/points tables, which otherwise have no responsive treatment at all:
   .wname's 10rem floor plus nowrap on every other cell forces horizontal scroll well
   before this. */
@media (max-width: 480px) {
  .ds-card {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    padding: 0.9rem 0.4rem 0.6rem;
    border-radius: 0;
  }
  .ds-cardhead { margin: -0.9rem -0.4rem 0.8rem; padding: 0.75rem 0.4rem 0.7rem; }
  .ds-points { margin: 0.8rem -0.4rem -0.6rem; padding: 0.55rem 0.4rem 0.75rem; }

  /* Bleed the weapon table to the card's edges too, same as .ds-cardhead/.ds-points above —
     the gutter comes from the cells' own padding, not from staying inset. */
  .ds-weapons {
    margin-left: -0.4rem;
    margin-right: -0.4rem;
  }
  .ds-weapons th:first-child,
  .ds-weapons th:last-child {
    border-radius: 0;
  }
  .ds-weapons table,
  .ds-points table {
    font-size: 0.72rem;
  }
  .ds-weapons th,
  .ds-weapons td {
    padding: 0.2rem 0.12rem;
  }
  .ds-weapons th {
    font-size: 0.56rem;
  }
  .ds-weapons .wname {
    min-width: 4rem;
  }
  /* Stat columns (everything but the name): a bigger, easier-to-read font now that
     shrinking .wname's floor above freed up width for them. */
  .ds-weapons th:not(.wname),
  .ds-weapons td:not(.wname) {
    font-size: 0.85rem;
    padding: 0.2rem 0.18rem;
  }
  .ds-points th,
  .ds-points td {
    padding: 0.2rem 0.3rem;
  }
}

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
/* Plain and special abilities each sit in a faction-accent-tinted card with a solid-fill
   header bar (same idiom as the weapon table headers), so the two categories read as
   distinct groups rather than one undifferentiated list. */
.ds-ability-group {
  margin: 0.6rem 0;
  border-radius: 4px;
  overflow: hidden;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-primary);
}
.ds-ability-group > .ds-group-title {
  margin: 0;
  padding: 0.3rem 0.7rem;
  background: var(--ds-th-bg, var(--accent));
  color: #fff;
}
.ds-ability-group .ds-ability { margin: 0.45rem 0.7rem; }
.ds-ability-group .ds-ability:first-of-type { margin-top: 0.5rem; }
.ds-ability-group .ds-ability:last-child { margin-bottom: 0.5rem; }
.ds-damaged {
  margin-top: 0.6rem;
  padding: 0.5rem 0.7rem;
  border-left: 3px solid #c0392b;
  background: color-mix(in srgb, #c0392b 8%, transparent);
  border-radius: 0 4px 4px 0;
  font-size: 0.82rem;
}

/* Very narrow phones: bleed ability groups to the card's edges too (placed after the
   base .ds-ability-group rule above so it wins the cascade — see the .ds-weapons media
   block earlier for why source order matters here). Square corners since it's flush
   against the card border now, not floating mid-card. */
@media (max-width: 480px) {
  .ds-ability-group {
    margin-left: -0.4rem;
    margin-right: -0.4rem;
    border-radius: 0;
  }
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

</style>

<!-- Unscoped on purpose (same reason as FactionLayout): a data-theme selector above the
     component root can't be expressed in scoped CSS without the :global() pitfall.
     Weapon-table headers are Wahapedia-style solid faction-color bands with white text.
     In the dark theme the accents are deliberately LIGHT (unreadable under white text),
     so the band uses the faction's dark variant (--fa-light, inherited from
     FactionLayout) — darkened plain accent as the non-faction fallback. -->
<style>
/* --bg-row-hover is a hardcoded brand-red rgba on :root and does NOT follow the faction
   --accent, so table row-hover on datasheets flashed the global red. Re-point it at the
   faction accent for every table inside the card. (The zebra --bg-row-alt is a neutral
   olive, not red, so it's left alone.) */
.ds-card {
  --ds-th-bg: var(--accent);
  --bg-row-hover: color-mix(in srgb, var(--accent) 14%, transparent);
}
@media (prefers-color-scheme: dark) {
  .ds-card { --ds-th-bg: var(--fa-light, color-mix(in srgb, var(--accent) 55%, black)); }
}
:root[data-theme='light'] .ds-card { --ds-th-bg: var(--accent); }
:root[data-theme='dark'] .ds-card { --ds-th-bg: var(--fa-light, color-mix(in srgb, var(--accent) 55%, black)); }
</style>
