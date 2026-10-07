import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NumberStepper from '../tracker/NumberStepper.vue'
import UnitEditorFields from './UnitEditorFields.vue'
import ConfirmModal from '../ConfirmModal.vue'
import { wargearGroupCap } from '../../composables/rosterEngine.js'
import rosterItems from '../../data/roster/items.js'
import drukhari from '../../data/roster/drukhari.js'
import astraMilitarum from '../../data/roster/astra-militarum.js'
import imperialAgents from '../../data/roster/imperial-agents.js'
import aeldari from '../../data/roster/aeldari.js'
import adeptusMechanicus from '../../data/roster/adeptus-mechanicus.js'
import chaosSpaceMarines from '../../data/roster/chaos-space-marines.js'
import chaosDaemons from '../../data/roster/chaos-daemons.js'
import necrons from '../../data/roster/necrons.js'
import spaceWolves from '../../data/roster/space-wolves.js'
import darkAngels from '../../data/roster/dark-angels.js'

// Mounted against REAL generated data: what this guards is the path from the generator's bundled
// options to what the player actually reads, which a fixture would hide.
const wracks = drukhari.units.find((u) => u.id === 'wracks')
const wraithlord = aeldari.units.find((u) => u.id === 'wraithlord')
const mountFor = (def, entry = {}) => mount(UnitEditorFields, {
  props: { entry: { uid: 'u1', id: def.id, size: 0, ...entry }, def, items: rosterItems.items, texts: rosterItems.texts },
  global: { stubs: { Teleport: true } },
})

describe('UnitEditorFields — wargear instructions', () => {
  it('renders the option list as separate lines, not one run-on heading', () => {
    const w = mountFor(wracks)
    const list = w.findAll('.ues-blist')[0]
    expect(list.findAll('li')).toHaveLength(4)
    expect(list.findAll('li')[0].text()).toContain('hexrifle')
    // the marker is presentation now, not text
    expect(w.text()).not.toContain('◦')
  })

  // A group's heading is prose off the datasheet; every other heading here is a two-word label.
  // style.css puts all of them in the extra-condensed display face, which only the labels want.
  it('marks a group instruction as prose, not as a label', () => {
    const w = mountFor(wracks)
    const heads = w.findAll('.ues-h')
    expect(heads.filter((h) => h.classes().includes('ues-instr')).length).toBe(wracks.gear.length)
    // The unit-size / model-count / default-loadout headings keep the display face.
    expect(heads.some((h) => !h.classes().includes('ues-instr'))).toBe(true)
  })

  it('labels a bundled option with every item it grants', () => {
    const names = mountFor(wracks).findAll('.opt-name').map((n) => n.text())
    expect(names).toContain('Hexrifle + Torturer’s tool')
    expect(names).not.toContain('Hexrifle')
  })
})

describe('UnitEditorFields — pick limits', () => {
  const kasrkin = astraMilitarum.units.find((u) => u.name === 'Kasrkin')
  const vigilant = imperialAgents.units.find((u) => u.name === 'Vigilant Squad')

  it('shows the allowance the unit actually has', () => {
    // "Up to 4 Kasrkin Troopers can each have their hot-shot lasgun replaced…", max 2 of a kind.
    expect(mountFor(kasrkin).text()).toContain('up to 4, max 2 of a kind')
  })

  it('caps a stepper by the remaining budget, not by the model count', () => {
    const gi = kasrkin.gear.findIndex((g) => g.o.length > 3 && g.lim)
    // The "+" of the first option in that group, however the tiles are laid out.
    const plus = (w) => w.findAll('.opt-tile:not(.opt-stock) .opt-step-body')[0].findAll('.step-btn')[1]
    // Its own duplicate cap is 2, so a second copy is fine and a third is not — even though the
    // squad has 10 models and the group's total allowance is 4.
    expect(plus(mountFor(kasrkin, { wg: [[gi, 0, 1]] })).attributes('disabled')).toBeUndefined()
    expect(plus(mountFor(kasrkin, { wg: [[gi, 0, 2]] })).attributes('disabled')).toBeDefined()
    // Budget spent elsewhere in the same group closes it too, below the duplicate cap.
    expect(plus(mountFor(kasrkin, { wg: [[gi, 0, 1], [gi, 1, 3]] })).attributes('disabled')).toBeDefined()
  })

  it('turns a several-models group into steppers instead of a one-of list', () => {
    // "Up to 2 Vigilants can each have their combat shotgun replaced with one of the following"
    // — appdata calls it a checkbox, which used to render as a single choice for the whole squad.
    const gi = vigilant.gear.findIndex((g) => g.lim && g.in !== 'stepper' && g.o.length > 1)
    const w = mountFor(vigilant)
    const names = w.findAll('.opt-step-body').map((n) => n.text())
    for (const o of vigilant.gear[gi].o) {
      expect(names.some((n) => n.includes(rosterItems.items[Array.isArray(o[0]) ? o[0][0][0] : o[0]]))).toBe(true)
    }
  })

  it('says so when the size puts a group out of reach', () => {
    // Ratlings: "If this unit contains 10 models, one model's sniper rifle…". The 6-10 bracket
    // is not enough on its own — it's the live model count that opens the group.
    const ratlings = astraMilitarum.units.find((u) => u.name === 'Ratlings')
    expect(mountFor(ratlings).text()).toContain('Not available at this unit size')
    expect(mountFor(ratlings, { size: 1, count: 6 }).text()).toContain('Not available at this unit size')
    expect(mountFor(ratlings, { size: 1, count: 10 }).text()).not.toContain('Not available at this unit size')
  })
})

