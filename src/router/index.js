import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import CarPage from '../pages/CarPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import CreateCarPage from '../pages/CreateCarPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import { useAuthStore } from '../stores/authStore'
import { pinia } from '../pinia'

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/car/:id',
    component: CarPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/car/create',
    component: CreateCarPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/register',
    component: RegisterPage,
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(pinia)

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  next()
})

export default router