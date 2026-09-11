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
import { computed, ref, watch } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from './useLocale.js'
import { overlaySheet, enhKey, detKey, loadoutItemNames } from './rosterModifiers.js'
import { ruleAppliesTo } from './ruleTargets.js'
import { applyStatMods, resolveModifierEntries, grantedKeywordsFrom, datasheetEntriesFor, gateStratagems, attachedUnitKeywords } from './rosterStatMods.js'
import { abilityStatusesOf } from './abilityStatus.js'
import { rosterConditions } from './rosterGameContext.js'
import { coreModifiers } from '../data/rosterModifiers/coreRules.js'
import { loadDatasheets } from '../data/datasheets/index.js'
import { loadDatasheetsRu, localizeSheet } from '../data/datasheets/ru/index.js'

export function useRosterUnitCard(props) {
  const { locale } = useLocale()
  const labels = computed(() => ui[locale.value])

  const datasheets = ref([])
  const loaded = ref(false)
  watch(
    () => props.factionSlug,
    async (slug) => {
      datasheets.value = []
      loaded.value = false
      if (!slug) return
      const list = await loadDatasheets(slug)
      if (props.factionSlug !== slug) return
      if (list) datasheets.value = list
      loaded.value = true
    },
    { immediate: true },
  )

  const ruModule = ref(null)
  watch(
    [() => props.factionSlug, locale],
    async ([slug, loc]) => {
      ruModule.value = null
      if (!slug || loc !== 'ru') return
      const mod = await loadDatasheetsRu(slug)
      if (props.factionSlug === slug && locale.value === 'ru') ruModule.value = mod
    },
    { immediate: true },
  )

  // Any datasheet from this faction, in the current locale. Shared by the viewed sheet and by an
  // attached Leader's abilities below — those must be translated too, not left English in RU.
  function localize(en) {
    if (!en || locale.value !== 'ru') return en
    const mod = ruModule.value
    if (!mod) return en
    return localizeSheet(en, mod.default?.[en.id], mod.abilityNamesRu)
  }

  // The printed sheet, in the current locale.
  const sheet = computed(() => localize(datasheets.value.find((d) => d.id === props.unitId) || null))

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
  const rulesFaction = ref(null)
  // The same faction data, never RU-overlaid: ruleTargets.js reads English prose (keywords stay
  // English by project convention, the sentences around them do not), so the gate would silently
  // stop matching in RU if it read the localised bodies.
  const rulesFactionEn = ref(null)
  // EN stratagem name → RU display name, for the chips (RU locale only; null in EN).
  const stratNamesRu = ref(null)
  watch(
    [() => props.factionSlug, () => !!props.ctx, locale],
    async ([slug, hasCtx, loc]) => {
      rulesFaction.value = null
      rulesFactionEn.value = null
      stratNamesRu.value = null
      if (!slug || !hasCtx) return
      const [{ loadFaction }, { loadFactionRu, deepOverlay }] = await Promise.all([
        import('../data/factions/index.js'),
        import('../data/factions/ru/index.js'),
      ])
      const data = await loadFaction(slug)
      if (props.factionSlug !== slug) return
      rulesFactionEn.value = data?.en || null
      let fac = data?.en
      if (fac && loc === 'ru') {
        const mod = await loadFactionRu(slug)
        if (props.factionSlug !== slug || locale.value !== loc) return
        if (mod) fac = deepOverlay(fac, mod.default)
        // A stratagem's NAME is not part of the overlay: it stays English on the card (project
        // convention — that is what the physical card and the GW app both say), and its translation
        // travels beside it as a display line. Same map the faction page uses (useFactionPage).
        stratNamesRu.value = mod?.stratNamesRu || null
      }
      rulesFaction.value = fac || null
    },
    { immediate: true },
  )

  // The numeric modifier layer (Tier C). Lazily imported per faction and entirely optional: if the
  // directory is gone, or the faction has no file, this stays null and the card keeps its printed
  // numbers — Tiers A+B, unchanged.
  const modifierData = ref(null)
  watch(
    [() => props.factionSlug, () => !!props.ctx],
    async ([slug, hasCtx]) => {
      modifierData.value = null
      if (!slug || !hasCtx) return
      const { loadRosterModifiers } = await import('../data/rosterModifiers/index.js')
      const data = await loadRosterModifiers(slug)
      if (props.factionSlug === slug) modifierData.value = data
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
    datasheets.value.map((d) => [...(d.keywords || []), ...(d.factionKeywords || [])]))

  // The keywords printed on the sheet plus every one the roster grants it. Two sources, and the
  // order matters: a granted keyword decides which RULES bear on the unit, so it has to be resolved
  // before any gating — Necrons' Destroyer Ankh gives its bearer DESTROYER CULT, and only then does
  // Cold Fervour's first bullet (+2 Strength to every DESTROYER CULT model) reach that Overlord.
  const modifierGrantedKeywords = computed(() => {
    const printed = datasheets.value.find((d) => d.id === props.unitId)
    const base = [...(printed?.keywords || []), ...(printed?.factionKeywords || []), ...view.value.grantedKeywords.map((g) => g.kw)]
    return grantedKeywordsFrom(resolvedModifiers.value, base, factionKeywordSets.value, activeConds.value, activeStratIds.value)
  })

  const unitKeywords = computed(() => {
    const en = datasheets.value.find((d) => d.id === props.unitId)
    // Keywords a detachment GRANTS count too — a unit made Battleline by the roster's detachment is
    // targeted by a rule that says "BATTLELINE units from your army".
    return [
      ...(en?.keywords || []),
      ...(en?.factionKeywords || []),
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
  function modSource(n) {
    const fac = rulesFaction.value
    if (!fac || !n) return null
    if (n.kind === 'armyRule') {
      return fac.armyRule?.body ? { name: fac.armyRule.name, body: fac.armyRule.body } : null
    }
    const det = n.det ? (fac.detachments || []).find((d) => detKey(d.name) === detKey(n.det)) : null
    if (n.kind === 'detachmentRule') {
      return det?.rule?.body ? { name: det.rule.name, body: det.rule.body } : null
    }
    if (n.kind === 'enhancement') {
      const found = (det ? [det] : fac.detachments || [])
        .flatMap((d) => d.enhancements || [])
        .find((e) => enhKey(e.name) === enhKey(n.source))
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
  function applies(enBody) {
    return ruleAppliesTo(enBody, unitKeywords.value, factionKeywordSets.value)
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
    props.ctx?.entry?.alleg && props.ctx?.def?.alleg
      ? { g: props.ctx.def.alleg.g, opt: props.ctx.entry.alleg }
      : null,
  )])

  // A datasheet ability can modify the unit it is ATTACHED to, so this card's records include the
  // abilities of whoever leads this entry and of whoever it leads. The roster records both
  // attachments; nothing here is inferred from prose.
  const abilityModifiers = computed(() => {
    const units = props.ctx?.units || []
    const entry = props.ctx?.entry
    if (!entry) return []
    return datasheetEntriesFor(usableModifierEntries.value, {
      unitId: props.unitId,
      // What this entry is actually carrying — a Storm Shield's 4+ invulnerable is not a fact about
      // the datasheet, it is a fact about the model that took the shield.
      itemNames: loadoutItemNames(props.ctx?.def, entry, props.ctx?.items),
      leaderUnitIds: units.filter((u) => u.leaderOf === entry.uid).map((u) => u.id),
      ledUnitId: entry.leaderOf ? units.find((u) => u.uid === entry.leaderOf)?.id || null : null,
      // An enhancement aura worn by an attached Leader covers this unit with no distance to judge
      // (22.01 — the model is standing in it), so it arrives here rather than as a chip.
      leaderEnhNames: units.filter((u) => u.leaderOf === entry.uid).reduce((set, u) => {
        if (u.enh) set.add(u.enh)
        return set
      }, new Set()),
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
  // that lands here — see rosterGameContext's allPicks).
  const activeStratIds = computed(() => new Set([
    ...(props.gameCtx?.strats || []).filter((st) => st.on).map((st) => st.id),
    ...(props.gameCtx?.chosen || []),
  ]))

  // What is true for this unit right now. In a game the tracker answers (gameCtx.active); off the
  // table the LIST still answers for itself — an enhancement gated on "while the bearer is leading a
  // unit" is proven by the roster, with no game needed — and nothing else can be true.
  const activeConds = computed(() => props.gameCtx?.active || rosterConditions(props.ctx?.entry))

  // Core Rules 19.03: an attached unit has every keyword of every unit in it, so a stratagem that
  // names one of them can be spent on the whole attached unit — this card included. Only the printed
  // keywords of the other halves; what the modifier layer grants THEM is a fact about their own card.
  const attachedKeywords = computed(() => attachedUnitKeywords(
    props.ctx?.entry,
    props.ctx?.units,
    (id) => {
      const d = datasheets.value.find((x) => x.id === id)
      return d ? [...(d.keywords || []), ...(d.factionKeywords || [])] : []
    },
  ))

  // …and the stratagems this unit cannot be the target of are dropped before anything reads them, so
  // the card's notes and the chips it is handed can never disagree about which ones are on offer.
  // After the keyword grants, never before: a stratagem naming DESTROYER CULT is on offer to the
  // Overlord whose Destroyer Ankh granted him that keyword.
  const gatedModifiers = computed(() => gateStratagems(
    resolvedModifiers.value,
    [...unitKeywords.value, ...attachedKeywords.value],
    factionKeywordSets.value,
  ))

  const statMods = computed(() => {
    if (!gatedModifiers.value.length) return { sheet: view.value.sheet, notes: [], marks: [] }
    return applyStatMods(
      view.value.sheet,
      gatedModifiers.value,
      unitKeywords.value,
      factionKeywordSets.value,
      activeConds.value,
      activeStratIds.value,
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

  const ruleBlocks = computed(() => {
    const fac = rulesFaction.value
    const facEn = rulesFactionEn.value
    const out = []
    for (const src of view.value.ruleSources) {
      if (src.kind === 'enhancement') {
        if (!fac) continue
        const target = enhKey(src.name)
        let found = null
        for (const d of fac.detachments || []) {
          found = d.enhancements?.find((e) => enhKey(e.name) === target)
          if (found) break
        }
        if (found?.body) out.push({ key: `enh:${src.name}`, src: labels.value.rosterEnhancement, name: found.name, body: found.body, switches: switchesOfRule('enhancement', found.name, null) })
      } else if (src.kind === 'detachment') {
        if (!fac) continue
        const target = detKey(src.name)
        const det = (fac.detachments || []).find((d) => detKey(d.name) === target)
        const detEn = (facEn?.detachments || []).find((d) => detKey(d.name) === target)
        if (det?.rule?.body && applies(detEn?.rule?.body)) {
          out.push({
            key: `det:${src.name}`,
            src: `${labels.value.factionDetachment} · ${det.name}`,
            name: det.rule.name,
            body: det.rule.body,
            switches: switchesOfRule('detachmentRule', det.rule.name, det.name),
          })
        }
      } else if (src.kind === 'leader') {
        // The attached Leader's own abilities, from the datasheets already loaded for this modal —
        // no extra fetch. Its full card stays one click away on its own row; what's useful here is
        // what it brings to the unit being read.
        const led = localize(datasheets.value.find((d) => d.id === src.unitId) || null)
        const abilities = led?.abilities?.length ? led.abilities : null
        if (abilities) out.push({ key: `leader:${src.unitId}`, src: labels.value.rosterLeaderTag, name: led.name, abilities })
      }
    }
    return out
  })

  return {
    // The sheet, printed and overlaid
    datasheets, loaded, sheet, view, localize,
    // The faction's own prose (the modal reads it for popovers, the print sheet prints it)
    rulesFaction, rulesFactionEn, stratNamesRu,
    // What the roster does to the numbers
    statMods, statNotes, allGrantedKeywords, linkedFactionRules, abilityStates,
    // The records behind all of it, for a caller that has its own question to ask of them
    resolvedModifiers, abilityModifiers, unitKeywords, factionKeywordSets, activeConds, activeStratIds,
    // The rules that bear on this unit, resolved to prose
    ruleBlocks, modSource, applies, switchesOfRule,
  }
}
