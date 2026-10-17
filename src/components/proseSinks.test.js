import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Rule prose has lines: `▪` lists, numbered steps, paragraphs. `renderInline` reads none of them —
// it is for one line — and a template's plain text collapses a line break into a space, so a text
// that has them runs together on screen. That is what a player saw in the builder's enhancement
// window (Veil of Darkness, 2026-10-17), and the sweep that followed found seven more places doing
// the same: a Leader's abilities on a unit's card, wargear abilities by a weapon, a printed
// stratagem's effect, a multi-model loadout, a Core Rules example, the layouts' key, multi-paragraph
// lore. DatasheetCard had been fixed alone in 2026 (dsRichText) and the rest never looked at.
//
// Two halves. The DATA: a string with a line break sits only in a field named below, so a new
// field that grows lines is a decision, not an accident. The CODE: a field that carries lines is
// rendered by renderRichText / renderParagraphs / RuleBody — never by an inline renderer, and as
// plain text only inside `.lines` (white-space: pre-line).

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Every field a line break may sit in, and where it is rendered.
const MULTILINE = {
  body: 'RuleBody, or renderRichText outside it',
  splitBody: 'RuleBody',
  splitBodies: 'RuleBody',
  effect: 'StratCard renderField, the print sheet renderRichText',
  when: 'StratCard renderField, the print sheet renderRichText',
  text: 'a datasheet ability / rule — renderRichText',
  fullText: 'reference.js — RuleBody',
  options: 'a datasheet option line — .ds-option is pre-line',
  loadout: 'renderRichText',
  transport: 'renderRichText',
  note: 'renderParagraphs',
  example: 'renderParagraphs',
  keyNote: 'renderParagraphs',
  flavor: 'plain text inside .lines',
  desc: 'battleRound.js phase description — RuleBody',
  intro: 'eventCompanion / intro chapter intro — rendered per paragraph',
  missions: 'intro.js — rendered per paragraph',
  a: 'a FAQ answer — FaqItem renderRichText',
  entry: 'a map keyed by name: the RU overlay\'s ability texts (renderRichText), a rule\'s extras (RuleExtras)',
  texts: 'roster wargear texts — read, not shown as prose',
  default: 'roster/ru/texts.js — read, not shown as prose',
}
// The fields an inline renderer must never be handed (the rule-prose ones of the list above).
const PROSE = ['body', 'effect', 'when', 'text', 'loadout', 'transport', 'note', 'example', 'keyNote', 'flavor']

describe('prose with lines is rendered with its lines', () => {
  it('keeps line breaks to the fields that are rendered for them', async () => {
    const files = import.meta.glob(['../data/**/*.js', '!../data/**/*.test.js'], { eager: true })
    const stray = new Set()
    const walk = (v, key, file) => {
      if (typeof v === 'string') {
        // A map keyed by NAME (the RU overlay's ability texts by English ability name, a rule's
        // extras by detachment) holds texts.
        const field = /^[a-z][A-Za-z]*$/.test(key) ? key : 'entry'
        if (v.trim().includes('\n') && !MULTILINE[field]) stray.add(`${file.replace('../data/', '')} .${key}`)
      } else if (Array.isArray(v)) v.forEach((x) => walk(x, key, file))
      else if (v && typeof v === 'object') {
        // `{ en, ru }` is one field in two languages: it is the field it sits under.
        for (const [k, x] of Object.entries(v)) walk(x, k === 'en' || k === 'ru' ? key : k, file)
        // Rendered on one line on purpose (INLINE below), so held to one line here.
        if (v.isGroupLabel && String(v.body || '').includes('\n')) stray.add(`${file.replace('../data/', '')} group label ${v.id}`)
      }
    }
    for (const [file, mod] of Object.entries(files)) for (const [k, v] of Object.entries(mod)) walk(v, k === 'default' ? '' : k, file)
    expect([...stray].sort()).toEqual([])
  }, 120000)

  const sources = []
  const collect = (dir) => {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, f.name)
      if (f.isDirectory()) collect(p)
      else if (/\.(vue|js)$/.test(f.name) && !f.name.includes('.test.')) sources.push(p)
    }
  }
  collect(path.join(ROOT, 'components'))
  collect(path.join(ROOT, 'views'))

  // What reads one line on purpose, by file and call, with the reason.
  const INLINE = {
    'components/RuleBody.vue': 'the block parser itself: each call is one line it has already split off',
    'components/core/ChapterReference.vue: renderInline(block.text)': 'a block parseBody split off — one line',
    'components/GroupLabelBlock.vue: renderInline(props.body)': 'a group label — held to one line by the data half above',
    'views/ChangelogView.vue: renderInline(note)': 'a changelog item is one sentence-list on one line by convention',
  }
  it('never hands a field with lines to an inline renderer', () => {
    const call = new RegExp(`(?<!function )\\b(?:renderInline|dsText|inlineText)\\(\\s*[\\w.?]*\\b(${PROSE.join('|')})\\s*\\)`, 'g')
    const bad = []
    for (const p of sources) {
      const s = fs.readFileSync(p, 'utf8')
      const file = path.relative(ROOT, p)
      for (const m of s.matchAll(call)) if (!INLINE[file] && !INLINE[`${file}: ${m[0]}`]) bad.push(`${file}: ${m[0]}`)
    }
    expect(bad).toEqual([])
  })

  it('shows one as plain text only where its lines are kept', () => {
    // Only lore is shown as plain text: every other prose field goes through a renderer, and a
    // UI string named `text` or `note` (a toast, a sync line) is not rule prose.
    const mustache = /\{\{\s*[\w.?]*\bflavor\s*\}\}/g
    const bad = []
    for (const p of sources.filter((x) => x.endsWith('.vue'))) {
      const s = fs.readFileSync(p, 'utf8')
      for (const m of s.matchAll(mustache)) {
        const open = s.slice(s.lastIndexOf('<', m.index), s.indexOf('>', s.lastIndexOf('<', m.index)) + 1)
        if (!/\bclass="[^"]*\blines\b/.test(open)) bad.push(`${path.relative(ROOT, p)}: ${m[0]} in ${open.slice(0, 60)}`)
      }
    }
    expect(bad).toEqual([])
  })
})
