import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import createAppRouter from '@routes/index'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

const router = createAppRouter()
app.use(router)

app.mount('#app')
