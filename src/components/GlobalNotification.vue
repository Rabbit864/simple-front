<template>
  <div class="toast-container">
    <div
        v-for="n in store.notifications"
        :key="n.id"
        class="toast"
        :class="{ read: n.read }"
    >
      <div class="toast-title">
        {{ n.status || 'Notification' }}
      </div>

      <div v-if="n.message" class="toast-message">
        {{ n.message }}
      </div>

      <button class="close" @click="remove(n.id)">×</button>
    </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from '../stores/notificationStore'

const store = useNotificationStore()

const remove = (id) => {
  store.notifications = store.notifications.filter(n => n.id !== id)
}
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 9999;
}
</style>