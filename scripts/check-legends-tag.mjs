#!/usr/bin/env node
// The Legends badge sits in the statline's own spare space, right of OC (DatasheetCard.vue,
// .ds-legends-tag). As the card narrows it takes two steps, each at a container width set in CSS:
// it turns on its side and stays on the stat row, then it steps down a row. Those widths were once
// picked by eye on one sheet on one page — and on a ~360px phone the roster builder's unit modal
// kept the badge upright on the stat row, which ran past the screen, and the whole dialog scrolled
// sideways (2026-10-04, player screenshot of Anrakyr the Traveller). The fix is thresholds
// MEASURED, and this keeps them measured: every Legends sheet is rendered, EN and RU, and the width
// its stat row really needs in each layout is compared with the breakpoint the stylesheet declares.
//
// Why the comparison holds for every host: the breakpoints ask the card's shell (`dscard`), and
// the row gets the shell minus the card's tight side padding at worst — a host may bleed the card
// wider (the page and the modal do on a phone), never narrower. So a layout fits everywhere it is
// used as long as   need + 2 × tight padding ≤ the breakpoint below which it gives way.
//
// Then each sheet is looked at in the two narrow layouts, at the narrowest and widest page width
// each one covers: the badge must touch nothing on its row (the one-line invulnerable-save label
// ran under it, 2026-10-04) and the page must not scroll sideways (a long asterisk note did).
//
// Needs a fresh `dist/` (`npm run build`) and an installed Google Chrome, like `npm run a11y`.
// Usage: npm run legends-tag [-- --verbose]
/* global document, getComputedStyle -- the page.evaluate callbacks run in the browser */
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { preview } from 'vite'

const ROOT = join(import.meta.dirname, '..')
const verbose = process.argv.includes('--verbose')

