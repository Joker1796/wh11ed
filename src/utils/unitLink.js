// Which unit of THIS faction a click on a link is going to, when the screen would rather show it in
// place than navigate: the faction's unit list opens it in a modal (phone) or beside the list
// (desktop), and a unit shown that way swaps itself for the unit its Leader line or keyword list
// names. Read off the link's own href, so every link that already exists — a `RouterLink` in
// `DatasheetCard`, a row of `KeywordUnitsModal`, a chip of the grid — is caught without knowing
// about it.
//
// Called from a CAPTURE listener: that runs before `RouterLink`'s own click handler, which skips a
// click whose default is already prevented. A click the browser should keep (a modifier, a middle
// button, a new tab) and a button inside a link (the grid chip's pin and collection marks) return
// null and go their usual way.
const UNIT_PATH = /^(?:\/ru)?\/factions\/([^/]+)\/datasheets\/([^/]+)\/?$/

export function unitLinkOf(e, slug) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null
  const target = e.target instanceof Element ? e.target : null
  if (!target || target.closest('button')) return null
  const a = target.closest('a[href]')
  if (!a || a.target === '_blank') return null
  const m = new URL(a.href, location.href).pathname.match(UNIT_PATH)
  return m && m[1] === slug ? decodeURIComponent(m[2]) : null
}
