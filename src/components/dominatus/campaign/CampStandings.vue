<template>
  <section class="camp-block">
    <h2 class="camp-h">
      {{ labels.campStandings }}
    </h2>
    <p
      v-if="!rows.length"
      class="empty-note"
    >
      {{ labels.campNoPlayers }}
    </p>
    <table
      v-else
      class="camp-table"
    >
      <thead>
        <tr>
          <th />
          <th>{{ labels.campHonoursPhase }}</th>
          <th>{{ labels.domAgendaAchieved }}</th>
          <th>{{ labels.campNp }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="r in rows"
          :key="r.alliance"
        >
          <th scope="row">
            {{ allianceName(r.alliance) }}
            <span
              v-for="l in r.locations"
              :key="l"
              class="camp-loc"
            >{{ locationName(l) }}</span>
          </th>
          <td>{{ r.honours }} <span class="camp-dim">/ {{ r.totalHonours }}</span></td>
          <td>{{ r.agendaAchieved }}</td>
          <td>{{ r.np }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
// Each Alliance's standing: Battle Honours this phase (over the campaign), Agenda Achieved cards
// held, Narrative Points earned, and the Locations it controls.
import { computed } from 'vue'
import { standings } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'

const { state, labels, allianceName, locationName } = useCampaignView()
const rows = computed(() => (state.value ? standings(state.value) : []))
</script>
