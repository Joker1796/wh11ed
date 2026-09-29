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
      <div class="ap-facts">
        <p
          v-if="army.faction"
          class="ap-fac"
        >
          {{ army.faction }}
        </p>
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

      <!-- The army rule's tracker (Pain tokens, Waaagh!, Battle Focus…) — here, with everything else
           about the army, rather than under the missions (owner, 2026-09-29). Opt-in per side
           (settings.trackArmyYou / trackArmyOpp, default on), only for factions with a spec. A
           side another phone plays: readable, its controls inert. -->
      <ArmyTrackerCard
        v-for="c in trackerCards"
        :key="c.mi ?? 'side'"
        class="ap-tracker"
        :pi="army.pi"
        :mi="c.mi"
        :readonly="!canEdit(army.pi)"
      />

      <div
        class="ap-sub"
        role="tablist"
      >
        <button
          v-for="t in SUBTABS"
          :key="t"
          role="tab"
          class="ap-subtab"
          :class="{ on: sub === t }"
          :aria-selected="sub === t"
          @click="sub = t"
        >
          {{ labels[`trackerArmy_${t}`] }}
        </button>
      </div>

      <!-- Units: the attached list is the better answer (only this army, with the game's live
           modifiers) — the roster screen; without one, the faction's datasheets. Not a copy of
           either screen here: both already exist, one tap away. -->
      <div
        v-if="sub === 'units'"
        class="ap-body"
      >
        <RouterLink
          v-if="unitsLink"
          class="proster ap-link"
          :to="unitsLink.to"
        >
          <i :class="`bi ${unitsLink.icon}`" />
          <span class="proster-label">{{ unitsLink.label }}</span>
        </RouterLink>
        <p class="ap-note">
          {{ army.member.roster ? labels.trackerArmyUnitsRoster : unitsLink ? labels.trackerArmyUnitsFaction : labels.trackerArmyNoFaction }}
        </p>
      </div>

      <div
        v-else-if="sub === 'rules'"
        class="ap-body"
      >
        <p
          v-if="loading"
          class="ap-note"
        >
          {{ labels.trackerStratLoading }}
        </p>
        <p
          v-else-if="!rules || (!rules.armyRule && !rules.detachments.length)"
          class="ap-note"
        >
          {{ labels.trackerArmyNoFaction }}
        </p>
        <template v-else>
          <section
            v-if="rules.armyRule"
            class="ap-rule"
          >
            <div class="ap-rule-kind">
              {{ labels.trackerArmyRuleKind }}
            </div>
            <h4 class="ap-rule-name">
              {{ rules.armyRule.name }}
            </h4>
            <RuleBody :body="rules.armyRule.body" />
          </section>
          <section
            v-for="d in rules.detachments"
            :key="d.name"
            class="ap-rule"
          >
            <div class="ap-rule-kind">
              {{ labels.trackerArmyDetachmentKind }} · {{ d.name }}
            </div>
            <h4 class="ap-rule-name">
              {{ d.rule.name }}
            </h4>
            <RuleBody :body="d.rule.body" />
          </section>
        </template>
      </div>

      <div
        v-else
        class="ap-body"
      >
        <p
          v-if="loading"
          class="ap-note"
        >
          {{ labels.trackerStratLoading }}
        </p>
        <p
          v-else-if="!strats.length"
          class="ap-note"
        >
          {{ labels.trackerStratNoArmy }}
        </p>
        <ul
          v-else
          class="ap-strats"
        >
          <li
            v-for="s in strats"
            :key="s._key"
          >
            <button
              class="ap-strat"
              @click="openStrat = s"
            >
              <span class="ap-strat-name">{{ s.name }}</span>
              <span class="ap-strat-cost">{{ s._cost }}CP</span>
              <span
                v-if="s.when"
                class="ap-strat-when"
                v-html="renderInline(s.when)"
              />
            </button>
          </li>
        </ul>
      </div>
    </div>

    <BaseModal
      v-if="openStrat"
      :title="openStrat.name"
      :subtitle="`${openStrat._cost}CP`"
      max-width="520px"
      @close="openStrat = null"
    >
      <div class="modal-body">
        <StratCard
          :strat="openStrat"
          :sublabel="openStrat.sublabel || null"
        />
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import BaseModal from '../BaseModal.vue'
import StratCard from '../StratCard.vue'
import PageTabs from '../PageTabs.vue'
import ArmyTrackerCard from './ArmyTrackerCard.vue'
import { useParty } from '../../composables/useParty.js'
import { tracks } from '../../data/trackerOptions.js'
import RuleBody from '../RuleBody.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useRenderInline } from '../../composables/useRenderInline.js'
import { useTracker, isYouSide, membersOf, dispositionName } from '../../composables/useTracker.js'
import { factionIndexBySlug } from '../../data/factionsIndex.js'
import { loadArmyRules, loadArmyStrats } from '../../composables/gameStratagems.js'

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
const { renderInline } = useRenderInline()
const { current } = useTracker()

