#!/usr/bin/env node
// Renders a sample of real pages in headless Chrome and measures three things a reader on a
// phone feels before anyone reads the CSS: text contrast in both themes, tap-target size, and
// horizontal overflow. Run by `npm run a11y`; needs a fresh `dist/` (`npm run build`) and an
// installed Google Chrome — `playwright-core` drives the browser that is already on the machine
// instead of downloading one.
//
// Why this exists: the `--danger` token (2026-09-21) found ~15 error states that had sat
// dark-maroon on the dark theme for months, unnoticed, because no check ever looked at rendered
// colours — `radii` and `dupes` read the stylesheet, nothing read the screen. Every rule below is
// measured from computed styles and real geometry, never from what the source says it meant.
//
// The three checks, and what they deliberately leave alone:
//   contrast — WCAG 2.2 AA (1.4.3): 4.5:1 for text, 3:1 for large text (≥24px, or ≥18.66px bold).
//              Text on a background-image or gradient is skipped (the ratio is not computable),
//              so are disabled controls and placeholders (exempt by the standard). Resting state
//              only — hover/focus colours are not measured yet.
//   target   — WCAG 2.2 AA (2.5.8): every pointer target is at least 24×24 CSS px, unless no
//              other target's centre lies within 24px of its own (the spacing exception) or the
//              target is inline in running text (the inline exception).
//   overflow — the document must not scroll sideways at any width; the widest offenders are
//              listed so the culprit table or chip row is findable.
//
// Findings are keyed by an element signature (tag.classes) plus the colour pair — the same list
// style failing on forty rows, or on ten pages, is one finding, not forty. A finding that is a
// decision goes into ALLOWED with the reason, exactly as `check-radii.mjs` does.
//
// THE BASELINE. The first run (2026-09-21) found the palette itself short of AA in a dozen
// places — `--text-dim` everywhere, the dark `--accent` as text, `--text-muted` on the recessed
// strip — and those are palette decisions, not a bug per page. `scripts/lib/a11y-baseline.json`
// holds what is accepted for now, keyed the same way (theme + signature + colours, no route: the
// problem is the pair, and fixing the token clears every page at once). The gate is red only on
// something NEW; a baseline entry that stops firing is reported as stale so the file shrinks as
// the palette is fixed. `--baseline` re-records it — read the diff before committing.
//
// Usage: npm run a11y [-- --routes=/factions/orks,/tracker] [--only=contrast|target|overflow]
//                     [--widths=390,1280] [--themes=light,dark] [--en] [--verbose] [--baseline]
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { chromium } from 'playwright-core'
import { preview } from 'vite'

const ROOT = join(import.meta.dirname, '..')
const BASELINE_PATH = join(ROOT, 'scripts/lib/a11y-baseline.json')

// One page per kind of screen, EN and RU (RU words are longer — overflow is locale-dependent).
// Tracker and roster screens that need a game or a list in storage are absent on purpose: a
// gate that has to seed state to render is a test, and lives in vitest.
const ROUTES = [
  '/',
  '/rules',
  '/core-rules',
  '/event-companion',
  '/factions',
  '/factions/orks',
  '/factions/orks/detachments',
  '/factions/orks/datasheets',
  '/factions/orks/datasheets/boyz',
  '/factions/orks/faq',
  '/stratagems',
  '/combat-patrol',
  '/tracker',
  '/roster',
  '/roster/new',
  '/help',
  '/changelog',
  '/links',
]

// Deliberate exceptions. `sig` matches the element signature (tag.classes) as the report prints
// it; `route`/`theme`/`width` narrow it further when given. Every entry says why.
const ALLOWED = [
  // Vertical density wins over 24px in the two dense tables of contents: ~80 and ~40 links in a
  // column at 18px each, and the extra 6px a row would cost the Core Rules TOC a whole swipe on
  // every open. A missed tap there is one more tap; links in a column read as text (2026-09-21).
  { check: 'target', sig: 'a.core-toc-link', why: 'dense TOC — density over 24px' },
  { check: 'target', sig: 'a.event-toc-link', why: 'dense TOC — density over 24px' },
  // The pin and the star stack in a datasheet chip's corner; at 24px each the stack outgrows a
  // one-line chip and every short name would cost the grid another ~5px a row. Kept at 22px.
  { check: 'target', sig: /^button\.ds-fav/, why: 'stacked chip marks — chip height over 24px' },
]

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/)
    return m ? [m[1], m[2] ?? true] : [a, true]
  }),
)
const only = args.only ? String(args.only).split(',') : ['contrast', 'target', 'overflow']
const widths = args.widths ? String(args.widths).split(',').map(Number) : [390, 1280]
const themes = args.themes ? String(args.themes).split(',') : ['light', 'dark']
const routes = args.routes ? String(args.routes).split(',') : ROUTES
const locales = args.en ? [''] : ['', '/ru']
const verbose = !!args.verbose
const record = !!args.baseline