describe('UnitEditorFields — a group waiting on a sibling', () => {
  // Necron Overlord: the Resurrection Orb is only on offer once the tachyon arrow has been given
  // up. It used to vanish from the page until then, which reads as the editor losing an option.
  const overlord = necrons.units.find((u) => u.id === 'overlord')
  const orbGi = overlord.gear.findIndex((g) => g.cond)

  it('greys the group out instead of removing it', () => {
    const w = mountFor(overlord)
    expect(w.findAll('.opt-name').map((n) => n.text())).toContain('Resurrection Orb') // still on the page
    expect(w.findAll('.ues-inert')).toHaveLength(1)
    expect(w.find('.ues-inert input[type=checkbox]').attributes('disabled')).toBeDefined()
  })

  it('says what has to come off, by name', () => {
    const text = mountFor(overlord).find('.ues-blocked').text()
    expect(text).toContain('Requires removing:')
    expect(text).toContain('Tachyon arrow') // the sibling's own `rep`, not the orb
    expect(text).toContain('Overlord’s blade') // both halves of what that swap takes away
  })

  it('opens it once the sibling has been changed', () => {
    const sibGi = overlord.gear[orbGi].cond[0]
    const w = mountFor(overlord, { wg: [[sibGi, 0, 1]] })
    expect(w.findAll('.ues-inert')).toHaveLength(0)
    expect(w.find('.ues-blocked').exists()).toBe(false)
  })
})

