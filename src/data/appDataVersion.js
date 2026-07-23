// The wh40k-appdata `data_version` (the GW app's own dump version) this build's rules were last
// reconciled against — shown under the app version in the footer. Single source of truth: the sync
// tooling re-exports this as SYNCED_DATA_VERSION (scripts/lib/sync-common.mjs), so bump it HERE in
// the same commit that lands a re-sync (see the appdata bump runbook).
export const APP_DATA_VERSION = 912
