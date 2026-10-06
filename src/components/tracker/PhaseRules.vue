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
        <!-- The Phase tab's word is just "Phase": the line says what the list is (owner, 2026-10-06).
             The folded block's header already says it. -->
        <p
          v-if="embedded"
          class="pr-note"
        >
          {{ labels.trackerPhaseRulesNote }}
        </p>
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
          <ul class="pr-list">
            <li
              v-for="r in army.rules"
              :key="r.key"
              class="pr-rule"
            >
              <!-- A name the reader cannot get to is half a reminder, so every line is a way in:
                   a unit to its card, a rule to its place on the faction page — or, in the Phase
                   tab, to the game's own Armies tab, where it reads with its tracker. -->
              <button
                type="button"
                class="pr-go-btn"
                @click="lead(r)"
              >
                <span class="pr-src">{{ r.src }}</span>
                <span class="pr-name">
                  {{ r.name }}
                  <small
                    v-if="r.sub"
                    class="pr-sub"
                  >{{ r.sub }}</small>
                </span>
                <i class="bi bi-chevron-right pr-go" />
              </button>
            </li>
          </ul>
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
          @click="$emit('stratagems')"
        >
          <i class="bi bi-lightning-charge" />
          {{ labels.trackerPhaseStrats }}
          <i class="bi bi-chevron-right pr-go" />
        </button>
        <RouterLink
          v-else
          class="pr-strats"
          :to="{ path: '/stratagems', query: { phase } }"
        >
          <i class="bi bi-lightning-charge" />
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

const props = defineProps({
  embedded: { type: Boolean, default: false },
  // The side picked on the score cards (the game screen's Phase tab, owner 2026-10-06): that army's
  // rules alone, inside the panel's frame — the card above already names it.
  side: { type: Number, default: null },
})
const emit = defineEmits(['stratagems', 'army', 'roster'])
const { sides, total, phase, go, labels } = usePhaseRules()
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
.pr-note { margin: 0.5rem 0 0.35rem; font-size: 0.78rem; color: var(--text-dim); }
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
.pr-list { list-style: none; margin: 0; padding: 0; }
.pr-rule { border-top: 1px solid var(--border); }
.pr-rule:first-child { border-top: none; }
.pr-go-btn {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  width: 100%;
  padding: 0.3rem 0;
  background: none;
  border: none;
  font-size: 0.82rem;
  text-align: left;
  cursor: pointer;
}
.pr-go-btn:hover .pr-name,
.pr-go-btn:hover .pr-go { color: var(--accent-ink); }
.pr-src {
  flex: 0 0 auto;
  max-width: 40%;
  color: var(--text-muted);
  font-size: 0.84rem;
  line-height: 1.5;
}
.pr-name { flex: 1; min-width: 0; color: var(--text-primary); }
.pr-sub { display: block; color: var(--text-muted); font-size: 0.82rem; }
.pr-strats {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.7rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.8rem;
  color: var(--text-muted);
}
.pr-strats:hover { color: var(--accent-ink); }
button.pr-strats { width: 100%; padding-bottom: 0; border: 0; border-top: 1px solid var(--border); background: none; font: inherit; font-size: 0.8rem; text-align: left; cursor: pointer; }
.pr-go { flex-shrink: 0; margin-left: auto; font-size: 0.75rem; color: var(--text-dim); }
</style>
