<template>
  <header class="general-header">
    <nav class="nav">
      <RouterLink to="/">HOME</RouterLink>
      <RouterLink to="/dashboard">DASHBOARD</RouterLink>
      <img src="../assets/img/logo.png" alt="Icon" class="nav-icon" />
      <RouterLink to="/perfil">PERFIL</RouterLink>
      <RouterLink to="/contact">CONTACT</RouterLink>
      <RouterView />
    </nav>
  </header>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
/* Estilos específicos para el header general */

.general-header {
  background-color: black; /* Fondo negro */
}

.nav {
  width: 100%;
  display: flex;
  justify-content: center; /* Centra los elementos de la barra de navegación */
  gap: 3rem;
  align-items: center;
  background-color:antiquewhite; 
  padding: 1.5rem 0;
}

.nav a {
  color: white; /* Color de texto blanco */
  font-family: 'Montserrat', sans-serif;
  text-decoration: none;
}

.nav a:hover {
  color: hsla(180, 100%, 35%, 1); /* Cambia el color al pasar el mouse */
}

/* Aseguramos que la imagen del logo no se vea afectada por el resto de estilos */
.nav-icon {
  height: 40px; /* Ajusta el tamaño del logo */
  width: auto;
}
</style>
