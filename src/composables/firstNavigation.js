// The first navigation of a start, bounded: the app is mounted once it has settled — or once it has
// had RESUME_MS and has not.
//
// The installed app reopens on the page it was left on (router/index.js, the restore guard), and
// main.js mounts only after that navigation, so the reopened page is drawn at once with nothing
// before it. But that page is a chunk of its own, and after a release renamed it, the device may
// not hold it yet: the worker goes to the network for it, and through a bad connection (a player's
// Android behind a VPN, 2026-11-03) the request neither came nor failed. Nothing was mounted and the
// app stayed blank; when it failed at last, the app came up on no page at all — the bars and the
// footer, nothing between them, "Сервер недоступен" in the menu since the API did not answer either.
//
// The page left last time is a convenience, never a reason not to open: when it is not there in
// time, or does not load, the app opens on home, which is in the shell and always on the device.
// Quietly (owner, 2026-11-02: a failed load says nothing). Any other first page — a link, a
// shortcut — is what the reader asked for: the app is mounted around it while it loads, and only
// a page that fails outright gives way to home (a reload would ask for the same missing file).
export const RESUME_MS = 3000

/**
 * @param {{ isReady: () => Promise<unknown>, replace: (to: string) => Promise<unknown> }} router
 * @param {{ resumed: () => boolean, home?: string, ms?: number, wait?: (ms: number) => Promise<unknown> }} opts
 * @returns {Promise<'ready' | 'home' | 'late'>} what the start did: its page, home instead, or mounted before its page
 */
export async function settleFirstNavigation(router, { resumed, home = '/', ms = RESUME_MS, wait = (t) => new Promise((r) => setTimeout(r, t)) }) {
  const ready = router.isReady().then(() => 'ready', () => 'failed')
  const outcome = await Promise.race([ready, wait(ms).then(() => 'slow')])
  if (outcome === 'ready') return 'ready'
  // Failed: the device does not have that page, whichever it was — the start owns this failure and
  // nothing reloads for it (staleChunks.js). Slow: only the page left last time gives way.
  if (outcome === 'failed' || resumed()) {
    // A newer navigation cancels the one still waiting for its chunk.
    await router.replace(home).catch(() => {})
    return 'home'
  }
  // Mounted around a page still loading: if it fails after all, the same answer, later.
  ready.then((o) => { if (o === 'failed') router.replace(home).catch(() => {}) })
  return 'late'
}
