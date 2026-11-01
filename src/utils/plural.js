// A count with its noun in the form the count takes: "1 win" / "2 wins", «1 победа» / «2 победы» /
// «5 побед». `forms` is one ui.js string, the forms joined by "|": two for English (one|other),
// three for Russian (one|few|many). A single form is used as it is.
/** The noun alone in the form the count takes. @param {number} n @param {string} forms */
export function countWord(n, forms) {
  const f = String(forms || '').split('|')
  if (f.length === 2) return n === 1 ? f[0] : f[1]
  if (f.length >= 3) {
    const d = Math.abs(n) % 10
    const dd = Math.abs(n) % 100
    return d === 1 && dd !== 11 ? f[0] : d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? f[1] : f[2]
  }
  return f[0]
}

/** @param {number} n @param {string} forms */
export function countLabel(n, forms) {
  return `${n} ${countWord(n, forms)}`
}

// A sentence with counts in it, cut into pieces for CountText.vue: `{k}` is the count k (a piece of
// its own, drawn apart), `{k:one|few|many}` the noun in the form k takes. Anything else is text.
/** @param {string} text @param {Record<string, number>} vals @returns {Array<{ t: string, n?: boolean }>} */
export function countPieces(text, vals) {
  const out = []
  let last = 0
  for (const m of String(text || '').matchAll(/\{(\w+)(?::([^}]*))?\}/g)) {
    if (m.index > last) out.push({ t: text.slice(last, m.index) })
    const v = vals[m[1]]
    if (v === undefined) out.push({ t: m[0] })
    else if (m[2] !== undefined) out.push({ t: countWord(Number(v), m[2]) })
    else out.push({ t: String(v), n: true })
    last = m.index + m[0].length
  }
  if (last < String(text || '').length) out.push({ t: text.slice(last) })
  return out
}
