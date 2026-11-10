import { foldChars } from '../../src/core/shared/foldName.js'
// Read the mandatory prefix of a replacement separately from its selectable list.
// The result uses existing atomic options; no new runtime interpretation is needed.
export function fixedWargearBundles({ text, fullTexts, vocab, readItems, legal }) {
  const clean = s => foldChars(s).replace(/^[◦•■▫▪-]\s*/, '').trim().toLowerCase()
  const head = text.split('\n')[0].trim()
  const match = head.match(/\b(?:replaced with|replaced by|equipped with)\s+(.+?)\s+and\s+(one|two|three|\d+)\s+of the following[^:]*:/i)
  if (!match) return null
  const count = ({ one: 1, two: 2, three: 3 })[match[2].toLowerCase()] || Number(match[2])
  if (!(count >= 1 && count <= 3)) throw Error(`Unsupported fixed-prefix quantity: ${head}`)
  const prefix = readItems(match[1], vocab)
  if (!prefix.length) throw Error(`Unresolved mandatory wargear: ${head}`)
  const expanded = [text, ...fullTexts].find(t => clean(t.split('\n')[0]) === clean(head) && t.split('\n').some(l => /^[◦•■▫▪-]\s*\d/.test(l.trim())))
  if (!expanded) throw Error(`Missing alternatives for mandatory wargear: ${head}`)
  const bullets = expanded.split('\n').map(l => l.trim()).filter(l => /^[◦•■▫▪-]\s*\d/.test(l))
  const choices = bullets.map(line => readItems(line.replace(/^[◦•■▫▪-]\s*/, ''), vocab))
  if (choices.some(c => !c.length)) throw Error(`Unresolved alternative: ${head}`)
  const add = (a, b) => {
    const items = new Map(a)
    for (const [id, n] of b) items.set(id, (items.get(id) || 0) + n)
    return [...items]
  }
  const candidates = []
  function choose(start, left, items) {
    if (!left) { candidates.push(items); return }
    for (let i = start; i < choices.length; i++) choose(i, left - 1, add(items, choices[i]))
  }
  choose(0, count, prefix)
  const backed = candidates.filter(set => legal.some(loadout => set.every(([id, n]) => (loadout.get(id) || 0) >= n)))
  if (!backed.length) throw Error(`No complete legal replacement: ${head}`)
  const covered = new Set(backed.flatMap(set => set.map(([id]) => id)))
  if (vocab.some(v => !covered.has(v.uuid))) throw Error(`Uncovered fixed-prefix option: ${head}`)
  return backed
}
