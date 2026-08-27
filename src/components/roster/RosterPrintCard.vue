<!-- A unit's datasheet AS PAPER WANTS IT. Not a restyled DatasheetCard — a second typography of
     the same sheet: the resolved sheet object, the granted keywords, the marks and the notes are
     the same ones the screen card is handed (useRosterUnitCard, datasheetParts.js), so the two
     can never disagree about what a unit does — only about how much room saying it takes.

     What paper changes, and why:
       · the card carries its own NAME PLATE — on screen the page or the modal header names the
         unit, on a sheet of A4 there is nothing above the card to do it, and this line is also
         where the copy's facts go (Warlord, enhancement, attached-to, points), so they stop
         costing a line of their own;
       · the statline is a LINE — "M 6" T 4 SV 3+ …" — not a band of boxes; the boxes are touch
         targets and glance anchors, and paper is read at reading distance;
       · the abilities are set in TWO COLUMNS — full-width A4 is a 120-character line, and the
         abilities are where the card's height lives; a group's heading is glued to its first
         entry so a column never ends on a title;
       · no fills, no washes, no accent bands: separation is done with rules and weight, because
         a printer pays for every tinted band in toner, on every card.

     Interactivity is not stripped — it was never added: no popovers, no accordions, no links. -->
<template>
  <article class="rpc">
    <header class="rpc-head">
      <h3 class="rpc-name">{{ sheet.name }}</h3>
      <span v-for="(t, i) in tags" :key="i" class="rpc-tag">{{ t }}</span>
    </header>

    <!-- Statlines: one line per profile, the profile's name first when there are several. -->
    <div v-if="sheet.profiles?.length" class="rpc-stats">
      <div v-for="(p, i) in sheet.profiles" :key="i" class="rpc-statline">
        <span v-if="sheet.profiles.length > 1" class="rpc-prof">{{ p.name }}</span>
        <span v-for="s in statCells(p)" :key="s.key" class="rpc-stat">
          <span class="rpc-stat-l">{{ s.label }}</span>
          <span class="rpc-stat-v" :class="{ mod: isMarked('profile', s.key, i) }">{{ s.value }}<sup v-if="isMarked('profile', s.key, i)">*</sup></span>
        </span>
        <span v-if="p.inv" class="rpc-stat">
          <span class="rpc-stat-l">INV</span>
          <span class="rpc-stat-v" :class="{ mod: isMarked('profile', 'inv', i) }">{{ p.inv }}{{ p.invNote ? '*' : '' }}<sup v-if="isMarked('profile', 'inv', i)">*</sup></span>
        </span>
      </div>
      <p v-for="n in invNotes" :key="n" class="rpc-invnote">{{ n }}</p>
    </div>

    <!-- Weapons: the same seven columns the screen card prints, at table size. Multi-profile
         weapons keep the shared-name grouping (wg-*), drawn as an indent instead of a tint. -->
    <table v-if="rangedRows.length" class="rpc-weapons">
      <thead>
        <tr><th class="wn">{{ labels.dsRanged }}</th><th>Range</th><th>A</th><th>BS</th><th>S</th><th>AP</th><th>D</th></tr>
      </thead>
      <tbody>
        <tr v-for="(w, i) in rangedRows" :key="i" :class="'wg-' + w.gpos">
          <td class="wn"><span v-if="w.gpos === 'mid' || w.gpos === 'end'" class="rpc-warrow" aria-hidden="true">↳ </span>{{ w.name }}<span v-if="w.qty > 1" class="rpc-wqty"> ×{{ w.qty }}</span><span v-if="w.tags?.length" class="rpc-wtags"> [{{ w.tags.join(', ') }}]</span></td>
          <td>{{ w.range }}</td>
          <td v-for="c in WCOLS.ranged" :key="c" :class="{ mod: isMarked('ranged', c, i) }">{{ w[c] }}<sup v-if="isMarked('ranged', c, i)">*</sup></td>
        </tr>
      </tbody>
    </table>
    <table v-if="meleeRows.length" class="rpc-weapons">
      <thead>
        <tr><th class="wn">{{ labels.dsMelee }}</th><th>Range</th><th>A</th><th>WS</th><th>S</th><th>AP</th><th>D</th></tr>
      </thead>
      <tbody>
        <tr v-for="(w, i) in meleeRows" :key="i" :class="'wg-' + w.gpos">
          <td class="wn"><span v-if="w.gpos === 'mid' || w.gpos === 'end'" class="rpc-warrow" aria-hidden="true">↳ </span>{{ w.name }}<span v-if="w.qty > 1" class="rpc-wqty"> ×{{ w.qty }}</span><span v-if="w.tags?.length" class="rpc-wtags"> [{{ w.tags.join(', ') }}]</span></td>
          <td>Melee</td>
          <td v-for="c in WCOLS.melee" :key="c" :class="{ mod: isMarked('melee', c, i) }">{{ w[c] }}<sup v-if="isMarked('melee', c, i)">*</sup></td>
        </tr>
      </tbody>
    </table>

    <!-- Every `*` above, explained: what the roster's rules did to the numbers ("in play") and —
         if asked for — what they would do once their conditions are met. Same grouping by source
         as the screen card; the condition rides in parentheses instead of behind an icon. -->
    <div v-for="sec in noteSections" :key="sec.key" class="rpc-mods">
      <p class="rpc-mods-h">{{ sec.label }}<em v-if="sec.hint"> — {{ sec.hint }}</em></p>
      <ul class="rpc-mods-list">
        <template v-for="g in sec.groups" :key="g.key">
          <li class="rpc-mod-src">{{ g.label }}</li>
          <li v-for="(n, i) in g.notes" :key="i" class="rpc-mod">
            {{ modDelta(n) }} — {{ n.source }}<span v-if="n.when" class="rpc-mod-when"> ({{ n.when[locale] || n.when.en }})</span>
          </li>
        </template>
      </ul>
    </div>

    <p v-if="coreParts.length || extraCore.length" class="rpc-line">
      <strong>{{ labels.dsCore }}:</strong>
      {{ coreParts.join(', ') }}<template v-if="extraCore.length"><template v-if="coreParts.length">, </template><template v-for="(c, i) in extraCore" :key="c.ability"><template v-if="i">, </template>{{ c.ability }}*</template></template>
    </p>
    <p v-if="sheet.faction" class="rpc-line"><strong>{{ labels.dsFaction }}:</strong> {{ sheet.faction }}</p>

    <!-- Abilities, two columns. One flat stream of unbreakable items; a group's heading is part
         of its first item, so it can never be orphaned at the bottom of a column. -->
    <div v-if="abilityItems.length" class="rpc-abils">
      <div v-for="(it, i) in abilityItems" :key="i" class="rpc-ab">
        <p v-if="it.title" class="rpc-abh">{{ it.title }}</p>
        <template v-if="it.a">
          <strong>{{ it.a.name }}<span v-if="it.a.nameEn" class="rpc-en"> ({{ it.a.nameEn }})</span>:</strong>
          <span v-html="richText(it.a.text)"></span>
        </template>
        <span v-else-if="it.html" v-html="it.html"></span>
      </div>
    </div>

    <div class="rpc-keywords">
      <p class="rpc-line">
        <strong>{{ labels.dsKeywords }}:</strong>
        <template v-for="(g, gi) in keywordGroups" :key="gi"><template v-if="gi"> |</template><template v-if="g.model"> {{ g.model }} -</template> {{ g.list.join(', ') }}</template><template v-for="g in extraKeywords" :key="g.kw">, {{ g.kw }}*</template>
      </p>
      <p class="rpc-line"><strong>{{ labels.dsFactionKeywords }}:</strong> {{ (sheet.factionKeywords || []).join(', ') }}</p>
      <p v-for="n in keywordNotes" :key="n.note" class="rpc-footnote">* {{ n.kws.join(', ') }} — {{ n.note }}</p>
      <p v-if="extraCore.length" class="rpc-footnote">* {{ extraCore.map((c) => `${c.ability} — ${c.det ? `${c.source} · ${c.det}` : c.source}`).join('; ') }}</p>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { withGroupPos } from '../../utils/weaponGroups.js'
