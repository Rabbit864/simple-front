<template>
  <div class="search-bar">
    <div class="search-wrapper">

      <span class="icon">🔍</span>

      <input
          type="text"
          placeholder="Поиск по марке или модели..."
          v-model="query"
          @keyup.enter="onSearch"
      />

      <button class="btn" @click="onSearch">
        Найти
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')
const emit = defineEmits(['search'])

function onSearch() {
  emit('search', query.value)
}
</script>