if (!existsSync(join(ROOT, 'dist', 'index.html'))) {
  console.error('✗ a11y: no dist/index.html — run `npm run build` first')
  process.exit(1)
}

// ---------------------------------------------------------------------------------------------
// In-page measurement. Runs inside the browser; must stay self-contained (no imports).
// ---------------------------------------------------------------------------------------------
/* global document, getComputedStyle */
function measure({ checks }) {
  const vw = document.documentElement.clientWidth
  // Chrome reports plain colours as rgb()/rgba() but anything that went through color-mix()
  // as `color(srgb 0.29 0.28 0.28 / 0.5)` with 0–1 channels — both are read here.
  const parse = (s) => {
    let m = s.match(/rgba?\(([^)]+)\)/)
    if (m) {
      const [r, g, b, a = 1] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number)
      return { r, g, b, a: isNaN(a) ? 1 : a }
    }
    m = s.match(/color\(srgb\s+([^)]+)\)/)
    if (m) {
      const [r, g, b, a = 1] = m[1].split(/[\s/]+/).filter(Boolean).map(Number)
      return { r: r * 255, g: g * 255, b: b * 255, a: isNaN(a) ? 1 : a }
    }
    return null
  }
  // Porter-Duff "over": `under` may itself be translucent (a 12% chip on an 8% row tint).
  const over = (top, under) => {
    const a = top.a + under.a * (1 - top.a)
    const ch = (t, u) => (a === 0 ? 0 : (t * top.a + u * under.a * (1 - top.a)) / a)
    return { r: ch(top.r, under.r), g: ch(top.g, under.g), b: ch(top.b, under.b), a }
  }
  const lum = ({ r, g, b }) => {
    const f = (c) => {
      c /= 255
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    }
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
  }
  const ratio = (a, b) => {
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
    return (hi + 0.05) / (lo + 0.05)
  }
  const hex = ({ r, g, b }) =>
    '#' + [r, g, b].map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')
  const sig = (el) => {
    const cls = [...el.classList].filter((c) => !/^(is-|has-|v-|router-)/.test(c)).slice(0, 3)
    return el.tagName.toLowerCase() + (cls.length ? '.' + cls.join('.') : '')
  }
  // Visible means painted where a reader could see it: below the fold counts, but an
  // off-canvas drawer parked at translateX(100%) does not.
  const visible = (el) => {
    const r = el.getBoundingClientRect()
    if (r.width === 0 || r.height === 0) return false
    if (r.right <= 0 || r.left >= vw) return false
    for (let n = el; n && n !== document; n = n.parentElement) {
      const cs = getComputedStyle(n)
      if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false
      if (n.getAttribute && n.getAttribute('aria-hidden') === 'true' && n !== el) return false
    }
    return true
  }
  // Effective background: composite ancestors' background-colors until one is opaque. A
  // background-image anywhere on the way up makes the answer unknowable — return null.
  const background = (el) => {
    let acc = null
    for (let n = el; n; n = n.parentElement) {
      const cs = getComputedStyle(n)
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return null
      const c = parse(cs.backgroundColor)
      if (c && c.a > 0) {
        acc = acc ? over(acc, c) : c
        if (c.a >= 1) return acc
      }
    }
    // Reached the root with translucency left: the canvas under html is white.
    return acc ? over(acc, { r: 255, g: 255, b: 255, a: 1 }) : { r: 255, g: 255, b: 255, a: 1 }
  }

  const out = { contrast: [], target: [], overflow: [] }
  const all = [...document.body.querySelectorAll('*')]

  if (checks.includes('contrast')) {
    const seen = new Set()
    for (const el of all) {
      if (['SCRIPT', 'STYLE', 'SVG', 'PATH', 'NOSCRIPT', 'OPTION'].includes(el.tagName)) continue
      const text = [...el.childNodes]
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent)
        .join('')
        .trim()
      if (!text) continue
      if (el.closest('[disabled], [aria-disabled="true"], .disabled')) continue
      if (!visible(el)) continue
      const cs = getComputedStyle(el)
      const fg0 = parse(cs.color)
      if (!fg0 || fg0.a === 0) continue
      const bg = background(el)
      if (!bg) continue
      const fg = fg0.a < 1 ? over(fg0, bg) : fg0
      const size = parseFloat(cs.fontSize)
      const bold = parseInt(cs.fontWeight, 10) >= 700
      const large = size >= 24 || (size >= 18.66 && bold)
      const need = large ? 3 : 4.5
      const r = ratio(fg, bg)
      if (r >= need) continue
      const key = sig(el) + hex(fg) + hex(bg)
      if (seen.has(key)) continue
      seen.add(key)
      out.contrast.push({
        sig: sig(el),
        text: text.slice(0, 40),
        fg: hex(fg),
        bg: hex(bg),
        ratio: Math.round(r * 100) / 100,
        need,
        size: Math.round(size * 10) / 10,
      })
    }
  }

  if (checks.includes('target')) {
    const MIN = 24
    const sel =
      'a[href], button, [role="button"], input, select, textarea, summary, label[for], [tabindex]:not([tabindex="-1"])'
    const targets = [...document.body.querySelectorAll(sel)]
      .filter((el) => visible(el) && !el.closest('[disabled], [aria-disabled="true"]'))
      // Inline exception: a link sitting in running text is sized by the line, not by us.
      .filter((el) => !(el.tagName === 'A' && getComputedStyle(el).display === 'inline'))
      // The tab-stop on a focusable container (dialog, scroller) is not a pointer target.
      .filter((el) => !(el.hasAttribute('tabindex') && !el.matches('a, button, input, select, textarea, summary, [role="button"]')))
      .map((el) => {
        const r = el.getBoundingClientRect()
        return { el, w: r.width, h: r.height, cx: r.left + r.width / 2, cy: r.top + r.height / 2 }
      })
    const seen = new Set()
    for (const t of targets) {
      if (t.w >= MIN && t.h >= MIN) continue
      // Spacing exception: nothing else to hit within 24px of the centre.
      const crowded = targets.some(
        (o) => o !== t && Math.hypot(o.cx - t.cx, o.cy - t.cy) < MIN,
      )
      if (!crowded) continue
      const s = sig(t.el)
      if (seen.has(s)) continue
      seen.add(s)
      out.target.push({
        sig: s,
        text: (t.el.getAttribute('aria-label') || t.el.textContent || '').trim().slice(0, 30),
        w: Math.round(t.w),
        h: Math.round(t.h),
      })
    }
  }

  if (checks.includes('overflow')) {
    const doc = document.documentElement
    if (doc.scrollWidth > doc.clientWidth + 1) {
      const wide = all
        .filter((el) => visible(el) && getComputedStyle(el).position !== 'fixed')
        .map((el) => ({ el, right: el.getBoundingClientRect().right }))
        .filter((x) => x.right > vw + 1)
        .sort((a, b) => b.right - a.right)
      // Keep the outermost offenders: a child inside a wide parent is the same finding.
      const top = []
      for (const x of wide) {
        if (top.some((t) => t.el.contains(x.el))) continue
        top.push(x)
        if (top.length === 3) break
      }
      out.overflow.push({
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        culprits: top.map((x) => `${sig(x.el)} (right edge ${Math.round(x.right)}px)`),
      })
    }
  }
  return out
}

