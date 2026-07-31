// Splitting Event Companion prose blocks into full-width and two-column groups — the
// Event Companion analogue of columnChunks.js. Blocks here (the `sequence.blocks` /
// `pairings.blocks` / `teams.blocks` shape from eventCompanion.js) carry no `sectionNum`
// at all, so the Core Rules chunker (keyed on it — `!sub.sectionNum` reads as "always
// full") can't be reused as-is: every Event block would come out full-width and columning
// would silently stay off.
//
// A block counts as "wide" when it carries its own DataTable — the same rule Core Rules
// uses for its wound/battle-size tables, just applied at block level instead of chapter
// level (Sequence/Teams blocks with `block.table` render a DataTable right after them).

export function chunkBlocks(blocks, isWide = (b) => !!b.table) {
  const out = []
  let run = null
  for (const block of blocks) {
    if (isWide(block)) {
      run = null
      out.push({ type: 'full', key: 'f-' + block.id, item: block })
    } else {
      if (!run) {
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
