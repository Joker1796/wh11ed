// What goes on the paper — one table, read by the print screen's checkbox list, by its two
// presets, and by the sheet that renders the document. Same idiom as trackerOptions.js, and for
// the same reason: a row offered in the panel and a branch in the document are the same decision,
// so they are written once.
//
// A row is:
//   id        stable key (the setting field, the test, the label lookup)
//   group     'what' — a section of the booklet | 'card' — how a unit's card is printed
//   label     ui.js key, the checkbox's caption
//   hint      ui.js key | null, one line under it saying what it costs in paper or in truth
//   requires  another row's id this one hangs off; off there is off here, whatever this says
//   compact   its value in the "one or two sheets" preset
//   full      its value in the "whole booklet" preset
//
// THE TWO PRESETS ARE THE SAME LIST. "Compact" and "Full" are not two documents — they are two
// settings of one, which is why a reader can start from either and change their mind about a
// single row without leaving the preset behind (the panel then says "custom" and prints exactly
// what the boxes say).
//
// WHY THESE ROWS AND NOT OTHERS. Everything here is something a player might genuinely not want
// on paper — because they know it by heart, because it costs a sheet, or because the sheet is
// going to be read by an opponent who expects the printed datasheet. Nothing here can make the
// document say something FALSE: turning modifiers off prints the printed numbers, not wrong ones,
// and the rules that would have changed them are still in the booklet.
export const PRINT_OPTIONS = [
  // ── Sections of the booklet ────────────────────────────────────────────────────────────────
  {
    // The list itself. It is the one section that is not reference — it is the ARMY: what you
    // check the models against while setting up, what an opponent can read across the table, and,
    // in a booklet, the contents page for the cards behind it. (Organisers get the list as a file,
    // in advance; nobody is handed paper at the door.) Mid-game it says little a player does not
    // already know, which is exactly why it can be turned off.
    id: 'rosterList',
    group: 'what',
    label: 'printOptRosterList',
    hint: 'printOptRosterListHint',
    compact: true,
    full: true,
  },
  {
    id: 'points',
    group: 'what',
    label: 'printOptPoints',
    hint: 'printOptPointsHint',
    compact: true,
    full: true,
  },
  {
    id: 'armyRule',
    group: 'what',
    label: 'printOptArmyRule',
    hint: null,
    compact: true,
    full: true,
  },
  {
    id: 'detachmentRules',
    group: 'what',
    label: 'printOptDetachmentRules',
    hint: null,
    compact: true,
    full: true,
  },
  {
    id: 'enhancements',
    group: 'what',
    label: 'printOptEnhancements',
    hint: 'printOptEnhancementsHint',
    compact: true,
    full: true,
  },
  {
    id: 'stratagems',
    group: 'what',
    label: 'printOptStratagems',
    hint: null,
    compact: true,
    full: true,
  },
  {
    // The single biggest lever on length after the cards themselves: the name, its cost and its
    // window fit one line, the effect does not.
    id: 'stratagemText',
    group: 'what',
    label: 'printOptStratagemText',
    hint: 'printOptStratagemTextHint',
    requires: 'stratagems',
    compact: false,
    full: true,
  },
  {
    id: 'unitCards',
    group: 'what',
    label: 'printOptUnitCards',
    hint: 'printOptUnitCardsHint',
    compact: false,
    full: true,
  },

  // ── How a unit's card is printed ───────────────────────────────────────────────────────────
  {
    // The three tiers of the overlay, offered as two switches (see src/components/roster/CLAUDE.md):
    // off = the printed datasheet, `trim` = the sheet this entry actually fields, `modifiers` =
    // its numbers as the roster's rules leave them, each marked and attributed under the card.
    id: 'modifiers',
    group: 'card',
    label: 'printOptModifiers',
    hint: 'printOptModifiersHint',
    requires: 'unitCards',
    compact: true,
    full: true,
  },
  {
    id: 'possible',
    group: 'card',
    label: 'printOptPossible',
    hint: 'printOptPossibleHint',
    requires: 'unitCards',
    compact: false,
    full: true,
  },
  {
    id: 'trim',
    group: 'card',
    label: 'printOptTrim',
    hint: 'printOptTrimHint',
    requires: 'unitCards',
    compact: true,
    full: true,
  },
  {
    id: 'choices',
    group: 'card',
    label: 'printOptChoices',
    hint: 'printOptChoicesHint',
    requires: 'unitCards',
    compact: false,
    full: false,
  },
  {
    id: 'pageBreak',
    group: 'card',
    label: 'printOptPageBreak',
    hint: 'printOptPageBreakHint',
    requires: 'unitCards',
    compact: false,
    full: false,
  },
]

