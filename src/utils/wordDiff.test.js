import { describe, it, expect } from 'vitest'
import { wordDiff } from './wordDiff.js'

describe('wordDiff', () => {
  it('keeps what stayed, strikes what went and marks what came', () => {
    expect(wordDiff('re-roll the Hit roll', 'add 1 to the Hit roll')).toEqual([
      { t: 'del', s: 're-roll' },
      { t: 'ins', s: 'add 1 to' },
      { t: 'same', s: 'the Hit roll' },
    ])
  })

  it('reads a new text and a removed one whole', () => {
    expect(wordDiff('', 'New rule.')).toEqual([{ t: 'ins', s: 'New rule.' }])
    expect(wordDiff('Old rule.', '')).toEqual([{ t: 'del', s: 'Old rule.' }])
  })

  it('gives up on word-matching two very long texts and shows them as replaced', () => {
    const long = (w) => Array.from({ length: 700 }, () => w).join(' ')
    expect(wordDiff(long('a'), long('b')).map((x) => x.t)).toEqual(['del', 'ins'])
  })

  it('keeps a text’s line breaks as words of their own', () => {
    expect(wordDiff('Effect: shoot.\n• Hit on 6.', 'Effect: shoot.\n• Hit on 6. Not critical.')).toEqual([
      { t: 'same', s: 'Effect: shoot. \n • Hit on 6.' },
      { t: 'ins', s: 'Not critical.' },
    ])
  })
})
