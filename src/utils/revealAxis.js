// Which way a block that appears (or leaves) should open — ExpandTransition's `axis="auto"`.
//
// The answer is the layout the block lands in, read at the moment it enters or leaves, so one piece
// of markup moves correctly wherever it is used: the roster's custom-limit sliders open sideways in
// the desk's settings line and downwards in the phone's form; a DP count opens sideways inside its
// label on both. Read each time rather than once, because a resize can turn a row into a column
// while the block is on screen.
//
//   'x'    — it stands in a line: a flex row, or inline among text. Its width opens and the
//            neighbours after it slide aside.
//   'y'    — it stands in a stack: a flex column, a grid, ordinary blocks. Its height opens and what
//            is below slides down.
//   'both' — a flex row that wraps: the block may sit at the end of a line or start a new one, so
//            both its width and its height open.
//
// `requested` other than 'auto' is the caller's word and wins.
export function revealAxis(el, requested = 'auto') {
  if (requested && requested !== 'auto') return requested
  if (!el || typeof getComputedStyle !== 'function') return 'y'
  const own = getComputedStyle(el).display
  if (own.startsWith('inline')) return 'x'
  let parent = el.parentElement
  // `display: contents` draws no box of its own: the layout that counts is the next one up.
  while (parent && getComputedStyle(parent).display === 'contents') parent = parent.parentElement
  if (!parent) return 'y'
  const cs = getComputedStyle(parent)
  if (cs.display === 'flex' || cs.display === 'inline-flex') {
    if (cs.flexDirection.startsWith('column')) return 'y'
    return cs.flexWrap === 'nowrap' ? 'x' : 'both'
  }
  return 'y'
}

// The gap the flex or grid container leaves beside the block, along `axis` ('x' | 'y') — it is
// there however small the block gets, so a block opening from nothing must also take it back, or
// the neighbours finish their slide with a jump of exactly that much. Zero outside such a container
// and for a block with no sibling to be apart from.
export function revealGap(el, axis) {
  let parent = el?.parentElement
  while (parent && getComputedStyle(parent).display === 'contents') parent = parent.parentElement
  if (!parent) return 0
  const cs = getComputedStyle(parent)
  if (!/flex|grid/.test(cs.display)) return 0
  const raw = axis === 'x' ? cs.columnGap : cs.rowGap
  const gap = parseFloat(raw)
  if (!Number.isFinite(gap) || gap <= 0) return 0
  const hasSibling = !!(el.previousElementSibling || el.nextElementSibling)
  return hasSibling ? gap : 0
}
