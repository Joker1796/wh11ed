import { beforeEach, describe, it, expect, vi } from 'vitest'

// useUserPrefs is a module singleton over two other singletons, so every test re-imports the lot
// after vi.resetModules(). What is being tested is the promise the feature makes: a player's marks
// survive every combination of two devices — including the awkward ones, where one device unstars
// something the other still holds, or two save at the same moment.
const h = vi.hoisted(() => ({ status: { value: 'authed' }, fetchImpl: null, calls: [] }))

vi.mock('./useAuth.js', () => ({
  useAuth: () => ({
    status: h.status,
    authedFetch: (...args) => {
      h.calls.push(args)
      return h.fetchImpl(...args)
    },
  }),
}))

const json = (body, { status = 200, etag = null } = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: { get: (k) => (k.toLowerCase() === 'etag' ? etag : null) },
  json: async () => body,
})

let prefs, favorites, collection
async function load() {
  vi.resetModules()
  localStorage.clear()
  const fav = await import('./useFavorites.js')
  const col = await import('./useCollection.js')
  const mod = await import('./useUserPrefs.js')
  favorites = fav.useFavorites()
  collection = col.useCollection()
  prefs = mod
}

beforeEach(async () => {
  h.status.value = 'authed'
  h.calls = []
  await load()
})

describe('pulling an account\'s marks', () => {
  it('merges the cloud in rather than replacing what this device already had', async () => {
    collection.toggleOwned('orks', 'boyz', 'Boyz')
    h.fetchImpl = async () => json({ scopes: [{ scope: 'orks', version: 3, data: { own: { nobz: { n: 1, name: 'Nobz', at: 5 } } } }] })
    await prefs.pullPrefs()
    expect(collection.isOwned('orks', 'boyz')).toBe(true)
    expect(collection.isOwned('orks', 'nobz')).toBe(true)
  })

  // The case that makes tombstones worth their weight: unstarring on this phone must not be
  // undone by the account's older copy.
  it('does not bring back a mark this device took off', async () => {
    collection.toggleOwned('orks', 'boyz', 'Boyz')
    collection.toggleOwned('orks', 'boyz')
    h.fetchImpl = async () => json({ scopes: [{ scope: 'orks', version: 1, data: { own: { boyz: { n: 1, name: 'Boyz', at: 1 } } } }] })
    await prefs.pullPrefs()
    expect(collection.isOwned('orks', 'boyz')).toBe(false)
  })

  it('accepts a tombstone the account holds, taking the mark off here too', async () => {
    collection.toggleOwned('orks', 'boyz', 'Boyz')
    const later = Date.now() + 10_000
    h.fetchImpl = async () => json({ scopes: [{ scope: 'orks', version: 1, data: { own: { boyz: { at: later, del: 1 } } } }] })
    await prefs.pullPrefs()
    expect(collection.isOwned('orks', 'boyz')).toBe(false)
  })

  it('keeps pins and stars apart, and reads the pinned list from its own scope', async () => {
    h.fetchImpl = async () => json({
      scopes: [
        { scope: '@factions', version: 1, data: { fav: { orks: { at: 9 } }, dv: 946 } },
        { scope: 'orks', version: 1, data: { fav: { boyz: { at: 9 } }, own: { nobz: { n: 1, at: 9 } } } },
      ],
    })
    await prefs.pullPrefs()
    expect(favorites.isFactionPinned('orks')).toBe(true)
    expect(favorites.isUnitFavorite('orks', 'boyz')).toBe(true)
    expect(collection.isOwned('orks', 'nobz')).toBe(true)
    expect(collection.isOwned('orks', 'boyz')).toBe(false)
  })

  it('costs one request, and nothing at all when the account has not moved', async () => {
    h.fetchImpl = async () => json({ scopes: [] }, { etag: '"v1"' })
    await prefs.pullPrefs()
    expect(h.calls.length).toBe(1)
    h.fetchImpl = async (path, opts) => {
      expect(opts.headers['If-None-Match']).toBe('"v1"')
      return json(null, { status: 304 })
    }
    await prefs.pullPrefs()
    expect(h.calls.length).toBe(2)
  })

  it('does nothing at all when signed out', async () => {
    h.status.value = 'anon'
    h.fetchImpl = async () => { throw new Error('must not be called') }
    await prefs.pullPrefs()
    expect(h.calls.length).toBe(0)
  })

  it('survives the API being down, leaving local marks untouched', async () => {
    collection.toggleOwned('orks', 'boyz', 'Boyz')
    h.fetchImpl = async () => json({ error: 'nope' }, { status: 500 })
    await prefs.pullPrefs()
    expect(collection.isOwned('orks', 'boyz')).toBe(true)
    expect(prefs.useUserPrefs().lastError.value).toBeTruthy()
  })
})

