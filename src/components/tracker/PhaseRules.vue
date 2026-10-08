<template>
  <section
    v-if="shown.length"
    class="pr"
    :class="{ 'in-frame': controlled }"
  >
    <!-- Closed by default, with the count in the header — an open block would push the round's
         actual scoring down the screen, which is exactly why CP and the army-rule card were moved
         BELOW the secondaries. The count is itself the reminder: "3 rules in this phase" does the
         job from the closed state, and opening it is one tap. The choice is remembered. -->
    <button
      v-if="!embedded"
      type="button"
      class="pr-head"
      :aria-expanded="open"
      @click="toggle"
    >
      <i
        class="bi pr-chev"
        :class="open ? 'bi-chevron-down' : 'bi-chevron-right'"
      />
      <span class="pr-title">{{ labels.trackerPhaseRules }}</span>
      <span class="pr-count">{{ total }}</span>
    </button>

    <CollapseTransition :show="open">
      <div class="pr-body">
        <div
          v-for="army in shown"
          :key="army.pi"
          class="pr-side"
          :class="{ opp: !army.you }"
        >
          <h4
            v-if="!controlled"
            class="pr-who"
          >
            {{ army.name }}
          </h4>
          <!-- One group for the phase the clock stands on; without a clock, one per phase of the
               turn, headed by the phase (owner, 2026-10-08). -->
          <section
            v-for="g in army.groups"
            :key="g.phase || 'now'"
            class="pr-group"
          >
            <h5
              v-if="g.phase"
              class="pr-phase"
            >
              {{ phaseLabel(g.phase, labels) }}
            </h5>
            <!-- Per army of the side (a doubles team's two, under the faction's name), its own rules
                 and then its units, each a block of rows — not a card per rule (owner, 2026-10-08:
                 five rules took the whole phone, and one undivided block read as a heap). A row:
                 what you look for at the table on top — the units for an ability, the rule's name
                 otherwise — and under it, small, when in the phase it fires and what it is. -->
            <template
              v-for="part in g.parts"
              :key="part.key"
            >
              <h5
                v-if="part.who"
                class="pr-army"
              >
                {{ part.who }}
              </h5>
              <h6 class="pr-kind">
                {{ part.kind === 'unit' ? labels.trackerPhaseUnits : labels.trackerPhaseArmyRules }}
              </h6>
              <ul class="pr-list">
                <li
                  v-for="r in part.rules"
                  :key="r.key"
                >
                  <button
                    type="button"
                    class="pr-go-btn"
                    data-press
                    @click="lead(r)"
                  >
                    <span class="pr-text">
                      <span class="pr-name">{{ r.units ? r.sub : r.name }}</span>
                      <!-- The army rule says nothing under "Army rules" that the head has not
                           said; a detachment's rule names its detachment. -->
                      <span
                        v-if="r.when !== 'during' || r.units || r.src !== labels.trackerArmyRule"
                        class="pr-sub"
                      >
                        <span
                          v-if="r.when !== 'during'"
                          class="pr-when"
                        >{{ whenLabel(r.when) }}</span>
                        <span
                          v-if="r.what"
                          class="pr-src pr-what"
                        >{{ r.what }}</span>
                        <span
                          v-if="r.units || r.src !== labels.trackerArmyRule"
                          :class="r.units ? 'pr-ability' : 'pr-src'"
                        >{{ r.units ? r.name : r.src }}</span>
                      </span>
                    </span>
                    <i class="bi bi-chevron-right pr-go" />
                  </button>
                </li>
              </ul>
            </template>
          </section>
        </div>
        <!-- Stratagems have their own page in this same subnav, which already groups by phase and
             already knows both players' detachments. A second list here would be two copies of one
             thing, and they would drift — so this is a door, not a duplicate. The phase rides in
             the query so that page opens on it instead of on six collapsed accordions. No count:
             counting would mean loading the faction rules bundle onto the playing screen, which is
             the whole thing this block's index exists to avoid. -->
        <!-- In the Phase tab the stratagems are one tab away, spendable, already filtered to
             "Now" — so the line goes there instead of leaving the game screen. -->
        <button
          v-if="embedded"
          type="button"
          class="pr-strats"
          data-press
          @click="$emit('stratagems')"
        >
          <i class="wi wi-stratagems" />
          {{ byPhase ? labels.trackerPhaseStrats : labels.trackerTurnStrats }}
          <i class="bi bi-chevron-right pr-go" />
        </button>
        <RouterLink
          v-else
          class="pr-strats"
          data-press
          :to="{ path: '/stratagems', query: { phase } }"
        >
          <i class="wi wi-stratagems" />
          {{ labels.trackerPhaseStrats }}
          <i class="bi bi-chevron-right pr-go" />
        </RouterLink>
      </div>
    </CollapseTransition>
  </section>
</template>

<script setup>
// The rules that speak in the phase the clock stands on — the game screen's Phase tab. What they
// are is usePhaseRules.js (the tab counts them too); this draws them. `embedded`: the Phase tab,
// where the list is the panel itself — no folding header over it. Without it, the older folded
// block (closed by default, count in its header, the choice remembered).
import { computed, ref } from 'vue'
import CollapseTransition from '../CollapseTransition.vue'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { usePhaseRules } from '../../composables/usePhaseRules.js'
import { phaseLabel } from '../../composables/stratagemPhases.js'

