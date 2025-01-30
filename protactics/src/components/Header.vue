<template>
  <header class="header">
    <nav class="nav">
      <RouterLink to="/">HOME</RouterLink>
      <RouterLink to="/dashboard">DASHBOARD</RouterLink>
      <img src="../assets/img/logo.png" alt="Icon" class="nav-icon" />
      <RouterLink to="/perfil">PERFIL</RouterLink>
      <RouterLink to="/contact">CONTACTE</RouterLink>
      <RouterView />
    </nav>   
  </header>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
.header {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.nav {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center; 
  gap: 3rem;
  align-items: center;
  background-color: transparent; 
  padding: 1.5rem 0;
  z-index: 10; 
}

.nav a {
  font-size: 1.1rem;
  text-decoration: none;
  color: rgb(48, 48, 48);
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