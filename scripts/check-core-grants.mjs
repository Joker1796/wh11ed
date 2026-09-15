// GATE: a rule whose prose hands a unit one of the rulebook's CORE abilities must say so in the
// modifier layer, so the card prints it on its Core line.
//
// WHY THIS GATE EXISTS. Tier C was described to its reviewers as the NUMERIC layer — "what does
// this rule do to the statline" — and a granted ability is not a number. So the review pass
// answered the question inconsistently: Tyranids' Chameleonic ("this unit has Stealth") got
// `{ stat: 'core', op: 'grant', value: 'Stealth' }` and the card prints it, while Adeptus
// Mechanicus' Stealth Optimisation ("friendly SKITARII INFANTRY units have Stealth") was closed as
// `reviewed: true, effects: []` and the card does not. Both readings are defensible from the layer's
// own description, which is exactly why a gate rather than a memo: 133 records had settled on the
// wrong one and nothing in the toolchain could tell.
//
// The damage is small and real. The rule is still ON the card either way — Tier B prints it as
// attributed prose — but the reader looking for what this unit HAS has to find it in a paragraph
// instead of on the line that lists exactly that. `stat: 'core'` exists, works, and is what puts it
// there.
//
// WHY `npm run modifiers:check` DOESN'T CATCH IT, AND SHOULDN'T. For that audit `reviewed: true` is
// a closed question: it reports records nobody has read and records whose prose moved, and both of
// those are clean here. A verdict that was read and decided wrongly is invisible to it by design —
// re-opening reviewed records on a heuristic is how a review queue becomes noise. This gate asks a
// single, narrow, answerable question instead, and carries its exceptions by name.
//
// SCOPE. Only the twelve abilities a rule can actually hand out (GRANTABLE_CORE, shared with the
// generator so the two cannot drift), and only the grant phrasings the generator itself proposes
// records for. Anything the prose does with a core ability OTHER than granting it — taking it away,
// naming it as a precondition — is not expressible in this layer and is listed in ALLOW with the
// reason, one entry per record. Deliberately not a negation regex: "does not have" is easy to spot
// and the next wording will not be, and a pattern that quietly swallows a whole class is how a gate
// stops biting. An ALLOW entry that stops matching is reported, so the list cannot rot.
//
// Usage:
//   node scripts/check-core-grants.mjs              # report; non-zero exit if anything is open
//   node scripts/check-core-grants.mjs --verbose    # also list what ALLOW suppressed
import { pathToFileURL } from 'node:url'
import { escapeRegex } from './lib/sync-common.mjs'
import { GRANTABLE_CORE, factionSlugs, sourceContext, sourcesForSlug, readExisting } from './gen-roster-modifiers.mjs'

