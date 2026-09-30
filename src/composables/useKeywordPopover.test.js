import { describe, it, expect } from 'vitest'
import { useKeywordPopover } from './useKeywordPopover.js'

// A weapon ability written with its targets gets its own popover: the tag's name, and what it
// does HERE ahead of the ability's text (weaponTagQualifier.js).
describe('useKeywordPopover — a qualified weapon ability', () => {
  it('names the tag and says what it does here', async () => {
    const { open, activeKeyword } = useKeywordPopover()
    await open('LETHAL HITS: NON-MONSTER/VEHICLE', {})
    expect(activeKeyword.value.name).toBe('[LETHAL HITS: NON-MONSTER/VEHICLE]')
    expect(activeKeyword.value.fullText).toMatch(/^\*\*Here:\*\* the ability only applies if the target is a unit with neither MONSTER nor VEHICLE\.\n\n/)
    expect(activeKeyword.value.fullText).toContain('automatically wound the target')
  })

  it('opens a bare ability as it was', async () => {
    const { open, activeKeyword } = useKeywordPopover()
    await open('LETHAL HITS', {})
    expect(activeKeyword.value.name).toBe('[LETHAL HITS]')
    expect(activeKeyword.value.fullText).not.toContain('Here:')
  })
})
