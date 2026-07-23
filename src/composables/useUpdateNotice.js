// Update-notice state — a module singleton (same pattern as useLocale). Decides whether to show the
// "new version" banner by comparing the newest changelog entry against a stored "last seen version".
//
// changelog.js ships inside the bundle, so `latestEntry.version` is always the newest note in the
// running build — it can never announce something the code doesn't yet have. A genuine first-time
// visitor is seeded silently (no banner on first load); after that, any newer changelog entry shows
// the banner until it's dismissed or the /changelog page is opened.
//
// RETURNING vs NEW: the very first release to ship this mechanism finds NO stored last-seen version
// on ANY device, so a naive silent-seed would hide the banner from everyone — including long-time
// users who should see what's new. We tell the two apart by other app state: a returning user has
// some other wh11ed-* key (a saved game, a faction pick, a UI pref, the installed-PWA flag), written
// only by prior use; a brand-new visitor's storage is empty at module-init (the tracker's own writes
// are debounced and fire after mount). So: seed silently only when storage is truly empty; a
// returning visitor keeps a null last-seen and sees the banner once, until markSeen() stores it.
import { ref, computed } from 'vue'
import { getItem, setItem } from './safeStorage.js'
import { latestEntry } from '../data/changelog.js'

const LAST_SEEN_KEY = 'wh11ed-last-seen-version'

// Any wh11ed-* key other than our own → the app has been used here before.
function isReturningVisitor() {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && k !== LAST_SEEN_KEY && k.startsWith('wh11ed-')) return true
    }
  } catch { /* storage unavailable → treat as a brand-new visitor */ }
  return false
}

const seenVersion = ref(getItem(LAST_SEEN_KEY))

// Genuine first-time visitor (no last-seen AND no other app state): seed to the current latest so
// they don't get an update banner on their very first load. A returning visitor is left unseeded
// so the banner shows once for the release that first ships this mechanism.
if (!seenVersion.value && latestEntry && !isReturningVisitor()) {
  seenVersion.value = latestEntry.version
  setItem(LAST_SEEN_KEY, latestEntry.version)
}

const visible = computed(() => !!latestEntry && seenVersion.value !== latestEntry.version)

function markSeen() {
  if (!latestEntry) return
  seenVersion.value = latestEntry.version
  setItem(LAST_SEEN_KEY, latestEntry.version)
}

export function useUpdateNotice() {
  return { entry: latestEntry, visible, markSeen }
}
