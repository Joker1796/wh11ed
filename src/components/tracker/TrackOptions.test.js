import { describe, it, expect, afterEach } from 'vitest'
import { mount, DOMWrapper } from '@vue/test-utils'
import { reactive } from 'vue'
import TrackOptions from './TrackOptions.vue'
import { trackSettingsOf, optionsIn } from '../../data/trackerOptions.js'

// BaseModal teleports to <body>.
afterEach(() => { document.body.innerHTML = '' })
const body = () => new DOMWrapper(document.body)

const CTX = {
  you: { faction: 'orks', trackable: true },
  opp: { faction: 'necrons', trackable: false },
  anyRoster: true,
}
const RouterLink = { template: '<a><slot /></a>' }

function build(ctx = CTX, group = 'turn') {
  const settings = reactive(trackSettingsOf({}))
  const w = mount(TrackOptions, {
    props: { settings, ctx, group },
    global: { stubs: { RouterLink } },
  })
  return { w, settings }
}

describe('TrackOptions', () => {
  it('writes the checkbox straight onto the caller\'s settings', async () => {
    const { w, settings } = build()
    expect(settings.trackCP).toBe(true)
    await w.findAll('input[type="checkbox"]')[0].setValue(false)
    expect(settings.trackCP).toBe(false)
  })

  // The reason the "i" sits OUTSIDE the <label> instead of inside it: a label forwards every click
  // in it to its control, so a help button in there would flip the very setting it explains.
  it('opens help without touching the setting', async () => {
    const { w, settings } = build()
    await w.find('.opt-info').trigger('click')
    expect(settings.trackCP).toBe(true)
    expect(body().text()).toContain('Command points (CP)')
  })

  // The caveat lives in the help, not under the caption: no row is taller than the rest.
  it('puts the reference-only note into the help for a faction with no counter', async () => {
    const { w } = build(CTX, 'armies')
    expect(w.findAll('.check-note')).toHaveLength(0)
    const opp = w.findAll('.opt-row').find((r) => r.text().includes("Opponent's army rule counter"))
    await opp.find('.opt-info').trigger('click')
    expect(body().text()).toContain('reference only')
  })

  // Nothing is hidden: a row the game cannot offer is drawn disabled, with the reason.
  it('draws every row of the group, disabling the ones this game cannot offer', () => {
    const w = mount(TrackOptions, {
      props: { settings: reactive(trackSettingsOf({})), ctx: { you: {}, opp: {}, anyRoster: false }, group: 'roster' },
      global: { stubs: { RouterLink } },
    })
    const rows = w.findAll('.opt-row')
    expect(rows).toHaveLength(optionsIn('roster').length)
    expect(rows.every((r) => r.find('input').element.disabled)).toBe(true)
    expect(w.text()).toContain('Available once an army list is attached')
    // …and the help stays reachable, which is the whole reason a disabled row is still drawn.
    expect(rows[0].find('.opt-info').attributes('disabled')).toBeUndefined()
  })

  // A guest in a shared game: the rows the table marks `local` are this phone's, the rest are
  // the host's and say so.
  it('lockShared leaves only the local rows live', () => {
    const w = mount(TrackOptions, {
      props: { settings: reactive(trackSettingsOf({})), ctx: CTX, group: 'armies', lockShared: true },
      global: { stubs: { RouterLink } },
    })
    const rows = w.findAll('.opt-row')
    const live = rows.filter((r) => !r.find('input').element.disabled).map((r) => r.text())
    expect(live).toHaveLength(2)
    expect(live[0]).toContain("Your army rule's counter")
    expect(live[1]).toContain("Opponent's army rule counter")
    // The ask sits under the stratagems, under CP, since 2026-10-17 — the host's like them.
    const turn = mount(TrackOptions, {
      props: { settings: reactive(trackSettingsOf({})), ctx: CTX, group: 'turn', lockShared: true },
      global: { stubs: { RouterLink } },
    })
    // CP and the clock are the host's, for every phone; the rest of the turn is this phone's
    // (owner, 2026-10-25) — the stratagems and the ask under CP included.
    const turnRow = (t) => turn.findAll('.opt-row').find((r) => r.text().includes(t))
    for (const t of ['Command points', 'Track phases']) {
      expect(turnRow(t).find('input').element.disabled).toBe(true)
      expect(turnRow(t).text()).toContain('Host only')
    }
    // …shown at the host's value: "off" on a guest's phone read as "the host does not count CP".
    expect(turnRow('Command points').find('input').element.checked).toBe(true)
    expect(turnRow('Track phases').find('input').element.checked).toBe(false)
    for (const t of ['Stratagems', 'Ask the unit and the cost', 'Rules for this phase or turn', 'Missions']) {
      expect(turnRow(t).find('input').element.disabled).toBe(false)
    }
    // The colours have a card of their own, and are a way of looking at the game: this phone's.
    const look = mount(TrackOptions, {
      props: { settings: reactive(trackSettingsOf({})), ctx: CTX, group: 'look', lockShared: true },
      global: { stubs: { RouterLink } },
    })
    const row = (t) => look.findAll('.opt-row').find((r) => r.text().includes(t))
    expect(row('Customise colours').find('input').element.disabled).toBe(false)
    expect(row('Log tab').find('input').element.disabled).toBe(false)
    expect(row('Stats tab').find('input').element.disabled).toBe(false)
    // The broadcast button is the host's: it streams the game, not this phone's view of it.
    expect(row('Broadcast (OBS)').find('input').element.disabled).toBe(true)
  })

  // The five families hang off the master; nothing else does.
  it('disables the children when the master is off', async () => {
    const settings = reactive(trackSettingsOf({}))
    const w = mount(TrackOptions, {
      props: { settings, ctx: CTX, group: 'roster' },
      global: { stubs: { RouterLink } },
    })
    settings.trackModifiers = false
    await w.vm.$nextTick()
    const row = (name) => w.findAll('.opt-row').find((r) => r.text().includes(name))
    expect(row('Stratagems').find('input').element.disabled).toBe(true)
    expect(row('Live modifiers').find('input').element.disabled).toBe(false)   // the master itself
  })
})

describe('TrackOptions — the groups of 2026-10-14', () => {
  it('folds the modifier families under "Details", saying how many are on', async () => {
    const w = mount(TrackOptions, {
      props: { settings: reactive(trackSettingsOf({})), ctx: CTX, group: 'roster' },
      global: { stubs: { RouterLink } },
    })
    const head = w.find('.opt-fold-head')
    expect(head.text()).toContain('Details')
    expect(head.text()).toContain('6/6')
    expect(head.attributes('aria-expanded')).toBe('false')
    await head.trigger('click')
    expect(head.attributes('aria-expanded')).toBe('true')
  })
  // The host of a shared game is told which of its rows bind every phone; one phone says nothing.
  it('marks the rows the host sets for every phone, in a shared game only', () => {
    const tags = (shared) => mount(TrackOptions, {
      props: { settings: reactive(trackSettingsOf({})), ctx: CTX, group: 'turn', shared },
      global: { stubs: { RouterLink } },
    }).findAll('.opt-local').map((t) => t.text())
    expect(tags(false)).toEqual([])
    expect(tags(true)).toEqual(['for every phone in the game', 'for every phone in the game'])
  })
})
