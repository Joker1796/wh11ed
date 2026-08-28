<template>
  <div class="sec">
    <div class="sec-head">
      <span class="sec-title">{{ labels.trackerSecondary }}</span>
      <div v-if="mode === 'tactical'" class="sec-actions">
        <button class="choose-btn" @click="pickerOpen = true">{{ labels.trackerChoose }}</button>
        <button
          class="draw-btn"
          :disabled="!player.secondary.deck.length"
          @click="onDraw"
        >{{ player.secondary.deck.length ? labels.trackerDraw : labels.trackerNoMoreCards }}</button>
      </div>
    </div>

    <!-- Compact mission cards — tap to open the scoring modal. TransitionGroup animates
         draws in and set-aside/redraw out (remaining cards slide up via .card-move).
         before-leave pins the card's offset: an abs-positioned flex child's static
         position is the container's start, so without it the ghost jumps to the top. -->
    <TransitionGroup tag="ul" name="card" class="cards" @before-leave="el => { el.style.top = el.offsetTop + 'px' }">
      <li v-for="m in handMissions" :key="m.slug" class="card" :class="{ 'set-aside': isSetAside(m.slug) }">
        <button class="card-open" @click="openSlug = m.slug">
          <span class="card-name">
            {{ m.name }}
            <span v-if="isSetAside(m.slug)" class="badge">{{ labels.trackerDiscardedBadge }}</span>
          </span>
          <span class="card-vp">{{ secondaryCardVp(pi, m.slug) }} VP</span>
        </button>
        <button
          v-if="mode === 'tactical' && inHand(m.slug)"
          class="manage"
          :title="labels.trackerCardActions"
          :aria-label="labels.trackerCardActions"
          @click="actionSlug = m.slug"
        >⋯</button>
        <button
          v-else-if="mode === 'tactical' && isSetAside(m.slug)"
          class="manage restore"
          :title="labels.trackerReturnToHand"
          :aria-label="labels.trackerReturnToHand"
          @click="onRestore(m.slug)"
        ><i class="bi bi-arrow-counterclockwise"></i></button>
      </li>
    </TransitionGroup>

    <ScoringModal
      v-if="openMission"
      :title="openMission.name"
      :subtitle="`${labels.trackerSecondary} · ${openMission.category}`"
      :vp="secondaryCardVp(pi, openMission.slug)"
      :blocks="relevantBlocks(openMission)"
      :briefing="openMission.briefing"
      :whenDrawn="whenDrawnFor(openMission)"
      :readonly="isSetAside(openMission.slug)"
      :count="(bi, ri) => secondaryRowCount(pi, openMission.slug, bi, ri)"
      @set="(bi, ri, c) => scoreSecondaryRow(pi, openMission.slug, bi, ri, c)"
      @redraw="mode => { redrawSecondary(pi, openMission.slug, mode); openSlug = null }"
      @close="openSlug = null"
    />

    <!-- Picker: choose a specific Secondary from the remaining deck -->
    <BaseModal v-if="pickerOpen" :title="labels.trackerPickTitle" max-width="420px" @close="pickerOpen = false">
      <div class="modal-body">
        <ul v-if="deckMissions.length" class="pick-list">
          <li v-for="m in deckMissions" :key="m.slug">
            <button class="pick-item" @click="onPick(m.slug)">
              <span class="pick-name">{{ m.name }}</span>
              <span class="pick-cat">{{ m.category }}</span>
            </button>
          </li>
        </ul>
        <p v-else class="pick-empty">{{ labels.trackerNoMoreCards }}</p>
      </div>
    </BaseModal>

    <!-- Per-card actions: set aside (keep VP) or return to deck (full undo) -->
    <BaseModal v-if="actionMission" max-width="340px" @close="actionSlug = null">
      <template #header>
        <header class="modal-head">
          <div class="mh-text">
            <h3 class="mh-title">{{ actionMission.name }}</h3>
            <p class="mh-sub">{{ labels.trackerCardActions }}</p>
          </div>
          <button class="mh-close" @click="actionSlug = null" :aria-label="labels.modalClose">✕</button>
        </header>
      </template>
      <div class="modal-body act-list">
        <button class="act-btn" @click="onSetAside(actionMission.slug)">{{ labels.trackerSetAside }}</button>
        <button class="act-btn act-danger" @click="onReturn(actionMission.slug)">{{ labels.trackerReturnToDeck }}</button>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ScoringModal from './ScoringModal.vue'
import BaseModal from '../BaseModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, missionBySlug, scorableBlocks } from '../../composables/useTracker.js'

const props = defineProps({ pi: { type: Number, required: true } })
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const {
  current, drawSecondary, drawSpecificSecondary, returnSecondaryToDeck,
  discardFromHand, restoreSecondaryToHand, redrawSecondary, scoreSecondaryRow,
  secondaryRowCount, secondaryCardVp,
} = useTracker()

const player = computed(() => current.value.players[props.pi])
const mode = computed(() => player.value.secondaryMode)
function inHand(slug) { return player.value.secondary.hand.includes(slug) }
// A displayed card that isn't in the hand is a set-aside (discarded) one — handMissions
// only ever pulls from hand ∪ discarded, so "not in hand" ⇒ set aside.
function isSetAside(slug) { return !inHand(slug) }

// "In play" for the viewed round: cards held in hand that round — either still in
// hand, or discarded in a LATER round (so a scored card shows as active in the round
// it scored, not as set aside). Drawn-round bounds the lower edge.
const handMissions = computed(() => {
  const R = current.value.currentRound
  const s = player.value.secondary
  const drawn = s.drawn || {}
  const slugs = []
  for (const slug of s.hand) if ((drawn[slug] || 1) <= R) slugs.push(slug)
  for (const d of (s.discarded || [])) {
    const slug = d.slug ?? d
    const dr = d.round ?? R           // last round the card was active
    if ((drawn[slug] || 1) <= R && R <= dr) slugs.push(slug)
  }
  return slugs.map(slug => missionBySlug(slug, player.value.role, locale.value)).filter(Boolean)
})

