<template>
  <div
    v-if="roster"
    class="roster-view fa-themed"
    :class="{ 'rv-in-desk': inDesk, 'rv-split': unitPane, 'rv-in-game': inTracker }"
    :style="accentStyle"
  >
    <!-- On the rosters desk (RosterDeskView, wide screens) the page is a column that scrolls on its
         own, and — from 1200px — a unit opens in a column beside it instead of a dialog. -->
    <div class="rv-main">
      <!-- The way back. The answer to the Save that landed here stood opposite it until 2026-09-24;
         it is a toast now (below), so on a phone this row is usually empty and takes no height. -->
      <div
        v-if="!inTracker"
        class="rv-top"
      >
        <!-- On a phone the way back to the list of lists is the bottom nav's Rosters, one thumb away,
           so this line is dropped there (owner, 2026-09-24). From a game or its history it goes
           somewhere the nav does not, and stays. -->
        <RouterLink
          :to="backTo"
          class="back"
          :class="{ 'rv-back-list': !inGame }"
        >
          <i class="wi wi-chevron-left" /> {{ inGame ? labels.trackerRosterBack : labels.rosterBackToList }}
        </RouterLink>
      </div>
      <!-- The answer to the Save that landed here — a toast, not a line of the page (2026-09-24).
         Not inside a game: there this page is a read of a snapshot, with nothing to save. -->
      <RosterCloudToast v-if="!inGame" />

      <header
        class="rv-head"
        data-tour="rv-head"
        :class="{ own: showPoints && ownLimits }"
      >
        <!-- The name and its points share a wrapping row (owner, 2026-10-03): the points stand at
             its right end while both fit, drop under the name first when they don't, and only
             then does the name itself wrap. A list on its own limits has them on a line of their
             own across the header, smaller, with the limits said in words beside them. -->
        <div class="rv-title">
          <h1
            class="rv-name"
            :class="nameFit"
          >
            {{ roster.name || labels.rosterUntitled }}
          </h1>
          <div
            v-if="showPoints"
            class="rv-pts"
            :class="{ own: ownLimits }"
          >
            <div
              class="rv-points"
              :class="{ over: overLimit }"
            >
              <span class="rp-used">{{ points }}</span>
              <!-- A list with no limit shows its total alone. -->
              <template v-if="Number.isFinite(limit)">
                <span class="rp-sep">/</span>
                <span class="rp-cap">{{ limit }}</span>
              </template>
            </div>
            <RosterOwnLimitsMark
              :roster="roster"
              labelled
            />
          </div>
        </div>
        <div class="rv-meta">
          <RouterLink
            v-if="!inGame"
            :to="`/roster/${roster.id}`"
            class="hdr-icon"
            data-tour="rv-edit"
            :aria-label="labels.rosterEdit"
          >
            <i class="wi wi-edit" />
          </RouterLink>
          <!-- Everything else this list can become — a printed sheet, a text export, a clipboard
             full of it — behind one "…" instead of an icon each. The printer stood here alone
             until export and copy joined it, and three icons beside the pencil is a toolbar, not
             a header. Same kebab-into-a-sheet the list page's own cards use. Copy sits beside Export
             rather than inside it because the export dialog's own Copy is a choice of dialect
             first — this one is the answer for the player who just wants the list in their
             clipboard, in the format the GW app writes. -->
          <ActionMenu
            v-if="!inGame"
            v-model:open="menuOpen"
            :title="roster.name || labels.rosterUntitled"
          >
            <template #trigger="{ toggle }">
              <button
                type="button"
                class="hdr-icon"
                data-tour="rv-menu"
                :aria-label="labels.rosterMoreActions"
                @click="toggle"
              >
                <i class="wi wi-more-v" />
              </button>
            </template>
            <!-- The game this list is for: the tracker's setup opens with the faction, detachments,
                 battle size and the list itself already in place (rosterHandoff.js). Lost when the
                 header's actions moved into this menu (2026-08-28); back by the owner's call,
                 2026-10-08. -->
            <button
              type="button"
              class="act-btn"
              :disabled="!roster.faction"
              @click="playThisList"
            >
              {{ labels.rosterUseInTracker }}
            </button>
            <!-- Both of these WRITE the list out, so both wait for the faction data that names its
                 units — a copy taken a beat too early would be a list with no army in it. -->
            <button
              type="button"
              class="act-btn"
              :disabled="!ready"
              @click="openExport"
            >
              {{ labels.rosterExportTitle }}
            </button>
            <button
              type="button"
              class="act-btn"
              @click="goPrint"
            >
              {{ labels.printAction }}
            </button>
            <button
              type="button"
              class="act-btn"
              :disabled="!ready"
              @click="copyWholeList"
            >
              {{ copiedList ? labels.rosterCopied : labels.rosterCopyList }}
            </button>
            <!-- The same archive the list page's cards offer (useRosters.js's setArchived). -->
            <button
              type="button"
              class="act-btn"
              @click="toggleArchived"
            >
              {{ roster.archived ? labels.rosterUnarchive : labels.rosterArchive }}
            </button>
          </ActionMenu>
        </div>
      </header>

      <!-- Checks switched off: the one line said about legality, where the issues would be. Not on an
           archived list — the archive says that itself. -->
      <p
        v-if="roster.faction && !roster.archived && !legalityOn(roster)"
        class="rv-checks-off"
      >
        <i class="wi wi-none" /> {{ labels.rosterChecksOffNote }}
      </p>
      <!-- What the list breaks, said HERE. The editor has always had this behind its footer badge,
         but a list is read far more often than it is edited, and "why is this illegal" was two
         screens away — the list page shows a warning count and this page said nothing at all. -->
      <!-- Not in the game's Roster tab: mid-battle the list is what it is (owner, 2026-09-30). -->
      <button
        v-if="issues.length && !inTracker"
        type="button"
        class="rv-issues"
        data-tour="rv-issues"
        :class="{ err: errorCount }"
        @click="issuesOpen = true"
      >
        <i
          class="wi"
          :class="errorCount ? 'wi-error' : 'wi-warning'"
        />
        <span class="rvi-txt">
          {{ (errorCount ? labels.rosterViewIssues : labels.rosterViewWarns).replace('{n}', String(errorCount || issues.length)) }}
        </span>
        <span
          v-if="errorCount && warnCount"
          class="rvi-more"
        >{{ labels.rosterViewWarns.replace('{n}', String(warnCount)) }}</span>
        <i class="wi wi-chevron-right rvi-go" />
      </button>

      <p
        v-if="!roster.faction"
        class="empty-note"
      >
        {{ labels.rosterViewNoFaction }}
      </p>
      <template v-else>
        <!-- What is true in the battle right now. Only the states this list's own rules actually
           name, and only ones the app can honestly answer — see conditions.js. A switch the
           tracker already knows the answer to (a called Waaagh!) shows as a fact, not a control. -->
        <ConditionChips
          class="rv-conds"
          :switches="armySwitches"
          @toggle="toggleArmyCond"
          @info="openChipInfo"
        />

        <!-- Off the table there is nothing to switch, so this is what stands in that place instead:
           everything the army rule, the detachment(s) and the core rules WOULD do to this list once
           the battle proves their condition. What one unit's own ability or wargear would do is on
           that unit's card — repeating it here would be the whole modifier layer printed twice.
           Closed by default: it is preparation, not the list. -->
        <section
          v-if="possibleGroups.length"
          class="rv-possible"
          data-tour="rv-possible"
        >
          <button
            type="button"
            class="rvp-head"
            :aria-expanded="possibleOpen"
            @click="possibleOpen = !possibleOpen"
          >
            <ChevronIcon
              class="rvp-chev"
              :turned="possibleOpen"
              from="right"
              to="down"
            />
            <span class="rvp-title">{{ labels.dsModifiersPossible }}</span>
            <span class="rvp-count">{{ possibleCount }}</span>
          </button>
          <CollapseTransition :show="possibleOpen">
            <ul class="rvp-list">
              <template
                v-for="g in possibleGroups"
                :key="g.key"
              >
                <li class="rvp-src">
                  {{ g.label }}
                </li>
                <li
                  v-for="(n, i) in g.notes"
                  :key="i"
                  class="rvp-mod"
                >
                  <span class="rvp-delta">{{ modDelta(n, labels) }}</span>
                  <span class="rvp-name">{{ n.source }}</span>
                  <span
                    v-if="n.when"
                    class="rvp-cond"
                  >{{ n.when[locale] || n.when.en }}</span>
                </li>
              </template>
            </ul>
          </CollapseTransition>
        </section>

        <!-- The list's own notes, above the tabs because they are about the whole list and not about
           any one of them. Folded: a plan is written once and read at a couple of moments, and an
           open paragraph would stand between the header and the army on every visit (CLAUDE.md,
           "Vertical density" — secondary things start folded). -->
        <div
          v-if="roster.notes"
          class="rv-notes"
        >
          <button
            type="button"
            class="rvn-head"
            :aria-expanded="notesOpen"
            @click="notesOpen = !notesOpen"
          >
            <ChevronIcon
              class="rvn-chev"
              :turned="notesOpen"
              from="right"
              to="down"
            />
            <span>{{ labels.rosterNotes }}</span>
          </button>
          <CollapseTransition :show="notesOpen">
            <p class="rvn-text">
              {{ roster.notes }}
            </p>
          </CollapseTransition>
        </div>

        <!-- In the game's Roster tab the army's rules and stratagems have tabs of their own (Armies,
             CP), so the list is all this page shows there (owner, 2026-09-30). -->
        <PageTabs
          v-if="!inTracker"
          class="rv-tabs"
          data-tour="rv-tabs"
          :tabs="viewTabs"
          @select="tab = $event"
        />

        <!-- Compact read-only unit list, grouped like the editor. Clicking a row opens the full
           rules card in RosterUnitRulesModal — not an inline accordion, that read badly nested
           and had overflow issues (see git history if this is ever revisited). -->
        <!-- The three tabs' panels fade over each other (a sideways slide until 2026-09-29 — jerky). -->
        <Transition
          name="fade"
          mode="out-in"
          @enter="bringTabsIntoView"
        >
          <div
            v-if="tab === 'units'"
            key="units"
            class="rv-units"
          >
            <p
              v-if="!roster.units.length"
              class="empty-note"
            >
              {{ labels.rosterUnitsEmptyView }}
            </p>

            <template
              v-for="g in groupedUnits"
              :key="g.id"
            >
              <template v-if="g.entries.length">
                <h3
                  class="roster-group-head"
                  :class="{ locked: g.locked }"
                >
                  {{ groupLabel(g, labels) }}
                  <em
                    v-if="g.ally"
                    class="roster-group-tag"
                  >{{ g.locked ? labels.rosterAllyLocked : labels.rosterAllySection }}</em>
                </h3>
                <!-- The row is a CONTAINER, not one big button: in a live game it carries this unit's
                 own state switches under the stats, and a button cannot hold buttons. Opening the
                 card stays a button of its own, covering everything but the switches. -->
                <template
                  v-for="e in g.entries"
                  :key="e.uid"
                >
                  <!-- The block's own line, as the editor's list draws it: the player's name for it (or
                   the numbered default) and what the whole attached unit costs, above its rows. It
                   was a total under the last row, with no name — the block the player named in the
                   editor read here as three unrelated units (owner, 2026-09-24). -->
                  <div
                    v-if="hasAttached(g.entries, e)"
                    class="rvblock-head"
                  >
                    <span class="rvblock-name">{{ e.blockName || labels.rosterBlockDefault.replace('{n}', blockNo.get(e.uid)) }}</span>
                    <span class="rvblock-total">{{ hostBlockTotal(g.entries, e, (x) => entryMeta.get(x.uid)?.points || 0) }}{{ labels.rosterPointsLabel }}</span>
                  </div>
                  <div
                    class="rvunit"
                    data-tour="rv-unit"
                    :class="{
                      'rvunit-attached': e.leaderOf,
                      'rvunit-host': hasAttached(g.entries, e) || companionRows(defOf(e.id)).length > 0,
                      'rvunit-on': unitPane && viewingUid === e.uid,
                      'rvunit-fallen': fallen(e),
                    }"
                  >
                    <!-- The unit's stats open it — heard as a card (pressSound.js), and the whole card
                         sinks with them, Battle-shocked row and all (`data-press-scope`); a crew line
                         below is a card of its own (owner, 2026-10-08). -->
                    <button
                      type="button"
                      class="rvunit-main"
                      data-press
                      data-press-sound="card"
                      data-press-scope=".rvunit"
                      @click="viewingUid = e.uid"
                    >
                      <span class="rvunit-text">
                        <!-- In the game the summary (warlord, models, upgrades, enhancement) stands at the
                       right end of the name's line — a line less per card (owner, 2026-09-30); a
                       summary that does not fit beside the name wraps under it rather than being cut. -->
                        <span class="rvunit-head">
                          <span class="rvunit-name">
                            {{ defOf(e.id)?.name || e.id }}
                            <!-- The player's own note (rosterEngine's note helpers) — what they wrote to
                         read HERE, at the table, which is why it is on the row rather than behind
                         the card this row opens. -->
                            <span
                              v-if="e.note"
                              class="rvunit-note"
                            >({{ e.note }})</span>
                            <!-- Attached characters sit under their bodyguard (rosterEngine's
                         joinAttached); the tag says which slot, which nesting alone can't. -->
                            <span
                              v-if="rowMeta.get(e.uid)?.role"
                              class="rvunit-role"
                            >{{ rowMeta.get(e.uid).role }}</span>
                          </span>
                          <span
                            v-if="inTracker && summaryLine(e)"
                            class="rvunit-sub"
                          >{{ summaryLine(e) }}</span>
                        </span>
                        <!-- A destroyed unit folds to its name and the way to change that (owner,
                             2026-10-08): its numbers and switches say nothing any more. -->
                        <ExpandTransition>
                          <RosterStatPlates
                            v-if="rowMeta.get(e.uid)?.stats.length && !fallen(e)"
                            class="rvunit-stats"
                            :stats="rowMeta.get(e.uid).stats"
                            :large="inTracker"
                          />
                        </ExpandTransition>
                        <span
                          v-if="!inTracker"
                          class="rvunit-sub"
                        >{{ summaryLine(e) }}</span>
                      </span>
                      <!-- No chevron (owner, 2026-09-30): the row opens a dialog, not a fold, and a
                           chevron beside it read as one. -->
                      <span
                        v-if="!roster.cp"
                        class="rvunit-pts"
                      >{{ entryMeta.get(e.uid)?.points }}</span>
                    </button>
                    <!-- What THIS unit has done, right where its numbers are. Army-wide states stay above
                   the list — those are facts about the battle, not about a unit — and these are the
                   ones a player flips every turn, which is not worth opening a card for.

                   ONE chip stays out: Battle-shock, the one every unit of every army can be in and
                   the one that gets marked every Command phase. Everything else — states only some
                   rules read, auras radiating from other models in the list — folds behind the
                   chevron beside it, because a Sororitas list gave every row three stacked chips
                   and the numbers they belong to got lost between them. The chevron appears only
                   when there is something behind it. -->
                    <div
                      v-if="pinnedChipOf(e) || inGame"
                      class="rvunit-conds"
                    >
                      <ConditionChips
                        v-if="pinnedChipOf(e) && !fallen(e)"
                        :switches="[pinnedChipOf(e)]"
                        @toggle="toggleUnitChip(e, $event)"
                        @info="openChipInfo"
                      />
                      <button
                        v-if="restChipsOf(e).length && !fallen(e)"
                        type="button"
                        class="rvunit-more"
                        :aria-expanded="openChips.has(e.uid)"
                        :aria-label="labels.rosterMoreStates"
                        @click="toggleChips(e.uid)"
                      >
                        <!-- "more 2", not a bare "2": the number alone said nothing (QA, 2026-10-17). -->
                        <span class="rvunit-more-n">{{ labels.rosterMoreN.replace('{n}', restChipsOf(e).length) }}</span>
                        <ChevronIcon
                          :turned="openChips.has(e.uid)"
                          from="down"
                          to="up"
                        />
                      </button>
                      <!-- Where the unit is: the row's other end (owner, 2026-10-08). -->
                      <UnitStatusButton
                        v-if="inGame && keeps('trackUnitStates')"
                        :status="unitStatusOf(gamePlayer, e.uid)"
                        :name="defOf(e.id)?.name || e.id"
                        :disabled="!canSwitch"
                        :locked-why="reviveWhy(e)"
                        @set="setStatus(e, $event)"
                      />
                    </div>
                    <CollapseTransition
                      v-if="restChipsOf(e).length"
                      :show="openChips.has(e.uid) && !fallen(e)"
                    >
                      <ConditionChips
                        class="rvunit-conds rvunit-rest"
                        :switches="restChipsOf(e)"
                        @toggle="toggleUnitChip(e, $event)"
                        @info="openChipInfo"
                      />
                    </CollapseTransition>
                  </div>
                  <!-- Who comes WITH the unit and cannot be bought on his own — Sir Hekhtur, who climbs
                   out of Canis Rex (`crew`) — and who its abilities bring into the game — Ripper
                   Swarms from a Parasite of Mortrex (`spawns`). A row each under the unit, so the card
                   is one tap away at the table (rosterCompanionRows.js); no points, no switches. -->
                  <button
                    v-for="c in companionRows(defOf(e.id))"
                    :key="c.kind + c.id"
                    type="button"
                    class="rvunit rvunit-main rvunit-crew"
                    :class="{ 'rvunit-on': unitPane && viewingCrew === c.id }"
                    data-press
                    data-press-sound="card"
                    @click="openCrew(c)"
                  >
                    <i
                      class="wi rvunit-crew-mark"
                      :class="c.kind === 'spawn' ? 'wi-add-circle' : 'wi-return'"
                    />
                    <span class="rvunit-text">
                      <span class="rvunit-name">{{ c.name }}</span>
                      <span
                        v-if="c.kind === 'spawn'"
                        class="rvunit-crew-note"
                      >{{ labels.rosterSpawnNote }} · {{ c.rule }}</span>
                    </span>
                    <span
                      v-if="!roster.cp && c.kind !== 'spawn'"
                      class="rvunit-pts"
                    >0</span>
                    <i class="wi wi-chevron-right rvunit-chev" />
                  </button>
                </template>
              </template>
            </template>
          </div>

          <!-- Army rule + selected detachment(s) rule, lazily loaded (heavy faction rules bundle) -->
          <RosterRulesTab
            v-else-if="tab === 'rules'"
            key="rules"
            :faction="rulesFaction"
            :detachments="selectedDetachmentRules"
            :list="rulesList"
          />

          <!-- Stratagems — the Stratagems page's own toolbar and phase groups, over this roster's
               detachments (RosterStratagemsTab). -->
          <RosterStratagemsTab
            v-else-if="tab === 'stratagems'"
            key="stratagems"
            :detachments="rulesFaction ? selectedDetachmentRules : null"
            :game-slot="nowSlot"
          />

          <!-- Preparing for an opponent: the five matchups this list's disposition can be dealt.
               Off the table only — in a game the matchup is already decided. -->
          <div
            v-else
            key="missions"
            class="rv-missions"
          >
            <RosterMissionsTab
              v-if="ready"
              :candidates="dispCands"
              :declared="dispNow"
              :editable="!inGame"
              @change="dispModalFrom = $event; dispModalOpen = true"
            />
          </div>
        </Transition>
      </template>

      <RosterExportModal
        v-if="exportOpen"
        :roster="roster"
        :faction="factionData"
        :core="rosterCore"
        :items="rosterItems.items"
        @close="exportOpen = false"
      />

      <RosterDispositionModal
        v-if="dispModalOpen"
        :candidates="dispCands"
        :declared="dispNow"
        :sources="dispSources"
        :initial="dispModalFrom"
        @save="saveDisposition"
        @close="dispModalOpen = false"
      />

      <RosterIssuesModal
        v-if="issuesOpen"
        :issues="validation.issues"
        @goto="(uid) => { issuesOpen = false; tab = 'units'; viewingUid = uid }"
        @close="issuesOpen = false"
      />

      <RosterUnitRulesModal
        v-if="viewingCard && !unitPane"
        v-bind="viewingCard"
        v-on="viewingHandlers"
        @close="viewingUid = null; viewingCrew = null"
      />
      <!-- A card's stratagem box ticked in a game counting CP: played like one from the CP tab — on
           this unit, the cost asked, the CP spent (StratPlayModal, stratagemPlay.js). -->
      <StratPlayModal
        v-if="playingOnCard"
        :strat="playingOnCard.strat"
        :pi="gamePi"
        :fixed-target="playingOnCard.target"
        :z-index="420"
        @close="playingOnCard = null"
      />
    </div>
    <aside
      v-if="unitPane"
      class="rv-unit"
    >
      <RosterUnitRulesCard
        v-if="viewingCard"
        :key="viewingUid || viewingCrew"
        v-bind="viewingCard"
        inline
        v-on="viewingHandlers"
      />
      <p
        v-else
        class="rv-unit-empty"
      >
        {{ labels.rosterPickUnit }}
      </p>
    </aside>
  </div>
