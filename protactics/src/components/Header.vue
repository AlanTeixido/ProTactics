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

</style>
