<template>
  <BaseModal :title="view.sheet?.name" max-width="720px" max-height="90vh" @close="$emit('close')">
    <div class="modal-body">
      <!-- FactionAccentScope re-applies the faction-accent recipe: BaseModal teleports to
           <body>, outside FactionLayout's .faction-view.themed ancestor, so without this every
           unit modal showed the app's global red instead of the faction's colour (DatasheetCard's
           header band/weapon-table headers/ability tags all key off --accent). It's placed HERE,
           inside modal-body rather than wrapped around the whole component by callers like
           UnitEditorFields.vue's own <Teleport>, because a second Teleport (this component's own
           BaseModal) nested inside an outer FactionAccentScope+Teleport wrapper re-parents the
           actual modal DOM to <body> a second time, past the outer wrapper's div — CSS custom
           properties only cascade through real DOM ancestry. Scoping it here keeps it a genuine
           ancestor of DatasheetCard with no teleport in between. -->
      <FactionAccentScope :faction-slug="factionSlug">
        <!-- Roster facts that aren't on the datasheet anywhere (rosterModifiers.js's
             entryContext): whether this entry is the Warlord, what enhancement it carries, who
             it's attached to. Only rendered when there's something to say, so a plain unit's
             card opens exactly as before. -->
        <div v-if="view.context" class="rum-ctx">
          <span v-if="view.context.warlord" class="rum-chip rum-chip-wl">
            <i class="bi bi-star-fill"></i> {{ labels.rosterWarlord }}
          </span>
          <span v-if="view.context.enhancement" class="rum-chip">
            {{ labels.rosterEnhancement }}: <strong>{{ view.context.enhancement.name }}</strong>
            <span v-if="view.context.enhancement.pts" class="rum-chip-pts">+{{ view.context.enhancement.pts }}</span>
            <span v-if="view.context.enhancement.mandatory" class="rum-chip-tag">{{ labels.rosterEnhMandatory }}</span>
          </span>
          <span v-if="view.context.attachedTo" class="rum-chip">
            {{ labels.rosterAttachedTo }} <strong>{{ view.context.attachedTo }}</strong>
          </span>
        </div>
        <!-- Stratagems SPENT on this unit, and the ones its detachments offer that would change a
             number on this card. A stratagem is the one thing here that is not a fact about the
             army or the unit — it is bought, for one unit, for a stated window — so it gets a row
             of its own rather than sitting among the states, and each chip says how long it lasts.
             Flipping one rewrites the card and the row in the list behind it; the clock takes it
             back down on its own. -->
        <div v-if="gameCtx?.strats?.length" class="rum-strats">
          <h4 class="rum-strats-h">{{ labels.srcStratagem }}</h4>
          <ConditionChips :switches="gameCtx.strats" @toggle="$emit('toggle-strat', $event)" />
        </div>
        <!-- No strip of switches here any more. A state is flipped where the thing it changes is
             read: on the ability that names it (DatasheetCard's `abilitySwitches`) or inside the
             rule that does (the "In effect" block below) — and, for the states a player sets every
             turn, on the unit's own row in the list behind this card. One store, one state, and
             never a fourth place showing the same chip. -->
        <!-- The card renders the OVERLAID sheet (rosterModifiers.js), not the printed one: with a
             `ctx` it reflects this roster entry's own loadout/context, without one it's the plain
             datasheet. See src/components/roster/CLAUDE.md for what each tier adds. -->
        <DatasheetCard
          v-if="view.sheet"
          :sheet="statMods.sheet"
          :faction-slug="factionSlug"
          :granted-keywords="allGrantedKeywords"
          :hide-choices="!!ctx"
          :linked-faction-rules="linkedFactionRules"
          :stat-marks="statMods.marks"
          :stat-notes="statNotes"
          :ability-states="abilityStates"
          :ability-switches="abilitySwitches"
          @toggle-cond="$emit('toggle-cond', $event)"
          collapsible
          @faction-rule-click="openArmyRule"
          @mod-source-click="openModSource"
        >
          <template #before-keywords>
          <!-- What else bears on this unit right now: its enhancement, the roster's detachment
               rules, the army rule, and the abilities of any Leader attached to it. Attribution,
               not inference — each block says where it comes from and nothing is silently folded
               into the datasheet above (see rosterModifiers.js's ruleSourcesFor).

               The block itself is NOT an accordion: it's a marked container that always shows
               what applies, and each rule inside collapses on its own. One level of chevrons,
               and opening the container can't dump four long rule bodies at once. -->
          <section v-if="ruleBlocks.length" class="rum-rules">
            <h4 class="rum-rules-h">{{ labels.rosterInEffect }}</h4>
            <div v-for="b in ruleBlocks" :key="b.key" class="rum-rule">
              <DsAccordion collapsible>
                <template #header="{ open, toggle }">
                  <button type="button" class="rum-rule-btn" :aria-expanded="open" @click="toggle">
                    <span class="rum-rule-text">
                      <span class="rum-rule-src">{{ b.src }}</span>
                      <span class="rum-rule-name">{{ b.name }}</span>
                    </span>
                    <i class="bi rum-chev" :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"></i>
                  </button>
                </template>
                <div class="rum-rule-body">
                  <!-- The switches this rule's OWN modifiers are gated on, at the rule. A state
                       that decides what a rule does belongs where the rule is read, not only in a
                       strip at the top of another screen — the same switch, one store. -->
                  <ConditionChips
                    v-if="b.switches?.length"
                    class="rum-rule-conds"
                    :switches="b.switches"
                    @toggle="$emit('toggle-cond', $event)"
                  />
                  <RuleBody v-if="b.body" :body="b.body" />
                  <div v-for="a in b.abilities || []" :key="a.name" class="rum-ability">
                    <strong>{{ a.name }}<span v-if="a.nameEn" class="rum-name-en"> ({{ a.nameEn }})</span>:</strong> <span v-html="renderInline(a.text)"></span>
                  </div>
                </div>
              </DsAccordion>
            </div>
          </section>
          </template>
        </DatasheetCard>
        <p v-else-if="loaded" class="rum-missing">{{ labels.factionsSoon }}</p>

      </FactionAccentScope>
    </div>
  </BaseModal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BaseModal from '../BaseModal.vue'
import DatasheetCard from '../DatasheetCard.vue'
import FactionAccentScope from './FactionAccentScope.vue'
import DsAccordion from '../DsAccordion.vue'
import ConditionChips from '../ConditionChips.vue'
import RuleBody from '../RuleBody.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useKeywordPopover } from '../../composables/useKeywordPopover.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { overlaySheet, enhKey, detKey, loadoutItemNames } from '../../composables/rosterModifiers.js'
import { ruleAppliesTo } from '../../composables/ruleTargets.js'
import { applyStatMods, resolveModifierEntries, grantedKeywordsFrom, datasheetEntriesFor } from '../../composables/rosterStatMods.js'
import { abilityStatusesOf } from '../../composables/abilityStatus.js'
import { coreModifiers } from '../../data/rosterModifiers/coreRules.js'
import { loadDatasheets } from '../../data/datasheets/index.js'
import { loadDatasheetsRu, localizeSheet } from '../../data/datasheets/ru/index.js'

const props = defineProps({
  unitId: { type: String, required: true },
  factionSlug: { type: String, required: true },
  // This unit's place in the roster, for the modifier overlay (rosterModifiers.js). Optional and
  // partial on purpose: RosterUnitBrowser previews a unit that hasn't been added yet, so it has
  // no entry to pass and gets the plain printed sheet — the pre-overlay behaviour. Shape:
  // { def, entry, items } today; later phases read detachments/units off it too.
  ctx: { type: Object, default: null },
  // Live game context, only when the card was opened from a game in progress (RosterViewView's
  // /tracker/game/roster/:pi route). `active` is the set of condition ids currently true — what
  // lets a conditional modifier actually rewrite a number — and `switches` are the per-unit ones
  // this player may flip from here. Null everywhere else, which is the read-only behaviour.
  gameCtx: { type: Object, default: null },
})
defineEmits(['close', 'toggle-cond', 'toggle-strat'])

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const { openRule } = useKeywordPopover()
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
watch(
  [() => props.factionSlug, () => !!props.ctx, locale],
  async ([slug, hasCtx, loc]) => {
    rulesFaction.value = null
    rulesFactionEn.value = null
    if (!slug || !hasCtx) return
    const [{ loadFaction }, { loadFactionRu, deepOverlay }] = await Promise.all([
      import('../../data/factions/index.js'),
      import('../../data/factions/ru/index.js'),
    ])
    const data = await loadFaction(slug)
    if (props.factionSlug !== slug) return
    rulesFactionEn.value = data?.en || null
    let fac = data?.en
    if (fac && loc === 'ru') {
      const mod = await loadFactionRu(slug)
      if (props.factionSlug !== slug || locale.value !== loc) return
      if (mod) fac = deepOverlay(fac, mod.default)
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
    const { loadRosterModifiers } = await import('../../data/rosterModifiers/index.js')
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
  return grantedKeywordsFrom(resolvedModifiers.value, base, factionKeywordSets.value, props.gameCtx?.active)
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
function openArmyRule(name, rect) {
  openRule(name, rulesFaction.value?.armyRule?.body, rect)
}

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

function openModSource(n, rect) {
  const src = modSource(n)
  if (src) openRule(src.name, src.body, rect)
}

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
  })
})

const statMods = computed(() => {
  if (!resolvedModifiers.value.length) return { sheet: view.value.sheet, notes: [], marks: [] }
  return applyStatMods(
    view.value.sheet,
    resolvedModifiers.value,
    unitKeywords.value,
    factionKeywordSets.value,
    props.gameCtx?.active,
    // The stratagems the player says are up on this unit, as a set of record ids.
    new Set((props.gameCtx?.strats || []).filter((st) => st.on).map((st) => st.id)),
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
const abilitySwitches = computed(() => {
  const all = [...(props.gameCtx?.switches || []), ...(props.gameCtx?.armySwitches || [])]
  if (!all.length) return null
  const out = {}
  for (const rec of abilityModifiers.value) {
    if (rec.from !== 'self') continue
    const ids = new Set()
    for (const eff of rec.effects || []) for (const id of eff.cond || []) ids.add(id)
    const switches = all.filter((sw) => ids.has(sw.id))
    if (switches.length) out[rec.name] = switches
  }
  return out
})

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
</script>

<style scoped>
.modal-body { padding: 0.9rem; overflow-y: auto; }

/* Context chips above the card. Muted, low-contrast on purpose — this is roster metadata, not
   part of the datasheet, and must not compete with the card's own accent-coloured header band. */
.rum-ctx { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.6rem; }
.rum-chip {
  display: inline-flex; align-items: center; gap: 0.3rem;
  padding: 0.2rem 0.5rem; border-radius: 4px;
  background: color-mix(in srgb, var(--text-primary) 7%, transparent);
  color: var(--text-muted); font-size: 0.8rem; line-height: 1.3;
}
.rum-chip strong { color: var(--text-primary); font-weight: 600; }
.rum-chip-wl { color: var(--accent); }
.rum-chip-pts { color: var(--text-primary); font-weight: 600; }
.rum-chip-tag { text-transform: lowercase; opacity: 0.8; }
.rum-rule-conds { margin-bottom: 0.5rem; }
.rum-strats { margin-bottom: 0.6rem; }
.rum-strats-h {
  margin: 0 0 0.3rem; color: var(--text-muted);
  font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
}
/* The English original beside a translated ability name — see DatasheetCard's .ds-name-en. */
.rum-name-en { font-weight: 400; font-size: 0.85em; color: var(--text-muted); }
.rum-missing { color: var(--text-muted); font-size: 0.95rem; text-align: center; padding: 1rem 0; }

/* Rule blocks under the card. Deliberately quieter than the card itself — flat rows, no accent
   band: they're context, and the datasheet stays the thing being read. */
/* Rendered into DatasheetCard's #before-keywords slot, so it sits INSIDE the card just above the
   closing Keywords line. It has to read as belonging to the card AND as visibly not part of the
   printed datasheet, so it borrows the card's own vocabulary for "a block of a different kind" —
   the one `.ds-damaged` already uses: the same rounded box and rhythm as `.ds-ability-group`,
   plus a solid accent bar down the left edge.
   Two things separate it from the printed groups: the border is DASHED (the ordinary annotation
   convention — this was added by your roster, it is not ink on the card) and the heading keeps
   accent-coloured text on a transparent strip instead of the groups' solid accent bar with white
   text, which would claim it IS printed. The wash is lighter than theirs (4% vs 8%) for the same
   reason. Everything keys off `--accent`, so it stays right in all 30 faction colours and in both
   themes; no fixed hue is introduced (`.ds-damaged` can afford its red because "damaged" means
   one thing — this block does not).
   Deliberately NOT an accordion itself: what applies is always visible, and only the individual
   rule bodies collapse. A container accordion would add a second level of chevrons and would dump
   every rule body at once when opened. */
.rum-rules {
  margin: 0.6rem 0;
  border: 1px dashed color-mix(in srgb, var(--accent) 45%, var(--border));
  border-left: 3px solid var(--accent);
  border-radius: 0 4px 4px 0;
  background: color-mix(in srgb, var(--accent) 4%, transparent);
  padding: 0.35rem 0.7rem 0.45rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--text-primary);
}
/* Same metrics as DatasheetCard's own `.ds-group-title` (0.68rem/700/1px tracking, accent) so the
   two headings sit on one visual grid, just without the filled bar. */
.rum-rules-h {
  margin: 0 0 0.15rem;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--accent);
}
.rum-rule + .rum-rule { border-top: 1px dashed color-mix(in srgb, var(--accent) 30%, var(--border)); }
.rum-rule-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  min-height: 38px;
  padding: 0.35rem 0;
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;
  text-align: left;
  color: var(--text-primary);
}
.rum-rule-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.rum-rule-src { font-size: 0.68rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }
.rum-rule-name { font-weight: 700; }
.rum-chev { font-size: 0.7rem; color: var(--accent); flex-shrink: 0; }
.rum-rule-body { padding-bottom: 0.5rem; }
.rum-ability { margin-bottom: 0.35rem; }
.rum-ability:last-child { margin-bottom: 0; }

/* Small phones: the modal is already full-width (BaseModal's ≤560px bottom-sheet), so its own
   padding is the last thing standing between DatasheetCard's tables and the screen edge —
   DatasheetCard already bleeds its weapon table/ability groups to ITS OWN edges at ≤480px, so a
   generous outer padding here would just re-add the margin that treatment removes. */
@media (max-width: 480px) {
  .modal-body { padding: 0.6rem 0.35rem; }
  /* DatasheetCard's own ≤480px CSS bleeds `.ds-card` to the full VIEWPORT width
     (`width: 100vw; margin-left: calc(50% - 50vw)`) so its header/weapon-table/ability-group
     bleeds land flush against the true screen edge — correct only when `.ds-card` sits directly
     in an unpadded container. Nested in this `.modal-body`'s own padding, the `50%` term in that
     calc resolves against the PADDED content box, not the true viewport, so the escape lands a
     few px short/long and the modal gains a small horizontal scroll (most visible once a unit
     has an Abilities/Special Abilities group — `.ds-group-btn`'s width:100% then measures
     against `.ds-ability-group`'s own bled, over-wide box). Cancel just the escape; `.ds-card`'s
     internal bleed-to-its-own-edge for every one of those zones is untouched and stays correct
     once `.ds-card` itself is back to a normal in-flow block. */
  .modal-body :deep(.ds-card) {
    width: auto;
    margin-left: 0;
    border-radius: 6px;
  }
}
</style>
