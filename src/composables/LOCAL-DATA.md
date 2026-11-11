# Device data

`localData.js` is the synchronous reading cache and write coordinator; `utils/localDatabase.js`
owns native IndexedDB transactions; `utils/localRecords.js` maps existing envelopes to records.
The database is `wh11ed-local-data`, schema version 1. It contains only personal lists, games
and the setup draft. Rules, account tokens and the service worker caches are not moved here.

`main.js` starts initialization alongside the reference shell. `personalDataReady` gates personal
route and dialog imports before synchronous store hydration; chunk-graph checks keep personal
stores outside the shell. Opening is bounded at 2.5 s and retried once; transactions at 5 s. An
initialization failure leaves reference pages usable, but blocks roster/tracker screens. The
startup notice is nonblocking over reference pages and blocking over personal screens. No empty
fallback is written over a migrated database. Storage access itself is lazy: a denied localStorage getter cannot
throw during the shell's imports.

`LocalDataStartup` mounts before the app. It stays invisible for the first 500 ms, then shows
a non-dismissible status until initialization finishes. Migration counters advance on successful
IDB put requests; transaction completion is followed by a separate read-back verification stage.
Roster and game counts exclude the setup draft. A fast initialization never flashes the surface.

## Migration and rollback

The four original localStorage keys retain their names and contents:

- `wh11ed-rosters`
- `wh11ed-tracker-current`
- `wh11ed-tracker-history`
- `wh11ed-tracker-setup-draft`

The first transaction copies them to `records`, preserves the exact source in
`meta['legacy-original']`, and writes the migration marker together. The source is read back and
compared before initialization succeeds. A failed/aborted copy does not modify the source.
`meta['legacy']` separately tracks the last legacy snapshot seen; changes made by an older open
build are checked before a new write and at startup.

The original keys are retired `LEGACY_RETIRE_MS` (30 days) after the migration (`meta['migration'].at`;
a marker written before that field existed is stamped on its next start). Retirement happens at
startup only when the keys equal the last acknowledged snapshot and no conflict is pending: one
IDB transaction records `legacy-retired` and an all-null `legacy`, then the keys are removed.
`legacy-original` stays in IDB permanently. After retirement the keys are no longer a source;
anything an older build still writes there is kept in recovery as `retired-legacy` (quarantined,
in the backup download) and removed, never imported over the database.

Legacy collections are inspected one entity at a time. Invalid JSON, malformed entities and
duplicate identities are preserved as `recovery` entries with `status: 'quarantined'`; healthy
entities remain available. The first valid occurrence of a duplicate is used. An incomplete
legacy collection never authorizes deletion of a record from IDB. A damaged obsolete legacy
copy cannot block a previously migrated database. Invalid stored IDB records are likewise
excluded from the working view and retained both in place and in recovery. Ordinary writes
still use the strict format boundary. No entity is silently repaired or discarded.

`LocalDataRecoveryNotice` offers a device backup download when quarantine is nonempty. It
contains the original legacy strings, raw IDB records, safe legacy-format `items`, the current
pending journal and all recovery entries. Dismissing the notice only affects that page session.

An entity retains its own schema version. Combining an old untouched roster and a newly saved
one must not promote the former to the latter's schema. `useRosters.migrate()` consumes and
removes per-roster `v` before exposing rosters to the app. Unknown fields survive.

Before rolling back to a pre-IDB build, close other tabs and export the current data and recovery
records. In a development session `await localData.backup()` returns a versioned object containing
`items` in the legacy key/value format, `legacy` (the exact original source) and `recovery`.
For a deployed build the same data is in DevTools → IndexedDB → `wh11ed-local-data`; no account
or server is involved. Within the 30-day window the old build reads the untouched original keys,
so simply opening it restores the pre-migration collection, **not subsequent edits**; after
retirement it opens empty and the data must be restored from the export. Import/export the new data before
doing that; never clear IndexedDB or promise that an old build can read it. If the legacy format
does not fit localStorage, keep the export and the new database rather than truncating it.

## Writes, conflicts and restart

Records are versioned independently: `roster/<id>`, `history/<id>`, `current`, and `setup`.
Deletes retain a null-valued versioned tombstone. A transaction checks every touched revision
before applying any change. Independent roster/history edits merge, while archive/resume writes
both locations atomically. Client clocks do not authorize replacement.

