import { describe, it, expect } from 'vitest'
import { router, CORE_PATH, CORE_CHAPTER_ANCHORS } from './index.js'

// The seven Core Rules chapters used to be seven routes. They're one page now, but the old
// URLs are in bookmarks, shared links and (as 200-returning keys) still in the bucket — each
// one has to land on its own chapter, not just on the top of the page.
describe('retired per-chapter routes', () => {
  // `router.resolve` matches the record without following the redirect (that happens during
  // navigation), so assert on the record's own redirect target. Since RU moved onto a path
  // prefix the redirect is a function of the matched route — it has to send a Russian visitor
  // to the Russian chapter — so call it rather than comparing shapes.
  it.each(Object.entries(CORE_CHAPTER_ANCHORS))('%s redirects to its chapter anchor', (path, anchor) => {
    const resolved = router.resolve(path)
    expect(resolved.matched[0].redirect(resolved)).toEqual({ path: CORE_PATH, hash: '#' + anchor })
  })

  it.each(Object.entries(CORE_CHAPTER_ANCHORS))('/ru%s keeps the reader in Russian', (path, anchor) => {
    const resolved = router.resolve('/ru' + path)
    expect(resolved.matched[0].redirect(resolved)).toEqual({ path: '/ru' + CORE_PATH, hash: '#' + anchor })
  })

  it('resolves the merged page itself', () => {
    const resolved = router.resolve(CORE_PATH)
    expect(resolved.matched.length).toBeGreaterThan(0)
    expect(resolved.meta.section).toBe('core')
  })
})
