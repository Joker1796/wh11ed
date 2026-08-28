<template>
  <div v-if="roster" class="roster-view themed" :style="accentStyle">
    <!-- The way back on the left, and — opposite it — the answer to the Save that landed here.
         The status used to sit mid-page under the issues bar, which put a transient line in the
         middle of the reading column; up here it is out of the way and still in view. -->
    <div class="rv-top">
      <RouterLink :to="backTo" class="back">
        <i class="bi bi-chevron-left"></i> {{ inGame ? labels.trackerRosterBack : labels.rosterBackToList }}
      </RouterLink>
      <!-- Not inside a game — there this page is a read of a snapshot, with nothing to save. -->
      <RosterCloudBar v-if="!inGame" class="rv-cloud" />
    </div>

    <!-- On a phone the name takes the row to itself and the points + pencil sit under it, rather
         than being squeezed against a block of display type. Not conditional on the name: at this
         width even a short one wraps ("PORTRAIT OF A MACHINE" is 21 characters and two lines), and
         a header that rearranges itself per list is worse than one that always looks the same. -->
    <header class="rv-head">
      <h1 class="rv-name" :class="nameFit">{{ roster.name || labels.rosterUntitled }}</h1>
      <div class="rv-meta">
        <div v-if="roster.faction" class="rv-points" :class="{ over: points > limit }">
          <span class="rp-used">{{ points }}</span>
          <span class="rp-sep">/</span>
          <span class="rp-cap">{{ limit }}</span>
        </div>
        <RouterLink v-if="!inGame" :to="`/roster/${roster.id}`" class="hdr-icon" :aria-label="labels.rosterEdit">
          <i class="bi bi-pencil"></i>
        </RouterLink>
        <!-- The list as a document. Beside the pencil rather than in a menu: printing is what
             somebody does with a list they have finished, which is exactly where they are
             standing when they look at this screen. -->
        <RouterLink v-if="!inGame" :to="`/roster/${roster.id}/print`" class="hdr-icon" :aria-label="labels.printAction" :title="labels.printAction">
          <i class="bi bi-printer"></i>
        </RouterLink>
      </div>
    </header>

    <!-- What the list breaks, said HERE. The editor has always had this behind its footer badge,
         but a list is read far more often than it is edited, and "why is this illegal" was two
         screens away — the list page shows a warning count and this page said nothing at all. -->
    <button v-if="issues.length" type="button" class="rv-issues" :class="{ err: errorCount }" @click="issuesOpen = true">
      <i class="bi" :class="errorCount ? 'bi-x-octagon-fill' : 'bi-exclamation-triangle-fill'"></i>
      <span class="rvi-txt">
        {{ (errorCount ? labels.rosterViewIssues : labels.rosterViewWarns).replace('{n}', String(errorCount || issues.length)) }}
      </span>
      <span v-if="errorCount && warnCount" class="rvi-more">{{ labels.rosterViewWarns.replace('{n}', String(warnCount)) }}</span>
      <i class="bi bi-chevron-right rvi-go"></i>
    </button>

    <!-- How this list has done on the table. Saved lists only: in a game the answer is the game.
         The full record — matchups, missions, cards — is behind the link. -->
    <RouterLink v-if="record" to="/tracker/stats" class="rv-record">
      <i class="bi bi-trophy"></i>
      <span class="rvr-rec">{{ record }}</span>
      <span class="rvr-lab">{{ labels.statsTitle }}</span>
      <i class="bi bi-chevron-right rvr-go"></i>
    </RouterLink>

    <p v-if="!roster.faction" class="rv-hint">{{ labels.rosterViewNoFaction }}</p>
    <template v-else>
      <!-- What is true in the battle right now. Only the states this list's own rules actually
           name, and only ones the app can honestly answer — see conditions.js. A switch the
           tracker already knows the answer to (a called Waaagh!) shows as a fact, not a control. -->
      <ConditionChips class="rv-conds" :switches="armySwitches" @toggle="toggleArmyCond" @info="openChipInfo" />

      <!-- Off the table there is nothing to switch, so this is what stands in that place instead:
           everything the army rule, the detachment(s) and the core rules WOULD do to this list once
           the battle proves their condition. What one unit's own ability or wargear would do is on
           that unit's card — repeating it here would be the whole modifier layer printed twice.
           Closed by default: it is preparation, not the list. -->
      <section v-if="possibleGroups.length" class="rv-possible">
        <button
          type="button"
          class="rvp-head"
          :aria-expanded="possibleOpen"
          @click="possibleOpen = !possibleOpen"
        >
          <i class="bi rvp-chev" :class="possibleOpen ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
          <span class="rvp-title">{{ labels.dsModifiersPossible }}</span>
          <span class="rvp-count">{{ possibleCount }}</span>
        </button>
        <CollapseTransition :show="possibleOpen">
          <ul class="rvp-list">
            <template v-for="g in possibleGroups" :key="g.key">
              <li class="rvp-src">{{ g.label }}</li>
              <li v-for="(n, i) in g.notes" :key="i" class="rvp-mod">
                <span class="rvp-delta">{{ modDelta(n) }}</span>
                <span class="rvp-name">{{ n.source }}</span>
                <span v-if="n.when" class="rvp-cond">{{ n.when[locale] || n.when.en }}</span>
              </li>
            </template>
          </ul>
        </CollapseTransition>
      </section>

      <PageTabs class="rv-tabs" :tabs="viewTabs" @select="tab = $event" />

      <!-- Compact read-only unit list, grouped like the editor. Clicking a row opens the full
           rules card in RosterUnitRulesModal — not an inline accordion, that read badly nested
           and had overflow issues (see git history if this is ever revisited). -->
      <div v-if="tab === 'units'" class="rv-units">
        <p v-if="!roster.units.length" class="rv-hint">{{ labels.rosterUnitsEmptyView }}</p>

        <template v-for="g in groupedUnits" :key="g.id">
          <template v-if="g.entries.length">
            <h3 class="rvg-head" :class="{ locked: g.locked }">
              {{ g.ally ? g.ally.name : labels[GROUP_LABEL_KEYS[g.id]] }}
              <em v-if="g.ally" class="rvg-ally">{{ g.locked ? labels.rosterAllyLocked : labels.rosterAllySection }}</em>
            </h3>
            <!-- The row is a CONTAINER, not one big button: in a live game it carries this unit's
                 own state switches under the stats, and a button cannot hold buttons. Opening the
                 card stays a button of its own, covering everything but the switches. -->
            <template v-for="(e, idx) in g.entries" :key="e.uid">
            <div class="rvunit" :class="{ 'rvunit-attached roster-attached': e.leaderOf }">
              <button type="button" class="rvunit-main" @click="viewingUid = e.uid">
                <span class="rvunit-text">
                  <span class="rvunit-name">
                    {{ defOf(e.id)?.name || e.id }}
                    <!-- Attached characters sit under their bodyguard (rosterEngine's
                         joinAttached); the tag says which slot, which nesting alone can't. -->
                    <span v-if="attachRole(e)" class="rvunit-role">{{ attachRole(e) }}</span>
                  </span>
                  <span v-if="statCellsOf(e).length" class="rvunit-stats">
                    <span v-for="s in statCellsOf(e)" :key="s.label" class="rvst" :class="{ 'rvst-inv': s.inv, 'rvst-mod': s.mod }">
                      <span class="rvst-label">{{ s.label }}</span>
                      <span class="rvst-box">{{ s.value }}</span>
                    </span>
                  </span>
                  <span class="rvunit-sub">{{ summaryLine(e) }}</span>
                </span>
                <span class="rvunit-pts">{{ entryMeta.get(e.uid)?.points }}</span>
                <i class="bi bi-chevron-right rvunit-chev"></i>
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
              <div v-if="pinnedChipOf(e)" class="rvunit-conds">
                <ConditionChips :switches="[pinnedChipOf(e)]" @toggle="toggleUnitChip(e, $event)" @info="openChipInfo" />
                <button
                  v-if="restChipsOf(e).length"
                  type="button"
                  class="rvunit-more"
                  :aria-expanded="openChips.has(e.uid)"
                  :aria-label="labels.rosterMoreStates"
                  @click="toggleChips(e.uid)"
                >
                  <span class="rvunit-more-n">{{ restChipsOf(e).length }}</span>
                  <i class="bi" :class="openChips.has(e.uid) ? 'bi-chevron-up' : 'bi-chevron-down'"></i>
                </button>
              </div>
              <CollapseTransition v-if="restChipsOf(e).length" :show="openChips.has(e.uid)">
                <ConditionChips
                  class="rvunit-conds rvunit-rest"
                  :switches="restChipsOf(e)"
                  @toggle="toggleUnitChip(e, $event)"
                  @info="openChipInfo"
                />
              </CollapseTransition>
            </div>
            <!-- What the whole attached unit costs, under the last row of its block. The rows
                 keep their own numbers, so the column still reads down to the roster total. -->
            <p v-if="blockTotal(g.entries, idx) != null" class="roster-sum">
              {{ labels.rosterAttachedTotal }} · {{ blockTotal(g.entries, idx) }}{{ labels.rosterPointsLabel }}
            </p>
            </template>
          </template>
        </template>
      </div>

      <!-- Army rule + selected detachment(s) rule, lazily loaded (heavy faction rules bundle) -->
      <div v-else-if="tab === 'rules'" class="rv-rules">
        <template v-if="rulesFaction">
          <section class="rv-rule-block">
            <h3 class="rvg-head">{{ labels.factionArmyRule }}</h3>
            <RuleBlock
              :id="rulesFaction.armyRule.id"
              :title="rulesFaction.armyRule.name"
              :subtitle="rulesFaction.armyRule.nameRu"
              :body="rulesFaction.armyRule.body"
              :example="rulesFaction.armyRule.example"
            />
          </section>
          <section v-for="det in selectedDetachmentRules" :key="det.name" class="rv-rule-block">
            <h3 class="rvg-head">{{ det.name }}</h3>
            <RuleBlock :title="det.rule.name" :subtitle="det.rule.nameRu" :body="det.rule.body" />
          </section>
        </template>
      </div>

      <!-- Stratagems — same setup as the standalone StratagemsView.vue page (toolbar toggle +
           phase accordions / flat grid), just pre-filtered to this roster's own detachments
           instead of a core/you/opp filter (each card's sublabel already says which
           detachment it's from, same as that page's detachment cards). -->
      <div v-else class="rv-strats">
        <template v-if="rulesFaction">
          <p v-if="!selectedDetachmentRules.length" class="rv-hint">{{ labels.rosterViewNoDetachment }}</p>
          <template v-else>
            <div class="strat-toolbar">
              <!-- Only in a live game that keeps a clock: narrow the list to what this player can
                   actually use in the slot the game is standing on. -->
              <button
                v-if="nowSlot"
                type="button"
                class="strat-toggle now-toggle"
                :class="{ active: nowOnly }"
                :aria-pressed="nowOnly"
                @click="nowOnly = !nowOnly"
              >
                <i class="bi bi-hourglass-split"></i>
                <span class="strat-toggle-label">{{ labels.stratNowOnly }}</span>
              </button>
              <button
                type="button"
                class="strat-toggle"
                :class="{ active: byPhase }"
                :aria-pressed="byPhase"
                :aria-label="byPhase ? labels.stratGroupAsList : labels.stratGroupByPhase"
                @click="byPhase = !byPhase"
              >
                <i class="bi" :class="byPhase ? 'bi-list-ul' : 'bi-collection'"></i>
                <span class="strat-toggle-label">{{ byPhase ? labels.stratGroupAsList : labels.stratGroupByPhase }}</span>
              </button>
            </div>

            <p v-if="nowOnly && !visibleStratagems.length" class="rv-hint">{{ labels.stratNowEmpty }}</p>

            <template v-if="byPhase && !nowOnly">
              <div v-for="g in phaseGroups" :key="g.key" class="phase-group">
                <button
                  type="button"
                  class="phase-head"
                  :aria-expanded="openPhases.has(g.key)"
                  @click="togglePhase(g.key)"
                >
                  <i class="bi phase-chev" :class="openPhases.has(g.key) ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
                  <span class="phase-name">{{ phaseLabel(g.key, labels) }}</span>
                  <span class="phase-count">{{ g.strats.length }}</span>
                </button>
                <CollapseTransition :show="openPhases.has(g.key)">
                  <div class="strat-grid phase-grid">
                    <StratCard v-for="s in g.strats" :key="stratKey(s)" :strat="s" :sublabel="s.sublabel" />
                  </div>
                </CollapseTransition>
              </div>
            </template>

            <div v-else-if="visibleStratagems.length" class="strat-grid">
              <StratCard v-for="s in visibleStratagems" :key="stratKey(s)" :strat="s" :sublabel="s.sublabel" />
            </div>
          </template>
        </template>
      </div>
    </template>

    <RosterIssuesModal
      v-if="issuesOpen"
      :issues="validation.issues"
      @goto="(uid) => { issuesOpen = false; tab = 'units'; viewingUid = uid }"
      @close="issuesOpen = false"
    />

    <RosterUnitRulesModal
      v-if="viewingUid && viewingDef"
      :unit-id="viewingSrc?.[1] || viewingDef.id"
      :faction-slug="viewingSrc?.[0] || roster.faction"
      :ctx="{
        def: viewingDef,
        entry: viewingEntry,
        items: rosterItems.items,
        detachments: curDetachments,
        leaderTargets: viewingLeaderTargets,
        units: roster.units,
      }"
      :game-ctx="viewingGameCtx"
      @toggle-aura="toggleViewingAura"
      @toggle-pick="toggleViewingPick"
      @toggle-cond="toggleUnitCond"
      @toggle-strat="toggleUnitStrat"
      @close="viewingUid = null"
    />
  </div>
