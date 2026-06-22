<template>
  <!-- Only shown once there's at least one finished game to back up. -->
  <section v-if="history.length" class="cloud-panel">
    <button class="cloud-save" :disabled="syncing" @click="onSync">
      <i class="bi" :class="syncing ? 'bi-arrow-repeat' : 'bi-cloud-arrow-up-fill'"></i>
      {{ syncing ? labels.cloudSyncing : labels.cloudSync }}
    </button>
    <div v-if="status === 'authed'" class="cloud-meta">
      <span class="cloud-email">{{ user?.email || user?.displayName || labels.cloudSignedIn }}</span>
      <button class="cloud-link" @click="logout">{{ labels.cloudSignOut }}</button>
    </div>
    <p v-if="lastError" class="cloud-err">{{ labels.cloudError }}</p>
    <p v-else-if="inSync" class="cloud-ok"><i class="bi bi-cloud-check-fill"></i> {{ labels.cloudInSync }}</p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useTracker } from '../../composables/useTracker.js'
import { useAuth } from '../../composables/useAuth.js'
import { useCloudSync } from '../../composables/useCloudSync.js'

const SYNC_AFTER_LOGIN = 'wh11ed-sync-after-login'

const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { history } = useTracker()
const { status, user, login, logout } = useAuth()
const { syncing, lastError, inSync, syncNow } = useCloudSync()

async function onSync() {
  if (status.value !== 'authed') {
    // Single provider (Yandex): go straight to login. Remember intent so the tracker
    // auto-syncs once we return authenticated.
    try {
      sessionStorage.setItem(SYNC_AFTER_LOGIN, '1')
    } catch {
      /* ignore */
    }
    login('yandex')
    return
  }
  await syncNow()
}
</script>

<style scoped>
.cloud-panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}
.cloud-save {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.9rem;
  background: none;
  color: var(--accent);
  border: 1px solid var(--accent);
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.cloud-save:hover:not(:disabled) {
  background: var(--accent);
  color: #fff;
}
.cloud-save:disabled {
  opacity: 0.6;
  cursor: default;
}
.cloud-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.78rem;
  color: var(--text-dim);
}
.cloud-email {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 60vw;
}
.cloud-link {
  background: none;
  border: none;
  color: var(--text-dim);
  cursor: pointer;
  font-size: 0.78rem;
  text-decoration: underline;
}
.cloud-link:hover {
  color: var(--accent);
}
.cloud-err {
  color: #d9534f;
  font-size: 0.8rem;
  margin: 0;
}
.cloud-ok {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: var(--text-dim);
  font-size: 0.8rem;
  margin: 0;
}
.cloud-ok .bi { color: var(--accent); }
</style>
