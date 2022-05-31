import { createPinia, setActivePinia } from 'pinia'

const store = createPinia()
setActivePinia(store)

export { store }
