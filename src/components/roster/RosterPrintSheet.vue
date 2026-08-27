<!-- The document itself: an army list as a booklet, in the order somebody reads one at a table.
     Rendered on screen exactly as it prints — this component IS the preview, there is no second
     layout to keep in step (RosterPrintView draws the page edges around it and hands it the
     settings; `@media print` in style.css only removes the app's chrome and forces the light
     palette).

     THE ORDER, and why: the header answers "whose list, which detachment, how many points" —
     the questions a judge asks; then the list itself on one table, because that is the page a
     player looks at most; then the rules that apply to the whole army; then the stratagems as a
     table; and last, if asked for, a card per unit. A booklet you can stop reading after page one
     and still have what you need.

     EVERY SECTION IS OPTIONAL EXCEPT THE HEADER AND THE LIST. Those two are what makes it an army
     list; the rest is reference somebody may already know by heart (src/data/rosterPrintOptions.js).

     DENSITY is one multiplier, `--print-scale`, set by the view on the wrapper: every size, gap
     and line-height here is written as `calc(X * var(--print-scale, 1))`. Adding a hard-coded rem
     to this file quietly opts that element out of the density control. -->
<template>
  <div class="rps">
    <header class="rps-head">
      <h1 class="rps-title">{{ roster.name || labels.rosterUntitled }}</h1>
      <p class="rps-facts">
        <span v-for="(f, i) in facts" :key="i" class="rps-fact">{{ f }}</span>
      </p>
    </header>

    <!-- The list. One table, full width: the numbers stand in columns where the eye finds them,
         and the wargear takes whatever is left. -->
    <section class="rps-block rps-list">
      <table class="rps-table">
        <thead>
          <tr>
            <th class="c-name">{{ labels.printColUnit }}</th>
            <th class="c-gear">{{ labels.printColWargear }}</th>
            <th v-if="opts.points" class="c-pts">{{ labels.printColPoints }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="g in groups" :key="g.id">
            <tr v-if="g.entries.length" class="rps-group">
              <th :colspan="opts.points ? 3 : 2">
                {{ g.ally ? g.ally.name : labels[GROUP_LABEL_KEYS[g.id]] }}
              </th>
            </tr>
            <tr v-for="e in g.entries" :key="e.uid" class="rps-row" :class="{ attached: roleOf(e) }">
              <td class="c-name">
                <span class="rps-unit">{{ defOf(e.id)?.name || e.id }}</span>
                <span v-for="(tag, i) in tagsOf(e)" :key="i" class="rps-tag">{{ tag }}</span>
              </td>
              <td class="c-gear">{{ gearOf(e).join(' · ') }}</td>
              <td v-if="opts.points" class="c-pts">{{ pointsOf(e) }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </section>

    <section v-if="opts.armyRule && armyRule" class="rps-block">
      <h2 class="rps-h">{{ labels.factionArmyRule }}</h2>
      <div class="rps-prose">
        <h3 class="rps-rule-name">{{ armyRule.name }}<em v-if="armyRule.nameRu"> · {{ armyRule.nameRu }}</em></h3>
        <RuleBody :body="armyRule.body" />
      </div>
    </section>

    <section v-if="opts.detachmentRules && detachments.length" class="rps-block">
      <h2 class="rps-h">{{ labels.factionDetachment }}</h2>
      <div class="rps-prose">
        <template v-for="det in detachments" :key="det.name">
          <div v-if="det.rule" class="rps-rule">
            <h3 class="rps-rule-name">
              {{ det.name }} · {{ det.rule.name }}<em v-if="det.rule.nameRu"> · {{ det.rule.nameRu }}</em>
            </h3>
            <RuleBody :body="det.rule.body" />
          </div>
        </template>
      </div>
    </section>

    <!-- Only the enhancements this list actually took: the other three on the detachment are
         somebody else's list. Each says who is carrying it, because that is the question the
         paper gets asked mid-game. -->
    <section v-if="opts.enhancements && enhancements.length" class="rps-block">
      <h2 class="rps-h">{{ labels.rosterEnhancement }}</h2>
      <div class="rps-prose">
        <div v-for="enh in enhancements" :key="enh.key" class="rps-rule">
          <h3 class="rps-rule-name">{{ enh.name }}<em v-if="enh.bearer"> · {{ enh.bearer }}</em></h3>
          <RuleBody v-if="enh.body" :body="enh.body" />
        </div>
      </div>
    </section>

    <!-- Stratagems as cards in two columns, grouped by the phase they are used in
         (stratagemPhases.js reads the ENGLISH `when`, so the grouping is identical in both
         languages). Without the effect text this is still the cheapest useful section in the
         booklet: a whole detachment fits in a third of a sheet. -->
    <section v-if="opts.stratagems && stratagemGroups.length" class="rps-block">
      <h2 class="rps-h">{{ labels.rosterViewTabStratagems }}</h2>
      <div class="rps-strats">
        <template v-for="g in stratagemGroups" :key="g.phase">
          <h3 class="rps-phase">{{ phaseLabel(g.phase, labels) }}</h3>
          <article v-for="st in g.items" :key="st.key" class="rps-strat">
            <h4 class="rps-strat-name">
              <span class="c-strat">{{ st.name }}</span><em v-if="st.nameRu"> · {{ st.nameRu }}</em>
              <span class="rps-cp">{{ st.cp }}</span>
            </h4>
            <p class="rps-strat-when">{{ st.when }}</p>
            <p v-if="opts.stratagemText" class="rps-strat-text">
              <span v-if="st.target"><strong>{{ labels.stratTarget }}:</strong> {{ st.target }} </span>
              <span v-if="st.effect"><strong>{{ labels.stratEffect }}:</strong> {{ st.effect }} </span>
              <span v-if="st.restrictions"><strong>{{ labels.stratRestrictions }}:</strong> {{ st.restrictions }}</span>
            </p>
          </article>
        </template>
      </div>
    </section>

    <section
      v-if="opts.unitCards && cardEntries.length"
      class="rps-block rps-cards"
      :class="{ 'two-up': opts.cardsTwoUp }"
    >
      <h2 class="rps-h">{{ labels.printSectionCards }}</h2>
      <RosterPrintUnitCard
        v-for="c in cardEntries"
        :key="c.entry.uid"
        :unit-id="c.unitId"
        :faction-slug="c.factionSlug"
        :ctx="c.ctx"
        :opts="opts"
        :points="opts.points ? pointsOf(c.entry) : null"
        :role="roleOf(c.entry)"
      />
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import RuleBody from '../RuleBody.vue'
import RosterPrintUnitCard from './RosterPrintUnitCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { APP_DATA_VERSION } from '../../data/appDataVersion.js'
import rosterCore from '../../data/roster/core.js'
import { rosterItems } from '../../data/roster/index.js'
import {
  GROUP_LABEL_KEYS, allySourceOf, sectionsOf, effectiveBattle, leadsFor,
  mandatoryEnhancementFor, rosterPoints, unitPoints, wargearNames, leaderTargetsFor,
} from '../../composables/rosterEngine.js'
import { enhKey } from '../../composables/rosterModifiers.js'
import { PHASE_ORDER, phaseLabel } from '../../composables/stratagemPhases.js'

const props = defineProps({
  roster: { type: Object, required: true },
  // The compact roster bundle (unit defs, detachment list) — src/data/roster/*.
  factionData: { type: Object, default: null },
  // The hand-authored faction bundle, localised (rosterFactionRules.js): the army rule.
  rulesFaction: { type: Object, default: null },
  // The detachments this list plays, from the same loader — each with its rule, stratagems and
  // enhancements. Resolved by the caller because it is the caller that knows about the Chapter
  // fallback; this component only prints what it is handed.
  detachments: { type: Array, default: () => [] },
  // Already resolved through printOptionOn: every value here is the effective one.
  opts: { type: Object, required: true },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const unitMap = computed(() => {
  const m = new Map()
  for (const u of props.factionData?.units || []) m.set(u.id, u)
  return m
})
const defOf = (id) => unitMap.value.get(id)

// The compact bundle's detachment objects (points, keywords) rather than the prose ones — this is
// what rosterEngine reads for legality and pricing.
const dataDetachments = computed(() =>
  (props.roster?.detachments || [])
    .map((name) => (props.factionData?.detachments || []).find((d) => d.name === name))
    .filter(Boolean))

const effBattle = computed(() => effectiveBattle(props.roster || {}, rosterCore))
const total = computed(() => rosterPoints(props.roster?.units, defOf, dataDetachments.value))

// The header line a judge reads. Two of these are ours rather than the game's — the data version
// and the date — and they are the answer to "why does this list price differently in your app",
// which is the single most common thing a printed list gets argued about.
const facts = computed(() => {
  const l = labels.value
  const out = []
  const fac = props.factionData?.name || props.roster?.faction
  if (fac) out.push(fac)
  for (const d of props.roster?.detachments || []) out.push(d)
  if (props.opts.points) out.push(`${total.value} / ${effBattle.value.points}${l.rosterPointsLabel}`)
  out.push(effBattle.value.name || '')
  out.push(`${l.printDataVersion} ${APP_DATA_VERSION}`)
  out.push(new Date().toLocaleDateString(locale.value === 'ru' ? 'ru-RU' : 'en-GB'))
  return out.filter(Boolean)
})

const groups = computed(() => sectionsOf(props.roster?.units, {
  faction: props.factionData,
  detachments: dataDetachments.value,
  defOf,
  keepLocked: true,
  pairAttached: true,
}).map((sec) => ({ ...sec, entries: sec.items })))

// The same running copy-index the editor prices with: the fourth Chaos Lord costs more than the
// first, and a printed list that disagrees with the app about the total is worse than no list.
const entryPoints = computed(() => {
  const seen = new Map()
  const m = new Map()
  for (const e of props.roster?.units || []) {
    const copyIndex = (seen.get(e.id) || 0) + 1
    seen.set(e.id, copyIndex)
    m.set(e.uid, unitPoints(defOf(e.id), e, copyIndex, dataDetachments.value))
  }
  return m
})
const pointsOf = (e) => entryPoints.value.get(e.uid)

function roleOf(e) {
  if (!e.leaderOf) return ''
  const host = (props.roster?.units || []).find((u) => u.uid === e.leaderOf)
  if (!host) return ''
  const type = leadsFor(defOf(e.id), e, dataDetachments.value).find((lt) => lt.to === host.id)?.type
  return type === 'support' ? labels.value.rosterSupportTag : labels.value.rosterLeaderTag
}

// What tells this copy from another copy of the same datasheet, in the order it is asked for.
function tagsOf(e) {
  const l = labels.value
  const def = defOf(e.id)
  const out = []
  const role = roleOf(e)
  if (role) out.push(role)
  const size = def?.sizes?.[e.size ?? 0] || def?.sizes?.[0]
  if (size && size.per[1] > 1) out.push(`${e.count ?? size.per[0]} ${l.rosterModelsLabel}`)
  if (e.warlord) out.push(l.rosterWarlord)
  const enh = e.enh || mandatoryEnhancementFor(def, dataDetachments.value)?.name
  if (enh) out.push(enh)
  if (e.alleg) out.push(e.alleg)
  return out
}

// Only what was CHOSEN — the default loadout is on the card (and identical on every copy), and
// printing it here doubled the length of the one table that has to stay readable.
const gearOf = (e) => wargearNames(defOf(e.id), e, rosterItems.items)

// The enhancements this list took, each with the prose behind it and the unit carrying it. A
// mandatory one is derived from the detachment rather than stored on the entry, so it is found
// the same way the roster's own rows find it.
const enhancements = computed(() => {
  const out = []
  const seen = new Set()
  for (const e of props.roster?.units || []) {
    const def = defOf(e.id)
    const name = e.enh || mandatoryEnhancementFor(def, dataDetachments.value)?.name
    if (!name) continue
    const key = enhKey(name)
    if (seen.has(key)) continue
    seen.add(key)
    const found = props.detachments
      .flatMap((d) => d.enhancements || [])
      .find((x) => enhKey(x.name) === key)
    out.push({ key, name: found?.name || name, body: found?.body || '', bearer: def?.name || e.id })
  }
  return out
})

// Grouped by phase, in the order a battle round happens, with a stratagem that spans two phases
// printed under each of them — the same reading StratagemsView and the tracker use.
const stratagemGroups = computed(() => {
  const all = props.detachments.flatMap((d) => (d.stratagems || []).map((st) => ({ ...st, det: d.name })))
  if (!all.length) return []
  // A stratagem whose timing named no phase at all still has to be printed — dropping one
  // silently is exactly what a paper reference must not do — so it joins "any", which is where a
  // reader looks for a stratagem that is not tied to a phase anyway.
  const phasesOfStrat = (st) => ((st._phases || []).length ? st._phases : ['any'])
  const out = []
  for (const phase of PHASE_ORDER) {
    const items = all
      .filter((st) => phasesOfStrat(st).includes(phase))
      .map((st) => ({ ...st, key: `${st.det}:${st.name}:${phase}` }))
    if (items.length) out.push({ phase, items })
  }
  return out
})

// One card per entry, in the order the list prints them, each with the context the overlay needs.
const cardEntries = computed(() => groups.value.flatMap((g) => g.entries.map((entry) => {
  const src = allySourceOf(entry.id)
  return {
    entry,
    unitId: src?.[1] || entry.id,
    factionSlug: src?.[0] || props.roster.faction,
    ctx: {
      def: defOf(entry.id),
      entry,
      items: rosterItems.items,
      detachments: dataDetachments.value,
      leaderTargets: leaderTargetsFor(defOf(entry.id), props.roster?.units, entry.uid, defOf, dataDetachments.value),
      units: props.roster?.units || [],
    },
  }
})))

const armyRule = computed(() => props.rulesFaction?.armyRule || null)
</script>

<style scoped>
/* Everything is expressed against --print-scale so the density control moves the whole document
   at once. The base is 0.8rem — smaller than any screen text here, because this is the one place
   in the app where height is paid for in sheets of paper. */
.rps {
  font-size: calc(0.8rem * var(--print-scale, 1));
  line-height: 1.3;
  color: var(--text-primary);
}

.rps-head { margin-bottom: calc(0.5rem * var(--print-scale, 1)); }
.rps-title {
  margin: 0;
  font-size: calc(1.5rem * var(--print-scale, 1));
  line-height: 1.1;
}
.rps-facts {
  margin: calc(0.15rem * var(--print-scale, 1)) 0 0;
  color: var(--text-muted);
  font-size: calc(0.75rem * var(--print-scale, 1));
}
/* The facts are one line with separators drawn by CSS, so a missing fact never leaves a stray
   dot behind it. */
.rps-fact:not(:last-child)::after { content: ' · '; }

.rps-block { margin-bottom: calc(0.7rem * var(--print-scale, 1)); }
.rps-h {
  margin: 0 0 calc(0.25rem * var(--print-scale, 1));
  padding-bottom: calc(0.1rem * var(--print-scale, 1));
  border-bottom: 1px solid var(--border);
  font-size: calc(0.95rem * var(--print-scale, 1));
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* ── The list, and the stratagems: two tables, same skeleton ─────────────────────────────────
   Full width on purpose. A table is the one place where a long line is not a reading problem:
   the eye travels down a column, not across a paragraph. */
.rps-table { width: 100%; border-collapse: collapse; }
.rps-table th, .rps-table td {
  padding: calc(0.12rem * var(--print-scale, 1)) calc(0.3rem * var(--print-scale, 1));
  text-align: left;
  vertical-align: top;
}
/* A header repeated on every sheet the table runs onto — without this the second page of a long
   list is a wall of unlabelled columns. */
.rps-table thead { display: table-header-group; }
.rps-table thead th {
  border-bottom: 1px solid var(--text-primary);
  font-size: calc(0.68rem * var(--print-scale, 1));
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.rps-group th {
  padding-top: calc(0.35rem * var(--print-scale, 1));
  border-bottom: 1px solid var(--border);
  font-size: calc(0.7rem * var(--print-scale, 1));
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}
.rps-row { break-inside: avoid; page-break-inside: avoid; }
.rps-row td { border-bottom: 1px solid var(--border-subtle, var(--border)); }
.rps-unit { font-weight: 600; }
/* Which copy this is — models, role, enhancement — beside the name rather than under it: the
   column is wide enough, and a second line per unit is a sheet on a full list. */
.rps-tag { margin-left: calc(0.3rem * var(--print-scale, 1)); color: var(--text-muted); font-size: 0.9em; }
.rps-tag::before { content: '· '; }
.c-pts { width: 1%; white-space: nowrap; text-align: right; font-variant-numeric: tabular-nums; }
.c-name { width: 34%; }
.rps-row.attached .c-name { padding-left: calc(0.7rem * var(--print-scale, 1)); }
/* ── Stratagems: cards, not a table ─────────────────────────────────────────────────────────
   A stratagem is prose, and prose across the full width of A4 is a 120-character line — the same
   reason the rules below are set in two columns. As a table it also had to give a column its
   width for every row: the widest "when" in the detachment decided the measure for all of them.
   As cards each one takes the height it needs and no more, and two fit side by side.

   The phase heading spans both columns: it belongs to the group, not to the column its first
   card happens to start in. */
.rps-strats { columns: 2; column-gap: calc(1.2rem * var(--print-scale, 1)); }
.rps-phase {
  column-span: all;
  margin: calc(0.35rem * var(--print-scale, 1)) 0 calc(0.2rem * var(--print-scale, 1));
  padding-bottom: calc(0.05rem * var(--print-scale, 1));
  border-bottom: 1px solid var(--border);
  font-size: calc(0.7rem * var(--print-scale, 1));
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}
.rps-phase:first-child { margin-top: 0; }
.rps-strat {
  break-inside: avoid;
  page-break-inside: avoid;
  margin-bottom: calc(0.35rem * var(--print-scale, 1));
}
.rps-strat-name {
  margin: 0;
  font-size: calc(0.82rem * var(--print-scale, 1));
  line-height: 1.25;
}
.rps-strat-name em { font-weight: 400; font-style: normal; color: var(--text-muted); }
/* The cost rides with the name rather than in a column of its own — it is one of the two things
   a player scans for (the other is the phase, which is the heading above). */
.rps-cp {
  margin-left: calc(0.3rem * var(--print-scale, 1));
  padding: 0 calc(0.25rem * var(--print-scale, 1));
  border: 1px solid var(--border);
  font-size: 0.85em;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.rps-strat-when { margin: 0; color: var(--text-muted); font-size: 0.95em; }
.rps-strat-text { margin: calc(0.1rem * var(--print-scale, 1)) 0 0; font-size: 0.95em; }
.rps-strat-text strong { text-transform: uppercase; font-size: 0.9em; letter-spacing: 0.03em; }

/* ── Prose: two columns ─────────────────────────────────────────────────────────────────────
   A rule set across the full width of A4 is a 120-character line, which is both hard to read and
   wasteful. Two columns give ~65 characters — book measure — and twice the text per sheet. The
   balance keeps the bottom of a page from being half empty; a rule never splits across columns. */
.rps-prose { columns: 2; column-gap: calc(1.2rem * var(--print-scale, 1)); }
.rps-rule, .rps-prose > * { break-inside: avoid; page-break-inside: avoid; }
.rps-rule { margin-bottom: calc(0.4rem * var(--print-scale, 1)); }
.rps-rule-name {
  margin: 0 0 calc(0.1rem * var(--print-scale, 1));
  font-size: calc(0.85rem * var(--print-scale, 1));
}
.rps-rule-name em { font-style: normal; font-weight: 400; color: var(--text-muted); }
.rps-prose :deep(p) { margin: 0 0 calc(0.25rem * var(--print-scale, 1)); }
.rps-prose :deep(ul) { margin: 0 0 calc(0.25rem * var(--print-scale, 1)); padding-left: 1em; }

/* One card per row, or two. A datasheet is a grid of tables and used to have no business in a
   column — it read the WINDOW to decide how to draw itself, so in a 92mm column on a desktop it
   would have laid itself out for a 1200px screen and been cut off. It reads its own box now
   (DatasheetCard's `.ds-shell`), so in half a page it draws itself the way it does on a phone,
   which is the layout that half a page wants. A card still never splits across a column. */
.rps-cards { columns: 1; }
.rps-cards.two-up { columns: 2; column-gap: calc(1rem * var(--print-scale, 1)); }
/* The section's own heading belongs to the section, not to its first column — left in the flow it
   takes the top of column one and pushes the first card below the top of column two, so the two
   columns start at different heights for no reason a reader could name. */
.rps-cards.two-up > .rps-h { column-span: all; }

/* DatasheetCard escapes to the full VIEWPORT width below 480px (`width: 100vw; margin-left:
   calc(50% - 50vw)`) so that on a phone it reads as a full-bleed section rather than a card in a
   gutter. On a sheet of paper there is no viewport to bleed to: inside the 194mm page the calc
   resolved against the PAGE's half-width and the phone's half-width, which pushed every unit
   card ~177px to the right and cut it down to the phone's own width — a narrow column of cards
   floating in the middle of the paper. Cancel the escape, exactly as RosterUnitRulesModal does
   for the same reason; the card's own bleeds to its own edges are untouched and still right. */
.rps-cards :deep(.ds-card) {
  width: auto;
  margin-left: 0;
}
</style>
