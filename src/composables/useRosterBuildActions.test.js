import { describe, it, expect, beforeAll, vi } from 'vitest'
import { computed, ref } from 'vue'
import { useRosterBuildActions } from './useRosterBuildActions.js'
import { useRosterDerived } from './useRosterDerived.js'
import { loadRosterFaction } from '../data/roster/index.js'

// Real Space Marines data: the enhancement below is one Anvil Siege Force really carries.
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
  const anvil = sm.detachments.find((d) => d.name === 'Anvil Siege Force')
  const enh = anvil.enhancements[0].name
  const list = shape({
    faction: 'space-marines',
    battleSize: 'strike-force',
    detachments: ['Anvil Siege Force'],
    units: [{ uid: 'c1', id: 'captain', enh, warlord: true }, { uid: 'i1', id: 'intercessor-squad' }],
  })
  const factionData = ref(sm)
  const { curDetachments, defOf } = useRosterDerived(list.derivedOver, factionData)
  const commit = vi.fn()
  const actions = useRosterBuildActions({
    roster: list.get, factionData, curDetachments, defOf, commit, setFaction: list.setFaction,
  })
  return { list, actions, commit, enh }
}

for (const [label, shape] of [['a stored roster (editor)', asStored], ["the wizard's fields", asWizard]]) {
  describe(`over ${label}`, () => {
    // The wizard kept these and then listed them as errors for the player to clear by hand.
    it('drops an enhancement whose detachment is taken off the list', () => {
      const { list, actions, commit } = setup(shape)
      actions.toggleDetachment({ name: 'Anvil Siege Force' })
      expect(list.get().detachments).toEqual([])
      expect(list.get().units[0].enh).toBeUndefined()
      expect(commit).toHaveBeenCalled()
    })

    it('keeps an enhancement whose detachment stays', () => {
      const { list, actions, enh } = setup(shape)
      const other = sm.detachments.find((d) => d.name !== 'Anvil Siege Force')
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
