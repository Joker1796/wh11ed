import { describe, it, expect } from 'vitest'
import { encodeRoster, decodeRoster, shareUrl } from './rosterShare.js'

const roster = {
  id: 'orig', name: 'My List', faction: 'space-marines', detachments: ['Gladius'], battleSize: 'strike-force', customPoints: 2000,
  summary: { points: 500, unitCount: 3, issues: 0 },
  units: [
    { uid: 'a', id: 'captain', size: 0, warlord: true, enh: 'Artificer Armour' },
    { uid: 'b', id: 'intercessor-squad', size: 1, count: 8, wg: [[0, 1, 1]] },
    { uid: 'c', id: 'lieutenant', size: 0, leaderOf: 'b' },
  ],
}

describe('rosterShare', () => {
  it('round-trips a roster through encode/decode', async () => {
    const payload = await encodeRoster(roster)
    expect(payload).toMatch(/^[01]\./)
    const back = await decodeRoster(payload)
    // Only the shareable fields survive (summary is recomputed on import); ids/uids preserved.
    expect(back.name).toBe('My List')
    expect(back.faction).toBe('space-marines')
    expect(back.detachments).toEqual(['Gladius'])
    expect(back.battleSize).toBe('strike-force')
    expect(back.units).toEqual(roster.units)
    expect(back.summary).toBeUndefined()
  })

  it('decodes the uncompressed (0.) fallback form', async () => {
    // Build a 0. payload directly to exercise the fallback decoder.
    const json = JSON.stringify({ name: 'X', faction: 'orks', detachment: null, battleSize: 'incursion', units: [] })
    const b64 = btoa(unescape(encodeURIComponent(json))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    const back = await decodeRoster(`0.${b64}`)
    expect(back.faction).toBe('orks')
  })

  it('returns null for malformed payloads', async () => {
    expect(await decodeRoster('')).toBeNull()
    expect(await decodeRoster('garbage')).toBeNull()
    expect(await decodeRoster('9.zzzz')).toBeNull()
  })

  it('builds a hash URL from an origin without hard-coding the domain', () => {
    expect(shareUrl('https://wh-rules.ru', '1.abc')).toBe('https://wh-rules.ru/roster/shared#r=1.abc')
  })
})
