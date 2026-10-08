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
        <i class="bi bi-file-earmark-text" /> {{ labels.rosterShowDatasheet }}
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
          :ctx="{ def, entry, items, detachments, leaderTargets, units }"
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
          :ctx="{ detachments }"
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
            <i class="bi bi-info-circle" />
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
            <span class="opt-name"><i class="bi bi-flag-fill wl-flag" /> {{ labels.rosterWarlord }}</span>
          </label>
        </div>
      </section>
    </ExpandTransition>

    <!-- Wargear choices — a group with `cond` (see rosterEngine.js wargearGroupLive) depends on a
         sibling group, e.g. Necron Overlord's Resurrection Orb needs the tachyon arrow given up
         first. It is GREYED OUT rather than removed while that isn't the case: an option that
         disappears when you touch an unrelated one reads as a bug, and the reader is left
         guessing what to undo. `blockers[gi]` says what to undo, in words. -->
    <template
      v-for="(g, gi) in def.gear || []"
      :key="gi"
    >
      <section
        class="ues-sec"
        :class="{ 'ues-inert': shut[gi] }"
      >
        <!-- `ues-instr`, unlike every other .ues-h on this screen: what stands here is a SENTENCE
           out of the datasheet, not a label. See the style rule for why that needs a different
           face. -->
        <h4 class="ues-h ues-instr">
          <span
            v-if="miniName(g.m)"
            class="ues-mini"
          >{{ miniName(g.m) }}</span>
          {{ groupLines[gi].head }}
          <ExpandTransition>
            <span
              v-if="capChip(gi)"
              class="ues-cap"
            >{{ capChip(gi) }}</span>
          </ExpandTransition>
        </h4>
        <ul
          v-if="groupLines[gi].bullets.length"
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
            v-else-if="caps[gi] && !caps[gi].limit"
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
          <div
            v-for="opt in radioRows(g)"
            :key="opt.oi ?? 'default'"
            class="opt-tile"
            :class="{ on: radioSel(gi) === opt.oi, disabled: shut[gi] || (radioSel(gi) !== opt.oi && xpmFull(gi, opt.oi)) }"
          >
            <label class="opt-select">
              <input
                type="checkbox"
                :checked="radioSel(gi) === opt.oi"
                :disabled="shut[gi] || (radioSel(gi) !== opt.oi && xpmFull(gi, opt.oi))"
                @change="setRadio(gi, opt.oi)"
              >
              <span class="opt-name">{{ opt.name }}</span>
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
              <i class="bi bi-info-circle" />
            </button>
          </div>
        </div>

        <!-- toggle: single optional item -->
        <div
          v-else-if="mode(g, gi) === 'toggle'"
          class="opt-col"
        >
          <div
            class="opt-tile"
            :class="{ on: toggleOn(gi), disabled: shut[gi] || (!toggleOn(gi) && xpmFull(gi, 0)) }"
          >
            <label class="opt-select">
              <input
                type="checkbox"
                :checked="toggleOn(gi)"
                :disabled="shut[gi] || (!toggleOn(gi) && xpmFull(gi, 0))"
                @change="toggle(gi)"
              >
              <span class="opt-name">{{ optLabel(g.o[0]) }}</span>
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
              <i class="bi bi-info-circle" />
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
            v-if="!holds[gi] && stockLefts[gi] != null"
            class="opt-tile opt-stock"
          >
            <div class="opt-step-body">
              <span class="opt-name opt-stock-name"><span>{{ g.rep.map((id) => items[id]).join(' + ') }}</span><span class="opt-tag">{{ labels.rosterStockTag }}</span></span>
              <NumberStepper
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
              <i class="bi bi-info-circle" />
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
              > +{{ o[1] }}</span></span>
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
              <i class="bi bi-info-circle" />
            </button>
          </div>
        </div>
      </section>
    </template>

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
              >
              <span class="opt-name">
                {{ e.name }}
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
              <i class="bi bi-info-circle" />
            </button>
          </div>
        </div>
      </section>
    </ExpandTransition>

    <!-- Leader attachment — no separate "not attached" tile: unticking the selected checkbox
         already means that (same logic as the enhancement list above). -->
    <ExpandTransition>
      <section
        v-if="leaderTargets.length"
        class="ues-sec"
      >
        <h4 class="ues-h">
          {{ labels.rosterAttachTo }}
        </h4>
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
                <i class="bi bi-plus-lg" />
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
import WeaponProfileModal from './WeaponProfileModal.vue'
import EnhancementRuleModal from './EnhancementRuleModal.vue'
import ConfirmModal from '../ConfirmModal.vue'
import FactionAccentScope from './FactionAccentScope.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { loadRosterTextsRu } from '../../data/roster/ru/index.js'
import { ENTRY_NOTE_MAX, allySourceOf, allegFor, allegSpent, defaultWargearPoints, fixedLoadoutLines, fitWargear, modelsPerMini, overdrawnGroups, optionItems, optionLabel, setNote, splitInstruction, swapRoom, wargearGroupBlocker, perModelRoom, wargearExclRoom, wargearGroupCap, wargearGroupFallbackCap, wargearGroupSpent, exactPicksOwed, wargearGroupAlwaysOne, wargearXpmRoom } from '../../composables/rosterEngine.js'
import { holdCounts, holdGroup, holdWg, stockLeft } from '../../composables/rosterHold.js'

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
const emit = defineEmits(['toggle-warlord', 'add-leader', 'add-host'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

// "Can be led by" and "Can lead", each folded until asked for; the titles are built here, not out
// of adjacent template fragments (a line break there would be a real space — see the root CLAUDE.md).
const foldOpen = ref({})
// The row whose datasheet is open, or null.
const sheetPreview = ref(null)
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
const shut = computed(() => (props.def.gear || []).map((g, gi) => !!blockers.value[gi] || !!(caps.value[gi] && !caps.value[gi].limit)))
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
  if (!cap || cap.limit < 2) return ''
  const upTo = labels.value.rosterPickUpTo.replace('{n}', cap.limit)
  return cap.dup ? `${upTo}, ${labels.value.rosterPickDup.replace('{n}', cap.dup)}` : upTo
}

const optLabel = (o) => optionLabel(o, props.items)

// From six models on, a count can be typed as well as stepped (a tap on the number): twenty
// Termagants with fleshborers is not twenty taps (owner, 2026-10-07). Read from the group's own
// ceiling, not the room left in it, so the control does not change kind halfway through a group.
const TYPE_FROM = 6
function typeable(gi) {
  const cap = caps.value[gi]
  const ceiling = cap ? cap.limit : wargearGroupFallbackCap(props.def, props.entry, gi)
  return ceiling != null && ceiling >= TYPE_FROM
}
const optNames = (o) => optionItems(o).map(([id]) => props.items[id]).filter(Boolean)

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
  props.enhOptions.filter((e) => e.eligible || e.name === props.entry.enh))

