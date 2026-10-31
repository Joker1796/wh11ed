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

    <form
      v-if="status === 'authed'"
      class="camp-create"
      @submit.prevent="create"
    >
      <input
        v-model.trim="name"
        class="form-input"
        type="text"
        maxlength="80"
        :placeholder="labels.campName"
        :aria-label="labels.campName"
      >
      <div class="seg">
        <button
          type="button"
          :class="{ on: draw === 'app' }"
          @click="draw = 'app'"
        >
          {{ labels.campDrawApp }}
        </button>
        <button
          type="button"
          :class="{ on: draw === 'manual' }"
          @click="draw = 'manual'"
        >
          {{ labels.campDrawManual }}
        </button>
      </div>
      <button
        class="btn-primary"
        type="submit"
        :disabled="!name || busy"
      >
        {{ labels.campCreate }}
      </button>
    </form>
    <p
      v-else
      class="empty-note"
    >
      {{ labels.campSignInToLead }}
    </p>

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
          <strong>{{ c.name || c.id }}</strong>
          <span class="camp-role">{{ labels[`campRole_${c.role}`] }}</span>
        </RouterLink>
      </li>
    </ul>
    <p
      v-else
      class="empty-note"
    >
      {{ labels.campNone }}
    </p>
    <AppToast
      :show="!!error"
      :text="error"
      tone="error"
      @close="error = ''"
    />
  </div>
</template>

<script setup>
// Dominatus campaigns this device knows: the account's own (the Warmaster's), the ones joined by
// an invite link, the ones watched by a view link. A new one needs an account — it is the
// Warmaster's to run; joining and watching need none.
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppToast from '../../components/AppToast.vue'
import '../../components/dominatus/dominatus.css'
import '../../components/dominatus/campaign/campaign.css'
import { useCampaigns } from '../../composables/useCampaigns.js'
import { useAuth } from '../../composables/useAuth.js'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { status } = useAuth()
const { campaigns, createCampaign, refreshOwned } = useCampaigns()
const router = useRouter()
const name = ref('')
const draw = ref('app')
const busy = ref(false)
const error = ref('')

// The session comes back after the page does (a refresh on load), so ask once it is there.
watch(status, (s) => { if (s === 'authed') refreshOwned().catch(() => {}) }, { immediate: true })

async function create() {
  busy.value = true
  error.value = ''
  try {
    const c = await createCampaign(name.value, draw.value)
    router.push(`/tracker/campaigns/${c.id}`)
  } catch (e) {
    error.value = labels.value.campFailed.replace('{code}', e.code || 'network')
  } finally {
    busy.value = false
  }
}
</script>

<style scoped>
.campaigns { max-width: 760px; margin: 0 auto; padding-top: 0.5rem; }
.camp-create { display: grid; gap: 0.5rem; margin-bottom: 1.25rem; justify-items: start; }
.camp-create input { width: 100%; }
.camp-index { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.4rem; }
.camp-index a {
  display: flex; justify-content: space-between; gap: 0.6rem; align-items: baseline;
  padding: 0.6rem 0.75rem; border: 1px solid var(--border); background: var(--bg-card);
  color: var(--text-primary); text-decoration: none;
}
</style>
