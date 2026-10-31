<template>
  <section class="camp-block">
    <ul class="camp-list">
      <li
        v-for="p in state.players"
        :key="p.id"
        class="camp-player"
      >
        <div class="camp-player-head">
          <strong>{{ p.name || p.id }}</strong>
          <DomAllianceName
            v-if="p.alliance"
            :id="p.alliance"
            class="camp-dim"
            :name="allianceName(p.alliance)"
          />
          <span
            v-if="p.agenda.length"
            class="camp-badge"
          >{{ labels.domAgendaAchieved }} {{ p.agenda.length }}</span>
        </div>
        <!-- Each card held opens its text, as a card's corner mark does. -->
        <p
          v-if="p.upgrades.length"
          class="camp-cards"
        >
          <button
            v-for="slug in p.upgrades"
            :key="slug"
            type="button"
            class="camp-card"
            data-kw-open
            aria-haspopup="dialog"
            @click.stop="showUpgrade(slug, $event)"
          >
            {{ upgradeName(slug) }}
          </button>
        </p>
      </li>
    </ul>

    <!-- The Warmaster adds anyone; a player who joined by the link adds themselves, once. -->
    <CampOpenForm
      v-if="isOwner || (entry.role === 'member' && !mine)"
      v-slot="{ close }"
      :label="isOwner ? labels.campAddPlayer : labels.campJoinAs"
      :primary="!isOwner"
    >
      <form
        class="camp-form"
        @submit.prevent="add().then((ok) => ok && close())"
      >
        <input
          v-model.trim="name"
          class="form-input"
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
            <DomAllianceName
              :id="a.id"
              :name="a.name"
            />
          </button>
        </div>
        <div class="camp-row">
          <button
            class="btn-primary"
            type="submit"
            :disabled="!name || !alliance"
          >
            {{ isOwner ? labels.campAddPlayer : labels.campJoinAs }}
          </button>
          <button
            type="button"
            class="btn-ghost"
            @click="close"
          >
            {{ labels.trackerCancel }}
          </button>
        </div>
      </form>
    </CampOpenForm>
  </section>
</template>

<script setup>
// The campaign's players, their Alliance, the Upgrade cards they hold and their Agenda Achieved
// cards. A player who joined by the link registers themselves here; the fold lets a member speak
// for that one player only.
import { ref, computed } from 'vue'
import DomAllianceName from '../DomAllianceName.vue'
import CampOpenForm from './CampOpenForm.vue'
import { useCampaignView } from './useCampaignView.js'

const { entry, state, isOwner, mine, act, labels, deck, allianceName, upgradeName, showUpgrade } = useCampaignView()
const name = ref('')
const alliance = ref(null)
const alliances = computed(() => deck.value?.alliances || [])

async function add() {
  const id = isOwner.value ? `p${Date.now().toString(36)}` : `m-${entry.value.memberId}`
  if (!(await act('player', { id, name: name.value, alliance: alliance.value }))) return false
  name.value = ''
  alliance.value = null
  return true
}
</script>
