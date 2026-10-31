// Splitting Event Companion prose blocks into full-width and two-column groups — the
// Event Companion analogue of columnChunks.js. Blocks here (the `sequence.blocks` /
// `pairings.blocks` / `teams.blocks` shape from eventCompanion.js) carry no `sectionNum`
// at all, so the Core Rules chunker (keyed on it — `!sub.sectionNum` reads as "always
// full") can't be reused as-is: every Event block would come out full-width and columning
// would silently stay off.
//
// A block carrying its own DataTable (`block.table`) is NOT auto-wide by default anymore —
// it renders inside a column same as plain text (Sequence/Teams' `columns` branch renders
// the DataTable per-item, not just their `full` branch). `block.wide: true` is the manual
// opt-out for the cases a visual pass decides genuinely need the full measure.
//
// `block.newRun: true` starts a new two-column group at that block: a long chapter read as one
// flow runs down a whole screen-height column and back up the next (Dominatus' booklet, owner
// 2026-10-31), so it is cut where the source starts a new section.

export function chunkBlocks(blocks, isWide = (b) => !!b.wide) {
  const out = []
  let run = null
  for (const block of blocks) {
    if (isWide(block)) {
      run = null
      out.push({ type: 'full', key: 'f-' + block.id, item: block })
    } else {
      if (!run || block.newRun) {
        run = { type: 'columns', key: 'c-' + block.id, items: [] }
        out.push(run)
      }
      run.items.push(block)
    }
  }
  // A group of one would render half-width with an empty column beside it — not a
  // two-column layout, just a narrowed block. Such runs go back to full width (same rule
  // as columnChunks.js).
  return out.map((g) =>
    g.type === 'columns' && g.items.length === 1
      ? { type: 'full', key: g.key, item: g.items[0] }
      : g
  )
}