import { groupModNotes, modDelta, possibleModNotes } from '../../composables/rosterModNotes.js'
import {
  corePartsOf, extraCoreOf, factionKwMarker,
  keywordGroupsOf, extraKeywordsOf, keywordNotesOf, invNoteText, statCells,
} from '../../composables/datasheetParts.js'

const props = defineProps({
  // The resolved sheet — whichever tier the caller chose (printed / trimmed / modified).
  sheet: { type: Object, required: true },
  // The name plate's facts about THIS copy: role, Warlord, enhancement, attached-to, points.
  tags: { type: Array, default: () => [] },
  // Same shapes DatasheetCard takes (see its prop docs): what a rule granted, which cells the
  // modifier layer rewrote, and the notes explaining them.
  grantedKeywords: { type: Array, default: () => [] },
  grantedCore: { type: Array, default: () => [] },
  statMarks: { type: Array, default: () => [] },
  statNotes: { type: Array, default: () => [] },
  // Print the "possible modifiers" list under the in-play one.
  showPossible: { type: Boolean, default: false },
  // Print the build-choice blocks (composition, default loadout, wargear options).
  showChoices: { type: Boolean, default: false },
})

const WCOLS = { ranged: ['a', 'bs', 's', 'ap', 'd'], melee: ['a', 'ws', 's', 'ap', 'd'] }

