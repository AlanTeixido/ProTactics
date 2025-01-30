<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/">HOME</RouterLink>
      <RouterLink to="/dashboard">DASHBOARD</RouterLink>
      <RouterLink to="/perfil">PERFIL</RouterLink>
      <RouterLink to="/contact">CONTACTE</RouterLink>
      <RouterLink to="/entrenamiento">ENTRENAMIENTO</RouterLink>

      <div v-if="!isLoggedIn" class="login-register">
        <!-- Redirige directamente a Login o Register -->
        <RouterLink to="/login" class="login-register-btn">Login / Registrarse</RouterLink>
      </div>

      <div v-if="isLoggedIn" class="user-info">
        <span>Bienvenido, {{ username }}</span>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(false);
const username = ref('');

// Función para logout
const logout = () => {
  localStorage.removeItem('authToken');
  isLoggedIn.value = false;
};
</script>

<style scoped>
/* Mejorando el diseño del botón */
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
  text-decoration: none; /* Eliminar subrayado */
}

.login-register-btn:hover {
  background-color: #0084c2;
  transform: translateY(-2px); /* Efecto de movimiento al pasar el mouse */
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3); /* Sombra más prominente */
}

.logout-btn {
  background-color: #e74c3c;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}
</style>
