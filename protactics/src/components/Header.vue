<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/">HOME</RouterLink>
      <RouterLink to="/dashboard">DASHBOARD</RouterLink>
      <img src="../assets/img/logo.png" alt="Icon" class="nav-icon" />
      <RouterLink to="/perfil">PERFIL</RouterLink>
      <RouterLink to="/contact">CONTACT</RouterLink>
      <RouterView />
    </nav>
    <h1>PROTACTICS</h1>
    <video autoplay muted loop class="banner" src="../assets/img/videoHeader.mp4"></video>
  </header>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
/* Capçalera amb menú de navegació centrat */
.header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 600px; /* Ajusta la altura del header según lo necesites */
}

.header h1{
  color: white;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1000%;

}

span{
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;

}

.banner {
  width: 100%;
  height: 600px; /* Asegura que la imagen ocupe el tamaño del header */
  object-fit: cover; /* Hace que la imagen se ajuste correctamente dentro del header */
  position: absolute; /* Coloca la imagen detrás del contenido */
  top: 0;
  left: 0;
  z-index: -1; /* Coloca la imagen por debajo del contenido */
  filter: brightness(70%);
}

.nav {
  position: fixed; /* Fija el nav en la parte superior */
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center; /* Centra los elementos de la barra de navegación */
  gap: 3rem;
  align-items: center;
  background-color: transparent; /* Sin fondo */
  padding: 1.5rem 0;
  z-index: 10; /* Asegura que el nav se muestre sobre otros elementos */
}

.nav a {
  font-size: 1.1rem;
  text-decoration: none;
  color: white;
  transition: color 0.3s;
}

.nav a:hover {
  color: hsla(180, 100%, 35%, 1);
}

.nav-icon {
  width: 50px;
  height: 50px;
  display: inline-block;
  transition: transform 0.3s;
}

.nav-icon:hover {
  transform: scale(1.1) rotateX(30deg) rotateY(15deg);
}

</style>