Each tab stages its record changes in `wh11ed-local-pending/<actor>` before submitting IDB work.
These are patches, not a second full history. A lifetime Web Lock protects only that tab's
journal; **it never prevents another tab from editing**. On restart only journals whose owner
has gone are replayed. IDB keeps one high-water receipt per writer in `meta` so a committed
journal left behind by a denied remove cannot revive an older version. A full localStorage
journal does not prevent an ordinary IDB commit; the UI reports failed saving until the database
confirms it. If neither medium can save, changes remain in memory and the page asks to stay open.

A refused transaction saves its candidate in `recovery`, without changing `records`.
`LocalDataNotice` uses the standard `ConfirmModal`: continue editing or explicitly save this
variant. The dialog stays mounted with disabled buttons during commit. Confirmation checks the
versions shown by the previous refusal again; another intervening save requires another answer.
The replaced records and the confirmed candidate remain in recovery. Closing the dialog does
not discard work; another save presents the decision again, and reopening restores the pending
candidate. The same mechanism applies to automatic in-game saving.
Recovery considers only candidates from closed owners; a live tab's in-progress conflict must
never populate another tab's working view. Reactive Vue objects are converted to plain JSON
before they cross the IDB structured-clone boundary. `flush()` and confirmation wait for staged
recovery writes, not just ordinary record commits.

Cloud roster saving waits for a successful local flush. A local conflict cannot be bypassed by
immediately uploading to the cloud. The cloud contract itself is `/roster-sync` with server
revisions (useRosterSync.js, the API's README); `summary` travels but is not part of a list's
content identity.

Non-booted consumers (unit fixtures and data-generation tooling) use the original synchronous
localStorage adapter. Browser boot always initializes first. Critical conflict copies require a
synchronous journal before replacing memory; failure leaves the source intact.

## Verification

`npm test -- --maxWorkers=2`, `npm run lint`, `npm run typecheck`, and `npm run build` cover the
app and the format boundary. `localData.test.js` runs the coordinator itself — migration,
quarantine, conflicts, confirmation, merge, atomic archive, full journal, journal replay — against
`fake-indexeddb`, so CI catches a regression without a browser. It does not replace the real
engines below: WebKit's auto-commit and real quota behaviour exist only there. `npm run test:local-data` needs Vite on localhost:5176
(`LOCAL_DATA_URL` overrides it) and installed Chrome/WebKit. It uses isolated contexts, no owner
browser or production account. It exercises actual IDB, aborts an archive transaction, fills the
synchronous journal, kills a page before commit, checks committed-journal receipts, and drives
the real confirmation dialog in two tabs. It also checks malformed legacy/IDB records, downloads
the quarantine backup, creates/archives a game through useTracker and reopens the app.
Every new persistence failure needs a scenario against the browser storage,
not just an in-memory storage mock.


## Live views in other tabs

One BroadcastChannel sends invalidation after a committed write, never data bodies. Focus and
visibility refresh cover missed messages and suspended PWA windows; no polling is used. Reads
coalesce, with one additional pass when an invalidation arrives during the previous read.

`localDataView` registers each loaded store's capture/hydration pair. Captures run before and
after the async database read, including edits before Vue watchers or save debounce execute.
Dirty records retain their original revisions and local values. Clean records adopt DB changes;
collection envelopes are rebased so additions/deletions in another tab cannot become accidental
writes. A conflict in one entity does not prevent clean entities updating. Current→history moves
are read in one transaction and published together. Hydration keeps unchanged entity references
and suppresses autosave through Vue's batched watcher tick. Game roster snapshots are separate
from the source army list. Newer roster revisions remain protected by the existing read-only path.

`npm run test:local-data` covers migration, conflict races, clean refresh and atomic archival in
Chrome/WebKit. `npm run test:roster-live` covers actual equipment controls, an edit inside the
save debounce window, independent records and ambiguous old loadouts.

Critical tracker transitions require the synchronous journal to succeed before pending flags are
cleared. Repeating archive for an identical history record is idempotent. A different record
with the same identity requires the existing replacement confirmation. The candidate journal
carries requiresConfirmation, so restart cannot bypass that decision; the database retains
both versions in recovery. Non-booted tooling blocks the archive with a storage error instead.
It never chooses a winner silently. Invalid ordinary writes roll back the synchronous
view and desired changes before reporting the error; legacy duplicate quarantine is unchanged.

In memory, confirmation requirements are generation-scoped. A completed commit clears only the
generation it submitted; edits during an older autosave or confirmation retain their own decision.
An older confirmation also leaves a newer recovery candidate intact; the next submission
resolves that candidate atomically so restart cannot select an obsolete decision. The same
snapshot rule applies when an empty change only resolves recovery. The persisted journal still
uses a boolean marker plus impossible expected revisions for older readers. A confirmation is rejected if its displayed candidate changed while awaiting other work.
