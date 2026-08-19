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
        <!-- The card renders the OVERLAID sheet (rosterModifiers.js), not the printed one: with a
             `ctx` it reflects this roster entry's own loadout/context, without one it's the plain
             datasheet. See ROSTER-MODIFIERS-PROGRESS.md for what each phase adds. -->
        <DatasheetCard
          v-if="view.sheet"
          :sheet="view.sheet"
          :faction-slug="factionSlug"
          :granted-keywords="view.grantedKeywords"
          collapsible
        />
        <p v-else-if="loaded" class="rum-missing">{{ labels.factionsSoon }}</p>

        <!-- What else bears on this unit right now: its enhancement, the roster's detachment
             rules, the army rule, and the abilities of any Leader attached to it. Attribution,
             not inference — each block says where it comes from and nothing is silently folded
             into the datasheet above (see rosterModifiers.js's ruleSourcesFor). -->
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
                <RuleBody v-if="b.body" :body="b.body" />
                <div v-for="a in b.abilities || []" :key="a.name" class="rum-ability">
                  <strong>{{ a.name }}:</strong> <span v-html="renderInline(a.text)"></span>
                </div>
              </div>
            </DsAccordion>
          </div>
        </section>
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
import RuleBody from '../RuleBody.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { overlaySheet, enhKey, detKey } from '../../composables/rosterModifiers.js'
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
})
defineEmits(['close'])

const { locale } = useLocale()
const { renderInline } = useRenderInline()
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
watch(
  [() => props.factionSlug, () => !!props.ctx, locale],
  async ([slug, hasCtx, loc]) => {
    rulesFaction.value = null
    if (!slug || !hasCtx) return
    const [{ loadFaction }, { loadFactionRu, deepOverlay }] = await Promise.all([
      import('../../data/factions/index.js'),
      import('../../data/factions/ru/index.js'),
    ])
    const data = await loadFaction(slug)
    if (props.factionSlug !== slug) return
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

const view = computed(() => overlaySheet(sheet.value, {
  ...(props.ctx || {}),
  unitId: props.unitId,
  factionSlug: props.factionSlug,
}))
// Resolve each rule source (rosterModifiers.js said WHICH rules bear on this unit) to the prose
// that renders. A source whose text can't be found is dropped rather than shown as an empty
// accordion — the roster layer and the hand-authored faction files are separate datasets and a
// name can legitimately fail to resolve.
const ruleBlocks = computed(() => {
  const fac = rulesFaction.value
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
      if (found?.body) out.push({ key: `enh:${src.name}`, src: labels.value.rosterEnhancement, name: found.name, body: found.body })
    } else if (src.kind === 'detachment') {
      if (!fac) continue
      const target = detKey(src.name)
      const det = (fac.detachments || []).find((d) => detKey(d.name) === target)
      if (det?.rule?.body) out.push({ key: `det:${src.name}`, src: `${labels.value.factionDetachment} · ${det.name}`, name: det.rule.name, body: det.rule.body })
    } else if (src.kind === 'armyRule') {
      if (fac?.armyRule?.body) out.push({ key: 'army', src: labels.value.factionArmyRule, name: fac.armyRule.name, body: fac.armyRule.body })
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
.rum-missing { color: var(--text-muted); font-size: 0.95rem; text-align: center; padding: 1rem 0; }

/* Rule blocks under the card. Deliberately quieter than the card itself — flat rows, no accent
   band: they're context, and the datasheet stays the thing being read. */
.rum-rules { margin-top: 0.9rem; }
.rum-rules-h {
  font-family: var(--font-display); font-size: 1rem; font-weight: 500;
  color: var(--text-muted); margin: 0 0 0.4rem; text-transform: uppercase; letter-spacing: 0.03em;
}
.rum-rule { border-top: 1px solid var(--border); }
.rum-rule:last-child { border-bottom: 1px solid var(--border); }
.rum-rule-btn {
  display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;
  width: 100%; padding: 0.55rem 0.2rem; min-height: 40px;
  background: none; border: none; cursor: pointer; text-align: left; color: var(--text-primary);
}
.rum-rule-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
.rum-rule-src { font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em; }
.rum-rule-name { font-weight: 600; font-size: 0.95rem; }
.rum-chev { color: var(--text-muted); flex-shrink: 0; }
.rum-rule-body { padding: 0 0.2rem 0.7rem; font-size: 0.9rem; }
.rum-ability { margin-bottom: 0.45rem; }
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