</template>

<script setup>
import { countLabel } from '../../utils/plural.js'
import { modelsLabel } from '../../utils/copyTier.js'
import ChevronIcon from '../../components/ChevronIcon.vue'
import { computed, markRaw, onMounted, onUnmounted, ref, shallowRef, toRaw, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFileFinishedGameOnLeave } from '../../composables/fileFinishedGame.js'
import CollapseTransition from '../../components/CollapseTransition.vue'
import ExpandTransition from '../../components/ExpandTransition.vue'
import RosterUnitRulesModal from '../../components/roster/RosterUnitRulesModal.vue'
import RosterUnitRulesCard from '../../components/roster/RosterUnitRulesCard.vue'
import RosterCloudToast from '../../components/roster/RosterCloudToast.vue'
import RosterIssuesModal from '../../components/roster/RosterIssuesModal.vue'
import RosterExportModal from '../../components/roster/RosterExportModal.vue'
import ActionMenu from '../../components/ActionMenu.vue'
import RosterOwnLimitsMark from '../../components/roster/RosterOwnLimitsMark.vue'
import ConditionChips from '../../components/ConditionChips.vue'
import UnitStatusButton from '../../components/tracker/UnitStatusButton.vue'
import { unitStatusOf, statusTargets } from '../../composables/unitStatus.js'
import PageTabs from '../../components/PageTabs.vue'
import RosterMissionsTab from '../../components/roster/RosterMissionsTab.vue'
import RosterRulesTab from '../../components/roster/RosterRulesTab.vue'
import RosterStratagemsTab from '../../components/roster/RosterStratagemsTab.vue'
import RosterDispositionModal from '../../components/roster/RosterDispositionModal.vue'
import { useRosterSync } from '../../composables/useRosterSync.js'
import { refreshSummaries } from '../../composables/rosterSummary.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { bringTabsIntoView } from '../../composables/bringTabsIntoView.js'
import { useKeywordPopover } from '../../composables/useKeywordPopover.js'
import { useKeywordContext } from '../../composables/useFactionKeywordUnits.js'
import { useRosters } from '../../composables/useRosters.js'
import { useRosterDerived } from '../../composables/useRosterDerived.js'
import { useFactionAccent } from '../../composables/useFactionAccent.js'
import { provideModalScope } from '../../composables/modalScope.js'
import { loadArmyStrats } from '../../composables/gameStratagems.js'
import { deckStratFor } from '../../composables/stratagemPlay.js'
import StratPlayModal from '../../components/tracker/StratPlayModal.vue'
import rosterCore from '../../data/roster/core.js'
import { rosterItems } from '../../data/roster/index.js'
import { buildRosterText } from '../../composables/rosterExport.js'
import { playRoster } from '../../composables/playRoster.js'
import { APP_DATA_VERSION } from '../../data/appDataVersion.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { provideCombatPatrolBox } from '../../composables/useCombatPatrolBox.js'
import RosterStatPlates from '../../components/roster/RosterStatPlates.vue'
import { loadKeywordVocabulary, unitKeywordsOf } from '../../composables/ruleTargets.js'
import { ownLimitsLines } from '../../composables/battleLimitFacts.js'
import { allySourceOf, effectiveBattle, blockNumbers, legalityOn, dispositionCandidates, dispositionOf, groupLabel, entrySummary, hostBlockTotal, leaderTargetsFor, mandatoryEnhancementFor, usesAllies } from '../../composables/rosterEngine.js'
import { applyStatMods, splitBearers, grantedKeywordsFrom, resolveModifierEntries, allegianceChoiceOf, datasheetEntriesFor, aurasReaching, gateStratagems, attachedUnitKeywords, attachedEnhKeys, attachmentOf } from '../../composables/rosterStatMods.js'
import { itemKey, loadoutItemNames, findEnhancementProse, detKey, wargearConditions } from '../../composables/rosterModifiers.js'
import { unitDoctrines } from '../../composables/doctrineRules.js'
import { foldName } from '../../utils/foldName.js'
import { groupModNotes, modDelta, possibleModNotes } from '../../composables/rosterModNotes.js'
import { coreModifiers } from '../../data/rosterModifiers/coreRules.js'
import { conditions } from '../../data/rosterModifiers/conditions.js'
import { variantPassage } from '../../composables/variantPassage.js'
import { tracks } from '../../data/trackerOptions.js'
import { activeConditions, rosterConditions, switchesFor, stratagemsFor, stratagemsClearedBy, activeStratagems, activeAuras, auraSwitchesFor, allPicks, pickSwitchesFor, activeUses, usesFor, attachedUids, clockOf, stampOf, isShockCondition, groupLimitsFor } from '../../composables/rosterGameContext.js'
import { memberAt } from '../../composables/rosterGameLink.js'
import { normName } from '../../composables/rosterFactionRules.js'
import { useRosterFactionData, useRosterFactionRules } from '../../composables/useRosterFactionData.js'
import { rosterNameFit } from '../../utils/rosterNameFit.js'
import { APP_VERSION } from '../../buildInfo.js'
import { useTour, useTourShow } from '../../composables/useTour.js'
import { companionRows } from '../../composables/rosterCompanionRows.js'

