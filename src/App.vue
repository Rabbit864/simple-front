<template>
  <div>
    <AppHeader />

    <main class="container">
      <router-view />
    </main>

    <SupportChat v-if="auth.user"/>
    <GlobalNotification />
  </div>

</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import { onMounted } from 'vue'
import { initMercure } from './services/mercure'
import { useAuthStore } from './stores/authStore'
import SupportChat from './components/Chat.vue'
import GlobalNotification from './components/GlobalNotification.vue'

const auth = useAuthStore()

onMounted(() => {
  auth.init()
  initMercure()
})



</script>