// @ts-check
// One roster unit's card, resolved: the printed datasheet, everything the roster does to it, and
// the prose of the rules that did it. Two screens read a unit this way — RosterUnitRulesModal (a
// card opened from a list, with the live game's chips around it) and the print sheet (every unit
// of the list, one after another, with no chips at all) — and they must never disagree about what
// a unit's Save is, because that is the number a player reads off a phone and a sheet of paper in
// the same game.
//
// WHAT IT DOES NOT DO: nothing here draws, opens a popover or knows about a game. Chips, switches
// and the stratagem cards behind them stay with the modal, which is the only screen that has them;
// this file answers what the card SAYS.
//
// The argument is the calling component's own `props` object (reactive), and it reads four fields:
//   unitId, factionSlug  — which datasheet, from whose file;
//   ctx                  — the roster entry and its surroundings ({ entry, def, items, units,
//                          detachments }); without it this is a plain datasheet, unchanged;
//   gameCtx              — the live game, when there is one. Off the table it is absent and the
//                          list still answers for itself (see activeConds).
//
// Everything loads lazily and per faction: the datasheets, the hand-authored faction bundle (army
// rule / detachment rules / enhancement prose) and the numeric modifier layer, each guarded so a
// faction switched mid-flight cannot land on the wrong card.
import { computed, ref, shallowRef, watch } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from './useLocale.js'
import { overlaySheet, enhKey, findEnhancementProse, wargearConditions } from '../core/rules/rosterModifiers.js'
import { detKey } from '../core/shared/slugify.js'
import { ruleAppliesTo, unitKeywordsOf } from '../core/rules/ruleTargets.js'
import { applyStatMods, splitBearers, resolveModifierEntries, allegianceChoiceOf, grantedKeywordsFrom, datasheetEntriesFor, gateStratagems, attachedUnitKeywords, armyRuleMatches, armyRuleSection, attachmentContext } from '../core/rules/rosterStatMods.js'
import { abilityStatusesOf } from '../core/rules/abilityStatus.js'
import { rosterConditions } from '../core/rules/rosterGameContext.js'
import { unitDoctrines } from '../core/rules/doctrineRules.js'
import { foldName } from '../core/shared/foldName.js'
import { coreModifiers } from '../data/rosterModifiers/coreRules.js'
import { conditions } from '../core/rules/conditions.js'
import { loadDatasheets, loadKeywordVocabulary } from '../data/datasheets/index.js'
import { useCombatPatrolBox } from './useCombatPatrolBox.js'
import { localizeSheet } from '../data/datasheets/ru/index.js'
import { useDatasheetsRu } from './useDatasheetsRu.js'

/** @typedef {import('../core/shared/data.types.js').Datasheet} Datasheet */
/** @typedef {import('../core/shared/data.types.js').FactionRules} FactionRules */
/** @typedef {import('../core/shared/roster.types.js').ModifierRecord} ModifierRecord */
/** @typedef {import('../core/shared/roster.types.js').CondSwitch} CondSwitch */
/** A note under the stats, as applyStatMods writes it. @typedef {ReturnType<typeof applyStatMods>['notes'][number]} StatNote */
/**
 * The calling component's props.
 * @typedef {object} UnitCardProps
 * @property {string} unitId
 * @property {string} factionSlug
 * @property {import('../core/rules/rosterModifiers.js').OverlayContext | null} [ctx]
 * @property {import('../core/shared/roster.types.js').CardGameCtx | null} [gameCtx]
 */

