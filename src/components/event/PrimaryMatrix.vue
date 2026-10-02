<template>
  <div class="pm">
    <p class="pm-hint">
      {{ labels.missionsMatrixHint }}
    </p>

    <!-- Wide screens: the matrix as GW prints it — your disposition down the side, the
         opponent's across the top, the Primary in the cell. -->
    <table class="pm-table">
      <thead>
        <tr>
          <th class="pm-corner">
            <span>{{ labels.eventMatrixYou }} ↓</span>
            <span>{{ labels.eventMatrixOpponent }} →</span>
          </th>
          <th
            v-for="d in DISPOSITIONS"
            :key="'c-' + d.id"
            class="pm-head"
          >
            {{ d.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in rows"
          :key="'r-' + row.you.id"
          :class="{ current: row.you.id === active }"
        >
          <th class="pm-head pm-rowhead">
            {{ row.you.name }}
          </th>
          <td
            v-for="c in row.cells"
            :key="row.you.id + '-' + c.opponent.id"
            class="pm-cell"
          >
            <button
              v-if="c.mission"
              type="button"
              class="pm-mission"
              @click="$emit('open', { you: row.you.id, slug: c.mission.slug })"
            >
              <span class="pm-name">{{ c.mission.name }}</span>
              <span
                v-if="c.mission.nameRu"
                class="pm-name-ru"
              >{{ c.mission.nameRu }}</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- A phone has no room for five columns of two-word names: it reads the matrix by rows —
         the one the disposition chips above have picked, or all five while none is. -->
    <div class="pm-rows">
      <div
        v-for="row in phoneRows"
        :key="'p-' + row.you.id"
        class="pm-row"
      >
        <h4
          v-if="phoneRows.length > 1"
          class="pm-row-head"
        >
          <img
            :src="row.you.icon"
            :alt="row.you.name"
            class="pm-icon"
            loading="lazy"
            decoding="async"
          >
          {{ row.you.name }}
        </h4>
        <button
          v-for="c in row.cells.filter((x) => x.mission)"
          :key="row.you.id + '-' + c.opponent.id"
          type="button"
          class="pm-line"
          @click="$emit('open', { you: row.you.id, slug: c.mission.slug })"
        >
          <span class="pm-vs">
            <img
              :src="c.opponent.icon"
              :alt="c.opponent.name"
              class="pm-icon"
              loading="lazy"
              decoding="async"
            >
            {{ labels.trackerVs }} {{ c.opponent.name }}
          </span>
          <span class="pm-line-mission">
            <span class="pm-name">{{ c.mission.name }}</span>
            <span
              v-if="c.mission.nameRu"
              class="pm-name-ru"
            >{{ c.mission.nameRu }}</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// The Primary Mission matrix on the Missions chapter (a player's ask, 2026-10-01: "the one thing
// I still go elsewhere for — I want to read the missions before I build the list"). The Terrain &
// Layouts matrix answers the same pair of dispositions, but with empty cells and a layout viewer
// under them: it is a picker for the battlefield, not a table you can read.
import { computed } from 'vue'
import { DISPOSITIONS } from '../../data/dispositions.js'
import { primaryRow } from '../../data/missions.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  // The disposition the chips above have picked, or 'all'.
  active: { type: String, default: 'all' },
})
defineEmits(['open'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

const rows = computed(() =>
  DISPOSITIONS.map((you) => ({ you, cells: primaryRow(you.id, locale.value) })),
)
const phoneRows = computed(() =>
  props.active === 'all' ? rows.value : rows.value.filter((r) => r.you.id === props.active),
)
</script>

<style scoped>
.pm { margin: 0 0 1.75rem; }
.pm-hint { margin: 0 0 0.85rem; color: var(--text-muted); font-size: 0.88rem; line-height: 1.5; }

/* ── Wide: the table ── */
.pm-table { width: 100%; border-collapse: collapse; table-layout: fixed; }
.pm-table th,
.pm-table td { border: 1px solid var(--border); }
.pm-corner { width: 9.5rem; padding: 0.35rem 0.6rem; background: var(--bg-secondary); text-align: left; }
.pm-corner span { display: block; font-size: 0.7rem; font-weight: 600; color: var(--text-muted); }
.pm-head {
  padding: 0.5rem 0.4rem;
  background: var(--bg-secondary);
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--text-primary);
  text-align: center;
}
.pm-rowhead { text-align: left; padding-left: 0.6rem; }
tr.current .pm-rowhead { box-shadow: inset 3px 0 0 var(--accent); }
tr.current .pm-cell { background: color-mix(in srgb, var(--accent) 6%, transparent); }
.pm-cell { padding: 0; vertical-align: top; }

.pm-mission {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: 100%;
  min-height: 3.2rem;
  padding: 0.45rem 0.5rem;
  background: none;
  border: none;
  color: var(--text-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background var(--motion-fast);
}
.pm-mission:hover { background: var(--bg-row-hover); }
.pm-name { font-size: 0.86rem; font-weight: 600; line-height: 1.25; }
.pm-name-ru { font-size: 0.74rem; color: var(--text-muted); line-height: 1.25; }

/* ── Narrow: rows ── */
.pm-rows { display: none; }
.pm-row + .pm-row { margin-top: 1rem; }
.pm-row-head {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.35rem;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.pm-icon { width: 20px; height: 20px; object-fit: contain; flex: none; }
.pm-line {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  min-height: 44px;
  padding: 0.4rem 0.6rem;
  background: var(--bg-card); /* not --bg-secondary: muted text on it is under 4.5:1 in the light theme */
  border: 1px solid var(--border);
  border-top-width: 0;
  color: var(--text-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.pm-row-head + .pm-line,
.pm-row > .pm-line:first-child { border-top-width: 1px; }
.pm-line:hover { background: var(--bg-row-hover); }
.pm-vs { display: flex; align-items: center; gap: 0.4rem; font-size: 0.78rem; color: var(--text-muted); }
.pm-line-mission { display: flex; flex-direction: column; gap: 0.05rem; }

@media (max-width: 900px) {
  .pm-table { display: none; }
  .pm-rows { display: block; }
}
</style>
