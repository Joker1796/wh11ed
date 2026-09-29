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
// Height in and out for a block that APPEARS — a `v-if` answer to a choice made elsewhere (the
// "taken off / put back" line, a custom-points field, an import report) — so what is below slides
// instead of jumping. The sibling of CollapseTransition, which folds content that always exists
// (an accordion, driven by `:show`); this one is for content that does not exist until it does.
// Usage: <ExpandTransition><p v-if="x">…</p></ExpandTransition>; a v-if / v-else chain inside
// needs a `key` per branch and usually `mode="out-in"`.
//
// Web Animations on the element's own box: height, its vertical padding and margins from 0 to
// what the element measures now (one read per enter, on small blocks — never on a long list, which
// is what CollapseTransition's grid trick is for). `--motion-med`, so reduced motion skips it.
import { motionMs } from '../composables/motionToken.js'

defineProps({
  mode: { type: String, default: undefined },
})

const BOX = ['height', 'paddingTop', 'paddingBottom', 'marginTop', 'marginBottom']

function boxOf(el) {
  const cs = getComputedStyle(el)
  const box = { opacity: 1 }
  for (const k of BOX) box[k] = k === 'height' ? `${el.offsetHeight}px` : cs[k]
  return box
}
const closed = () => Object.fromEntries([['opacity', 0], ...BOX.map((k) => [k, '0px'])])

function run(el, frames, done) {
  const ms = motionMs('--motion-med')
  if (!ms || !el.animate) return done()
  const prev = el.style.overflow
  el.style.overflow = 'hidden'
  const anim = el.animate(frames, { duration: ms, easing: 'ease' })
  anim.onfinish = anim.oncancel = () => {
    el.style.overflow = prev
    done()
  }
}

function enter(el, done) {
  run(el, [closed(), boxOf(el)], done)
}
function leave(el, done) {
  run(el, [boxOf(el), closed()], done)
}
</script>
