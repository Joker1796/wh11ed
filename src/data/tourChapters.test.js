import { describe, expect, it } from 'vitest'
import { TOUR_CHAPTERS } from './tourChapters.js'

// The game chapters' words follow the game's own settings (owner, 2026-10-14): a tour naming CP,
// phases or the broadcast a game does not keep describes a screen the player does not have.
const words = (s, ctx, lang) => {
  const w = typeof s[lang] === 'function' ? s[lang](ctx) : s[lang]
  return `${w.title} ${w.text}`
}
const ctxOf = (o) => ({
  begun: false, canTurn: true, lists: false, doubles: false, wide: false, shared: false,
  phases: false, cp: false, turnChecks: false, broadcast: false,
  tabs: ['missions', 'armies'], ...o,
})
const stepsFor = (ctx) => ['game', 'turn'].flatMap((id) => TOUR_CHAPTERS[id].steps.filter((s) => !s.when || s.when(ctx)))

describe('the game tour follows the game settings', () => {
  for (const begun of [false, true]) {
    it(`names no CP, phases or broadcast when the game keeps none (begun: ${begun})`, () => {
      const ctx = ctxOf({ begun })
      for (const s of stepsFor(ctx)) {
        for (const lang of ['ru', 'en']) {
          const t = words(s, ctx, lang)
          expect(t, t).not.toMatch(/\bCP\b|фаз|phase|трансляц|broadcast/i)
        }
      }
    })
  }

  it('names them when the game keeps them', () => {
    const ctx = ctxOf({ begun: true, phases: true, cp: true, broadcast: true, tabs: ['missions', 'phase', 'cp', 'armies', 'log', 'stats'] })
    const all = stepsFor(ctx).map((s) => words(s, ctx, 'ru')).join(' ')
    expect(all).toMatch(/CP/)
    expect(all).toMatch(/фаз/)
    expect(all).toMatch(/трансляц/)
  })

  it('every step resolves to a title and a text in both languages', () => {
    for (const ctx of [ctxOf({}), ctxOf({ begun: true, phases: true, cp: true, doubles: true, lists: true })]) {
      for (const ch of Object.values(TOUR_CHAPTERS)) {
        for (const s of ch.steps) {
          for (const lang of ['ru', 'en']) {
            const w = typeof s[lang] === 'function' ? s[lang](ctx) : s[lang]
            expect(w.title).toBeTruthy()
            expect(w.text).toBeTruthy()
          }
        }
      }
    }
  })
})
