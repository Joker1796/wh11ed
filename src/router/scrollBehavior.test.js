import { describe, it, expect } from 'vitest'
import { router } from './index.js'

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

  it('restores the remembered position when Back leaves a page', () => {
    const to = { path: '/rules', fullPath: '/rules' }
    const from = { path: '/factions', fullPath: '/factions' }
    expect(scroll(to, from, { top: 420 })).toEqual({ top: 420 })
  })

  it('opens a page the reader has not been to at the top', () => {
    const to = { path: '/factions/orks', fullPath: '/factions/orks' }
    const from = { path: '/factions', fullPath: '/factions' }
    expect(scroll(to, from, null)).toEqual({ top: 0 })
  })
})
