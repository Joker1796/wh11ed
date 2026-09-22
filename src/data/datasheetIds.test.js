// The datasheet-id gate, run as a test. An id is not just a URL any more: a player's favourites
// and model-collection marks are stored per (faction slug, datasheet id) and synced to their
// account, so an id that moves without a word takes their marks with it — on every device at
// once. The check lives in scripts/check-datasheet-ids.mjs (its header explains the two files);
// it runs here as well because an id can move on an ordinary hand edit, not only on an appdata
// bump, and `npm run sync` is not what anyone runs after renaming one unit.
import { describe, it, expect } from 'vitest'
import { currentPairs, compare } from '../../scripts/check-datasheet-ids.mjs'
import snapshot from './datasheetIds.json'
import renames from './datasheetRenames.json'

const current = await currentPairs()
const res = compare(current, snapshot, renames)

describe('datasheet ids', () => {
  it('accounts for every id that left the snapshot', () => {
    expect(res.problems).toEqual([])
  })

  it('keeps the snapshot in step with the shipped datasheets', () => {
    // Bookkeeping, not a judgement call: `npm run dsids:write` and commit the snapshot.
    expect({ added: res.added, gone: res.gone }).toEqual({ added: 0, gone: 0 })
  })

  it('covers every faction the index ships', () => {
    expect(res.factions).toBe(current.size)
    expect(res.pairs).toBeGreaterThan(2000)
  })
})
