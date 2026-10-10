// Walks the tutorial's chapters on a phone and measures each step's card against its light: a card
// may cover the tail of a light taller than the room it leaves, never its head (the top 100px — the
// button, the tab row a step names), and never any of a light that fits. Born of Misha's note
// (2026-10-10): the CP step's card lay over the very button it was about.
//
// Needs a running dev stand of this branch with the seed generated (npm run stand:seed):
//   node scripts/tour-overlap.mjs [width] [height] [shots dir] [base url]
// Prints one line per step, ✗ for an overlap (a screenshot of it lands in the shots dir).
/* global document, innerHeight -- the page.evaluate callbacks run in the browser */
import { chromium } from 'playwright-core'
const BASE = process.argv[5] || 'http://localhost:5175'
const W = Number(process.argv[2] || 390), H = Number(process.argv[3] || 800)
const OUT = process.argv[4] || '/tmp'
const b = await chromium.launch({ channel: 'chrome' })
const ctx = await b.newContext({ viewport: { width: W, height: H }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
await ctx.addInitScript(() => { if (sessionStorage.getItem('s')) return; sessionStorage.setItem('s', '1')
  localStorage.setItem('locale', 'ru'); localStorage.setItem('wh11ed-welcome-seen', '1'); localStorage.setItem('wh11ed-install-offer', 'later'); localStorage.setItem('wh11ed-last-seen-version', '9.9.9') })
const p = await ctx.newPage()
const errs = []; p.on('pageerror', (e) => errs.push(e.message)); 
const report = []; let shot = 0
async function walk(tag) {
  for (let n = 0; n < 40; n++) {
    try { await p.waitForSelector('.tour-card:not(.waiting)', { timeout: n ? 2500 : 6000 }) } catch { return }
    await p.waitForTimeout(700)
    const m = await p.evaluate(() => {
      const c = document.querySelector('.tour-card').getBoundingClientRect()
      const h = document.querySelector('.tour-hole').getBoundingClientRect()
      const ix = Math.max(0, Math.min(c.right, h.right) - Math.max(c.left, h.left))
      const iy = Math.max(0, Math.min(c.bottom, h.bottom) - Math.max(c.top, h.top))
      const t = document.querySelector('.tour-title')?.textContent; const k = document.querySelector('.tour-count')?.textContent
      if (h.height < 8 || h.width < 8) return { t, k, overlap: 0, oy: 0, nolight: true }
      // A light taller than the sheet's room may lose its tail, never its head (its top 100px).
      const bar = document.querySelector('.navbar')?.offsetHeight || 0
      const tall = h.height > innerHeight - c.height - 24 - bar - 12
      const headY = Math.max(0, Math.min(c.bottom, h.top + 100) - Math.max(c.top, h.top))
      if (tall) return { t, k, overlap: 0, oy: Math.round(headY), tall: true, hole: [Math.round(h.top), Math.round(h.bottom)], card: [Math.round(c.top), Math.round(c.bottom)] }
      return { t, k, overlap: Math.round(ix * iy), oy: Math.round(iy), hole: [Math.round(h.top), Math.round(h.bottom)], card: [Math.round(c.top), Math.round(c.bottom)], holeH: Math.round(h.height) }
    })
    report.push({ tag, ...m })
    if (m.oy > 2) await p.screenshot({ path: `${OUT}/ov-${tag}-${++shot}.png` })
    const next = p.locator('.tour-actions .btn-primary')
    await next.click(); await p.waitForTimeout(500)
  }
}
await p.goto(BASE + '/_seed.html'); await p.waitForTimeout(3000)
try {
// ── Tracker: home → setup → game
await p.goto(BASE + '/ru/tracker?tour=reset'); await walk('home')
await p.locator('button', { hasText: 'Новая игра' }).first().click(); await p.waitForTimeout(1500); await walk('setup-1')
// both sides: a faction, a detachment, a disposition
for (let k = 0; k < 2; k++) {
  await p.locator('.faction-btn').nth(k).click({ timeout: 8000 }); await p.waitForTimeout(500)
  await p.locator('.fac:not(.disabled)', { hasText: k ? 'Orks' : 'Necrons' }).first().click(); await p.waitForTimeout(600)
  await p.locator('.field:has(.dp-count) .btn-choose-twist').nth(k).click(); await p.waitForTimeout(500)
  await p.locator('button.det:not(.on)').first().click(); await p.waitForTimeout(300)
  const close = p.locator('.modal-overlay .modal-close, .modal-overlay button[aria-label="Закрыть"]').last()
  if (await close.count()) await close.click({ timeout: 2000 }).catch(() => p.keyboard.press('Escape')); else await p.keyboard.press('Escape')
  await p.waitForTimeout(400)
}
for (const seg of await p.locator('.seg-fill').all()) await seg.locator('button').first().click().catch(() => {})
for (let st = 2; st <= 4; st++) {
  await p.waitForTimeout(500)
  const ok = await p.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find((x) => /^Далее/.test(x.textContent.trim()) && !x.closest('.tour') && x.getClientRects().length)
    if (!b || b.disabled) return false
    b.click(); return true
  })
  if (!ok) { report.push({ tag: `setup-${st}`, t: 'NEXT DISABLED' }); await p.screenshot({ path: `${OUT}/next-${st}.png` }); break }
  await p.waitForTimeout(800); await walk(`setup-${st}`)
}
const start = p.locator('[data-tour="setup-start"]')
if (await start.count()) { await start.click(); await p.waitForTimeout(1500); await walk('game') }
const begin = p.locator('[data-tour="game-start"]')
if (await begin.count()) { await begin.click(); await p.waitForTimeout(1500); await walk('turn') }
// ── Rosters
await p.goto(BASE + '/ru/roster'); await walk('roster-list')
const card = p.locator('[data-tour="roster-card"]').first()
if (await card.count()) { await card.click(); await p.waitForTimeout(1500); await walk('roster-view'); const url = p.url().replace(/\/view.*$/, ''); await p.goto(url); await walk('roster-edit') }
await p.goto(BASE + '/ru/roster/new'); await walk('roster-setup')
} catch (e) { report.push({ tag: "STOPPED", t: e.message.split("\n").slice(0, 3).join(" / ") }); await p.screenshot({ path: `${OUT}/stopped.png` }) }
console.log(JSON.stringify({ W, H, errs: errs.slice(0, 3) }))
for (const r of report) console.log(`${r.oy > 2 ? '✗' : '·'} ${r.tag} ${r.k || ''} ${r.t}${r.tall ? ' (tall)' : ''} ${r.oy > 2 ? `overlap ${r.oy}px hole ${r.hole} card ${r.card}` : ''}`)
await b.close()
