# Roster Builder — status

Written 2026-08-03 after merging `main` into `feat/roster-builder` (branch had diverged 13
days / 396 main commits). Transient tracking doc — architecture reference lives in
`src/components/roster/CLAUDE.md` (directory-scoped, loads contextually instead of bloating
`wh11ed/CLAUDE.md`); this file is just the "what's left" list so it doesn't get re-derived
from the commit log again. Delete once every item below is closed.

## Status: functionally complete v1, undocumented (now documented)

The commit history (`git log --oneline <merge-base>..055cf56`) runs through named phases —
Phase 2a (derived data layer) → Phase 9 ("hand off to the tracker") — followed by a round of
polish commits (warlord/enhancement eligibility, tabbed editor, accordions, wargear group
order). The core loop (build a list → validate → export/share → hand off to the Game Tracker)
is implemented and tested.

## Open items

1. **`RosterUnitRulesModal` doesn't overlay live modifiers.** It renders the unit's *base*
   datasheet only — a chosen enhancement, wargear pick, or Warlord trait that changes a
   stat/ability isn't reflected in the preview. Explicitly flagged in the component's own
   comment (`src/components/roster/RosterUnitRulesModal.vue:4-7`). The roster entry (wargear
   picks, enhancement, warlord flag) is already available to the caller — this is a "do the
   overlay" task, not a "find the data" task.
   **Grew into its own multi-phase task on 2026-08-19 — plan, decisions and progress now live
   in `ROSTER-MODIFIERS-PROGRESS.md`.** Short version of what the research found: appdata has
   almost no structural modifiers (6 ability + 2 weapon-profile links across 961 enhancements),
   so an overlay attributes rather than silently recomputes — same philosophy as the existing
   `grantedKeywords` prop on `DatasheetCard`.
2. **No cloud backup.** Game Tracker history syncs to `wh11ed-api`; rosters are
   `localStorage`-only (`useRosters.js`). Unclear whether that's a deliberate v1 scope cut
   (rosters are meant to be quick/disposable, sharing already covers cross-device via the
   link) or a planned follow-up — worth a decision before calling this "done", not
   something to build blind.
3. **Stale comment** in `scripts/gen-roster-data.mjs`'s header claiming it "emits units
   without gear for now" — full wargear-option parsing is implemented; nobody updated the
   comment after that landed. Cosmetic, low priority, noted in the scoped CLAUDE.md too.

4. **`lockDs` inverted eligibility for all 13 attach-granting enhancements — FIXED 2026-08-19.**
   Reported as Necrons' Murdermind being offered on Skorpekh Destroyers though its own text says
   **CRYPTEK** model only.

   Cause: `gen-roster-data.mjs` read appdata's `enhancement_bodyguard_group` (+ `_datasheet`) as a
   whitelist of datasheets allowed to TAKE the enhancement and emitted it as `lockDs`. Those
   tables actually list the units the *bearer* may attach to — which this repo already documented
   correctly in `scripts/sync-enh-bodyguards.mjs`'s header. The gate fired in both directions:
   Murdermind was offered on the four Destroyer datasheets and refused to all 7 Crypteks;
   Slippery Git landed on Kommandos and not the Warboss; Catechism of Divine Penitence on
   Repentia Squad and not the Canoness; Wolf-touched on Wulfen. All 13 enhancements carrying such
   a group were affected, across ~10 factions.

   Fix: that one source was removed from the generator and the roster data regenerated (13
   `lockDs` entries gone). **`lockDs` itself stayed** — the first fix sketch here was wrong about
   that. Its other source, the hand-curated `ENH_LOCK_FIXES`, is legitimate and load-bearing: 36
   "(Upgrade)"-type enhancements name one unit in their prose while appdata records no
   unit-specific keyword at all, so without the lock they show on any Character of the faction
   (Necrons' Enlivened Sentinels appearing on Immortals). Regression tests in
   `rosterEngine.test.js` pin both halves — real data for the attach-granting ones, a fixture for
   the curated lock. The regeneration also brought the roster data up from appdata 913 to 925,
   which added 4 Aeldari units (Clanblade, Dragon Knights, Leystalker, Stonesinger) and changed
   no points, sizes or detachments.

## Where the merge-into-main work is recorded

The `main`-catch-up merge itself (conflict resolution, a stale test fixed for `BaseModal`'s
`<Teleport>`, `getFaction()` → `loadFaction()` call-site updates) is documented in the merge
commit message (`git log --grep "Merge branch 'main' into feat/roster-builder"`), not
repeated here — this file is about the feature's own state, not that housekeeping.
