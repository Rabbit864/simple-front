import { defineStore } from 'pinia'
import api from '../api/axios'

export const useCarStore = defineStore('cars', {
    state: () => ({
        cars: [],
        car: null,
        loading: false,
        error: null,
    }),

    actions: {
        async fetchCars(params = {}) {
            this.loading = true
            this.error = null

            try {
                const response = await api.get('/car', {
                    params: {
                        search: params.search
                    }
                    })
                this.cars = response.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка загрузки автомобилей'
            } finally {
                this.loading = false
            }
        },

        async createCar(payload) {
            this.loading = true
            this.error = null

            try {
                const response = await api.post('/car', payload)

                // можно сразу добавить в список
                this.cars.unshift(response.data)

                return response.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка создания автомобиля'
                throw error
            } finally {
                this.loading = false
            }
        },
        async fetchCar(id) {
            this.loading = true
            this.error = null

            try {
                const response = await api.get(`/car/${id}`)
                this.car = response.data
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка загрузки автомобиля'
            } finally {
                this.loading = false
            }
        },
    },
})