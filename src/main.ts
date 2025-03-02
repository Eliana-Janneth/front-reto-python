import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './routes/router'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App);

app.use(router)
app.component('PulseLoader', PulseLoader)
app.use(Notifications)

app.mount('#app');