const props = defineProps({
  // The rosters desk (RosterDeskView) shows a saved roster beside the list, by id; the routes
  // give it through the address.
  rosterId: { type: String, default: '' },
  // On the desk: the list of lists stands beside the page, so the way back to it is not drawn.
  inDesk: { type: Boolean, default: false },
  // On the desk from 1200px: a unit's card opens in a column beside the page, not in a dialog.
  unitPane: { type: Boolean, default: false },
  // The game screen's Roster tab (RoundTracker) holds this page itself, built on its first visit
  // and kept (owner, 2026-09-30): which army by `pi`/`mi` instead of the address, no way back to
  // draw, and `frozen` while it is not on screen — see `game` below.
  inTracker: { type: Boolean, default: false },
  pi: { type: Number, default: null },
  mi: { type: Number, default: null },
  frozen: { type: Boolean, default: false },
})

const route = useRoute()
// The game's roster is one of the game's screens: leaving the game from here files a finished one.
useFileFinishedGameOnLeave()
const router = useRouter()
const { locale } = useLocale()
// The same popover a core ability or a modifier note opens — a chip's "i" is one more way in.
const { openRule } = useKeywordPopover()
const labels = computed(() => ui[locale.value])
const { rosterById, updateRoster, setArchived, rosters } = useRosters()
const { saveToCloud } = useRosterSync()

// Two ways in: /roster/:id/view reads the saved roster, /tracker/game/roster/:pi reads the
// SNAPSHOT the current game carries for that player (rosterGameLink.js). Same screen either way —
// the in-game one is where the live-rules layer will hang, so it must not become a second copy.
//
// useTracker is imported dynamically on purpose: it statically pulls the mission/event datasets,
// and the ordinary roster route must not carry them.
const gamePi = computed(() => (props.inTracker ? props.pi : route.params.pi != null ? Number(route.params.pi) : null))
// Doubles: which member of the side this list belongs to (absent in singles → the side itself).
const gameMi = computed(() => (props.inTracker ? props.mi : route.params.mi != null && route.params.mi !== '' ? Number(route.params.mi) : null))
const inGame = computed(() => gamePi.value != null)
// A finished game reached from the history list (/tracker/history/:gid/roster/:pi) shows the same
// screen as a live one, but as a RECORD: the rule switches are what they were when it ended, and
// there is nothing left to flip. "Back" reopens that game's modal on the history list.
const historyId = computed(() => route.params.gid || null)
const backTo = computed(() => {
  if (historyId.value) return `/tracker?game=${historyId.value}`
  return inGame.value ? '/tracker/game' : '/roster'
})
const gameRoster = ref(undefined) // undefined = not resolved yet, null = no such attachment
// shallowRef, not ref: the store hands back an object of REFS, and a deep ref would unwrap them
// into plain values here — `tracker.value.current.value` would silently be undefined.
const tracker = shallowRef(null)

// The game this route is about — the one in progress, or one out of history.
const liveGame = computed(() => {
  if (!tracker.value || !inGame.value) return null
  return historyId.value
    ? tracker.value.history.value.find((g) => g.id === historyId.value) || null
    : tracker.value.current.value
})
// The unit whose card is open (see "Unit rules modal" below).
const viewingUid = ref(!props.inTracker && route.query?.unit ? String(route.query.unit) : null)
// The game screen opens a unit's card straight from another tab (RoundTracker).
defineExpose({ openUnit: (uid) => { viewingUid.value = uid } })
// Kept off screen in the game's Roster tab, the page must not redo its whole modifier layer on
// every tap of the game (a VP, a CP, a phase step): while `frozen` it reads a plain copy of the
// game taken as it went out of sight — nothing reactive in it, so nothing below recomputes — and
// back on screen it reads the live game again, one recount. A unit's card opened over another
// tab (the Phase tab's line to it) is on screen, so it thaws the page too.
const stillFrozen = computed(() => props.frozen && !viewingUid.value)
const frozenGame = shallowRef(null)
watch([stillFrozen, () => !!liveGame.value], ([f]) => {
  frozenGame.value = f && liveGame.value ? markRaw(JSON.parse(JSON.stringify(toRaw(liveGame.value)))) : null
}, { immediate: true })
const game = computed(() => frozenGame.value || liveGame.value)
// The roster is frozen in the snapshot, but what is TRUE about the battle is not, and that is
// what decides whether a conditional modifier applies. In doubles the member is the holder of
// the roster and of every rule switch, so it stands in for the side everywhere below; the clock
// alone stays keyed by side (the turn belongs to the team).
const gameSide = computed(() => game.value?.players?.[gamePi.value] || null)
const gamePlayer = computed(() => memberAt(gameSide.value, gameMi.value))
// What the game is standing on, from THIS player's side: round, whose turn, which phase. One
// object rather than a bare round, because a switch that lasts a phase has to be able to say so.
const gameClock = computed(() => clockOf(game.value, gamePi.value))
// A record is not editable; only a game in progress offers the switches — and in a shared game
// only the side this phone plays (the sync layer would snap any other write back anyway).
const partyCanEdit = ref(() => true)
const canSwitch = computed(() => inGame.value && !historyId.value && partyCanEdit.value(gamePi.value))

// What this game asked the modifier layer to keep (src/data/trackerOptions.js). OFF THE TABLE
// everything is on: there is no game to have settings, and a list read in the builder gets the
// whole layer. `tracks` answers for a game saved before an option existed, and it is what knows
// that the five families hang off the master — this file never spells that tree out.
const keeps = (setting) => !inGame.value || tracks(game.value?.settings, setting)
const modsOn = computed(() => keeps('trackModifiers'))

// The roster of the game in progress is a LIVE screen of that game — it writes rule switches —
// so while it is up a shared game polls for the other phones' changes (useParty's gate). Loaded
// with the store, dynamically, for the same reason: the plain roster route must not carry it.
let liveParty = null
watch([gamePi, gameMi, historyId], async ([pi, , gid]) => {
  if (pi == null) { gameRoster.value = undefined; tracker.value = null; return }
  const [{ useTracker }, { rosterFromPlayer }, { useParty }] = await Promise.all([
    import('../../composables/useTracker.js'),
    import('../../composables/rosterGameLink.js'),
    import('../../composables/useParty.js'),
  ])
  tracker.value = useTracker()
  gameRoster.value = rosterFromPlayer(gamePlayer.value)
  const party = useParty()
  partyCanEdit.value = party.canEdit
  if (!gid && !liveParty) {
    liveParty = party
    party.attach()
  }
}, { immediate: true })
onUnmounted(() => { if (liveParty) liveParty.detach() })

// The printed sheet behind an id — what a condition about ANOTHER entry (the Bodyguard's keywords,
// the Warlord's) reads.
const sheetOfId = (id) => fullSheets.value.get(id)

// What is true for one entry: the game answers when there is one, and off the table the LIST still
// answers for itself (an enhancement gated on "while the bearer is leading a unit" is proven by the
// roster) — the same call RosterUnitRulesModal makes, so a row and the card behind it agree.
const activeFor = (entry) => (inGame.value
  ? activeConditions(gamePlayer.value, gameClock.value, entry, {
      army: keeps('trackArmyStates'),
      unit: keeps('trackUnitStates'),
      shock: keeps('trackBattleShock'),
      units: roster.value?.units,
      sheetOf: sheetOfId,
      groupLimits: groupLimitsOf(entry),
      ...unitRulesOf(entry),
    })
  : rosterConditions(entry, roster.value?.units, sheetOfId, unitRulesOf(entry).proves))

const roster = computed(() => (inGame.value ? gameRoster.value || null : rosterById(props.rosterId || route.params.id)))
// Leave only once we KNOW there is nothing to show — while the game's snapshot is still resolving
// `roster` is legitimately null, and redirecting then would bounce straight back out of the view.
watch([roster, gameRoster], () => {
  if (props.inTracker) return // the tab offers only armies that carry a list
  if (inGame.value && gameRoster.value === undefined) return
  if (!roster.value) router.replace(backTo.value)
}, { immediate: true })

const tab = ref('units')
// The tour of this page — its own, not inside a game (there the game's chapter tells about it).
const ownPage = () => !inGame.value && !props.inTracker
const { maybeStart: maybeStartTour } = useTour()
// The list's notes start folded on every visit — deliberately not remembered: what is worth a row
// of the first screen is the army, and a plan is read at a moment, not throughout.
const notesOpen = ref(false)
// PageTabs only draws; which one is open is this page's own state.
const viewTabs = computed(() => {
  const l = labels.value
  return [
    { key: 'units', label: l.rosterViewTabUnits, active: tab.value === 'units' },
    { key: 'rules', label: l.rosterViewTabRules, active: tab.value === 'rules' },
    { key: 'stratagems', label: l.rosterViewTabStratagems, active: tab.value === 'stratagems' },
    // Preparing for an opponent — a saved list's question, not a game's (its matchup is fixed).
    ...(inGame.value ? [] : [{ key: 'missions', label: l.rosterViewTabMissions, active: tab.value === 'missions' }]),
  ]
})
// Below `viewTabs`, which it reads: useTourShow answers at once when the page opens on its step.
useTourShow('viewTab', (k) => { if (ownPage() && viewTabs.value.some((t) => t.key === k)) tab.value = k })

// ── Missions tab: the list's Force Disposition and the matchups it can be dealt ──
// dispositionOf is the answer every other screen reads, so the tab and the export agree.
const dispCands = computed(() => dispositionCandidates(curDetachments.value))
const dispNow = computed(() => dispositionOf(roster.value, curDetachments.value))
const dispSources = computed(() => Object.fromEntries(dispCands.value.map((d) => [
  d, curDetachments.value.filter((det) => det?.fds?.includes(d)).map((det) => det.name),
])))
const dispModalOpen = ref(false)
const dispModalFrom = ref(null)
// A deliberate Save in the dialog — so, like the editor's Save, the moment the cloud copy is
// written (uploads follow a Save, never the autosave; useRosterSync.js).
function saveDisposition(name) {
  updateRoster(roster.value.id, { disposition: name })
  saveToCloud(roster.value.id)
  dispModalOpen.value = false
}

// ── Faction accent (useFactionAccent.js — the same recipe every faction-coloured screen uses) ──
const { accentStyle } = useFactionAccent(computed(() => roster.value?.faction))
// In the game screen the dialogs opened from here would wear the game's turn colour (its modal
// scope); a unit's card is its army's, so this page hands down its own faction colour instead.
if (props.inTracker) {
  provideModalScope(computed(() => ({ class: ['fa-themed', 'army-colored'], style: accentStyle.value })))
}

// ── Compact roster data (unit names/sizes/points), same lazy source the editor uses ──
// A Combat Patrol box fielded as a list (`roster.cp`): its units, detachment and sheets join the
// faction's, here and in every card under this screen (useCombatPatrolBox).
provideCombatPatrolBox(() => roster.value?.cp)
const { factionData } = useRosterFactionData(() => roster.value?.faction, { allies: () => usesAllies(roster.value), cp: () => roster.value?.cp })

// Everything this screen reads off the pair — the unit lookup, the detachments in play, the battle
// size, the pricing, the sectioning and the legality verdict — is useRosterDerived.js, so the list
// a player reads at the table can never disagree with the editor they built it in. Declared here,
// above its first use: the whole file below reads `defOf` and `curDetachments`.
const {
  defOf, curDetachments, limit, points, entryMeta, groupedUnits, attachRole, validation,
} = useRosterDerived(roster, factionData)
// The points beside the name. On the desk the list's card beside this page already carries them,
// so they stay only when they say more than the card: the player's own limits, or a list over
// its limit (owner, 2026-10-03). A phone has no card beside it and always shows it.
const overLimit = computed(() => legalityOn(roster.value) && points.value > limit.value)
const ownLimits = computed(() => ownLimitsLines(effectiveBattle(roster.value || {}, rosterCore), labels.value).length > 0)
// A Combat Patrol box has no points: neither the total nor a unit's 0 says anything there.
const showPoints = computed(() => !!roster.value?.faction && !roster.value?.cp && (!props.inDesk || ownLimits.value || overLimit.value))
// A faction keyword tapped in a rule on this screen lists this list's own units first.
useKeywordContext(() => ({ faction: roster.value?.faction, unitIds: roster.value?.units?.map((u) => u.id) }))

// ── Base statline (M/T/SV/W/LD/OC + invuln) for the compact unit rows — not in the compact
// roster data layer, so pull it from the full datasheet file (already needed by the unit rules
// modal on click; loaded here too so every row can show it without opening that modal). EN-only
// is enough — the plates are numbers/pips, not translated text — RosterUnitRulesModal does its
// own separate RU-localized fetch for the modal content.
const fullSheets = ref(new Map())
// Keyed by the id the ROSTER uses, which for an allied unit is namespaced: its datasheet lives in
// its own faction's file (Draxus is an Imperial Agents sheet), and without this every ally row
// would quietly lose its statline plates and its live rules.
const allySlugs = computed(() => [...new Set((roster.value?.units || []).map((u) => allySourceOf(u.id)?.[0]).filter(Boolean))])
watch([() => roster.value?.faction, allySlugs, () => roster.value?.cp], async ([slug, srcs, cp]) => {
  if (!slug) { fullSheets.value = new Map(); return }
  // The keyword vocabulary rides along: the rule gates read it as soon as the sheets land.
  const [, ...lists] = await Promise.all([loadKeywordVocabulary(), loadDatasheets(slug, { cp }), ...srcs.map((s) => loadDatasheets(s))])
  if (roster.value?.faction !== slug) return
  const m = new Map()
  for (const d of lists[0] || []) m.set(d.id, d)
  srcs.forEach((src, i) => { for (const d of lists[i + 1] || []) m.set(`${src}:${d.id}`, d) })
  fullSheets.value = m
}, { immediate: true })

