<template>
  <div
    class="setup"
    :class="{ 'setup-guest': guest }"
  >
    <div
      v-if="!guest"
      class="setup-head"
    >
      <h2 class="setup-title">
        {{ labels.trackerSetupTitle }}
      </h2>
      <!-- The desktop step chips are buttons (2026-09-17): any step behind you, and any step ahead
           whose way is clear — the same gates the Next buttons use, so a chip can never skip past
           an unfinished step. A chip that cannot be reached yet is disabled, not hidden. -->
      <div class="steps">
        <template
          v-for="(st, i) in STEPS"
          :key="st.n"
        >
          <span
            v-if="i"
            class="step-sep"
          >→</span>
          <button
            type="button"
            class="step"
            :class="{ on: step === st.n, done: step > st.n }"
            :aria-current="step === st.n ? 'step' : undefined"
            :disabled="!canGoTo(st.n)"
            @click="step = st.n"
          >
            {{ st.n }} · {{ labels[st.label] }}
          </button>
        </template>
      </div>
      <div class="steps-compact">
        {{ step }} / 4 · {{ stepLabel }}
      </div>
    </div>

    <!-- Opening the lobby failed (no connection, or a session that went stale). Said out loud
         here rather than dropping the reader into an ordinary setup wondering what happened. -->
    <p
      v-if="shareError"
      class="share-error"
    >
      <span>{{ shareError }}</span>
      <button
        type="button"
        class="btn-ghost se-retry"
        @click="createLobby"
      >
        {{ labels.lobbyShareRetry }}
      </button>
    </p>

    <!-- ───────── Step 1 — Armies ───────── -->
    <!-- A guest sees this panel and the mission panel's own side block, one under the other:
         everything about ITS army, nothing about the game around it. -->
    <div
      v-show="guest || step === 1"
      :ref="el => (panelEls[0] = el)"
      class="step-panel"
    >
      <div
        v-if="!guest"
        class="field game-type seg-thirds"
      >
        <span>{{ labels.trackerGameType }}</span>
        <!-- Locked once the setup is shared: a seat means "a side" in singles and "one member of
             a team" in doubles, so moving between them would unseat everyone who joined. -->
        <div
          class="seg"
          :class="{ locked: modeLocked }"
          :title="modeLocked ? labels.lobbyGameTypeLocked : ''"
        >
          <button
            :class="{ on: !settings.combatPatrol && !isDoubles }"
            :disabled="modeLocked"
            @click="setGameMode('singles')"
          >
            {{ labels.trackerGameTypeSingles }}
          </button>
          <button
            :class="{ on: isDoubles }"
            :disabled="modeLocked"
            @click="setGameMode('doubles')"
          >
            {{ labels.trackerGameTypeDoubles }}
          </button>
          <button
            :class="{ on: settings.combatPatrol }"
            :disabled="modeLocked"
            @click="setGameMode('combatPatrol')"
          >
            {{ labels.trackerGameTypeCombatPatrol }}
          </button>
        </div>
      </div>

      <div
        v-if="!guest && !settings.combatPatrol"
        class="field battle-size seg-thirds"
      >
        <span>{{ labels.trackerBattleSize }}</span>
        <!-- The two lines are deliberate structure, not a wrap: the name reads first, the
             numbers ride under it — a free-wrapping "Strike Force · 2000 · 3DP" broke wherever
             the width said and every button broke differently. -->
        <div class="seg">
          <button
            v-for="b in battleSizes"
            :key="b.id"
            class="bs-btn"
            :class="{ on: settings.battleSize === b.id }"
            @click="settings.battleSize = b.id"
          >
            <span class="bs-name">{{ b.name }}</span>
            <span class="bs-sub">{{ b.points }} · {{ b.maxDp }} DP</span>
          </button>
        </div>
      </div>

      <!-- Doubles: each player musters their own army, so the DP budget is per player. The
           battle size's own budget is the default; the event may set another (the companion
           leaves it to the organiser — "всё настраивается"). Label BESIDE the seg: three short
           buttons don't need the row, and the phone's vertical space does (CLAUDE.md's
           vertical-density rule — spend sideways before spending down). -->
      <div
        v-if="isDoubles && !guest"
        class="field field-inline"
      >
        <span>{{ labels.trackerDpPerPlayer }}</span>
        <div class="seg">
          <button
            v-for="n in [1, 2, 3]"
            :key="n"
            :class="{ on: memberMaxDp === n }"
            @click="settings.dpPerPlayer = n === maxDp ? null : n"
          >
            {{ n }} DP
          </button>
        </div>
      </div>

      <div class="players">
        <div
          v-for="{ p, i } in shownPlayers"
          :key="i"
          class="player-card"
        >
          <h3 class="player-head">
            {{ playerLabel(i) }}
          </h3>
          <!-- Whose side this is, and what it is waiting for. The card is INERT when another
               phone holds it — its fields are still there to read (an opponent's army is
               exactly what you want to look at), they just cannot be typed into. -->
          <p
            v-if="sharedSetup && sideNote(i)"
            class="side-note"
            :class="{ ok: isReady(i) }"
          >
            {{ sideNote(i) }}
          </p>

          <!-- A side someone else is filling in is not a form with every field greyed out — it
               is a REPORT. Empty until they press Done, because an empty form under a "waiting"
               line is just a longer way of saying nothing; a few lines once they have, because
               what the host wants from it is what it says, not what it could be typed into. -->
          <div
            v-if="mirrored(i)"
            class="side-mirror"
          >
            <p
              v-if="!isReady(i)"
              class="sm-waiting"
            >
              <span
                class="sm-dot"
                aria-hidden="true"
              />
              {{ labels.lobbySideWaitingLong }}
            </p>
            <ul
              v-else
              class="sm-lines"
            >
              <li
                v-for="(line, n) in sideSummary(i)"
                :key="n"
              >
                {{ line }}
              </li>
            </ul>
            <button
              v-if="!isReady(i)"
              type="button"
              class="btn-ghost side-takeover"
              @click="takeOverConfirmOpen = i"
            >
              {{ labels.lobbyFillMyself }}
            </button>
          </div>

          <div
            v-else
            :inert="editable(i) ? undefined : true"
          >
            <label
              v-if="isDoubles"
              class="field"
            >
              <span>{{ labels.trackerTeamName }}</span>
              <input
                v-model="p.teamName"
                type="text"
                :placeholder="labels.trackerTeamName"
              >
            </label>

            <!-- The army-identity block below (name / faction·roster / detachments) is written once
               and looped: armiesOf(p) is the side itself in singles, its two members in doubles —
               the two shapes are identical, so `m` stands for either. -->
            <div
              v-for="(m, mi) in armiesOf(p)"
              :key="mi"
              :class="{ 'member-block': isDoubles }"
            >
              <h4
                v-if="isDoubles"
                class="member-head"
              >
                {{ mi === 0 ? labels.trackerPlayer1 : labels.trackerPlayer2 }}
              </h4>

              <label class="field">
                <input
                  v-model="m.name"
                  type="text"
                  :placeholder="isDoubles ? labels.trackerMemberName : namePlaceholder(i)"
                >
              </label>

              <!-- An attached list IS the army: it decides the faction, so it stands in the faction
                 picker's place rather than beside one that could contradict it, and the button that
                 attaches one sits in the same row — the two answer the same question. Detaching with
                 the ✕ leaves the faction the list chose selected, and hands the picker back. -->
              <div class="field">
                <span>{{ attached(m) ? labels.trackerRoster : labels.trackerFaction }}</span>
                <div class="faction-row">
                  <div
                    v-if="attached(m)"
                    class="ro roster-line"
                  >
                    <span class="rl-text">
                      <template v-if="m.roster.faction">{{ factionName(m.roster.faction) }} · </template>{{ m.roster.name || labels.rosterUntitled }}
                    </span>
                    <button
                      type="button"
                      class="rl-clear"
                      :aria-label="labels.trackerRosterDetach"
                      :title="labels.trackerRosterDetach"
                      @click="clearRoster(m)"
                    >
                      ✕
                    </button>
                  </div>
                  <button
                    v-else
                    class="btn-choose-twist faction-btn"
                    @click="factionPickerKey = ak(i, mi)"
                  >
                    <span
                      class="ct-name"
                      :class="{ placeholder: !m.factionSlug }"
                    >{{ m.factionSlug ? factionName(m.factionSlug) : labels.trackerSelectFaction }}</span>
                    <i class="bi bi-chevron-right ct-chev" />
                  </button>
                  <!-- No list in Combat Patrol: the box IS the army (one fixed detachment, a
                       fixed Force Disposition, a fixed set of models), so a 2000-point list
                       attached here would describe a different game. -->
                  <button
                    v-if="!settings.combatPatrol"
                    type="button"
                    class="rp-open"
                    :class="{ on: !!m.roster }"
                    :aria-label="labels.trackerRosterAttach"
                    :title="labels.trackerRosterAttach"
                    @click="rosterPickerKey = ak(i, mi)"
                  >
                    <i class="bi bi-card-list" />
                  </button>
                </div>
                <FactionPickerModal
                  v-if="factionPickerKey === ak(i, mi)"
                  :selected="m.factionSlug"
                  :combat-patrol-only="settings.combatPatrol"
                  @pick="slug => selectFaction(m, slug)"
                  @close="factionPickerKey = ''"
                />
                <RosterPickerModal
                  v-if="rosterPickerKey === ak(i, mi)"
                  :selected="m.roster ? (m.rosterId || '') : null"
                  @pick="r => pickRoster(m, r)"
                  @clear="clearRoster(m)"
                  @close="rosterPickerKey = ''"
                />
              </div>

              <div
                v-if="!settings.combatPatrol"
                class="field"
              >
                <span>
                  {{ labels.trackerDpBudget }} <em
                    class="dp-count"
                    :class="{ over: dpSpent(m) > memberMaxDp && m.detachments.length !== 1 }"
                  >{{ dpSpent(m) }} / {{ memberMaxDp }} DP</em>
                  <button
                    v-if="m.detachments.length === 1 && dpSpent(m) > memberMaxDp"
                    type="button"
                    class="help-btn"
                    :aria-label="labels.trackerDpOverHelp"
                    @click="dpHelpOpen = true"
                  >
                    <i class="bi bi-question-circle" />
                  </button>
                </span>
                <button
                  v-if="m.factionSlug && detachmentsFor(m.factionSlug).length"
                  class="btn-choose-twist"
                  @click="detPickerKey = ak(i, mi)"
                >
                  <span
                    class="ct-name"
                    :class="{ placeholder: !m.detachments.length }"
                  >{{ detSummary(m) }}</span>
                  <i class="bi bi-chevron-right ct-chev" />
                </button>
                <p
                  v-else
                  class="det-empty"
                >
                  {{ m.factionSlug ? labels.trackerNoDetachments : labels.trackerSelectFaction }}
                </p>
                <DetachmentPickerModal
                  v-if="detPickerKey === ak(i, mi)"
                  :detachments="detachmentsFor(m.factionSlug)"
                  :selected="m.detachments"
                  :max-dp="memberMaxDp"
                  :dp-spent="dpSpent(m)"
                  @toggle="d => toggleDetachment(m, d)"
                  @clear="m.detachments.splice(0)"
                  @close="detPickerKey = ''"
                />
              </div>
              <div
                v-else
                class="field"
              >
                <span>{{ labels.trackerCpBox }}</span>
                <p
                  v-if="!m.factionSlug"
                  class="det-empty"
                >
                  {{ labels.trackerSelectFaction }}
                </p>
                <p
                  v-else-if="cpFactionFor(m)"
                  class="ro cp-box-line"
                >
                  {{ cpFactionFor(m).boxName }} · {{ cpFactionFor(m).dp }} DP
                </p>
                <p
                  v-else
                  class="det-empty"
                >
                  {{ labels.trackerNoDetachments }}
                </p>
              </div>
            </div>

            <!-- Force type (Doubles Companion terminology). Auto derives from the two factions
               (same faction / two SM Chapters → Unified); the player can override — allies on a
               list can flip the real answer, and the app doesn't read lists at that depth.
               A div, not a label: it wraps only buttons, and a label would forward clicks. -->
            <div
              v-if="isDoubles"
              class="field"
            >
              <span>
                {{ labels.trackerForceType }}
                <button
                  type="button"
                  class="help-btn"
                  :aria-label="labels.trackerForceTypeHelpAria"
                  @click="forceTypeHelpOpen = true"
                >
                  <i class="bi bi-question-circle" />
                </button>
              </span>
              <div class="seg seg-fill">
                <button
                  :class="{ on: !p.forceType }"
                  @click="p.forceType = null"
                >
                  {{ labels.trackerForceTypeAuto }}{{ derivedForceLabel(p) }}
                </button>
                <button
                  :class="{ on: p.forceType === 'unified' }"
                  @click="p.forceType = 'unified'"
                >
                  Unified
                </button>
                <button
                  :class="{ on: p.forceType === 'convenience' }"
                  @click="p.forceType = 'convenience'"
                >
                  Convenience
                </button>
              </div>
            </div>

            <label
              class="check br-check"
              :class="{ on: p.battleReady }"
            >
              <input
                v-model="p.battleReady"
                type="checkbox"
              >
              <span>{{ labels.trackerBattleReady }} (+10 VP)</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Everything about the LOBBY, under the step's own navigation and quieter than it: the
           code to read out, the way to the link and QR, and the way to close it. They used to
           stand in that row as equals, which made five buttons of five different meanings — and
           the two that move between wizard steps were the smallest of them. -->
      <div
        v-if="sharedSetup && !guest"
        class="lobby-bar"
      >
        <SyncIndicator />
        <button
          type="button"
          class="lobby-q"
          :title="labels.lobbyInvite"
          @click="partyOpen = true"
        >
          <i class="bi bi-qr-code" />
          <span v-if="inviteCode">{{ labels.partyCode }} {{ inviteCode }}</span>
          <span v-else>{{ labels.lobbyInvite }}</span>
        </button>
        <button
          type="button"
          class="lobby-q"
          @click="cancelConfirmOpen = true"
        >
          {{ labels.lobbyCancelShort }}
        </button>
      </div>
      <div
        v-if="!guest"
        class="actions"
      >
        <button
          class="btn-ghost"
          @click="cancel"
        >
          {{ labels.trackerCancel }}
        </button>
        <!-- No waiting here. A Force Disposition follows from THIS side's detachment and a
             side is mustered by its own player, so holding the host on this step until the guest
             confirms only kept the host away from its own disposition (which lives on the next
             one). What genuinely needs both sides is the primary mission — the step-2 gate — and
             the start of the game itself. -->
        <button
          class="btn-primary"
          :disabled="!canArmies"
          @click="leaveArmiesStep"
        >
          {{ labels.trackerNextStep }} →
        </button>
      </div>
    </div>

    <!-- ───────── Step 2 — Mission ───────── -->
    <div
      v-show="guest || step === 2"
      :ref="el => (panelEls[1] = el)"
      class="step-panel"
    >
      <!-- Twist: optional pre-game modifier — chosen via a full-screen picker. FIRST on this
           page, because it is what decides the mission shown under it: Scrambled Communications
           swaps the two primaries and Mirrored World replaces both, and `derivePrimary` reads
           `settings.twist`, so the preview below already depends on this button. Chosen on the
           last step, as it was until 2026-08-25, it rewrote a card the player had already read
           and moved on from. Not offered for Combat Patrol (the box's own rules don't mention it
           either way; keeping this simple, matching how basic-box play works). -->
      <div
        v-if="!guest && !settings.combatPatrol"
        class="settings twist-block"
      >
        <h3 class="block-head">
          {{ labels.trackerTwistHeading }}
        </h3>
        <button
          class="btn-choose-twist"
          @click="twistPickerOpen = true"
        >
          <span
            class="ct-name"
            :class="{ placeholder: !chosenTwist }"
          >{{ chosenTwist ? chosenTwist.title : labels.trackerChooseTwist }}</span>
          <i class="bi bi-chevron-right ct-chev" />
        </button>
        <details
          v-if="chosenTwist"
          class="twist-chosen"
        >
          <summary>{{ labels.trackerTwistRules }}</summary>
          <div class="twist-chosen-body">
            <RuleBody :body="chosenTwist.body" />
          </div>
        </details>
        <div
          v-if="settings.twist === 'mirrored-world'"
          class="field twist-mission"
        >
          <span>{{ labels.trackerTwistMission }}</span>
          <button
            class="btn-choose-twist"
            @click="mirrorPickerOpen = true"
          >
            <span
              class="ct-name"
              :class="{ placeholder: !settings.twistMission }"
            >{{ mirrorSummary }}</span>
            <i class="bi bi-chevron-right ct-chev" />
          </button>
        </div>
      </div>

      <div class="players">
        <div
          v-for="{ p, i } in shownPlayers"
          :key="i"
          class="player-card"
          :class="{ 'pc-joined': guest }"
        >
          <!-- The team name rides in the heading, muted, so "You"/"Opponent" stays the anchor
               and the name reads as an annotation. Written adjacent (no line break before the
               span): a break here would condense into a stray space ahead of the separator.
               A GUEST has this panel directly under the armies one, for the same single side:
               a second "You" and a recap of the army two fingers above it read as the screen
               saying everything twice, so both are the wizard's alone. -->
          <h3
            v-if="!guest"
            class="player-head"
          >
            {{ playerLabel(i) }}<span
              v-if="isDoubles && p.teamName"
              class="ph-team"
            >&nbsp;· {{ p.teamName }}</span>
          </h3>
          <p
            v-if="!guest"
            class="army-summary"
          >
            {{ armySummary(p, i) }}
          </p>

          <!-- Held by another phone: the same report the armies step draws, for the same
               reason — a disposition picker and a secondary switch that belong to someone else
               are controls, not information. What IS information sits under it: the primary,
               which is the pair's, not this side's. -->
          <div
            v-if="mirrored(i)"
            class="side-mirror"
          >
            <p
              v-if="!isReady(i)"
              class="sm-waiting"
            >
              <span
                class="sm-dot"
                aria-hidden="true"
              />
              {{ labels.lobbySideWaitingLong }}
            </p>
            <ul
              v-else
              class="sm-lines"
            >
              <li
                v-for="(line, n) in sideSummary(i)"
                :key="n"
              >
                {{ line }}
              </li>
            </ul>
          </div>

          <template v-else>
            <label
              class="field"
              :inert="editable(i) ? undefined : true"
            >
              <span>{{ candidateDispositions(p).length > 1 ? labels.trackerActiveDisposition : labels.trackerDisposition }}</span>
              <!-- faction has no detachments at all → manual choice (only way to set it) -->
              <select
                v-if="p.factionSlug && !detachmentsFor(p.factionSlug).length"
                v-model="p.disposition"
              >
                <option
                  :value="null"
                  disabled
                >{{ labels.trackerDispositionManual }}</option>
                <option
                  v-for="d in dispositions"
                  :key="d.id"
                  :value="d.id"
                >{{ d.name }}</option>
              </select>
              <!-- ≥2 distinct dispositions from chosen detachments → pick the active one -->
              <div
                v-else-if="candidateDispositions(p).length > 1"
                class="seg seg-fill"
              >
                <button
                  v-for="id in candidateDispositions(p)"
                  :key="id"
                  :class="{ on: p.disposition === id }"
                  @click="p.disposition = id"
                >{{ dispositionName(id) }}</button>
              </div>
              <!-- exactly 1 → auto, read-only -->
              <input
                v-else-if="candidateDispositions(p).length === 1"
                type="text"
                :value="dispositionName(p.disposition)"
                readonly
                class="ro"
              >
              <!-- nothing chosen yet → gated behind picking a detachment -->
              <p
                v-else
                class="det-empty"
              >{{ labels.trackerPickDetachmentFirst }}</p>
            </label>
          </template>

          <!-- The primary is derived from BOTH dispositions, so in a lobby it is missing until
               the other side has chosen one — said out loud, because a block that simply is not
               there reads as a screen that forgot something. -->
          <p
            v-if="!primaryCards[i] && sharedSetup && !dispositionOf(oppOf(i))"
            class="primary-pending"
          >
            {{ labels.lobbyPrimaryPending }}
          </p>
          <!-- Said on this phone's own card, where the two dispositions are read from: the card
               opposite already says, at length, that it is waiting. -->
          <p
            v-else-if="!primaryFinal && editable(i)"
            class="primary-pending"
          >
            {{ labels.lobbyPrimaryAgain }}
          </p>
          <div
            v-if="primaryCards[i] && primaryFinal"
            class="primary-block"
          >
            <span class="primary-label">{{ labels.trackerPrimaryPreview }}</span>
            <div class="primary-card">
              <MissionCard
                :mission="primaryCards[i]"
                :show-lore="false"
                collapsible
                :default-open="false"
              />
            </div>
          </div>

          <!-- Which deck a side plays is that side's own call, so on a card another phone holds
               these are not offered: `.side-mirror` above reports the answer instead (sideSummary
               prints it, and the armies step's card has always said it that way). They used to
               sit outside that split and merely go inert — a bright "Tactical / Fixed" switch
               under "waiting for your opponent", which is the one thing on the card the host had
               no business touching (owner, 2026-09-24). No `inert` inside here: within
               `!mirrored` the side is always this phone's to edit. -->
          <template v-if="!mirrored(i)">
            <label class="field">
              <span>{{ labels.trackerSecondaryMode }}</span>
              <div class="seg">
                <button
                  :class="{ on: p.secondaryMode === 'tactical' }"
                  @click="p.secondaryMode = 'tactical'"
                >{{ labels.trackerTactical }}</button>
                <button
                  :class="{ on: p.secondaryMode === 'fixed' }"
                  @click="p.secondaryMode = 'fixed'"
                >{{ labels.trackerFixed }}</button>
              </div>
            </label>

            <div
              v-if="p.secondaryMode === 'fixed'"
              class="field"
            >
              <span>{{ labels.trackerChooseFixed }} <em class="dp-count">{{ p.fixedSecondaries.length }} / {{ MAX_FIXED }}</em></span>
              <button
                class="btn-choose-twist"
                @click="fixedPickerFor = i"
              >
                <span
                  class="ct-name"
                  :class="{ placeholder: !p.fixedSecondaries.length }"
                >{{ fixedSummary(p) }}</span>
                <i class="bi bi-chevron-right ct-chev" />
              </button>
            </div>
          </template>
        </div>
      </div>

      <div
        v-if="!guest"
        class="actions"
      >
        <button
          class="btn-ghost"
          @click="backToArmiesStep"
        >
          ← {{ labels.trackerBack }}
        </button>
        <button
          class="btn-primary"
          :disabled="!canMission"
          :title="canMission || othersReady ? '' : labels.lobbyWaitingGuest"
          @click="step = 3"
        >
          {{ labels.trackerNextStep }} →
        </button>
      </div>

      <!-- The guest's only two buttons. "Done" is what sends this side — until it is pressed
           nothing typed here has left the phone. -->
      <div
        v-if="guest"
        class="actions"
      >
        <button
          class="btn-ghost"
          @click="guestLeave"
        >
          {{ labels.lobbyLeave }}
        </button>
        <button
          class="btn-primary"
          :disabled="!canConfirmSide"
          @click="guestDone"
        >
          {{ labels.lobbyDone }}
        </button>
      </div>
    </div>

    <!-- ───────── Step 3 — Field & deployment (attacker, layout, first turn) ───────── -->
    <div
      v-if="!guest"
      v-show="step === 3"
      :ref="el => (panelEls[2] = el)"
      class="step-panel"
    >
      <!-- Attacker / Defender belongs here, not on the army cards (where it sat until
           2026-09-17): in the Mission Sequence it is rolled for after the mission and before
           deployment, and what it decides is the side of the table — the layout below marks the
           Attacker's and the Defender's edges. The roles are linked, so it is one control asking
           who the Attacker is, not two segs that flip each other. The secondary decks differ by
           role too, but the fixed cards are the same four in both, so a choice made on step 2 —
           against the default roles — survives a flip here. -->
      <!-- Desktop (>700px, the same threshold as the two player cards on steps 1–2): the layout
           on the left, the two deployment questions in one card on the right, and the picture
           capped to the height the screen has left — so the step fits one screen, like the two
           before it. On a phone the same DOM stacks: questions, then the layout. -->
      <div class="two-col deploy-grid">
        <div class="settings deploy-opts deploy-card">
          <div class="field">
            <span>
              {{ labels.trackerAttacker }}
              <button
                type="button"
                class="help-btn"
                :aria-label="labels.trackerRoleHelpAria"
                @click="roleHelpOpen = true"
              >
                <i class="bi bi-question-circle" />
              </button>
            </span>
            <div class="seg">
              <button
                :class="{ on: players[0].role === 'attacker' }"
                @click="setRole(0, 'attacker')"
              >
                {{ playerLabel(0) }}
              </button>
              <button
                :class="{ on: players[1].role === 'attacker' }"
                @click="setRole(1, 'attacker')"
              >
                {{ playerLabel(1) }}
              </button>
            </div>
          </div>
          <!-- Who deploys first sits with the layout: both answer "where and in what order do we
               set up", and neither is a setting of the app. -->
          <label class="field">
            <span>{{ labels.trackerFirstTurn }}</span>
            <div class="seg">
              <button
                :class="{ on: settings.firstTurn === 1 }"
                @click="settings.firstTurn = 1"
              >{{ labels.trackerYou }}</button>
              <button
                :class="{ on: settings.firstTurn === 2 }"
                @click="settings.firstTurn = 2"
              >{{ labels.trackerOpponent }}</button>
            </div>
          </label>
          <!-- Desktop: the layout tabs join the questions in the side column, so the picture on
               the left has the whole card to itself. On a phone they stay above the picture. -->
          <div
            v-if="desk && layouts.length"
            class="field"
          >
            <span>{{ labels.trackerLayoutHeading }}</span>
            <LayoutTabs
              :layouts="layouts"
              :selected="settings.layout"
              @select="selectLayout"
              @custom="layoutPickerOpen = true"
            />
            <p class="layout-note">
              {{ labels.trackerLayoutNote }}
            </p>
          </div>
        </div>

        <div class="settings layout-block">
          <template v-if="!desk">
            <h3 class="block-head">
              {{ labels.trackerLayoutHeading }}
            </h3>
            <p class="layout-note">
              {{ labels.trackerLayoutNote }}
            </p>
          </template>
          <template v-if="layouts.length">
            <LayoutTabs
              v-if="!desk"
              :layouts="layouts"
              :selected="settings.layout"
              @select="selectLayout"
              @custom="layoutPickerOpen = true"
            />
            <LayoutCard
              v-if="currentLayout"
              :layout="currentLayout"
            />
          </template>
          <p
            v-else
            class="det-empty"
          >
            {{ labels.trackerLayoutPending }}
          </p>
        </div>
      </div>

      <div class="actions">
        <button
          class="btn-ghost"
          @click="step = 2"
        >
          ← {{ labels.trackerBack }}
        </button>
        <button
          class="btn-primary"
          :disabled="!canBattlefield"
          @click="step = 4"
        >
          {{ labels.trackerNextStep }} →
        </button>
      </div>
    </div>

    <!-- ───────── Step 4 — Settings (how the app runs this game) ───────── -->
    <div
      v-if="!guest"
      v-show="step === 4"
      :ref="el => (panelEls[3] = el)"
      class="step-panel"
    >
      <!-- Two cards, side by side on desktop: what is about the GAME (the score mode and the
           `game` option group) and what is about the attached LIST (the `roster` group) — the
           split trackerOptions.js already makes. Thirteen rows in one column ran past a screen;
           two columns of six or seven fit one, like the steps before. -->
      <div class="two-col">
        <div class="settings deploy-opts">
          <label class="field">
            <span>
              {{ labels.trackerScoreMode }}
              <button
                type="button"
                class="help-btn"
                :aria-label="labels.trackerScoreHelp"
                @click="scoreHelpOpen = true"
              ><i class="bi bi-question-circle" /></button>
            </span>
            <div class="seg">
              <button
                :class="{ on: settings.scoreMode === 'vp' }"
                @click="settings.scoreMode = 'vp'"
              >{{ labels.trackerScoreVp }}</button>
              <button
                :class="{ on: settings.scoreMode === 'bp' }"
                @click="settings.scoreMode = 'bp'"
              >{{ labels.trackerScoreBp }}</button>
            </div>
          </label>
          <TrackOptions
            :settings="settings"
            :ctx="trackCtx"
            group="game"
          />
        </div>
        <div class="settings deploy-opts">
          <TrackOptions
            :settings="settings"
            :ctx="trackCtx"
            group="roster"
            heading="trackerRosterHeading"
            guide
          />
        </div>
      </div>

      <div class="actions">
        <button
          class="btn-ghost"
          @click="step = 3"
        >
          ← {{ labels.trackerBack }}
        </button>
        <button
          class="btn-primary"
          :disabled="!canStart"
          @click="start"
        >
          {{ labels.trackerStart }}
        </button>
      </div>
    </div>

    <TwistPickerModal
      v-if="twistPickerOpen"
      :twists="twistList"
      :selected="settings.twist"
      @pick="onPickTwist"
      @random="onRandomTwist"
      @none="onNoTwist"
      @close="twistPickerOpen = false"
    />

    <SecondaryPickerModal
      v-if="fixedPickerFor >= 0"
      :missions="fixedModalMissions"
      :selected="players[fixedPickerFor].fixedSecondaries"
      :max="MAX_FIXED"
      @toggle="slug => toggleFixed(players[fixedPickerFor], slug)"
      @close="fixedPickerFor = -1"
    />

    <MissionPickerModal
      v-if="mirrorPickerOpen"
      :title="labels.trackerTwistMission"
      :missions="mirrorModalMissions"
      :selected="settings.twistMission"
      :random-label="labels.trackerRandom"
      @pick="onPickMirror"
      @random="onRandomMirror"
      @close="mirrorPickerOpen = false"
    />

    <!-- ── The lobby's own dialogs ──────────────────────────────────────────────────────── -->
    <ConfirmModal
      v-if="cancelConfirmOpen"
      :title="labels.lobbyCancel"
      :message="labels.lobbyCancelConfirm"
      :confirm-label="labels.lobbyCancelConfirmYes"
      :cancel-label="labels.trackerBack"
      @confirm="cancelLobby"
      @close="cancelConfirmOpen = false"
    />
    <ConfirmModal
      v-if="takeOverConfirmOpen !== null"
      :title="labels.lobbyTakeOver"
      :message="labels.lobbyTakeOverConfirm"
      :confirm-label="labels.lobbyTakeOver"
      :cancel-label="labels.trackerCancel"
      @confirm="doTakeOver"
      @close="takeOverConfirmOpen = null"
    />
    <!-- A guest asking to reopen its side after the host has moved on. The host answers here,
         and the answer is what the guest's waiting screen shows. -->
    <ConfirmModal
      v-if="pendingRequest"
      :title="labels.lobbyRequestTitle"
      :message="requestMessage"
      :confirm-label="labels.lobbyRequestAllow"
      :cancel-label="labels.lobbyRequestDeny"
      @confirm="grantReopen(pendingRequest.side)"
      @close="denyReopen(pendingRequest.side)"
    />
    <PartyModal
      v-if="partyOpen"
      @close="partyOpen = false"
    />

    <ScoreHelpModal
      v-if="scoreHelpOpen"
      @close="scoreHelpOpen = false"
    />

    <LayoutPickerModal
      v-if="layoutPickerOpen"
      :selected="settings.layout === 'custom' ? settings.customLayout : null"
      :matchup="{ you: players[0].disposition, opp: players[1].disposition }"
      @pick="onPickLayout"
      @close="layoutPickerOpen = false"
    />

    <OptionHelpModal
      v-if="forceTypeHelpOpen"
      :title="labels.trackerForceType"
      :text="labels.trackerForceTypeHelp"
      :link-to="DOUBLES_CHAPTER"
      :link-label="labels.trackerForceTypeHelpLink"
      @close="forceTypeHelpOpen = false"
    />

    <OptionHelpModal
      v-if="roleHelpOpen"
      :title="labels.trackerRole"
      :text="labels.trackerRoleHelp"
      @close="roleHelpOpen = false"
    />

    <BaseModal
      v-if="dpHelpOpen"
      :title="labels.trackerDpOverTitle"
      max-width="380px"
      @close="dpHelpOpen = false"
    >
      <div class="modal-body">
        <p class="dp-help-text">
          {{ labels.trackerDpOverText }}
        </p>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import BaseModal from '../BaseModal.vue'
import LayoutCard from '../event/LayoutCard.vue'
import LayoutTabs from './LayoutTabs.vue'
import { useMediaQuery } from '../../composables/useMediaQuery.js'
import MissionCard from '../event/MissionCard.vue'
import RuleBody from '../RuleBody.vue'
import TwistPickerModal from './TwistPickerModal.vue'
import DetachmentPickerModal from './DetachmentPickerModal.vue'
import FactionPickerModal from './FactionPickerModal.vue'
import SecondaryPickerModal from './SecondaryPickerModal.vue'
import MissionPickerModal from './MissionPickerModal.vue'
import ScoreHelpModal from './ScoreHelpModal.vue'
import ConfirmModal from '../ConfirmModal.vue'
import PartyModal from './PartyModal.vue'
import SyncIndicator from './SyncIndicator.vue'
import OptionHelpModal from './OptionHelpModal.vue'
import LayoutPickerModal from './LayoutPickerModal.vue'
import { useSetupLayout } from '../../composables/trackerLayout.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { getEventContent } from '../../data/eventCompanion.js'
import { useRoute, useRouter } from 'vue-router'
import { useLobby } from '../../composables/useLobby.js'
import { useParty } from '../../composables/useParty.js'
import { useTracker, DISPOSITIONS, BATTLE_SIZES, MIRROR_MISSIONS, derivePrimary, deriveForceType, missionBySlug, fixedPool, dispositionName } from '../../composables/useTracker.js'
import { FACTIONS, detachmentsFor, detachmentInfo } from '../../composables/trackerFactions.js'
import { rosterSnapshot } from '../../composables/rosterGameLink.js'
import RosterPickerModal from './RosterPickerModal.vue'
import TrackOptions from './TrackOptions.vue'
import { defaultTrackSettings, normalizeTrackSettings } from '../../data/trackerOptions.js'

// Where the Doubles terminology in the force-type help actually comes from — the Event
// Companion's Doubles chapter. A route object, not a string, so the locale guard can add
// the /ru prefix; the setup draft is persisted, so leaving the wizard for it is safe.
const DOUBLES_CHAPTER = { path: '/event-companion', hash: '#ec-chapter-doubles' }

// Two screens, one file. `wizard` is the host's four-step setup, as it always was; `guest` is
// what a phone that joined a LOBBY sees — the same army card and the same pickers, cut down to
// this phone's own side, with "Done" instead of "Next". A copy of this markup for the guest
// would have been a second place to fix every roster/faction/detachment bug found in the first.
const props = defineProps({
  mode: { type: String, default: 'wizard' },
})
const guest = computed(() => props.mode === 'guest')
const route = useRoute()
const router = useRouter()

const emit = defineEmits(['start', 'cancel', 'done', 'leave'])
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current, history, setupDraft, startLobby, closeLobby } = useTracker()

