<!-- A SLICE of one block of the print document: units `from..to` of `block`, rendered exactly
     as they look when the whole block is rendered (`from: 0, to: units.length`). This one
     component is both the measuring flow and the page content in RosterPrintSheet — which is the
     whole trick: what was measured and what is put in the page box cannot differ, because they
     are the same template.

     Every unit's root element carries `data-u="<block>:<index>"` — that is what the sheet
     measures. A unit is exactly what pagination may not cut: a heading, a rule, a row of the
     list, a pair of stratagem cards, a unit card.

     THE LIST is one table per fragment, and every fragment repeats <colgroup> + <thead>:
     `table-layout: fixed` with the same column widths is what keeps the pieces of a split table
     aligned across pages, and the repeated header is what keeps the second page from being a
     wall of unlabelled columns (the sheet charges continuations for its height — `overheads`).

     A RULE is full width with its BODY set in two columns internally. Setting whole sections in
     CSS columns was tried and taken out: in a multi-column flow a unit's vertical offset says
     nothing about its place in the flow, and offsets are the one thing pagination reasons about.
     Columns INSIDE an unbreakable unit are safe — nothing ever cuts through the unit — and give
     the same ~65-character measure.

     STRATAGEMS come pre-paired by the sheet (two to a row, the pair is the unit): the pair's own
     little grid is what makes "lower down" mean "later", which a shared multi-column section
     never guaranteed. -->
<template>
  <!-- ── The list: a table per fragment ──────────────────────────────────────────────────── -->
  <table v-if="block.kind === 'list'" class="rps-table">
    <colgroup>
      <col :style="{ width: block.cols.gear ? '34%' : 'auto' }" />
      <col v-if="block.cols.gear" />
      <col v-if="block.cols.pts" class="rps-col-pts" />
    </colgroup>
    <thead>
      <tr>
        <th class="c-name">{{ labels.printColUnit }}</th>
        <th v-if="block.cols.gear" class="c-gear">{{ labels.printColWargear }}</th>
        <th v-if="block.cols.pts" class="c-pts">{{ labels.printColPoints }}</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(u, i) in slice" :key="from + i">
        <tr v-if="u.t === 'g'" class="rps-group" :data-u="uid(i)">
          <th :colspan="1 + (block.cols.gear ? 1 : 0) + (block.cols.pts ? 1 : 0)">{{ u.label }}</th>
        </tr>
        <tr v-else class="rps-row" :class="{ attached: u.attached }" :data-u="uid(i)">
          <td class="c-name">
            <span class="rps-unit">{{ u.name }}</span>
            <span v-for="(tag, ti) in u.tags" :key="ti" class="rps-tag">{{ tag }}</span>
          </td>
          <td v-if="block.cols.gear" class="c-gear">{{ u.gear }}</td>
          <td v-if="block.cols.pts" class="c-pts">{{ u.pts }}</td>
        </tr>
      </template>
    </tbody>
  </table>

  <!-- ── Everything else: a stream of units ──────────────────────────────────────────────── -->
  <template v-else>
    <template v-for="(u, i) in slice" :key="from + i">
      <header v-if="u.t === 'header'" class="rps-head" :data-u="uid(i)">
        <h1 class="rps-title">{{ u.title }}</h1>
        <p class="rps-facts"><span v-for="(f, fi) in u.facts" :key="fi" class="rps-fact">{{ f }}</span></p>
      </header>

      <h2 v-else-if="u.t === 'h2'" class="rps-h" :data-u="uid(i)">{{ u.label }}</h2>

      <div v-else-if="u.t === 'rule'" class="rps-rule" :data-u="uid(i)">
        <h3 class="rps-rule-name">{{ u.name }}<em v-if="u.em"> · {{ u.em }}</em></h3>
        <div v-if="u.body" class="rps-rule-body"><RuleBody :body="u.body" /></div>
      </div>

      <h3 v-else-if="u.t === 'phase'" class="rps-phase" :data-u="uid(i)">{{ u.label }}</h3>

      <div v-else-if="u.t === 'pair'" class="rps-pair" :data-u="uid(i)">
        <article v-for="st in u.items" :key="st.key" class="rps-strat">
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
      </div>

      <div v-else-if="u.t === 'card'" class="rps-u" :data-u="uid(i)">
        <RosterPrintUnitCard
          :unit-id="u.c.unitId"
          :faction-slug="u.c.factionSlug"
          :ctx="u.c.ctx"
          :opts="opts"
          :points="u.c.points"
          :role="u.c.role"
        />
      </div>
    </template>
  </template>
