import { instantly } from './useRefNavigation.js'

// For a tab switch's <Transition mode="out-in"> `@enter`: the new panel is in the document but still invisible, and
// the old one is gone — nothing on screen to jump. (Not after-leave: the old panel is already
// detached there and the document at its shortest.) If the reader had scrolled the tab strip
// up under the header (deep into a long tab), put it back just below the header, so the new tab
// opens at its start — instead of the browser clamping the scroll to a shorter panel mid-swap,
// which threw the page by hundreds of px (2026-09-28). Instant, like every programmatic scroll
// that is not the reader's own jump.
export function bringTabsIntoView(entering) {
  let host = entering?.parentElement
  while (host && !host.querySelector(':scope > .page-tabs, :scope > * > .page-tabs')) host = host.parentElement
  const strip = host?.querySelector('.page-tabs')
  if (!strip) return
  const header = Math.max(0, ...[...document.querySelectorAll('.navbar, .subnav')].map((h) => h.getBoundingClientRect().bottom))
  const top = strip.getBoundingClientRect().top
  if (top < header) instantly(() => window.scrollBy(0, top - header - 8))
}
