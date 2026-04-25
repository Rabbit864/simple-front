<template>
  <div class="form-page">
    <div class="form-page-content">
      <h1>Добавить автомобиль</h1>

      <form class="form">
        <div class="form-grid">
          <select
              v-model="selectedBrand"
              class="input"
              @change="fetchModels(selectedBrand)"
          >
            <option value="">Выберите марку</option>

            <option
                v-for="brand in brands"
                :key="brand.id"
                :value="brand.id"
            >
              {{ brand.name }}
            </option>
          </select>

          <select
              v-model="selectedModel"
              class="input"
              :disabled="!selectedBrand"
          >
            <option value="">Выберите модель</option>

            <option
                v-for="model in models"
                :key="model.id"
                :value="model.id"
            >
              {{ model.name }}
            </option>
          </select>

          <input
              v-model="year"
              type="number"
              placeholder="Год"
              class="input"
          >

          <input
              v-model="price"
              type="number"
              placeholder="Цена"
              class="input"
          >

          <input
              v-model="mileage"
              type="number"
              placeholder="Пробег"
              class="input"
          >

          <select v-model="selectedCity" class="input">
            <option value="">Выберите город</option>

            <option
                v-for="city in cities"
                :key="city.id"
                :value="city.id"
            >
              {{ city.name }}
            </option>
          </select>
        </div>

        <textarea
            v-model="description"
            placeholder="Описание"
            class="textarea"
        ></textarea>

        <button class="button">
          Создать объявление
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import api from '../api/axios'

const brands = ref([])
const models = ref([])
const cities = ref([])

const selectedBrand = ref('')
const selectedModel = ref('')
const selectedCity = ref('')

const year = ref('')
const price = ref('')
const mileage = ref('')
const description = ref('')

const fetchBrands = async () => {
  const response = await api.get('/brand')
  brands.value = response.data
}

const fetchCities = async () => {
  const response = await api.get('/city')
  cities.value = response.data
}

const fetchModels = async (brandId) => {
  selectedModel.value = ''

  if (!brandId) {
    models.value = []
    return
  }

  const response = await api.get(`/brand/${brandId}/model`)
  models.value = response.data
}

onMounted(async () => {
  await Promise.all([
    fetchBrands(),
    fetchCities(),
  ])
})
</script>