// EVERY datasheet ability of this list, by unit and by its ENGLISH name, as `{ name, text }` in the
// reader's language. Two chips need it: an aura names a rule printed on another unit's card, and an
// ability set's options are switched above the list, far from the card that explains them. Both
// must read the way that card reads — same translated name, and the text one tap away — or the
// reader is matching two spellings of one rule across two screens. In RU it is the same overlay
// RosterUnitRulesModal fetches when a card is opened; in EN no extra fetch at all.
const ruleInfo = ref(new Map())
watch([() => roster.value?.faction, fullSheets, locale], async ([slug, sheets, loc]) => {
  if (!slug || !sheets.size) { ruleInfo.value = new Map(); return }
  let localizeSheet = null
  // One RU overlay per faction on screen — the army's own and each ally's, since an allied unit's
  // translation lives with its own datasheets.
  const ruBySlug = new Map()
  if (loc === 'ru') {
    ;({ localizeSheet } = await import('../../data/datasheets/ru/index.js'))
    const { loadDatasheetsRu } = await import('../../data/datasheets/ru/index.js')
    const slugs = [slug, ...allySlugs.value]
    const loaded = await Promise.all(slugs.map((s, i) => loadDatasheetsRu(s, { cp: i === 0 ? roster.value?.cp : null })))
    if (roster.value?.faction !== slug) return
    slugs.forEach((s, i) => ruBySlug.set(s, loaded[i]))
  }
  const m = new Map()
  for (const [id, en] of sheets) {
    const src = allySourceOf(id)
    const ru = ruBySlug.get(src?.[0] || slug)
    const sheet = ru ? localizeSheet(en, ru?.default?.[src?.[1] || id], ru?.abilityNamesRu) : en
    const byEn = new Map()
    // Keyed by the ENGLISH name, which is what a record holds; `nameEn` is set only when the RU
    // overlay actually renamed the header, so an untranslated ability keys off its own name.
    const take = (a) => byEn.set(a.nameEn || a.name, { name: a.name, text: a.text || '' })
    for (const a of sheet.abilities || []) take(a)
    for (const set of sheet.abilitySets || []) {
      take(set)
      for (const o of set.options || []) take(o)
    }
    if (byEn.size) m.set(id, byEn)
  }
  ruleInfo.value = m
}, { immediate: true })
const ruleInfoOf = (unitId, enName) => ruleInfo.value.get(unitId)?.get(enName) || null

// A switch that belongs to somebody's printed rule (an ability set's options) says so: it names
// itself the way that card does, is headed by the unit it belongs to, and carries the text for the
// info button. A plain game state — "this unit charged" — carries the core rule that defines it,
// if the vocabulary knows one.
// The rule a condition switch came from, as something a reader can see: who owns it, and the text
// behind its "i". `switchesFor` only knows WHICH record named the id — turning that into a name and
// a body needs the faction data, which is this view's to hold.
function srcInfo(src) {
  if (!src) return null
  if (src.kind === 'detachmentRule') {
    const det = curDetachments.value.find((d) => d.id === src.det)
    if (det?.rule) return { owner: det.name, name: det.rule.name, text: det.rule.body }
  }
  if (src.kind === 'armyRule') {
    const ar = rulesFaction.value?.armyRule
    if (ar) return { owner: labels.value.factionArmyRule, name: ar.name, text: ar.body }
  }
  if (src.kind === 'enhancement') {
    for (const det of curDetachments.value) {
      const enh = (det.enhancements || []).find((e) => normName(e.name) === normName(src.name))
      if (enh) return { owner: labels.value.rosterEnhancement, name: enh.name, text: enh.body }
    }
  }
  // A stratagem's own options (spent, then picked — switchesFor's `onUse`): the stratagem's effect.
  if (src.kind === 'stratagem') {
    const det = curDetachments.value.find((d) => d.id === src.det)
    const st = (det?.stratagems || []).find((x) => normName(x.name) === normName(src.name))
    if (st) return { owner: det.name, name: st.name, text: st.effect }
  }
  // A datasheet ability's choice ("Unit: Ability"): that card's own text for it.
  if (src.kind === 'ability' && src.unit) {
    const at = src.name.indexOf(': ')
    const info = ruleInfoOf(src.unit, (at === -1 ? src.name : src.name.slice(at + 2)).replace(/\s*\([^)]*\)\s*$/, ''))
    if (info?.text) return { owner: at === -1 ? null : src.name.slice(0, at), name: info.name, text: info.text }
  }
  // Anything else (a datasheet ability naming an army-wide state — one case in the whole dataset)
  // still gets its rule NAMED, which is most of the answer; the text stays on that unit's card.
  return { owner: null, name: src.name, text: null }
}

function withRuleInfo(list) {
  return (list || []).map((sw) => {
    // A state the CORE rules define carries its definition instead: "Made a Charge move" is a
    // question about the rules, not about somebody's card, and the answer is a paragraph away in
    // the vocabulary itself (conditions.js `hint`). A FACTION state names its own rule instead —
    // six chips reading "Adrenalight"/"Hypex"/… are unreadable until something says they are
    // Combat Drugs, off the Spectacle of Spite detachment.
    if (!sw.from) {
      const hint = sw.info ? null : conditions[sw.id]?.hint
      if (hint) return { ...sw, info: { name: sw.label[locale.value] || sw.label.en, text: hint[locale.value] || hint.en } }
      const src = srcInfo(sw.src)
      if (!src) return sw
      // …and each option its own passage of that rule, where the text marks one out (a `### `
      // subheading or a bullet naming it): "what does Absolution in Battle do" is one paragraph.
      const label = sw.label[locale.value] || sw.label.en
      const passage = src.text ? variantPassage(src.text, sw.label.en) || variantPassage(src.text, label) : null
      return {
        ...sw,
        groupOwner: src.owner ? `${src.owner} · ${src.name}` : src.name,
        // On the heading, not on each chip: these six ARE one rule, unlike an ability set whose
        // options each have their own (see ConditionChips' groups()).
        groupInfo: src.text ? { name: src.name, text: src.text } : null,
        ...(passage && !sw.info ? { info: { name: label, text: passage } } : {}),
      }
    }
    const info = ruleInfoOf(sw.from.unit, sw.from.ability)
    const set = ruleInfoOf(sw.from.unit, sw.from.set)
    return {
      ...sw,
      label: { en: sw.from.ability, ru: info?.name || sw.from.ability },
      groupOwner: sw.from.owner ? `${sw.from.owner} · ${set?.name || sw.from.set}` : (set?.name || sw.from.set),
      info: info?.text ? { name: info.name, text: info.text } : null,
    }
  })
}
// A once-per-battle chip names its rule the way the card does — in Russian on a Russian card — and
// its "i" opens that rule, the way an ability set's option does.
function withUseInfo(list) {
  return (list || []).map((sw) => {
    const info = sw.unit ? ruleInfoOf(sw.unit, sw.ability) : null
    if (!info) return sw
    const short = (n) => n.replace(/\s*\([^)]*\)\s*$/, '')
    return { ...sw, label: { en: sw.label.en, ru: short(info.name) }, info: info.text ? { name: info.name, text: info.text } : null }
  })
}
function openChipInfo(sw, rect) {
  if (sw.info) openRule(sw.info.name, sw.info.text, rect, sw.info.sub)
}

// ── Unit rules modal ──
// `?unit=<uid>` opens that unit's card straight away — how the tracker's phase reminder gets a
// reader from "Brides of Death (Pain), Lelith Hesperax" to the card that says what it does. The
// query is read once, on arrival; closing the card leaves it in the URL, which is harmless (it
// only ever seeds the initial value) and keeps a reload on the same card.
// (`viewingUid` is declared with the game above: an open card keeps the page thawed.)
const viewingEntry = computed(() => roster.value?.units.find((u) => u.uid === viewingUid.value) || null)
// A crew row's card (Sir Hekhtur) — a datasheet id, not an entry: he is in no list, so his card is
// the printed sheet with nothing to overlay. Opening one closes the other.
const viewingCrew = ref(null)
watch(viewingUid, (v) => { if (v) viewingCrew.value = null })
function openCrew(c) {
  viewingUid.value = null
  viewingCrew.value = c.id
}
// The entry, not just its datasheet: the modal's overlay (rosterModifiers.js) needs this unit's
// own wargear picks to show the loadout it actually fields rather than every option on the sheet.
const viewingDef = computed(() => (viewingEntry.value ? defOf(viewingEntry.value.id) : null))
// Resolves `entry.leaderOf` (a uid) to the attached unit's display name for the modal's context
// strip — the same list the editor's attachment picker is built from, computed here only for the
// one entry being viewed.
const viewingLeaderTargets = computed(() => (viewingEntry.value
  ? leaderTargetsFor(viewingDef.value, roster.value?.units, viewingEntry.value.uid, defOf, curDetachments.value)
  : []))
// What the unit's card is drawn from and answers to — the same whether it opens in a dialog or in
// the desk's unit column.
const viewingCard = computed(() => (viewingCrew.value
  ? { unitId: viewingCrew.value, factionSlug: roster.value.faction, ctx: null, gameCtx: null }
  : viewingDef.value
  ? {
      unitId: viewingSrc.value?.[1] || viewingDef.value.id,
      factionSlug: viewingSrc.value?.[0] || roster.value.faction,
      ctx: {
        def: viewingDef.value,
        entry: viewingEntry.value,
        items: rosterItems.items,
        detachments: curDetachments.value,
        leaderTargets: viewingLeaderTargets.value,
        // What reaches this unit from the rest of its Attached unit — the parts still standing.
        units: sourceUnits.value,
        defOf,
      },
      gameCtx: viewingGameCtx.value,
    }
  : null))
const viewingHandlers = {
  'toggle-aura': (...a) => toggleViewingAura(...a),
  'toggle-pick': (...a) => toggleViewingPick(...a),
  'toggle-cond': (...a) => toggleUnitCond(...a),
  'toggle-strat': (...a) => toggleUnitStrat(...a),
  'toggle-use': (...a) => toggleUnitUse(...a),
}

// Same chamfered stat-box plates as DatasheetCard.vue's statline (its statCells()), scaled
// down for a compact list row — invuln is its own trailing plate (see below) rather than
// DatasheetCard's shield-shaped box sitting under SV with a side label; that layout needs more
// room than a one-line row has.
// The statline this ENTRY fields, not the one its datasheet prints: the same modifier layer the
// unit-rules modal applies runs here too. A plate showing 5" while the card behind it shows 7"
// would be the worst of both, so this list and that card go through one implementation
// (rosterStatMods.js) with the same inputs.
function statCellsOf(entry) {
  // statModCache holds every entry whose datasheet is in, which is every entry that gets this far.
  const { sheet: modded, marks } = statModCache.value.get(entry?.uid) || {}
  if (!modded?.profiles?.[0]) return []
  const p = modded.profiles[0]
  const marked = new Set(marks)
  const cell = (key, label, value) => ({ key, label, value, mod: marked.has(`profile:${key}:0`) })
  const cells = [
    cell('m', 'M', p.m),
    cell('t', 'T', p.t),
    cell('sv', 'SV', p.sv),
    cell('w', 'W', p.w),
    cell('ld', 'LD', p.ld),
    cell('oc', 'OC', p.oc),
  ]
  // Last plate, marked `inv: true` so the template can colour it distinctly — same idea as
  // DatasheetCard's own accent-coloured "Invulnerable Save" label, just at the end of the row
  // instead of straight under SV (no room for that layout in a one-line list row).
  if (p.inv) cells.push({ ...cell('inv', 'INV', `${p.inv}${p.invNote ? '*' : ''}`), inv: true })
  return cells
}

// ── Numeric modifier layer (Tier C) for the compact plates ──────────────────────────────────
// Needs two things the Rules tab also loads: the modifier records, and the ENGLISH faction
// bundle whose rule bodies ruleTargets.js reads. Both are per-faction dynamic imports, and
// `loadFaction` memoizes, so opening the Rules tab afterwards costs nothing extra.
const modifierRecords = ref([])
// The ability-set options, which are records too but carry no effects of their own — they exist to
// be picked (rosterGameContext's pickSwitchesFor).
const pickRecords = ref([])
const factionEn = ref(null)
watch([() => roster.value?.faction, () => roster.value?.cp], async ([slug, cp]) => {
  modifierRecords.value = []
  pickRecords.value = []
  factionEn.value = null
  if (!slug) return
  // A Chapter's list reads the Codex: Space Marines records and detachments too (2026-10-01), and a
  // Combat Patrol box its own box's (2026-10-20).
  const [{ loadRosterModifiersFor, usableEntries, pickEntries }, { loadFactionWithCodex }] = await Promise.all([
    import('../../data/rosterModifiers/index.js'),
    import('../../composables/rosterFactionRules.js'),
  ])
  const [mods, fac] = await Promise.all([loadRosterModifiersFor(slug), loadFactionWithCodex(slug, 'en', cp || null)])
  if (roster.value?.faction !== slug || (roster.value?.cp || null) !== (cp || null)) return
  modifierRecords.value = usableEntries(mods)
  pickRecords.value = pickEntries(mods)
  factionEn.value = fac.en
}, { immediate: true })

