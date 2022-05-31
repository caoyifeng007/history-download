import { createApp } from 'vue'

import { store } from '@/stores'
// import '@/css/style.css'
import App from '@/App.vue'
import router from '@/router'

import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

const options = {
  position: POSITION.TOP_RIGHT,
}

app.use(Toast, options).use(store).use(router)

app.mount('#app')
