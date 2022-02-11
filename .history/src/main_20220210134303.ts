import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

// import * as ElIconModules from '@element-plus/icons-vue'

// const app = createApp(App)
// // 统一注册Icon图标
// for (const iconName in ElIconModules) {
//   if (Reflect.has(ElIconModules, iconName)) {
//     const item = ElIconModules[iconName]
//     app.component(iconName, item)
//   }
// }
app.use(createPinia())
app.use(router)

app.mount('#app')