const factionKeywordSets = computed(() =>
  [...fullSheets.value.values()].map(unitKeywordsOf))

// The modifier records that bear on one entry — shared by the plates and by the switch rows, so
// a switch can never appear for a rule the card itself doesn't consider.
function resolvedFor(entry) {
  if (!entry || !modifierRecords.value.length || !factionEn.value) return []
  const def = defOf(entry.id)
  const enh = entry.enh || mandatoryEnhancementFor(def, curDetachments.value)?.name || null
  const alleg = allegianceChoiceOf(def, entry)
  return [
    // The rulebook's own modifiers apply to every unit of every faction — a Battle-shocked unit's
    // OC is '-' whoever it belongs to — so they are added here rather than resolved per faction.
    ...coreModifiers,
    ...resolveModifierEntries(modifierRecords.value, factionEn.value, roster.value?.detachments, enh, alleg),
    // A datasheet ability can modify the unit it is attached to, so this entry's records include
    // the abilities of whoever leads it and of whoever it leads — the roster records both.
    ...datasheetEntriesFor(modifierRecords.value, attachmentCtxOf(entry)),
  ]
}

// The entries whose rules still reach the rest of their Attached unit. Core Rules 19.04 (and
// 19.04.01, "Only In Death Does Duty End"): an ability, enhancement or keyword a Leader, Support or
// Bodyguard unit confers on the attached unit applies until that part's last model is destroyed,
// and again once it is revived. So in a game a part marked destroyed stops being a SOURCE — its
// abilities, its enhancement, its keywords (19.03: "while that model is part of that unit"). The
// attachment itself stands (19.01, a single unit): who leads whom is still read from the whole
// list (activeFor), so a Leader whose Bodyguard fell keeps its own "while leading" abilities
// (19.04's footnote). Off the table nothing has fallen.
const sourceUnits = computed(() => {
  const units = roster.value?.units || []
  return inGame.value ? units.filter((u) => !fallen(u)) : units
})

// Who is attached to whom, for datasheetEntriesFor(). The game carries its own snapshot of the list,
// so these uids are the ones the entries themselves hold.
function attachmentCtxOf(entry) {
  const units = sourceUnits.value
  const at = attachmentOf(entry, units, (u) => !!defOf(u.id)?.joins)
  return {
    unitId: entry.id,
    leaderUnitIds: at.leaders.map((u) => u.id),
    ledUnitId: at.ledUnitId,
    coLeaderUnitIds: at.coLeaderUnitIds,
    joinedUnitIds: at.joinedUnitIds,
    itemNames: loadoutItemNames(defOf(entry.id), entry, rosterItems.items),
    // The auras the player has marked as reaching this unit. The bearer's own unit and the unit it
    // is attached to are not in here — 22.01 answers those from the list itself.
    auraOn: keeps('trackAuras') ? activeAuras(gamePlayer.value, gameClock.value, entry) : new Set(),
    // …and which detachments are on the table, because one kind of aura hangs off a detachment rule
    // rather than off a model in this list.
    detIds: fieldedDetIds.value,
    // What the attached Leaders are carrying — a Kustom Force Field covers the unit its Big Mek
    // joined, not the Big Mek.
    leaderItemNames: at.leaders.reduce((set, u) => {
      for (const n of loadoutItemNames(defOf(u.id), u, rosterItems.items) || []) set.add(n)
      return set
    }, new Set()),
    // …and which ENHANCEMENTS they wear, for the same reason: an enhancement aura radiates from the
    // model, and the unit that model joined is inside it by 22.01 — no distance to judge, no chip.
    leaderEnhNames: at.leaders.reduce((set, u) => {
      const n = u.enh || mandatoryEnhancementFor(defOf(u.id), curDetachments.value)?.name || null
      if (n) set.add(n)
      return set
    }, new Set()),
    // …and what every other member of this Attached unit carries, for an Upgrade's "This unit…".
    attachedEnhKeys: attachedEnhKeys(entry, units, (u) => u.enh || mandatoryEnhancementFor(defOf(u.id), curDetachments.value)?.name || null),
  }
}

// Everything the player has NAMED on this entry, as record ids: the stratagems spent on it and the
// ability-set options picked on it. Both are proven by the choice itself rather than by a
// condition, and rosterStatMods answers for them through one set.
function chosenFor(entry, resolved) {
  return new Set([
    ...(keeps('trackStratagems') ? activeStratagems(gamePlayer.value, gameClock.value, entry, resolved) : []),
    // Picks are read army-wide, not per entry: a relic picked on the Triumph feeds an aura that
    // lands on the Sisters, whose own picks know nothing about it (see allPicks).
    ...(keeps('trackAbilitySets') ? allPicks(gamePlayer.value, gameClock.value) : []),
    // …and the once-per-battle rules used on it whose window is still open.
    ...(keeps('trackUnitStates') ? activeUses(gamePlayer.value, gameClock.value, entry, resolved, roster.value?.units) : []),
  ])
}

// Everything one entry's modifiers are judged with: the records that bear on it, the keyword set
// they are judged against, and the game state that proves them. One function because the card and
// the CHIPS have to agree — a stratagem this unit cannot be the target of must be missing from
// both, and two places working it out separately is how they come to differ.
function modContextFor(entry) {
  const resolved = resolvedFor(entry)
  if (!resolved.length) return null
  const sheet = fullSheets.value.get(entry?.id)
  // …plus what the entry's own loadout proves (a pair of macro-scalpels, the Shieldline's platform,
  // a Tempestor Prime in the squad), as the card behind the row adds it (rosterUnitCard's
  // gearConds): without it a plate and its card disagreed on a Tidewall Shieldline's W 15.
  const gear = wargearConditions(defOf(entry.id), entry, rosterItems.items, sheet)
  const active = gear.size ? new Set([...activeFor(entry), ...gear]) : activeFor(entry)
  const printed = unitKeywordsOf(sheet)
  // A granted keyword decides which rules bear on the unit at all, so it has to be resolved BEFORE
  // the apply pass gates on the keyword set — the same order RosterUnitRulesModal uses. Skipping it
  // here would let a plate on this row and the card behind it disagree, which is the one thing this
  // shared implementation exists to prevent.
  // A spent stratagem rewrites the row in the list as well as the card behind it — same records,
  // same clock, so the plate and the card can never disagree. Resolved BEFORE the keyword grants,
  // since a stratagem can hand out a keyword (Daemonic Possession's DAEMON) that decides which
  // other rules bear on the unit at all.
  const chosen = chosenFor(entry, resolved)
  // Every gate below judges a rule naming UNITS against the whole ATTACHED unit's keywords and one
  // naming MODELS against this card's own (Core Rules 19.03, ruleTargets' scopeHits) — which is
  // why the attachment the roster records is read here rather than the card's keywords alone.
  const attached = attachedUnitKeywords(entry, sourceUnits.value, (id) => {
    return unitKeywordsOf(fullSheets.value.get(id))
  })
  const own = [...printed, ...grantedKeywordsFrom(resolved, { own: printed, unit: [...printed, ...attached] }, factionKeywordSets.value, active, chosen).map((g) => g.kw)]
  const kws = { own, unit: [...own, ...attached] }
  // …and then the stratagems this unit could never be picked as the target of come off the list.
  return { resolved: gateStratagems(resolved, kws, factionKeywordSets.value, active), kws, active, chosen }
}

// ONE context per entry for the whole screen. Four readers want it — the stat plates, the
// army-wide switch strip, the per-unit chips and the open unit's modal — and three of them walk
// the whole list, so resolving it where it is asked for meant working the records, the keyword
// grants and the stratagem gate out three times per unit (~120 resolutions on a list of forty).
// It is also the answer the plates and the chips MUST share: a stratagem a unit cannot be the
// target of has to be missing from both, and two passes are how they come to differ.
//
// Lazily computed, like any other: a game that keeps no modifier state never reads it, and then
// nothing here runs at all.
const ctxByUid = computed(() => {
  const m = new Map()
  for (const e of roster.value?.units || []) m.set(e.uid, modContextFor(e))
  return m
})
// Every caller passes an entry of THIS roster, which is what the map is built from — a `null` in it
// is a unit no modifier record bears on, the same answer modContextFor gives directly.
const ctxOf = (entry) => ctxByUid.value.get(entry?.uid) || null

// What one row of the list needs beyond its name and its points. Both halves were read TWICE from
// the template — a `v-if` and the thing it guards — which for the plates meant running the whole
// stat pass a second time per row, and for the tag meant walking the list for the host and asking
// leadsFor about it again. A Map lookup is what the template does instead.
const rowMeta = computed(() => {
  const m = new Map()
  for (const e of roster.value?.units || []) m.set(e.uid, { role: attachRole(e), stats: statCellsOf(e) })
  return m
})

// The gated list on its own, for the callers that only want the records and not the keyword set
// that produced them.
const gatedFor = (entry) => ctxOf(entry)?.resolved || []

function statModsFor(entry, sheet) {
  // The master, in the one place that can answer for all of it: no rewritten numbers, no marks,
  // no notes — so the plates, the card behind them and the "possible" summary all fall back to the
  // printed datasheet together. Nothing downstream needs its own gate.
  if (!modsOn.value) return { sheet, marks: [] }
  const ctx = ctxOf(entry)
  if (!ctx) return { sheet, marks: [] }
  // The same placement the card makes, so a Sergeant with a Storm Shield reads W 4* on both.
  const placed = splitBearers(sheet, ctx.resolved, defOf(entry.id), entry, rosterItems.items)
  return applyStatMods(placed.sheet, placed.entries, ctx.kws, factionKeywordSets.value, ctx.active, ctx.chosen)
}

// ── What WOULD apply (out of game only) ─────────────────────────────────────────────────────
// The list's own rules that are waiting on the battle: read straight off the notes the cards
// produce, so a line here and the card it came from can never word the same rule differently.
// Only the roster-wide sources — an army rule and a detachment rule bear on the whole list, while
// an ability, a wargear rule or an enhancement belongs to the one unit that carries it and is
// already on that unit's card. Core rules are out too (possibleModNotes): they are the same for
// every army in every game and say nothing about THIS list.
const ROSTER_WIDE = new Set(['armyRule', 'detachmentRule'])
const possibleOpen = ref(false)
const possibleGroups = computed(() => {
  if (inGame.value) return []
  const seen = new Set()
  const notes = []
  for (const e of roster.value?.units || []) {
    for (const n of possibleModNotes(statModCache.value.get(e.uid)?.notes)) {
      if (!ROSTER_WIDE.has(n.kind)) continue
      // One line per RULE, not per unit it could touch: the same detachment rule produces the same
      // note on every unit it bears on, and twelve identical lines say nothing the first did not.
      const key = `${n.kind}|${n.det}|${n.source}|${n.on}|${n.stat}|${n.op}|${n.value}|${n.when?.en || ''}`
      if (seen.has(key)) continue
      seen.add(key)
      notes.push(n)
    }
  }
  return groupModNotes(notes, labels.value)
})
const possibleCount = computed(() => possibleGroups.value.reduce((n, g) => n + g.notes.length, 0))

// ── Rule switches (in game only) ────────────────────────────────────────────────────────────
// Army-wide states go above the list, where they read as facts about the battle rather than about
// one unit. Per-unit ones live on the unit's own card (RosterUnitRulesModal) — that is where the
// number they change is shown, and a wall of per-unit switches here would be unreadable.
const armySwitches = computed(() => {
  if (!canSwitch.value || !keeps('trackArmyStates')) return []
  const all = (roster.value?.units || []).flatMap((e) => gatedFor(e))
  return withRuleInfo(switchesFor(all, 'army', gamePlayer.value, gameClock.value, null))
})
// This entry's own state switches, for the row in the list. Same source as the card's, so the two
// can never disagree; cached per entry because the template asks for them on every render.
// Battle-shock answers to its own row, the other states to the unit-states row (trackerOptions).
function keptUnitSwitches(list) {
  const shock = keeps('trackBattleShock')
  const states = keeps('trackUnitStates')
  return list.filter((sw) => (isShockCondition(sw.id) ? shock : states))
}
const unitSwitchCache = computed(() => {
  const m = new Map()
  if (!canSwitch.value || !(keeps('trackUnitStates') || keeps('trackBattleShock'))) return m
  for (const e of roster.value?.units || []) {
    m.set(e.uid, withRuleInfo(keptUnitSwitches(switchesFor(gatedFor(e), 'unit', gamePlayer.value, gameClock.value, e, groupLimitsOf(e), unitRulesOf(e)))))
  }
  return m
})
function unitSwitchesOf(entry) { return unitSwitchCache.value.get(entry.uid) || [] }