// ---------------------------------------------------------------------------------------------
const allowed = (f) =>
  ALLOWED.some(
    (a) =>
      (!a.route || a.route === f.route) &&
      (!a.theme || a.theme === f.theme) &&
      (!a.width || a.width === f.width) &&
      (!a.check || a.check === f.check) &&
      (!a.sig || (a.sig instanceof RegExp ? a.sig.test(f.sig) : a.sig === f.sig)),
  )

const server = await preview({ root: ROOT, logLevel: 'silent', preview: { port: 4177, strictPort: false, open: false } })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')

let browser
try {
  browser = await chromium.launch({ channel: 'chrome' })
} catch (e) {
  console.error('✗ a11y: could not launch Google Chrome via playwright-core —', e.message.split('\n')[0])
  await server.close()
  process.exit(1)
}

const findings = []
let pages = 0
const t0 = Date.now()
for (const width of widths) {
  const mobile = width < 700
  const context = await browser.newContext({
    viewport: { width, height: mobile ? 844 : 800 },
    deviceScaleFactor: 1,
    isMobile: mobile,
    hasTouch: mobile,
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  for (const theme of themes) {
    await page.emulateMedia({ colorScheme: theme })
    for (const locale of locales) {
      for (const route of routes) {
        const path = locale + (route === '/' && locale ? '' : route)
        await page.goto(base + path, { waitUntil: 'networkidle' })
        await page.waitForSelector('#app *', { timeout: 15000 })
        await page.evaluate(() => document.fonts.ready)
        pages++
        const res = await page.evaluate(measure, { checks: only })
        for (const check of only) {
          for (const item of res[check]) {
            findings.push({ route: path, theme, width, check, sig: item.sig ?? '', item })
          }
        }
        if (verbose) console.log(`  ${path} ${theme} ${width}px — ${only.map((c) => `${c}:${res[c].length}`).join(' ')}`)
      }
    }
  }
  await context.close()
}
await browser.close()
await server.close()

// What a finding is called in the baseline. No route or width for contrast/target — a colour
// pair or a control's size is the same problem wherever it appears (a link 18px tall is the
// finding, not its width on this or that viewport); overflow is per page.
const keyOf = (f) =>
  f.check === 'overflow'
    ? `overflow · ${f.route} · ${f.width}px`
    : f.check === 'contrast'
      ? `contrast · ${f.theme} · ${f.sig} · ${f.item.fg} on ${f.item.bg}`
      : `target · ${f.sig}`

const baseline = (() => {
  if (record || !existsSync(BASELINE_PATH)) return {}
  return JSON.parse(readFileSync(BASELINE_PATH, 'utf8'))
})()

const unallowed = findings.filter((f) => !allowed(f))
if (record) {
  const entries = {}
  for (const f of unallowed) {
    const k = keyOf(f)
    if (!entries[k]) entries[k] = f.check === 'overflow' ? `${f.item.scrollWidth}px` : f.item.text || ''
  }
  const sorted = Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)))
  writeFileSync(BASELINE_PATH, JSON.stringify(sorted, null, 2) + '\n')
  console.log(`  baseline: ${Object.keys(sorted).length} finding(s) recorded in ${BASELINE_PATH}`)
}
const seenKeys = new Set(unallowed.map(keyOf))
// A narrowed run (--only, --routes, --en, one theme…) cannot tell "fixed" from "not looked at",
// so stale entries are reported only when the whole matrix ran.
const fullRun = !args.only && !args.routes && !args.en && !args.widths && !args.themes
const stale = fullRun ? Object.keys(baseline).filter((k) => !seenKeys.has(k)) : []
const real = record ? [] : unallowed.filter((f) => !Object.hasOwn(baseline, keyOf(f)))
const held = new Set(unallowed.filter((f) => Object.hasOwn(baseline, keyOf(f))).map(keyOf)).size
const skipped = findings.length - unallowed.length
const secs = Math.round((Date.now() - t0) / 1000)

