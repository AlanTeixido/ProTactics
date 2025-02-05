<template>
  <HeaderSection/>
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
  <FooterSection></FooterSection>
</template>
  
  <script setup>
  import { useRouter } from "vue-router";
  import HeaderSection from '@/components/HeaderSection.vue';
  import FooterSection from '@/components/FooterSection.vue';

  const router = useRouter();


  
  // Navegación al detalle de la imagen

  </script>
  
<style>
/* Estilos generales */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px 20px;
  margin-top: 10%;
  margin-bottom: 10%;
}


/* Grid de imágenes */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  width: 80%;
  max-width: 1200px;
  margin-top: 20px;
}

/* Estilo de cada imagen */
.grid-item {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.grid-item img {
  width: 100%;
  display: block;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

/* Efecto hover */
.grid-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.grid-item:hover img {
  transform: scale(1.1);
}
</style>
