// The points PDF: every Munitorum Field Manual price, faction by faction, with what the latest update
// changed marked — red up, green down, the difference in brackets, ▲▼ for a black-and-white print
// (owner, 2026-10-02: players asked for one file to download). The layout follows GW's old MFM PDF
// (sources/mfm/mfm_v3.7.pdf); the look is ours — no GW logo, title or design, and the cover says
// it is unofficial. The owner uploads the files and links them from the patch notes page
// (src/data/patchDownloads.js).
//
//   npm run points:pdf                 → points-pdf/wh-rules-points-mfm-<v>-<update>-{ru,en}.pdf (gitignored)
//   node scripts/gen-points-pdf.mjs <outDir> <ru|en> [patchId]
//
// Data: the current MFM (src/data/mfm/*) and the update's own diff (src/data/patches/<id>.json), the
// same file the patch notes page shows — the newest update unless an id is given. Rendered by the
// system Chrome (playwright-core, as the a11y gate) with the site's own fonts from @fontsource, so
// no network is needed and the layout does not move between runs.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { chromium } from 'playwright-core'
import { patches } from '../src/data/patches/index.js'

const OUT = path.resolve(process.argv[2] || 'points-pdf')
const REPO = process.cwd()
const LANG = process.argv[3] === 'en' ? 'en' : 'ru'
const META = process.argv[4] ? patches.find((x) => x.id === process.argv[4]) : patches.find((x) => x.labels?.mfm)
if (!META) throw new Error(`no such update: ${process.argv[4]}`)
const PATCH_ID = META.id
const MFM = META.labels.mfm
const DATE = new Date(`${META.date}T12:00:00Z`).toLocaleDateString(LANG === 'ru' ? 'ru-RU' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).replace(/\s*г\.$/, '')
// Every word the document says, in both languages. Unit, detachment and enhancement names stay
// English in both, as everywhere on the site.
const T = {
  ru: {
    title: 'Цены юнитов',
    sub: `Изменения в обновлении от ${DATE} · Munitorum Field Manual ${MFM} · данные приложения ${PATCH_ID}`,
    whatH: 'Что это',
    what1: 'Все цены 11-й редакции Warhammer 40,000 одним файлом — по фракциям, как в Munitorum Field Manual. Изменения последнего обновления выделены цветом, остальное как было.',
    what2: 'Цена указана за юнит выбранного размера. Если цена зависит от того, какой это по счёту такой юнит в армии, цены разбиты на группы: «1-й и 2-й юнит», «с 3-го юнита».',
    howH: 'Как читать', up: 'Подорожал', down: 'Подешевел', same: 'Без изменений',
    howNote: 'В скобках — на сколько изменилась цена. Стрелки ▲ ▼ стоят у каждой изменённой цены и у названия юнита, чтобы изменения было видно и при чёрно-белой печати.',
    tocH: 'Содержание', tocNote: 'Маленькое число рядом с фракцией — сколько её цен поменялось в этом обновлении.',
    disclaimer: 'Неофициальный документ WH Rules. Источник цен — Munitorum Field Manual от Games Workshop (mfm.warhammer-community.com). Названия юнитов и детачментов принадлежат Games Workshop. Если цена здесь расходится с MFM, верен MFM.',
    fsum: (u, e, r) => `Изменилось: юнитов — ${u}, улучшений — ${e}${r ? `, убрано из MFM — ${r}` : ''}`,
    datasheets: 'Датащиты', enhancements: 'Улучшения детачментов', removedH: 'Убраны из MFM',
    newUnit: 'новый', newSize: 'новое', was: (t, n) => `${t}: было ${n}`, gone: (n) => `${n} · убрано`,
    footer: `WH Rules · неофициальный документ · источник — Munitorum Field Manual ${MFM}`,
  },
  en: {
    title: 'Unit points',
    sub: `Changes in the ${DATE} update · Munitorum Field Manual ${MFM} · app data ${PATCH_ID}`,
    whatH: 'What this is',
    what1: 'Every Warhammer 40,000 11th edition points value in one file, faction by faction, as in the Munitorum Field Manual. Changes in the latest update are highlighted; everything else is as it was.',
    what2: 'Points are per unit of the chosen size. Where the cost depends on which unit of that kind it is in your army, the prices are grouped: “1st and 2nd unit”, “from the 3rd unit”.',
    howH: 'How to read it', up: 'Went up', down: 'Went down', same: 'Unchanged',
    howNote: 'The number in brackets is how much the cost changed. ▲ ▼ mark every changed price and the unit’s name, so changes show even in black-and-white print.',
    tocH: 'Contents', tocNote: 'The small number next to a faction is how many of its prices changed in this update.',
    disclaimer: 'An unofficial WH Rules document. Points come from Games Workshop’s Munitorum Field Manual (mfm.warhammer-community.com). Unit and detachment names belong to Games Workshop. If a value here differs from the MFM, the MFM is right.',
    fsum: (u, e, r) => `Changed: ${u} units, ${e} enhancements${r ? `, ${r} removed from the MFM` : ''}`,
    datasheets: 'Datasheets', enhancements: 'Detachment enhancements', removedH: 'Removed from the MFM',
    newUnit: 'new', newSize: 'new', was: (t, n) => `${t}: was ${n}`, gone: (n) => `${n} · removed`,
    footer: `WH Rules · unofficial document · source: Munitorum Field Manual ${MFM}`,
  },
}[LANG]
const SLUGS = fs.readdirSync(path.join(REPO, 'src/data/mfm')).filter((f) => f.endsWith('.js') && f !== 'index.js').map((f) => f.replace(/\.js$/, ''))
// Page of each faction's first page, filled by the first pass (see the bottom of the file).
let PAGES = {}
// Section headings found alone at the bottom of a page, as 'slug:kind' — they start a page instead.
const BREAK = new Set()
const h3 = (slug, kind, text) => `<h3${BREAK.has(`${slug}:${kind}`) ? ' class="newpage"' : ''}>${text}</h3>`

