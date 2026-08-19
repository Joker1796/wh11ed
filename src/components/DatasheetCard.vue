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
          <span v-if="sheet.profiles.length > 1" class="ds-prof-name">{{ p.name }} <span v-if="p.baseSize" class="ds-base">({{ fmtBase(p.baseSize) }})</span></span>
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
      <!-- Every block below (Abilities, Wargear/Special Abilities, ability sets, named rules,
           Damaged) collapses into an accordion when shown in a modal (`collapsible`) — stats,
           weapons and keywords never do (see the sections above/below). DsAccordion is headless
           (no markup/CSS of its own): the header slot keeps writing the exact same
           `.ds-group-title` element this always had, so none of this block's own styling moved. -->
      <div v-if="sheet.abilities" class="ds-ability-group">
        <DsAccordion :collapsible="collapsible">
          <template #header="{ open, toggle }">
            <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
              <span>{{ labels.dsAbilities }}</span>
              <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <h5 v-else class="ds-group-title">{{ labels.dsAbilities }}</h5>
          </template>
          <div v-for="a in sheet.abilities" :key="a.name" class="ds-ability">
            <strong>{{ a.name }}:</strong> <span v-html="dsRichText(a.text)"></span>
          </div>
        </DsAccordion>
      </div>
      <div v-if="sheet.wargearAbilities" class="ds-ability-group">
        <DsAccordion :collapsible="collapsible">
          <template #header="{ open, toggle }">
            <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
              <span>{{ labels.dsWargearAbilities }}</span>
              <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <h5 v-else class="ds-group-title">{{ labels.dsWargearAbilities }}</h5>
          </template>
          <div v-for="a in sheet.wargearAbilities" :key="a.name" class="ds-ability">
            <strong>{{ a.name }}:</strong> <span v-html="dsRichText(a.text)"></span>
          </div>
        </DsAccordion>
      </div>
      <div v-if="sheet.specialAbilities" class="ds-ability-group">
        <DsAccordion :collapsible="collapsible">
          <template #header="{ open, toggle }">
            <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
              <span>{{ labels.dsSpecialAbilities }}</span>
              <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <h5 v-else class="ds-group-title">{{ labels.dsSpecialAbilities }}</h5>
          </template>
          <div v-for="a in sheet.specialAbilities" :key="a.name" class="ds-ability">
            <strong>{{ a.name }}:</strong> <span v-html="dsRichText(a.text)"></span>
          </div>
        </DsAccordion>
      </div>
      <!-- Selectable ability sets (Primarch/named-character "pick one" groups). The heading is
           the parent ability's name, so its "(see below)" reference resolves to this block. -->
      <div v-for="set in sheet.abilitySets" :key="set.name" class="ds-ability-group">
        <DsAccordion :collapsible="collapsible">
          <template #header="{ open, toggle }">
            <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
              <span>{{ set.name }}</span>
              <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <h5 v-else class="ds-group-title">{{ set.name }}</h5>
          </template>
          <div v-for="a in set.options" :key="a.name" class="ds-ability">
            <strong>{{ a.name }}:</strong> <span v-html="dsRichText(a.text)"></span>
          </div>
        </DsAccordion>
      </div>
      <div v-for="r in sheet.rules" :key="r.name" class="ds-ability-group">
        <DsAccordion :collapsible="collapsible">
          <template #header="{ open, toggle }">
            <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
              <span>{{ r.name }}</span>
              <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <h5 v-else class="ds-group-title">{{ r.name }}</h5>
          </template>
          <div class="ds-ability">
            <span v-html="dsRichText(r.text)"></span>
          </div>
        </DsAccordion>
      </div>
      <div v-if="sheet.damaged" class="ds-damaged">
        <DsAccordion :collapsible="collapsible">
          <template #header="{ open, toggle }">
            <button v-if="collapsible" type="button" class="ds-damaged-title ds-group-btn" :aria-expanded="open" @click="toggle">
              <span>{{ labels.dsDamaged }}: {{ sheet.damaged.note }}</span>
              <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
            </button>
            <strong v-else>{{ labels.dsDamaged }}: {{ sheet.damaged.note }}</strong>
          </template>
          <div v-html="dsRichText(sheet.damaged.text)"></div>
        </DsAccordion>
      </div>
    </div>

    <!-- Transport / Leader -->
    <div v-if="sheet.transport" class="ds-ability-group">
      <DsAccordion :collapsible="collapsible">
        <template #header="{ open, toggle }">
          <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
            <span>{{ labels.dsTransport }}</span>
            <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
          </button>
          <h5 v-else class="ds-group-title">{{ labels.dsTransport }}</h5>
        </template>
        <div class="ds-ability" v-html="dsRichText(sheet.transport)"></div>
      </DsAccordion>
    </div>
    <div v-if="sheet.leader" class="ds-ability-group">
      <DsAccordion :collapsible="collapsible">
        <template #header="{ open, toggle }">
          <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
            <span>{{ leaderGroupLabel }}</span>
            <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
          </button>
          <h5 v-else class="ds-group-title">{{ leaderGroupLabel }}</h5>
        </template>
        <div class="ds-ability">
          <div v-html="dsRichText(sheet.leader.text)"></div>
          <ul class="ds-list">
            <li v-for="u in visibleLeaderUnits" :key="u">
              <RouterLink v-if="unitIndex?.get(u)" :to="`/factions/${factionSlug}/datasheets/${unitIndex.get(u)}`">{{ u }}</RouterLink>
              <template v-else>{{ u }}</template>
            </li>
          </ul>
          <div v-if="sheet.leader.footer" v-html="dsRichText(sheet.leader.footer)"></div>
        </div>
      </DsAccordion>
    </div>

    <!-- Composition / loadout / options.
         Hidden entirely under `hideChoices` (the roster builder): every one of these three
         describes a decision the roster has ALREADY made — how many models, what they start
         equipped with, what may be swapped — and the printed default loadout actively
         contradicts the card above it there, since the weapon tables are filtered to the
         entry's real loadout (see src/components/roster/CLAUDE.md). -->
    <div v-if="!hideChoices && (sheet.composition || sheet.loadout)" class="ds-ability-group">
      <DsAccordion :collapsible="collapsible">
        <template #header="{ open, toggle }">
          <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
            <span>{{ labels.dsComposition }}</span>
            <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
          </button>
          <h5 v-else class="ds-group-title">{{ labels.dsComposition }}</h5>
        </template>
        <div class="ds-ability">
          <ul v-if="sheet.composition" class="ds-list">
            <li v-for="c in sheet.composition" :key="c" v-html="dsText(c)"></li>
          </ul>
          <div v-if="sheet.loadout" class="ds-loadout" v-html="dsText(sheet.loadout)"></div>
        </div>
      </DsAccordion>
    </div>
    <div v-if="!hideChoices && sheet.options" class="ds-ability-group">
      <DsAccordion :collapsible="collapsible">
        <template #header="{ open, toggle }">
          <button v-if="collapsible" type="button" class="ds-group-title ds-group-btn" :aria-expanded="open" @click="toggle">
            <span>{{ labels.dsOptions }}</span>
            <i class="bi ds-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
          </button>
          <h5 v-else class="ds-group-title">{{ labels.dsOptions }}</h5>
        </template>
        <div class="ds-ability">
          <div v-for="(o, i) in sheet.options" :key="i" class="ds-option" v-html="dsText(o)"></div>
        </div>
      </DsAccordion>
    </div>

    <!-- Anything a caller wants to sit inside the card, above its closing Keywords line — the
         roster's "in effect for this unit" rule blocks land here so they read as part of the
         card rather than as something appended after it. Empty for every other caller. -->
    <slot name="before-keywords"></slot>

    <!-- Keywords -->
    <div class="ds-keywords">
      <div>
        <strong>{{ labels.dsKeywords }}:</strong>
        <template v-for="(g, gi) in keywordGroups" :key="gi">
          <template v-if="gi">{{ ' |' }}</template>
          <template v-if="g.model">{{ ' ' + g.model + ' -' }}</template>
          <template v-for="(k, i) in g.list" :key="k">{{ i ? ', ' : ' ' }}<span class="ds-kw" :class="{ 'ds-kw-link': keywordLinksEnabled }" @click="keywordLinksEnabled && $emit('keyword-click', k)">{{ k }}</span></template>
        </template>
        <template v-for="g in extraKeywords" :key="'g:' + g.kw">{{ ', ' }}<span class="ds-kw" :class="{ 'ds-kw-link': keywordLinksEnabled }" @click="keywordLinksEnabled && $emit('keyword-click', g.kw)">{{ g.kw }}</span><sup class="ds-kw-star" aria-hidden="true">*</sup></template>
      </div>
      <div>
        <strong>{{ labels.dsFactionKeywords }}:</strong>
        <template v-for="(k, i) in sheet.factionKeywords" :key="k">{{ i ? ', ' : ' ' }}<span class="ds-kw">{{ k }}</span></template>
      </div>
      <p v-for="n in extraKeywordNotes" :key="n.note" class="ds-kw-footnote">* {{ n.kws.join(', ') }} — {{ n.note }}</p>
    </div>

    <!-- Points: unit sizes × MFM copy tiers (1st-2nd / 3rd+ copy of this datasheet).
         Always the LAST section of the card (mirrors the source books: costs live at the
         bottom of a datasheet, never in its header) — an accent-tinted band like the
         statline zone at the top, so the card is framed by the faction colour. -->
    <div v-if="pointsTable && !collapsible" class="ds-points">
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
import { withGroupPos } from '../utils/weaponGroups.js'
import DsAccordion from './DsAccordion.vue'

