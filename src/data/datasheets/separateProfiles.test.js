import { describe, it, expect } from 'vitest'
import { separateProfileWeapons, weaponBase, withGroupPos } from '../../core/rules/weaponGroups.js'

// A weapon whose profiles are all fired is drawn as separate rows, not as one "pick a profile" group
// (weaponGroups.js). A player found Nazdreg's Kustom Blasta X drawn as a pick-one weapon, 2026-10-18:
// the loadout said otherwise and nothing read it.
describe('weapons with separate profiles', () => {
  const bundles = import.meta.glob(['./*.js', '!./index.js', '!./*.test.js'])

  it('every sheet whose loadout says so carries separateProfiles, and only those', async () => {
    const wrong = []
    let found = 0
    for (const [f, load] of Object.entries(bundles)) {
      for (const ds of (await load()).default || []) {
        const said = separateProfileWeapons(ds.loadout)
        // A wording the reader does not know: say so, rather than draw the weapon as pick-one.
        if (/separate\b[^.]*\bprofiles/i.test(ds.loadout || '') && !said.length) wrong.push(`${f} ${ds.id}: unread wording`)
        if (JSON.stringify(said) !== JSON.stringify(ds.separateProfiles || [])) wrong.push(`${f} ${ds.id}: loadout ${JSON.stringify(said)}, sheet ${JSON.stringify(ds.separateProfiles || [])}`)
        for (const name of said) {
          found++
          const rows = [...(ds.ranged || []), ...(ds.melee || [])].filter((w) => weaponBase(w.name) === name)
          if (rows.length < 2) wrong.push(`${f} ${ds.id}: "${name}" has ${rows.length} profile row(s)`)
        }
      }
    }
    expect(wrong).toEqual([])
    expect(found).toBeGreaterThan(0) // Nazdreg: the reader still reads the wording
  })

  it('draws each profile of such a weapon on its own, and leaves the others grouped', () => {
    const rows = withGroupPos([
      { name: 'Kustom Blasta X – gatler' },
      { name: 'Kustom Blasta X – shoota' },
      { name: 'Plasma pistol – standard' },
      { name: 'Plasma pistol – supercharge' },
    ], ['Kustom Blasta X'])
    expect(rows.map((r) => [r.gpos, r.profile])).toEqual([
      ['single', null],
      ['single', null],
      ['start', 'standard'],
      ['end', 'supercharge'],
    ])
  })
})
