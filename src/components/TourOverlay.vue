<template>
  <!-- The tracker tour (useTour.js): the screen dimmed but for one lit element, and a card that
       says what it is. Teleported, over everything but a dialog the tour itself would never open. -->
  <Teleport to="body">
    <Transition name="tour-fade">
      <div
        v-if="step && !offAsk"
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
          <!-- The step count rides on the title's line, to its right (owner, 2026-10-14): a line of
               its own cost the card a row on a phone. -->
          <div class="tour-head">
            <h2
              id="tour-title"
              class="tour-title"
            >
              {{ text.title }}
            </h2>
            <span class="tour-count">{{ active.i + 1 }} / {{ chapter.steps.length }}</span>
            <!-- Turning the tutorial off (owner, 2026-10-20). Up here, as an icon: beside "Skip /
                 Back / Next" a fourth button ran 29px past the card at 320px. -->
            <button
              type="button"
              class="btn-ghost tour-off"
              :title="labels.tourOff"
              :aria-label="labels.tourOff"
              @click="offAsk = true"
            >
              <i class="wi wi-none" />
            </button>
          </div>
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
  <!-- Asked once per device before the first chapter starts by itself (useTour's `asking`). -->
  <ConfirmModal
    v-if="asking"
    :title="labels.tourAskTitle"
    :message="labels.tourAskText"
    :confirm-label="labels.tourAskYes"
    :cancel-label="labels.tourAskNo"
    @confirm="answerAuto(true)"
    @close="answerAuto(false)"
  />
  <!-- The tour steps aside while this is open: it stands over every dialog (z-index). -->
  <ConfirmModal
    v-if="offAsk"
    :title="labels.tourOffTitle"
    :message="labels.tourOffText"
    :confirm-label="labels.tourOffYes"
    :cancel-label="labels.trackerCancel"
    @confirm="offAsk = false; turnOff()"
    @close="offAsk = false"
  />
</template>

<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'
import { forgetScreen, leavePage, useTour } from '../composables/useTour.js'
import ConfirmModal from './ConfirmModal.vue'

// The page on screen (App.vue's pageKey): a new one, and the ⚙ menu's "this screen's tutorial"
// forgets the chapters the last page asked for, and the tour drops the ones waiting or on screen.
const props = defineProps({ page: { type: String, default: '' } })
watch(() => props.page, () => { forgetScreen(); leavePage() })
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { active, chapter, step, next, back, pass, finish, asking, answerAuto, turnOff } = useTour()
const offAsk = ref(false)

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
  const next = { x, y, w: Math.max(0, right - x), h: Math.max(0, bottom - y) }
  // Written only when it moved: a new object every frame re-rendered the overlay sixty times a
  // second over a page standing still, and on a weak phone that is the frame the page's own
  // animations lose (2026-10-20).
  const cur = rect.value
  if (!cur || cur.x !== next.x || cur.y !== next.y || cur.w !== next.w || cur.h !== next.h) rect.value = next
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
// Room below the page's end for a step that must scroll past it (see the step's scroll): a spacer at
// the end of <body>, as tall as the scroll lacks, gone with the step.
let spacer = null
function roomFor(by) {
  const lacks = by - (document.documentElement.scrollHeight - window.innerHeight - window.scrollY)
  if (lacks <= 0) return
  spacer ||= Object.assign(document.createElement('div'), { ariaHidden: 'true' })
  spacer.style.height = `${Math.ceil(lacks)}px`
  document.body.appendChild(spacer)
}
function dropRoom() { spacer?.remove(); spacer = null }
// The card stays hidden while the step's element is looked for: a step passed over must not
// flash its text first.
const resolved = ref(false)
watch(step, async (s) => {
  resolved.value = false
  dropRoom()
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
    await nextTick()
    const cardTall = cardEl.value?.offsetHeight || 0
    // On a phone the card is a sheet at the top or the bottom edge (cardStyle). An element taller
    // than the room the sheet leaves cannot be shown whole beside it, and its TOP is what a step
    // names — the button, the tab row, the search box: its top is brought up under the bar and the
    // sheet goes to the bottom, over the element's tail. Until 2026-10-10 such a panel was centred
    // and the sheet lay over its top, on the very button the step was about (Misha's CP step).
    // The sticky bar's own height, not where its bottom stands now: a banner above it scrolls away.
    const bar = document.querySelector('.navbar')?.offsetHeight || 0
    const vhNow = window.innerHeight
    const roomBelowSheet = vhNow - cardTall - GAP * 2 // the light's bottom, the sheet at the bottom
    const fitsBeside = r.top >= cardTall + GAP * 2 || vhNow - r.bottom >= cardTall + GAP * 2
    if (!fixed && phone.value && r.height > roomBelowSheet - bar - GAP) {
      window.scrollBy({ top: r.top - (bar + GAP), behavior: reduced() ? 'auto' : 'smooth' })
    } else if (!fixed && phone.value && (!fitsBeside || r.top < bar || r.bottom > vhNow)) {
      // It fits above a bottom sheet once moved: bring its bottom to the sheet's edge, its top kept
      // clear of the bar. A short page cannot scroll that far — the setup's last fields sit at its
      // end — so it is lengthened for the step by exactly what it lacks (`roomFor`).
      const by = Math.min(r.bottom - roomBelowSheet, r.top - (bar + GAP))
      roomFor(by)
      window.scrollBy({ top: by, behavior: reduced() ? 'auto' : 'smooth' })
    } else if (!fixed && !phone.value && (r.top < 80 || r.bottom > window.innerHeight - 80)) {
      el.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' })
    }
  }
  followStep()
  await nextTick()
  nextBtn.value?.focus({ preventScroll: true })
}, { immediate: true })

