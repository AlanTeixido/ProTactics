<template>
  <header class="header">
    <nav class="nav-container">
      <div class="nav">
        <RouterLink :to="`/`">
          <img src="../assets/img/logo.png" alt="Icon" class="nav-icon" />
        </RouterLink>

        <div class="nav2">
          <RouterLink to="/" class="nav-link">INICIO</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/dashboard" class="nav-link">DASHBOARD</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/perfil" class="nav-link">PERFIL</RouterLink>
          <RouterLink to="/contact" class="nav-link">CONTACTE</RouterLink>
          <RouterLink v-if="isLoggedIn" to="/entrenamiento" class="nav-link">ENTRENAMIENTO</RouterLink>
          <RouterLink to="/about" class="nav-link">SOBRE NOSOTROS</RouterLink> 
        </div>

        <div class="log-regist">
          <!-- Si está loggeado -->
          <div v-if="isLoggedIn" class="user-info">
            <span class="welcome-message">Bienvenido, {{ username }}</span>
            <img class="profile-pic" :src="userPic" alt="Foto de perfil" />
            <button @click="logout" class="logout-btn">Cerrar Sesión</button>
          </div>

          <!-- Si NO está loggeado -->
          <div v-if="!isLoggedIn" class="login-register">
            <RouterLink to="/login" class="login-register-btn">Inicia Sesión</RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, watchEffect, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// Estado de autenticación
const isLoggedIn = ref(localStorage.getItem('authToken') !== null);
const username = ref(localStorage.getItem('username') || 'Usuario');
const userPic = ref('https://via.placeholder.com/100'); // Imagen por defecto

// Obtener la foto de perfil desde la API
const fetchProfilePic = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) return;

  try {
    const response = await axios.get(`https://protactics-api.onrender.com/usuarios/${userId}`);
    
    if (response.data.foto_url) {
      userPic.value = `https://protactics-api.onrender.com${response.data.foto_url}`; 
      localStorage.setItem('fotoUrl', userPic.value);
    }
  } catch (error) {
    console.error("Error al obtener la foto de perfil:", error);
  }
};

// Observar cambios en el localStorage y actualizar dinámicamente
watchEffect(() => {
  isLoggedIn.value = localStorage.getItem('authToken') !== null;
  username.value = localStorage.getItem('username') || 'Usuario';

  const storedPic = localStorage.getItem('fotoUrl');
  if (storedPic) {
    userPic.value = storedPic;
  } else {
    fetchProfilePic(); 
  }
});

// Función de logout
const logout = () => {
  localStorage.clear();
  isLoggedIn.value = false;
  userPic.value = 'https://via.placeholder.com/100';
  router.push('/');
};

// Obtener la foto de perfil al cargar el componente
onMounted(() => {
  if (isLoggedIn.value) {
    fetchProfilePic();
  }
});
</script>
