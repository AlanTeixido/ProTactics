<template>
  <div class="container">
    <!-- Container de imágenes -->
    <div class="grid">
      <div class="grid-item">
        <img src="../assets/img/deportes/deporte.jpg" alt="Deporte 1">
      </div>
      <div class="grid-item">
        <img src="../assets/img/deportes/deporte.jpg" alt="Deporte 2">
      </div>
      <div class="grid-item">
        <img src="../assets/img/deportes/deporte.jpg" alt="Deporte 3">
      </div>
      <div class="grid-item">
        <img src="../assets/img/deportes/deporte.jpg" alt="Deporte 4">
      </div>
      <div class="grid-item">
        <img src="../assets/img/deportes/deporte.jpg" alt="Deporte 5">
      </div>
      <div class="grid-item">
        <img src="../assets/img/deportes/deporte.jpg" alt="Deporte 6">
      </div>
      <div class="grid-item">
        <img src="../assets/img/deportes/deporte.jpg" alt="Deporte 7">
      </div> 
      <div class="grid-item">
        <img src="../assets/img/deportes/deporte.jpg" alt="Deporte 8">
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import { useRouter } from "vue-router";
import FooterSection from "./FooterSection.vue";

  const router = useRouter();


  
  // Navegación al detalle de la imagen

  </script>
  
<style>
/* Estilos generales */
/* .grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px 20px;

} */


/* Grid de imágenes */

.grid {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.grid-item img {
    width: 100%;
    height: 500px;
    display: block;
    transition: transform 0.3s;
}

.grid-item:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.grid-item-transition {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s;
}

.grid-item:hover .grid-item-transition {
    opacity: 1;
}

</style>