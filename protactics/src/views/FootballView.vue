<template>
    <div class="contenedor">
      <div class="zona-arrastre">
        <Draggable/>
      </div>
    </div>
  </template>
  
  <script>
  import Draggable from '@/components/Draggable.vue';

  </script>
  
  <style>
  .contenedor {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-image: url('../assets/img/campFutbol.png'); /* Imagen de fondo */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  .zona-arrastre {
    width: 500px; 
    height: 300px;
    background-color: rgba(255, 255, 255, 0.3); 
    border: 2px dashed #333; 
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; 
    overflow: hidden; 
  }
  </style>
  