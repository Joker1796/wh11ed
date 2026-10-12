// @ts-check
// A write to localStorage, deferred so a burst of edits (a name typed, a counter stepped) costs one
// serialisation, and flushed at once when the page goes away — so the last edit is never the one
// lost. The rosters and the tracker each kept a copy of this; both now use this one.
//
// Why three events: `pagehide` and `beforeunload` cover a closed or reloaded tab, and `hidden` an
// installed iOS PWA, which can be frozen and killed without firing `pagehide` at all.

/**
 * @param {() => void} write the actual write — synchronous, and safe to call when nothing changed
 * @param {number} [delay] ms
 * @returns {{ schedule: () => void, now: () => void }} `schedule` after an edit; `now` for a write
 *   that must not wait (a game archived, a list deleted)
 */
export function debouncedSave(write, delay = 500) {
  /** @type {ReturnType<typeof setTimeout> | null} */
  let timer = null
  const now = () => {
    if (timer) { clearTimeout(timer); timer = null }
    write()
  }
  const schedule = () => {
    if (!timer) timer = setTimeout(() => { timer = null; write() }, delay)
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('pagehide', now)
    window.addEventListener('beforeunload', now)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') now()
    })
  }
  return { schedule, now }
}
