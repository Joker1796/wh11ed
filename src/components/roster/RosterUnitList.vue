<!-- The roster's own list, as both BUILDING screens draw it: the editor's Units tab and the
     creation wizard's units step. Sections, attached-unit blocks, per-entry actions and the
     open/closed state of one entry's configuration.

     One component rather than the two near-identical copies the two views held (`.redu-*` and
     `.rcunit-*`), for the same reason `RosterUnitRow` is one: the copies drift, and the attached
     block in particular is three coordinated pieces (the indent, the role tag, the block total)
     that have to agree.

     The configuration itself stays with the CALLER, through the `fields` scoped slot —
     `UnitEditorFields` needs the roster's detachments, its other entries, the enhancement options
     and the leader targets, all of which the views already compute. This component decides only
     WHERE those fields appear:

       - a wide screen puts them inline, under the row, as an accordion;
       - a narrow one puts them in a modal, because the list shares its width with the catalogue
         beside it and a wargear editor does not fit in half a phone;
       - `placement="pane"` puts them NOWHERE — the desk layout (≥1200px) has a column of its own
         for them, so this component only reports which entry is chosen and marks that row.

     The modal is teleported to <body> and therefore leaves the view's faction-accent scope behind,
     which is what FactionAccentScope is for (see RosterUnitRulesModal.vue for the same trap). -->
<template>
  <div class="rul">
    <template v-for="g in groups" :key="g.id">
      <template v-if="g.entries.length">
        <h3 class="rul-head" :class="{ locked: g.locked }">
          {{ g.ally ? g.ally.name : labels[GROUP_LABEL_KEYS[g.id]] }}
          <em v-if="g.ally" class="rul-ally">{{ g.locked ? labels.rosterAllyLocked : labels.rosterAllySection }}</em>
        </h3>
        <template v-for="(e, idx) in g.entries" :key="e.uid">
          <div class="rul-unit" :class="{ 'rul-attached roster-attached': e.leaderOf, 'rul-picked': inPane && openUid === e.uid }">
            <!-- The row is itself a button (it opens the configuration), so the actions sit
                 OUTSIDE it rather than inside — a button inside a button is invalid and doesn't
                 get its own click on every browser. They are positioned over the tile's top-right
                 corner at every width (see .rul-acts below). -->
            <div class="rul-headrow" :class="{ 'rul-one-act': dupBlocked(e) }">
              <button
                type="button"
                class="rul-row"
                :aria-expanded="openUid === e.uid"
                @click="$emit('toggle', e.uid)"
              >
                <RosterUnitRow
                  :entry="e"
                  :def="defOf(e.id)"
                  :items="items"
                  :points="pointsOf(e) || 0"
                  :detachments="detachments"
                  :role="roleOf(e)"
                />
                <i v-if="!inPane" class="bi rul-chev" :class="openUid === e.uid ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
              </button>
              <span class="rul-acts">
                <!-- Absent, not greyed, at the duplicate cap. A dead control earns its place by
                     saying why it is dead, and this one no longer has to: the same unit is in the
                     catalogue pane beside this list with its own "+" greyed and its `N/limit`
                     badge showing. That was two screens apart before the panes. -->
                <button
                  v-if="!dupBlocked(e)"
                  type="button"
                  class="rul-dup"
                  :aria-label="labels.rosterDuplicate"
                  :title="labels.rosterDuplicate"
                  @click="$emit('duplicate', e)"
                >
                  <i class="bi bi-copy"></i>
                </button>
                <button
                  type="button"
                  class="rul-del"
                  :aria-label="labels.rosterRemove"
                  :title="labels.rosterRemove"
                  @click="$emit('remove', e)"
                >
                  <i class="bi bi-trash3"></i>
                </button>
              </span>
            </div>
            <CollapseTransition v-if="!narrow && !inPane" :show="openUid === e.uid">
              <div class="rul-fields"><slot name="fields" :entry="e" /></div>
            </CollapseTransition>
          </div>
          <!-- The attached unit's own points, once, under the last row of the block: the numbers
               above it still read down the column and still add up to the roster total, which a
               combined figure on the bodyguard's row would have broken. -->
          <p v-if="blockTotal(g.entries, idx) != null" class="roster-sum">
            {{ labels.rosterAttachedTotal }} · {{ blockTotal(g.entries, idx) }}{{ labels.rosterPointsLabel }}
          </p>
        </template>
      </template>
    </template>

    <BaseModal
      v-if="narrow && !inPane && openEntry"
      :title="defOf(openEntry.id)?.name || openEntry.id"
      max-width="640px"
      @close="$emit('toggle', openUid)"
    >
      <!-- The scrolling element must be BaseModal's own child: `.modal` is a flex column with a
           max-height and `overflow: hidden`, and only a flex item that is itself a scroll
           container may shrink below its content. With the accent wrapper on the outside, that
           item was a plain div — it kept its full content height, the modal clipped it, and on a
           phone (the only width that opens this sheet) everything below the fold was simply
           unreachable. Accent inside, body outside. -->
      <div class="modal-body rul-sheet">
        <FactionAccentScope :faction-slug="slugOf(openEntry.id)">
          <slot name="fields" :entry="openEntry" />
        </FactionAccentScope>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseModal from '../BaseModal.vue'