// Cards still available to pick/draw (the remaining deck), shown alphabetically.
const deckMissions = computed(() =>
  [...player.value.secondary.deck]
    .map(slug => missionBySlug(slug, player.value.role, locale.value))
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name))
)

const openSlug = ref(null)
const openMission = computed(() => openSlug.value ? missionBySlug(openSlug.value, player.value.role, locale.value) : null)

const pickerOpen = ref(false)
const actionSlug = ref(null)
const actionMission = computed(() => actionSlug.value ? missionBySlug(actionSlug.value, player.value.role, locale.value) : null)

// Blocks scorable this round (round-gated) and matching the player's mode.
function relevantBlocks(m) {
  return scorableBlocks(m.slug, player.value.role, current.value.currentRound, locale.value)
    .filter(b => b.kind === mode.value)
}

// The WHEN DRAWN redraw action for an open card, or null. Tactical only; auto-gated where
// the condition is computable (first battle round, or holding the paired card). Board-state
// conditions (no SS 13+/W 10+) have no gate — always offered, the briefing is the reminder.
function whenDrawnFor(m) {
  if (mode.value !== 'tactical') return null
  const w = m && m.whenDrawn
  if (!w) return null
  // No replacement to draw — redrawSecondary would no-op, so don't offer the action.
  if (!player.value.secondary.deck.length) return null
  if (w.gate === 'first-round' && current.value.currentRound !== 1) return null
  if (w.gate && w.gate.pairedActive && !player.value.secondary.hand.includes(w.gate.pairedActive)) return null
  return { mode: w.mode }
}

function onDraw() { drawSecondary(props.pi) }
function onPick(slug) { drawSpecificSecondary(props.pi, slug); pickerOpen.value = false }
function onSetAside(slug) { discardFromHand(props.pi, slug); actionSlug.value = null }
function onReturn(slug) { returnSecondaryToDeck(props.pi, slug); actionSlug.value = null }
function onRestore(slug) { restoreSecondaryToHand(props.pi, slug) }
</script>

<style scoped>
.sec { margin-top: 0.6rem; }
.sec-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem; gap: 0.5rem; }
.sec-title { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); }
.sec-actions { display: flex; gap: 0.4rem; }
.draw-btn {
  padding: 0.35rem 0.8rem; background: var(--accent); color: #fff; border: none;
  font-size: 0.78rem; font-weight: 600; cursor: pointer;
}
.draw-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.choose-btn {
  padding: 0.35rem 0.8rem; background: transparent; color: var(--text-muted);
  border: 1px solid var(--border); font-size: 0.78rem; font-weight: 600; cursor: pointer;
}
.choose-btn:hover { color: var(--text-primary); border-color: var(--accent); }
.cards { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; position: relative; }
.card { display: flex; align-items: stretch; gap: 0.3rem; }
/* Hand transitions: draws fade/slide in, removed cards fade out in place (absolute, so
   the remaining cards FLIP-slide up via .card-move). */
.card-enter-active, .card-move { transition: opacity var(--motion-med) ease, transform var(--motion-med) ease; }
.card-enter-from { opacity: 0; transform: translateY(-6px); }
.card-leave-active { position: absolute; width: 100%; transition: opacity var(--motion-fast) ease; }
.card-leave-to { opacity: 0; }
.card-open {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0.65rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  cursor: pointer;
  text-align: left;
}
.card-open:hover { border-color: var(--accent); }
.card-name { font-weight: 700; font-size: 0.88rem; color: var(--text-primary); }
.card-vp { font-family: var(--font-mono); font-weight: 700; font-size: 0.82rem; color: var(--accent); flex-shrink: 0; }
.manage {
  background: none; border: 1px solid var(--border); color: var(--text-dim);
  cursor: pointer; font-size: 1rem; line-height: 1; padding: 0 0.55rem; flex-shrink: 0;
}
.manage:hover { color: var(--accent); border-color: var(--accent); }
.manage.restore { display: flex; align-items: center; }
.manage.restore .bi { font-size: 0.95rem; }

/* Set-aside (discarded) card: dimmed, dashed border, a "Discarded" badge. Only the card
   face is muted — the Return button stays fully legible so undoing an accidental set-aside
   is easy. */
.card.set-aside .card-open { opacity: 0.6; border-style: dashed; }
.card.set-aside .card-open:hover { opacity: 0.85; }
.badge {
  margin-left: 0.4rem;
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--text-dim);
  border: 1px solid var(--border);
  padding: 0 0.28rem;
  vertical-align: middle;
  white-space: nowrap;
}

/* Custom header for the per-card actions modal (others use BaseModal's default header). */
/* The heading here is two lines deep, so the close button rides at the top of it rather than
   centred against the whole block. */
.modal-head { align-items: flex-start; }
/* Denser header, and a long title must not squeeze the button out of shape. */
.mh-close { min-width: 32px; min-height: 32px; flex-shrink: 0; }

.pick-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.4rem; }
.pick-item {
  width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
  padding: 0.6rem 0.7rem; border: 1px solid var(--border);
  background: var(--bg-secondary); cursor: pointer; text-align: left;
}
.pick-item:hover { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); }
.pick-name { font-weight: 700; font-size: 0.88rem; color: var(--text-primary); }
.pick-cat { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.03em; color: var(--text-dim); flex-shrink: 0; }
.pick-empty { font-size: 0.85rem; color: var(--text-dim); font-style: italic; margin: 0.3rem 0; text-align: center; }
</style>
