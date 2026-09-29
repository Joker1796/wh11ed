import { nextTick, onMounted, onUnmounted } from 'vue'

// A screen that fills the window instead of scrolling the page: its `.rw-host` (style.css) is a
// flex column whose height is the window minus what stands above it and what the page keeps
// under it. Those two lengths are measured here and handed to the host as CSS variables; the
// roster builder's workbench and the rosters desk (RosterDeskView) both stand on it.
//
// Where the screen's root starts, in document space (--rw-top: the navbar, an update banner, the
// page's top padding — whatever is above it), and how much the page keeps under it (--rw-below:
// the root's own bottom margin plus the paddings of everything up to and including
// `.main-content`, which is where App.vue reserves the fixed bars' room). Both handed to the
// root as CSS variables; its height is the window minus the two. Neither changes while the user
// works inside the screen — only on resize, or when something above the screen appears or goes
// (the update banner), which the body's or `.main-content`'s size reports. Written only when
// changed. --rw-below is summed from computed styles, never read off the boxes: `.main-content`
// can be as tall as the window on a short page, and measuring against its edge fed the root's
// own height back into itself.
//
// `elRef`: an element inside the host (or the host itself). Returns `measure`, for a caller whose
// own layout switch moves the host.
export function useViewportFill(elRef) {
  let observer = null
  let frame = 0
  function hostOf(el) { return el?.closest('.rw-host') || el }
  // measure() writes --rw-top / --rw-below on the host, which can move the very boxes the observer
  // watches. Doing that INSIDE the observer's callback is a layout change in the same frame the
  // browser is still delivering, which it reports as "ResizeObserver loop completed with undelivered
  // notifications" — harmless (the write is skipped once the values stop changing, so it settles in
  // one pass), but it is a window error, and the bug-report form ships the last ten of those, where
  // it buried the real ones in every roster report of 2026-09-21. One frame later is the same
  // measurement with nothing to report.
  function measureNextFrame() {
    if (frame) return
    frame = requestAnimationFrame(() => { frame = 0; measure() })
  }
  function measure() {
    const host = hostOf(elRef.value)
    if (!host) return
    const top = `${Math.round(host.getBoundingClientRect().top + window.scrollY)}px`
    if (host.style.getPropertyValue('--rw-top') !== top) host.style.setProperty('--rw-top', top)
    const main = host.closest('.main-content')
    if (!main) return
    let px = 0
    for (let n = host; n && n !== main.parentElement; n = n.parentElement) {
      const cs = getComputedStyle(n)
      px += parseFloat(cs.marginBottom) || 0
      if (n !== host) px += (parseFloat(cs.paddingBottom) || 0) + (parseFloat(cs.borderBottomWidth) || 0)
    }
    const below = `${Math.ceil(px)}px`
    if (host.style.getPropertyValue('--rw-below') !== below) host.style.setProperty('--rw-below', below)
  }
  onMounted(() => {
    measure()
    // App.vue puts its `--desk` class and the bar's --roster-sticky-h on the page in its own
    // render, which can land after this mount — measure once more when that has settled.
    nextTick(measure)
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measureNextFrame)
      observer.observe(document.body)
      // Border box: the reserve under the screen is `.main-content`'s padding, and a padding
      // change does not move the content box the observer watches by default.
      const main = elRef.value?.closest('.main-content')
      if (main) observer.observe(main, { box: 'border-box' })
    }
    window.addEventListener('resize', measure)
  })
  onUnmounted(() => {
    observer?.disconnect()
    if (frame) cancelAnimationFrame(frame)
    window.removeEventListener('resize', measure)
  })
  return { measure }
}
