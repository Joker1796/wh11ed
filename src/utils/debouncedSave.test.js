import { describe, it, expect, vi, afterEach } from 'vitest'
import { debouncedSave } from './debouncedSave.js'

afterEach(() => vi.useRealTimers())

describe('debouncedSave', () => {
  it('writes once for a burst of edits, after the delay', () => {
    vi.useFakeTimers()
    const write = vi.fn()
    const { schedule } = debouncedSave(write, 500)
    schedule(); schedule(); schedule()
    expect(write).not.toHaveBeenCalled()
    vi.advanceTimersByTime(500)
    expect(write).toHaveBeenCalledTimes(1)
  })

  it('writes at once on now(), and the pending timer does not write again', () => {
    vi.useFakeTimers()
    const write = vi.fn()
    const { schedule, now } = debouncedSave(write, 500)
    schedule()
    now()
    expect(write).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(1000)
    expect(write).toHaveBeenCalledTimes(1)
  })

  it('writes when the page goes away', () => {
    const write = vi.fn()
    debouncedSave(write, 500)
    window.dispatchEvent(new Event('pagehide'))
    expect(write).toHaveBeenCalledTimes(1)
  })
})
