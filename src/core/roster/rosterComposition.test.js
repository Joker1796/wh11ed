import { describe, it, expect, beforeAll } from 'vitest'
import { loadRosterFaction, rosterCore, rosterItems } from '../../data/roster/index.js'
import { validateRoster, duplicateLimit } from './rosterValidation.js'

// Who an army may hold, as the datasheets themselves say it (gen-roster-data.mjs, "Who an army may
// hold"): until 2026-10-27 the builder let every one of these lists through as legal — Yvraine with
// Asurmen, Farsight with an Ethereal, both Commissar Graves, two Patriarchs. On the real data, so a
// regenerated file that loses one of them fails here too.
const items = rosterItems.items || rosterItems
const F = {}
beforeAll(async () => {
  for (const s of ['aeldari', 'tau-empire', 'astra-militarum', 'genestealer-cults', 'black-templars']) F[s] = await loadRosterFaction(s)
})
let n = 0
const E = (id, extra = {}) => ({ uid: `u${n++}`, id, size: 0, ...extra })
const errors = (slug, units, detachment = F[slug].detachments[0].name) =>
  validateRoster({ faction: slug, detachments: [detachment], battleSize: 'strike-force', units }, { faction: F[slug], core: rosterCore, items })
    .issues.filter((i) => i.level === 'error')
const codes = (...a) => errors(...a).map((i) => i.code)

describe('a unit the army cannot hold beside another', () => {
  it('Yvraine bars an Epic Hero that is not YNNARI, and only that', () => {
    const asurmen = E('asurmen')
    const res = errors('aeldari', [E('yvraine', { warlord: true }), asurmen], 'Devoted of Ynnead')
    expect(res.filter((i) => i.code === 'armyExcludes')).toEqual([expect.objectContaining({ uid: asurmen.uid, params: expect.objectContaining({ other: 'Yvraine' }) })])
    // The Visarch is YNNARI, and Guardians are no Epic Hero: both may stand with her.
    expect(codes('aeldari', [E('yvraine', { warlord: true }), E('the-visarch'), E('guardian-defenders')], 'Devoted of Ynnead')).not.toContain('armyExcludes')
  })

  it('Commander Farsight and an Ethereal, whichever came first, once', () => {
    expect(codes('tau-empire', [E('commander-farsight', { warlord: true }), E('ethereal')]).filter((c) => c === 'armyExcludes')).toHaveLength(1)
    expect(codes('tau-empire', [E('commander-farsight', { warlord: true })])).not.toContain('armyExcludes')
  })
})

describe('one per army', () => {
  it('one Commissar Graves, on foot or mounted', () => {
    expect(codes('astra-militarum', [E('commissar-graves', { warlord: true }), E('commissar-graves-on-foot')])).toContain('overDuplicate')
  })

  it('one Patriarch, one Emperor’s Champion', () => {
    expect(codes('genestealer-cults', [E('patriarch', { warlord: true }), E('patriarch')])).toContain('overDuplicate')
    expect(codes('black-templars', [E('emperors-champion', { warlord: true }), E('emperors-champion')])).toContain('overDuplicate')
  })

  it('one Troupe Master — unless the detachment says three', () => {
    const tm = (k) => Array.from({ length: k }, () => E('troupe-master'))
    expect(codes('aeldari', [E('farseer', { warlord: true }), ...tm(2)], 'Armoured Warhost')).toContain('overDuplicate')
    expect(codes('aeldari', [E('farseer', { warlord: true }), ...tm(3)], 'Ghosts of the Webway')).not.toContain('overDuplicate')
    expect(codes('aeldari', [E('farseer', { warlord: true }), ...tm(4)], 'Ghosts of the Webway')).toContain('overDuplicate')
  })

  it('the add button reads the same cap', () => {
    const def = F.aeldari.units.find((u) => u.id === 'troupe-master')
    const ghosts = F.aeldari.detachments.filter((d) => d.name === 'Ghosts of the Webway')
    expect(duplicateLimit(def, 3)).toBe(1)
    expect(duplicateLimit(def, 3, null, ghosts)).toBe(3)
  })
})
