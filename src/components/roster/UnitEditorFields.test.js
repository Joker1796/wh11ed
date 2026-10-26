import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NumberStepper from '../tracker/NumberStepper.vue'
import UnitEditorFields from './UnitEditorFields.vue'
import ConfirmModal from '../ConfirmModal.vue'
import { wargearGroupCap, wargearGroupFallbackCap, sameStockSets, swapRoom, swapOverdraft, optionItems, wargearPoolOf } from '../../core/roster/rosterEngine.js'
import { holdGroup, stockLeft } from '../../composables/rosterHold.js'
import { buildRosterText } from '../../core/roster/rosterExport.js'
import rosterCore from '../../data/roster/core.js'
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
  it('renders the option list as separate lines, not one run-on heading', async () => {
    const w = mountFor(wracks)
    // Folded where it only repeats the rows under it (owner, 2026-10-14) — one tap opens it.
    expect(w.findAll('.ues-blist')).toHaveLength(0)
    await w.find('.ues-text-btn').trigger('click')
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
    // Every group but the Acothyst's chained swap, which waits under the special weapon that hands
    // him the torturer's tool (none is picked here), and the second copy of each shared option —
    // its sentence is the block's, said once.
    const sharedCopies = (wracks.pools || []).reduce((n, p) => n + p.g.length - 1, 0)
    expect(heads.filter((h) => h.classes().includes('ues-instr')).length).toBe(wracks.gear.length - 1 - sharedCopies)
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
    // It names the count it waits for (owner, 2026-10-24), greyed until the squad reaches it.
    const ratlings = astraMilitarum.units.find((u) => u.name === 'Ratlings')
    expect(mountFor(ratlings).text()).toContain('Needs 10 models in the unit · now 5')
    expect(mountFor(ratlings, { size: 1, count: 6 }).text()).toContain('Needs 10 models in the unit · now 6')
    expect(mountFor(ratlings, { size: 1, count: 10 }).text()).not.toContain('Needs 10 models')
  })

  it('greys the Voidscarred long rifle until the squad holds ten, specialists counted', () => {
    const vs = aeldari.units.find((u) => u.id === 'corsair-voidscarred')
    const gi = vs.gear.findIndex((g) => g.o.some(([o]) => rosterItems.items[o] === 'Long rifle'))
    const size = vs.sizes.findIndex((s) => s.comp.some(([m, n]) => m === 2 && n === 1) && s.comp.every(([m, n]) => m < 3 || n === 0))
    const rifle = vs.gear.findIndex((g) => g.o.some(([o]) => rosterItems.items[o] === 'Shuriken rifle') && g.rep?.length === 2)
    const at = (count) => mountFor(vs, { size, count, wg: [[rifle, 0, 4]] }).find(`[data-gi="${gi}"]`)
    expect(at(6).classes()).toContain('ues-inert')
    expect(at(6).text()).toContain('Needs 10 models in the unit · now 6')
    expect(at(10).classes()).not.toContain('ues-inert')
    expect(at(10).text()).not.toContain('Needs 10 models')
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
    // Corsair Voidscarred's 140-point squads are one build per set of specialists (6–10, 7–10,
    // 8–10); a pill names the specialists in it, never the Voidscarred every one of them holds.
    const pills = mountFor(voidscarred).findAll('.pill').map((p) => p.text())
    const at140 = pills.filter((t) => t.includes('140'))
    expect(at140).toHaveLength(8)
    expect(new Set(at140).size).toBe(8)
    expect(at140[0]).toBe('6–10 · 140pts')
    expect(at140.at(-1)).toBe('8–10 · 140pts · Shade Runner + Soul Weaver + Way Seeker')
    expect(at140.join(' ')).not.toContain('Corsair Voidscarred')
  })

  // Accursed Cultists: two 9–16 builds at 185 with BOTH profiles in each — the names tied too, and
  // a player read the pair as one pill printed twice (2026-10-08). Every tied pill in the corpus
  // must read differently, not merely carry a suffix.
  it('tells tied pills apart by counts where the names are the same', () => {
    const accursed = chaosSpaceMarines.units.find((u) => u.id === 'accursed-cultists')
    const pills = mountFor(accursed).findAll('.pill').map((p) => p.text())
    expect(pills.filter((t) => t.startsWith('9–16'))).toEqual([
      '9–16 · 185pts · 6–10 Mutant + 3–6 Torment',
      '9–16 · 185pts · 5–10 Mutant + 4–6 Torment',
    ])
    const files = import.meta.glob(['../../data/roster/*.js', '!../../data/roster/*.test.js'], { eager: true, import: 'default' })
    const same = []
    for (const [f, data] of Object.entries(files)) {
      for (const def of data?.units || []) {
        const keys = def.sizes.map((s) => `${s.per.join('-')}:${s.pts}`)
        if (new Set(keys).size === keys.length) continue
        const texts = mountFor(def).findAll('.pill').map((p) => p.text())
        if (new Set(texts).size < texts.length) same.push(`${f}/${def.id}`)
      }
    }
    expect(same).toEqual([])
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

// An owner's screenshot, 2026-10-14: a tap on the one-of row that is on left it lit with an empty
// box — the browser cleared the box, the choice did not change, nothing redrew it. It unticks now.
describe('UnitEditorFields — a one-of row that is on', () => {
  const hexOf = (w) => w.findAll('.opt-tile').find((t) => t.text().startsWith('Hexrifle'))
  it('goes back to the stock row when tapped again', async () => {
    const aco = wracks.gear.findIndex((g) => g.m === 0 && g.o.length === 4)
    const w = mountFor(wracks, { wg: [[aco, 0, 1]] })
    const entry = w.props('entry')
    const box = hexOf(w).find('input')
    box.element.checked = false
    await box.trigger('change')
    expect(entry.wg || []).toEqual([])
  })
  it('keeps the stock row ticked when it is tapped while on', async () => {
    const w = mountFor(wracks)
    // The Acothyst's copy of the special weapons — its stock row is a tick box; the Wracks' is a count.
    const stock = w.findAll('.opt-tile').filter((t) => t.text().startsWith('Twin torturer’s tools') && t.find('input').exists()).at(-1).find('input')
    stock.element.checked = false
    await stock.trigger('change')
    expect(stock.element.checked).toBe(true)
    expect(w.props('entry').wg || []).toEqual([])
  })
})

// The Acothyst's "its torturer's tool can be replaced with 1 power weapon" is drawn under the
// special weapon that handed him the tool, only while it is on (owner, 2026-10-14).
describe('UnitEditorFields — a chained swap', () => {
  const aco = wracks.gear.findIndex((g) => g.m === 0 && g.o.length === 4)
  const chained = wracks.gear.findIndex((g) => g.m === 0 && g.cond)
  it('waits under the pick that hands the item over', async () => {
    expect(mountFor(wracks).find('.opt-nested').exists()).toBe(false)
    const w = mountFor(wracks, { wg: [[aco, 2, 1]] })
    const nested = w.find('.opt-nested')
    expect(nested.exists()).toBe(true)
    expect(nested.text()).toContain('Power weapon')
    // …and a tick there is a pick in the chained group, an untick its stock.
    const box = nested.find('input')
    box.element.checked = true
    await box.trigger('change')
    expect(w.props('entry').wg).toEqual(expect.arrayContaining([[chained, 0, 1]]))
  })
  it('shows a pick left with no source where it was, to be undone', () => {
    const w = mountFor(wracks, { wg: [[chained, 0, 1]] })
    expect(w.find('.opt-nested').exists()).toBe(false)
    expect(w.findAll('.ues-instr').some((h) => /not equipped with a power weapon/.test(h.text()))).toBe(true)
  })
  it('frames each profile as a card with its heading', () => {
    const w = mountFor(wracks)
    // The Wracks have no option of their own: all they take, they share with the Acothyst.
    expect(w.findAll('.ues-profile').map((h) => h.text())).toEqual(['Acothyst'])
    const cards = 1 + wracks.pools.length
    expect(w.findAll('.ues-card-first')).toHaveLength(cards)
    expect(w.findAll('.ues-card-last')).toHaveLength(cards)
  })
})

// A player's report, 2026-09-24: CSM Terminators dropped from ten to five kept picks for ten.
describe('UnitEditorFields — shrinking the unit', () => {
  const terms = chaosSpaceMarines.units.find((u) => u.id === 'chaos-terminator-squad')
  // By name, not by item id: ids are interned across every faction and renumber whenever a bump
  // adds weapons anywhere (app data 963 moved these from 7 and 958).
  // The Terminators' own copy of each swap (the Champion has his).
  const groupNamed = (name) => terms.gear.findIndex((g) => g.m === 1 && g.o.some((o) => rosterItems.items[o[0]] === name))
  const combi = groupNamed('Combi-weapon')
  const paired = groupNamed('Paired accursed weapons')
  const pill = (w, i) => w.findAll('.pill').filter((p) => /pts/.test(p.text()))[i]

  it('takes off what the smaller unit cannot carry, and offers it back', async () => {
    const w = mountFor(terms, { size: 1, count: 10, wg: [[combi, 0, 8], [paired, 0, 2]] })
    const entry = w.props('entry')
    await pill(w, 0).trigger('click')
    // Each group down to its own ceiling first (four Terminators beside the Champion: four
    // combi-weapons, one pair), then stock: their four combi-bolters are all spent, so the latest
    // pick — the paired weapons — goes.
    expect(entry.wg).toEqual([[combi, 0, 4]])
    expect(w.find('.ues-trimmed').exists()).toBe(true)
    await w.find('.ues-trimmed button').trigger('click')
    expect(entry).toMatchObject({ size: 1, count: 10, wg: [[combi, 0, 8], [paired, 0, 2]] })
    expect(w.find('.ues-trimmed').exists()).toBe(false)
  })

  // The groups are their own component since 2026-10-12 (UnitWargearGroups): a pick travels up as
  // `set-wg` and this component writes it. A pick made while the trim offer stands answers it.
  it('writes a pick made in the groups, and drops the trim offer with it', async () => {
    const w = mountFor(terms, { size: 1, count: 10, wg: [[combi, 0, 8], [paired, 0, 2]] })
    const entry = w.props('entry')
    await pill(w, 0).trigger('click')
    expect(w.find('.ues-trimmed').exists()).toBe(true)
    // The Terminators' combi-weapon stepper, at the four the trim left: one fewer is a pick like
    // any other.
    const step = w.findAllComponents(NumberStepper).find((n) => n.props('label') === 'Combi-weapon' && n.props('modelValue') === 4)
    await step.vm.$emit('update:modelValue', 3)
    expect(entry.wg).toEqual([[combi, 0, 3]])
    expect(w.find('.ues-trimmed').exists()).toBe(false)
  })

  it('leaves a list that arrived over alone, and marks the rows instead', () => {
    const w = mountFor(terms, { wg: [[combi, 0, 4], [paired, 0, 1]] })
    expect(w.props('entry').wg).toEqual([[combi, 0, 4], [paired, 0, 1]])
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
    const tiles = w.findAll('.opt-tile').filter((t) => t.find('.wi-add').exists())
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

// "Can lead" (owner, 2026-10-08): the mirror on a Character — units from the catalogue it could
// lead; "+" adds one with this Character on it, asking first when it already leads another.
describe('UnitEditorFields — units this Character could lead', () => {
  const overlord = necrons.units.find((u) => u.id === 'overlord')
  const defOf = (id) => necrons.units.find((u) => u.id === id)
  const hosts = [
    { id: 'immortals', name: 'Immortals', type: 'leader', pts: 70, linked: true, slug: 'necrons', sheetId: 'immortals' },
    { id: 'necron-warriors', name: 'Necron Warriors', type: 'leader', pts: 90, linked: true, slug: 'necrons', sheetId: 'necron-warriors' },
  ]
  const mountLeader = (units) => mount(UnitEditorFields, {
    props: {
      entry: units[0],
      def: overlord,
      items: rosterItems.items,
      texts: rosterItems.texts,
      units,
      defOf,
      leaderHosts: hosts,
    },
    global: { stubs: { Teleport: true, RosterUnitRulesModal: true } },
  })

  it('folds behind a counted heading, and adds a free Character\'s unit on "+" without asking', async () => {
    const w = mountLeader([{ uid: 'ov', id: 'overlord', size: 0 }])
    const fold = w.find('.ues-fold')
    expect(fold.text()).toBe('Can lead · 2')
    await fold.trigger('click')
    await w.findAll('.opt-info').filter((b) => b.find('.wi-add').exists())[1].trigger('click')
    expect(w.emitted('add-host')).toEqual([['necron-warriors']])
    expect(w.findComponent(ConfirmModal).exists()).toBe(false)
  })

  it('asks before moving a Character that leads another unit, and adds only on confirm', async () => {
    const units = [
      { uid: 'ov', id: 'overlord', size: 0, leaderOf: 'sq', enh: 'Veil of Darkness' },
      { uid: 'sq', id: 'necron-warriors', size: 0 },
    ]
    const w = mountLeader(units)
    await w.find('.ues-fold').trigger('click')
    await w.findAll('.opt-info').filter((b) => b.find('.wi-add').exists())[0].trigger('click')
    expect(w.emitted('add-host')).toBeUndefined()
    const ask = w.findComponent(ConfirmModal)
    expect(ask.props('title')).toBe('Add Immortals and move Overlord to it?')
    expect(ask.props('message')).toContain('A new Immortals joins the list')
    expect(ask.props('message')).toContain('Necron Warriors is left with no Character attached.')
    expect(ask.props('message')).toContain('The enhancement Veil of Darkness stays with Overlord.')
    expect(ask.props('confirmLabel')).toBe('Add and move')
    await ask.vm.$emit('close')
    expect(w.emitted('add-host')).toBeUndefined()
    await w.findAll('.opt-info').filter((b) => b.find('.wi-add').exists())[0].trigger('click')
    await w.findComponent(ConfirmModal).vm.$emit('confirm')
    expect(w.emitted('add-host')).toEqual([['immortals']])
    expect(w.findComponent(ConfirmModal).exists()).toBe(false)
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

// Several groups trading the same weapon on one profile are one choice, drawn as one block with ONE
// stock row (owner, 2026-10-14: the Acothyst's twin torturer's tools appeared twice). Over every
// faction: of a set's groups that are drawn on their own (not a chained swap, not a held pick), one
// leads and the rest are sub-headings under it. Three units trade one copy of a pair and keep their
// groups apart — the merge would hide the second copy.
describe('UnitEditorFields — one choice drawn once', () => {
  const bundles = import.meta.glob(['../../data/roster/*.js', '!../../data/roster/*.test.js', '!../../data/roster/index.js'], { eager: true })
  const units = Object.values(bundles).flatMap((m) => m.default?.units || [])
  it('draws every set of groups giving up the same weapon with one stock row', () => {
    let sets = 0
    for (const def of units) {
      const found = sameStockSets(def)
      if (!found.length) continue
      const w = mountFor(def)
      // A shared option is drawn in a block of its own (see "a shared option, once").
      for (const set of found.map((f) => f.filter((gi) => !(def.minis?.length > 1 && wargearPoolOf(def, gi)))).filter((f) => f.length > 1)) {
        const secs = set.map((gi) => w.find(`.ues-sec[data-gi="${gi}"]`)).filter((s) => s.exists())
        const alone = secs.filter((s) => !s.classes('ues-merged') && !s.classes('ues-nested') && !s.find('.ues-hold').exists())
        expect(alone.length, `${def.name}: groups ${set}`).toBeLessThanOrEqual(1)
        sets++
      }
      w.unmount()
    }
    // 68 once the shared options left the profiles' sets (2026-10-21).
    expect(sets).toBeGreaterThan(60)
  })
  it('keeps apart the units that give up one copy of a pair', () => {
    for (const name of ['Kratos', 'Decimator', 'Talos']) {
      const def = units.find((u) => u.name === name)
      expect(def, name).toBeTruthy()
      expect(sameStockSets(def), name).toEqual([])
    }
  })
})

// An option the profiles share is one block (owner, 2026-10-21, a player's report on CSM
// Terminators): drawn as a copy in each profile's card, the Champion's tick box came first and read as
// the whole "up to 3 in the unit" — the Terminators' counter sat a card further down.
describe('UnitEditorFields — a shared option, once', () => {
  const bundles = import.meta.glob(['../../data/roster/*.js', '!../../data/roster/*.test.js', '!../../data/roster/index.js'], { eager: true })
  const units = Object.values(bundles).flatMap((m) => m.default?.units || [])
  it('draws each shared option as one block: the sentence once, a row per profile', () => {
    let pools = 0
    for (const def of units) {
      if (!def.pools?.length || !(def.minis?.length > 1)) continue
      const w = mountFor(def)
      for (const p of def.pools) {
        const secs = p.g.map((gi) => w.find(`.ues-sec[data-gi="${gi}"]`)).filter((x) => x.exists())
        if (secs.length < 2) continue
        const at = `${def.name}: pool ${p.g}`
        expect(secs[0].classes('ues-shared'), at).toBe(true)
        // The copies stand together, in the pool's order, and none of them opens a profile's card.
        const all = w.findAll('.ues-sec').map((x) => x.attributes('data-gi'))
        const idx = secs.map((x) => all.indexOf(x.attributes('data-gi')))
        expect(idx, at).toEqual(idx.map((_, k) => idx[0] + k))
        expect(secs.some((x) => x.find('.ues-profile').exists()), at).toBe(false)
        expect(secs.map((x) => x.find('.ues-who').exists()), at).toEqual(secs.map(() => true))
        expect(secs.slice(1).every((x) => x.classes('ues-merged')), at).toBe(true)
        pools++
      }
      w.unmount()
    }
    expect(pools).toBeGreaterThan(80)
  })
  it('says how much of the allowance the copies have taken', () => {
    const terms = chaosSpaceMarines.units.find((u) => u.id === 'chaos-terminator-squad')
    const fist = (m) => terms.gear.findIndex((g) => g.m === m && g.o.some((o) => rosterItems.items[o[0]] === 'Power fist'))
    const w = mountFor(terms, { wg: [[fist(0), 0, 1], [fist(1), 0, 1]] })
    const chip = w.find(`.ues-sec[data-gi="${fist(0)}"] .ues-cap`)
    expect(chip.text()).toBe('up to 3 in the unit · 2 taken')
    expect(w.find(`.ues-sec[data-gi="${fist(1)}"] .ues-cap`).exists()).toBe(false)
  })
})

// The stock row over a group whose options need different items (2026-10-21, a player's report):
// the Deathwatch Terminators' "power fist and storm bolter" group, where "storm bolter and
// chainfist" hands the storm bolter back. Three Terminators took plasma cannons for their storm
// bolters, the row read "Power Fist + Storm Bolter 0" and the player read it as a ban — while "+" on
// the chainfist rightly still took. Now the row counts each item on its own.
describe('UnitEditorFields — a stock row per item', () => {
  const stockRow = (w, gi) => w.find(`.ues-sec[data-gi="${gi}"] .opt-stock`)
  // What the stock row says about each item the group replaces: its own count where it is drawn item
  // by item, otherwise the one number standing for all of them.
  const shown = (w, def, gi) => {
    const row = stockRow(w, gi)
    if (!row.exists()) return null
    const per = row.findAll('[data-item]')
    if (per.length) return new Map(per.map((s) => [Number(s.attributes('data-item')), Number(s.find('.stock-item-n').text())]))
    const n = row.findComponent(NumberStepper).props('modelValue')
    return new Map(def.gear[gi].rep.map((id) => [id, n]))
  }
  // The option steppers of group gi, in option order, and what each option gives up.
  const optionSteppers = (w, gi) => w.find(`.ues-sec[data-gi="${gi}"]`).findAllComponents(NumberStepper).filter((s) => !s.classes('stock-n'))
  const givesUp = (g, oi) => { const got = new Set(optionItems(g.o[oi]).map(([id]) => id)); return g.rep.filter((id) => !got.has(id)) }

  it('shows the player\'s Terminators a power fist left to trade', async () => {
    const { loadRosterFaction } = await import('../../data/roster/index.js')
    const sm = await loadRosterFaction('space-marines', { allies: true })
    const def = sm.units.find((u) => u.id === 'deathwatch:deathwatch-terminator-squad')
    const entry = { uid: 'dw', id: def.id, size: 0, wg: [[0, 3, 3], [1, 2, 1], [2, 2, 1]] }
    const w = mountFor(def, entry)
    const name = (id) => rosterItems.items[id]
    const row = shown(w, def, 2)
    expect([...row].map(([id, n]) => `${name(id)} ${n}`)).toEqual(['Power Fist 3', 'Storm Bolter 0'])
    // "+" on "Storm Bolter + Chainfist" takes: the option needs only the fist.
    const chainfist = def.gear[2].o.findIndex((o) => optionItems(o).some(([id]) => name(id) === 'Chainfist'))
    expect(chainfist).toBeGreaterThanOrEqual(0)
    expect(optionSteppers(w, 2)[chainfist].find('.step-btn:last-child').attributes('disabled')).toBeUndefined()
    // …and three of them: three chainfists, three plasma cannons, no storm bolter on a Terminator.
    const full = { ...entry, wg: [...entry.wg, [2, chainfist, 3]] }
    expect(swapOverdraft(def, full)).toEqual([])
    const roster = { name: 'DW', faction: 'space-marines', battleSize: 'strike-force', detachments: ['Deathwatch Support', 'Assault Brethren', 'Terminator Storm Force'], units: [full] }
    const text = buildRosterText(roster, { faction: sm, core: rosterCore, items: rosterItems.items }, 'gw')
    const block = text.slice(text.indexOf('Deathwatch Terminator Squad'))
    const terminators = block.slice(block.indexOf('x Deathwatch Terminator\n')).split('\n').slice(0, 6).join('\n')
    expect(terminators).toMatch(/3x Chainfist/)
    expect(terminators).toMatch(/3x Plasma Cannon/)
    expect(terminators).not.toMatch(/Storm Bolter/)
  })

  // Over every datasheet: whenever "+" on an option still takes, the stock row may not say 0 for an
  // item that option needs — the row's own group's options, and those of the groups drawn under it
  // as one choice (sameStockSets: Krieg Combat Engineers, Deathwatch Veterans). States: nothing
  // picked, or another group of the same models spending all it can of an item this row counts —
  // each with or without one pick of an option under the row.
  const bundles = import.meta.glob(['../../data/roster/*.js', '!../../data/roster/*.test.js', '!../../data/roster/index.js'], { eager: true })
  const units = Object.values(bundles).flatMap((m) => m.default?.units || [])
  const under = (def, gi) => sameStockSets(def).find((set) => set.includes(gi)) || [gi]
  const statesFor = (def, size, gi) => {
    const g = def.gear[gi]
    const base = { uid: 'u1', id: def.id, size, wg: [] }
    const others = [[]]
    for (const [hj, h] of def.gear.entries()) {
      if (hj === gi || !h.rep?.some((id) => g.rep.includes(id))) continue
      if (!(h.all || g.all || (h.m ?? 0) === (g.m ?? 0))) continue
      for (const oj of h.o.keys()) {
        if (!givesUp(h, oj).some((id) => g.rep.includes(id))) continue
        const cap = wargearGroupCap(def, base, hj, oj)
        const n = Math.min(swapRoom(def, base, hj, oj) ?? 1, cap ? (cap.dup || cap.limit) : (wargearGroupFallbackCap(def, base, hj) ?? 1))
        if (n > 0) others.push([[hj, oj, n]])
      }
    }
    const out = []
    for (const wg of others) {
      out.push(wg)
      for (const hj of under(def, gi)) {
        for (const oi of def.gear[hj].o.keys()) {
          if (wg.some(([x, o]) => x === hj && o === oi)) continue
          if ((swapRoom(def, { ...base, wg }, hj, oi) ?? 1) > 0) out.push([...wg, [hj, oi, 1]])
        }
      }
    }
    return out
  }
  // Mounting every state would take minutes; a state is mounted only where the row can show a 0
  // that matters. Every item's own count is at least the one-number row (each is the models still
  // carrying it less the picks giving it up), so the one number must be 0; and "+" can take only
  // where the room the stock rule leaves an option, less its group's other picks, is above its own
  // count — or where the editor's ceiling does not read that room (no cap at all, or the "for every
  // N models" line, which counts the room per option).
  const mayTake = (def, entry, gi) => under(def, gi).some((hj) => {
    const g = def.gear[hj]
    const n = (oi, same) => entry.wg.filter(([x, o]) => x === hj && (o === oi) === same).reduce((a, [, , c]) => a + c, 0)
    if (/for every \d+ model/i.test(rosterItems.texts[g.t] || '')) return true
    return g.o.some((_, oi) => {
      if (!givesUp(g, oi).length) return false
      if (wargearGroupFallbackCap(def, entry, hj) == null && !wargearGroupCap(def, entry, hj, oi)) return true
      const room = swapRoom(def, entry, hj, oi)
      return room == null || n(oi, true) < room - n(oi, false)
    })
  })

  it('never says 0 for an item an option still takes', async () => {
    let checked = 0
    const bad = []
    for (const def of units) {
      let w = null
      for (const size of new Set([0, def.sizes.length - 1])) {
        for (const [gi, g] of (def.gear || []).entries()) {
          if (!g.rep?.length || holdGroup(def, gi)) continue
          for (const wg of statesFor(def, size, gi)) {
            const entry = { uid: 'u1', id: def.id, size, wg }
            if (stockLeft(def, entry, gi) !== 0 || !mayTake(def, entry, gi)) continue
            if (w) await w.setProps({ entry })
            else w = mountFor(def, entry)
            const row = shown(w, def, gi)
            if (!row) continue
            checked++
            for (const hj of under(def, gi)) {
              if (!w.find(`.ues-sec[data-gi="${hj}"]`).exists()) continue
              const h = def.gear[hj]
              optionSteppers(w, hj).forEach((s, oi) => {
                if (s.props('disabled') || !(s.props('max') > s.props('modelValue'))) return
                const zero = givesUp(h, oi).filter((id) => row.get(id) === 0)
                if (zero.length) bad.push(`${def.name} g${gi}/g${hj} ${JSON.stringify(wg)}: "${optionItems(h.o[oi]).map(([id]) => rosterItems.items[id]).join(' + ')}" takes, row says 0 for ${zero.map((id) => rosterItems.items[id]).join(', ')}`)
              })
            }
          }
        }
      }
      w?.unmount()
    }
    expect(bad).toEqual([])
    expect(checked).toBeGreaterThan(20)
  }, 60000)
})
