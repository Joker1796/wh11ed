<template>
  <div class="auth-callback">
    <div class="spinner" aria-hidden="true"></div>
    <p>{{ labels.authSigningIn }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ui } from '../../i18n/ui.js'
import { useLocale } from '../../composables/useLocale.js'
import { useAuth } from '../../composables/useAuth.js'

const router = useRouter()
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const { refresh } = useAuth()

// The backend has just set the refresh cookie and redirected here. Exchange it for an access
// token, then return to the tracker (whether or not it succeeded).
onMounted(async () => {
  await refresh()
  router.replace('/tracker')
})
</script>

<style scoped>
.auth-callback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 50vh;
  color: var(--text-muted);
}
.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
