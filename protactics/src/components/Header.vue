<template>
  <header class="header">
    <nav class="nav">
<<<<<<< HEAD
      <a href="#">INICIO</a>
      <a href="#">DASHBOARD</a>
      <img src="../assets/img/logo.png" alt="Icon" class="nav-icon" />
      <a href="#">PERFIL</a>
      <a href="#">CONTACTO</a>
    </nav>
    <h1>PROTACTICS</h1>
    <video autoplay loop muted src="../assets/img/videoHeader.mp4" class="banner"></video>

  </header>
</template>

<script setup>
</script>

<style scoped></style>
=======
      <RouterLink to="/">HOME</RouterLink>
      <RouterLink to="/dashboard">DASBOARD</RouterLink>
      <img src="../assets/img/logo.png" alt="Icon" class="nav-icon" />
      <RouterLink to="/perfil">PERFIL</RouterLink>
      <RouterLink to="/contact">CONTACT</RouterLink>
      <RouterView />
    </nav>
    <h1>PROTACTICS</h1>
    <h2><span>Crea<br> personaliza y comparte</span> tus entrenamientos</h2>
    <img class="banner" src="../assets/img/fondo.jpg" alt="">
  </header>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>

</style>
>>>>>>> 870106a (commit header + routerlink)