const props = defineProps({
  sheet: { type: Object, required: true },
  // Name → id lookup (this faction's datasheets only) and the faction slug, used to turn
  // Leader/Attached-unit bodyguard-unit names into links to their own datasheet page.
  // Optional so DatasheetCard still works if a future caller doesn't wire them up — names
  // just render as plain text then, same as before this feature existed.
  unitIndex: { type: Object, default: null },
  factionSlug: { type: String, default: '' },
  // Modal usage (RosterUnitRulesModal — the roster builder's single "show this unit in a
  // modal" component): every info block except stats/weapons/keywords collapses into an
  // accordion, and Points is hidden outright (the unit's tile in the roster editor already
  // shows its points). The standalone datasheet page never sets this — full page, nothing to
  // save space on, so everything renders exactly as it always has.
  collapsible: { type: Boolean, default: false },
  // Keywords this unit GAINS from an army/detachment rule rather than having printed on its
  // sheet (e.g. Deathwing/Ravenwing via Dark Angels' The Unforgiven, or Battleline granted by a
  // detachment) — computed by the caller from the active army choice and merged into the keyword
  // line here, each flagged with a `*` and a footnote naming its source (see extraKeywordNotes
  // below) so it still reads as printed-card-accurate at a glance but a curious reader can tell
  // it's a rule grant, not ink on the card. Optional, so callers without a faction/detachment
  // context just render the printed keywords as before.
  // Shape: [{ kw: 'Shadow Legion', detName: 'Shadow Legion' | null, extra?: boolean }] — `detName`
  // is the active detachment's display name when the grant is gated on one, or null for a
  // roster-wide/Chapter grant that applies regardless of detachment. `extra: true` means the
  // grant ALSO depends on something beyond the detachment/faction context (currently always a
  // Warlord requirement) that isn't itself modelled — the footnote adds a caveat instead of
  // implying that context is the whole story.
  grantedKeywords: { type: Array, default: () => [] },
  // Leader/Attached-unit bodyguard-unit names to hide from `sheet.leader.units` entirely,
  // rather than render as a dead (unlinked) name — used for a name that resolves to a REAL
  // datasheet, just on a different faction's page (e.g. Dark Angels' shared "Ancient in
  // Terminator Armour" can attach to Deathwatch's own "Deathwatch Terminator Squad" via that
  // squad's own ATTACHED UNIT rule, but navigation is always within one faction's context, and
  // that target was never a valid attachment while THIS faction's army is what you're building —
  // see the raw ability text for the full, faction-agnostic list). A name with no datasheet
  // anywhere (a stale/Legends reference in the source rule text) is left as plain text, not
  // hidden — there's nothing to disambiguate there, it's just not a link target.
  otherFactionUnits: { type: Array, default: () => [] },
  // Hide the build-choice blocks (Unit Composition, the default-loadout sentence, Wargear
  // Options). For a datasheet being READ those are the sheet; for a unit already in a roster they
  // are settled questions, and the loadout sentence disagrees with the weapon tables once those
  // are trimmed to what the entry actually fields. Off everywhere except the roster's unit modal.
  hideChoices: { type: Boolean, default: false },
  // Whether printed/granted keywords open the "units with this keyword" modal. Off by default
  // for callers with no per-unit route to link to (Combat Patrol's fixed roster renders every
  // unit inline on one page, not as separate routed datasheets) — keywords there just stay
  // plain, non-interactive text instead of looking clickable and doing nothing.
  keywordLinksEnabled: { type: Boolean, default: false },
})
// Printed/granted keyword clicked (e.g. "Infantry") — the caller owns finding which other
// units share it and opening a modal; DatasheetCard has no access to the rest of the
// faction's roster. Faction keywords (ORKS, ADEPTUS ASTARTES…) deliberately stay plain text:
// virtually every unit on the page shares those, so a "units with this keyword" list would
// just be the whole roster.
defineEmits(['keyword-click'])

