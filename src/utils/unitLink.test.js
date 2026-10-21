import { describe, expect, it } from 'vitest'
import { unitLinkOf } from './unitLink.js'

function clickOn(html, selector, init = {}) {
  document.body.innerHTML = html
  const el = document.querySelector(selector)
  let seen = null
  document.body.addEventListener('click', (e) => { seen = unitLinkOf(e, 'orks') }, { capture: true, once: true })
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...init }))
  return seen
}

describe('unitLinkOf', () => {
  it('reads the unit id off a link to a datasheet of this faction, in either language', () => {
    expect(clickOn('<a href="/factions/orks/datasheets/warboss"><span>Warboss</span></a>', 'span')).toBe('warboss')
    expect(clickOn('<a href="/ru/factions/orks/datasheets/big-mek">Big Mek</a>', 'a')).toBe('big-mek')
  })

  it('leaves alone what should keep navigating', () => {
    // another faction's unit, another page, a new tab, a button inside the link
    expect(clickOn('<a href="/factions/necrons/datasheets/overlord">x</a>', 'a')).toBe(null)
    expect(clickOn('<a href="/factions/orks/datasheets">x</a>', 'a')).toBe(null)
    expect(clickOn('<a href="/factions/orks/datasheets/warboss">x</a>', 'a', { metaKey: true })).toBe(null)
    expect(clickOn('<a href="/factions/orks/datasheets/warboss" target="_blank">x</a>', 'a')).toBe(null)
    expect(clickOn('<a href="/factions/orks/datasheets/warboss"><button>pin</button></a>', 'button')).toBe(null)
  })
})
