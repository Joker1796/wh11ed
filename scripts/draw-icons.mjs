// The drawings that replaced the Bootstrap icon font (2026-10-13), as geometry: filled faceted
// shapes on the 24 grid, circles in 15° steps, diamonds for dots, cut-outs by even-odd, an SVG
// <mask> where a slash or a badge needs a gap. Writes src/assets/icons/<name>.svg, each viewBox
// cropped round the ink so the ink is 21 of 24 and centred (src/components/CLAUDE.md "App icons").
// The owner's own pack is drawn by hand and is not here. To change one of these: edit its entry,
// `node scripts/draw-icons.mjs`, look at it in both themes.
import fs from 'node:fs'
import path from 'node:path'

const OUT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../src/assets/icons')
const r2 = (n) => (Math.round(n * 100) / 100).toFixed(2)
const d = (pts) => 'M' + pts.map(([x, y]) => `${r2(x)} ${r2(y)}`).join(' L') + ' Z'
const rad = (a) => (a * Math.PI) / 180

// ── geometry ──
const circle = (cx, cy, r, step = 15, start = 0) => {
  const out = []
  for (let a = start; a < start + 360 - 1e-9; a += step) out.push([cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))])
  return out
}
const arc = (cx, cy, r, a0, a1, step = 15) => {
  const out = []
  const n = Math.max(1, Math.ceil(Math.abs(a1 - a0) / step))
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n
    out.push([cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))])
  }
  return out
}
const rect = (x0, y0, x1, y1, c = 0) =>
  c ? [[x0 + c, y0], [x1 - c, y0], [x1, y0 + c], [x1, y1 - c], [x1 - c, y1], [x0 + c, y1], [x0, y1 - c], [x0, y0 + c]]
    : [[x0, y0], [x1, y0], [x1, y1], [x0, y1]]
