// Splitting a chapter's subsections into full-width blocks and two-column groups.
//
// Not a composable — a pure helper (same as stratagemPhases.js / trackerLayout.js).
//
// Why this happens in JS and not in CSS: `column-span: all` only works on a DIRECT child
// of the multicol container, and an image sitting inside a rule's body can never break out
// of its own column at all. So anything that needs the full width is lifted OUT of the
// column group here, at chunking time.
//
// The "wide" test is computed from the existing data — no `src/data/*` edits are needed.

// A body line that is an inline image, e.g. `[img:/images/turn/x.webp|alt]`. Catches the
// RU phase banners in 07.02 and the inline diagrams elsewhere.
const IMG_LINE = /^\s*\[img:/m

export function isWideSubsection(sub) {
  if (!sub) return false
  if (sub.illustration || sub.image || sub.sideImage) return true
  return !!sub.body && IMG_LINE.test(sub.body)
}

// Split `subs` into a flat list of render groups, preserving order:
//   { type: 'columns', key, items: [sub, …] }  → render inside `.rule-columns`
//   { type: 'full',    key, item: sub }        → render at full width, breaking the columns
//
// Always full-width, so they act as the logical topic/sub-topic dividers that open a new
// column group: SectionTocBlock entries (`!sectionNum`), GroupLabelBlock (`isGroupLabel`)
// and any wide subsection. `isFull(sub)` adds a chapter's own cases — a subsection that a
// full-width special block (wound table, battle-size table) is rendered right after.
export function chunkSubsections(subs, isFull) {
  const out = []
  let run = null
  for (const sub of subs) {
    const full = !sub.sectionNum
      || sub.isGroupLabel
      || isWideSubsection(sub)
      || (isFull ? isFull(sub) : false)
    if (full) {
      run = null
      out.push({ type: 'full', key: 'f-' + sub.id, item: sub })
    } else {
      if (!run) {
        run = { type: 'columns', key: 'c-' + sub.id, items: [] }
        out.push(run)
      }
      run.items.push(sub)
    }
  }
  // A group of one would render half-width with an empty column beside it — that's not a
  // two-column layout, just a narrowed block. Such runs go back to full width.
  return out.map((g) =>
    g.type === 'columns' && g.items.length === 1
      ? { type: 'full', key: g.key, item: g.items[0] }
      : g
  )
}
