import { describe, it, expect, beforeAll } from 'vitest'
import { computed, ref } from 'vue'
import { useRosterDerived } from './useRosterDerived.js'
import { loadRosterFaction } from '../data/roster/index.js'

// Real Space Marines data, so the numbers below are the game's: an Intercessor Squad is 80 points
// at its default bracket, a Captain 80, and the Captain may lead that squad.
let sm
beforeAll(async () => { sm = await loadRosterFaction('space-marines', { allies: true }) })

function entry(id, extra = {}) { return { uid: id, id, ...extra } }

function stored(extra = {}) {
  return {
    id: 'r1',
    faction: 'space-marines',
    battleSize: 'strike-force',
    detachments: ['Anvil Siege Force'],
    units: [entry('intercessor-squad')],
    ...extra,
  }
}

describe('over a stored roster', () => {
  it('answers the questions every roster screen asks', () => {
    const roster = ref(stored())
    const d = useRosterDerived(roster, ref(sm))

    expect(d.defOf('intercessor-squad')?.name).toBe('Intercessor Squad')
    expect(d.curDetachments.value.map((x) => x.name)).toEqual(['Anvil Siege Force'])
    expect(d.limit.value).toBe(2000)
    expect(d.points.value).toBe(80)
    expect(d.entryMeta.value.get('intercessor-squad')).toMatchObject({ points: 80, copyIndex: 1 })
    // A real verdict, not the empty fallback: this list has nobody to be its Warlord.
    expect(d.validation.value.issues.map((i) => i.code)).toContain('noWarlord')
  })

  // The detachment is stored as a NAME, so the objects behind it have to follow a change to the
  // list rather than being resolved once.
  it('follows the roster it was handed', () => {
    const roster = ref(stored())
    const d = useRosterDerived(roster, ref(sm))
    expect(d.points.value).toBe(80)

    roster.value.units.push(entry('captain'))
    expect(d.points.value).toBe(160)

    roster.value.detachments = []
    expect(d.curDetachments.value).toEqual([])
  })

  // Before the faction bundle resolves every unit id looks unknown, and a list that accused itself
  // of holding units that don't exist is what the guard is for.
  it('stays quiet until the faction data is in', () => {
    const d = useRosterDerived(ref(stored()), ref(null))
    expect(d.validation.value.issues).toEqual([])
    expect(d.points.value).toBe(0)
  })
})

// The wizard's fields are not a stored roster — they are loose refs assembled into the same shape,
// which is the whole reason this takes a ref rather than an id.
describe('over the wizard\'s assembled shape', () => {
  it('prices and validates a draft the store has never seen', () => {
    const units = ref([entry('intercessor-squad'), entry('captain')])
    const detachments = ref(['Anvil Siege Force'])
    const draft = computed(() => ({
      faction: 'space-marines',
      detachments: detachments.value,
      battleSize: 'incursion',
      units: units.value,
      checkLegality: true,
    }))
    const d = useRosterDerived(draft, ref(sm))

    expect(d.limit.value).toBe(1000)
    expect(d.points.value).toBe(160)
    expect(d.groupedUnits.value.flatMap((s) => s.entries.map((e) => e.id)))
      .toEqual(expect.arrayContaining(['intercessor-squad', 'captain']))
  })
})

describe('attachRole', () => {
  it('names the slot an attached character fills', () => {
    const roster = ref(stored({
      units: [entry('intercessor-squad'), entry('captain', { leaderOf: 'intercessor-squad' })],
    }))
    const d = useRosterDerived(roster, ref(sm))

    expect(d.attachRole(roster.value.units[1])).toBeTruthy()
    expect(d.attachRole(roster.value.units[0])).toBe('')
  })
})

describe('dupBlocked', () => {
  // The battle size's duplicate limit is 2 at Incursion, and the third copy is the one that stops.
  it('stops at the cap while legality checking is on', () => {
    const roster = ref(stored({
      battleSize: 'incursion',
      units: [
        { uid: 'a', id: 'captain' },
        { uid: 'b', id: 'captain' },
      ],
    }))
    const d = useRosterDerived(roster, ref(sm))
    expect(d.dupBlocked(roster.value.units[0])).toBe(true)
  })

  it('never blocks with legality checking off', () => {
    const roster = ref(stored({
      battleSize: 'incursion',
      checkLegality: false,
      units: [
        { uid: 'a', id: 'captain' },
        { uid: 'b', id: 'captain' },
      ],
    }))
    const d = useRosterDerived(roster, ref(sm))
    expect(d.dupBlocked(roster.value.units[0])).toBe(false)
  })
})
