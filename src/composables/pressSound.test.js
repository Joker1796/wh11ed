import { describe, it, expect, vi, beforeEach } from 'vitest'

// pressSound.js: off by default, loads its four clicks at the first press after it is switched on,
// and picks the heavy one for a big target.
let started
beforeEach(() => {
  vi.resetModules()
  localStorage.clear()
  started = []
  class FakeCtx {
    constructor() { this.state = 'running'; this.destination = {} }
    decodeAudioData(buf) { return Promise.resolve({ name: buf.name }) }
    createGain() { return { gain: { value: 0 }, connect: (d) => d } }
    createBufferSource() { const s = { connect: (g) => g, start: () => started.push(s.buffer.name) }; return s }
    resume() {}
  }
  window.AudioContext = FakeCtx
  globalThis.fetch = vi.fn((url) => Promise.resolve({ arrayBuffer: () => Promise.resolve({ name: url.split('/').pop().replace('.mp3', '') }) }))
})
const el = (w, h, own) => ({ offsetWidth: w, offsetHeight: h, dataset: own ? { pressSound: own } : {} })

describe('pressSound', () => {
  it('is silent and loads nothing until switched on', async () => {
    const { pressSound } = await import('./pressSound.js')
    pressSound(el(100, 40), 0)
    await new Promise((r) => setTimeout(r, 0))
    expect(fetch).not.toHaveBeenCalled()
    expect(started).toEqual([])
  })

  it('clicks a button and thuds a card, down then up', async () => {
    const { pressSound, usePressSound } = await import('./pressSound.js')
    usePressSound().togglePressSound()
    expect(localStorage.getItem('wh11ed-press-sound')).toBe('1')
    await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(4))
    await new Promise((r) => setTimeout(r, 0))
    pressSound(el(100, 40), 0); pressSound(el(100, 40), 1)
    pressSound(el(320, 120), 0); pressSound(el(320, 120), 1)
    pressSound(el(320, 120, 'click'), 0)
    expect(started).toEqual(['click-down', 'click-up', 'card-down', 'card-up', 'click-down'])
  })
})
