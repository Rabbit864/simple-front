<template>
  <div class="form-page">
    <div class="form-card">
      <div class="form-header">
        <h1>Вход</h1>
        <p>Введите email и пароль для входа в аккаунт</p>
      </div>

      <form class="form" @submit.prevent="submit">
        <div class="form-group">
          <label>Email</label>
          <input
              type="email"
              placeholder="example@mail.com"
              class="input"
              v-model="email"
          >
        </div>

        <div class="form-group">
          <label>Пароль</label>
          <input
              type="password"
              placeholder="Введите пароль"
              class="input"
              v-model="password"
          >
        </div>

        <button :disabled="loading" class="btn">
          {{ loading ? 'Вход...' : 'Войти' }}
        </button>
      </form>

      <div class="form-footer">
        <span>Нет аккаунта?</span>
        <router-link to="/register">Регистрация</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const submit = async () => {
  error.value = ''
  loading.value = true

  try {
    await authStore.login({
      email: email.value,
      password: password.value,
    })

    router.push('/')
  } catch (e) {
    error.value = 'Неверный email или пароль'
  } finally {
    loading.value = false
  }
}
</script>