// The page stands still while a step is up (owner, 2026-10-09): a finger dragged on the dim moved
// the page, the lit element slid under the sticky header, and the light framed the header. Not a
// body lock — `body{overflow:hidden}` resets the scroll on iOS Safari (the modals' rule,
// tracker/CLAUDE.md) — but the gestures themselves: `touch-action: none` on the layer, and the
// wheel, touchmove and scrolling keys turned away while it is up. The tour's own scrollIntoView is
// a script's, and still moves the page to the next step's element.
const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '])
const hold = (e) => { if (step.value) e.preventDefault() }
const onKey = (e) => {
  if (!step.value) return
  if (e.key === 'Escape') finish()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') back()
  // Space on a focused button presses it; anywhere else it would page down.
  else if (SCROLL_KEYS.has(e.key) && !(e.key === ' ' && e.target?.closest?.('button'))) e.preventDefault()
}
window.addEventListener('keydown', onKey)
window.addEventListener('wheel', hold, { passive: false })
window.addEventListener('touchmove', hold, { passive: false })
onUnmounted(() => {
  dropRoom()
  window.removeEventListener('wheel', hold)
  window.removeEventListener('touchmove', hold)
  cancelAnimationFrame(follow)
  window.removeEventListener('keydown', onKey)
})

// No element: the light closes to a point in the middle, and the dim is the whole screen.
const holeStyle = computed(() => {
  const r = rect.value || { x: vw.value / 2, y: vh.value / 2, w: 0, h: 0 }
  return { transform: `translate(${r.x}px, ${r.y}px)`, width: `${r.w}px`, height: `${r.h}px` }
})

// The card on a phone is a sheet across the width, at the top or the bottom edge — the one where
// it does not cover the light. Where both have room, the half the light is not in; where only one
// does, that one (until 2026-10-10 it was the half alone, and a light reaching past the middle had
// the sheet over its edge — over the tabs a step was naming, Misha's note); where neither does, the
// bottom, over the tail of a light whose top was brought up under the bar (the step's scroll). On a wider screen it stands
// beside the light — under it where there is room, else over it.
const cardStyle = computed(() => {
  const r = rect.value
  if (phone.value) {
    if (!r) return { top: `${Math.max(GAP, (vh.value - cardH.value) / 2)}px` }
    const need = cardH.value + GAP * 2
    const fitsTop = r.y >= need
    const fitsBottom = vh.value - (r.y + r.h) >= need
    const top = fitsTop && fitsBottom ? r.y + r.h / 2 > vh.value / 2 : fitsTop
    return top
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
.tour { position: fixed; inset: 0; z-index: 450; touch-action: none; }
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
  padding: 0.65rem 0.9rem 0.6rem;
  border: 1px solid var(--accent);
  background: var(--bg-card);
  color: var(--text-primary);
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
  transition: top var(--motion-med) ease, left var(--motion-med) ease, bottom var(--motion-med) ease;
}
.tour-card.waiting { visibility: hidden; }
.tour-card.phone { left: calc(var(--safe-left, 0px) + 12px); right: calc(var(--safe-right, 0px) + 12px); }
.tour-head { display: flex; align-items: baseline; gap: 0.75rem; margin: 0 0 0.25rem; }
.tour-count { flex: none; margin-left: auto; font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono); }
.tour-title { margin: 0; font-family: var(--font-display); font-size: 1.3rem; font-weight: var(--fw-heading); line-height: 1.15; }
.tour-text { margin: 0 0 0.6rem; font-size: 0.92rem; line-height: 1.4; }
.tour-actions { display: flex; gap: 0.5rem; align-items: center; }
.tour-skip { margin-right: auto; }
.tour-off { flex: none; align-self: center; margin: -0.3rem -0.4rem -0.3rem -0.35rem; padding: 0.3rem 0.4rem; }
/* The three buttons share the card's width: at their own 1.3rem sides "Пропустить / Назад /
   Далее" stood out past a 360px phone's card (owner, 2026-10-09; 42px at 320) and ate the desk
   card's inner margin. Measured: with 0.7rem sides they fit in RU from 320px and on the desk. */
.tour-actions > button { padding-left: 0.7rem; padding-right: 0.7rem; }
.tour-fade-enter-active, .tour-fade-leave-active { transition: opacity var(--motion-med) ease; }
.tour-fade-enter-from, .tour-fade-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) {
  .tour-hole, .tour-card { transition: none; }
}
</style>
