<!-- The document itself: an army list as a booklet, in the order somebody reads one at a table —
     whose list and how many points; the list; the army rule; the detachment rules; the
     enhancements taken; the stratagems; and, if asked for, a card per unit. A booklet you can
     stop reading after page one and still have what you need. Every section is optional except
     the header and the list (src/data/rosterPrintOptions.js).

     THE PAGES ARE REAL. The whole document renders once, unpaginated, in a hidden measuring
     flow; every indivisible piece of it is a `data-u` unit with a measured top and bottom; and
     paginatePrint (rosterPrintOptions.js) deals those units onto page BOXES of exactly the
     printable height of A4. What is inside a box on screen is what is on that sheet of paper —
     there is no line drawn over a flow, and nothing left for the browser's own print
     fragmentation to decide (each box is `break-after: page` and its content fits by
     construction). Three models were tried and buried before this one: pushing blocks down with
     margins (invented gaps), pushing cards only (wrong inside columns), and drawing computed
     edge lines over one flow (a simulation of the print engine, chasing it forever).

     Both the measuring flow and the pages render the SAME RosterPrintFragment component — that
     is what makes the measurement honest.

     DENSITY is one multiplier, `--print-scale`, set by the view on the wrapper: every size, gap
     and line-height in the fragments and the card is written against it. -->
