import { describe, it, expect, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import KeywordPopover from './KeywordPopover.vue'
import { useKeywordPopover } from '../composables/useKeywordPopover.js'

const { openRule, close } = useKeywordPopover()
const rect = { top: 10, bottom: 30, left: 10, right: 60, width: 50, height: 20 }

describe('KeywordPopover', () => {
  afterEach(() => close())

  // A rule whose name stays English by project convention (a stratagem's) carries its translation
  // as a display line under the name — the pairing StratCard prints on the card itself.
  it('shows a translated name under the one the rule is filed under', async () => {
    const w = mount(KeywordPopover)
    openRule('Methodical Murder', '**WHEN:** Your Shooting phase.', rect, 'Методичное убийство')
    await flushPromises()
    const header = document.querySelector('.kw-popover-header')
    expect(header.querySelector('.kw-name').textContent).toBe('Methodical Murder')
    expect(header.querySelector('.kw-name-ru').textContent).toBe('Методичное убийство')
    expect(document.querySelector('.kw-popover-body').innerHTML).toContain('<strong>WHEN:</strong>')
    w.unmount()
  })

  it('leaves the line out for a rule that has no second name', async () => {
    const w = mount(KeywordPopover)
    openRule('Command Protocols', 'While a Necrons Character model is leading this unit…', rect)
    await flushPromises()
    expect(document.querySelector('.kw-name-ru')).toBe(null)
    w.unmount()
  })
})
