// Update-notice state — a module singleton (same pattern as useLocale). Decides whether to show the
// "new version" banner by comparing the newest changelog entry against a stored "last seen version".
//
// changelog.js ships inside the bundle, so `latestEntry.version` is always the newest note in the
// running build — it can never announce something the code doesn't yet have. A first-ever visitor is
// seeded silently (no banner on first load); after that, any newer changelog entry shows the banner
// until it's dismissed or the /changelog page is opened.
import { ref, computed } from 'vue'
import { getItem, setItem } from './safeStorage.js'
import { latestEntry } from '../data/changelog.js'

const LAST_SEEN_KEY = 'wh11ed-last-seen-version'

const seenVersion = ref(getItem(LAST_SEEN_KEY))

// First-ever visitor: seed to the current latest so new users don't get an update banner on load.
if (!seenVersion.value && latestEntry) {
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
