import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'

let tracker
const CUR = 'wh11ed-tracker-current'
const HIST = 'wh11ed-tracker-history'

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  const mod = await import('./useTracker.js')
  tracker = mod.useTracker()
  tracker.newGame({
    settings: { firstTurn: 1, battleSize: 'strikeForce' },
    players: mod.DISPOSITIONS.slice(0, 2).map((d) => ({ disposition: d.id, role: 'attacker', secondaryMode: 'tactical' })),
  })
  tracker.beginGame()
  tracker.finishGame('early')
  vi.useFakeTimers()
  await nextTick()
  await vi.advanceTimersByTimeAsync(500)
})

afterEach(() => { vi.restoreAllMocks(); vi.useRealTimers() })

describe('durable game transitions under storage failure', () => {
  it('keeps the last durable current game when the history write exceeds quota, and retries', async () => {
    const id = tracker.current.value.id
    const write = localStorage.setItem.bind(localStorage)
    const spy = vi.spyOn(localStorage, 'setItem').mockImplementation((key, value) => {
      if (key === HIST) throw new DOMException('full', 'QuotaExceededError')
      write(key, value)
    })
    tracker.archiveGame()
    expect(JSON.parse(localStorage.getItem(CUR)).id).toBe(id)
    spy.mockRestore()
    await nextTick()
    await vi.advanceTimersByTimeAsync(500)
    expect(JSON.parse(localStorage.getItem(HIST)).some((g) => g.id === id)).toBe(true)
    expect(localStorage.getItem(CUR)).toBeNull()
  })

  it('keeps the archived record until the resumed current game is durable', () => {
    const id = tracker.current.value.id
    tracker.archiveGame()
    const write = localStorage.setItem.bind(localStorage)
    vi.spyOn(localStorage, 'setItem').mockImplementation((key, value) => {
      if (key === CUR) throw new DOMException('full', 'QuotaExceededError')
      write(key, value)
    })
    tracker.resumeFromHistory(id)
    expect(JSON.parse(localStorage.getItem(HIST)).some((g) => g.id === id)).toBe(true)
  })
})

it('repeating an interrupted archive keeps exactly one identical history record', () => {
  const record = JSON.parse(JSON.stringify(tracker.current.value))
  delete record.party
  tracker.history.value = [record]
  tracker.archiveGame()
  expect(tracker.history.value.filter(game => game.id === record.id)).toHaveLength(1)
  expect(tracker.current.value).toBeNull()
})

it('preserves both different versions of the same game instead of overwriting either on archive', async () => {
  const record = JSON.parse(JSON.stringify(tracker.current.value))
  record.players[0].name = 'Different historical version'
  tracker.history.value = [record]
  expect(tracker.archiveGame()).toBe(false)
  expect(tracker.current.value).not.toBeNull()
  expect(tracker.history.value[0].players[0].name).toBe('Different historical version')
  const { localData } = await import('./localData.js')
  expect(localData.state.error).toContain('Archive conflict')
})