<template>
  <div class="rps">
    <!-- The measuring flow. Hidden but laid out at the paper's width; display:none would
         collapse it and there would be nothing to measure. -->
    <div ref="measureEl" class="rps-measure" aria-hidden="true">
      <RosterPrintFragment
        v-for="b in blocks"
        :key="b.id"
        :block="b"
        :from="0"
        :to="b.units.length"
        :opts="opts"
      />
    </div>

    <!-- The pages. A spill page holds a single unit taller than a sheet: its box grows and the
         printer runs it over two sheets — text is never clipped to keep the boxes honest. -->
    <section
      v-for="(pg, pi) in pages"
      :key="pi"
      class="rps-page"
      :class="{ 'rps-page-spill': pg.spill }"
      :style="pg.spill ? { minHeight: pageH + 'px' } : { height: pageH + 'px' }"
      :data-label="labels.printSheetLabel.replace('{n}', String(pi + 1))"
    >
      <RosterPrintFragment
        v-for="f in pg.fragments"
        :key="f.block + ':' + f.from"
        :block="blockById[f.block]"
        :from="f.from"
        :to="f.to"
        :opts="opts"
      />
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import RosterPrintFragment from './RosterPrintFragment.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { APP_DATA_VERSION } from '../../data/appDataVersion.js'
import rosterCore from '../../data/roster/core.js'
import { rosterItems } from '../../data/roster/index.js'
import {
  GROUP_LABEL_KEYS, allySourceOf, sectionsOf, dispositionOf, effectiveBattle, leadsFor,
  mandatoryEnhancementFor, rosterPoints, unitPoints, wargearNames, leaderTargetsFor,
} from '../../composables/rosterEngine.js'
import { enhKey } from '../../composables/rosterModifiers.js'
import { PHASE_ORDER, phaseLabel } from '../../composables/stratagemPhases.js'
import { MM_PX, paginatePrint, printPageHeightPx, printPageWidthMm } from '../../data/rosterPrintOptions.js'

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
// How many sheets the document is — the number the panel promises.
const emit = defineEmits(['pages'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// The wargear column earns its width only when nothing else is carrying the loadout: with cards
// on, each unit's loadout is on its own card a few pages later, and printing it twice only makes
// the one table that has to stay readable wider for no one.
const showGear = computed(() => !props.opts.unitCards)

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

// What the sheet says about itself. Two of these are ours rather than the game's — the data
// version and the date — and they are the answer to "why does this list price differently in your
// app", which is the single most common thing a printed list gets argued about.
const facts = computed(() => {
  const l = labels.value
  const out = []
  const fac = props.factionData?.name || props.roster?.faction
  if (fac) out.push(fac)
  for (const d of props.roster?.detachments || []) out.push(d)
  // The army's Force Disposition, beside the detachments that offer it — the one fact of the
  // muster an opponent reads off the sheet to know which Primary Mission each of you is playing.
  const fd = dispositionOf(props.roster, dataDetachments.value)
  if (fd) out.push(fd)
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
// printed under each of them — the same reading StratagemsView and the tracker use
// (stratagemPhases.js reads the ENGLISH `when`, so the grouping is identical in both languages).
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
    points: props.opts.points ? pointsOf(entry) : null,
    role: roleOf(entry),
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

// ── The document as BLOCKS of UNITS ─────────────────────────────────────────────────────────
// A unit is what pagination may not cut (see RosterPrintFragment.vue). A section heading is a
// unit with `keepWithNext`; the per-card page-break option becomes `breakBefore` on card units.
const blocks = computed(() => {
  const l = labels.value
  const out = []
  out.push({ id: 'header', kind: 'header', units: [{ t: 'header', title: props.roster.name || l.rosterUntitled, facts: facts.value }] })

  if (props.opts.rosterList) {
    const units = []
    for (const g of groups.value) {
      if (!g.entries.length) continue
      units.push({ t: 'g', label: g.ally ? g.ally.name : l[GROUP_LABEL_KEYS[g.id]], keepWithNext: true })
      for (const e of g.entries) {
        units.push({
          t: 'r',
          name: defOf(e.id)?.name || e.id,
          tags: tagsOf(e),
          gear: showGear.value ? gearOf(e).join(' · ') : '',
          pts: props.opts.points ? pointsOf(e) : '',
          attached: !!roleOf(e),
        })
      }
    }
    if (units.length) {
      out.push({ id: 'list', kind: 'list', cols: { gear: showGear.value, pts: props.opts.points }, units })
    }
  }

  if (props.opts.armyRule && armyRule.value) {
    out.push({
      id: 'army',
      kind: 'rules',
      units: [
        { t: 'h2', label: l.factionArmyRule, keepWithNext: true },
        { t: 'rule', name: armyRule.value.name, em: armyRule.value.nameRu || '', body: armyRule.value.body },
      ],
    })
  }

  if (props.opts.detachmentRules) {
    const rules = props.detachments.filter((det) => det.rule).map((det) => ({
      t: 'rule',
      name: `${det.name} · ${det.rule.name}`,
      em: det.rule.nameRu || '',
      body: det.rule.body,
    }))
    if (rules.length) {
      out.push({ id: 'detach', kind: 'rules', units: [{ t: 'h2', label: l.factionDetachment, keepWithNext: true }, ...rules] })
    }
  }

  // Only the enhancements this list actually took: the other three on the detachment are
  // somebody else's list. Each says who is carrying it, because that is the question the paper
  // gets asked mid-game.
  if (props.opts.enhancements && enhancements.value.length) {
    out.push({
      id: 'enh',
      kind: 'rules',
      units: [
        { t: 'h2', label: l.rosterEnhancement, keepWithNext: true },
        ...enhancements.value.map((enh) => ({ t: 'rule', name: enh.name, em: enh.bearer || '', body: enh.body })),
      ],
    })
  }

  if (props.opts.stratagems && stratagemGroups.value.length) {
    const units = [{ t: 'h2', label: l.rosterViewTabStratagems, keepWithNext: true }]
    for (const g of stratagemGroups.value) {
      units.push({ t: 'phase', label: phaseLabel(g.phase, l), keepWithNext: true })
      for (let i = 0; i < g.items.length; i += 2) {
        units.push({ t: 'pair', items: g.items.slice(i, i + 2) })
      }
    }
    out.push({ id: 'strats', kind: 'strats', units })
  }

  if (props.opts.unitCards && cardEntries.value.length) {
    out.push({
      id: 'cards',
      kind: 'cards',
      units: [
        { t: 'h2', label: l.printSectionCards, keepWithNext: true },
        ...cardEntries.value.map((c) => ({ t: 'card', c, breakBefore: !!props.opts.pageBreak })),
      ],
    })
  }

  return out
})
const blockById = computed(() => Object.fromEntries(blocks.value.map((b) => [b.id, b])))

// Flags and identity of every unit, flat and in document order — zipped with the measured
// rectangles by their `data-u` key.
const flatUnits = computed(() => blocks.value.flatMap((b) =>
  b.units.map((u, index) => ({
    block: b.id,
    index,
    keepWithNext: !!u.keepWithNext,
    breakBefore: !!u.breakBefore,
  }))))

// ── Measuring, and dealing onto pages ───────────────────────────────────────────────────────
const measureEl = ref(null)
const pages = ref([])
const pageH = computed(() => printPageHeightPx(props.opts.orientation))

// The preview may be drawn at a fraction of its real size (`zoom` on the paper container), and
// zoom scales what getBoundingClientRect reports — divide it back out so the maths stays in the
// paper's own pixels. Width 0 means an unlaid-out environment (tests): measure at 1:1.
function paperScale() {
  const shown = measureEl.value?.getBoundingClientRect().width
  const css = printPageWidthMm(props.opts.orientation) * MM_PX
  return shown && css ? shown / css : 1
}

function measure() {
  const root = measureEl.value
  if (!root) return
  const rects = new Map()
  const scale = paperScale()
  const top0 = root.getBoundingClientRect().top
  for (const el of root.querySelectorAll('[data-u]')) {
    const r = el.getBoundingClientRect()
    rects.set(el.dataset.u, { top: (r.top - top0) / scale, bottom: (r.bottom - top0) / scale })
  }
  const units = []
  for (const u of flatUnits.value) {
    const r = rects.get(`${u.block}:${u.index}`)
    // The DOM is mid-update (a block appeared before its elements did) — the observer/watcher
    // will run again when it settles; a partial measure would deal pages off stale offsets.
    if (!r) return
    units.push({ ...u, ...r })
  }
  // What a CONTINUATION of the list costs at the top of a page: the repeated table header.
  // Scoped to .rps-table — the unit cards' own weapon tables have theads too.
  const thead = root.querySelector('.rps-table thead')
  const overheads = { list: thead ? thead.getBoundingClientRect().height / scale : 0 }
  pages.value = paginatePrint(units, pageH.value, { overheads })
  emit('pages', Math.max(1, pages.value.length))
}

// Everything that changes the document re-measures it: the options and locale through
// `flatUnits`, the density through the font size (caught by the ResizeObserver), and the async
// per-card data loads (caught by the observer too — a card growing taller resizes the flow).
watch([flatUnits, () => props.opts.orientation], () => nextTick(measure))

let ro = null
onMounted(() => {
  if (typeof ResizeObserver !== 'undefined') {
    ro = new ResizeObserver(() => measure())
    ro.observe(measureEl.value)
  }
  // Fonts change every measured height; measure once more when they are in.
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    document.fonts.ready.then(() => measure())
  }
  nextTick(measure)
})
onBeforeUnmount(() => { ro?.disconnect(); ro = null })
</script>

<style scoped>
.rps {
  font-size: calc(0.8rem * var(--print-scale, 1));
  line-height: 1.3;
  color: var(--text-primary);
}

/* The measuring flow: laid out at full paper width, invisible, out of the stacking order, and
   never printed. */
.rps-measure {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  visibility: hidden;
  pointer-events: none;
  z-index: -1;
}

/* A page box IS a sheet of paper: exactly the printable height, white in both themes. On screen
   the boxes stack with a gap and each carries its number; in print the chrome goes, the height
   stays, and `break-after: page` hands every box its own physical sheet. */
.rps-page {
  position: relative;
  background: #fff;
  overflow: visible;
  box-shadow: 0 0 0 1px var(--border);
  margin-bottom: 1.6rem;
}
.rps-page::before {
  content: attr(data-label);
  position: absolute;
  top: -1.15em;
  right: 0;
  color: var(--text-dim);
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
@media print {
  .rps-page {
    box-shadow: none;
    margin: 0;
    break-after: page;
    page-break-after: always;
  }
  .rps-page:last-child { break-after: auto; page-break-after: auto; }
  .rps-page::before { content: none; }
  .rps-measure { display: none; }
}

/* ── Ink ────────────────────────────────────────────────────────────────────────────────────
   FULL monochrome, by decision (2026-08-27): the accent vars are pinned to the text colour, so
   everything downstream that keys off them — headings, glosses, cross-refs, dice icons — prints
   in ink without being chased down one class at a time. The app's accent follows the THEME,
   which is what once printed pale pink headings onto white paper. */
.rps {
  --accent: var(--text-primary);
  --accent-hover: var(--text-primary);
  --link-accent: var(--text-primary);
  --link-accent-hover: var(--text-primary);
}
/* Every bold word on the sheet. `[data-theme='dark'] strong { color: #fbfaf7 }` is what makes
   bold text READ as bold on a dark screen — and on white paper it is white on white. The scoped
   selector outranks it; weight alone carries the emphasis. */
.rps :deep(strong) {
  color: var(--text-primary);
  font-weight: 700;
}
/* Even the three meaning colours a rule can use ({red:}/{blue:}/{green:}) go to ink — they stay
   bold, which is what survives of the emphasis in monochrome. */
.rps :deep(.color-red),
.rps :deep(.color-blue),
.rps :deep(.color-green) { color: var(--text-primary); }

/* A [LETHAL HITS]-style tag: the frame and the monospace are what make it a badge; the wash and
   the accent text are screen colour, and on paper they were the one thing left unbleached. */
.rps :deep(.keyword) {
  background: none;
  color: var(--text-primary);
  border-color: var(--text-primary);
  cursor: default;
}

/* style.css's GLOBAL table dressing, taken off every table in the document at once. The global
   `th` is light text on a dark band — and the paper palette pins the band light while the text
   var stays near-white, which printed the weapon-table headers white on white. The stripes and
   the hover tint are screen furniture; the margin is the prose default, and each table here
   spaces itself. */
.rps :deep(th) {
  background: none;
  color: var(--text-primary);
}
.rps :deep(tr:nth-child(even) td),
.rps :deep(tr:hover td) {
  background: none;
}
.rps :deep(table) { margin: 0; }
</style>
