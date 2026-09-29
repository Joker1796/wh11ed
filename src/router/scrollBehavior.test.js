import { describe, it, expect, vi } from 'vitest'
import { router } from './index.js'
import { pageArrived } from '../composables/usePageMotion.js'

// Three rules, and the one that was missing cost a reader their place on the page. A dialog
// pushes a copy of the current history entry so that Back closes it (useBackToClose.js);
// popping that copy arrives in `scrollBehavior` as a navigation to the location we are already
// on, with no saved position — and the page jumped to the top every time a picker was closed
// (report 1173ea18, v2.6.6). Nothing read the scroll rules before this file.
const scroll = router.options.scrollBehavior

describe('scrollBehavior', () => {
  it('leaves the scroll alone when a dialog pops its copy of the current entry', () => {
    const here = { path: '/tracker/game', fullPath: '/tracker/game' }
    expect(scroll({ ...here }, { ...here }, null)).toBe(false)
  })

  it('leaves the scroll alone when the reader switches language', () => {
    const en = { path: '/core-rules', fullPath: '/core-rules' }
    const ru = { path: '/ru/core-rules', fullPath: '/ru/core-rules' }
    expect(scroll(ru, en, null)).toBe(false)
  })

  // A page swap animates: the scroll is set once the new page is in but not yet shown
  // (usePageMotion's pageArrived, fired by App.vue's route transition), not at the click.
  const page = (path) => ({ path, fullPath: path, matched: [{}] })
  async function settled(result) {
    const to = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    expect(result).toBeInstanceOf(Promise)
    expect(to).not.toHaveBeenCalled() // nothing moves while the old page is still leaving
    pageArrived()
    const r = await result
    const call = to.mock.calls.at(-1)
    to.mockRestore()
    return { r, call }
  }

  it('restores the remembered position when Back leaves a page — once the old page is gone', async () => {
    const { r, call } = await settled(scroll(page('/rules'), page('/factions'), { top: 420 }))
    expect(r).toBe(false)
    expect(call).toEqual([0, 420])
  })

  it('opens a page the reader has not been to at the top — once the old page is gone', async () => {
    const { r, call } = await settled(scroll(page('/factions/orks'), page('/factions'), null))
    expect(r).toBe(false)
    expect(call).toEqual([0, 0])
  })

  it('answers at once on the first load, where there is no page to wait for', () => {
    const first = { path: '/factions', fullPath: '/factions', matched: [] }
    expect(scroll(page('/factions/orks'), first, null)).toEqual({ top: 0 })
  })
})
