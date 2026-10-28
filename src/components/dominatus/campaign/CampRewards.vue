<template>
  <section
    v-if="rewards.length"
    class="camp-block"
  >
    <h2 class="camp-h">
      {{ labels.campRewards }}
    </h2>
    <ul class="camp-list">
      <li
        v-for="r in rewards"
        :key="r.id"
        class="camp-reward"
      >
        <p class="camp-line">
          <strong>{{ playerName(r.player) }}</strong> · {{ title(r) }}
        </p>

        <!-- Auspicious Augury: the player shuffles their Secondary Missions and reports the Fixed
             Missions among the top four. -->
        <div
          v-if="r.kind === 'augury'"
          class="camp-row"
        >
          <NumberStepper
            :model-value="augury[r.id] || 0"
            :min="0"
            :max="4"
            @update:model-value="(v) => (augury[r.id] = v)"
          />
          <button
            class="btn-primary"
            @click="claim(r, { gained: augury[r.id] || 0 })"
          >
            {{ labels.campConfirm }}
          </button>
        </div>

        <!-- Test of Mettle: up to one Battle Honour and one Battle Skill swapped. -->
        <div
          v-else-if="r.kind === 'mettle'"
          class="camp-form"
        >
          <div
            v-for="kind in ['honour', 'skill']"
            :key="kind"
            class="camp-pair"
          >
            <select
              v-model="swap[r.id + kind + 'out']"
              class="form-input"
            >
              <option :value="null">
                {{ kind === 'honour' ? labels.domHonours : labels.domSkills }}: —
              </option>
              <option
                v-for="u in heldOf(r.player, kind)"
                :key="u.slug"
                :value="u.slug"
              >
                {{ u.name }}
              </option>
            </select>
            <select
              v-model="swap[r.id + kind + 'in']"
              class="form-input"
              :disabled="!swap[r.id + kind + 'out']"
            >
              <option :value="null">
                →
              </option>
              <option
                v-for="u in swapTargets(r.player, swap[r.id + kind + 'out'])"
                :key="u.slug"
                :value="u.slug"
              >
                {{ u.name }}
              </option>
            </select>
          </div>
          <button
            class="btn-primary"
            @click="claimMettle(r)"
          >
            {{ labels.campConfirm }}
          </button>
        </div>

        <!-- A draw: by the app (draw, then keep one of what came) or at the table (pick the card kept). -->
        <div
          v-else
          class="camp-form"
        >
          <template v-if="state.draw === 'app'">
            <button
              v-if="!drawn[r.id]"
              class="btn-ghost"
              data-press
              @click="draw(r)"
            >
              {{ labels.campDrawCards.replace('{n}', r.draw) }}
            </button>
            <div
              v-else
              class="filter-chips"
            >
              <button
                v-for="slug in drawn[r.id]"
                :key="slug"
                class="filter-chip"
                @click="claim(r, { drawn: drawn[r.id], kept: slug })"
              >
                {{ labels.campKeep }}: {{ upgradeName(slug) }}
              </button>
            </div>
          </template>
          <div
            v-else
            class="camp-row"
          >
            <select
              v-model="kept[r.id]"
              class="form-input"
            >
              <option
                :value="undefined"
                disabled
              >
                {{ labels.campKeptCard }}
              </option>
              <option
                v-for="slug in pileOf(r)"
                :key="slug"
                :value="slug"
              >
                {{ upgradeName(slug) }}
              </option>
            </select>
            <button
              class="btn-primary"
              :disabled="!kept[r.id]"
              @click="claim(r, { kept: kept[r.id] })"
            >
              {{ labels.campConfirm }}
            </button>
          </div>
          <button
            v-if="!pileOf(r).length"
            class="btn-ghost"
            @click="claim(r, {})"
          >
            {{ labels.campNothingLeft }}
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
// What is owed to players: card draws after approved battles and at the end of a phase, and the
// Location bonuses that ask a player something. This device sees the rewards it may take — all of
// them for the Warmaster, a member's own otherwise (the fold refuses the rest anyway).
import { reactive, computed } from 'vue'
import NumberStepper from '../../tracker/NumberStepper.vue'
import { drawFor, drawPile } from '../../../core/dominatus/campaign.js'
import { useCampaignView } from './useCampaignView.js'

const { state, isOwner, mine, act, labels, deck, playerName, upgradeName, phaseLabel } = useCampaignView()
const drawn = reactive({})
const kept = reactive({})
const augury = reactive({})
const swap = reactive({})

const rewards = computed(() => state.value.pending.filter((r) => isOwner.value || r.player === mine.value?.id))
const playerOf = (id) => state.value.players.find((p) => p.id === id)
const pileOf = (r) => (deck.value ? drawPile(deck.value, playerOf(r.player), r) : [])

function title(r) {
  const l = labels.value
  const what = { honour: l.domHonours, skill: l.domSkills, relic: l.domRelics, fresh: l.campFresh, mettle: l.campMettle, augury: l.campAugury }[r.kind] || r.kind
  return r.kind === 'mettle' || r.kind === 'augury' ? what : `${what} · ${phaseLabel(r.phase)} · ${l.campDrawN.replace('{n}', r.draw)}`
}
function draw(r) {
  drawn[r.id] = drawFor(deck.value, playerOf(r.player), r)
}
function heldOf(pid, kind) {
  return deck.value.upgrades.filter((u) => u.kind === kind && playerOf(pid).upgrades.includes(u.slug))
}
function swapTargets(pid, outSlug) {
  const out = deck.value?.upgrades.find((u) => u.slug === outSlug)
  if (!out) return []
  const held = playerOf(pid).upgrades
  return deck.value.upgrades.filter((u) => u.kind === out.kind && (out.kind !== 'honour' || u.phase === out.phase) && !held.includes(u.slug))
}
async function claim(r, extra) {
  await act('claim', { reward: r.id, ...extra })
  delete drawn[r.id]
}
function claimMettle(r) {
  const swaps = ['honour', 'skill']
    .map((k) => ({ out: swap[r.id + k + 'out'], in: swap[r.id + k + 'in'] }))
    .filter((s) => s.out && s.in)
  claim(r, { swaps })
}
</script>
