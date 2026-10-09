import { beforeEach, afterEach, describe, it, expect } from 'vitest'
import { mount, DOMWrapper } from '@vue/test-utils'
import WelcomeModal from './WelcomeModal.vue'
import { shouldWelcome, WELCOME_KEY } from '../composables/useWelcome.js'

const body = () => new DOMWrapper(document.body)
const stubs = { RouterLink: { props: ['to'], template: '<a><slot /></a>' } }
beforeEach(() => localStorage.clear())
afterEach(() => { document.body.innerHTML = '' })

describe('shouldWelcome', () => {
  // The landing only: somebody who arrived from a search engine is already reading a rule, and a
  // card across it is an interruption rather than a welcome.
  it('offers the card on the landing, once, and nowhere else', () => {
    expect(shouldWelcome('/')).toBe(true)
    expect(shouldWelcome('/core-rules')).toBe(false)
    expect(shouldWelcome('/roster')).toBe(false)
    localStorage.setItem(WELCOME_KEY, '1')
    expect(shouldWelcome('/')).toBe(false)
  })

  // The installed app has its own first-launch card; this one would ask it to install itself.
  it('is not shown in the installed app', () => {
    const mm = window.matchMedia
    window.matchMedia = (q) => ({ matches: q.includes('standalone'), addEventListener() {}, removeEventListener() {} })
    try { expect(shouldWelcome('/')).toBe(false) } finally { window.matchMedia = mm }
  })
})

describe('WelcomeModal', () => {
  it('states the two things the screen cannot, and closing it is permanent', async () => {
    const w = mount(WelcomeModal, { global: { stubs } })
    const text = body().text()
    expect(body().findAll('.welcome-list li')).toHaveLength(2)
    expect(text).toContain('army list builder')   // what is here
    // A first visit is to a SITE: it does not ask to be installed (owner, 2026-10-09) — the offer
    // comes once the player uses it for real (InstallOffer).
    expect(text).toContain('free site')
    expect(text).not.toMatch(/install/i)
    // The account is the intended way to use it, but it must never read as the price of entry:
    // signed out, nothing is locked — the card used to say "no account" and then "if you sign in".
    expect(text).toContain('without an account')
    // Where the reader's data lives — and that signing in SYNCS it rather than merely copying it
    // somewhere. The weaker word undersells the thing people actually want from an account.
    expect(text).toContain('this device')
    expect(text).toMatch(/follow you to your other devices/i)

    await body().find('.welcome-ok').trigger('click')
    expect(w.emitted('close')).toBeTruthy()
    expect(shouldWelcome('/')).toBe(false)        // …and it does not come back
    w.unmount()
  })

  // Following the link is also an answer to "what is this", so it must not leave the card owed.
  it('marks it seen when the reader follows the link instead', async () => {
    const w = mount(WelcomeModal, { global: { stubs } })
    await body().find('.welcome-more').trigger('click')
    expect(shouldWelcome('/')).toBe(false)
    expect(w.emitted('close')).toBeTruthy()
    w.unmount()
  })
})