// Pre-fill "Your" name from the most recent finished game. New games mark the "You" player with
// isYou:true (possibly at index 1 if Opponent went first); fall back to index 0 for old games.
const lastGame = history.value[0]
const lastYouName = lastGame
  ? ((lastGame.players.find(p => p.isYou) ?? lastGame.players[0])?.name ?? '')
  : ''
// Default the score mode to the last game's choice (older games lack it → fall back to VP).
const lastScoreMode = history.value[0]?.settings?.scoreMode === 'bp' ? 'bp' : 'vp'
// What the game keeps track of: each option's own default, overridden by the last finished game's
// choice where the option remembers one. The table (trackerOptions.js) owns both, so a new option
// is added there and nothing here changes.
const lastS = history.value[0]?.settings ?? {}
// "You" is the side THIS phone plays — 0 in a setup of one and for the host, the seat for a
// guest. Keyed by side, never by index (the same rule the option table follows).
function playerLabel(i) {
  return i === youIdx.value ? labels.value.trackerYou : labels.value.trackerOpponent
}
function namePlaceholder(i) {
  return i === youIdx.value ? labels.value.trackerYourName : labels.value.trackerOpponentName
}

const dispositions = DISPOSITIONS
const MAX_FIXED = 2   // Fixed secondaries: choose 2, kept for the whole game.