// How hard the type is squeezed. One multiplier drives every size, line-height and gap on the
// sheet (`--print-scale`), so the three steps stay proportional instead of each needing its own
// stylesheet. The floor is deliberate: below ~0.8 an 8pt table is 6pt, which reads on a screen
// and disappears on an inkjet.
export const PRINT_DENSITIES = [
  { id: 'normal', scale: 1 },
  { id: 'dense', scale: 0.92 },
  { id: 'denser', scale: 0.84 },
]

export const PRINT_ORIENTATIONS = ['portrait', 'landscape']

export const DEFAULT_PRINT_SETTINGS = { density: 'normal', orientation: 'portrait' }

// The preset, as settings. `preset` is the field name on each row, which is what keeps the table
// and the presets from ever falling out of step: adding a row means answering both.
export function presetSettings(preset) {
  const out = { ...DEFAULT_PRINT_SETTINGS }
  for (const o of PRINT_OPTIONS) out[o.id] = !!o[preset === 'full' ? 'full' : 'compact']
  return out
}

// Which preset these settings ARE, or null for a set the reader built themselves. Compared on the
// rows only — density and orientation are not part of what makes a document compact or full, and
// a reader who squeezed the type has not left the preset.
export function presetOf(settings) {
  for (const preset of ['compact', 'full']) {
    const want = presetSettings(preset)
    if (PRINT_OPTIONS.every((o) => !!settings?.[o.id] === want[o.id])) return preset
  }
  return null
}

// A row's effective value: a row whose parent is off is off, whatever it says itself. Every reader
// of a setting goes through this, so the panel and the document cannot disagree about a child row.
export function printOptionOn(settings, id) {
  const row = PRINT_OPTIONS.find((o) => o.id === id)
  if (!row) return false
  if (row.requires && !printOptionOn(settings, row.requires)) return false
  return !!settings?.[id]
}

// What was stored last time, made safe: an unknown density, a missing row (this table grew) or a
// stored value of the wrong shape falls back to the compact preset's answer rather than to
// `undefined`, which would print a section nobody asked for.
export function normalizePrintSettings(saved) {
  const base = presetSettings('compact')
  const out = { ...base }
  if (saved && typeof saved === 'object') {
    for (const o of PRINT_OPTIONS) if (typeof saved[o.id] === 'boolean') out[o.id] = saved[o.id]
    if (PRINT_DENSITIES.some((d) => d.id === saved.density)) out.density = saved.density
    if (PRINT_ORIENTATIONS.includes(saved.orientation)) out.orientation = saved.orientation
  }
  return out
}

// ── The paper itself ─────────────────────────────────────────────────────────────────────────
// A4, and a margin most printers can reach. Written once, read three ways: as millimetres for
// the page boxes and the injected `@page` rule, and as pixels for deciding what fits on a sheet.
export const PRINT_PAGE = { portrait: { w: 210, h: 297 }, landscape: { w: 297, h: 210 } }
export const PRINT_MARGIN_MM = 8
export const MM_PX = 96 / 25.4