describe('UnitEditorFields — unit composition', () => {
  const voidscarred = aeldari.units.find((u) => u.id === 'corsair-voidscarred')
  const ruststalkers = adeptusMechanicus.units.find((u) => u.id === 'sicarian-ruststalkers')

  it('spells out which profiles make up the squad', () => {
    // "5-10 models" says nothing about who they are; the breakdown does.
    expect(mountFor(wracks, { size: 1, count: 7 }).find('.ues-comp').text()).toBe('1× Acothyst + 6× Wrack')
  })

  it('tells tied size pills apart by what actually differs', () => {
    // Corsair Voidscarred prices three different 7-model builds at 140 points; the pills read
    // identically without the profile that separates them.
    const pills = mountFor(voidscarred).findAll('.pill').map((p) => p.text())
    const sevens = pills.filter((t) => t.startsWith('7 · 140'))
    expect(sevens).toHaveLength(3)
    expect(new Set(sevens).size).toBe(3)
    expect(sevens.join(' ')).toContain('Shade Runner')
  })

  it('caps an uncapped stepper by its own profile, not the whole squad', () => {
    // "Any number of Sicarian Ruststalkers can each have their transonic razor…" — the Princeps is
    // not one of them, so a 10-model unit allows 9 swaps, where the squad count would allow 10.
    const size = ruststalkers.sizes.findIndex((s) => s.per[1] === 10)
    const gi = ruststalkers.gear.findIndex((g) => g.m === 1 && g.in === 'stepper' && !g.lim && !g.all)
    expect(gi).toBeGreaterThan(-1)
    const w = mountFor(ruststalkers, { size, count: 10 })
    // Steppers render in group order; the model-count one lives outside the wargear sections.
    const wargearSteppers = w.findAllComponents(NumberStepper).filter((s) => !s.classes('stock-n')).slice(w.find('.ues-count').exists() ? 1 : 0)
    const before = ruststalkers.gear.slice(0, gi).filter((g) => g.in === 'stepper' || g.lim?.[0]?.[1] > 1).length
    expect(wargearSteppers[before].props('max')).toBe(9)
  })

  // "This model can be equipped with ONE OF THE FOLLOWING" is one budget however many rows it is
  // drawn as. Every row used to be handed the whole thing, so a Leman Russ could take all four of
  // its sponson sets — and validateRoster, which sums the group the same way, then reported the
  // list illegal. The editor now stops the "+" exactly where the validator draws its line.
  it('shares an uncapped group\'s budget across its options', () => {
    const russ = astraMilitarum.units.find((u) => u.id === 'leman-russ-battle-tank')
    const gi = russ.gear.findIndex((g) => g.in === 'stepper' && !g.lim && !g.all && g.o.length > 1)
    expect(gi).toBeGreaterThan(-1)
    const steppers = (w) => w.findAllComponents(NumberStepper).filter((s) => !s.classes('stock-n')).slice(w.find('.ues-count').exists() ? 1 : 0)
    const before = russ.gear.slice(0, gi).filter((g) => g.in === 'stepper' || g.lim?.[0]?.[1] > 1).length
    // One model, so one pick for the group: untouched, every row offers it…
    const idle = steppers(mountFor(russ))
    expect(idle[before].props('max')).toBe(1)
    expect(idle[before + 1].props('max')).toBe(1)
    // …and once one row has taken it, the others have nothing left and their "+" goes dead.
    const spent = mountFor(russ, { wg: [[gi, 0, 1]] })
    expect(steppers(spent)[before].props('max')).toBe(1) // its own row can still hold what it has
    expect(steppers(spent)[before + 1].props('max')).toBe(0)
    const plus = spent.findAll('.opt-step-body')[1].findAll('.step-btn')[1]
    expect(plus.attributes('disabled')).toBeDefined()
  })

  it('lets a model swap every copy of a weapon it carries twice', () => {
    // A Wraithlord's two shuriken catapults each become a flamer — one model, two picks. The
    // per-model ceiling alone stopped the stepper at one, so the second flamer was unbuildable.
    const gi = wraithlord.gear.findIndex((g) => g.cp)
    expect(gi).toBeGreaterThan(-1)
    const w = mountFor(wraithlord)
    const steppers = w.findAllComponents(NumberStepper).filter((s) => !s.classes('stock-n')).slice(w.find('.ues-count').exists() ? 1 : 0)
    const before = wraithlord.gear.slice(0, gi).filter((g) => g.in === 'stepper' || g.lim?.[0]?.[1] > 1).length
    expect(steppers[before].props('max')).toBe(2)
  })
})

describe('UnitEditorFields — a cap that grows with the squad', () => {
  // "For every 5 models in this unit, 1 Legionary's boltgun can be replaced with one of the
  // following (duplicates are not allowed)" — 1 pick up to 9 models, 2 at 10, never the same
  // weapon twice. appdata states it in wargear_limit, but its choice list records the group's
  // first pick without the chainsword bundled onto it, so the set matched no group and the cap
  // was lost: a 10-model squad could take one special weapon (see gen-roster-data's
  // coversOneToOne).
  const legionaries = chaosSpaceMarines.units.find((u) => u.id === 'legionaries')
  const specialGi = legionaries.gear.findIndex((g) => g.o.length === 9)

  it('offers one pick at five models and two at ten', () => {
    expect(wargearGroupCap(legionaries, { size: 0 }, specialGi)).toMatchObject({ limit: 1, dup: 1 })
    expect(wargearGroupCap(legionaries, { size: 1, count: 9 }, specialGi)).toMatchObject({ limit: 1 })
    expect(wargearGroupCap(legionaries, { size: 1, count: 10 }, specialGi)).toMatchObject({ limit: 2, dup: 1 })
  })

  it('draws steppers once more than one is allowed, a one-of list before that', () => {
    // The cap is what picks the mode, not appdata's inputType: limit 1 stays a one-of list, and
    // above that each option gets its own stepper sharing the group's budget. The unit already
    // has two steppers of its own at any size (the model count, and the ungated chainsword swap),
    // so it is the group's nine options appearing that this counts.
    const steppers = (count) => mountFor(legionaries, { size: 1, count }).findAllComponents(NumberStepper).filter((s) => !s.classes('stock-n')).length
    expect(steppers(10) - steppers(9)).toBe(9)
  })

  it('never lets the same weapon fill both picks', () => {
    // "(duplicates are not allowed)" is prose — appdata leaves duplicateLimit empty here, so the
    // generator reads it from the instruction. Without that, two havoc autocannons.
    const w = mountFor(legionaries, { size: 1, count: 10, wg: [[specialGi, 2, 1]] })
    const steppers = w.findAllComponents(NumberStepper).filter((s) => !s.classes('stock-n'))
    const taken = steppers.find((s) => s.props('modelValue') === 1)
    expect(taken.props('max')).toBe(1)
  })
})

