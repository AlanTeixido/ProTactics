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
    <div class="intro">
      <h1>PROTACTICS</h1>
      <p>¡Conecta, crea gana!</p>
      <button class="cta-button">Empezar</button>
    </div>
    
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
  height: 600px; 
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
  top: 5%;
  position: absolute; 
  z-index: -1; 
  filter: brightness(70%);
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

.intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  margin-top: 5%;
}

.intro p{
  margin-top: -5%;
}

.cta-button {
  padding: 0.8rem 1.5rem;
  background-color: transparent;
  color: white;
  border: 2px white solid;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.3s ease;
  margin-top: 1rem;
}

.cta-button:hover {
  transform: scale(1.1);
}

</style>
