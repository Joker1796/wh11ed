# Device data

`localData.js` is the synchronous reading cache and write coordinator; `utils/localDatabase.js`
owns native IndexedDB transactions; `utils/localRecords.js` maps existing envelopes to records.
The database is `wh11ed-local-data`, schema version 1. It contains only personal lists, games
and the setup draft. Rules, account tokens and the service worker caches are not moved here.

`main.js` initializes it before mounting the app. There is a five-second bound on opening and
transactions. An initialization failure leaves the reference pages usable, but prevents the
roster/tracker screens from mounting over an unknown or stale copy. No empty fallback is written
over a migrated database. Storage access itself is lazy: a denied localStorage getter cannot
throw during the shell's imports.

## Migration and rollback

The four original localStorage keys retain their names and contents:

- `wh11ed-rosters`
- `wh11ed-tracker-current`
- `wh11ed-tracker-history`
- `wh11ed-tracker-setup-draft`

The first transaction copies them to `records`, preserves the exact source in
`meta['legacy-original']`, and writes the migration marker together. The source is read back and
compared before initialization succeeds. A failed/aborted copy does not modify the source.
The original keys are not deleted. `meta['legacy']` separately tracks the last legacy snapshot
seen; changes made by an older open build are checked before a new write and at startup.

An entity retains its own schema version. Combining an old untouched roster and a newly saved
one must not promote the former to the latter's schema. `useRosters.migrate()` consumes and
removes per-roster `v` before exposing rosters to the app. Unknown fields survive.

Before rolling back to a pre-IDB build, close other tabs and export the current data and recovery
records. In a development session `await localData.backup()` returns a versioned object containing
`items` in the legacy key/value format, `legacy` (the exact original source) and `recovery`.
For a deployed build the same data is in DevTools → IndexedDB → `wh11ed-local-data`; no account
or server is involved. The old build reads the untouched original keys, so simply opening it
restores the pre-migration collection, **not subsequent edits**. Import/export the new data before
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
immediately uploading to the cloud. The versioned cloud HTTP contract is unchanged.

Non-booted consumers (unit fixtures and data-generation tooling) use the original synchronous
localStorage adapter. Browser boot always initializes first. Critical conflict copies require a
synchronous journal before replacing memory; failure leaves the source intact.

## Verification

`npm test -- --maxWorkers=2`, `npm run lint`, `npm run typecheck`, and `npm run build` cover the
app and the format boundary. `npm run test:local-data` needs Vite on localhost:5176
(`LOCAL_DATA_URL` overrides it) and installed Chrome/WebKit. It uses isolated contexts, no owner
browser or production account. It exercises actual IDB, aborts an archive transaction, fills the
synchronous journal, kills a page before commit, checks committed-journal receipts, and drives
the real confirmation dialog in two tabs. It also creates/archives a game through useTracker
and reopens the app. Every new persistence failure needs a scenario against the browser storage,
not just an in-memory storage mock.
