// Two versions of a rule's text as one run of words, each kept, struck or added — what the patch
// notes page (PatchesView) prints for "was → now". Words, not letters: a rules change reads as a
// phrase replaced ("re-roll" → "add 1 to"), and a letter diff of that is noise.
//
// Longest common subsequence over the two word lists. Rule texts run to a few hundred words, so the
// O(n·m) table is a few hundred thousand cells at most; past CAP the texts are treated as rewritten
// whole rather than spending the page's time on a diff nobody could read anyway.
const CAP = 600 * 600

// The two texts as one list of words, each kept, struck or added: [{ t, w }]. `key` is what two
// words are compared by — the page compares them without their markup (`**`, `__`), so a word that
// only turned bold is the same word; a kept word is given as the NEW text has it.
export function diffWords(a, b, key = (w) => w) {
  // A line break is a word of its own, so a rule's paragraphs and list items survive the diff.
  const words = (t) => (t || '').match(/\n|[^\s]+/g) || []
  const A = words(a)
  const B = words(b)
  const out = []
  if (A.length * B.length > CAP) {
    for (const w of A) out.push({ t: 'del', w })
    for (const w of B) out.push({ t: w === '\n' ? 'same' : 'ins', w })
    return out
  }
  const KA = A.map(key)
  const KB = B.map(key)
  const n = A.length
  const m = B.length
  // L[i][j] = LCS length of A[i..] and B[j..], one flat array.
  const L = new Uint16Array((n + 1) * (m + 1))
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      L[i * (m + 1) + j] = KA[i] === KB[j] ? L[(i + 1) * (m + 1) + j + 1] + 1 : Math.max(L[(i + 1) * (m + 1) + j], L[i * (m + 1) + j + 1])
    }
  }
  let i = 0
  let j = 0
  while (i < n && j < m) {
    if (KA[i] === KB[j]) { out.push({ t: 'same', w: B[j] }); i++; j++ } else if (L[(i + 1) * (m + 1) + j] >= L[i * (m + 1) + j + 1]) out.push({ t: 'del', w: A[i++] })
    else out.push({ t: 'ins', w: B[j++] })
  }
  while (i < n) out.push({ t: 'del', w: A[i++] })
  while (j < m) out.push({ t: 'ins', w: B[j++] })
  return out
}

// The same as runs: [{ t: 'same' | 'del' | 'ins', s: 'words' }], neighbouring words of one kind joined.
export function wordDiff(a, b, key) {
  const out = []
  for (const { t, w } of diffWords(a, b, key)) {
    const last = out[out.length - 1]
    if (last?.t === t) last.s += ` ${w}`
    else out.push({ t, s: w })
  }
  return out
}