describe('UnitEditorFields — unit size brackets', () => {
  // Chosen: 5 · 135pts, or 6-10 · 270pts. The bracket price is one number for every size in it,
  // so a 6-model unit in the second bracket pays the 10-model price.
  const chosen = chaosSpaceMarines.units.find((u) => u.id === 'chosen')

  it('fills the bracket to the top when it is picked', async () => {
    const entry = { uid: 'u1', id: chosen.id, size: 0 }
    const w = mount(UnitEditorFields, {
      props: { entry, def: chosen, items: rosterItems.items, texts: rosterItems.texts },
      global: { stubs: { Teleport: true } },
    })
    await w.findAll('.pill')[1].trigger('click') // the 6-10 bracket
    expect(entry.size).toBe(1)
    expect(entry.count).toBe(10) // not 6, and not four presses of "+"
  })

  it('leaves a fixed-size bracket saying nothing about its count', async () => {
    const entry = { uid: 'u1', id: chosen.id, size: 1, count: 10 }
    const w = mount(UnitEditorFields, {
      props: { entry, def: chosen, items: rosterItems.items, texts: rosterItems.texts },
      global: { stubs: { Teleport: true } },
    })
    await w.findAll('.pill')[0].trigger('click') // back to the 5-model bracket
    expect(entry.count).toBeUndefined()
  })

  it('says how far down the count may go', () => {
    const w = mountFor(chosen, { size: 1, count: 10 })
    expect(w.find('.ues-count .ues-cap').text()).toBe('min 6')
    // …and the stepper is what takes it there.
    expect(w.findComponent(NumberStepper).props('min')).toBe(6)
  })
})

describe('UnitEditorFields — allegiance', () => {
  const vindicator = chaosSpaceMarines.units.find((u) => u.id === 'chaos-vindicator')
  const sorcerer = chaosSpaceMarines.units.find((u) => u.id === 'sorcerer')
  const grinder = chaosDaemons.units.find((u) => u.id === 'soul-grinder')
  const pactbound = [{ name: 'Pactbound Zealots', dp: 3, enhancements: [] }]
  const mountWith = (def, detachments, entry = {}) => mount(UnitEditorFields, {
    props: { entry: { uid: 'u1', id: def.id, size: 0, ...entry }, def, items: rosterItems.items, texts: rosterItems.texts, detachments },
    global: { stubs: { Teleport: true } },
  })

  it('offers the marks only while the gating detachment is in the army', () => {
    expect(mountWith(vindicator, pactbound).text()).toContain('Mark of Chaos')
    expect(mountWith(vindicator, [{ name: 'Veterans of the Long War', enhancements: [] }]).text()).not.toContain('Mark of Chaos')
  })

  it('leaves KHORNE off a Psyker, because appdata does', () => {
    // "You cannot select the KHORNE keyword for a Psyker unit" — the Psyker datasheets point at a
    // second allegiance group that simply has no Khorne, so the restriction needs no parsing.
    const names = mountWith(sorcerer, pactbound).findAll('.pill').map((p) => p.text())
    expect(names).toContain('Tzeentch')
    expect(names).not.toContain('Khorne')
  })

  it('names the weapon a mark adds', () => {
    // Soul Grinder: "this model is additionally equipped with: phlegm bombardment".
    expect(mountWith(grinder, []).text()).toContain('Phlegm bombardment')
  })
})

