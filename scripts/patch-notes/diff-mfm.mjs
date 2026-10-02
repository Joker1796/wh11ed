// Points between two Munitorum Field Manual scrapes of one faction (src/data/mfm/<slug>.js at two
// commits): units by name, each size option by its model count and its note ("1st-2nd", "3rd+"),
// and enhancements by detachment and name. Only points — the detachments' DP and dispositions are
// the app's to report (diff-bundles.mjs), and the MFM scrape changed their shape on its own.
const key = (s) => (s || '').toLowerCase().replace(/[‘’`]/g, "'").replace(/\s+/g, ' ').trim()
// A new unit's option, its note split like a changed one's: { models, label?, tier? }.
function optLabel(o) {
  if (!o.note) return { models: o.models }
  const m = o.note.match(RANGE_ANY)
  const label = m ? o.note.slice(0, m.index).replace(/[\s(]+$/, '').trim() : o.note
  return { models: o.models, ...(label ? { label } : {}), ...(m ? { tier: m[0].replace(/[()]/g, '') } : {}) }
}

// A price note names which copies of the unit pay it — "1st", "2nd+", "1st-2nd", "3rd+", "1st-3rd",
// "4th+" — sometimes after the unit's make-up ("3 Wolf Guard Headtakers (1st-2nd)"). → the make-up
// and the range of copies [lo, hi].
const ORD = '(\\d+)(?:st|nd|rd|th)'
const RANGE = new RegExp(`\\(?${ORD}(?:-${ORD}|(\\+))?\\)?$`)
const RANGE_ANY = new RegExp(`\\(?\\d+(?:st|nd|rd|th)(?:-\\d+(?:st|nd|rd|th)|\\+)?\\)?$`)
function parseNote(note) {
  const m = (note || '').match(RANGE)
  if (!m) return { variant: key(note), lo: 1, hi: Infinity }
  return { variant: key(note.slice(0, m.index)), lo: +m[1], hi: m[2] ? +m[2] : m[3] ? Infinity : +m[1] }
}
const ord = (n) => `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`
// Copies past the fourth are priced as the fourth in every scheme the MFM uses.
const COPIES = 4

// The price of each copy, compared copy by copy: GW moved Exorcist from "1st 180 / 2nd+ 220" to
// "1st-2nd 180 / 3rd+ 220" in v1.5 — the second copy got 40 cheaper, which neither a note-by-note
// match (four options gone and new) nor a rename-tolerant one (nothing changed) tells. Copies whose
// price moved the same way are joined into one range: "2nd: 220 → 180".
function diffPrices(was, now) {
  const groups = new Map()
  const add = (side, x) => {
    const n = parseNote(x.note)
    const k = `${x.models}|${n.variant}`
    if (!groups.has(k)) groups.set(k, { models: x.models, variant: x.note ? x.note.replace(RANGE, '').replace(/[\s(]+$/, '').trim() : '', was: [], now: [] })
    groups.get(k)[side].push({ ...n, points: x.points })
  }
  for (const x of was) add('was', x)
  for (const x of now) add('now', x)
  const fields = []
  const at = (list, c) => list.find((o) => o.lo <= c && c <= o.hi)?.points ?? null
  for (const g of groups.values()) {
    const tiered = g.was.length + g.now.length > 2 || [...g.was, ...g.now].some((o) => o.lo > 1 || o.hi !== Infinity)
    let run = null
    const flush = () => {
      if (!run) return
      const tier = !tiered ? '' : run.hi === COPIES && run.open ? `${ord(run.lo)}+` : run.lo === run.hi ? ord(run.lo) : `${ord(run.lo)}-${ord(run.hi)}`
      // `label`: the unit's make-up when the MFM names it ("3 Wolf Guard Headtakers"); `tier`: the
      // copies the price is for. The page words both (utils/copyTier.js).
      fields.push({ models: g.models, ...(g.variant ? { label: g.variant } : {}), ...(tier ? { tier } : {}), from: run.from, to: run.to })
      run = null
    }
    for (let c = 1; c <= COPIES; c++) {
      const from = at(g.was, c)
      const to = at(g.now, c)
      if (from === to) { flush(); continue }
      if (run && run.from === from && run.to === to) run.hi = c
      else { flush(); run = { lo: c, hi: c, from, to } }
      run.open = c === COPIES && [...g.was, ...g.now].some((o) => o.hi === Infinity)
    }
    flush()
  }
  return fields
}

export function diffMfm(a, b, faction, { tags = true } = {}) {
  const out = []
  if (!a || !b) return out
  const A = new Map((a.units || []).map((u) => [key(u.name), u]))
  const B = new Map((b.units || []).map((u) => [key(u.name), u]))
  for (const [k, u] of B) {
    const o = A.get(k)
    if (!o) { out.push({ faction, kind: 'points', name: u.name, change: 'added', options: (u.options || []).map((x) => ({ ...optLabel(x), to: x.points })) }); continue }
    const fields = diffPrices(o.options || [], u.options || [])
    if (fields.length) out.push({ faction, kind: 'points', name: u.name, change: 'changed', fields })
  }
  for (const [k, u] of A) if (!B.has(k)) out.push({ faction, kind: 'points', name: u.name, change: 'removed' })

  const enh = (m) => {
    const r = new Map()
    for (const d of m.detachments || []) for (const e of d.enhancements || []) r.set(`${key(d.name)}|${key(e.name)}`, { det: d.name, e })
    return r
  }
  const ea = enh(a)
  const eb = enh(b)
  for (const [k, { det, e }] of eb) {
    const o = ea.get(k)
    // A new enhancement arrives with its detachment, which the app's diff already reports.
    if (o && o.e.points !== e.points) out.push({ faction, kind: 'enhancementPoints', parent: det, name: e.name, change: 'changed', from: o.e.points, to: e.points })
  }
  // A detachment's UNIQUE tag — the MFM's own construct, which the app's tables do not carry (972:
  // "UNIQUE TAG REMOVED" over Aeldari's ACROBATIC, Drukhari's KABAL / WYCH CULT / COVENS and the
  // Genestealer Cults' PURESTRAIN). Shown like keywords: the tag that went, the tag that came.
  const da = new Map(tags ? (a.detachments || []).map((d) => [key(d.name), d]) : [])
  for (const d of tags ? b.detachments || [] : []) {
    const o = da.get(key(d.name))
    if (!o || (o.unique || '') === (d.unique || '')) continue
    out.push({ faction, kind: 'detachment', name: d.name, change: 'changed', fields: [{ field: 'tag', added: d.unique ? [d.unique] : [], removed: o.unique ? [o.unique] : [] }] })
  }
  return out
}
