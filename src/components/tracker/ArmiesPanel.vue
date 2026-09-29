<template>
  <div
    class="ap"
    :class="{ opp: army && !isYouSide(current.players[army.pi], army.pi) }"
  >
    <!-- Which army: one per side, one per member in doubles (up to four) — on the same page tabs as
         the Missions and CP panels (owner, 2026-09-29), the block in that army's side colour. -->
    <PageTabs
      class="ap-tabs"
      fill
      :tabs="armyTabs"
      @select="(k) => (sel = k)"
    />

    <div
      v-if="army"
      class="ap-card"
    >
      <!-- The army's setup facts (disposition, detachments) are looked at rarely mid-game: folded
         under the faction's name (owner, 2026-09-29), closed at first. -->
      <div class="ap-facts">
        <button
          v-if="hasFacts"
          type="button"
          class="ap-fac ap-fac-toggle"
          :aria-expanded="factsOpen"
          @click="factsOpen = !factsOpen"
        >
          <ChevronIcon
            class="ap-fac-chev"
            :turned="factsOpen"
            from="right"
            to="down"
          />
          <span class="ap-fac-name">{{ army.faction || labels.trackerDisposition }}</span>
        </button>
        <p
          v-else-if="army.faction"
          class="ap-fac"
        >
          {{ army.faction }}
        </p>
        <CollapseTransition :show="hasFacts && factsOpen">
          <div class="ap-facts-body">
            <p
              v-if="dispositionName(current.players[army.pi].disposition)"
              class="pmeta"
            >
              {{ labels.trackerDisposition }}: {{ dispositionName(current.players[army.pi].disposition) }}
            </p>
            <p
              v-if="army.member.detachments?.length"
              class="pdet"
            >
              {{ army.member.detachments.join(' · ') }}
            </p>
          </div>
        </CollapseTransition>
      </div>

      <!-- The army rule — its tracker (Pain tokens, Waaagh!, Battle Focus…) or, with no tracker spec,
           its text — and under it the detachment rules, each a fold (owner, 2026-09-29: one place
           for what the army plays by). Here rather than under the missions. Opt-in per side
           (settings.trackArmyYou / trackArmyOpp, default on). A side another phone plays: readable,
           its controls inert. -->
      <ArmyTrackerCard
        v-for="c in trackerCards"
        :key="c.mi ?? 'side'"
        class="ap-tracker"
        :pi="army.pi"
        :mi="c.mi"
        :readonly="!canEdit(army.pi)"
        :texts="ruleTexts"
      />
      <!-- The tracker switched off for this side: the rules still read, plainly. -->
      <div
        v-if="!trackerCards.length && ruleTexts.length"
        class="ap-rules"
      >
        <section
          v-for="t in ruleTexts"
          :key="t.key"
          class="ap-rule"
        >
          <div class="ap-rule-kind">
            {{ t.title }}
          </div>
          <RuleBody :body="t.body" />
        </section>
      </div>

      <!-- The units: the attached list (only this army, with the game's live modifiers), else the
           faction's datasheets — both screens exist, one tap away. The army's stratagems are the
           CP tab's, where they are spent. -->
      <RouterLink
        v-if="unitsLink"
        class="proster ap-link"
        :to="unitsLink.to"
      >
        <i :class="`bi ${unitsLink.icon}`" />
        <span class="proster-label">{{ unitsLink.label }}</span>
      </RouterLink>
      <p
        v-else
        class="ap-note"
      >
        {{ labels.trackerArmyNoFaction }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import PageTabs from '../PageTabs.vue'
import ChevronIcon from '../ChevronIcon.vue'
import CollapseTransition from '../CollapseTransition.vue'
import ArmyTrackerCard from './ArmyTrackerCard.vue'
import { useParty } from '../../composables/useParty.js'
import { tracks } from '../../data/trackerOptions.js'
import RuleBody from '../RuleBody.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker, isYouSide, membersOf, dispositionName } from '../../composables/useTracker.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import { loadArmyRules } from '../../composables/gameStratagems.js'

// The Armies tab: each army of the game (a side, or each member of a doubles team) — its facts,
// the way to its units, its rules and its stratagems as a reference (spending is the CP tab's).
// Rules and stratagems come from the faction data, imported dynamically when a sub-tab asks
// (gameStratagems.js), so the game screen itself never carries a faction.
const props = defineProps({
  names: { type: Array, required: true },   // the sides' display names
  defaultSide: { type: Number, default: 0 },
})
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { current } = useTracker()

const isDoubles = computed(() => current.value?.settings?.gameType === 'doubles')

function memberName(m, mi) {
  return m.name || (mi === 0 ? labels.value.trackerPlayer1 : labels.value.trackerPlayer2)
}
const armies = computed(() => {
  const out = []
  current.value.players.forEach((pl, pi) => {
    membersOf(pl).forEach((m, mi) => {
      out.push({
        pi,
        mi: isDoubles.value ? mi : null,
        member: m,
        label: isDoubles.value ? `${props.names[pi]} · ${memberName(m, mi)}` : props.names[pi],
        faction: factionIndexBySlug(m.factionSlug)?.name || '',
      })
    })
  })
  return out
})
const sel = ref(Math.max(0, armies.value.findIndex((a) => a.pi === props.defaultSide)))
const army = computed(() => armies.value[sel.value] || null)
const { canEdit } = useParty()

const factsOpen = ref(false)
const hasFacts = computed(() => !!army.value && (
  !!dispositionName(current.value.players[army.value.pi].disposition) || !!army.value.member.detachments?.length))

// The army-rule tracker cards of the army on screen. Per side by the you/opponent switches (mapped
// by isYou — the players are reordered by first turn; \`tracks\` supplies the back-compat of the
// old single \`trackArmyRule\`). Doubles: a unified force of ONE faction shares one pool (side-level
// state, mi null — the same card under either member's tab); otherwise each member with a faction
// tracks their own army's rule.
const trackerCards = computed(() => {
  const a = army.value
  if (!a) return []
  const pl = current.value.players[a.pi]
  if (!tracks(current.value.settings, (pl.isYou ?? false) ? 'trackArmyYou' : 'trackArmyOpp')) return []
  if (!isDoubles.value) return [{ mi: null }]
  const [m0, m1] = pl.members
  if (pl.forceType === 'unified' && m0.factionSlug && m0.factionSlug === m1.factionSlug) return [{ mi: null }]
  return a.member.factionSlug ? [{ mi: a.mi }] : []
})
const armyTabs = computed(() => armies.value.map((a, k) => ({ key: k, label: a.label, active: sel.value === k })))

// The units: the attached list (the game's roster screen), else the faction's datasheets.
const unitsLink = computed(() => {
  const a = army.value
  if (!a) return null
  if (a.member.roster) {
    return { to: a.mi != null ? `/tracker/game/roster/${a.pi}/${a.mi}` : `/tracker/game/roster/${a.pi}`, icon: 'bi-card-list', label: labels.value.trackerRosterOpen }
  }
  if (a.member.factionSlug) return { to: `/factions/${a.member.factionSlug}/datasheets`, icon: 'bi-people-fill', label: labels.value.factionDatasheets }
  return null
})

// The army's rules, loaded for the army on screen: its army rule and its detachments' (the faction
// data is imported dynamically, so the game screen itself never carries a faction).
const rules = ref(null)
let token = 0
async function load() {
  const a = army.value
  rules.value = null
  if (!a?.member.factionSlug) return
  const t = ++token
  const r = await loadArmyRules(a.member, locale.value, !!current.value?.settings?.combatPatrol)
  if (t === token) rules.value = r
}
watch([sel, locale], load, { immediate: true })
// What reads under the army rule: its full text (the card drops it where it already is the text)
// and each detachment's rule.
const ruleTexts = computed(() => {
  const r = rules.value
  if (!r) return []
  const l = labels.value
  return [
    ...(r.armyRule ? [{ key: 'army', army: true, title: `${l.trackerArmyRuleKind} · ${r.armyRule.name}`, body: r.armyRule.body }] : []),
    ...r.detachments.map((d) => ({ key: `det:${d.name}`, title: `${l.trackerArmyDetachmentKind} · ${d.name} · ${d.rule.name}`, body: d.rule.body })),
  ]
})
</script>

<style scoped>
/* The block in the chosen army's side colour — its tabs' lit edge, the rule card, the units link —
   on the page's own background, like the Missions and CP panels. */
.ap { --side: var(--side-you); --accent: var(--side); --accent-hover: color-mix(in srgb, var(--side) 80%, #000); }
.ap.opp { --side: var(--side-opponent); }
.ap-card { margin-top: 0.6rem; }
.ap-tracker { margin-top: 0.6rem; }
.ap-fac-toggle { display: flex; align-items: center; gap: 0.4rem; width: 100%; padding: 0; border: 0; background: none; text-align: left; cursor: pointer; }
.ap-fac-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.ap-fac-chev { flex-shrink: 0; font-size: 0.8rem; color: var(--text-dim); }
.ap-facts-body { padding-top: 0.2rem; }
.ap-fac { margin: 0 0 0.2rem; font-family: var(--font-display); font-size: 1.25rem; font-weight: 500; line-height: 1.1; color: var(--side); }
.ap-facts .pmeta { margin: 0 0 0.2rem; font-size: 0.82rem; color: var(--text-muted); }
.ap-facts .pdet { margin: 0; font-size: 0.78rem; color: var(--text-dim); font-family: var(--font-mono); }
.ap-note { margin: 0.4rem 0 0; font-size: 0.82rem; color: var(--text-dim); }
.ap-link { width: 100%; margin-top: 0.6rem; }
.ap-rule { padding: 0.6rem 0 0.2rem; border-top: 1px solid var(--border-light); }
.ap-rule:first-child { border-top: 0; padding-top: 0; }
.ap-rule-kind { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-dim); }
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
  transition: background 0.15s, border-color 0.15s;
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
