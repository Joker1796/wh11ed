<template>
  <Transition
    :css="false"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </Transition>
</template>

<script setup>
// Reusable height-collapse transition for accordions/disclosures whose content height is
// unknown/variable (rule bodies, briefings, legends). Uses the Web Animations API driven off
// the shared --motion-med token, so `prefers-reduced-motion` (which zeroes the token, see
// style.css) collapses instantly with no special-casing. The slotted content must be a single
// root element (Vue transition requirement).
//
// Vertical padding + margin animate alongside height (and box-sizing is forced to border-box
// for the duration) so a padded body collapses cleanly to nothing — otherwise the padding stays
// at full size at height:0 and the open/close snaps by that amount (looks jerky).

// Read the shared motion duration (e.g. '0.22s' → 220, '0s' → 0 under reduced-motion).
function durationMs() {
  const v = getComputedStyle(document.documentElement).getPropertyValue('--motion-med')
  return (parseFloat(v) || 0) * 1000
}

// The collapsed (height 0) keyframe: everything that adds vertical space goes to zero.
const COLLAPSED = {
  height: '0px',
  paddingTop: '0px',
  paddingBottom: '0px',
  marginTop: '0px',
  marginBottom: '0px',
  opacity: 0,
}

// The open keyframe read from the element's own computed styles.
function expanded(el) {
  const cs = getComputedStyle(el)
  return {
    height: el.scrollHeight + 'px',
    paddingTop: cs.paddingTop,
    paddingBottom: cs.paddingBottom,
    marginTop: cs.marginTop,
    marginBottom: cs.marginBottom,
    opacity: 1,
  }
}

function run(el, from, to, done) {
  el.style.overflow = 'hidden'
  el.style.boxSizing = 'border-box' // so animated height includes the padding we're animating
  const anim = el.animate([from, to], { duration: durationMs(), easing: 'ease' })
  anim.onfinish = anim.oncancel = () => {
    el.style.overflow = ''
    el.style.boxSizing = ''
    done()
  }
}

function onEnter(el, done) {
  if (!durationMs()) { done(); return }
  run(el, COLLAPSED, expanded(el), done)
}

function onLeave(el, done) {
  if (!durationMs()) { done(); return }
  run(el, expanded(el), COLLAPSED, done)
}
</script>
