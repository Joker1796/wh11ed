import { describe, it, expect } from 'vitest'
import { router, EVENT_PATH, EVENT_CHAPTER_ANCHORS } from './index.js'

// The six non-Introduction Event Companion chapters used to be six routes. They're one page
// now, but the old URLs are in bookmarks, shared links and (as 200-returning keys) still in
// the bucket — each one has to land on its own chapter, not just on the top of the page.
// /event-companion itself isn't in EVENT_CHAPTER_ANCHORS — it's the merged page's own path.
describe('retired per-chapter Event Companion routes', () => {
  // `router.resolve` matches the record without following the redirect (that happens during
  // navigation), so assert on the record's own redirect target. It is a function of the matched
  // route now that RU lives on a path prefix — a Russian visitor must land on the Russian page.
  it.each(Object.entries(EVENT_CHAPTER_ANCHORS))('%s redirects to its chapter anchor', (path, anchor) => {
    const resolved = router.resolve(path)
    expect(resolved.matched[0].redirect(resolved)).toEqual({ path: EVENT_PATH, hash: '#' + anchor })
  })

  it.each(Object.entries(EVENT_CHAPTER_ANCHORS))('/ru%s keeps the reader in Russian', (path, anchor) => {
    const resolved = router.resolve('/ru' + path)
    expect(resolved.matched[0].redirect(resolved)).toEqual({ path: '/ru' + EVENT_PATH, hash: '#' + anchor })
  })

  it('resolves the merged page itself', () => {
    const resolved = router.resolve(EVENT_PATH)
    expect(resolved.matched.length).toBeGreaterThan(0)
    expect(resolved.meta.section).toBe('event')
  })
})
