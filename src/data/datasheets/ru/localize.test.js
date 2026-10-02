import { describe, it, expect } from 'vitest'
import { invNoteRu, localizeSheet } from './localize.js'

// The note under an invulnerable save comes from a shared map, not the sheet's overlay — so a
// sheet with no overlay at all must still get it, and a wording the map does not know must stay
// English rather than be guessed at (`npm run parity` names that case).
describe('localizeSheet · invNote', () => {
  const sheet = (invNote) => ({ id: 'x', name: 'X', profiles: [{ name: 'X', inv: '5+', invNote }, { name: 'Y', inv: '5+' }] })

  it('translates a known wording whichever way the data spells it', () => {
    expect(localizeSheet(sheet('* Against ranged attacks only')).profiles[0].invNote).toBe('Только против дальнобойных атак')
    expect(localizeSheet(sheet('* against ranged attacks only')).profiles[0].invNote).toBe('Только против дальнобойных атак')
  })

  it('leaves an unknown wording and a profile with no note as they were', () => {
    const out = localizeSheet(sheet('Only on Tuesdays.'))
    expect(out.profiles[0].invNote).toBe('Only on Tuesdays.')
    expect(out.profiles[1]).toEqual({ name: 'Y', inv: '5+' })
    expect(invNoteRu('Only on Tuesdays.')).toBeNull()
  })
})
