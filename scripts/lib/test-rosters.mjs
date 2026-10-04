// The test rosters — one per group of cases in RELEASE-CHECKLIST.md, built from a short spec rather
// than stored as roster JSON. A stored list carries wargear picks as indices into generated data
// that `npm run roster:data` renumbers, so it rots on the next appdata bump; a spec names units by
// id and wargear by the option's own label, and is resolved against the data of the day.
//
// Three readers, one source:
//   - `npm run test-rosters` prints share links for the owner (the roster-links skill's links, for
//     lists that GW's text format cannot express: own limits, no limit, an archived list);
//   - `npm run smoke` seeds them into the browser's storage and opens every page they reach;
//   - `test-rosters.test.js` builds each one and holds it to what it is FOR (`expect`): a list meant
//     to be legal has no errors, the error list has exactly the errors it was built to show.
//
// Spec: { key, name, faction, detachments, battleSize, customPoints?, customLimits?, archived?,
//         disposition?, expect: { legal: true } | { errors: [codes] }, units: [unit] }
// Unit: { k, id, count?, enh?, warlord?, lead?: k, mark?, gear?: [[label, n?, nth?]] }
//   `lead` is the key of the unit this one is attached to; `gear` picks an option by the label the
//   editor shows ("Havoc heavy bolter", "Autopistol + Power weapon"), `nth` choosing among groups
//   that offer the same label (0 = the first).
import { optionLabel } from '../../src/composables/rosterEngine.js'

export const TEST_ROSTERS = [
  {
    key: 'leaders',
    name: 'Проверка: лидеры и апгрейд на весь отряд',
    faction: 'space-marines',
    detachments: ['Assault Brethren'],
    battleSize: 'strike-force',
    expect: { legal: true },
    units: [
      { k: 'cap', id: 'captain', warlord: true, lead: 'i1' },
      { k: 'anc', id: 'ancient', lead: 'i1' },
      { k: 'i1', id: 'intercessor-squad', enh: 'Furious Assault (Upgrade)' },
      { k: 'i2', id: 'intercessor-squad' },
    ],
  },
  {
    key: 'havocs',
    name: 'Проверка: Havocs — замена «одно из двух»',
    faction: 'chaos-space-marines',
    detachments: ['Veterans of the Long War'],
    battleSize: 'incursion',
    expect: { legal: true },
    units: [
      { k: 'l', id: 'chaos-lord', warlord: true },
      { k: 'h1', id: 'havocs', gear: [['Havoc heavy bolter', 4], ['Power fist']] },
      // Control: the same squad as printed. Two "autocannon" picks are the lascannon Havocs
      // changing weapons — so it is NOT here, it would be a third copy at Incursion.
      { k: 'h2', id: 'havocs' },
    ],
  },
  {
    key: 'breachers',
    name: 'Проверка: замены «на профиль» (Breachers)',
    faction: 'imperial-agents',
    detachments: ['Imperialis Fleet'],
    battleSize: 'incursion',
    expect: { legal: true },
    units: [
      { k: 'q', id: 'inquisitor', warlord: true },
      { k: 'b1', id: 'imperial-navy-breachers', gear: [['Autopistol + Power weapon'], ['Meltagun']] },
      { k: 'b2', id: 'imperial-navy-breachers' },
    ],
  },
  {
    key: 'own-limits',
    name: 'Проверка: свои ограничения',
    faction: 'space-marines',
    detachments: ['Gladius Task Force'],
    battleSize: 'custom',
    customPoints: 1500,
    customLimits: { dp: 2, enh: 2, dup: 2, line: 4 },
    expect: { legal: true },
    units: [
      { k: 'cap', id: 'captain', warlord: true, lead: 'i1' },
      { k: 'i1', id: 'intercessor-squad' },
      { k: 'i2', id: 'intercessor-squad' },
      { k: 'i3', id: 'intercessor-squad' },
      { k: 'i4', id: 'intercessor-squad' },
    ],
  },
  {
    key: 'unlimited',
    name: 'Проверка: без лимита, большой ростер',
    faction: 'orks',
    detachments: ['War Horde', 'Kult of Speed', 'Dread Mob'],
    battleSize: 'none',
    expect: { legal: true },
    units: [
      { k: 'w', id: 'warboss', warlord: true },
      ...Array.from({ length: 12 }, (_, i) => ({ k: `b${i}`, id: 'boyz' })),
      ...Array.from({ length: 6 }, (_, i) => ({ k: `t${i}`, id: 'trukk' })),
      ...Array.from({ length: 5 }, (_, i) => ({ k: `d${i}`, id: 'deff-dread' })),
      ...Array.from({ length: 5 }, (_, i) => ({ k: `g${i}`, id: 'gretchin' })),
      ...Array.from({ length: 4 }, (_, i) => ({ k: `n${i}`, id: 'nobz' })),
    ],
  },
  {
    key: 'allies',
    name: 'Проверка: союзники (Brood Brothers)',
    faction: 'genestealer-cults',
    detachments: ['Brood Brothers Auxilia'],
    battleSize: 'strike-force',
    expect: { legal: true },
    units: [
      { k: 'p', id: 'primus', warlord: true },
      { k: 'n', id: 'neophyte-hybrids' },
      { k: 'a', id: 'acolyte-hybrids-with-autopistols' },
      { k: 'c', id: 'astra-militarum:cadian-shock-troops' },
      { k: 'l', id: 'astra-militarum:leman-russ-battle-tank' },
    ],
  },
  {
    key: 'legends',
    name: 'Проверка: Legends',
    faction: 'chaos-space-marines',
    detachments: ['Veterans of the Long War'],
    battleSize: 'strike-force',
    expect: { legal: true },
    units: [
      { k: 'j', id: 'chaos-lord-on-juggernaut', warlord: true },
      { k: 'c', id: 'chosen' },
    ],
  },
  {
    key: 'archived',
    name: 'Проверка: ростер в архиве',
    faction: 'space-marines',
    detachments: ['Gladius Task Force'],
    battleSize: 'incursion',
    archived: true,
    expect: { legal: true },
    units: [{ k: 'cap', id: 'captain', warlord: true, lead: 'i' }, { k: 'i', id: 'intercessor-squad' }],
  },
  {
    key: 'errors',
    name: 'Проверка: ростер с ошибками',
    faction: 'chaos-space-marines',
    detachments: ['Pactbound Zealots', 'Veterans of the Long War', 'Renegade Raiders'],
    battleSize: 'incursion',
    // An Incursion's 2 DP spent three times over, a fourth copy of a datasheet, and Havocs in
    // Pactbound Zealots without the Mark of Chaos that detachment demands.
    expect: { errors: ['overDp', 'overDuplicate', 'allegMissing'] },
    units: [{ k: 'l', id: 'chaos-lord', warlord: true }, ...Array.from({ length: 4 }, (_, i) => ({ k: `h${i}`, id: 'havocs' }))],
  },
]

