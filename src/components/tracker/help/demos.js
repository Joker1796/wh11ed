// Example data for the tracker's help demos — numbers from the real data, held to it by
// demos.test.js. Plates in RosterStatPlates' shape: { label, value, inv?, mod? }.
const plates = (p, mod = {}) => [
  { label: 'M', value: p.m }, { label: 'T', value: p.t }, { label: 'SV', value: mod.sv ?? p.sv, mod: 'sv' in mod },
  { label: 'W', value: p.w }, { label: 'LD', value: p.ld }, { label: 'OC', value: p.oc },
  { label: 'INV', value: p.inv, inv: true },
]
const CANONESS = { m: '6"', t: '3', sv: '3+', w: '4', ld: '7+', oc: '1', inv: '4+' }

export const MODIFIERS_DEMO = {
  faction: 'adepta-sororitas',
  datasheet: 'canoness',
  unit: 'Canoness',
  enhancement: 'Iron Surplice of Saint Istalela',
  profile: CANONESS,
  printed: plates(CANONESS),
  inList: plates(CANONESS, { sv: '2+' }),
}