/** @param {UnitCardProps} props */
export function useRosterUnitCard(props) {
  const { locale } = useLocale()
  const labels = computed(() => ui[locale.value])

  /** @type {import('vue').Ref<Datasheet[]>} */
  const datasheets = ref([])
  // Every keyword in the game, for the rule gates (ruleTargets' scopesMisread). Not deep-reactive:
  // a few thousand strings, replaced whole.
  /** @type {import('vue').ShallowRef<string[] | null>} */
  const keywordVocabulary = shallowRef(null)
  const loaded = ref(false)
  // A Combat Patrol box's units have their sheets in combatPatrol.js (useCombatPatrolBox).
  const cpBox = useCombatPatrolBox()
  watch(
    [() => props.factionSlug, cpBox],
    async ([slug, cp]) => {
      datasheets.value = []
      loaded.value = false
      if (!slug) return
      // The vocabulary with them: the rule gates read it as soon as the sheets land (ruleTargets.js).
      const [list, vocab] = await Promise.all([loadDatasheets(slug, { cp }), loadKeywordVocabulary()])
      if (props.factionSlug !== slug || cpBox.value !== cp) return
      keywordVocabulary.value = vocab
      if (list) datasheets.value = list
      loaded.value = true
    },
    { immediate: true },
  )

  const ruModule = useDatasheetsRu(() => props.factionSlug, () => cpBox.value)

  // Any datasheet from this faction, in the current locale. Shared by the viewed sheet and by an
  // attached Leader's abilities below — those must be translated too, not left English in RU.
  /**
   * @template {Datasheet | null} S
   * @param {S} en
   * @returns {S}
   */
  function localize(en) {
    if (!en || locale.value !== 'ru') return en
    const mod = ruModule.value
    if (!mod) return en
    return localizeSheet(en, mod.default?.[en.id], mod.abilityNamesRu)
  }

  // The printed sheet, in the current locale.
  const sheet = computed(() => localize(datasheets.value.find((d) => d.id === props.unitId) || null))

  // The sheets that are part of THIS unit without being a unit of their own: a free datasheet of
  // the faction that shares a rule with this one — Sir Hekhtur, who climbs out of Canis Rex when the
  // Knight falls ("Using Sir Hekhtur" on both). No list can buy him, so without this his card was
  // nowhere in a roster or a game (player report e6093db4, 2026-10-03).
  const companions = computed(() => {
    const own = datasheets.value.find((d) => d.id === props.unitId)
    if (!own) return []
    const names = new Set((own.rules || []).map((r) => (r.name || '').toLowerCase()))
    if (!names.size) return []
    return datasheets.value
      .filter((d) => d.id !== own.id && !d.points?.length && (d.rules || []).some((r) => names.has((r.name || '').toLowerCase())))
      .map(localize)
  })

  // The units this unit's abilities bring into the game — the roster's `spawns` (gen-roster-data):
  // Ripper Swarms on a Parasite of Mortrex, Spore Mines on Biovores. Not in the list and not paid
  // for, but theirs is the card the player reads when one appears (a player's report, 2026-10-17).
  const spawned = computed(() => (props.ctx?.def?.spawns || []).flatMap((s) => {
    const d = datasheets.value.find((x) => x.id === s.id)
    return d ? [{ sheet: localize(d), rule: s.rule }] : []
  }))

  // …and what it looks like for THIS roster entry. Overlaying after localisation (not before) keeps
  // the two concerns apart: the overlay matches on structural ids and English wargear names, so it
  // behaves identically in both locales.
  // `unitId`/`factionSlug` are this component's own props, so a caller's ctx never has to repeat
  // them — it supplies only what it alone knows (the entry, its def, the roster's detachments).
  // Faction RULES (army rule / detachment rules / enhancement prose) — the heavy hand-authored
  // bundle, so it's dynamic-imported and only when this unit actually has roster context to
  // explain. Same load path as EnhancementRuleModal and RosterViewView's Rules tab; a faction's
  // chunk is ~30-60 KB and is precached for the installed PWA, so an opened modal doesn't go to
  // the network offline.
  /** @type {import('vue').Ref<FactionRules | null>} */
  const rulesFaction = ref(null)
  // The same faction data, never RU-overlaid: ruleTargets.js reads English prose (keywords stay
  // English by project convention, the sentences around them do not), so the gate would silently
  // stop matching in RU if it read the localised bodies.
  /** @type {import('vue').Ref<FactionRules | null>} */
  const rulesFactionEn = ref(null)
  // EN stratagem name → RU display name, for the chips (RU locale only; null in EN).
  /** @type {import('vue').Ref<Record<string, string> | null>} */
  const stratNamesRu = ref(null)
  watch(
    [() => props.factionSlug, () => !!props.ctx, locale, cpBox],
    async ([slug, hasCtx, loc, cp]) => {
      rulesFaction.value = null
      rulesFactionEn.value = null
      stratNamesRu.value = null
      if (!slug || !hasCtx) return
      // A Chapter's cards read the Codex: Space Marines detachments too (loadFactionWithCodex), and
      // a Combat Patrol box's its own box's.
      const { loadFactionWithCodex } = await import('./rosterFactionRules.js')
      const { en, local, stratNamesRu: namesRu } = await loadFactionWithCodex(slug, loc, cp)
      if (props.factionSlug !== slug || locale.value !== loc || cpBox.value !== cp) return
      rulesFactionEn.value = en
      stratNamesRu.value = namesRu
      rulesFaction.value = local
    },
    { immediate: true },
  )

  // The numeric modifier layer (Tier C). Lazily imported per faction and entirely optional: if the
  // directory is gone, or the faction has no file, this stays null and the card keeps its printed
  // numbers — Tiers A+B, unchanged.
  /** @type {import('vue').Ref<{ entries?: ModifierRecord[] } | null>} */
  const modifierData = ref(null)
  // Settled once the load has answered, null or not — what may hang on a record (a rule's
  // `appliesWhile`) waits for this rather than reading "no record" off a load still in flight.
  const modifiersSettled = ref(false)
  watch(
    [() => props.factionSlug, () => !!props.ctx],
    async ([slug, hasCtx]) => {
      modifierData.value = null
      modifiersSettled.value = false
      if (!slug || !hasCtx) return
      const { loadRosterModifiersFor } = await import('../data/rosterModifiers/index.js')
      const data = await loadRosterModifiersFor(slug)
      if (props.factionSlug !== slug) return
      modifierData.value = data
      modifiersSettled.value = true
    },
    { immediate: true },
  )

  const view = computed(() => overlaySheet(sheet.value, {
    ...(props.ctx || {}),
    unitId: props.unitId,
    factionSlug: props.factionSlug,
  }))
  // Resolve each rule source (rosterModifiers.js said WHICH rules bear on this unit) to the prose
  // that renders. A source whose text can't be found is dropped rather than shown as an empty
  // accordion — the roster layer and the hand-authored faction files are separate datasets and a
  // name can legitimately fail to resolve.
  // Every unit's keyword set in this faction, for ruleTargets.js's "the extraction matched nobody,
  // so distrust it" guard. Cheap: the datasheets are already loaded for the card above.
  const factionKeywordSets = computed(() =>
    datasheets.value.map(unitKeywordsOf))

  // The keywords printed on the sheet plus every one the roster grants it. Two sources, and the
  // order matters: a granted keyword decides which RULES bear on the unit, so it has to be resolved
  // before any gating — Necrons' Destroyer Ankh gives its bearer DESTROYER CULT, and only then does
  // Cold Fervour's first bullet (+2 Strength to every DESTROYER CULT model) reach that Overlord.
  const modifierGrantedKeywords = computed(() => {
    const printed = datasheets.value.find((d) => d.id === props.unitId)
    const base = [...unitKeywordsOf(printed), ...view.value.grantedKeywords.map((g) => g.kw)]
    return grantedKeywordsFrom(resolvedModifiers.value, { own: base, unit: [...base, ...attachedKeywords.value] }, factionKeywordSets.value, activeConds.value, activeStratIds.value, keywordVocabulary.value)
  })

  const unitKeywords = computed(() => {
    const en = datasheets.value.find((d) => d.id === props.unitId)
    // Keywords a detachment GRANTS count too — a unit made Battleline by the roster's detachment is
    // targeted by a rule that says "BATTLELINE units from your army".
    return [
      ...unitKeywordsOf(en),
      ...view.value.grantedKeywords.map((g) => g.kw),
      ...modifierGrantedKeywords.value.map((g) => g.kw),
    ]
  })

  // Everything the card should show as gained rather than printed: the structural sidecar's grants
  // (a detachment making a unit Battleline) and the modifier layer's own.
  const allGrantedKeywords = computed(() => {
    const seen = new Set()
    const out = []
    for (const g of [...view.value.grantedKeywords, ...modifierGrantedKeywords.value.map((g) => ({ kw: g.kw, detName: g.source, extra: false }))]) {
      const key = g.kw.toLowerCase()
      if (seen.has(key)) continue
      seen.add(key)
      out.push(g)
    }
    return out
  })

  // The army rule is NOT one of the blocks below: it belongs on the card's own "Faction:" line,
  // which is the datasheet's own statement of which army rule it has, and opens from there in the
  // same popover a core ability uses. A sheet with no faction line (128 of them — Anathema
  // Psykana, Aeldari wraith constructs, aircraft) genuinely has no army rule, so nothing to open.
  const linkedFactionRules = computed(() => {
    const name = rulesFaction.value?.armyRule?.name
    return name && rulesFaction.value?.armyRule?.body ? [name] : []
  })

  // The prose behind ONE modifier note, in the current locale — the army rule, a detachment rule or
  // an enhancement, found the same way ruleBlocks below finds them. Returns null when the record's
  // rule can't be resolved (an allegiance ability carries no body at all, and the two datasets can
  // legitimately disagree about a name), and then the note simply stays plain text.
  /** @param {StatNote | null | undefined} n @returns {{ name: string, body: string } | null} */
  function modSource(n) {
    const fac = rulesFaction.value
    if (!fac || !n) return null
    if (n.kind === 'armyRule') {
      if (!fac.armyRule?.body) return null
      // A rule folded into ours as a `### ` section opens that section alone — Custodes' Daughters
      // of the Abyss, not the Martial Ka'tah it sits under (a player's report, 2026-10-16), and
      // Tyranids' Synapse without the Shadow in the Warp merged beside it.
      const section = armyRuleSection(fac.armyRule.body, n.source)
      if (section) return { name: n.source, body: section }
      return armyRuleMatches(n.source, fac.armyRule.name) ? { name: fac.armyRule.name, body: fac.armyRule.body } : null
    }
    const det = n.det ? (fac.detachments || []).find((d) => detKey(d.name) === detKey(n.det)) : null
    if (n.kind === 'detachmentRule') {
      return det?.rule?.body ? { name: det.rule.name, body: det.rule.body } : null
    }
    if (n.kind === 'enhancement') {
      const found = findEnhancementProse(det ? [det] : fac.detachments, n.source, props.ctx?.detachments)
      return found?.body ? { name: found.name, body: found.body } : null
    }
    return null
  }

  // The card's notes, each told whether its rule can be opened. Resolving here rather than inside
  // DatasheetCard keeps that component free of faction data — it renders what it is handed.
  const statNotes = computed(() => statMods.value.notes.map((n) => (
    modSource(n) ? { ...n, hasSource: true } : n
  )))

  // A chip that names somebody's printed rule carries its text (the caller resolved it) — the "i"

  // Does a rule bear on this unit? Read from the EN body (see rulesFactionEn); the block that
  // renders still shows the localised text.
  /** @param {string | null | undefined} enBody */
  function applies(enBody) {
    return ruleAppliesTo(enBody, keywordView.value, factionKeywordSets.value, keywordVocabulary.value)
  }

  // Resolve each usable record to the ENGLISH rule prose it was read from, dropping anything this
  // unit isn't carrying or isn't targeted by. `ref` is the wh11ed-side pointer the generator wrote
  // (see gen-roster-modifiers.mjs) — matching by id, not by name, so a GW rename can't silently
  // detach a modifier from its rule.
  const resolvedModifiers = computed(() => [...coreModifiers, ...abilityModifiers.value, ...resolveModifierEntries(
    usableModifierEntries.value,
    rulesFactionEn.value,
    props.ctx?.detachments,
    view.value.context?.enhancement?.name,
    // The mark this entry chose — a Daemonic Allegiance record modifies only the model that took it.
    allegianceChoiceOf(props.ctx?.def, props.ctx?.entry),
  )])

  // A datasheet ability can modify the unit it is ATTACHED to, so this card's records include the
  // abilities of whoever leads this entry and of whoever it leads. The roster records both
  // attachments; nothing here is inferred from prose.
  const abilityModifiers = computed(() => {
    const units = props.ctx?.units || []
    const entry = props.ctx?.entry
    if (!entry) return []
    // A unit that joined a led unit is told apart by its roster definition (`joins`): this card's
    // own is ctx.def, the others' come from ctx.defOf where the caller has one.
    /** @param {Partial<import('../core/shared/roster.types.js').RosterEntry>} u */
    const defOf = (u) => (u.uid === entry.uid ? props.ctx?.def : u.id ? props.ctx?.defOf?.(u.id) : null)
    return datasheetEntriesFor(usableModifierEntries.value, {
      unitId: props.unitId,
      ...attachmentContext(entry, units, {
        defOf,
        sheetOf: (id) => datasheets.value.find((d) => d.id === id),
        items: props.ctx?.items,
        detachments: props.ctx?.detachments,
      }),
      // Auras the player marked on this unit, from the same store the list's chips write to — the
      // ones 22.01 makes certain (the bearer's own unit, the unit it is attached to) are not in it.
      auraOn: activeAuraIds.value,
    })
  })

  // The auras the player says are reaching this unit, as a set of record ids — the chips live on the
  // unit's row in the list, next to Battle-shock, and this is the same state read from the card.
  const activeAuraIds = computed(() => new Set((props.gameCtx?.auras || []).filter((a) => a.on).map((a) => a.id)))

  // The stratagems the player says are up on this unit, as a set of record ids. Shared by the stat
  // pass and the keyword pass so the two cannot disagree about whether one is in force.
  // Everything the player has NAMED on this card, as record ids: stratagems spent on it, and the
  // ability-set options picked anywhere in the army (a relic picked on the Triumph feeds the aura
  // that lands here — see rosterGameContext's allPicks), and the once-per-battle rules used on it
  // whose window is still open (`live`: a use whose window closed stays ticked but changes nothing).
  const activeStratIds = computed(() => new Set([
    ...(props.gameCtx?.strats || []).filter((st) => st.on).map((st) => st.id),
    ...(props.gameCtx?.uses || []).filter((u) => u.live).map((u) => u.id),
    ...(props.gameCtx?.chosen || []),
  ]))

  // What is true for this unit right now. In a game the tracker answers (gameCtx.active); off the
  // table the LIST still answers for itself — an enhancement gated on "while the bearer is leading a
  // unit" is proven by the roster, with no game needed — and nothing else can be true.
  // What is true for this entry: the game's answer when there is one, the list's own otherwise —
  // and in both cases what the entry's wargear proves (a pair of macro-scalpels, a Helbrute's two
  // melee weapons), which neither the tracker nor the switches know about: it is read off the
  // loadout the card itself prints (rosterModifiers' wargearConditions).
  const gearConds = computed(() => {
    const printed = datasheets.value.find((d) => d.id === props.unitId)
    return wargearConditions(props.ctx?.def, props.ctx?.entry, props.ctx?.items, printed)
  })
  // The doctrines the attached unit's own rules make permanent — Calgar's unit has all three in the
  // list as much as in the game (doctrineRules.js; the game's view reads the same texts, plus the
  // wargear it carries, which a list read here does not resolve).
  const unitProves = computed(() => {
    const entry = props.ctx?.entry
    const facEn = rulesFactionEn.value
    if (!entry || !facEn) return null
    const units = props.ctx?.units || []
    const hostUid = entry.leaderOf || entry.uid
    const parts = units.filter((u) => u.uid === hostUid || u.leaderOf === hostUid)
    /** @param {string | undefined} id */
    const sheetOf = (id) => datasheets.value.find((d) => d.id === id)
    const texts = (parts.length ? parts : [entry]).flatMap((p) => {
      const sheet = sheetOf(p.id)
      const enh = p.enh ? findEnhancementProse(facEn.detachments, p.enh, props.ctx?.detachments)?.body : null
      return [
        ...(sheet?.abilities || []).map((a) => a.text),
        ...(sheet?.abilitySets || []).flatMap((set) => (set.options || []).map((o) => o.text)),
        ...(enh ? [enh] : []),
      ]
    })
    const fielded = new Set((props.ctx?.detachments || []).map((d) => detKey(typeof d === 'string' ? d : d?.name)))
    const detTexts = (facEn.detachments || []).filter((d) => fielded.has(detKey(d.name))).map((d) => d.rule?.body || '')
    const kws = new Set((parts.length ? parts : [entry]).flatMap((p) => unitKeywordsOf(sheetOf(p.id))).map((k) => foldName(k)))
    return unitDoctrines({ texts, detTexts, hasKeyword: (kw) => kws.has(foldName(kw)) }).proves
  })
  const activeConds = computed(() => {
    const base = props.gameCtx?.active || rosterConditions(props.ctx?.entry, props.ctx?.units, (id) => datasheets.value.find((d) => d.id === id), unitProves.value)
    return gearConds.value.size ? new Set([...base, ...gearConds.value]) : base
  })

  // Core Rules 19.03: an attached unit has every keyword of every unit in it, so a rule or stratagem
  // that names one of them as UNITS bears on the whole attached unit — this card included (a
  // Commander's BATTLESUIT CHARACTER brings Experimental Prototype Cadre's +6" to the Crisis
  // Battlesuits he leads). Only the printed keywords of the other halves; what the modifier layer
  // grants THEM is a fact about their own card.
  const attachedKeywords = computed(() => attachedUnitKeywords(
    props.ctx?.entry,
    props.ctx?.units,
    (id) => {
      const d = datasheets.value.find((x) => x.id === id)
      return unitKeywordsOf(d)
    },
  ))
  // The two sets a rule's target is judged against (ruleTargets' scopeHits): the card's own for a
  // target written as models, the whole attached unit's for one written as units.
  const keywordView = computed(() => ({ own: unitKeywords.value, unit: [...unitKeywords.value, ...attachedKeywords.value] }))

  // …and the stratagems this unit cannot be the target of are dropped before anything reads them, so
  // the card's notes and the chips it is handed can never disagree about which ones are on offer.
  // After the keyword grants, never before: a stratagem naming DESTROYER CULT is on offer to the
  // Overlord whose Destroyer Ankh granted him that keyword.
  const gatedModifiers = computed(() => gateStratagems(
    resolvedModifiers.value,
    keywordView.value,
    factionKeywordSets.value,
    activeConds.value,
    !!props.ctx?.entry,
    keywordVocabulary.value,
  ))

  const statMods = computed(() => {
    if (!gatedModifiers.value.length) return { sheet: view.value.sheet, notes: [], marks: [] }
    // "The bearer only": the models that carry the item get a row of their own first.
    const placed = splitBearers(view.value.sheet, gatedModifiers.value, props.ctx?.def, props.ctx?.entry, props.ctx?.items)
    return applyStatMods(
      placed.sheet,
      placed.entries,
      keywordView.value,
      factionKeywordSets.value,
      activeConds.value,
      activeStratIds.value,
      keywordVocabulary.value,
    )
  })

  const usableModifierEntries = computed(() => {
    const entries = modifierData.value?.entries || []
    return entries.filter((e) => e.reviewed && e.effects?.length)
  })

  // Which of the sheet's OWN abilities the list already answers for — the ones gated on "while this
  // model is leading a unit". Read off the ENGLISH sheet (the RU prose is translated, and a
  // translated sentence is not something to pattern-match) and keyed by English name, which is what
  // DatasheetCard looks up. Only with roster context: on a plain datasheet page there is no
  // attachment to report, and an unconditional "not attached" would be a statement about nothing.
  const abilityStates = computed(() => {
    if (!props.ctx) return null
    const en = datasheets.value.find((d) => d.id === props.unitId)
    if (!en) return null
    return abilityStatusesOf(en, {
      // The attachment as the roster records it: the name when it resolves, otherwise just the fact.
      leading: view.value.context?.attachedTo || (props.ctx?.entry?.leaderOf ? true : null),
      // Some other entry is attached to this one — the same fact ruleSources reports as a Leader
      // block, so the two can never disagree.
      led: view.value.ruleSources.some((src) => src.kind === 'leader'),
    })
  })

  // The switches that belong to ONE rule: the conditions its own reviewed modifier records name,
  // looked up in the switch lists the game context handed down. A condition with no switch there is
  // one the game answers by itself (the clock, the tracker, the roster) or one nothing on this card
  // can change — either way there is nothing to offer, so it is left out rather than shown dead.
  /**
   * @param {string} kind
   * @param {string | null | undefined} name
   * @param {string | null | undefined} det
   * @returns {CondSwitch[]}
   */
  function switchesOfRule(kind, name, det) {
    const all = [...(props.gameCtx?.switches || []), ...(props.gameCtx?.armySwitches || [])]
    if (!all.length) return []
    const ids = new Set()
    for (const rec of resolvedModifiers.value) {
      if (rec.kind !== kind) continue
      if (kind === 'detachmentRule' ? detKey(rec.det) !== detKey(det) : enhKey(rec.name) !== enhKey(name)) continue
      for (const eff of rec.effects || []) for (const id of eff.cond || []) ids.add(id)
    }
    return all.filter((sw) => ids.has(sw.id))
  }

  // The switches each of the sheet's OWN abilities is gated on, keyed by English ability name. Only
  // `self` records: an ability printed on a Leader's card is not in this sheet's ability list, and
  // its condition belongs to the unit it addresses, which has its own row and its own card.

  // A rule in force only inside an attached unit — "While a NECRONS CHARACTER model is leading
  // this unit" (Command Protocols), "While the bearer is leading an Aspect Warriors unit" — says so
  // in its record's `appliesWhile`, and the list answers it the way it answers the effects' own
  // `cond`. Returns the conditions the list does NOT answer (empty: the rule holds), or null while
  // the records are still loading. A preview with no entry has no attachment to ask about.
  /** @param {string} kind @param {(r: ModifierRecord) => boolean} match @returns {string[] | null} */
  function unmetFor(kind, match) {
    if (!props.ctx?.entry) return []
    if (!modifiersSettled.value) return null
    const rec = (modifierData.value?.entries || []).find((r) => r.kind === kind && r.reviewed && match(r))
    return (rec?.appliesWhile || []).filter((id) => !activeConds.value.has(id))
  }
  // An enhancement whose condition the list does not meet stays on the card — it is the one place
  // its text is — but says it is not in effect, and why (owner, 2026-10-17). A detachment rule
  // simply is not listed: it is not this unit's, it is the army's.
  /** @param {string[] | null} unmet */
  const offLabel = (unmet) => (unmet?.length
    // "Not in effect · Leading a unit" read as a status — the unit leading one (acceptance,
    // 2026-10-18); the condition is named as one.
    ? `${labels.value.rosterNotInEffect} · ${labels.value.rosterNeedsCondition} ${unmet.map((id) => conditionLabel(id)).join(', ')}`
    : null)
  /** @param {string} id */
  const conditionLabel = (id) => conditions[id]?.label?.[locale.value === 'ru' ? 'ru' : 'en'] || id

  const ruleBlocks = computed(() => {
    const fac = rulesFaction.value
    const facEn = rulesFactionEn.value
    const out = []
    for (const src of view.value.ruleSources) {
      if (src.kind === 'enhancement') {
        if (!fac) continue
        const found = findEnhancementProse(fac.detachments, src.name, props.ctx?.detachments)
        if (!found?.body) continue
        const mine = new Set((props.ctx?.detachments || []).map((d) => detKey(typeof d === 'string' ? d : d?.name)))
        const unmet = unmetFor('enhancement', (r) => enhKey(r.name) === enhKey(found.name) && mine.has(detKey(r.det)))
        out.push({ key: `enh:${src.name}`, src: labels.value.rosterEnhancement, name: found.name, body: found.body, extras: found.extras, switches: switchesOfRule('enhancement', found.name, null), off: offLabel(unmet) })
      } else if (src.kind === 'detachment') {
        if (!fac) continue
        const target = detKey(src.name)
        const det = (fac.detachments || []).find((d) => detKey(d.name) === target)
        const detEn = (facEn?.detachments || []).find((d) => detKey(d.name) === target)
        const unmet = unmetFor('detachmentRule', (r) => detKey(r.det) === target)
        if (det?.rule?.body && applies(detEn?.rule?.body) && unmet && !unmet.length) {
          out.push({
            key: `det:${src.name}`,
            src: `${labels.value.factionDetachment} · ${det.name}`,
            name: det.rule.name,
            body: det.rule.body,
            extras: det.rule.extras,
            switches: switchesOfRule('detachmentRule', det.rule.name, det.name),
          })
        }
      } else if (src.kind === 'leader') {
        // The attached Leader's own abilities, from the datasheets already loaded for this modal —
        // no extra fetch. Its full card stays one click away on its own row; what's useful here is
        // what it brings to the unit being read.
        const led = localize(datasheets.value.find((d) => d.id === src.unitId) || null)
        if (led?.abilities?.length) out.push({ key: `leader:${src.unitId}`, src: labels.value.rosterLeaderTag, name: led.name, abilities: led.abilities })
      }
    }
    return out
  })

  return {
    // The sheet, printed and overlaid
    datasheets, loaded, sheet, view, localize, companions, spawned,
    // The faction's own prose (the modal reads it for popovers, the print sheet prints it)
    rulesFaction, rulesFactionEn, stratNamesRu, modifiersSettled,
    // What the roster does to the numbers
    statMods, statNotes, allGrantedKeywords, linkedFactionRules, abilityStates,
    // The records behind all of it, for a caller that has its own question to ask of them
    resolvedModifiers, abilityModifiers, unitKeywords, factionKeywordSets, activeConds, activeStratIds,
    // The rules that bear on this unit, resolved to prose
    ruleBlocks, modSource, applies, switchesOfRule,
  }
}
