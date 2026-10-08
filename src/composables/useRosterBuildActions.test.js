import { describe, it, expect, beforeAll, vi } from 'vitest'
import { computed, ref } from 'vue'
import { useRosterBuildActions } from './useRosterBuildActions.js'
import { useRosterDerived } from './useRosterDerived.js'
import { loadRosterFaction } from '../data/roster/index.js'

// Real Space Marines data: the enhancement below is one Gladius Task Force really carries.
// (It was Anvil Siege Force until Codex: Space Marines, app data 963, retired that detachment.)
let sm
beforeAll(async () => { sm = await loadRosterFaction('space-marines', { allies: true }) })

// Both shapes a list comes in: the editor's stored roster (one object), and the wizard's loose
// fields assembled into that shape by a computed. The actions must behave the same over either.
function asStored(start) {
  const roster = ref(start)
  return { get: () => roster.value, setFaction: (s) => { roster.value.faction = s }, derivedOver: roster }
}
function asWizard(start) {
  const faction = ref(start.faction)
  const detachments = ref(start.detachments)
  const units = ref(start.units)
  const draft = computed(() => ({ faction: faction.value, detachments: detachments.value, units: units.value, battleSize: start.battleSize }))
  return { get: () => draft.value, setFaction: (s) => { faction.value = s }, derivedOver: draft }
}

function setup(shape) {
  const gladius = sm.detachments.find((d) => d.name === 'Gladius Task Force')
  const enh = gladius.enhancements[0].name
  const list = shape({
    faction: 'space-marines',
    battleSize: 'strike-force',
    detachments: ['Gladius Task Force'],
    units: [{ uid: 'c1', id: 'captain', enh, warlord: true }, { uid: 'i1', id: 'intercessor-squad' }],
  })
  const factionData = ref(sm)
  const { curDetachments, effBattle, defOf } = useRosterDerived(list.derivedOver, factionData)
  const commit = vi.fn()
  const actions = useRosterBuildActions({
    roster: list.get, factionData, curDetachments, effBattle, defOf, commit, setFaction: list.setFaction,
  })
  return { list, actions, commit, enh }
}