const isDoubles = computed(() => current.value?.settings?.gameType === 'doubles')
const SUBTABS = ['units', 'rules', 'stratagems']

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
const sub = ref(army.value?.member.roster || !army.value?.member.factionSlug ? 'units' : 'rules')

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

// Rules and stratagems, loaded for the army on screen when their sub-tab is open.
const rules = ref(null)
const strats = ref([])
const loading = ref(false)
let token = 0
async function load() {
  const a = army.value
  if (!a || sub.value === 'units') return
  const t = ++token
  loading.value = true
  const cp = !!current.value?.settings?.combatPatrol
  const [r, s] = await Promise.all([loadArmyRules(a.member, locale.value, cp), loadArmyStrats(a.member, locale.value, cp)])
  if (t !== token) return
  rules.value = r
  strats.value = s
  loading.value = false
}
watch([sel, sub, locale], load, { immediate: true })

const openStrat = ref(null)
</script>

<style scoped>
/* The block in the chosen army's side colour — its tabs' lit edge, the sub-tabs, the rule names —
   on the page's own background, like the Missions and CP panels. */
.ap { --side: var(--side-you); --accent: var(--side); --accent-hover: color-mix(in srgb, var(--side) 80%, #000); }
.ap.opp { --side: var(--side-opponent); }
.ap-card { margin-top: 0.6rem; }
.ap-tracker { margin-top: 0.6rem; }
.ap-fac { margin: 0 0 0.2rem; font-family: var(--font-display); font-size: 1.25rem; font-weight: 500; line-height: 1.1; color: var(--side); }
.ap-facts .pmeta { margin: 0 0 0.2rem; font-size: 0.82rem; color: var(--text-muted); }
.ap-facts .pdet { margin: 0; font-size: 0.78rem; color: var(--text-dim); font-family: var(--font-mono); }
.ap-sub { display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; margin: 0.7rem 0 0.6rem; border: 1px solid var(--border); }
.ap-subtab {
  min-height: 42px; padding: 0.3rem; border: 0; border-left: 1px solid var(--border);
  background: var(--bg-card); font-family: var(--font-display); font-size: 1.15rem; font-weight: 700;
  text-transform: uppercase; color: var(--text-muted); cursor: pointer;
}
.ap-subtab:first-child { border-left: 0; }
.ap-subtab.on { background: var(--side); color: #fff; }
.ap-note { margin: 0.4rem 0 0; font-size: 0.82rem; color: var(--text-dim); }
.ap-link { width: 100%; }
.ap-rule { padding: 0.6rem 0 0.2rem; border-top: 1px solid var(--border-light); }
.ap-rule:first-child { border-top: 0; padding-top: 0; }
.ap-rule-kind { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-dim); }
.ap-rule-name { margin: 0.15rem 0 0.35rem; font-family: var(--font-display); font-size: 1.35rem; font-weight: 600; color: var(--side); }
.ap-strats { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.35rem; }
.ap-strat {
  width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 0.15rem 0.5rem;
  padding: 0.5rem 0.6rem; border: 1px solid var(--border); background: var(--bg-secondary);
  text-align: left; font: inherit; cursor: pointer;
}
@media (hover: hover) { .ap-strat:hover { border-color: var(--side); } }
.ap-strat-name { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; text-transform: uppercase; line-height: 1.1; color: var(--text-primary); }
.ap-strat-cost { font-family: var(--font-display); font-size: 1.2rem; font-weight: 700; color: var(--side); }
.ap-strat-when {
  grid-column: 1 / -1;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  font-size: 0.8rem; line-height: 1.35; color: var(--text-muted);
}
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