// ── Notes ──
//
// The player's own words on a unit. Nothing reads them, so what is worth pinning is that the field
// writes to the entry and that what it writes is folded to one line.
describe('UnitEditorFields — notes', () => {
  it('writes the unit\u2019s note onto the entry', async () => {
    const w = mountFor(wraithlord)
    const fields = w.findAll('.ues-note input')
    expect(fields).toHaveLength(1)
    await fields[0].setValue('  rapid ingress T2  ')
    expect(w.props('entry').note).toBe('rapid ingress T2')
  })

})

// Two squads of one datasheet are the ordinary case — "Necron Warriors" twice, and a picker that
// offers the same three words twice makes the player guess (a player's report, 2026-09-23).
describe('UnitEditorFields — which of the two squads', () => {
  const technomancer = necrons.units.find((u) => u.id === 'technomancer')
  const mountTargets = (leaderTargets) => mount(UnitEditorFields, {
    props: {
      entry: { uid: 'c1', id: technomancer.id, size: 0 },
      def: technomancer,
      items: rosterItems.items,
      texts: rosterItems.texts,
      leaderTargets,
    },
    global: { stubs: { Teleport: true } },
  })
  const hints = (w) => w.findAll('.opt-col .opt-tile').map((t) => t.find('.opt-which').exists() ? t.find('.opt-which').text() : null)

  it('says nothing where every target is a different datasheet', () => {
    const w = mountTargets([
      { uid: 'a', name: 'Immortals', type: 'support', used: false, models: 5, with: [] },
      { uid: 'b', name: 'Necron Warriors', type: 'support', used: false, models: 10, with: [] },
    ])
    expect(hints(w)).toEqual([null, null])
  })

  it('tells two of one name apart by what actually differs', () => {
    const w = mountTargets([
      { uid: 'a', name: 'Necron Warriors', type: 'support', used: true, models: 10, with: ['Royal Warden'], blockName: 'Домашка' },
      { uid: 'b', name: 'Necron Warriors', type: 'support', used: false, models: 20, with: [] },
    ])
    const [first, second] = hints(w)
    expect(first).toContain('Домашка')
    expect(first).toContain('Royal Warden')
    expect(second).toContain('20')
    expect(second).not.toContain('Royal Warden')
  })

  // Two squads of one size, told apart by what their own player picked for them.
  it('names the wargear where that is what differs', () => {
    const w = mountTargets([
      { uid: 'a', name: 'Immortals', type: 'support', used: false, models: 5, picks: ['Tesla carbine ×5'], with: [] },
      { uid: 'b', name: 'Immortals', type: 'support', used: false, models: 5, picks: ['Gauss blaster ×5'], with: [] },
    ])
    const [first, second] = hints(w)
    expect(first).toContain('Tesla carbine ×5')
    expect(second).toContain('Gauss blaster ×5')
    expect(first).not.toMatch(/копия|copy/) // they differ already; no number needed
  })

  // Same size, same everything, nothing attached to either: the only thing left is which is which.
  it('numbers two copies that are alike in every way', () => {
    const w = mountTargets([
      { uid: 'a', name: 'Immortals', type: 'support', used: false, models: 5, with: [] },
      { uid: 'b', name: 'Immortals', type: 'support', used: false, models: 5, with: [] },
    ])
    const [first, second] = hints(w)
    expect(first).toMatch(/1$/)
    expect(second).toMatch(/2$/)
    expect(first).not.toBe(second)
  })
})