// Records whose prose grants nothing, although it names a core ability in a granting shape. Every
// entry says which record and why, and is keyed by the record's `sid` — the identity that survives
// a GW rename, the same key the layer itself is built on.
const ALLOW = [
  { sid: '2d6fa7ff-94b7-4b14-ba9a-2e07817823cd:exorcist',
    name: 'adepta-sororitas · Exorcist: Devastating Refrain',
    why: 'the rule changes how an ENEMY model\'s own Deadly Demise resolves; it grants nobody the ability.' },
  { sid: 'fd72a239-683b-44f9-a38f-3e66c616faef',
    name: 'adeptus-custodes · Revered Companions',
    why: 'the Feel No Pain sits inside an aura ABILITY the rule hands out, and the rule carries two '
      + 'different reach clauses (Null Aegis one way, Deadly Unity the other), so detachmentAuraScopes '
      + 'reads no single gate — and index.test.js refuses a detachment aura without one.' },
  { sid: 'b9241196-72d9-4b64-94f2-7e485bf0a84b',
    name: 'aeldari · Ethereal Pathway',
    why: 'the rule grants the ability to units selected in a deployment step, from anywhere in the army; a '
      + 'record reaches the card it is printed on, the unit its bearer leads, or a unit inside an aura it '
      + 'carries — none of which can name a unit picked off the roster.' },
  { sid: '8ec01895-99aa-488d-9ee9-e49c6deb3585',
    name: 'aeldari · Strength from Death',
    why: 'the Fights First belongs to Lethal Reprisal, which picks one YNNARI unit at the start of the '
      + 'Fight phase — again a unit off the roster, which no target can name.' },
  { sid: '777969ea-dcca-4088-82fe-0b6eadb97124:the-visarch',
    name: 'aeldari · The Visarch: Yvraine’s Champion',
    why: 'the ability goes to another CHARACTER sharing the unit, not to the card it is printed on; the '
      + 'layer\'s targets are the card itself, the unit it leads and the Character leading it — none of '
      + 'them names a sibling Character.' },
  { sid: 'c63d8c87-0781-4ce3-9960-2f0d2b96df60',
    name: 'astra-militarum · Artillery Support',
    why: 'the Stealth belongs to Smoke Shells, one of three artillery options chosen each battle round, '
      + 'and goes to a number of units selected then — neither the choice nor the selection is something '
      + 'a record can name.' },
  { sid: 'c66da885-1906-4bf5-a086-a226b02b16a9:banesword',
    name: 'astra-militarum · Banesword: Armour Obliteration',
    why: 'the rule changes how an ENEMY model\'s own Deadly Demise resolves; it grants nobody the ability.' },
  { sid: '7df2649f-03eb-4f18-bc9c-3038fb440140:nork-deddog',
    name: 'astra-militarum · Nork Deddog: Ogryn Bodyguard',
    why: 'the ability goes to another CHARACTER sharing the unit, not to the card it is printed on; the '
      + 'layer\'s targets are the card itself, the unit it leads and the Character leading it — none of '
      + 'them names a sibling Character.' },
  { sid: '7df2649f-03eb-4f18-bc9c-3038fb440140:ogryn-bodyguard',
    name: 'astra-militarum · Ogryn Bodyguard: Ogryn Bodyguard',
    why: 'the ability goes to another CHARACTER sharing the unit, not to the card it is printed on; the '
      + 'layer\'s targets are the card itself, the unit it leads and the Character leading it — none of '
      + 'them names a sibling Character.' },
  { sid: '44f6e32f-71ad-4198-b5a4-17c2b54d388c',
    name: 'astra-militarum · Spec Ops Veteran',
    why: 'the Stealth is carried by an Order the bearer issues to another unit, and only while the attacks '
      + 'that triggered it are being resolved — the layer can name neither the unit the Order went to nor '
      + 'a window inside an attack sequence.' },
  { sid: '0a2f6202-af65-4e33-a67d-12b39c05b312',
    name: 'black-templars · Herald of Sacred Slaughter',
    why: 'the ability goes to the DEDICATED TRANSPORT the bearer begins the battle embarked within; the '
      + 'layer has no target for the transport an entry is inside, and the bearer itself gains nothing.' },
  { sid: 'b11810ea-a5f1-4a5f-ae70-54c95415b57d',
    name: 'chaos-daemons · First Prince of Chaos',
    why: 'the rule is a five-way split by Chaos god (KHORNE / TZEENTCH / NURGLE / SLAANESH / UNDIVIDED), '
      + 'and ruleScopes reads no scope off its body — so an effect would carry no gate and land on every '
      + 'unit in the army, which is the one direction an army-wide rule may not fail in.' },
  { sid: 'bcf36274-b2f2-4e89-9ec8-4b15779043cc',
    name: 'chaos-daemons · Seductive Gambit',
    why: 'the unit LOSES Fights First when it performs a Seductive Gambit; this layer can hand a core '
      + 'ability out, not take one away.' },
  { sid: '5b2a4659-4811-4b0a-8b4f-eb57b6008469',
    name: 'chaos-space-marines · Masters of Misdirection',
    why: 'the rule grants the ability to units selected in a deployment step, from anywhere in the army; a '
      + 'record reaches the card it is printed on, the unit its bearer leads, or a unit inside an aura it '
      + 'carries — none of which can name a unit picked off the roster.' },
  { sid: '188768af-2d22-45c5-ab28-2350970fdcfd',
    name: 'death-guard · Verminous Haze',
    why: 'the rule grants the ability to units selected in a deployment step, from anywhere in the army; a '
      + 'record reaches the card it is printed on, the unit its bearer leads, or a unit inside an aura it '
      + 'carries — none of which can name a unit picked off the roster.' },
  { sid: 'c08c0431-a879-4802-83e1-63248c280552',
    name: 'drukhari · Archraider',
    why: 'the ability goes to the DEDICATED TRANSPORT the bearer begins the battle embarked within; the '
      + 'layer has no target for the transport an entry is inside, and the bearer itself gains nothing.' },
  { sid: '152e049f-2e43-4e81-979e-29d3149737e0',
    name: 'drukhari · Informant Network',
    why: 'the rule grants the ability to units selected in a deployment step, from anywhere in the army; a '
      + 'record reaches the card it is printed on, the unit its bearer leads, or a unit inside an aura it '
      + 'carries — none of which can name a unit picked off the roster.' },
  { sid: 'c08a3b23-279d-4a26-b01f-2f6c41aa60af:locus',
    name: 'genestealer-cults · Locus: Bodyguard',
    why: 'the ability goes to another CHARACTER sharing the unit, not to the card it is printed on; the '
      + 'layer\'s targets are the card itself, the unit it leads and the Character leading it — none of '
      + 'them names a sibling Character.' },
  { sid: 'b58f14db-dd11-4e6c-80f0-7e3915af5840',
    name: 'genestealer-cults · Unquestioning Fanaticism',
    why: 'the Feel No Pain lands on the CHARACTER leading the unit, and a detachment rule may carry only '
      + 'an aura target — it has no way to address a unit\'s leader.' },
  { sid: 'f4ee723f-87ba-49df-a34a-a31358b591ae',
    name: 'grey-knights · Duty Unending',
    why: 'the ability is a PRECONDITION the rule reads ("if your unit has the Deep Strike ability…"), not '
      + 'something it hands out.' },
  { sid: 'faec38a4-dc35-4f94-a2bc-7529c196ad9b',
    name: 'grey-knights · Expeditious Exit',
    why: 'the ability is a PRECONDITION the rule reads ("if your unit has the Deep Strike ability…"), not '
      + 'something it hands out.' },
  { sid: '1d199aa0-6532-4d07-92b0-bb05550242b5',
    name: 'grey-knights · Mirage of Echoes',
    why: 'the ability is a PRECONDITION the rule reads ("if your unit has the Deep Strike ability…"), not '
      + 'something it hands out.' },
  { sid: '979b7a00-af6b-410d-b702-43ea02eb6148',
    name: 'grey-knights · Redirected Strike',
    why: 'the ability is a PRECONDITION the rule reads ("if your unit has the Deep Strike ability…"), not '
      + 'something it hands out.' },
  { sid: '47e924b5-01af-47a4-8ca8-509808d47818',
    name: 'grey-knights · Shadow of Anarch',
    why: 'the ability is a PRECONDITION the rule reads ("if your unit has the Deep Strike ability…"), not '
      + 'something it hands out.' },
  { sid: 'c994437c-491b-40e6-b0f2-de686fdc461c',
    name: 'imperial-agents · Clandestine Operation',
    why: 'the rule grants the ability to units selected in a deployment step, from anywhere in the army; a '
      + 'record reaches the card it is printed on, the unit its bearer leads, or a unit inside an aura it '
      + 'carries — none of which can name a unit picked off the roster.' },
  { sid: 'eecfa9a1-38bf-4ece-993b-b2ce3f595fad',
    name: 'imperial-agents · Combat Landers',
    why: 'the rule grants the ability to units selected in a deployment step, from anywhere in the army; a '
      + 'record reaches the card it is printed on, the unit its bearer leads, or a unit inside an aura it '
      + 'carries — none of which can name a unit picked off the roster.' },
  { sid: '607a4536-6c68-4bf8-ad36-382e18c16d12',
    name: 'imperial-agents · Orbital Oversight',
    why: 'the ability is a PRECONDITION the rule reads ("if your unit has the Deep Strike ability…"), not '
      + 'something it hands out.' },
  { sid: '3e661faf-c623-45b8-b474-70050fa69514:vindicare-assassin',
    name: 'imperial-agents · Vindicare Assassin: Dead‐shot',
    why: 'the ability TAKES Lone Operative away from enemy units; this layer can hand a core ability out, '
      + 'not remove one, and never from the opponent\'s list.' },
  { sid: '6ddcfb42-49e2-43ad-9517-3d69a35da32a:cryptothralls',
    name: 'necrons · Cryptothralls: Bound Creation',
    why: 'the Feel No Pain goes to the CRYPTEK sharing the unit, and the roster models no attachment '
      + 'either way for Cryptothralls — neither `leader` nor `led` can reach that card.' },
  { sid: '9579d65f-0b07-430d-9139-fa89007766eb',
    name: 'orks · Flyin’ Headbutt',
    why: 'the stratagem takes the unit\'s own Deadly Demise away before removing it; this layer can hand a '
      + 'core ability out, not remove one.' },
  { sid: 'f99f5ac3-b359-4859-963f-1bc4b3914700:caanok-var',
    name: 'space-marines · Caanok Var: Cerebrex Logic Engine',
    why: 'the rule grants the ability to units selected in a deployment step, from anywhere in the army; a '
      + 'record reaches the card it is printed on, the unit its bearer leads, or a unit inside an aura it '
      + 'carries — none of which can name a unit picked off the roster.' },
  { sid: 'b14b38af-00df-43ac-aad6-0595e00c441a',
    name: 'space-marines · Rapid-drop Deployment',
    why: 'the rule grants the ability to units selected in a deployment step, from anywhere in the army; a '
      + 'record reaches the card it is printed on, the unit its bearer leads, or a unit inside an aura it '
      + 'carries — none of which can name a unit picked off the roster.' },
  { sid: '11750a06-78b2-4ad9-8e19-24d83bc78038',
    name: 'space-marines · Tip of the Spear',
    why: 'the ability goes to the DEDICATED TRANSPORT the bearer begins the battle embarked within; the '
      + 'layer has no target for the transport an entry is inside, and the bearer itself gains nothing.' },
  { sid: 'ab224771-6fe8-474c-aa70-89ab5aa442ce:uriel-ventris',
    name: 'space-marines · Uriel Ventris: Master of the Fleet',
    why: 'the rule grants the ability to units selected in a deployment step, from anywhere in the army; a '
      + 'record reaches the card it is printed on, the unit its bearer leads, or a unit inside an aura it '
      + 'carries — none of which can name a unit picked off the roster.' },
  { sid: '95f3d7cd-07f9-4e45-bc44-9726c1bc9843',
    name: 'tau-empire · Fail-safe Detonator',
    why: 'the ability is a PRECONDITION the rule reads ("if your unit has the Deep Strike ability…"), not '
      + 'something it hands out.' },
  { sid: 'aa6050b1-4d24-4801-930e-e3871441ac4d',
    name: 'tau-empire · Student of Kauyon',
    why: 'the rule grants the ability to units selected in a deployment step, from anywhere in the army; a '
      + 'record reaches the card it is printed on, the unit its bearer leads, or a unit inside an aura it '
      + 'carries — none of which can name a unit picked off the roster.' },
  { sid: '5217a83b-742c-4e2a-966d-8ce26ec5adf8',
    name: 'thousand-sons · Risen Rubricae',
    why: 'the rule grants the ability to units selected in a deployment step, from anywhere in the army; a '
      + 'record reaches the card it is printed on, the unit its bearer leads, or a unit inside an aura it '
      + 'carries — none of which can name a unit picked off the roster.' },
  { sid: '01ac5989-ef6d-4d4b-a3ff-c9b389972480',
    name: 'tyranids · Unseen Lurkers',
    why: 'the ability is a PRECONDITION the rule reads ("if your unit has the Deep Strike ability…"), not '
      + 'something it hands out.' },
  { sid: 'aff00366-f427-452e-b17d-a7cb1b28ca6d',
    name: 'world-eaters · Aggressive Deployment',
    why: 'the ability goes to the DEDICATED TRANSPORT the bearer begins the battle embarked within; the '
      + 'layer has no target for the transport an entry is inside, and the bearer itself gains nothing.' },
]

