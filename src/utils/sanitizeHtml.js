// @ts-check
// Every string the app hands to the DOM as HTML goes through here (the `v-safe-html` directive).
// The app renders its rule text to HTML itself, and until 2026-10-12 that HTML went in raw — safe
// only because every source was our own data. Two things made that not good enough: the changelog
// archive comes from the server, and a rule text that merely MENTIONS markup is read as markup
// ("api.wh-rules.ru/broadcast/<token>" in the help page printed without its "<token>").
//
// An allow-list, written from what our renderers actually emit (measured over every string in
// src/data, plus the changelog marks, the patch diff and the QR code): a tag outside it is shown
// as the text it is, an attribute outside it is dropped, and a link may only go to http(s), mail,
// or a path of our own. A tag that passes untouched is copied byte for byte, so for everything we
// render today the output is the input — sanitizeHtml.test.js holds that over all the data.

const TAGS = new Set([
  'a', 'b', 'br', 'code', 'del', 'div', 'em', 'h4', 'h5', 'i', 'ins', 'li', 'mark', 'ol', 'p',
  'path', 's', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'table', 'tbody', 'td', 'th',
  'thead', 'tr', 'u', 'ul', 'wbr',
])
const ATTRS = new Set([
  'class', 'href', 'target', 'rel', 'title', 'role', 'id', 'colspan', 'rowspan',
  // the QR code's SVG
  'xmlns', 'viewBox', 'shape-rendering', 'fill', 'stroke', 'd', 'width', 'height',
])
const URL_ATTRS = new Set(['href'])
const SAFE_URL = /^(?:https?:|mailto:|\/|#|[^:]*$)/i

const TAG_RE = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*(\/?)>/g
const ATTR_RE = /([^\s"'>/=]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s"'=<>`]+))?/g

const escapeTag = (s) => s.replace(/</g, '&lt;').replace(/>/g, '&gt;')
const unquote = (v) => (v && /^["']/.test(v) ? v.slice(1, -1) : v || '')

/**
 * @param {string} name
 * @param {string | undefined} value
 */
function attrAllowed(name, value) {
  if (/^on/i.test(name)) return false
  if (!(ATTRS.has(name) || /^data-[\w-]+$/.test(name) || /^aria-[\w-]+$/.test(name))) return false
  // An entity can hide a scheme ("jav&#x61;script:"); a value with one in a link is not ours.
  if (URL_ATTRS.has(name)) {
    const url = unquote(value).trim()
    return !/&#|&[a-z]+;/i.test(url) && SAFE_URL.test(url)
  }
  return true
}

/**
 * @param {unknown} html
 * @returns {string}
 */
export function sanitizeHtml(html) {
  if (html == null) return ''
  return String(html).replace(TAG_RE, (whole, close, tag, attrs, self) => {
    if (whole.startsWith('<!--')) return ''
    if (!TAGS.has(tag.toLowerCase())) return escapeTag(whole)
    if (close) return `</${tag}>`
    const kept = [...attrs.matchAll(ATTR_RE)].filter((m) => attrAllowed(m[1], m[2]))
    if (kept.length === [...attrs.matchAll(ATTR_RE)].length) return whole
    return `<${tag}${kept.map((m) => ` ${m[0]}`).join('')}${self ? ' /' : ''}>`
  })
}
