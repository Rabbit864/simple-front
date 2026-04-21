<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCarStore } from '../stores/carStore'
import { useAuthStore } from '../stores/authStore'

import SearchBar from '../components/SearchBar.vue'
import CarCard from '../components/CarCard.vue'

const carStore = useCarStore()

const { cars, loading, error } = storeToRefs(carStore)

function handleSearch(query) {
  carStore.fetchCars({ search: query })
}

onMounted(() => {
  carStore.fetchCars()
})
</script>

<template>
  <div class="home">
    <section class="hero">
      <h1>Найдите свой автомобиль</h1>
      <p>Лучшие предложения по авто в Йошкар-Оле</p>

      <SearchBar class="search" @search="handleSearch" />
    </section>

    <section class="content">
      <div class="section-header">
        <h2>Популярные объявления</h2>
        <span>{{ cars.length }} авто</span>
      </div>

      <div v-if="loading" class="loading">
        Загрузка...
      </div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <div v-else class="cars-grid">
        <CarCard
            v-for="car in cars"
            :key="car.id"
            :car="car"
        />
      </div>
    </section>
  </div>
</template>