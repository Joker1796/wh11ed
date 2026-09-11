import { beforeEach, describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

let ROSTER_ID = ''
const replace = vi.fn()
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { get id() { return ROSTER_ID } } }),
  useRouter: () => ({ push: vi.fn(), replace }),
  RouterLink: { name: 'RouterLink', props: ['to'], template: '<a :href="to"><slot /></a>' },
}))

let RosterPrintView, useRosters, ui

// The document itself has its own spec; here the question is what the panel decides.
const stubs = {
  RosterPrintSheet: { name: 'RosterPrintSheet', props: ['roster', 'factionData', 'rulesFaction', 'detachments', 'opts'], template: '<div class="sheet" />' },
  RouterLink: { props: ['to'], template: '<a :href="to"><slot /></a>' },
}

beforeEach(async () => {
  localStorage.clear()
  vi.resetModules()
  replace.mockClear()
  ;({ useRosters } = await import('../../composables/useRosters.js'))
  ;({ ui } = await import('../../i18n/ui.js'))
  ;({ default: RosterPrintView } = await import('./RosterPrintView.vue'))
})

async function screen(name = 'Printable') {
  const store = useRosters()
  const r = store.createRoster(name)
  r.faction = 'necrons'
  r.detachments = ['Cursed Legion']
  r.units.push({ uid: 'u1', id: 'necron-warriors', size: 0 })
  ROSTER_ID = r.id
  const w = mount(RosterPrintView, { global: { stubs } })
  await flushPromises()
  return w
}

const opts = (w) => w.findComponent({ name: 'RosterPrintSheet' }).props('opts')

describe('RosterPrintView', () => {
  it('leaves for the list when the roster id is unknown', async () => {
    ROSTER_ID = 'missing'
    mount(RosterPrintView, { global: { stubs } })
    await flushPromises()
    expect(replace).toHaveBeenCalledWith('/roster')
  })

  it('starts compact — the sheet you fold into a pocket', async () => {
    const w = await screen()
    expect(opts(w).unitCards).toBe(false)
    expect(opts(w).stratagems).toBe(true)
    expect(opts(w).stratagemText).toBe(false)
  })

  // The card settings describe a section that is not in the document until cards are asked for.
  it('says nothing about a unit card until there are unit cards', async () => {
    const w = await screen()
    expect(w.text()).not.toContain(ui.en.printGroupCard)
    await w.findAll('.rpv-presets button')[1].trigger('click')
    expect(w.text()).toContain(ui.en.printGroupCard)
    expect(opts(w).unitCards).toBe(true)
  })

  // A preset is a starting point, not a mode: changing one row keeps everything else and just
  // stops claiming to be a preset.
  it('becomes a set of your own the moment a box is touched', async () => {
    const w = await screen()
    expect(w.text()).not.toContain(ui.en.printPresetCustom)
    const box = w.findAll('.rpv-check input')[0]
    await box.setValue(!box.element.checked)
    expect(w.text()).toContain(ui.en.printPresetCustom)
  })

  // A child row's parent decides it, and the panel says so instead of leaving a live checkbox
  // that changes nothing in the document.
  it('greys a row whose parent is off, and prints it as off', async () => {
    const w = await screen()
    await w.findAll('.rpv-presets button')[1].trigger('click')
    const rows = w.findAll('.rpv-check')
    const stratRow = rows.find((r) => r.text().includes(ui.en.printOptStratagems) && !r.text().includes(ui.en.printOptStratagemText))
    await stratRow.find('input').setValue(false)

    const textRow = rows.find((r) => r.text().includes(ui.en.printOptStratagemText))
    expect(textRow.find('input').attributes('disabled')).toBeDefined()
    expect(opts(w).stratagemText).toBe(false)
  })

  it('remembers the settings for the next list', async () => {
    const w = await screen()
    await w.findAll('.rpv-presets button')[1].trigger('click')
    await flushPromises()
    expect(JSON.parse(localStorage.getItem('wh11ed-roster-print')).unitCards).toBe(true)
  })

  it('counts the sheets, and says so', async () => {
    const w = await screen()
    expect(w.find('.rpv-pages').text()).toBe(ui.en.printPages.replace('{n}', '1'))
  })
})