</template>

<script setup>
import { computed, ref, shallowRef, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RuleBlock from '../../components/RuleBlock.vue'
import StratCard from '../../components/StratCard.vue'
import CollapseTransition from '../../components/CollapseTransition.vue'
import RosterUnitRulesModal from '../../components/roster/RosterUnitRulesModal.vue'
import RosterCloudBar from '../../components/roster/RosterCloudBar.vue'
import RosterIssuesModal from '../../components/roster/RosterIssuesModal.vue'
import ConditionChips from '../../components/ConditionChips.vue'
import PageTabs from '../../components/PageTabs.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useKeywordPopover } from '../../composables/useKeywordPopover.js'
import { useRosters } from '../../composables/useRosters.js'
import rosterCore from '../../data/roster/core.js'
import { validateRoster } from '../../composables/rosterValidation.js'
import { loadRosterFaction, rosterItems } from '../../data/roster/index.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { factionGroups } from '../../data/factionsIndex.js'
import { GROUP_LABEL_KEYS, allySourceOf, sectionsOf, attachedBlockTotal, unitPoints, rosterPoints, entrySummary, effectiveBattle, leaderTargetsFor, leadsFor, mandatoryEnhancementFor, usesAllies } from '../../composables/rosterEngine.js'
import { applyStatMods, grantedKeywordsFrom, resolveModifierEntries, datasheetEntriesFor, aurasReaching, gateStratagems, attachedUnitKeywords } from '../../composables/rosterStatMods.js'
import { loadoutItemNames } from '../../composables/rosterModifiers.js'
import { groupModNotes, modDelta, possibleModNotes } from '../../composables/rosterModNotes.js'
import { coreModifiers } from '../../data/rosterModifiers/coreRules.js'
import { conditions } from '../../data/rosterModifiers/conditions.js'
import { tracks } from '../../data/trackerOptions.js'
import { activeConditions, rosterConditions, switchesFor, stratagemsFor, stratagemsClearedBy, activeStratagems, activeAuras, auraSwitchesFor, allPicks, pickSwitchesFor, clockOf, stampOf } from '../../composables/rosterGameContext.js'
import { phaseLabel, usableInSlot, PHASE_ORDER } from '../../composables/stratagemPhases.js'
import { loadRosterFactionRules, normName } from '../../composables/rosterFactionRules.js'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { loadHistory, rosterRecords } from '../../composables/gameStats.js'
import { rosterNameFit } from '../../utils/rosterNameFit.js'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()
// The same popover a core ability or a modifier note opens — a chip's "i" is one more way in.
const { openRule } = useKeywordPopover()
const labels = computed(() => ui[locale.value])
const { rosterById } = useRosters()

// Two ways in: /roster/:id/view reads the saved roster, /tracker/game/roster/:pi reads the
// SNAPSHOT the current game carries for that player (rosterGameLink.js). Same screen either way —
// the in-game one is where the live-rules layer will hang, so it must not become a second copy.
//
// useTracker is imported dynamically on purpose: it statically pulls the mission/event datasets,
// and the ordinary roster route must not carry them.
const gamePi = computed(() => (route.params.pi != null ? Number(route.params.pi) : null))
const inGame = computed(() => gamePi.value != null)
// A finished game reached from the history list (/tracker/history/:gid/roster/:pi) shows the same
// screen as a live one, but as a RECORD: the rule switches are what they were when it ended, and
// there is nothing left to flip.
const historyId = computed(() => route.params.gid || null)
const backTo = computed(() => {
  if (historyId.value) return `/tracker/history/${historyId.value}`
  return inGame.value ? '/tracker/game' : '/roster'
})
const gameRoster = ref(undefined) // undefined = not resolved yet, null = no such attachment
// shallowRef, not ref: the store hands back an object of REFS, and a deep ref would unwrap them
// into plain values here — `tracker.value.current.value` would silently be undefined.
const tracker = shallowRef(null)

// The game this route is about — the one in progress, or one out of history.
const game = computed(() => {
  if (!tracker.value || !inGame.value) return null
  return historyId.value
    ? tracker.value.history.value.find((g) => g.id === historyId.value) || null
    : tracker.value.current.value
})
// The roster is frozen in the snapshot, but what is TRUE about the battle is not, and that is
// what decides whether a conditional modifier applies.
const gamePlayer = computed(() => game.value?.players?.[gamePi.value] || null)
// What the game is standing on, from THIS player's side: round, whose turn, which phase. One
// object rather than a bare round, because a switch that lasts a phase has to be able to say so.
const gameClock = computed(() => clockOf(game.value, gamePi.value))
// A record is not editable; only a game in progress offers the switches.
const canSwitch = computed(() => inGame.value && !historyId.value)

// What this game asked the modifier layer to keep (src/data/trackerOptions.js). OFF THE TABLE
// everything is on: there is no game to have settings, and a list read in the builder gets the
// whole layer. `tracks` answers for a game saved before an option existed, and it is what knows
// that the five families hang off the master — this file never spells that tree out.
const keeps = (setting) => !inGame.value || tracks(game.value?.settings, setting)
const modsOn = computed(() => keeps('trackModifiers'))

watch([gamePi, historyId], async ([pi]) => {
  if (pi == null) { gameRoster.value = undefined; tracker.value = null; return }
  const [{ useTracker }, { rosterFromPlayer }] = await Promise.all([
    import('../../composables/useTracker.js'),
    import('../../composables/rosterGameLink.js'),
  ])
  tracker.value = useTracker()
  gameRoster.value = rosterFromPlayer(gamePlayer.value)
}, { immediate: true })

// This list's own record, read once from storage (gameStats.js) — the read-only side of the game
// history, so this route keeps working without the tracker store it dynamic-imports above. Off the
// table only: inside a game the score on screen is the record that matters.
const record = computed(() => {
  if (inGame.value || !roster.value?.id) return null
  const rec = rosterRecords(loadHistory()).get(roster.value.id)
  return rec ? `${rec.w}–${rec.l}–${rec.d}` : null
})

// What is true for one entry: the game answers when there is one, and off the table the LIST still
// answers for itself (an enhancement gated on "while the bearer is leading a unit" is proven by the
// roster) — the same call RosterUnitRulesModal makes, so a row and the card behind it agree.
const activeFor = (entry) => (inGame.value
  ? activeConditions(gamePlayer.value, gameClock.value, entry, {
      army: keeps('trackArmyStates'),
      unit: keeps('trackUnitStates'),
    })
  : rosterConditions(entry))

const roster = computed(() => (inGame.value ? gameRoster.value || null : rosterById(route.params.id)))
// Leave only once we KNOW there is nothing to show — while the game's snapshot is still resolving
// `roster` is legitimately null, and redirecting then would bounce straight back out of the view.
watch([roster, gameRoster], () => {
  if (inGame.value && gameRoster.value === undefined) return
  if (!roster.value) router.replace(backTo.value)
}, { immediate: true })

const tab = ref('units')
// PageTabs only draws; which one is open is this page's own state.
const viewTabs = computed(() => {
  const l = labels.value
  return [
    { key: 'units', label: l.rosterViewTabUnits, active: tab.value === 'units' },
    { key: 'rules', label: l.rosterViewTabRules, active: tab.value === 'rules' },
    { key: 'stratagems', label: l.rosterViewTabStratagems, active: tab.value === 'stratagems' },
  ]
})

// ── Faction accent (mirrors the editor) ──
const allFactions = factionGroups.flatMap((g) => g.factions)
const factionColor = computed(() => allFactions.find((f) => f.slug === roster.value?.faction)?.color)
const accentStyle = computed(() => factionColor.value
  ? { '--fa-light': factionColor.value.light, '--fa-dark': factionColor.value.dark }
  : {})

// ── Compact roster data (unit names/sizes/points), same lazy source the editor uses ──
const factionData = ref(null)
watch(() => roster.value?.faction, async (slug) => {
  factionData.value = slug ? await loadRosterFaction(slug, { allies: usesAllies(roster.value) }) : null
}, { immediate: true })

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
watch([() => roster.value?.faction, allySlugs], async ([slug, srcs]) => {
  if (!slug) { fullSheets.value = new Map(); return }
  const lists = await Promise.all([loadDatasheets(slug), ...srcs.map((s) => loadDatasheets(s))])
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
    const loaded = await Promise.all(slugs.map((s) => loadDatasheetsRu(s)))
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
      return {
        ...sw,
        groupOwner: src.owner ? `${src.owner} · ${src.name}` : src.name,
        // On the heading, not on each chip: these six ARE one rule, unlike an ability set whose
        // options each have their own (see ConditionChips' groups()).
        groupInfo: src.text ? { name: src.name, text: src.text } : null,
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
function openChipInfo(sw, rect) {
  if (sw.info) openRule(sw.info.name, sw.info.text, rect, sw.info.sub)
}

// ── Unit rules modal ──
// `?unit=<uid>` opens that unit's card straight away — how the tracker's phase reminder gets a
// reader from "Brides of Death (Pain), Lelith Hesperax" to the card that says what it does. The
// query is read once, on arrival; closing the card leaves it in the URL, which is harmless (it
// only ever seeds the initial value) and keeps a reload on the same card.
const viewingUid = ref(route.query?.unit ? String(route.query.unit) : null)
const viewingEntry = computed(() => roster.value?.units.find((u) => u.uid === viewingUid.value) || null)
// The entry, not just its datasheet: the modal's overlay (rosterModifiers.js) needs this unit's
// own wargear picks to show the loadout it actually fields rather than every option on the sheet.
const viewingDef = computed(() => (viewingEntry.value ? defOf(viewingEntry.value.id) : null))
// Resolves `entry.leaderOf` (a uid) to the attached unit's display name for the modal's context
// strip — the same list the editor's attachment picker is built from, computed here only for the
// one entry being viewed.
const viewingLeaderTargets = computed(() => (viewingEntry.value
  ? leaderTargetsFor(viewingDef.value, roster.value?.units, viewingEntry.value.uid, defOf, curDetachments.value)
  : []))

// Same chamfered stat-box plates as DatasheetCard.vue's statline (its statCells()), scaled
// down for a compact list row — invuln is its own trailing plate (see below) rather than
// DatasheetCard's shield-shaped box sitting under SV with a side label; that layout needs more
// room than a one-line row has.
// The statline this ENTRY fields, not the one its datasheet prints: the same modifier layer the
// unit-rules modal applies runs here too. A plate showing 5" while the card behind it shows 7"
// would be the worst of both, so this list and that card go through one implementation
// (rosterStatMods.js) with the same inputs.
function statCellsOf(entry) {
  const sheet = fullSheets.value.get(entry?.id)
  if (!sheet?.profiles?.[0]) return []
  const { sheet: modded, marks } = statModCache.value.get(entry.uid) || statModsFor(entry, sheet)
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
watch(() => roster.value?.faction, async (slug) => {
  modifierRecords.value = []
  pickRecords.value = []
  factionEn.value = null
  if (!slug) return
  const [{ loadRosterModifiers, usableEntries, pickEntries }, { loadFaction }] = await Promise.all([
    import('../../data/rosterModifiers/index.js'),
    import('../../data/factions/index.js'),
  ])
  const [mods, fac] = await Promise.all([loadRosterModifiers(slug), loadFaction(slug)])
  if (roster.value?.faction !== slug) return
  modifierRecords.value = usableEntries(mods)
  pickRecords.value = pickEntries(mods)
  factionEn.value = fac?.en || null
}, { immediate: true })

const factionKeywordSets = computed(() =>
  [...fullSheets.value.values()].map((d) => [...(d.keywords || []), ...(d.factionKeywords || [])]))

// The modifier records that bear on one entry — shared by the plates and by the switch rows, so
// a switch can never appear for a rule the card itself doesn't consider.
function resolvedFor(entry) {
  if (!entry || !modifierRecords.value.length || !factionEn.value) return []
  const def = defOf(entry.id)
  const enh = entry.enh || mandatoryEnhancementFor(def, curDetachments.value)?.name || null
  const alleg = entry.alleg && def?.alleg ? { g: def.alleg.g, opt: entry.alleg } : null
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

// Who is attached to whom, for datasheetEntriesFor(). The game carries its own snapshot of the list,
// so these uids are the ones the entries themselves hold.
function attachmentCtxOf(entry) {
  const units = roster.value?.units || []
  return {
    unitId: entry.id,
    leaderUnitIds: units.filter((u) => u.leaderOf === entry.uid).map((u) => u.id),
    ledUnitId: entry.leaderOf ? units.find((u) => u.uid === entry.leaderOf)?.id || null : null,
    itemNames: loadoutItemNames(defOf(entry.id), entry, rosterItems.items),
    // The auras the player has marked as reaching this unit. The bearer's own unit and the unit it
    // is attached to are not in here — 22.01 answers those from the list itself.
    auraOn: keeps('trackAuras') ? activeAuras(gamePlayer.value, gameClock.value, entry) : new Set(),
    // …and which detachments are on the table, because one kind of aura hangs off a detachment rule
    // rather than off a model in this list.
    detIds: fieldedDetIds.value,
    // What the attached Leaders are carrying — a Kustom Force Field covers the unit its Big Mek
    // joined, not the Big Mek.
    leaderItemNames: units.filter((u) => u.leaderOf === entry.uid).reduce((set, u) => {
      for (const n of loadoutItemNames(defOf(u.id), u, rosterItems.items) || []) set.add(n)
      return set
    }, new Set()),
    // …and which ENHANCEMENTS they wear, for the same reason: an enhancement aura radiates from the
    // model, and the unit that model joined is inside it by 22.01 — no distance to judge, no chip.
    leaderEnhNames: units.filter((u) => u.leaderOf === entry.uid).reduce((set, u) => {
      const n = u.enh || mandatoryEnhancementFor(defOf(u.id), curDetachments.value)?.name || null
      if (n) set.add(n)
      return set
    }, new Set()),
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
  ])
}

// Everything one entry's modifiers are judged with: the records that bear on it, the keyword set
// they are judged against, and the game state that proves them. One function because the card and
// the CHIPS have to agree — a stratagem this unit cannot be the target of must be missing from
// both, and two places working it out separately is how they come to differ.
function modContextFor(entry, sheet) {
  const resolved = resolvedFor(entry)
  if (!resolved.length) return null
  const active = activeFor(entry)
  const printed = [...(sheet?.keywords || []), ...(sheet?.factionKeywords || [])]
  // A granted keyword decides which rules bear on the unit at all, so it has to be resolved BEFORE
  // the apply pass gates on the keyword set — the same order RosterUnitRulesModal uses. Skipping it
  // here would let a plate on this row and the card behind it disagree, which is the one thing this
  // shared implementation exists to prevent.
  // A spent stratagem rewrites the row in the list as well as the card behind it — same records,
  // same clock, so the plate and the card can never disagree. Resolved BEFORE the keyword grants,
  // since a stratagem can hand out a keyword (Daemonic Possession's DAEMON) that decides which
  // other rules bear on the unit at all.
  const chosen = chosenFor(entry, resolved)
  const kws = [...printed, ...grantedKeywordsFrom(resolved, printed, factionKeywordSets.value, active, chosen).map((g) => g.kw)]
  // …and then the stratagems this unit could never be picked as the target of come off the list.
  // Judged against the whole ATTACHED unit's keywords (Core Rules 19.03), which is why the
  // attachment the roster records is read here rather than the card's own keywords alone.
  const attached = attachedUnitKeywords(entry, roster.value?.units, (id) => {
    const d = fullSheets.value.get(id)
    return d ? [...(d.keywords || []), ...(d.factionKeywords || [])] : []
  })
  return { resolved: gateStratagems(resolved, [...kws, ...attached], factionKeywordSets.value), kws, active, chosen }
}

// The gated list on its own, for the callers that only want the records and not the keyword set
// that produced them.
const gatedFor = (entry) => modContextFor(entry, fullSheets.value.get(entry?.id))?.resolved || []

function statModsFor(entry, sheet) {
  // The master, in the one place that can answer for all of it: no rewritten numbers, no marks,
  // no notes — so the plates, the card behind them and the "possible" summary all fall back to the
  // printed datasheet together. Nothing downstream needs its own gate.
  if (!modsOn.value) return { sheet, marks: [] }
  if (!entry || !modifierRecords.value.length || !factionEn.value) return { sheet, marks: [] }
  const ctx = modContextFor(entry, sheet)
  if (!ctx) return { sheet, marks: [] }
  return applyStatMods(sheet, ctx.resolved, ctx.kws, factionKeywordSets.value, ctx.active, ctx.chosen)
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
const unitSwitchCache = computed(() => {
  const m = new Map()
  if (!canSwitch.value || !keeps('trackUnitStates')) return m
  for (const e of roster.value?.units || []) {
    m.set(e.uid, withRuleInfo(switchesFor(gatedFor(e), 'unit', gamePlayer.value, gameClock.value, e)))
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
      keywords: [...(sheet?.keywords || []), ...(sheet?.factionKeywords || [])],
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
function unitChipsOf(entry) {
  return [
    ...unitSwitchesOf(entry),
    ...(pickSwitchCache.value.get(entry.uid) || []),
    ...(auraSwitchCache.value.get(entry.uid) || []),
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
function toggleUnitChip(entry, sw) {
  if (sw.aura) {
    tracker.value?.setUnitAura(gamePi.value, entry.uid, sw.id, stampOf(gameClock.value), !sw.on)
    return
  }
  if (sw.pick) {
    // The set's own size caps it, and the store evicts the oldest pick — the same way a condition
    // group behaves, so picking a third relic drops the one that has been up longest.
    const siblings = (pickSwitchCache.value.get(entry.uid) || []).filter((c) => c.group === sw.group).map((c) => c.id)
    tracker.value?.setUnitPick(gamePi.value, entry.uid, sw.id, stampOf(gameClock.value), !sw.on, { siblings, limit: sw.groupLimit })
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
  for (const part of attachedEntries(entry)) {
    if (!sw.on) {
      for (const sid of stratagemsClearedBy(sw.id, resolvedFor(part), gamePlayer.value, gameClock.value, part)) {
        tracker.value?.setUnitStratagem(gamePi.value, part.uid, sid, at, false)
      }
    }
    tracker.value?.setUnitCondition(gamePi.value, part.uid, sw.id, at, !sw.on)
  }
}

function toggleArmyCond(sw) {
  if (sw.auto) return // read from the tracker — flip it there, not here
  tracker.value?.setArmyCondition(gamePi.value, sw.id, stampOf(gameClock.value), !sw.on)
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
      ? stratagemsFor(resolved, gamePlayer.value, gameClock.value, viewingEntry.value)
      : [],
    // …and the auras of other entries that reach it, the same chips its row carries.
    auras: canSwitch.value ? auraSwitchCache.value.get(viewingEntry.value.uid) || [] : [],
    // …and which option of its own ability set is up, likewise the row's chips.
    picks: canSwitch.value ? pickSwitchCache.value.get(viewingEntry.value.uid) || [] : [],
    // Picks are army-wide (allPicks): the card of a unit standing in someone else's aura must
    // read the same number its row does.
    chosen: canSwitch.value && keeps('trackAbilitySets') ? allPicks(gamePlayer.value, gameClock.value) : new Set(),
    switches: canSwitch.value && keeps('trackUnitStates')
      ? switchesFor(resolved, 'unit', gamePlayer.value, gameClock.value, viewingEntry.value)
      : [],
    armySwitches: canSwitch.value && keeps('trackArmyStates')
      ? switchesFor(resolved, 'army', gamePlayer.value, gameClock.value, viewingEntry.value)
      : [],
  }
})
// One handler for both scopes — the switch says which store it belongs to.
function toggleUnitStrat(st) {
  if (!viewingEntry.value) return
  tracker.value?.setUnitStratagem(gamePi.value, viewingEntry.value.uid, st.id, stampOf(gameClock.value), !st.on)
}

function toggleViewingAura(sw) {
  if (!viewingEntry.value) return
  tracker.value?.setUnitAura(gamePi.value, viewingEntry.value.uid, sw.id, stampOf(gameClock.value), !sw.on)
}

function toggleViewingPick(sw) {
  if (viewingEntry.value) toggleUnitChip(viewingEntry.value, sw)
}

function toggleUnitCond(sw) {
  if (sw.auto || !viewingEntry.value) return
  if (sw.scope === 'army') {
    tracker.value?.setArmyCondition(gamePi.value, sw.id, stampOf(gameClock.value), !sw.on)
    return
  }
  // Same handler as the row in the list, so the card and the row can never differ on what a switch does.
  toggleUnitCondFor(viewingEntry.value, sw)
}

// One pass per entry, not one per plate: statCellsOf() is called from the template for every row,
// and resolving + applying the modifier records is real work to repeat six times a row.
const statModCache = computed(() => {
  const m = new Map()
  for (const e of roster.value?.units || []) {
    const sheet = fullSheets.value.get(e.id)
    if (sheet) m.set(e.uid, statModsFor(e, sheet))
  }
  return m
})

const unitMap = computed(() => {
  const m = new Map()
  for (const u of factionData.value?.units || []) m.set(u.id, u)
  return m
})
function defOf(id) { return unitMap.value.get(id) }

// The detachments this army is actually playing, as ids — the gate for a detachment rule's aura
// (rosterStatMods' aurasReaching), which unlike every other aura is not vouched for by an entry
// sitting in the list.
const fieldedDetIds = computed(() => new Set(curDetachments.value.map((d) => d.id)))

const curDetachments = computed(() =>
  (roster.value?.detachments || [])
    .map((name) => (factionData.value?.detachments || []).find((d) => d.name === name))
    .filter(Boolean))

const effBattle = computed(() => effectiveBattle(roster.value || {}, rosterCore))
const limit = computed(() => effBattle.value.points)

const entryMeta = computed(() => {
  const seen = new Map()
  const m = new Map()
  for (const e of roster.value?.units || []) {
    const copyIndex = (seen.get(e.id) || 0) + 1
    seen.set(e.id, copyIndex)
    m.set(e.uid, { points: unitPoints(defOf(e.id), e, copyIndex, curDetachments.value), copyIndex })
  }
  return m
})
const nameFit = computed(() => rosterNameFit(roster.value?.name))
const points = computed(() => rosterPoints(roster.value?.units, defOf, curDetachments.value))

// The same verdict the editor's footer badge shows, on the screen people actually read. Computed
// only once the faction data is in — before that every unit id looks unknown and the list would
// accuse itself of holding units that don't exist.
const issuesOpen = ref(false)
const validation = computed(() => (factionData.value && roster.value
  ? validateRoster(roster.value, { faction: factionData.value, core: rosterCore })
  : { issues: [], errorCount: 0 }))
const issues = computed(() => validation.value.issues)
const errorCount = computed(() => validation.value.errorCount)
const warnCount = computed(() => issues.value.length - errorCount.value)

// Allies read as their own part of the list, exactly as the editor shows them (rosterEngine's
// sectionsOf); `keepLocked` so a unit whose group the Detachment doesn't unlock is still on screen.
const groupedUnits = computed(() =>
  sectionsOf(roster.value?.units, {
    faction: factionData.value, detachments: curDetachments.value, defOf, keepLocked: true,
    pairAttached: true,
  }).map((sec) => ({ ...sec, entries: sec.items })))

// The datasheet behind an allied unit belongs to its own faction, and the namespaced id says so.
const viewingSrc = computed(() => allySourceOf(viewingDef.value?.id))

function summaryLine(e) {
  return entrySummary(e, defOf(e.id), labels.value.rosterModelsLabel, labels.value.rosterUpgradesLabel, labels.value.rosterWarlord)
}

// Which slot an attached character fills, and what its whole unit costs. The two halves of an
// attached unit already share every state this screen writes (see attachedEntries) — since
// 2026-08-27 they finally share a place on the list too (rosterEngine's joinAttached).
function attachRole(e) {
  const host = e.leaderOf && roster.value?.units.find((u) => u.uid === e.leaderOf)
  if (!host) return ''
  const type = leadsFor(defOf(e.id), e, curDetachments.value).find((l) => l.to === host.id)?.type
  return type === 'support' ? labels.value.rosterSupportTag : labels.value.rosterLeaderTag
}
const blockTotal = (entries, i) => attachedBlockTotal(entries, i, (x) => entryMeta.value.get(x.uid)?.points)

// ── Rules + Stratagems tabs: army rule / each selected detachment's rule / its stratagems.
// Loaded only when one of those tabs is open — the faction bundle is heavy and is never imported
// statically (rosterFactionRules.js holds the load, the Chapter fallback and the RU names; the
// print sheet reads the same one). Both tabs share this: a detachment object carries its
// `.stratagems` alongside its `.rule`, the same shape FactionRuleView.vue reads.
const rulesFaction = ref(null)
const detachmentLookup = ref(new Map())

watch([() => roster.value?.faction, tab, locale], async ([slug, t, loc]) => {
  if ((t !== 'rules' && t !== 'stratagems') || !slug) return
  const { faction, lookup } = await loadRosterFactionRules(slug, loc)
  rulesFaction.value = faction
  detachmentLookup.value = lookup
}, { immediate: true })

const selectedDetachmentRules = computed(() =>
  (roster.value?.detachments || [])
    .map((name) => detachmentLookup.value.get(normName(name)))
    .filter(Boolean))

// ── Stratagems tab: same by-phase/as-list toggle as StratagemsView.vue, over the flattened
// stratagems of every selected detachment (each card's own sublabel already says which
// detachment it's from — no extra per-detachment grouping needed on top of that). The view
// preference is shared with the standalone page (same localStorage key) so it isn't a
// separate setting to learn twice.
const allStratagems = computed(() => selectedDetachmentRules.value.flatMap((det) => det.stratagems || []))

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
const nowOnly = ref(false)
// The filter can only be on while there is a slot: leaving the game (or the round bar losing the
// setting) must not leave the list silently filtered by a phase nobody is in.
watch(nowSlot, (slot) => { if (!slot) nowOnly.value = false })

const visibleStratagems = computed(() => {
  const slot = nowSlot.value
  if (!nowOnly.value || !slot) return allStratagems.value
  return allStratagems.value.filter((s) => usableInSlot(s._phases, s._sides, slot.phase, slot.mine))
})

const VIEW_KEY = 'wh11ed-stratagems-by-phase'
const byPhase = ref(getItem(VIEW_KEY) === '1')
watch(byPhase, (on) => setItem(VIEW_KEY, on ? '1' : '0'))
const openPhases = ref(new Set())

// Grouping by phase while filtering TO one phase would be one accordion with everything in it,
// so the filter renders the flat list (see the template's `byPhase && !nowOnly`).
const phaseGroups = computed(() => {
  const by = new Map()
  for (const s of visibleStratagems.value) {
    for (const k of s._phases?.length ? s._phases : ['any']) {
      if (!by.has(k)) by.set(k, [])
      by.get(k).push(s)
    }
  }
  return PHASE_ORDER.filter((k) => by.has(k)).map((k) => ({ key: k, strats: by.get(k) }))
})

function togglePhase(key) {
  const next = new Set(openPhases.value)
  next.has(key) ? next.delete(key) : next.add(key)
  openPhases.value = next
}

function stratKey(strat) {
  return strat.num || `${strat.sublabel || ''}|${strat.name}`
}
</script>

<style scoped>
.rv-record {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0.5rem 0 0.2rem;
  padding: 0.4rem 0.6rem;
  background: var(--bg-card);
  border: 1px solid var(--border-light);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.8rem;
}
.rv-record:hover { border-color: var(--accent); color: var(--text-primary); }
.rvr-rec { color: var(--text-primary); font-weight: 600; font-variant-numeric: tabular-nums; }
.rvr-lab { flex: 1; }

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
.rvp-head:hover { border-color: var(--accent); color: var(--accent); }
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

.rv-head {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.35rem;
  margin: 0.75rem 0 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid var(--accent);
}
/* A wide screen fits nearly any name beside the points, so there the header stays one line. */
@media (min-width: 700px) {
  .rv-head { flex-direction: row; align-items: center; gap: 0.75rem; }
  .rv-head .rv-name { flex: 1; }
}
.rv-name {
  min-width: 0;
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  overflow-wrap: anywhere;
}
/* Full size on a desktop, smaller as the viewport narrows — a phone is where a quote-as-a-name
   turns into a wall, a wide screen fits it in a line or two. A name that merely reaches a second
   line gets no step at all: two lines of a header are fine. */
.rv-name.long { font-size: clamp(1.35rem, 5.2vw, 1.7rem); line-height: 1.2; }
.rv-name.xlong { font-size: clamp(1.15rem, 4.4vw, 1.7rem); line-height: 1.25; }
.rv-meta { display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem; margin-left: auto; flex-shrink: 0; }
.rv-points { font-family: var(--font-mono); font-weight: 700; font-size: 1.1rem; white-space: nowrap; }
.rp-used { color: var(--text-primary); }
.rv-points.over .rp-used { color: #c0392b; }
.rp-sep, .rp-cap { color: var(--text-dim); }
.hdr-icon {
  display: inline-flex;
  align-items: center;
  padding: 0.35rem 0.55rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  text-decoration: none;
}
.hdr-icon:hover { border-color: var(--accent); color: var(--accent); }

.rv-hint { color: var(--text-muted); font-style: italic; text-align: center; padding: 1.5rem 0; }

/* The same folder tabs the faction pages wear (PageTabs) — three halves of one list, not three
   filters above it. They pick up this list's faction accent through --accent. */
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
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.rv-top .rv-cloud { margin: 0 0 0 auto; }

.rv-issues {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  margin: 0 0 0.8rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid color-mix(in srgb, var(--warning, #b8860b) 45%, transparent);
  background: color-mix(in srgb, var(--warning, #b8860b) 10%, transparent);
  color: var(--warning, #b8860b);
  font-size: 0.82rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}
.rv-issues.err {
  border-color: color-mix(in srgb, #c0392b 50%, transparent);
  background: color-mix(in srgb, #c0392b 12%, transparent);
  color: #e05c4b;
}
.rvi-txt { flex: 1; min-width: 0; }
.rvi-more { color: var(--text-muted); font-weight: 500; }
.rvi-go { flex: none; opacity: 0.7; }

.rvg-head {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 1.1rem 0 0.5rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--border);
}
/* Same ally tag as the editor's heading — the group's name plus what kind of heading it is. */
.rvg-ally {
  margin-left: 0.5em;
  font-family: var(--font-body, inherit);
  font-size: 0.72rem;
  font-style: normal;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}
.rvg-head.locked .rvg-ally { color: #c0392b; }
.rvunit {
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border);
  margin-bottom: 0.5rem;
}
.rvunit:hover { border-color: var(--accent); }
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
.rvunit-more:hover { border-color: var(--accent); color: var(--accent); }
.rvunit-more-n { font-family: var(--font-mono); font-weight: 700; }
/* The folded-out strip continues the one above it, so it carries no rule of its own. */
.rvunit-rest { border-top: 0; padding-top: 0; }
.rvunit-text { display: flex; flex-direction: column; flex: 1; min-width: 0; gap: 0.1rem; }
.rvunit-name { font-weight: 600; color: var(--text-primary); font-size: 0.92rem; }
/* Closes the gap to the character indented below it — the block's own look is the shared
   .roster-attached / .roster-sum pair in style.css. */
.rvunit-role { margin-left: 0.35rem; font-weight: 400; font-size: 0.74rem; color: var(--accent); }
.rvunit:has(+ .rvunit-attached) { margin-bottom: 0; }
/* The card is width:100% here; the rail's indent has to come off that. */
.rvunit-attached { width: auto; }
/* Mini stat plates — same chamfered-box look as DatasheetCard.vue's .ds-stat-box (10th-ed
   style: no rounding, top-left/bottom-right corners cut), scaled down to fit a compact list
   row. Copied, not shared — scoped styles don't cross component boundaries. */
.rvunit-stats { display: inline-flex; gap: 0.3rem; margin: 0.15rem 0; }
.rvst { display: inline-flex; flex-direction: column; align-items: center; gap: 2px; }
/* A plate the modifier layer rewrote — the same accent treatment DatasheetCard gives a modified
   value, so the list and the card agree at a glance as well as in the number. */
.rvst-mod .rvst-box { color: var(--accent); }
.rvst-label { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.5px; color: var(--text-muted); }
.rvst-box {
  position: relative;
  isolation: isolate;
  display: block;
  min-width: 1.85rem;
  text-align: center;
  background: var(--border);
  clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);
  padding: 0.16rem 0.22rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.84rem;
  line-height: 1.1;
  color: var(--text-primary);
}
.rvst-box::before {
  content: '';
  position: absolute;
  inset: 1px;
  z-index: -1;
  background: color-mix(in srgb, var(--accent) 8%, var(--bg-card));
  clip-path: polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px);
}
/* Invulnerable save — its own plate right after SV, colour-called-out the way DatasheetCard's
   accent-coloured "Invulnerable Save" label calls it out (a distinct accent fill, not just
   another neutral box, so it reads as "special" among the plain stats). */
.rvst-inv .rvst-label { color: var(--accent); }
.rvst-inv .rvst-box { background: var(--accent); color: var(--text-on-accent, #fff); }
.rvst-inv .rvst-box::before { background: var(--accent); }
.rvunit-sub { font-size: 0.74rem; color: var(--text-dim); }
.rvunit-pts { font-family: var(--font-mono); font-weight: 700; color: var(--text-primary); }
.rvunit-chev { color: var(--text-dim); font-size: 0.7rem; flex-shrink: 0; }

.rv-rule-block { margin-bottom: 1.5rem; }

/* Stratagems tab — same toolbar/toggle/phase-accordion/grid language as the standalone
   StratagemsView.vue page — copied, not shared (scoped styles don't cross component
   boundaries). No .strat-filters here (StratagemsView's core/you/opp row) — this tab has
   nothing to filter, it's always just this roster's own detachments. */
.strat-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.strat-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast);
}
.strat-toggle:hover { color: var(--text-primary); border-color: var(--accent); }
.strat-toggle.active { background: var(--accent); border-color: var(--accent); color: #fff; }

.phase-group { margin-bottom: 0.75rem; }
.phase-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  transition: border-color var(--motion-fast);
}
.phase-head:hover { border-color: var(--accent); }
.phase-chev { flex-shrink: 0; font-size: 0.8rem; color: var(--text-dim); }
.phase-name { flex: 1; text-align: left; }
.phase-count { flex-shrink: 0; font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--text-muted); }
.phase-grid { padding-top: 0.75rem; }

@media (max-width: 480px) {
  .strat-toggle-label { display: none; }
}

/* Per-faction accent — mirrors RosterEditorView / FactionLayout's three-step theme resolution. */
.roster-view.themed {
  --accent: var(--fa-light, var(--accent));
  --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black);
}
@media (prefers-color-scheme: dark) {
  .roster-view.themed { --accent: var(--fa-dark, var(--accent)); --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white); }
}
</style>

<!-- Explicit data-theme must win over prefers-color-scheme in both directions (see FactionLayout). -->
<style>
:root[data-theme='light'] .roster-view.themed { --accent: var(--fa-light, #8b2a33); --accent-hover: color-mix(in srgb, var(--fa-light) 80%, black); }
:root[data-theme='dark'] .roster-view.themed { --accent: var(--fa-dark, #c8585e); --accent-hover: color-mix(in srgb, var(--fa-dark) 80%, white); }
</style>