import CollapseTransition from '../CollapseTransition.vue'
import FactionAccentScope from './FactionAccentScope.vue'
import RosterUnitRow from './RosterUnitRow.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useMediaQuery } from '../../composables/useMediaQuery.js'
import { GROUP_LABEL_KEYS, attachedBlockTotal } from '../../composables/rosterEngine.js'

const props = defineProps({
  // rosterEngine's sectionsOf output, with `items` renamed `entries` by the caller.
  groups: { type: Array, required: true },
  defOf: { type: Function, required: true },
  items: { type: Object, default: () => ({}) },
  detachments: { type: Array, default: () => [] },
  pointsOf: { type: Function, default: () => 0 },
  // "Leader" / "Support" for an attached character — the caller knows the host, this doesn't.
  roleOf: { type: Function, default: () => '' },
  // Which faction's bundle an entry belongs to (an ally's is not the army's) — only for the
  // modal's accent scope.
  slugOf: { type: Function, default: () => '' },
  dupBlocked: { type: Function, default: () => false },
  openUid: { type: String, default: null },
  // 'auto' — inline accordion, or a modal on a narrow screen. 'pane' — the caller renders the
  // fields itself, in a column beside this list.
  placement: { type: String, default: 'auto' },
})
defineEmits(['toggle', 'duplicate', 'remove'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const inPane = computed(() => props.placement === 'pane')

const blockTotal = (entries, i) => attachedBlockTotal(entries, i, (x) => props.pointsOf(x))

const openEntry = computed(() => {
  for (const g of props.groups) {
    const hit = (g.entries || []).find((e) => e.uid === props.openUid)
    if (hit) return hit
  }
  return null
})

// Same 900px the editor's own panel padding uses.
const narrow = useMediaQuery('(max-width: 899px)')
</script>

<style scoped>
/* In the desk layout the row IS the selection: the fields it opens are in the next column, so
   the only thing saying which unit that column belongs to is this. */
.rul-picked { outline: 1px solid var(--accent); outline-offset: -1px; }

.rul-head {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 1.1rem 0 0.5rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--border);
}
.rul-head:first-child { margin-top: 0; }
/* An ally heading names the group; the tag after it says what the group IS, so the reader isn't
   left guessing why "Agents of the Imperium" is a heading inside a Custodes list. */
.rul-ally {
  margin-left: 0.5em;
  font-family: var(--font-body, inherit);
  font-size: 0.72rem;
  font-style: normal;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}
.rul-head.locked .rul-ally { color: #c0392b; }

.rul-unit {
  background: var(--bg-card);
  border: 1px solid var(--border);
  margin-bottom: 0.5rem;
  overflow: hidden;
}
@media (hover: hover) { .rul-unit:hover { border-color: var(--accent); } }
/* Closes the gap to the character indented below it — the block's own look is the shared
   .roster-attached / .roster-sum pair in style.css. */
.rul-unit:has(+ .rul-attached) { margin-bottom: 0; }

/* The two actions are OUT of the row's flow, over the tile's top-right corner, and the row
   itself spans the full width underneath them. In flow they were a column as tall as the tile:
   ~4rem taken from every line of a unit's wargear, and — on a three-line entry — a pair of icons
   floating alone in the middle of a dead band, which is what made a perfectly ordinary tile look
   broken. Only the FIRST line pays for them now (RosterUnitRow's .rur-pts reserves the strip),
   the chips and the wargear run the full width beneath. */
.rul-headrow { position: relative; display: flex; }
.rul-acts { position: absolute; top: 0; right: 0; display: flex; }
/* How much room the row's first line has to leave for the buttons sitting over it — a custom
   property because that line is inside RosterUnitRow, and custom properties are the one thing
   that crosses a scoped-style boundary without :deep(). */
.rul-headrow { --rul-acts-w: 4rem; }
.rul-headrow.rul-one-act { --rul-acts-w: 2rem; }
.rul-row {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.6rem;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}
/* Ahead of the name, not after it: the right edge of the line belongs to the points and the two
   action buttons now, and a chevron centred in a three-line tile pointed at nothing in
   particular. Top-aligned (with the optical nudge a 0.7rem glyph needs against a 0.95rem line)
   so it reads as the twisty of the accordion it opens. */
.rul-chev { order: -1; align-self: flex-start; margin-top: 0.2rem; color: var(--text-dim); font-size: 0.7rem; flex-shrink: 0; }

/* As tall as the row's first line is (0.6rem of padding + a 1.2rem line), so the pair sits ON
   that line rather than above or below it — and a one-line entry's tile is exactly this tall. */
.rul-dup,
.rul-del {
  flex: none; display: flex; align-items: center; justify-content: center;
  width: 2rem; height: 2.4rem; padding: 0; border: none; background: none;
  color: var(--text-muted); font-size: 0.95rem; cursor: pointer;
}
@media (hover: hover) { .rul-dup:hover:not(:disabled) { color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); } }
.rul-dup:disabled { opacity: 0.35; cursor: not-allowed; }
@media (hover: hover) { .rul-del:hover { color: #c0392b; background: color-mix(in srgb, #c0392b 8%, transparent); } }

/* Distinct from the header's plain --bg-card: an accent-tinted wash (same idiom as DatasheetCard's
   header/points bands). In LIGHT theme this reads fine against a selected checkbox tile
   (UnitEditorFields.vue's .opt-tile.on, itself a `color-mix(accent, transparent)` fill) — but in
   DARK theme the two accent tints sit too close in value and blended together, so dark mode drops
   the accent hue entirely for a plain darker-than-card shade instead. */
.rul-fields { padding: 0.6rem 0.75rem 0.75rem; background: color-mix(in srgb, var(--accent) 10%, var(--bg-card)); border-top: 1px solid var(--border); }
@media (prefers-color-scheme: dark) {
  .rul-fields { background: color-mix(in srgb, var(--bg-card) 80%, black); }
}

/* A narrow pane. Everything steps down together — including the action buttons, which the row
   above already lifted out of the flow; here they only get smaller, and the chevron goes
   entirely (at this width its own 1.2rem is worth more to the wargear line than the affordance).

   Keyed off the pane, not the viewport: a 390px phone and a 780px tablet give this list the
   same ~180px, and only a container query can tell either of them apart from a wide screen. */
@container (max-width: 300px) {
  .rul-head { font-size: 0.92rem; }
  .rul-ally { font-size: 0.62rem; }
  .rul-row { padding: 0.45rem 0.5rem; gap: 0; }
  .rul-chev { display: none; }
  .rul-headrow { --rul-acts-w: 3.4rem; }
  .rul-headrow.rul-one-act { --rul-acts-w: 1.7rem; }
  .rul-dup,
  .rul-del { width: 1.7rem; height: 1.8rem; font-size: 0.8rem; }
}
</style>

<!-- Explicit data-theme must win over prefers-color-scheme in both directions (see FactionLayout).
     Unscoped: the same pair the two views carried for their own copies of this block. -->
<style>
:root[data-theme='light'] .rul-fields { background: color-mix(in srgb, var(--accent) 10%, var(--bg-card)); }
:root[data-theme='dark'] .rul-fields { background: color-mix(in srgb, var(--bg-card) 80%, black); }
</style>
