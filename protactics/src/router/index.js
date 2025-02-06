import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomePage.vue') },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/dragg', name: 'dragg', component: () => import('../components/Draggable.vue') },

    // 🔒 Rutas protegidas (solo accesibles si está logueado)
    { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { requiresAuth: true } },
    { path: '/perfil', name: 'perfil', component: () => import('../views/PerfilView.vue'), meta: { requiresAuth: true } },
    { path: '/entrenamiento', name: 'entrenamiento', component: () => import('../views/EntrenamientoView.vue'), meta: { requiresAuth: true } }
  ],
});

// Middleware para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Verifica si hay sesión activa

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirigir a login si no está autenticado
  } else {
    next(); // Permitir acceso
  }
});

export default router;