const { locale } = useLocale()
const { renderInline, renderRichText } = useRenderInline()
const labels = computed(() => ui[locale.value])

const markFactionKw = computed(() => factionKwMarker(props.sheet))
const richText = (t) => renderRichText(t, { pre: markFactionKw.value, listClass: 'rpc-ul' })
const inlineText = (t) => renderInline(markFactionKw.value(t))

const rangedRows = computed(() => withGroupPos(props.sheet.ranged))
const meleeRows = computed(() => withGroupPos(props.sheet.melee))

const markSet = computed(() => new Set(props.statMarks))
const isMarked = (on, stat, index) => markSet.value.has(`${on}:${stat}:${index}`)

const invNotes = computed(() =>
  [...new Set((props.sheet.profiles || []).filter((p) => p.invNote).map((p) => invNoteText(p.invNote)))])

const coreParts = computed(() => corePartsOf(props.sheet))
const extraCore = computed(() => extraCoreOf(props.sheet, props.grantedCore))
const keywordGroups = computed(() => keywordGroupsOf(props.sheet))
const extraKeywords = computed(() => extraKeywordsOf(props.sheet, props.grantedKeywords))
const keywordNotes = computed(() => keywordNotesOf(extraKeywords.value, labels.value))

const noteSections = computed(() => {
  const l = labels.value
  const out = []
  const live = props.statNotes.filter((n) => n.live !== false)
  const possible = props.showPossible ? possibleModNotes(props.statNotes) : []
  if (live.length) out.push({ key: 'live', label: l.dsModifiers, groups: groupModNotes(live, l) })
  if (possible.length) {
    out.push({ key: 'possible', label: l.dsModifiersPossible, hint: l.dsModifiersPossibleHint, groups: groupModNotes(possible, l) })
  }
  return out
})

// The column stream: every ability-like thing on the sheet, flattened to unbreakable items.
// `title` marks the first item of a group. Named rules, Damaged, Transport and (when asked for)
// the build-choice blocks join the same stream — on paper they are all just entries.
const abilityItems = computed(() => {
  const s = props.sheet
  const l = labels.value
  const out = []
  const group = (title, list) => (list || []).forEach((a, i) => out.push({ title: i === 0 ? title : null, a }))
  group(l.dsAbilities, s.abilities)
  group(l.dsWargearAbilities, s.wargearAbilities)
  group(l.dsSpecialAbilities, s.specialAbilities)
  for (const set of s.abilitySets || []) {
    group(set.nameEn ? `${set.name} (${set.nameEn})` : set.name, set.options)
  }
  for (const r of s.rules || []) out.push({ title: null, a: r })
  if (s.damaged) out.push({ title: null, a: { name: `${l.dsDamaged}: ${s.damaged.note}`, text: s.damaged.text } })
  if (s.transport) out.push({ title: null, a: { name: l.dsTransport, text: s.transport } })
  if (props.showChoices && (s.composition || s.loadout)) {
    const parts = []
    if (s.composition) parts.push(`<ul class="rpc-ul">${s.composition.map((c) => `<li>${inlineText(c)}</li>`).join('')}</ul>`)
    if (s.loadout) parts.push(`<div>${inlineText(s.loadout)}</div>`)
    out.push({ title: null, html: `<strong>${l.dsComposition}:</strong> ${parts.join('')}` })
  }
  if (props.showChoices && s.options) {
    const body = s.options.map((o) => `<div>${inlineText(o)}</div>`).join('')
    out.push({ title: null, html: `<strong>${l.dsOptions}:</strong> ${body}` })
  }
  return out
})
</script>

