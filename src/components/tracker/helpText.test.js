import { describe, it, expect } from 'vitest'
import { helpBlocks } from './helpText.js'
import { ui } from '../../i18n/ui.js'

describe('help text markup', () => {
  it('reads a lead, a list, an off line and key words', () => {
    expect(helpBlocks('Lead **x**\n▪ one\n▪ two\nplain\n⊘ Off: <b>')).toEqual([
      { t: 'lead', html: 'Lead <strong>x</strong>' },
      { t: 'ul', items: ['one', 'two'] },
      { t: 'p', html: 'plain' },
      { t: 'off', html: 'Off: &lt;b&gt;' },
    ])
  })
})

// The tracker's helps are set one way (owner, 2026-10-15): a lead line, points, an off line —
// short, and the two languages the same shape, so a point added in one is added in both.
const HELPS = Object.keys(ui.en).filter((k) => /^trackerHelp[A-Z]/.test(k))
  .concat(['trackerRoleHelp', 'trackerForceTypeHelp', 'trackerCpHelp', 'trackerCpHelpManual', 'trackerCpHelpHand', 'trackerCpHelpManualHand', 'trackerRoundsHelp', 'trackerScoreHelpText'])
describe('tracker help texts', () => {
  it.each(HELPS)('%s: same shape in EN and RU, short', (k) => {
    const shape = (t) => helpBlocks(t).map((b) => (b.t === 'ul' ? `ul${b.items.length}` : b.t)).join(' ')
    expect(shape(ui.ru[k]), k).toBe(shape(ui.en[k]))
    expect(ui.ru[k].length, k).toBeLessThanOrEqual(k === 'trackerForceTypeHelp' ? 460 : 300)
    expect((ui.ru[k].match(/\*\*/g) || []).length % 2, k).toBe(0)
    // The lead is one plain sentence (owner, 2026-10-15: "hard to read"): what qualifies it goes
    // into a point, not into brackets inside it.
    for (const loc of ['en', 'ru']) expect(ui[loc][k].split('\n')[0], `${loc} ${k}`).not.toMatch(/[()]/)
  })
})
