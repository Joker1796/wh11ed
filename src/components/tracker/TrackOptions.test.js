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

function build(ctx = CTX) {
  const settings = reactive(trackSettingsOf({}))
  const w = mount(TrackOptions, {
    props: { settings, ctx },
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
    expect(body().text()).toContain('Track CP')
  })

  it('prints the reference-only note for a faction with no counter', () => {
    const { w } = build()
    const notes = w.findAll('.check-note')
    expect(notes).toHaveLength(1)   // the opponent's row only
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
