import { describe, it, expect } from 'vitest'
import { copyTierLabel, modelsLabel } from './copyTier.js'

describe('copyTier', () => {
  it('names a copy tier in either language', () => {
    // Every tier the MFM prints: 1st, 1st-2nd, 1st-3rd, 2nd+, 3rd+, 4th+.
    expect(['1st', '1st-2nd', '1st-3rd', '2nd+', '3rd+', '4th+'].map((t) => copyTierLabel(t, 'ru')))
      .toEqual(['1-й юнит', '1-й и 2-й юнит', '1–3-й юнит', 'со 2-го юнита', 'с 3-го юнита', 'с 4-го юнита'])
    expect(['1st', '1st-2nd', '1st-3rd', '2nd+', '3rd+', '4th+'].map((t) => copyTierLabel(t, 'en')))
      .toEqual(['1st unit', '1st and 2nd unit', '1st–3rd unit', 'from the 2nd unit', 'from the 3rd unit', 'from the 4th unit'])
  })

  it('counts models with the Russian plural', () => {
    expect([1, 2, 5, 11, 21, 22, 12].map((n) => modelsLabel(n, 'ru'))).toEqual(['1 модель', '2 модели', '5 моделей', '11 моделей', '21 модель', '22 модели', '12 моделей'])
    expect(modelsLabel(1, 'en')).toBe('1 model')
  })
})
