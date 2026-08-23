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
})

describe('WelcomeModal', () => {
  it('states the three things the screen cannot, and closing it is permanent', async () => {
    const w = mount(WelcomeModal, { global: { stubs } })
    const text = body().text()
    expect(body().findAll('.welcome-list li')).toHaveLength(3)
    expect(text).toContain('army list builder')   // what is here
    expect(text).toContain('no signal')           // the installed app goes fully offline
    expect(text).toContain('on this device')      // where the reader's data lives

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