// A player's report, 2026-09-24: CSM Terminators dropped from ten to five kept picks for ten.
describe('UnitEditorFields — shrinking the unit', () => {
  const terms = chaosSpaceMarines.units.find((u) => u.id === 'chaos-terminator-squad')
  // By name, not by item id: ids are interned across every faction and renumber whenever a bump
  // adds weapons anywhere (app data 963 moved these from 7 and 958).
  const groupNamed = (name) => terms.gear.findIndex((g) => g.o.some((o) => rosterItems.items[o[0]] === name))
  const combi = groupNamed('Combi-weapon')
  const paired = groupNamed('Paired accursed weapons')
  const pill = (w, i) => w.findAll('.pill').filter((p) => /pts/.test(p.text()))[i]

  it('takes off what the smaller unit cannot carry, and offers it back', async () => {
    const w = mountFor(terms, { size: 1, count: 10, wg: [[combi, 0, 8], [paired, 0, 2]] })
    const entry = w.props('entry')
    await pill(w, 0).trigger('click')
    // Each group down to its own ceiling first (five combi-weapons, one pair), then stock: five
    // combi-bolters are all spent, so the latest pick — the paired weapons — goes.
    expect(entry.wg).toEqual([[combi, 0, 5]])
    expect(w.find('.ues-trimmed').exists()).toBe(true)
    await w.find('.ues-trimmed button').trigger('click')
    expect(entry).toMatchObject({ size: 1, count: 10, wg: [[combi, 0, 8], [paired, 0, 2]] })
    expect(w.find('.ues-trimmed').exists()).toBe(false)
  })

  it('leaves a list that arrived over alone, and marks the rows instead', () => {
    const w = mountFor(terms, { wg: [[combi, 0, 5], [paired, 0, 1]] })
    expect(w.props('entry').wg).toEqual([[combi, 0, 5], [paired, 0, 1]])
    expect(w.findAll('.ues-over')).toHaveLength(2)
  })
})

// The squad's end of an attachment (a player's request, 2026-09-24): the Leaders that could join it,
// ticked here, written to the LEADER's `leaderOf` — the one field the forward picker edits too.
describe('UnitEditorFields — attach to this unit', () => {
  const warriors = necrons.units.find((u) => u.id === 'necron-warriors')
  const defOf = (id) => necrons.units.find((u) => u.id === id)
  const mountSquad = (units, leaderSources) => mount(UnitEditorFields, {
    props: {
      entry: units.find((u) => u.uid === 'sq'),
      def: warriors,
      items: rosterItems.items,
      texts: rosterItems.texts,
      units,
      defOf,
      leaderSources,
    },
    global: { stubs: { Teleport: true } },
  })

  it('attaches, detaches and moves a Leader from the squad', async () => {
    const units = [
      { uid: 'sq', id: 'necron-warriors', size: 0 },
      { uid: 'other', id: 'necron-warriors', size: 0 },
      { uid: 'tm', id: 'technomancer', size: 0, leaderOf: 'other' },
    ]
    const w = mountSquad(units, [{ uid: 'tm', name: 'Technomancer', type: 'support', used: false, elsewhere: 'other' }])
    const tile = w.findAll('.opt-tile').at(-1)
    expect(tile.text()).toContain('now with Necron Warriors')
    // Attached elsewhere: nothing moves until the player confirms, and the box stays unticked.
    await tile.find('input').setValue(true)
    expect(units[2].leaderOf).toBe('other')
    expect(tile.find('input').element.checked).toBe(false)
    const ask = w.findComponent(ConfirmModal)
    expect(ask.props('title')).toBe('Move Technomancer here?')
    expect(ask.props('message')).toContain('detaches it from Necron Warriors')
    expect(ask.props('message')).toContain('Necron Warriors is left with no Character attached.')
    await ask.vm.$emit('confirm')
    expect(units[2].leaderOf).toBe('sq')
    expect(w.findComponent(ConfirmModal).exists()).toBe(false)
    // Detaching from here, and attaching a free one, ask nothing.
    await tile.find('input').setValue(false)
    expect(units[2].leaderOf).toBeUndefined()
    await tile.find('input').setValue(true)
    expect(units[2].leaderOf).toBe('sq')
    expect(w.findComponent(ConfirmModal).exists()).toBe(false)
  })

  // Cancel leaves both units as they were; the message names what travels with the Character and
  // stays quiet about the other unit when another Character is still on it.
  it('keeps the attachment on cancel, and says only what is true', async () => {
    const units = [
      { uid: 'sq', id: 'necron-warriors', size: 0 },
      { uid: 'other', id: 'necron-warriors', size: 0 },
      { uid: 'tm', id: 'technomancer', size: 0, leaderOf: 'other', enh: 'Veil of Darkness' },
      { uid: 'ov', id: 'overlord', size: 0, leaderOf: 'other' },
    ]
    const w = mountSquad(units, [{ uid: 'tm', name: 'Technomancer', type: 'support', used: false, elsewhere: 'other' }])
    await w.findAll('.opt-tile').at(-1).find('input').setValue(true)
    const ask = w.findComponent(ConfirmModal)
    expect(ask.props('message')).toContain('The enhancement Veil of Darkness stays with Technomancer.')
    expect(ask.props('message')).not.toContain('is left with no Character')
    await ask.vm.$emit('close')
    expect(units[2].leaderOf).toBe('other')
    expect(w.findComponent(ConfirmModal).exists()).toBe(false)
  })

  it('draws nothing when no one in the list could join', () => {
    const w = mountSquad([{ uid: 'sq', id: 'necron-warriors', size: 0 }], [])
    expect(w.text()).not.toContain('Attach to this unit')
  })
})

