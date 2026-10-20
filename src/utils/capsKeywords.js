import { foldName } from './foldName.js'

// The ALL-CAPS keywords our rule text writes, for the renderer to bold (useRenderInline's
// AUTO_BOLD_RE). The data writes a keyword in capitals and leaves the bold to the renderer, which
// knew only the core and Faction keywords — so "ORKS AIRCRAFT/DEFFKOPTAS" came out half bold, and
// ~1460 unit keywords (MOUNTED, DAMNED, JUMP PACK…) were bold where somebody had added `**` and
// plain where nobody had (a player's screenshot, 2026-10-20). The GW app marks the whole of it.
//
// A run of capitals is split into the longest phrases the keyword vocabulary knows (every keyword
// a unit carries, its datasheet name included — gen-datasheet-index.mjs); a word that is no
// keyword ("WHEN", "AND") is left alone and splits the run. A plural is the singular's keyword
// (DEFFKOPTAS is a name, TERMINATORS a keyword's plural). Only the phrases the data actually writes
// are kept, so the list the shell carries is what the text needs and no more.
//
// Shared by the generator (which writes src/data/capsKeywords.js) and capsKeywords.test.js (which
// re-reads the data and fails when the written list is out of date).

const TOKEN = /(?:[A-Z][A-Z’'-]*[A-Z]|[A-Z])/
// A run: capital words joined by single spaces. A slash, a comma, a lowercase word end it.
const RUN = new RegExp(`(?<![\\p{L}\\p{N}’'-])${TOKEN.source}(?: ${TOKEN.source})*(?![\\p{L}\\p{N}’'-])`, 'gu')
const MAX_WORDS = 6

/**
 * The keyword phrases, as spelled, that the ALL-CAPS runs of `text` are made of.
 * @param {string} text @param {Set<string>} vocabulary folded keywords @param {Set<string>} into
 */
export function capsKeywordsIn(text, vocabulary, into = new Set()) {
  for (const m of String(text || '').matchAll(RUN)) {
    const words = m[0].split(' ')
    for (let i = 0; i < words.length;) {
      let took = 0
      for (let n = Math.min(MAX_WORDS, words.length - i); n > 0 && !took; n--) {
        const phrase = words.slice(i, i + n).join(' ')
        if (phrase.length < 3) continue
        const k = foldName(phrase)
        if (vocabulary.has(k) || (k.endsWith('s') && vocabulary.has(k.slice(0, -1)))) {
          into.add(phrase)
          took = n
        }
      }
      i += took || 1
    }
  }
  return into
}

/** A source the scan reads: hand-written data, not a generated file (those say so on line 1). */
export const isScannedSource = (text) => !String(text).startsWith('// Generated')