// The breakpoints, read from the stylesheet itself — read rather than copied, so tuning the CSS
// cannot leave this gate checking old numbers. `side`: the query that turns the badge on its side;
// `down`: the one that moves it to row 2.
const css = readFileSync(join(ROOT, 'src/components/DatasheetCard.vue'), 'utf8')
const blocks = [...css.matchAll(/@container dscard \(max-width: (\d+)px\) \{([^}]*\{[^}]*\})*/g)]
const bpOf = (re, what) => {
  const m = blocks.find((b) => re.test(b[0]))
  if (!m) {
    console.error(`legends-tag: no \`@container dscard (max-width: …)\` block ${what} — update this gate`)
    process.exit(1)
  }
  return Number(m[1])
}
const side = bpOf(/\n\s*\.ds-legends-tag \{\s*writing-mode: vertical-rl;/, 'turns .ds-legends-tag on its side')
const down = bpOf(/\n\s*\.ds-legends-tag \{ grid-row: 2;/, 'moves .ds-legends-tag to row 2')

// Every Legends sheet a faction file carries (the Chapter files fold Space Marines' in, which are
// checked once, under space-marines).
const dir = join(ROOT, 'src/data/datasheets')
const sheets = []
for (const file of readdirSync(dir).filter((f) => f.endsWith('.js') && f !== 'index.js' && !f.endsWith('.test.js'))) {
  const slug = file.replace(/\.js$/, '')
  const { default: list } = await import(join(dir, file))
  for (const s of list || []) if (s.legends) sheets.push({ slug, id: s.id })
}

// The page's shell is the window less 16px.
const PAGE_GUTTER = 16
const WIDE = 400 // tight (≤480px) card, badge upright on the stat row
const SIDEWAYS = [down + PAGE_GUTTER + 1, side + PAGE_GUTTER] // badge on its side, narrowest and widest
const STEPPED = [320, down + PAGE_GUTTER] // badge a row down, narrowest phone and widest

const server = await preview({ root: ROOT, preview: { port: 4179, strictPort: false }, logLevel: 'silent' })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
const browser = await chromium.launch({ channel: 'chrome' })
const ctx = await browser.newContext({ viewport: { width: WIDE, height: 844 }, deviceScaleFactor: 1 })
await ctx.addInitScript(() => {
  try { localStorage.setItem('wh11ed-welcome-seen', '1') } catch { /* storage blocked: the card shows, nothing measured moves */ }
})
const page = await ctx.newPage()

// What the stat row needs with the badge on it: six stats, a gap, the badge, the tight side
// padding. Summed rather than read off the badge's right edge — the badge is pushed to the row's
// end, so its edge measures the room there is, not the room it takes.
const measure = () => page.evaluate(() => {
  const t = document.querySelector('.ds-legends-tag')
  const row = t.closest('.ds-stats')
  const stats = row.querySelectorAll('.ds-stat:not(.ds-inv-box)')
  const first = stats[0].getBoundingClientRect()
  const last = stats[stats.length - 1].getBoundingClientRect()
  const tag = t.getBoundingClientRect()
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
  const padX = parseFloat(getComputedStyle(row.closest('.ds-card')).getPropertyValue('--ds-tight-pad-x')) * rem
  const gap = parseFloat(getComputedStyle(row).columnGap) || 0
  return {
    need: Math.ceil(last.right - first.left + gap + tag.width + 2 * padX),
    // On the stat row: the badge's box overlaps the boxes' band vertically.
    onRow: tag.top < last.bottom && tag.bottom > first.top,
  }
})

// Does the badge touch anything on its row, or does the page scroll sideways?
const broken = () => page.evaluate(() => {
  const el = document.querySelector('.ds-legends-tag')
  const t = el.getBoundingClientRect()
  const row = el.closest('.ds-stats')
  for (const o of row.querySelectorAll('.ds-stat, .ds-inv-band, .ds-inv-note, .ds-prof-name')) {
    const r = o.getBoundingClientRect()
    if (r.width && r.left < t.right - 0.5 && t.left < r.right - 0.5 && r.top < t.bottom - 0.5 && t.top < r.bottom - 0.5) {
      return 'badge over .' + (o.className.split(' ').find((c) => c.startsWith('ds-')) || o.className)
    }
  }
  if (document.documentElement.scrollWidth > document.documentElement.clientWidth + 1) return 'page scrolls sideways'
  return null
})

const upright = []
const sideways = []
const faults = []
for (const locale of ['', '/ru']) {
  for (const s of sheets) {
    const path = `${locale}/factions/${s.slug}/datasheets/${s.id}`
    await page.setViewportSize({ width: WIDE, height: 844 })
    await page.goto(base + path)
    const tag = await page.waitForSelector('.ds-legends-tag', { timeout: 10000 }).catch(() => null)
    if (!tag) {
      faults.push({ path, width: WIDE, what: 'no Legends badge rendered' })
      continue
    }
    await page.evaluate(() => document.fonts.ready)

    const up = await measure()
    if (!up.onRow) faults.push({ path, width: WIDE, what: 'badge is not on the stat row — this gate measures the wrong layout' })
    else upright.push({ path, need: up.need })

    for (const width of SIDEWAYS) {
      await page.setViewportSize({ width, height: 844 })
      const m = await measure()
      if (!m.onRow) faults.push({ path, width, what: 'badge on its side has left the stat row' })
      else if (width === SIDEWAYS[0]) sideways.push({ path, need: m.need })
      const b = await broken()
      if (b) faults.push({ path, width, what: b })
    }
    for (const width of STEPPED) {
      await page.setViewportSize({ width, height: 844 })
      const b = await broken()
      if (b) faults.push({ path, width, what: b })
    }
    if (verbose) console.log(`  ${path} — upright ${up.need}px, on its side ${sideways.at(-1)?.need}px`)
  }
}
await browser.close()
await server.close()

const report = (list, bp, layout) => {
  list.sort((a, b) => b.need - a.need)
  const over = list.filter((r) => r.need > bp)
  console.log(`legends-tag: ${layout} — ${list.length} renders, widest needs ${list[0]?.need}px (${list[0]?.path}), gives way at ${bp}px`)
  if (over.length) {
    console.error(`✗ ${over.length} render(s) need more than ${bp}px ${layout} — the stat row runs off a container that narrow:`)
    for (const r of over.slice(0, 10)) console.error(`  ${r.path} — ${r.need}px`)
    console.error(`  Raise that breakpoint in DatasheetCard.vue.`)
  }
  return over.length
}
let bad = report(upright, side, 'badge upright')
bad += report(sideways, down, 'badge on its side')
if (faults.length) {
  console.error(`✗ ${faults.length} broken render(s):`)
  for (const f of faults.slice(0, 15)) console.error(`  ${f.path} @${f.width}px — ${f.what}`)
}
process.exit(bad || faults.length ? 1 : 0)
