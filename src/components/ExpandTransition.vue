<template>
  <Transition
    :css="false"
    :mode="mode"
    @enter="enter"
    @leave="leave"
  >
    <slot />
  </Transition>
</template>

<script setup>
// A block that APPEARS — a `v-if` answer to a choice made elsewhere (the "taken off / put back"
// line, a custom-points panel, an import report, a field joining a settings line) — opens from
// nothing and closes back to it, so its neighbours slide out of its way and back instead of jumping
// (owner, 2026-10-03: "the room has to open by the neighbour sliding, and close the same way — for
// every field that appears"). The sibling of CollapseTransition, which folds content that always
// exists (an accordion, driven by `:show`); this one is for content that does not exist until it
// does. Usage: <ExpandTransition><p v-if="x">…</p></ExpandTransition>; a v-if / v-else chain
// inside needs a `key` per branch and usually `mode="out-in"`.
//
// `axis` — which way it opens. `auto` (the default) reads the layout it lands in, each time
// (utils/revealAxis.js): sideways in a row or among text, downwards in a stack, both in a row that
// wraps. So the same markup opens sideways in the desk's settings line and downwards in the phone's
// form. `x`, `y` and `both` are there for a place where the reading is wrong.
//
// Web Animations on the element's own box — its size along the axis, the padding and margins on
// that axis, and the container's gap beside it (which stays however small the block gets, so it is
// taken back with a negative margin) — from 0 to what it measures now; one read per enter, on small
// blocks, never on a long list (CollapseTransition's grid trick is for that). `--motion-med`, so
// reduced motion skips it.
import { motionMs } from '../composables/motionToken.js'
import { revealAxis, revealGap } from '../utils/revealAxis.js'

const props = defineProps({
  mode: { type: String, default: undefined },
  axis: { type: String, default: 'auto' },
})

const SIDES = {
  y: { size: 'height', measure: 'offsetHeight', box: ['paddingTop', 'paddingBottom', 'marginTop', 'marginBottom'], gapAt: 'marginBottom' },
  x: { size: 'width', measure: 'offsetWidth', box: ['paddingLeft', 'paddingRight', 'marginLeft', 'marginRight'], gapAt: 'marginRight' },
}

// The two frames, open and closed, along every axis this reveal moves on.
function frames(el, axes) {
  const cs = getComputedStyle(el)
  const open = { opacity: 1 }
  const shut = { opacity: 0 }
  for (const a of axes) {
    const s = SIDES[a]
    open[s.size] = `${el[s.measure]}px`
    shut[s.size] = '0px'
    for (const k of s.box) { open[k] = cs[k]; shut[k] = '0px' }
    const gap = revealGap(el, a)
    if (gap) shut[s.gapAt] = `${-gap}px`
  }
  return { open, shut }
}

function run(el, which, done) {
  const ms = motionMs('--motion-med')
  if (!ms || !el.animate) return done()
  const axis = revealAxis(el, props.axis)
  const axes = axis === 'both' ? ['x', 'y'] : [axis]
  // Text inside a block that narrows wraps at every step and makes the height jump; an inline box
  // has no width to animate. Both are held for the length of the animation only.
  const held = { overflow: el.style.overflow, whiteSpace: el.style.whiteSpace, display: el.style.display }
  if (axes.includes('x')) {
    el.style.whiteSpace = 'nowrap'
    if (getComputedStyle(el).display === 'inline') el.style.display = 'inline-block'
  }
  const { open, shut } = frames(el, axes)
  el.style.overflow = 'hidden'
  const anim = el.animate(which === 'enter' ? [shut, open] : [open, shut], { duration: ms, easing: 'ease' })
  anim.onfinish = anim.oncancel = () => {
    Object.assign(el.style, held)
    done()
  }
}

function enter(el, done) { run(el, 'enter', done) }
function leave(el, done) { run(el, 'leave', done) }
</script>