// The auras of OTHER units in this list that could reach this one, as chips in the same strip as
// its states — an aura is one more thing the player knows and the app cannot, and it is checked
// the same moment Battle-shock is. Which ones are even offered is rosterStatMods' aurasReaching
// (source in this list, keyword gate passed, not already certain from 22.01).
const auraSwitchCache = computed(() => {
  const m = new Map()
  if (!canSwitch.value || !keeps('trackAuras')) return m
  const units = (roster.value?.units || []).map((u) => ({
    uid: u.uid,
    id: u.id,
    name: defOf(u.id)?.name || u.id,
    // An enhancement aura is found by WHO WEARS IT, so the list has to say so (rosterStatMods'
    // aurasReaching); a mandatory enhancement counts the same as a chosen one, as everywhere else.
    enh: u.enh || mandatoryEnhancementFor(defOf(u.id), curDetachments.value)?.name || null,
  }))
  for (const e of roster.value?.units || []) {
    const sheet = fullSheets.value.get(e.id)
    const reaching = aurasReaching(modifierRecords.value, {
      ...attachmentCtxOf(e),
      entryUid: e.uid,
      rosterUnits: units,
      // An aura naming units reaches an attached unit by the keywords of any of its halves (19.03).
      keywords: { own: unitKeywordsOf(sheet), unit: [...unitKeywordsOf(sheet), ...attachedUnitKeywords(e, sourceUnits.value, (id) => unitKeywordsOf(fullSheets.value.get(id)))] },
      factionKeywordSets: factionKeywordSets.value,
      // …and only the auras whose own rule is running: an unselected relic changes nothing.
      active: activeFor(e),
      chosen: chosenFor(e, resolvedFor(e)),
    })
    const named = reaching.map((a) => {
      // A detachment rule's aura is not printed on anybody's datasheet, so its name and text come
      // from the detachment itself — already localised, unlike `ruleInfo`'s datasheet lookup.
      const rule = a.det ? curDetachments.value.find((d) => d.id === a.det)?.rule : null
      const info = rule || ruleInfoOf(a.unit, a.name)
      return { ...a, nameRu: info?.name || null, info: info?.text || info?.body ? { name: info.name, text: info.text || info.body } : null }
    })
    m.set(e.uid, auraSwitchesFor(named, gamePlayer.value, gameClock.value, e))
  }
  return m
})
// Which option of each ability set this unit's own card prints is up. On the unit's row, with its
// states and the auras reaching it: it is that model's choice, made every round, and the card that
// explains it is behind the row anyway.
const pickSwitchCache = computed(() => {
  const m = new Map()
  if (!canSwitch.value || !keeps('trackAbilitySets')) return m
  for (const e of roster.value?.units || []) {
    const chips = pickSwitchesFor(pickRecords.value, gamePlayer.value, gameClock.value, e)
    if (chips.length) m.set(e.uid, withRuleInfo(chips))
  }
  return m
})
// …and its once-per-battle rules, the chips its card carries under "Once per battle": a use is
// marked the moment it is made, at the row, as a charge or a Battle-shock is.
const useSwitchCache = computed(() => {
  const m = new Map()
  if (!canSwitch.value || !keeps('trackUnitStates')) return m
  for (const e of roster.value?.units || []) {
    const chips = usesFor(gatedFor(e), gamePlayer.value, gameClock.value, e, roster.value?.units)
    // Drawn as the card draws them (RosterUnitRulesCard's useChips): one "Once per battle" box,
    // each chip saying on its second line whether its use is running or spent.
    if (chips.length) {
      m.set(e.uid, withUseInfo(chips).map((u) => ({
        ...u,
        groupCaption: labels.value.onceBattle,
        subLabel: u.live ? labels.value.onceLive : u.spent ? labels.value.onceSpent : null,
      })))
    }
  }
  return m
})
function unitChipsOf(entry) {
  return [
    ...unitSwitchesOf(entry),
    ...(pickSwitchCache.value.get(entry.uid) || []),
    ...(auraSwitchCache.value.get(entry.uid) || []),
    ...(useSwitchCache.value.get(entry.uid) || []),
  ]
}
// The one chip that stays on the row: Battle-shock rides on every unit in the game and is marked
// every Command phase. If a list somehow has no Battle-shock record, the first chip takes its place
// rather than the row losing its strip altogether.
const PINNED_CHIP = 'unit-battle-shocked'
function pinnedChipOf(entry) {
  const chips = unitChipsOf(entry)
  return chips.find((c) => c.id === PINNED_CHIP) || chips[0] || null
}
function restChipsOf(entry) {
  const pinned = pinnedChipOf(entry)
  return unitChipsOf(entry).filter((c) => c !== pinned)
}
const openChips = ref(new Set())
function toggleChips(uid) {
  const next = new Set(openChips.value)
  next.has(uid) ? next.delete(uid) : next.add(uid)
  openChips.value = next
}
// What the game log tells of a switch flipped on a unit's card (useTracker's unit mutators): the
// unit's name — the store has no datasheets — and the switch's label in both languages.
const unitNameOf = (entry) => defOf(entry.id)?.name || entry.id
const actOf = (entry, sw) => ({ name: unitNameOf(entry), label: sw.label })
function toggleUnitChip(entry, sw) {
  if (sw.once) {
    if (sw.blocked) return
    tracker.value?.setUnitUse(gamePi.value, entry.uid, sw.id, stampOf(gameClock.value), !sw.on, gameMi.value, attachedUids(entry, roster.value?.units), actOf(entry, sw))
    return
  }
  if (sw.aura) {
    tracker.value?.setUnitAura(gamePi.value, entry.uid, sw.id, stampOf(gameClock.value), !sw.on, gameMi.value, actOf(entry, sw))
    return
  }
  if (sw.pick) {
    // The set's own size caps it, and the store evicts the oldest pick — the same way a condition
    // group behaves, so picking a third relic drops the one that has been up longest.
    const siblings = (pickSwitchCache.value.get(entry.uid) || []).filter((c) => c.group === sw.group).map((c) => c.id)
    tracker.value?.setUnitPick(gamePi.value, entry.uid, sw.id, stampOf(gameClock.value), !sw.on, { siblings, limit: sw.groupLimit }, gameMi.value, actOf(entry, sw))
    return
  }
  toggleUnitCondFor(entry, sw)
}
// Every entry of one ATTACHED unit — the bodyguard and whoever is leading it, including the entry
// asked about. Core Rules 19.01: they are one unit for rules purposes, so a state is one state.
function attachedEntries(entry) {
  const units = roster.value?.units || []
  const hostUid = entry.leaderOf || entry.uid
  const group = units.filter((u) => u.uid === hostUid || u.leaderOf === hostUid)
  return group.length ? group : [entry]
}

// The rule texts an entry carries: its datasheet's abilities, and the wargear abilities of what it
// took — a Command Rod counts only on the squad that has one.
function rulesOf(entry) {
  const sheet = fullSheets.value.get(entry.id)
  if (!sheet) return []
  const carried = loadoutItemNames(defOf(entry.id), entry, rosterItems.items)
  return [
    ...(sheet.abilities || []),
    ...(sheet.wargearAbilities || []).filter((a) => carried?.has(itemKey(a.name))),
  ].map((a) => a.text)
}
// Every rule text an entry's models carry, for the doctrines a rule makes permanent or adds: its
// datasheet's abilities and wargear (rulesOf), the options of an ability set (Mephiston's
// Quickening), and its enhancement's prose (Adept of the Codex).
function doctrineTextsOf(entry) {
  const sheet = fullSheets.value.get(entry.id)
  const enh = entry.enh || mandatoryEnhancementFor(defOf(entry.id), curDetachments.value)?.name || null
  const prose = enh && factionEn.value ? findEnhancementProse(factionEn.value.detachments, enh, roster.value?.detachments)?.body : null
  return [
    ...rulesOf(entry),
    ...(sheet?.abilitySets || []).flatMap((set) => (set.options || []).map((o) => o.text)),
    ...(prose ? [prose] : []),
  ]
}
// The detachment rules this list is fielding, and every unit's rules — for Guilliman's Author of the
// Codex, which lets ANY unit of the army hold a second doctrine. Once per list, not per card.
const fieldedDetRules = computed(() => {
  const names = new Set((roster.value?.detachments || []).map((n) => detKey(n)))
  return (factionEn.value?.detachments || []).filter((d) => names.has(detKey(d.name))).map((d) => d.rule?.body || '')
})
const armyDoctrineTexts = computed(() => (roster.value?.units || []).flatMap((u) => rulesOf(u)))
// What an entry's attached unit has from its rules rather than the army's pick: doctrines always
// active (Calgar, Logan, Adept of the Codex, Death Company), forbidden (Death Company), and how many
// it may hold at once (doctrineRules.js). One answer for every card of the attached unit.
// Worked out once per list and kept (every reader of every card asks, several times per render).
const NO_DOCTRINES = { proves: new Set(), forbids: new Set(), limit: 1 }
const doctrineCache = computed(() => {
  const m = new Map()
  for (const entry of roster.value?.units || []) {
    const parts = attachedEntries(entry)
    const kws = new Set(parts.flatMap((p) => unitKeywordsOf(fullSheets.value.get(p.id))).map((k) => foldName(k)))
    m.set(entry.uid, unitDoctrines({
      texts: parts.flatMap(doctrineTextsOf),
      detTexts: fieldedDetRules.value,
      armyTexts: armyDoctrineTexts.value,
      hasKeyword: (kw) => kws.has(foldName(kw)),
    }))
  }
  return m
})
const doctrinesOf = (entry) => doctrineCache.value.get(entry?.uid) || NO_DOCTRINES
// How many of a group this entry's attached unit may hold where a rule raises it: two Orders under a
// Command Rod or Ursula Creed (rosterGameContext's groupLimitsFor), more than one doctrine under a
// rule "in addition to any other combat doctrine" or all three at once (doctrinesOf).
function groupLimitsOf(entry) {
  const limits = groupLimitsFor(entry, roster.value?.units, rulesOf)
  const { limit } = doctrinesOf(entry)
  return limit > 1 ? { ...limits, 'combat-doctrine': limit } : limits
}
// …and the doctrines its rules settle, for the switches and for what is true.
const unitRulesOf = (entry) => {
  const { proves, forbids } = doctrinesOf(entry)
  // The roster's entries too: a once-per-battle use ticked on the Leader's card opens its options on
  // the Bodyguard's (switchesFor's `onUse`).
  return { proves, forbids, units: roster.value?.units || null }
}

// Switching a per-unit condition on or off. A condition that forbids stratagems takes the ongoing
// ones off the unit as it goes on: leaving a spent stratagem rewriting the card of a unit that may
// not be affected by one is the contradiction the player would have to notice and undo by hand.
//
// It is written to every card of the attached unit at once, because that is what the state IS: one
// Pain token Empowers the whole attached unit ("the Pain abilities of all Leader and Bodyguard
// units in that unit take effect"), one Battle-shock test is taken by the unit, and one Charge move
// is made by all of it. Two cards with two switches for one fact is how they come to disagree.
function toggleUnitCondFor(entry, sw) {
  if (sw.auto) return
  const at = stampOf(gameClock.value)
  const limits = groupLimitsOf(entry)
  for (const part of attachedEntries(entry)) {
    if (!sw.on) {
      for (const sid of stratagemsClearedBy(sw.id, resolvedFor(part), gamePlayer.value, gameClock.value, part)) {
        tracker.value?.setUnitStratagem(gamePi.value, part.uid, sid, at, false, gameMi.value)
      }
    }
    // One state of one unit: the log tells it once, under the name of the card it was flipped on.
    tracker.value?.setUnitCondition(gamePi.value, part.uid, sw.id, at, !sw.on, gameMi.value, limits[conditions[sw.id]?.group || ''], part.uid === entry.uid ? unitNameOf(entry) : null)
  }
}

const fallen = (entry) => inGame.value && unitStatusOf(gamePlayer.value, entry.uid) === 'destroyed'
// On the battlefield, in reserves, destroyed — an attached unit moves whole, dies part by part
// (statusTargets). The store stamps it with the game's clock (unitStatus.js).
// Strict rules: a destroyed unit comes back only as the side's last act taken back (strictRules.js).
function reviveWhy(entry) {
  if (unitStatusOf(gamePlayer.value, entry.uid) !== 'destroyed') return ''
  const why = tracker.value?.strictUndoWhy?.('revive', gamePi.value, entry.uid)
  return why ? labels.value[`trackerStrict_${why}`] : ''
}
function setStatus(entry, status) {
  for (const p of statusTargets(gamePlayer.value, entry, attachedEntries(entry), status)) {
    tracker.value?.setUnitStatus(gamePi.value, p.uid, status, unitNameOf(p), gameMi.value)
  }
}

function toggleArmyCond(sw) {
  if (sw.auto) return // read from the tracker — flip it there, not here
  tracker.value?.setArmyCondition(gamePi.value, sw.id, stampOf(gameClock.value), !sw.on, gameMi.value)
}

