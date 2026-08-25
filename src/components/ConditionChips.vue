<template>
  <div v-if="switches.length" class="cond-chips">
    <!-- Chips are boxed when the set has something to say about itself: a group that HOLDS more
         than one (Creations of Bile picks two of six augmentations) has to say how full it is,
         because turning a third one on quietly drops the oldest — and a set that names its rule
         has to say WHICH, since six chips reading "Adrenalight"/"Hypex"/… are unreadable until
         something calls them Combat Drugs. Plain ungrouped states render flat, through a
         `display: contents` wrapper that adds no box of its own. -->
    <div v-for="g in groups" :key="g.key" class="cond-group" :class="{ boxed: g.limit > 1 || g.owner }">
      <!-- A set of options printed on one unit's card is switched here, far from that card, so the
           group says whose rule it is before it says how full it is. -->
      <span v-if="g.owner" class="cond-group-h cond-group-owner">
        {{ g.owner }}
        <!-- The rule's own text, where the set knows it — the answer to "what IS this?", one tap
             from the chips instead of three screens away on somebody's card. -->
        <button
          v-if="g.info"
          type="button"
          class="cond-group-info"
          data-kw-open
          :aria-label="g.owner"
          @click="$emit('info', { info: g.info }, $event.currentTarget.getBoundingClientRect())"
        ><i class="bi bi-info-circle"></i></button>
      </span>
      <span v-if="g.limit > 1" class="cond-group-h">
        {{ labels.rosterCondPicked.replace('{n}', g.picked).replace('{max}', g.limit) }}
      </span>
      <!-- A chip and, for one that names somebody's printed rule, the "i" beside it: "The Fiery
           Heart" is a name, not a rule, and the card explaining it is three screens away. A button
           cannot hold a button, so the pair shares a wrapper — and reads as one control split in
           two, the chip's own right edge being the line between them. -->
      <span v-for="sw in g.items" :key="sw.id" class="cond-item">
        <button
          type="button"
          class="cond-chip"
          :class="{ on: sw.on, auto: sw.auto || sw.blocked, stacked: subLine(sw) }"
          :aria-pressed="sw.on"
          :disabled="sw.auto || sw.blocked"
          :title="blockedHint(sw)"
          @click="$emit('toggle', sw)"
        >
          <!-- A square box, not a round one: this is a checkbox (each state stands alone), and
               round is the shape the app reserves for a radio-style either/or. -->
          <i class="bi" :class="sw.on ? 'bi-check-square-fill' : 'bi-square'"></i>
          <span class="cond-chip-text">
            {{ sw.label[locale] || sw.label.en }}
            <!-- The second line: this chip's own translated name (a stratagem's, which stays
                 English on the first line by project convention) and, if it cannot be tapped, why.
                 The reason used to live in `title` alone — invisible on a touch screen, which is
                 where this is read — so a chip that was inert by design looked like a broken one. -->
            <small v-if="subLine(sw)" class="cond-chip-sub">{{ subLine(sw) }}</small>
          </span>
        </button>
        <button
          v-if="sw.info"
          type="button"
          class="cond-info"
          data-kw-open
          :aria-label="sw.label[locale] || sw.label.en"
          @click="$emit('info', sw, $event.currentTarget.getBoundingClientRect())"
        ><i class="bi bi-info-circle"></i></button>
      </span>
    </div>
  </div>
</template>

<script setup>
// The one way a condition switch is drawn — above the unit list (army-wide states), on a unit's
// card, and inside the rule that names it. Three places showing the same switch, so they share
// one component rather than three sets of chips that could drift apart in look or in behaviour.
// Purely presentational: `switches` come from rosterGameContext's switchesFor() (or stratagemsFor),
// and flipping one is the parent's business (only it knows which player is being drawn). A chip is
// inert when the tracker owns the answer (`auto`) or when the rules forbid the change (`blocked` —
// a Battle-shocked unit cannot be targeted with stratagems).
import { computed } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from '../composables/useLocale.js'

