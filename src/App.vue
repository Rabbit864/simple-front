<template>
  <div>
    <AppHeader />

    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
</script>