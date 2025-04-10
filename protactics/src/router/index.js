import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/formularios/Login.vue';
import Register from '@/components/formularios/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomePage.vue') },
    { path: '/contact', name: 'contact', component: () => import('../views/ContactView.vue') },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/pizarra/:deporte', name: 'Pizarra', component: () => import('../views/PizarraView.vue') },
    { path: "/editar", name: 'editar', component: () => import('../views/EditProfile.vue') },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },

    // Rutas específicas de entrenamientos
    { 
      path: '/entrenamiento/:nombre', 
      name: 'crear-entrenamiento', 
      component: () => import('../views/CrearEntrenamiento.vue') 
    },

    // 🔒 Rutas protegidas (requieren autenticación)
    { path: '/dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue'), meta: { requiresAuth: true } },
    { path: '/perfil', name: 'perfil', component: () => import('../views/PerfilView.vue'), meta: { requiresAuth: true } },
    { path: '/deportes', name: 'deportes', component: () => import('../views/DeportesView.vue'), meta: { requiresAuth: true } },
    { path: '/mis-entrenamientos', name: 'mis-entrenamientos', component: () => import('../views/EntrenamientosView.vue'), meta: { requiresAuth: true } },
    { 
      path: '/editar-entrenamiento/:id', 
      name: 'editar-entrenamiento', 
      component: () => import('../views/EditarEntrenamiento.vue'), 
      meta: { requiresAuth: true } 
    },
    { 
      path: '/crearEntrenador', 
      name: 'crearEntrenador', 
      component: () => import('../views/CrearEntrenadorPage.vue'),
      meta: { requiresAuth: true }
    },
    { 
      path: '/crearJugador', 
      name: 'crearJugador', 
      component: () => import('../views/CrearJugadorPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/jugadores',
      name: 'Jugadores',
      component: () => import('@/views/DashboardJugadores.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/publicaciones',
      name: 'publicaciones',
      component: () => import('../views/PublicacionesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/publicaciones/:id',
      name: 'detalle-publicacion',
      component: () => import('../views/DetallePublicacion.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/subirPublicaciones',
      name: 'subir-publicacion',
      component: () => import('../views/subirPublicacion.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/crear-equipo',
      name: 'crearEquipo',
      component: () => import('../views/CrearEquiposView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/equipos',
      name: 'equipos',
      component: () => import('../views/DashboardEquipos.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/entrenos',
      name: 'entrenos',
      component: () => import('../views/DashboardEntrenos.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/crear-entreno',
      name: 'CrearEntreno',
      component: () => import('../views/CrearEntreno.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/entrenadores',
      name: 'entrenadores',
      component: () => import('../views/DashboardEntrenadores.vue'),
    },

    // ✅ Rutas simplificadas y claras para perfiles
    {
      path: '/perfil-entrenador',
      name: 'PerfilEntrenador',
      component: () => import('@/views/PerfilEntrenador.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/perfil-club',
      name: 'PerfilClub',
      component: () => import('@/views/PerfilClub.vue'),
      meta: { requiresAuth: true }
    },
  ],

  scrollBehavior() {
    return { top: 0 };
  }
});

// Middleware protección rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
