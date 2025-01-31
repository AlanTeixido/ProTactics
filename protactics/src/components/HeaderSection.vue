<template>
  <header class="header">
    <nav class="nav-container">
      <div class="nav">
        <RouterLink :to="`/`"><img src="../assets/img/logo.png" alt="Icon" class="nav-icon" /></RouterLink>
        <div class="nav2">
          <RouterLink to="/" class="nav-link">INICIO</RouterLink>
          <RouterLink to="/dashboard" class="nav-link">DASHBOARD</RouterLink>
          <RouterLink to="/perfil" class="nav-link">PERFIL</RouterLink>
          <RouterLink to="/contact" class="nav-link">CONTACTE</RouterLink>
          <RouterLink to="/entrenamiento" class="nav-link">ENTRENAMIENTO</RouterLink>
        </div>

        <div class="log-regist">
          <!-- Si está loggeado -->
          <div v-if="isLoggedIn" class="user-info">
            <span class="welcome-message">Bienvenido, {{ username }}</span>
            <img class="profile-pic" :src="userPic" alt="Foto de perfil" />
            <button @click="logout" class="logout-btn">Logout</button>
          </div>

          <!-- Si no está loggeado -->
          <div v-if="!isLoggedIn" class="login-register">
            <RouterLink to="/login" class="login-register-btn">Inicia Sesión</RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(localStorage.getItem('authToken') !== null);
const username = ref(localStorage.getItem('username') || 'Usuario');
const userPic = ref(localStorage.getItem('userPic') || 'defaultProfilePic.jpg'); // Foto de perfil por defecto

// Función de logout
const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('username');
  localStorage.removeItem('userPic');
  isLoggedIn.value = false;
};
</script>

<style scoped></style>