const { locale } = useLocale()
const { renderInline, renderRichText } = useRenderInline()
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

// See the otherFactionUnits prop doc above — drop those names entirely rather than list a
// bodyguard target the current faction's army could never actually take.
const visibleLeaderUnits = computed(() => {
  const hidden = new Set(props.otherFactionUnits)
  return (props.sheet.leader?.units || []).filter((u) => !hidden.has(u))
})

// Per-model keyword split (e.g. The Silent King: keywords shared by every model in the
// unit vs ones that only apply to a specific named model) — sheet.keywordsByModel is
// [{ model, list }]; falls back to a single unlabelled group for the common flat-array case.
const keywordGroups = computed(() =>
  props.sheet.keywordsByModel ? props.sheet.keywordsByModel : [{ model: null, list: props.sheet.keywords || [] }],
)

// Rule-granted keywords (grantedKeywords prop) appended after the printed ones, minus any the
// sheet already prints in any model group — so a grant never doubles a printed keyword.
const extraKeywords = computed(() => {
  const printed = new Set(keywordGroups.value.flatMap((g) => g.list))
  return props.grantedKeywords.filter((g) => !printed.has(g.kw))
})

// One footnote line per distinct source (usually just one — either "this faction's own rules"
// for every roster-wide grant, or the single currently-active detachment for every gated one —
// but a unit could carry both kinds at once), grouping every keyword that shares it so e.g.
// Deathwing/Ravenwing (both roster-wide, no detachment) collapse into a single line instead of
// repeating the same source sentence twice.
const extraKeywordNotes = computed(() => {
  const groups = new Map()
  for (const g of extraKeywords.value) {
    let note = g.detName
      ? labels.value.dsKeywordGrantedByDetachment.replace('{det}', g.detName)
      : labels.value.dsKeywordGrantedByFaction
    // A grant can depend on more than just the detachment/faction context shown above (currently
    // always a Warlord requirement — see gen-conditional-keywords.mjs's header comment) — say so
    // rather than implying that context alone is the whole condition. Folded into the same
    // string (not a separate flag on the group) so an `extra` grant never silently merges with a
    // plain one that happens to share the same base sentence.
    if (g.extra) note += ' ' + labels.value.dsKeywordExtraCondition
    const kws = groups.get(note) || []
    kws.push(g.kw)
    groups.set(note, kws)
  }
  return [...groups.entries()].map(([note, kws]) => ({ note, kws }))
})

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

