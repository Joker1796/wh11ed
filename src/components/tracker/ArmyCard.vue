<template>
  <div
    class="ap-card"
    :class="{ opp: !isYouSide(current.players[army.pi], army.pi) }"
  >
    <!-- The army's card (owner, 2026-09-30): ONE block per army, its emblem stamped under all of it.
         On top, its faction and the way to its units — the attached list (only this army, with the game's
         live modifiers), else the faction's datasheets. Under it, what the army plays by. The
         setup facts (disposition, detachments) are not here: nobody looked them up mid-game. -->
    <FactionEmblem
      v-if="factionEntry"
      :faction="factionEntry"
      stamp
    />
    <div class="ap-head">
      <p
        v-if="army.faction"
        class="ap-fac"
      >
        {{ army.faction }}
      </p>
      <p
        v-else
        class="ap-note"
      >
        {{ labels.trackerArmyNoFaction }}
      </p>
      <!-- An attached list stands right under this card in the Army tab (RoundTracker, 2026-10-10),
           so there is no button to it; without one, the way to the faction's units. -->
      <!-- A list held to its own limits says so on both phones (the snapshot carries the limits);
           a tap lists them (2026-10-03). -->
      <RosterOwnLimitsMark
        v-if="army.member.roster"
        :roster="army.member.roster"
      />
      <RouterLink
        v-else-if="unitsLink"
        class="proster ap-link"
        :to="unitsLink.to"
      >
        <i :class="unitsLink.icon" />
        <span class="proster-label">{{ unitsLink.label }}</span>
      </RouterLink>
    </div>

    <!-- The army rule — its tracker (Pain tokens, Waaagh!, Battle Focus…) or, with no tracker spec,
         its text — and under it the detachment rules, each a fold (owner, 2026-09-29: one place
         for what the army plays by). Here rather than under the missions. Opt-in per side
         (settings.trackArmyYou / trackArmyOpp, default on). A side another phone plays: readable,
         its controls inert. -->
    <ArmyTrackerCard
      v-for="c in trackerCards"
      ref="cardEls"
      :key="c.mi ?? 'side'"
      class="ap-body"
      bare
      :pi="army.pi"
      :mi="c.mi"
      :readonly="!canEdit(army.pi)"
      :texts="ruleTexts"
    />
    <!-- The tracker switched off for this side: the rules still read, plainly — and folded when the
         army's list stands under this card (owner, 2026-10-10), so the units are not pushed a few
         screens down; read in the game's first minutes, the list every turn. -->
    <div
      v-if="!trackerCards.length && ruleTexts.length"
      class="ap-body"
    >
      <section
        v-for="t in ruleTexts"
        :key="t.key"
        class="ap-rule"
        :class="{ folded: foldRules }"
      >
        <button
          v-if="foldRules"
          type="button"
          class="ap-rule-kind ap-rule-toggle"
          :aria-expanded="openRules.includes(t.key)"
          @click="toggleRule(t.key)"
        >
          <i
            class="wi"
            :class="openRules.includes(t.key) ? 'wi-chevron-down' : 'wi-chevron-right'"
          />
          {{ t.title }}
        </button>
        <div
          v-else
          class="ap-rule-kind"
        >
          {{ t.title }}
        </div>
        <CollapseTransition :show="!foldRules || openRules.includes(t.key)">
          <RuleBody :body="t.body" />
        </CollapseTransition>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import FactionEmblem from '../FactionEmblem.vue'
import ArmyTrackerCard from './ArmyTrackerCard.vue'
import RosterOwnLimitsMark from '../roster/RosterOwnLimitsMark.vue'
import RuleBody from '../RuleBody.vue'
import CollapseTransition from '../CollapseTransition.vue'
import { useParty } from '../../composables/useParty.js'
import { tracks } from '../../data/trackerOptions.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, isYouSide } from '../../composables/useTracker.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import { loadArmyRules, armySignature } from '../../composables/gameStratagems.js'
import { foldName } from '../../core/shared/foldName.js'

