import { createApp } from 'vue'
import { pinia } from './pinia'
import App from './App.vue'
import router from './router'
import './assets/styles.css'
import { useAuthStore } from './stores/authStore'

const app = createApp(App)

app.use(pinia)
app.use(router)

const authStore = useAuthStore()
authStore.init()

app.mount('#app')