// "has Stealth", "have the Feel No Pain 6+ ability", "gains Deep Strike" — the same shapes the
// generator proposes a record for (its CANDIDATE list), so a rule can never match here and go
// unproposed there.
const GRANT_RE = new RegExp(`\\b(?:has|have|gains?)\\s+(?:the\\s+)?(${GRANTABLE_CORE.map(escapeRegex).join('|')})\\b`, 'gi')

// The ability NAMES a piece of prose grants. Not the values — "Feel No Pain 4+ (vs mortal wounds)"
// is a reading, and reading it is the reviewer's job; the gate only asks whether that reading
// happened at all.
export function grantsInProse(prose) {
  const out = new Set()
  // appdata's own emphasis would otherwise split a name in two ("**Feel No Pain** 5+") and hide it.
  for (const m of String(prose || '').replace(/\*\*/g, '').matchAll(GRANT_RE)) out.add(m[1].toLowerCase())
  return out
}

// The ability names a record already accounts for. A value carries its qualifier ("Scouts 6\"",
// "Feel No Pain 5+ (vs Psychic Attacks)") and the gate matches on the name it starts with.
export function grantsInRecord(entry) {
  const out = new Set()
  for (const eff of entry?.effects || []) {
    if (eff.stat !== 'core' || eff.op !== 'grant') continue
    const value = String(eff.value || '').toLowerCase()
    for (const name of GRANTABLE_CORE) {
      if (value.startsWith(name.toLowerCase())) out.add(name.toLowerCase())
    }
  }
  return out
}