// One army's card in the Armies tab (ArmiesPanel keeps one per army, built once): its faction and
// the way to its units, then what it plays by — the army rule's tracker and the detachment rules.
// The rules come from the faction data, imported dynamically (gameStratagems.js), so the game
// screen itself never carries a faction.
const props = defineProps({
  // An army of useGameArmies: { pi, mi, member, label, faction }.
  army: { type: Object, required: true },
  isDoubles: { type: Boolean, default: false },
})

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current } = useTracker()
const { canEdit } = useParty()

const factionEntry = computed(() => factionIndexBySlug(props.army.member.factionSlug))

// The army-rule tracker cards. Per side by the you/opponent switches (mapped by isYou — the players
// are reordered by first turn; `tracks` supplies the back-compat of the old single
// `trackArmyRule`). Doubles: a unified force of ONE faction shares one pool (side-level state, mi
// null — the same card under either member's tab); otherwise each member with a faction tracks
// their own army's rule.
const trackerCards = computed(() => {
  const a = props.army
  const pl = current.value.players[a.pi]
  if (!tracks(current.value.settings, (pl.isYou ?? false) ? 'trackArmyYou' : 'trackArmyOpp')) return []
  if (!props.isDoubles) return [{ mi: null }]
  const [m0, m1] = pl.members
  if (pl.forceType === 'unified' && m0.factionSlug && m0.factionSlug === m1.factionSlug) return [{ mi: null }]
  return a.member.factionSlug ? [{ mi: a.mi }] : []
})

// The units without a list: the faction's datasheets (a list opens in the Roster tab, above).
const unitsLink = computed(() => {
  const slug = props.army.member.factionSlug
  return slug ? { to: `/factions/${slug}/datasheets`, icon: 'wi wi-units', label: labels.value.factionDatasheets } : null
})

// The army's rules: its army rule and its detachments'. Kept while the card lives, so coming back
// to this army shows them at once instead of a card that shrinks while they load again.
// Loaded again when the ARMY changes, not only the language: the card is kept by its place in the
// game, and the roll for the first turn swaps the players into each other's places — until
// 2026-10-26 the card kept the other player's rules then (a player's report).
const rules = ref(null)
const openRules = ref([])
let token = 0
const combatPatrol = () => !!current.value?.settings?.combatPatrol
watch([locale, () => armySignature(props.army.member), combatPatrol], async (now, before) => {
  if (before && now[1] !== before[1]) {
    rules.value = null
    openRules.value = []
  }
  const t = ++token
  const r = props.army.member.factionSlug ? await loadArmyRules(props.army.member, locale.value, combatPatrol()) : null
  if (t === token) rules.value = r
}, { immediate: true })
// What reads under the army rule: its full text (the card drops it where it already is the text)
// and each detachment's rule.
// Folded under an attached list (the Army tab shows it right below); a fold opened stays open.
const foldRules = computed(() => !!props.army.member.roster)
const toggleRule = (key) => {
  openRules.value = openRules.value.includes(key) ? openRules.value.filter((k) => k !== key) : [...openRules.value, key]
}
const ruleTexts = computed(() => {
  const r = rules.value
  if (!r) return []
  const l = labels.value
  return [
    ...(r.armyRule ? [{ key: 'army', army: true, title: `${l.trackerArmyRuleKind} · ${r.armyRule.name}`, body: r.armyRule.body }] : []),
    ...r.detachments.map((d) => ({ key: `det:${d.name}`, det: d.name, title: `${l.trackerArmyDetachmentKind} · ${d.name} · ${d.rule.name}`, body: d.rule.body })),
  ]
})

// Unfold one of its rules (the Phase tab's line to it, via ArmiesPanel): 'army' or a detachment's
// name — once the rules are here.
const cardEls = ref([])
const normName = foldName
async function reveal(rule) {
  const open = () => {
    const key = rule === 'army' ? 'army' : ruleTexts.value.find((t) => t.det && normName(t.det) === normName(rule))?.key
    if (key) cardEls.value.forEach((c) => c?.reveal?.(key))
  }
  await nextTick()
  if (rules.value || !props.army.member.factionSlug) return open()
  const stop = watch(rules, (r) => { if (r) { stop(); nextTick(open) } })
}
defineExpose({ reveal })
</script>