const props = defineProps({
  embedded: { type: Boolean, default: false },
  // The side picked on the score cards (the game screen's Phase tab, owner 2026-10-06): that army's
  // rules alone, inside the panel's frame — the card above already names it.
  side: { type: Number, default: null },
})
const emit = defineEmits(['stratagems', 'army', 'roster'])
const { sides, total, phase, byPhase, go, labels } = usePhaseRules()
const whenLabel = (w) => (w === 'start' ? labels.value.trackerPhaseStart : labels.value.trackerPhaseEnd)
const controlled = computed(() => props.side === 0 || props.side === 1)
const shown = computed(() => (controlled.value ? sides.value.filter((s) => s.pi === props.side) : sides.value))

// In the Phase tab a line stays on the game screen where it can: a rule to the Armies tab, a unit
// of the attached list to its card over this tab (or the list, for several), via RoundTracker.
function lead(r) {
  if (props.embedded && r.army) emit('army', r.army)
  else if (props.embedded && r.roster) emit('roster', r.roster)
  else go(r)
}

const OPEN_KEY = 'wh11ed-phase-rules-open'
const openPref = ref(getItem(OPEN_KEY) === '1')
const open = computed(() => props.embedded || openPref.value)
function toggle() {
  openPref.value = !openPref.value
  setItem(OPEN_KEY, openPref.value ? '1' : '0')
}
</script>

<style scoped>
.pr { margin: 0 0 0.75rem; border: 1px solid var(--border); background: var(--bg-card); }
/* Inside the Phase tab's side frame: the frame is the box. */
.pr.in-frame { margin: 0; border: 0; background: none; }
.pr-head {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  width: 100%;
  padding: 0.5rem 0.6rem;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.82rem;
  cursor: pointer;
  text-align: left;
}
.pr-head:hover { color: var(--accent-ink); }
.pr-chev { font-size: 0.75rem; }
.pr-title { flex: 1; }
.pr-count {
  min-width: 1.4rem;
  padding: 0 0.3rem;
  text-align: center;
  background: var(--accent);
  color: var(--bg-primary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 700;
}
.pr-body { padding: 0 0.6rem 0.6rem; }
.pr-side + .pr-side { margin-top: 0.6rem; }
/* Each side in its colour — the same you / opponent colours as the score cards: its heading, and
   its lines' hover (not the turn's colour: the opponent's line lit in mine read as mine). */
.pr-side { --side: var(--side-you); --accent: var(--side); --accent-ink: var(--side); }
.pr-side.opp { --side: var(--side-opponent); }
.pr-who {
  margin: 0 0 0.2rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: var(--side);
}
.pr-group + .pr-group { margin-top: 0.6rem; }
/* A doubles team's army, then what kind of rule: two small heads, the second the quieter. */
.pr-army {
  margin: 0.5rem 0 0.15rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 400;
  color: var(--side);
}
.pr-group > .pr-army:first-child { margin-top: 0; }
.pr-kind {
  margin: 0.4rem 0 0.2rem;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}
.pr-group > .pr-kind:first-child, .pr-army + .pr-kind, .pr-phase + .pr-kind { margin-top: 0; }
.pr-phase {
  margin: 0 0 0.25rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-primary);
}
/* One block, rows parted by hairlines, the side's bar down its left. */
.pr-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--border);
  border-left: 3px solid var(--side);
  background: var(--bg-secondary);
}
.pr-list > li + li { border-top: 1px solid var(--border); }
/* The row lights under a pointer — ground a shade lighter, the arrow in the side's colour — the
   way the app's other tappable plates answer (.act-btn). Behind (hover: hover), so a tap on a
   phone leaves nothing lit behind it. */
.pr-go-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.35rem 0.6rem;
  border: 0;
  background: none;
  text-align: left;
  cursor: pointer;
}
@media (hover: hover) {
  .pr-go-btn:hover { background: color-mix(in srgb, var(--text-primary) 5%, var(--bg-secondary)); }
  .pr-go-btn:hover .pr-go { color: var(--accent-ink); }
}
.pr-text { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.pr-name {
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 1.1rem;
  line-height: 1.15;
}
.pr-sub { font-size: 0.8rem; line-height: 1.3; }
.pr-ability { color: var(--accent-ink); }
.pr-src { color: var(--text-muted); }
/* What a unit's line is when it is not one of the datasheet's own abilities: wargear, an
   enhancement, an ability set's name. Before the name, as the moment is. */
.pr-what { margin-right: 0.35rem; }
/* When in the phase it fires, where the text says: before what it is. */
.pr-when {
  margin-right: 0.35rem;
  color: var(--text-primary);
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
/* The door to the stratagems: a plate like the rule cards, without a side's bar — it is the
   phase's, not an army's. */
.pr-strats {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 100%;
  margin-top: 0.6rem;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border);
  background: var(--bg-secondary);
  font: inherit;
  font-size: 0.82rem;
  color: var(--text-muted);
  text-align: left;
  text-decoration: none;
  cursor: pointer;
}
@media (hover: hover) {
  .pr-strats:hover {
    border-color: var(--accent);
    background: color-mix(in srgb, var(--text-primary) 5%, var(--bg-secondary));
    color: var(--text-primary);
  }
  .pr-strats:hover .pr-go { color: var(--accent-ink); }
}
.pr-go { flex-shrink: 0; margin-left: auto; font-size: 0.75rem; color: var(--text-dim); }
</style>
