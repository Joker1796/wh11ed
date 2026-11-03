// Every step "What next" can ask of the reader has a button that says what it does, in both
// languages: a todo kind nextSteps can return with no `campDo_` label would draw an empty button.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { ui } from '../../../i18n/ui.js'

const src = readFileSync('src/core/dominatus/campaign.js', 'utf8')
const body = src.slice(src.indexOf('export function nextSteps'), src.indexOf('export function likelyDuplicates'))
const todoKinds = [...new Set([...body.matchAll(/kind: '(\w+)', todo: true/g)].map((m) => m[1]))]
// A reward's step is built apart and marked todo where it is pushed.
if (body.includes("kind: 'reward'")) todoKinds.push('reward')

describe('CampNext', () => {
  it('finds the steps it has to label', () => {
    expect(todoKinds).toEqual(expect.arrayContaining(['register', 'location', 'count', 'give', 'play', 'playMore', 'endPhase', 'reward']))
  })
  it.each(['en', 'ru'])('labels every step it can be asked in %s', (loc) => {
    expect(todoKinds.filter((k) => !ui[loc][`campDo_${k}`])).toEqual([])
  })
})
