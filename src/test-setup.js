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