</template>

<script setup>
import { computed } from 'vue'
import RuleBody from '../RuleBody.vue'
import RosterPrintUnitCard from './RosterPrintUnitCard.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  // A block descriptor from RosterPrintSheet: { id, kind, units, cols? }.
  block: { type: Object, required: true },
  from: { type: Number, required: true },
  to: { type: Number, required: true },
  // The effective print settings (stratagem text, card tiers).
  opts: { type: Object, required: true },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const slice = computed(() => props.block.units.slice(props.from, props.to))
const uid = (i) => `${props.block.id}:${props.from + i}`
</script>

<style scoped>
/* Every size and gap is written against --print-scale, so the density control moves the whole
   document at once. Adding a hard-coded rem here quietly opts that element out of it. */

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
/* One line with separators drawn by CSS, so a missing fact never leaves a stray dot behind. */
.rps-fact:not(:last-child)::after { content: ' · '; }

.rps-h {
  margin: 0 0 calc(0.25rem * var(--print-scale, 1));
  padding-bottom: calc(0.1rem * var(--print-scale, 1));
  border-bottom: 1px solid var(--border);
  font-size: calc(0.95rem * var(--print-scale, 1));
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* ── The list ───────────────────────────────────────────────────────────────────────────────
   Full width on purpose: a table is the one place a long line is not a reading problem — the
   eye travels down a column. `fixed` layout + the colgroup keep a split table's pieces aligned. */
.rps-table { width: 100%; border-collapse: collapse; table-layout: fixed; margin-bottom: calc(0.7rem * var(--print-scale, 1)); }
.rps-col-pts { width: calc(3.4rem * var(--print-scale, 1)); }
.rps-table th, .rps-table td {
  padding: calc(0.12rem * var(--print-scale, 1)) calc(0.3rem * var(--print-scale, 1));
  text-align: left;
  vertical-align: top;
  overflow-wrap: break-word;
}
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
.rps-row td { border-bottom: 1px solid var(--border-subtle, var(--border)); }
.rps-unit { font-weight: 600; }
/* Which copy this is — models, role, enhancement — beside the name rather than under it. */
.rps-tag { margin-left: calc(0.3rem * var(--print-scale, 1)); color: var(--text-muted); font-size: 0.9em; }
.rps-tag::before { content: '· '; }
.c-pts { white-space: nowrap; text-align: right; font-variant-numeric: tabular-nums; }
.rps-row.attached .c-name { padding-left: calc(0.7rem * var(--print-scale, 1)); }

/* ── Rules: full width, body in two internal columns ──────────────────────────────────────── */
.rps-rule { margin-bottom: calc(0.4rem * var(--print-scale, 1)); }
.rps-rule-name {
  margin: 0 0 calc(0.1rem * var(--print-scale, 1));
  font-size: calc(0.85rem * var(--print-scale, 1));
}
.rps-rule-name em { font-style: normal; font-weight: 400; color: var(--text-muted); }
.rps-rule-body { columns: 2; column-gap: calc(1.2rem * var(--print-scale, 1)); }
.rps-rule-body :deep(p) { margin: 0 0 calc(0.25rem * var(--print-scale, 1)); }
.rps-rule-body :deep(ul) { margin: 0 0 calc(0.25rem * var(--print-scale, 1)); padding-left: 1em; }

/* ── Stratagems: two cards to a row, the row is the unit ──────────────────────────────────── */
/* Margin-BOTTOM only, like every unit here: a unit's top margin would push it down inside a
   page box the pagination did not budget for. The gap above a phase comes from the previous
   pair's own margin-bottom. */
.rps-phase {
  margin: 0 0 calc(0.2rem * var(--print-scale, 1));
  padding-bottom: calc(0.05rem * var(--print-scale, 1));
  border-bottom: 1px solid var(--border);
  font-size: calc(0.7rem * var(--print-scale, 1));
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}
.rps-pair {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: calc(1.2rem * var(--print-scale, 1));
  align-items: start;
  margin-bottom: calc(0.35rem * var(--print-scale, 1));
}
.rps-strat-name {
  margin: 0;
  font-size: calc(0.82rem * var(--print-scale, 1));
  line-height: 1.25;
}
.rps-strat-name em { font-weight: 400; font-style: normal; color: var(--text-muted); }
/* The cost rides with the name — it is one of the two things a player scans for (the other is
   the phase, which is the heading above). */
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

/* ── A unit card ──────────────────────────────────────────────────────────────────────────── */
.rps-u { margin-bottom: calc(0.45rem * var(--print-scale, 1)); }
</style>
