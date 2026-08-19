// Generate src/data/roster/ru/texts.js — Russian for the wargear GROUP INSTRUCTIONS shown in the
// roster's unit configuration ("The Sister Superior's boltgun can be replaced with one of the
// following:"). 967 of them, ~99 KB, all machine-extracted from appdata by gen-roster-data.mjs.
//
// WHY GENERATED AND NOT TRANSLATED BY HAND. This corpus is regenerated on every appdata bump, so
// a hand translation would go stale exactly as fast as GW ships datasheets — the same drift the
// modifier layer's hash pinning exists to catch, except here it would be 967 strings instead of a
// few hundred records. The sentences are also formulaic: a handful of frames wrapped around
// weapon and unit names, and those names STAY ENGLISH by project convention (see wh11ed/CLAUDE.md
// — unit/weapon names and ALL-CAPS keywords are never translated), so only the frame needs
// Russian at all.
//
// FAIL-OPEN, AND WHY IT MATTERS. A sentence is translated only when it matches a frame end to
// end. Anything else is left out of the output entirely and the UI falls back to the English
// original — a fully English line reads fine, half-translated Russian does not. Coverage is
// reported on every run; treat a drop after an appdata bump as a signal that GW introduced a new
// wording, not as noise.
//
// Usage:
//   node scripts/gen-roster-texts-ru.mjs          # write + report
//   node scripts/gen-roster-texts-ru.mjs --check  # report only; non-zero exit if stale
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { ROOT, loadModule } from './lib/sync-common.mjs'

const OUT = path.join(ROOT, 'src/data/roster/ru/texts.js')

// ── Pieces every frame shares ───────────────────────────────────────────────────────────────
// A captured owner/subject slot is only trusted when it really is a bare noun phrase. The frames
// below use lazy `(.+?)` captures, which will happily swallow a leading condition ("If this unit
// contains 10 models, 1 Corsair Voidscarred") or a trailing qualifier ("1 Missionary model
// equipped with 1 plasma gun") and emit confident nonsense. Rejecting those makes the frame miss,
// and a miss leaves the whole sentence in English — which is the intended failure.
const SLOT_NOISE = /[,;:()]|\bif\b|\bfor every\b|\bequipped with\b|\bthat is\b|\bthat has\b|\bcontains\b|\bwith\b|^(?:each of|any|all|up to|either)\b/i
const plainSlot = (raw) => {
  const s = (raw || '').trim()
  return !!s && s.length <= 48 && !SLOT_NOISE.test(s) && !s.includes('\n')
}

// A VALUE slot ("…replaced with X") must be a plain list of items. Some instructions chain a
// second frame inside it ("…replaced with 1 shuriken pistol and one of the following:"), which a
// lazy capture happily swallows, leaving an English clause embedded in a Russian sentence.
const VALUE_NOISE = /one of the following|can be (?:replaced|equipped)|duplicates are not allowed/i
const plainValue = (raw) => !!(raw || '').trim() && !VALUE_NOISE.test(raw)

// The owner of a weapon: "This model", "The Sister Superior", "1 Battle Sister", "Each Wrack".
// Rendered in the genitive, which is the case every frame below needs it in.
// "Combat Servitor models" names a unit and then repeats the English noun; keeping it would read
// as "моделей Combat Servitor models".
const stripNoun = (s) => s.replace(/\s+in this unit$/i, '').replace(/(?:\s+|^)models?$/i, '').trim()
// " Raptors" or nothing at all — a bare "models" leaves no name to print, and a stray double
// space is exactly the kind of thing that makes generated text look generated.
const suffix = (s) => { const n = stripNoun(s); return n ? ` ${n}` : '' }

function ownerRu(raw) {
  const s = stripNoun(raw.trim().replace(/^The\s+/i, ''))
  if (/^this$/i.test(s)) return 'этой модели'
  if (/^each$/i.test(s)) return 'каждой модели'
  if (/^this unit$/i.test(s)) return 'этого отряда'
  const n = s.match(/^(\d+)\s*(.*)$/)
  if (n) return n[2] ? `${n[1]} модели ${n[2]}` : `${n[1]} модели`
  return s ? `модели ${s}` : 'модели'
}

