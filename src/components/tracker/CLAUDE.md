# CLAUDE.md — Game Tracker

Directory-scoped doc for the Game Tracker (`/tracker*`). Also read this when touching
`src/composables/useTracker.js` (store, flat, not in this directory), `src/composables/trackerFactions.js`/
`trackerLayout.js`/`stratagemPhases.js`, or `src/views/tracker/{TrackerHomeView,TrackerGameView,
TrackerHistoryView}.vue` — the views live under `src/views/tracker/`, which the **Roster Builder**
also shares (its own views sit alongside these, see `src/components/roster/CLAUDE.md`). Third
top-level section (`/tracker`) — a client-side, offline 2-player VP tracker for a game of 40k
11th ed. **Not part of the rules-reference data→view pipeline** (see root `CLAUDE.md`'s
Architecture section) — its own state/data below.

## State

`src/composables/useTracker.js` — a module-singleton store (same pattern as `useLocale`) persisted to localStorage under `wh11ed-tracker-current` (active game) and `wh11ed-tracker-history` (finished games), via deep `watch` (500ms debounce, flushed on `pagehide`/`visibilitychange`). **A finished game is filed into the history as soon as its player leaves the game's screens** (`fileFinishedGame.js`, 2026-10-25): the finished screen's "Back to tracker", the nav, any link — `/tracker/game` and its rosters excepted — and the home files one it finds on arrival (a reload). Until then only that one button filed it, and a player who left by the nav saw the game missing from the list and "Resume" on the big button. **The home's list leads with the game on the phone**: in play ("In progress", its score and round) or still being set up ("Setting up", no score — a lobby, or this phone's wizard draft with its step). **Critical transitions (`archiveGame`/`discardGame`/`resumeFromHistory`) call `saveNow()` for a synchronous, immediate write** — the debounce alone lost finished games on installed iOS PWAs that get frozen/killed without firing `pagehide`. `flushSave` writes history before current so an archive can't drop the game from both keys. A game = `{ id, phase: 'setup'|'playing'|'finished', currentRound, settings:{firstTurn,layout:'A'|'B'|'C'|'custom',customLayout,battleSize:'incursion'|'strikeForce'|'onslaught'|'custom',custom,twist,twistMission,scoreMode:'vp'|'bp'}, players:[P,P] }`. `battleSize` (rule 25.03) sets the setup DP budget (`BATTLE_SIZES` in `useTracker.js`: Incursion 2 DP / Strike Force 3 DP / Onslaught 3 DP); **`'custom'` is a size of the players' own** (owner, 2026-10-23: evening events at 750 points with one secondary) — `settings.custom = { points, dp?, secondaries? }`, chosen as a fourth size button with a card of three steppers under it, remembered from the last game played at one. **Every reader of the size goes through `battleOf(settings)`** (points, `maxDp`, `secondaries` — 2, or 1–3 custom — and `base`, the printed size the custom points fall within, which the army-rule counters keyed by size read) and `battleName` for its label; nothing looks a size up in `BATTLE_SIZES` by id any more. The number of secondaries is what the take draws (`takeCount`), what the take dialog counts and what fixed mode lets a player pick; caps stay the rules' (15 a round, 45 a game). Labels that count cards use `byCount` (`<key>` with `{n}`, `<key>One` — Russian declines the noun for one only); `twist`/`twistMission` are the optional pre-game Twist (see below); `scoreMode` toggles VP vs Battle Points results. `layout` is the recommended A/B/C of the dispositions' matchup, or `'custom'` with `customLayout:{id,image,edge,label}` when any of the 45 layouts is picked — resolved everywhere via `resolveLayout(settings, dispA, dispB)` in `composables/trackerLayout.js`. Player = `{ name, factionSlug, detachments[], disposition, role, secondaryMode:'tactical'|'fixed', battleReady, primarySlug, cp, rounds:[{primary, picks{'bi:ri':count}}×5], secondary:{deck,hand,drawn{slug→round},discarded:[{slug,round}],scored:[{slug,round,picks,vp}]} }`.

## What to track

**`src/data/trackerOptions.js` is the table of everything a game can be asked to keep** — one row
per option, carrying its `setting` field, its ui.js label and help keys, its `default`, whether it
`remember`s the last game's choice, any retired field name (`legacy`), and an `available(ctx)`
predicate. `TrackOptions.vue` draws the table and is mounted **both** in the wizard's step 4 and in
`EditSetupModal`, so a row offered in one is offered in the other. That is not tidiness: the two
hand-written copies it replaced had already drifted — the wizard offered the army-rule toggle for
any chosen faction, the dialog only for a faction with an interactive tracker spec, so a game whose
faction had none showed a card that could never be turned off.

`ctx` is `{ you:{faction,trackable}, opp:{faction,trackable}, anyRoster }`, keyed by **side**, never
by index: `players[0]` is the first-turn player once a game starts, so the block must not index the
array itself.

**`tracks(settings, key)` is the only reader.** It resolves the retired name, the row's default
(which is what answers for every game saved before an option existed) and the `requires` tree — no
caller writes its own `?? true` or remembers which rows hang off which.
`defaultTrackSettings(lastSettings)` seeds the wizard, `trackSettingsOf(settings)` fills an older
game in for the edit dialog, and **`normalizeTrackSettings(settings, ctx)` is what gets written on
Start/Save**: a row the game cannot offer is stored OFF, because a disabled checkbox never carried
the player's answer. Without it "Track phases", remembered from a game that had a list, raised the
phase row in a game that had none.