const patch = JSON.parse(fs.readFileSync(path.join(REPO, 'src/data/patches', `${PATCH_ID}.json`), 'utf8'))
const imp = (p) => import(pathToFileURL(path.join(REPO, p)).href).then((m) => m.default)
const { factionIndexBySlug } = await import(pathToFileURL(path.join(REPO, 'src/data/factionsIndex.js')).href)

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
const norm = (s) => String(s).toLowerCase().replace(/[’']/g, "'").trim()
const delta = (from, to) => (to > from ? `+${to - from}` : `−${from - to}`)
// One wording for a copy tier everywhere — the site's own (src/utils/copyTier.js).
const { copyTierLabel, modelsLabel } = await import(pathToFileURL(path.join(REPO, 'src/utils/copyTier.js')).href)
const tierText = (t) => String(t || '').replace(/(\d+(?:st|nd|rd|th)(?:-\d+(?:st|nd|rd|th))?\+?)/g, (m) => copyTierLabel(m, LANG))
const isTier = (t) => /^\d+(st|nd|rd|th)(-\d+(st|nd|rd|th))?\+?$/.test(t || '')

// Changes of one faction, keyed for lookup while walking the current MFM.
function changesFor(slug) {
  const units = new Map()
  const enh = new Map()
  const removed = []
  for (const it of patch.items) {
    if (it.faction !== slug) continue
    if (it.kind === 'points') {
      if (it.change === 'removed') removed.push(it.name)
      else units.set(norm(it.name), it)
    } else if (it.kind === 'enhancementPoints') {
      enh.set(norm(`${it.parent}|${it.name}`), it)
    }
  }
  return { units, enh, removed }
}

// One priced line. An option is either "N models" (+ the copy it prices), or — 13 lines game-wide —
// a composition written out ("10 Gretchin", "3 Wolf Guard Headtakers (1st-2nd)").
function optionRow(o, change, label, tier = '') {
  // The patch writes a composition and its tier apart ({ label: '3 Wolf Guard Headtakers', tier:
  // '1st-2nd' }) where the MFM line carries both ('3 Wolf Guard Headtakers (1st-2nd)').
  const f = change?.fields?.find((x) => (x.label != null
    ? x.label === o.note || (label != null && x.label === label && (x.tier || '') === tier)
    : x.models === o.models && (x.tier || '') === (o.note || '')))
  const what = label != null ? esc(label) : o.models != null ? modelsLabel(o.models, LANG) : esc(tierText(o.note))
  // GW moved a tier boundary: the patch prices a copy ("2nd") that is now part of a wider tier
  // ("1st-2nd"), or a tier that is gone ("3rd+" when the copy tax was dropped). The row that now
  // covers that copy is the one that changed, and says for which copy.
  if (!f && o.models != null) {
    const mine = rangeOf(isTier(o.note) ? o.note : tier)
    const part = (change?.fields || []).filter((x) => x.models === o.models && x.from != null && x.to != null && x.to !== x.from
      && x.tier && x.tier !== (o.note || '') && within(rangeOf(x.tier), mine))
    if (part.length) {
      const up = part.every((x) => x.to > x.from)
      const down = part.every((x) => x.to < x.from)
      const cls = up ? 'up' : down ? 'down' : 'mixed'
      const was = part.map((x) => T.was(esc(copyTierLabel(x.tier, LANG)), x.from)).join('; ')
      return `<div class="row ${cls}"><span class="what">${what}<span class="was">${was}</span></span><span class="dots"></span><span class="pts"><span class="d">${up ? '▲' : down ? '▼' : '▲▼'}</span> ${o.points}</span></div>`
    }
  }
  if (f && f.from == null && f.to != null) {
    return `<div class="row added"><span class="what">${what}<span class="tag">${T.newSize}</span></span><span class="dots"></span><span class="pts">${o.points}</span></div>`
  }
  if (f && f.from != null && f.to != null && f.to !== f.from) {
    const up = f.to > f.from
    return `<div class="row ${up ? 'up' : 'down'}"><span class="what">${what}</span><span class="dots"></span><span class="pts"><span class="d">${up ? '▲' : '▼'} (${delta(f.from, f.to)})</span> ${o.points}</span></div>`
  }
  return `<div class="row"><span class="what">${what}</span><span class="dots"></span><span class="pts">${o.points}</span></div>`
}

// Which copies of a unit a tier covers: '1st-2nd' → [1, 2], '3rd+' → [3, ∞], '' → every copy.
function rangeOf(t) {
  if (!t) return [1, Infinity]
  const n = (t.match(/\d+/g) || []).map(Number)
  return t.includes('+') ? [n[0], Infinity] : [n[0], n[1] ?? n[0]]
}
const within = (a, b) => a[0] >= b[0] && a[1] <= b[1]

// The site's grouping: a unit priced by copy gets one sub-bar per tier ("1-й и 2-й юнит"), sizes
// under it. A written-out composition carries its tier in brackets — "3 Wolf Guard Headtakers
// (1st-2nd)" — and is grouped the same way, the bracket dropped from the line.
const TIER_IN = /^(.*?)\s*\((\d+(?:st|nd|rd|th)(?:-\d+(?:st|nd|rd|th))?\+?)\)$/
function tierGroups(options) {
  const groups = []
  for (const o of options) {
    let tier = ''
    let label = null
    if (isTier(o.note)) tier = o.note
    else if (o.note && TIER_IN.test(o.note)) { const m = o.note.match(TIER_IN); label = m[1]; tier = m[2] }
    let g = groups.find((x) => x.tier === tier)
    if (!g) groups.push((g = { tier, items: [] }))
    g.items.push({ o, label })
  }
  return groups
}

// A size the update took away: shown struck through under the unit, so "where did 20 Gretchin go" has an answer.
function goneRows(change) {
  return (change?.fields || []).filter((f) => f.from != null && f.to == null).map((f) => {
    const what = f.label != null ? esc(tierText(f.label)) : `${modelsLabel(f.models, LANG)}${f.tier ? ' · ' + esc(tierText(f.tier)) : ''}`
    return `<div class="row gone"><span class="what">${what}</span><span class="dots"></span><span class="pts">${T.gone(f.from)}</span></div>`
  }).join('')
}

function unitBlock(u, ch) {
  const c = ch.units.get(norm(u.name))
  const isNew = c?.change === 'added'
  const ups = c?.fields?.some((f) => f.from != null && f.to != null && f.to > f.from)
  const downs = c?.fields?.some((f) => f.from != null && f.to != null && f.to < f.from)
  const dir = ups && downs ? 'mixed' : ups ? 'up' : downs ? 'down' : c ? 'mixed' : ''
  const mark = isNew ? `<span class="new">${T.newUnit}</span>` : dir === 'up' ? '<span class="arr up">▲</span>' : dir === 'down' ? '<span class="arr down">▼</span>' : dir === 'mixed' ? '<span class="arr mixed">▲▼</span>' : ''
  const body = tierGroups(u.options).map((g) => `${g.tier ? `<div class="tierbar">${esc(copyTierLabel(g.tier, LANG))}</div>` : ''}${g.items.map(({ o, label }) => optionRow(o, c, label, g.tier)).join('')}`).join('')
  return `<div class="unit${c ? ' changed' : ''}"><div class="uhead"><span>${esc(u.name)}</span>${mark}</div>${body}${goneRows(c)}</div>`
}

function enhBlock(det, ch) {
  const rows = det.enhancements.map((e) => {
    const c = ch.enh.get(norm(`${det.name}|${e.name}`))
    if (c && c.from != null && c.to !== c.from) {
      const cls = c.to > c.from ? 'up' : 'down'
      return `<div class="row ${cls}"><span class="what">${esc(e.name)}</span><span class="dots"></span><span class="pts"><span class="d">(${delta(c.from, c.to)})</span> ${e.points}</span></div>`
    }
    return `<div class="row"><span class="what">${esc(e.name)}</span><span class="dots"></span><span class="pts">${e.points}</span></div>`
  }).join('')
  return `<div class="unit"><div class="uhead det"><span>${esc(det.name)}</span><span class="dp">${det.dp} DP</span></div>${rows}</div>`
}

async function factionSection(slug) {
  const m = await imp(`src/data/mfm/${slug}.js`)
  const ch = changesFor(slug)
  const units = [...m.units].sort((a, b) => a.name.localeCompare(b.name))
  const nUnits = ch.units.size
  const nEnh = ch.enh.size
  return `
  <section class="faction">
    <h2>${esc(m.name)}<span class="mark">@@${slug}@@</span></h2>
    <p class="fsum">${T.fsum(nUnits, nEnh, ch.removed.length)}</p>
    ${h3(slug, 'ds', T.datasheets)}
    <div class="cols">${units.map((u) => unitBlock(u, ch)).join('')}</div>
    ${m.legends?.length ? `${h3(slug, 'legends', 'Warhammer Legends')}<div class="cols">${m.legends.map((u) => unitBlock(u, ch)).join('')}</div>` : ''}
    ${m.detachments.some((d) => d.enhancements?.length) ? `${h3(slug, 'enh', T.enhancements)}
    <div class="cols">${m.detachments.filter((d) => d.enhancements?.length).map((d) => enhBlock(d, ch)).join('')}</div>` : ''}
    ${ch.removed.length ? `${h3(slug, 'removed', T.removedH)}<p class="removed">${ch.removed.map(esc).join(', ')}</p>` : ''}
  </section>`
}

// Cover: our own masthead, what the document is, how to read it, contents.
function cover() {
  const counts = {}
  for (const it of patch.items) if (/points/i.test(it.kind)) counts[it.faction] = (counts[it.faction] || 0) + 1
  const name = (s) => factionIndexBySlug(s)?.name || s
  const toc = [...SLUGS].sort((a, b) => name(a).localeCompare(name(b)))
    .map((s) => `<div class="toc-row"><span>${esc(name(s))}${counts[s] ? `<span class="toc-n">${counts[s]}</span>` : ''}</span><span class="dots"></span><span class="toc-p">${PAGES[s] ?? '…'}</span></div>`).join('')
  return `
  <section class="cover">
    <div class="mast"><span class="brand">WH Rules</span><span class="site">wh-rules.ru</span></div>
    <h1>${T.title}</h1>
    <p class="sub">${T.sub}</p>
    <div class="cover-grid">
      <div>
        <h4>${T.whatH}</h4>
        <p>${T.what1}</p>
        <p>${T.what2}</p>
      </div>
      <div>
        <h4>${T.howH}</h4>
        <div class="legend">
          <div class="row up"><span class="what">${T.up}</span><span class="dots"></span><span class="pts"><span class="d">▲ (+10)</span> 120</span></div>
          <div class="row down"><span class="what">${T.down}</span><span class="dots"></span><span class="pts"><span class="d">▼ (−5)</span> 50</span></div>
          <div class="row"><span class="what">${T.same}</span><span class="dots"></span><span class="pts">85</span></div>
        </div>
        <p class="small">${T.howNote}</p>
      </div>
    </div>
    <h4>${T.tocH}</h4><p class="small">${T.tocNote}</p>
    <div class="toc">${toc}</div>
    <p class="disclaimer">${T.disclaimer}</p>
  </section>`
}

// The site's fonts, from the same @fontsource packages the app bundles (Latin + Cyrillic).
const FONT_DIR = (pkg) => path.join(REPO, 'node_modules/@fontsource', pkg, 'files')
const fontFaces = [['Inter', 'inter', [400, 500, 600, 700]], ['Sofia Sans Extra Condensed', 'sofia-sans-extra-condensed', [600, 700, 800]]]
  .flatMap(([family, pkg, weights]) => weights.flatMap((w) => ['latin', 'cyrillic'].map((sub) =>
    `@font-face { font-family: '${family}'; font-weight: ${w}; src: url('${pathToFileURL(path.join(FONT_DIR(pkg), `${pkg}-${sub}-${w}-normal.woff2`)).href}') format('woff2'); }`)))
  .join('\n')

const css = `
@page { size: A4; margin: 12mm 11mm 14mm; }
:root { --accent: #b3343b; --ink: #1d1c1c; --muted: #5e5d52; --rule: #c9c8bd; --band: #2a2a2e; --up: #b3261e; --down: #1e7a34; }
* { box-sizing: border-box; }
body { margin: 0; font-family: Inter, sans-serif; color: var(--ink); font-size: 8.4pt; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
h1, h2, h3, h4, .brand, .uhead { font-family: 'Sofia Sans Extra Condensed', sans-serif; }
.cover { break-after: page; }
.mast { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 3px solid var(--accent); padding-bottom: 4mm; }
.brand { font-size: 26pt; font-weight: 800; color: var(--accent); letter-spacing: 1px; }
.site { color: var(--muted); font-size: 9pt; }
h1 { font-size: 54pt; margin: 10mm 0 2mm; line-height: 0.95; text-transform: uppercase; letter-spacing: 1px; }
.sub { font-size: 10pt; color: var(--muted); margin: 0 0 8mm; }
.cover-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8mm; margin-bottom: 6mm; }
.cover p { font-size: 9pt; line-height: 1.45; margin: 0 0 2.5mm; }
h4 { font-size: 13pt; text-transform: uppercase; margin: 0 0 2mm; letter-spacing: 0.5px; }
.small { font-size: 8pt !important; color: var(--muted); }
.legend { margin-bottom: 2.5mm; max-width: 70mm; }
.toc { columns: 3; column-gap: 7mm; font-size: 9pt; margin-bottom: 8mm; }
.toc-row { display: flex; gap: 2mm; line-height: 1.6; }
.toc-n { font-size: 6.8pt; color: var(--accent); margin-left: 1.2mm; vertical-align: 1px; }
.toc-p { font-weight: 600; min-width: 5mm; text-align: right; }
.mark { font-size: 1px; color: #fff; letter-spacing: 0; }
.disclaimer { border-top: 1px solid var(--rule); padding-top: 3mm; font-size: 7.5pt !important; color: var(--muted); }

.faction { break-before: page; }
h2 { font-size: 30pt; text-transform: uppercase; margin: 0; border-bottom: 3px solid var(--accent); line-height: 1; padding-bottom: 1.5mm; }
.fsum { color: var(--muted); margin: 1.5mm 0 4mm; font-size: 8.5pt; }
h3 { font-size: 14pt; text-transform: uppercase; margin: 4mm 0 2mm; color: var(--accent); letter-spacing: 0.5px; }
/* A section heading never ends a page alone: it travels with the first block under it. */
h3 { break-after: avoid; }
.cols > .unit:first-child { break-before: avoid; }
h3.newpage { break-before: page; margin-top: 0; }
.cols { columns: 3; column-gap: 5mm; }
.unit { break-inside: avoid; margin-bottom: 2.4mm; }
.uhead { display: flex; justify-content: space-between; align-items: center; background: var(--band); color: #f0ede8; font-size: 10.5pt; font-weight: 700; padding: 0.6mm 1.8mm; line-height: 1.15; }
.uhead.det { background: #4a4a50; }
.tierbar { background: #5a5a62; color: #f0ede8; font-size: 7.4pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px; padding: 0.4mm 1.8mm; margin-top: 0.6mm; }
.dp { font-family: Inter, sans-serif; font-size: 7pt; font-weight: 600; opacity: 0.85; }
.arr { font-size: 7pt; margin-left: 2mm; }
.arr.up { color: #ff8a80; } .arr.down { color: #8be09a; } .arr.mixed { color: #ffd166; }
.new { font-family: Inter, sans-serif; font-size: 6.5pt; text-transform: uppercase; background: var(--accent); color: #fff; padding: 0 1.2mm; margin-left: 2mm; }
.row { display: flex; align-items: baseline; gap: 1.2mm; padding: 0.35mm 1.8mm 0.2mm; line-height: 1.3; }
/* A long composition ("Wolf Guard Headtakers, 6 Hunting Wolves") wraps inside its own column; with
   nowrap it ran under the next column's text (a player's screenshot, 2 October). The points never wrap. */
.what { min-width: 0; overflow-wrap: anywhere; }
.tier { color: var(--muted); font-size: 7pt; margin-left: 1.2mm; }
.dots { flex: 1 0 3mm; border-bottom: 1px dotted var(--rule); transform: translateY(-0.8mm); min-width: 3mm; }
.pts { flex: none; white-space: nowrap; font-weight: 600; }
.row.up .pts, .row.up .what { color: var(--up); }
.row.down .pts, .row.down .what { color: var(--down); }
/* The whole changed row is tinted, as in GW's own MFM — colour on the type alone was too faint
   (players, 2 October). Light fills: a black-and-white print still reads the ▲▼ and the delta. */
.row.up { background: #fbe1de; }
.row.down { background: #dcf0e0; }
.row.mixed { background: #fbefd2; }
.row.added { background: #f6dadc; }
.row.up .tier, .row.down .tier { color: inherit; opacity: 0.8; }
.d { font-weight: 500; font-size: 7.4pt; }
.removed { color: var(--muted); text-decoration: line-through; }
.row.added .pts, .row.added .what { color: var(--accent); }
.tag { font-size: 6.2pt; text-transform: uppercase; border: 1px solid currentColor; padding: 0 0.8mm; margin-left: 1.2mm; }
.row.mixed .pts, .row.mixed .what { color: #9a6a00; }
.was { display: block; font-size: 6.4pt; opacity: 0.85; }
.row.gone .what, .row.gone .pts { color: var(--muted); text-decoration: line-through; font-weight: 400; }
`

async function render(file) {
  const body = [cover(), ...(await Promise.all(SLUGS.sort((a, b) => (factionIndexBySlug(a)?.name || a).localeCompare(factionIndexBySlug(b)?.name || b)).map(factionSection)))].join('\n')
  const html = `<!doctype html><html lang="${LANG}"><head><meta charset="utf-8"><title>${T.title} — MFM ${MFM}</title>
<style>${fontFaces}${css}</style></head><body>${body}</body></html>`
  fs.writeFileSync(path.join(OUT, `points-${LANG}.html`), html)
  const page = await browser.newPage()
  await page.goto(pathToFileURL(path.join(OUT, `points-${LANG}.html`)).href, { waitUntil: 'networkidle' })
  await page.evaluate('document.fonts.ready') // a string: this file runs under node, the page has the DOM
  await page.pdf({
    path: file,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `<div style="font:7px Helvetica,Arial,sans-serif;color:#888;width:100%;padding:0 11mm;display:flex;justify-content:space-between"><span>${T.footer}</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    margin: { top: '12mm', bottom: '14mm', left: '11mm', right: '11mm' },
  })
  await page.close()
}

// Where each faction landed: its invisible @@slug@@ marker, page by page (pdftotext splits pages on \f).
const { execFileSync } = await import('node:child_process')
function pagesOf(file) {
  const text = execFileSync('pdftotext', [file, '-'], { encoding: 'utf8' })
  const out = {}
  text.split('\f').forEach((pg, i) => { for (const m of pg.matchAll(/@@([a-z-]+)@@/gi)) out[m[1].toLowerCase()] ??= i + 1 })
  return out
}

// A heading left as the last text on a page: which faction's (the last faction marker so far) and which one.
function orphansOf(file) {
  const pages = execFileSync('pdftotext', ['-layout', file, '-'], { encoding: 'utf8' }).split('\f')
  const kinds = { [T.datasheets.toUpperCase()]: 'ds', 'WARHAMMER LEGENDS': 'legends', [T.enhancements.toUpperCase()]: 'enh', [T.removedH.toUpperCase()]: 'removed' }
  const out = []
  let slug = null
  pages.forEach((pg) => {
    for (const m of pg.matchAll(/@@([a-z-]+)@@/gi)) slug = m[1].toLowerCase()
    const lines = pg.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('WH Rules ·'))
    const last = lines[lines.length - 1]
    if (slug && kinds[last]) out.push(`${slug}:${kinds[last]}`)
  })
  return out
}

fs.mkdirSync(OUT, { recursive: true })
const browser = await chromium.launch({ channel: 'chrome' })
const final = path.join(OUT, `wh-rules-points-mfm-${MFM}-${PATCH_ID}-${LANG}.pdf`) // the MFM version alone did not move on 2 October
// Render until the page numbers the cover prints are the pages the factions land on.
let check = {}
for (let pass = 1; pass <= 8; pass++) {
  await render(final)
  check = pagesOf(final)
  const moved = SLUGS.filter((s) => check[s] !== PAGES[s])
  const orphans = orphansOf(final).filter((k) => !BREAK.has(k))
  orphans.forEach((k) => BREAK.add(k))
  console.log('pass', pass, moved.length ? `moved ${moved.length}` : 'pages stable', orphans.length ? `· orphaned headings: ${orphans.join(', ')}` : '')
  if (!moved.length && !orphans.length) break
  PAGES = check
}
await browser.close()
if (Object.keys(check).length !== SLUGS.length) throw new Error(`only ${Object.keys(check).length} of ${SLUGS.length} factions found in the PDF`)
console.log(`✓ ${path.relative(REPO, final)} — ${SLUGS.length} factions, update ${PATCH_ID}, MFM ${MFM}`)
