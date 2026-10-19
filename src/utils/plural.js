// A count with its noun in the form the count takes: "1 win" / "2 wins", «1 победа» / «2 победы» /
// «5 побед». `forms` is one ui.js string, the forms joined by "|": two for English (one|other),
// three for Russian (one|few|many). A single form is used as it is.
/** @param {number} n @param {string} forms */
export function countLabel(n, forms) {
  const f = String(forms || '').split('|')
  let word = f[0]
  if (f.length === 2) word = n === 1 ? f[0] : f[1]
  else if (f.length >= 3) {
    const d = Math.abs(n) % 10
    const dd = Math.abs(n) % 100
    word = d === 1 && dd !== 11 ? f[0] : d >= 2 && d <= 4 && (dd < 12 || dd > 14) ? f[1] : f[2]
  }
  return `${n} ${word}`
}
