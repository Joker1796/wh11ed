<template>
  <div class="campaigns">
    <div class="camp-hero">
      <h1>{{ labels.campTitle }}</h1>
      <RouterLink
        to="/dominatus"
        class="camp-rules"
      >
        {{ labels.campRulesLink }}
      </RouterLink>
    </div>

    <!-- A new campaign is the Warmaster's, set up on a page of its own: its settings are a screenful. -->
    <template v-if="status === 'authed'">
      <RouterLink
        to="/tracker/campaigns/new"
        class="btn-primary camp-new"
      >
        {{ labels.campNew }}
      </RouterLink>
    </template>
    <!-- Signed out: why an account, and the way in, where the campaign would start (owner,
         2026-11-01 — the ⚙ menu alone was not enough of a hint). -->
    <CampSignIn
      v-else-if="status !== 'idle'"
      :text="labels.campSignInToLead"
    />

    <h2 class="dgroup-label">
      {{ labels.campYours }}
    </h2>
    <ul
      v-if="campaigns.length"
      class="camp-index"
    >
      <li
        v-for="c in campaigns"
        :key="c.id"
      >
        <RouterLink :to="`/tracker/campaigns/${c.id}`">
          <span class="camp-index-name">
            <strong>{{ c.name || c.id }}</strong>
            <span class="camp-dim">{{ phaseOf(c) }}</span>
          </span>
          <span class="camp-index-side">
            <span
              v-if="c.waiting"
              class="camp-index-warn"
            >⚠ {{ labels.campWaiting }}</span>
            <span class="camp-role">{{ labels[`campRole_${c.role}`] }}</span>
          </span>
        </RouterLink>
      </li>
    </ul>
    <p
      v-else
      class="empty-note"
    >
      {{ labels.campNone }}
    </p>
  </div>
</template>

<script setup>
// Dominatus campaigns this device knows: the account's own (the Warmaster's), the ones joined by
// an invite link, the ones watched by a view link. A new one needs an account — it is the
// Warmaster's to run; joining and watching need none.
import { computed, watch } from 'vue'
import '../../components/dominatus/dominatus.css'
import '../../components/dominatus/campaign/campaign.css'
import { useCampaigns } from '../../composables/useCampaigns.js'
import { useAuth } from '../../composables/useAuth.js'
import CampSignIn from '../../components/dominatus/campaign/CampSignIn.vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { status } = useAuth()
const { campaigns, refreshAccount, stateOf, syncAll } = useCampaigns()

// The session comes back after the page does (a refresh on load), so ask once it is there; then
// every campaign is read again, so the list says what waits in each.
watch(status, async (s) => {
  if (s === 'authed') await refreshAccount().catch(() => {})
  if (s !== 'idle') syncAll()
}, { immediate: true })
// Where a campaign stands, from its log as last read (blank until the deck has loaded).
function phaseOf(c) {
  const st = stateOf(c.id)
  if (!st) return ''
  const l = labels.value
  return st.finished ? l.campFinished : l.domPhase.replace('{n}', ['I', 'II', 'III'][st.phase - 1])
}

</script>

<style scoped>
.campaigns { max-width: 760px; margin: 0 auto; padding-top: 0.5rem; }
.camp-new { margin-bottom: 1.25rem; }
.camp-index { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.4rem; }
.camp-index-name { display: grid; gap: 0.1rem; min-width: 0; }
.camp-index-side { display: grid; justify-items: end; gap: 0.1rem; }
.camp-index-warn { font-size: 0.75rem; font-weight: 700; color: var(--warning); white-space: nowrap; }
.camp-index a {
  display: flex; justify-content: space-between; gap: 0.6rem; align-items: baseline;
  padding: 0.6rem 0.75rem; border: 1px solid var(--border); background: var(--bg-card);
  color: var(--text-primary); text-decoration: none;
}
</style>
