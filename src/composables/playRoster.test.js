// The caller's menu closes in the same tick as the push: closed earlier, a phone's Back-to-close
// step arrives while the push waits and cancels it.
import { describe, it, expect, vi } from 'vitest'
import { playRoster } from './playRoster.js'

describe('playRoster', () => {
  it('writes the draft, then closes the menu and pushes together', async () => {
    const order = []
    const router = { push: vi.fn(() => order.push('push')) }
    const leaving = vi.fn(() => order.push('leaving'))
    const started = playRoster({ name: 'List', faction: 'orks', units: [] }, router, leaving)
    expect(leaving).not.toHaveBeenCalled() // the modules are still on their way
    await started
    expect(order).toEqual(['leaving', 'push'])
    const { useTracker } = await import('./useTracker.js')
    expect(useTracker().setupDraft.value.players[0].factionSlug).toBe('orks')
  })
})
