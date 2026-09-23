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
    <template
      v-for="g in groups"
      :key="g.id"
    >
      <template v-if="g.entries.length">
        <h3
          class="rul-head"
          :class="{ locked: g.locked }"
        >
          {{ g.ally ? g.ally.name : labels[GROUP_LABEL_KEYS[g.id]] }}
          <em
            v-if="g.ally"
            class="rul-ally"
          >{{ g.locked ? labels.rosterAllyLocked : labels.rosterAllySection }}</em>
        </h3>
        <template
          v-for="e in g.entries"
          :key="e.uid"
        >
          <!-- Every block has a line of its own: the name (the player's own, or a numbered default
               until they write one), what the whole thing costs, and the fold. It is part of the
               block — the army-coloured edge runs through it — and tinted with the accent, the same
               way the catalogue tints a role header. -->
          <div
            v-if="blockOf(g.entries, e).length"
            class="rul-bhead"
          >
            <button
              type="button"
              class="rul-fold"
              :aria-expanded="!folded.has(e.uid)"
              :aria-label="labels.rosterAttachedFold"
              @click="toggleFold(e.uid)"
            >
              <i
                class="bi"
                :class="folded.has(e.uid) ? 'bi-chevron-right' : 'bi-chevron-down'"
              />
            </button>
            <button
              type="button"
              class="rul-bname"
              @click="openName(e)"
            >
              {{ e.blockName || labels.rosterBlockDefault.replace('{n}', blockNo.get(e.uid)) }}
            </button>
            <span class="rul-btotal">{{ hostBlockTotal(g.entries, e, (x) => pointsOf(x) || 0) }}{{ labels.rosterPointsLabel }}</span>
          </div>
          <div
            v-if="!isHidden(e)"
            class="rul-unit"
            :class="{
              'rul-attached': e.leaderOf,
              'rul-host': blockOf(g.entries, e).length,
              'rul-picked': inPane && openUid === e.uid,
            }"
          >
            <!-- The row is itself a button (it opens the configuration), so the actions sit
                 OUTSIDE it rather than inside — a button inside a button is invalid and doesn't
                 get its own click on every browser. They are positioned over the tile's top-right
                 corner at every width (see .rul-acts below). -->
            <div class="rul-headrow">
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
                <i
                  v-if="!inPane"
                  class="bi rul-chev"
                  :class="openUid === e.uid ? 'bi-chevron-down' : 'bi-chevron-right'"
                />
              </button>
              <!-- ONE button, and both actions behind it. Two icons on the tile put a trash can
                   a finger's width from the row that opens the unit's options — the mis-tap a
                   player reported, and the reason the undo bar exists at all. A menu costs the
                   deliberate action one tap and takes the accidental one off the table; it also
                   halves the strip the name's line has to leave free. -->
              <span class="rul-acts">
                <button
                  type="button"
                  class="rul-more"
                  :aria-label="labels.rosterMoreActions"
                  :title="labels.rosterMoreActions"
                  @click="menuFor = e"
                >
                  <i class="bi bi-three-dots-vertical" />
                </button>
              </span>
            </div>
            <CollapseTransition
              v-if="!narrow && !inPane"
              :show="openUid === e.uid"
            >
              <div class="rul-fields">
                <slot
                  name="fields"
                  :entry="e"
                />
              </div>
            </CollapseTransition>
          </div>
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
          <slot
            name="fields"
            :entry="openEntry"
          />
        </FactionAccentScope>
      </div>
    </BaseModal>

    <!-- The tile's own two actions, in the app's per-card actions sheet (the roster list's, the
         tracker's). Duplicate is ABSENT, not greyed, at the duplicate cap: a dead control earns
         its place by saying why it is dead, and this one no longer has to — the same unit is in
         the catalogue pane beside this list with its "+" greyed and its `N/limit` badge showing. -->
    <BaseModal
      v-if="menuFor"
      :title="defOf(menuFor.id)?.name || menuFor.id"
      max-width="340px"
      @close="menuFor = null"
    >
      <!-- Teleported to <body> like every modal, which leaves the view's faction-accent scope
           behind — Save came out in the app's red inside a green Necron list until this was put
           back (the same trap RosterUnitRulesModal and the config sheet above carry). -->
      <!-- Naming is offered where the block's own actions already are, and only on a host: a lone
           unit already has a note field of its own in its configuration. -->
      <FactionAccentScope :faction-slug="slugOf(menuFor.id)">
        <div
          v-if="!naming"
          class="modal-body act-list"
        >
          <button
            v-if="hasBlock(menuFor)"
            class="act-btn"
            @click="naming = true"
          >
            {{ labels.rosterBlockName }}
          </button>
          <button
            v-if="!dupBlocked(menuFor)"
            class="act-btn"
            @click="act('duplicate')"
          >
            {{ labels.rosterDuplicate }}
          </button>
          <button
            class="act-btn act-danger"
            @click="act('remove')"
          >
            {{ labels.rosterRemove }}
          </button>
        </div>
        <div
          v-else
          class="modal-body rul-name-body"
        >
          <label class="rul-name-lab">
            <span>{{ labels.rosterBlockName }}</span>
            <input
              ref="nameInput"
              v-model="nameDraft"
              type="text"
              :maxlength="BLOCK_NAME_MAX"
              :placeholder="defOf(menuFor.id)?.name || ''"
              @keyup.enter="saveName"
            >
          </label>
          <p class="rul-name-hint">
            {{ labels.rosterBlockNameHint }}
          </p>
          <div class="rul-name-acts">
            <button
              class="btn-ghost"
              @click="menuFor = null"
            >
              {{ labels.rosterCancel }}
            </button>
            <button
              class="btn-primary"
              @click="saveName"
            >
              {{ labels.rosterSave }}
            </button>
          </div>
        </div>
      </FactionAccentScope>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import BaseModal from '../BaseModal.vue'
import CollapseTransition from '../CollapseTransition.vue'
import FactionAccentScope from './FactionAccentScope.vue'
import RosterUnitRow from './RosterUnitRow.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useMediaQuery } from '../../composables/useMediaQuery.js'
import { BLOCK_NAME_MAX, GROUP_LABEL_KEYS, hostBlockTotal, setNote } from '../../composables/rosterEngine.js'

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
const emit = defineEmits(['toggle', 'duplicate', 'remove'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const inPane = computed(() => props.placement === 'pane')

// The characters joined to this entry, in the order the section already put them.
const blockOf = (entries, host) => (host.leaderOf ? [] : (entries || []).filter((e) => e.leaderOf === host.uid))

// Which blocks are folded, by host uid. Component state on purpose: folding is a gesture for
// getting one finished squad out of the way while you work on the next, not a setting — it does
// not survive a reload, and nothing is written anywhere. Everything starts open.
const folded = ref(new Set())
function toggleFold(uid) {
  const next = new Set(folded.value)
  next.has(uid) ? next.delete(uid) : next.add(uid)
  folded.value = next
}
const isHidden = (e) => !!e.leaderOf && folded.value.has(e.leaderOf)

const openEntry = computed(() => {
  for (const g of props.groups) {
    const hit = (g.entries || []).find((e) => e.uid === props.openUid)
    if (hit) return hit
  }
  return null
})

// Same 900px the editor's own panel padding uses.
const narrow = useMediaQuery('(max-width: 899px)')

// The entry whose actions sheet is open. Closing first, then emitting: the sheet is talking about
// a row that is about to be removed, and a modal left standing over a gap is the kind of thing
// that reads as a bug even when nothing is wrong.
const menuFor = ref(null)
function act(what) {
  const entry = menuFor.value
  menuFor.value = null
  if (entry) emit(what, entry)
}

// Whether that entry is a block's host, asked without the section it lives in — the sheet knows
// only the entry it was opened from.
const hasBlock = (e) => !!e && !e.leaderOf && props.groups.some((g) => (g.entries || []).some((x) => x.leaderOf === e.uid))
// Every block is numbered in reading order, across the whole list rather than per section: the
// default name is what the player sees until they write their own, and "Unit 2" has to mean the
// second block on the screen, not the second one in Battleline.
const blockNo = computed(() => {
  const m = new Map()
  let n = 0
  for (const g of props.groups || []) {
    for (const e of g.entries || []) {
      if (!e.leaderOf && (g.entries || []).some((x) => x.leaderOf === e.uid)) m.set(e.uid, ++n)
    }
  }
  return m
})

// The name is written straight onto the host entry, like every other field the editor touches —
// the store's deep watch is what saves it. `setNote` is the shared write: it trims, caps, and
// REMOVES the field when the text is emptied, so clearing a name is the same gesture as setting
// one and leaves nothing behind in the saved roster.
const naming = ref(false)
const nameDraft = ref('')
const nameInput = ref(null)
function openName(entry) {
  menuFor.value = entry
  naming.value = true
}
function saveName() {
  if (menuFor.value) setNote(menuFor.value, 'blockName', nameDraft.value, BLOCK_NAME_MAX)
  menuFor.value = null
}
watch(menuFor, (e) => {
  naming.value = naming.value && !!e
  nameDraft.value = e?.blockName || ''
  if (e && naming.value) nextTick(() => nameInput.value?.focus())
})
watch(naming, (on) => {
  if (on) nextTick(() => nameInput.value?.focus())
})
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
.rul-head.locked .rul-ally { color: var(--danger); }

.rul-unit {
  background: var(--bg-card);
  border: 1px solid var(--border);
  margin-bottom: 0.5rem;
  overflow: hidden;
}
@media (hover: hover) { .rul-unit:hover { border-color: var(--accent); } }
/* The block's own line, directly above the tiles it names. It carries the three things that belong
   to the BLOCK rather than to any one row: its name, the fold, and what the whole thing costs.
   Tinted with a fifth of the army's accent — the same mix the catalogue's role headers use, so a
   tinted bar means "a heading" everywhere — and carrying the block's left edge, so the edge runs
   the whole thing from the header down to the last character. */
.rul-bhead {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
  padding: 0.25rem 0.4rem;
  background: color-mix(in srgb, var(--accent) 20%, var(--bg-secondary));
  border: 1px solid var(--border);
  border-left: 2px solid var(--accent);
  border-bottom: none;
}
.rul-head + .rul-bhead,
.rul-bhead:first-child { margin-top: 0; }
.rul-bhead .rul-fold { align-items: center; padding: 0; color: var(--text-primary); }
.rul-bname {
  flex: 1;
  min-width: 0;
  padding: 0.15rem 0;
  border: none;
  background: none;
  color: var(--text-primary);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  text-align: left;
  overflow-wrap: anywhere;
  cursor: pointer;
}
@media (hover: hover) { .rul-bname:hover { color: var(--accent); } }
.rul-btotal {
  flex: none;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* Renaming, in the sheet the block's other actions already live in. */
.rul-name-body { padding: 1rem; display: flex; flex-direction: column; gap: 0.6rem; }
.rul-name-lab { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.78rem; color: var(--text-muted); }
.rul-name-lab input {
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font: inherit;
  font-size: 0.95rem;
}
.rul-name-lab input:focus { outline: none; border-color: var(--accent); }
.rul-name-hint { margin: 0; font-size: 0.74rem; line-height: 1.4; color: var(--text-dim); }
.rul-name-acts { display: flex; justify-content: flex-end; gap: 0.5rem; }

/* The attached block: the tiles touch, and the army's colour runs down the left of all of them —
   the host's tile included, so the edge starts where the block does. Drawn HERE rather than from
   the shared primitive in style.css, which cannot win against this component's own scoped
   `border` on .rul-unit (see the note there). */
.rul-unit:has(+ .rul-attached) { margin-bottom: 0; }
/* The header sits ON its block: no gap between the two, and the tile under it drops the border
   the header already drew. */
.rul-bhead + .rul-unit { border-top: none; }
.rul-unit.rul-attached,
.rul-unit.rul-host { border-left: 2px solid var(--accent); }

/* The action button is OUT of the row's flow, over the tile's top-right corner, and the row itself
   spans the full width underneath it. In flow it was a column as tall as the tile: ~4rem taken
   from every line of a unit's wargear, and — on a three-line entry — icons floating alone in the
   middle of a dead band, which is what made a perfectly ordinary tile look broken. Only the FIRST
   line pays for it now (RosterUnitRow's .rur-pts reserves the strip), the chips and the wargear
   run the full width beneath. */
.rul-headrow { position: relative; display: flex; }
.rul-acts { position: absolute; top: 0; right: 0; display: flex; }
/* How much room the row's first line has to leave for the buttons sitting over it — a custom
   property because that line is inside RosterUnitRow, and custom properties are the one thing
   that crosses a scoped-style boundary without :deep(). */
.rul-headrow { --rul-acts-w: 2rem; }
/* The fold twisty, on the host's row only. Its own control rather than part of the row, for the
   same reason the actions are: the row is a button (it opens the configuration), and a button
   inside a button is invalid. Narrow on purpose — it takes width from a name that has ~120px. */
.rul-fold {
  flex: none;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 1.6rem;
  padding: 0.55rem 0 0;
  border: none;
  background: none;
  color: var(--text-dim);
  font-size: 0.7rem;
  cursor: pointer;
}
@media (hover: hover) { .rul-fold:hover { color: var(--accent); } }
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

/* As tall as the row's first line is (0.6rem of padding + a 1.2rem line), so it sits ON that line
   rather than above or below it — and a one-line entry's tile is exactly this tall. */
.rul-more {
  flex: none; display: flex; align-items: center; justify-content: center;
  width: 2rem; height: 2.4rem; padding: 0; border: none; background: none;
  color: var(--text-muted); font-size: 0.95rem; cursor: pointer;
}
@media (hover: hover) { .rul-more:hover { color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); } }

/* Distinct from the header's plain --bg-card: an accent-tinted wash (same idiom as DatasheetCard's
   header/points bands). In LIGHT theme this reads fine against a selected checkbox tile
   (UnitEditorFields.vue's .opt-tile.on, itself a `color-mix(accent, transparent)` fill) — but in
   DARK theme the two accent tints sit too close in value and blended together, so dark mode drops
   the accent hue entirely for a plain darker-than-card shade instead. */
.rul-fields { padding: 0.6rem 0.75rem 0.75rem; background: color-mix(in srgb, var(--accent) 10%, var(--bg-card)); border-top: 1px solid var(--border); }
@media (prefers-color-scheme: dark) {
  .rul-fields { background: color-mix(in srgb, var(--bg-card) 80%, black); }
}

/* A narrow pane. Everything steps down together — including the action button, which the row
   above already lifted out of the flow; here it only gets smaller, and the chevron goes
   entirely (at this width its own 1.2rem is worth more to the wargear line than the affordance).

   Keyed off the pane, not the viewport: a 390px phone and a 780px tablet give this list the
   same ~180px, and only a container query can tell either of them apart from a wide screen. */
@container (max-width: 300px) {
  .rul-head { font-size: 0.92rem; }
  .rul-ally { font-size: 0.62rem; }
  .rul-row { padding: 0.45rem 0.5rem; gap: 0; }
  /* 24px wide even here: it is a tap target, and the 6px it takes from the name is the row's
     cheapest 6px — the name of a block header wraps one word later, the thumb hits every time. */
  .rul-fold { width: 1.5rem; padding-top: 0.45rem; }
  /* The fold eats into the row's own left padding rather than adding to it. */
  .rul-fold + .rul-row { padding-left: 0.15rem; }
  .rul-chev { display: none; }
  .rul-headrow { --rul-acts-w: 1.7rem; }
  /* 24px tall exactly — the minimum a tap target owes, and the height the row below it has to
     clear. Every pixel above that is a gap between a unit's name and its model count. */
  .rul-more { width: 1.7rem; height: 1.5rem; font-size: 0.8rem; }
}
</style>

<!-- Explicit data-theme must win over prefers-color-scheme in both directions (see FactionLayout).
     Unscoped: the same pair the two views carried for their own copies of this block. -->
<style>
:root[data-theme='light'] .rul-fields { background: color-mix(in srgb, var(--accent) 10%, var(--bg-card)); }
:root[data-theme='dark'] .rul-fields { background: color-mix(in srgb, var(--bg-card) 80%, black); }
</style>