// The page boxes are cut a couple of pixels short of the printable height: mm→px conversion
// rounds, and a box that overruns the page area by a rounded hair pushes every page after it
// half onto the next sheet — the classic interleaved-blank-pages failure.
const PRINT_PAGE_SLACK_PX = 2

export function printPageWidthMm(orientation) {
  const p = PRINT_PAGE[orientation] || PRINT_PAGE.portrait
  return p.w - PRINT_MARGIN_MM * 2
}

export function printPageHeightPx(orientation) {
  const p = PRINT_PAGE[orientation] || PRINT_PAGE.portrait
  return (p.h - PRINT_MARGIN_MM * 2) * MM_PX - PRINT_PAGE_SLACK_PX
}

// HOW THE DOCUMENT BECOMES PAGES. The sheet renders its whole content once, unpaginated, in a
// hidden measuring flow; every indivisible piece of it — a heading, a rule, a row of the list, a
// pair of stratagem cards, a unit card — is a UNIT with a measured `top` and `bottom` in that
// flow. This walks the units in order and deals them out onto pages of `pageH`, so the pages the
// preview then draws are real boxes with the content INSIDE them: there is nothing left for the
// browser's own print fragmentation to decide, which is the only way the preview and the printer
// can agree by construction rather than by simulation.
//
// A unit is `{ block, index, top, bottom, keepWithNext?, breakBefore? }`:
//   block         which section of the document it belongs to (fragments are per-block)
//   index         its position within that block
//   keepWithNext  a heading: never left as the last unit of a page — it moves forward with the
//                 unit it heads (chains, for a section heading over a phase heading)
//   breakBefore   always starts a fresh page (the per-card page-break option)
//
// `overheads[block]` is what a CONTINUATION of that block costs at the top of a page — the list
// table repeats its header row on every page it runs onto, and those pixels are not in the
// measured flow.
//
// A unit taller than a whole page gets a page of its own, flagged `spill`: the caller lets that
// one box grow and the printer runs it over two sheets — text is never clipped to make the
// arithmetic look right.
//
// Returns [{ fragments: [{ block, from, to }], spill }] — consecutive units regrouped per block,
// which is what the sheet re-renders inside each page box.
export function paginatePrint(units, pageH, { overheads = {}, maxPages = 300 } = {}) {
  if (!(pageH > 0) || !units?.length) return []
  const pages = []
  let i = 0
  while (i < units.length && pages.length < maxPages) {
    const startTop = units[i].top
    const overhead = units[i].index > 0 ? overheads[units[i].block] || 0 : 0
    let j = i + 1
    while (j < units.length) {
      const u = units[j]
      // A break-before unit ends the page — unless everything placed so far is headings pulled
      // forward to accompany it, in which case this IS its page.
      if (u.breakBefore && !units.slice(i, j).every((x) => x.keepWithNext)) break
      if (u.bottom - startTop + overhead > pageH) break
      j++
    }
    // A heading stripped of what it heads moves forward with it (and a heading over that heading
    // follows too). Never empties the page: the walk above always placed at least one unit.
    while (j - i > 1 && j < units.length && units[j - 1].keepWithNext) j--
    const spill = j === i + 1 && units[i].bottom - startTop + overhead > pageH
    pages.push({ fragments: fragmentsOf(units, i, j), spill })
    i = j
  }
  return pages
}

// Consecutive units of one block collapse into a `{ block, from, to }` range — the shape the
// sheet's fragment renderer takes.
function fragmentsOf(units, from, to) {
  const out = []
  for (let k = from; k < to; k++) {
    const u = units[k]
    const last = out[out.length - 1]
    if (last && last.block === u.block) last.to = u.index + 1
    else out.push({ block: u.block, from: u.index, to: u.index + 1 })
  }
  return out
}

export function printScale(settings) {
  return (PRINT_DENSITIES.find((d) => d.id === settings?.density) || PRINT_DENSITIES[0]).scale
}
