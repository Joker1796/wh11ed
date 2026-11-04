// The campaign's settings form sends plain values: the size one for the campaign or one a phase
// (three equal ones are one), the dates of the phases, the new settings (owner, 2026-11-04).
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CampSettingsForm from './CampSettingsForm.vue'
import { SETTINGS_DEFAULTS } from '../../../core/dominatus/campaign.js'

const RouterLink = { props: ['to'], template: '<a :href="to"><slot /></a>' }
function form(initial = {}) {
  return mount(CampSettingsForm, {
    props: { initial: { name: 'A', ...SETTINGS_DEFAULTS, schedule: [...SETTINGS_DEFAULTS.schedule], deadlines: [null, null, null], ...initial }, submitLabel: 'Save', cancelTo: '/c' },
    global: { stubs: { RouterLink } },
  })
}
const sent = (w) => w.emitted('submit').at(-1)[0]

describe('CampSettingsForm', () => {
  it('sends a size a phase, and three equal ones as one', async () => {
    const w = form()
    const s = w.vm.$.setupState
    s.sizeMode = 'phase'
    expect(s.form.size).toEqual(['strikeForce', 'strikeForce', 'strikeForce'])
    await w.find('form').trigger('submit')
    expect(sent(w).size).toBe('strikeForce')
    s.form.size[0] = 'incursion'
    await w.find('form').trigger('submit')
    expect(sent(w).size).toEqual(['incursion', 'strikeForce', 'strikeForce'])
    s.sizeMode = 'one'
    expect(s.form.size).toBe('incursion')
  })

  it('sends the phases\' dates and the new settings as they are', async () => {
    const w = form({ size: ['incursion', 'strikeForce', 'onslaught'], deadlines: ['2026-11-15', null, null], strict: true, pairBy: 'random', hands: 'hidden', drawExtra: 1, upgradeLimit: 4 })
    expect(w.vm.$.setupState.sizeMode).toBe('phase')
    await w.find('form').trigger('submit')
    expect(sent(w)).toMatchObject({ deadlines: ['2026-11-15', null, null], strict: true, pairBy: 'random', hands: 'hidden', drawExtra: 1, upgradeLimit: 4, size: ['incursion', 'strikeForce', 'onslaught'] })
  })

  it('has a "?" for every setting it draws, in both languages', async () => {
    const { ui } = await import('../../../i18n/ui.js')
    const keys = Object.keys(form().vm.$.setupState.TITLES)
    for (const loc of ['en', 'ru']) expect(keys.filter((k) => !ui[loc][`campHelp_${k}`])).toEqual([])
  })
})