const diamond = (cx, cy, h) => [[cx, cy - h], [cx + h, cy], [cx, cy + h], [cx - h, cy]]
const rot = (pts, deg, cx = 12, cy = 12) => {
  const c = Math.cos(rad(deg)), s = Math.sin(rad(deg))
  return pts.map(([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c])
}
const mirror = (pts) => pts.map(([x, y]) => [24 - x, y]).reverse()
const area = (pts) => pts.reduce((s, [x, y], i) => { const [u, v] = pts[(i + 1) % pts.length]; return s + x * v - u * y }, 0) / 2

function lineX(p, q, r, s) { // intersection of lines pq and rs
  const a1 = q[1] - p[1], b1 = p[0] - q[0], c1 = a1 * p[0] + b1 * p[1]
  const a2 = s[1] - r[1], b2 = r[0] - s[0], c2 = a2 * r[0] + b2 * r[1]
  const det = a1 * b2 - a2 * b1
  if (Math.abs(det) < 1e-9) return [q[0], q[1]]
  return [(c1 * b2 - c2 * b1) / det, (a1 * c2 - a2 * c1) / det]
}
// Shift a closed polygon's edges by w (inwards for w > 0), mitred.
function inset(pts, w) {
  const sgn = area(pts) > 0 ? 1 : -1
  const edges = pts.map((p, i) => {
    const q = pts[(i + 1) % pts.length]
    const len = Math.hypot(q[0] - p[0], q[1] - p[1])
    const nx = (-(q[1] - p[1]) / len) * sgn * -1, ny = ((q[0] - p[0]) / len) * sgn * -1
    return [[p[0] + nx * w, p[1] + ny * w], [q[0] + nx * w, q[1] + ny * w]]
  })
  return edges.map((e, i) => { const prev = edges[(i - 1 + edges.length) % edges.length]; return lineX(prev[0], prev[1], e[0], e[1]) })
}
// An open polyline drawn w wide, flat ends, mitred joins — as one polygon.
function thick(line, w) {
  const h = w / 2
  const side = (k) => {
    const segs = []
    for (let i = 0; i < line.length - 1; i++) {
      const p = line[i], q = line[i + 1]
      const len = Math.hypot(q[0] - p[0], q[1] - p[1])
      const nx = (-(q[1] - p[1]) / len) * h * k, ny = ((q[0] - p[0]) / len) * h * k
      segs.push([[p[0] + nx, p[1] + ny], [q[0] + nx, q[1] + ny]])
    }
    const out = [segs[0][0]]
    for (let i = 1; i < segs.length; i++) out.push(lineX(segs[i - 1][0], segs[i - 1][1], segs[i][0], segs[i][1]))
    out.push(segs[segs.length - 1][1])
    return out
  }
  return [...side(1), ...side(-1).reverse()]
}
const ring = (outer, w) => [outer, inset(outer, w)]
const thickArc = (cx, cy, r, w, a0, a1) => [...arc(cx, cy, r + w / 2, a0, a1), ...arc(cx, cy, r - w / 2, a0, a1).reverse()]
const plus = (cx, cy, len, hw) => [
  [cx - hw, cy - len], [cx + hw, cy - len], [cx + hw, cy - hw], [cx + len, cy - hw], [cx + len, cy + hw], [cx + hw, cy + hw],
  [cx + hw, cy + len], [cx - hw, cy + len], [cx - hw, cy + hw], [cx - len, cy + hw], [cx - len, cy - hw], [cx - hw, cy - hw]]
const arrowHead = (tip, dir, len, half) => { // a filled triangle, tip forward along dir (degrees)
  const c = Math.cos(rad(dir)), s = Math.sin(rad(dir))
  const bx = tip[0] - c * len, by = tip[1] - s * len
  return [tip, [bx - s * half, by + c * half], [bx + s * half, by - c * half]]
}
const sparkle = (cx, cy, R, r) => {
  const out = []
  for (let i = 0; i < 8; i++) { const a = -90 + i * 45, k = i % 2 ? r : R; out.push([cx + k * Math.cos(rad(a)), cy + k * Math.sin(rad(a))]) }
  return out
}

// ── shared parts ──
const RING = (cx = 12, cy = 12, r = 10, w = 1.7) => [circle(cx, cy, r), circle(cx, cy, r - w)]
const DISC = (cx = 12, cy = 12, r = 10.5) => circle(cx, cy, r)
const CHECK = (w = 2.4) => thick([[6.6, 12.4], [10.4, 16.2], [17.6, 9]], w)
const CHEVRON = thick([[4.6, 8.4], [12, 15.8], [19.4, 8.4]], 2.5)
const DOC = [[4.5, 1.8], [14.2, 1.8], [19.5, 7.1], [19.5, 22.2], [4.5, 22.2]]
const docShape = () => [DOC, [[6.4, 3.7], [12.7, 3.7], [12.7, 8.6], [17.6, 8.6], [17.6, 20.3], [6.4, 20.3]]]
const ENVELOPE = (x0, y0, x1, y1, w = 1.9) => [[rect(x0, y0, x1, y1, 0.6), rect(x0 + w, y0 + w, x1 - w, y1 - w)],
  [thick([[x0 + w * 0.8, y0 + w * 0.9], [(x0 + x1) / 2, y0 + (y1 - y0) * 0.5], [x1 - w * 0.8, y0 + w * 0.9]], w)]]
const DICE = { c: [12, 12], tl: [7.2, 7.2], tr: [16.8, 7.2], ml: [7.2, 12], mr: [16.8, 12], bl: [7.2, 16.8], br: [16.8, 16.8] }
const PIPS = { 1: ['c'], 2: ['tr', 'bl'], 3: ['tr', 'c', 'bl'], 4: ['tl', 'tr', 'bl', 'br'], 5: ['tl', 'tr', 'c', 'bl', 'br'], 6: ['tl', 'tr', 'ml', 'mr', 'bl', 'br'] }
// An almond: two arcs meeting at (12 ± dx, 12), peaking h above and below the middle.
const lens = (dx, h) => {
  const r = (dx * dx + h * h) / (2 * h), a = (Math.asin(dx / r) * 180) / Math.PI
  return [...arc(12, 12 - h + r, r, -90 - a, -90 + a, 7.5), ...arc(12, 12 + h - r, r, 90 - a, 90 + a, 7.5)]
}
const EYE_OUT = lens(10.6, 6.8)
const EYE_IN = lens(7.6, 4.6)
const person = (cx, top, s) => [circle(cx, top + 4 * s, 4 * s), [[cx - 7.5 * s, top + 18.5 * s], [cx - 6.8 * s, top + 13.5 * s], [cx - 4 * s, top + 10.5 * s], [cx + 4 * s, top + 10.5 * s], [cx + 6.8 * s, top + 13.5 * s], [cx + 7.5 * s, top + 18.5 * s]]]
const FUNNEL = [[2.5, 3.5], [21.5, 3.5], [14.1, 12.6], [14.1, 20.3], [9.9, 22], [9.9, 12.6]]
const UNDO = [thickArc(12, 13, 7.6, 2.2, -90, 195), arrowHead([6.4, 5.4], 180, 6.2, 3.6)]

// Each icon: a list of paths; a path is a list of polygons (even-odd within it). `cut` — paths
// knocked out of everything (an SVG mask), for a gap round a badge or a slash.
const ICONS = {
  'ui-chevron-down': [[CHEVRON]],
  'ui-chevron-up': [[rot(CHEVRON, 180)]],
  'ui-chevron-left': [[rot(CHEVRON, 90)]],
  'ui-chevron-right': [[rot(CHEVRON, -90)]],
  'ui-arrow-up': [[thick([[12, 21.3], [12, 6]], 2.2)], [thick([[5, 11], [12, 4], [19, 11]], 2.4)]],
  'ui-arrow-right': [[rot(thick([[12, 21.3], [12, 6]], 2.2), 90)], [rot(thick([[5, 11], [12, 4], [19, 11]], 2.4), 90)]],
  'ui-return': [[thick([[5, 3], [5, 13.6], [19, 13.6]], 2.2)], [thick([[14.6, 9.2], [19, 13.6], [14.6, 18]], 2.4)]],
  'ui-close': [[thick([[4.6, 4.6], [19.4, 19.4]], 2.5)], [thick([[19.4, 4.6], [4.6, 19.4]], 2.5)]],
  'ui-info': [RING(), [diamond(12, 7.6, 1.25)], [rect(11.15, 10.2, 12.85, 17.2)]],
  'ui-help': [RING(), [thick([[8.7, 9.7], [9, 8.1], [10.2, 6.9], [12, 6.4], [13.8, 6.9], [15.1, 8.1], [15.3, 9.7], [14.4, 11.1], [12, 12.5], [12, 14.2]], 1.95)], [diamond(12, 17.3, 1.6)]],
  'ui-warning': [[[[12, 2.2], [22.8, 20.8], [1.2, 20.8]], [[11, 8.4], [13, 8.4], [12.7, 14.6], [11.3, 14.6]], diamond(12, 17.3, 1.3)]],
  'ui-warning-line': [ring([[12, 2.2], [22.8, 20.8], [1.2, 20.8]], 1.8), [[[10.9, 8.4], [13.1, 8.4], [12.75, 15], [11.25, 15]]], [diamond(12, 17.3, 1.35)]],
  'ui-error': [[circle(12, 12, 10.6, 45, 22.5), rot(plus(12, 12, 5.2, 1.2), 45)]],
  'ui-ok': [[DISC(), CHECK()]],
  'ui-ok-line': [RING(), [thick([[7.4, 12.4], [10.6, 15.6], [16.6, 9.6]], 1.8)]],
  'ui-none': [RING(), [thick([[6.6, 17.4], [17.4, 6.6]], 1.8)]],
  'ui-undo': UNDO.map((p) => [p]),
  'ui-redo': UNDO.map((p) => [mirror(p)]),
  'ui-flag': [[rect(4.4, 2.4, 6.6, 21.6)], [[[6.6, 3.4], [20.2, 3.4], [16.6, 8.2], [20.2, 13], [6.6, 13]]]],
  'ui-roster-list': [[rect(2.4, 4, 21.6, 20, 0.6), rect(4.3, 5.9, 19.7, 18.1)],
    [diamond(7, 9, 1.15)], [diamond(7, 12, 1.15)], [diamond(7, 15, 1.15)],
    [rect(9.6, 8.2, 17.6, 9.8)], [rect(9.6, 11.2, 17.6, 12.8)], [rect(9.6, 14.2, 17.6, 15.8)]],
  'ui-list': [[diamond(4.2, 6, 1.7)], [diamond(4.2, 12, 1.7)], [diamond(4.2, 18, 1.7)],
    [rect(8.2, 5, 21, 7)], [rect(8.2, 11, 21, 13)], [rect(8.2, 17, 21, 19)]],
  ...Object.fromEntries(Object.entries(PIPS).map(([n, pips]) => [`dice-${n}`, [[rect(2.8, 2.8, 21.2, 21.2, 1.6), ...pips.map((k) => diamond(...DICE[k], 1.9))]]])),
  'ui-phone': [[rect(5.6, 1.5, 18.4, 22.5, 1), rect(7.4, 3.3, 16.6, 18.1), diamond(12, 20.3, 0.95)]],
  'ui-box': [ring(rect(3, 3, 21, 21, 1), 2)],
  'ui-box-on': [[rect(3, 3, 21, 21, 1), CHECK(2.3)]],
  'ui-link': (() => {
    const cap = (cx, R) => [...arc(cx - 2.4, 12, R, 90, 270), ...arc(cx + 2.4, 12, R, -90, 90)]
    return [[rot(cap(7.9, 4.1), -45), rot(cap(7.9, 2.1), -45)], [rot(cap(16.1, 4.1), -45), rot(cap(16.1, 2.1), -45)]]
  })(),
  'ui-signpost': [[rect(11, 1.8, 13, 22.2)], [[[3.6, 3.8], [17, 3.8], [20.2, 7], [17, 10.2], [3.6, 10.2]]], [[[20.4, 12], [7, 12], [3.8, 15.2], [7, 18.4], [20.4, 18.4]]]],
  'ui-eye': [[EYE_OUT, EYE_IN], [circle(12, 12, 3.4)]],
  'ui-eye-off': { paths: [[EYE_OUT, EYE_IN], [circle(12, 12, 3.4)], [thick([[3.4, 20.6], [20.6, 3.4]], 2.2)]], cut: [[thick([[1.2, 22.8], [22.8, 1.2]], 5)]], keep: 2 },
  'ui-stars': [[sparkle(9.2, 13.4, 7.8, 2.7)], [sparkle(18.6, 5.2, 3.6, 1.35)], [sparkle(19, 17.4, 2.9, 1.1)]],
  'ui-ruler': (() => { // a corner ruler, ticks along both inner edges
    const L = [[2.6, 2.6], [9.2, 2.6], [9.2, 14.8], [21.4, 14.8], [21.4, 21.4], [2.6, 21.4]]
    const up = [5.2, 7.6, 10, 12.4].map((y, i) => rect(i % 2 ? 6.4 : 4.8, y - 0.55, 8.1, y + 0.55))
    const across = [11.6, 14, 16.4, 18.8].map((x, i) => rect(x - 0.55, 15.9, x + 0.55, i % 2 ? 17.6 : 19.2))
    return [[L, ...up, ...across]]
  })(),
  // A label across the sheet, the letters cut out of it (not Acrobat's swirl: that is Adobe's mark).
  'ui-pdf': (() => {
    const u = 0.95, ox = 3.5, oy = 12.1
    const at = (pts, i) => pts.map(([x, y]) => [ox + (x + i * 4) * u, oy + y * u])
    const label = rect(1.6, 10.6, 16.4, 18.3, 0.5)
    return { paths: [docShape(), [label,
      at([[0, 0], [3, 0], [3, 3], [1, 3], [1, 5], [0, 5]], 0), at(rect(1, 1, 2, 2), 0),
      at([[0, 0], [2, 0], [3, 1], [3, 4], [2, 5], [0, 5]], 1), at(rect(1, 1, 2, 4), 1),
      at([[0, 0], [3, 0], [3, 1], [1, 1], [1, 2], [2.6, 2], [2.6, 3], [1, 3], [1, 5], [0, 5]], 2)]],
    cut: [[rect(0.8, 9.8, 17.2, 19.1)]], keep: 1 }
  })(),
  'ui-doc': [docShape(), [rect(8.4, 11, 15.6, 12.6)], [rect(8.4, 14, 15.6, 15.6)], [rect(8.4, 17, 13.6, 18.6)]],
  'ui-sliders': [[rect(2.6, 4.7, 21.4, 6.5)], [rect(2.6, 11.1, 21.4, 12.9)], [rect(2.6, 17.5, 21.4, 19.3)],
    [rect(6.6, 2.6, 9.4, 8.6)], [rect(14.6, 9, 17.4, 15)], [rect(9.6, 15.4, 12.4, 21.4)]],
  'ui-people': [[circle(8.6, 6.6, 3.5)], [[[2.2, 20.6], [2.8, 16.4], [5.2, 13.6], [12, 13.6], [14.4, 16.4], [15, 20.6]]],
    [circle(17, 8.2, 2.8)], [[[16.2, 20.6], [15.8, 16], [14.9, 14.3], [15.5, 13.6], [19, 13.6], [21.2, 15.9], [21.8, 20.6]]]],
  'ui-person': person(12, 2.2, 1.06).map((p) => [p]),
  'ui-panes': [ring(rect(2.4, 3.4, 21.6, 20.6, 0.6), 1.9), [rect(11.05, 3.4, 12.95, 20.6)]],
  'ui-trash': [[rect(3.2, 4.8, 20.8, 6.8)], [[[9, 2.2], [15, 2.2], [15, 4.8], [13.3, 4.8], [13.3, 3.9], [10.7, 3.9], [10.7, 4.8], [9, 4.8]]],
    ring([[5.2, 8.2], [18.8, 8.2], [17.6, 21.8], [6.4, 21.8]], 1.9), ...[9.5, 12, 14.5].map((x) => [rect(x - 0.75, 11.4, x + 0.75, 18.6)])],
  'ui-mail-alert': { paths: [...ENVELOPE(1.4, 3.6, 17.6, 15.6, 1.7), [DISC(18, 17.6, 5.2), rect(17.05, 14.3, 18.95, 18.2), diamond(18, 20.1, 1)]], cut: [[DISC(18, 17.6, 6.7)]], keep: 2 },
  'ui-mail-add': { paths: [...ENVELOPE(1.4, 3.6, 17.6, 15.6, 1.7), [DISC(18, 17.6, 5.2), plus(18, 17.6, 3, 0.9)]], cut: [[DISC(18, 17.6, 6.7)]], keep: 2 },
  'ui-key': [[circle(7.4, 12, 5.6), circle(7.4, 12, 2.3)], [rect(12.6, 11, 22, 13)], [rect(17.2, 13, 19, 16.6)], [rect(20.2, 13, 22, 15.6)]],
  'ui-lightning': [[[13.8, 1.6], [4.6, 13.6], [11.2, 13.6], [9.6, 22.4], [19.4, 9.6], [12.8, 9.6]]],
  'ui-collection': [ring(rect(2.8, 8.6, 21.2, 21.4, 0.6), 1.9), [rect(4.8, 5.2, 19.2, 6.9)], [rect(6.8, 2.2, 17.2, 3.9)]],
  'ui-grid': (() => { const s = 4.8, g = 2.3, o = (24 - 3 * s - 2 * g) / 2; const out = []; for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) out.push([rect(o + i * (s + g), o + j * (s + g), o + i * (s + g) + s, o + j * (s + g) + s)]); return out })(),
  'ui-language': [RING(12, 12, 10, 1.9), [circle(12, 12, 4.8, 15).map(([x, y]) => [12 + (x - 12), 12 + (y - 12) * 2.08]), circle(12, 12, 2.9, 15).map(([x, y]) => [12 + (x - 12), 12 + (y - 12) * 3.1])], [rect(2.6, 11.05, 21.4, 12.95)]],
  'ui-fullscreen': [0, 90, 180, 270].map((a) => [rot(thick([[2.6, 9.2], [2.6, 2.6], [9.2, 2.6]], 2.2), a)]),
  'ui-filter': [ring(FUNNEL, 1.9)],
  'ui-filter-on': [[FUNNEL]],
  'ui-add-circle': [RING(), [plus(12, 12, 5, 0.9)]],
  'ui-qr': [...[[2.6, 2.6], [14.4, 2.6], [2.6, 14.4]].flatMap(([x, y]) => [ring(rect(x, y, x + 7, y + 7), 1.7), [rect(x + 2.6, y + 2.6, x + 4.4, y + 4.4)]]),
    ...[[14.4, 14.4], [19.6, 14.4], [17, 17], [14.4, 19.6], [19.6, 19.6]].map(([x, y]) => [rect(x, y, x + 2.4, y + 2.4)])],
  'ui-book': [[[[2, 5.2], [8, 4.4], [11, 6.2], [11, 20.2], [8, 18.6], [2, 19.4]]], [mirror([[2, 5.2], [8, 4.4], [11, 6.2], [11, 20.2], [8, 18.6], [2, 19.4]])]],
  'ui-share': [[thick([[4.4, 10.6], [4.4, 21.2], [19.6, 21.2], [19.6, 10.6]], 2)], [rect(11, 4.6, 13, 16)], [thick([[7.6, 8], [12, 3.6], [16.4, 8]], 2.2)]],
  'ui-trophy': [[[[6, 2.6], [18, 2.6], [18, 9], [16, 12.4], [13.1, 14], [13.1, 17], [16.6, 19.2], [16.6, 21.4], [7.4, 21.4], [7.4, 19.2], [10.9, 17], [10.9, 14], [8, 12.4], [6, 9]]],
    [thick([[6, 4.6], [2.8, 4.6], [2.8, 8], [6.2, 10.8]], 1.7)], [mirror(thick([[6, 4.6], [2.8, 4.6], [2.8, 8], [6.2, 10.8]], 1.7))]],
  'ui-print': [[[[6.4, 7], [6.4, 2], [17.6, 2], [17.6, 7], [15.8, 7], [15.8, 3.8], [8.2, 3.8], [8.2, 7]]],
    [[[2, 8.2], [22, 8.2], [22, 18.2], [19.2, 18.2], [19.2, 14], [4.8, 14], [4.8, 18.2], [2, 18.2]], diamond(18.6, 11.1, 1)],
    ring(rect(6.4, 15.4, 17.6, 22.2), 1.7)],
}

