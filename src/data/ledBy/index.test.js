import { describe, it, expect } from 'vitest'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { loadLedBy } from './index.js'
import { loadRosterFaction } from '../roster/index.js'

// "Led by" / "Supported by" (genLedBy): the reverse of every leader's attachments, per faction.
describe('ledBy', () => {
  const slugs = readdirSync(path.resolve(__dirname)).filter((f) => /^[a-z-]+\.js$/.test(f) && f !== 'index.js').map((f) => f.replace('.js', ''))

  it('names only units the faction has, on bodyguards the faction has', async () => {
    const bad = []
    for (const slug of slugs) {
      const data = await loadLedBy(slug)
      const roster = await loadRosterFaction(slug)
      const ids = new Set(roster.units.map((u) => u.id))
      const names = new Set(roster.units.map((u) => u.name))
      for (const [to, rows] of Object.entries(data)) {
        if (!ids.has(to)) bad.push(`${slug}: ${to} is no unit`)
        for (const [name, type, note] of rows) {
          if (!['leader', 'support'].includes(type)) bad.push(`${slug}/${to}: ${name} type ${type}`)
          if (!note?.enh && !names.has(name)) bad.push(`${slug}/${to}: ${name} is no unit`)
        }
      }
    }
    expect(bad).toEqual([])
  })

  // The Nemesis Claw borrows the Legionaries' leaders, Epic Heroes excepted — the Legends ones too
  // (their mirror was lost until 2026-10-07: "(excluding EPIC HEROES)" read as a requirement).
  it('lists the Legionaries’ leaders under the Nemesis Claw, Legends included, Epic Heroes not', async () => {
    const csm = await loadLedBy('chaos-space-marines')
    const nc = csm['nemesis-claw'].map(([n]) => n)
    expect(nc).toEqual(expect.arrayContaining(['Chaos Lord', 'Sorcerer', 'Chaos Lord on Disc of Tzeentch', 'Sorcerer on Palanquin of Nurgle']))
    expect(nc).not.toContain('Fabius Bile')
    expect(csm.legionaries.map(([n]) => n)).toEqual(expect.arrayContaining(['Chaos Lord', 'Fabius Bile', 'Master of Executions']))
  })

  it('carries an enhancement’s grant as one, with its Detachment', async () => {
    const am = await loadLedBy('astra-militarum')
    expect(am['ogryn-squad']).toEqual(expect.arrayContaining([['Abhuman Detail', 'leader', { enh: 1, det: 'Grizzled Company' }]]))
  })
})