describe('pushing what changed', () => {
  it('sends a scope this device has and the account has never heard of', async () => {
    collection.toggleOwned('orks', 'boyz', 'Boyz')
    h.fetchImpl = async () => json({ scopes: [] })
    await prefs.pullPrefs()
    h.calls = []
    h.fetchImpl = async () => json({ ok: true, scope: 'orks', version: 1 })
    await prefs.pushPrefs()
    expect(h.calls.length).toBe(1)
    const [path, opts] = h.calls[0]
    expect(path).toBe('/prefs/orks')
    expect(opts.method).toBe('PUT')
    const sent = JSON.parse(opts.body)
    expect(sent.version).toBe(0)
    expect(sent.data.own.boyz).toMatchObject({ n: 1, name: 'Boyz' })
  })

  // Two devices saving at the same moment: the loser must re-merge and retry, not overwrite.
  it('re-merges and retries when another device got there first', async () => {
    collection.toggleOwned('orks', 'boyz', 'Boyz')
    h.fetchImpl = async () => json({ scopes: [{ scope: 'orks', version: 1, data: { own: {} } }] })
    await prefs.pullPrefs()

    let attempt = 0
    h.fetchImpl = async () => {
      attempt++
      if (attempt === 1) {
        return json(
          { error: 'version_conflict', current: { scope: 'orks', version: 2, data: { own: { nobz: { n: 1, name: 'Nobz', at: 50 } } } } },
          { status: 409 },
        )
      }
      return json({ ok: true, scope: 'orks', version: 3 })
    }
    await prefs.pushPrefs()
    expect(attempt).toBe(2)
    // Neither side's marks were lost by the round trip.
    expect(collection.isOwned('orks', 'boyz')).toBe(true)
    expect(collection.isOwned('orks', 'nobz')).toBe(true)
  })

  it('keeps a failed upload queued instead of forgetting it', async () => {
    collection.toggleOwned('orks', 'boyz', 'Boyz')
    h.fetchImpl = async () => json({ scopes: [] })
    await prefs.pullPrefs()
    h.fetchImpl = async () => json({ error: 'offline' }, { status: 503 })
    await prefs.pushPrefs()
    h.calls = []
    h.fetchImpl = async () => json({ ok: true, scope: 'orks', version: 1 })
    await prefs.pushPrefs()
    expect(h.calls.length).toBe(1)
  })
})

describe('reconciling with the rules data', () => {
  it('leaves an unaccounted mark alone while another device reports newer data', async () => {
    collection.toggleOwned('orks', 'retired-unit', 'Retired')
    h.fetchImpl = async () => json({ scopes: [{ scope: '@factions', version: 1, data: { dv: 99_999 } }] })
    await prefs.pullPrefs()
    prefs.reconcileFactionMarks('orks', new Set(['boyz']))
    expect(collection.isOwned('orks', 'retired-unit')).toBe(true)
  })

  it('tidies it away once this build is the newest the account has seen', async () => {
    collection.toggleOwned('orks', 'retired-unit', 'Retired')
    h.fetchImpl = async () => json({ scopes: [] })
    await prefs.pullPrefs()
    prefs.reconcileFactionMarks('orks', new Set(['boyz']))
    expect(collection.isOwned('orks', 'retired-unit')).toBe(false)
  })
})
