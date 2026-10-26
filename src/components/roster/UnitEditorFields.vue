<template>
  <div class="ues">
    <!-- The two things that are not configuration, on one line above it: the way OUT of this panel
         to the unit's own rules, and the player's own note about this unit. The note sits beside
         the button rather than in a section of its own at the foot of the panel — it is one short
         field, and a section for it cost a heading, a rule and a row of a phone (CLAUDE.md,
         "Vertical density": spend sideways before spending down). -->
    <div class="ues-top">
      <button
        v-if="def.linked && factionSlug"
        type="button"
        class="btn-ghost ues-sheet-link"
        @click="rulesOpen = true"
      >
        <i class="wi wi-datasheet" /> {{ labels.rosterShowDatasheet }}
      </button>
      <label class="ues-note">
        <span class="ues-note-lab">{{ labels.rosterNote }}</span>
        <input
          type="text"
          :maxlength="ENTRY_NOTE_MAX"
          :value="entry.note || ''"
          @input="writeNote(entry, 'note', $event.target.value)"
        >
      </label>
    </div>
    <!-- Teleported to <body>: this component can render inside an accordion wrapped by
         CollapseTransition, whose `contain: layout paint` makes it a containing block for
         `position: fixed` descendants — without the teleport, BaseModal's fixed overlay would
         be clipped to the (collapsed-height) accordion row instead of covering the viewport. -->
    <Teleport
      v-if="rulesOpen"
      to="body"
    >
      <FactionAccentScope :faction-slug="factionSlug">
        <RosterUnitRulesModal
          :unit-id="sheetId"
          :faction-slug="factionSlug"
          :ctx="sheetCtx"
          building
          @close="rulesOpen = false"
        />
      </FactionAccentScope>
    </Teleport>

    <!-- Moving a Character that already leads another unit: say what changes before it does
         (owner, 2026-10-07 — one tap silently took the Leader off the other squad). -->
    <Teleport
      v-if="moveAsk"
      to="body"
    >
      <FactionAccentScope :faction-slug="factionSlug">
        <ConfirmModal
          :title="moveAsk.title"
          :message="moveAsk.message"
          :confirm-label="moveAsk.confirmLabel"
          :cancel-label="labels.rosterCancel"
          @confirm="confirmMove"
          @close="moveAsk = null"
        />
      </FactionAccentScope>
    </Teleport>
    <!-- A "Can be led by" / "Can lead" row's sheet — a preview, like the catalogue's: the unit is
         not in the list, so the overlay gets the army's Detachments and nothing of an entry. Its
         own faction's slug and bare id (RosterEntryFields), since an Inquisitor offered to a
         Space Marines squad is an Imperial Agents sheet. -->
    <Teleport
      v-if="sheetPreview"
      to="body"
    >
      <FactionAccentScope :faction-slug="sheetPreview.slug">
        <RosterUnitRulesModal
          :unit-id="sheetPreview.sheetId"
          :faction-slug="sheetPreview.slug"
          :ctx="previewCtx"
          building
          @close="sheetPreview = null"
        />
      </FactionAccentScope>
    </Teleport>
    <Teleport
      v-if="weaponInfoNames"
      to="body"
    >
      <WeaponProfileModal
        :unit-id="sheetId"
        :faction-slug="factionSlug"
        :names="weaponInfoNames"
        :heading="weaponInfoHeading"
        @close="weaponInfoNames = null"
      />
    </Teleport>
    <Teleport
      v-if="enhInfoName"
      to="body"
    >
      <EnhancementRuleModal
        :name="enhInfoName"
        :faction-slug="factionSlug"
        :detachments="detachments"
        @close="enhInfoName = null"
      />
    </Teleport>

    <!-- Unit size -->
    <section
      v-if="def.sizes.length > 1"
      class="ues-sec"
    >
      <h4 class="ues-h">
        {{ labels.rosterUnitSize }}
      </h4>
      <div class="opt-row">
        <button
          v-for="(s, i) in def.sizes"
          :key="i"
          class="pill"
          data-press
          :class="{ on: (entry.size ?? 0) === i }"
          @click="setSize(i)"
        >
          {{ sizeLabel(s) }} · {{ s.pts }}{{ labels.rosterPointsLabel }}<span
            v-if="sizeTells[i]"
            class="pill-tell"
          > · {{ sizeTells[i] }}</span>
        </button>
      </div>
    </section>
    <!-- Model count. Picking a bracket fills it to the top (see setSize), so the chip states the
         other end: this many models is allowed too, and the − is right there. -->
    <!-- Opens and closes with the bracket (a fixed-size one has no count to choose), so what is
         below slides down to make room instead of jumping (2026-09-28). While closing it keeps the
         last ranged bracket's numbers, not the fixed one's. -->
    <CollapseTransition :show="curRange">
      <section
        v-if="rangeSize"
        class="ues-sec ues-count"
      >
        <h4 class="ues-h">
          {{ labels.rosterModelsLabel }}
          <span class="ues-cap">{{ labels.rosterModelsMin.replace('{n}', rangeSize.per[0]) }}</span>
        </h4>
        <NumberStepper
          compact
          :model-value="models"
          :min="rangeSize.per[0]"
          :max="rangeSize.per[1]"
          :editable="rangeSize.per[1] - rangeSize.per[0] >= TYPE_FROM"
          :label="labels.rosterModelsLabel"
          @update:model-value="setCount"
        />
      </section>
    </CollapseTransition>
    <ExpandTransition>
      <p
        v-if="compLine"
        class="ues-comp"
      >
        {{ compLine }}
      </p>
    </ExpandTransition>
    <!-- What shrinking the unit took off it, with the way back. Transient: it lives until the
         next change to this unit, and it is the only trace of picks the editor removed itself. -->
    <ExpandTransition>
      <p
        v-if="trimmed"
        class="ues-trimmed"
        role="status"
      >
        {{ labels.rosterWargearTrimmed }}
        <button
          type="button"
          class="btn-ghost"
          @click="undoTrim"
        >
          {{ labels.rosterWargearTrimUndo }}
        </button>
      </p>
    </ExpandTransition>

    <!-- Allegiance: a mark the unit must pick (Mark of Chaos, Daemonic Allegiance) or a capped
         detachment upgrade that hands it a keyword. Same widget for both — what differs is
         whether leaving it unset is an error, which validateRoster reports. -->
    <section
      v-if="alleg"
      class="ues-sec"
    >
      <h4 class="ues-h">
        {{ alleg.t }}
        <em
          v-if="alleg.req"
          class="ues-req"
        >{{ labels.rosterAllegianceRequired }}</em>
        <em
          v-else-if="alleg.max && defOf"
          class="ues-req"
        >{{ allegSpentInArmy }} / {{ alleg.max }}</em>
      </h4>
      <div class="opt-row">
        <button
          v-for="o in alleg.o"
          :key="o.n"
          class="pill"
          :class="{ on: entry.alleg === o.n }"
          @click="setAlleg(o.n)"
        >
          {{ o.n }}<span
            v-if="o.wg"
            class="pill-tell"
          > · {{ items[o.wg] }}</span>
        </button>
      </div>
    </section>

    <!-- Wargear no group replaces (read-only, and no pick changes it — what a pick can touch is in
         its group below, the stock weapon as a row of its own). The stock loadout's own points,
         where it has any, are marked on the heading: the size pill shows the Munitorum bracket,
         and without this the difference between that and the unit's total (a Terminator Assault
         Squad's ten thunder hammers, +50) is invisible. -->
    <ExpandTransition>
      <section
        v-if="defaultLines.length || defaultPts"
        class="ues-sec"
      >
        <h4 class="ues-h">
          {{ defaultLines.length ? labels.rosterFixedWargear : labels.rosterDefaultWargear }}
          <ExpandTransition>
            <em
              v-if="defaultPts"
              class="ues-req"
            >+{{ defaultPts }}{{ labels.rosterPointsLabel }}</em>
          </ExpandTransition>
        </h4>
        <div
          v-if="defaultLines.length"
          class="opt-tile ues-default-row"
        >
          <div class="ues-default-list">
            <p
              v-for="(l, i) in defaultLines"
              :key="i"
              class="ues-default"
            >
              <span
                v-if="l.mini"
                class="ues-mini"
              >{{ l.mini }}:</span> {{ l.items }}
            </p>
          </div>
          <button
            v-if="defaultNames.length"
            type="button"
            class="opt-info"
            :aria-label="labels.rosterViewInfo"
            @click="openWeaponInfo(defaultNames, labels.rosterFixedWargear)"
          >
            <i class="wi wi-info" />
          </button>
        </div>
      </section>
    </ExpandTransition>

    <!-- Warlord -->
    <ExpandTransition>
      <section
        v-if="canWarlord"
        class="ues-sec"
      >
        <div
          class="opt-tile"
          :class="{ on: isWarlord }"
        >
          <label class="opt-select">
            <input
              type="checkbox"
              :checked="isWarlord"
              @change="$emit('toggle-warlord')"
            >
            <span class="opt-name"><i class="wi wi-flag wl-flag" /> {{ labels.rosterWarlord }}</span>
          </label>
        </div>
      </section>
    </ExpandTransition>

    <!-- Wargear choices: UnitWargearGroups.vue, which draws every option group and hands each
         pick back here (`set-wg`), since this component owns the entry. -->
    <UnitWargearGroups
      :def="def"
      :entry="entry"
      :items="items"
      :texts="texts"
      @set-wg="setWg"
      @weapon-info="openWeaponInfo"
    />

    <!-- Enhancement — only ones this unit could actually take (ineligible-for-this-unit options
         from the detachment's full list are hidden, not just disabled; an eligible one already
         used by another entry still shows, disabled, so it's clear why it can't be picked here). -->
    <ExpandTransition>
      <section
        v-if="visibleEnhOptions.length"
        class="ues-sec"
      >
        <h4 class="ues-h">
          {{ labels.rosterEnhancement }}
        </h4>
        <div class="opt-col">
          <div
            v-for="e in visibleEnhOptions"
            :key="`${e.det}|${e.name}`"
            class="opt-tile"
            :class="{
              on: e.mandatory ? e.eligible : entry.enh === e.name,
              disabled: e.mandatory ? true : e.used && entry.enh !== e.name,
            }"
          >
            <label class="opt-select">
              <input
                type="checkbox"
                :checked="e.mandatory ? e.eligible : isEnh(e)"
                :disabled="e.mandatory || (e.used && !isEnh(e))"
                @change="toggleEnh(e)"
              >
              <span class="opt-name">
                {{ e.name }}
                <span
                  v-if="e.dup"
                  class="opt-tag"
                >{{ e.det }}</span>
                <span
                  v-if="e.mandatory && e.eligible"
                  class="opt-tag"
                >{{ labels.rosterEnhMandatory }}</span>
                <span
                  v-else-if="e.used"
                  class="opt-tag"
                >{{ labels.rosterEnhUsed }}</span>
              </span>
              <span
                v-if="e.pts"
                class="opt-pts"
              >+{{ e.pts }}</span>
            </label>
            <button
              type="button"
              class="opt-info"
              data-press
              :aria-label="labels.rosterViewInfo"
              @click="openEnhInfo(e.name)"
            >
              <i class="wi wi-info" />
            </button>
          </div>
        </div>
      </section>
    </ExpandTransition>

    <!-- Leader attachment — no separate "not attached" tile: unticking the selected checkbox
         already means that (same logic as the enhancement list above). -->
    <ExpandTransition>
      <section
        v-if="leaderTargets.length || joinHint"
        class="ues-sec"
      >
        <h4 class="ues-h">
          {{ def?.joins ? labels.rosterJoinTo : labels.rosterAttachTo }}
        </h4>
        <!-- A unit that joins a unit already led: with no such unit in the list, say what it needs
             rather than draw an empty picker or none at all. -->
        <p
          v-if="!leaderTargets.length"
          class="ues-join-none"
        >
          {{ joinHint }}
        </p>
        <div
          v-else
          class="opt-col"
        >
          <div
            v-for="t in leaderTargets"
            :key="t.uid"
            class="opt-tile"
            :class="{ on: entry.leaderOf === t.uid, disabled: t.used && entry.leaderOf !== t.uid }"
          >
            <label class="opt-select">
              <input
                type="checkbox"
                :checked="entry.leaderOf === t.uid"
                :disabled="t.used && entry.leaderOf !== t.uid"
                @change="toggleLeader(t.uid)"
              >
              <span class="opt-name">
                {{ t.name }}
                <span
                  v-if="t.type === 'support'"
                  class="opt-tag"
                >{{ labels.rosterSupportTag }}</span>
                <span
                  v-if="t.used && entry.leaderOf !== t.uid"
                  class="opt-tag"
                >{{ labels.rosterEnhUsed }}</span>
                <!-- Only where the datasheet name is offered twice — three identical words in a row
                     and the player has to guess which squad they mean. -->
                <em
                  v-if="targetHints.get(t.uid)"
                  class="opt-which"
                >{{ targetHints.get(t.uid) }}</em>
              </span>
            </label>
          </div>
        </div>
      </section>
    </ExpandTransition>

    <!-- The same attachment from the squad's end (a player's request): the Leaders and Supports in
         the list that could join THIS unit. Ticking one attached elsewhere asks first (ConfirmModal,
         saying what the move does) and then moves it here; its row says where it is now. -->
    <ExpandTransition>
      <section
        v-if="leaderSources.length"
        class="ues-sec"
      >
        <h4 class="ues-h">
          {{ labels.rosterAttachHere }}
        </h4>
        <div class="opt-col">
          <div
            v-for="s in leaderSources"
            :key="s.uid"
            class="opt-tile"
            :class="{ on: isAttachedHere(s.uid), disabled: s.used }"
          >
            <label class="opt-select">
              <input
                type="checkbox"
                :checked="isAttachedHere(s.uid)"
                :disabled="s.used"
                @change="toggleSource(s.uid, $event)"
              >
              <span class="opt-name">
                {{ s.name }}
                <span
                  v-if="s.type === 'support'"
                  class="opt-tag"
                >{{ labels.rosterSupportTag }}</span>
                <span
                  v-else-if="s.type === 'join'"
                  class="opt-tag"
                >{{ labels.rosterJoinTag }}</span>
                <span
                  v-if="s.used"
                  class="opt-tag"
                >{{ labels.rosterEnhUsed }}</span>
                <em
                  v-if="sourceHints.get(s.uid)"
                  class="opt-which"
                >{{ sourceHints.get(s.uid) }}</em>
              </span>
            </label>
          </div>
        </div>
      </section>
    </ExpandTransition>

    <!-- "Can be led by" (a player's ask, 2026-10-06) on a squad, and its mirror "Can lead" (owner,
         2026-10-08) on a Character: what the CATALOGUE holds that could be attached here and the
         list cannot give yet — the sections above only know what is already in it, so a squad
         added first said nothing. One markup for both. Folded by default, the count on the
         heading: a Space Marines squad has a dozen and more. "+" adds the unit and attaches it in
         one tap. Only rows that could be attached right now arrive here (RosterEntryFields drops
         a taken slot and a reached cap), so every "+" works. -->
    <ExpandTransition
      v-for="l in addLists"
      :key="l.key"
    >
      <section
        v-if="l.rows.length"
        class="ues-sec"
      >
        <!-- A heading holding its toggle (not a button styled as one): the display face and the
             heading's place in the outline stay those of every other section here. -->
        <h4
          class="ues-h ues-fold-h"
          :class="{ open: foldOpen[l.key] }"
        >
          <button
            type="button"
            class="ues-fold"
            :aria-expanded="!!foldOpen[l.key]"
            @click="foldOpen[l.key] = !foldOpen[l.key]"
          >
            <ChevronIcon
              class="ues-fold-chev"
              :turned="!!foldOpen[l.key]"
            />
            <span>{{ l.title }}</span>
          </button>
        </h4>
        <CollapseTransition :show="!!foldOpen[l.key]">
          <div class="opt-col">
            <div
              v-for="c in l.rows"
              :key="c.id"
              class="opt-tile"
            >
              <!-- The row itself opens the unit's datasheet — "who could join" is usually followed
                   by "and what does it do", and the answer is one tap away instead of a trip to
                   the catalogue. An unlinked unit has no sheet to open. -->
              <button
                v-if="c.linked"
                type="button"
                class="opt-step-body opt-open"
                :title="labels.rosterShowDatasheet"
                @click="sheetPreview = c"
              >
                <span class="opt-name">
                  {{ c.name }}
                  <span
                    v-if="c.type === 'support'"
                    class="opt-tag"
                  >{{ labels.rosterSupportTag }}</span>
                </span>
                <span class="opt-pts">{{ c.pts }}</span>
              </button>
              <div
                v-else
                class="opt-step-body"
              >
                <span class="opt-name">
                  {{ c.name }}
                  <span
                    v-if="c.type === 'support'"
                    class="opt-tag"
                  >{{ labels.rosterSupportTag }}</span>
                </span>
                <span class="opt-pts">{{ c.pts }}</span>
              </div>
              <button
                type="button"
                class="opt-info"
                data-press
                :aria-label="l.addLabel.replace('{unit}', c.name)"
                :title="l.addLabel.replace('{unit}', c.name)"
                @click="l.add(c)"
              >
                <i class="wi wi-add" />
              </button>
            </div>
          </div>
        </CollapseTransition>
      </section>
    </ExpandTransition>
  </div>
