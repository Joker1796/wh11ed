import { describe, expect, it } from 'vitest'
import { planRetirement } from './lib/asset-retirement.mjs'

const day = 864e5
const now = 100 * day
const plan = (args = {}) => planRetirement({ present: ['assets/old.js'], live: [], now, keepDays: 30, ...args })

describe('asset retention after last use', () => {
  it('keeps a long-lived asset for a full window after the first release that omits it', () => {
    expect(plan()).toEqual({ retired: { 'assets/old.js': now }, remove: [] })
    expect(plan({ previous: { 'assets/old.js': now - 29 * day } }).remove).toEqual([])
    expect(plan({ previous: { 'assets/old.js': now - 30 * day } }).remove).toEqual(['assets/old.js'])
  })
  it('resets retirement when a release or rollback needs the file again', () => {
    expect(plan({ live: ['assets/old.js'], previous: { 'assets/old.js': day } })).toEqual({ retired: {}, remove: [] })
  })
  it('retains immutable release shells and renamed images under the same rule', () => {
    const keys = ['releases/a/index.html', 'images/old.webp']
    expect(plan({ present: keys }).remove).toEqual([])
    expect(plan({ present: keys, previous: Object.fromEntries(keys.map((k) => [k, day])) }).remove).toEqual(keys)
  })
  it('never deletes mutable entry points or unrelated objects', () => {
    expect(plan({ present: ['sw.js', 'version.json', 'ru/roster', '.asset-retirement.json'] }).remove).toEqual([])
  })
})
