import { describe, it, expect } from 'vitest'
import { variantPassage } from './variantPassage.js'

describe('variantPassage', () => {
  const vows = 'At the start of your Command phase, select one of the following Vows of Atonement.\n### The Path of the Penitent | Путь кающегося\nAdd 3" to the Move characteristic of PENITENT models.\n### Absolution in Battle | Отпущение в бою\nEach time a unit is selected to fight, +1 A.\nAnd S.'

  it('finds an option written as a subheading, up to the next one', () => {
    expect(variantPassage(vows, 'Absolution in Battle')).toBe('### Absolution in Battle | Отпущение в бою\nEach time a unit is selected to fight, +1 A.\nAnd S.')
    // …by its Russian caption too
    expect(variantPassage(vows, 'Путь кающегося')).toBe('### The Path of the Penitent | Путь кающегося\nAdd 3" to the Move characteristic of PENITENT models.')
  })

  it('finds an option written as a bullet', () => {
    const text = 'Your unit’s attacks have:\n▪ [LETHAL HITS].\n▪ __Or:__ [SUSTAINED HITS 1].'
    expect(variantPassage(text, '[SUSTAINED HITS 1]')).toBe('▪ __Or:__ [SUSTAINED HITS 1].')
    expect(variantPassage(text, '[LETHAL HITS]')).toBe('▪ [LETHAL HITS].')
  })

  it('finds an option whose name stands alone on a line, with its paragraphs', () => {
    const text = 'Select one of the following Vows.\nThe Path of the Penitent\n\nAdd 3" to the Move.\n\nAbsolution in Battle\n\nEach time a unit fights, +1 A.\n\nAnd S.'
    expect(variantPassage(text, 'The Path of the Penitent')).toBe('The Path of the Penitent\n\nAdd 3" to the Move.')
    expect(variantPassage(text, 'Absolution in Battle')).toBe('Absolution in Battle\n\nEach time a unit fights, +1 A.\n\nAnd S.')
  })

  it('gives nothing rather than a guess', () => {
    expect(variantPassage(vows, 'Death Before Disgrace')).toBeNull()
    expect(variantPassage('▪ [LETHAL HITS] and [SUSTAINED HITS 1].', '[LETHAL HITS]')).toBeNull()
    expect(variantPassage(null, 'x')).toBeNull()
  })
})
