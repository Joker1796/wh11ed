import { afterEach, expect, it, vi } from 'vitest'
import { createHash, webcrypto } from 'node:crypto'
import { contentHash } from './contentHash.js'
import { stableJson } from './stableJson.js'

afterEach(() => vi.unstubAllGlobals())
it('agrees with server SHA-256 on canonical JSON, including Unicode and nested keys', async () => {
  vi.stubGlobal('crypto', webcrypto)
  const value = { z: [1, undefined, { b: 'Юнит', a: null }], a: true, missing: undefined }
  const json = '{"a":true,"z":[1,null,{"a":null,"b":"Юнит"}]}'
  expect(stableJson(value)).toBe(json)
  expect(await contentHash(value)).toBe('sha256:' + createHash('sha256').update(json).digest('hex'))
})