const props = defineProps({
  switches: { type: Array, default: () => [] },
})
defineEmits(['toggle', 'info'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// Why a blocked chip cannot be tapped. The reason travels as a key (stratagemsFor's `blockedBy`)
// rather than as text, because the rule is the pure layer's to state and the wording is this one's.
const BLOCK_HINTS = {
  shock: 'stratBlockedShock',
  wrongPhase: 'stratBlockedPhase',
  unitPhase: 'stratBlockedUnit',
  usedPhase: 'stratBlockedUsed',
}
function blockedHint(sw) {
  const key = BLOCK_HINTS[sw.blockedBy]
  return key ? labels.value[key] : null
}

// A chip's own second line. The reason is shown only for the two that belong to THIS chip — a
// stratagem's timing, and one already spent this phase; the two block-wide ones (Battle-shock, the
// unit having been targeted already) are stated once above the whole group by the view that owns
// it, and repeating them on every chip is noise.
const OWN_REASON = new Set(['wrongPhase', 'usedPhase'])
function subLine(sw) {
  const parts = []
  if (sw.subLabel) parts.push(sw.subLabel)
  if (OWN_REASON.has(sw.blockedBy)) parts.push(blockedHint(sw))
  return parts.filter(Boolean).join(' · ') || null
}

// The switches in the order they came, bucketed by `group`. Ungrouped chips share one anonymous
// bucket rather than getting one each, so their relative order is untouched.
const groups = computed(() => {
  const out = []
  const byKey = new Map()
  for (const sw of props.switches) {
    // Bucketed by the group where there is one, else by the RULE the chips came from — without
    // that second key, two rules' ungrouped chips would share one bucket and one owner heading,
    // which would be a heading that lies about half of them.
    const key = sw.group || sw.groupOwner || ''
    let g = byKey.get(key)
    if (!g) {
      g = { key, limit: sw.group ? sw.groupLimit : 0, picked: 0, items: [], owner: sw.groupOwner || null, info: null }
      byKey.set(key, g)
      out.push(g)
    }
    if (!g.owner && sw.groupOwner) g.owner = sw.groupOwner
    // `groupInfo`, not `info`: a set explained by ONE rule (six Combat Drugs off one detachment
    // rule) puts that rule on the heading, while a set whose options each have their OWN rule (the
    // Triumph's six relics, one aura each) keeps an "i" per chip. Both are "a set with an owner",
    // so the owner cannot be what decides it — the caller says which it has.
    if (!g.info && sw.groupInfo) g.info = sw.groupInfo
    g.items.push(sw)
    if (sw.on) g.picked++
  }
  return out
})
</script>

<style scoped>
.cond-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
/* An uncapped bucket is not a box: it hands its chips straight to the flex row above. */
.cond-group { display: contents; }
.cond-group.boxed {
  display: flex; flex-wrap: wrap; align-items: center; gap: 0.4rem;
  padding: 0.35rem 0.5rem; border: 1px dashed var(--border);
}
.cond-group-h { color: var(--text-muted); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.04em; }
/* The unit whose card these options are printed on — the first thing in the box, on its own line. */
.cond-group-owner { flex-basis: 100%; display: flex; align-items: center; gap: 0.3rem; color: var(--text-primary); font-weight: 700; }
.cond-group-info {
  display: inline-flex; align-items: center;
  padding: 0; border: none; background: none;
  color: var(--text-muted); cursor: pointer; font-size: 0.85rem;
}
.cond-group-info:hover { color: var(--accent); }
/* stretch, not center: the "i" takes its height from the chip it is attached to, including the
   taller two-line variant below. */
.cond-item { display: inline-flex; align-items: stretch; }
/* Attached to the chip rather than floating beside it: both halves keep a full frame and the "i"
   is pulled one pixel left, so their edges land on top of each other as a single dividing line. */
.cond-info {
  display: inline-flex; align-items: center;
  padding: 0 0.45rem; margin-left: -1px;
  border: 1px solid var(--border);
  background: var(--bg-card); color: var(--text-muted); cursor: pointer; font-size: 0.8rem;
}
.cond-info:hover { color: var(--accent); border-color: var(--accent); }
/* …and whichever half is lit paints its own frame over that shared line. Without this the two
   grey pixels of the quiet half sit on top and the accent frame stops halfway, open on the side
   where the halves meet. Source order settles the tie, so a hovered "i" wins over a lit chip. */
.cond-chip.on,
.cond-chip:hover:not(:disabled),
.cond-info:hover { position: relative; z-index: 1; }
.cond-chip {
  display: inline-flex; align-items: center; gap: 0.35rem;
  padding: 0.3rem 0.65rem; border: 1px solid var(--border);
  background: var(--bg-card); color: var(--text-muted); font-size: 0.78rem; cursor: pointer;
}
.cond-chip:hover:not(:disabled) { border-color: var(--accent); color: var(--text-primary); }
.cond-chip.on { border-color: var(--accent); color: var(--accent); font-weight: 600; }
/* An inert chip has to LOOK inert: `cursor: default` says nothing on a touch screen, and a chip
   that cannot be tapped but reads exactly like one that can is indistinguishable from a bug. */
.cond-chip.auto { cursor: default; opacity: 0.55; border-style: dashed; }
/* Two lines need a left-aligned text column and a little more room top and bottom. */
.cond-chip.stacked { align-items: flex-start; padding-top: 0.28rem; padding-bottom: 0.28rem; }
.cond-chip.stacked .bi { margin-top: 0.1rem; }
.cond-chip-text { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.25; text-align: left; }
.cond-chip-sub { color: var(--text-muted); font-size: 0.68rem; font-weight: 400; }
</style>