<style scoped>
/* Everything in `em` off one base, so the sheet's density multiplier reaches every size here
   through the font alone. The base is small because this is the medium where height is paid for
   in sheets of paper — and print, unlike a screen, is read at arm's length in good light. */
.rpc {
  font-size: calc(0.72rem * var(--print-scale, 1));
  line-height: 1.3;
  border: 1px solid var(--text-primary);
  padding: 0.35em 0.55em 0.45em;
  color: var(--text-primary);
}

/* The name plate: the card's one heavy rule, and the copy's own facts beside the name. */
.rpc-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 0.8em;
  border-bottom: 2px solid var(--text-primary);
  padding-bottom: 0.25em;
  margin-bottom: 0.3em;
}
.rpc-name {
  margin: 0;
  font-size: 1.18em;
  line-height: 1.15;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
.rpc-tag { color: var(--text-muted); font-size: 0.95em; }
.rpc-tag:first-of-type { margin-left: auto; }

/* ── Statline ─────────────────────────────────────────────────────────────────────────────── */
.rpc-stats { margin-bottom: 0.35em; }
.rpc-statline { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0 1.1em; }
.rpc-prof { font-weight: 600; min-width: 9em; }
.rpc-stat-l { font-size: 0.78em; font-weight: 700; letter-spacing: 0.04em; color: var(--text-muted); margin-right: 0.25em; }
.rpc-stat-v { font-weight: 600; font-variant-numeric: tabular-nums; }
.rpc-invnote { margin: 0; font-size: 0.9em; color: var(--text-muted); }

/* ── Weapons ──────────────────────────────────────────────────────────────────────────────── */
.rpc-weapons { width: 100%; border-collapse: collapse; margin-bottom: 0.35em; }
.rpc-weapons th {
  text-align: center;
  font-size: 0.75em;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-top: 1px solid var(--text-primary);
  border-bottom: 1px solid var(--text-primary);
  padding: 0.1em 0.3em;
  white-space: nowrap;
}
.rpc-weapons th.wn { text-align: left; }
.rpc-weapons td {
  text-align: center;
  padding: 0.08em 0.3em;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}
.rpc-weapons td.wn { text-align: left; white-space: normal; width: 99%; }
/* A profile of the row above it: indented under the shared name, no repeated tint needed. */
.rpc-weapons tr.wg-mid td.wn, .rpc-weapons tr.wg-end td.wn { padding-left: 1em; }
.rpc-warrow { color: var(--text-muted); }
.rpc-wqty { color: var(--text-muted); }
.rpc-wtags { font-size: 0.85em; color: var(--text-muted); text-transform: uppercase; }

/* ── The modifier footnotes ───────────────────────────────────────────────────────────────── */
.rpc-mods { margin-bottom: 0.35em; }
.rpc-mods-h { margin: 0; font-size: 0.8em; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.rpc-mods-h em { font-style: normal; font-weight: 400; text-transform: none; color: var(--text-muted); }
.rpc-mods-list { margin: 0; padding: 0; list-style: none; columns: 2; column-gap: 1.2em; font-size: 0.95em; }
.rpc-mods-list li { break-inside: avoid; }
.rpc-mod-src { font-weight: 600; color: var(--text-muted); }
.rpc-mod { padding-left: 0.8em; }
.rpc-mod-when { color: var(--text-muted); }

/* ── Core / faction lines, keywords ───────────────────────────────────────────────────────── */
.rpc-line { margin: 0 0 0.15em; }
.rpc-en { font-weight: 400; color: var(--text-muted); }

/* ── Abilities, two columns ───────────────────────────────────────────────────────────────── */
.rpc-abils {
  columns: 2;
  column-gap: 1.2em;
  column-rule: 1px solid var(--border);
  margin: 0.25em 0 0.3em;
}
.rpc-ab { break-inside: avoid; margin-bottom: 0.3em; }
.rpc-abh {
  margin: 0 0 0.1em;
  font-size: 0.8em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid var(--border);
}
.rpc-ab :deep(p) { margin: 0; }
.rpc-ab :deep(.rpc-ul) { margin: 0.1em 0; padding-left: 1.1em; }

.rpc-keywords { border-top: 1px solid var(--text-primary); padding-top: 0.2em; }
.rpc-footnote { margin: 0; font-size: 0.9em; color: var(--text-muted); }

/* A value the modifier layer rewrote — the same `*` convention the screen card uses. */
.mod sup, .rpc-stat-v sup, .rpc-weapons sup { font-weight: 700; }
</style>
