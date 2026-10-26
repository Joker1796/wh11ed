import { describe, it, expect } from 'vitest'
import { parseWeaponTag, weaponTagNote } from './weaponTagQualifier.js'

describe('parseWeaponTag', () => {
  it('reads an ability limited to target keywords, NON- included', () => {
    expect(parseWeaponTag('LETHAL HITS: NON-MONSTER/VEHICLE')).toEqual({ base: 'LETHAL HITS', keywords: ['MONSTER', 'VEHICLE'], negated: true })
    expect(parseWeaponTag('[SUSTAINED HITS 2: MONSTER/VEHICLE]')).toEqual({ base: 'SUSTAINED HITS 2', keywords: ['MONSTER', 'VEHICLE'], negated: false })
    expect(parseWeaponTag('DEVASTATING WOUNDS: INFANTRY')).toEqual({ base: 'DEVASTATING WOUNDS', keywords: ['INFANTRY'], negated: false })
  })
  it('reads [ANTI], plain, combined and NON-', () => {
    expect(parseWeaponTag('ANTI-VEHICLE 4+')).toEqual({ base: 'ANTI', keywords: ['VEHICLE'], negated: false, anti: '4+' })
    expect(parseWeaponTag('ANTI-MONSTER/VEHICLE 3+')).toEqual({ base: 'ANTI', keywords: ['MONSTER', 'VEHICLE'], negated: false, anti: '3+' })
    expect(parseWeaponTag('ANTI-NON-MONSTER/VEHICLE 2+')).toEqual({ base: 'ANTI', keywords: ['MONSTER', 'VEHICLE'], negated: true, anti: '2+' })
  })
  it('leaves an ability without target keywords alone', () => {
    expect(parseWeaponTag('RAPID FIRE 4')).toBeNull()
    expect(parseWeaponTag('LETHAL HITS')).toBeNull()
  })
})

describe('weaponTagNote', () => {
  it('says what the tag does, in both languages', () => {
    const lethal = parseWeaponTag('LETHAL HITS: NON-MONSTER/VEHICLE')
    expect(weaponTagNote(lethal, 'en')).toBe('**Here:** the ability only applies if the target is a unit with neither MONSTER nor VEHICLE.')
    expect(weaponTagNote(lethal, 'ru')).toBe('**Здесь:** способность действует, только если у цели нет ни MONSTER, ни VEHICLE.')
    const anti = parseWeaponTag('ANTI-MONSTER/VEHICLE 3+')
    expect(weaponTagNote(anti, 'en')).toBe('**Here:** against a MONSTER or VEHICLE unit, an unmodified wound roll of 3+ is a critical wound.')
    expect(weaponTagNote(parseWeaponTag('DEVASTATING WOUNDS: INFANTRY'), 'ru')).toBe('**Здесь:** способность действует, только если у цели есть ключевое слово INFANTRY.')
    expect(weaponTagNote(parseWeaponTag('ANTI-NON-MONSTER/VEHICLE 2+'), 'en')).toBe('**Here:** against a unit with neither MONSTER nor VEHICLE, an unmodified wound roll of 2+ is a critical wound.')
    expect(weaponTagNote(anti, 'ru')).toBe('**Здесь:** против юнита с ключевым словом MONSTER или VEHICLE немодифицированный бросок на ранение 3+ — критическое ранение.')
  })
})
