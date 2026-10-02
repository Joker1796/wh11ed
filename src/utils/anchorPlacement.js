// Where a popover anchored to a word in the text goes: under the word, or over it when there is
// too little room below and more above; never past either edge of the screen. One answer for the
// glossary popover (KeywordPopover) and the faction keyword's unit list (KeywordUnitsModal), so
// the two open from a word in the same way.
// `cap` adds the max-height that keeps a list's own scroll on screen.
export function placeByAnchor(rect, { width = 360, minBelow = 220, gap = 8, cap = false } = {}) {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const w = Math.min(width, vw - 16)
  const style = { width: `${w}px`, left: `${Math.max(8, Math.min(rect.left, vw - w - 8))}px` }
  const below = vh - rect.bottom
  if (below < minBelow && rect.top > below) {
    style.bottom = `${vh - rect.top + gap}px`
    if (cap) style.maxHeight = `${rect.top - gap - 8}px`
  } else {
    style.top = `${rect.bottom + gap}px`
    if (cap) style.maxHeight = `${below - gap - 8}px`
  }
  return style
}
