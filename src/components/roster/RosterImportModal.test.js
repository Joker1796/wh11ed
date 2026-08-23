import { afterEach, beforeEach, describe, it, expect } from 'vitest'
import { mount, flushPromises, DOMWrapper } from '@vue/test-utils'
import RosterImportModal from './RosterImportModal.vue'

// BaseModal teleports to body, so the fields live outside the mounted wrapper's own root.
const body = () => new DOMWrapper(document.body)
afterEach(() => { document.body.innerHTML = '' })
beforeEach(() => { localStorage.clear() })

const LIST = `Khaaaarn! (210 points)

World Eaters
Strike Force (2000 points)
Berzerker Warband (3 Detachment Points)

CHARACTERS

Khârn the Betrayer (115 points)
  • Warlord
  • 1x Gorechild

OTHER DATASHEETS

Chaos Spawn (95 points)
  • 2x Chaos Spawn
    • 2x Hideous mutations`

const settle = async () => {
  for (let i = 0; i < 40; i++) {
    await flushPromises()
    await new Promise((r) => setTimeout(r, 10))
  }
}

describe('RosterImportModal', () => {
  // The report is what makes an import safe to accept: nothing is created until the reader has
  // seen which faction it landed on and what it costs HERE.
  it('reads a pasted list and only then offers to create it', async () => {
    const w = mount(RosterImportModal)
    expect(body().find('.rim-report').exists()).toBe(false)

    await body().find('textarea').setValue(LIST)
    await body().find('.rim-btn').trigger('click')
    await settle()

    const report = body().find('.rim-report')
    expect(report.exists()).toBe(true)
    expect(report.text()).toContain('World Eaters')
    expect(report.text()).toContain('Berzerker Warband')
    expect(report.text()).toContain('2')            // two units read

    await body().find('.rim-btn').trigger('click')
    expect(w.emitted('imported')?.[0]?.[0]).toBeTruthy()
    expect(w.emitted('close')).toBeTruthy()
    w.unmount()
  })

  it('says so when the text is not a list at all', async () => {
    const w = mount(RosterImportModal)
    await body().find('textarea').setValue('hello there')
    await body().find('.rim-btn').trigger('click')
    await flushPromises()
    expect(body().find('.rim-error').exists()).toBe(true)
    expect(body().find('.rim-report').exists()).toBe(false)
    w.unmount()
  })

  // Editing the text after reading it must invalidate the report — otherwise "Create" would build
  // the list the reader was shown two edits ago.
  it('drops the report when the text changes', async () => {
    const w = mount(RosterImportModal)
    await body().find('textarea').setValue(LIST)
    await body().find('.rim-btn').trigger('click')
    await settle()
    expect(body().find('.rim-report').exists()).toBe(true)
    await body().find('textarea').setValue(`${LIST}\n`)
    await flushPromises()
    expect(body().find('.rim-report').exists()).toBe(false)
    w.unmount()
  })

  // listhammer's short export names no faction anywhere in the text, so the screen has to ask —
  // and the answer resumes the read rather than making the reader press the button again.
  it('asks which faction a list that names none is, and finishes the read once told', async () => {
    const COMPACT = `Khaaaarn!  (210 Points)

Khârn the Betrayer + 10x Khorne Berzerkers

2x Chaos Spawn

Exported from listhammer.info: https://listhammer.info/list/abc`

    const w = mount(RosterImportModal)
    await body().find('textarea').setValue(COMPACT)
    await body().find('.rim-btn').trigger('click')
    await settle()
    expect(body().find('.rim-faction').exists()).toBe(true)
    expect(body().find('.rim-report').exists()).toBe(false)

    await body().find('.rim-faction select').setValue('world-eaters')
    await settle()
    const report = body().find('.rim-report')
    expect(report.exists()).toBe(true)
    expect(report.text()).toContain('World Eaters')
    w.unmount()
  })

})