// Defaults (also the shape merged over a restored draft so older drafts gain new fields).
function defaultMember() {
  return { name: '', factionSlug: null, detachments: [], rosterId: null, roster: null }
}
function defaultPlayer(role, name = '') {
  return {
    name, factionSlug: null, detachments: [], disposition: null, role, secondaryMode: 'tactical',
    fixedSecondaries: [], battleReady: false, rosterId: null, roster: null,
    // Doubles fields — inert in singles (makePlayer ignores them there).
    teamName: '', forceType: null, members: [defaultMember(), defaultMember()],
  }
}
const defaultSettings = { ...defaultTrackSettings(lastS), firstTurn: 1, layout: 'A', customLayout: null, battleSize: 'strikeForce', combatPatrol: false, gameType: 'singles', dpPerPlayer: null, twist: null, twistMission: null, scoreMode: lastScoreMode }

// WHERE THE FORM'S STATE LIVES. Normally in this component: a draft, persisted so it survives a
// reload. Once the setup is SHARED it lives in the game itself (`current`, phase 'setup') — and
// not as a copy: the wizard edits the very objects the game holds, so a slice arriving from the
// other phone lands in the fields on screen, with no bridge to keep in step. Everything below
// this line is unchanged by that: `players` and `settings` are the same two names either way.
// Read once, BEFORE the reset watchers are registered, so restoring a faction/detachments
// doesn't trip the faction-change reset.
const lobbyGame = current.value?.phase === 'setup' ? current.value : null
const draft = lobbyGame ? null : setupDraft.value
const step = ref(draft?.step ?? 1)
const players = lobbyGame
  ? lobbyGame.players
  : reactive([
    { ...defaultPlayer('attacker', lastYouName), ...(draft?.players?.[0]) },
    { ...defaultPlayer('defender'), ...(draft?.players?.[1]) },
  ])
