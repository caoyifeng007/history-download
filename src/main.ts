import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import { Edit, Aim } from '@element-plus/icons-vue'

const app = createApp(App)

app.component('edit', Edit)
app.component('aim', Aim)

app.use(createPinia())
app.use(router)

app.mount('#app')
