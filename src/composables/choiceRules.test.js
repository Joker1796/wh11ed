// Every rule worded as a choice ("select one of the following", "▪ … ▪ Or: …") is either tracked
// in the game — a switch, a stratagem's or a once-per-battle ability's own option, an ability set, a
// selected aura — or named below with the reason it is not (owner, 2026-10-15: "track them all, for
// completeness, and to read the rule"). A new rule worded this way fails here until it is one or
// the other. Read off our own faction pages and datasheets, the text a player reads.
import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadFaction } from '../data/factions/index.js'
import { loadDatasheets } from '../data/datasheets/index.js'
import { conditions } from '../core/rules/conditions.js'
import { SM_FAMILY } from '../data/smChapters.js'

const here = path.dirname(fileURLToPath(import.meta.url))
const CHOICE = /select one of the following|select one of the (?:abilities|options|effects|results)|choose one of the following|one of the following (?:abilities|effects)|from the list below|__Or:__|select one (?:\w+ ){0,3}below/i
const bare = (n) => String(n || '').replace(/\s*\([^)]*\)\s*$/, '').trim().toLowerCase()

// Not a choice the game can track, by reason. Keyed by "<kind>: <name>" as the scan below names it,
// so a Space Marines sheet shared by the five Chapters is one entry.
const WHY = {
  // "▪ X. ▪ Or: if <the target / the unit's state>, more" — the better line hangs on something the
  // card cannot see or already answers, not on a pick. Each record says so in its own `when`.
  stateUpgrade: [
    'ability: Adrax Agatone: Unto the Anvil', 'ability: Aquila Kill Team: Death to the Alien',
    'ability: Deathwatch Kill Team: Death to the Alien', 'ability: Deathwatch Veterans: Death to the Alien',
    'ability: Decimus Kill Team: Death to the Alien', 'ability: Fortis Kill Team: Fortis Doctrines',
'ability: Ulrik the Slayer: Oathbound',
    'ability: Custodian Guard Sodality with Adrasite Spears: Stand Vigil', 'ability: Centurion Devastator Squad: Decimator Protocols',
    'ability: Beast Snagga Boyz: Mobbed', 'enhancement: Null Maiden Vigil: Oblivion Knight',
    'enhancement: Phobos Shadow Force: Venator Omni-auspex', 'enhancement: Phobos Shock Force: Venator Omni-auspex',
    'enhancement: Green Tide: Ferocious Show-off', 'stratagem: Angelic Inheritors: Focused Fury',
    'stratagem: Null Maiden Vigil: Purgation Sweep', 'stratagem: Vow-sworn Crusaders: Pious Enmity',
    'stratagem: War Horde: Close-range Dakka', 'stratagem: War Horde: Mow ’Em Down',
    'stratagem: Ceramite Sentinels: Stand to the End',
  ],
  // A move, an action or a shot outside the phase: nothing on the card changes, whichever is taken.
  move: [
    'ability: Captain in Phobos Armour: Tactical Fluidity (Once per battle round, per unit)',
    'ability: Shield‑Captain on Dawneagle Jetbike: Sweeping Advance (Once per battle, per unit)',
    'ability: Nazdreg: Supreme Kunnin’ (Once per phase, per army)',
    'detachmentRule: Phobos Shadow Force: Shadow Masters', 'stratagem: Ceramite Sentinels: Evasive Repositioning',
    'stratagem: Flyboyz: Whirligig Evasion', 'stratagem: Phobos Shock Force: Transhuman Reactions',
    'stratagem: Runt Swarm: Scarper!', 'stratagem: Shadowmark Talon: Raptorial Vigilance',
    'stratagem: Stormlance Task Force: Wind-Swift Evasion', 'stratagem: Tactical Brethren: Masterful Tactics',
    'stratagem: Medusa\'s Wrath: Power of the Machine Spirit',
  ],
  // A roll decides between the lines, and what it hits is an enemy unit.
  dice: [
    'ability: Castellan: Vehement Aggression', 'ability: Incursor Squad: Haywire Mine (Once per battle, per unit)',
    'ability: Wolf Scouts: Haywire Mine (Once per battle, per unit)',
    'ability: Venatari with Kinetic Destroyers: Neutronium Cascade Mine (Once per battle, per unit)',
    'ability: Venatari with Verutum Lances: Neutronium Cascade Mine (Once per battle, per unit)',
    'detachmentRule: Lords of the Forge: War-form Mantles',
  ],
  // Spent at once — a CP, a returned model, healed wounds: there is no state to keep.
  resource: ['ability: Junith Eruita: Fiery Conviction', 'ability: Masters of the Maelstrom: Choice Samples', 'ability: Mad Dok Grotsnik: Mad Dok'],
  // Picked when the list is built: the allegiance the roster records (rosterEngine's allegFor).
  list: [
    'ability: Heretic Astartes Daemon Prince: Daemonic Allegiance', 'ability: Heretic Astartes Daemon Prince with Wings: Daemonic Allegiance',
    'ability: Soul Grinder: DAEMONIC ALLEGIANCE',
  ],
  // The pick is an enemy unit, an objective or a keyword of the target — a position or a target.
  target: ['ability: Norn Assimilator: Singular Purpose', 'ability: Norn Emissary: Singular Purpose', 'ability: Wraithlord: Fated Hero', "armyRule: Nurgle's Gift (Aura)"],
  // Re-roll ONE die of the player's choosing: no number on the card.
  reroll: ["detachmentRule: Medusa's Wrath: Armoured Wrath"],
  // An extra use of the army's doctrine — the doctrine counter's budget, not a switch on a card.
  budget: ['detachmentRule: Spearpoint Task Force: Storm-swift Onslaught'],
}
const ALLOWED = new Set(Object.values(WHY).flat())

