// Our half of the appdata-exceptions gate, as a test: the half that needs no wh40k-appdata clone.
// The other half — is the error we patch still in appdata? — is `npm run exceptions`, inside
// `npm run sync`.
import { describe, it, expect } from 'vitest'
import { APPDATA_EXCEPTIONS, oursCarries } from './appdata-exceptions.mjs'

describe('appdata exceptions', () => {
  it.each(APPDATA_EXCEPTIONS.map((e) => [e.id, e]))('%s is carried by our data', async (_, e) => {
    expect(await oursCarries(e)).toBeNull()
  })

  it('gives every entry a reason and a source', () => {
    expect(APPDATA_EXCEPTIONS.filter((e) => !e.why || !e.source).map((e) => e.id)).toEqual([])
  })
})
