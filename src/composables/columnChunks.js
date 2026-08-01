// Splitting a chapter's subsections into full-width blocks and two-column groups.
//
// Not a composable — a pure helper (same as stratagemPhases.js / trackerLayout.js).
//
// Why this happens in JS and not in CSS: `column-span: all` only works on a DIRECT child
// of the multicol container, and an image sitting inside a rule's body can never break out
// of its own column at all. So anything that needs the full width is lifted OUT of the
// column group here, at chunking time.
//
// Illustrations/side images/tables are NOT auto-wide by default — they render inside a
// column same as plain text (the chapter templates pass sideImage/illustration/image
// through their `columns` branch too, not just `full`). `sub.wide: true` is the manual
// opt-out for the cases a visual pass decides genuinely need the full measure.

export function isWideSubsection(sub) {
  return !!(sub && sub.wide)
}

// A subsection can carry `splitBody` (one trailing chunk of markup, typically a stacked
// [img:] group) or `splitBodies` (several independent chunks, e.g. one entry per image) —
// content that reads fine glued to its own body in a single-column page, but as ONE column
// item can make that item disproportionately tall next to its neighbours (a multi-image
// stack under a couple of paragraphs), throwing off the two columns' balance. Several
// smaller tails (`splitBodies`) balance better than one big one: each becomes its OWN
// column item, so the browser's balance algorithm can interleave them individually instead
// of moving one tall block as a unit. `splitBodyEntries` computes the `{ id, body }` pairs
// (shared with useSearch.js, so search results and h4 anchors use the same ids);
// `splitSubsections` turns them into synthetic sibling items — `isSplitBlock: true`, no
// title/header of its own — for `chunkSubsections`. Chapter templates render `isSplitBlock`
// items as a bare `RuleBody`, no `RuleBlock` chrome. Call `splitSubsections` on
// `section.subsections` before `chunkSubsections`.
export function splitBodyEntries(sub) {
  const tails = sub.splitBodies || (sub.splitBody ? [sub.splitBody] : [])
  return tails.map((body, i) => ({
    id: sub.id + '-split' + (tails.length > 1 ? i + 1 : ''),
    body,
  }))
}

export function splitSubsections(subs) {
  const out = []
  for (const sub of subs) {
    out.push(sub)
    for (const { id, body } of splitBodyEntries(sub)) {
      out.push({ id, sectionNum: sub.sectionNum, isSplitBlock: true, body })
    }
  }
  return out
}

// Split `subs` into a flat list of render groups, preserving order:
//   { type: 'columns', key, items: [sub, …] }  → render inside `.rule-columns`
//   { type: 'full',    key, item: sub }        → render at full width, breaking the columns
//
// Always full-width, so they act as the logical topic/sub-topic dividers that open a new
// column group: SectionTocBlock entries (`!sectionNum`), GroupLabelBlock (`isGroupLabel`)
// and any subsection explicitly marked `wide`. `isFull(sub)` adds a chapter's own cases —
// a subsection that a full-width special block (wound table, battle-size table) is
// rendered right after.
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
