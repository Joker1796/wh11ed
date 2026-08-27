<!-- `/roster/:id/print` — the print screen. It is a PREVIEW and the document at once: what is on
     screen inside the paper frame is what the printer is handed, at the width it will have
     (`@media print` in style.css only strips the app's chrome and forces the light palette).
     There is deliberately no second "print layout" hidden behind the button — a preview that is
     not the document is a preview that lies.

     THE PANEL is the whole feature: two presets over one list of checkboxes
     (src/data/rosterPrintOptions.js). Touch any box and the preset label becomes "custom" — the
     presets are starting points, not modes, so nobody has to leave one to change their mind about
     stratagem text. Everything, including density and orientation, is remembered.

     THE PAGE COUNT is what makes those controls usable: without it, "denser" is a guess and the
     answer arrives at the printer. It is measured off the rendered document against the printable
     height of the chosen paper, so it moves as boxes are ticked.

     PRINTING ITSELF is the browser's — `window.print()`, no PDF library. The document is text and
     tables, so the browser's own "Save as PDF" produces selectable text at zero cost in bundle
     size, and it works offline. The one place this is not enough is an installed PWA on iOS,
     where WebKit may offer no print at all: there the screen still READS (that is the point of it
     being the document), and the note offers to open the same page in the browser. -->
<template>
  <div class="rpv">
    <template v-if="roster">
      <!-- Screen only: the panel is `display: none` in print. -->
      <div class="rpv-panel">
        <div class="rpv-panel-head">
          <RouterLink :to="`/roster/${roster.id}/view`" class="back">← {{ labels.printBack }}</RouterLink>
          <span class="rpv-pages">{{ labels.printPages.replace('{n}', String(pageCount)) }}</span>
          <button class="btn-primary rpv-print" @click="print">
            <i class="bi bi-printer"></i> {{ labels.printAction }}
          </button>
        </div>

        <div class="rpv-presets">
          <div class="seg">
            <button
              v-for="p in ['compact', 'full']"
              :key="p"
              :class="{ on: preset === p }"
              @click="applyPreset(p)"
            >{{ p === 'compact' ? labels.printPresetCompact : labels.printPresetFull }}</button>
          </div>
          <span v-if="!preset" class="rpv-custom">{{ labels.printPresetCustom }}</span>
        </div>

        <!-- Two groups, and the second one is about a card — so it says nothing at all until
             cards are being printed, rather than offering five settings for a section that is
             not in the document. -->
        <div v-for="g in shownGroups" :key="g.id" class="rpv-group">
          <h3 class="rpv-group-h">{{ g.id === 'what' ? labels.printGroupWhat : labels.printGroupCard }}</h3>
          <label
            v-for="o in g.rows"
            :key="o.id"
            class="check rpv-check"
            :class="{ on: settings[o.id], child: !!o.requires, off: !parentOn(o) }"
          >
            <input type="checkbox" v-model="settings[o.id]" :disabled="!parentOn(o)" />
            <span>
              {{ labels[o.label] }}
              <em v-if="o.hint" class="check-note">{{ labels[o.hint] }}</em>
            </span>
          </label>
        </div>

        <div class="rpv-group rpv-layout">
          <h3 class="rpv-group-h">{{ labels.printGroupLayout }}</h3>
          <div class="seg">
            <button
              v-for="d in PRINT_DENSITIES"
              :key="d.id"
              :class="{ on: settings.density === d.id }"
              @click="settings.density = d.id"
            >{{ labels[DENSITY_LABELS[d.id]] }}</button>
          </div>
          <div class="seg">
            <button
              v-for="o in PRINT_ORIENTATIONS"
              :key="o"
              :class="{ on: settings.orientation === o }"
              @click="settings.orientation = o"
            >{{ o === 'portrait' ? labels.printPortrait : labels.printLandscape }}</button>
          </div>
        </div>

        <p v-if="standalone" class="rpv-note">
          {{ labels.printStandaloneNote }}
          <a :href="href" target="_blank" rel="noopener">{{ labels.printOpenInBrowser }}</a>
        </p>
      </div>

      <!-- The paper. Its width is the printable width of the chosen page, in millimetres, so a
           line breaks on screen exactly where it breaks on the sheet; the horizontal rules are
           where the pages end. -->
      <div ref="paperEl" class="rpv-paper" :class="settings.orientation" :style="paperStyle">
        <div ref="docEl">
          <RosterPrintSheet
            :roster="roster"
            :faction-data="factionData"
            :rules-faction="rulesFaction"
            :detachments="detachments"
            :opts="effectiveOpts"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RosterPrintSheet from '../../components/roster/RosterPrintSheet.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRosters } from '../../composables/useRosters.js'
import { loadRosterFaction } from '../../data/roster/index.js'
import { loadRosterFactionRules, normName } from '../../composables/rosterFactionRules.js'
import { usesAllies } from '../../composables/rosterEngine.js'
import { isStandaloneDisplay } from '../../composables/standalone.js'
import { getItem, setItem } from '../../composables/safeStorage.js'
import {
  PRINT_OPTIONS, PRINT_DENSITIES, PRINT_ORIENTATIONS,
  normalizePrintSettings, presetOf, presetSettings, printOptionOn, printScale,
} from '../../data/rosterPrintOptions.js'

const STORE_KEY = 'wh11ed-roster-print'
const DENSITY_LABELS = { normal: 'printDensityNormal', dense: 'printDensityDense', denser: 'printDensityDenser' }
// A4 and a margin most printers can reach. Both are needed twice: as numbers, to draw the paper
// and to count the sheets, and as CSS, in the @page rule injected below.
const PAGE = { portrait: { w: 210, h: 297 }, landscape: { w: 297, h: 210 } }
const MARGIN_MM = 8
const MM_PX = 96 / 25.4

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { rosterById } = useRosters()

const roster = computed(() => rosterById(route.params.id))
// A print screen for a list that is not there has nothing to say and nothing to print, so it
// leaves rather than drawing an empty page — the same answer /roster/:id/view gives.
watch(roster, (r) => { if (!r) router.replace('/roster') }, { immediate: true })

const settings = reactive(normalizePrintSettings(readStored()))
function readStored() {
  try { return JSON.parse(getItem(STORE_KEY) || 'null') } catch { return null }
}
watch(settings, (s) => setItem(STORE_KEY, JSON.stringify({ ...s })), { deep: true })

const preset = computed(() => presetOf(settings))
function applyPreset(p) { Object.assign(settings, presetSettings(p)) }

const groupRows = computed(() => [
  { id: 'what', rows: PRINT_OPTIONS.filter((o) => o.group === 'what') },
  { id: 'card', rows: PRINT_OPTIONS.filter((o) => o.group === 'card') },
])
const shownGroups = computed(() => groupRows.value.filter((g) => g.id !== 'card' || settings.unitCards))
const parentOn = (o) => !o.requires || !!settings[o.requires]

// The document reads plain booleans: every row is resolved through the table's own parent rule
// once, here, so the sheet can never print a child section of a parent that is off.
const effectiveOpts = computed(() => {
  const out = { density: settings.density, orientation: settings.orientation }
  for (const o of PRINT_OPTIONS) out[o.id] = printOptionOn(settings, o.id)
  return out
})

// ── The data the sheet prints ───────────────────────────────────────────────────────────────
const factionData = ref(null)
watch(() => roster.value?.faction, async (slug) => {
  factionData.value = slug ? await loadRosterFaction(slug, { allies: usesAllies(roster.value) }) : null
}, { immediate: true })

const rulesFaction = ref(null)
const detachmentLookup = ref(new Map())
watch([() => roster.value?.faction, locale], async ([slug, loc]) => {
  if (!slug) return
  const { faction, lookup } = await loadRosterFactionRules(slug, loc)
  if (roster.value?.faction !== slug) return
  rulesFaction.value = faction
  detachmentLookup.value = lookup
}, { immediate: true })

const detachments = computed(() => (roster.value?.detachments || [])
  .map((name) => detachmentLookup.value.get(normName(name)))
  .filter(Boolean))

// ── Paper, and how much of it ───────────────────────────────────────────────────────────────
const page = computed(() => PAGE[settings.orientation] || PAGE.portrait)
const paperStyle = computed(() => {
  const contentH = (page.value.h - MARGIN_MM * 2) * MM_PX
  return {
    '--print-scale': printScale(settings),
    width: `${page.value.w - MARGIN_MM * 2}mm`,
    // The page edges, drawn where the paper actually ends. A gradient rather than elements
    // because the breaks belong to the paper, not to the document — nothing in the sheet has to
    // know they exist.
    backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent ${contentH - 1}px, var(--border) ${contentH - 1}px, var(--border) ${contentH}px)`,
  }
})

const docEl = ref(null)
const paperEl = ref(null)
const pageCount = ref(1)

// The preview is drawn at a fraction of its real size on a narrow screen (`zoom` on the paper),
// and `zoom` scales what getBoundingClientRect reports. Everything measured below is divided by
// this so the maths stays in the paper's own millimetres.
function paperScale() {
  const el = paperEl.value
  if (!el) return 1
  const css = (page.value.w - MARGIN_MM * 2) * MM_PX
  const shown = el.getBoundingClientRect().width
  return shown && css ? shown / css : 1
}

// WHERE THE PAGES ACTUALLY BREAK. A printer will not split a block that says `break-inside:
// avoid` — a unit card, a section — it moves the whole thing to the next sheet and leaves the
// rest of the current one empty. A preview that draws page edges every N millimetres and lets
// content run straight through them is therefore showing pages that will never be printed, which
// is what "the page splitting works strangely" means.
//
// So the same rule is applied here: any block that would straddle an edge, and is short enough to
// fit a page on its own, is pushed down to the next one. The push is a custom property the paper
// only honours ON SCREEN (see the style block) — on paper the printer does its own pagination,
// and a margin baked in on top of it would open a second gap.
function paginate() {
  const root = docEl.value
  if (!root) return
  // A section that holds blocks of its own (the cards) is not an atom; its children are — unless
  // they are in two columns, where a margin pushes a card down its own column rather than onto
  // the next sheet, and the browser's own column/page interaction is past what this estimate can
  // honestly predict. There the cards section is left whole and only the sections around it move.
  const twoUp = !!root.querySelector('.rps-cards.two-up')
  const all = [...root.querySelectorAll('.rps-block, .rpu')]
  // Cleared on EVERYTHING, not just on what is about to be measured: which elements count as
  // atoms changes with the settings, and a push left behind on a card after the cards were put
  // into two columns is a margin inside a column — a card floating half a page down its own
  // column, which is what it looked like.
  for (const el of all) el.style.removeProperty('--page-push')
  const atoms = all.filter((el) => (twoUp ? !el.classList.contains('rpu') : !el.classList.contains('rps-cards')))
  const scale = paperScale()
  const pageH = (page.value.h - MARGIN_MM * 2) * MM_PX
  const top0 = root.getBoundingClientRect().top
  let shift = 0
  for (const el of atoms) {
    const r = el.getBoundingClientRect()
    const top = (r.top - top0) / scale + shift
    const h = r.height / scale
    // Taller than a sheet: nothing to be done, the printer will split it and so do we.
    if (h > pageH) continue
    const room = pageH - (top % pageH)
    if (h <= room) continue
    el.style.setProperty('--page-push', `${room}px`)
    shift += room
  }
}

function measure() {
  paginate()
  const contentH = (page.value.h - MARGIN_MM * 2) * MM_PX
  const h = (docEl.value?.getBoundingClientRect().height || 0) / paperScale()
  pageCount.value = Math.max(1, Math.ceil(h / contentH - 0.02))
}
// Every setting changes the length, and the length is the number the panel promises. Measured
// after the DOM settles, and again on resize because the paper is in millimetres but the browser
// zoom is not.
watch([effectiveOpts, () => settings.density, () => settings.orientation, factionData, rulesFaction],
  () => nextTick(measure), { deep: true, immediate: true })

// ── Printing ────────────────────────────────────────────────────────────────────────────────
const standalone = ref(false)
const href = ref('')
// The @page rule cannot be written by a class — the size is per-document — so the orientation is
// the one thing this screen injects into the head, and takes back out when it leaves.
let styleEl = null
function applyPageRule() {
  if (!styleEl) return
  styleEl.textContent = `@page { size: A4 ${settings.orientation}; margin: ${MARGIN_MM}mm; }`
}
onMounted(() => {
  standalone.value = isStandaloneDisplay()
  href.value = typeof location !== 'undefined' ? location.href : ''
  styleEl = document.createElement('style')
  document.head.appendChild(styleEl)
  applyPageRule()
  window.addEventListener('resize', measure)
  measure()
})
watch(() => settings.orientation, applyPageRule)
onBeforeUnmount(() => {
  window.removeEventListener('resize', measure)
  styleEl?.remove()
  styleEl = null
})

function print() { window.print() }
</script>

<style scoped>
.rpv { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 1rem 0.5rem 2rem; }

/* ── The panel (screen only) ───────────────────────────────────────────────────────────────── */
.rpv-panel {
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0.8rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
}
.rpv-panel-head { display: flex; align-items: center; gap: 0.6rem; }
.rpv-panel-head .back { margin: 0; }
.rpv-pages { margin-left: auto; color: var(--text-muted); font-size: 0.82rem; font-variant-numeric: tabular-nums; }
.rpv-print { white-space: nowrap; }

.rpv-presets { display: flex; align-items: center; gap: 0.6rem; }
.rpv-custom { color: var(--text-dim); font-size: 0.78rem; }

.rpv-group { display: flex; flex-direction: column; gap: 0.3rem; }
.rpv-group-h {
  margin: 0.2rem 0 0;
  color: var(--text-muted);
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
/* A row that hangs off another one is indented under it, and greys out with it rather than
   disappearing — the same rule the tracker's option table follows. */
.rpv-check.child { padding-left: 1.1rem; }
.rpv-check.off { opacity: 0.55; }
.rpv-layout { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
.rpv-layout .rpv-group-h { width: 100%; }
.rpv-note { margin: 0; color: var(--text-dim); font-size: 0.78rem; }

/* ── The paper ─────────────────────────────────────────────────────────────────────────────── */
/* The push a block gets when it would otherwise straddle a page edge (see paginate()). Screen
   only: on paper the printer paginates for itself, and this margin on top of that would leave a
   blank sheet between the two. */
@media screen {
  .rpv-paper :deep(.rps-block),
  .rpv-paper :deep(.rpu) {
    margin-top: var(--page-push, 0);
  }
}

.rpv-paper {
  /* White in both themes, because that is what it is: paper. The document inside it is drawn
     with the app's own tokens, so they are pinned to their light values here — a card printed in
     dark-theme colours is a card nobody can read on a sheet. */
  --bg-primary: #ffffff;
  --bg-secondary: #ffffff;
  --bg-card: #ffffff;
  --bg-insert: #f2f2f2;
  --text-primary: #101014;
  --text-muted: #3a3a42;
  --text-dim: #55555f;
  --border: #b9b9c2;
  background-color: #ffffff;
  color: var(--text-primary);
  padding: 0;
  box-shadow: 0 0 0 1px var(--border);
  max-width: 100%;
  overflow: hidden;
}

/* Below the paper's own width there is nothing to be done but let it scale down: the sheet is a
   fixed physical size, and squeezing the preview is more honest than reflowing it into a layout
   the printer will not use. */
@media (max-width: 820px) {
  .rpv-paper { zoom: 0.62; }
}
@media (max-width: 560px) {
  .rpv-paper { zoom: 0.42; }
}
</style>
