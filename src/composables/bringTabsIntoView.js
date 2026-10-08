import { instantly } from './useRefNavigation.js'

// For a tab switch's <Transition mode="out-in"> `@enter`: the new panel is in the document but still invisible, and
// the old one is gone — nothing on screen to jump. (Not after-leave: the old panel is already
// detached there and the document at its shortest.) If the reader had scrolled the tab strip
// up under the header (deep into a long tab), put it back just below the header, so the new tab
// opens at its start — instead of the browser clamping the scroll to a shorter panel mid-swap,
// which threw the page by hundreds of px (2026-09-28). Instant, like every programmatic scroll
// that is not the reader's own jump.
export function bringTabsIntoView(entering) {
  const by = tabsOffset(entering)
  if (by) instantly(() => window.scrollBy(0, by))
}

// How far up the page has to go for that (negative px), 0 when the strip is in view — for a caller
// that moves the page itself (useSwapFade glides it).
export function tabsOffset(entering) {
  let host = entering?.parentElement
  while (host && !host.querySelector(':scope > .page-tabs, :scope > * > .page-tabs')) host = host.parentElement
  return stripOffset(host?.querySelector('.page-tabs'))
}

// The same for any strip of controls: how far up to bring it just below the header, 0 if in view.
export function stripOffset(strip) {
  if (!strip) return 0
  const header = Math.max(0, ...[...document.querySelectorAll('.navbar, .subnav')].map((h) => h.getBoundingClientRect().bottom))
  const top = strip.getBoundingClientRect().top
  return top < header ? top - header - 8 : 0
}
