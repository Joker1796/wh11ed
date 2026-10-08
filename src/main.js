import { createApp } from 'vue'
import { installErrorLog } from './composables/useErrorLog.js'
import { installStaleChunkRecovery } from './composables/staleChunks.js'
import { installPressFeedback } from './composables/pressFeedback.js'
import { installUiSound } from './composables/uiSound.js'
import { installStateSounds } from './composables/stateSounds.js'
import { installSegSlider } from './composables/segSlider.js'
import { router } from './router/index.js'
import App from './App.vue'
import './fonts.js'
import './style.css'

// First, before anything can throw: the error ring buffer bug reports attach.
installErrorLog()

const app = createApp(App)

// App-wide error boundary: a thrown error in one component's render/watcher is
// caught here instead of tearing down the whole app, so a bug in one section
// (e.g. a malformed rule entry) doesn't blank the entire page. Logged for triage.
app.config.errorHandler = (err, _instance, info) => {
  console.error(`[vue] ${info}:`, err)
}

app.use(router)

// A tab from before a deploy asking for a chunk that is gone: find the new build and reload.
installStaleChunkRecovery(router)

// How every button answers the finger — one document listener, see pressFeedback.js.
installPressFeedback()
installUiSound()
installStateSounds()
// …and every segmented control slides its lit half to the new pick (segSlider.js).
installSegSlider()

// Mount only after the router's initial navigation has settled. The PWA "resume last
// view" restore is a `router.beforeEach` redirect (router/index.js) — an async navigation.
// Mounting synchronously would run App.vue's onMounted (and useViewRestore's section
// re-scroll, which keys off route.hash) BEFORE that redirect resolves: the hash would
// still be empty, so the precise scroll-to-section never fires and persist() would
// transiently clobber the saved location with '/'. Awaiting isReady also removes the
// brief home flash before the restore. `finally`: mount even if the guard rejected.
router.isReady().finally(() => app.mount('#app'))
