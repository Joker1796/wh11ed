import { describe, it, expect, vi, beforeEach } from 'vitest'

// uiSound.js: off by default; switched on, loads every sound while the page is idle, decoding
// without a gesture, and plays from a context made at the first touch.
let started
beforeEach(() => {
  vi.resetModules()
  localStorage.clear()
  started = []
  window.AudioContext = class {
    constructor() { this.state = 'running'; this.destination = {} }
    createGain() { return { gain: { value: 0 }, connect: (d) => d } }
    createBufferSource() { const s = { connect: (g) => g, start: () => started.push(s.buffer.name) }; return s }
    resume() {}
  }
  window.OfflineAudioContext = class { decodeAudioData(buf) { return Promise.resolve({ name: buf.name }) } }
  globalThis.fetch = vi.fn((url) => Promise.resolve({ arrayBuffer: () => Promise.resolve({ name: url.split('/').pop().replace('.mp3', '') }) }))
})
const tick = () => new Promise((r) => setTimeout(r, 0))

describe('uiSound', () => {
  it('is silent and loads nothing until switched on', async () => {
    const { playSound } = await import('./uiSound.js')
    playSound('click-down')
    await tick()
    expect(fetch).not.toHaveBeenCalled()
    expect(started).toEqual([])
  })

  it('loads every sound once switched on, and remembers the switch', async () => {
    const { playSound, useUiSound, SOUNDS } = await import('./uiSound.js')
    useUiSound().toggleSound()
    expect(localStorage.getItem('wh11ed-press-sound')).toBe('1')
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(SOUNDS.length))
    await tick()
    playSound('toggle-on'); playSound('error')
    expect(started).toEqual(['toggle-on', 'error'])
  })

  it('plays the first sound once loaded, and drops a late one that asked not to wait', async () => {
    localStorage.setItem('wh11ed-press-sound', '1')
    const { playSound } = await import('./uiSound.js')
    playSound('click-down')
    playSound('click-up', { late: false })
    await vi.waitFor(() => expect(started).toEqual(['click-down']))
  })

  it('with the switch on, loads at start and plays the very first tap whole', async () => {
    vi.useFakeTimers()
    localStorage.setItem('wh11ed-press-sound', '1')
    const { playSound, installUiSound, SOUNDS } = await import('./uiSound.js')
    installUiSound()
    expect(fetch).not.toHaveBeenCalled() // not in the way of the first paint
    vi.advanceTimersByTime(600)
    vi.useRealTimers()
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(SOUNDS.length))
    await tick()
    window.dispatchEvent(new Event('pointerdown'))
    playSound('click-down'); playSound('click-up', { late: false })
    expect(started).toEqual(['click-down', 'click-up'])
  })

  it('switched off, fetches nothing at start', async () => {
    vi.useFakeTimers()
    const { installUiSound } = await import('./uiSound.js')
    installUiSound()
    vi.advanceTimersByTime(600)
    vi.useRealTimers()
    await tick()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('plays one sound once when two players ask for it at the same moment', async () => {
    const { playSound, useUiSound, SOUNDS } = await import('./uiSound.js')
    useUiSound().toggleSound()
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(SOUNDS.length))
    await tick()
    playSound('seg'); playSound('seg'); playSound('click-down')
    expect(started).toEqual(['seg', 'click-down'])
    await new Promise((r) => setTimeout(r, 60))
    playSound('seg')
    expect(started).toEqual(['seg', 'click-down', 'seg'])
  })
})
