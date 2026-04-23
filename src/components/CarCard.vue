<template>
  <div class="car-card">
    <div class="car-image-wrapper">
      <img :src="car.image" :alt="car.model" class="car-image">

      <span class="badge">В наличии</span>
    </div>

    <div class="car-content">
      <h3 class="car-title">
        {{ car.brand }} {{ car.model }}
      </h3>

      <div class="car-meta">
        <span>{{ car.year }}</span>
        <span>•</span>
        <span>{{ car.mileage }} км</span>
      </div>

      <p class="car-city">{{ car.city }}</p>

      <div class="car-footer">
        <div class="price-block">
          <div class="price">{{ car.price }} ₽</div>
        </div>

        <router-link :to="`/car/${car.id}`" class="button small">
          Подробнее →
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