const settings = lobbyGame ? lobbyGame.settings : reactive({ ...defaultSettings, ...(draft?.settings) })
const inLobby = computed(() => current.value?.phase === 'setup')

// ── The shared setup (useLobby.js / useParty.js) ───────────────────────────────────────────
// The wizard is also the host's lobby screen, and this same component in `guest` mode is what a
// joined phone fills in. Nothing below changes when the setup is played alone: `sharedSetup` is
// false, every gate answers "yours", and the buttons that share it are the only new things on
// screen.
const {
  shared: sharedSetup, mySide, isReady, editorName, canFill, claim,
  openForm, confirmSide, takeOver,
  pendingRequest, grantReopen, denyReopen,
  setStage, othersReady,
} = useLobby()
const { canShare, share, end: endParty, setHold, lastError, invite, refreshInvite } = useParty()

// Which side this phone plays: the host (and a solo setup) sits on 0, a guest on its seat.
const youIdx = computed(() => (sharedSetup.value ? mySide.value : 0))
const sides = computed(() => (guest.value ? [youIdx.value] : [0, 1]))
// `i` is the SIDE, not the position in the loop — a guest draws one card and it is side 1.
const shownPlayers = computed(() => sides.value.map((i) => ({ p: players[i], i })))

// The lobby is created from what the wizard already holds — the draft becomes the game, the
// same objects, so nothing is re-entered and nothing is copied.
const partyOpen = ref(false)
const cancelConfirmOpen = ref(false)
const takeOverConfirmOpen = ref(null) // the side whose editing is being taken over
// Called on arrival when the tracker home asked for a shared game (`?share=1`).
//
// A failure here used to be silent: the lobby closed and the reader was left in the ordinary
// wizard, with no way to tell that the button they pressed had not worked. The server carries
// the link between the phones, so there is no offline version of this — what there is instead
// is a line saying so, and a way to try again.
// The code on the lobby row. `invite` is module state in useParty, so it survives moving between
// steps; after a RELOAD it is empty until asked for, and the row would otherwise read "Link and
// code" forever on a lobby that has both.
const inviteCode = computed(() => {
  const c = invite.value?.code
  return c ? `${c.slice(0, 3)} ${c.slice(3)}` : ''
})

const shareError = ref('')
async function createLobby() {
  shareError.value = ''
  if (!canShare.value) { shareError.value = labels.value.partySignIn; return }
  clearDraft()
  startLobby({ settings, players })
  players[0].isYou = true
  players[1].isYou = false
  const ok = await share()
  if (!ok) {
    closeLobby()
    // A 401 is the one failure with an instruction attached: the session behind the account
    // went stale, so signing in again is the fix rather than "try again".
    shareError.value = String(lastError.value || '').includes('401')
      ? labels.value.partySignIn
      : labels.value.lobbyShareFailed
    return
  }
  claimHostSide() // the guest's phone sees who is filling what from the first tick
  partyOpen.value = true
}

// The host's way out of a lobby nobody joins: the party ends, the game goes back to being this
// phone's own setup, and every field stays where it was.
async function cancelLobby() {
  cancelConfirmOpen.value = false
  await endParty()
  closeLobby()
}

// Leaving the armies step confirms the host's own side and tells the other phones that
// reopening is now a request rather than a free edit.
function leaveArmiesStep() {
  if (sharedSetup.value) {
    confirmSide(youIdx.value)
    setStage('host')
  }
  step.value = 2
}
function backToArmiesStep() {
  if (sharedSetup.value) setStage('armies')
  step.value = 1
}

