// Render one route's static HTML: real <title>/<meta>/canonical plus a real body.
//
// WHY THIS EXISTS: every deep URL used to serve the same `index.html`, so all 3142 addresses in
// the sitemap carried the landing page's title and no content at all until JavaScript ran. Google
// renders JS; Yandex — the audience this project targets — barely does, so to it the whole site
// was one page repeated three thousand times. See SEO.md.
//
// WHERE THE OUTPUT GOES: NOT into `dist/`. `globPatterns` in vite.config.js precaches
// `**/*.html`, so thousands of generated pages landing in dist/ would be dragged into the service
// worker's precache and destroy the "light tab" product requirement. They are written to
// `seo-html/` and uploaded as bucket keys by deploy.sh, the same route the single index.html copy
// took before.
//
// WHO SEES IT: a crawler (no service worker) and a first-time visitor. Anyone returning, and the
// installed PWA, is served the cached shell by `navigateFallback` and never sees this markup —
// which is also why it must not be the only place a fact lives.
//
// The body is deliberately plain semantic HTML with no classes: the app's stylesheet is already
// linked in the head, so it inherits the site's typography, and there is no second copy of the
// component styling to keep in sync.

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c])

/** Replace the first match of `re` (which must capture nothing) with `replacement`, asserting the
 *  tag was actually there — a silently-missed replacement would ship the landing page's title on
 *  every page again, which is the exact bug this file exists to fix. */
function replaceOnce(html, re, replacement, what) {
  if (!re.test(html)) throw new Error(`seo-html: no ${what} found in index.html template`)
  return html.replace(re, replacement)
}

/**
 * @param {string} template  dist/index.html, as built
 * @param {object} o  { locale, title, description, canonical, enUrl, ruUrl, body }
 */
export function renderPage(template, o) {
  let html = template

  html = replaceOnce(html, /<html lang="[^"]*"/, `<html lang="${o.locale}"`, '<html lang>')
  html = replaceOnce(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(o.title)}</title>`, '<title>')
  html = replaceOnce(
    html,
    /<meta name="description" content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${esc(o.description)}" />`,
    'description meta',
  )

  // og:title / og:description describe the PAGE, not the site, so a shared link previews itself.
  html = html.replace(
    /<meta property="og:title" content="[\s\S]*?"\s*\/>/,
    `<meta property="og:title" content="${esc(o.title)}" />`,
  )
  html = html.replace(
    /<meta property="og:description" content="[\s\S]*?"\s*\/>/,
    `<meta property="og:description" content="${esc(o.description)}" />`,
  )

  // The canonical trio. useSeoMeta.js sets the same three at runtime; here they are already in the
  // markup, which is the only version a non-executing crawler will ever see. EN and RU are each
  // self-canonical — pointing RU at EN would deindex the Russian half.
  const headTags = [
    `<link rel="canonical" href="${esc(o.canonical)}" />`,
    `<link rel="alternate" hreflang="en" href="${esc(o.enUrl)}" />`,
    `<link rel="alternate" hreflang="ru" href="${esc(o.ruUrl)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${esc(o.enUrl)}" />`,
    `<meta property="og:url" content="${esc(o.canonical)}" />`,
  ].join('\n    ')
  html = replaceOnce(html, /<\/head>/, `  ${headTags}\n  </head>`, '</head>')

  // Vue mounts into #app and replaces this outright (no hydration). That is intended: the reader
  // gets something readable before the bundle arrives, and the app takes over from there.
  html = replaceOnce(html, /<div id="app"><\/div>/, `<div id="app">${o.body}</div>`, '#app root')

  return html
}

// --- body renderers -------------------------------------------------------------------------

const L = {
  en: {
    statline: 'Statline', rangedWeapons: 'Ranged weapons',
    meleeWeapons: 'Melee weapons', abilities: 'Abilities', keywords: 'Keywords',
    composition: 'Unit composition', units: 'Units', datasheet: 'datasheet',
    // `n model(s) — n points`
    cost: (n, pts) => `${n} model${n === 1 ? '' : 's'} — ${pts} points`,
    lead: (faction, t) => `${faction} ${t}`,
  },
  ru: {
    statline: 'Характеристики', rangedWeapons: 'Стрелковое оружие',
    meleeWeapons: 'Оружие ближнего боя', abilities: 'Способности', keywords: 'Ключевые слова',
    composition: 'Состав отряда', units: 'Юниты', datasheet: 'лист данных',
    // Русский счёт: 1 модель, 2–4 модели, 5+ моделей; очко/очка/очков. Это видно на ~1500
    // страницах, так что «75 Очки» тут не мелочь.
    cost: (n, pts) => `${n} ${plural(n, 'модель', 'модели', 'моделей')} — ${pts} ${plural(pts, 'очко', 'очка', 'очков')}`,
    lead: (faction, t) => `${faction} — ${t}`,
  },
}

