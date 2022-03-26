import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import { useHqyStore } from './stores'

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
