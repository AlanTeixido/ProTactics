<script setup>
import { defineProps } from "vue";

defineProps({
  publication: Object, // Se espera un objeto con los datos de la publicación
});
</script>

<template>
  <div class="detail-container">
    <div class="publication-card">
      <h1>{{ publication.titulo }}</h1>
      <p class="content">{{ publication.contenido }}</p>

      <div v-if="publication.imagen_url" class="image-container">
        <img :src="publication.imagen_url" alt="Imagen de la publicación" />
      </div>

      <div class="metadata">
        <p><strong>Fecha de Entrenamiento:</strong> {{ publication.fecha_hora_entrenamiento }}</p>
        <p><strong>Creado el:</strong> {{ publication.creado_en }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0f1e 0%, #131a2b 100%);
  color: #e5e7eb;
  padding: 2rem;
}

.publication-card {
  max-width: 800px;
  width: 100%;
  background: #111827;
  padding: 2rem;
  border-radius: 12px;
  border: 2px solid rgba(0, 140, 255, 0.4);
  box-shadow: 0px 0px 15px rgba(0, 140, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: fadeIn 0.8s ease-in-out;
}

.publication-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 0px 20px rgba(0, 140, 255, 0.3);
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #38bdf8;
  text-transform: uppercase;
  text-shadow: 0px 0px 5px rgba(56, 189, 248, 0.5);
  text-align: center;
  margin-bottom: 1rem;
}

.content {
  font-size: 1.1rem;
  color: #cbd5e1;
  line-height: 1.6;
  text-align: justify;
}

.image-container {
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
}

img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

img:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 20px rgba(0, 140, 255, 0.5);
}

.metadata {
  margin-top: 1.5rem;
  font-size: 1rem;
  color: #94a3b8;
}

.metadata p {
  margin-bottom: 0.5rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