/** Russian numeric agreement: one / few / many. */
function plural(n, one, few, many) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

const table = (headers, rows) =>
  `<table><thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join('')}</tr></thead>` +
  `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table>`

const weaponTable = (weapons, label) => {
  if (!weapons?.length) return ''
  const rows = weapons.map((w) => [
    w.name + (w.tags?.length ? ` [${w.tags.join(', ')}]` : ''),
    w.range || '—', w.a ?? '', w.bs ?? w.ws ?? '', w.s ?? '', w.ap ?? '', w.d ?? '',
  ])
  return `<h2>${esc(label)}</h2>` + table(['', 'Range', 'A', 'BS/WS', 'S', 'AP', 'D'], rows)
}

/** A unit's datasheet — the largest page class on the site (~1500 of them) and the one with the
 *  most real data behind it. Names and keywords stay English in both locales by project
 *  convention; only ability text and flavour come from the RU overlay. */
export function datasheetBody(unit, factionName, locale, ru) {
  const t = L[locale]
  const p = unit.profiles?.[0] || {}
  const out = [`<h1>${esc(unit.name)}</h1>`]

  const cost = unit.points?.map((x) => t.cost(x.models, x.points)).join(', ')
  out.push(`<p>${esc(t.lead(factionName, t.datasheet))}${cost ? ` · ${esc(cost)}` : ''}</p>`)

  const flavor = ru?.flavor || unit.flavor
  if (flavor) out.push(`<p>${esc(flavor)}</p>`)

  if (unit.profiles?.length) {
    out.push(`<h2>${esc(t.statline)}</h2>`)
    out.push(table(
      ['', 'M', 'T', 'Sv', 'W', 'Ld', 'OC'],
      unit.profiles.map((x) => [x.name || unit.name, x.m, x.t, x.sv + (x.inv ? ` (${x.inv} inv)` : ''), x.w, x.ld, x.oc]),
    ))
  }

  out.push(weaponTable(unit.ranged, t.rangedWeapons))
  out.push(weaponTable(unit.melee, t.meleeWeapons))

  const abilities = unit.abilities || []
  if (abilities.length) {
    out.push(`<h2>${esc(t.abilities)}</h2><dl>`)
    for (const a of abilities) {
      // An overlay entry is either the translated text or `{ name, text }` — the form Necrons
      // uses to also translate the ability's header (see data/datasheets/ru/index.js). Taking it
      // raw printed "[object Object]" as the ability's body on all 52 Necrons RU pages.
      const o = ru?.abilities?.[a.name]
      const text = (typeof o === 'string' ? o : o?.text) || a.text
      out.push(`<dt>${esc(a.name)}</dt><dd>${esc(text)}</dd>`)
    }
    out.push('</dl>')
  }

  if (unit.composition?.length) {
    out.push(`<h2>${esc(t.composition)}</h2><ul>${unit.composition.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>`)
  }

  const kw = [...(unit.keywords || []), ...(unit.factionKeywords || [])]
  if (kw.length) out.push(`<h2>${esc(t.keywords)}</h2><p>${esc(kw.join(', '))}</p>`)

  return out.join('\n')
}

/** A faction's datasheet index — a real list of links, which is also how a crawler discovers the
 *  ~1500 unit pages without depending on the SPA's JS-rendered navigation. */
export function datasheetsIndexBody(factionName, units, locale, prefix) {
  const t = L[locale]
  return [
    `<h1>${esc(factionName)} — ${esc(t.units)}</h1>`,
    `<ul>${units.map((u) => `<li><a href="${esc(prefix)}/${esc(u.id)}">${esc(u.name)}</a></li>`).join('')}</ul>`,
  ].join('\n')
}

/** Everything else: the page's own heading and description. Thin by design — these are the pages
 *  whose real content is long prose the SPA renders; enriching them is a separate job. */
export function genericBody(title, description) {
  // The meta title carries the brand after an em dash; the heading should not repeat it.
  const heading = title.split(' — ')[0]
  return `<h1>${esc(heading)}</h1>\n<p>${esc(description)}</p>`
}
