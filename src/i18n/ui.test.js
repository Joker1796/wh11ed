import { describe, it, expect } from 'vitest'
import { ui } from './ui.js'

// ui.js is two flat maps of interface strings, one per locale, ~820 keys each — and nothing
// enforced that they hold the same keys. A key present only in `en` does not throw: the RU
// reader simply gets the English string, which is the quietest possible failure. (The data files
// have `npm run parity` for exactly this; interface text had nothing until 2026-09-15.)
describe('ui.js: the two locales are the same shape', () => {
  it('has every key in both locales', () => {
    const en = Object.keys(ui.en)
    const ru = Object.keys(ui.ru)
    expect(en.filter((k) => !(k in ui.ru))).toEqual([])
    expect(ru.filter((k) => !(k in ui.en))).toEqual([])
  })

  it('gives every key the same type on both sides', () => {
    const mismatched = Object.keys(ui.en).filter((k) => typeof ui.en[k] !== typeof ui.ru[k])
    expect(mismatched).toEqual([])
  })

  it('leaves no RU value empty where EN has text', () => {
    const blank = Object.keys(ui.en).filter(
      (k) => typeof ui.en[k] === 'string' && ui.en[k].trim() && !String(ui.ru[k] ?? '').trim(),
    )
    expect(blank).toEqual([])
  })
})
