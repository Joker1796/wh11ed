import { createApp } from 'vue'
import { router } from './router/index.js'
import App from './App.vue'
import './style.css'

const app = createApp(App)

// App-wide error boundary: a thrown error in one component's render/watcher is
// caught here instead of tearing down the whole app, so a bug in one section
// (e.g. a malformed rule entry) doesn't blank the entire page. Logged for triage.
app.config.errorHandler = (err, _instance, info) => {
  console.error(`[vue] ${info}:`, err)
}

app.use(router).mount('#app')