// The guest's screen: the form is open (its side is held back) until "Done".
function guestDone() {
  confirmSide(youIdx.value)
  emit('done')
}
function guestLeave() {
  emit('leave')
}
// A guest's form is open from the moment the screen appears: it claims the side (the slice
// version settles a tie) and holds this phone's own side back until "Done". The host claims its
// own side the same way, so the guest's phone can see who is filling what.
onMounted(async () => {
  // Asked for from the tracker home ("New shared game"): open the lobby straight away, so the
  // host arrives with the code in hand instead of a button to press. The query is dropped once
  // it has been acted on — a reload must not try to share a second time.
  // Optional chaining throughout: the component is mounted without a router in its own tests,
  // and a wizard that throws on mount is a blank tracker.
  if (route?.query?.share === '1') {
    router?.replace({ path: route.path, query: {} })
    if (!sharedSetup.value && canShare.value) await createLobby()
  }
  if (!sharedSetup.value) return
  if (guest.value) openForm(youIdx.value, players[youIdx.value]?.name || '')
  else {
    claimHostSide()
    if (!invite.value) refreshInvite()
  }
})
onUnmounted(() => { if (guest.value) setHold(false) })
function claimHostSide() {
  claim(youIdx.value, players[youIdx.value]?.name || '')
}
function doTakeOver() {
  const i = takeOverConfirmOpen.value
  takeOverConfirmOpen.value = null
  if (i == null) return
  takeOver(i, players[youIdx.value]?.name || '')
}
const requestMessage = computed(() => {
  const r = pendingRequest.value
  if (!r) return ''
  const who = r.name || labels.value.trackerOpponent
  return labels.value.lobbyRequestBody.replace('{name}', who)
})

// A side this phone is not filling in, in a SHARED setup: someone else holds it, so the card
// reports instead of asking. (A side nobody sits on is still the host's to fill, and stays a
// form — `editable` is what tells the two apart.)
function mirrored(i) {
  return sharedSetup.value && !editable(i)
}

// What that card says once the side is confirmed: the army, the list and the disposition, in the
// order the wizard asks for them. Built in script, never out of adjacent template fragments —
// whitespace between them is load-bearing (see the lint note in CLAUDE.md).
function sideSummary(i) {
  const p = players[i]
  if (!p) return []
  const out = []
  const armies = armiesOf(p)
  if (isDoubles.value && p.teamName) out.push(p.teamName)
  for (const m of armies) {
    const army = [m.name, factionName(m.factionSlug)].filter(Boolean).join(' · ')
    if (army) out.push(army)
    if (m.detachments?.length) out.push(m.detachments.join(', '))
    if (m.roster) out.push(`${labels.value.trackerRoster}: ${m.roster.name || labels.value.rosterUntitled}`)
  }
  // Only when it resolves to a name: a disposition id this build does not know (an older game,
  // a newer sender) would otherwise print a label with nothing after the colon.
  const disp = p.disposition ? dispositionName(p.disposition) : ''
  if (disp) out.push(`${labels.value.trackerDisposition}: ${disp}`)
  if (p.battleReady) out.push(labels.value.trackerBattleReady)
  // The step-2 card shows this report too, so the secondaries belong in it: which deck this side
  // plays is a fact about the game, not a control the host may touch.
  out.push(`${labels.value.trackerSecondaryMode}: ${p.secondaryMode === 'fixed' ? labels.value.trackerFixed : labels.value.trackerTactical}`)
  if (p.secondaryMode === 'fixed' && p.fixedSecondaries?.length) out.push(fixedSummary(p))
  return out
}

const oppOf = (i) => (i === 0 ? 1 : 0)
const dispositionOf = (i) => players[i]?.disposition || null

// One line per side, in the host's cards and on the guest's own: who holds it, and whether it
// is in. A side this phone edits says nothing — the fields under it are the answer.
function sideNote(i) {
  if (!sharedSetup.value) return ''
  if (isReady(i)) return labels.value.lobbySideReady
  if (editable(i)) return i === youIdx.value ? '' : labels.value.lobbySideYours
  // Held by someone whose name we have — worth saying. Held by someone we cannot name yet: the
  // card under this line already says, at length, that it is waiting.
  const who = editorName(i)
  return who ? labels.value.lobbySideFilling.replace('{name}', who) : ''
}

// The side this phone may type into: its own, or — for the host — any side no one else holds.
function editable(i) {
  return !sharedSetup.value || canFill(i)
}


// ── Doubles ────────────────────────────────────────────────────────────────────────────────
const isDoubles = computed(() => settings.gameType === 'doubles')
// The armies a side fields: itself in singles, its two members in doubles. The member shape is
// a subset of the side's (name/factionSlug/detachments/rosterId/roster), so the army-identity
// template block and every helper below take either.
function armiesOf(p) {
  return isDoubles.value ? p.members : [p]
}
// Army key for the picker modals (which army a modal is open for): side index + member index.
function ak(i, mi) {
  return `${i}:${mi}`
}
function derivedForceLabel(p) {
  const t = deriveForceType(p.members[0].factionSlug, p.members[1].factionSlug)
  return t ? ` (${t === 'unified' ? 'Unified' : 'Convenience'})` : ''
}

// Every faction now gets SOME form of the army-rule card during the game — an interactive
// counter/toggle/etc. for the ~11 factions with a registered spec, or a read-only reference
// (just the rule's own text) for the rest (see ArmyTrackerCard.vue's `kind: 'reference'`
// fallback). These two flags only control the setup checkbox's caption ("reference only, no
// counter" vs nothing extra) — resolved per player, lazily (the registry is dynamic-imported,
// same as the in-game card), whenever the picked factions change.
// They travel to TrackOptions inside `trackCtx` below, which is what decides which rows the
// block can offer at all.
const armyYouTrackable = ref(false)
const armyOppTrackable = ref(false)

// Either player having a list is enough: the clock belongs to the game, not to one side.
const anyRoster = computed(() => players.some((p) => armiesOf(p).some((m) => !!m.roster)))

// A side's faction for the option table: in doubles, the first member with one (the row's
// availability question is "does this side field an army at all", not "which").
function sideFaction(p) {
  return armiesOf(p).find((m) => m.factionSlug)?.factionSlug ?? null
}

// What the option table needs to know about this game, keyed by SIDE — in the wizard players[0]
// is always You, but once the game starts the array is reordered by first turn, so the block
// never indexes players itself.
const trackCtx = computed(() => ({
  you: { faction: sideFaction(players[0]), trackable: armyYouTrackable.value },
  opp: { faction: sideFaction(players[1]), trackable: armyOppTrackable.value },
  anyRoster: anyRoster.value,
}))
watch(
  () => players.map(p => armiesOf(p).map(m => m.factionSlug).join(',')).join('|'),
  async () => {
    const { resolveArmyTracker } = await import('../../data/armyTrackers/index.js')
    const trackable = (p) => armiesOf(p).some((m) => m.factionSlug && resolveArmyTracker(m.factionSlug))
    armyYouTrackable.value = trackable(players[0])
    armyOppTrackable.value = trackable(players[1])
  },
  { immediate: true },
)

const battleSizes = BATTLE_SIZES
const maxDp = computed(() => BATTLE_SIZES.find(b => b.id === settings.battleSize)?.maxDp ?? 3)
// The budget ONE army must fit in: the battle size's in singles; per player in doubles (the
// battle size's by default, or the organiser's own via settings.dpPerPlayer — null = follow).
const memberMaxDp = computed(() => (isDoubles.value ? (settings.dpPerPlayer ?? maxDp.value) : maxDp.value))

// Twists — optional pre-game modifiers (names English; localized prose from the data).
const twistList = computed(() => getEventContent(locale.value).twists.blocks)
const mirrorMissions = MIRROR_MISSIONS
function setTwist(id) {
  settings.twist = id
  if (id !== 'mirrored-world') settings.twistMission = null
}
function randomMirror() {
  const m = mirrorMissions[Math.floor(Math.random() * mirrorMissions.length)]
  settings.twistMission = m ? m.slug : null
}

// Mirrored World shared-mission picker modal (choose one of the 5, or randomize).
const mirrorPickerOpen = ref(false)
const mirrorModalMissions = computed(() => mirrorMissions.map(m => missionBySlug(m.slug, null, locale.value)))
const mirrorSummary = computed(() =>
  settings.twistMission
    ? (missionBySlug(settings.twistMission, null, locale.value)?.name || settings.twistMission)
    : labels.value.trackerSelect
)
function onPickMirror(slug) { settings.twistMission = slug; mirrorPickerOpen.value = false }
function onRandomMirror() { randomMirror(); mirrorPickerOpen.value = false }
function randomTwist() {
  const ids = twistList.value.map(t => t.id)
  const id = ids[Math.floor(Math.random() * ids.length)]
  setTwist(id)
  if (id === 'mirrored-world') randomMirror()
}

const scoreHelpOpen = ref(false)
const dpHelpOpen = ref(false)
const forceTypeHelpOpen = ref(false)
const roleHelpOpen = ref(false)
// Step 3's two-column desktop layout (`.two-col`, >700px): the layout tabs move into the side
// column there, and the SAME breakpoint decides it in script so the tabs are drawn once.
const desk = useMediaQuery('(min-width: 701px)')

// Twist picker modal (full-screen on mobile).
const twistPickerOpen = ref(false)
const chosenTwist = computed(() => twistList.value.find(t => t.id === settings.twist) || null)
function onPickTwist(id) { setTwist(id); twistPickerOpen.value = false }
function onRandomTwist() { randomTwist(); twistPickerOpen.value = false }
function onNoTwist() { setTwist(null); twistPickerOpen.value = false }

const stepLabel = computed(() => [
  labels.value.trackerStepArmies, labels.value.trackerStepMission,
  labels.value.trackerStepBattlefield, labels.value.trackerStepDeploy,
][step.value - 1])

// On step change: return to the top (Next/Back sit at the bottom of long panels) and
// replay the panel's entrance animation. Panels use v-show (all stay mounted), so the
// animation is re-triggered by re-adding the class after a forced reflow.
const panelEls = []
watch(step, async (n) => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
  // 'instant', not 'auto': the global `html { scroll-behavior: smooth }` makes 'auto'
  // scroll smoothly anyway, which would defeat the reduced-motion branch.
  window.scrollTo({ top: 0, behavior: reduced ? 'instant' : 'smooth' })
  await nextTick()
  const el = panelEls[n - 1]
  if (!el) return
  el.classList.remove('wizard-in')
  void el.offsetWidth
  el.classList.add('wizard-in')
})

function factionName(slug) {
  return FACTIONS.find(f => f.slug === slug)?.name || ''
}

// Combat Patrol box content (rule name, fixed Force Disposition, box name/DP) — dynamically
// imported (heavy, datasheet-bearing file) only once "Тип игры" is set to Combat Patrol, same
// "heavy data file, dynamic import" rule as everywhere else in this codebase. `name`/`slug`/
// `forceDisposition`/`boxName` are locale-agnostic structural fields, so the EN list is enough
// here regardless of the app's current locale.
const combatPatrolData = ref(null)
async function loadCombatPatrolData() {
  if (combatPatrolData.value) return combatPatrolData.value
  const { combatPatrol } = await import('../../data/combatPatrol.js')
  combatPatrolData.value = combatPatrol.en.factions
  return combatPatrolData.value
}
if (settings.combatPatrol) loadCombatPatrolData()   // restored draft already in CP mode

