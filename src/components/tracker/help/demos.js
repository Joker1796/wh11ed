// Example data for the tracker's help demos (help/*Demo.vue). Every name here is one the game
// itself shows — a condition from the roster's conditions table, a real ability set, a real aura,
// a core stratagem — and demos.test.js holds each to the data, so a help never shows something the
// app would not.
import { conditions } from '../../../core/rules/conditions.js'

// ── Live modifiers: one unit's plates, printed and as a list reads them ──────────────────────
// Plates in RosterStatPlates' shape: { label, value, inv?, mod? }.
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

// ── Chips (ConditionChips' switches) ─────────────────────────────────────────────────────────
const cond = (id, on = false, extra = {}) => ({ id, label: conditions[id].label, on, ...extra })
const name = (en, ru = en) => ({ en, ru })

export const CHIP_DEMOS = {
  // "Unit states": what a unit did this turn, as its card's chips.
  'unit-states': {
    title: name('Intercessor Squad'),
    switches: [cond('unit-charged', true), cond('unit-advanced'), cond('unit-stationary'), cond('unit-engaged', true), cond('unit-arrived-from-reserves')],
  },
  // "Battle-shock": the one chip, on.
  'battle-shock': {
    title: name('Intercessor Squad'),
    switches: [cond('unit-battle-shocked', true)],
  },
  // "Stratagems": spent on this unit, lasting as long as it says — a core stratagem, English name
  // (project convention) with its Russian under it.
  stratagems: {
    title: name('Intercessor Squad'),
    switches: [{ id: 'smokescreen', label: name('Smokescreen'), subLabel: name('', 'Дымовая завеса'), on: true }],
  },
  // "Auras": a rule from another model of the list reaching this unit, "source · rule" as the
  // roster labels it (rosterGameContext).
  auras: {
    title: name('Bloodletters'),
    switches: [{ id: 'aura', label: name('Bloodthirster · Daemon Lord of Khorne'), on: true }],
  },
  // "Ability sets": a model's own set to pick from each round — Triumph of Saint Katherine picks
  // two of the Relics of the Matriarchs.
  'ability-sets': {
    title: name('Triumph of Saint Katherine'),
    switches: ['The Fiery Heart (Aura)', 'Censer of the Sacred Rose (Aura)', 'Simulacrum of the Ebon Chalice (Aura)', 'Simulacrum of the Argent Shroud (Aura)', 'Icon of the Valorous Heart (Aura)', 'Petals of the Bloody Rose (Aura)']
      .map((n, i) => ({ id: `relic-${i}`, label: name(n), on: i < 2, group: 'relics', groupLimit: 2, groupOwner: 'Relics of the Matriarchs' })),
  },
  // "Army states": what is true of the battle, not of one model — the Drukhari Combat Drugs.
  'army-states': {
    title: name('Drukhari · Spectacle of Spite'),
    switches: ['drug-adrenalight', 'drug-hypex', 'drug-serpentin', 'drug-painbringer'].map((id, i) => cond(id, i === 0, { groupOwner: 'Combat Drugs' })),
  },
}

// ── Where each unit is (UnitStatusButton) ────────────────────────────────────────────────────
export const UNIT_STATUS_DEMO = [
  { unit: 'Intercessor Squad', status: 'table' },
  { unit: 'Terminator Squad', status: 'reserve' },
  { unit: 'Captain', status: 'destroyed' },
]

// ── Score (ScoreBoard): one game, its numbers; VP vs BP, and side colours ────────────────────
const round = (primary) => ({ primary, picks: {} })
// `secondaries` is one number per card scored, in round order — a tactical card scores at most
// 5VP a time (gameScoring), so a total above 5 is several cards.
const side = (isYou, factionSlug, primaries, secondaries, battleReady) => ({
  name: '', isYou, factionSlug, detachments: [], role: isYou ? 'attacker' : 'defender', cp: 2, battleReady,
  rounds: [...primaries.map(round), ...Array(5 - primaries.length).fill(0).map(() => round(0))],
  secondary: { deck: [], hand: [], drawn: {}, discarded: [], scored: secondaries.map((vp, i) => ({ slug: `demo-${i}`, round: i + 1, picks: {}, vp })) },
})

/**
 * A game half-way through, for ScoreBoard: `scoreMode` VP or BP, `sideColors` the custom picks,
 * `track` the option rows (a preset's values — TrackPresets' demo).
 */
export function demoGame({ scoreMode = 'vp', sideColors = null, track = null } = {}) {
  return {
    id: 'demo', phase: 'playing', currentRound: 3, currentTurn: 0,
    settings: { scoreMode, trackCP: true, ...track, ...(sideColors && { customColors: true, sideColors }) },
    players: [side(true, 'orks', [10, 15, 15], [3, 5], true), side(false, 'necrons', [10, 10, 12], [5, 5, 2], false)],
  }
}

// ── CP and stratagems: the CP tab's bank line and three of its rows ──────────────────────────
// A side with 1 CP and this round's bonus taken; one stratagem to play, one used this round (once
// per battle, so now closed) — two rows, the help is short (owner). `block` is the reason key
// CpStratagems would give (trackerStratBlock_*).
export const CP_DEMO = {
  cp: 1,
  bonus: true,
  rows: [
    { name: 'Command Re-roll' },
    { name: 'Insane Bravery', used: 1, undoable: true, block: 'perBattle' },
  ],
}

// ── Track phases: the turn bar at the foot of the screen, without and with the phase ─────────
export const PHASES_DEMO = { phase: 'shooting' }

// ── Phase rules: the Phase tab for one army — a datasheet ability per phase it fires in,
// read from the same index the tab reads (phaseIndex.js): [phase, unit id, ability index].
export const PHASE_RULES_DEMO = {
  faction: 'orks',
  rows: [['command', 'big-mek-in-mega-armour', 0], ['movement', 'beastboss', 0], ['shooting', 'boyz', 0]],
}