// The spec as a roster the store would hold. `faction` is the loaded roster faction (with allies),
// `items` the shared item dictionary. Throws on a spec that names something the data does not have,
// so a renamed unit or option is a loud failure, never a quietly different list.
export function buildTestRoster(spec, { faction, items }, { id = `test-${spec.key}`, now = 0 } = {}) {
  const uidOf = (k) => `${spec.key}-${k}`
  const units = spec.units.map((u) => {
    const def = faction.units.find((x) => x.id === u.id)
    if (!def) throw new Error(`${spec.key}: no unit ${u.id}`)
    const at = def.sizes.findIndex((s) => s.default)
    const entry = { uid: uidOf(u.k), id: u.id, size: at >= 0 ? at : 0 }
    if (u.count) entry.count = u.count
    if (u.enh) entry.enh = u.enh
    if (u.warlord) entry.warlord = true
    if (u.mark) entry.alleg = u.mark
    if (u.lead) entry.leaderOf = uidOf(u.lead)
    if (u.gear?.length) {
      entry.wg = u.gear.map(([label, n = 1, nth = 0]) => {
        const hits = []
        ;(def.gear || []).forEach((g, gi) => g.o.forEach((o, oi) => { if (optionLabel(o, items) === label) hits.push([gi, oi]) }))
        if (!hits[nth]) throw new Error(`${spec.key}: ${u.id} offers no "${label}"`)
        return [...hits[nth], n]
      })
    }
    return entry
  })
  const roster = {
    id, name: spec.name, faction: spec.faction, detachments: [...spec.detachments],
    battleSize: spec.battleSize, notes: '', units, createdAt: now, updatedAt: now,
  }
  if (spec.customPoints != null) roster.customPoints = spec.customPoints
  if (spec.customLimits) roster.customLimits = { ...spec.customLimits }
  if (spec.disposition) roster.disposition = spec.disposition
  if (spec.archived) roster.archived = true
  return roster
}
