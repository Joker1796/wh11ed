#!/usr/bin/env node
// A datasheet's weapons stay a TABLE on a phone (DatasheetCard.vue, the ≤560px block) and turn into
// stacked cards only below a container width set in CSS. That width was 340px, picked by eye, and a
// 320-356px phone — or the roster modal on a 360px one — got the cards a few pixels short of a
// table that fitted (2026-10-04, owner's two screenshots of Vargard Obyron). Measured over all
// 1283 sheets the table fits down to ~300px, so that is where it gives up now, and this keeps it
// true: every sheet with weapons is rendered, EN and RU, at the narrowest width that still draws
// the table — 1px above the breakpoint, read from the stylesheet — and checked for:
//   - the table wider than its block (the page or dialog would scroll sideways),
//   - a stat value wrapping onto a second line ("D6+3" over two lines reads as two numbers),
//   - a word of a weapon's name wider than the name column (it would break mid-word),
//   - a name taking more than MAX_LINES lines.
//
// Why 1px above the breakpoint is the worst case: the breakpoint asks the card's shell, the table
// gets at least the shell (a host may bleed the card wider, never narrower), and narrower only
// ever squeezes more — so a sheet that passes here passes at every width that draws a table.
//
// Needs a fresh `dist/` (`npm run build`) and an installed Google Chrome, like `npm run a11y`.
// Usage: npm run weapon-table [-- --verbose] [--only=<faction slug>]
/* global document, getComputedStyle, NodeFilter */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { preview } from 'vite'

const ROOT = join(import.meta.dirname, '..')
const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')))
const verbose = 'verbose' in args
const MAX_LINES = 3

// The breakpoint: the top-level container query that dissolves the name cell into the card grid.
const css = readFileSync(join(ROOT, 'src/components/DatasheetCard.vue'), 'utf8')
const block = [...css.matchAll(/^@container dscard \(max-width: (\d+)px\) \{\n([\s\S]*?)^\}$/gm)]
  .find((m) => m[2].includes('.ds-weapons td.wname { display: contents; }'))
if (!block) {
  console.error('weapon-table: no `@container dscard (max-width: …)` block turns the weapons table into cards — update this gate')
  process.exit(1)
}
const breakpoint = Number(block[1])
const PAGE_GUTTER = 16 // the page's shell is the window less 16px
const width = breakpoint + 1 + PAGE_GUTTER

const dir = join(ROOT, 'src/data/datasheets')
const sheets = []
for (const file of readdirSync(dir).filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js'))) {
  const slug = file.replace(/\.js$/, '')
  if (args.only && args.only !== slug) continue
  const { default: list } = await import(join(dir, file))
  for (const s of list || []) if (s.ranged?.length || s.melee?.length) sheets.push({ slug, id: s.id })
}

const server = await preview({ root: ROOT, preview: { port: 4183, strictPort: false }, logLevel: 'silent' })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
const browser = await chromium.launch({ channel: 'chrome' })
const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 })
await ctx.addInitScript(() => {
  try { localStorage.setItem('wh11ed-welcome-seen', '1') } catch { /* storage blocked: the card shows, nothing measured moves */ }
})
const page = await ctx.newPage()

const faults = []
let names = 0
let twoLine = 0
for (const locale of ['', '/ru']) {
  for (const s of sheets) {
    const path = `${locale}/factions/${s.slug}/datasheets/${s.id}`
    await page.goto(base + path)
    if (!(await page.waitForSelector('.ds-weapons', { timeout: 10000 }).catch(() => null))) {
      faults.push({ path, what: 'no weapons table rendered' })
      continue
    }
    await page.evaluate(() => document.fonts.ready)
    const m = await page.evaluate((max) => {
      // Lines a piece of text occupies: the distinct vertical centres of its text boxes — a cell's
      // own height is the row's, shared with its neighbours, so it cannot be used.
      const linesOf = (el) => {
        const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
        const ys = []
        for (let n; (n = tw.nextNode());) {
          if (!n.textContent.trim()) continue
          const r = document.createRange()
          r.selectNodeContents(n)
          for (const x of r.getClientRects()) if (x.width > 0.5) ys.push((x.top + x.bottom) / 2)
        }
        ys.sort((a, b) => a - b)
        let c = 0
        let last = -1e9
        for (const y of ys) if (y - last > 6) { c++; last = y }
        return c
      }
      const shell = document.querySelector('.ds-shell').clientWidth
      const cv = document.createElement('canvas').getContext('2d')
      const out = { shell, cards: false, faults: [], names: 0, twoLine: 0 }
      for (const w of document.querySelectorAll('.ds-weapons')) {
        const t = w.querySelector('table')
        if (getComputedStyle(t).display !== 'table') out.cards = true
        const tr = t.getBoundingClientRect()
        const wr = w.getBoundingClientRect()
        if (tr.right > wr.right + 1 || tr.left < wr.left - 1) out.faults.push(`table ${Math.round(tr.width)}px in a ${Math.round(wr.width)}px block`)
        for (const td of t.querySelectorAll('tbody td:not(.wname)')) {
          if (linesOf(td) > 1) out.faults.push(`"${td.innerText.trim()}" wraps`)
        }
        for (const el of t.querySelectorAll('.wname-text')) {
          if (!el.offsetParent) continue
          const text = el.innerText.trim()
          const cs = getComputedStyle(el)
          cv.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`
          const col = el.getBoundingClientRect().width
          const word = text.split(/\s+/).find((x) => cv.measureText(x).width > col + 0.5)
          if (word) out.faults.push(`"${word}" is wider than the name column (${Math.round(col)}px) and breaks`)
          const lines = linesOf(el)
          out.names++
          if (lines === 2) out.twoLine++
          if (lines > max) out.faults.push(`"${text}" takes ${lines} lines`)
        }
      }
      return out
    }, MAX_LINES)
    if (m.cards) {
      faults.push({ path, what: `drawn as cards at a ${m.shell}px card — this gate measures the wrong layout` })
      continue
    }
    for (const f of m.faults) faults.push({ path, what: f })
    names += m.names
    twoLine += m.twoLine
    if (verbose) console.log(`  ${path} — ${m.names} names, ${m.faults.length} fault(s)`)
  }
}
await browser.close()
await server.close()

console.log(
  `weapon-table: ${sheets.length * 2} sheet renders at ${width}px (card ${breakpoint + 1}px, 1px above the ${breakpoint}px breakpoint) — ` +
  `${names} weapon names, ${twoLine} on two lines`,
)
if (faults.length) {
  console.error(`✗ ${faults.length} fault(s) — fix the table, or raise the breakpoint in DatasheetCard.vue:`)
  for (const f of faults.slice(0, 20)) console.error(`  ${f.path} — ${f.what}`)
}
process.exit(faults.length ? 1 : 0)