// The card the unit modal needs: what is true for that entry, and the switches it may flip. Both
// scopes travel: per-unit ones head the card, and the modal also shows a rule's OWN switches inside
// the rule (Creations of Bile's augmentations are army-wide, but the place a reader meets them is
// the detachment rule on a unit's card). `army` is filtered to this entry's own records, so a card
// only ever offers switches that can change something on it.
const viewingGameCtx = computed(() => {
  if (!inGame.value || !viewingEntry.value) return null
  // The same gated list the card behind these chips is drawn from — a stratagem this unit cannot
  // be the target of is not offered here either (modContextFor).
  const resolved = gatedFor(viewingEntry.value)
  return {
    active: activeFor(viewingEntry.value),
    // Which stratagems are spent on this unit right now, and which its detachments offer that
    // would change a number on this card. Only in a live game: a record's clock is what expires
    // them, and a finished game's clock stopped where the battle did.
    strats: canSwitch.value && keeps('trackStratagems')
      ? strictStrats(stratagemsFor(resolved, gamePlayer.value, gameClock.value, viewingEntry.value), viewingEntry.value)
      : [],
    // …and the auras of other entries that reach it, the same chips its row carries.
    auras: canSwitch.value ? auraSwitchCache.value.get(viewingEntry.value.uid) || [] : [],
    // …and which option of its own ability set is up, likewise the row's chips.
    picks: canSwitch.value ? pickSwitchCache.value.get(viewingEntry.value.uid) || [] : [],
    // …and its once-per-battle rules, ticked once used — a unit state, so under that option.
    uses: canSwitch.value && keeps('trackUnitStates')
      ? withUseInfo(usesFor(resolved, gamePlayer.value, gameClock.value, viewingEntry.value, roster.value?.units))
      : [],
    // Picks are army-wide (allPicks): the card of a unit standing in someone else's aura must
    // read the same number its row does.
    chosen: canSwitch.value && keeps('trackAbilitySets') ? allPicks(gamePlayer.value, gameClock.value) : new Set(),
    switches: canSwitch.value
      ? keptUnitSwitches(switchesFor(resolved, 'unit', gamePlayer.value, gameClock.value, viewingEntry.value, groupLimitsOf(viewingEntry.value), unitRulesOf(viewingEntry.value)))
      : [],
    armySwitches: canSwitch.value && keeps('trackArmyStates')
      ? switchesFor(resolved, 'army', gamePlayer.value, gameClock.value, viewingEntry.value)
      : [],
  }
})
// Strict rules: a stratagem played on this unit before the side's last act cannot be unticked —
// the box stays on, greyed, with why (ConditionChips' `strictLast`).
function strictStrats(list, entry) {
  if (!keeps('stratSpendCp')) return list
  return list.map((st) => (st.on && tracker.value?.strictUndoWhy?.('unplay', gamePi.value, entry.uid, st.id)
    ? { ...st, blocked: true, blockedBy: 'strictLast' }
    : st))
}
// A stratagem box on the card. In a game counting CP it is PLAYING the stratagem on this unit — the
// CP spent, the cost asked (StratPlayModal) — and unticking it takes the play back with its CP
// (useTracker's playStratagem / unplayOnUnit). Where stratagems are not played (`trackStratPlay`,
// which needs CP), or for a record with no stratagem in the deck to spend on, it is the plain mark
// it always was.
const playingOnCard = ref(null)
async function toggleUnitStrat(st) {
  const entry = viewingEntry.value
  const t = tracker.value
  if (!entry || !t) return
  // Shown but not paid for here (`stratSpendCp` off): the plain mark too.
  if (!keeps('stratSpendCp')) {
    t.setUnitStratagem(gamePi.value, entry.uid, st.id, stampOf(gameClock.value), !st.on, gameMi.value, actOf(entry, st))
    return
  }
  if (st.on) {
    t.unplayOnUnit(gamePi.value, entry.uid, st.id, gameMi.value)
    return
  }
  const rec = resolvedFor(entry).find((r) => r.sid === st.id)
  const deck = await loadArmyStrats(gamePlayer.value, locale.value, !!game.value?.settings?.combatPatrol)
  const strat = deckStratFor(rec, deck)
  if (!strat) {
    t.setUnitStratagem(gamePi.value, entry.uid, st.id, stampOf(gameClock.value), true, gameMi.value, actOf(entry, st))
    return
  }
  const target = { uid: entry.uid, mi: gameMi.value, name: defOf(entry.id)?.name || entry.id, sid: st.id }
  // Not asking (`askStratagems` off): the printed cost on this unit at one tap; refused → the dialog.
  if (!keeps('askStratagems') && t.playStratagem(gamePi.value, strat, strat._cost, target)) return
  playingOnCard.value = { strat, target }
}

// A once-per-battle rule used on this unit, or the use taken back. One blocked because another unit
// spent it for the army never gets here (the chip is disabled).
function toggleUnitUse(sw) {
  if (!viewingEntry.value || sw.blocked) return
  const entry = viewingEntry.value
  tracker.value?.setUnitUse(gamePi.value, entry.uid, sw.id, stampOf(gameClock.value), !sw.on, gameMi.value, attachedUids(entry, roster.value?.units), actOf(entry, sw))
}

function toggleViewingAura(sw) {
  if (!viewingEntry.value) return
  tracker.value?.setUnitAura(gamePi.value, viewingEntry.value.uid, sw.id, stampOf(gameClock.value), !sw.on, gameMi.value, actOf(viewingEntry.value, sw))
}

function toggleViewingPick(sw) {
  if (viewingEntry.value) toggleUnitChip(viewingEntry.value, sw)
}

function toggleUnitCond(sw) {
  if (sw.auto || !viewingEntry.value) return
  if (sw.scope === 'army') {
    tracker.value?.setArmyCondition(gamePi.value, sw.id, stampOf(gameClock.value), !sw.on, gameMi.value)
    return
  }
  // Same handler as the row in the list, so the card and the row can never differ on what a switch does.
  toggleUnitCondFor(viewingEntry.value, sw)
}

// One pass per entry, not one per plate: the modifier layer's resolve-and-apply is real work and
// the row reads its output six times.
const statModCache = computed(() => {
  const m = new Map()
  for (const e of roster.value?.units || []) {
    const sheet = fullSheets.value.get(e.id)
    if (sheet) m.set(e.uid, statModsFor(e, sheet))
  }
  return m
})

// The detachments this army is actually playing, as ids — the gate for a detachment rule's aura
// (rosterStatMods' aurasReaching), which unlike every other aura is not vouched for by an entry
// sitting in the list.
const fieldedDetIds = computed(() => new Set(curDetachments.value.map((d) => d.id)))

const nameFit = computed(() => rosterNameFit(roster.value?.name))

// The same verdict the editor's footer badge shows, on the screen people actually read.
const issuesOpen = ref(false)
const issues = computed(() => validation.value.issues)
const errorCount = computed(() => validation.value.errorCount)
const warnCount = computed(() => issues.value.length - errorCount.value)

// ── The "…" sheet: export / print / copy ────────────────────────────────────────────────────
// Only off the table (`!inGame`): in a game this screen reads the game's own snapshot, and none
// of the three is a thing to do with a list that is currently being played.
const menuOpen = ref(false)
const exportOpen = ref(false)
const copiedList = ref(false)
// A list with a faction has nothing to say about itself until its faction bundle is in.
const ready = computed(() => !roster.value?.faction || !!factionData.value)

function openExport() {
  menuOpen.value = false
  exportOpen.value = true
}
// Into the archive and back — a real edit, so it goes to the cloud like a Save, and the cached
// issue count on the list's card is recounted under the new rule.
function toggleArchived() {
  menuOpen.value = false
  if (!setArchived(roster.value.id, !roster.value.archived)) return
  saveToCloud(roster.value.id)
  refreshSummaries(rosters.value)
}
function goPrint() {
  menuOpen.value = false
  router.push(`/roster/${roster.value.id}/print`)
}
// Into the tracker's setup with this list in place (playRoster.js).
function playThisList() {
  menuOpen.value = false
  playRoster(roster.value, router)
}
// The whole list as text, in the GW app's dialect — the one a player pastes into a chat or a
// TO's form. The sheet stays open long enough to say it worked and then closes itself: a
// clipboard write is invisible, and closing on the tap would leave nothing to see.
async function copyWholeList() {
  const text = buildRosterText(
    roster.value,
    { faction: factionData.value, core: rosterCore, items: rosterItems.items, version: { app: APP_VERSION, data: APP_DATA_VERSION } },
    'gw',
  )
  try {
    await navigator.clipboard.writeText(text)
    copiedList.value = true
    setTimeout(() => { copiedList.value = false; menuOpen.value = false }, 1000)
  } catch {
    // Clipboard blocked (an insecure origin, a denied permission) — the export dialog holds the
    // same text in a selectable textarea, so send them there rather than failing silently.
    openExport()
  }
}

// The datasheet behind an allied unit belongs to its own faction, and the namespaced id says so.
const viewingSrc = computed(() => allySourceOf(viewingDef.value?.id))

function summaryLine(e) {
  return entrySummary(e, defOf(e.id), (n) => modelsLabel(n, locale.value), (n) => countLabel(n, labels.value.rosterUpgradesLabel), labels.value.rosterWarlord)
}

// What a whole attached unit costs. Which SLOT the character fills is `attachRole` from
// useRosterDerived — the two halves already share every state this screen writes (see
// attachedEntries), and since 2026-08-27 a place on the list too (rosterEngine's joinAttached).
const blockNo = computed(() => blockNumbers(groupedUnits.value))
// Whether this tile is a block's host — the accent edge starts on IT, so the stripe runs the whole
// attached unit rather than beginning under its first row (.rvunit-host in this file).
const hasAttached = (entries, host) => !host.leaderOf && (entries || []).some((e) => e.leaderOf === host.uid)

// ── Rules + Stratagems tabs: army rule / each selected detachment's rule / its stratagems.
// The faction bundle is heavy and is never imported statically (rosterFactionRules.js holds the
// load, the Chapter fallback and the RU names; the print sheet reads the same one). It is fetched
// once the Units tab has painted — in idle time, not on the first tap of Rules or Stratagems, so
// those tabs arrive with their content instead of sliding in empty (2026-09-28). Both tabs share
// it: a detachment object carries its `.stratagems` alongside its `.rule`, the same shape
// FactionRuleView.vue reads.
const rulesWanted = ref(false)
onMounted(() => {
  if (ownPage()) {
    maybeStartTour('roster-view', {
      get issues() { return issues.value.length > 0 },
      get possible() { return possibleGroups.value.length > 0 },
      // On the rosters' desk the points stand on the list's card, here only over the limit.
      get points() { return showPoints.value },
    })
  }
})
onMounted(() => {
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 250))
  idle(() => { rulesWanted.value = true })
})
const { rulesFaction, detachmentLookup } = useRosterFactionRules(() => roster.value?.faction, locale, {
  when: () => rulesWanted.value || tab.value === 'rules' || tab.value === 'stratagems',
})

// The list, for the Rules tab's enhancements to say who wears each (EnhancementList).
const rulesList = computed(() => ({ units: roster.value?.units || [], defOf, detachments: curDetachments.value, factionSlug: roster.value?.faction }))
const selectedDetachmentRules = computed(() =>
  (roster.value?.detachments || [])
    .map((name) => detachmentLookup.value.get(normName(name)))
    .filter(Boolean))

// ── Stratagems tab (RosterStratagemsTab): what it needs from the game.
// The slot the game is standing on, but only when there IS one to stand on: a live game that
// tracks phases. A finished game out of history keeps the clock it ended with — "what can I use
// now" is not a question that record can answer.
const nowSlot = computed(() => {
  const g = game.value
  if (!g || historyId.value || !tracks(g.settings, 'trackPhases')) return null
  return {
    phase: g.currentPhase || 'command',
    // The turn is a player index (useTracker), so "mine" is whether it is this roster's owner's.
    mine: (g.currentTurn === 1 ? 1 : 0) === gamePi.value,
  }
})
</script>

<style scoped>
/* The strip is a boxed, titled set now, not a loose row of chips, so it needs a little air under
   it on a phone too — hugging the tab row was what made the chips read as part of the tabs. */
.rv-conds { margin: 0.6rem 0 0.75rem; }

/* "Possible modifiers" — the out-of-game stand-in for the switch strip above. Quieter than a
   phase accordion: it is reference, and the list itself is what the page is for. */
.rv-possible { margin: 0.6rem 0 0.2rem; }
.rvp-head {
  display: flex; align-items: center; gap: 0.5rem;
  width: 100%; padding: 0.4rem 0.6rem;
  border: 1px dashed var(--border);
  background: none; color: var(--text-muted); cursor: pointer;
  font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
  transition: border-color var(--motion-fast), color var(--motion-fast);
}
.rvp-head:hover { border-color: var(--accent); color: var(--accent-ink); }
.rvp-chev { flex-shrink: 0; font-size: 0.7rem; }
.rvp-title { flex: 1; text-align: left; }
.rvp-count { flex-shrink: 0; font-family: var(--font-mono); }
.rvp-list { list-style: none; margin: 0.4rem 0 0; padding: 0 0.2rem; font-size: 0.76rem; }
.rvp-src {
  margin-top: 0.5rem; color: var(--text-muted);
  font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
}
.rvp-src:first-child { margin-top: 0; }
.rvp-mod { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.35rem; color: var(--text-muted); }
.rvp-delta { font-weight: 600; color: var(--text-primary); font-variant-numeric: tabular-nums; }
.rvp-name { color: var(--text-primary); }
.rvp-cond { flex-basis: 100%; font-style: italic; }