/** @param {any} e */
const tracksAChoice = (e) => e.op === 'state' || e.selected || e.once
  || (e.cond || []).some((/** @type {string} */ c) => conditions[c] && conditions[c].scope !== 'roster' && conditions[c].scope !== 'clock')

async function untracked() {
  const dir = path.join(here, '../data/rosterModifiers')
  /** @param {string} f */
  const read = (f) => {
    const src = fs.readFileSync(path.join(dir, f), 'utf8')
    return JSON.parse(src.slice(src.indexOf('export default ') + 15).replace(/;?\s*$/, '')).entries
  }
  const sm = read('space-marines.js')
  const out = new Map()
  for (const f of fs.readdirSync(dir).filter((f) => /^[a-z-]+\.js$/.test(f) && !['index.js', 'conditions.js', 'coreRules.js', 'appliesWhile.js'].includes(f))) {
    const slug = f.replace('.js', '')
    const recs = SM_FAMILY.has(slug) && slug !== 'space-marines' ? [...read(f), ...sm] : read(f)
    const sets = recs.filter((r) => r.ref?.set).map((r) => ({ unit: r.ref.unit, set: r.ref.set.toLowerCase() }))
    /** @param {any} r @param {{ unit?: string, name: string, text: string }} t */
    const tracked = (r, t) => (!!t.unit && sets.some((s) => s.unit === t.unit
        && (t.text.toLowerCase().includes(s.set) || bare(t.name.slice(t.name.indexOf(': ') + 2)) === s.set)))
      || (!!r && (!!r.ref?.set || (r.effects || []).some(tracksAChoice)))
    const fac = (await loadFaction(slug))?.en
    const texts = []
    if (fac?.armyRule) texts.push({ kind: 'armyRule', name: fac.armyRule.name, text: fac.armyRule.body, rec: recs.find((r) => r.ref?.kind === 'armyRule') })
    for (const d of fac?.detachments || []) {
      texts.push({ kind: 'detachmentRule', name: `${d.name}: ${d.rule?.name || ''}`, text: d.rule?.body, rec: recs.find((r) => r.ref?.kind === 'detachmentRule' && r.ref.det === d.id) })
      for (const x of d.enhancements || []) texts.push({ kind: 'enhancement', name: `${d.name}: ${x.name}`, text: x.body, rec: recs.find((r) => r.ref?.kind === 'enhancement' && r.ref.det === d.id && r.name.startsWith(x.name)) })
      for (const x of d.stratagems || []) texts.push({ kind: 'stratagem', name: `${d.name}: ${x.name}`, text: x.effect, rec: recs.find((r) => r.ref?.kind === 'stratagem' && r.ref.det === d.id && r.name === x.name) })
    }
    for (const s of (await loadDatasheets(slug)) || []) {
      for (const a of [...(s.abilities || []), ...(s.wargearAbilities || []), ...(s.specialAbilities || [])]) {
        texts.push({ kind: 'ability', unit: s.id, name: `${s.name}: ${a.name}`, text: a.text, rec: recs.find((r) => r.ref?.unit === s.id && bare(r.name.slice(r.name.indexOf(': ') + 2)) === bare(a.name)) })
      }
    }
    for (const t of texts) {
      if (!CHOICE.test(t.text || '')) continue
      const key = `${t.kind}: ${t.name}`
      out.set(key, (out.get(key) || false) || tracked(t.rec, { ...t, text: t.text || '' }))
    }
  }
  return out
}

describe('every rule worded as a choice', () => {
  it('is tracked in the game, or named with the reason it is not', async () => {
    const seen = await untracked()
    const missing = [...seen].filter(([k, ok]) => !ok && !ALLOWED.has(k)).map(([k]) => k)
    expect(missing, 'a rule worded as a choice that no switch tracks — model it (src/data/rosterModifiers) or name it in WHY').toEqual([])
    // …and an entry here that no longer matches an untracked rule is stale: renamed, or tracked now.
    const stale = [...ALLOWED].filter((k) => seen.get(k) !== false)
    expect(stale, 'WHY names a rule that is tracked now, or no longer exists').toEqual([])
  }, 120000)
})

// The other half: an effect closed with `never` whose own `when` says it is a pick ("one of the
// two, selected when used") — the reader decided "not answerable" for what is exactly a switch.
// Take Cover! and Anathema Blademastery were both this.
describe('a choice is not parked as never', () => {
  it('no `never` effect is worded as a pick', () => {
    const dir = path.join(here, '../data/rosterModifiers')
    const PICK = /selected when used|one of the two|one of: |the one selected|option (?:was )?(?:chosen|picked)|if .{0,30} is the option/i
    const bad = []
    for (const f of fs.readdirSync(dir).filter((f) => /^[a-z-]+\.js$/.test(f) && !['index.js', 'conditions.js', 'coreRules.js', 'appliesWhile.js'].includes(f))) {
      const src = fs.readFileSync(path.join(dir, f), 'utf8')
      for (const e of JSON.parse(src.slice(src.indexOf('export default ') + 15).replace(/;?\s*$/, '')).entries) {
        for (const eff of e.effects || []) {
          if (eff.cond?.includes('never') && PICK.test(eff.when?.en || '')) bad.push(`${f} ${e.name}: ${eff.when.en}`)
        }
      }
    }
    expect(bad).toEqual([])
  })
})