**Four groups, three presets (owner, 2026-10-14; reshaped 2026-10-17).** `turn` — CP (`trackCP`, the
counter), under it playing stratagems (`trackStratPlay`: the CP tab's list and a unit card's play;
off, the CP tab is the counter alone and a card's stratagem box is a plain mark), under that
`askStratagems` (off, a stratagem is spent at its printed cost at one tap — on no unit from the CP
tab, on the unit from its card — and a play the tracker refuses opens StratPlayModal after all,
which says why); the clock (`trackPhases`), the phase reminder (`trackPhaseRules` — the Phase tab
with the clock, the Turn tab without it) and the mission help (`trackMissionAids`, legacy
`trackTurnChecks`: the check before the turn passes — TurnEndCheckModal — and the take dialog
opening by itself — SecondaryDeck; the missions themselves are never a row). `armies` — the army
rule per side (`trackArmyYou`/`trackArmyOpp`, legacy `trackArmyRule`). `roster` only means anything
with an army list attached: the modifier master (`trackModifiers`) and the six families of switch
under it (`trackUnitStates` — which also carries UnitStatusButton on the list's rows, "where each
unit is" being the same thing, owner 2026-10-17 — `trackBattleShock`, `trackArmyStates`,
`trackStratagems`, `trackAuras`, `trackAbilitySets`; `fold: true` — TrackOptions draws them under a
"Details" fold beneath the master, counting how many are on). `trackStratagems` requires the master
AND `trackStratPlay`: without stratagems played there is nothing spent to change a card. `requires`
takes a list for that; a row is drawn one step in per parent in its own group (`depthOf`). `look` —
the broadcast button, `showLogStats` (the Log and Stats tabs) and the side colours. In a shared
game the host's CP and clock rows say "for every phone in the game" (`everyPhone`); see the shared
game below for which rows are a phone's own. What each family governs on the roster screen is
in `src/components/roster/CLAUDE.md`.

`TRACK_PRESETS` — Minimal (nothing), Base (CP without stratagems, the mission help, both army-rule
counters, the modifiers without a family, the Log and Stats tabs — since 2026-10-25) and Maximal (everything) — are starting points over the
rows. `TrackPresets.vue` is a "Preset" button with the preset in force named beside it (or "Your
own"); the button opens a dialog showing the game screen with each — three columns on a wide screen,
one under a three-way switch on a phone — drawn live by `help/PresetDemo.vue`: the score board,
the tab strip and the turn bar the game draws for that preset, laid out at a phone's width and
zoomed to the card (until 2026-10-20 they were screenshots, light in the dark theme and stale after
every change to the screen). The field itself is a plate: "Preset: Base", its blurb, Change. A first
game after updating from 2.9.7 (a last game carrying none of 2.10.0's rows, `fromBeforePresets`)
starts as Base too. A first game starts as Base (`defaultTrackSettings` with no
game behind it); a later one from the last game's choices. `presetOf` names the draft's set or null
comparing only rows the game can offer. The colours and the broadcast are in no preset. The one row
is drawn by `TrackOptionRow.vue` in the list and in the fold alike.

**Battle-shock is its own row** (2026-10-10, owner, after Misha called the marking bureaucracy): the
one unit state the app ACTS on (a shocked unit is refused its own side's stratagems, its ongoing ones
end), so it is switched apart from the other unit states. Its default follows CP (`defaultWhen`):
where command points are not counted, nothing is spent here for the mark to guard. The game's clock
carries it (`clockOf().shock`), so `activeConditions` and `stratagemsBlocked` read it with no new
argument; off, the shock switch is not consulted at all.

**The clock moved out of the roster group on 2026-08-25, and the reason is worth keeping.** It was
offered only alongside an attached list, because the roster screen was the only thing that read a
phase. `PhaseRules` is the second reader **and it needs no list** — an army rule and a detachment
rule name their phase in any game — so the gate went with its justification. Do not put it back
without checking who reads the clock now.

**Every row is always drawn.** A row this game cannot offer is disabled with the reason under its
caption, never hidden. Hiding made the list a different length in every game, and it meant "Track
phases" was seen only by someone who had already attached a list — the people who needed telling
were exactly the ones who never saw it. Its help button stays live: what a greyed-out option would
do is precisely what you want to read while it is greyed out.

**What may NOT become a row: the missions.** Rows for the secondaries and for scoring the primary
by conditions were built and removed the same day (2026-08-25) — the primary, the secondaries and
the way they are scored *are* what the tracker is for, and a switch that hides them offers to turn
the app into a notepad. A row has to be an aid **around** the game — a counter, a reference card, a
clock — never the game itself. By the same rule the ~990 **unconditional** modifier effects are not
five more rows: they are this list's correct numbers, not tracking, and they hang off the master
alone.

**Turning an option off hides a block; it never clears what that block recorded.** A CP count, a
flipped condition and a spent stratagem all stay in the game, so a toggle flipped mid-game is fully
reversible. For the modifier families that means a switched-off family stops PROVING its conditions
and the numbers it held fall back into the "possible" list with their condition text — the same
honest degradation a game without phases already has. **A disabled family can make a card say less;
it can never make it say something false.**

**The help "i" sits OUTSIDE the `<label>`, not in it.** A label forwards every click inside it to
its control, so a help button in there flips the very setting it explains. The two share a dividing
line instead — the same attached pair as the roster's condition chips (`ConditionChips.vue`'s
`.cond-info`), including the `z-index` on the lit half. `OptionHelpModal.vue` is one dialog for all
of them (prose, blank line = new paragraph); a setting whose answer is a *table* keeps its own
(`ScoreHelpModal`). `src/data/trackerOptions.test.js` gates that every row's label and help exist in
**both** locales — `ui.js` has no parity check of its own.

## The turn — always kept (`endTurn` / `undoTurn`)

The game screen moves on by the **turn**, not the round: a headline over the score ("Round 3 · Turn:
X"), a "Turn" chip on that side's card, and under the board two equal buttons — **← Undo turn** and
**End turn — X**, the latter in the colour of the side on turn. Ending the second turn of a round
opens the next round (through `goToRound`, so the secondary housekeeping still runs); the last turn
of the game offers **Finish game** in its place. **Undo turn** steps back into the turn that ended,
at its last phase — an action, not a snapshot: in a shared game the other phones already have the
new turn, and what was scored since stays. (Mikhail's prototype restores a full snapshot of the
previous turn; that was deliberately not copied, for exactly this reason.) The turn lives in
`currentTurn` (the `shared` slice), which existed for the phase clock — so the format did not
change. **Phases stay optional** (`trackPhases`); the turn does not depend on them. In a shared game
the turn is ended by the side playing it and taken back by the side that ended it; the other phone
sees the button greyed with the reason on the line under the pair. The score cards follow the same
prototype: each side in its colour (you `--accent`, the opponent `--side-opponent`) as a stripe and
on the name, name · faction on one line, VP and BP side by side at one size, the breakdown under a
rule; the side on turn gets a wash of its colour and the "turn" mark. "Leading" is gone from the
live board — the gold edge and "Tied" belong to the result screen.

## The game screen's layout (`RoundTracker.vue`)

Top to bottom: headline, score cards, the rounds row (steps 1–5 with **Finish game** at its end and
the sync indicator), the turn row — **pinned above the bottom nav** (`.tf-sticky`, the window's
bottom edge on a desk; its height reserved in App.vue as `--roster-sticky-h`, so floating buttons
and the page's end clear it) — (**End turn** says just that — the name is in the headline and
its tooltip; in a shared game the tooltip says why it is grey), then the **tabs**. The line "Next:
X · round N" under the buttons is gone (owner's call, 2026-09-27). **With the phase clock on** (`trackPhases`)
the phase lives in the turn row itself (owner's call, 2026-09-27): undo turn as an icon, ‹, the
phase (tap → the phase picker), ›, End turn. The arrows stop at Command and at Fight — a turn
changes only by End / Undo turn, so never past the end-of-turn check. The reminder ("in this
phase", `trackPhaseRules`) is the **Phase** tab of the upper row (the **Turn** tab in a game without the clock), its count on the tab
(`usePhaseRules.js` counts; `PhaseRules.vue embedded` draws). Its lines stay on the game screen
(2026-09-30): a rule opens the Army tab on that army with the rule unfolded (`ArmiesPanel.reveal`), a unit of an
attached list opens its card in the Army tab (`RosterTab.openUnit`), several units — the list; a
mission card opens the Missions tab. No stratagems line since 2026-10-10 — the CP tab is one tap
away and already filters to the phase.
**One strip of tabs** over one panel (owner's calls, 2026-09-27: two rows split by a heavy rule
read as two menus, and they were one menu). Every CLOSED tab is an icon (`aria-label` + `title`
name it); the OPEN tab takes the rest of the width and shows its icon and its word — one row at any
width, and the word on screen is always where you are. **Wider than 900px every tab carries its
word** (owner, 2026-10-02): the tabs are equal, the open one is the filled one, and of the switch
only the fill and the panel's slide are left. In order, each the owner's own drawing (2026-10-08,
`.wi-*` in style.css — see components/CLAUDE.md): Missions `wi-missions`, Phase / Turn `wi-phase`
(with its count in the corner), CP `wi-cp`, Armies `wi-army`, Roster `wi-rosters` (the bottom nav's) (only when an
army carries a list), Log `wi-log`, Stats `wi-stats`. Switching is animated (owner's mock, 2026-09-30:
the old fill drains, the new one fills from the bottom, the word rises, the panel slides in from
the tab's side; timed off `--motion-tab`). **Every panel is built once and kept** (`v-show`): the
open one at once, the rest one per idle moment — a switch shows, it never builds. The strip stands on a 2px accent line;
the open tab is filled with the accent, so it reads as attached to the panel. One panel at a time;
**every new turn opens on Missions** (a watch on round + turn), because a turn starts by drawing and
scoring. The open tab is **remembered on the device** (`wh11ed-tracker-tab`, with the game id, round and
turn): leave for a datasheet and come back in the same turn — the same tab; the turn moved meanwhile
— Missions. The CP tab exists only while the game tracks CP (`trackCP`); switched off mid-game it falls
back to Missions. What lives where:

- **Missions** — the twist reminder and one card per side: primary, secondaries, the army-rule
  tracker. The card carries its side's colour down its edge. See "The missions panel" below.
- **CP** — one bank per side, side by side. See "Command points" below.
- **Log** — `GameLog.vue`: the game told back, newest first, by round; filters (all / scoring /
  CP / stratagems / cards / units / army; Core CP only under CP, the turns only under all) and a
  plain-text copy. **The whole history of what was done** (owner, 2026-10-19), built by
  `gameLog.js` from two sources:
  - **read from the game**: the CP ledger, the secondaries drawn / scored / set aside, the primary
    per round. That costs nothing to carry and cannot disagree with the score. Each act the game
    records carries when it was made (`t` on ledger entries, discards, scorings, when-drawn notes,
    a round's primary; `secondary.drawnAt` for draws — since 2026-09-30), and within a round the
    log is newest first by it; acts of one moment, and older games, fall back to turn then side.
  - **recorded as it happens** (`actionLog.js`, `acts`): what the game state cannot tell — a unit
    destroyed or arriving, a rule switched on a unit's card, the army rule's counter / pick / call,
    the turn beginning, the game finished, resumed or re-set up — on the side (`players[i].acts`,
    in the side's slice) or on the game (`acts`, the shared slice). The store's mutators write
    them; a caller passes the names the store cannot know (a unit's, a rule's `{ en, ru }` label).
  - **Nothing taken back disappears.** An undo — a stratagem, a bonus CP, a card back from the
    discards, a turn, a once-per-battle use, a score changed after it stood a minute — is an act
    `{ type: 'undo', of }` with a copy of the entry; the log draws that entry **struck** where it
    was and the undo as a line of its own. Phases are not told (five lines a turn). A stepper
    tapped in a row is one act (`COALESCE_MS`). A side keeps at most `MAX_ACTS` (1000, oldest go
    first): a side travels in one 256 KB slice of a shared game.
- **Stats** — `ScoreBreakdown` with `expanded` (no toggle: here the table is the content), with
  the CP spent under each side's table (the ledger's spends; also shown in history).
- **Side tabs inside a panel** (Missions, CP, Armies, Roster) switch in place and **fade** the new
  content in (`useSwapFade.js`, Web Animations off `--motion-swap`, 0.6s; the tabs stand). Content that
  loads (an army's rules, a list) is built once and kept — rebuilt on each switch it came up empty
  and jumped the page (2026-09-30).
- **Army** — `ArmiesPanel.vue` + `ArmyCard.vue` (one per army, all built with the panel): one card per army (a side; each member in doubles — up to four;
  `useGameArmies.js`), its emblem stamped under it (2026-09-30): the faction, the army rule's
  tracker with the detachment rules as folds (`ArmyTrackerCard bare`), and — without a list — the
  way to the faction's datasheets. No disposition or detachment line: nobody looked them up mid-game.
  **The attached list stands under the card, in the same frame** (`RosterTab embedded`, through
  ArmiesPanel's slot, following its pick via the `army` event): one Army tab since 2026-10-10
  (owner, from Misha's note) — the separate Roster tab was the same army a tab away, its card's
  "Roster" button only switched to it, and seven tabs crowded a phone.
- The list under it — `RosterTab.vue`: the attached lists, each the roster screen itself
  (`RosterViewView in-tracker`, loaded async so the game chunk never carries it), built on its
  first visit and kept (owner, 2026-09-30). Off screen a list is `frozen`: it reads a plain copy of
  the game taken as it left, so a tap elsewhere does not redo its modifier layer; on screen — or
  with a unit's card open over another tab — it reads the live game again, one recount.

The top is NOT pinned (owner's call, 2026-09-27): the prototype fixes it and scrolls the panel
inside, which on a 640px phone leaves about half the screen for the game.

## The turn's colour

The whole game screen wears the colour of the side on turn: `RoundTracker`'s root takes `.turn-opp`
during the opponent's turn, which re-points `--accent` (and `--accent-hover`) at `--side-opponent`,
so every accented control follows. The SIDES keep their own colours through it — which is why
every "your side" colour in the tracker reads `--side-you` (style.css), never `--accent`: an
`--accent` read there turned your own card blue on the opponent's turn. The recipe is the global
`.side-colored` + `.turn-colored` (+ `.turn-opp`) in style.css. **Dialogs wear it too:** they
teleport to `<body>`, out of the screen, so RoundTracker hands `{ class, style }` down with
`provideModalScope` (composables/modalScope.js) and BaseModal puts it on its overlay — every dialog
opened under the game screen, nested ones included, and nothing outside it.

**Which two colours** is `composables/sideColors.js`: each side's faction accent from
factionsIndex.js by default (owner, 2026-09-29; a side with no faction takes the standard red /
blue). The phone's **Customise colours** option (`customColors`, a `local` row) opens a picker per
side over its live two-card preview (`SideColorPreview.vue`, drawn by TrackOptions from the row's
`preview`, with each army's emblem): a short `PALETTE` of the site's own pairs, or "faction colour".
The picks are `settings.sideColors` ({ you, opp }), local like the row. Nothing is swapped
automatically any more: when the two sides come out alike, the wizard's Start and the edit
dialog's Save ask once and offer to customise (`useColorClashGate.js`). The screen applies the
pair through the global `.side-colored` class + `gameSideColorStyle(game)`, which set
`--side-you` / `--side-opponent` per theme; the score board's emblems take the same colours, and
a result's columns (ScoreBoard `finished`) wear each army's own colour. **The setup's mission step
wears them too** (Misha, 2026-10-20): its two side cards are `.turn-colored` (`.turn-opp` for the
opponent) under a `.side-colored` wrapper fed by the same `resolveSideColors`, with the army's
emblem before "You" / "Opponent" — the colours follow from step 1's factions. A setup player always
carries the two doubles member slots, so the side's faction is read with GameSetup's `sideFaction`
(through `armiesOf`), not sideColors' `sideFactionOf`, which would read the empty slots.

## The missions panel

**One side first, the other folded.** First comes whose turn it is — or, in a shared game, this
phone's own side (a guest does not want the other phone's cards on top); the other side waits under
"Show X's missions". A new turn folds it again.

**Scored in the card's dialog.** The primary and every secondary are one line on the screen — name,
this round's VP (and the "⋯" of a tactical card) — as in the first tracker (owner, 2026-09-29: the
conditions laid out on every card ran the tab to several screens). A tap opens `ScoringModal` with
the briefing and the conditions (`ScoreRows.vue`), each under the moment it is scored at; the rows
tick in the card's side colour (`opp` prop — the dialog teleports out of the card). **The moment comes from the
data, never from a guess:** `missionTiming.js` maps every English `when` of a scoring block (and
the End of Battle heading) to one of six moments, and its test fails on a phrasing it does not
know. **A condition is ticked only in the turn it scores in** (`lockedTurn`, owner 2026-10-21):
"end of your turn / Command phase" in the owner's turn, "end of your opponent's turn" in the
other's (and, with the "… or the end of the fifth battle round" fallback, also in the turn closing
round 5), End of Battle in the battle's last turn; "end of a turn" and "while active" in any. A
locked row says whose turn it scores in. Until then a late tick was allowed ("ticked a moment after
the turn passed") — and for the second player it landed in the wrong turn: his "end of your turn",
ticked in the opponent's turn, went into the round's turn of his not yet played (a player's report).
**A passed turn is put right by opening it**: the dialog offers "Correct X's turn" (`fixTurnOf` —
a turn that has begun, and strict rules allowing), which opens that turn behind the dialog and the
rows unlock in place.

**The round steps are a view, not a move — of a TURN.** A played turn opens for correction (a
banner names the round and whose turn, "Back to the game" ends it): a past round from the steps
(the shown side's own turn), any played turn — the live round's first one too — from a scoring
dialog's "Correct X's turn". The live round is marked; a round not yet started is disabled. Only
End/Undo turn move the game. The view is this phone's own (`view` = `{ round, turn }` in
`RoundTracker`, `SecondaryDeck` takes `turn` and asks for another with `open-turn`), and a new turn
drops it. In the view the lock reads the opened turn as "now". Scoring writes into THAT round
(`scoreSecondaryRow(…, round, turn)`, `setPrimaryRow(pi, roundIdx, …, turn)`), a tactical card
still in hand that turns out to have been achieved then leaves the hand, and **the correction is
logged** (`logFix`: an act `{ type: 'fix', what, slug, at, atTurn, from, to }` — when it was made,
which turn, the VP before and after; one per minute of taps) instead of the struck-old-score undo
a live correction gets. The format did not change: the primary is kept per round, and a side has
one turn a round.

**The turn's two secondaries (tactical).** "At the start of your Command phase, draw two" — so the
deck offers **Take 2 secondaries** to the side on turn, once per own turn: both at random or both
by hand (`TakeSecondariesModal`), recorded in `secondary.took[round]`. Every card in the dialog has an "i" for its full text (briefing and conditions, read-only), so
a card can be read before it is chosen. Right after the take, a card with a WHEN DRAWN rule shows
the rule's words and its action (discard / shuffle back and draw) — that is the moment the rule is
written for; `whenDrawn.js` decides when it is on offer (shared with the card sheet). The dialog opens by itself
once per turn on the phone that plays that side (a module-level memory, so a tab switch does not
reopen it). A random pair is written at once, so reopening cannot re-roll it; "Put them back"
undoes the take while neither card has scored. After that the hand changes only through a card's
own rule — WHEN DRAWN, set aside, return to deck, in the card's "⋯" sheet. The free "Draw" /
"Choose" buttons are gone. Each card shows how it came in (`secondary.source`: a die or a hand icon — `DieIcon.vue` (our own: Bootstrap draws dice only face-on) and `wi-hand`; icons, never emoji).

**Achieved cards leave at the end of EACH turn** (`setAsideAchieved`, the Event Companion's
"Achieving Secondary Missions"), not only when the round changes. The entry remembers the turn
(`discarded[].auto`), and **Undo turn puts exactly those cards back** — never one set aside by hand.

## Ending a turn — the check first (`TurnEndCheckModal`, `missionTiming.turnEndChecks`)

End turn (and the last turn's Finish) first asks
`turnEndChecks`: every condition that scores at this very moment, on both sides' cards in hand and
both primaries — the side on turn's "end of your turn", the other side's "end of your opponent's
turn", either side's "end of a turn" (the side on turn's own were left out until 2026-10-02; the
owner wants the card offered whenever a condition falls due) — and on the battle's last turn every
End of Battle condition plus the "… or the end of the fifth battle round" fallbacks.
Nothing to check → the turn passes at once. Otherwise the dialog shows those rows to tick (a side
another phone plays is shown, not scored) and "Checked · end turn" passes it; on the last turn it
goes on to `GameEndModal`. Mikhail's prototype had the same step, with the four "opponent's turn"
cards listed by hand; here the data's own timing decides.

## Strict rules (`strictRules.js`, `settings.strictRules`)

A game the players agree to play by the book (owner, 2026-10-19). Chosen beside the score on the
setup's deployment step — off for a first game, the last game's choice after — and fixed once the
game starts (`EditSetupModal` shows it greyed). It refuses what the rules forbid: choosing
secondaries by hand, a drawn card back into the deck (or the turn's two taken back), the CP pencil,
scoring into a round already over (or a turn of the live round already played — `pastTurn`) or for
a card not in hand. A mistake is put right **only while it
is the side's last action** — the owner's "variant A": the undo buttons stay where they always
were, and the older ones grey with the reason (`trackerStrict_<why>`), never hide. The clock goes
back one step, and only before anyone has done anything since it moved.

"The last action" is not recorded apart: it is read from the stamps the game already keeps (`t` on
ledger entries, scorings, discards, draws, acts — `sideNewest`), plus `clockAt`, written by
`moveClock`. What the clock does by itself (Core CP, cards an ended turn sets aside) is left out:
the phone that writes those may be seconds behind the one that moved the clock. One question for
the store and the screen: `strictWhy(action, pi, arg)` / `strictUndoWhy(kind, pi, …)` in
useTracker — a mutator refuses on it, a button greys on it. Each store refusal is tested in
`strictRules.test.js`.

## Command points — a ledger (`cpLedger.js`)

`player.cp` is still the balance every reader uses (score cards, broadcast, history), but a game
started since 2026-09-27 (`cpAuto: true`) keeps **where each point came from** in `player.cpLog`:
`core` (+1 to both at every Command phase), `bonus` (**at most one a battle round** — the Event
Companion's "Generating Command Points" cap, applied to every game because the tracker plays the
Event Companion's missions; source `manual` or `discard`), `spend` (source `redraw` — the
once-per-battle 1CP secondary replacement — or, next, stratagems) and `adjust` (the stepper, a
correction). `cp = cpBase + Σ amounts`, never below 0; `cpBase` is an older game's stepper value
when its ledger started. A game without `cpAuto` gets no Core CP by itself and keeps its number.

**The turn's side effects are settled, not performed** (`settleSide` in `useTracker.js`). Core CP
for both players and the achieved cards of both hands are effects of the CLOCK, and in a shared
game a phone writes only its own side (the sync snaps the other back). So nothing is done "at
end of turn": a module-level watch on the clock (round, turn, phase, game id — fired by this
phone's taps and by another phone's shared slice alike) calls `settleSide` for every side, which
brings that side in line with where the clock stands — one `core` entry per turn reached, none for
a turn not reached; cards set aside at the end of a turn the clock is back inside come back (with
the end-of-turn discard's CP); cards achieved by the last turn that ended leave the hand. It is
idempotent, so Undo turn is the same call and a phone that missed a tick catches up on the next.

**The card sheet ("⋯") offers each rule by name**, greyed with the reason when not available:
WHEN DRAWN, **Replace for 1CP** (`cpRedraw` — side on turn, once per battle, `cpRedrawUsed`),
**Discard at the end of the turn, +1CP** — a MARK, not an act (owner, 2026-10-20: it used to end
the turn on the spot): `markForTurnEnd` writes `secondary.eotMarked` (the side's slice, so every
phone sees the "discarded at turn end" badge), the same item takes it off, and `endTurn` sends the
marked cards off (`discardMarked` → `discardAtTurnEnd`: the round's bonus if free, the card carrying
`auto` + `cp` so Undo turn returns both). A marked card is not in the end-of-turn check, and a card
that scored this turn cannot be marked or discarded (it is achieved: it leaves for its VP), set aside,
return to deck. A card that came in by hand may be replaced by hand (`ReplaceCardModal`).

## Stratagems in the CP tab (`CpStratagems.vue`, `gameStratagems.js`)

Under the banks: whose CP (a switch — both sides may spend at any moment, half the core
stratagems are played in the other player's turn; default is the side on turn, or this phone's
own side), then **the Stratagems page's own toolbar and phase accordions** (`StratFilterBar.vue`,
`StratPhaseGroups.vue`, `groupByPhase` — one set of parts for the page, the roster screen and this
tab, owner's call 2026-09-27): All / Core / Army, and flat ↔ by phase. By phase is the tracker's
default (remembered on the device, apart from the page's choice). **With the clock, a "Now · <phase>"
group comes first holding only what the chosen side can play right now** — the phase AND whose it
is, by `usableInSlot` (in your Movement phase Fire Overwatch is the opponent's, not yours), the same
predicate as the phase reminder and the roster screen; the plain phase groups follow. Groups start
closed and stay as the player left them (`wh11ed-tracker-strats-open`, on the device). In the mixed list a core stratagem carries a "core" tag. Flat: the army's, then the core. A row: name and
two lines of timing (tap → the full `StratCard`) and the printed cost, which **plays** it.
A use is a `spend` entry in the ledger (`source: 'strat'`, `ref` = the stratagem's `_key`, the
phase too when kept); "Undo" removes the round's latest use.

**Playing a stratagem is one act, from the CP tab or a unit's card** (owner, 2026-09-30;
`StratPlayModal.vue`, `stratagemPlay.js`, useTracker's `playStratagem` / `unplayOnUnit`). The
dialog asks **whether a rule changed the cost this time** — every time; reduced / as printed /
increased, the answer plays it, for this use only — and under the price offers, **optionally**, to
name **the unit it is played on** (owner, 2026-09-30: a Command Re-roll must not stop at a list),
whenever the English TARGET line names a unit and a list is attached (the own army's, or the
opponent's for "One enemy unit"); Battle-shocked units and units already targeted this phase are
greyed with why. A card's box names its own unit. The ledger entry carries `target: { uid, mi?, name, sid?, opp? }`
and the log says "used X on Y". When the unit's card has a modifier record for it (`sid`, paired
by `deckStratFor` / `recordFor` — detachment id + name, loosely; the pairing gate in
`stratagemPlay.test.js` fails on a record with no deck twin), the card's box goes on at the same
moment. Taking back either — Undo here, or unticking the card's box — takes back both, CP included.
The card's box alone (no ledger) only where CP is not counted. A row is locked only when not even a
reduced cost could pay for it. **Refused, with the reason on the
row** (`stratBlock`): the stratagem's own limits, read from its ENGLISH restrictions by
`usageLimits` (once per battle / round / turn, not before round 2 or 3 — the gate in
`gameStratagems.test.js` fails on a "use this Stratagem …" phrasing it does not understand; limits
on a TARGET are left to the players), and, only when phases are kept, the Core Rules' once per
phase. Short of CP greys the button without a line — every row would say it at once.

`gameStratagems.js` is also what the Stratagems page reads (moved out of `StratagemsView.vue`):
the core deck merged EN/RU (`loadCoreStratagems`) and each side's detachment deck, **both imported
dynamically** — the CP tab mounts them only while open. A static import of `battlefields.js` here
once put ~22 KB gzip on every opening of a game (2026-09-27); keep it dynamic.

## Slices — the game as multi-device sync moves it

`src/composables/gameSlices.js` (pure, light) cuts a game into five independently versioned
parts: **`shared`** (everything at the top level but `players`: the clock, `settings`, `phase`
and the finish metadata), **`side0` / `side1`** (a player object minus its list and minus
`isYou`) and **`roster0` / `roster1`** (`rosterId` + `roster`, and per member in doubles). A
slice is the unit of conflict AND of rights: a side's two slices are written by that side (both
partners in doubles), the shared one by anyone in the game. The roster is its own slice because it
is the heaviest thing in a game and changes only on attach/detach — inside the side slice it would
ride along with every CP tap. Measured on a fully played five-round Strike Force game with lists on
both sides (2026-09-17): whole game 7.5 KB, one list 1.3 KB, a side without its list ~2.2 KB (of
which the secondary deck/hand/scored ~1.3 KB), shared 0.6 KB.

**`isYou` is device-local and never synced** — the other phone's answer is the opposite one, and
the stats page, the You/Opponent labels and `trackArmyYou`/`trackArmyOpp` all read it.
`applySlice` keeps the local flag; `assembleGame(slices, { you })` sets it for a joining device.

**`useTracker().applyRemote(name, data)` is the one door another device's changes come in
through.** It writes the slice into `current` IN PLACE (`applySlice`), so the game object and the
player objects keep their identity for every reader holding `current.value.players[pi]`, the deep
watcher persists it like a local tap, and no other slice is touched. It refuses (false) with no
valid game to write into — a device that has not joined yet assembles the whole game instead.
`changedSlices(before, after)` (stable-keyed JSON, so key order after an apply is not a change) is
the same comparison the sync layer makes to decide what to send. The plan and its reasons live in
the hub journal `journal/active/2026-09-16-multi-device-sync.md`.

## The shared game (`useParty.js`)

One game on several phones. The host — the only one who needs an account — shares the game in
progress (`share()`: `POST /party` with the five slices); the others open `/tracker/join/:invite?`
(`PartyJoinView.vue`), by link, QR or the six-digit code, and take a SEAT named after one of the
game's players (`join()` then `takeSeat()`, which `assembleGame`s the server's slices with `isYou`
on the chosen side and REPLACES `current`). The handle lives in the game — `current.party = { id,
memberId, token, side, mi, host, seq, versions, status }` — like the broadcast token, so it
survives reloads through the store's own persistence; the base cut (the slices as the server last
saw them) sits in `wh11ed-party-base`. **What is shared is the game, never the navigation.**

**Two trackers, no shared games** (2026-10-08). The new tracker's beta runs on `beta.wh-rules.ru`
beside this one, and a game is never played across the two (`trackerGen.js`: this build is
generation 1, a beta game carries `trackerGen: 2`). `join()` sends `gen`; the server answers a
mismatch with `409 tracker_version` and the host's generation, and `PartyJoinView` links the same
invite on that site. A beta game that reached this history through the cloud is read, not resumed
(`GameSummaryModal`, `playableHere`).

**The tick.** `sync()` compares the game's cut against the base, sends the slices that differ
(each with the version it was based on) together with `since` — the last party `seq` this phone
saw — and takes back every slice someone else changed, in ONE `POST /party/{id}/sync` (one round
trip a tick, both directions). A `409` means a write was based on a stale version: the server's copies
land through `applyRemote`, this phone's change is gone, and the player taps again — the honest
outcome when two partners edit one side inside two seconds. `423` is a finished game a guest
cannot reopen; `401` the host removed this phone (`party.revoked`); `404` the host ended it
(`party.ended`) — both leave the game on the phone as its own. A slice this phone may not write
(`canEdit(side)`: the host any, a guest its own side) snaps back to the base rather than going
out. Nothing is queued offline: the base stays put and the first tick back sends the difference.

**The gate is on receiving.** A phone polls (2 s, the server's state-cache window — 3 s until
2026-10-16, when the API had left the per-request gateway; 4 s in the lobby; 15 s once the
game is finished, because only the host can reopen it and a guest who stopped listening would
never learn; 10 s from any screen for a host feeding a broadcast) while a LIVE screen is mounted —
`TrackerGameView` and the game's own roster (`RosterViewView` in-game, which writes rule switches)
call `attach()`/`detach()` — and the page is visible and online. Coming back polls at once. Leaving
the screen, `visibilitychange: hidden` and `pagehide` send what is pending first (`flush`, with
`keepalive`), so a score corrected a second before the lock does not wait for the unlock. A local
change goes out 800 ms after the last tap, not on the next tick.

**Rights on screen, never hidden — and two different questions.** `canWriteSlice` is the RIGHT
(the host any slice, a seated guest its own side and the shared one — what the server enforces);
`canEdit(pi)` is what the screen lets this phone TOUCH: its own side, and a side no other phone
sits on. The server sends `held` (the sides other live members hold) with every state-bearing
answer, and it lives on the handle; a held side is locked on the host's screen too — "your side is
yours", one rule instead of a permission matrix — and the host takes it back by freeing the seat
(kick) in `PartyModal`, or keeps both sides open on its own phone with that dialog's one switch
(`party.scoreAll`, local to the handle, off by default; for a guest who joined to watch). The right stays wider than the lock on purpose: a setup edit rewrites both
sides, so a server-side lock would break the host's own dialog. `RoundTracker` greys the locked
side with the reason under its title (the host's line names the way back) and puts `inert` (a
presence attribute — `undefined`, not `false`) on what SCORES — the primary's stepper, the CP
stepper. The mission cards are not inert: the opponent's primary and secondaries lie face up
(Event Companion), so they open view only ("Scored on another device"), and `SecondaryDeck`'s
`editable` takes its actions away — the take, a card's "⋯", return (until 2026-10-25 the whole deck
was inert, and the owner could not read his opponent's missions in his first game); `ArmiesPanel`, where the army rule's tracker lives since 2026-09-29 (owner: everything
about an army in one place, not under the missions), passes `readonly` to `ArmyTrackerCard`, which inerts its own controls and leaves the
rule text, the active rule and the spent log live; the card itself is never inert, because the
opponent's setup facts, list and army rule are things to READ mid-game (the first complaint about
the shared game was a guest who could not open the other side's rule). The setup gear opens for a
guest too: `EditSetupModal` in guest mode shows only the option blocks, `TrackOptions` with
`lockShared` leaves live the rows the table marks `local` (the same flag `gameSlices` keeps out of
the sync) and disables the rest with "host only", and Save writes only those. **Since 2026-10-25
that is every row but command points, the clock and the broadcast** (owner: what a phone SHOWS is
its own, what the game RECORDS for both is the host's — a guest not counting CP would leave the host
a stale balance, a host not keeping phases would leave the guest's reminder on Command). A guest's
own rows start from its own last game (`localTrackSeed` in `takeSeat`), its presets touch only them
(`TrackPresets` `lockShared`), and the lobby's waiting screen has "This phone's settings"
(`EditSetupModal` `phoneOnly`). The host's screens mark the two rows it sets for every phone
(`everyPhone`, `TrackOptions` `shared`); a local row carries no caption — on one phone it is every row. The finished screen's Resume is disabled for a guest and its primary button
reads "Save to my history". `RosterViewView`'s `canSwitch` includes `canEdit(pi)`. `SyncIndicator.vue` sits on the round bar: a quiet dot (tap: how long ago), a
spinner only for a request older than 400 ms — except on resume, when it is wanted at once — and a
warning glyph with its reason. **The tap opens a bubble ABOVE it, not text inside it** (2026-09-23):
expanding the button reflowed the row it lives in, and on the lobby row that moved the two
buttons beside it out from under the thumb that had just tapped the dot. The bubble hangs from
whichever edge keeps it on screen (decided when it opens, from the button's own rectangle), and
a full-screen backdrop closes it. `PartyModal.vue` (the people icon beside the broadcast one) is the
host's invite (link, QR via the lazily imported `qrcode`, code with its ten minutes, a fresh code or
link), the member list with last-seen, seat moves, kick, hand-over and "stop sharing"; a guest sees
its standing and "leave".

**Leaving is implicit.** `useParty`'s deep watcher notices the game leaving with its handle —
archived from the finished screen, from the tracker home's "New game", from the join view's
"save it and join" — and says goodbye for it: a guest frees its seat (`POST /party/{id}/leave`),
a host ends the party (`DELETE`). `archiveGame` strips `party` from the record. `init()` arms
that watcher; the tracker home, the game screen and the game roster all call it.

**Deliberately not synced:** `isYou`, every `local` row of the option table (`LOCAL_TRACK_SETTINGS`), `party`,
`broadcast` (see Slices). In doubles the host sits in its team's FIRST member seat (`mi: 0`,
since 2026-10-05 — as the TEAM, `mi: null`, it held no member seat and a joining phone could take
the host's own army); partners joining pick one of the other three. The server contract is `wh11ed-api/README.md` "A shared live game".

## The lobby — setting the game up together (`useLobby.js`)

Since 2026-09-23 the setup itself can be shared, not just the game in progress. **Since
2026-10-25 it starts in the wizard, on the opponent's card** (owner: "на первом экране кнопка для
приглашения"): "Invite" beside the card's heading opens the lobby over the wizard — the draft becomes
the lobby game, the type and the names are the ones already on screen — and `PartyModal` shows the
code, the QR and the link; the same button then reads "Code 123 456" and opens it again. It waits
for the host's own name (in doubles, its member name and both team names: the seats a joining phone
picks from are named by them), and signed out it opens the sign-in, which comes back to the kept
draft. The lobby is created at stage `armies` — the host is on that step already. Before this the
way in was a door of its own on the tracker home ("Shared game" → `SharedGameModal`, which asked the
name and the type again, `?share=1`, then a code screen, `LobbyInvite.vue`, before the wizard), and
the wizard itself had no way in; all three are gone, and the home's second button is "Join a game"
(`/tracker/join`). A lobby saved at the old `invite` stage reads as `armies`. The step's
`.lobby-bar` keeps the sync dot and "Close the lobby". Guests join by link, QR or code and fill in
THEIR side from their own phone; the host keeps the mission, the battlefield, the turn order and the
option rows that are the game's (CP, the clock — see the shared game above), and presses Start.

**The lobby game holds the wizard's own objects, not copies.** `GameSetup` reads `players` and
`settings` out of `current` when the game is in `setup`, so an incoming slice lands in the very
fields on screen and there is no bridge to keep in step. The heavy half of a game (rounds, the
secondary deck, the army-rule state) is NOT built until Start — it is derived from settings that
are still being chosen. `gameSlices.js` never cared about the shape of a player, so the whole
five-slice machinery works on a lobby unchanged.

**One component, two screens.** `GameSetup` takes `mode`: `wizard` (the host's four steps) and
`guest` — the same army card, the same pickers, cut to this phone's side, with "Done" in place of
"Next". A second component for the guest would have been a second place to fix every
roster/faction/detachment bug found in the first. `TrackerGameView` picks between them and the
third screen, `LobbyWait.vue` (what a guest sees after Done).

**ONE EDITOR PER SIDE, and this is the rule the whole design hangs on.** A side is ONE slice
carrying both members in doubles, so two phones typing into it collide on versions and one of
them loses what it typed **silently** — the class of bug a player finds, not a gate. So a side has
exactly one editor: the first phone to claim it, whoever it hands the right to (`takeOver`), or
the host while no one else holds it. The partner's phone waits, and can take the right over —
always offered, with a confirm, rather than gated on a liveness guess, because the honest answer
to "is the other phone still alive" is not available. **In doubles the screens say "the team", not "the side"**
(`lobbyTeam*` labels, 2026-10-05): a player who sat down on "Player 2's seat" and got two army forms,
or a waiting screen about "this side", could not tell they were filling in — or waiting on — their
whole team. Each player filling their own army is a possible later step; it needs the side slice
split or merged per member, not a label. **The arbiter is the slice version, not the
claimant**: two phones claiming in the same second both write `lobby.editor`, the server accepts
one and answers the other `409` with the winner's copy. No endpoint, no lock.

**Nothing is sent until "Done".** While the form is open the phone holds its own side back
(`useParty`'s `setHold`) — a half-typed army is nobody else's business, and the side arrives at
the host's phone whole, once. A held side still TAKES the lobby's bookkeeping out of incoming
copies (`takeRemote`) so the phone learns it was taken over; it never takes the fields being
typed into.

**Reopening is free, then it is a request.** While the host is still on the armies step
(`lobby.stage === 'armies'`) a guest reopens its side at will. Once the host has moved on
(`'host'`), "Change" becomes a request the host answers in a dialog — the mission and the layout
ahead of it were built on what this side said it was fielding. Granting it reopens that side ALONE
— the host stays where it is (2026-10-15: sending everyone back to the armies step made the host's
next "Next" lock the guest again, and a player and his opponent went round in requests until they
gave up); a denial says so on the waiting screen, where "Leave" is always available. **The host is
asked before the step that locks a guest** (`guestSides`, `askLeaveArmiesStep`): leaving the armies
step with a side another phone fills in opens a confirm saying the opponent can change it only with
the host's permission from there — and that it is still being filled in, when it is. **The host's own screen follows** (2026-09-24): a `watch` on `othersReady` pulls
it back to the mission step from anything later, `canMission` requires `othersReady` as well as the
two dispositions — a reopened side KEEPS the disposition it had, so the gate read as passed while
the guest was re-choosing the very thing the primary is made of — and both primary previews are
replaced by `lobbyPrimaryAgain` while that lasts, since a primary is the pair and neither half is
settled. The watch rather than the "allow" button: a guest can also reopen without asking while
the stage is still `armies`, and a guest claiming a side the host had been filling itself has the
same effect on the steps ahead. The host's own way out is "Close the lobby" (the code screen and the wizard's lobby row
alike): the party ends for every phone and the setup is thrown away, back to the tracker home. Until
2026-10-05 it kept the setup as the host's own; the owner asked for a full cancel, and the host can
fill any side itself anyway ("fill it in myself").

**The protocol rides in the slices** — `game.lobby = { stage, grant, deny }` in `shared`,
`player.lobby = { editor, ready, request }` in each side — and `stripLobby` wipes all of it when
the game starts. The server knows nothing about any of it, and neither does the history, the
cloud backup or a broadcast.

**A side another phone holds is a REPORT, not a greyed-out form** (`mirrored()` in
`GameSetup.vue`). Before it is confirmed the card says it is waiting, with "fill it in myself"
under that (the take-over); after, it lists what arrived — army, detachments, list, disposition.
An empty form under a "waiting" line is a longer way of saying nothing, and what the host wants
from a confirmed side is what it SAYS.

**A phone reacts to what it types, never to what it is told.** The faction/disposition/DP
watchers re-derive a side when its faction changes — and on the other side a faction does not
change, it ARRIVES in a slice. Re-deriving from it wiped the detachment and the disposition that
came with it, leaving the host holding a side its owner never described (and free to send that
back, since the host may write any slice). Every one of those watchers is now gated on
`editable(i)`.

**What waits for the other side, and what does not.** A Force Disposition follows from THIS
side's detachment (`candidateDispositions` reads `detachmentInfo(...).forceDispositions` — one detachment can offer two), and a
side is mustered by its own player — so the armies step gates only on the sides this phone fills
in (`canArmies`), and the host walks on to its own disposition while the guest is still typing.
What genuinely needs both is the PRIMARY, which is the pair of dispositions (`primaryFor(mine,
theirs)`), and the layouts of that matchup: the mission step's Next holds for it and says so, and
so does Start. Holding step 1 instead — which is what the first version did — kept the host away
from its own disposition, since that control lives one step further on.

**One gate the lobby adds:** the game TYPE is locked once the setup is shared (a seat means "a
side" in singles and "one member of a team" in doubles, so switching would unseat everyone).

**A lobby is dropped, never archived.** `putAwayCurrent()` in the store is what "New game" and
joining someone else's table call: a played game is frozen at its score and kept, a lobby is
discarded. Archiving one would put a game that never happened into the record — and into the
statistics, which read its rounds back.

**Starting the game can exchange the two sides** (`newGame` puts the first-turn player at index
0 and returns `{ swapped }`), and then the SEATS have to travel with the slices or every phone
but the host's is sitting on the other army. `useParty`'s `reseat()` calls `POST /party/{id}/reseat`,
which swaps the side of every live seat in one statement (the member index inside a doubles team
stays put), and sends the swapped slices immediately after. Doing it with the existing seat
endpoint would take three calls — free a seat, move, move back — and a failure in the middle
leaves a guest with no seat and a `403` on everything it writes. The same endpoint is the fix for
changing who goes first mid-game from `EditSetupModal`, which reorders the players the same way.

## The phase reminder (`PhaseRules.vue`)

The game screen's Phase tab: **what has something to say in the phase the game is standing on**.
`settings.trackPhaseRules`, on by default. **Without the clock it is the Turn tab** (owner,
2026-10-08; no `requires` since).

**The turn in the order it is played** (owner, 2026-10-10): `usePhaseRules`' sides carry `turn` —
Start of turn, each phase step by step (`PHASE_STEPS`, Core Rules 08–12), End of turn; with the
clock, only its phase (plus the turn's start or end where the phase borders it). At each step what
fires there: the side's rules by their moment (`start`/`end` at the phase's first/last step, during
at its main step — `stepOfMoment`), army rules before units, and the side's **mission cards where
they score** (`missionTiming.cardMoments`: the end of its Command phase, or the end of the turn —
"while active" has no moment). **One fold per phase** (and the turn's start and end) on the shared
`StratPhaseGroups` (card mode, as in the CP tab; a group may bring its own `count`), each counting
what fires inside it. **Which are open** (owner, 2026-10-19, after Mikhail's review): in a game keeping
phases the tab is the current phase, open, and it reopens as the clock moves; without phases every
phase of the turn is open (it was all shut, remembered in `wh11ed-turn-steps-open`, from 2026-10-10). Opened, a step with something heads its rows, and a run of steps with
nothing is ONE quiet line ("Start of phase · Gain Core CP · Battle-shock") — the order stays readable
without a line apiece (owner, 2026-10-10: a line per empty step gave the screen to emptiness; the
"only steps with rules" switch that came first is gone). A side with nothing at all gets the empty
state instead of the folds. `count` is the rules (one named in two phases once) plus the card moments.

**What a unit says, four kinds** (owner, 2026-10-08), all under "Units", the kind before the name
where it is not a datasheet ability: its **datasheet abilities**; its **wargear abilities**, only
while it carries the item (the index says `d` — it starts with it — or `g`, the `[group, option]`
picks of the roster data that give it, matched against the entry's `wg`; an ability no item of the
unit is named after is `d`, showing over hiding); every **ability-set option** that names a phase,
under the set's name (which option is up is picked in the game, so all are offered); and its
**enhancement** — `entry.enh`, or the one the datasheet is forced to take in a fielded detachment
(`me` in the unit's record, since rosterEngine derives it and never stores it). Enhancements are
`enh` in the faction's record, by name, anchored to their card (`enh-<detId>-<slug>`).

**When in the phase** (2026-10-08): the index carries `m: { phase: 'start' | 'end' }` from
`phaseMomentsOf` (stratagemPhases.js) — a phase every mention of which is "at the start/end of …";
"until the start/end of …" is a duration and does not count, and a phase also named any other way is
during. ~150 starts and ~130 ends over the 960 entries. A row is what you look for at the table (the
units, or the rule's name) over one small line (what it is · the ability, or the detachment's name;
a doubles team's army after it).

**Two sides, not one.** 55 of the datasheet abilities that name a phase name their OPPONENT'S ("In
your opponent's Movement phase, if an enemy unit ends a move within 8"…"), and those are the ones a
player forgets — in the opponent's turn they are not thinking about their own cards. `usableInSlot`
from `stratagemPhases.js` answers per player, `mine` differing; it is the same predicate the
stratagem filter uses, so the two can never disagree about what "your Shooting phase" means.

**The data is a generated sidecar, `src/data/phaseIndex.js` (`npm run phases:index`)** — names,
phases and anchors, **no rule text at all**, ~600 abilities on 553 units plus 98 army/detachment
rules, 81 KB for all 30 factions. This screen imports neither `data/factions/<slug>.js` (~88 KB) nor
`data/datasheets/<slug>.js` (~132 KB, plus ~104 KB for the RU overlay) — `GameSetup` is
`defineAsyncComponent`-loaded for exactly that reason — and pulling four heavy chunks onto the
playing screen to show five lines would fight the product's central decision. A line shows a name
and the reader taps through to where the text already lives. Re-run the generator after editing a
faction rule or a datasheet ability, as with the other four indices.

**Keyed by what the caller already holds.** Detachments are keyed by NAME, not id, because the game
and the roster both store names — an id would mean loading the faction bundle to translate one.
Unit names ride in the index for the same reason (no second import just for names). An allied
unit's id carries its own faction (`agents-of-the-imperium:callidus-assassin`, `allySourceOf`), so
it is looked up in that faction's entry rather than missed.

**No classification of "activatable" vs "passive", deliberately.** It was tried and it does not
survive contact with the data: "in your Command phase, you can return 1 destroyed model" and "In
your opponent's Movement phase, if an enemy unit ends a move within 8"…" are both exactly what a
reminder is for, and no phrasing test separates them from a passive mention. Naming the phase is
the whole test — erring towards SHOWING, the same call `usableInSlot` already makes.

**Every line is a way in.** A name the reader cannot get to is half a reminder, so a line
navigates: a unit to its card — inside the attached list (`/tracker/game/roster/:pi?unit=<uid>`,
which `RosterViewView` reads into its initial `viewingUid`) so the game's own modifiers apply, or
to `/factions/:slug/datasheets/:id` when that player fielded no list; a rule to its anchor on the
faction page. A **detachment** rule has to be selected through `useFactionChoice` first, because
that page renders only the active one — the same two steps a search result takes, which is why the
index stores the same anchor ids the search index does. A rule carried by more than one ENTRY opens
the list instead of a card: three squads of the same datasheet are three cards, and there is no
single one to mean (counted by entry, not by name — the line still says "Boyz" once).

One line per RULE, with the units that carry it named under it — three Intercessor Squads with the
same ability are one reminder, not three identical lines.

## Setup wizard

**Setup is a four-step wizard** (`GameSetup.vue`, internal `step` ref): step 1 "Armies" (battle size, then per-player name + faction + detachments + battle ready, and on the opponent's card the invitation to two phones); step 2 "Mission" (**the twist**, then active disposition and the full primary `MissionCard`); step 3 "Field & deployment" (the score mode, strict rules, **who is the Attacker** — one linked seg, moved here from the army cards on 2026-09-17 because the Mission Sequence rolls for it after the mission and before deployment, and what it decides is the side of the table the layout marks — then the recommended layout A/B/C via `LayoutCard`); step 4 "Settings" (the option blocks). **The setup stops at the Mission Sequence's step 5** (owner, 2026-10-25, after his first 11th-edition game): the secondaries (step 6) and who goes first (step 10, rolled AFTER deployment) are not asked here — the game opens before the battle with them as steps to take (see "Before the battle" below), so `settings.firstTurn` leaves the wizard unset. Until then step 2 asked the secondaries before the roles and the layout, and step 3 asked who goes first before anyone had deployed. **Steps 3 and 4 are two columns above 700px** (`.two-col`, the threshold the player cards of steps 1–2 already use) so each fits one desktop screen like those do: step 3 puts the layout picture left (two thirds), capped to the height the screen has left (`max(260px, 100dvh − 23rem)`), and the questions plus the layout tabs in one card right (`LayoutTabs.vue` is drawn in the side column or above the picture by the same breakpoint, via `useMediaQuery`, so the tabs exist once); step 4 puts the `game` option group left and the `roster` group right — the split `trackerOptions.js` already makes. DOM order is phone order (questions, then the picture); the grid reorders.

## Before the battle (`PreBattle.vue`, since 2026-10-25)

The game screen while the battle has not begun (`begun: false`) carries, over the missions, the
Mission Sequence from where the setup stops — each step under its Event Companion number and title,
one line, with the sides' NAMES in it (who is the Defender is the question at the table, not the
word): **6** the secondaries, **7** battle formations (the turn bar's Reserves is where they are
marked), **8** deployment (the Defender first; TITANIC skips a turn), **9** redeployment (the
Attacker first), **10** the roll for the first turn, **11** pre-battle rules (whoever goes first).
Two of them are choices the tracker keeps, and Start waits for both, saying which in place of its
word (`battleWaitsFor`: `fixed` — a fixed side with no card, `secondaries`, `firstTurn`):

- **The secondaries** (`setSecondaries` rebuilds the side's deck for the mode while not begun,
  `secondaryState` being what `makePlayer` builds too). On one phone both sides are chosen here. In
  a shared game each phone chooses its own side, in secret as the sequence says: a side starts
  `secondaryPending` (set by `newGame` for a game promoted from a lobby), Done clears it
  (`confirmSecondaries`), a change sets it again, and until no side is pending another phone's
  choice is shown only as "choosing…" / "has chosen" — its deck too (`RoundTracker`'s `secretOf`).
  The choice rides in the side slice like any other of that side's; the hiding is the screen's.
- **The first turn** (`rollFirstTurn`): the winner moves to index 0 — the setup's order was
  provisional (`firstTurnPending`, set by `newGame` only when the setup left `firstTurn` unset, so a
  resumed or older game needs no roll) — and in a shared game the host marks it and the seats travel
  with the sides (`reseat`, as `EditSetupModal`'s first-turn switch does). Start is then the
  winner's to press, as it always was the first player's.

**The steps were re-cut on 2026-08-25** rather than a fifth being added for the roster options, and two of the moves were fixes rather than tidying. **The twist belongs with the mission because it CHANGES it**: Scrambled Communications swaps the two primaries, Mirrored World replaces both, and step 2's own preview goes through `derivePrimary(disp, disp, settings)` — which reads `settings.twist`. Chosen on the last step, as it was, it rewrote a card the player had already read and walked away from. Who goes first was moved next to the layout that day ("where and in what order do we set up") and left the setup altogether on 2026-10-25 — the sequence rolls for it after deployment (see "Before the battle"). What was left, the score mode and the toggles, is a settings page and now says so. The step indicator collapses to a compact "N / 4" on phones (`≤560px`). The two players are labelled **"You" / "Opponent"** (`trackerYou`/`trackerOpponent`) throughout the tracker (also the empty-name fallback in `RoundTracker`/`ScoreBoard`/`ScoreBreakdown`/history); player 1's name pre-fills from the most recent finished game (editable). The chosen `settings.layout` is shown next to the round label in `RoundTracker`. Parent contract unchanged (`@start`/`@cancel`).

**A name the player typed sets no floor — anywhere.** The same bug as the setup cards below,
found on a phone in a doubles game (2026-09-15): the CP row is one non-wrapping flex row, and in
doubles it carries **two** army buttons labelled with the members' own names. A flex item never
shrinks below its min-content — the longest word of that name — so the row's minimum came to
~367px against ~349px of card on a 393px iPhone; it overflowed its card and the whole DOCUMENT
scrolled sideways, which on iOS also drags the fixed navbar off the visual viewport (that offset
is the symptom a player actually reports). The fix is the pattern, not the patch: `.cp-row` wraps,
its buttons are `flex: 1 1 auto; min-width: 0`, and the label is its own `.proster-label` span
with `text-overflow: ellipsis` and the full name on `title`. A second line is spent only when the
width is genuinely gone. Only the FIRST button keeps `margin-left: auto` — one on each split the
free space between the pair instead of holding it at the far end.

**The two army cards use `minmax(0, 1fr)`, not `1fr`.** A grid item's automatic minimum is its
MIN-CONTENT width, and the attached-roster line inside a card is `white-space: nowrap` so it can
ellipsize — which makes its min-content the WHOLE name. A list called "We build thick city on rock
and roll" therefore widened the card past the screen and the whole page scrolled sideways, ellipsis
and all (an ellipsis only clips a box that was allowed to be narrower than its text). `EditSetupModal`
carries the same pair of cards and the same fix; the history page's roster pills take `max-width:
100%` for the same reason.

**The detachment picker (`DetachmentPickerList`) offers only what a tap could do** (2026-08-28): a detachment that no
longer fits the Detachment Points, or that clashes with a tag already taken (the detachment's own "UNIQUE:" tag), is off the
list rather than greyed. The screen it draws is shared by the wizard and by both Roster Builder
setup screens, and once a 3 DP budget is spent that was almost every row — a page of dimmed
entries reads as a broken screen, not as a constraint. Two things keep it honest, and neither is
optional: a line above the list says how many are not on offer and why, and a **Clear selection**
button (`@clear`, each caller emptying its own array) brings them all back — with a full budget
that is the only way back to the whole list. This is deliberately the opposite call to
`RosterPickerModal`'s, where a list of another faction stays visible but disabled: there, hiding
makes a collection look empty and reads as "my list is gone"; here the hidden rows are a budget
away, not a collection.

The **twist** is chosen on step 4 via a "Choose twist" button that opens `TwistPickerModal.vue` — a full-screen (bottom-sheet on mobile) accordion list of the twist rules with per-twist "Select" + a "Random twist" button; picking one returns to step 4. Mirrored World's shared-mission sub-picker stays inline on step 4.

**Setup is persisted as a draft** (`setupDraft` in `useTracker.js`, localStorage `wh11ed-tracker-setup-draft`, same auto-save machinery as `current`/`history`): the in-progress wizard (step + players + settings) survives reloads and navigating away. The Tracker home shows a **"Continue setup"** button when a draft exists; "New game" clears the draft and starts fresh; `start()`/cancel clear it. **Starting a new game (or resuming a past one) while a game is in progress does NOT discard the live game** — `TrackerHomeView` first archives it to history via the normal end flow (`finishGame('early')` + `archiveGame()`), so it's saved at its current score and stays resumable. GameSetup hydrates from the draft at init (before its reset watchers register) and deep-watches its state back into the draft. This same hydrate-from-draft mechanism is what `rosterHandoff.js` (Roster Builder) writes into to pre-fill setup from a saved roster.

## Combat Patrol (since 2026-10-15)

`settings.combatPatrol` plays the box's own game, as its mission sequence says (data and pages:
`src/views/combat-patrol/CLAUDE.md`). **Each player scores their own box's mission** —
`primaryOf(p, opp, settings)` in `useTracker.js` is the one derivation point now (`makePlayer` and
the step-2 preview), returning `cp-<box id>` for Combat Patrol and `derivePrimary` (the
dispositions' card, twist-aware) otherwise; `missionBySlug` serves a `cp-` slug from the Combat
Patrol data and `scorableBlocks` reads a block's own `rounds` before its heading. Step 2 asks no
Force Disposition and no secondaries (`missionOkFor` needs only the faction); the game screen has
no deck and the score board no Secondary line. Step 3 and the edit dialog offer the three Combat
Patrol maps (`resolveLayout`/`useSetupLayout` read `settings.combatPatrol`; `LayoutTabs :custom`
hides the custom tab) with a D6 roll (`CpLayoutRoll.vue`). The stratagems page drops
`CP_BANNED_CORE_STRATAGEMS` (Crushing Impact, Explosives, Rapid Ingress) while such a game is on.
Battle Ready's +10 is the ordinary checkbox — GW suggests leaving it off for a newcomer. The caps
are the ordinary ones too: the Combat Patrol pack in appdata says 15 a round, 45 a game.

**A Combat Patrol army is its box's list** (beta, 2026-10-15). At Start, `GameSetup` builds each
player's box as a roster (`combatPatrolRoster.js`: the box detachment's `linkedUnits` — a unit
twice for two of it — its flagged Warlord, and the enhancement picked on step 1, GW's default lit,
on the unit it names) and attaches the snapshot, so the Armies tab shows the box like any list:
cards, states, reserves. The list carries `cp: <box id>`; the roster screen provides it
(`useCombatPatrolBox`) and the loaders take it — `loadRosterFaction(slug, { cp })` adds the box's
units and detachment (`src/data/roster/combat-patrol/<box>.js`, generated, a folder the faction
glob never reaches so no catalogue offers them), `loadDatasheets/loadDatasheetsRu(slug, { cp })`
its sheets from combatPatrol.js (`combatPatrolSheets.js`). No points are shown for such a list.
**The box's own rules reach its cards** (2026-10-20): the detachment rule, stratagems and
enhancements as printed in the box, and its datasheets' abilities. Their modifier records came with
appdata's faction bundles all along but carried no `ref` (no faction file holds a box); the
generator now points them at `cp:<box id>` / the box unit's id (gen-roster-modifiers'
`combatPatrolIds`), `loadFactionWithCodex(slug, loc, cp)` adds the box's detachment under that id
(`combatPatrolDetachment`), and the CP tab's deck gives box stratagems the same `_detId`, so a
stratagem played there switches the card. The army rule is the faction's own record (the box prints
the same rule, sometimes pre-errata). Gates: `rosterModifiers/index.test.js` → "Combat Patrol box
records", `stratagemPlay.test.js`'s pairing sweep.

## Scoring

**Scoring** is by *condition*, not free entry: each mission block row is scored via `ScoringModal.vue` (a count stepper for "For each…" rows, a checkbox otherwise); `picks` store per-row counts keyed `blockIdx:rowIdx`, and VP = Σ count·rowVP. Caps: primary **15/round** — an **End of Battle** row on top, outside it (Event Companion FAQ; `setPrimaryRow`), **45/game**; fixed secondary **20** each; secondary **15/round** across the cards and **45** total (`secondaryRounds` in `gameScoring.js`); Battle Ready **+10**. `scorableBlocks(slug, role, round, locale)` round-gates blocks by their English heading (`BLOCK_ROUNDS`) — e.g. "Second Battle Round Onwards"/"End of Battle" aren't scorable in round 1 — for the callers that ask what scores NOW (end-of-turn check, phase reminder, draw preview); the scoring dialogs (primary, secondary) read `cardBlocks`, the whole card with the other rounds' blocks marked `offRound` and greyed by `ScoreRows` under "Not this round" (a player's report, 2026-10-20: in round 1 the primary's second half was simply missing; `scorableBlocks` is `cardBlocks` filtered) — and derives the per-each flag from the **English** text (display text is localized). Lookup/logic always read `missions.en` (slug/VP/structure are language-agnostic); `missionBySlug(slug, role, locale)` overlays `missionsRu.js` text for display only. **`or` brackets are mutually exclusive:** setting one bracket row clears the competing rows in its group (`orSiblingKeys` in `setPrimaryRow`/`scoreSecondaryRow`); per-tally "For each…/Each time…" `or` rows stay independent (and don't show the "Or" label).

**Tactical secondaries** (`SecondaryDeck.vue`): random "Draw card", **"Choose"** a specific card from a picker modal, and a per-card "⋯" actions modal — *Set aside* (`discardFromHand`, keeps VP) or *Return to deck* (`returnSecondaryToDeck`, full undo: drops the card's VP, redrawable). `drawSpecificSecondary`/`returnSecondaryToDeck` live in `useTracker.js`. Fixed mode is locked at setup. Tapping a card opens `ScoringModal`, which also shows the mission **`briefing`** and — for cards whose briefing has a **WHEN DRAWN** action (`mission.whenDrawn`, see Data) — a one-tap redraw button: `redrawSecondary(pi, slug, mode)` drops the just-drawn card (it has scored nothing) and draws a random replacement; `mode:'shuffle'` returns it to the deck, `mode:'discard'` removes it from play. It's offered only in tactical mode, auto-gated where the condition is computable (`gate:'first-round'` → only round 1; `gate:{pairedActive}` → only while the paired card is in hand) and always offered for board-state conditions the app can't check.

## Data

`src/data/missions.js` (`{ en, ru:en }`, 25 primary + 36 secondary; primary auto-selected by the two players' dispositions via `primaryFor`; also exports `getMissions(locale)` for the Event Companion Missions page — see `src/components/event/CLAUDE.md`); `src/data/missionsRu.js` (RU overlay of block text — **mission names & dispositions stay English**). Some cards carry an optional **`briefing`** (the intro text above the scoring blocks — only the ~26 cards that have one): an array of parts, each `{ label?, text }` (a paragraph) or `{ action, rows:[{label,text}] }` (an OBJECTIVE ACTION block like Cleanse/Plunder), transcribed from the card fronts (cards that defer to "(see reverse)" have none). RU `briefing` mirrors the EN structure and is swapped in **wholesale** (not merged per-field) by `localize`/`localizeMission`; rendered by the shared `MissionBriefing.vue` (used by both `MissionCard.vue` and the tracker `ScoringModal.vue`) above the blocks. Secondaries whose briefing is a WHEN DRAWN deck action also carry a language-agnostic **`whenDrawn`** `{ mode:'discard'|'shuffle', gate?:'first-round'|{pairedActive} }` (EN-only logic field, survives the RU overlay via the `...m` spread) — see the Tactical secondaries note above for how the tracker applies it. detachments/factions come from `src/data/mfmFactions.js` via `src/composables/trackerFactions.js` (`FACTIONS`, `FACTION_GROUPS`, `detachmentsFor`, `detachmentInfo`) — **split out of `useTracker.js` on purpose** so the heavy ~290 KB faction dataset only loads with the setup wizard (`GameSetup` is `defineAsyncComponent`-loaded in `TrackerGameView`, with a `SetupLoading` spinner), not on every in-game/finished screen. The store (`useTracker.js`) no longer imports `mfmFactions.js`; don't re-add it. The mission rules themselves are published only as card images, so `missions.js` was vision-transcribed (see `scripts/fetch-mission-cards.py`); MFM points data is scraped by `scripts/scrape-mfm.py`.

## Files

Views `src/views/tracker/{TrackerHomeView,TrackerGameView}.vue`; components `src/components/tracker/{GameSetup,RoundTracker,SecondaryDeck,ScoringModal,ScoreBoard,ScoreBreakdown,NumberStepper,SetupLoading}.vue`. The finished screen shows score boxes + a collapsible GDM-style per-round breakdown grid (`ScoreBreakdown.vue`). Dates are formatted via the shared `useFormatDate` composable. Out of scope: Deployment Zones.

**Modals** — every dialog uses the shared `src/components/BaseModal.vue` (overlay shell, `.modal-head` + localized close button, props `title`/`maxWidth`/`maxHeight`/`zIndex`, default-header or `#header` slot for custom headers) which wires `src/composables/useModalA11y.js` (Escape-to-close, Tab focus-trap, initial focus into the dialog, focus-restore to the trigger, `aria-labelledby`). **Do NOT add a body scroll-lock** there — on iOS Safari `body{overflow:hidden}` resets scroll (sticky-modal bug); background scroll-chaining is already contained by the global `.modal-body { overscroll-behavior: contain }` in `style.css`. iOS safe-area padding for the bottom-sheet modals is a global rule (`.modal-overlay > .modal`) — BaseModal keeps that class/structure. New dialogs should wrap `BaseModal`, not re-implement the shell. `BaseModal` renders via `<Teleport to="body">` — a test mounting a `BaseModal`-based component must assert against `new DOMWrapper(document.body)`, not the mounted wrapper's own `.text()`/`.find()` (see `src/components/tracker/modals.test.js`). (`KeywordPopover` stays custom — it's an anchored non-blocking popover, not a dialog.) For yes/no confirmations use the reusable `src/components/ConfirmModal.vue` (wraps `BaseModal`; props `title`/`message`/`confirmLabel`/`cancelLabel`; emits `confirm`/`close`; parent shows it with `v-if` and runs its action on `@confirm`) — **never `window.confirm`**.

**Twists** (optional pre-game modifiers, rule data in `eventCompanion.js` `twists` and browsable on the Missions page — see `src/components/event/CLAUDE.md`) are selectable in setup step 2 (pick / **Random** / **No Twist**). The chosen `settings.twist` applies to both players for the whole game and is shown as a collapsible reminder in `RoundTracker`. Two twists change the Primary Mission **mechanically** via `derivePrimary(myDisp, oppDisp, settings)` (the single primary-derivation point, used by both `makePlayer` and the setup preview): **Scrambled Communications** swaps the two players' primaries; **Mirrored World** sets both players to one shared mission from `MIRROR_MISSIONS` (the five `mirror:true` primaries) — chosen in setup or randomly resolved in `newGame` (persisted to `settings.twistMission`).

**RU-locale terms in the tracker stay English on purpose:** mission names, **Force Disposition**, "Battle Ready", "Attacker"/"Defender", "CP" — only mission *rules text* is translated. (Note: in the core rules RU, **Charge** is translated as «нападение» — "Фаза нападения"; **Surge** keeps «рывок».)

**Command Point / CP** (glossary: `sources/Vse_pamyatki_i_glossarii_po_vakhe.docx`) — in the **rules** RU text, full mentions read «командное очко (CP)» / «командные очки (CP)» (English kept in parens); inline costs/numbers stay English («1 CP», «+1 CP»). The tracker/`ui.js` keep bare «CP» (see above).

## See also

**Stratagem cards page** (`/stratagems`) shows detachment stratagems when a tracker game is in progress — documented in root `CLAUDE.md`'s Architecture section (it's a standalone top-level page, not under this directory, and also renders core rulebook stratagems outside any game).

**Roster Builder** (`/roster*`) is its own top-level nav section (not nested under this one) and hands a built roster off to `GameSetup` via the setup-draft mechanism above — see `src/components/roster/CLAUDE.md`.

**The clock — round, turn, phase.** `currentRound` has always been there; `currentTurn` (0/1) and `currentPhase` (a phase key) joined it on 2026-08-22. The field could not be called `phase`: that one is the GAME's state (`setup`/`playing`/`finished`). "Whose turn" needs no new concept — `players[0]` is **always** the first-turn player (`newGame` reorders, `updateSetup` keeps it so), so a turn index IS a player index. `stepPhase(±1)` walks the ten slots of a battle round and rolls over into the neighbour **through `goToRound`**, so the tactical-secondary housekeeping there still runs; `goToRound` in turn resets the clock to the first-turn player's Command phase, because a phase left over from the round you just left would read as "now" (stepping backwards writes the clock after that reset, which is how it lands on Fight). `canStepPhase` gates the arrows at the ends of the battle, like the round bar's own.

The row under the round bar (arrows + a "name · phase" button opening `PhasePickerModal`, which lists all ten slots split into the first-turn player's five and the second's) appears only for a game that asked: `settings.trackPhases`, a row of the option table above whose `available` is **a list being attached** — the roster screen is the only thing that reads a phase. Off by default, remembered from the last game. Games saved before any of this read as the opening phase and start writing the clock on their first step; no migration. What the clock is FOR lives in `src/components/roster/CLAUDE.md` (switch durations, phase-gated modifiers, the stratagem filter).

**A game can also carry each player's army list** (`player.rosterId` + `player.roster`, a self-contained snapshot). Attached in step 1 of the wizard — an icon button in the faction row opens `RosterPickerModal.vue` — automatically when the game was started from a roster, **or after the game has started**, from `EditSetupModal.vue` (the same picker, in the player card); **optional on both sides — a game with no lists is the normal case, and nothing here may require one.** An attached list decides that player's faction and detachments (`resolveArmyChoice`), so it **replaces the faction picker** with a `faction · list name ✕` line; detaching hands the picker back with that faction still selected. (The `resolveArmyChoice` guard that detaches on a faction change is therefore unreachable from the wizard now, and kept for a restored draft whose halves are out of step.) `RoundTracker` gives each player card **one army button**, sharing the CP row **below** the secondaries (both are things you consult between scoring passes, and above they pushed the round's actual scoring down): with a list attached it links to `/tracker/game/roster/:pi`, which renders the Roster Builder's own read-only view from the snapshot; without one it falls back to that player's faction datasheets (`/factions/:slug/datasheets`). Never both — the list is strictly the better answer when it exists (this army's units, with the game's live modifiers), and there's no room for two links beside the CP stepper. Because the button reads the player it belongs to, the opponent's army is one tap from their own card; that is what replaced the bottom nav's conditional «Units» item (root `CLAUDE.md`). The row renders for either half alone, and drops out entirely only for a legacy game with no `factionSlug` and CP off. **Attaching mid-game is deliberately weaker than the wizard's.** In the wizard the list IS the army: it decides the faction and the detachments. Once play has started neither is the list's to decide — missions, the army-rule tracker and the points already scored hang on the faction, the stratagems and DP on the detachments — so `EditSetupModal` only fills in what is still blank (a faction on a game saved before one was mandatory; detachments never chosen) and reports a detachment disagreement as a warning line instead of resolving it. The picker takes an optional `faction` prop for this: lists of another faction stay **visible but disabled** (hiding them makes a collection look empty and reads as "my list is gone"), and a pasted share link of the wrong faction is refused with its own message. Detaching, as in the wizard, leaves the faction and detachments alone. `updateSetup` carries the four fields, and the modal's local draft means Cancel discards the attachment. Nothing measures the game at attach time — see `rosterGameLink.test.js` for why two full lists can't approach the cap. The snapshot deliberately stores the roster's compact stored form — a synced game is capped at 512 KB by `wh11ed-api`, and every save and sync carries it. Mechanics and rationale: `src/composables/rosterGameLink.js` + the "roster attached to a game" section in `src/components/roster/CLAUDE.md`.

**`player.ctx`** goes with it: the rule-condition switches (`ctx.army[id]` / `ctx.units[uid][id]`, each storing WHEN it was flipped as a clock stamp, written by `setArmyCondition`/`setUnitCondition` — see the clock below). They answer what the app cannot know — a unit charged, an Order is on it, a Detachment rule is running — so the roster view may apply that modifier instead of only footnoting it. Absent on older games; every read defaults it. Conditions the tracker ALREADY knows (a called Waaagh! lives in `player.army.toggleRounds`) are read from there and are not duplicated as switches.

## The tutorial

`useTour.js` + `TourOverlay.vue` (mounted in `App.vue`), chapters in `src/data/tourChapters.js`;
on everywhere since 2026-10-19 (written in the beta), mounted only on the tracker and roster
screens, so a tab reading rules never loads the chapters. Before the first chapter starts by itself
the player is asked once per device whether to turn the tutorial on ("There is a tutorial now"),
and told that any screen's tutorial opens from ⚙ → "Tutorial of this screen". A chapter is shown once per device the
first time its screen asks for it (`maybeStart(id, ctx)`), and again from the game's ⋯ menu;
`?tour=reset` clears what was seen. The texts follow the owner's voice: every step starts with the
action, then says what the thing is, in the names the screen prints.

- **A step lights an element by its `data-tour` value**, never a CSS class — a restyle must not
  lose the tour. A list repeats the attribute on every row; the overlay lights the first visible one.
- **A step can put the screen in the state it tells about** — `show: { tab: 'cp', side: 'opp' }`.
  The screen that owns the state answers with `useTourShow(key, apply)`: the game screen (`tab`,
  `side`), the roster list (`listTab`), the roster page (`viewTab`), the catalogue (`filters`), the
  editor on a phone (`editorMode`). A chapter never clicks the page; walking back re-applies the
  step's own state. Keys a step does not name are left alone.
- **Chapters asked for together wait in line** (the rosters' desk is a list and a roster at once)
  and start only while something they light is on screen; one not shown within a minute is dropped.
- **A step whose element is not on screen is left out** when its chapter starts (unless it opens
  something with `show`), and passed over in the reading direction if it vanishes later — a field
  a choice not made yet would bring, a column only the desk has. A field that comes later gets a
  chapter of its own instead (`roster-disposition`).
- A panel taller than the screen is lit by its tab strip, not by itself: the light would fill the
  screen and the page would scroll deep into it.
- **Shared and doubles games change what a step may say.** The game screen's `ctx` carries
  `shared`, `host`, `canTurn` (the turn buttons are this phone's) and `doubles` as getters, read
  when the chapter starts — and in a shared game the chapters wait for the server's first answer
  (`party.held`), or a guest is told to press a "Start game" that is grey on its screen. Steps
  come in variants by `when`; a doubles step names the partner's army by seat (`member:
  'partner' | 'mine'`), never by index — a guest may sit on the team's second army. Chapters of
  their own: `shared` (after the game's), `lobby-guest` (a guest's side), `lobby-wait`; the
  setup's chapters take `ctx.lobby` (its `setup-invite` step says "invite" before the lobby and
  "the code again" after).
- **Seen once, then on request.** Every screen's chapters come back from the ⚙ menu ("Tutorial of
  this screen"): `maybeStart` records what the page asked for, seen or not, in `tourScreen.js` (a
  module without the texts — the navbar is in the root bundle), the overlay forgets it on a new
  page (App's `pageKey`), and `replay()` shows again those whose elements are on screen. The game
  screen's own ⋯ menu keeps its item.

