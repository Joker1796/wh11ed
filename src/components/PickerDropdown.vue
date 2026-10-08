<template>
  <div
    ref="rootEl"
    class="pd"
  >
    <slot
      name="trigger"
      :open="open"
      :toggle="toggle"
    />
    <!-- Teleported and placed by the trigger's own rect: a dropdown inside a card or a scrolling
         column was clipped by it (a roster card is `contain: paint`, the desk's list column scrolls),
         and one inside a sticky bar lived in that bar's stacking context. From <body> nothing above
         it can clip or cover it. A tap elsewhere closes it (useOutsideTap). -->
    <Teleport to="body">
      <Transition name="fade-pop">
        <div
          v-if="open"
          ref="panelEl"
          class="pd-panel"
          role="dialog"
          :aria-label="label"
          :style="panelStyle"
        >
          <slot :close="() => (open = false)" />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
// A picker that drops down under its trigger instead of covering the screen — the desk's settings
// line, AdaptivePicker on a wide screen (faction pages, game setup, the "…" action menus). The
// panel holds the SAME list the modal does, so a row looks and behaves alike in both (owner,
// 2026-10-01). The account menu's recipe: a tap outside closes it (useOutsideTap — not a backdrop,
// which covered the trigger too), Escape closes, `fade-pop` opens it. The parent owns `open` (v-model:open) — a single pick closes it, a
// multi-pick (detachments under a DP budget) leaves it up.
import { computed, onUnmounted, ref, watch } from 'vue'
import { useOutsideTap } from '../composables/useOutsideTap.js'

const props = defineProps({
  label: { type: String, default: '' },
  width: { type: String, default: '26rem' },
  // `right` lines the panel's right edge up with the trigger's — for a trigger at the end of a
  // line (a "…" in a card's corner, the last field on the desk's settings line).
  align: { type: String, default: 'left' },
})
const open = defineModel('open', { type: Boolean, default: false })
const toggle = () => { open.value = !open.value }

const rootEl = ref(null)
const panelEl = ref(null)
useOutsideTap(open, () => [rootEl.value, panelEl.value], () => { open.value = false })
const place = ref(null)
// The faction accent a screen sets on its own root (useFactionAccent) does not reach <body>: the
// panel carries the values it would have inherited where it was opened.
const INHERITED = ['--accent', '--accent-hover', '--fa-light', '--fa-dark']

// The panel's width in px, for keeping its right edge on screen.
function widthPx() {
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
  const w = props.width.endsWith('rem') ? parseFloat(props.width) * rem : parseFloat(props.width) || 0
  return Math.min(w, window.innerWidth - 16)
}

function measure() {
  const el = rootEl.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const cs = getComputedStyle(el)
  const vars = {}
  for (const v of INHERITED) { const val = cs.getPropertyValue(v).trim(); if (val) vars[v] = val }
  const gap = 4
  const top = r.bottom + gap
  place.value = {
    top: `${top}px`,
    ...(props.align === 'right'
      ? { right: `${Math.max(8, window.innerWidth - r.right)}px` }
      : { left: `${Math.max(8, Math.min(r.left, window.innerWidth - 8 - widthPx()))}px` }),
    // Never past the bottom of the screen: the panel scrolls instead.
    maxHeight: `${Math.max(180, Math.min(window.innerHeight * 0.7, window.innerHeight - top - 12))}px`,
    ...vars,
  }
}
const panelStyle = computed(() => ({ width: `min(${props.width}, calc(100vw - 16px))`, ...place.value }))

// While open the panel follows its trigger: a scroll anywhere (capture — the desk's columns are
// their own scrollers) or a resize moves it.
const follow = () => measure()
function onEscape(e) { if (e.key === 'Escape') open.value = false }
watch(open, (v) => {
  if (v) {
    measure()
    window.addEventListener('scroll', follow, true)
    window.addEventListener('resize', follow)
    window.addEventListener('keydown', onEscape)
  } else {
    window.removeEventListener('scroll', follow, true)
    window.removeEventListener('resize', follow)
    window.removeEventListener('keydown', onEscape)
  }
}, { immediate: true })
onUnmounted(() => {
  window.removeEventListener('scroll', follow, true)
  window.removeEventListener('resize', follow)
  window.removeEventListener('keydown', onEscape)
})
</script>

<style scoped>
.pd { position: relative; display: inline-flex; flex-direction: column; }
/* The modal's surface, dropped under the trigger: same card ground and frame, its own scroll. */
.pd-panel {
  position: fixed;
  z-index: 210;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.45rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.25);
}
/* The lists dropped in here are the modal's (`.modal-list`), and they bring the modal's own 0.75rem
   inset with them — on top of the panel's, that was a 1.2rem band of empty card round every list
   (owner, 2026-10-03). The panel's padding is the only inset a dropdown needs. */
.pd-panel :deep(.modal-list) { padding: 0; }
</style>