const fmt = (f) => {
  const where = `${f.route} [${f.theme} ${f.width}px]`
  const i = f.item
  if (f.check === 'contrast')
    return `${where}  ${f.sig}  ${i.fg} on ${i.bg} = ${i.ratio}:1 (need ${i.need}, ${i.size}px)  “${i.text}”`
  if (f.check === 'target') return `${where}  ${f.sig}  ${i.w}×${i.h}px  “${i.text}”`
  return `${where}  page scrolls sideways: ${i.scrollWidth} > ${i.clientWidth}px  ← ${i.culprits.join(', ')}`
}

// One line per distinct (check, sig) across routes/themes — the route list follows it, so a
// list style failing on ten pages is one paragraph, not ten.
const grouped = new Map()
for (const f of real) {
  const key = f.check === 'overflow' ? `overflow|${f.route}|${f.width}` : `${f.check}|${f.sig}|${f.item.fg ?? ''}${f.item.bg ?? ''}`
  if (!grouped.has(key)) grouped.set(key, { first: f, where: [] })
  grouped.get(key).where.push(`${f.route} ${f.theme} ${f.width}`)
}

if (real.length) {
  const byCheck = only.map((c) => `${c}: ${real.filter((f) => f.check === c).length}`).join(', ')
  console.error(`✗ a11y: ${real.length} finding(s) on ${pages} page loads in ${secs}s (${byCheck})\n`)
  for (const [, g] of grouped) {
    console.error('  ' + fmt(g.first))
    if (g.where.length > 1) console.error(`      also on ${g.where.length - 1} more: ${g.where.slice(1, 6).join('; ')}${g.where.length > 6 ? '; …' : ''}`)
  }
  console.error(`\nContrast is WCAG AA (4.5:1 text, 3:1 large), targets 24×24px, no sideways scroll.`)
  console.error(`A deliberate exception goes into ALLOWED in scripts/check-a11y.mjs with the reason.`)
  process.exit(1)
}
for (const k of stale) console.log(`  ! baseline entry matched nothing — delete it or re-record: ${k}`)
console.log(
  `✓ a11y: nothing new on ${pages} page loads in ${secs}s` +
    (held ? ` — ${held} finding(s) held in the baseline, still a fix each (scripts/lib/a11y-baseline.json)` : '') +
    (skipped ? `; ${skipped} listed exception(s)` : ''),
)
