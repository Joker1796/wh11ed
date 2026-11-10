import { reactive } from 'vue'
import { needsPersonalData } from './personalDataReady.js'

// Only the latest requested route may publish a result. Imports themselves cannot be cancelled.
export const navigationState = reactive({ phase: 'idle', target: '', waiting: false })
let current, noticeTimer
let version = 0
export const navigationVersion = () => version
export function installNavigationState(router, { personalDataReady = Promise.resolve() } = {}) {
  router.beforeEach(async (to) => {
    version++
    clearTimeout(noticeTimer)
    navigationState.waiting = false
    noticeTimer = setTimeout(() => { navigationState.waiting = true }, 300)
    current = to
    navigationState.target = router.resolve(to).href
    navigationState.phase = 'pending'
    if (needsPersonalData(to.path)) await personalDataReady
  })
  router.afterEach((to) => {
    if (to !== current) return
    clearTimeout(noticeTimer)
    navigationState.waiting = false
    navigationState.phase = 'idle'
  })
  router.onError((_err, to) => {
    if (to !== current) return
    clearTimeout(noticeTimer)
    navigationState.waiting = false
    navigationState.phase = 'error'
  })
}
export function retryNavigation() {
  // A new document also resets a failed or still-pending module graph.
  window.location.assign(navigationState.target)
}
