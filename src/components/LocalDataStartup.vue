<template>
  <Transition name="fade">
    <section
      v-if="visible"
      class="local-data-startup"
      :class="{ 'local-data-startup--background': !blocking() }"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="lds-card">
        <div class="lds-brand">
          WH RULES
        </div>
        <h1 class="lds-title">
          {{ title }}
        </h1>
        <template v-if="progress.step === 'copying'">
          <p v-if="progress.rosters.total">
            {{ counter('localMigrationRosters', progress.rosters) }}
          </p>
          <p v-if="progress.games.total">
            {{ counter('localMigrationGames', progress.games) }}
          </p>
          <progress
            v-if="progress.total"
            class="lds-progress"
            :value="progress.done"
            :max="progress.total"
            :aria-label="labels.localMigrationTitle"
          />
        </template>
        <p class="lds-hint">
          {{ blocking() ? labels.localMigrationWait : (locale === 'ru' ? 'Правила уже доступны. Подготовка ростеров и партий продолжается.' : 'Rules are available. Lists and games are still being prepared.') }}
        </p>
      </div>
    </section>
  </Transition>
</template>

<script setup>
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import { useLocale } from '../composables/useLocale.js'
import { ui } from '../i18n/ui.js'

const props = defineProps({ state: { type: Object, required: true }, blocking: { type: Function, default: () => true } })
const { locale } = useLocale()
const labels = computed(() => ui[locale.value])
const progress = computed(() => props.state.progress)
const visible = ref(false)
let timer = null
watch(() => props.state.phase, (phase) => {
  clearTimeout(timer)
  visible.value = false
  if (phase === 'loading') timer = setTimeout(() => { visible.value = props.state.phase === 'loading' }, 500)
}, { immediate: true, flush: 'sync' })
onBeforeUnmount(() => clearTimeout(timer))
const title = computed(() => progress.value.step === 'verifying' ? labels.value.localMigrationVerifying
  : progress.value.step === 'copying' ? labels.value.localMigrationTitle : labels.value.localMigrationPreparing)
const counter = (key, group) => labels.value[key].replace('{done}', String(group.done)).replace('{total}', String(group.total))
</script>

<style scoped>
.local-data-startup {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: var(--bg-primary);
}
.local-data-startup--background {
  inset: auto 1rem 4.5rem;
  padding: 0;
  background: transparent;
  pointer-events: none;
}
.lds-card {
  width: 100%;
  max-width: 28rem;
  padding: 1.3rem;
  border: 1px solid var(--border);
  border-top: 3px solid var(--brand);
  background: var(--bg-card);
  color: var(--text-primary);
}
.lds-brand {
  margin-bottom: 1.1rem;
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}
.lds-title {
  margin: 0 0 0.75rem;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.15;
}
.lds-card p { margin: 0.35rem 0; font-size: 0.9rem; }
.lds-progress {
  display: block;
  appearance: none;
  width: 100%;
  height: 5px;
  margin: 0.9rem 0;
  border: none;
  background: var(--border-light);
  color: var(--brand);
}
.lds-progress::-webkit-progress-bar { background: var(--border-light); }
.lds-progress::-webkit-progress-value { background: var(--brand); }
.lds-progress::-moz-progress-bar { background: var(--brand); }
.lds-card .lds-hint { margin-top: 1rem; color: var(--text-muted); font-size: 0.82rem; }
</style>