function cpFactionFor(p) {
  return combatPatrolData.value?.find(f => f.slug === p.factionSlug) || null
}

// Single source of truth for a player's detachment/disposition, re-derived whenever their
// faction OR the game type changes: taken from an attached roster, cleared for a normal game
// (manual pick downstream), or auto-resolved from the CP box's one fixed detachment + Force
// Disposition — no manual steps.
async function resolveArmyChoice(p) {
  // An attached list describes ONE army. Switching the player to another faction makes it a
  // description of something else, so it detaches rather than lingering as a wrong label. Step 1
  // no longer offers that switch — the list stands in the picker's place and you detach first —
  // so this now only catches a restored draft whose two halves are out of step.
  if (p.roster && p.roster.faction !== p.factionSlug) { p.roster = null; p.rosterId = null }
  p.detachments = []
  p.disposition = null
  if (!p.factionSlug) return
  if (settings.combatPatrol) {
    // The box decides the army here, so a list attached before the switch describes a different
    // game — it goes rather than lingering as a label the screen no longer offers.
    p.roster = null
    p.rosterId = null
    const list = await loadCombatPatrolData()
    const cp = list.find(f => f.slug === p.factionSlug)
    if (!cp) return
    p.detachments = [cp.rule.name]
    p.disposition = DISPOSITIONS.find(d => d.name === cp.forceDisposition)?.id ?? null
    return
  }
  // A roster is built against its detachments (its enhancements and legality depend on them), so
  // it dictates them here instead of being checked against a separate pick. Beyond the DP budget
  // is possible in principle; the budget readout flags it exactly as a manual pick would.
  if (p.roster?.detachments?.length) p.detachments = [...p.roster.detachments]
}

// The three mutually exclusive game modes of the seg above: standard singles, doubles
// (Warhammer Doubles Event Companion), Combat Patrol. Doubles is competitive-only —
// the companion modifies the standard mission sequence, and a CP box has one fixed army.
const modeLocked = computed(() => sharedSetup.value)
function setGameMode(mode) {
  // Singles ↔ doubles moves what a SEAT means (a side, or one member of a team), so it is
  // settled before anyone is invited. The buttons are disabled with that as their reason.
  if (modeLocked.value) return
  const wasDoubles = isDoubles.value
  const toCp = mode === 'combatPatrol'
  settings.gameType = mode === 'doubles' ? 'doubles' : 'singles'
  if (settings.combatPatrol !== toCp) {
    settings.combatPatrol = toCp
    if (toCp) { settings.twist = null; settings.twistMission = null }
    players.forEach(p => resolveArmyChoice(p))
  }
  // Entering doubles: the army already picked on the side card becomes member 1's — the
  // person filling the form is not asked to re-enter what they just typed. Side fields are
  // left in place (hidden in doubles, and still there if they switch back).
  if (!wasDoubles && mode === 'doubles') {
    players.forEach(p => {
      const m = p.members[0]
      if (m.factionSlug || m.roster || m.name) return
      m.name = p.name
      m.factionSlug = p.factionSlug
      m.detachments = [...p.detachments]
      m.rosterId = p.rosterId
      m.roster = p.roster
    })
  }
}

function toggleFixed(p, slug) {
  const i = p.fixedSecondaries.indexOf(slug)
  if (i >= 0) p.fixedSecondaries.splice(i, 1)
  else if (p.fixedSecondaries.length < MAX_FIXED) p.fixedSecondaries.push(slug)
}

// Fixed-secondary picker modal — open for player index (-1 = closed). Lists the
// localized full mission cards so their text can be read before choosing.
const fixedPickerFor = ref(-1)
// Army-scoped pickers are keyed by ak(side, member) — '' = closed (see armiesOf/ak above).
const detPickerKey = ref('')
const factionPickerKey = ref('')
const rosterPickerKey = ref('')

// Attaching a roster is what DECIDES the army, so it sets the faction (and, through the faction
// watcher, resolveArmyChoice's detachments) rather than being validated against an earlier pick.
// Same faction already selected → no watcher fires, so re-derive here.
function pickRoster(p, roster) {
  p.rosterId = roster.id || null
  p.roster = rosterSnapshot(roster)
  rosterPickerKey.value = ''
  if (roster.faction && p.factionSlug !== roster.faction) p.factionSlug = roster.faction
  else resolveArmyChoice(p)
}

// Detaching leaves the faction and detachments alone — they are legitimate choices in their own
// right, and clearing them would undo a step the player may have made by hand.
// Combat Patrol has no list to show: the box IS the army, and `resolveArmyChoice` detaches
// whatever was attached on the way in. This is what keeps the label, the line and the button
// agreeing about that in one place rather than three.
function attached(m) {
  return !!m.roster && !settings.combatPatrol
}

function clearRoster(p) {
  p.rosterId = null
  p.roster = null
  rosterPickerKey.value = ''
}

// Faction is single-select: picking one applies it and closes the modal immediately.
function selectFaction(p, slug) {
  p.factionSlug = slug
  factionPickerKey.value = ''
}
const fixedModalMissions = computed(() => {
  if (fixedPickerFor.value < 0) return []
  const role = players[fixedPickerFor.value].role
  return fixedPool(role).map(m => missionBySlug(m.slug, role, locale.value))
})
function fixedSummary(p) {
  if (!p.fixedSecondaries.length) return labels.value.trackerSelect
  return p.fixedSecondaries.map(slug => missionBySlug(slug, p.role, locale.value)?.name || slug).join(', ')
}

function detSummary(p) {
  if (!p.detachments.length) return labels.value.trackerChooseDetachments
  return p.detachments.join(', ')
}

function dpSpent(p) {
  return p.detachments.reduce((s, name) => s + (detachmentInfo(p.factionSlug, name)?.dp || 0), 0)
}
function candidateDispositions(p) {
  // Combat Patrol: exactly one, fixed disposition — already resolved onto p.disposition by
  // resolveArmyChoice, just echo it back in the shape the step-2 template expects.
  if (settings.combatPatrol) return p.disposition ? [p.disposition] : []
  // Doubles: one disposition per TEAM, "available to either of the armies in that team"
  // (companion, Muster step) — so the candidates are the union over the side's armies.
  const ids = armiesOf(p).flatMap(m => m.detachments
    .map(name => detachmentInfo(m.factionSlug, name)?.forceDisposition)
    .filter(Boolean)
    .map(name => DISPOSITIONS.find(d => d.name === name)?.id)
    .filter(Boolean))
  return [...new Set(ids)]
}
function setRole(idx, role) {
  // Roles are linked: the two players are always opposite (one attacker, one defender).
  players[idx].role = role
  players[idx === 0 ? 1 : 0].role = role === 'attacker' ? 'defender' : 'attacker'
}
function toggleDetachment(p, d) {
  const i = p.detachments.indexOf(d.name)
  if (i >= 0) p.detachments.splice(i, 1)
  // You can always include at least one detachment (even over budget); further
  // detachments must fit within the army's DP budget (per player in doubles).
  else if (p.detachments.length === 0 || dpSpent(p) + d.dp <= memberMaxDp.value) p.detachments.push(d.name)
}

// Changing faction resets its detachment/disposition choices (or, in Combat Patrol mode,
// re-resolves them from the newly picked box — see resolveArmyChoice). Members get the same
// watcher: their army-identity fields behave exactly like the side's own (inert in singles).
//
// ONLY for a side this phone is filling in. On the other side the faction does not "change" —
// it ARRIVES, in a slice the other player just confirmed, and re-deriving from it wiped the
// detachment and the disposition that came with it. The host then held a side its owner never
// described, and would have sent that back (it may write any slice). A phone reacts to what it
// types, never to what it is told.
players.forEach((p, i) => {
  watch(() => p.factionSlug, () => { if (editable(i)) resolveArmyChoice(p) })
  p.members.forEach(m => watch(() => m.factionSlug, () => { if (editable(i)) resolveArmyChoice(m) }))
})

// Shrinking the DP budget (battle size, or doubles' per-player override) can invalidate the
// chosen detachments' DP, so clear every army's detachments (and the side dispositions) for a
// fresh pick.
watch(memberMaxDp, (next, prev) => {
  if (next >= prev || guest.value) return
  players.forEach((p, i) => {
    if (!editable(i)) return // a side another phone described is not this one's to empty
    armiesOf(p).forEach(m => { m.detachments = [] })
    p.disposition = null
  })
})

function factionHasDetachments(p) {
  return !!p.factionSlug && detachmentsFor(p.factionSlug).length > 0
}

// Disposition is derived from the chosen detachment(s); it's gated until one is picked. Same
// rule as the faction watcher above: the other side's disposition is reported, not derived.
players.forEach((p, i) => watch(() => candidateDispositions(p), (ids) => {
  if (!editable(i)) return
  if (ids.length === 0) {
    if (factionHasDetachments(p)) p.disposition = null   // no detachment chosen → no disposition yet
    return                                               // detachment-less faction keeps its manual value
  }
  if (!ids.includes(p.disposition)) p.disposition = ids[0]
}, { deep: true }))

// Step-2 recap line under the side heading: who fields what. The doubles team name is NOT
// here — it rides in the heading itself (the muted .ph-team span above), so this line is the
// members alone. Built in script, never from adjacent template fragments (see the lint note
// in CLAUDE.md — inline whitespace is load-bearing there).
function armySummary(p, i) {
  if (!isDoubles.value) return `${p.name || playerLabel(i)} — ${factionName(p.factionSlug)}`
  return p.members
    .map(m => [m.name, factionName(m.factionSlug)].filter(Boolean).join(': '))
    .filter(Boolean)
    .join(' · ')
}

function primaryName(i) {
  const me = players[i], opp = players[i === 0 ? 1 : 0]
  if (!me.disposition || !opp.disposition) return ''
  // Mirror the twist-aware derivation used when the game is created, so the preview
  // reflects Scrambled Communications / Mirrored World.
  const m = derivePrimary(me.disposition, opp.disposition, settings)
  return m ? m.name : ''
}

// Full localized primary-mission cards for the step-2 preview (one per player).
const primaryCards = computed(() => players.map((p, i) => {
  const opp = players[i === 0 ? 1 : 0]
  if (!p.disposition || !opp.disposition) return null
  const m = derivePrimary(p.disposition, opp.disposition, settings)
  return m ? missionBySlug(m.slug, null, locale.value) : null
}))

// Switching back to tactical drops any chosen fixed missions.
players.forEach((p, i) => watch(() => p.secondaryMode, (m) => {
  if (editable(i) && m !== 'fixed') p.fixedSecondaries = []
}))