describe('UnitEditorFields — can be led by', () => {
  const warriors = necrons.units.find((u) => u.id === 'necron-warriors')
  const mountWith = (leaderCandidates) => mount(UnitEditorFields, {
    props: {
      entry: { uid: 'sq', id: 'necron-warriors', size: 0 },
      def: warriors,
      items: rosterItems.items,
      texts: rosterItems.texts,
      leaderCandidates,
    },
    // The sheet itself is RosterUnitRulesModal's to test; here only that the row opens it.
    global: { stubs: { Teleport: true, RosterUnitRulesModal: true } },
  })
  const cands = [
    { id: 'overlord', name: 'Overlord', type: 'leader', pts: 85, used: false, linked: true, slug: 'necrons', sheetId: 'overlord' },
    { id: 'technomancer', name: 'Technomancer', type: 'support', pts: 75, used: false, linked: true, slug: 'necrons', sheetId: 'technomancer' },
  ]

  // Folded until asked for, the count on the heading; "+" asks the parent to add AND attach.
  it('folds the catalogue candidates behind a counted heading, and adds one on "+"', async () => {
    const w = mountWith(cands)
    const fold = w.find('.ues-fold')
    expect(fold.text()).toBe('Can be led by · 2')
    expect(fold.attributes('aria-expanded')).toBe('false')
    await fold.trigger('click')
    expect(fold.attributes('aria-expanded')).toBe('true')
    const tiles = w.findAll('.opt-tile').filter((t) => t.find('.bi-plus-lg').exists())
    expect(tiles).toHaveLength(2)
    await tiles[0].find('.opt-info').trigger('click')
    expect(w.emitted('add-leader')).toEqual([['overlord']])
    expect(tiles[1].text()).toContain('Support')
  })

  it('draws nothing when no one in the catalogue could join', () => {
    expect(mountWith([]).find('.ues-fold').exists()).toBe(false)
  })

  // The row opens the candidate's datasheet — its own faction and bare id, as the catalogue does.
  it('opens a candidate\'s datasheet from its row', async () => {
    const w = mountWith(cands)
    await w.find('.ues-fold').trigger('click')
    expect(w.findComponent({ name: 'RosterUnitRulesModal' }).exists()).toBe(false)
    await w.findAll('.opt-open')[1].trigger('click')
    const modal = w.findComponent({ name: 'RosterUnitRulesModal' })
    expect(modal.props()).toMatchObject({ unitId: 'technomancer', factionSlug: 'necrons' })
    modal.vm.$emit('close')
    await w.vm.$nextTick()
    expect(w.findComponent({ name: 'RosterUnitRulesModal' }).exists()).toBe(false)
  })
})

// "Two different weapons" (`ex`): the heading's chip says the count is exact and how many are
// still owed. It stands there from the start, so picking changes its words, not the layout.
describe('UnitEditorFields — exact-count groups', () => {
  const wgpl = spaceWolves.units.find((u) => u.name === 'Wolf Guard Pack Leader')
  const strike = darkAngels.units.find((u) => u.name === 'Deathwing Strikemaster')
  const chip = (w) => w.findAll('.ues-cap').map((c) => c.text())[0]

  it('asks for two, then for the one still owed', () => {
    expect(chip(mountFor(wgpl))).toBe('pick 2 different')
    expect(chip(mountFor(wgpl, { wg: [[0, 2, 1]] }))).toBe('1 more to pick')
    expect(chip(mountFor(wgpl, { wg: [[0, 2, 1], [0, 3, 1]] }))).toBe('pick 2 different')
  })

  it('is satisfied by the sentence’s own single option', () => {
    expect(chip(mountFor(strike, { wg: [[0, 0, 1]] }))).toBe('pick 2 different')
    expect(chip(mountFor(strike, { wg: [[0, 1, 1]] }))).toBe('1 more to pick')
  })
})

