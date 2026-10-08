// A block of tabs switching what is under them in place (a side's missions, a side's stratagems, an
// army's card, an army's list): the tabs stand, what they show fades in (owner, 2026-09-30: "the
// content appears sharply, not with a fade", and a card coming up without its data jumped the
// page). The content is usually kept built (v-show) or re-rendered in place, so there is no
// <Transition> to hang a fade on — the new content is faded with the Web Animations API instead,
// timed off --motion-swap (0 under reduced motion: no animation at all). From further down the
// page the tabs are put back under the header first, as the tracker's own tab strip does — a
// shorter block would otherwise leave the browser to clamp the scroll mid-swap. Both moves glide
// now (owner, 2026-10-08: the screen leapt up): the page keeps its height through the swap and
// travels to the tabs or to the new foot, whichever is higher (settleScroll.js).
import { nextTick, watch } from 'vue'
import { tabsOffset } from './bringTabsIntoView.js'
import { hold, settle } from './settleScroll.js'

function duration() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--motion-swap').trim()
  return v.endsWith('ms') ? parseFloat(v) : (parseFloat(v) || 0) * 1000
}

// `source` — what switches (a getter or ref); `targets` — a function returning the element(s) now
// showing, called after the DOM has updated.
export function useSwapFade(source, targets) {
  // The default `pre` flush runs this before the DOM changes: the height is held from there.
  watch(source, async () => {
    hold()
    await nextTick()
    const ms = duration()
    const els = [targets()].flat().filter((el) => el instanceof Element)
    settle(ms, els.length ? tabsOffset(els[0]) : 0)
    if (!els.length || !ms || typeof els[0].animate !== 'function') return
    for (const el of els) el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: ms, easing: 'ease-in-out' })
  })
}