// The recommended layouts for the current Force Disposition matchup (15 matchups
// cover all pairs, including mirrors). Reset the choice to A whenever it changes.
const { matchup, layouts, currentLayout, layoutPickerOpen, selectLayout, onPickLayout } =
  useSetupLayout(settings, () => [players[0].disposition, players[1].disposition])
// Changing dispositions changes the recommended matchup → reset to A and drop any custom pick.
// The layout is the host's (the shared slice): a guest whose disposition changes must not
// reset it from the other phone.
watch(matchup, () => { if (guest.value) return; settings.layout = 'A'; settings.customLayout = null })

// Step 1 (Armies): every army (each side in singles, all four members in doubles) has a
// faction + a detachment where the faction has them.
function armiesOkFor(p) {
  return armiesOf(p).every(m =>
    m.factionSlug &&
    (settings.combatPatrol
      ? m.detachments.length > 0
      : (detachmentsFor(m.factionSlug).length === 0 || m.detachments.length > 0))
  )
}
// Only the sides THIS phone fills in. In a lobby the other one is somebody else's job and may
// be empty for another ten minutes — gating the step on it is the same mistake as gating it on
// their "Done": it kept the host away from its own disposition, which is on the next step.
// Nothing is lost by walking on, because what needs both sides (the primary, the layout, the
// start) has gates of its own further down.
const canArmies = computed(() =>
  players.every((p, i) => (sharedSetup.value && !editable(i)) || armiesOkFor(p)),
)

// Step 2 (Mission): dispositions resolved (→ a primary for each) + fixed picks chosen
// where in fixed mode.
function missionOkFor(p) {
  return !!p.disposition && (p.secondaryMode !== 'fixed' || p.fixedSecondaries.length > 0)
}
// Both sides, deliberately: the primary mission IS the pair of dispositions, and the layouts on
// the next step are the pair's matchup. This is the point where the other side genuinely has to
// be in, and the button says so.
//
// `othersReady` as well as the dispositions, because a side that REOPENS keeps the disposition it
// had: the slice stays, only the "done" goes. Without this the gate read as passed while the guest
// was busy re-choosing the very thing the primary is made of (owner, 2026-09-24). Outside a lobby,
// and for a side the host fills itself, `othersReady` is true and nothing changes.
const canMission = computed(() =>
  canArmies.value &&
  othersReady.value &&
  players.every(missionOkFor) &&
  !!primaryName(0) && !!primaryName(1)
)
// What a guest's "Done" waits for: ITS side only. The primary preview needs both dispositions
// and the other one may not be in yet — that is the host's gate, never this phone's.
const canConfirmSide = computed(() => {
  const p = players[youIdx.value]
  return !!p && armiesOkFor(p) && missionOkFor(p)
})

// A side that reopens un-answers what the later steps were built on — the primary is its
// disposition paired with ours, and the layout is that matchup. So the host comes back to the
// mission step and waits there, instead of standing on the battlefield step over a game that has
// changed underneath it (owner, 2026-09-24). A watch rather than something bolted onto the
// "allow" button, because a guest can also reopen without asking while the lobby is still on the
// armies stage, and a guest joining a side the host had been filling has the same effect. Never
// forward: a host on step 1 stays there.
watch(othersReady, (now, was) => { if (was && !now && step.value > 2) step.value = 2 })

// The primary is the PAIR of dispositions, so while the other side is being re-filled BOTH
// previews are provisional. Say that instead of printing a mission that is about to change.
const primaryFinal = computed(() => !sharedSetup.value || othersReady.value)

// Step 3 (Field & deployment): layout and first turn both always have a default → gate only
// on the earlier steps.
const canBattlefield = computed(() => canMission.value)

// The step chips in the header. A step is reachable when every step before it is complete —
// exactly what its Next button checks — so jumping ahead from the chips is never a way around
// a gate. Going back is always allowed.
const STEPS = [
  { n: 1, label: 'trackerStepArmies' },
  { n: 2, label: 'trackerStepMission' },
  { n: 3, label: 'trackerStepBattlefield' },
  { n: 4, label: 'trackerStepDeploy' },
]
function canGoTo(n) {
  if (n <= step.value) return true
  if (n === 2) return canArmies.value
  if (n === 3) return canMission.value
  return canBattlefield.value
}

// Step 4 (Settings): every row has a default — gate on the earlier steps too.
const canStart = computed(() =>
  canMission.value && players.every(p => p.role) && othersReady.value
)

// Persist the in-progress setup so it survives reloads / navigating away. Serialized
// snapshot (deep, post-flush) — no loop since this watch doesn't read setupDraft.
watch([step, () => players, () => settings], () => {
  // A shared setup IS the game and is persisted as one — writing a draft beside it would
  // resurrect a stale copy the next time the tracker opens. Computed, not the `lobbyGame`
  // constant: the lobby can be created from this very screen, mid-session.
  if (inLobby.value) return
  setupDraft.value = JSON.parse(JSON.stringify({ step: step.value, players, settings }))
}, { deep: true, flush: 'post' })

function clearDraft() { setupDraft.value = null }

function start() {
  clearDraft()
  emit('start', {
    // Rows this game cannot offer are written OFF rather than at whatever the last game left in
    // them — the checkbox was disabled, so the value behind it was never the player's answer.
    settings: normalizeTrackSettings(settings, trackCtx.value),
    players: players.map(p => ({ ...p })),
  })
}
function cancel() {
  clearDraft()
  emit('cancel')
}
</script>

<style scoped>
/* Entrance replayed on each step change (class re-added from the step watcher). */
.wizard-in {
  animation: wizard-in var(--motion-med) ease-out;
}
@keyframes wizard-in {
  from { opacity: 0; transform: translateY(8px); }
}

.setup-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid var(--accent);
}
.setup-title {
  font-family: var(--font-display);
  font-size: 1.65rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
}
.steps {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.step {
  font: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-dim);
  padding: 0.25rem 0.6rem;
  border: 1px solid var(--border);
  background: none;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}
@media (hover: hover) { .step:not(:disabled):not(.on):hover { border-color: var(--accent); color: var(--accent); } }
.step:disabled { cursor: default; opacity: 0.55; }
.step.on {
  color: #fff;
  background: var(--accent);
  border-color: var(--accent);
  cursor: default;
}
.step.done {
  color: var(--accent);
  border-color: var(--accent);
}
.step-sep { color: var(--text-dim); }
.steps-compact {
  display: none;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--accent);
}
@media (max-width: 560px) {
  .steps { display: none; }
  .steps-compact { display: block; }
}
/* The gap between the two army cards, and — since the twist block on step 2 stands directly above
   them — the space under it too. One custom property so the two can't drift apart: without it the
   twist card sat flush against "You" and read as part of it. */
.setup { --stack-gap: 1rem; }
/* A guest fills in ONE side, so its cards are one column at every width — and the second panel's
   card is the bottom half of the first: the border between them goes, and so does the gap. */
.setup-guest .players { grid-template-columns: minmax(0, 1fr); }
.player-card.pc-joined {
  border-top: 0;
  margin-top: calc(-1 * var(--stack-gap));
  /* Not zero: the seam is invisible, but the first heading of this half still needs the air a
     heading gets anywhere else — without it "Force Disposition" sits on the Battle Ready box. */
  padding-top: 0.55rem;
}
.players {
  display: grid;
  /* minmax(0, …), not 1fr: a grid item's automatic minimum is its MIN-CONTENT width, and the
     roster line inside a card is `white-space: nowrap` (it ellipsizes). Nowrap makes its
     min-content the whole string, so a long list name — "We build thick city on rock and roll" —
     pushed the card wider than the screen and the whole page scrolled sideways. The ellipsis never
     got a chance: it only clips a box that was allowed to be narrower than its text. */
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: var(--stack-gap);
}
.twist-block { margin-bottom: var(--stack-gap); }
.player-card,
.settings {
  /* --pc-pad drives the padding AND the negative margin the mission preview uses to bleed
     full-width (see .primary-card) — keep them in lockstep across the breakpoints below. */
  --pc-pad: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: var(--pc-pad);
}
.settings {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  align-items: flex-end;
}
/* Drop the field's bottom margin here so the First Turn control and the Track CP
   checkbox card sit on the same baseline (no vertical offset). */
.settings .field { margin-bottom: 0; }
/* Narrow screens: the container padding (especially with the nested MissionCard in the Mission
   step) wastes a lot of the limited width — tighten it and the inter-card gap. */
@media (max-width: 560px) {
  .setup { --stack-gap: 0.55rem; }
  .player-card,
  .settings { --pc-pad: 0.6rem; }
}
@media (max-width: 380px) {
  .player-card,
  .settings { --pc-pad: 0.5rem; }
}
/* A control card whose fields stack, each on its own line (steps 3 and 4). */
.deploy-opts {
  flex-direction: column;
  align-items: stretch;
  gap: 0.9rem;
}
.layout-block {
  display: block;
}
/* Steps 3 and 4 on desktop: two columns, the same threshold the player cards of steps 1–2 use,
   so each step fits one screen the way those do. Below it the same DOM simply stacks. */
.two-col {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: var(--stack-gap);
  align-items: start;
}
.two-col > .settings { margin-top: 0; }
/* On a phone the two deployment questions share one row — each is a label over a two-word
   switch, and a column of them spent two rows on what fits in one. They still wrap on a screen
   too narrow for the pair (~330px). Desktop keeps them stacked in the side column. */
@media (max-width: 700px) {
  .deploy-card { flex-direction: row; flex-wrap: wrap; gap: 0.9rem 1.25rem; }
  .deploy-card .field { flex: 1 1 9rem; min-width: 0; }
  .deploy-card .seg { display: flex; width: 100%; }
  .deploy-card .seg button { flex: 1 1 auto; text-align: center; }
}
@media (min-width: 701px) {
  .two-col { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  /* The layout is the picture, so it takes two thirds and the questions one; DOM order is
     questions first (a phone reads them before the picture), the grid puts the picture left. */
  .deploy-grid { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); }
  .deploy-grid .layout-block { order: -1; }
  /* The picture is what made this step scroll: cap it to what the screen has left after the
     chrome — header 96px, the title/stepper row, the card's padding, the caption under the
     picture, the Back/Next row and the page's bottom padding, ~23rem all told now that the
     heading, hint and tabs live in the side column. Narrower than the card, centred; the full
     size is still one click away. */
  .layout-block :deep(.layout-card .layout-img) {
    width: auto;
    max-width: 100%;
    max-height: max(260px, calc(100dvh - 23rem));
    margin: 0 auto;
  }
}
.block-head {
  font-family: var(--font-display);
  font-size: 1.21rem;
  font-weight: 500;
  color: var(--accent);
  margin: 0 0 0.3rem;
}
.deploy-card .layout-note { margin: 0.4rem 0 0; }
.deploy-card .layout-tabs { margin-bottom: 0; }
.layout-note {
  margin: 0 0 0.75rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  font-style: italic;
}
.army-summary {
  margin: -0.3rem 0 0.75rem;
  font-size: 0.82rem;
  color: var(--text-muted);
}
.player-head {
  font-family: var(--font-display);
  font-size: 1.21rem;
  font-weight: 500;
  color: var(--accent);
  margin-bottom: 0.75rem;
}
/* The team name beside "You"/"Opponent" in a step-2 heading — muted so the fixed side label
   stays the anchor and the free-text name cannot be mistaken for part of it. */
