import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/formularios/Login.vue';
import Register from '../components/formularios/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomePage.vue') },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/pizarra', name: 'pizarra', component: () => import('../views/PizarraView.vue') },
    // { path: '/pizarra/:deporte', name: 'draggable', component: () => import('../components/Draggable.vue') },
    { path: '/editar', name: 'editar', component: () => import('../views/EditProfile.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },

    // Crear entrenament per esport (paràmetre dinàmic)
    { 
      path: '/entrenamiento/:nombre', 
      name: 'crear-entrenamiento', 
      component: () => import('../views/CrearEntrenamiento.vue') 
    },

    // Rutes protegides
    { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { requiresAuth: true } },
    { path: '/perfil', name: 'perfil', component: () => import('../views/PerfilView.vue'), meta: { requiresAuth: true } },
    { path: '/deportes', name: 'deportes', component: () => import('../views/DeportesView.vue'), meta: { requiresAuth: true } },
    { path: '/mis-entrenamientos', name: 'mis-entrenamientos', component: () => import('../views/EntrenamientosView.vue'), meta: { requiresAuth: true } },
    { 
      path: '/editar-entrenamiento/:id', 
      name: 'editar-entrenamiento', 
      component: () => import('../views/EditarEntrenamiento.vue'), 
      meta: { requiresAuth: true } 
    }
  ],
  scrollBehavior() {
    return { top: 0 }; // Scroll al principi
  }
});

// Middleware per protegir rutes
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