<style scoped>
/* In its side's colour — the rule card, the units link — like the Missions and CP panels. */
.ap-card { --side: var(--side-you); --accent: var(--side); --accent-hover: color-mix(in srgb, var(--side) 80%, #000); --accent-ink: var(--side); --accent-ink-hover: color-mix(in srgb, var(--side) 80%, #000); }
.ap-card.opp { --side: var(--side-opponent); }
/* The emblem is stamped on the whole card (owner, 2026-09-30), at one size whatever the card's
   height — a folded rule's text can make it a few screens tall — and under everything on it. */
.ap-card {
  position: relative;
  contain: paint;
  border: 1px solid var(--border);
  border-left: 4px solid var(--side);
  background: color-mix(in srgb, var(--side) 6%, var(--bg-card));
}
.ap-body { margin: 0 0.6rem 0 0.75rem; padding: 0.45rem 0 0.4rem; border-top: 1px solid var(--border-light); }
/* A little up and in from where it first stood (owner, 2026-10-06). */
.ap-card > .stamp { top: 4.3rem; right: 6.2rem; height: calc(var(--stamp-k) * 7rem); color: var(--side); }
/* The card's head: the faction in its side's colour, like the score board's columns, and a
   compact units button — one short line over the rule. */
.ap-head {
  display: flex; align-items: center; gap: 0.6rem;
  padding: 0.3rem 0.35rem 0.3rem 0.75rem;
}
.ap-head .proster { height: 32px; padding: 0 0.6rem; }
/* The custom-limits mark beside the list button is a square of the button's own height. */
.ap-head :deep(.olm) { flex: none; width: 32px; height: 32px; }
.ap-fac {
  flex: 1 1 auto; min-width: 0; margin: 0;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-family: var(--font-display); font-size: 1.35rem; font-weight: 700; line-height: 1.1; color: var(--side);
}
.ap-note { flex: 1 1 auto; margin: 0; font-size: 0.82rem; color: var(--text-dim); }
.ap-link { flex-shrink: 0; }
.ap-rule { padding: 0.6rem 0 0.2rem; border-top: 1px solid var(--border-light); }
.ap-rule:first-child { border-top: 0; padding-top: 0; }
.ap-rule-kind { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-dim); }
/* Folded: the kind line is the fold's head, the rule under it on a tap. */
.ap-rule.folded { padding: 0.3rem 0 0.1rem; }
.ap-rule-toggle {
  display: flex; align-items: center; gap: 0.35rem; width: 100%; padding: 0.1rem 0;
  border: 0; background: none; cursor: pointer; font-family: inherit; text-align: left;
}
.ap-rule-toggle .wi { font-size: 0.65rem; }
/* Built to NumberStepper's `.step-btn` recipe — it shares a row with one, and anything else
   next to those buttons read as a different kind of thing. One class for both of the row's army
   links (the attached list, or the faction's datasheets) so the slot looks the same either way.
   It says just "Roster": the list's own name is on the page it opens, and a long one used to
   squeeze the row. */
.proster {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.35rem;
  height: 40px; padding: 0 0.75rem;
  border: 1px solid var(--border); background: var(--bg-card);
  color: var(--text-primary); text-decoration: none; font-size: 0.85rem;
  transition: background var(--motion-fast), border-color var(--motion-fast);
}
/* In doubles the label is a name the PLAYER typed, so the button has no width it can promise.
   A flex item never shrinks below its min-content — the longest word of that name — so without
   this the pair of army buttons set a floor under the whole CP row: on a 393px phone the row's
   minimum came to ~367px against ~349px of card, the row overflowed its card and the DOCUMENT
   scrolled sideways (on iOS that also drags the fixed navbar off the visual viewport, which is
   what it looks like from the outside). Ellipsis instead of a floor, with the full name on
   `title` — the same lesson as the setup cards' `minmax(0, 1fr)`. */
.proster-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.proster:hover { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); }
</style>