// A single swap no unit size lets past one model is drawn as the two-row "one of", like every
// other single swap — appdata calls the Chaplain's "storm bolter → relic shield" a stepper, and a
// 0/1 counter there read as a different kind of choice (2026-10-07).
describe('UnitEditorFields — a one-model swap appdata calls a stepper', () => {
  it('draws the Chaplain in Terminator Armour\'s swap as stock / replacement rows', async () => {
    const sm = (await import('../../data/roster/space-marines.js')).default
    const chap = sm.units.find((u) => u.name === 'Chaplain in Terminator Armour')
    expect(chap.gear[0].in).toBe('stepper')
    const w = mountFor(chap)
    expect(w.findAllComponents(NumberStepper)).toHaveLength(0)
    const names = w.findAll('.opt-name').map((n) => n.text())
    expect(names.some((n) => n.includes('Storm Bolter'))).toBe(true)
    expect(names.some((n) => n.includes('Relic Shield'))).toBe(true)
  })

  // One model at the default size but more at a bigger one: the counter stays, so the control does
  // not change shape when the squad grows.
  it('keeps the counter where a bigger squad may take more', () => {
    const ironstrider = adeptusMechanicus.units.find((u) => u.name === 'Ironstrider Ballistarii')
    expect(mountFor(ironstrider).findAllComponents(NumberStepper).filter((s) => !s.classes('stock-n')).length).toBeGreaterThan(0)
  })
})

// From six models on a count can be typed (a tap on the number) — twenty swaps are not twenty
// taps. Below that the number stays a plain readout.
describe('UnitEditorFields — typing a count', () => {
  const warriors = necrons.units.find((u) => u.name === 'Necron Warriors')
  const typed = (w) => w.findAllComponents(NumberStepper).filter((s) => !s.classes('stock-n'))

  it('lets a twenty-model squad type its swap count, capped at what the group allows', async () => {
    const w = mountFor(warriors, { size: warriors.sizes.length - 1, count: 20 })
    const st = typed(w).find((s) => s.props('editable') && s.props('max') >= 6)
    expect(st).toBeTruthy()
    await st.find('.step-edit').trigger('click')
    const input = st.find('.step-input')
    expect(input.attributes('inputmode')).toBe('numeric')
    expect(input.attributes('enterkeyhint')).toBe('done')
    await input.setValue('99')
    await input.trigger('keydown', { key: 'Enter' })
    expect(st.emitted('update:modelValue').at(-1)[0]).toBe(st.props('max'))
  })

  it('keeps small groups to − and +', () => {
    const w = mountFor(wracks)
    expect(typed(w).length).toBeGreaterThan(0)
    expect(typed(w).filter((s) => s.props('editable'))).toHaveLength(0)
  })
})

// A model's limit across groups (`xpm`): with one arm already holding the chainsword, the other
// arm's chainsword row is greyed out — the one-of row that is on never is.
describe('UnitEditorFields — a limit across groups', () => {
  it('greys the Knight Destrier’s second chainsword', async () => {
    const ik = (await import('../../data/roster/imperial-knights.js')).default
    const def = ik.units.find((u) => u.name === 'Knight Destrier')
    const cs = (gi) => def.gear[gi].o.findIndex((o) => rosterItems.items[o[0]] === 'Bellatus reaper chainsword')
    const w = mountFor(def, { wg: [[0, cs(0), 1]] })
    const rowsOf = (gi) => w.findAll('.ues-sec').filter((s) => s.find('.opt-col').exists())[gi].findAll('.opt-tile')
    const chainswordRow = rowsOf(1).find((t) => t.text().includes('Bellatus reaper chainsword'))
    expect(chainswordRow.classes()).toContain('disabled')
    expect(rowsOf(0).find((t) => t.text().includes('Bellatus reaper chainsword')).classes()).not.toContain('disabled')
  })
})