// ── Size / model count ──
const curSize = computed(() => props.def.sizes[props.entry.size ?? 0] || props.def.sizes[0])
const curRange = computed(() => curSize.value.per[0] !== curSize.value.per[1])
const models = computed(() => props.entry.count ?? curSize.value.per[0])
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
// Groups holding more than the unit allows now — marked in place, so the player can see which
// row to take down (rosterEngine's overdrawnGroups). After a trim there are none; what is left
// here came from an import or from before a rule.
const overdrawn = computed(() => overdrawnGroups(props.def, props.entry))

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

// ── Wargear selection: entry.wg = [[groupIdx, optIdx, count], …] (deviations only) ──
function wg() { return props.entry.wg || [] }
function setWg(next) {
  trimmed.value = null
  props.entry.wg = next.filter((s) => s[2] > 0)
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
// A group whose rows include the weapons it replaces (Havocs' "autocannon or lascannon → one of
// five", the two among them) is drawn as what the models HOLD — see rosterHold.js. Its stock
// models are already spoken for, so a change is two steps: "−" takes a weapon off a model, "+"
// gives the freed model another. What is taken off and not yet replaced lives only here: the
// entry changes when the model gets its new weapon, so leaving a weapon off and walking away
// changes nothing — the hint over the rows says so.
const stockLefts = computed(() => (props.def.gear || []).map((g, gi) => (g.rep?.length ? stockLeft(props.def, props.entry, gi) : null)))
const holds = computed(() => (props.def.gear || []).map((g, gi) => (holdGroup(props.def, gi) ? holdCounts(props.def, props.entry, gi) : null)))
const takenOff = ref({})
let ownWrite = false
watch(() => [props.entry, props.entry.wg, props.entry.size, props.entry.count], () => {
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
    wargearXpmRoom(props.def, props.entry, gi, oi) ?? Infinity)
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
  const cap = caps.value[gi]
  // One per model across a set of options (Broadside's twin plasma rifle / twin smart missile
  // system): what the set's other options left of the model count.
  const excl = wargearExclRoom(props.def, props.entry, gi, oi)
  if (cap) return Math.max(0, Math.min(cap.dup || cap.limit, excl ?? Infinity, Math.min(cap.limit, room ?? Infinity) - elsewhere))
  // "For every 5 models in this unit:" over a BULLET LIST, and only that: the generator reads every
  // scaled allowance that states its number into `lim` (gen-roster-data.mjs's SCALED_ALLOWANCE), so
  // what is left here is the umbrella whose bullets are separate allowances — a Red Corsairs Raider
  // squad swaps 1 boltgun AND 1 reaver's blade per 5 models. Per option is the right reading for
  // those, and the two groups in that shape are the only ones that still reach this line.
  const m = (props.texts[props.def.gear[gi].t] || '').match(/for every (\d+) model/i)
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

function setEnh(name) { if (name) props.entry.enh = name; else delete props.entry.enh }
// There's no separate "No enhancement" option — unticking the currently-selected checkbox IS
// "no enhancement" (mutual exclusivity means only one can ever be checked at a time, so ticking
// a different one already implies the same thing without needing an explicit toggle).
function toggleEnh(name) { setEnh(props.entry.enh === name ? null : name) }
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
/* The condensed display face this small reads cramped above 400 (owner, 2026-10-07). */
.ues-h {
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--text-primary);
  margin: 0 0 0.3rem;
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
/* The size of the text it heads (owner, 2026-10-07: at 0.7rem the model name read smaller than
   the sentence after it) — capitals at the same size as the sentence's own capitals. */
.ues-mini { color: var(--text-dim); font-weight: 500; text-transform: uppercase; font-size: inherit; letter-spacing: 0.02em; margin-right: 0.3rem; }
.ues-default { font-size: 0.85rem; margin: 0.15rem 0; }
/* The default loadout is a tile like the options under it (owner, 2026-10-01): the same frame and
   ground, its info button in the same right-hand column. Inside a tile the names read at full
   strength — muted text in a frame reads as a disabled pick. The button keeps a floor so a one-line
   loadout still gives the finger a target. */
.ues-default-list { flex: 1; min-width: 0; align-self: center; padding: 0.5rem 0.6rem; }
.ues-default-row .opt-info { min-height: 2.4rem; }
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
/* The stock row's number without its buttons: hidden, not removed, so it keeps the stepper's
   width and stands over the numbers below it. */
.stock-n :deep(.step-btn) { visibility: hidden; }
.ues-hold { font-style: normal; transition: color 0.2s; }
.ues-freed { color: var(--accent-ink); }
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
.ues-over { color: var(--danger); font-style: normal; }
.ues-trimmed {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 0.6rem;
  margin: 0.35rem 0 0;
  font-size: 0.82rem;
  color: var(--muted);
}
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
  transition: background var(--motion-fast), border-color var(--motion-fast), color var(--motion-fast);
}
.pill.on { background: color-mix(in srgb, var(--accent) 16%, transparent); border-color: var(--accent); color: var(--text-primary); }
.opt-name { color: var(--text-primary); }
.opt-pts { font-family: var(--font-mono); font-weight: 700; color: var(--accent-ink); }
.opt-tag { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.03em; color: var(--text-dim); margin-left: 0.4rem; }
/* The stock row's name and its tag are two flex items: when the line runs out the TAG drops to the
   next line, and the weapon names stay whole ("Bolt Pistol + Boltgun", not "Bolt Pistol +" over
   "Boltgun STOCK" — owner, 2026-10-07). */
.opt-stock-name { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 0.4rem; }
.opt-stock-name .opt-tag { margin-left: 0; }
/* Which of the two squads of that name this row is. Its OWN line — the name above it is what the
   reader scans, and a sentence trailing off the end of it would be read as part of the name. */
.opt-which { display: block; margin-top: 0.1rem; font-size: 0.7rem; font-style: normal; line-height: 1.3; color: var(--text-muted); }
/* White, like the Warlord badge on the list row (2026-09-26). */
.wl-flag { color: var(--text-primary); margin-right: 0.3rem; }

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
  color: var(--accent-ink);
  cursor: pointer;
}
.opt-info:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); }
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
  .ues-default { font-size: 0.78rem; }
  .ues-blist li { font-size: 0.78rem; }
  .pill { padding: 0.22rem 0.45rem; font-size: 0.72rem; }
  .opt-select { padding: 0.4rem 0.45rem; gap: 0.4rem; font-size: 0.78rem; }
  .opt-select input { width: 16px; height: 16px; }
  .opt-name { font-size: 0.78rem; }
  .opt-pts { font-size: 0.78rem; }
  .opt-tag { font-size: 0.56rem; margin-left: 0.25rem; }
  .opt-which { font-size: 0.64rem; }
  .opt-info { width: 2.15rem; font-size: 0.95rem; }
  .opt-step-body { padding: 0.4rem 0.45rem; gap: 0.35rem; }
}
</style>
