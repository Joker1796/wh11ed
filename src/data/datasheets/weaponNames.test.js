import { describe, it, expect } from 'vitest'
import { weaponBase } from '../../core/rules/weaponGroups.js'

// What the first import (Wahapedia, July 2026) left in the weapon tables, found by a player on
// 2026-10-27 — the Riptide's Missile pod between the two profiles of its Ion accelerator — and
// then looked for everywhere: profiles of one weapon apart, a hyphen where every other sheet has
// the dash, a hunter profile without what it hunts.
describe('weapon tables', () => {
  const bundles = import.meta.glob(['./*.js', '!./index.js', '!./*.test.js'])
  const each = async (check) => {
    const wrong = []
    for (const [f, load] of Object.entries(bundles)) {
      for (const ds of (await load()).default || []) {
        for (const kind of ['ranged', 'melee']) check(ds[kind] || [], `${f.slice(2, -3)} ${ds.id} ${kind}`, wrong)
      }
    }
    return wrong
  }

  // The rows of one weapon are drawn as one group (withGroupPos): a row of another weapon between
  // them splits the group and reads as a third profile.
  it('keeps the profiles of one weapon together', async () => {
    expect(await each((rows, at, wrong) => {
      const last = new Map()
      rows.forEach((w, i) => {
        const base = weaponBase(w.name)
        if (last.has(base) && last.get(base) !== i - 1) wrong.push(`${at}: ${rows.map((r) => r.name).join(' / ')}`)
        last.set(base, i)
      })
    })).toEqual([])
  })

  it('separates a weapon from its profile with the dash', async () => {
    expect(await each((rows, at, wrong) => {
      for (const w of rows) if (/ - /.test(w.name)) wrong.push(`${at}: ${w.name}`)
    })).toEqual([])
  })

  it('says what a hunter profile hunts', async () => {
    expect(await each((rows, at, wrong) => {
      for (const w of rows) if (/ – hunter$/i.test(w.name)) wrong.push(`${at}: ${w.name}`)
    })).toEqual([])
  })
})
