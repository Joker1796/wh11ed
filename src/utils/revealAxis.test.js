import { describe, it, expect, afterEach } from 'vitest'
import { revealAxis, revealGap } from './revealAxis.js'

// Builds `<div style=parent><span?/><child/></div>` in the document and returns the child.
function place(parentStyle, childTag = 'div', childStyle = '', sibling = true) {
  const parent = document.createElement('div')
  parent.setAttribute('style', parentStyle)
  if (sibling) parent.appendChild(document.createElement('div'))
  const child = document.createElement(childTag)
  child.setAttribute('style', childStyle)
  parent.appendChild(child)
  document.body.appendChild(parent)
  return child
}
afterEach(() => { document.body.innerHTML = '' })

describe('revealAxis', () => {
  it('opens sideways in a row, downwards in a stack, both ways in a row that wraps', () => {
    expect(revealAxis(place('display:flex'))).toBe('x')
    expect(revealAxis(place('display:flex;flex-direction:column'))).toBe('y')
    expect(revealAxis(place('display:flex;flex-wrap:wrap'))).toBe('both')
    expect(revealAxis(place('display:block'))).toBe('y')
    expect(revealAxis(place('display:grid'))).toBe('y')
  })
  it('opens sideways for an inline block among text, whatever the container', () => {
    expect(revealAxis(place('display:block', 'em', 'display:inline'))).toBe('x')
  })
  it('looks through display: contents to the layout that draws', () => {
    const outer = document.createElement('div')
    outer.setAttribute('style', 'display:flex')
    const wrap = document.createElement('div')
    wrap.setAttribute('style', 'display:contents')
    const child = document.createElement('div')
    wrap.appendChild(child)
    outer.appendChild(wrap)
    document.body.appendChild(outer)
    expect(revealAxis(child)).toBe('x')
  })
  it('takes the caller’s word over the reading', () => {
    expect(revealAxis(place('display:flex'), 'y')).toBe('y')
    expect(revealAxis(place('display:block'), 'both')).toBe('both')
  })
})

describe('revealGap', () => {
  it('is the container’s gap on that axis, when there is a sibling to be apart from', () => {
    expect(revealGap(place('display:flex;column-gap:12px;row-gap:4px'), 'x')).toBe(12)
    expect(revealGap(place('display:flex;flex-direction:column;row-gap:4px'), 'y')).toBe(4)
    expect(revealGap(place('display:flex;column-gap:12px', 'div', '', false), 'x')).toBe(0)
    expect(revealGap(place('display:block'), 'y')).toBe(0)
  })
})
