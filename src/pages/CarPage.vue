<template>
  <div class="car-page">

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-else-if="car" class="car-card">

      <div class="car-image-wrapper">
        <img
            :src="car.image"
            :alt="car.model"
            class="car-image"
        >
        <span class="badge">В наличии</span>
      </div>

      <div class="car-content">
        <div class="car-header">
          <h1>{{ car.brand }} {{ car.model }}</h1>
          <p class="price">{{ car.price }} Р</p>
        </div>

        <div class="car-details">
          <div class="detail">
            <span class="label">Год</span>
            <span class="value">{{ car.year }}</span>
          </div>

          <div class="detail">
            <span class="label">Пробег</span>
            <span class="value">{{ car.mileage }} км</span>
          </div>

          <div class="detail">
            <span class="label">Город</span>
            <span class="value">{{ car.city }}</span>
          </div>
        </div>

        <p class="description">
          {{ car.description }}
        </p>

      </div>

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCarStore } from '../stores/carStore'

const route = useRoute()
const carStore = useCarStore()

const { car, loading, error } = storeToRefs(carStore)

onMounted(() => {
  carStore.fetchCar(route.params.id)
})
</script>