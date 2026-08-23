// How a modifier NOTE is read out: which source it came from, what it does to the number, and how
// a list of them is bucketed. Pure — labels are passed in — because two screens render the same
// notes and must word them identically: the unit card's own two lists (DatasheetCard) and the
// roster's "possible modifiers" summary above the unit list (RosterViewView).
//
// The notes themselves come from rosterStatMods' applyStatMods(); `live` says whether the modifier
// is in force right now, which is what decides WHICH list a note belongs to.

// WHERE a modifier came from, as a label. Text only, no colour of its own: the card already
// carries the faction accent, and five source colours would compete with it. A detachment and a
// Leader name themselves ("detachment · Creations of Bile"), the rest are the kind alone.
export function modSourceLabel(n, l) {
  if (n.kind === 'ability') {
    // Reusing the rule block's own words for the three sources it already names, so the same rule
    // reads the same whether the reader meets it as a footnote or as a block.
    if (n.from === 'led') return `${l.rosterLeaderTag} · ${n.owner}`
    if (n.from === 'leader') return `${l.srcLedUnit} · ${n.owner}`
    return l.srcAbility
  }
  if (n.kind === 'core') return l.srcCore
  if (n.kind === 'stratagem') return n.det ? `${l.srcStratagem} · ${n.det}` : l.srcStratagem
  if (n.kind === 'wargear') return l.srcWargear
  if (n.kind === 'detachmentRule') return n.det ? `${l.factionDetachment} · ${n.det}` : l.factionDetachment
  if (n.kind === 'enhancement') return l.rosterEnhancement
  if (n.kind === 'allegiance') return l.srcAllegiance
  return l.srcArmy
}

// The notes bucketed by that label, in the order the sources first appear — so a list reads source
// by source instead of in the order the arithmetic happened to run.
export function groupModNotes(notes, l) {
  const out = []
  const byKey = new Map()
  for (const n of notes || []) {
    const label = modSourceLabel(n, l)
    let g = byKey.get(label)
    if (!g) { g = { key: label, label, notes: [] }; byKey.set(label, g); out.push(g) }
    g.notes.push(n)
  }
  return out
}

const STAT_LABEL = { m: 'M', t: 'T', sv: 'SV', w: 'W', ld: 'LD', oc: 'OC', inv: 'INV', a: 'A', bs: 'BS', ws: 'WS', s: 'S', ap: 'AP', d: 'D', range: 'RANGE' }

// "+2 S", "SV −1", "INV = 5+" — deliberately symbolic rather than a sentence, so the note needs
// no translating of its own beyond the condition text the record already carries bilingually.
export function modDelta(n) {
  const stat = STAT_LABEL[n.stat] || String(n.stat).toUpperCase()
  if (n.op === 'set') return `${stat} = ${n.value}`
  if (n.op === 'improve') return `${stat} −${n.value}`
  // A value can be a dice expression ("D3") on a conditional modifier, which Number() can't sign.
  const signed = Number.isFinite(Number(n.value)) && Number(n.value) < 0 ? '' : '+'
  return `${signed}${n.value} ${stat}`
}
