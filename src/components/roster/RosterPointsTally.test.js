import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RosterPointsTally from './RosterPointsTally.vue'
import RosterSettingsBar from './RosterSettingsBar.vue'

const badgeOf = (w) => w.find('.issues-badge').classes()

describe('RosterPointsTally', () => {
  it('reads red with the count, amber without one, green when nothing is left', () => {
    expect(badgeOf(mount(RosterPointsTally, { props: { errorCount: 2, issueCount: 3 } }))).toContain('has-err')
    expect(badgeOf(mount(RosterPointsTally, { props: { errorCount: 0, issueCount: 1 } }))).toContain('warn')
    expect(badgeOf(mount(RosterPointsTally, { props: { errorCount: 0, issueCount: 0 } }))).toContain('ok')
  })

  it('marks the total over the limit', () => {
    const w = mount(RosterPointsTally, { props: { points: 2010, limit: 2000 } })
    expect(w.find('.rc-points').classes()).toContain('over')
    expect(w.find('.rc-points').text()).toContain('2010 / 2000')
  })

  it('has no badge before there is anything to validate', () => {
    expect(mount(RosterPointsTally, { props: { badge: false } }).find('.issues-badge').exists()).toBe(false)
  })
})

// The desk's copy only knew red and green: a list owing a Force Disposition wore a green tick there.
describe('RosterSettingsBar', () => {
  it('shows warnings as amber, like the phone does', () => {
    const w = mount(RosterSettingsBar, {
      props: { factionSlug: 'space-marines', errorCount: 0, issueCount: 1 },
      global: { stubs: { BaseModal: true, FactionPickerModal: true, DetachmentPickerModal: true } },
    })
    expect(badgeOf(w)).toContain('warn')
  })
})
