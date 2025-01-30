<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/" class="nav-link">HOME</RouterLink>
      <RouterLink to="/dashboard" class="nav-link">DASHBOARD</RouterLink>
      <RouterLink to="/perfil" class="nav-link">PERFIL</RouterLink>
      <RouterLink to="/contact" class="nav-link">CONTACTE</RouterLink>
      <RouterLink to="/entrenamiento" class="nav-link">ENTRENAMIENTO</RouterLink>

      <!-- Si está loggeado -->
      <div v-if="isLoggedIn" class="user-info">
        <span class="welcome-message">Bienvenido, {{ username }}</span>
        <!-- Foto de perfil (por ahora placeholder) -->
        <img class="profile-pic" :src="userPic" alt="Foto de perfil" />
        <button @click="logout" class="logout-btn">Logout</button>
      </div>

      <!-- Si no está loggeado -->
      <div v-if="!isLoggedIn" class="login-register">
        <RouterLink to="/login" class="login-register-btn">Login / Registrarse</RouterLink>
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

<style scoped>
.header {
  background-color: #1e1e1e;
  color: white;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: #0098e5;
  text-decoration: none;
  font-weight: bold;
}

.nav-link:hover {
  text-decoration: underline;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: flex-end; /* Esto asegura que todo se alinee a la derecha */
}

.welcome-message {
  color: #0098e5;
  font-size: 1.1rem;
  text-align: right;
}

.profile-pic {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.login-register-btn {
  background-color: #0098e5;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  text-decoration: none;
}

.login-register-btn:hover {
  background-color: #0084c2;
  transform: translateY(-2px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
}
</style>
