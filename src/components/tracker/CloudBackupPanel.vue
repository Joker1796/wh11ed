<template>
  <section class="cloud-panel">
    <!-- Signed out -->
    <template v-if="status !== 'authed'">
      <p class="cloud-note">{{ labels.cloudNote }}</p>
      <div class="cloud-actions">
        <button class="cloud-btn" @click="login('google')">
          <i class="bi bi-google"></i> {{ labels.cloudSignInGoogle }}
        </button>
        <button class="cloud-btn" @click="login('yandex')">
          <span class="ya">Я</span> {{ labels.cloudSignInYandex }}
        </button>
      </div>
    </template>

    <!-- Signed in -->
    <template v-else>
      <div class="cloud-user">
        <i class="bi bi-cloud-check-fill"></i>
        <span class="cloud-email">{{ user?.email || user?.displayName || labels.cloudSignedIn }}</span>
      </div>
      <div class="cloud-actions">
        <button class="cloud-btn primary" :disabled="syncing" @click="syncNow">
          {{ syncing ? labels.cloudSyncing : labels.cloudSync }}
        </button>
        <button class="cloud-btn ghost" @click="logout">{{ labels.cloudSignOut }}</button>
      </div>
      <p v-if="lastError" class="cloud-err">{{ labels.cloudError }}</p>
    </template>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useAuth } from '../../composables/useAuth.js'
import { useCloudSync } from '../../composables/useCloudSync.js'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { status, user, login, logout } = useAuth()
const { syncing, lastError, syncNow } = useCloudSync()
</script>

<style scoped>
.cloud-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.8rem 0.9rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.cloud-note {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin: 0;
}
.cloud-user {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  font-size: 0.9rem;
}
.cloud-user .bi {
  color: var(--accent);
}
.cloud-email {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cloud-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.cloud-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  background: none;
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-radius: 5px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
}
.cloud-btn:hover {
  border-color: var(--accent);
}
.cloud-btn.primary {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
.cloud-btn.primary:disabled {
  opacity: 0.6;
  cursor: default;
}
.cloud-btn.ghost {
  color: var(--text-muted);
}
.cloud-btn .ya {
  font-weight: 800;
  color: #fc3f1d;
}
.cloud-err {
  color: #d9534f;
  font-size: 0.8rem;
  margin: 0;
}
</style>
