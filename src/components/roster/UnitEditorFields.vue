<template>
  <div class="ues">
    <!-- The two things that are not configuration, on one line above it: the way OUT of this panel
         to the unit's own rules, and the player's own note about this unit. The note sits beside
         the button rather than in a section of its own at the foot of the panel — it is one short
         field, and a section for it cost a heading, a rule and a row of a phone (CLAUDE.md,
         "Vertical density": spend sideways before spending down). -->
    <div class="ues-top">
      <button v-if="def.linked && factionSlug" type="button" class="btn-ghost ues-sheet-link" @click="rulesOpen = true">
        <i class="bi bi-file-earmark-text"></i> {{ labels.rosterShowDatasheet }}
      </button>
      <label class="ues-note">
        <span class="ues-note-lab">{{ labels.rosterNote }}</span>
        <input
          type="text"
          :maxlength="ENTRY_NOTE_MAX"
          :value="entry.note || ''"
          @input="writeNote(entry, 'note', $event.target.value)"
        />
      </label>
    </div>
    <!-- Teleported to <body>: this component can render inside an accordion wrapped by
         CollapseTransition, whose `contain: layout paint` makes it a containing block for
         `position: fixed` descendants — without the teleport, BaseModal's fixed overlay would
         be clipped to the (collapsed-height) accordion row instead of covering the viewport. -->
    <Teleport v-if="rulesOpen" to="body">
      <FactionAccentScope :faction-slug="factionSlug">
        <RosterUnitRulesModal
          :unit-id="sheetId"
          :faction-slug="factionSlug"
          :ctx="{ def, entry, items, detachments, leaderTargets, units }"
          @close="rulesOpen = false"
        />
      </FactionAccentScope>
    </Teleport>
    <Teleport v-if="weaponInfoNames" to="body">
      <FactionAccentScope :faction-slug="factionSlug">
        <WeaponProfileModal
          :unit-id="sheetId"
          :faction-slug="factionSlug"
          :names="weaponInfoNames"
          @close="weaponInfoNames = null"
        />
      </FactionAccentScope>
    </Teleport>
    <Teleport v-if="enhInfoName" to="body">
      <FactionAccentScope :faction-slug="factionSlug">
        <EnhancementRuleModal
          :name="enhInfoName"
          :faction-slug="factionSlug"
          @close="enhInfoName = null"
        />
      </FactionAccentScope>
    </Teleport>

    <!-- Unit size -->
    <section v-if="def.sizes.length > 1" class="ues-sec">
      <h4 class="ues-h">{{ labels.rosterUnitSize }}</h4>
      <div class="opt-row">
        <button
          v-for="(s, i) in def.sizes"
          :key="i"
          class="pill"
          :class="{ on: (entry.size ?? 0) === i }"
          @click="setSize(i)"
        >{{ sizeLabel(s) }} · {{ s.pts }}{{ labels.rosterPointsLabel }}<span
          v-if="sizeTells[i]"
          class="pill-tell"
        > · {{ sizeTells[i] }}</span></button>
      </div>
    </section>
    <!-- Model count. Picking a bracket fills it to the top (see setSize), so the chip states the
         other end: this many models is allowed too, and the − is right there. -->
    <section v-if="curRange" class="ues-sec ues-count">
      <h4 class="ues-h">
        {{ labels.rosterModelsLabel }}
        <span class="ues-cap">{{ labels.rosterModelsMin.replace('{n}', curSize.per[0]) }}</span>
      </h4>
      <NumberStepper :model-value="models" :min="curSize.per[0]" :max="curSize.per[1]" @update:model-value="setCount" />
    </section>
    <p v-if="compLine" class="ues-comp">{{ compLine }}</p>

    <!-- Allegiance: a mark the unit must pick (Mark of Chaos, Daemonic Allegiance) or a capped
         detachment upgrade that hands it a keyword. Same widget for both — what differs is
         whether leaving it unset is an error, which validateRoster reports. -->
    <section v-if="alleg" class="ues-sec">
      <h4 class="ues-h">
        {{ alleg.t }}
        <em v-if="alleg.req" class="ues-req">{{ labels.rosterAllegianceRequired }}</em>
        <em v-else-if="alleg.max && defOf" class="ues-req">{{ allegSpentInArmy }} / {{ alleg.max }}</em>
      </h4>
      <div class="opt-row">
        <button
          v-for="o in alleg.o"
          :key="o.n"
          class="pill"
          :class="{ on: entry.alleg === o.n }"
          @click="setAlleg(o.n)"
        >{{ o.n }}<span v-if="o.wg" class="pill-tell"> · {{ items[o.wg] }}</span></button>
      </div>
    </section>

    <!-- Default loadout (read-only). Its own points, where it has any, are marked on the heading:
         the size pill shows the Munitorum bracket, and without this the difference between that
         and the unit's total (a Terminator Assault Squad's ten thunder hammers, +50) is invisible. -->
    <section v-if="defaultLines.length" class="ues-sec">
      <h4 class="ues-h">
        {{ labels.rosterDefaultWargear }}
        <em v-if="defaultPts" class="ues-req">+{{ defaultPts }}{{ labels.rosterPointsLabel }}</em>
      </h4>
      <p v-for="(l, i) in defaultLines" :key="i" class="ues-default">
        <span v-if="l.mini" class="ues-mini">{{ l.mini }}:</span> {{ l.items }}
      </p>
    </section>

    <!-- Warlord -->
    <section v-if="canWarlord" class="ues-sec">
      <div class="opt-tile" :class="{ on: isWarlord }">
        <label class="opt-select">
          <input type="checkbox" :checked="isWarlord" @change="$emit('toggle-warlord')" />
          <span class="opt-name"><i class="bi bi-flag-fill wl-flag"></i> {{ labels.rosterWarlord }}</span>
        </label>
      </div>
    </section>

    <!-- Wargear choices — a group with `cond` (see rosterEngine.js wargearGroupLive) depends on a
         sibling group, e.g. Necron Overlord's Resurrection Orb needs the tachyon arrow given up
         first. It is GREYED OUT rather than removed while that isn't the case: an option that
         disappears when you touch an unrelated one reads as a bug, and the reader is left
         guessing what to undo. `blockers[gi]` says what to undo, in words. -->
    <template v-for="(g, gi) in def.gear || []" :key="gi">
    <section class="ues-sec" :class="{ 'ues-inert': blockers[gi] }">
      <!-- `ues-instr`, unlike every other .ues-h on this screen: what stands here is a SENTENCE
           out of the datasheet, not a label. See the style rule for why that needs a different
           face. -->
      <h4 class="ues-h ues-instr">
        <span v-if="miniName(g.m)" class="ues-mini">{{ miniName(g.m) }}</span>
        {{ groupLines[gi].head }}
        <span v-if="capChip(gi)" class="ues-cap">{{ capChip(gi) }}</span>
      </h4>
      <ul v-if="groupLines[gi].bullets.length" class="ues-blist">
        <li v-for="(b, bi) in groupLines[gi].bullets" :key="bi">{{ b }}</li>
      </ul>
      <p v-if="groupLines[gi].note" class="ues-bnote">* {{ groupLines[gi].note }}</p>
      <p v-if="blockers[gi]" class="ues-blocked">{{ blockerText(gi) }}</p>
      <p v-else-if="caps[gi] && !caps[gi].limit" class="ues-bnote">{{ labels.rosterPickUnavailable }}</p>

      <!-- radio: replace with one of… — the default loadout is itself a real option (its own
           name, from the group's `rep`), not a separate pseudo "keep default" pill. Each row is
           a tracker-style checkbox (select); the separate trailing button (same idiom as
           RosterUnitBrowser's "+" add button) opens that row's weapon profile. -->
      <div v-if="mode(g, gi) === 'radio'" class="opt-col">
        <div
          v-for="opt in radioRows(g)"
          :key="opt.oi ?? 'default'"
          class="opt-tile"
          :class="{ on: radioSel(gi) === opt.oi, disabled: !!blockers[gi] }"
        >
          <label class="opt-select">
            <input type="checkbox" :checked="radioSel(gi) === opt.oi" :disabled="!!blockers[gi]" @change="setRadio(gi, opt.oi)" />
            <span class="opt-name">{{ opt.name }}</span>
            <span v-if="opt.pts" class="opt-pts">+{{ opt.pts }}</span>
          </label>
          <button type="button" class="opt-info" :aria-label="labels.rosterViewInfo" @click="openWeaponInfo(opt.names)">
            <i class="bi bi-info-circle"></i>
          </button>
        </div>
      </div>

      <!-- toggle: single optional item -->
      <div v-else-if="mode(g, gi) === 'toggle'" class="opt-col">
        <div class="opt-tile" :class="{ on: toggleOn(gi), disabled: !!blockers[gi] }">
          <label class="opt-select">
            <input type="checkbox" :checked="toggleOn(gi)" :disabled="!!blockers[gi]" @change="toggle(gi)" />
            <span class="opt-name">{{ optLabel(g.o[0]) }}</span>
            <span v-if="g.o[0][1]" class="opt-pts">+{{ g.o[0][1] }}</span>
          </label>
          <button type="button" class="opt-info" :aria-label="labels.rosterViewInfo" @click="openWeaponInfo(optNames(g.o[0]))">
            <i class="bi bi-info-circle"></i>
          </button>
        </div>
      </div>

      <!-- stepper: N models take X -->
      <div v-else class="opt-col">
        <div v-for="(o, oi) in g.o" :key="oi" class="opt-tile" :class="{ disabled: !!blockers[gi] }">
          <div class="opt-step-body">
            <span class="opt-name">{{ optLabel(o) }}<span v-if="o[1]" class="opt-pts"> +{{ o[1] }}</span></span>
            <NumberStepper :model-value="stepCount(gi, oi)" :min="0" :max="stepMax(gi, oi)" :disabled="!!blockers[gi]" @update:model-value="setStep(gi, oi, $event)" />
          </div>
          <button type="button" class="opt-info" :aria-label="labels.rosterViewInfo" @click="openWeaponInfo(optNames(o))">
            <i class="bi bi-info-circle"></i>
          </button>
        </div>
      </div>
    </section>
    </template>

    <!-- Enhancement — only ones this unit could actually take (ineligible-for-this-unit options
         from the detachment's full list are hidden, not just disabled; an eligible one already
         used by another entry still shows, disabled, so it's clear why it can't be picked here). -->
    <section v-if="visibleEnhOptions.length" class="ues-sec">
      <h4 class="ues-h">{{ labels.rosterEnhancement }}</h4>
      <div class="opt-col">
        <div
          v-for="e in visibleEnhOptions"
          :key="e.name"
          class="opt-tile"
          :class="{
            on: e.mandatory ? e.eligible : entry.enh === e.name,
            disabled: e.mandatory ? true : e.used && entry.enh !== e.name,
          }"
        >
          <label class="opt-select">
            <input
              type="checkbox"
              :checked="e.mandatory ? e.eligible : entry.enh === e.name"
              :disabled="e.mandatory || (e.used && entry.enh !== e.name)"
              @change="toggleEnh(e.name)"
            />
            <span class="opt-name">
              {{ e.name }}
              <span v-if="e.mandatory && e.eligible" class="opt-tag">{{ labels.rosterEnhMandatory }}</span>
              <span v-else-if="e.used" class="opt-tag">{{ labels.rosterEnhUsed }}</span>
            </span>
            <span v-if="e.pts" class="opt-pts">+{{ e.pts }}</span>
          </label>
          <button type="button" class="opt-info" :aria-label="labels.rosterViewInfo" @click="openEnhInfo(e.name)">
            <i class="bi bi-info-circle"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Leader attachment — no separate "not attached" tile: unticking the selected checkbox
         already means that (same logic as the enhancement list above). -->
    <section v-if="leaderTargets.length" class="ues-sec">
      <h4 class="ues-h">{{ labels.rosterAttachTo }}</h4>
      <div class="opt-col">
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
            />
            <span class="opt-name">
              {{ t.name }}
              <span v-if="t.type === 'support'" class="opt-tag">{{ labels.rosterSupportTag }}</span>
              <span v-if="t.used && entry.leaderOf !== t.uid" class="opt-tag">{{ labels.rosterEnhUsed }}</span>
            </span>
          </label>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
// The unit-configuration fields (size, wargear, warlord, enhancement, leader attachment) —
// shared by the creation wizard's step 3 and the roster editor's Loadout tab, each rendering it
// inline inside a per-unit accordion. This component owns no chrome of its own.
import { computed, ref, watch } from 'vue'
import NumberStepper from '../tracker/NumberStepper.vue'
import RosterUnitRulesModal from './RosterUnitRulesModal.vue'
import WeaponProfileModal from './WeaponProfileModal.vue'
import EnhancementRuleModal from './EnhancementRuleModal.vue'
import FactionAccentScope from './FactionAccentScope.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { loadRosterTextsRu } from '../../data/roster/ru/index.js'
import { ENTRY_NOTE_MAX, allySourceOf, allegFor, allegSpent, defaultLoadoutLines, defaultWargearPoints, modelsPerMini, optionItems, optionLabel, setNote, splitInstruction, wargearGroupBlocker, wargearGroupCap, wargearGroupFallbackCap, wargearGroupSpent } from '../../composables/rosterEngine.js'

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
})
defineEmits(['toggle-warlord'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// An allied unit's id is namespaced with the faction its DATASHEET belongs to (see
// data/roster/index.js); the rules and weapon modals are given that faction's slug, so they must
// be given the bare id to look up in it.
const sheetId = computed(() => allySourceOf(props.def.id)?.[1] || props.def.id)

// Wargear group instructions in Russian (src/data/roster/ru/texts.js, generated — see
// scripts/gen-roster-texts-ru.mjs). Lazily loaded so an EN reader never downloads the file, and
// deliberately partial: a wording the generator couldn't translate is simply absent, and the
// English original shows instead of a half-translated line.
const textsRu = ref(null)
watch(locale, async (loc) => {
  if (loc !== 'ru' || textsRu.value) return
  const map = await loadRosterTextsRu()
  if (locale.value === 'ru') textsRu.value = map
}, { immediate: true })

const groupText = (g) => (locale.value === 'ru' && textsRu.value?.[g.t]) || props.texts[g.t] || ''
// Parallel to `def.gear`, so the split runs once per group per render rather than once per
// interpolation. The bullet list is a list in the source text and has to render as one — read as
// a single paragraph it says the opposite of what it means, running four alternatives together.
const groupLines = computed(() => (props.def.gear || []).map((g) => splitInstruction(groupText(g))))

// One option can grant SEVERAL items ("1 hexrifle and 1 torturer's tool" is one choice, not
// two) — so a row is labelled with the whole set, and its info button opens every profile in it.
const caps = computed(() => (props.def.gear || []).map((g, gi) => wargearGroupCap(props.def, props.entry, gi)))
// Why each gated group is closed, or null while it is open (rosterEngine's wargearGroupBlocker).
// The group is still drawn either way — greyed, its current pick visible — so the sentence below
// is the only thing that has to explain itself.
const blockers = computed(() => (props.def.gear || []).map((g, gi) => wargearGroupBlocker(props.def, props.entry, gi)))
function blockerText(gi) {
  const b = blockers.value[gi]
  if (!b) return ''
  const lead = b.need === 'gone' ? labels.value.rosterCondNeedGone : labels.value.rosterCondNeedPresent
  // Item names stay English, like everywhere else in the roster data.
  return `${lead} ${b.ids.map((id) => props.items?.[id]).filter(Boolean).join(', ')}`
}
// Only worth showing once it's a real allowance to spend — "≤ 1" is what every ordinary
// one-of group already looks like, and 0 gets its own sentence instead.
function capChip(gi) {
  const cap = caps.value[gi]
  if (!cap || cap.limit < 2) return ''
  const upTo = labels.value.rosterPickUpTo.replace('{n}', cap.limit)
  return cap.dup ? `${upTo}, ${labels.value.rosterPickDup.replace('{n}', cap.dup)}` : upTo
}

const optLabel = (o) => optionLabel(o, props.items)
const optNames = (o) => optionItems(o).map(([id]) => props.items[id]).filter(Boolean)

// Every wargear row is a checkbox (selection) plus a separate trailing button; the button opens a
// FOCUSED profile modal for just that item (WeaponProfileModal) — never the whole unit sheet,
// which is what "Show datasheet" (RosterUnitRulesModal, with its accordions) is for.
const rulesOpen = ref(false)
const weaponInfoNames = ref(null)
function openWeaponInfo(names) {
  const list = (names || []).filter(Boolean)
  if (list.length) weaponInfoNames.value = list
}
const enhInfoName = ref(null)
function openEnhInfo(name) { enhInfoName.value = name }

// Only what this unit could actually take — enhOptionsFor lists every enhancement across the
// selected detachments (so the editor can compute eligibility per unit), but a unit that's
// ineligible for one entirely (wrong unit type) shouldn't clutter its own picker with it. Kept
// visible: anything eligible, plus whatever's currently selected even if it's since become
// ineligible (e.g. a detachment swap) so the user can still see/clear it.
const visibleEnhOptions = computed(() =>
  props.enhOptions.filter((e) => e.eligible || e.name === props.entry.enh))

// ── Size / model count ──
const curSize = computed(() => props.def.sizes[props.entry.size ?? 0] || props.def.sizes[0])
const curRange = computed(() => curSize.value.per[0] !== curSize.value.per[1])
const models = computed(() => props.entry.count ?? curSize.value.per[0])
function sizeLabel(s) { return s.per[0] === s.per[1] ? String(s.per[0]) : `${s.per[0]}–${s.per[1]}` }
// Picking a bracket FILLS IT. The Munitorum prints one price for the whole bracket, so a 6-model
// unit in a 6-10 bracket pays the 10-model price — almost nobody means to buy that, and the editor
// used to make them press + four times to say otherwise. Fewer is still one tap away, and the chip
// on the heading says how few. (Three units — Terminator Assault Squad, Venatari Custodians,
// Victrix Honour Guard — also pay per model for their printed loadout on top of the bracket, so
// filling up costs them a little more; the running total and the "Default wargear" heading both
// show it as it happens.)
function setSize(i) {
  props.entry.size = i
  const s = props.def.sizes[i]
  // A fixed-size bracket keeps `count` absent — the entry says nothing it doesn't have to.
  if (s && s.per[0] !== s.per[1]) props.entry.count = s.per[1]
  else delete props.entry.count
}
function setCount(n) { props.entry.count = n }

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
// left as it was. All 32 tied brackets in the corpus resolve to a non-empty name this way.
const bracketAt = (s, m) => (s.comp || []).find((c) => c[0] === m)?.[1] ?? 0
const sizeTells = computed(() => {
  const out = new Array(props.def.sizes.length).fill('')
  const groups = new Map()
  props.def.sizes.forEach((s, i) => {
    const k = `${s.per.join('-')}:${s.pts}`
    if (!groups.has(k)) groups.set(k, [])
    groups.get(k).push(i)
  })
  for (const idxs of groups.values()) {
    if (idxs.length < 2) continue
    const varying = (props.def.minis || [])
      .map((_, m) => m)
      .filter((m) => new Set(idxs.map((i) => bracketAt(props.def.sizes[i], m))).size > 1)
    for (const i of idxs) {
      out[i] = varying.filter((m) => bracketAt(props.def.sizes[i], m) > 0).map(miniName).join(' + ')
    }
  }
  return out
})

// ── Default loadout summary ──
const defaultLines = computed(() => defaultLoadoutLines(props.def, props.items, props.entry))
const defaultPts = computed(() => defaultWargearPoints(props.def, props.entry))

// ── Wargear selection: entry.wg = [[groupIdx, optIdx, count], …] (deviations only) ──
function wg() { return props.entry.wg || [] }
function setWg(next) { props.entry.wg = next.filter((s) => s[2] > 0) }

// Three shapes, and the CAP is what decides between them — not appdata's own inputType alone.
// A group that lets several models each take something is a set of steppers sharing one budget
// ("up to 4 Kasrkin"), whether appdata calls it a stepper or a checkbox; a group that allows a
// single pick is the familiar one-of radio (or a toggle when there's only one thing to take).
// Without a structural cap this falls back exactly to the old inputType-only reading.
function mode(g, gi) {
  const cap = caps.value[gi]
  if (g.in === 'stepper' || (cap && cap.limit > 1)) return 'stepper'
  return g.o.length > 1 ? 'radio' : 'toggle'
}

// radio (one-of): a single selection per group. `null` means "the default loadout" — shown as
// its own named row (from the group's `rep`, the item(s) it replaces), never a special pill.
function radioSel(gi) {
  const s = wg().find((x) => x[0] === gi)
  return s ? s[1] : null
}
function setRadio(gi, oi) {
  const next = wg().filter((x) => x[0] !== gi)
  if (oi != null) next.push([gi, oi, 1])
  setWg(next)
}
// One row per selectable state of a radio group: index 0 is always the default (oi: null),
// falling back to rosterKeepDefault's generic wording only on the rare group whose instruction
// text didn't parse a `rep` (see gen-roster-data.mjs's linkWargearConditions) — everywhere else
// it shows the actual default item name(s), so there's never an unnamed "keep default" pseudo-option.
function radioRows(g) {
  const rows = [{
    oi: null,
    name: g.rep?.length ? g.rep.map((id) => props.items[id]).join(', ') : labels.value.rosterKeepDefault,
    names: (g.rep || []).map((id) => props.items[id]),
    pts: 0,
  }]
  g.o.forEach((o, oi) => rows.push({ oi, name: optLabel(o), names: optNames(o), pts: o[1] || 0 }))
  return rows
}

// toggle (single optional item at option 0).
function toggleOn(gi) { return wg().some((x) => x[0] === gi && x[1] === 0) }
function toggle(gi) {
  toggleOn(gi) ? setWg(wg().filter((x) => x[0] !== gi)) : setWg([...wg(), [gi, 0, 1]])
}

// stepper (count per option).
function stepCount(gi, oi) {
  return wg().find((x) => x[0] === gi && x[1] === oi)?.[2] || 0
}
function setStep(gi, oi, n) {
  const next = wg().filter((x) => !(x[0] === gi && x[1] === oi))
  if (n > 0) next.push([gi, oi, n])
  setWg(next)
}
// What's left for THIS option: the group's own budget minus what its siblings already took, and
// never more than the duplicate cap on a single option. Falls back to reading "For every N
// models, 1 model…" out of the instruction for the groups appdata gives no cap for — that guess
// is both too loose ("Up to 4 Dominions" reads as no cap) and too strict ("for every 5 models,
// up to 2" reads as one), which is exactly why the structural cap is preferred wherever it exists.
function stepMax(gi, oi) {
  // What the group's OTHER options have already taken. Every ceiling below belongs to the GROUP —
  // "any number of models can each have their lastrum bolt cannon replaced with ONE OF THE
  // FOLLOWING" is one budget of models, however many rows it is drawn as — so a row's own room is
  // whatever is left of it.
  const elsewhere = wargearGroupSpent(props.entry, gi, oi)
  const cap = caps.value[gi]
  if (cap) return Math.max(0, Math.min(cap.dup || cap.limit, cap.limit - elsewhere))
  // "For every 5 models in this unit:" over a BULLET LIST, and only that: the generator reads every
  // scaled allowance that states its number into `lim` (gen-roster-data.mjs's SCALED_ALLOWANCE), so
  // what is left here is the umbrella whose bullets are separate allowances — a Red Corsairs Raider
  // squad swaps 1 boltgun AND 1 reaver's blade per 5 models. Per option is the right reading for
  // those, and the two groups in that shape are the only ones that still reach this line.
  const m = (props.texts[props.def.gear[gi].t] || '').match(/for every (\d+) model/i)
  if (m) return Math.floor(models.value / Number(m[1]))
  // No cap of any kind: the group can be taken by every model it belongs to — which on a
  // multi-profile datasheet is that PROFILE's model count, not the squad's. "Any number of
  // Sicarian Ruststalkers can each have their transonic razor replaced" excludes the Princeps,
  // so a 10-model squad allows 9. 62 groups were over by their squad's leader models. A model
  // that carries the replaced weapon SEVERAL times may swap each copy (`cp`), which is what lets
  // a Wraithlord take its second flamer.
  //
  // That per-profile figure is shared too — 83 multi-option groups on 75 datasheets had every row
  // handed the WHOLE budget, so a Leman Russ could take all four of its "one of the following"
  // sponson sets and validateRoster, which sums the group exactly like this, then called the list
  // illegal. Stopping the "+" where the validator draws its line can never be stricter than the
  // validator. The last resort below is a guess (a unit-wide group belongs to no profile), and a
  // guess is not something to subtract from: it keeps the row-by-row ceiling it always had, which
  // is the same reason validateRoster does not police those groups either.
  const own = wargearGroupFallbackCap(props.def, props.entry, gi)
  if (own != null) return Math.max(0, own - elsewhere)
  return models.value * (props.def.gear[gi].cp || 1)
}

function setEnh(name) { if (name) props.entry.enh = name; else delete props.entry.enh }
// There's no separate "No enhancement" option — unticking the currently-selected checkbox IS
// "no enhancement" (mutual exclusivity means only one can ever be checked at a time, so ticking
// a different one already implies the same thing without needing an explicit toggle).
function toggleEnh(name) { setEnh(props.entry.enh === name ? null : name) }
function setLeader(uid) { if (uid) props.entry.leaderOf = uid; else delete props.entry.leaderOf }
// Same mutual-exclusivity toggle as enhancements: unticking the currently-attached target IS
// "not attached", so there's no separate pseudo-option for it.
function toggleLeader(uid) { setLeader(props.entry.leaderOf === uid ? null : uid) }

// The note. Written straight onto the entry like every other field here — the store's deep watch
// is what saves it.
const writeNote = (obj, key, value) => setNote(obj, key, value)
</script>

<style scoped>
.ues { display: flex; flex-direction: column; gap: 0; }
/* The way to the datasheet was a bare text link and read as a caption; it is the app's own ghost
   button now (style.css), trimmed to sit in a row with a field rather than stand on its own. */
.ues-top { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.55rem; }
.ues-sheet-link { flex: 0 0 auto; padding: 0.35rem 0.6rem; font-size: 0.8rem; white-space: nowrap; }
.ues-sec { padding: 0.6rem 0; border-top: 1px solid var(--border); }
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
.ues-sec:first-of-type { border-top: none; }
.ues-h {
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem;
  line-height: 1.35;
}
/* A wargear group's heading is a whole sentence lifted off the datasheet — "1 Cultist Champion's
   autopistol can be replaced with 1 bolt pistol", and in Russian a sentence of prose wrapped
   around English item names. style.css puts every h1–h4 in the display face, which is Sofia Sans
   EXTRA CONDENSED: right for the two-word labels the other sections carry, and a wall of narrow
   strokes for two lines of prose at weight 600. So this one heading takes the body face at a
   normal weight. It keeps full colour and stays larger than the option list under it, so it still
   leads the group; only the letterforms change. */
.ues-h.ues-instr {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 0.88rem;
  line-height: 1.5;
}
.ues-mini { color: var(--text-dim); font-weight: 700; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.03em; margin-right: 0.3rem; }
.ues-default { font-size: 0.82rem; color: var(--text-muted); margin: 0.15rem 0; }
/* The option list under a group's instruction — indented under the heading it belongs to, and
   muted so the heading still reads as the heading. */
.ues-blist { margin: -0.25rem 0 0.5rem; padding-left: 1.1rem; list-style: none; }
.ues-blist li { position: relative; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; }
.ues-blist li::before { content: '◦'; position: absolute; left: -0.85rem; color: var(--text-dim); }
.ues-bnote { margin: -0.25rem 0 0.5rem; font-size: 0.78rem; color: var(--text-dim); line-height: 1.35; }
/* A group waiting on a sibling. The heading and the instruction stay at full strength — the
   reader still has to be able to READ what the option is — while the tiles below carry the same
   .opt-tile.disabled fade every other unavailable pick in this editor uses. */
.ues-inert .ues-h,
.ues-inert .ues-blist { opacity: 0.6; }
.ues-blocked {
  margin: -0.25rem 0 0.5rem;
  font-size: 0.78rem;
  line-height: 1.35;
  color: var(--text-muted);
  font-style: italic;
}
.ues-cap {
  display: inline-block;
  margin-left: 0.35rem;
  padding: 0.05rem 0.35rem;
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  vertical-align: middle;
  white-space: nowrap;
}
.ues-count { display: flex; align-items: center; justify-content: space-between; }
.ues-comp { margin: -0.35rem 0 0; font-size: 0.82rem; color: var(--muted); }
.ues-req { font-style: normal; font-size: 0.78rem; color: var(--muted); margin-left: 0.4rem; }
.pill-tell { opacity: 0.75; }
.opt-row { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.opt-col { display: flex; flex-direction: column; gap: 0.3rem; }
.pill {
  padding: 0.3rem 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 600;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-muted);
  cursor: pointer;
}
.pill.on { background: color-mix(in srgb, var(--accent) 16%, transparent); border-color: var(--accent); color: var(--text-primary); }
.opt-name { color: var(--text-primary); }
.opt-pts { font-family: var(--font-mono); font-weight: 700; color: var(--accent); }
.opt-tag { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.03em; color: var(--text-dim); margin-left: 0.4rem; }
.wl-flag { color: #e3b341; margin-right: 0.3rem; }

/* Checkbox tiles (wargear picks, enhancements, warlord) — same look as the tracker's
   ScoringModal checkbox rows (.m-cond/.m-check), so a "select" control reads the same
   everywhere in the app, themed by the faction accent already scoped in by the parent view.
   The tile is a row of two independent controls, not one big clickable button: the label
   toggles the checkbox, and the trailing button (same idiom as RosterUnitBrowser's "+" add
   button) opens the option's profile/rule — no chevron, no accordion look. */
.opt-tile {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
}
.opt-tile.on { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); }
.opt-tile.disabled { opacity: 0.45; }
.opt-select {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  min-width: 0;
  padding: 0.5rem 0.6rem;
  cursor: pointer;
  font-size: 0.85rem;
}
.opt-select input { width: 20px; height: 20px; margin-top: 1px; flex-shrink: 0; accent-color: var(--accent); cursor: pointer; }
.opt-tile.disabled .opt-select { cursor: not-allowed; }
.opt-info {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  background: none;
  border: none;
  border-left: 1px solid var(--border);
  font-size: 1.1rem;
  color: var(--accent);
  cursor: pointer;
}
.opt-info:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); }
.opt-step-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  min-width: 0;
  padding: 0.5rem 0.6rem;
}

/* Smallest phones (down to 320px) — the section headings (.ues-h) stay full-size, everything
   else shrinks a step so the checkbox tiles/info button/pill row don't force horizontal
   crowding or wrap awkwardly at this width. */
@media (max-width: 360px) {
  .ues-default { font-size: 0.76rem; }
  .ues-blist li { font-size: 0.78rem; }
  .pill { padding: 0.22rem 0.45rem; font-size: 0.72rem; }
  .opt-select { padding: 0.4rem 0.45rem; gap: 0.4rem; font-size: 0.78rem; }
  .opt-select input { width: 16px; height: 16px; }
  .opt-name { font-size: 0.78rem; }
  .opt-pts { font-size: 0.78rem; }
  .opt-tag { font-size: 0.56rem; margin-left: 0.25rem; }
  .opt-info { width: 2.15rem; font-size: 0.95rem; }
  .opt-step-body { padding: 0.4rem 0.45rem; gap: 0.35rem; }
}
</style>
