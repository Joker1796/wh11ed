import { describe, it, expect } from 'vitest'
import { chunkBlocks } from './blockColumnChunks.js'

const ids = (groups) => groups.map((g) => (g.type === 'full' ? g.item.id : g.items.map((b) => b.id)))

describe('chunkBlocks', () => {
  it('runs plain blocks into one two-column group, a wide one full width', () => {
    expect(ids(chunkBlocks([{ id: 'a' }, { id: 'b' }, { id: 'w', wide: true }, { id: 'c' }, { id: 'd' }]))).toEqual([['a', 'b'], 'w', ['c', 'd']])
  })

  it('starts a new group at newRun, and a group of one goes full width', () => {
    expect(ids(chunkBlocks([{ id: 'a' }, { id: 'b' }, { id: 'c', newRun: true }, { id: 'd' }, { id: 'e', newRun: true }]))).toEqual([['a', 'b'], ['c', 'd'], 'e'])
  })
})