// The sentence the ability was found in, for the report — a reviewer should not have to open the
// bundle to see whether this is a grant or a mention.
function quote(prose, ability) {
  const flat = String(prose || '').replace(/\*\*/g, '').replace(/\s+/g, ' ')
  const at = flat.toLowerCase().indexOf(ability)
  if (at < 0) return flat.slice(0, 120)
  const from = Math.max(0, flat.lastIndexOf('.', at) + 1)
  const to = flat.indexOf('.', at)
  return flat.slice(from, to < 0 ? flat.length : to + 1).trim()
}

export async function run(argv = process.argv.slice(2)) {
  const verbose = argv.includes('--verbose')
  const ctx = sourceContext()
  const open = []
  const allowed = new Set()
  let checked = 0

  for (const slug of factionSlugs()) {
    const sources = sourcesForSlug(slug, ctx)
    if (!sources) continue
    const existing = await readExisting(slug)
    const bySid = new Map((existing?.entries || []).map((e) => [e.sid, e]))

    for (const src of sources) {
      const wanted = grantsInProse(src.prose)
      if (!wanted.size) continue
      checked++
      const entry = bySid.get(src.sid)
      const have = grantsInRecord(entry)
      const missing = [...wanted].filter((a) => !have.has(a))
      if (!missing.length) continue
      const hit = ALLOW.find((e) => e.sid === src.sid)
      if (hit) {
        allowed.add(src.sid)
        if (verbose) console.log(`  · allowed ${slug} · ${src.name} — ${hit.why}`)
        continue
      }
      open.push({ slug, src, entry, missing })
    }
  }

  let lastSlug = null
  for (const f of open) {
    if (f.slug !== lastSlug) { console.log(`\n  ${f.slug}`); lastSlug = f.slug }
    const where = `${f.src.kind}${f.src.det ? ` (${f.src.det})` : ''}`
    const state = !f.entry ? 'NO RECORD' : f.entry.reviewed ? 'reviewed, no core grant' : 'unreviewed'
    console.log(`  ~ ${f.src.name} — ${where} · ${state}`)
    for (const a of f.missing) console.log(`      ${a}: "${quote(f.src.prose, a)}"`)
  }

  // An ALLOW entry that matches nothing has outlived what it excused — the rule was rewritten, or
  // somebody filled the grant in. Either way the reason it records is no longer true.
  const stale = ALLOW.filter((e) => !allowed.has(e.sid))
  for (const e of stale) console.log(`  ! ALLOW entry ${e.name} (${e.sid}) matched nothing — delete it or fix what it was excusing.`)

  console.log(`\n  ${checked} rule(s) name a grantable core ability · ${open.length} without one in the modifier layer · ${allowed.size} allowed`)
  if (open.length || stale.length) {
    console.log('  Add the grant to the record in src/data/rosterModifiers/<faction>.js:')
    console.log("    { \"on\": \"unit\", \"stat\": \"core\", \"op\": \"grant\", \"value\": \"Stealth\", \"when\": null }")
    console.log('  …or, if the prose does something else with the ability, add an ALLOW entry with the reason.')
    return 1
  }
  console.log('  ✓ every rule that grants a core ability says so.')
  return 0
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href
if (isMain) process.exit(await run())