</template>

<script setup>
// The unit-configuration fields (size, wargear, warlord, enhancement, leader attachment) —
// shared by the creation wizard's step 3 and the roster editor's Loadout tab, each rendering it
// inline inside a per-unit accordion. This component owns no chrome of its own.
import { computed, ref, watch } from 'vue'
import NumberStepper from '../tracker/NumberStepper.vue'
import CollapseTransition from '../CollapseTransition.vue'
import ChevronIcon from '../ChevronIcon.vue'
import ExpandTransition from '../ExpandTransition.vue'
import RosterUnitRulesModal from './RosterUnitRulesModal.vue'
import UnitWargearGroups from './UnitWargearGroups.vue'
import { TYPE_FROM } from './typeableCount.js'
import WeaponProfileModal from './WeaponProfileModal.vue'
import EnhancementRuleModal from './EnhancementRuleModal.vue'
import ConfirmModal from '../ConfirmModal.vue'
import FactionAccentScope from './FactionAccentScope.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { ENTRY_NOTE_MAX, sizeOf, modelCount, allySourceOf, allegFor, allegSpent, defaultWargearPoints, fixedLoadoutLines, fitWargear, modelsPerMini, setNote } from '../../composables/rosterEngine.js'

const props = defineProps({
  entry: { type: Object, required: true },
  def: { type: Object, required: true },
  items: { type: Object, required: true },
  texts: { type: Object, required: true },
  factionSlug: { type: String, default: '' },
  // The roster's selected detachments — passed straight through to RosterUnitRulesModal's
  // overlay ctx, which reads them for the keywords a detachment grants this unit
  // (rosterModifiers.js). Nothing in this component's own UI uses them.
  detachments: { type: Array, default: () => [] },
  // The roster's own entries, likewise passed straight through: the overlay reads them to find
  // any Leader attached to THIS entry, whose abilities it then shows on this unit's card.
  units: { type: Array, default: () => [] },
  // Resolves a unit id to its faction-data definition — only needed for the army-wide allegiance
  // cap, which has to look at the other entries.
  defOf: { type: Function, default: null },
  canWarlord: { type: Boolean, default: false },
  isWarlord: { type: Boolean, default: false },
  enhOptions: { type: Array, default: () => [] },
  leaderTargets: { type: Array, default: () => [] },
  // rosterEngine's leaderSourcesFor: the entries that could be attached to this one.
  leaderSources: { type: Array, default: () => [] },
  // rosterEngine's leaderCandidatesFor, narrowed to who could join this unit right now.
  leaderCandidates: { type: Array, default: () => [] },
  // rosterEngine's leaderHostsFor, narrowed the same way: the units this Character could lead.
  leaderHosts: { type: Array, default: () => [] },
})
// The cards' contexts as objects of their own, not template literals (a new object per render —
// see RosterUnitBrowser's previewCtx).
const sheetCtx = computed(() => ({ def: props.def, entry: props.entry, items: props.items, detachments: props.detachments, leaderTargets: props.leaderTargets, units: props.units, defOf: props.defOf }))
// What a joining unit needs before it can join anything: a unit its rule's character leads, or a
// unit of the kind it names.
const joinHint = computed(() => {
  const j = props.def?.joins
  if (!j || props.leaderTargets.length) return ''
  const names = (ids) => [...new Set((ids || []).map((id) => props.defOf?.(id)?.name || id))].join(', ')
  return j.by?.length
    ? labels.value.rosterJoinNeedsLeader.replace('{by}', names(j.by))
    : labels.value.rosterJoinNeedsUnit.replace('{to}', names(j.to))
})
const emit = defineEmits(['toggle-warlord', 'add-leader', 'add-host'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// "Can be led by" and "Can lead", each folded until asked for; the titles are built here, not out
// of adjacent template fragments (a line break there would be a real space — see the root CLAUDE.md).
const foldOpen = ref({})
// The row whose datasheet is open, or null.
const sheetPreview = ref(null)
// The previewed unit's definition too: it carries the keywords the detachments grant it (`grants`).
const previewCtx = computed(() => ({ def: (sheetPreview.value && props.defOf?.(sheetPreview.value.id)) || null, detachments: props.detachments }))
const addLists = computed(() => {
  const l = labels.value
  return [
    { key: 'led-by', rows: props.leaderCandidates, title: `${l.rosterLedBy} · ${props.leaderCandidates.length}`, addLabel: l.rosterLedByAdd, add: (c) => emit('add-leader', c.id) },
    { key: 'can-lead', rows: props.leaderHosts, title: `${l.rosterCanLead} · ${props.leaderHosts.length}`, addLabel: l.rosterCanLeadAdd, add: addHost },
  ]
})

// What tells two targets of the same datasheet apart, in the player's own terms first: the name
// they gave that block, then the facts that differ (models, enhancement, mark, their note), then
// who is already on it. Silent where the name is unique — a list of units that are all different
// needs no explaining. Two entries that are alike in every one of those still have to be told
// apart, so they fall back to the order they stand in the roster.
const targetHints = computed(() => {
  const l = labels.value
  const seen = new Map()
  for (const t of props.leaderTargets) seen.set(t.name, (seen.get(t.name) || 0) + 1)
  const parts = (t) => [
    t.blockName,
    t.models ? `${t.models} ${l.rosterModelsLabel}` : '',
    t.enh,
    t.alleg,
    t.picks?.length ? t.picks.join(', ') : '',
    t.warlord ? l.rosterWarlord : '',
    t.note,
    t.with?.length ? l.rosterTargetWith.replace('{who}', t.with.join(', ')) : '',
  ].filter(Boolean).join(' · ')
  const out = new Map()
  const nth = new Map()
  const ties = new Map()
  for (const t of props.leaderTargets) {
    if (seen.get(t.name) < 2) { out.set(t.uid, ''); continue }
    const text = parts(t)
    nth.set(t.uid, (ties.get(t.name) || 0) + 1)
    ties.set(t.name, nth.get(t.uid))
    out.set(t.uid, text)
  }
  // …and where two of the same name say the same thing, number them.
  const byText = new Map()
  for (const t of props.leaderTargets) {
    if (!out.has(t.uid)) continue
    const key = `${t.name}\u0000${out.get(t.uid)}`
    byText.set(key, (byText.get(key) || 0) + 1)
  }
  for (const t of props.leaderTargets) {
    if (!out.has(t.uid)) continue
    const key = `${t.name}\u0000${out.get(t.uid)}`
    if (byText.get(key) < 2) continue
    const copy = l.rosterTargetCopy.replace('{n}', nth.get(t.uid))
    out.set(t.uid, [out.get(t.uid), copy].filter(Boolean).join(' · '))
  }
  return out
})

// An allied unit's id is namespaced with the faction its DATASHEET belongs to (see
// data/roster/index.js); the rules and weapon modals are given that faction's slug, so they must
// be given the bare id to look up in it.
const sheetId = computed(() => allySourceOf(props.def.id)?.[1] || props.def.id)

// Every wargear row is a checkbox (selection) plus a separate trailing button; the button opens a
// FOCUSED profile modal for just that item (WeaponProfileModal) — never the whole unit sheet,
// which is what "Show datasheet" (RosterUnitRulesModal, with its accordions) is for.
const rulesOpen = ref(false)
const weaponInfoNames = ref(null)
const weaponInfoHeading = ref('')
function openWeaponInfo(names, heading = '') {
  const list = (names || []).filter(Boolean)
  if (!list.length) return
  weaponInfoHeading.value = heading
  weaponInfoNames.value = list
}
const enhInfoName = ref(null)
function openEnhInfo(name) { enhInfoName.value = name }

// Only what this unit could actually take — enhOptionsFor lists every enhancement across the
// selected detachments (so the editor can compute eligibility per unit), but a unit that's
// ineligible for one entirely (wrong unit type) shouldn't clutter its own picker with it. Kept
// visible: anything eligible, plus whatever's currently selected even if it's since become
// ineligible (e.g. a detachment swap) so the user can still see/clear it.
const visibleEnhOptions = computed(() =>
  props.enhOptions.filter((e) => e.eligible || isEnh(e)))

// ── Size / model count ──
const curSize = computed(() => sizeOf(props.def, props.entry))
const curRange = computed(() => curSize.value.per[0] !== curSize.value.per[1])
const models = computed(() => modelCount(props.def, props.entry))
// The last bracket that had a range — what the model-count block draws, so it can fold away
// showing its own numbers after a fixed-size bracket is picked.
const rangeSize = ref(curRange.value ? curSize.value : null)
watch(curSize, (s) => { if (s.per[0] !== s.per[1]) rangeSize.value = s })
function sizeLabel(s) { return s.per[0] === s.per[1] ? String(s.per[0]) : `${s.per[0]}–${s.per[1]}` }
// Picking a bracket FILLS IT. The Munitorum prints one price for the whole bracket, so a 6-model
// unit in a 6-10 bracket pays the 10-model price — almost nobody means to buy that, and the editor
// used to make them press + four times to say otherwise. Fewer is still one tap away, and the chip
// on the heading says how few. (Three units — Terminator Assault Squad, Venatari Custodians,
// Victrix Honour Guard — also pay per model for their printed loadout on top of the bracket, so
// filling up costs them a little more; the running total and the "Default wargear" heading both
// show it as it happens.)
function setSize(i) {
  const before = snapshot()
  props.entry.size = i
  const s = props.def.sizes[i]
  // A fixed-size bracket keeps `count` absent — the entry says nothing it doesn't have to.
  if (s && s.per[0] !== s.per[1]) props.entry.count = s.per[1]
  else delete props.entry.count
  fitAfterShrink(before)
}
function setCount(n) {
  const before = snapshot()
  props.entry.count = n
  fitAfterShrink(before)
}

// Shrinking the unit can leave more picks than the smaller unit allows — "up to 2 per 5 models"
// at ten is one at five, and five combi-weapons plus a heavy weapon no longer fit five
// combi-bolters (a player's report, 2026-09-24). The editor takes the excess off itself, latest
// picks first (rosterEngine's fitWargear), and says so with a way back: the player asked for a
// smaller unit, not for a list they now have to repair row by row. Only a SHRINK trims; a list
// that arrives over (an import, a list saved before a rule) is reported by validateRoster and left
// to the player, since nothing they did here produced it.
const trimmed = ref(null) // { size, count, wg } before the trim, while the offer stands
function snapshot() {
  return { size: props.entry.size, count: props.entry.count, wg: (props.entry.wg || []).map((p) => [...p]), models: models.value }
}
function fitAfterShrink(before) {
  trimmed.value = null
  if (models.value >= before.models) return
  const next = fitWargear(props.def, props.entry)
  if (!next) return
  props.entry.wg = next
  trimmed.value = before
}
function undoTrim() {
  const b = trimmed.value
  if (!b) return
  props.entry.size = b.size
  if (b.count == null) delete props.entry.count
  else props.entry.count = b.count
  props.entry.wg = b.wg
  trimmed.value = null
}
function miniName(m) { return props.def.minis?.[m]?.n || '' }

// How many models of each profile the current bracket + count works out to (null when the data
// can't say — see modelsPerMini). Drives the composition line, and the per-profile ceiling of a
// stepper group that belongs to one profile.
// Allegiance choice — null when the datasheet has none, or when the detachment that gates it
// isn't in this army (Mark of Chaos only exists inside Pactbound Zealots).
const alleg = computed(() => allegFor(props.def, props.detachments))
// The cap is an ARMY-wide one ("select up to 3 … units"), so the count needs every entry's
// definition, not just this one's — `defOf` is passed in for that. Without it the pill still works
// and validateRoster still reports an over-cap list; only the running count goes away.
const allegSpentInArmy = computed(() => (alleg.value?.max && props.defOf
  ? allegSpent(props.units, props.defOf, alleg.value.g, props.detachments)
  : 0))
// Clicking the chosen one again clears it — the only way to unset an optional upgrade, and
// harmless for a mandatory mark (validateRoster then reports it as missing rather than the editor
// silently keeping a choice the player wanted gone).
function setAlleg(name) {
  if (props.entry.alleg === name) delete props.entry.alleg
  else props.entry.alleg = name
}

const perMini = computed(() => modelsPerMini(props.def, props.entry))
const compLine = computed(() => {
  if (!(props.def.minis?.length > 1) || !perMini.value) return ''
  return [...perMini.value.entries()]
    .filter(([, n]) => n > 0)
    .map(([m, n]) => `${n}× ${miniName(m)}`)
    .join(' + ')
})

// Two size pills can read identically — same model count, same points — and differ only in WHICH
// profiles are in the squad: Corsair Voidscarred has three 7-model builds at 140 points (Shade
// Runner + Soul Weaver, Soul Weaver + Way Seeker, Shade Runner + Way Seeker). Only those pills get
// a suffix, naming the profiles that actually tell the tied brackets apart; every other pill is
// left as it was. Where the same profiles are in every tied build and only their counts differ
// (Accursed Cultists: 6–10 Mutants + 3–6 Torments, or 5–10 + 4–6, both 9–16 for 185), names alone
// read twice — a player's report, 2026-10-08 — so those pills state the counts.
const bracketAt = (s, m) => (s.comp || []).find((c) => c[0] === m)?.[1] ?? 0
const countAt = (s, m) => {
  const c = (s.comp || []).find((x) => x[0] === m)
  if (!c) return ''
  return c[2] != null && c[2] !== c[1] ? `${c[1]}–${c[2]}` : String(c[1])
}
// Tied means the same price and model ranges that overlap, not only identical ones: since the
// Voidscarred's 6–10 is split by specialists (gen-roster-data's splitOptionalProfiles), its builds
// are 6–10, 7–10 and 8–10 at 140, and the 8–10 with all three specialists must say so too.
const sizeTells = computed(() => {
  const sizes = props.def.sizes
  const out = new Array(sizes.length).fill('')
  const overlaps = (a, b) => a.pts === b.pts && a.per[0] <= b.per[1] && b.per[0] <= a.per[1]
  const groups = []
  sizes.forEach((s, i) => {
    const joined = groups.filter((g) => g.some((j) => overlaps(sizes[j], s)))
    const g = [...joined.flat(), i]
    for (const x of joined) groups.splice(groups.indexOf(x), 1)
    groups.push(g.sort((a, b) => a - b))
  })
  for (const idxs of groups) {
    if (idxs.length < 2) continue
    const varying = (props.def.minis || [])
      .map((_, m) => m)
      // Whether a profile is IN the build, not its minimum: the Voidscarred themselves are 5–9 or
      // 4–8 depending on the specialists, and naming them on every pill tells nothing apart.
      .filter((m) => new Set(idxs.map((i) => bracketAt(props.def.sizes[i], m) > 0 || countAt(props.def.sizes[i], m).includes('–'))).size > 1)
    for (const i of idxs) {
      out[i] = varying.filter((m) => bracketAt(props.def.sizes[i], m) > 0).map(miniName).join(' + ')
    }
    if (new Set(idxs.map((i) => out[i])).size === idxs.length) continue
    const counted = (props.def.minis || [])
      .map((_, m) => m)
      .filter((m) => new Set(idxs.map((i) => countAt(props.def.sizes[i], m))).size > 1)
    for (const i of idxs) {
      out[i] = counted.filter((m) => bracketAt(props.def.sizes[i], m) > 0)
        .map((m) => `${countAt(props.def.sizes[i], m)} ${miniName(m)}`).join(' + ')
    }
  }
  return out
})

// ── Default loadout summary ──
const defaultLines = computed(() => fixedLoadoutLines(props.def, props.items, props.entry))
// Every item the lines name, once — a Sergeant and his squad both carrying a bolt pistol is one
// profile to read. The info button beside them opens all of it, the way an option's button opens
// the option: the default loadout was the one wargear on this screen with no way to read it.
const defaultNames = computed(() => [...new Set(defaultLines.value.flatMap((l) => l.names))])
const defaultPts = computed(() => defaultWargearPoints(props.def, props.entry))

// ── Wargear selection: entry.wg = [[groupIdx, optIdx, count], …] (deviations only), picked in
// UnitWargearGroups. A pick after a shrink answers the trim offer, so the offer goes.
function setWg(next) {
  trimmed.value = null
  props.entry.wg = next
}

// The entry keeps whose enhancement it is (`enhDet`) beside its name: two selected detachments can
// each print one of that name at a different price (rosterEngine findEnhancement).
function setEnh(e) {
  delete props.entry.enhDet
  if (!e) { delete props.entry.enh; return }
  props.entry.enh = e.name
  if (e.det) props.entry.enhDet = e.det
}
// An entry saved before `enhDet` holds the first detachment's of the name — as findEnhancement reads it.
const isEnh = (e) => props.entry.enh === e.name && (!e.dup
  || (props.entry.enhDet ?? props.enhOptions.find((o) => o.name === e.name)?.det) === e.det)
// There's no separate "No enhancement" option — unticking the currently-selected checkbox IS
// "no enhancement" (mutual exclusivity means only one can ever be checked at a time, so ticking
// a different one already implies the same thing without needing an explicit toggle).
function toggleEnh(e) { setEnh(isEnh(e) ? null : e) }
function setLeader(uid) { if (uid) props.entry.leaderOf = uid; else delete props.entry.leaderOf }
// Same mutual-exclusivity toggle as enhancements: unticking the currently-attached target IS
// "not attached", so there's no separate pseudo-option for it.
function toggleLeader(uid) { setLeader(props.entry.leaderOf === uid ? null : uid) }

// The squad's end of the same link: the field written is still the LEADER's `leaderOf`, so the two
// pickers edit one fact and cannot disagree.
const unitByUid = (uid) => props.units.find((u) => u.uid === uid)
function isAttachedHere(uid) { return unitByUid(uid)?.leaderOf === props.entry.uid }
function toggleSource(uid, ev) {
  const other = unitByUid(uid)
  if (!other) return
  if (other.leaderOf === props.entry.uid) delete other.leaderOf
  else if (other.leaderOf && unitByUid(other.leaderOf)) {
    // Attached elsewhere: ask first. The box stays as it was until the answer — the state did not
    // change, so Vue would not redraw it on its own.
    if (ev?.target) ev.target.checked = false
    moveAsk.value = moveQuestion(other)
  } else other.leaderOf = props.entry.uid
}
// What a move does, spelled out: off the other unit (and whether that leaves it with no Character),
// onto this one, the points untouched, an enhancement travelling with its bearer. `run` is the move.
const moveAsk = ref(null)
function moveQuestion(other) {
  const l = labels.value
  return movePrompt(other, l.rosterMoveTitle, l.rosterMoveBody, {}, l.rosterMoveConfirm, () => {
    const o = unitByUid(other.uid)
    if (o) o.leaderOf = props.entry.uid
  })
}
// "Can lead" for a Character already with another unit: the "+" moves it onto the new one, so it
// asks the same way — what it leaves, what it keeps — and that the new unit joins the list.
function addHost(c) {
  const l = labels.value
  if (props.entry.leaderOf && unitByUid(props.entry.leaderOf)) {
    moveAsk.value = movePrompt(props.entry, l.rosterAddHostTitle, l.rosterAddHostBody, { '{host}': c.name },
      l.rosterAddHostConfirm, () => emit('add-host', c.id))
  } else emit('add-host', c.id)
}
function movePrompt(mover, title, body, extra, confirmLabel, run) {
  const l = labels.value
  const fromEntry = unitByUid(mover.leaderOf)
  const words = {
    '{unit}': props.defOf?.(mover.id)?.name || '',
    '{from}': fromEntry?.blockName || props.defOf?.(fromEntry?.id)?.name || '',
    '{enh}': mover.enh || '',
    ...extra,
  }
  const fill = (s) => Object.entries(words).reduce((t, [k, v]) => t.replaceAll(k, v), s)
  const leftAlone = !props.units.some((u) => u.uid !== mover.uid && u.leaderOf === mover.leaderOf)
  const message = [body, leftAlone ? l.rosterMoveLeft : '', mover.enh ? l.rosterMoveEnh : '']
    .filter(Boolean).map(fill).join(' ')
  return { title: fill(title), message, confirmLabel, run }
}
function confirmMove() {
  moveAsk.value?.run()
  moveAsk.value = null
}
// Where a candidate is now, if not here; and, where one datasheet is offered twice, what tells the
// copies apart — the same facts the forward picker leans on, fewer of them: a Leader is one model.
const sourceHints = computed(() => {
  const l = labels.value
  const seen = new Map()
  for (const s of props.leaderSources) seen.set(s.name, (seen.get(s.name) || 0) + 1)
  const out = new Map()
  for (const s of props.leaderSources) {
    const which = seen.get(s.name) > 1 ? [s.blockName, s.enh, s.warlord ? l.rosterWarlord : '', s.note] : []
    const at = s.elsewhere && props.defOf?.(unitByUid(s.elsewhere)?.id)?.name
    const now = at ? l.rosterAttachNow.replace('{unit}', at) : ''
    out.set(s.uid, [...which, now].filter(Boolean).join(' · '))
  }
  return out
})

// The note. Written straight onto the entry like every other field here — the store's deep watch
// is what saves it.
const writeNote = (obj, key, value) => setNote(obj, key, value)
</script>

<style scoped src="./unitEditorFields.css"></style>

<style scoped>
.ues { display: flex; flex-direction: column; gap: 0; }
/* The way to the datasheet was a bare text link and read as a caption; it is the app's own ghost
   button now (style.css), trimmed to sit in a row with a field rather than stand on its own. */
.ues-top { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.55rem; }
.ues-sheet-link { flex: 0 0 auto; padding: 0.35rem 0.6rem; font-size: 0.8rem; white-space: nowrap; }
/* Label beside the field, not above it, and the field takes whatever the button leaves. */
.ues-note { flex: 1 1 auto; min-width: 0; display: flex; align-items: center; gap: 0.4rem; }
.ues-note-lab { flex: 0 0 auto; font-size: 0.78rem; color: var(--text-muted); }
.ues-note input {
  flex: 1 1 auto;
  min-width: 0;
  padding: 0.3rem 0.45rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.85rem;
}
.ues-note input:focus { outline: none; border-color: var(--accent); }
/* A build pane is ~180px wide: the button and a labelled field cannot share that row, so the note
   drops under it and keeps its caption beside it. */
@container (max-width: 300px) {
  .ues-top { flex-direction: column; align-items: stretch; gap: 0.35rem; }
}
.ues-default { font-size: 0.85rem; margin: 0.15rem 0; }
/* The default loadout is a tile like the options under it (owner, 2026-10-01): the same frame and
   ground, its info button in the same right-hand column. Inside a tile the names read at full
   strength — muted text in a frame reads as a disabled pick. The button keeps a floor so a one-line
   loadout still gives the finger a target. */
.ues-default-list { flex: 1; min-width: 0; align-self: center; padding: 0.5rem 0.6rem; }
.ues-default-row .opt-info { min-height: 2.4rem; }
.ues-count { display: flex; align-items: center; justify-content: space-between; }
.ues-comp { margin: -0.35rem 0 0; font-size: 0.82rem; }
.ues-trimmed {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 0.6rem;
  margin: 0.35rem 0 0;
  font-size: 0.82rem;
}
.ues-req { font-style: normal; font-size: 0.78rem; margin-left: 0.4rem; }
.ues-join-none { margin: 0; font-size: 0.8rem; line-height: 1.35; color: var(--text-muted); }
.pill-tell { opacity: 0.75; }
.opt-row { display: flex; flex-wrap: wrap; gap: 0.35rem; }
/* Which of the two squads of that name this row is. Its OWN line — the name above it is what the
   reader scans, and a sentence trailing off the end of it would be read as part of the name. */
.opt-which { display: block; margin-top: 0.1rem; font-size: 0.7rem; font-style: normal; line-height: 1.3; color: var(--text-muted); }
/* White, like the Warlord badge on the list row (2026-09-26). */
.wl-flag { color: var(--text-primary); margin-right: 0.3rem; }
/* "Can be led by" — a fold whose heading is the toggle. */
.ues-fold-h { margin: 0; }
.ues-fold-h.open { margin-bottom: 0.5rem; }
.ues-fold {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  min-height: 24px;
  padding: 0;
  background: none;
  border: none;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}
.ues-fold-chev { font-size: 0.8rem; color: var(--text-muted); }
/* A candidate's row is a button that opens its datasheet; it keeps the tile's look. */
.opt-open {
  background: none;
  border: none;
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
}
.opt-open:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); }
.opt-open:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }

/* Smallest phones (down to 320px) — the section headings (.ues-h) stay full-size, everything
   else shrinks a step so the checkbox tiles/info button/pill row don't force horizontal
   crowding or wrap awkwardly at this width. */
@media (max-width: 360px) {
  .ues-default { font-size: 0.78rem; }
  .opt-which { font-size: 0.64rem; }
}
</style>
