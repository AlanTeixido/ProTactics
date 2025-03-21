<!-- src/components/Loader.vue -->
<template>
    <div class="loading-overlay">
      <div class="spinner">
        <img src="../assets/img/logo.png" alt="Loading..." />
      </div>
    </div>
  </template>
  
  <script setup>
  /* No es necesario definir una lógica de estado en el loader por ahora, ya que es solo un spinner */
  </script>
  
  <style scoped>
  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5); /* Fondo semi-transparente */
    z-index: 9999;
  }
  
  .spinner img {
    width: 100px; /* Tamaño de tu logo */
    height: 100px;
    animation: spin 3s linear infinite; /* 3 segundos de animación */
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    10%, 30% {
      transform: rotate(0deg); /* Parón en 0deg */
    }
    40%, 60% {
      transform: rotate(180deg); /* Parón en 180deg */
    }
    70%, 90% {
      transform: rotate(180deg); /* Parón en 180deg */
    }
    100% {
      transform: rotate(360deg); /* Completa la rotación */
    }
  }
  </style>
  