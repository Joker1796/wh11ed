<template>
  <div class="matrix-wrap">
    <table class="matrix">
      <thead>
        <tr>
          <th class="corner">
            <span class="corner-you">{{ labels.eventMatrixYou }} ↓</span>
            <span class="corner-opp">{{ labels.eventMatrixOpponent }} →</span>
          </th>
          <th v-for="d in dispositions" :key="'col-' + d.id" class="col-head">
            <img v-if="d.icon" :src="d.icon" :alt="d.name" class="dispo-icon" />
            <span class="dispo-name">{{ d.name }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in dispositions" :key="'row-' + row.id">
          <th class="row-head">
            <img v-if="row.icon" :src="row.icon" :alt="row.name" class="dispo-icon" />
            <span class="dispo-name">{{ row.name }}</span>
          </th>
          <td
            v-for="col in dispositions"
            :key="row.id + '-' + col.id"
            class="cell"
            :class="{ active: isActive(row.id, col.id) }"
            @click="$emit('select', { you: row.id, opp: col.id })"
          >
            <span class="cell-dot"></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const props = defineProps({
  dispositions: { type: Array, required: true },
  selected: { type: Object, default: null }, // { you, opp }
})
defineEmits(['select'])

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])

function isActive(rowId, colId) {
  return props.selected && props.selected.you === rowId && props.selected.opp === colId
}
</script>

<style scoped>
.matrix-wrap {
  overflow-x: auto;
  margin: 1rem 0 1.5rem;
}

.matrix {
  border-collapse: collapse;
  width: 100%;
  min-width: 520px;
}

.matrix th,
.matrix td {
  border: 1px solid var(--border);
  text-align: center;
}

.col-head,
.row-head {
  background: var(--bg-secondary);
  font-family: var(--font-serif);
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.5rem 0.6rem;
  color: var(--text-primary);
}

.row-head {
  text-align: right;
  white-space: nowrap;
}

/* Disposition emblem icons — shown only on mobile (desktop matrix stays textual). */
.dispo-icon {
  display: none;
}

.corner {
  background: var(--bg-secondary);
  padding: 0.4rem 0.6rem;
}

.corner-you,
.corner-opp {
  display: block;
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}

.cell {
  cursor: pointer;
  height: 44px;
  transition: background 0.12s;
}

.cell:hover {
  background: var(--bg-row-hover);
}

.cell.active {
  background: var(--accent);
}

.cell-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
}

.cell:hover .cell-dot {
  background: var(--accent);
}

.cell.active .cell-dot {
  background: var(--text-on-accent);
}

/* Mobile: drop the names, show only emblem icons, and fit the table to the
   viewport (no horizontal scroll on typical phones). */
@media (max-width: 600px) {
  .matrix {
    min-width: 0;
    table-layout: fixed;
  }
  .dispo-name {
    display: none;
  }
  .dispo-icon {
    display: block;
    width: 26px;
    height: 26px;
    object-fit: contain;
    margin: 0 auto;
  }
  .col-head,
  .row-head {
    padding: 0.35rem 0.15rem;
  }
  .row-head .dispo-icon {
    margin: 0 0 0 auto;
  }
  .cell {
    height: 40px;
  }
  /* Narrow corner: hide the words, keep just the direction arrows. */
  .corner {
    padding: 0.3rem 0.15rem;
  }
  .corner-you,
  .corner-opp {
    font-size: 0.6rem;
    white-space: normal;
    line-height: 1.2;
  }
}
</style>
