import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/css/style.css'
import App from '@/App.vue'
import router from '@/router'

import { useHqyStore } from '@/stores'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

const options = {
  position: POSITION.TOP_RIGHT,
}
const hqyPinia = createPinia()

app.use(Toast, options)
app.use(hqyPinia)
app.use(router)

app.mount('#app')

export const hqyStore = useHqyStore()
