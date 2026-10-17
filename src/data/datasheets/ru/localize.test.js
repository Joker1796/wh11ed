import { describe, it, expect } from 'vitest'
import { invNoteRu, localizeSheet, compositionLineRu } from './localize.js'
import { factionGroups } from '../../factionsIndex.js'
import { loadDatasheets } from '../index.js'

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

// The composition frame in Russian, the names left alone. Before 2026-10-16 no sheet had it: every
// "4‑9 Intercessor models" in the RU locale was English.
describe('localizeSheet · composition', () => {
  it('moves the noun before the name and agrees it with the number', () => {
    expect(compositionLineRu('1 Intercessor Sergeant model')).toBe('1 модель Intercessor Sergeant')
    expect(compositionLineRu('2‑3 Allarus Custodian models')).toBe('2‑3 модели Allarus Custodian')
    expect(compositionLineRu('4‑9 Intercessor models')).toBe('4‑9 моделей Intercessor')
    expect(compositionLineRu('21 Boyz models')).toBe('21 модель Boyz')
    expect(compositionLineRu('1 Captain')).toBe('1 Captain')
  })

  it('translates the glue and the whole-line wordings', () => {
    expect(compositionLineRu('1 Master of Ordnance, 1 Officer of the Fleet and 1 Astropath')).toBe('1 Master of Ordnance, 1 Officer of the Fleet и 1 Astropath')
    expect(compositionLineRu('This unit can contain a maximum of 10 models.')).toBe('Отряд может включать не больше 10 моделей.')
    expect(compositionLineRu('OR')).toBe('ИЛИ')
  })

  // Every line of every sheet: what is left English must be names. Deathwatch's model names carry
  // their own "with … and …" (as GW prints them), so the check is for the frame words only.
  it('leaves no English frame in any sheet', async () => {
    const left = []
    let read = 0
    for (const f of factionGroups.flatMap((g) => g.factions)) {
      for (const sh of (await loadDatasheets(f.slug)) || []) {
        for (const line of localizeSheet(sh).composition || []) {
          read++
          if (/\bmodels?\b|\bcan\b|\bcontain\b|\bmaximum\b|\bfollowing\b|^or:?$| and (?=\d)/i.test(line)) left.push(`${f.slug}/${sh.id}: ${line}`)
        }
      }
    }
    expect(read).toBeGreaterThan(1500) // a loader that found nothing must not pass
    expect(left).toEqual([])
  }, 60000)
})
