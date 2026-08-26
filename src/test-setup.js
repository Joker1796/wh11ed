// A clean in-memory localStorage for tests. jsdom + Node's experimental web storage can
// collide (the `--localstorage-file` warning), leaving a Storage without a working
// clear(); replacing it outright keeps store tests deterministic and isolated.
class MemoryStorage {
  #map = new Map()
  get length() { return this.#map.size }
  clear() { this.#map.clear() }
  getItem(k) { return this.#map.has(k) ? this.#map.get(k) : null }
  setItem(k, v) { this.#map.set(String(k), String(v)) }
  removeItem(k) { this.#map.delete(String(k)) }
  key(i) { return [...this.#map.keys()][i] ?? null }
}

Object.defineProperty(globalThis, 'localStorage', {
  value: new MemoryStorage(),
  writable: true,
  configurable: true,
})

// jsdom has no matchMedia; components that read it at import time (e.g. useTheme's
// prefers-color-scheme probe) would throw. A minimal no-match stub is enough for tests.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent() { return false },
  })
}

// jsdom has no IntersectionObserver, and components that watch whether something is on screen
// (FactionLayout's hero tabs, deciding whether the floating buttons are needed) construct one as
// soon as they mount. A stub that never reports an intersection is enough: a test that cares
// about the observed state drives it directly.
if (typeof globalThis.IntersectionObserver === 'undefined') {
  globalThis.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return [] }
  }
}
