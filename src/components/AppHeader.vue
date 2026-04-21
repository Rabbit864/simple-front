<template>
  <header class="header">
    <div class="header-content">


    <router-link to="/" class="logo">
      AutoMarketYO
    </router-link>

    <nav class="nav">
        <router-link to="/">Главная</router-link>
        <router-link
            v-if="isAuthenticated"
            to="/cars/create"
            class="add-button"
        >
         Добавить авто
        </router-link>

        <router-link
            v-if="!isAuthenticated"
            to="/login"
        >
          Войти
        </router-link>

        <button
            v-else
            class="logout-button"
            @click="authStore.logout()"
        >
          Выйти
        </button>
    </nav>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()

const { isAuthenticated } = storeToRefs(authStore)
</script>