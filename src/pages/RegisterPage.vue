<template>
  <div class="form-page">
    <div class="form-card">
      <div class="form-header">
        <h1>Регистрация</h1>
        <p>Создайте аккаунт для размещения объявлений</p>
      </div>

      <form class="form" @submit.prevent="submit">
        <div class="form-group">
          <label>Имя</label>
          <input
              v-model="name"
              type="text"
              placeholder="Введите имя"
              class="input"
          >
        </div>

        <div class="form-group">
          <label>Email</label>
          <input
              v-model="email"
              type="email"
              placeholder="example@mail.com"
              class="input"
          >
        </div>

        <div class="form-group">
          <label>Пароль</label>
          <input
              v-model="password"
              type="password"
              placeholder="Минимум 6 символов"
              class="input"
          >
        </div>

        <div class="form-group">
          <label>Подтверждение пароля</label>
          <input
              v-model="passwordConfirmation"
              type="password"
              placeholder="Повторите пароль"
              class="input"
          >
        </div>

        <p v-if="error" class="error-text">
          {{ error }}
        </p>

        <button type="submit" class="button" :disabled="loading">
          {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
        </button>
      </form>

      <div class="form-footer">
        <span>Уже есть аккаунт?</span>
        <router-link to="/login">Войти</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const loading = ref(false)
const error = ref('')

const submit = async () => {
  error.value = ''

  if (password.value !== passwordConfirmation.value) {
    error.value = 'Пароли не совпадают'
    return
  }

  loading.value = true

  try {
    await api.post('/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    })

    router.push('/login')
  } catch (e) {
    error.value =
        e.response?.data?.message ||
        'Ошибка регистрации'
  } finally {
    loading.value = false
  }
}
</script>