// The same owner as a SUBJECT ("… can be equipped with …"), so nominative.
function subjectRu(raw) {
  const s = stripNoun(raw.trim().replace(/^The\s+/i, ''))
  if (/^this$/i.test(s)) return 'Эта модель'
  if (/^each$/i.test(s)) return 'Каждая модель'
  if (/^this unit$/i.test(s)) return 'Этот отряд'
  const n = s.match(/^(\d+)\s*(.*)$/)
  if (n) return n[2] ? `${n[1]} модель ${n[2]}` : `${n[1]} модель`
  return s ? `Модель ${s}` : 'Модель'
}

const verbFor = (raw) => (/^(this unit|each model|\d+\s)/i.test(raw.trim().replace(/^The\s+/i, '')) ? 'могут' : 'может')

// ── Frames. Ordered: the first match wins, so the most specific come first. ──────────────────
const FRAMES = [
  // "Up to 2 Celestian Insidiants can each have their condemnor bolt pistol replaced with 1 X."
  {
    re: /^Up to (\d+) (.+?) can each have (?:their|its) (.+?) replaced with one of the following:?\s*$/i,
    ok: (m) => plainSlot(m[2]),
    ru: (m) => `До ${m[1]} моделей${suffix(m[2])} могут заменить ${m[3]} на одно из:`,
  },
  {
    re: /^Up to (\d+) (.+?) can each have (?:their|its) (.+?) replaced with (.+?)\.?$/i,
    ok: (m) => plainSlot(m[2]) && plainValue(m[4]),
    ru: (m) => `До ${m[1]} моделей${suffix(m[2])} могут заменить ${m[3]} на ${joinRu(m[4])}.`,
  },
  // "All models in this unit can each have their X replaced with …" (and "All of the models…").
  {
    re: /^All (?:of the )?models in this unit can each have (?:their|its) (.+?) replaced with one of the following:?\s*$/i,
    ru: (m) => `Все модели отряда могут заменить ${m[1]} на одно из:`,
  },
  {
    re: /^All (?:of the )?models in this unit can each have (?:their|its) (.+?) replaced with (.+?)\.?$/i,
    ok: (m) => plainValue(m[2]),
    ru: (m) => `Все модели отряда могут заменить ${m[1]} на ${joinRu(m[2])}.`,
  },
  // "Any number of models can each be equipped with …" / "All models in this unit can each be…"
  {
    re: /^(?:Any number of models|All (?:of the )?models in this unit) can each be equipped with one of the following:?\s*$/i,
    ru: () => 'Каждая модель отряда может получить одно из:',
  },
  {
    re: /^(?:Any number of models|All (?:of the )?models in this unit) can each be equipped with (.+?)\.?$/i,
    ok: (m) => plainValue(m[1]),
    ru: (m) => `Каждая модель отряда может получить ${joinRu(m[1])}.`,
  },
  // "Any number of models can each replace their X with …"
  {
    re: /^Any number of (.+?) can each replace (?:their|its) (.+?) with one of the following:?\s*$/i,
    ru: (m) => `Любое количество моделей${suffix(m[1])} может заменить ${m[2]} на одно из:`,
  },
  {
    re: /^Any number of (.+?) can each replace (?:their|its) (.+?) with (.+?)\.?$/i,
    ok: (m) => plainValue(m[3]),
    ru: (m) => `Любое количество моделей${suffix(m[1])} может заменить ${m[2]} на ${joinRu(m[3])}.`,
  },
  // "The Skyreaver Felarch can replace its shuriken pistol with one of the following:"
  {
    re: /^(.+?) can replace (?:its|their) (.+?) with one of the following:?\s*$/i,
    ok: (m) => plainSlot(m[1]),
    ru: (m) => `${subjectRu(m[1])} ${verbFor(m[1])} заменить ${m[2]} на одно из:`,
  },
  {
    re: /^(.+?) can replace (?:its|their) (.+?) with (.+?)\.?$/i,
    ok: (m) => plainSlot(m[1]) && plainValue(m[3]),
    ru: (m) => `${subjectRu(m[1])} ${verbFor(m[1])} заменить ${m[2]} на ${joinRu(m[3])}.`,
  },
  // "The Voidreaver Felarch can be equipped with:" — the list follows as its own block.
  {
    re: /^(.+?) can be equipped with:\s*$/i,
    ok: (m) => plainSlot(m[1]),
    ru: (m) => `${subjectRu(m[1])} ${verbFor(m[1])} получить:`,
  },
  // "Any number of models can each have their hallowed mace replaced with …", and the same with
  // a named unit instead of the bare "models" ("Any number of Sisters Novitiate can each have…").
  {
    re: /^Any number of (.+?) can each have (?:their|its) (.+?) replaced with one of the following:?\s*$/i,
    ru: (m) => `Любое количество моделей${suffix(m[1])} может заменить ${m[2]} на одно из:`,
  },
  {
    re: /^Any number of (.+?) can each have (?:their|its) (.+?) replaced with (.+?)\.?$/i,
    ok: (m) => plainValue(m[3]),
    ru: (m) => `Любое количество моделей${suffix(m[1])} может заменить ${m[2]} на ${joinRu(m[3])}.`,
  },
  // "1 Missionary model can have its 1 plasma gun replaced with 1 meltagun."
  {
    re: /^(\d+) (.+?) models? can (?:each )?have (?:its|their) (.+?) replaced with one of the following:?\s*$/i,
    ru: (m) => `${m[1]} модель ${m[2]} может заменить ${m[3]} на одно из:`,
  },
  {
    re: /^(\d+) (.+?) models? can (?:each )?have (?:its|their) (.+?) replaced with (.+?)\.?$/i,
    ok: (m) => plainValue(m[4]),
    ru: (m) => `${m[1]} модель ${m[2]} может заменить ${m[3]} на ${joinRu(m[4])}.`,
  },
  // "The Sister Superior's boltgun can be replaced with one of the following:"
  {
    re: /^(?:The\s+)?(.+?)[’']s (.+?) can be replaced with one of the following:?\s*$/i,
    ok: (m) => plainSlot(m[1]),
    ru: (m) => `${m[2]} ${ownerRu(m[1])} можно заменить на одно из:`,
  },
  {
    re: /^(?:The\s+)?(.+?)[’']s (.+?) can be replaced with (.+?)\.?$/i,
    ok: (m) => plainSlot(m[1]) && plainValue(m[3]),
    ru: (m) => `${m[2]} ${ownerRu(m[1])} можно заменить на ${joinRu(m[3])}.`,
  },
  // "1 Battle Sister equipped with 1 boltgun can be equipped with 1 simulacrum imperialis"
  {
    re: /^(.+?) can be equipped with one of the following:?\s*$/i,
    ok: (m) => plainSlot(m[1]),
    ru: (m) => `${subjectRu(m[1])} ${verbFor(m[1])} получить одно из:`,
  },
  {
    re: /^(.+?) can be equipped with (.+?)\.?$/i,
    ok: (m) => plainSlot(m[1]) && plainValue(m[2]),
    ru: (m) => `${subjectRu(m[1])} ${verbFor(m[1])} получить ${joinRu(m[2])}.`,
  },
  // "If this model is equipped with a plasma pistol and a power weapon, it can be equipped with:"
  {
    re: /^If (.+?) is equipped with (.+?), it can be equipped with:?\s*$/i,
    ru: (m) => `Если ${subjectRu(m[1]).toLowerCase()} имеет ${m[2]}, ${verbFor(m[1])} получить:`,
  },
  // A bare "X can be replaced with …" with no possessive owner.
  {
    re: /^(.+?) can be replaced with one of the following:?\s*$/i,
    ok: (m) => plainSlot(m[1]),
    ru: (m) => `${m[1]} можно заменить на одно из:`,
  },
  {
    re: /^(.+?) can be replaced with (.+?)\.?$/i,
    ok: (m) => plainSlot(m[1]) && plainValue(m[2]),
    ru: (m) => `${m[1]} можно заменить на ${joinRu(m[2])}.`,
  },
]

// "For every 5 models in the unit: <clause> ◦ <clause>" — the head is translated here and each
// clause goes back through the frames, so this composes instead of needing its own copies.
const FOR_EVERY = /^For every (\d+) models in (?:the|this) unit[:,]\s*([\s\S]*)$/i

// Many instructions spell the choices out as a bullet list under the sentence
// ("…one of the following:\n• 1 holy eviscerator\n• 1 Ministorum hand flamer"). The list is
// nothing but weapon names and counts, which stay English anyway, so it is split off, the
// sentence above it translated, and the list re-attached verbatim.
const LIST_HEAD = /^([\s\S]*?one of the following:)\s*([\s\S]+)$/i

// "1 vexilla and 1 misericordia" — the connective between counted items is glue, not part of a
// weapon name, so it is safe to translate. Anchored on the count so a name containing "and"
// ("shield and sword") is left alone.
// …and "up to 4 big shootas" opens a value with an English quantifier rather than a name.
const joinRu = (s) => s
  .replace(/ and (?=\d)/g, ' и ')
  .replace(/^up to (?=\d)/i, 'до ')

function translateClause(text) {
  let s = text.trim()
  if (!s) return null

  const list = s.match(LIST_HEAD)
  let tail = ''
  if (list) {
    s = list[1].trim()
    tail = `\n${list[2].trim()}`
  }

  for (const f of FRAMES) {
    const m = s.match(f.re)
    if (!m) continue
    if (f.ok && !f.ok(m)) continue
    // appdata contains stray double spaces; they read as a generator slip once inside Russian.
    return (f.ru(m) + tail).replace(/[ \t]{2,}/g, ' ')
  }
  return null
}

export function translate(text) {
  const s = (text || '').trim()
  if (!s) return null

  const every = s.match(FOR_EVERY)
  if (every) {
    const head = `На каждые ${every[1]} моделей в отряде: `
    // One clause first. This has to come BEFORE splitting on ◦, because that same bullet also
    // separates the entries of an option list ("…one of the following: ◦ 1 X ◦ 1 Y") — splitting
    // blindly tore those lists into fragments that translate to nothing.
    const whole = translateClause(every[2])
    if (whole) return head + whole

    const parts = every[2].split(/\s*◦\s*/).map((p) => p.trim()).filter(Boolean)
    if (!parts.length) return null
    const out = parts.map(translateClause)
    if (out.some((p) => p === null)) return null // all or nothing
    return head + out.map((p) => p.replace(/\.$/, '')).join(' ◦ ')
  }

  return translateClause(s)
}

export async function run(argv = process.argv.slice(2)) {
  const check = argv.includes('--check')
  const mod = await loadModule(path.join(ROOT, 'src/data/roster/items.js'))
  const texts = mod?.default?.texts
  if (!texts) {
    console.log('  ⚠ could not read src/data/roster/items.js — run `npm run roster:data` first.')
    return 0
  }

  const out = {}
  const missed = []
  for (const [id, en] of Object.entries(texts)) {
    const ru = translate(en)
    if (ru) out[id] = ru
    else missed.push(en)
  }

  const total = Object.keys(texts).length
  const done = Object.keys(out).length
  console.log(`  ${done}/${total} instructions translated (${Math.round((done / total) * 100)}%), ${missed.length} left in English`)
  if (missed.length) {
    console.log('  untranslated wordings (first 5):')
    for (const m of missed.slice(0, 5)) console.log(`    • ${m.slice(0, 110)}`)
  }

  const body = `// Generated by gen-roster-texts-ru.mjs — do not edit. Re-run \`npm run roster:texts-ru\`.\n`
    + `// Russian for the wargear group instructions. Weapon and unit names stay English by project\n`
    + `// convention, so only the sentence frame is translated. A wording the generator doesn't\n`
    + `// recognise is absent here on purpose — the UI falls back to the English original rather\n`
    + `// than showing a half-translated line.\n`
    + `export default ${JSON.stringify(out, null, 2)}\n`

  const prev = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : null
  if (check) {
    if (prev !== body) {
      console.log('  --check: src/data/roster/ru/texts.js is stale; run `npm run roster:texts-ru`.')
      return 1
    }
    console.log('  --check: up to date.')
    return 0
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  if (prev !== body) fs.writeFileSync(OUT, body)
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
