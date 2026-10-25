<template>
  <div class="sec">
    <div class="sec-head">
      <span class="sec-title panel-label">{{ labels.trackerSecondary }} · {{ labels.trackerRoundShort }} {{ round }}</span>
      <!-- The turn's cards (two, or a custom size's own number; tactical, the side on turn, live round only): the one way new
           cards come in. Once taken, the hand changes only through a card's own rule. The same
           dialog stays a tap away after the draw (owner, 2026-09-29) — what came in, the WHEN
           DRAWN rules on offer, and the way to put the pair back. -->
      <button
        v-if="canTake"
        class="take-btn"
        data-press
        @click="takeOpen = true"
      >
        {{ takeLabel }}
      </button>
      <button
        v-if="takenNow && editable"
        class="untake-btn"
        data-press
        @click="takeOpen = true"
      >
        <DieIcon />
        {{ labels.trackerTakenTwo }}
      </button>
    </div>

    <!-- Compact mission cards, folded to one line as in the first tracker (owner, 2026-09-29): the
         name, how the card came in, the VP it holds this round; a tap opens it with its conditions
         to tick (ScoringModal). TransitionGroup animates draws in and set-asides out (remaining
         cards slide up via .card-move). before-leave pins the card's offset: an abs-positioned
         flex child's static position is the container's start, so without it the ghost jumps to
         the top. -->
    <TransitionGroup
      tag="ul"
      name="card"
      class="cards"
      @before-leave="el => { el.style.top = el.offsetTop + 'px' }"
    >
      <li
        v-for="m in handMissions"
        :key="m.slug"
        class="card"
        :class="{ 'set-aside': isSetAside(m.slug) }"
      >
        <div class="card-head">
          <button
            type="button"
            class="card-open"
            data-press
            @click="openSlug = m.slug"
          >
            <span class="card-name">{{ m.name }}</span>
            <span
              v-if="source(m.slug)"
              class="cm-src"
              :title="source(m.slug) === 'random' ? labels.trackerSourceRandom : labels.trackerSourceChosen"
            ><DieIcon v-if="source(m.slug) === 'random'" /><i
              v-else
              class="wi wi-hand"
              aria-hidden="true"
            /></span>
            <ExpandTransition>
              <span
                v-if="readonlyCard(m.slug)"
                class="badge"
              >{{ labels.trackerDiscardedBadge }}</span>
            </ExpandTransition>
            <ExpandTransition>
              <span
                v-if="isMarkedForTurnEnd(pi, m.slug)"
                class="badge badge-eot"
              >{{ labels.trackerEotMarked }}</span>
            </ExpandTransition>
            <span class="card-vp">{{ secondaryCardVp(pi, m.slug, round) }} VP</span>
          </button>
          <button
            v-if="editable && live && mode === 'tactical' && inHand(m.slug)"
            class="manage"
            data-press
            :title="labels.trackerCardActions"
            :aria-label="labels.trackerCardActions"
            @click="actionSlug = m.slug"
          >
            ⋯
          </button>
          <button
            v-else-if="editable && live && mode === 'tactical' && isSetAside(m.slug)"
            class="manage restore"
            data-press
            :disabled="!!restoreWhy(m.slug)"
            :title="labels.trackerReturnToHand"
            :aria-label="labels.trackerReturnToHand"
            @click="onRestore(m.slug)"
          >
            <i class="wi wi-undo" />
          </button>
        </div>
        <!-- Strict rules: a card set aside before the side's last action stays set aside. -->
        <small
          v-if="editable && live && mode === 'tactical' && isSetAside(m.slug) && restoreWhy(m.slug)"
          class="check-note card-why"
        >{{ labels[`trackerStrict_${restoreWhy(m.slug)}`] }}</small>
      </li>
    </TransitionGroup>
    <p
      v-if="!handMissions.length"
      class="sec-empty"
    >
      {{ live ? labels.trackerNoSecondaries : labels.trackerNoSecondariesThen }}
    </p>

    <ScoringModal
      v-if="openMission"
      :title="openMission.name"
      :subtitle="`${labels.trackerSecondary} · ${openMission.category}`"
      :vp="secondaryCardVp(pi, openMission.slug, round)"
      :blocks="relevantBlocks(openMission)"
      :briefing="openMission.briefing"
      :when-drawn="live && editable ? whenDrawnFor(openMission) : null"
      :readonly="readonlyCard(openMission.slug) || !!pastWhy || !editable"
      :view-only-note="!editable ? labels.partyOtherSide : pastWhy ? labels[`trackerStrict_${pastWhy}`] : null"
      :count="(bi, ri) => secondaryRowCount(pi, openMission.slug, bi, ri, round)"
      :locked="b => rowLocked(openMission, b)"
      :fix="editable ? fixLabel(openMission) : ''"
      :opp="!isYouSide(player, pi)"
      @set="(bi, ri, c) => scoreSecondaryRow(pi, openMission.slug, bi, ri, c, round, turn)"
      @fix="$emit('open-turn', fixTurn(openMission))"
      @redraw="mode => startRedraw(openMission.slug, mode)"
      @close="openSlug = null"
    />

    <TakeSecondariesModal
      v-if="takeOpen"
      :pi="pi"
      :name="name"
      @close="takeOpen = false"
    />

    <!-- Per-card actions, each the exact rule it is (Mikhail's prototype: "choose the rule you
         are using"): the card's own WHEN DRAWN, the once-per-battle 1CP replacement, the
         end-of-turn discard for 1CP (which ends the turn), and the two plain ones — set aside
         (keeps VP) and return to deck (full undo). A rule not available now is shown greyed
         with why, never hidden. -->
    <BaseModal
      v-if="actionMission"
      :title="actionMission.name"
      :subtitle="labels.trackerCardActions"
      dense
      max-width="360px"
      @close="actionSlug = null"
    >
      <div class="modal-body act-list">
        <button
          v-if="whenDrawnFor(actionMission)"
          class="act-btn"
          data-press
          @click="startRedraw(actionMission.slug, whenDrawnFor(actionMission).mode)"
        >
          <strong>{{ labels.trackerWhenDrawn }}</strong>
          <span>{{ whenDrawnFor(actionMission).mode === 'discard' ? labels.trackerDiscardDraw : labels.trackerShuffleDraw }}</span>
        </button>
        <button
          class="act-btn"
          data-press
          :disabled="!canCpRedraw(pi)"
          @click="startCpRedraw(actionMission.slug)"
        >
          <strong>{{ labels.trackerCpRedraw }}</strong>
          <span>{{ cpRedrawNote }}</span>
        </button>
        <!-- Marks the card for the end of the turn rather than ending it now (owner, 2026-10-20):
             it goes, with the round's bonus CP, when the player ends the turn. -->
        <button
          v-if="canEndTurnDiscard(pi) && isMarkedForTurnEnd(pi, actionMission.slug)"
          class="act-btn"
          data-press
          @click="markForTurnEnd(pi, actionMission.slug); actionSlug = null"
        >
          <strong>{{ labels.trackerEotKeep }}</strong>
          <span>{{ labels.trackerEotKeepNote }}</span>
        </button>
        <button
          v-else-if="canEndTurnDiscard(pi)"
          class="act-btn"
          data-press
          :disabled="!canMarkForTurnEnd(pi, actionMission.slug)"
          @click="markForTurnEnd(pi, actionMission.slug); actionSlug = null"
        >
          <strong>{{ labels.trackerEotDiscard }}</strong>
          <span>{{ secondaryCardVp(pi, actionMission.slug) > 0 ? labels.trackerEotDiscardScored : canGainBonus(pi) ? labels.trackerEotDiscardNote : labels.trackerEotDiscardNoCp }}</span>
        </button>
        <button
          class="act-btn"
          data-press
          @click="onSetAside(actionMission.slug)"
        >
          <strong>{{ labels.trackerSetAside }}</strong>
          <span>{{ labels.trackerSetAsideNote }}</span>
        </button>
        <button
          class="act-btn act-danger"
          data-press
          :disabled="!!returnWhy"
          @click="onReturn(actionMission.slug)"
        >
          <strong>{{ labels.trackerReturnToDeck }}</strong>
          <span>{{ returnWhy ? labels[`trackerStrict_${returnWhy}`] : labels.trackerReturnToDeckNote }}</span>
        </button>
      </div>
    </BaseModal>

    <!-- The replacement: at random, or by hand for a card that came in by hand. -->
    <ReplaceCardModal
      v-if="replace"
      :pi="pi"
      :slug="replace.slug"
      :title="replace.kind === 'cp' ? labels.trackerCpRedraw : labels.trackerWhenDrawn"
      :subtitle="missionName(replace.slug)"
      :note="replace.kind === 'cp' ? labels.trackerCpRedrawConfirm : ''"
      :choosable="source(replace.slug) === 'chosen' && !strictWhy('choose', pi)"
      @pick="onReplacePick"
      @close="replace = null"
    />
  </div>
</template>

<script>
// Which (game, round, side) already had the take-two dialog opened for it on this device — so
// it opens by itself once, at the start of the turn, and not again after the player closed it.
// Module scope: the deck is remounted when the tabs switch, the memory must outlive that.
const prompted = new Set()
</script>

<script setup>
import ExpandTransition from '../ExpandTransition.vue'
import { ref, computed, watch } from 'vue'
import DieIcon from '../DieIcon.vue'
import ScoringModal from './ScoringModal.vue'
import TakeSecondariesModal from './TakeSecondariesModal.vue'
import BaseModal from '../BaseModal.vue'
import ReplaceCardModal from './ReplaceCardModal.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, missionBySlug, cardBlocks, isYouSide, battleOf, byCount } from '../../composables/useTracker.js'
import { blockLocked, fixTurnOf } from '../../composables/missionTiming.js'
import { whenDrawnAction } from '../../composables/whenDrawn.js'
import { tracks } from '../../data/trackerOptions.js'
import { provideSideScope } from '../../composables/modalScope.js'

// `round`, `turn` — the turn on screen: the live one, or one already played being corrected (the
// game screen's round steps; `open-turn` asks it to open another). `turnNames` — whose each turn
// is, for the lock's reason. `editable` — this phone may score this side. A shared game locks the
// other side's ACTIONS here — the take, a card's "⋯" and return, the dialog opening by itself —
// and opens its cards view only: they lie face up, and a deck the parent made inert kept the
// opponent's missions shut (2026-10-24). `name` — the side's name for the dialogs.
const props = defineProps({
  pi: { type: Number, required: true },
  round: { type: Number, required: true },
  turn: { type: Number, default: null },
  turnNames: { type: Array, default: () => [] },
  editable: { type: Boolean, default: true },
  name: { type: String, default: '' },
})
defineEmits(['open-turn'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const {
  current, returnSecondaryToDeck, discardFromHand, restoreSecondaryToHand, redrawSecondary,
  scoreSecondaryRow, secondaryRowCount, secondaryCardVp,
  canTakeSecondaries, tookSecondaries,
  canCpRedraw, cpRedraw, canEndTurnDiscard, isMarkedForTurnEnd, canMarkForTurnEnd, markForTurnEnd, canGainBonus, strictWhy, strictUndoWhy,
} = useTracker()
const takeLabel = computed(() => byCount(labels.value, 'trackerTakeTwo', battleOf(current.value?.settings).secondaries))
// Every dialog of this side's deck — a card, the take, a replacement — in this side's colour.
provideSideScope(() => !isYouSide(current.value?.players?.[props.pi], props.pi))

const player = computed(() => current.value.players[props.pi])
const mode = computed(() => player.value.secondaryMode)
// The live turn — not a played one opened for correction, even in the live round.
const shownTurn = computed(() => props.turn ?? (current.value.currentTurn === 1 ? 1 : 0))
const live = computed(() => props.round === current.value.currentRound && shownTurn.value === (current.value.currentTurn === 1 ? 1 : 0))
function inHand(slug) { return player.value.secondary.hand.includes(slug) }
// A displayed card that isn't in the hand is a set-aside (discarded) one — handMissions
// only ever pulls from hand ∪ discarded, so "not in hand" ⇒ set aside.
function isSetAside(slug) { return !inHand(slug) }
// Read-only: a card set aside in the live round (its VP stays, it no longer scores). In a past
// round every card shown was active then, and is corrected like any other.
function readonlyCard(slug) { return live.value && isSetAside(slug) }
// Strict rules (strictRules.js): a past round is read, not corrected; a card is not put back in
// the deck; a set-aside comes back only as the side's last action.
const pastWhy = computed(() => strictWhy('round', props.pi, props.round, live.value ? null : shownTurn.value))
const returnWhy = computed(() => strictWhy('return', props.pi))
const restoreWhy = (slug) => strictUndoWhy('restore', props.pi, slug)
function source(slug) { return player.value.secondary.source?.[slug] || null }

// "In play" for the round on screen: cards held in hand that round — either still in hand, or
// discarded in that round or a LATER one (so a scored card shows as active in the round it
// scored). The drawn round bounds the lower edge.
const handMissions = computed(() => {
  const R = props.round
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

const openSlug = ref(null)
const openMission = computed(() => openSlug.value ? missionBySlug(openSlug.value, player.value.role, locale.value) : null)
const actionSlug = ref(null)
const actionMission = computed(() => actionSlug.value ? missionBySlug(actionSlug.value, player.value.role, locale.value) : null)

// The card's blocks for the player's mode; those of other rounds come greyed (cardBlocks).
function relevantBlocks(m) {
  return cardBlocks(m.slug, player.value.role, props.round, locale.value)
    .filter(b => b.kind === mode.value)
}

// A row scored in another turn than the one on screen — read from the ENGLISH block
// (missionTiming.js): the turn it is scored in, said.
function rowLocked(m, b) {
  const t = blockLocked(current.value, props.pi, props.round, shownTurn.value, missionBySlug(m.slug, player.value.role)?.blocks[b.bi])
  return t == null ? null : labels.value.trackerScoredInTurn.replace('{name}', props.turnNames[t] || '')
}
// The turn its locked rows are put right in (one begun, and strict rules allowing), and the
// dialog's button for it.
function fixTurn(m) {
  const en = missionBySlug(m.slug, player.value.role)
  const t = fixTurnOf(current.value, props.pi, props.round, shownTurn.value, relevantBlocks(m), (bi) => en?.blocks[bi])
  return t == null || strictWhy('round', props.pi, props.round, t) ? null : t
}
function fixLabel(m) {
  const t = fixTurn(m)
  return t == null ? '' : labels.value.trackerOpenTurn.replace('{name}', props.turnNames[t] || '')
}

// The WHEN DRAWN redraw action for a card, or null (whenDrawn.js — shared with the take dialog).
function whenDrawnFor(m) {
  return m ? whenDrawnAction(current.value, props.pi, m.slug) : null
}

// The turn's two cards: offered on the live round to the side on turn, and opened by itself
// once per turn on the phone that plays that side — where the game keeps the mission help on
// (`trackMissionAids`); off, the take button is still there, it just does not open itself.
const takeOpen = ref(false)
const canTake = computed(() => live.value && props.editable && canTakeSecondaries(props.pi))
// Taken this turn by the side on turn: the dialog reopens on what came in.
const takenNow = computed(() => live.value && mode.value === 'tactical'
  && (current.value.currentTurn === 1 ? 1 : 0) === props.pi && !!tookSecondaries(props.pi))
watch(
  [() => canTake.value, () => props.editable, () => current.value.currentRound, () => current.value.currentTurn],
  () => {
    if (!canTake.value || !props.editable || !tracks(current.value?.settings, 'trackMissionAids')) return
    const key = `${current.value.id}:${current.value.currentRound}:${props.pi}`
    if (prompted.has(key)) return
    prompted.add(key)
    takeOpen.value = true
  },
  { immediate: true },
)
// The turn moved away under an open dialog — another phone undid or ended it: the cards are no
// longer this side's to take, so the dialog goes (acceptance, 2026-10-18 — it hung over the screen).
watch(
  [() => current.value.currentRound, () => current.value.currentTurn],
  () => { if (takeOpen.value && !canTake.value && !takenNow.value) takeOpen.value = false },
)

function missionName(slug) { return missionBySlug(slug, player.value.role, locale.value)?.name || slug }

// Why the 1CP replacement is or is not on offer, in its own line on the button.
const cpRedrawNote = computed(() => {
  const l = labels.value
  const s = player.value.secondary
  if (s.cpRedrawUsed) return l.trackerCpRedrawUsed
  if ((current.value.currentTurn === 1 ? 1 : 0) !== props.pi) return l.trackerCpRedrawNotTurn
  if ((player.value.cp || 0) < 1) return l.trackerCpRedrawNoCp
  return l.trackerCpRedrawNote
})

// A replacement in progress: { slug, kind: 'cp' | 'shuffle' | 'discard' }.
const replace = ref(null)
function startRedraw(slug, how) {
  actionSlug.value = null
  openSlug.value = null
  if (source(slug) === 'chosen') replace.value = { slug, kind: how }
  else redrawSecondary(props.pi, slug, how)
}
function startCpRedraw(slug) {
  actionSlug.value = null
  replace.value = { slug, kind: 'cp' }
}
function onReplacePick(pick) {
  const { slug, kind } = replace.value
  replace.value = null
  if (kind === 'cp') cpRedraw(props.pi, slug, pick)
  else redrawSecondary(props.pi, slug, kind, pick)
}


function onSetAside(slug) { discardFromHand(props.pi, slug); actionSlug.value = null }
function onReturn(slug) { returnSecondaryToDeck(props.pi, slug); actionSlug.value = null }
function onRestore(slug) { restoreSecondaryToHand(props.pi, slug) }
</script>

<style scoped>
.sec { margin-top: 0.7rem; }
.sec-head { display: flex; flex-wrap: wrap; align-items: center; margin-bottom: 0.4rem; gap: 0 0.75rem; }
.sec-title { margin-right: auto; }
.take-btn {
  flex-shrink: 0; white-space: nowrap;
  padding: 0.45rem 0.8rem; background: var(--accent); color: #fff; border: none;
  font-size: 0.82rem; font-weight: 700; cursor: pointer;
}
.untake-btn {
  flex-shrink: 0; white-space: nowrap;
  display: inline-flex; align-items: center; gap: 0.3rem;
  min-height: 32px; padding: 0 0.3rem; background: none; border: none;
  font: inherit; font-size: 0.78rem; font-weight: 600; color: var(--text-dim); cursor: pointer;
}
@media (hover: hover) { .untake-btn:hover { color: var(--accent-ink); } }
.sec-empty { margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--text-dim); }
.cards { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.35rem; position: relative; }
/* No side stripe (owner, 2026-09-29): the player's own card already wears one, and three more
   inside it read as noise. The name keeps the side's colour. */
.card {
  display: flex;
  flex-wrap: wrap;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--side, var(--side-you)) 4%, var(--bg-card));
}
/* Hand transitions: draws fade/slide in, removed cards fade out in place (absolute, so
   the remaining cards FLIP-slide up via .card-move). */
.card-enter-active, .card-move { transition: opacity var(--motion-med) ease, transform var(--motion-med) ease; }
.card-enter-from { opacity: 0; transform: translateY(-6px); }
.card-leave-active { position: absolute; width: 100%; transition: opacity var(--motion-fast) ease; }
.card-leave-to { opacity: 0; }
/* The primary's card height (RoundTracker .mission-card): its padding, and the "⋯" takes no height
   of its own (negative margins). */
/* Strict rules' reason, on a line of its own under the card's head. */
.card-why { flex-basis: 100%; padding: 0 0.6rem 0.4rem; }
.card-head { flex: 1; min-width: 0; display: flex; align-items: center; gap: 0.5rem; padding: 0.4rem 0.6rem; }
/* The "⋯" is the card's right end: flush with its frame, a divider on its left, the full height of
   the line — not a box of its own poking through the frame (2026-09-29). */
.card-head .manage {
  align-self: stretch; min-height: 0;
  margin: -0.4rem -0.6rem -0.4rem 0;
  border: 0; border-left: 1px solid var(--border);
}
/* The whole line but the "⋯" opens the card. */
.card-open {
  flex: 1 1 auto; min-width: 0; display: flex; align-items: center; gap: 0.45rem;
  padding: 0; border: 0; background: none; font: inherit; text-align: left; cursor: pointer;
}
.card-name {
  flex: 1 1 auto; min-width: 0;
  font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; line-height: 1.1;
  color: var(--side, var(--side-you));
}
/* Hover as on the primary's card (RoundTracker .mission-card): the card's frame takes its side's
   colour — over the "⋯" too, whose divider joins it, so the button reads framed on all four
   sides rather than by one line (2026-09-29). */
@media (hover: hover) {
  .card:hover { border-color: var(--side, var(--side-you)); }
  .card:hover .card-head .manage { border-left-color: var(--side, var(--side-you)); }
}
.card-vp { font-family: var(--font-mono); font-weight: 700; font-size: 0.85rem; color: var(--text-primary); flex-shrink: 0; }
.cm-src { flex-shrink: 0; font-size: 0.8rem; color: var(--text-muted); }
.manage {
  min-width: 36px; min-height: 36px;
  background: none; border: 1px solid var(--border); color: var(--text-dim);
  cursor: pointer; font-size: 1rem; line-height: 1; padding: 0 0.55rem; flex-shrink: 0;
}
.manage:hover { color: var(--accent-ink); border-color: var(--accent); }
.manage.restore { display: flex; align-items: center; justify-content: center; }
.manage.restore .wi { font-size: 0.95rem; }

/* Set-aside (discarded) card: dimmed, dashed border, a "Discarded" badge. Only the card
   face is muted — the Return button stays fully legible so undoing an accidental set-aside
   is easy. */
.card.set-aside { border-style: dashed; }
.card.set-aside .card-name, .card.set-aside .cm-src { opacity: 0.6; }
/* A card marked to go at the end of the turn: in the side's colour, so it reads as the player's own
   choice, not the game's. */
.badge.badge-eot { color: var(--accent-ink); border-color: var(--accent); }
.badge {
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--text-dim);
  border: 1px solid var(--border);
  padding: 0 0.28rem;
  white-space: nowrap;
}
/* The sheet is the shared .act-list/.act-btn (style.css); each action says what it does in a
   line under its name. */
.act-btn { display: grid; gap: 0.15rem; }
.act-btn span { font-size: 0.76rem; font-weight: 400; color: var(--text-muted); line-height: 1.4; }
</style>
