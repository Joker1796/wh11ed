<template>
  <section class="camp-block">
    <h2 class="camp-h">
      {{ labels.campPlayers }}
    </h2>
    <ul class="camp-list">
      <li
        v-for="p in state.players"
        :key="p.id"
        class="camp-player"
      >
        <div class="camp-player-head">
          <strong>{{ p.name || p.id }}</strong>
          <span class="camp-dim">{{ allianceName(p.alliance) }}</span>
          <span
            v-if="p.agenda.length"
            class="camp-badge"
          >{{ labels.domAgendaAchieved }} {{ p.agenda.length }}</span>
        </div>
        <p
          v-if="p.upgrades.length"
          class="camp-cards"
        >
          {{ p.upgrades.map(upgradeName).join(', ') }}
        </p>
      </li>
    </ul>

    <!-- The Warmaster adds anyone; a player who joined by the link adds themselves, once. -->
    <form
      v-if="isOwner || (entry.role === 'member' && !mine)"
      class="camp-form"
      @submit.prevent="add"
    >
      <input
        v-model.trim="name"
        type="text"
        maxlength="40"
        :placeholder="labels.campPlayerName"
        :aria-label="labels.campPlayerName"
      >
      <div class="seg seg-fill">
        <button
          v-for="a in alliances"
          :key="a.id"
          type="button"
          :class="{ on: alliance === a.id }"
          @click="alliance = a.id"
        >
          {{ a.name }}
        </button>
      </div>
      <button
        class="btn-primary"
        type="submit"
        :disabled="!name || !alliance"
      >
        {{ isOwner ? labels.campAddPlayer : labels.campJoinAs }}
      </button>
    </form>
  </section>
</template>

<script setup>
// The campaign's players, their Alliance, the Upgrade cards they hold and their Agenda Achieved
// cards. A player who joined by the link registers themselves here; the fold lets a member speak
// for that one player only.
import { ref, computed } from 'vue'
import { useCampaignView } from './useCampaignView.js'

const { entry, state, isOwner, mine, act, labels, deck, allianceName, upgradeName } = useCampaignView()
const name = ref('')
const alliance = ref(null)
const alliances = computed(() => deck.value?.alliances || [])

async function add() {
  const id = isOwner.value ? `p${Date.now().toString(36)}` : `m-${entry.value.memberId}`
  await act('player', { id, name: name.value, alliance: alliance.value })
  name.value = ''
  alliance.value = null
}
</script>