.roster-view { padding-top: 0.75rem; padding-bottom: 2rem; }

/* The name block takes what the two buttons leave; the buttons keep the top-right corner. Inside
   the block the name and the points wrap as one row: the points' line breaks before the name's
   text does (each item asks for its whole width first), and space-between parks them at the
   right end while they share the line and at the left, right under the name, once they don't. */
.rv-head {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0 0 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid var(--accent);
}
.rv-title {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.15rem 0.75rem;
  /* the buttons are taller than a line of the name: centre the first line against them */
  padding-top: 0.2rem;
}
.rv-pts { display: flex; flex-wrap: wrap; align-items: center; gap: 0.35rem 0.75rem; }
/* Own limits: the name block dissolves into a grid, so the points and the limits' line run
   under the buttons too, across the whole header (owner, 2026-10-03). */
.rv-head.own {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  row-gap: 0.3rem;
}
.rv-head.own .rv-title { display: contents; }
.rv-head.own .rv-name { grid-column: 1; grid-row: 1; padding-top: 0.2rem; }
.rv-head.own .rv-meta { grid-column: 2; grid-row: 1; }
.rv-head.own .rv-pts { grid-column: 1 / -1; grid-row: 2; }
.rv-pts.own .rv-points { font-size: 0.9rem; }
.rv-name {
  min-width: 0;
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  overflow-wrap: anywhere;
}
/* Full size on a desktop, smaller as the viewport narrows — a phone is where a long name turns
   into a wall, a wide screen fits it in a line or two. Lines set close: a wrapped name reads as
   one heading, not as a paragraph (owner, 2026-10-03). */
.rv-name { line-height: 1.1; }
.rv-name.long { font-size: clamp(1.35rem, 5.2vw, 1.7rem); }
.rv-name.xlong { font-size: clamp(1.15rem, 4.4vw, 1.7rem); line-height: 1.15; }
.rv-meta { display: flex; align-items: center; justify-content: flex-end; gap: 0.5rem; flex: 0 0 auto; }
.rv-meta:empty { display: none; }
.rv-points { font-family: var(--font-mono); font-weight: 700; font-size: 1.1rem; white-space: nowrap; }
.rp-used { color: var(--text-primary); }
.rv-points.over .rp-used { color: var(--danger); }
.rp-sep, .rp-cap { color: var(--text-dim); }
/* A phone spends the width on the name: the meta is what stands between it and the corner. */
@media (max-width: 480px) {
  .rv-head { gap: 0.5rem; }
  .rv-meta { gap: 0.35rem; }
  .rv-points { font-size: 1rem; }
  .hdr-icon { width: 2.1rem; height: 2.1rem; font-size: 0.9rem; }
}


/* The same folder tabs the faction pages wear (PageTabs) — three halves of one list, not three
   filters above it. They pick up this list's faction accent through --accent. */
/* The list's own notes: a one-row fold above the tabs, so a list with a plan costs the same
   first screen as one without until the reader opens it. */
.rv-notes { margin-bottom: 0.6rem; }
.rvn-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  padding: 0.35rem 0;
  background: none;
  border: none;
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;
}
.rvn-head:hover { color: var(--accent-ink); }
.rvn-chev { font-size: 0.75rem; }
.rvn-text {
  margin: 0 0 0.3rem;
  padding-left: 1.1rem;
  color: var(--text-primary);
  font-size: 0.85rem;
  line-height: 1.45;
  white-space: pre-wrap;
}

.rv-tabs { margin-bottom: 1rem; }

/* Desktop has the room to separate the tabs from the army-wide strip above them, so the tab row
   reads as the start of the list rather than as one more bar stacked on the others. A phone does
   not: there the same gap is just scrolling before the content. */
@media (min-width: 700px) {
  .rv-tabs { margin-top: 1rem; }
}

/* The bar centres itself and reserves a line of its own; here it is the right half of a row.
   `margin-left: auto` rather than space-between so it still hugs the right edge on the narrow
   screens where it wraps to a line of its own. */
.rv-top {
  display: flex;
  margin-bottom: 0.6rem;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
@media (max-width: 900px) {
  .rv-back-list { display: none; }
  /* Its only content dropped, the row must not keep its gap above the name. */
  .rv-top:has(> .rv-back-list:only-child) { display: none; }
}

.rv-issues {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  margin: 0 0 0.8rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid color-mix(in srgb, var(--warning) 45%, transparent);
  background: color-mix(in srgb, var(--warning) 10%, transparent);
  color: var(--warning);
  font-size: 0.82rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}
.rv-issues.err {
  border-color: color-mix(in srgb, var(--danger) 50%, transparent);
  background: color-mix(in srgb, var(--danger) 12%, transparent);
  color: #e05c4b;
}
.rvi-txt { flex: 1; min-width: 0; }
.rv-checks-off { display: flex; align-items: center; gap: 0.4rem; margin: 0 0 0.8rem; font-size: 0.8rem; color: var(--text-muted); }
.rvi-more { color: var(--text-muted); font-weight: 500; }
.rvi-go { flex: none; opacity: 0.7; }

.rvunit {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  margin-bottom: 0.5rem;
}
.rvunit:hover { border-color: var(--accent); }
/* The unit whose card stands in the desk's unit column. */
.rvunit.rvunit-on { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, var(--bg-card)); }
.rvunit-main {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.5rem 0.6rem 0.75rem;
  background: none;
  border: 0;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
}
/* Indented to the name above and separated by a hairline: the switches belong to the row but are
   not part of what the row SAYS about the unit. */
.rvunit-conds {
  display: flex; align-items: flex-start; gap: 0.4rem;
  padding: 0.45rem 0.75rem 0.55rem;
  border-top: 1px dashed var(--border);
}
.rvunit-conds > .cond-chips { flex: 1; min-width: 0; }
/* One height for everything on this line — the chips, their "i", the fold, the status button
   (owner, 2026-10-08: 27, 23 and 32px side by side). The status button's 2rem sets it: its drawing
   needs the room. A chip that wraps to two lines still grows. */
.rvunit-conds :deep(.cond-chip), .rvunit-conds :deep(.cond-info), .rvunit-conds .rvunit-more { min-height: 2rem; }
/* A destroyed unit is one line: its name, quieter, and the status button at the line's
   end — the switches row lifted onto it rather than a second line holding one button. */
.rvunit-fallen { position: relative; }
.rvunit-fallen .rvunit-main { padding-block: 0.35rem; padding-right: 3.4rem; }
.rvunit-fallen .rvunit-name { color: var(--text-dim); }
.rvunit-fallen .rvunit-pts { display: none; }
.rvunit-fallen .rvunit-conds { position: absolute; top: 50%; right: 0.5rem; padding: 0; border: 0; transform: translateY(-50%); }
/* The handle for everything that did not fit on the row: quiet, and it says how much is behind it
   so the row stays honest about what it is hiding. */
.rvunit-more {
  display: inline-flex; align-items: center; gap: 0.25rem;
  flex-shrink: 0; padding: 0.3rem 0.5rem;
  border: 1px solid var(--border);
  background: none; color: var(--text-muted); cursor: pointer;
  font-size: 0.7rem; line-height: 1;
  transition: border-color var(--motion-fast), color var(--motion-fast);
}
.rvunit-more:hover { border-color: var(--accent); color: var(--accent-ink); }
.rvunit-more-n { font-family: var(--font-mono); font-weight: 700; }
/* The folded-out strip continues the one above it, so it carries no rule of its own. */
.rvunit-rest { border-top: 0; padding-top: 0; }
.rvunit-text { display: flex; flex-direction: column; flex: 1; min-width: 0; gap: 0.1rem; }
.rvunit-name { font-weight: 600; color: var(--text-primary); font-size: 0.92rem; }
/* The slot an attached character fills, after its name. */
.rvunit-role { margin-left: 0.35rem; font-weight: 400; font-size: 0.74rem; color: var(--accent-ink); }
/* The attached block: the tiles touch, and the army's colour runs down the left of all of them —
   the host's tile included, so the edge starts where the block does. Drawn HERE rather than from
   the shared primitive in style.css, which cannot win against this view's own scoped `border` on
   .rvunit (see the note there). */
.rvunit:has(+ .rvunit-attached) { margin-bottom: 0; }
/* The crew row hangs off the unit above it, slimmer and without the stats it has no list entry for. */
.rvunit:has(+ .rvunit-crew) { margin-bottom: 0; }
.rvunit.rvunit-crew {
  background: var(--bg-card); border: 1px solid var(--border); border-left: 2px solid var(--accent);
  padding-top: 0.35rem; padding-bottom: 0.35rem;
  /* Its own top edge, laid over the unit's bottom one: hovered, the row lights all four sides. */
  position: relative; margin-top: -1px;
}
@media (hover: hover) {
  .rvunit.rvunit-crew:hover { border-color: var(--accent); z-index: 1; }
  /* …and the unit, hovered, lays its bottom edge back over the crew's top one. */
  .rvunit:has(+ .rvunit-crew):hover { position: relative; z-index: 1; }
}
.rvunit-crew-mark { flex: none; color: var(--text-dim); font-size: 0.8rem; }
.rvunit-crew-note { font-size: 0.75rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rvunit.rvunit-attached,
.rvunit.rvunit-host { border-left: 2px solid var(--accent); }
/* The block's head: the editor list's `.rul-bhead`, in this view's own card chrome — tinted with
   the accent, joined to the host's tile under it, the same coloured edge running down. */
.rvblock-head {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  background: color-mix(in srgb, var(--accent) 20%, var(--bg-secondary));
  border: 1px solid var(--border);
  border-left: 2px solid var(--accent);
  border-bottom: none;
}
.rvblock-name { flex: 1; min-width: 0; font-weight: 600; font-size: 0.85rem; color: var(--text-primary); }
.rvblock-total { flex: none; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--text-primary); }
/* The mini stat plates are RosterStatPlates.vue (shared with the tracker's help). */
.rvunit-sub { font-size: 0.74rem; color: var(--text-dim); }
.rvunit-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); }

/* ── On the rosters desk (RosterDeskView) ──
   The page is a column of the desk and scrolls inside it; the way back is not drawn, the list of
   lists stands beside it. From 1200px a second column holds the card of the unit last opened. */
.rv-in-game { padding: 0; }
/* In the game every line of height is the game's: the name and the points on one small line. */
/* The line under it is the quiet border, not the accent — the accent was too bright here (owner,
   2026-10-02). */
.rv-in-game .rv-head { margin: 0 0 0.5rem; padding-bottom: 0.3rem; border-bottom: 1px solid var(--border); }
.rv-in-game .rv-name, .rv-in-game .rv-name.long, .rv-in-game .rv-name.xlong { font-size: 1.2rem; line-height: 1.2; }
.rv-in-game .rv-points { font-size: 0.9rem; }
/* …and the unit cards tighter by their padding and gaps alone — every name, plate and switch keeps
   its size (owner, 2026-09-30). */
.rv-in-game .rvunit { margin-bottom: 0.35rem; }
/* …but the tiles of an attached block still touch: the rule above outranked the block's own. */
.rv-in-game .rvunit:has(+ .rvunit-attached) { margin-bottom: 0; }
.rv-in-game .rvunit-main { padding-block: 0.35rem; }
.rv-in-game .rvunit-conds { padding-block: 0.3rem; }
/* …and the group headings carry no line under them: one under the list's name is enough (owner,
   2026-10-02). */
.rv-in-game .roster-group-head { margin: 0.45rem 0 0.3rem; padding-bottom: 0; border-bottom: 0; }
.rvunit-head { display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 0.5rem; }
.rv-in-game .rvunit-head .rvunit-sub { margin-left: auto; text-align: right; }
/* The name's line runs the card's full width, to its right edge; the points sit on the plates'
   line instead of a column down the whole card, which ended the name's line short. */
.rv-in-game .rvunit-main { display: grid; grid-template-columns: minmax(0, 1fr) auto; column-gap: 0.6rem; row-gap: 0.1rem; }
.rv-in-game .rvunit-text { display: contents; }
.rv-in-game .rvunit-head { grid-column: 1 / -1; }
.rv-in-game .rvunit-stats { grid-area: 2 / 1; }
.rv-in-game .rvunit-pts { grid-area: 2 / 2; align-self: center; justify-self: end; }
@media (max-width: 360px) { .rv-in-game .rvunit-main { column-gap: 0.4rem; } }
.rv-in-desk { height: 100%; padding: 0; }
.rv-in-desk .rv-top { display: none; }
.rv-in-desk .rv-main {
  height: 100%;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.75rem 0.5rem 2rem 0;
}
.rv-split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 1rem;
}
.rv-unit {
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.75rem 0.5rem 2rem 1rem;
  border-left: 1px solid var(--border);
}
.rv-unit-empty {
  margin: 4rem 0 0;
  text-align: center;
  color: var(--text-dim);
}
</style>
