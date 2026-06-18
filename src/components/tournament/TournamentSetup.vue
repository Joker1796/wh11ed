<template>
  <div class="setup">
    <label class="name-field">
      <span>{{ labels.tName }}</span>
      <input v-model="tournament.name" type="text" />
    </label>

    <h3 class="block-title">{{ labels.tSettings }}</h3>
    <div class="settings-grid">
      <label><span>{{ labels.tRounds }}</span><input v-model.number="tournament.settings.rounds" type="number" min="1" /></label>
      <label><span>{{ labels.tTables }}</span><input v-model.number="tournament.settings.tables" type="number" min="1" /></label>
      <label><span>{{ labels.tTpWin }}</span><input v-model.number="tournament.settings.tpWin" type="number" /></label>
      <label><span>{{ labels.tTpDraw }}</span><input v-model.number="tournament.settings.tpDraw" type="number" /></label>
      <label><span>{{ labels.tTpLoss }}</span><input v-model.number="tournament.settings.tpLoss" type="number" /></label>
      <label><span>{{ labels.tByeTp }}</span><input v-model.number="tournament.settings.byeTp" type="number" /></label>
    </div>

    <h3 class="block-title">{{ labels.tPlayers }} ({{ tournament.players.length }})</h3>
    <ol class="players">
      <li v-for="p in tournament.players" :key="p.id" class="player-row">
        <span class="seed">{{ p.seed + 1 }}</span>
        <input v-model="p.name" type="text" :placeholder="labels.tPlayerName" class="player-name" />
        <FactionSelect v-model="p.faction" />
        <button class="remove" :title="labels.tRemove" @click="removePlayer(p.id)">✕</button>
      </li>
    </ol>
    <button class="add-btn" @click="addPlayer()">+ {{ labels.tAddPlayer }}</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FactionSelect from './FactionSelect.vue'
import { useTournament } from '../../composables/useTournament.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { tournament, addPlayer, removePlayer } = useTournament()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
</script>

<style scoped>
.setup { max-width: 640px; }
.name-field, .settings-grid label, .player-row { display: flex; }
.name-field {
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 1.5rem;
}
.name-field span { font-size: 0.8rem; color: var(--text-muted); font-weight: 600; }
.name-field input {
  padding: 0.5rem 0.6rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-primary);
  font-family: var(--font-serif);
  font-size: 1.1rem;
}
.block-title {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  margin: 1.5rem 0 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}
.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
}
.settings-grid label { flex-direction: column; gap: 0.25rem; }
.settings-grid span { font-size: 0.78rem; color: var(--text-muted); }
.settings-grid input {
  padding: 0.4rem 0.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-primary);
  font-size: 0.9rem;
}
.players { list-style: none; padding: 0; margin: 0 0 0.75rem; }
.player-row {
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0;
}
.seed {
  flex: none;
  width: 1.6rem;
  text-align: right;
  color: var(--text-dim);
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
}
.player-name {
  flex: 1 1 40%;
  min-width: 0;
  padding: 0.4rem 0.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  color: var(--text-primary);
  font-size: 0.9rem;
}
.player-row :deep(.faction-select) { flex: 1 1 45%; }
.remove {
  flex: none;
  width: 32px; height: 32px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  border-radius: 4px;
  cursor: pointer;
}
.remove:hover { color: var(--accent); border-color: var(--accent); }
.add-btn {
  padding: 0.5rem 1rem;
  background: var(--accent);
  color: var(--text-on-accent);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
}
.add-btn:hover { background: var(--accent-hover); }
</style>