function svg(name, spec) {
  const norm = (ps) => ps.map((p) => (typeof p[0][0] === 'number' ? [p] : p)) // a bare polygon is a path of one
  const { paths: raw, cut: rawCut = [], keep = 0 } = Array.isArray(spec) ? { paths: spec } : spec
  const paths = norm(raw), cut = norm(rawCut)
  const ink = paths.flat(2)
  const xs = ink.map((p) => p[0]), ys = ink.map((p) => p[1])
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
  const side = (Math.max(x1 - x0, y1 - y0) * 24) / 21
  const vb = [(x0 + x1) / 2 - side / 2, (y0 + y1) / 2 - side / 2, side, side].map(r2).join(' ')
  const el = (p) => `  <path fill-rule="evenodd" d="${p.map(d).join(' ')}"/>`
  let body
  if (cut.length) {
    // the first `keep` paths are drawn under the mask (the gap is cut from them), the rest above it
    const under = paths.slice(0, keep), over = paths.slice(keep)
    body = [`  <mask id="m"><rect x="-1" y="-1" width="26" height="26" fill="#fff"/>`, ...cut.map((p) => `  <path fill="#000" d="${p.map(d).join(' ')}"/>`), `  </mask>`,
      `  <g mask="url(#m)">`, ...under.map(el), `  </g>`, ...over.map(el)].join('\n')
  } else body = paths.map(el).join('\n')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="currentColor">\n${body}\n</svg>\n`
}

for (const [name, spec] of Object.entries(ICONS)) fs.writeFileSync(path.join(OUT, `${name}.svg`), svg(name, spec))
console.log(Object.keys(ICONS).length, 'icons')