function markFactionKw(text) {
  const re = factionKwRegex.value
  return re ? text.replace(re, (m, kw) => (kw ? `**${kw}**` : m)) : text
}

function dsText(text) {
  return renderInline(markFactionKw(text))
}

// Ability/rule bodies are transcribed with the same `▪ ` bullet-list convention as the core
// rules body markup (see wh11ed/CLAUDE.md's body-markup table) but never went through RuleBody's
// block parser — dsText() alone just inlined the literal "▪" characters and the `\n`s collapsed
// under normal white-space, running every item onto one line. renderRichText renders real
// <ul>/<ol> like RuleBody; markFactionKw bolds this sheet's faction keywords first, and the
// generated lists reuse the sheet's existing `.ds-list` styling.
function dsRichText(text) {
  return renderRichText(text, { pre: markFactionKw, listClass: 'ds-list' })
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
/* Ranged immediately followed by melee: tighten the gap between the two tables — the 0.7rem
   above is for what comes after the LAST weapons table (abilities/keywords/points), which still
   wants the fuller gap. */
.ds-weapons:has(+ .ds-weapons) { margin-bottom: 0.05rem; }
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
/* Weapon ability badges ([DEVASTATING WOUNDS]…) — the shared .keyword class (style.css)
   sizes itself in `em`, so nested in .wtag's already-small 0.72rem it rendered near-illegible
   (~9px) and the letters ran together. Pin it to a fixed, readable size instead of letting it
   compound with the ancestor font-size. */
.wtag :deep(.keyword) {
  font-size: 0.74rem;
  letter-spacing: 0.2px;
}

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
  /* One uniform body font for every cell — name and stats alike — bumped up from the old
     0.68rem. The extra room for the stats comes from the narrower .wname floor below (the
     name wraps), NOT from a bigger font on the stat columns only, which read as ragged
     mismatched sizes within one table. */
  .ds-weapons table {
    font-size: 0.82rem;
  }
  .ds-points table {
    font-size: 0.72rem;
  }
  /* Wider horizontal cell padding than the ≤480 default so the stat columns claim a bit
     more of the table's width (auto layout: a column's used width includes its padding,
     so more padding = wider stat columns, drawn from the slack the wrapping name column
     would otherwise absorb). */
  .ds-weapons th,
  .ds-weapons td {
    padding: 0.2rem 0.28rem;
  }
  /* The table bleeds edge-to-edge, so the first/last columns' content would otherwise sit
     flush against the screen edge — inset just those two so the text clears the edge while
     the header band still spans full width. */
  .ds-weapons th:first-child,
  .ds-weapons td:first-child {
    padding-left: 0.5rem;
  }
  .ds-weapons th:last-child,
  .ds-weapons td:last-child {
    padding-right: 0.5rem;
  }
  /* Header labels stay a single small uppercase size across all columns. */
  .ds-weapons th {
    font-size: 0.56rem;
  }
  .ds-weapons .wname {
    min-width: 4rem;
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
/* Core-ability badges (Deep Strike, Leader…) — same fixed-size fix as .wtag's .keyword
   above, so they read clearly instead of the shared class's default em-scaled size. */
.ds-ability-line .keyword {
  font-size: 0.76rem;
  letter-spacing: 0.2px;
}
.ds-ability { margin-bottom: 0.45rem; }
.ds-group-title {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
  margin: 0.7rem 0 0.3rem;
}
/* Accordion header variant (collapsible/modal mode only) — same `.ds-group-title` look, reset to
   a full-width clickable row with the chevron at the end. Non-collapsible callers never render
   this class (see the h5 fallback in the template), so the plain page is untouched. */
.ds-group-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;
  text-align: left;
}
.ds-chev { font-size: 0.7rem; flex-shrink: 0; }
/* Damaged's own header isn't a `.ds-group-title` (no uppercase/accent styling — it's the same
   bold inline label the box always had); the accordion button variant just adds the chevron row
   layout on top of that, using the surrounding red instead of the accent colour. */
.ds-damaged-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  border: none;
  background: none;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  color: inherit;
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

/* Printed/granted unit keywords open a "units with this keyword" modal — signal it the same
   quiet way .def-link does (dotted underline, no pill/background) rather than a stronger
   treatment that would fight the plain-printed-card look of the rest of the Keywords line. */
.ds-kw-link {
  cursor: pointer;
  text-decoration: underline dotted;
  text-underline-offset: 2px;
}

.ds-kw-link:hover {
  color: var(--link-accent-hover);
}

.ds-kw-star {
  color: var(--accent);
  margin-left: 1px;
}

.ds-kw-footnote {
  margin: 0.2rem 0 0;
  font-size: 0.72rem;
  font-style: italic;
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
