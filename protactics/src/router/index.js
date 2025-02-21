import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import FutbolView from '@/views/Deportes/FutbolView.vue';
import BaloncestoView from '@/views/Deportes/BaloncestoView.vue';
import PadelView from '@/views/Deportes/PadelView.vue';
import GimnasioView from '@/views/Deportes/GimnasioView.vue';
import CiclismoView from '@/views/Deportes/CiclismoView.vue';
import AtletismoView from '@/views/Deportes/AtletismoView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomePage.vue') },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/dragg', name: 'dragg', component: () => import('../components/Draggable.vue') },
    { path: "/editar", name: 'editar', component: () => import('../views/EditProfile.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },

    // Ruta de cada deporte
    { path: '/futbol', name: 'futbol', component: FutbolView },
    { path: '/baloncesto', name: 'baloncesto', component: BaloncestoView },
    { path: '/padel', name: 'padel', component: PadelView },
    { path: '/gimnasio', name: 'gimnasio', component: GimnasioView },
    { path: '/ciclismo', name: 'ciclismo', component: CiclismoView},
    { path: '/atletismo', name: 'atletismo', component: AtletismoView },

    // 🔒 Rutas protegidas (solo accesibles si está logueado)
    { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { requiresAuth: true } },
    { path: '/perfil', name: 'perfil', component: () => import('../views/PerfilView.vue'), meta: { requiresAuth: true } },
    { path: '/deportes', name: 'deportes', component: () => import('../views/DeportesView.vue'), meta: { requiresAuth: true } },
    { path: '/mis-entrenamientos', name: 'mis-entrenamientos', component: () => import('../views/EntrenamientosView.vue'), meta: { requiresAuth: true } },
    {
      path: '/editar-entrenamiento/:id', name: 'editar-entrenamiento', component: () => import('../views/EditarEntrenamiento.vue'), meta: { requiresAuth: true }
    }
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
