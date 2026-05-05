<template>
  <div>
    <!-- Кнопка -->
    <button class="chat-button" @click="open = true">
      💬
    </button>

    <!-- Окно -->
    <div v-if="open" class="chat-widget">
      <div class="chat-header">
        <div class="chat-user">
          <div class="avatar">💬</div>

          <div class="info">
            <div class="name">Поддержка</div>
            <div class="status">онлайн</div>
          </div>
        </div>

        <button class="close-btn" @click="open = false">✕</button>
      </div>

      <div class="chat-body">
        <div
            v-for="(msg, i) in messages"
            :key="i"
            :class="['message', msg.sender === 'user' ? 'me' : 'support']"
        >
          {{ msg.text }}
        </div>
      </div>

      <div class="chat-input">
        <input
            v-model="text"
            @keyup.enter="sendMessage"
            placeholder="Напишите сообщение..."
        />

        <button @click="sendMessage">
          ➤
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Pusher from 'pusher-js'
import api from '../api/axios'

const open = ref(false)
const messages = ref([])
const text = ref('')
const chatId = ref(null)

let channel = null

onMounted(async () => {
  // 1. получить или создать чат
  const res = await api.get('/support/chat')
  const data = res.data

  chatId.value = data.chat_id
  messages.value = data.messages

  // 2. подключаем Pusher
  const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
    cluster: import.meta.env.VITE_PUSHER_CLUSTER,
    authEndpoint: import.meta.env.VITE_PUSHER_AUTH_ENDPOINT
  })

  console.log(`private-support-${chatId.value}`)
  channel = pusher.subscribe(`private-support-${chatId.value}`)

  channel.bind('new-message', (data) => {
    messages.value.push(data)
  })
})

async function sendMessage() {
  if (!text.value) return

  await api.post('/support/message', {
    chat_id: +chatId.value,
    text: text.value
  })

  text.value = ''
}
</script>