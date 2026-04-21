import { defineStore } from 'pinia'
import api from '../api/axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('token') || null,
        user: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        async login(credentials) {
            try {
                const response = await api.post('/login', credentials)

                this.token = response.data.token

                localStorage.setItem('token', this.token)

                api.defaults.headers.common.Authorization = `Bearer ${this.token}`

                await this.fetchUser()
            } catch (error) {
                throw error
            }
        },

        async fetchUser() {
            try {
                const response = await api.get('/user')
                this.user = response.data
            } catch (error) {
                this.logout()
            }
        },

        logout() {
            this.token = null
            this.user = null

            localStorage.removeItem('token')

            delete api.defaults.headers.common.Authorization
        },

        init() {
            if (this.token) {
                api.defaults.headers.common.Authorization = `Bearer ${this.token}`
            }
        },
    },
})