<template>
  <div class="car-card">
    <img :src="car.image" :alt="car.model" class="car-image">

    <div class="car-content">
      <h3>{{ car.brand }} {{ car.model }}</h3>

      <p>{{ car.year }} год</p>
      <p>{{ car.mileage }} км</p>
      <p>{{ car.city }}</p>

      <div class="car-footer">
        <strong>{{ car.price }} Р.</strong>

        <router-link :to="`/cars/${car.id}`" class="button small">
          Подробнее
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  car: {
    type: Object,
    required: true,
  },
})
</script>