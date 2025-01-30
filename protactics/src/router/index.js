import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue';  // Importar el componente de Login
import Register from '@/components/Register.vue';  // Importar el componente de Register

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/PerfilView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/entrenamiento',
      name: 'entrenamiento',
      component: () => import('../views/EntrenamientoView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: Login,  
    },
    {
      path: '/register',
      name: 'register',
      component: Register,  
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/PerfilView.vue')  // Asegúrate de tener esta vista
    }
    
  ],
})

export default router