.ph-team {
  color: var(--text-muted);
  font-weight: 400;
  font-size: 0.85em;
}
/* Doubles: one bordered sub-box per member inside the team card — the frame does the grouping
   work (square-corner house style: a surface is told from its background by the border). */
.member-block {
  border: 1px solid var(--border);
  padding: 0.6rem;
  margin-bottom: 0.7rem;
}
.member-block .field:last-child { margin-bottom: 0; }
.member-head {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-muted);
  margin: 0 0 0.5rem;
}
/* 0.55rem between stacked fields — the step the faction pages settled on for a control and the
   thing under it. At 0.7 the setup card spent a row of the phone's first screen on gaps alone,
   and this is the screen a player fills in at the table with the opponent waiting. */
.field {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.55rem;
}
.field input[type="text"],
.field select {
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: var(--font-sans);
}
/* iOS auto-zooms when a focused input's font is < 16px — bump to 16px on
   touch devices only, leaving the desktop sizing untouched. */
.dp-count {
  font-style: normal;
  font-family: var(--font-mono);
  color: var(--accent);
  font-weight: 700;
  margin-left: 0.3rem;
}
.dp-count.over { color: var(--danger); }
.seg-thirds {
  align-items: flex-start;
  margin-bottom: 1rem;
}
.seg-thirds .seg { flex-wrap: wrap; justify-content: flex-start; }
/* Three same-weight options is one too many for the flex-wrap pill row on narrow phones:
   each button keeps its own (very different) content width, so they wrap 2+1 with a ragged
   empty cell — reads as broken rather than just narrow. A 3-column grid of equal-width
   tiles uses the width evenly instead. Applies to both three-option segs of this step —
   both carry .seg-thirds for exactly this treatment. */
@media (max-width: 560px) {
  .seg-thirds .seg {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }
  .seg-thirds .seg button {
    padding: 0.4rem 0.3rem;
    text-align: center;
    white-space: normal;
    line-height: 1.25;
  }
  .seg-thirds .seg button + button { border-left: 1px solid var(--border); }
}
@media (max-width: 380px) {
  .seg-thirds .seg button { font-size: 0.72rem; }
}
/* A battle-size button is two deliberate lines — the name, then the numbers under it in
   small print — instead of one long string breaking wherever the width says. */
.bs-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1rem;
}
.bs-sub {
  font-size: 0.72rem;
  font-weight: 500;
  opacity: 0.85;
}
/* Label beside the control, not above it (the doubles DP-per-player row): three short
   buttons leave the row half-empty, and vertical space is the scarce axis on a phone. */
.field-inline {
  flex-direction: row;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
}

.btn-choose-twist {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  width: 100%;
  min-height: 44px;
  padding: 0.6rem 0.85rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: border-color 0.15s;
}
.btn-choose-twist:hover { border-color: var(--accent); }
.ct-name.placeholder { color: var(--text-muted); font-weight: 500; }
.ct-chev { color: var(--text-dim); }
.twist-chosen {
  margin-top: 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
}
.twist-chosen > summary {
  cursor: pointer;
  padding: 0.5rem 0.7rem;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}
.twist-chosen-body { padding: 0 0.7rem 0.6rem; font-size: 0.86rem; line-height: 1.5; }
.twist-mission { margin-top: 0.8rem; }
.dp-help-text { margin: 0; font-size: 0.88rem; line-height: 1.5; color: var(--text-muted); }
.det-empty { font-size: 0.82rem; color: var(--text-dim); font-style: italic; margin: 0.25rem 0 0; }

/* The faction control and "attach a list" share a row; the button stretches to whichever of the
   two is beside it (the picker is min-height 44px, the attached line is shorter) instead of
   carrying a height of its own. */
.faction-row { display: flex; align-items: stretch; gap: 0.4rem; }
.faction-row > .btn-choose-twist,
.faction-row > .roster-line { flex: 1; min-width: 0; }
.rp-open {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 44px; padding: 0 0.7rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary); color: var(--text-muted);
  font-size: 1rem; cursor: pointer;
}
.rp-open:hover { border-color: var(--accent); color: var(--text-primary); }
.rp-open.on { border-color: var(--accent); color: var(--accent); }
/* Stands where the faction picker would be, so it keeps `.ro`'s shape and only adds the ✕. */
.roster-line { display: flex; align-items: center; gap: 0.5rem; }
.rl-text { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rl-clear {
  flex-shrink: 0; background: none; border: none; color: var(--text-muted);
  font-size: 0.9rem; line-height: 1; cursor: pointer; padding: 0.25rem 0.3rem;
}
.rl-clear:hover { background: color-mix(in srgb, var(--text-primary) 8%, transparent); color: var(--text-primary); }
.chips { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.chip {
  padding: 0.3rem 0.55rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-muted);
  font-size: 0.74rem;
  cursor: pointer;
}
.chip.on { background: var(--accent); color: #fff; border-color: var(--accent); }
.chip:disabled { opacity: 0.4; cursor: not-allowed; }
.ro {
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  color: var(--text-muted);
  font-size: 0.9rem;
}
/* A seg whose options may not fit one row (doubles: up to 5 candidate dispositions, the
   force-type trio). Buttons GROW to fill each wrapped row — a lone option in the last row
   becomes a full-width button, so a ragged empty cell cannot exist. Dividers come from the
   1px gap over the border-coloured background, which stays correct in both directions when
   rows wrap (the plain seg's button+button left border does not). */
.seg-fill {
  flex-wrap: wrap;
  width: 100%;
  gap: 1px;
  background: var(--border);
}
.seg-fill button {
  flex: 1 1 auto;
  text-align: center;
  white-space: normal;
  line-height: 1.25;
}
.seg-fill button + button { border-left: none; }
/* Balanced rows by COUNT, not by whatever width the names happen to have: exactly four
   options break 2+2, exactly five break 3+2 (a 3+1 or 4+1 split reads as an accident even
   with the stretch). :has(:nth-child(N):last-child) is "exactly N children" — same :has()
   the app already leans on elsewhere, within the Safari 16.2 floor. The basis percentages
   only cap how many fit a row; flex-grow still stretches each row to full width. */
.seg-fill:has(> button:nth-child(4):last-child) > button { flex-basis: 34%; }
.seg-fill:has(> button:nth-child(5):last-child) > button { flex-basis: 26%; }
.seg-fill:has(> button:nth-child(5):last-child) > button:nth-child(n + 4) { flex-basis: 36%; }
/* Checkbox rows styled like the mission scoring conditions (ScoringModal .m-cond). */
.br-check { margin-top: 0.2rem; }
/* The lobby's one line per card: whose side this is and whether it is in. Reads as an
   annotation under the heading, never as a control. */
.share-error {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0 0 0.9rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--danger);
  background: color-mix(in srgb, var(--danger) 8%, transparent);
  font-size: 0.85rem;
  color: var(--text-primary);
}
.se-retry { margin-left: auto; }
.side-note {
  margin: -0.15rem 0 0.6rem;
  font-size: 0.78rem;
  color: var(--text-muted);
}
.side-note.ok { color: var(--accent); }
.side-takeover { margin-top: 0.7rem; }
/* The lobby's own row, under the step navigation: text, not buttons with frames, so it reads as
   an annotation to the party rather than a third and fourth way forward. Same recipe as the
   tracker home's quiet row. */
/* Tight against the cards above it and against the navigation below: the strip is a footnote —
   the code to read out and the way to close the lobby — and on a phone the band it used to sit in
   cost about 40px of the first screen (owner, 2026-09-24). What shrank is the air around it; the
   two buttons keep their 44px, which is the one thing a finger needs. */
.lobby-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0 1.1rem;
  margin-top: 0.35rem;
  margin-bottom: -0.35rem; /* the navigation below brings its own top margin */
}
.lobby-q {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 44px;
  padding: 0.35rem 0.2rem;
  background: none;
  border: none;
  font: inherit;
  font-size: 0.85rem;
  color: var(--text-muted);
  cursor: pointer;
}
@media (hover: hover) {
  .lobby-q:hover { color: var(--accent); }
}

/* The other side's card while another phone holds it: a waiting line, then what it sent. */
.side-mirror { padding: 0.2rem 0 0.1rem; }
.sm-waiting {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--text-muted);
}
.sm-dot {
  flex: 0 0 auto;
  width: 8px;
  height: 8px;
  background: var(--accent);
  animation: sm-pulse 2s ease-in-out infinite;
}
@keyframes sm-pulse {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .sm-dot { animation: none; opacity: 0.8; }
}
.sm-lines {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.25rem;
  font-size: 0.9rem;
  color: var(--text-primary);
}
.sm-lines li:first-child { font-weight: 600; }
/* Why the primary is not here yet. Same weight as the other muted explanations on this screen. */
.primary-pending {
  margin: 0.6rem 0 0;
  font-size: 0.82rem;
  line-height: 1.45;
  color: var(--text-dim);
  font-style: italic;
}
/* A seg whose answer is settled (the game type, once phones have joined): dimmed as a whole
   rather than each button carrying its own disabled look. */
.seg.locked { opacity: 0.55; }
/* Primary mission: an inset label (matching the field labels, like the secondary section) over a
   full-bleed accordion. The accordion spans the player-card's whole content width; its tinted
   header bar runs edge to edge, and a bottom separator closes the section before the secondaries. */
.primary-block {
  margin-bottom: 0.7rem;
}
.primary-label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.primary-card {
  margin: 0 calc(-1 * var(--pc-pad));
}
.primary-card :deep(.mcard) {
  border: none;
  border-bottom: 1px solid var(--border);
  padding: 0 0 0.7rem;
}
/* Small inset for the expanded content so the scoring rows don't collide with the card border. */
.primary-card :deep(.mcard-body) {
  padding: 0 0.35rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
  margin-top: 0.6rem;
}
@media (max-width: 700px) {
  .players { grid-template-columns: minmax(0, 1fr); }
}
</style>
