<template>
  <!-- Wargear choices — a group with `cond` (see rosterEngine.js wargearGroupLive) depends on a
       sibling group, e.g. Necron Overlord's Resurrection Orb needs the tachyon arrow given up
       first. It is GREYED OUT rather than removed while that isn't the case: an option that
       disappears when you touch an unrelated one reads as a bug, and the reader is left
       guessing what to undo. `blockers[gi]` says what to undo, in words. -->
  <!-- By PROFILE (owner, 2026-10-14): a unit of several kinds of model shows one block per profile
       — its own options and its copy of every option the squad shares — so the player says WHICH
       model takes a shared one, as in the GW app. The block's heading stands in its first group's
       section (the sections stay siblings of the editor's own); "This unit can be equipped with…"
       is the unit's, and heads the list as its own block. -->
  <template
    v-for="{ g, gi, head, card, nested, merged } in order"
    :key="gi"
  >
    <section
      class="ues-sec"
      :data-gi="gi"
      :class="{ 'ues-inert': shut[gi], 'ues-card': card, 'ues-card-first': card === 'first' || card === 'only', 'ues-card-last': card === 'last' || card === 'only', 'ues-nested': nested, 'ues-merged': merged === 'member' }"
    >
      <h3
        v-if="head"
        class="ues-h ues-profile"
      >
        {{ head.name }}<span
          v-if="head.n > 1"
          class="ues-profile-n"
        > ×{{ head.n }}</span>
      </h3>
      <!-- `ues-instr`, unlike every other .ues-h on this screen: what stands here is a SENTENCE
         out of the datasheet, not a label. See the style rule for why that needs a different
         face. -->
      <h4
        class="ues-h ues-instr"
        :class="{ 'ues-subhead': merged === 'member' }"
      >
        <span
          v-if="!byProfile && miniName(g.m)"
          class="ues-mini"
        >{{ miniName(g.m) }}</span>
        {{ groupLines[gi].head }}
        <ExpandTransition>
          <span
            v-if="capChip(gi)"
            class="ues-cap"
          >{{ capChip(gi) }}</span>
        </ExpandTransition>
        <button
          v-if="foldable(gi)"
          type="button"
          class="ues-text-btn"
          :aria-expanded="!!textOpen[gi]"
          @click="textOpen = { ...textOpen, [gi]: !textOpen[gi] }"
        >
          {{ textOpen[gi] ? labels.rosterInstrHide : labels.rosterInstrShow }}
        </button>
      </h4>
      <!-- The options a sentence lists are the rows under it, so the list is folded where it says
           nothing else (owner, 2026-10-14); its words are one tap away. -->
      <ul
        v-if="groupLines[gi].bullets.length && (!foldable(gi) || textOpen[gi])"
        class="ues-blist"
      >
        <li
          v-for="(b, bi) in groupLines[gi].bullets"
          :key="bi"
        >
          {{ b }}
        </li>
      </ul>
      <p
        v-if="groupLines[gi].note"
        class="ues-bnote"
      >
        * {{ groupLines[gi].note }}
      </p>
      <!-- A group drawn as what the models hold says how to change it, on a line that is always
           there: it came and went with the first "−" at first, and pushed the rows down under
           a player clicking two weapons off in a row (2026-10-07). Only its words change. -->
      <p
        v-if="holds[gi]"
        class="ues-blocked ues-hold"
        :class="{ 'ues-freed': freed(gi) }"
      >
        <Transition
          name="fade"
          mode="out-in"
        >
          <span :key="freed(gi)">{{ freed(gi) ? labels.rosterHoldFreed.replace('{n}', freed(gi)) : labels.rosterHoldHow }}</span>
        </Transition>
      </p>
      <!-- Each of these comes and goes with picks made in OTHER groups, so it slides in. -->
      <ExpandTransition mode="out-in">
        <p
          v-if="overdrawn.has(gi)"
          key="over"
          class="ues-blocked ues-over"
        >
          {{ labels.rosterWargearOverdrawn }}
        </p>
        <p
          v-else-if="blockers[gi]"
          key="blocked"
          class="ues-blocked"
        >
          {{ blockerText(gi) }}
        </p>
        <p
          v-else-if="unavailable[gi]"
          key="none"
          class="ues-bnote"
        >
          {{ labels.rosterPickUnavailable }}
        </p>
      </ExpandTransition>

      <!-- radio: replace with one of… — the default loadout is itself a real option (its own
         name, from the group's `rep`), not a separate pseudo "keep default" pill. Each row is
         a tracker-style checkbox (select); the separate trailing button (same idiom as
         RosterUnitBrowser's "+" add button) opens that row's weapon profile. -->
      <div
        v-if="mode(g, gi) === 'radio'"
        class="opt-col"
      >
        <!-- A set of groups trading the same weapon on a squad: its stock, once, over all of them. -->
        <div
          v-if="showStock(gi)"
          class="opt-tile opt-stock"
        >
          <div class="opt-step-body">
            <span class="opt-name opt-stock-name"><span
              v-for="[id, n] in stockItems[gi] || []"
              :key="id"
              class="stock-item"
              :data-item="id"
            >{{ items[id] }}&nbsp;<span class="stock-item-n">{{ n }}</span></span><span v-if="!stockItems[gi]">{{ g.rep.map((id) => items[id]).join(' + ') }}</span><span class="opt-tag">{{ labels.rosterStockTag }}</span></span>
            <NumberStepper
              v-if="!stockItems[gi]"
              compact
              class="stock-n"
              :model-value="stockLefts[gi]"
              disabled
            />
          </div>
          <button
            type="button"
            class="opt-info"
            data-press
            :aria-label="labels.rosterViewInfo"
            @click="openWeaponInfo(g.rep.map((id) => items[id]))"
          >
            <i class="wi wi-info" />
          </button>
        </div>
        <template
          v-for="opt in radioRows(g, gi)"
          :key="opt.oi ?? 'default'"
        >
          <div
            class="opt-tile"
            :class="{ on: rowOn(gi, opt.oi), disabled: shut[gi] || (!rowOn(gi, opt.oi) && (xpmFull(gi, opt.oi) || poolFull(gi, opt.oi))) }"
          >
            <label class="opt-select">
              <input
                type="checkbox"
                :checked="rowOn(gi, opt.oi)"
                :disabled="shut[gi] || (!rowOn(gi, opt.oi) && (xpmFull(gi, opt.oi) || poolFull(gi, opt.oi)))"
                @change="setRadio(gi, opt.oi, $event)"
              >
              <span class="opt-name">{{ opt.name }}<span
                v-if="radioSel(gi) !== opt.oi && takenBy(gi, opt.oi)"
                class="opt-taken"
              > · {{ takenBy(gi, opt.oi) }}</span></span>
              <span
                v-if="opt.pts"
                class="opt-pts"
              >+{{ opt.pts }}</span>
            </label>
            <button
              type="button"
              class="opt-info"
              data-press
              :aria-label="labels.rosterViewInfo"
              @click="openWeaponInfo(opt.names)"
            >
              <i class="wi wi-info" />
            </button>
          </div>
          <!-- A chained swap of what THIS pick handed the model (the Acothyst's "its torturer's tool can
             be replaced with 1 power weapon", under the special weapon that gave him the tool):
             drawn under the row that makes it possible, and only while that row is on. -->
          <ExpandTransition>
            <div
              v-if="opt.oi != null && rowChildren(gi, opt.oi).length"
              class="opt-nested"
            >
              <div
                v-for="c in rowChildren(gi, opt.oi)"
                :key="c"
                class="opt-nested-group"
              >
                <p class="opt-nested-h">
                  ↳ {{ groupLines[c].head }}
                </p>
                <div
                  v-for="o in nestedRows(def.gear[c])"
                  :key="o.oi"
                  class="opt-tile"
                  :class="{ on: radioSel(c) === o.oi, disabled: shut[c] && radioSel(c) !== o.oi }"
                >
                  <label class="opt-select">
                    <input
                      type="checkbox"
                      :checked="radioSel(c) === o.oi"
                      :disabled="shut[c] && radioSel(c) !== o.oi"
                      @change="setRadio(c, o.oi, $event)"
                    >
                    <span class="opt-name">{{ o.name }}</span>
                    <span
                      v-if="o.pts"
                      class="opt-pts"
                    >+{{ o.pts }}</span>
                  </label>
                  <button
                    type="button"
                    class="opt-info"
                    data-press
                    :aria-label="labels.rosterViewInfo"
                    @click="openWeaponInfo(o.names)"
                  >
                    <i class="wi wi-info" />
                  </button>
                </div>
              </div>
            </div>
          </ExpandTransition>
        </template>
      </div>

      <!-- toggle: single optional item -->
      <div
        v-else-if="mode(g, gi) === 'toggle'"
        class="opt-col"
      >
        <div
          class="opt-tile"
          :class="{ on: toggleOn(gi), disabled: shut[gi] || (!toggleOn(gi) && (xpmFull(gi, 0) || poolFull(gi, 0))) }"
        >
          <label class="opt-select">
            <input
              type="checkbox"
              :checked="toggleOn(gi)"
              :disabled="shut[gi] || (!toggleOn(gi) && (xpmFull(gi, 0) || poolFull(gi, 0)))"
              @change="toggle(gi)"
            >
            <span class="opt-name">{{ optLabel(g.o[0]) }}<span
              v-if="!toggleOn(gi) && takenBy(gi, 0)"
              class="opt-taken"
            > · {{ takenBy(gi, 0) }}</span></span>
            <span
              v-if="g.o[0][1]"
              class="opt-pts"
            >+{{ g.o[0][1] }}</span>
          </label>
          <button
            type="button"
            class="opt-info"
            data-press
            :aria-label="labels.rosterViewInfo"
            @click="openWeaponInfo(optNames(g.o[0]))"
          >
            <i class="wi wi-info" />
          </button>
        </div>
      </div>

      <!-- stepper: N models take X -->
      <div
        v-else
        class="opt-col"
      >
        <!-- What the group replaces, as a row: how many models still carry it (rosterHold's
             stockLeft — after every group, so two groups that replace the same pistol show the
             same number). A count, not a control: it is whatever the rows below did not take,
             so "+" on an option takes from it in one click. The stepper is drawn with its
             buttons hidden so the number stands in the column of the numbers under it. -->
        <div
          v-if="showStock(gi)"
          class="opt-tile opt-stock"
        >
          <div class="opt-step-body">
            <span class="opt-name opt-stock-name"><span
              v-for="[id, n] in stockItems[gi] || []"
              :key="id"
              class="stock-item"
              :data-item="id"
            >{{ items[id] }}&nbsp;<span class="stock-item-n">{{ n }}</span></span><span v-if="!stockItems[gi]">{{ g.rep.map((id) => items[id]).join(' + ') }}</span><span class="opt-tag">{{ labels.rosterStockTag }}</span></span>
            <NumberStepper
              v-if="!stockItems[gi]"
              compact
              class="stock-n"
              :model-value="stockLefts[gi]"
              disabled
            />
          </div>
          <button
            type="button"
            class="opt-info"
            data-press
            :aria-label="labels.rosterViewInfo"
            @click="openWeaponInfo(g.rep.map((id) => items[id]))"
          >
            <i class="wi wi-info" />
          </button>
        </div>
        <div
          v-for="(o, oi) in g.o"
          :key="oi"
          class="opt-tile"
          :class="{ disabled: shut[gi] }"
        >
          <div class="opt-step-body">
            <span class="opt-name">{{ optLabel(o) }}<span
              v-if="o[1]"
              class="opt-pts"
            > +{{ o[1] }}</span><span
              v-if="!stepCount(gi, oi) && takenBy(gi, oi)"
              class="opt-taken"
            > · {{ takenBy(gi, oi) }}</span></span>
            <NumberStepper
              v-if="holds[gi]"
              compact
              :model-value="held(gi, oi)"
              :min="0"
              :max="held(gi, oi) + freed(gi)"
              :disabled="shut[gi]"
              @update:model-value="setHeld(gi, oi, $event)"
            />
            <NumberStepper
              v-else
              compact
              :model-value="stepCount(gi, oi)"
              :min="0"
              :max="stepMax(gi, oi)"
              :disabled="shut[gi]"
              :editable="typeable(gi)"
              :label="optLabel(o)"
              @update:model-value="setStep(gi, oi, $event)"
            />
          </div>
          <button
            type="button"
            class="opt-info"
            data-press
            :aria-label="labels.rosterViewInfo"
            @click="openWeaponInfo(optNames(o))"
          >
            <i class="wi wi-info" />
          </button>
        </div>
      </div>
    </section>
  </template>
</template>

<script setup>
// One unit's wargear choices — every option group of its datasheet, as radios, toggles or
// steppers (the cap decides which), with what blocks a group and what it may still take. Split out
// of UnitEditorFields (2026-10-12); it renders as a fragment, so its sections stay siblings of the
// editor's other sections. It never writes the entry: a pick is `set-wg`, an info button
// `weapon-info`, and the parent applies them.
import { computed, ref, watch } from 'vue'
import NumberStepper from '../tracker/NumberStepper.vue'
import ExpandTransition from '../ExpandTransition.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { loadRosterTextsRu } from '../../data/roster/ru/index.js'
import { sameStockSets, modelCount, modelsPerMini, overdrawnGroups, optionItems, optionLabel, splitInstruction, swapRoom, wargearGroupBlocker, perModelRoom, wargearExclRoom, wargearGroupCap, wargearGroupFallbackCap, wargearGroupSpent, exactPicksOwed, wargearGroupAlwaysOne, wargearXpmRoom, wargearPoolOf, wargearPoolCap, wargearPoolRoom, wargearPoolTakenBy } from '../../composables/rosterEngine.js'
import { holdCounts, holdGroup, holdWg, stockByItem, stockLeft } from '../../composables/rosterHold.js'
import { TYPE_FROM } from './typeableCount.js'

const props = defineProps({
  entry: { type: Object, required: true },
  def: { type: Object, required: true },
  items: { type: Object, required: true },
  texts: { type: Object, required: true },
})
const emit = defineEmits(['set-wg', 'weapon-info'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const models = computed(() => modelCount(props.def, props.entry))
const openWeaponInfo = (names) => emit('weapon-info', names)

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
// A group is shut for one of two reasons, each with its own sentence below the instruction: a
// sibling group holds the weapon it would give up (`blockers`), or the squad is too small for it
// (a cap of 0 — "If this unit contains 10 models…" at 5). The rows were only greyed for the first
// until 2026-09-19; the second said "not available" and let you tick anyway, and validateRoster
// then reported the pick. Same rule for both now: drawn, greyed, current pick visible.
// Nothing to take at this size: the group's cap is a real 0 ("If this unit contains 10 models…"
// at 5), the allowance its copies share is, or its profile fields no model at all (five Corsair
// Reavers have no Felarch).
const unavailable = computed(() => (props.def.gear || []).map((g, gi) => (caps.value[gi] ? !caps.value[gi].limit
  : wargearPoolCap(props.def, props.entry, gi)?.limit === 0 || wargearGroupFallbackCap(props.def, props.entry, gi) === 0)))
const shut = computed(() => (props.def.gear || []).map((g, gi) => !!blockers.value[gi] || unavailable.value[gi]))
function blockerText(gi) {
  const b = blockers.value[gi]
  if (!b) return ''
  const lead = b.need === 'stock' ? labels.value.rosterCondNeedStock
    : b.need === 'gone' ? labels.value.rosterCondNeedGone : labels.value.rosterCondNeedPresent
  // Item names stay English, like everywhere else in the roster data.
  return `${lead} ${b.ids.map((id) => props.items?.[id]).filter(Boolean).join(', ')}`
}
// Only worth showing once it's a real allowance to spend — "≤ 1" is what every ordinary
// one-of group already looks like, and 0 gets its own sentence instead.
function capChip(gi) {
  const cap = caps.value[gi]
  // An exact count says so, and how many are still owed — the chip stands in the heading either
  // way, so only its words change as the player picks (nothing above the rows moves).
  const ex = props.def?.gear?.[gi]?.ex
  if (ex) {
    const owed = exactPicksOwed(props.def, props.entry, gi)
    return owed ? labels.value.rosterPickExactLeft.replace('{n}', owed) : labels.value.rosterPickExact.replace('{n}', ex)
  }
  // A profile's copy of a shared option says the squad's allowance, the same on every copy.
  const pool = !cap && wargearPoolCap(props.def, props.entry, gi)
  if (pool?.limit) {
    const upTo = labels.value.rosterPickPool.replace('{n}', pool.limit)
    return pool.dup ? `${upTo}, ${labels.value.rosterPickDup.replace('{n}', pool.dup)}` : upTo
  }
  if (!cap || cap.limit < 2) return ''
  const upTo = labels.value.rosterPickUpTo.replace('{n}', cap.limit)
  return cap.dup ? `${upTo}, ${labels.value.rosterPickDup.replace('{n}', cap.dup)}` : upTo
}

// The order the groups are drawn in, and where a profile's block begins. Blocks: the unit's own
// options first, then the profiles — the one fielding fewest models first (the Sergeant), each with
// its groups in the data's order. One profile (or none) needs no headings: there is nobody to choose
// between, and the per-group miniature name says the rest as it always did.
const byProfile = computed(() => (props.def.minis?.length || 0) > 1)
// The most models a profile fields, read from the brackets that say how they split.
function maxOf(m) {
  const known = (props.def.sizes || []).filter((s) => s.comp?.length)
  if (!known.length) return (props.def.minis?.length || 0) > 1 ? Infinity : Math.max(...(props.def.sizes || []).map((s) => s.per?.[1] ?? s.per?.[0] ?? 1))
  return Math.max(...known.map((s) => { const c = s.comp.find(([mi]) => mi === m); return c ? (c[2] ?? c[1]) : 0 }))
}
const single = (gi) => maxOf(props.def.gear[gi]?.m ?? 0) <= 1

// One choice drawn as several groups (rosterEngine's sameStockSets): one block, ONE stock row — the
// first group's, its "no swap" row for a single model, the models still carrying it for a squad —
// and the other groups under it as sub-headings with their own allowance (owner, 2026-10-14: the
// Acothyst's twin torturer's tools appeared twice). For a single model the groups exclude each
// other: a pick in one clears the others. A chained group or one drawn as what the models hold
// keeps its own block.
const merges = computed(() => {
  const out = new Map() // gi -> { set, role }
  for (const set of sameStockSets(props.def)) {
    const kept = set.filter((gi) => !chains.value.has(gi) && !holds.value[gi])
    if (kept.length < 2) continue
    kept.forEach((gi, k) => out.set(gi, { set: kept, role: k ? 'member' : 'lead' }))
  }
  return out
})
const textOpen = ref({})
// A sentence whose bullets are exactly the rows under it says nothing the rows do not.
function foldable(gi) {
  const g = props.def.gear[gi]
  return groupLines.value[gi].bullets.length === g.o.length && !groupLines.value[gi].note
}

// A CHAINED swap: a group that gives up an item its profile is not printed with, which another group
// of the same profile hands out — the Acothyst trades the torturer's tool his special weapon came
// with, a Desolation Sergeant the superkrak launcher the squad's swap gave him (13 groups). Read on
// its own, above the pick that makes it possible, it offered to replace a weapon the model did not
// have (owner, 2026-10-14). So it is drawn under that pick: under the row that is on where the
// source is a one-of (one model), as its own indented group under the source where models count.
// A source whose pick closes this group (its `cond`: "if not equipped with a power weapon") is no
// source. With no source pick the group is not drawn — unless it still holds a pick, which is then
// shown where it was, marked over, so it can be undone.
const chains = computed(() => {
  const gear = props.def.gear || []
  const printed = new Map((props.def.defaults || []).map(([m, list]) => [m, new Set(list.map(([id]) => id))]))
  const out = new Map() // child gi -> { ids, sources }
  gear.forEach((g, gi) => {
    if (g.all || g.m == null || g.cp || g.alt || !g.rep?.length) return
    const ids = g.rep.filter((id) => !printed.get(g.m)?.has(id))
    if (!ids.length) return
    const sources = []
    gear.forEach((h, hi) => {
      if (hi === gi || h.all || h.m !== g.m) return
      if (g.cond && (g.cond[0] === hi || g.cond[3]?.includes(hi)) && !g.cond[1]) return
      if (h.o.some((o) => optionItems(o).some(([id]) => ids.includes(id)))) sources.push(hi)
    })
    if (sources.length) out.set(gi, { ids, sources })
  })
  return out
})
// Where each chained group stands right now: under the source pick that hands its item, or nowhere.
const nesting = computed(() => {
  const gear = props.def.gear || []
  const out = new Map() // child gi -> { gi, oi, row } | null
  for (const [c, { ids, sources }] of chains.value) {
    let at = null
    for (const s of sources) {
      const pick = wg().find(([g, o, n]) => g === s && (n ?? 1) > 0 && optionItems(gear[s].o[o]).some(([id]) => ids.includes(id)))
      if (pick) { at = { gi: s, oi: pick[1], row: mode(gear[s], s) !== 'stepper' && mode(gear[c], c) !== 'stepper' }; break }
    }
    out.set(c, at)
  }
  return out
})
function rowChildren(gi, oi) {
  return [...nesting.value].filter(([, at]) => at?.row && at.gi === gi && at.oi === oi).map(([c]) => c)
}
// A nested group's rows: its options, each a tick — unticked is the stock it keeps.
const nestedRows = (g) => radioRows(g).filter((r) => r.oi != null)

const order = computed(() => {
  const gear = props.def.gear || []
  // A chained group placed inside its source's row is not a group of its own here; one placed after
  // its source follows it; one with no source is skipped, unless it holds a pick.
  const after = new Map()
  const skip = new Set()
  for (const [c, at] of nesting.value) {
    if (at?.row) skip.add(c)
    else if (at) { skip.add(c); after.set(at.gi, [...(after.get(at.gi) || []), c]) }
    else if (!wg().some(([g]) => g === c)) skip.add(c)
  }
  const member = (gi) => merges.value.get(gi)?.role === 'member'
  const withChildren = (r) => [r, ...(after.get(r.gi) || []).map((c) => ({ g: gear[c], gi: c, nested: true }))]
  const expand = (list) => list.flatMap((r) => {
    if (skip.has(r.gi) || member(r.gi)) return []
    const m = merges.value.get(r.gi)
    if (!m) return withChildren(r)
    return m.set.flatMap((gi) => withChildren({ g: gear[gi], gi, merged: gi === r.gi ? 'lead' : 'member' }))
  })
  const rows = gear.map((g, gi) => ({ g, gi }))
  if (!byProfile.value) return expand(rows).map((r) => ({ ...r, head: null }))
  const perMini = modelsPerMini(props.def, props.entry)
  const profiles = [...new Set(rows.filter((r) => !r.g.all).map((r) => r.g.m ?? 0))]
    .sort((a, b) => maxOf(a) - maxOf(b) || a - b)
  // Each block is a card: the heading opens it, every group of the profile sits inside its frame.
  const out = []
  const block = (list, head) => {
    const shown = expand(list)
    shown.forEach((r, k) => out.push({ ...r, head: k ? null : head, card: shown.length === 1 ? 'only' : k === 0 ? 'first' : k === shown.length - 1 ? 'last' : 'mid' }))
  }
  block(rows.filter((r) => r.g.all), { name: labels.value.rosterUnitOptions, n: 0 })
  for (const m of profiles) block(rows.filter((r) => !r.g.all && (r.g.m ?? 0) === m), { name: miniName(m), n: perMini?.get(m) ?? 0 })
  return out
})

// Another profile's copy holds what the squad may take of this option: its row is greyed (`poolFull`)
// and says who has it, so the player knows where to take it back from.
function takenBy(gi, oi) {
  const m = wargearPoolTakenBy(props.def, props.entry, gi, oi)
  return m == null ? '' : labels.value.rosterPickTakenBy.replace('{name}', miniName(m))
}
function poolFull(gi, oi) {
  return oi != null && wargearPoolRoom(props.def, props.entry, gi, oi, { wholeGroup: true }) === 0
}

const optLabel = (o) => optionLabel(o, props.items)

// A group's steppers take a typed count from TYPE_FROM up (typeableCount.js), read from its ceiling.
function typeable(gi) {
  const cap = caps.value[gi]
  const ceiling = cap ? cap.limit : wargearGroupFallbackCap(props.def, props.entry, gi)
  return ceiling != null && ceiling >= TYPE_FROM
}
const optNames = (o) => optionItems(o).map(([id]) => props.items[id]).filter(Boolean)

// Groups holding more than the unit allows now — marked in place, so the player can see which
// row to take down (rosterEngine's overdrawnGroups). After a trim there are none; what is left
// here came from an import or from before a rule.
const overdrawn = computed(() => overdrawnGroups(props.def, props.entry))

function miniName(m) { return props.def.minis?.[m]?.n || '' }

// ── Wargear selection: entry.wg = [[groupIdx, optIdx, count], …] (deviations only) ──
function wg() { return props.entry.wg || [] }
// The pick goes to the parent, which owns the entry (and drops its trim offer: a pick made after a
// shrink is the player answering it).
function setWg(next) {
  emit('set-wg', next.filter((s) => s[2] > 0))
}

// Three shapes, and the CAP is what decides between them — not appdata's own inputType alone.
// A group that lets several models each take something is a set of steppers sharing one budget
// ("up to 4 Kasrkin"), whether appdata calls it a stepper or a checkbox; a group that allows a
// single pick is the familiar one-of radio (or a toggle when there's only one thing to take).
// Without a structural cap this falls back exactly to the old inputType-only reading.
function mode(g, gi) {
  const cap = caps.value[gi]
  // A single-option "stepper" that no unit size lets past one model is a one-for-one swap, drawn
  // like every other one (wargearGroupAlwaysOne) — not a 0/1 counter.
  const single = g.in === 'stepper' && g.o.length === 1 && !(cap && cap.limit > 1) && wargearGroupAlwaysOne(props.def, gi)
  if (!single && (g.in === 'stepper' || (cap && cap.limit > 1))) return 'stepper'
  // A single option that REPLACES something is a choice between two things, so the stock weapon
  // is a row of its own, as in every one-of group: it is no longer listed above the groups.
  return g.o.length > 1 || g.rep?.length ? 'radio' : 'toggle'
}

// radio (one-of): a single selection per group. `null` means "the default loadout" — shown as
// its own named row (from the group's `rep`, the item(s) it replaces), never a special pill.
function radioSel(gi) {
  const s = wg().find((x) => x[0] === gi)
  return s ? s[1] : null
}
// A tap on the row that is on takes the choice back to the stock row — it is a checkbox, and
// unticking is what a player tries. The stock row cannot be unticked (there is nothing to go back
// to), and its box is put back: the browser had already cleared it, and with the choice unchanged
// nothing would redraw it (an owner's screenshot, 2026-10-14: rows lit, boxes empty).
// For a single model, a set of groups trading one weapon (`merges`) is one choice: its stock row
// clears them all, a pick in one clears the others.
function oneChoice(gi) {
  const m = merges.value.get(gi)
  return m && single(gi) ? m.set : [gi]
}
function rowOn(gi, oi) {
  return oi == null ? oneChoice(gi).every((x) => radioSel(x) == null) : radioSel(gi) === oi
}
function setRadio(gi, oi, ev) {
  const set = oneChoice(gi)
  if (oi == null) {
    if (set.every((x) => radioSel(x) == null)) { if (ev?.target) ev.target.checked = true; return }
    setWg(wg().filter((x) => !set.includes(x[0])))
    return
  }
  if (radioSel(gi) === oi) { setWg(wg().filter((x) => x[0] !== gi)); return }
  setWg([...wg().filter((x) => !set.includes(x[0])), [gi, oi, 1]])
}
// One row per selectable state of a radio group: index 0 is always the default (oi: null),
// falling back to rosterKeepDefault's generic wording only on the rare group whose instruction
// text didn't parse a `rep` (see gen-roster-data.mjs's linkWargearConditions) — everywhere else
// it shows the actual default item name(s), so there's never an unnamed "keep default" pseudo-option.
function radioRows(g, gi = null) {
  // A set's stock row is its first group's alone, and on a squad it is the count over the rows.
  const m = gi == null ? null : merges.value.get(gi)
  const noStock = m && (m.role === 'member' || !single(gi))
  const rows = noStock ? [] : [{
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
// A group whose rows include the weapons it replaces (Havocs' "autocannon or lascannon → one of
// five", the two among them) is drawn as what the models HOLD — see rosterHold.js. Its stock
// models are already spoken for, so a change is two steps: "−" takes a weapon off a model, "+"
// gives the freed model another. What is taken off and not yet replaced lives only here: the
// entry changes when the model gets its new weapon, so leaving a weapon off and walking away
// changes nothing — the hint over the rows says so.
const stockLefts = computed(() => (props.def.gear || []).map((g, gi) => (g.rep?.length ? stockLeft(props.def, props.entry, gi) : null)))
// …and item by item where the group's options need different items (rosterHold's stockByItem):
// "Power Fist 3 · Storm Bolter 0" in place of the name and the one number, which read 0 while "+" on
// the option handing the storm bolter back still took. Same row, same line — it only wraps.
const stockItems = computed(() => (props.def.gear || []).map((g, gi) => (stockLefts.value[gi] != null ? stockByItem(props.def, props.entry, gi) : null)))
// The row of models still carrying what a group trades: a stepper's own, and a squad's set's once.
function showStock(gi) {
  if (holds.value[gi] || stockLefts.value[gi] == null) return false
  const m = merges.value.get(gi)
  if (m?.role === 'member') return false
  return mode(props.def.gear[gi], gi) === 'stepper' || (m?.role === 'lead' && !single(gi))
}
const holds = computed(() => (props.def.gear || []).map((g, gi) => (holdGroup(props.def, gi) ? holdCounts(props.def, props.entry, gi) : null)))
const takenOff = ref({})
let ownWrite = false
watch([() => props.entry, () => props.entry.wg, () => props.entry.size, () => props.entry.count], () => {
  if (ownWrite) ownWrite = false
  else takenOff.value = {}
})
const offAt = (gi, oi) => takenOff.value[gi]?.[oi] || 0
function held(gi, oi) { return holds.value[gi][oi] - offAt(gi, oi) }
function freed(gi) { return (takenOff.value[gi] || []).reduce((a, n) => a + (n || 0), 0) }
function setHeld(gi, oi, n) {
  const off = [...(takenOff.value[gi] || [])]
  if (n < held(gi, oi)) {
    off[oi] = offAt(gi, oi) + 1
  } else if (offAt(gi, oi)) {
    off[oi]--
  } else {
    const from = off.findIndex((x) => x > 0)
    if (from < 0) return
    off[from]--
    const counts = [...holds.value[gi]]
    counts[from]--
    counts[oi]++
    ownWrite = true
    setWg(holdWg(props.def, props.entry, gi, counts))
  }
  takenOff.value = { ...takenOff.value, [gi]: off }
}

// What's left for THIS option: the group's own budget minus what its siblings already took, and
// never more than the duplicate cap on a single option. Falls back to reading "For every N
// models, 1 model…" out of the instruction for the groups appdata gives no cap for — that guess
// is both too loose ("Up to 4 Dominions" reads as no cap) and too strict ("for every 5 models,
// up to 2" reads as one), which is exactly why the structural cap is preferred wherever it exists.
// …and never past the rules about one model that reach across groups (Legends Crisis: starred items
// and ranged weapons counted with the burst-cannon swap) — rosterEngine's perModelRoom, whichever
// branch below answered.
function stepMax(gi, oi) {
  return Math.min(groupStepMax(gi, oi), perModelRoom(props.def, props.entry, gi, oi) ?? Infinity,
    wargearXpmRoom(props.def, props.entry, gi, oi) ?? Infinity, wargearPoolRoom(props.def, props.entry, gi, oi) ?? Infinity)
}
// A one-of row or a toggle a model's cross-group limit (`xpm`) has no room for: a Knight Destrier
// whose other arm already holds the chainsword. Greyed, not hidden — and never the row that is on.
function xpmFull(gi, oi) {
  return oi != null && wargearXpmRoom(props.def, props.entry, gi, oi, { wholeGroup: true }) === 0
}
function groupStepMax(gi, oi) {
  // What the group's OTHER options have already taken. Every ceiling below belongs to the GROUP —
  // "any number of models can each have their lastrum bolt cannon replaced with ONE OF THE
  // FOLLOWING" is one budget of models, however many rows it is drawn as — so a row's own room is
  // whatever is left of it.
  const elsewhere = wargearGroupSpent(props.entry, gi, oi)
  // The stock rule (rosterEngine's swapRoom): a stepper counts models, and a model that already
  // gave the weapon up to ANOTHER group is not there to give it up again — five Terminators with
  // five combi-weapons have no combi-bolter left for a heavy weapon. `room` is what the other
  // groups left this one, so it is the group's whole budget here, whatever its own cap says.
  const room = swapRoom(props.def, props.entry, gi, oi)
  // The group's cap, with this option's own no-duplicates (`od`) if it has one.
  const cap = caps.value[gi] && wargearGroupCap(props.def, props.entry, gi, oi)
  // One per model across a set of options (Broadside's twin plasma rifle / twin smart missile
  // system): what the set's other options left of the model count.
  const excl = wargearExclRoom(props.def, props.entry, gi, oi)
  if (cap) return Math.max(0, Math.min(cap.dup || cap.limit, excl ?? Infinity, Math.min(cap.limit, room ?? Infinity) - elsewhere))
  // "For every 5 models in this unit:" over a BULLET LIST, and only that: the generator reads every
  // scaled allowance that states its number into `lim` (gen-roster-data.mjs's SCALED_ALLOWANCE), so
  // what is left here is the umbrella whose bullets are separate allowances — a Red Corsairs Raider
  // squad swaps 1 boltgun AND 1 reaver's blade per 5 models. Per option is the right reading for
  // those, and the two groups in that shape are the only ones that still reach this line.
  // A profile's copy of a shared option has its allowance in the pool (stepMax) and its own models
  // below — never this reading of the sentence, which is the squad's.
  const m = !wargearPoolOf(props.def, gi) && (props.texts[props.def.gear[gi].t] || '').match(/for every (\d+) model/i)
  if (m) return Math.min(Math.floor(models.value / Number(m[1])), room ?? Infinity)
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
  if (own != null) return Math.max(0, Math.min(own, room ?? Infinity) - elsewhere)
  return models.value * (props.def.gear[gi].cp || 1)
}
</script>

<style scoped src="./unitEditorFields.css"></style>

<style scoped>
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
/* The option list under a group's instruction — indented under the heading it belongs to, and
   muted so the heading still reads as the heading. */
.ues-blist { margin: -0.25rem 0 0.5rem; padding-left: 1.1rem; list-style: none; }
.ues-blist li { position: relative; font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; }
.ues-blist li::before { content: '◦'; position: absolute; left: -0.85rem; color: var(--text-dim); }
.ues-bnote { margin: -0.25rem 0 0.5rem; font-size: 0.78rem; color: var(--text-dim); line-height: 1.35; }
/* A group waiting on a sibling. The heading and the instruction stay at full strength — the
   reader still has to be able to READ what the option is — while the tiles below carry the same
   .opt-tile.disabled fade every other unavailable pick in this editor uses. */
/* …the profile's heading is the whole block's, not this group's, and stays at full strength. */
.ues-inert .ues-h:not(.ues-profile),
.ues-inert .ues-blist { opacity: 0.6; }
.ues-blocked {
  margin: -0.25rem 0 0.5rem;
  font-size: 0.78rem;
  line-height: 1.35;
  color: var(--text-muted);
  font-style: italic;
}
/* A profile's options are a CARD (owner, 2026-10-14): the frame is drawn on its groups' own
   sections — they stay siblings of the editor's other sections — and its heading is a tinted bar
   across the top, as the catalogue's role headers and an attached block's head are (a tinted bar
   means "a heading" across the builder), with the accent edge on its left. */
.ues-sec.ues-card {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
}
.ues-sec.ues-card-first { margin-top: 0.75rem; padding-top: 0; border-top: 1px solid var(--border); }
.ues-sec.ues-card-last { border-bottom: 1px solid var(--border); }
.ues-profile {
  margin: 0 -0.5rem 0.55rem;
  padding: 0.3rem 0.5rem;
  background: color-mix(in srgb, var(--accent) 20%, var(--bg-secondary));
  border-bottom: 1px solid var(--border);
  border-left: 2px solid var(--accent);
}
/* The other groups of a set trading one weapon: under the first, no rule between, a sub-heading. */
.ues-sec.ues-merged { border-top: none; padding-top: 0.15rem; }
.ues-h.ues-instr.ues-subhead { font-size: 0.8rem; color: var(--text-muted); font-weight: 500; }
.ues-text-btn {
  margin-left: 0.35rem;
  padding: 0 0.3rem;
  font: inherit;
  font-size: 0.75rem;
  color: var(--accent-ink);
  background: none;
  border: none;
  cursor: pointer;
}
/* A chained group after the source whose models feed it, indented under it. */
.ues-sec.ues-nested { padding-left: 1.25rem; }
/* …or inside the row that is on, as ticks under it. */
.opt-nested { margin: 0.1rem 0 0.35rem 1.4rem; display: flex; flex-direction: column; gap: 0.3rem; }
.opt-nested-h { margin: 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.35; }
.opt-nested-group { display: flex; flex-direction: column; gap: 0.3rem; }
.ues-profile-n { color: var(--text-muted); }
/* Who holds what this row cannot take — after the name, muted, never a line of its own. */
.opt-taken { color: var(--text-muted); font-size: 0.85em; }
/* The stock row's number without its buttons: hidden, not removed, so it keeps the stepper's
   width and stands over the numbers below it. */
.stock-n :deep(.step-btn) { visibility: hidden; }
.ues-hold { font-style: normal; transition: color 0.2s; }
.ues-freed { color: var(--accent-ink); }
.ues-over { color: var(--danger); font-style: normal; }
/* The stock row's name and its tag are two flex items: when the line runs out the TAG drops to the
   next line, and the weapon names stay whole ("Bolt Pistol + Boltgun", not "Bolt Pistol +" over
   "Boltgun STOCK" — owner, 2026-10-07). */
.opt-stock-name { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 0.4rem; }
.opt-stock-name .opt-tag { margin-left: 0; }
/* Item by item: each "name count" is a flex item, so the line breaks between items first, a dot
   after every one but the last; a name too long for the line wraps inside, its count held to its
   last word by the no-break space. */
.stock-item { min-width: 0; }
.stock-item:has(+ .stock-item)::after { content: '·'; margin-left: 0.4rem; color: var(--text-dim); }
.stock-item-n { font-weight: 600; font-variant-numeric: tabular-nums; }

/* Smallest phones (down to 320px) — the section headings (.ues-h) stay full-size, everything
   else shrinks a step so the checkbox tiles/info button/pill row don't force horizontal
   crowding or wrap awkwardly at this width. */
@media (max-width: 360px) {
  .ues-blist li { font-size: 0.78rem; }
}
</style>
