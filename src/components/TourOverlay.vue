<template>
  <!-- The tracker tour (useTour.js): the screen dimmed but for one lit element, and a card that
       says what it is. Teleported, over everything but a dialog the tour itself would never open. -->
  <Teleport to="body">
    <Transition name="tour-fade">
      <div
        v-if="step"
        class="tour"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tour-title"
      >
        <!-- Taps land here, not on the screen under the dim: the tour is read, then left. -->
        <div
          class="tour-block"
          @click.stop
        />
        <div
          class="tour-hole"
          :style="holeStyle"
        />
        <div
          ref="cardEl"
          class="tour-card"
          :class="{ phone, waiting: !resolved }"
          :style="cardStyle"
        >
          <p class="tour-count">
            {{ active.i + 1 }} / {{ chapter.steps.length }}
          </p>
          <h2
            id="tour-title"
            class="tour-title"
          >
            {{ text.title }}
          </h2>
          <p class="tour-text">
            {{ text.text }}
          </p>
          <div class="tour-actions">
            <button
              type="button"
              class="btn-ghost tour-skip"
              @click="finish"
            >
              {{ labels.tourSkip }}
            </button>
            <button
              v-if="active.i > 0"
              type="button"
              class="btn-ghost"
              data-press
              @click="back"
            >
              {{ labels.tourBack }}
            </button>
            <button
              ref="nextBtn"
              type="button"
              class="btn-primary"
              data-press
              @click="next"
            >
              {{ last ? labels.tourDone : labels.tourNext }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { useTour } from '../composables/useTour.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { active, chapter, step, next, back, pass, finish } = useTour()

const last = computed(() => !!chapter.value && active.value.i === chapter.value.steps.length - 1)
const text = computed(() => step.value?.[locale.value] || step.value?.en || {})

const PAD = 6 // the light reaches a little past the element's edge
const GAP = 12 // the card off the light and off the window's edges

const rect = ref(null) // the lit element, in viewport px, or null for a card in the middle
const cardEl = ref(null)
const nextBtn = ref(null)
const cardH = ref(0)
const vw = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const vh = ref(typeof window !== 'undefined' ? window.innerHeight : 768)
const phone = computed(() => vw.value <= 560)
const desk = () => window.matchMedia('(min-width: 901px)').matches

// The element a step lights: the first VISIBLE one carrying its `data-tour` (a list repeats it,
// and a hidden panel keeps its attribute).
function targetOf(s) {
  const t = s?.target && typeof s.target === 'object' ? (desk() ? s.target.desk : s.target.phone) : s?.target
  if (!t) return null
  return [...document.querySelectorAll(`[data-tour="${t}"]`)].find((el) => el.getClientRects().length > 0) || null
}

let el = null
let follow = 0
function measure() {
  vw.value = window.innerWidth
  vh.value = window.innerHeight
  // The element left the page — a panel fading out for the one the step opened: find it again.
  if (!el?.isConnected) el = step.value ? targetOf(step.value) : null
  if (!el) { rect.value = null; return }
  const r = el.getBoundingClientRect()
  // Never past the window's edges: a block taller than the screen was framed off its foot.
  const x = Math.max(r.left - PAD, 2)
  const y = Math.max(r.top - PAD, 2)
  const right = Math.min(r.right + PAD, window.innerWidth - 2)
  const bottom = Math.min(r.bottom + PAD, window.innerHeight - 2)
  rect.value = { x, y, w: Math.max(0, right - x), h: Math.max(0, bottom - y) }
  if (cardEl.value) cardH.value = cardEl.value.offsetHeight
}
// Kept on the element for as long as the step is up: the page moves under it without a scroll
// or a resize to say so — a banner folding away above, a panel sliding in — and a light measured
// once was left on the empty place (owner, 2026-10-09). One rect a frame is nothing.
function followStep() {
  cancelAnimationFrame(follow)
  const tick = () => {
    measure()
    if (step.value) follow = requestAnimationFrame(tick)
  }
  follow = requestAnimationFrame(tick)
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
// The card stays hidden while the step's element is looked for: a step passed over must not
// flash its text first.
const resolved = ref(false)
watch(step, async (s) => {
  resolved.value = false
  if (!s) { el = null; rect.value = null; return }
  await nextTick()
  await nextTick() // a step that opened a tab: the panel is on screen a tick after the tab
  el = targetOf(s)
  // A panel that fades in after the one it replaces is a moment late: look again for a while.
  for (let n = 0; !el && s.target && n < 16 && step.value === s; n++) {
    await new Promise((r) => setTimeout(r, 50))
    el = targetOf(s)
  }
  if (step.value !== s) return
  // Its element is not on screen in this state or at this width: the step says nothing here.
  if (!el && s.target && (typeof s.target !== 'object' || s.target.phone || s.target.desk)) { pass(); return }
  resolved.value = true
  if (el) {
    const r = el.getBoundingClientRect()
    const fixed = getComputedStyle(el).position === 'fixed' || el.closest('.tf-sticky')
    if (!fixed && (r.top < 80 || r.bottom > window.innerHeight - 80)) {
      el.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' })
    }
  }
  followStep()
  await nextTick()
  nextBtn.value?.focus({ preventScroll: true })
}, { immediate: true })

const onKey = (e) => {
  if (!step.value) return
  if (e.key === 'Escape') finish()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') back()
}
window.addEventListener('keydown', onKey)
onUnmounted(() => {
  cancelAnimationFrame(follow)
  window.removeEventListener('keydown', onKey)
})

// No element: the light closes to a point in the middle, and the dim is the whole screen.
const holeStyle = computed(() => {
  const r = rect.value || { x: vw.value / 2, y: vh.value / 2, w: 0, h: 0 }
  return { transform: `translate(${r.x}px, ${r.y}px)`, width: `${r.w}px`, height: `${r.h}px` }
})

// The card on a phone is a sheet across the width, on the half of the screen the light is not
// in; on a wider screen it stands beside the light — under it where there is room, else over it.
const cardStyle = computed(() => {
  const r = rect.value
  if (phone.value) {
    if (!r) return { top: `${Math.max(GAP, (vh.value - cardH.value) / 2)}px` }
    return r.y + r.h / 2 > vh.value / 2
      ? { top: `calc(${GAP}px + var(--safe-top, 0px))` }
      : { bottom: `calc(${GAP}px + var(--safe-bottom, 0px))` }
  }
  const w = 340
  if (!r) return { width: `${w}px`, left: `${(vw.value - w) / 2}px`, top: `${(vh.value - cardH.value) / 2}px` }
  const left = Math.min(Math.max(r.x, GAP), vw.value - w - GAP)
  const below = vh.value - (r.y + r.h) > cardH.value + GAP * 2
  return below
    ? { width: `${w}px`, left: `${left}px`, top: `${r.y + r.h + GAP}px` }
    : { width: `${w}px`, left: `${left}px`, top: `${Math.max(GAP, r.y - cardH.value - GAP)}px` }
})
</script>

<style scoped>
.tour { position: fixed; inset: 0; z-index: 450; }
.tour-block { position: absolute; inset: 0; }
/* The light: a frame round the element, and everything outside it dimmed by its own shadow. It
   glides from one element to the next. */
.tour-hole {
  position: absolute;
  top: 0;
  left: 0;
  border: 2px solid var(--accent);
  box-shadow: 0 0 0 200vmax rgba(0, 0, 0, 0.62);
  pointer-events: none;
  transition: transform var(--motion-med) ease, width var(--motion-med) ease, height var(--motion-med) ease;
}
.tour-card {
  position: absolute;
  padding: 0.9rem 1rem 0.8rem;
  border: 1px solid var(--accent);
  background: var(--bg-card);
  color: var(--text-primary);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
  transition: top var(--motion-med) ease, left var(--motion-med) ease, bottom var(--motion-med) ease;
}
.tour-card.waiting { visibility: hidden; }
.tour-card.phone { left: calc(var(--safe-left, 0px) + 12px); right: calc(var(--safe-right, 0px) + 12px); }
.tour-count { margin: 0 0 0.2rem; font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono); }
.tour-title { margin: 0 0 0.35rem; font-family: var(--font-display); font-size: 1.3rem; font-weight: var(--fw-heading); }
.tour-text { margin: 0 0 0.8rem; font-size: 0.92rem; line-height: 1.45; }
.tour-actions { display: flex; gap: 0.5rem; align-items: center; }
.tour-skip { margin-right: auto; }
.tour-fade-enter-active, .tour-fade-leave-active { transition: opacity var(--motion-med) ease; }
.tour-fade-enter-from, .tour-fade-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .tour-hole, .tour-card { transition: none; }
}
</style>
