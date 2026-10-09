import { beforeEach, describe, expect, it } from 'vitest'
import { countVisit, localWork, offerDue, offerShown, offerAnswered, VISITS_KEY } from './installPath.js'

// The offer to install comes once the site is used for real — a saved list, a game, a third
// visit — never on arrival, never over a game or a list being built, and never again once answered
// (owner, 2026-10-09).
describe('installPath', () => {
  beforeEach(() => { localStorage.clear(); sessionStorage.clear() })
  const due = (path = '/rules') => offerDue(path, { installable: true })

  it('is not due on a first visit with nothing made', () => {
    countVisit()
    expect(due()).toBe(false)
  })

  it('is due after a saved list, not after a draft', () => {
    localStorage.setItem('wh11ed-rosters', JSON.stringify({ v: 9, rosters: [{ id: 'a', draft: true }] }))
    expect(due()).toBe(false)
    localStorage.setItem('wh11ed-rosters', JSON.stringify({ v: 9, rosters: [{ id: 'a' }] }))
    expect(localWork().rosters).toBe(1)
    expect(due()).toBe(true)
  })

  it('is due after a game, and on the third visit', () => {
    localStorage.setItem('wh11ed-tracker-history', JSON.stringify([{ id: 'g' }]))
    expect(due()).toBe(true)
    localStorage.clear()
    localStorage.setItem(VISITS_KEY, '3')
    expect(due()).toBe(true)
  })

  it('a visit counts once per session', () => {
    countVisit(); countVisit(); countVisit()
    expect(localStorage.getItem(VISITS_KEY)).toBe('1')
  })

  it('never over a game, a list being built or a join; never where it cannot install', () => {
    localStorage.setItem(VISITS_KEY, '5')
    for (const p of ['/tracker/game', '/roster/new', '/roster/abc', '/tracker/join/x']) expect(due(p)).toBe(false)
    expect(due('/roster/abc/view')).toBe(true)
    expect(offerDue('/rules', { installable: false })).toBe(false)
  })

  it('once a session until answered, then never', () => {
    localStorage.setItem(VISITS_KEY, '5')
    offerShown()
    expect(due()).toBe(false)
    sessionStorage.clear()
    expect(due()).toBe(true)
    offerAnswered()
    expect(due()).toBe(false)
  })
})
