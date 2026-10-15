<template>
  <section
    v-if="shown.length"
    class="pr"
    :class="{ 'in-frame': controlled }"
  >
    <!-- The turn in the order it is played (owner, 2026-10-10): one fold per phase (and the turn's
         start and end), all shut by default, each with how many things fire inside it. Opened, the
         phase step by step: a step with something to say heads its rows, and steps in a row with
         nothing are one quiet line — the order of the turn stays readable without a line apiece. -->
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
      <StratPhaseGroups
        v-model:open="openSecs"
        :groups="foldsOf(army.turn)"
        card
      >
        <template #default="{ group }">
          <div class="pr-steps">
            <template
              v-for="c in group.chunks"
              :key="c.key"
            >
              <p
                v-if="c.idle"
                class="pr-idle"
              >
                {{ c.idle }}
              </p>
              <template v-else>
                <h6
                  v-if="c.label"
                  class="pr-step"
                >
                  {{ c.label }}
                </h6>
                <!-- A row: what you look for at the table on top — the units for an ability, the
                     rule's or the card's name otherwise — and under it, small, what it is. -->
                <ul class="pr-list">
                  <li
                    v-for="r in c.rows"
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
                        <span
                          v-if="r.what || r.units || r.who || (r.src && r.src !== labels.trackerArmyRule)"
                          class="pr-sub"
                        >
                          <span
                            v-if="r.what"
                            class="pr-src pr-what"
                          >{{ r.what }}</span>
                          <!-- The army rule says nothing the row has not said; a detachment's rule
                               names its detachment. -->
                          <span
                            v-if="r.units || (r.src && r.src !== labels.trackerArmyRule)"
                            :class="r.units ? 'pr-ability' : 'pr-src'"
                          >{{ r.units ? r.name : r.src }}</span>
                          <!-- A doubles team's two armies share the step: whose rule it is. -->
                          <span
                            v-if="r.who"
                            class="pr-src pr-who-tag"
                          >{{ r.who }}</span>
                        </span>
                      </span>
                      <i class="wi wi-chevron-right pr-go" />
                    </button>
                  </li>
                </ul>
              </template>
            </template>
          </div>
        </template>
      </StratPhaseGroups>
    </div>
  </section>
</template>

<script setup>
// The turn the clock stands on, step by step, with what fires at each step — the game screen's
// Turn/Phase tab. What fires is usePhaseRules.js (the tab counts it too); this draws it.
// `embedded`: inside the game screen, where a row leads to another tab of it rather than away.
import { computed, ref, watch } from 'vue'
import StratPhaseGroups from '../StratPhaseGroups.vue'
import { getItem, setItem } from '../../composables/safeStorage.js'
import { usePhaseRules } from '../../composables/usePhaseRules.js'

const props = defineProps({
  embedded: { type: Boolean, default: false },
  // The side picked on the score cards (the game screen's tab, owner 2026-10-06): that army's
  // turn alone, inside the panel's frame — the card above already names it.
  side: { type: Number, default: null },
  // An example turn instead of the game's (the "Phase rules" help, help/PhaseRulesDemo.vue): drawn
  // the same, and a tap leads nowhere.
  example: { type: Array, default: null },
})
const emit = defineEmits(['army', 'roster', 'missions'])
const { sides, go, labels } = usePhaseRules()
const controlled = computed(() => props.side === 0 || props.side === 1)
const all = computed(() => props.example || sides.value)
const shown = computed(() => (controlled.value ? all.value.filter((s) => s.pi === props.side) : all.value))

// The open folds, remembered on this device; none by default (owner, 2026-10-10).
const OPEN_KEY = 'wh11ed-turn-steps-open'
function readOpen() {
  try { return new Set(JSON.parse(getItem(OPEN_KEY) || '[]')) } catch { return new Set() }
}
// An example opens its first phase and keeps the game's choice untouched.
const openSecs = ref(props.example ? new Set([props.example[0]?.turn?.[0]?.key]) : readOpen())
watch(openSecs, (set) => { if (!props.example) setItem(OPEN_KEY, JSON.stringify([...set])) })

// A section of the turn as a fold: its count, and its steps cut into chunks — a step with rows,
// or a run of steps with none joined into one quiet line ("Start of phase · Gain Core CP · …").
// The turn's start and end have no steps of their own; empty, they say so.
function foldsOf(turn) {
  return turn.map((sec) => {
    const chunks = []
    let idle = []
    const flush = () => {
      if (idle.length) chunks.push({ key: `idle|${chunks.length}`, idle: idle.join(' · ') })
      idle = []
    }
    for (const st of sec.steps) {
      if (st.rows.length) {
        flush()
        chunks.push({ key: st.id, label: st.label, rows: st.rows })
      } else if (st.label) idle.push(st.label)
    }
    flush()
    const count = sec.steps.reduce((n, st) => n + st.rows.length, 0)
    if (!chunks.length) chunks.push({ key: 'none', idle: labels.value.trackerStepsNothing })
    return { key: sec.key, label: sec.title, count, chunks }
  })
}

// In the game screen a row stays on it where it can: a rule to the Army tab, a unit of the
// attached list to its card there, a mission card to the Missions tab — via RoundTracker.
function lead(r) {
  if (props.example) return
  if (r.kind === 'card') emit('missions', r)
  else if (props.embedded && r.army) emit('army', r.army)
  else if (props.embedded && r.roster) emit('roster', r.roster)
  else go(r)
}
</script>

<style scoped>
.pr { margin: 0 0 0.75rem; padding: 0 0.6rem 0.6rem; border: 1px solid var(--border); background: var(--bg-card); }
/* Inside the tab's side frame: the frame is the box. */
.pr.in-frame { margin: 0; padding: 0; border: 0; background: none; }
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
/* Inside an open fold: the steps, a small quiet head over each block of rows. */
.pr-steps { padding: 0.35rem 0.6rem 0.5rem; }
.pr-step {
  margin: 0.35rem 0 0.15rem;
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
}
.pr-steps > .pr-step:first-child { margin-top: 0; }
/* Steps with nothing to say, a run of them on one line: the order, without a line apiece. */
.pr-idle { margin: 0.35rem 0; font-size: 0.75rem; line-height: 1.3; color: var(--text-dim); }
.pr-steps > .pr-idle:first-child { margin-top: 0; }
.pr-steps > .pr-idle:last-child { margin-bottom: 0; }
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
   enhancement, an ability set's name, a mission card's kind. Before the name. */
.pr-what { margin-right: 0.35rem; }
.pr-sub > span + .pr-who-tag { margin-left: 0.35rem; }
.pr-go { flex-shrink: 0; margin-left: auto; font-size: 0.75rem; color: var(--text-dim); }
</style>
