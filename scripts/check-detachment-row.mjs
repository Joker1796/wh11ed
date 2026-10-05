#!/usr/bin/env node
// A detachment's card in the pickers (DetachmentOption.vue) carries a second line: its tag on the
// left, its Force Dispositions on the right. On a narrow card that line wrapped — the tag alone,
// the dispositions on a third line (owner's screenshot, 2026-10-04) — so below a container width
// set in CSS the tag moves up under the name and the disposition chips step down a size. This
// keeps that width measured: every faction's detachment picker is opened and
//   - each card's second line, laid out the wide way at 1px above the breakpoint, must stay one
//     line (otherwise it wraps just above the breakpoint);
//   - at a 320px phone, in the narrow way, the chips must stay on one line and nothing in a card
//     may run past its edge.
// Tags and dispositions are English in both locales, so RU alone is checked.
//
// Needs a fresh `dist/` (`npm run build`) and an installed Google Chrome, like `npm run a11y`.
// Usage: npm run detachment-row
/* global document, requestAnimationFrame */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { preview } from 'vite'

const ROOT = join(import.meta.dirname, '..')
const css = readFileSync(join(ROOT, 'src/components/DetachmentOption.vue'), 'utf8')
const m = css.match(/@container det \(max-width: (\d+)px\) \{[^@]*?\.head-tag \{ display: block;/)
if (!m) {
  console.error('detachment-row: no `@container det (max-width: …)` block shows .head-tag — update this gate')
  process.exit(1)
}
const bp = Number(m[1])

const server = await preview({ root: ROOT, preview: { port: 4185, strictPort: false }, logLevel: 'silent' })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
const browser = await chromium.launch({ channel: 'chrome' })
const ctx = await browser.newContext({ viewport: { width: 700, height: 900 }, deviceScaleFactor: 1 })
await ctx.addInitScript(() => {
  try { localStorage.setItem('wh11ed-welcome-seen', '1') } catch { /* storage blocked: nothing measured moves */ }
})
const page = await ctx.newPage()

// The wide way at a card 1px above the breakpoint: its second line must stay one line. Laid out by
// the browser, not summed from the pieces' widths — a sum came out 19px short of where the line
// really wraps. The container is switched off so the query cannot step in, and each card is sized
// directly: the dialog's width is not a straight function of the window's.
const wideWraps = (width) => page.evaluate(async (w) => {
  const style = document.createElement('style')
  style.textContent = '.det { container-type: normal !important; }'
  document.head.appendChild(style)
  const cards = [...document.querySelectorAll('.modal .det:not(.compact)')]
  for (const d of cards) { d.style.flex = 'none'; d.style.width = `${w}px` }
  await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)))
  const out = []
  let n = 0
  for (const d of cards) {
    const kids = [...(d.querySelector('.det-foot')?.children || [])].filter((k) => k.getBoundingClientRect().width)
    if (!kids.length) continue
    n++
    const first = kids[0].getBoundingClientRect()
    const chips = [...d.querySelectorAll('.det-fds .tone-chip')].map((c) => c.getBoundingClientRect().top)
    if (kids.some((k) => k.getBoundingClientRect().top >= first.bottom - 1) || (chips.length > 1 && Math.max(...chips) - Math.min(...chips) > 2)) {
      out.push(d.querySelector('.det-name').textContent)
    }
  }
  for (const d of cards) { d.style.flex = ''; d.style.width = '' }
  style.remove()
  return { n, out }
}, width)

// At a narrow card: chips on one line, nothing past the card's edge.
const broken = () => page.evaluate(() => {
  const out = []
  for (const d of document.querySelectorAll('.modal .det:not(.compact)')) {
    const name = d.querySelector('.det-name').textContent
    const chips = [...d.querySelectorAll('.det-fds .tone-chip')].map((c) => c.getBoundingClientRect().top)
    if (chips.length > 1 && Math.max(...chips) - Math.min(...chips) > 2) out.push(`${name}: dispositions wrap`)
    const r = d.getBoundingClientRect()
    for (const el of d.querySelectorAll('.det-name, .det-unique, .det-dp, .tone-chip')) {
      const e = el.getBoundingClientRect()
      if (e.width && e.right > r.right + 0.5) { out.push(`${name}: ${el.textContent.trim()} runs past the card`); break }
    }
  }
  return out
})

const open = async (i) => {
  await page.goto(base + '/ru/roster/new')
  await page.locator('button.ch-pick').first().click()
  const facs = page.locator('.modal button.fac-link')
  await facs.first().waitFor()
  const count = await facs.count()
  const name = (await facs.nth(i).innerText()).trim()
  await facs.nth(i).click()
  // The second field of the form is the detachments'; a faction without any leaves it disabled.
  const pick = page.locator('button.ch-pick').nth(1)
  await page.locator('.modal').waitFor({ state: 'detached' })
  if (await pick.isDisabled()) return { count, name, ok: false }
  await pick.click()
  if (!(await page.locator('.modal .det').first().waitFor({ timeout: 5000 }).then(() => true).catch(() => false))) return { count, name, ok: false }
  await page.evaluate(() => document.fonts.ready)
  return { count, name, ok: true }
}

const over = []
const faults = []
let rows = 0
for (let i = 0, n = 1; i < n; i++) {
  await page.setViewportSize({ width: 700, height: 900 })
  const f = await open(i)
  n = f.count
  if (!f.ok) continue
  const w = await wideWraps(bp + 1)
  rows += w.n
  for (const name of w.out) over.push(`${f.name} — ${name}`)
  await page.setViewportSize({ width: 320, height: 900 })
  for (const b of await broken()) faults.push(`${f.name} — ${b}`)
}
await browser.close()
await server.close()

console.log(`detachment-row: ${rows} cards with a second line, one line each at a ${bp + 1}px card; tag moves up at ${bp}px and below`)
if (over.length) {
  console.error(`✗ ${over.length} card(s) wrap their second line at ${bp + 1}px — raise the breakpoint in DetachmentOption.vue:`)
  for (const o of over.slice(0, 10)) console.error(`  ${o}`)
}
if (faults.length) {
  console.error(`✗ ${faults.length} card(s) broken at a 320px phone:`)
  for (const f of faults.slice(0, 15)) console.error(`  ${f}`)
}
process.exit(over.length || faults.length ? 1 : 0)
