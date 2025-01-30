<template>
    <div class="container">
      <!-- Grid de imágenes -->
      <div class="grid">
        <div 
          v-for="(imagen, index) in imagenes" 
          :key="index" 
          class="grid-item">
          <img :src="imagen.src" :alt="imagen.alt" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  // Lista de imágenes con ID para navegación
  const imagenes = ref([
  { id: 1, src: "/img/deporte1.jpg", alt: "Deporte 1" },
  { id: 2, src: "/img/deporte2.jpg", alt: "Deporte 2" },
  { id: 3, src: "/img/deporte3.jpg", alt: "Deporte 3" },
  { id: 4, src: "/img/deporte4.jpg", alt: "Deporte 4" },
  { id: 5, src: "/img/deporte5.jpg", alt: "Deporte 5" },
  { id: 6, src: "/img/deporte6.jpg", alt: "Deporte 6" },
  { id: 7, src: "/img/deporte7.jpg", alt: "Deporte 7" },
  { id: 8, src: "/img/deporte8.jpg", alt: "Deporte 8" },
]);

  
  // Navegación al detalle de la imagen

  </script>
  
<style>
/* Estilos generales */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px 20px; 
}


/* Grid de imágenes */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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