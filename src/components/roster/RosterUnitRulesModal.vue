<template>
  <BaseModal :title="view.sheet?.name" max-width="720px" max-height="90dvh" @close="$emit('close')">
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
        <div v-if="gameCtx?.strats?.length" class="rum-strats rum-boxed">
          <h4 class="rum-strats-h">
            {{ labels.srcStratagem }}
            <!-- The reason that applies to the WHOLE block is said once here (Battle-shock, or the
                 unit having been targeted this phase already). -->
            <span v-if="stratsBlockedNote" class="rum-strats-note">{{ stratsBlockedNote }}</span>
            <!-- What cannot be spent right now is FOLDED AWAY rather than shown inert: in a phase
                 where two of nine are usable, seven greyed chips are what you read past to find
                 them. It stays one tap away, because "where did my stratagem go" is a worse
                 question than "why is this one grey" — and a stratagem already in force is never
                 counted as blocked (stratagemsFor only asks once it is off), so nothing that is
                 actually running can hide in here. -->
            <button
              v-if="blockedChips.length"
              type="button"
              class="rum-strats-more"
              :aria-expanded="showBlocked"
              @click="showBlocked = !showBlocked"
            >{{ labels.stratBlockedCount.replace('{n}', String(blockedChips.length)) }}</button>
          </h4>
          <ConditionChips :switches="openChips" @toggle="$emit('toggle-strat', $event)" @info="openChipInfo" />
          <p v-if="!openChips.length && !showBlocked" class="rum-strats-empty">{{ labels.stratNowEmpty }}</p>
          <CollapseTransition :show="showBlocked">
            <ConditionChips
              class="rum-strats-blocked"
              :switches="blockedChips"
              @toggle="$emit('toggle-strat', $event)"
              @info="openChipInfo"
            />
          </CollapseTransition>
        </div>
        <!-- Which option of this unit's own ability set is up ("select up to two Relics of the
             Matriarchs"). The same chips its row in the list carries — one store, two ways in. -->
        <div v-if="gameCtx?.picks?.length" class="rum-strats">
          <h4 class="rum-strats-h">{{ gameCtx.picks[0].from?.set || labels.dsAbilities }}</h4>
          <ConditionChips :switches="gameCtx.picks" @toggle="$emit('toggle-pick', $event)" @info="openChipInfo" />
          <!-- What the option that is UP still waits on. Pulse Jet's +6" M needs two things — the
               option picked and the unit having Advanced — and the second used to live only inside
               the ability that names it, several taps down. Both halves of one answer, together;
               this is why the ability itself no longer carries them (see pickCondSwitches). -->
          <ConditionChips
            v-if="pickCondSwitches.length"
            class="rum-pick-conds"
            :switches="pickCondSwitches"
            @toggle="$emit('toggle-cond', $event)"
            @info="openChipInfo"
          />
        </div>
        <!-- Auras of other units in the list that reach this one. The chips are also on this
             unit's row in the list (where Battle-shock is marked) — one store, two ways in; an
             aura the rules answer for (22.01: the bearer's own unit, the unit it is attached to)
             never appears here, because there is nothing to ask. -->
        <div v-if="gameCtx?.auras?.length" class="rum-strats">
          <h4 class="rum-strats-h">{{ labels.dsAuras }}</h4>
          <ConditionChips :switches="gameCtx.auras" @toggle="$emit('toggle-aura', $event)" @info="openChipInfo" />
        </div>
        <!-- This unit's own states. There USED to be no strip here, on the rule that a state is
             flipped where the thing it changes is read — never in a strip that says nothing about
             which rule it feeds. That objection is what changed: a set of chips now carries the
             rule that named it (ConditionChips' groupOwner/groupInfo), so "BATTLEFIELD BUTCHERY ·
             Empowered" is not an anonymous strip. And the thing it changes is on THIS card: before
             this, seeing what Empowered does meant opening the accordion on the row to flip it and
             then opening the card to read the number. The chips inside the abilities and rules
             below stay — they sit in collapsed bodies, and are the same store either way. -->
        <div v-if="gameCtx?.switches?.length" class="rum-strats">
          <h4 class="rum-strats-h">{{ labels.rosterUnitStates }}</h4>
          <ConditionChips :switches="gameCtx.switches" @toggle="$emit('toggle-cond', $event)" @info="openChipInfo" />
        </div>
        <!-- The card renders the OVERLAID sheet (rosterModifiers.js), not the printed one: with a
             `ctx` it reflects this roster entry's own loadout/context, without one it's the plain
             datasheet. See src/components/roster/CLAUDE.md for what each tier adds. -->
        <DatasheetCard
          v-if="view.sheet"
          :sheet="statMods.sheet"
          :faction-slug="factionSlug"
          :granted-keywords="allGrantedKeywords"
          :granted-core="statMods.core || []"
          :hide-choices="!!ctx"
          :linked-faction-rules="linkedFactionRules"
          :stat-marks="statMods.marks"
          :stat-notes="statNotes"
          :hide-possible="!!gameCtx"
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
              <DsAccordion collapsible :start-open="false">
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
import { computed, ref } from 'vue'
import BaseModal from '../BaseModal.vue'
import DatasheetCard from '../DatasheetCard.vue'
import FactionAccentScope from './FactionAccentScope.vue'
import DsAccordion from '../DsAccordion.vue'
import ConditionChips from '../ConditionChips.vue'
import CollapseTransition from '../CollapseTransition.vue'
import RuleBody from '../RuleBody.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useKeywordPopover } from '../../composables/useKeywordPopover.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
// What the card SAYS — the printed sheet, the roster's overlay and the prose behind it — is
// resolved once, here, and shared with the print sheet. This component adds the live game around
// it: the chips, what they open, and what may not be spent right now.
import { useRosterUnitCard } from '../../composables/rosterUnitCard.js'
import { enhKey, detKey } from '../../composables/rosterModifiers.js'

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
defineEmits(['close', 'toggle-cond', 'toggle-strat', 'toggle-aura', 'toggle-pick'])

const { locale } = useLocale()
const { renderInline } = useRenderInline()
const { openRule } = useKeywordPopover()
const labels = computed(() => ui[locale.value])

const {
  datasheets, loaded, sheet, view, localize,
  rulesFaction, rulesFactionEn, stratNamesRu,
  statMods, statNotes, allGrantedKeywords, linkedFactionRules, abilityStates,
  resolvedModifiers, abilityModifiers, unitKeywords, factionKeywordSets, activeConds, activeStratIds,
  ruleBlocks, modSource, applies, switchesOfRule,
} = useRosterUnitCard(props)

function openArmyRule(name, rect) {
  openRule(name, rulesFaction.value?.armyRule?.body, rect)
}

// A chip that names somebody's printed rule carries its text (the caller resolved it) — the "i"
// opens it in the same popover a core ability or a modifier note uses.
function openChipInfo(sw, rect) {
  if (sw.info) openRule(sw.info.name, sw.info.text, rect, sw.info.sub)
}

function openModSource(n, rect) {
  const src = modSource(n)
  if (src) openRule(src.name, src.body, rect)
}

const abilitySwitches = computed(() => {
  const all = [...(props.gameCtx?.switches || []), ...(props.gameCtx?.armySwitches || [])]
  if (!all.length) return null
  const out = {}
  for (const rec of abilityModifiers.value) {
    if (rec.from !== 'self') continue
    // An option of an ability SET is answered by two things, and they belong together: its chip is
    // in the picks block at the top of the card, so its CONDITION goes there too (pickCondSwitches)
    // rather than staying buried in the accordion this ability is read in.
    if (rec.ref?.set) continue
    const ids = new Set()
    for (const eff of rec.effects || []) for (const id of eff.cond || []) ids.add(id)
    const switches = all.filter((sw) => ids.has(sw.id))
    if (switches.length) out[rec.name] = switches
  }
  return out
})

// The states the ability-set option that is UP still waits on. Only the picked one's: an option
// nobody selected has nothing pending, and three engines' worth of conditions beside three chips
// would say less than one.
const pickCondSwitches = computed(() => {
  if (!props.gameCtx?.picks?.length) return []
  const all = [...(props.gameCtx?.switches || []), ...(props.gameCtx?.armySwitches || [])]
  const chosen = props.gameCtx?.chosen
  if (!all.length || !chosen?.size) return []
  const ids = new Set()
  for (const rec of abilityModifiers.value) {
    if (!rec.ref?.set || !chosen.has(rec.sid)) continue
    for (const eff of rec.effects || []) for (const id of eff.cond || []) ids.add(id)
  }
  return all.filter((sw) => ids.has(sw.id))
})

// The stratagem card behind a chip, found the way modSource finds a detachment rule: by the
// detachment the record names, then by the stratagem's own name inside it. A chip whose detachment
// is no longer fielded never reaches here (resolveModifierEntries drops it), so a miss means the
// two datasets disagree about a name — and then the chip simply carries no "i".
function stratSource(chip) {
  const fac = rulesFaction.value
  const name = chip?.label?.en
  if (!fac || !name) return null
  const dets = chip.det
    ? (fac.detachments || []).filter((d) => detKey(d.name) === detKey(chip.det))
    : (fac.detachments || [])
  for (const d of dets) {
    const found = (d.stratagems || []).find((x) => enhKey(x.name) === enhKey(name))
    if (found) return found
  }
  return null
}

// …written out as the popover's body. The card's own layout can't be reused here (renderRichText
// knows nothing of StratCard's `◈ LABEL |` info-cards), so each field becomes a bold-labelled line
// — which is what answers the question the chip raises: WHEN may I use this, and what does it do.
// The flavour text is left out: it is the one field that says nothing about the rule.
function stratText(st) {
  const l = labels.value
  return [
    [null, st.cp],
    [l.stratWhen, st.when],
    [l.stratTarget, st.target],
    [l.stratEffect, st.effect],
    [l.stratRestrictions, st.restrictions],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => (k ? `**${k}:** ${v}` : `**${v}**`))
    .join('\n')
}

// The stratagem chips, with the translated name under the English one and the card itself behind
// the "i". The switches come from the view (only it knows which player is being drawn); both the
// RU name and the prose are this component's to add, because it is the one holding the faction
// bundle — already localised, so the popover reads in whatever locale the modal is in.
const stratChips = computed(() => (props.gameCtx?.strats || []).map((st) => {
  const ru = stratNamesRu.value?.[st.label?.en]
  const src = stratSource(st)
  const text = src ? stratText(src) : ''
  return {
    ...st,
    ...(ru ? { subLabel: ru } : null),
    ...(text ? { info: { name: src.name, text, sub: ru || null } } : null),
  }
}))

// Battle-shock and "this unit was already targeted this phase" block every chip in the block, so
// they are stated in its header; a reason belonging to ONE stratagem (its phase, or having been
// spent already) is written on that chip's own second line (ConditionChips' subLine).
// What can be spent now, and what cannot. `blocked` is never true for a stratagem already in
// force (stratagemsFor only asks once it is off), so the fold can never swallow a running one.
const showBlocked = ref(false)
const openChips = computed(() => stratChips.value.filter((st) => !st.blocked))
const blockedChips = computed(() => stratChips.value.filter((st) => st.blocked))

const stratsBlockedNote = computed(() => {
  const blocked = (props.gameCtx?.strats || []).filter((st) => st.blocked)
  if (blocked.some((st) => st.blockedBy === 'shock')) return labels.value.stratBlockedShock
  if (blocked.some((st) => st.blockedBy === 'unitPhase')) return labels.value.stratBlockedUnit
  return null
})
</script>

<style scoped>

/* Context chips above the card. Muted, low-contrast on purpose — this is roster metadata, not
   part of the datasheet, and must not compete with the card's own accent-coloured header band. */
.rum-ctx { display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.6rem; }
.rum-chip {
  display: inline-flex; align-items: center; gap: 0.3rem;
  padding: 0.2rem 0.5rem;
  background: color-mix(in srgb, var(--text-primary) 7%, transparent);
  color: var(--text-muted); font-size: 0.8rem; line-height: 1.3;
}
.rum-chip strong { color: var(--text-primary); font-weight: 600; }
.rum-chip-wl { color: var(--accent); }
.rum-chip-pts { color: var(--text-primary); font-weight: 600; }
.rum-chip-tag { text-transform: lowercase; opacity: 0.8; }
.rum-rule-conds { margin-bottom: 0.5rem; }
.rum-strats { margin-bottom: 0.6rem; }
/* The stratagems are the one block here that SPENDS something — the others are states you are in
   — so they get a frame of their own instead of being the first of four look-alike rows. */
.rum-boxed {
  padding: 0.45rem 0.55rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
}
.rum-strats-more {
  margin-left: 0.4rem; padding: 0;
  border: none; background: none;
  color: var(--text-dim); font: inherit; text-transform: none; letter-spacing: 0;
  cursor: pointer; text-decoration: underline;
}
.rum-strats-more:hover { color: var(--accent); }
.rum-strats-blocked { margin-top: 0.4rem; }
.rum-strats-empty { margin: 0; color: var(--text-dim); font-size: 0.78rem; }
/* A second row under the set's own chips: what the picked option still waits on. */
.rum-pick-conds { margin-top: 0.4rem; }

.rum-strats-h {
  margin: 0 0 0.3rem; color: var(--text-muted);
  font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
}
.rum-strats-note { margin-left: 0.4rem; color: var(--accent); font-weight: 600; text-transform: none; letter-spacing: 0; }
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
  }
}
</style>
