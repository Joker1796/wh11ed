// What build this is, read from the page rather than compiled into the code.
//
// Both numbers change on every deploy. Compiled in (the old `__APP_VERSION__` define, and the
// changelog imported for its top entry), they sat in the entry chunk — which every route chunk
// imports, by its hashed name — so a deploy that changed nothing but the number renamed all ~80
// route chunks, and the installed app downloaded every one of them again (2026-09-27; on a poor
// mobile connection that is a long wait for nothing). index.html is not content-hashed, so the
// numbers ride there as two <meta> tags vite.config.js writes (`buildInfoMeta`), and the code
// that reads them stays byte-identical from one release to the next.
//
// The notes version is the changelog's top entry, not the app's: a deploy with nothing to announce
// ships no entry, and the "what's new" banner keys on the notes (useUpdateNotice.js). It comes
// from the SAME page as the code, so it can never get ahead of the build that is running.
function meta(name) {
  return (typeof document !== 'undefined' && document.querySelector(`meta[name="${name}"]`)?.content) || ''
}

export const APP_VERSION = meta('wh-app-version')
export const NOTES_VERSION = meta('wh-notes-version')
export const BUILD_ID = meta('wh-build-id')
export const OFFLINE_MANIFEST_URL = meta('wh-offline-manifest') || '/offline-manifest.json'
