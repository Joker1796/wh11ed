// The roster cloud status as words and an icon — one reading of useRosterSync for the two places
// that show it: RosterCloudBar (a line in the list page's heading) and RosterCloudToast (the answer
// to Save on a list's view, as a toast since 2026-09-24). Kept in one place so the two can never
// describe the same state differently.
import { computed, toValue } from 'vue'
import { ui } from '../i18n/ui.js'
import { useLocale } from './useLocale.js'
import { useRosterSync } from './useRosterSync.js'
import { useInstallPrompt } from './useInstallPrompt.js'

// `hint`: say something to a signed-out user (the list page does). `compact`: the heading-row form,
// where the signed-out sentence becomes three words. Each may be a value, a ref or a getter.
export function useRosterCloudStatus({ hint = false, compact = false } = {}) {
  const props = { get hint() { return toValue(hint) }, get compact() { return toValue(compact) } }
  const { locale } = useLocale()
  const labels = computed(() => ui[locale.value])
  const { syncing, uploading, lastError, checked, pulled, savedAt, pendingCount, enabled } = useRosterSync()
  // A tab in iOS Safari is the one place where "stored on this device" comes with a deadline:
  // WebKit deletes a site's script-writable storage after about a week without a visit, and these
  // lists live in exactly that storage. Installing the app or signing in both take it off the
  // table, so the hint says which of the two rather than being a warning nobody can act on.
  // Not shown in the installed app (`iosInstall` is already false there) or anywhere else.
  const { iosInstall } = useInstallPrompt()

  const state = computed(() => {
    if (!enabled.value) return props.hint ? 'hint' : ''
    if (syncing.value || uploading.value) return 'syncing'
    if (lastError.value) return 'error'
    if (savedAt.value) return 'saved'
    // "Your lists were updated" belongs to the screen that did the updating. On a single list's
    // page it would be an answer to a question nobody asked there.
    if (pulled.value) return props.hint ? 'updated' : ''
    if (pendingCount.value) return 'pending'
    return checked.value && props.hint ? 'synced' : ''
  })

  // What the long form says — the tooltip in compact mode, and the line itself otherwise.
  const title = computed(() => {
    const l = labels.value
    if (state.value === 'hint') return iosInstall.value ? l.rosterCloudHintIos : l.rosterCloudHint
    return text.value
  })

  const text = computed(() => {
    const l = labels.value
    if (props.compact && state.value === 'hint') return l.cloudLocalOnly
    switch (state.value) {
      case 'hint': return iosInstall.value ? l.rosterCloudHintIos : l.rosterCloudHint
      case 'syncing': return l.rosterCloudSyncing
      case 'error': return l.rosterCloudError
      case 'updated': {
        const p = pulled.value
        return l.rosterCloudUpdated.replace('{n}', String(p.added + p.updated + p.removed))
      }
      case 'saved': return l.rosterCloudSaved
      case 'pending': return l.rosterCloudPending.replace('{n}', String(pendingCount.value))
      case 'synced': return l.rosterCloudSynced
      default: return ''
    }
  })

  const icon = computed(() => ({
    hint: 'bi-cloud',
    syncing: 'bi-arrow-repeat',
    error: 'bi-cloud-slash',
    updated: 'bi-cloud-arrow-down-fill',
    saved: 'bi-cloud-check-fill',
    pending: 'bi-cloud-arrow-up',
    synced: 'bi-cloud-check-fill',
  }[state.value] || ''))

  return { state, text, title, icon }
}
