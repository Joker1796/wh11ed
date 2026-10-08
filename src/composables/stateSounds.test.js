import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

vi.mock('./uiSound.js', () => ({ playSound: vi.fn() }))
const { playSound } = await import('./uiSound.js')
const { installStateSounds } = await import('./stateSounds.js')

let root
beforeEach(() => {
  playSound.mockClear()
  root = document.createElement('div')
  root.innerHTML = `
    <button data-press-sound="toggle" aria-pressed="false" id="pin"></button>
    <button data-press-sound="toggle" aria-pressed="true" id="star" disabled></button>
    <label><input type="checkbox" id="box"> Track CP</label>
    <div class="seg"><button class="on" id="a">A</button><button id="b">B</button></div>
    <div role="tablist"><button role="tab" aria-selected="true" id="t1"></button><button role="tab" aria-selected="false" id="t2"></button></div>
    <button aria-expanded="false" id="fold"></button>
    <button aria-expanded="false" aria-haspopup="menu" id="gear"></button>`
  document.body.appendChild(root)
  installStateSounds(root)
})
afterEach(() => root.remove())
const heard = () => playSound.mock.calls.map((c) => c[0])

describe('stateSounds', () => {
  it('sounds a mark by its new state, even when the tap redraws it', () => {
    const pin = root.querySelector('#pin')
    pin.addEventListener('click', () => pin.replaceWith(Object.assign(pin.cloneNode(), { id: 'pin2' })))
    pin.click()
    root.querySelector('#star').click() // disabled: nothing happens
    expect(heard()).toEqual(['toggle-on'])
  })

  it('sounds a checkbox by its new state', () => {
    const box = root.querySelector('#box')
    box.click(); box.click()
    expect(heard()).toEqual(['toggle-on', 'toggle-off'])
  })

  it('slides a segment or a tab only when the pick moves', () => {
    root.querySelector('#a').click()
    root.querySelector('#b').click()
    root.querySelector('#t1').click()
    root.querySelector('#t2').click()
    expect(heard()).toEqual(['seg', 'seg'])
  })

  it('slides a fold both ways, and leaves a menu trigger to the press', () => {
    root.querySelector('#fold').click()
    root.querySelector('#fold').click()
    root.querySelector('#gear').click()
    expect(heard()).toEqual(['seg', 'seg'])
  })
})