for (const [label, shape] of [['a stored roster (editor)', asStored], ["the wizard's fields", asWizard]]) {
  describe(`over ${label}`, () => {
    // The wizard kept these and then listed them as errors for the player to clear by hand.
    it('drops an enhancement whose detachment is taken off the list', () => {
      const { list, actions, commit } = setup(shape)
      actions.toggleDetachment({ name: 'Gladius Task Force' })
      expect(list.get().detachments).toEqual([])
      expect(list.get().units[0].enh).toBeUndefined()
      expect(commit).toHaveBeenCalled()
    })

    it('keeps an enhancement whose detachment stays', () => {
      const { list, actions, enh } = setup(shape)
      const other = sm.detachments.find((d) => d.name !== 'Gladius Task Force')
      actions.toggleDetachment({ name: other.name })
      expect(list.get().units[0].enh).toBe(enh)
      actions.clearDetachments()
      expect(list.get().units[0].enh).toBeUndefined()
    })

    it('clears detachments and units when the faction changes, and only then', () => {
      const { list, actions, commit } = setup(shape)
      actions.pickFaction('space-marines')
      expect(commit).not.toHaveBeenCalled()
      actions.openUid.value = 'c1'
      actions.pickFaction('orks')
      expect(list.get().faction).toBe('orks')
      expect(list.get().detachments).toEqual([])
      expect(list.get().units).toEqual([])
      expect(actions.openUid.value).toBeNull()
    })

    it('keeps exactly one Warlord', () => {
      const { list, actions } = setup(shape)
      actions.toggleWarlord('i1')
      expect(list.get().units.filter((u) => u.warlord).map((u) => u.uid)).toEqual(['i1'])
      actions.toggleWarlord('i1')
      expect(list.get().units.some((u) => u.warlord)).toBe(false)
    })

    // SUPREME COMMANDER: "if this model is in your army, it must be your Warlord". Guilliman is the
    // Space Marines' one; a renamed copy of him stands in for a second such unit.
    function supremeSetup(units) {
      const gui = sm.units.find((u) => u.id === 'roboute-guilliman')
      const factionData = ref({ ...sm, units: [...sm.units, { ...gui, id: 'second-supreme' }] })
      const list = shape({ faction: 'space-marines', battleSize: 'strike-force', detachments: [], units })
      const { curDetachments, effBattle, defOf } = useRosterDerived(list.derivedOver, factionData)
      const actions = useRosterBuildActions({
        roster: list.get, factionData, curDetachments, effBattle, defOf, commit: vi.fn(), setFaction: list.setFaction,
      })
      const warlords = () => list.get().units.filter((u) => u.warlord).map((u) => u.id)
      return { list, actions, warlords }
    }

    it('makes a SUPREME COMMANDER the Warlord when the seat is empty, and only then', () => {
      const empty = supremeSetup([{ uid: 'i1', id: 'intercessor-squad' }])
      empty.actions.addUnit('roboute-guilliman')
      expect(empty.warlords()).toEqual(['roboute-guilliman'])

      // A Warlord the player picked is not taken away: the validation error says what to fix.
      const taken = supremeSetup([{ uid: 'c1', id: 'captain', warlord: true }])
      taken.actions.addUnit('roboute-guilliman')
      expect(taken.warlords()).toEqual(['captain'])
    })

    it('with two SUPREME COMMANDERs keeps the first, and passes the seat when it leaves', () => {
      const { list, actions, warlords } = supremeSetup([])
      actions.addUnit('roboute-guilliman')
      actions.addUnit('second-supreme')
      expect(warlords()).toEqual(['roboute-guilliman'])

      actions.removeEntry(list.get().units[0])
      expect(warlords()).toEqual(['second-supreme'])
      // Undo puts back the list from before the tap — one Warlord, the original one.
      actions.undoRemove()
      expect(warlords()).toEqual(['roboute-guilliman'])
    })

    // "Can be led by": one tap adds the character AND attaches it to the squad it was offered on.
    it('adds a Leader already attached to the unit it was picked for', () => {
      const { list, actions, commit } = setup(shape)
      actions.addLeaderTo('lieutenant', 'i1')
      const added = list.get().units.at(-1)
      expect(added).toMatchObject({ id: 'lieutenant', leaderOf: 'i1' })
      expect(commit).toHaveBeenCalled()
      // …and nothing for a host that is not in the list.
      const before = list.get().units.length
      actions.addLeaderTo('lieutenant', 'nope')
      expect(list.get().units).toHaveLength(before)
    })

    // "Can lead": one tap adds the squad AND puts the Character on it, moving it off another.
    it('adds a unit with the Character it was picked for attached', () => {
      const { list, actions, commit } = setup(shape)
      const lead = list.get().units.find((u) => u.uid === 'c1')
      lead.leaderOf = 'i1'
      actions.addHostFor('intercessor-squad', lead.uid)
      const added = list.get().units.at(-1)
      expect(added).toMatchObject({ id: 'intercessor-squad' })
      expect(lead.leaderOf).toBe(added.uid)
      expect(commit).toHaveBeenCalled()
      const before = list.get().units.length
      actions.addHostFor('intercessor-squad', 'nope')
      expect(list.get().units).toHaveLength(before)
    })

    it('adds, copies and removes a line', () => {
      const { list, actions } = setup(shape)
      actions.addUnit('intercessor-squad')
      expect(list.get().units).toHaveLength(3)
      actions.duplicateEntry(list.get().units[1])
      expect(list.get().units).toHaveLength(4)
      actions.openUid.value = list.get().units[0].uid
      actions.removeEntry(list.get().units[0])
      expect(list.get().units).toHaveLength(3)
      expect(actions.openUid.value).toBeNull()
      expect(actions.undoable.value).toBeTruthy()
    })
  })
}

// The picker prints a detachment's tag and hides a second one sharing it (DetachmentPickerList) —
// which it can only do if the options carry it. They did not until 2026-10-03: no tags on screen,
// and the clashing pair two clicks away.
describe('detachment options', () => {
  it('carry each detachment’s tag', async () => {
    const necrons = await loadRosterFaction('necrons')
    const roster = ref({ faction: 'necrons', battleSize: 'strike-force', detachments: [], units: [] })
    const factionData = ref(necrons)
    const { curDetachments, effBattle, defOf } = useRosterDerived(roster, factionData)
    const { detachmentOptions } = useRosterBuildActions({
      roster: () => roster.value, factionData, curDetachments, effBattle, defOf, commit: () => {}, setFaction: () => {},
    })
    const tagOf = (n) => detachmentOptions.value.find((d) => d.name === n)?.unique
    expect(tagOf('Awakened Dynasty')).toBe('DYNASTY')
    expect(tagOf('Hand of the Dynasty')).toBe('DYNASTY')
    expect(tagOf('Canoptek Court')).toBe('')
  })
})
