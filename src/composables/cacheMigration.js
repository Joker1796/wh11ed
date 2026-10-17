import { reactive } from 'vue'
import { getItem, removeItem } from './safeStorage.js'
import { reloadsHeld } from './reloadLoop.js'
import { appUpdate } from './useAppUpdate.js'
import { useOfflineWarmup } from './useOfflineWarmup.js'
import { useUpdateNotice } from './useUpdateNotice.js'
import { currentRegistration, dropCaches } from './workerPolicy.js'

// A tab that got a service worker before 2.9.5 is moved off it (workerPolicy.js says why tabs no
// longer have one). Nothing does it behind the reader's back: a plate says so and its button does it
// (owner, 2026-10-16) — under the dialogs, so what is open is finished first, with no ✕.
//
// Only at a calm moment (owner: a reader who opened the wrong app and closed it, who is clicking
// through tabs or scrolling must not get it): the page in view for 10 s since the start, no page
// change for 3 s and none loading, no scrolling for 1.5 s, no download running, the worker neither
// installing nor waiting, no reload held, no update plate and no "What's new" bar up, no dialog the
// app opened by itself. No such moment — it waits for the next visit, the tab working as before.
//
// "Apply" takes the worker off (`unregister`, one step) and then deletes its caches. Without a
// reload: the page stays as it is, under the old worker until it is left; the next load is the
// server's. Cut short between the two steps, the start of the next load deletes what is left
// (tidyAfterWorker); cut short before the first, the worker is still there and so is the plate.

export const VISIBLE_MS = 10 * 1000
export const STILL_NAV_MS = 3 * 1000
export const STILL_SCROLL_MS = 1500
const TICK_MS = 1000
const WARMED_KEY = 'wh11ed-offline-warmed'

// phase: 'idle' — not shown; 'shown' — the plate is up; 'done' — applied.
// `warmed`: the tab had downloaded the whole site for offline — the plate tells it where offline is now.
export const cacheMigration = reactive({ phase: 'idle', warmed: false })

/** What the calm-moment check reads; the seams are for tests. */
export function calmNow(s) {
  return s.visibleMs >= VISIBLE_MS
    && !s.navigating && s.now - s.lastNav >= STILL_NAV_MS
    && s.now - s.lastScroll >= STILL_SCROLL_MS
    && s.warmup !== 'warming'
    && !s.workerBusy && !s.held
    && s.update === 'idle' && !s.notice && !s.dialog
}

let timer = 0
let onApplied = () => {}

/**
 * Started once by App.vue for a tab under a worker it may leave (workerPolicy.tabMayLeaveWorker).
 * `dialogBusy()` answers whether a dialog the app opens by itself is up; `applied` is called after
 * "Apply" (App.vue then watches the tab's freshness the way a tab without a worker does).
 */
export function watchForCalm(router, { dialogBusy = () => false, applied = () => {} } = {}) {
  if (timer || cacheMigration.phase !== 'idle') return
  onApplied = applied
  const warmup = useOfflineWarmup()
  const notice = useUpdateNotice()
  let visibleMs = 0
  let navigating = false
  let lastNav = Date.now()
  let lastScroll = 0
  let lastTick = Date.now()
  router.beforeEach(() => { navigating = true })
  router.afterEach(() => { navigating = false; lastNav = Date.now() })
  router.onError(() => { navigating = false })
  window.addEventListener('scroll', () => { lastScroll = Date.now() }, { passive: true, capture: true })

  timer = setInterval(async () => {
    const now = Date.now()
    if (document.visibilityState === 'visible') visibleMs += now - lastTick
    lastTick = now
    const reg = await currentRegistration()
    if (!reg) return stop() // the browser dropped it: nothing to move off
    const calm = calmNow({
      visibleMs, now, navigating, lastNav, lastScroll,
      warmup: warmup.status.value,
      workerBusy: !!(reg.installing || reg.waiting),
      held: reloadsHeld(now),
      update: appUpdate.phase,
      notice: notice.visible.value,
      dialog: dialogBusy(),
    })
    if (!calm || cacheMigration.phase !== 'idle') return
    cacheMigration.warmed = getItem(WARMED_KEY) !== null
    cacheMigration.phase = 'shown'
    stop()
  }, TICK_MS)
}

function stop() {
  clearInterval(timer)
  timer = 0
}

/** The plate's button. */
export async function applyMigration({ registration = currentRegistration, drop = dropCaches } = {}) {
  if (cacheMigration.phase !== 'shown') return
  const reg = await registration()
  try {
    if (reg) await reg.unregister()
  } catch {
    // Still under the worker: the plate goes, and the next visit offers it again.
    cacheMigration.phase = 'idle'
    return
  }
  await drop()
  removeItem(WARMED_KEY)
  cacheMigration.phase = 'done'
  onApplied()
}

// Tests only.
export function _resetCacheMigration() {
  stop()
  cacheMigration.phase = 'idle'
  cacheMigration.warmed = false
  onApplied = () => {}
}
