import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PatchTextDiff from './PatchTextDiff.vue'

const files = import.meta.glob('../../data/patches/*.json', { eager: true })

// Every text a patch file can show, as the page would pair it.
function texts(item) {
  const out = []
  if (item.change === 'added' && item.to) out.push(['', item.to])
  for (const f of item.fields || []) {
    if (typeof f.to === 'string' && f.to.length > 12 && !['stat', 'invul', 'sizes', 'damaged', 'dp', 'cp', 'forceDisposition'].includes(f.field)) {
      out.push([f.change === 'added' ? '' : f.from || '', f.to])
    }
  }
  return out
}

describe('PatchTextDiff', () => {
  it('marks what went and what came, inside the rule’s own formatting', () => {
    const w = mount(PatchTextDiff, { props: { from: 'Each **hit roll** of 6.', to: 'Each **hit roll** of 6. Those hits are not **critical hits**.' } })
    expect(w.find('strong').text()).toBe('hit roll')
    expect(w.find('ins').text()).toBe('Those')
    expect(w.findAll('ins strong, strong ins').length).toBeGreaterThan(0)
  })

  // Over every text in every generated patch: no markup or diff fence left on the page — a stray
  // "**" from a half-kept bold run was the first thing a reader saw (owner, 2026-10-01).
  it('leaves no raw markup in any patch text', () => {
    const leaks = []
    for (const [file, mod] of Object.entries(files)) {
      for (const item of (mod.default || mod).items) {
        for (const [from, to] of texts(item)) {
          const text = mount(PatchTextDiff, { props: { from, to } }).text()
          if (/\*\*|__|[-]/.test(text)) leaks.push(`${file} ${item.name}: ${text.slice(0, 80)}`)
        }
      }
    }
    expect(leaks).toEqual([])
  }, 120000)
})
