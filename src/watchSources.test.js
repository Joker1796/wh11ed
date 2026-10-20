import { describe, it, expect } from 'vitest'

// `watch(() => [a, b], cb)` fires on EVERY run of its getter: the array is new each time, and Vue
// compares a getter's result by identity. So it fires whenever anything the getter reads changes —
// not only a or b. DatasheetCard's "Led by" list emptied and re-fetched on every letter the
// catalogue's search placeholder typed (a player's report, 2026-10-20). Watch several values with
// the multi-source form, `watch([() => a, () => b], cb)`, which compares each one.
const sources = import.meta.glob(['./**/*.{js,vue}', '!./**/*.test.js'], { query: '?raw', import: 'default', eager: true })

describe('watchers', () => {
  it('never watch a getter that builds a new array', () => {
    const bad = Object.entries(sources)
      .filter(([, text]) => /\bwatch\(\s*\(\)\s*=>\s*\[/.test(text))
      .map(([file]) => file)
    expect(bad).toEqual([])
  })
})
